// Copyright (c) 2022 Espresso Systems (espressosys.com)
// This file is part of the HotShot Query Service library.
//
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU
// General Public License as published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
// even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
// General Public License for more details.
// You should have received a copy of the GNU General Public License along with this program. If not,
// see <https://www.gnu.org/licenses/>.

use super::Provider;
use crate::{
    availability::{LeafQueryData, PayloadQueryData},
    fetching::request::{LeafRequest, PayloadRequest},
    Error, Payload,
};
use hotshot_types::traits::node_implementation::NodeType;
use surf_disco::{Client, Url};

/// Data availability provider backed by another instance of this query service.
///
/// This fetcher implements the [`Provider`] interface by querying the REST API provided by another
/// instance of this query service to try and retrieve missing objects.
#[derive(Clone, Debug)]
pub struct QueryServiceProvider {
    client: Client<Error>,
}

impl QueryServiceProvider {
    pub async fn new(url: Url) -> Self {
        let client = Client::new(url);
        client.connect(None).await;
        Self { client }
    }
}

impl<Types> Provider<Types, PayloadRequest> for QueryServiceProvider
where
    Types: NodeType,
{
    async fn fetch(&self, req: PayloadRequest) -> Option<Payload<Types>> {
        match self
            .client
            .get::<PayloadQueryData<Types>>(&format!("availability/payload/hash/{}", req.0))
            .send()
            .await
        {
            Ok(payload) => {
                // TODO Verify that the data we retrieved is consistent with the request we made.
                // https://github.com/EspressoSystems/hotshot-query-service/issues/355
                Some(payload.data)
            }
            Err(err) => {
                tracing::error!("failed to fetch payload {req:?}: {err}");
                None
            }
        }
    }
}

impl<Types> Provider<Types, LeafRequest> for QueryServiceProvider
where
    Types: NodeType,
{
    async fn fetch(&self, req: LeafRequest) -> Option<LeafQueryData<Types>> {
        match self
            .client
            .get(&format!("availability/leaf/{}", usize::from(req)))
            .send()
            .await
        {
            Ok(leaf) => {
                // TODO we should also download a chain of QCs justifying the inclusion of `leaf` in
                // the chain at the requested height. However, HotShot currently lacks a good light
                // client API to verify this chain, so for now we just trust the other server.
                // https://github.com/EspressoSystems/HotShot/issues/2137
                // https://github.com/EspressoSystems/hotshot-query-service/issues/354
                Some(leaf)
            }
            Err(err) => {
                tracing::error!("failed to fetch leaf {req:?}: {err}");
                None
            }
        }
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::{
        availability::{define_api, AvailabilityDataSource, UpdateAvailabilityData},
        data_source::{storage::sql::testing::TmpDb, VersionedDataSource},
        fetching::provider::TestProvider,
        testing::{
            consensus::{MockDataSource, MockNetwork},
            mocks::mock_transaction,
            setup_test, sleep,
        },
    };
    use async_std::task::spawn;
    use commit::Committable;
    use futures::stream::StreamExt;
    use portpicker::pick_unused_port;
    use std::time::Duration;
    use tide_disco::App;

    type Provider = TestProvider<QueryServiceProvider>;

    fn ignore<T>(_: T) {}

    #[async_std::test]
    async fn test_fetch_on_request() {
        setup_test();

        // Create the consensus network.
        let mut network = MockNetwork::<MockDataSource>::init().await;

        // Start a web server that the non-consensus node can use to fetch blocks.
        let port = pick_unused_port().unwrap();
        let mut app = App::<_, Error>::with_state(network.data_source());
        app.register_module("availability", define_api(&Default::default()).unwrap())
            .unwrap();
        spawn(app.serve(format!("0.0.0.0:{port}")));

        // Start a data source which is not receiving events from consensus, only from a peer.
        let db = TmpDb::init().await;
        let provider = Provider::new(
            QueryServiceProvider::new(format!("http://localhost:{port}").parse().unwrap()).await,
        );
        let mut data_source = db.config().connect(provider.clone()).await.unwrap();

        // Start consensus.
        network.start().await;

        // Wait until the block height reaches 5. This gives us the genesis block, one additional
        // block at the end, and then one block to play around with fetching each type of resource:
        // * Leaf
        // * Block
        // * Payload
        let leaves = { network.data_source().read().await.subscribe_leaves(1).await };
        let leaves = leaves.take(4).collect::<Vec<_>>().await;
        let test_leaf = &leaves[0];
        let test_block = &leaves[1];
        let test_payload = &leaves[2];

        // Make requests for missing data that should _not_ trigger an active fetch:
        tracing::info!("requesting unfetchable resources");
        let mut fetches = vec![];
        // * An unknown leaf hash.
        fetches.push(data_source.get_leaf(test_leaf.hash()).await.map(ignore));
        // * An unknown leaf height.
        fetches.push(
            data_source
                .get_leaf(test_leaf.height() as usize)
                .await
                .map(ignore),
        );
        // * An unknown block hash.
        fetches.push(
            data_source
                .get_block(test_block.block_hash())
                .await
                .map(ignore),
        );
        fetches.push(
            data_source
                .get_payload(test_payload.block_hash())
                .await
                .map(ignore),
        );
        // * An unknown block height.
        fetches.push(
            data_source
                .get_block(test_block.height() as usize)
                .await
                .map(ignore),
        );
        fetches.push(
            data_source
                .get_payload(test_payload.height() as usize)
                .await
                .map(ignore),
        );
        // * An unknown transaction.
        fetches.push(
            data_source
                .get_block_with_transaction(mock_transaction(vec![]).commit())
                .await
                .map(ignore),
        );

        // Even if we give data extra time to propagate, these requests will not resolve, since we
        // didn't trigger any active fetches.
        sleep(Duration::from_secs(1)).await;
        for (i, fetch) in fetches.into_iter().enumerate() {
            tracing::info!("checking fetch {i} is unresolved");
            fetch.try_resolve().unwrap_err();
        }

        // Now we will actually fetch the missing data. First, since our node is not really
        // connected to consensus, we need to give it a leaf after the range of interest so it
        // learns about the correct block height.
        data_source
            .insert_leaf(leaves.last().cloned().unwrap())
            .await
            .unwrap();
        data_source.commit().await.unwrap();

        // Block requests to the provider so that we can verify that without the provider, the node
        // does _not_ get the data.
        provider.block().await;

        tracing::info!("requesting fetchable resources");
        let req_leaf = data_source.get_leaf(test_leaf.height() as usize).await;
        let req_block = data_source.get_block(test_block.height() as usize).await;
        let req_payload = data_source
            .get_payload(test_payload.height() as usize)
            .await;

        // Give the requests some extra time to complete, and check that they still haven't
        // resolved, since the provider is blocked. This just ensures the integrity of the test by
        // checking the node didn't mysteriously get the block from somewhere else, so that when we
        // unblock the provider and the node finally gets the block, we know it came from the
        // provider.
        sleep(Duration::from_secs(1)).await;
        req_leaf.try_resolve().unwrap_err();
        req_block.try_resolve().unwrap_err();
        req_payload.try_resolve().unwrap_err();

        // Unblock the request and see that we eventually receive the data.
        provider.unblock().await;
        tracing::info!("fetching leaf");
        let leaf = data_source
            .get_leaf(test_leaf.height() as usize)
            .await
            .await;
        tracing::info!("fetching block");
        let block = data_source
            .get_block(test_block.height() as usize)
            .await
            .await;
        // tracing::info!("fetching payload");
        let payload = data_source
            .get_payload(test_payload.height() as usize)
            .await
            .await;
        {
            // Verify the data.
            let truth = network.data_source();
            let truth = truth.read().await;
            assert_eq!(
                leaf,
                truth.get_leaf(test_leaf.height() as usize).await.await
            );
            assert_eq!(
                block,
                truth.get_block(test_block.height() as usize).await.await
            );
            assert_eq!(
                payload,
                truth
                    .get_payload(test_payload.height() as usize)
                    .await
                    .await
            );
        }

        // Fetching the block and payload should have also fetched the corresponding leaves, since
        // we have an invariant that we should not store a block in the database without its
        // corresponding leaf and header. Thus we should be able to get the leaves even if the
        // provider is blocked.
        provider.block().await;
        for leaf in [test_block, test_payload] {
            tracing::info!("fetching existing leaf {}", leaf.height());
            let fetched_leaf = data_source.get_leaf(leaf.height() as usize).await.await;
            assert_eq!(*leaf, fetched_leaf);
        }

        // On the other hand, fetching the block corresponding to `leaf` _will_ trigger a fetch,
        // since fetching a leaf does not necessarily fetch the corresponding block. We can fetch by
        // hash now, since the presence of the corresponding leaf allows us to confirm that a block
        // with this hash exists, and trigger a fetch for it.
        tracing::info!("fetching block by hash");
        provider.unblock().await;
        {
            let block = data_source.get_block(test_leaf.block_hash()).await.await;
            assert_eq!(block.hash(), leaf.block_hash());
        }

        // Test a similar scenario, but with payload instead of block: we are aware of
        // `leaves.last()` but not the corresponding payload, but we can fetch that payload by block
        // hash.
        tracing::info!("fetching payload by hash");
        {
            let leaf = leaves.last().unwrap();
            let payload = data_source.get_payload(leaf.block_hash()).await.await;
            assert_eq!(payload.height(), leaf.height());
            assert_eq!(payload.block_hash(), leaf.block_hash());
            assert_eq!(payload.hash(), leaf.payload_hash());
        }
    }

    // TODO test fetching payload
    // TODO test fetching block and leaf concurrently
    // TODO test subscriptions
    // TODO test get transaction
}
