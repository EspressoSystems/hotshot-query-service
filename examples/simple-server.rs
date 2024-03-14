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

//! Simple HotShot query server
//!
//! This example demonstrates the most basic usage of hotshot-query-service. It starts a small
//! consensus network with two nodes and connects a query service to each node. It runs each query
//! server on local host. The program continues until it is manually killed.

use async_compatibility_layer::logging::{setup_backtrace, setup_logging};
use async_std::sync::Arc;
use clap::Parser;
use futures::future::{join_all, try_join_all};
use hotshot::{
    traits::implementations::{MasterMap, MemoryNetwork, MemoryStorage, NetworkingMetricsValue},
    types::{SignatureKey, SystemContextHandle},
    HotShotInitializer, Memberships, Networks, SystemContext,
};
use hotshot_example_types::state_types::TestInstanceState;
use hotshot_query_service::{
    data_source,
    fetching::provider::NoFetching,
    run_standalone_service,
    status::UpdateStatusData,
    testing::{
        consensus::DataSourceLifeCycle,
        mocks::{MockMembership, MockNodeImpl, MockTypes},
    },
    Error,
};
use hotshot_types::{
    consensus::ConsensusMetricsValue, light_client::StateKeyPair, signature_key::BLSPubKey,
    traits::election::Membership, ExecutionType, HotShotConfig, PeerConfig, ValidatorConfig,
};
use std::{num::NonZeroUsize, time::Duration};

const NUM_NODES: usize = 2;

#[derive(Parser)]
struct Options {
    /// Port on which to host the query service for the first consensus node.
    #[clap(long, default_value = "18080")]
    port1: u16,

    /// Port on which to host the query service for the second consensus node.
    #[clap(long, default_value = "28080")]
    port2: u16,
}

#[cfg(not(target_os = "windows"))]
type DataSource = data_source::SqlDataSource<MockTypes, NoFetching>;

// To use SqlDataSource, we need to run the `postgres` Docker image, which doesn't work on Windows.
#[cfg(target_os = "windows")]
type DataSource = data_source::FileSystemDataSource<MockTypes, NoFetching>;

type Db = <DataSource as DataSourceLifeCycle>::Storage;

#[cfg(not(target_os = "windows"))]
async fn init_db() -> Db {
    Db::init().await
}

#[cfg(target_os = "windows")]
async fn init_db() -> Db {
    Db::with_prefix("simple-server-db").unwrap()
}

#[cfg(not(target_os = "windows"))]
async fn init_data_source(db: &Db) -> DataSource {
    data_source::sql::Config::default()
        .user("postgres")
        .password("password")
        .port(db.port())
        .connect(Default::default())
        .await
        .unwrap()
}

#[cfg(target_os = "windows")]
async fn init_data_source(db: &Db) -> DataSource {
    DataSource::create(db.path(), Default::default())
        .await
        .unwrap()
}

#[async_std::main]
async fn main() -> Result<(), Error> {
    setup_logging();
    setup_backtrace();

    let opt = Options::parse();

    // Start databases for the query services.
    let dbs = join_all((0..NUM_NODES).map(|_| init_db())).await;

    // Create the data sources for the query services.
    let data_sources = join_all(dbs.iter().map(init_data_source)).await;

    // Start consensus.
    let nodes = init_consensus(&data_sources).await;

    // Start the servers.
    try_join_all(
        data_sources
            .into_iter()
            .zip(nodes)
            .zip([opt.port1, opt.port2])
            .map(|((data_source, node), port)| async move {
                let opt = hotshot_query_service::Options {
                    port,
                    ..Default::default()
                };
                run_standalone_service(opt, data_source, node).await
            }),
    )
    .await?;

    Ok(())
}

async fn init_consensus(
    data_sources: &[DataSource],
) -> Vec<SystemContextHandle<MockTypes, MockNodeImpl>> {
    let (pub_keys, priv_keys): (Vec<_>, Vec<_>) = (0..data_sources.len())
        .map(|i| BLSPubKey::generated_from_seed_indexed([0; 32], i as u64))
        .unzip();
    let state_key_pairs = (0..data_sources.len())
        .map(|i| StateKeyPair::generate_from_seed_indexed([0; 32], i as u64))
        .collect::<Vec<_>>();
    let master_map = MasterMap::new();
    let known_nodes_with_stake = pub_keys
        .iter()
        .zip(&state_key_pairs)
        .map(|(pub_key, state_key_pair)| PeerConfig::<BLSPubKey> {
            stake_table_entry: pub_key.get_stake_table_entry(1u64),
            state_ver_key: state_key_pair.ver_key(),
        })
        .collect::<Vec<_>>();
    let config = HotShotConfig {
        num_nodes_with_stake: NonZeroUsize::new(pub_keys.len()).unwrap(),
        num_nodes_without_stake: 0,
        known_nodes_with_stake: known_nodes_with_stake.clone(),
        known_nodes_without_stake: vec![],
        start_delay: 0,
        round_start_delay: 0,
        next_view_timeout: 10000,
        timeout_ratio: (11, 10),
        propose_min_round_time: Duration::from_secs(0),
        propose_max_round_time: Duration::from_secs(2),
        min_transactions: 1,
        max_transactions: NonZeroUsize::new(100).unwrap(),
        num_bootstrap: 0,
        execution_type: ExecutionType::Continuous,
        election_config: None,
        da_staked_committee_size: pub_keys.len(),
        da_non_staked_committee_size: 0,
        my_own_validator_config: Default::default(),
    };
    join_all(priv_keys.into_iter().zip(data_sources).enumerate().map(
        |(node_id, (priv_key, data_source))| {
            let pub_keys = pub_keys.clone();
            let known_nodes_with_stake = known_nodes_with_stake.clone();
            let state_key_pairs = state_key_pairs.clone();
            let mut config = config.clone();
            let master_map = master_map.clone();

            async move {
                config.my_own_validator_config = ValidatorConfig {
                    public_key: pub_keys[node_id],
                    private_key: priv_key.clone(),
                    stake_value: known_nodes_with_stake[node_id]
                        .stake_table_entry
                        .stake_amount
                        .as_u64(),
                    state_key_pair: state_key_pairs[node_id].clone(),
                };

                let election_config = MockMembership::default_election_config(
                    config.num_nodes_with_stake.get() as u64,
                    0,
                );
                let membership = MockMembership::create_election(
                    known_nodes_with_stake.clone(),
                    election_config,
                );
                let memberships = Memberships {
                    quorum_membership: membership.clone(),
                    da_membership: membership.clone(),
                    vid_membership: membership.clone(),
                    view_sync_membership: membership,
                };

                let network = Arc::new(MemoryNetwork::new(
                    pub_keys[node_id],
                    NetworkingMetricsValue::new(&*data_source.populate_metrics()),
                    master_map.clone(),
                    None,
                ));
                let networks = Networks {
                    quorum_network: network.clone(),
                    da_network: network,
                    _pd: Default::default(),
                };

                SystemContext::init(
                    pub_keys[node_id],
                    priv_key,
                    node_id as u64,
                    config,
                    MemoryStorage::empty(),
                    memberships,
                    networks,
                    HotShotInitializer::from_genesis(TestInstanceState {}).unwrap(),
                    ConsensusMetricsValue::new(&*data_source.populate_metrics()),
                )
                .await
                .unwrap()
                .0
            }
        },
    ))
    .await
}
