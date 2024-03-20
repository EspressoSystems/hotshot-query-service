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

//! The HotShot Query Service is a minimal, generic query service that can be integrated into any
//! decentralized application running on the [hotshot] consensus layer. It provides all the features
//! that HotShot itself expects of a query service (such as providing consensus-related data for
//! catchup and synchronization) as well as some application-level features that deal only with
//! consensus-related or application-agnostic data. In addition, the query service is provided as an
//! extensible library, which makes it easy to add additional, application-specific features.
//!
//! # Basic usage
//!
//! ```
//! # use hotshot::types::SystemContextHandle;
//! # use hotshot_query_service::testing::mocks::{
//! #   MockNodeImpl as AppNodeImpl, MockTypes as AppTypes,
//! # };
//! # use hotshot_types::consensus::ConsensusMetricsValue;
//! # use std::path::Path;
//! # async fn doc(storage_path: &std::path::Path) -> Result<(), hotshot_query_service::Error> {
//! use hotshot_query_service::{
//!     availability,
//!     data_source::{FileSystemDataSource, UpdateDataSource, VersionedDataSource},
//!     fetching::provider::NoFetching,
//!     node,
//!     status::UpdateStatusData,
//!     status, Error
//! };
//!
//! use async_std::{sync::{Arc, RwLock}, task::spawn};
//! use futures::StreamExt;
//! use hotshot_types::constants::{Version01, STATIC_VER_0_1};
//! use hotshot::SystemContext;
//! use tide_disco::App;
//!
//! // Create or open a data source.
//! let data_source = FileSystemDataSource::<AppTypes, NoFetching>::create(storage_path, NoFetching)
//!     .await
//!     .map_err(Error::internal)?;
//!
//! // Create hotshot, giving it a handle to the status metrics.
//! let hotshot = SystemContext::<AppTypes, AppNodeImpl>::init(
//! #   panic!(), panic!(), panic!(), panic!(), panic!(), panic!(), panic!(),
//!     ConsensusMetricsValue::new(&*data_source.populate_metrics()), panic!(),
//!     // Other fields omitted
//! ).await.map_err(Error::internal)?.0;
//!
//! // Create API modules.
//! let availability_api = availability::define_api(&Default::default(), STATIC_VER_0_1)
//!     .map_err(Error::internal)?;
//! let node_api = node::define_api(&Default::default(), STATIC_VER_0_1)
//!     .map_err(Error::internal)?;
//! let status_api = status::define_api(&Default::default(), STATIC_VER_0_1)
//!     .map_err(Error::internal)?;
//!
//! // Create app. We wrap `data_source` into an `RwLock` so we can share it with the web server.
//! let data_source = Arc::new(RwLock::new(data_source));
//! let mut app = App::<_, Error, Version01>::with_state(data_source.clone());
//! app
//!     .register_module("availability", availability_api)
//!     .map_err(Error::internal)?
//!     .register_module("node", node_api)
//!     .map_err(Error::internal)?
//!     .register_module("status", status_api)
//!     .map_err(Error::internal)?;
//!
//! // Serve app.
//! spawn(app.serve("0.0.0.0:8080", STATIC_VER_0_1));
//!
//! // Update query data using HotShot events.
//! let mut events = hotshot.get_event_stream();
//! while let Some(event) = events.next().await {
//!     // Re-lock the mutex each time we get a new event.
//!     let mut data_source = data_source.write().await;
//!
//!     // Update the query data based on this event.
//!     data_source.update(&event);
//!     data_source.commit().await.map_err(Error::internal)?;
//! }
//! # Ok(())
//! # }
//! ```
//!
//! Shortcut for starting an out-of-the-box service with no extensions (does exactly the above and
//! nothing more):
//!
//! ```
//! # use async_std::task::spawn;
//! # use hotshot::types::SystemContextHandle;
//! # use hotshot_types::constants::STATIC_VER_0_1;
//! # use hotshot_query_service::{data_source::FileSystemDataSource, Error, Options};
//! # use hotshot_query_service::fetching::provider::NoFetching;
//! # use hotshot_query_service::testing::mocks::{MockNodeImpl, MockTypes};
//! # use std::path::Path;
//! # async fn doc(storage_path: &Path, options: Options, hotshot: SystemContextHandle<MockTypes, MockNodeImpl>) -> Result<(), Error> {
//! use hotshot_query_service::run_standalone_service;
//!
//! let data_source = FileSystemDataSource::create(storage_path, NoFetching).await.map_err(Error::internal)?;
//! spawn(run_standalone_service(options, data_source, hotshot, STATIC_VER_0_1));
//! # Ok(())
//! # }
//! ```
//!
//! # Persistence
//!
//! Naturally, an archival query service such as this is heavily dependent on a persistent storage
//! implementation. The APIs provided by this query service are generic over the specific type of
//! the persistence layer, which we call a _data source_. This crate provides several data source
//! implementations in the [`data_source`] module.
//!
//! # Interaction with other components
//!
//! While the HotShot Query Service [can be used as a standalone service](run_standalone_service),
//! it is designed to be used as a single component of a larger service consisting of several other
//! interacting components. This interaction has two dimensions:
//! * _extension_, adding new functionality to the API modules provided by this crate
//! * _composition_, combining the API modules from this crate with other, application-specific API
//!   modules to create a single [tide_disco] API
//!
//! ## Extension
//!
//! It is possible to add new functionality directly to the modules provided by this create. This
//! allows you to keep semantically related functionality grouped together in a single API module,
//! for interface purposes, even while some of the functionality of that module is provided by this
//! crate and some of it is an application-specific extension.
//!
//! For example, consider an application which is a UTXO-based blockchain. Each transaction consists
//! of a handful of new _output records_, and you want your query service to provide an API for
//! looking up a specific output by its index. Semantically, this functionality belongs in the
//! _data availability_ API, however it is application-specific -- HotShot itself makes no
//! assumptions and provides no guarantees about the internal structure of a transaction. In order
//! to expose this UTXO-specific functionality as well as the generic data availability
//! functionality provided by this crate as part of the same public API, you can extend the
//! [availability] module of this crate with additional data structures and endpoints that know
//! about the internal structure of your transactions.
//!
//! There are two parts to adding additional functionality to a module in this crate: adding the
//! required additional data structures to the data source, and creating a new API endpoint to
//! expose the functionality. The mechanism for the former will depend on the specific data source
//! you are using. Check the documentation for your data source implementation to see how it can be
//! extended.
//!
//! For the latter, you can modify the default availablity API with the addition of a new endpoint
//! that accesses the custom state you have added to the data source. It is good practice to define
//! a trait for accessing this custom state, so that if you want to switch data sources in the
//! future, you can easily extend the new data source, implement the trait, and then transparently
//! replace the data source that you use to set up your API. In the case of
//! adding a UTXO index, this trait might look like this:
//!
//! ```
//! # use hotshot_query_service::{
//! #   availability::{AvailabilityDataSource, TransactionIndex},
//! #   testing::mocks::MockTypes as AppTypes,
//! # };
//! use async_trait::async_trait;
//!
//! #[async_trait]
//! trait UtxoDataSource: AvailabilityDataSource<AppTypes> {
//!     // Index mapping UTXO index to (block index, transaction index, output index)
//!     async fn find_utxo(&self, utxo: u64) -> Option<(usize, TransactionIndex<AppTypes>, usize)>;
//! }
//! ```
//!
//! Implement this trait for the extended data source you're using, and then add a new endpoint to
//! the availability API like so:
//!
//! ```
//! # use async_std::sync::RwLock;
//! # use async_trait::async_trait;
//! # use futures::FutureExt;
//! # use hotshot_types::constants::STATIC_VER_0_1;
//! # use hotshot_query_service::availability::{
//! #   self, AvailabilityDataSource, FetchBlockSnafu, TransactionIndex,
//! # };
//! # use hotshot_query_service::testing::mocks::MockTypes as AppTypes;
//! # use hotshot_query_service::Error;
//! # use snafu::ResultExt;
//! # use tide_disco::{api::ApiError, method::ReadState, Api, App, StatusCode};
//! # use versioned_binary_serialization::version::StaticVersionType;
//! # #[async_trait]
//! # trait UtxoDataSource: AvailabilityDataSource<AppTypes> {
//! #   async fn find_utxo(&self, utxo: u64) -> Option<(usize, TransactionIndex<AppTypes>, usize)>;
//! # }
//!
//! fn define_app_specific_availability_api<State, Ver: StaticVersionType + 'static>(
//!     options: &availability::Options,
//!     bind_version: Ver,
//! ) -> Result<Api<State, availability::Error, Ver>, ApiError>
//! where
//!     State: 'static + Send + Sync + ReadState,
//!     <State as ReadState>::State: UtxoDataSource + Send + Sync,
//! {
//!     let mut api = availability::define_api(options, bind_version)?;
//!     api.get("get_utxo", |req, state: &<State as ReadState>::State| async move {
//!         let utxo_index = req.integer_param("index")?;
//!         let (block_index, txn_index, output_index) = state
//!             .find_utxo(utxo_index)
//!             .await
//!             .ok_or_else(|| availability::Error::Custom {
//!                 message: format!("no such UTXO {}", utxo_index),
//!                 status: StatusCode::NotFound,
//!             })?;
//!         let block = state
//!             .get_block(block_index)
//!             .await
//!             .context(FetchBlockSnafu { resource: block_index.to_string() })?;
//!         let txn = block.transaction(&txn_index).unwrap();
//!         let utxo = // Application-specific logic to extract a UTXO from a transaction.
//! #           todo!();
//!         Ok(utxo)
//!     }.boxed())?;
//!     Ok(api)
//! }
//!
//! fn init_server<D: UtxoDataSource + Send + Sync + 'static, Ver: StaticVersionType + 'static>(
//!     options: &availability::Options,
//!     data_source: D,
//!     bind_version: Ver,
//! ) -> Result<App<RwLock<D>, Error, Ver>, availability::Error> {
//!     let api = define_app_specific_availability_api(options, bind_version)
//!         .map_err(availability::Error::internal)?;
//!     let mut app = App::<_, _, Ver>::with_state(RwLock::new(data_source));
//!     app.register_module("availability", api).map_err(availability::Error::internal)?;
//!     Ok(app)
//! }
//! ```
//!
//! Now you need to define the new route, `get_utxo`, in your API specification. Create a file
//! `app_specific_availability.toml`:
//!
//! ```toml
//! [route.get_utxo]
//! PATH = ["utxo/:index"]
//! ":index" = "Integer"
//! DOC = "Get a UTXO by its index"
//! ```
//!
//! and make sure `options.extensions` includes `"app_specific_availability.toml"`.
//!
//! ## Composition
//!
//! Composing the modules provided by this crate with other, unrelated modules to create a unified
//! service is fairly simple, as most of the complexity is handled by [tide_disco], which already
//! provides a mechanism for composing several modules into a single application. In principle, all
//! you need to do is register the [availability], [node], and [status] APIs provided by this crate
//! with a [tide_disco::App], and then register your own API modules with the same app.
//!
//! The one wrinkle is that all modules within a [tide_disco] app must share the same state type. It
//! is for this reason that the modules provided by this crate are generic on the state type --
//! [availability::define_api], [node::define_api], and [status::define_api] can all work with any
//! state type, provided that type implements the corresponding data source traits. The data sources
//! provided by this crate implement these traits, but if you want to use a custom state type that
//! includes state for other modules, you will need to implement these traits for your custom type.
//! The basic pattern looks like this:
//!
//! ```
//! # use async_trait::async_trait;
//! # use hotshot_query_service::{Header, QueryResult, VidShare};
//! # use hotshot_query_service::availability::{
//! #   AvailabilityDataSource, BlockId, BlockQueryData, Fetch, LeafId, LeafQueryData,
//! #   PayloadQueryData, TransactionHash, TransactionIndex, VidCommonQueryData,
//! # };
//! # use hotshot_query_service::metrics::PrometheusMetrics;
//! # use hotshot_query_service::node::{
//! #   NodeDataSource, SyncStatus, TimeWindowQueryData, WindowStart,
//! # };
//! # use hotshot_query_service::status::StatusDataSource;
//! # use hotshot_query_service::testing::mocks::MockTypes as AppTypes;
//! # use std::ops::RangeBounds;
//! # type AppQueryData = ();
//! // Our AppState takes an underlying data source `D` which already implements the relevant
//! // traits, and adds some state for use with other modules.
//! struct AppState<D> {
//!     hotshot_qs: D,
//!     // additional state for other modules
//! }
//!
//! // Implement data source trait for availability API by delegating to the underlying data source.
//! #[async_trait]
//! impl<D: AvailabilityDataSource<AppTypes> + Send + Sync>
//!     AvailabilityDataSource<AppTypes> for AppState<D>
//! {
//!     type LeafRange<R> = D::LeafRange<R>
//!     where
//!         R: RangeBounds<usize> + Send;
//!     type BlockRange<R> = D::BlockRange<R>
//!     where
//!         R: RangeBounds<usize> + Send;
//!     type PayloadRange<R> = D::PayloadRange<R>
//!     where
//!         R: RangeBounds<usize> + Send;
//!     type VidCommonRange<R> = D::VidCommonRange<R>
//!     where
//!         R: RangeBounds<usize> + Send;
//!
//!     async fn get_leaf<ID>(&self, id: ID) -> Fetch<LeafQueryData<AppTypes>>
//!     where
//!         ID: Into<LeafId<AppTypes>> + Send + Sync,
//!     {
//!         self.hotshot_qs.get_leaf(id).await
//!     }
//!
//!     // etc
//! #   async fn get_block<ID>(&self, id: ID) -> Fetch<BlockQueryData<AppTypes>>
//! #   where
//! #       ID: Into<BlockId<AppTypes>> + Send + Sync { todo!() }
//! #   async fn get_payload<ID>(&self, id: ID) -> Fetch<PayloadQueryData<AppTypes>>
//! #   where
//! #       ID: Into<BlockId<AppTypes>> + Send + Sync { todo!() }
//! #   async fn get_vid_common<ID>(&self, id: ID) -> Fetch<VidCommonQueryData<AppTypes>>
//! #   where
//! #       ID: Into<BlockId<AppTypes>> + Send + Sync { todo!() }
//! #   async fn get_block_with_transaction(&self, hash: TransactionHash<AppTypes>) -> Fetch<(BlockQueryData<AppTypes>, TransactionIndex<AppTypes>)> { todo!() }
//! #   async fn get_leaf_range<R>(&self, range: R) -> Self::LeafRange<R>
//! #   where
//! #       R: RangeBounds<usize> + Send { todo!() }
//! #   async fn get_block_range<R>(&self, range: R) -> Self::BlockRange<R>
//! #   where
//! #       R: RangeBounds<usize> + Send { todo!() }
//! #   async fn get_payload_range<R>(&self, range: R) -> Self::PayloadRange<R>
//! #   where
//! #       R: RangeBounds<usize> + Send { todo!() }
//! #   async fn get_vid_common_range<R>(&self, range: R) -> Self::VidCommonRange<R>
//! #   where
//! #       R: RangeBounds<usize> + Send { todo!() }
//! }
//!
//! // Implement data source trait for node API by delegating to the underlying data source.
//! #[async_trait]
//! impl<D: NodeDataSource<AppTypes> + Send + Sync> NodeDataSource<AppTypes> for AppState<D> {
//!     async fn block_height(&self) -> QueryResult<usize> {
//!         self.hotshot_qs.block_height().await
//!     }
//!
//!     async fn count_transactions(&self) -> QueryResult<usize> {
//!         self.hotshot_qs.count_transactions().await
//!     }
//!
//!     async fn payload_size(&self) -> QueryResult<usize> {
//!         self.hotshot_qs.payload_size().await
//!     }
//!
//!     async fn vid_share<ID>(&self, id: ID) -> QueryResult<VidShare>
//!     where
//!         ID: Into<BlockId<AppTypes>> + Send + Sync,
//!     {
//!         self.hotshot_qs.vid_share(id).await
//!     }
//!
//!     async fn sync_status(&self) -> QueryResult<SyncStatus> {
//!         self.hotshot_qs.sync_status().await
//!     }
//!
//!     async fn get_header_window(
//!         &self,
//!         start: impl Into<WindowStart<AppTypes>> + Send + Sync,
//!         end: u64,
//!     ) -> QueryResult<TimeWindowQueryData<Header<AppTypes>>> {
//!         self.hotshot_qs.get_header_window(start, end).await
//!     }
//! }
//!
//! // Implement data source trait for status API by delegating to the underlying data source.
//! #[async_trait]
//! impl<D: StatusDataSource + Send + Sync> StatusDataSource for AppState<D> {
//!     async fn block_height(&self) -> QueryResult<usize> {
//!         self.hotshot_qs.block_height().await
//!     }
//!
//!     fn metrics(&self) -> &PrometheusMetrics {
//!         self.hotshot_qs.metrics()
//!     }
//! }
//!
//! // Implement data source traits for other modules, using additional state from AppState.
//! ```
//!
//! In the future, we may provide derive macros for
//! [AvailabilityDataSource](availability::AvailabilityDataSource),
//! [NodeDataSource](node::NodeDataSource), and [StatusDataSource](status::StatusDataSource) to
//! eliminate the boilerplate of implementing them for a custom type that has an existing
//! implementation as one of its fields.
//!
//! Once you have created your `AppState` type aggregating the state for each API module, you can
//! initialize the state as normal, instantiating `D` with a concrete implementation of a data
//! source and initializing `hotshot_qs` as you normally would that data source.
//!
//! _However_, this only works if you want the persistent storage for the availability and node
//! modules (managed by `hotshot_qs`) to be independent of the persistent storage for other modules.
//! You may well want to synchronize the storage for all modules together, so that updates to the
//! entire application state can be done atomically. This is particularly relevant if one of your
//! application-specific modules updates its storage based on a stream of HotShot leaves. Since the
//! availability and node modules also update with each new leaf, you probably want all of these
//! modules to stay in sync. The data source implementations provided by this crate provide means by
//! which you can add additional data to the same persistent store and synchronize the entire store
//! together. Refer to the documentation for you specific data source for information on how to
//! achieve this.
//!

mod api;
pub mod availability;
pub mod data_source;
mod error;
pub mod fetching;
pub mod merklized_state;
pub mod metrics;
pub mod node;
mod resolvable;
pub mod status;
mod task;
pub mod testing;
pub mod types;

pub use error::Error;
pub use resolvable::Resolvable;

use async_std::sync::{Arc, RwLock};
use futures::StreamExt;
use hotshot::types::SystemContextHandle;
use hotshot_types::traits::{
    node_implementation::{NodeImplementation, NodeType},
    BlockPayload,
};
use serde::{Deserialize, Serialize};
use snafu::Snafu;
use task::BackgroundTask;
use tide_disco::{App, StatusCode};
use versioned_binary_serialization::version::StaticVersionType;

pub use hotshot_types::{
    data::Leaf,
    vid::{VidCommitment, VidCommon, VidShare},
};

pub type Payload<Types> = <Types as NodeType>::BlockPayload;
pub type Header<Types> = <Types as NodeType>::BlockHeader;
pub type Metadata<Types> = <Payload<Types> as BlockPayload>::Metadata;
/// Item within a [`Payload`].
pub type Transaction<Types> = <Payload<Types> as BlockPayload>::Transaction;
pub type SignatureKey<Types> = <Types as NodeType>::SignatureKey;

#[derive(Clone, Debug, Snafu, Deserialize, Serialize)]
#[snafu(visibility(pub))]
pub enum QueryError {
    /// The requested resource does not exist or is not known to this query service.
    NotFound,
    /// The requested resource exists but is not currently available.
    ///
    /// In most cases a missing resource can be recovered from DA.
    Missing,
    /// There was an error while trying to fetch the requested resource.
    #[snafu(display("Failed to fetch requested resource: {message}"))]
    Error { message: String },
}

impl QueryError {
    pub fn status(&self) -> StatusCode {
        match self {
            Self::NotFound | Self::Missing => StatusCode::NotFound,
            Self::Error { .. } => StatusCode::InternalServerError,
        }
    }
}

pub type QueryResult<T> = Result<T, QueryError>;

#[derive(clap::Args, Default)]
pub struct Options {
    #[clap(flatten)]
    pub availability: availability::Options,
    #[clap(flatten)]
    pub node: node::Options,
    #[clap(flatten)]
    pub status: status::Options,
    #[clap(short, long, default_value = "8080")]
    pub port: u16,
}

/// Run an instance of the HotShot Query service with no customization.
pub async fn run_standalone_service<Types: NodeType, I: NodeImplementation<Types>, D, Ver>(
    options: Options,
    data_source: D,
    hotshot: SystemContextHandle<Types, I>,
    bind_version: Ver,
) -> Result<(), Error>
where
    Payload<Types>: availability::QueryablePayload,
    Header<Types>: availability::QueryableHeader<Types>,
    D: availability::AvailabilityDataSource<Types>
        + node::NodeDataSource<Types>
        + status::StatusDataSource
        + data_source::UpdateDataSource<Types>
        + data_source::VersionedDataSource
        + Send
        + Sync
        + 'static,
    Ver: StaticVersionType + 'static,
{
    // Create API modules.
    let availability_api =
        availability::define_api(&options.availability, bind_version).map_err(Error::internal)?;
    let node_api = node::define_api(&options.node, bind_version).map_err(Error::internal)?;
    let status_api = status::define_api(&options.status, bind_version).map_err(Error::internal)?;

    // Create app. We wrap `data_source` into an `RwLock` so we can share it with the web server.
    let data_source = Arc::new(RwLock::new(data_source));
    let mut app = App::<_, Error, Ver>::with_state(data_source.clone());
    app.register_module("availability", availability_api)
        .map_err(Error::internal)?
        .register_module("node", node_api)
        .map_err(Error::internal)?
        .register_module("status", status_api)
        .map_err(Error::internal)?;

    // Serve app.
    let url = format!("0.0.0.0:{}", options.port);
    let _server =
        BackgroundTask::spawn("server", async move { app.serve(&url, bind_version).await });

    // Subscribe to events before starting consensus, so we don't miss any events.
    let mut events = hotshot.get_event_stream();
    hotshot.hotshot.start_consensus().await;

    // Update query data using HotShot events.
    while let Some(event) = events.next().await {
        // Re-lock the mutex each time we get a new event.
        let mut data_source = data_source.write().await;

        // Update the query data based on this event.
        data_source.update(&event).await.map_err(Error::internal)?;
        data_source.commit().await.map_err(Error::internal)?;
    }

    Ok(())
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::{
        availability::{
            AvailabilityDataSource, BlockId, BlockQueryData, Fetch, LeafId, LeafQueryData,
            PayloadQueryData, TransactionHash, TransactionIndex, UpdateAvailabilityData,
            VidCommonQueryData,
        },
        metrics::PrometheusMetrics,
        node::{NodeDataSource, SyncStatus, TimeWindowQueryData, WindowStart},
        status::StatusDataSource,
        testing::{
            consensus::MockDataSource,
            mocks::{MockHeader, MockPayload, MockTypes},
        },
    };
    use async_std::sync::RwLock;
    use async_trait::async_trait;
    use atomic_store::{load_store::BincodeLoadStore, AtomicStore, AtomicStoreLoader, RollingLog};

    use futures::FutureExt;
    use hotshot_example_types::state_types::TestInstanceState;
    use hotshot_types::constants::{Version01, STATIC_VER_0_1};
    use portpicker::pick_unused_port;
    use std::ops::RangeBounds;
    use std::time::Duration;
    use surf_disco::Client;
    use tempfile::TempDir;
    use tide_disco::App;
    use toml::toml;

    struct CompositeState {
        store: AtomicStore,
        hotshot_qs: MockDataSource,
        module_state: RollingLog<BincodeLoadStore<u64>>,
    }

    #[async_trait]
    impl AvailabilityDataSource<MockTypes> for CompositeState {
        type LeafRange<R> =
            <MockDataSource as AvailabilityDataSource<
                MockTypes,
            >>::LeafRange<R>
        where
            R: RangeBounds<usize> + Send;
        type BlockRange<R> =
            <MockDataSource as AvailabilityDataSource<
                MockTypes,
            >>::BlockRange<R>
        where
            R: RangeBounds<usize> + Send;
        type PayloadRange<R> =
            <MockDataSource as AvailabilityDataSource<
                MockTypes,
            >>::PayloadRange<R>
        where
            R: RangeBounds<usize> + Send;
        type VidCommonRange<R> =
            <MockDataSource as AvailabilityDataSource<
                MockTypes,
            >>::VidCommonRange<R>
        where
            R: RangeBounds<usize> + Send;

        async fn get_leaf<ID>(&self, id: ID) -> Fetch<LeafQueryData<MockTypes>>
        where
            ID: Into<LeafId<MockTypes>> + Send + Sync,
        {
            self.hotshot_qs.get_leaf(id).await
        }
        async fn get_block<ID>(&self, id: ID) -> Fetch<BlockQueryData<MockTypes>>
        where
            ID: Into<BlockId<MockTypes>> + Send + Sync,
        {
            self.hotshot_qs.get_block(id).await
        }
        async fn get_payload<ID>(&self, id: ID) -> Fetch<PayloadQueryData<MockTypes>>
        where
            ID: Into<BlockId<MockTypes>> + Send + Sync,
        {
            self.hotshot_qs.get_payload(id).await
        }
        async fn get_vid_common<ID>(&self, id: ID) -> Fetch<VidCommonQueryData<MockTypes>>
        where
            ID: Into<BlockId<MockTypes>> + Send + Sync,
        {
            self.hotshot_qs.get_vid_common(id).await
        }
        async fn get_leaf_range<R>(&self, range: R) -> Self::LeafRange<R>
        where
            R: RangeBounds<usize> + Send + 'static,
        {
            self.hotshot_qs.get_leaf_range(range).await
        }
        async fn get_block_range<R>(&self, range: R) -> Self::BlockRange<R>
        where
            R: RangeBounds<usize> + Send + 'static,
        {
            self.hotshot_qs.get_block_range(range).await
        }
        async fn get_payload_range<R>(&self, range: R) -> Self::PayloadRange<R>
        where
            R: RangeBounds<usize> + Send + 'static,
        {
            self.hotshot_qs.get_payload_range(range).await
        }
        async fn get_vid_common_range<R>(&self, range: R) -> Self::VidCommonRange<R>
        where
            R: RangeBounds<usize> + Send + 'static,
        {
            self.hotshot_qs.get_vid_common_range(range).await
        }
        async fn get_block_with_transaction(
            &self,
            hash: TransactionHash<MockTypes>,
        ) -> Fetch<(BlockQueryData<MockTypes>, TransactionIndex<MockTypes>)> {
            self.hotshot_qs.get_block_with_transaction(hash).await
        }
    }

    // Imiplement data source trait for node API.
    #[async_trait]
    impl NodeDataSource<MockTypes> for CompositeState {
        async fn block_height(&self) -> QueryResult<usize> {
            StatusDataSource::block_height(self).await
        }
        async fn count_transactions(&self) -> QueryResult<usize> {
            self.hotshot_qs.count_transactions().await
        }
        async fn payload_size(&self) -> QueryResult<usize> {
            self.hotshot_qs.payload_size().await
        }
        async fn vid_share<ID>(&self, id: ID) -> QueryResult<VidShare>
        where
            ID: Into<BlockId<MockTypes>> + Send + Sync,
        {
            self.hotshot_qs.vid_share(id).await
        }
        async fn sync_status(&self) -> QueryResult<SyncStatus> {
            self.hotshot_qs.sync_status().await
        }
        async fn get_header_window(
            &self,
            start: impl Into<WindowStart<MockTypes>> + Send + Sync,
            end: u64,
        ) -> QueryResult<TimeWindowQueryData<Header<MockTypes>>> {
            self.hotshot_qs.get_header_window(start, end).await
        }
    }

    // Implement data source trait for status API.
    #[async_trait]
    impl StatusDataSource for CompositeState {
        async fn block_height(&self) -> QueryResult<usize> {
            StatusDataSource::block_height(&self.hotshot_qs).await
        }
        fn metrics(&self) -> &PrometheusMetrics {
            self.hotshot_qs.metrics()
        }
    }

    #[async_std::test]
    async fn test_composition() {
        let dir = TempDir::with_prefix("test_composition").unwrap();
        let mut loader = AtomicStoreLoader::create(dir.path(), "test_composition").unwrap();
        let mut hotshot_qs = MockDataSource::create_with_store(&mut loader, Default::default())
            .await
            .unwrap();

        // Mock up some data and add a block to the store.
        let leaf = Leaf::<MockTypes>::genesis(&TestInstanceState {});
        let block = BlockQueryData::new(leaf.block_header.clone(), MockPayload::genesis());
        hotshot_qs.insert_block(block.clone()).await.unwrap();

        let module_state =
            RollingLog::create(&mut loader, Default::default(), "module_state", 1024).unwrap();
        let state = CompositeState {
            hotshot_qs,
            module_state,
            store: AtomicStore::open(loader).unwrap(),
        };

        let module_spec = toml! {
            [route.post_ext]
            PATH = ["/ext/:val"]
            METHOD = "POST"
            ":val" = "Integer"

            [route.get_ext]
            PATH = ["/ext"]
            METHOD = "GET"
        };

        let mut app = App::<_, Error, Version01>::with_state(RwLock::new(state));
        app.register_module(
            "availability",
            availability::define_api(&Default::default(), STATIC_VER_0_1).unwrap(),
        )
        .unwrap()
        .register_module(
            "node",
            node::define_api(&Default::default(), STATIC_VER_0_1).unwrap(),
        )
        .unwrap()
        .register_module(
            "status",
            status::define_api(&Default::default(), STATIC_VER_0_1).unwrap(),
        )
        .unwrap()
        .module::<Error>("mod", module_spec)
        .unwrap()
        .get("get_ext", |_, state| {
            async move { state.module_state.load_latest().map_err(Error::internal) }.boxed()
        })
        .unwrap()
        .post("post_ext", |req, state| {
            async move {
                state
                    .module_state
                    .store_resource(&req.integer_param("val").map_err(Error::internal)?)
                    .map_err(Error::internal)?;
                state
                    .module_state
                    .commit_version()
                    .map_err(Error::internal)?;
                state
                    .hotshot_qs
                    .skip_version()
                    .await
                    .map_err(Error::internal)?;
                state.store.commit_version().map_err(Error::internal)
            }
            .boxed()
        })
        .unwrap();

        let port = pick_unused_port().unwrap();
        let _server = BackgroundTask::spawn(
            "server",
            app.serve(format!("0.0.0.0:{}", port), STATIC_VER_0_1),
        );

        let client =
            Client::<Error, Version01>::new(format!("http://localhost:{}", port).parse().unwrap());
        assert!(client.connect(Some(Duration::from_secs(60))).await);

        client.post::<()>("mod/ext/42").send().await.unwrap();
        assert_eq!(client.get::<u64>("mod/ext").send().await.unwrap(), 42);

        // Check that we can still access the built-in modules.
        assert_eq!(
            client
                .get::<u64>("status/block-height")
                .send()
                .await
                .unwrap(),
            1
        );
        let sync_status: SyncStatus = client.get("node/sync-status").send().await.unwrap();
        assert!(sync_status.is_fully_synced(), "{sync_status:?}");
        assert_eq!(
            client
                .get::<MockHeader>("availability/header/0")
                .send()
                .await
                .unwrap()
                .block_number,
            0
        );
    }
}
