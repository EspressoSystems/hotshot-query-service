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

use super::mocks::{
    MockDANetwork, MockMembership, MockNodeImpl, MockQuorumNetwork, MockTransaction, MockTypes,
};
use crate::{
    availability::AvailabilityDataSource,
    data_source::{FileSystemDataSource, UpdateDataSource, VersionedDataSource},
    fetching::provider::NoFetching,
    node::NodeDataSource,
    status::{StatusDataSource, UpdateStatusData},
    SignatureKey,
};
use async_std::{
    sync::{Arc, RwLock},
    task::spawn,
};
use async_trait::async_trait;
use futures::{future::join_all, stream::StreamExt};
use hotshot::{
    traits::implementations::{MasterMap, MemoryNetwork, MemoryStorage, NetworkingMetricsValue},
    types::{Event, SystemContextHandle},
    HotShotInitializer, Memberships, Networks, SystemContext,
};
use hotshot_testing::state_types::TestInstanceState;
use hotshot_types::{
    consensus::ConsensusMetricsValue,
    light_client::StateKeyPair,
    signature_key::BLSPubKey,
    traits::{election::Membership, signature_key::SignatureKey as _},
    ExecutionType, HotShotConfig, ValidatorConfig,
};
use std::num::NonZeroUsize;
use std::time::Duration;

struct MockNode<D: DataSourceLifeCycle> {
    hotshot: SystemContextHandle<MockTypes, MockNodeImpl>,
    data_source: Arc<RwLock<D>>,
    storage: D::Storage,
}

pub struct MockNetwork<D: DataSourceLifeCycle> {
    nodes: Vec<MockNode<D>>,
    pub_keys: Vec<BLSPubKey>,
}

// MockNetwork can be used with any DataSourceLifeCycle, but it's nice to have a default with a
// convenient type alias.
pub type MockDataSource = FileSystemDataSource<MockTypes, NoFetching>;

pub const NUM_NODES: usize = 2;

impl<D: DataSourceLifeCycle + UpdateStatusData> MockNetwork<D> {
    pub async fn init() -> Self {
        let (pub_keys, priv_keys): (Vec<_>, Vec<_>) = (0..NUM_NODES)
            .map(|i| BLSPubKey::generated_from_seed_indexed([0; 32], i as u64))
            .unzip();
        let total_nodes = NonZeroUsize::new(pub_keys.len()).unwrap();
        let master_map = MasterMap::new();
        let stake = 1u64;
        let known_nodes_with_stake: Vec<
            <BLSPubKey as hotshot::types::SignatureKey>::StakeTableEntry,
        > = (0..total_nodes.into())
            .map(|id| pub_keys[id].get_stake_table_entry(stake))
            .collect();
        let nodes = join_all(
            priv_keys
                .into_iter()
                .enumerate()
                .map(|(node_id, priv_key)| {
                    let my_own_validator_config = ValidatorConfig {
                        public_key: pub_keys[node_id],
                        private_key: priv_key.clone(),
                        stake_value: stake,
                        state_key_pair: StateKeyPair::generate_from_seed_indexed(
                            [0; 32],
                            node_id as u64,
                        ),
                    };
                    let config = HotShotConfig {
                        total_nodes,
                        known_nodes_with_stake: known_nodes_with_stake.clone(),
                        my_own_validator_config,
                        start_delay: 0,
                        round_start_delay: 0,
                        next_view_timeout: 10000,
                        timeout_ratio: (11, 10),
                        propose_min_round_time: Duration::from_secs(0),
                        propose_max_round_time: Duration::from_millis(500),
                        min_transactions: 1,
                        max_transactions: NonZeroUsize::new(100).unwrap(),
                        num_bootstrap: 0,
                        execution_type: ExecutionType::Continuous,
                        election_config: None,
                        da_committee_size: pub_keys.len(),
                    };

                    let pub_keys = pub_keys.clone();
                    let known_nodes_with_stake = known_nodes_with_stake.clone();
                    let config = config.clone();
                    let master_map = master_map.clone();
                    let election_config =
                        MockMembership::default_election_config(total_nodes.get() as u64);

                    async move {
                        let storage = D::create(node_id).await;
                        let data_source = D::connect(&storage).await;

                        let network = Arc::new(MemoryNetwork::new(
                            pub_keys[node_id],
                            NetworkingMetricsValue::new(&*data_source.populate_metrics()),
                            master_map.clone(),
                            None,
                        ));

                        let networks = Networks {
                            quorum_network: MockQuorumNetwork::new(network.clone()),
                            da_network: MockDANetwork::new(network),
                            _pd: std::marker::PhantomData,
                        };
                        let membership = MockMembership::create_election(
                            known_nodes_with_stake.clone(),
                            election_config.clone(),
                        );

                        let memberships = Memberships {
                            quorum_membership: membership.clone(),
                            da_membership: membership.clone(),
                            vid_membership: membership.clone(),
                            view_sync_membership: membership.clone(),
                        };

                        let (hotshot, _) = SystemContext::init(
                            pub_keys[node_id],
                            priv_key,
                            node_id as u64,
                            config,
                            MemoryStorage::empty(),
                            memberships,
                            networks,
                            HotShotInitializer::from_genesis(&TestInstanceState {}).unwrap(),
                            ConsensusMetricsValue::new(&*data_source.populate_metrics()),
                        )
                        .await
                        .unwrap();
                        MockNode {
                            hotshot,
                            data_source: Arc::new(RwLock::new(data_source)),
                            storage,
                        }
                    }
                }),
        )
        .await;

        let network = Self { nodes, pub_keys };
        D::setup(&network).await;
        network
    }
}

impl<D: DataSourceLifeCycle> MockNetwork<D> {
    pub fn handle(&self) -> SystemContextHandle<MockTypes, MockNodeImpl> {
        self.nodes[0].hotshot.clone()
    }

    pub async fn submit_transaction(&self, tx: MockTransaction) {
        self.handle().submit_transaction(tx).await.unwrap();
    }

    pub fn num_nodes(&self) -> usize {
        self.pub_keys.len()
    }

    pub fn proposer(&self, i: usize) -> SignatureKey<MockTypes> {
        self.pub_keys[i]
    }

    pub fn data_source_index(&self, i: usize) -> Arc<RwLock<D>> {
        self.nodes[i].data_source.clone()
    }

    pub fn data_source(&self) -> Arc<RwLock<D>> {
        self.data_source_index(0)
    }

    pub fn storage(&self) -> &D::Storage {
        &self.nodes[0].storage
    }

    pub async fn shut_down(mut self) {
        self.shut_down_impl().await
    }

    async fn shut_down_impl(&mut self) {
        for mut node in std::mem::take(&mut self.nodes) {
            node.hotshot.shut_down().await;
        }
    }
}

impl<D: DataSourceLifeCycle> MockNetwork<D> {
    pub async fn start(&mut self) {
        // Spawn the update tasks.
        for node in &mut self.nodes {
            let ds = node.data_source.clone();
            let mut events = node.hotshot.get_event_stream(Default::default()).await.0;
            spawn(async move {
                while let Some(event) = events.next().await {
                    tracing::info!("EVENT {:?}", event.event);
                    let mut ds = ds.write().await;
                    ds.handle_event(&event).await;
                }
            });
        }

        join_all(
            self.nodes
                .iter()
                .map(|node| node.hotshot.hotshot.start_consensus()),
        )
        .await;
    }
}

impl<D: DataSourceLifeCycle> Drop for MockNetwork<D> {
    fn drop(&mut self) {
        async_std::task::block_on(self.shut_down_impl())
    }
}

#[async_trait]
pub trait DataSourceLifeCycle: Send + Sync + Sized + 'static {
    /// Backing storage for the data source.
    ///
    /// This can be used to connect to data sources to the same underlying data. It must be kept
    /// alive as long as the related data sources are open.
    type Storage: Send + Sync;

    async fn create(node_id: usize) -> Self::Storage;
    async fn connect(storage: &Self::Storage) -> Self;
    async fn reset(storage: &Self::Storage) -> Self;
    async fn handle_event(&mut self, event: &Event<MockTypes>);

    /// Setup runs after setting up the network but before starting a test.
    async fn setup(_network: &MockNetwork<Self>) {}
}

pub trait TestableDataSource:
    DataSourceLifeCycle
    + AvailabilityDataSource<MockTypes>
    + NodeDataSource<MockTypes>
    + StatusDataSource
    + UpdateDataSource<MockTypes>
    + VersionedDataSource
{
}

impl<T> TestableDataSource for T where
    T: DataSourceLifeCycle
        + AvailabilityDataSource<MockTypes>
        + NodeDataSource<MockTypes>
        + StatusDataSource
        + UpdateDataSource<MockTypes>
        + VersionedDataSource
{
}
