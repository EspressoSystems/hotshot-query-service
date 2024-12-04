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

#![cfg(feature = "no-storage")]

use super::{
    pruning::{PruneStorage, PrunedHeightStorage, PrunerConfig},
    AggregatesStorage, AvailabilityStorage, NodeStorage, PayloadMetadata, UpdateAggregatesStorage,
    UpdateAvailabilityStorage, VidCommonMetadata,
};
use crate::{
    availability::{
        BlockId, BlockQueryData, LeafId, LeafQueryData, PayloadQueryData, QueryablePayload,
        TransactionHash, TransactionQueryData, VidCommonQueryData,
    },
    data_source::{update, VersionedDataSource},
    metrics::PrometheusMetrics,
    node::{SyncStatus, TimeWindowQueryData, WindowStart},
    status::HasMetrics,
    types::HeightIndexed,
    Header, Payload, QueryError, QueryResult, VidShare,
};
use anyhow::bail;
use async_lock::RwLock;
use async_trait::async_trait;
use futures::future::Future;
use hotshot_types::traits::node_implementation::NodeType;
use std::sync::Arc;
use std::{cmp::max, ops::RangeBounds};

/// Mock storage implementation which doesn't actually store anything.
///
/// This is useful for adversarial testing, as it can be used to test the behavior of the query
/// service where data is never available locally and must always be fetched on demand from a peer
/// query service.
#[derive(Clone, Debug, Default)]
pub struct NoStorage {
    // A storage implementation must at a minimum keep track of the block height. All other
    // functionality, such as fetching of missing data, stems from that.
    height: Arc<RwLock<u64>>,
    metrics: PrometheusMetrics,
}

pub struct Transaction<'a> {
    storage: &'a NoStorage,
    height: u64,
}

impl VersionedDataSource for NoStorage {
    type Transaction<'a> = Transaction<'a>
    where
        Self: 'a;
    type ReadOnly<'a> = Transaction<'a>
    where
        Self: 'a;

    async fn write(&self) -> anyhow::Result<Self::Transaction<'_>> {
        Ok(Transaction::new(self).await)
    }

    async fn read(&self) -> anyhow::Result<Self::ReadOnly<'_>> {
        Ok(Transaction::new(self).await)
    }
}

impl<'a> Transaction<'a> {
    async fn new(storage: &'a NoStorage) -> Self {
        Self {
            height: *storage.height.read().await,
            storage,
        }
    }
}

impl<'a> update::Transaction for Transaction<'a> {
    async fn commit(self) -> anyhow::Result<()> {
        let mut height = self.storage.height.write().await;
        *height = max(*height, self.height);
        Ok(())
    }

    fn revert(self) -> impl Future + Send {
        async {}
    }
}

impl PrunerConfig for NoStorage {}
impl PruneStorage for NoStorage {
    type Pruner = ();
}
impl<'a> PrunedHeightStorage for Transaction<'a> {}

impl HasMetrics for NoStorage {
    fn metrics(&self) -> &PrometheusMetrics {
        &self.metrics
    }
}

#[async_trait]
impl<'a, Types: NodeType> AvailabilityStorage<Types> for Transaction<'a>
where
    Payload<Types>: QueryablePayload<Types>,
{
    async fn get_leaf(&mut self, _id: LeafId<Types>) -> QueryResult<LeafQueryData<Types>> {
        Err(QueryError::Missing)
    }

    async fn get_block(&mut self, _id: BlockId<Types>) -> QueryResult<BlockQueryData<Types>> {
        Err(QueryError::Missing)
    }

    async fn get_header(&mut self, _id: BlockId<Types>) -> QueryResult<Header<Types>> {
        Err(QueryError::Missing)
    }

    async fn get_payload(&mut self, _id: BlockId<Types>) -> QueryResult<PayloadQueryData<Types>> {
        Err(QueryError::Missing)
    }

    async fn get_payload_metadata(
        &mut self,
        _id: BlockId<Types>,
    ) -> QueryResult<PayloadMetadata<Types>> {
        Err(QueryError::Missing)
    }

    async fn get_vid_common(
        &mut self,
        _id: BlockId<Types>,
    ) -> QueryResult<VidCommonQueryData<Types>> {
        Err(QueryError::Missing)
    }

    async fn get_vid_common_metadata(
        &mut self,
        _id: BlockId<Types>,
    ) -> QueryResult<VidCommonMetadata<Types>> {
        Err(QueryError::Missing)
    }

    async fn get_leaf_range<R>(
        &mut self,
        _range: R,
    ) -> QueryResult<Vec<QueryResult<LeafQueryData<Types>>>>
    where
        R: RangeBounds<usize> + Send,
    {
        Ok(vec![])
    }

    async fn get_block_range<R>(
        &mut self,
        _range: R,
    ) -> QueryResult<Vec<QueryResult<BlockQueryData<Types>>>>
    where
        R: RangeBounds<usize> + Send,
    {
        Ok(vec![])
    }

    async fn get_payload_range<R>(
        &mut self,
        _range: R,
    ) -> QueryResult<Vec<QueryResult<PayloadQueryData<Types>>>>
    where
        R: RangeBounds<usize> + Send,
    {
        Ok(vec![])
    }

    async fn get_payload_metadata_range<R>(
        &mut self,
        _range: R,
    ) -> QueryResult<Vec<QueryResult<PayloadMetadata<Types>>>>
    where
        R: RangeBounds<usize> + Send,
    {
        Ok(vec![])
    }

    async fn get_vid_common_range<R>(
        &mut self,
        _range: R,
    ) -> QueryResult<Vec<QueryResult<VidCommonQueryData<Types>>>>
    where
        R: RangeBounds<usize> + Send,
    {
        Ok(vec![])
    }

    async fn get_vid_common_metadata_range<R>(
        &mut self,
        _range: R,
    ) -> QueryResult<Vec<QueryResult<VidCommonMetadata<Types>>>>
    where
        R: RangeBounds<usize> + Send,
    {
        Ok(vec![])
    }

    async fn get_transaction(
        &mut self,
        _hash: TransactionHash<Types>,
    ) -> QueryResult<TransactionQueryData<Types>> {
        Err(QueryError::Missing)
    }
}

impl<'a, Types: NodeType> UpdateAvailabilityStorage<Types> for Transaction<'a>
where
    Payload<Types>: QueryablePayload<Types>,
{
    async fn insert_leaf(&mut self, leaf: LeafQueryData<Types>) -> anyhow::Result<()> {
        self.height = max(self.height, leaf.height() + 1);
        Ok(())
    }

    async fn insert_block(&mut self, block: BlockQueryData<Types>) -> anyhow::Result<()> {
        self.height = max(self.height, block.height() + 1);
        Ok(())
    }

    async fn insert_vid(
        &mut self,
        common: VidCommonQueryData<Types>,
        _share: Option<VidShare>,
    ) -> anyhow::Result<()> {
        self.height = max(self.height, common.height() + 1);
        Ok(())
    }
}

#[async_trait]
impl<'a, Types: NodeType> NodeStorage<Types> for Transaction<'a>
where
    Payload<Types>: QueryablePayload<Types>,
{
    async fn block_height(&mut self) -> QueryResult<usize> {
        Ok(self.height as usize)
    }

    async fn count_transactions_in_range(
        &mut self,
        _range: impl RangeBounds<usize> + Send,
    ) -> QueryResult<usize> {
        Err(QueryError::Missing)
    }

    async fn payload_size_in_range(
        &mut self,
        _range: impl RangeBounds<usize> + Send,
    ) -> QueryResult<usize> {
        Err(QueryError::Missing)
    }

    async fn vid_share<ID>(&mut self, _id: ID) -> QueryResult<VidShare>
    where
        ID: Into<BlockId<Types>> + Send + Sync,
    {
        Err(QueryError::Missing)
    }

    async fn sync_status(&mut self) -> QueryResult<SyncStatus> {
        Err(QueryError::Missing)
    }

    async fn get_header_window(
        &mut self,
        _start: impl Into<WindowStart<Types>> + Send + Sync,
        _end: u64,
        _limit: usize,
    ) -> QueryResult<TimeWindowQueryData<Header<Types>>> {
        Err(QueryError::Missing)
    }
}

impl<'a> AggregatesStorage for Transaction<'a> {
    async fn aggregates_height(&mut self) -> anyhow::Result<usize> {
        bail!("no_storage mock read error")
    }
}

impl<'a, Types> UpdateAggregatesStorage<Types> for Transaction<'a>
where
    Types: NodeType,
{
    async fn update_aggregates(
        &mut self,
        _blocks: &[PayloadMetadata<Types>],
    ) -> anyhow::Result<()> {
        Ok(())
    }
}

// These tests run the `postgres` Docker image, which doesn't work on Windows.
#[cfg(all(any(test, feature = "testing"), not(target_os = "windows")))]
pub mod testing {
    use super::*;
    use crate::{
        availability::{
            define_api, AvailabilityDataSource, BlockInfo, Fetch, UpdateAvailabilityData,
        },
        data_source::{
            storage::sql::{testing::TmpDb, SqlStorage},
            FetchingDataSource, SqlDataSource, UpdateDataSource,
        },
        fetching::provider::{NoFetching, QueryServiceProvider},
        metrics::PrometheusMetrics,
        node::NodeDataSource,
        status::{HasMetrics, StatusDataSource},
        testing::{
            consensus::{DataSourceLifeCycle, MockNetwork},
            mocks::{MockBase, MockTypes},
        },
        ApiState, Error,
    };
    use futures::stream::{BoxStream, StreamExt};
    use hotshot::types::Event;
    use portpicker::pick_unused_port;
    use std::time::Duration;
    use tide_disco::App;
    use vbs::version::StaticVersionType;

    /// Either Postgres or no storage.
    ///
    /// In order to instantiate [`NoStorage`] for the generic tests, we need some node running a
    /// real database that our [`NoStorage`] node can fetch from. We use this [`Storage`] enum to
    /// represent a network where the nodes are either using [`NoStorage`] or SQL storage. We will
    /// set node 0, the node under test, to always use [`NoStorage`].
    ///
    /// This gives us a strongly adversarial test of fetching, where the node under test never gets
    /// anything from local storage, but the tests still pass.
    pub enum Storage {
        Sql(TmpDb),
        NoStorage { fetch_from_port: u16 },
    }

    #[derive(Clone, Debug)]
    pub enum DataSource {
        Sql(SqlDataSource<MockTypes, NoFetching>),
        NoStorage(FetchingDataSource<MockTypes, NoStorage, QueryServiceProvider<MockBase>>),
    }

    #[async_trait]
    impl DataSourceLifeCycle for DataSource {
        type Storage = Storage;

        async fn create(node_id: usize) -> Self::Storage {
            if node_id == 0 {
                Storage::NoStorage {
                    fetch_from_port: pick_unused_port().unwrap(),
                }
            } else {
                Storage::Sql(TmpDb::init().await)
            }
        }

        async fn connect(db: &Self::Storage) -> Self {
            match db {
                Storage::Sql(db) => {
                    let cfg = db.config();
                    let builder = cfg
                        .builder(Default::default())
                        .await
                        .unwrap()
                        .with_active_fetch_delay(Duration::from_millis(1))
                        .with_chunk_fetch_delay(Duration::from_millis(1));

                    Self::Sql(builder.build().await.unwrap())
                }
                Storage::NoStorage { fetch_from_port } => {
                    tracing::info!("creating NoStorage node, fetching missing data from port {fetch_from_port}");
                    let provider = QueryServiceProvider::new(
                        format!("http://localhost:{fetch_from_port}")
                            .parse()
                            .unwrap(),
                        MockBase::instance(),
                    );
                    Self::NoStorage(
                        FetchingDataSource::<MockTypes, NoStorage, _>::builder(
                            NoStorage::default(),
                            provider,
                        )
                        // The default minor scan interval is suitable for real scenarios, where
                        // missing blocks are quite rare. But in these tests, we rely entirely
                        // on proactive scanning to recover some objects, so we want to do this
                        // quite frequently.
                        .with_minor_scan_interval(Duration::from_millis(100))
                        // Similarly, we even need to do major scans frequently (every 2 minor
                        // scans, or 0.2s), since we are constantly losing old objects (since we
                        // don't have storage) and the test frequently goes back and looks up
                        // old objects.
                        .with_major_scan_interval(2)
                        // add minor delay for active fetch
                        .with_active_fetch_delay(Duration::from_millis(1))
                        // add minor delay between chunks during proactive scan
                        .with_chunk_fetch_delay(Duration::from_millis(1))
                        .build()
                        .await
                        .unwrap(),
                    )
                }
            }
        }

        async fn reset(db: &Self::Storage) -> Self {
            match db {
                Storage::Sql(db) => Self::Sql(
                    db.config()
                        .reset_schema()
                        .connect(Default::default())
                        .await
                        .unwrap(),
                ),
                db => Self::connect(db).await,
            }
        }

        async fn setup(network: &mut MockNetwork<Self>) {
            // Spawn the web server on node 1 that node 0 will use to fetch missing data.
            let Storage::NoStorage { fetch_from_port } = network.storage() else {
                panic!("node 0 should always be NoStorage node");
            };
            tracing::info!("spawning server for missing data on port {fetch_from_port}");
            let api_data_source = network.data_source_index(1);
            let mut app = App::<_, Error>::with_state(ApiState::from(api_data_source));
            app.register_module(
                "availability",
                define_api(&Default::default(), MockBase::instance()).unwrap(),
            )
            .unwrap();
            network.spawn(
                "server",
                app.serve(format!("0.0.0.0:{fetch_from_port}"), MockBase::instance()),
            );
        }

        async fn handle_event(&self, event: &Event<MockTypes>) {
            self.update(event).await.unwrap();
        }
    }

    pub enum Transaction<'a, T> {
        Sql(T),
        NoStorage(super::Transaction<'a>),
    }

    // Now a lot of boilerplate to implement all teh traits for [`DataSource`], by dispatching each
    // method to either variant.
    impl VersionedDataSource for DataSource {
        type Transaction<'a> = Transaction<'a, <SqlStorage as VersionedDataSource>::Transaction<'a>>
        where
            Self: 'a;
        type ReadOnly<'a> = Transaction<'a, <SqlStorage as VersionedDataSource>::ReadOnly<'a>>
        where
            Self: 'a;

        async fn read(&self) -> anyhow::Result<Self::ReadOnly<'_>> {
            match self {
                Self::Sql(data_source) => Ok(Transaction::Sql(data_source.read().await?)),
                Self::NoStorage(data_source) => {
                    Ok(Transaction::NoStorage(data_source.read().await?))
                }
            }
        }

        async fn write(&self) -> anyhow::Result<Self::Transaction<'_>> {
            match self {
                Self::Sql(data_source) => Ok(Transaction::Sql(data_source.write().await?)),
                Self::NoStorage(data_source) => {
                    Ok(Transaction::NoStorage(data_source.write().await?))
                }
            }
        }
    }

    impl UpdateAvailabilityData<MockTypes> for DataSource {
        async fn append(&self, info: BlockInfo<MockTypes>) -> anyhow::Result<()> {
            match self {
                Self::Sql(ds) => ds.append(info).await,
                Self::NoStorage(ds) => ds.append(info).await,
            }
        }
    }

    impl<'a, T> update::Transaction for Transaction<'a, T>
    where
        T: update::Transaction,
    {
        async fn commit(self) -> anyhow::Result<()> {
            match self {
                Self::Sql(tx) => tx.commit().await,
                Self::NoStorage(tx) => tx.commit().await,
            }
        }

        fn revert(self) -> impl Future + Send {
            async move {
                match self {
                    Self::Sql(tx) => {
                        tx.revert().await;
                    }
                    Self::NoStorage(tx) => {
                        tx.revert().await;
                    }
                }
            }
        }
    }

    impl<'a, T> UpdateAvailabilityStorage<MockTypes> for Transaction<'a, T>
    where
        T: UpdateAvailabilityStorage<MockTypes> + Send + Sync,
    {
        async fn insert_leaf(&mut self, leaf: LeafQueryData<MockTypes>) -> anyhow::Result<()> {
            match self {
                Self::Sql(tx) => tx.insert_leaf(leaf).await,
                Self::NoStorage(tx) => tx.insert_leaf(leaf).await,
            }
        }

        async fn insert_block(&mut self, block: BlockQueryData<MockTypes>) -> anyhow::Result<()> {
            match self {
                Self::Sql(tx) => tx.insert_block(block).await,
                Self::NoStorage(tx) => tx.insert_block(block).await,
            }
        }

        async fn insert_vid(
            &mut self,
            common: VidCommonQueryData<MockTypes>,
            share: Option<VidShare>,
        ) -> anyhow::Result<()> {
            match self {
                Self::Sql(tx) => tx.insert_vid(common, share).await,
                Self::NoStorage(tx) => tx.insert_vid(common, share).await,
            }
        }
    }

    #[async_trait]
    impl AvailabilityDataSource<MockTypes> for DataSource {
        type LeafRange<R> = BoxStream<'static, Fetch<LeafQueryData<MockTypes>>>
        where
            R: RangeBounds<usize> + Send;
        type BlockRange<R> = BoxStream<'static, Fetch<BlockQueryData<MockTypes>>>
        where
            R: RangeBounds<usize> + Send;
        type PayloadRange<R> = BoxStream<'static, Fetch<PayloadQueryData<MockTypes>>>
        where
            R: RangeBounds<usize> + Send;
        type PayloadMetadataRange<R> = BoxStream<'static, Fetch<PayloadMetadata<MockTypes>>>
        where
            R: RangeBounds<usize> + Send;
        type VidCommonRange<R> = BoxStream<'static, Fetch<VidCommonQueryData<MockTypes>>>
        where
            R: RangeBounds<usize> + Send;
        type VidCommonMetadataRange<R> = BoxStream<'static, Fetch<VidCommonMetadata<MockTypes>>>
        where
            R: RangeBounds<usize> + Send;

        async fn get_leaf<ID>(&self, id: ID) -> Fetch<LeafQueryData<MockTypes>>
        where
            ID: Into<LeafId<MockTypes>> + Send + Sync,
        {
            match self {
                Self::Sql(data_source) => data_source.get_leaf(id).await,
                Self::NoStorage(data_source) => data_source.get_leaf(id).await,
            }
        }

        async fn get_block<ID>(&self, id: ID) -> Fetch<BlockQueryData<MockTypes>>
        where
            ID: Into<BlockId<MockTypes>> + Send + Sync,
        {
            match self {
                Self::Sql(data_source) => data_source.get_block(id).await,
                Self::NoStorage(data_source) => data_source.get_block(id).await,
            }
        }

        async fn get_payload<ID>(&self, id: ID) -> Fetch<PayloadQueryData<MockTypes>>
        where
            ID: Into<BlockId<MockTypes>> + Send + Sync,
        {
            match self {
                Self::Sql(data_source) => data_source.get_payload(id).await,
                Self::NoStorage(data_source) => data_source.get_payload(id).await,
            }
        }

        async fn get_payload_metadata<ID>(&self, id: ID) -> Fetch<PayloadMetadata<MockTypes>>
        where
            ID: Into<BlockId<MockTypes>> + Send + Sync,
        {
            match self {
                Self::Sql(data_source) => data_source.get_payload_metadata(id).await,
                Self::NoStorage(data_source) => data_source.get_payload_metadata(id).await,
            }
        }

        async fn get_vid_common<ID>(&self, id: ID) -> Fetch<VidCommonQueryData<MockTypes>>
        where
            ID: Into<BlockId<MockTypes>> + Send + Sync,
        {
            match self {
                Self::Sql(data_source) => data_source.get_vid_common(id).await,
                Self::NoStorage(data_source) => data_source.get_vid_common(id).await,
            }
        }

        async fn get_vid_common_metadata<ID>(&self, id: ID) -> Fetch<VidCommonMetadata<MockTypes>>
        where
            ID: Into<BlockId<MockTypes>> + Send + Sync,
        {
            match self {
                Self::Sql(data_source) => data_source.get_vid_common_metadata(id).await,
                Self::NoStorage(data_source) => data_source.get_vid_common_metadata(id).await,
            }
        }

        async fn get_leaf_range<R>(&self, range: R) -> Self::LeafRange<R>
        where
            R: RangeBounds<usize> + Send + 'static,
        {
            match self {
                Self::Sql(data_source) => data_source.get_leaf_range(range).await.boxed(),
                Self::NoStorage(data_source) => data_source.get_leaf_range(range).await.boxed(),
            }
        }

        async fn get_block_range<R>(&self, range: R) -> Self::BlockRange<R>
        where
            R: RangeBounds<usize> + Send + 'static,
        {
            match self {
                Self::Sql(data_source) => data_source.get_block_range(range).await.boxed(),
                Self::NoStorage(data_source) => data_source.get_block_range(range).await.boxed(),
            }
        }

        async fn get_payload_range<R>(&self, range: R) -> Self::PayloadRange<R>
        where
            R: RangeBounds<usize> + Send + 'static,
        {
            match self {
                Self::Sql(data_source) => data_source.get_payload_range(range).await.boxed(),
                Self::NoStorage(data_source) => data_source.get_payload_range(range).await.boxed(),
            }
        }

        async fn get_payload_metadata_range<R>(&self, range: R) -> Self::PayloadMetadataRange<R>
        where
            R: RangeBounds<usize> + Send + 'static,
        {
            match self {
                Self::Sql(data_source) => {
                    data_source.get_payload_metadata_range(range).await.boxed()
                }
                Self::NoStorage(data_source) => {
                    data_source.get_payload_metadata_range(range).await.boxed()
                }
            }
        }

        async fn get_vid_common_range<R>(&self, range: R) -> Self::VidCommonRange<R>
        where
            R: RangeBounds<usize> + Send + 'static,
        {
            match self {
                Self::Sql(data_source) => data_source.get_vid_common_range(range).await.boxed(),
                Self::NoStorage(data_source) => {
                    data_source.get_vid_common_range(range).await.boxed()
                }
            }
        }

        async fn get_vid_common_metadata_range<R>(
            &self,
            range: R,
        ) -> Self::VidCommonMetadataRange<R>
        where
            R: RangeBounds<usize> + Send + 'static,
        {
            match self {
                Self::Sql(data_source) => data_source
                    .get_vid_common_metadata_range(range)
                    .await
                    .boxed(),
                Self::NoStorage(data_source) => data_source
                    .get_vid_common_metadata_range(range)
                    .await
                    .boxed(),
            }
        }

        async fn get_transaction(
            &self,
            hash: TransactionHash<MockTypes>,
        ) -> Fetch<TransactionQueryData<MockTypes>> {
            match self {
                Self::Sql(data_source) => data_source.get_transaction(hash).await,
                Self::NoStorage(data_source) => data_source.get_transaction(hash).await,
            }
        }
    }

    #[async_trait]
    impl<'a, T> NodeStorage<MockTypes> for Transaction<'a, T>
    where
        T: NodeStorage<MockTypes> + Send,
    {
        async fn block_height(&mut self) -> QueryResult<usize> {
            match self {
                Transaction::Sql(tx) => tx.block_height().await,
                Transaction::NoStorage(tx) => NodeStorage::<MockTypes>::block_height(tx).await,
            }
        }

        async fn count_transactions_in_range(
            &mut self,
            range: impl RangeBounds<usize> + Send,
        ) -> QueryResult<usize> {
            match self {
                Transaction::Sql(tx) => tx.count_transactions_in_range(range).await,
                Transaction::NoStorage(tx) => {
                    NodeStorage::<MockTypes>::count_transactions_in_range(tx, range).await
                }
            }
        }

        async fn payload_size_in_range(
            &mut self,
            range: impl RangeBounds<usize> + Send,
        ) -> QueryResult<usize> {
            match self {
                Transaction::Sql(tx) => tx.payload_size_in_range(range).await,
                Transaction::NoStorage(tx) => {
                    NodeStorage::<MockTypes>::payload_size_in_range(tx, range).await
                }
            }
        }

        async fn vid_share<ID>(&mut self, id: ID) -> QueryResult<VidShare>
        where
            ID: Into<BlockId<MockTypes>> + Send + Sync,
        {
            match self {
                Transaction::Sql(tx) => tx.vid_share(id).await,
                Transaction::NoStorage(tx) => NodeStorage::<MockTypes>::vid_share(tx, id).await,
            }
        }

        async fn sync_status(&mut self) -> QueryResult<SyncStatus> {
            match self {
                Transaction::Sql(tx) => tx.sync_status().await,
                Transaction::NoStorage(tx) => NodeStorage::<MockTypes>::sync_status(tx).await,
            }
        }

        async fn get_header_window(
            &mut self,
            start: impl Into<WindowStart<MockTypes>> + Send + Sync,
            end: u64,
            limit: usize,
        ) -> QueryResult<TimeWindowQueryData<Header<MockTypes>>> {
            match self {
                Transaction::Sql(tx) => tx.get_header_window(start, end, limit).await,
                Transaction::NoStorage(tx) => tx.get_header_window(start, end, limit).await,
            }
        }
    }

    impl HasMetrics for DataSource {
        fn metrics(&self) -> &PrometheusMetrics {
            match self {
                Self::Sql(data_source) => data_source.metrics(),
                Self::NoStorage(data_source) => data_source.metrics(),
            }
        }
    }

    #[async_trait]
    impl StatusDataSource for DataSource {
        async fn block_height(&self) -> QueryResult<usize> {
            match self {
                Self::Sql(data_source) => StatusDataSource::block_height(data_source).await,
                Self::NoStorage(data_source) => StatusDataSource::block_height(data_source).await,
            }
        }
    }

    #[async_trait]
    impl NodeDataSource<MockTypes> for DataSource {
        async fn block_height(&self) -> QueryResult<usize> {
            match self {
                DataSource::Sql(data_source) => NodeDataSource::block_height(data_source).await,
                DataSource::NoStorage(data_source) => {
                    NodeDataSource::block_height(data_source).await
                }
            }
        }

        async fn count_transactions_in_range(
            &self,
            range: impl RangeBounds<usize> + Send,
        ) -> QueryResult<usize> {
            match self {
                DataSource::Sql(data_source) => {
                    data_source.count_transactions_in_range(range).await
                }
                DataSource::NoStorage(data_source) => {
                    data_source.count_transactions_in_range(range).await
                }
            }
        }

        async fn payload_size_in_range(
            &self,
            range: impl RangeBounds<usize> + Send,
        ) -> QueryResult<usize> {
            match self {
                DataSource::Sql(data_source) => data_source.payload_size_in_range(range).await,
                DataSource::NoStorage(data_source) => {
                    data_source.payload_size_in_range(range).await
                }
            }
        }

        async fn vid_share<ID>(&self, id: ID) -> QueryResult<VidShare>
        where
            ID: Into<BlockId<MockTypes>> + Send + Sync,
        {
            match self {
                DataSource::Sql(data_source) => data_source.vid_share(id).await,
                DataSource::NoStorage(data_source) => data_source.vid_share(id).await,
            }
        }

        async fn sync_status(&self) -> QueryResult<SyncStatus> {
            match self {
                DataSource::Sql(data_source) => data_source.sync_status().await,
                DataSource::NoStorage(data_source) => data_source.sync_status().await,
            }
        }

        async fn get_header_window(
            &self,
            start: impl Into<WindowStart<MockTypes>> + Send + Sync,
            end: u64,
            limit: usize,
        ) -> QueryResult<TimeWindowQueryData<Header<MockTypes>>> {
            match self {
                DataSource::Sql(data_source) => {
                    data_source.get_header_window(start, end, limit).await
                }
                DataSource::NoStorage(data_source) => {
                    data_source.get_header_window(start, end, limit).await
                }
            }
        }
    }
}

// These tests run the `postgres` Docker image, which doesn't work on Windows.
#[cfg(all(test, not(target_os = "windows")))]
mod test {
    use super::testing::DataSource;
    use crate::data_source::{availability_tests, status_tests};

    // For some reason this is the only way to import the macro defined in another module of this
    // crate.
    use crate::*;

    instantiate_availability_tests!(DataSource);
    instantiate_status_tests!(DataSource);
}
