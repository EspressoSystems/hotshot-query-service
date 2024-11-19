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

//! Asynchronous retrieval of missing data.
//!
//! [`FetchingDataSource`] combines a local storage implementation with a remote data availability
//! provider to create a data sources which caches data locally, but which is capable of fetching
//! missing data from a remote source, either proactively or on demand.
//!
//! This implementation supports three kinds of data fetching.
//!
//! # Proactive Fetching
//!
//! Proactive fetching means actively scanning the local database for missing objects and
//! proactively retrieving them from a remote provider, even if those objects have yet to be
//! requested by a client. Doing this increases the chance of success and decreases latency when a
//! client does eventually ask for those objects. This is also the mechanism by which a query
//! service joining a network late, or having been offline for some time, is able to catch up with
//! the events on the network that it missed.
//!
//! The current implementation of proactive fetching is meant to be the simplest effective algorithm
//! which still gives us a reasonable range of configuration options for experimentation. It is
//! subject to change as we learn about the behavior of proactive fetching in a realistic system.
//!
//! Proactive fetching is currently implemented by a background task which performs periodic scans
//! of the database, identifying and retrieving missing objects. This task is generally low
//! priority, since missing objects are rare, and it will take care not to monopolize resources that
//! could be used to serve requests. To reduce load and to optimize for the common case where blocks
//! are usually not missing once they have already been retrieved, we distinguish between _major_
//! and _minor_ scans.
//!
//! Minor scans are lightweight and can run very frequently. They will only look for missing
//! blocks among blocks that are new since the previous scan. Thus, the more frequently minor
//! scans run, the less work they have to do. This allows them to run frequently, giving low
//! latency for retrieval of newly produced blocks that we failed to receive initially. Between
//! each minor scan, the task will sleep for [a configurable
//! duration](Builder::with_minor_scan_interval) to wait for new blocks to be produced and give
//! other tasks full access to all shared resources.
//!
//! Every `n`th scan (`n` is [configurable](Builder::with_major_scan_interval)) is a major scan.
//! These scan all blocks from 0, which guarantees that we will eventually retrieve all blocks, even
//! if for some reason we have lost a block that we previously had (due to storage failures and
//! corruptions, or simple bugs in this software). These scans are rather expensive (although they
//! will release control of shared resources many times during the duration of the scan), but
//! because it is rather unlikely that a major scan will discover any missing blocks that the next
//! minor scan would have missed, it is ok if major scans run very infrequently.
//!
//! # Active Fetching
//!
//! Active fetching means reaching out to a remote data availability provider to retrieve a missing
//! resource, upon receiving a request for that resource from a client. Not every request for a
//! missing resource triggers an active fetch. To avoid spamming peers with requests for missing
//! data, we only actively fetch resources that are known to exist somewhere. This means we can
//! actively fetch leaves and headers when we are requested a leaf or header by height, whose height
//! is less than the current chain height. We can fetch a block when the corresponding header exists
//! (corresponding based on height, hash, or payload hash) or can be actively fetched.
//!
//! # Passive Fetching
//!
//! For requests that cannot be actively fetched (for example, a block requested by hash, where we
//! do not have a header proving that a block with that hash exists), we use passive fetching. This
//! essentially means waiting passively until the query service receives an object that satisfies
//! the request. This object may be received because it was actively fetched in responsive to a
//! different request for the same object, one that permitted an active fetch. Or it may have been
//! fetched [proactively](#proactive-fetching).

use super::{
    storage::{
        pruning::{PruneStorage, PrunedHeightStorage},
        AggregatesStorage, AvailabilityStorage, ExplorerStorage, MerklizedStateHeightStorage,
        MerklizedStateStorage, NodeStorage, UpdateAggregatesStorage,
    },
    Transaction as _, VersionedDataSource,
};
use crate::{
    availability::{
        AvailabilityDataSource, BlockId, BlockQueryData, Fetch, LeafId, LeafQueryData,
        PayloadQueryData, QueryableHeader, QueryablePayload, TransactionHash, TransactionQueryData,
        UpdateAvailabilityData, VidCommonQueryData,
    },
    explorer::{self, ExplorerDataSource},
    fetching::{self, request, Provider},
    merklized_state::{
        MerklizedState, MerklizedStateDataSource, MerklizedStateHeightPersistence, Snapshot,
    },
    metrics::PrometheusMetrics,
    node::{NodeDataSource, SyncStatus, TimeWindowQueryData, WindowStart},
    status::{HasMetrics, StatusDataSource},
    task::BackgroundTask,
    types::HeightIndexed,
    Header, Payload, QueryError, QueryResult, VidShare,
};
use anyhow::Context;
use async_lock::Semaphore;
use async_std::{sync::Arc, task::sleep};
use async_trait::async_trait;
use derivative::Derivative;
use futures::{
    future::{join_all, BoxFuture, FutureExt},
    stream::{self, BoxStream, Stream, StreamExt},
};
use hotshot_types::traits::{
    metrics::{Gauge, Metrics},
    node_implementation::NodeType,
};
use jf_merkle_tree::{prelude::MerkleProof, MerkleTreeScheme};
use std::{
    cmp::min,
    fmt::{Debug, Display},
    marker::PhantomData,
    ops::{Bound, Range, RangeBounds},
    time::Duration,
};
use tagged_base64::TaggedBase64;
use tracing::Instrument;

mod block;
mod header;
mod leaf;
mod notify_storage;
mod transaction;
mod vid;

use self::{
    block::PayloadFetcher,
    leaf::LeafFetcher,
    notify_storage::{Heights, Notifiers, NotifyStorage},
    transaction::TransactionRequest,
    vid::{VidCommonFetcher, VidCommonRequest},
};
pub use notify_storage::Transaction;

/// Builder for [`FetchingDataSource`] with configuration.
pub struct Builder<Types, S, P> {
    storage: S,
    provider: P,
    retry_delay: Option<Duration>,
    rate_limit: Option<usize>,
    range_chunk_size: usize,
    minor_scan_interval: Duration,
    major_scan_interval: usize,
    major_scan_offset: usize,
    proactive_range_chunk_size: Option<usize>,
    active_fetch_delay: Duration,
    chunk_fetch_delay: Duration,
    proactive_fetching: bool,
    aggregator: bool,
    _types: PhantomData<Types>,
}

impl<Types, S, P> Builder<Types, S, P> {
    /// Construct a new builder with the given storage and fetcher and the default options.
    pub fn new(storage: S, provider: P) -> Self {
        Self {
            storage,
            provider,
            retry_delay: None,
            rate_limit: None,
            range_chunk_size: 25,
            // By default, we run minor proactive scans fairly frequently: once every minute. These
            // scans are cheap (moreso the more frequently they run) and can help us keep up with
            // the head of the chain even if our attached consensus instance is behind.
            minor_scan_interval: Duration::from_secs(60),
            // Major scans, on the other hand, are rather expensive and not especially important for
            // usability. We run them rarely, once every 60 minor scans, or once every hour by
            // default.
            major_scan_interval: 60,
            // Major scan offset can be used when starting multiple nodes at the same time, so they
            // don't all pause for a major scan together.
            major_scan_offset: 0,
            proactive_range_chunk_size: None,
            active_fetch_delay: Duration::from_millis(50),
            chunk_fetch_delay: Duration::from_millis(100),
            proactive_fetching: true,
            aggregator: true,
            _types: Default::default(),
        }
    }

    /// Set the maximum delay between retries of fetches.
    pub fn with_retry_delay(mut self, retry_delay: Duration) -> Self {
        self.retry_delay = Some(retry_delay);
        self
    }

    /// Set the maximum delay between retries of fetches.
    pub fn with_rate_limit(mut self, with_rate_limit: usize) -> Self {
        self.rate_limit = Some(with_rate_limit);
        self
    }

    /// Set the number of items to process at a time when loading a range or stream.
    ///
    /// This determines:
    /// * The number of objects to load from storage in a single request
    /// * The number of objects to buffer in memory per request/stream
    /// * The number of concurrent notification subscriptions per request/stream
    pub fn with_range_chunk_size(mut self, range_chunk_size: usize) -> Self {
        self.range_chunk_size = range_chunk_size;
        self
    }

    /// Set the time interval between minor proactive fetching scans.
    ///
    /// See [proactive fetching](self#proactive-fetching).
    pub fn with_minor_scan_interval(mut self, interval: Duration) -> Self {
        self.minor_scan_interval = interval;
        self
    }

    /// Set the interval (denominated in [minor scans](Self::with_minor_scan_interval)) between
    /// major proactive fetching scans.
    ///
    /// See [proactive fetching](self#proactive-fetching).
    pub fn with_major_scan_interval(mut self, interval: usize) -> Self {
        self.major_scan_interval = interval;
        self
    }

    /// Set the offset (denominated in [minor scans](Self::with_minor_scan_interval)) before the
    /// first major proactive fetching scan.
    ///
    /// This is useful when starting multiple nodes at the same time: major proactive scans can have
    /// a measurable impact on the performance of the node for a brief time while the scan is
    /// running, so it may be desirable to prevent a group of nodes from all doing major scans at
    /// the same time. This can be achieved by giving each node a different `major_scan_offset`.
    ///
    /// See also [proactive fetching](self#proactive-fetching).
    pub fn with_major_scan_offset(mut self, offset: usize) -> Self {
        self.major_scan_offset = offset;
        self
    }

    /// Set the number of items to process at a time when scanning for proactive fetching.
    ///
    /// This is similar to [`Self::with_range_chunk_size`], but only affects the chunk size for
    /// proactive fetching scans, not for normal subscription streams. This can be useful to tune
    /// the proactive scanner to be more or less greedy with the lock on persistent storage.
    ///
    /// By default (i.e. if this method is not called) the proactive range chunk size will be set to
    /// whatever the normal range chunk size is.
    pub fn with_proactive_range_chunk_size(mut self, range_chunk_size: usize) -> Self {
        self.proactive_range_chunk_size = Some(range_chunk_size);
        self
    }

    /// Add a delay between active fetches in proactive scans.
    ///
    /// This can be used to limit the rate at which this query service makes requests to other query
    /// services during proactive scans. This is useful if the query service has a lot of blocks to
    /// catch up on, as without a delay, scanning can be extremely burdensome on the peer.
    pub fn with_active_fetch_delay(mut self, active_fetch_delay: Duration) -> Self {
        self.active_fetch_delay = active_fetch_delay;
        self
    }

    /// Adds a delay between chunk fetches during proactive scans.
    ///
    /// In a proactive scan, we retrieve a range of objects from a provider or local storage (e.g., a database).
    /// Without a delay between fetching these chunks, the process can become very CPU-intensive, especially
    /// when chunks are retrieved from local storage. While there is already a delay for active fetches
    /// (`active_fetch_delay`), situations may arise when subscribed to an old stream that fetches most of the data
    /// from local storage.
    ///
    /// This additional delay helps to limit constant maximum CPU usage
    /// and ensures that local storage remains accessible to all processes,
    /// not just the proactive scanner.
    pub fn with_chunk_fetch_delay(mut self, chunk_fetch_delay: Duration) -> Self {
        self.chunk_fetch_delay = chunk_fetch_delay;
        self
    }

    /// Run without [proactive fetching](self#proactive-fetching).
    ///
    /// This can reduce load on the CPU and the database, but increases the probability that
    /// requests will fail due to missing resources. If resources are constrained, it is recommended
    /// to run with rare proactive fetching (see
    /// [`with_major_scan_interval`](Self::with_major_scan_interval),
    /// [`with_minor_scan_interval`](Self::with_minor_scan_interval)), rather than disabling it
    /// entirely.
    pub fn disable_proactive_fetching(mut self) -> Self {
        self.proactive_fetching = false;
        self
    }

    /// Run without an aggregator.
    ///
    /// This can reduce load on the CPU and the database, but it will cause aggregate statistics
    /// (such as transaction counts) not to update.
    pub fn disable_aggregator(mut self) -> Self {
        self.aggregator = false;
        self
    }
}

impl<Types, S, P> Builder<Types, S, P>
where
    Types: NodeType,
    Payload<Types>: QueryablePayload<Types>,
    Header<Types>: QueryableHeader<Types>,
    S: PruneStorage + VersionedDataSource + HasMetrics + 'static,
    for<'a> S::ReadOnly<'a>:
        AvailabilityStorage<Types> + PrunedHeightStorage + NodeStorage<Types> + AggregatesStorage,
    for<'a> S::Transaction<'a>: UpdateAvailabilityData<Types> + UpdateAggregatesStorage<Types>,
    P: AvailabilityProvider<Types>,
{
    /// Build a [`FetchingDataSource`] with these options.
    pub async fn build(self) -> anyhow::Result<FetchingDataSource<Types, S, P>> {
        FetchingDataSource::new(self).await
    }
}

/// The most basic kind of data source.
///
/// A data source is constructed modularly by combining a [storage](super::storage) implementation
/// with a [Fetcher](crate::fetching::Fetcher). The former allows the query service to store the
/// data it has persistently in an easily accessible storage medium, such as the local file system
/// or a database. This allows it to answer queries efficiently and to maintain its state across
/// restarts. The latter allows the query service to fetch data that is missing from its storage
/// from an external data availability provider, such as the Tiramisu DA network or another instance
/// of the query service.
///
/// These two components of a data source are combined in [`FetchingDataSource`], which is the
/// lowest level kind of data source available. It simply uses the storage implementation to fetch
/// data when available, and fills in everything else using the fetcher. Various kinds of data
/// sources can be constructed out of [`FetchingDataSource`] by changing the storage and fetcher
/// implementations used, and more complex data sources can be built on top using data source
/// combinators.
#[derive(Derivative)]
#[derivative(Clone(bound = ""), Debug(bound = "S: Debug, P: Debug"))]
pub struct FetchingDataSource<Types, S, P>
where
    Types: NodeType,
{
    // The fetcher manages retrieval of resources from both local storage and a remote provider. It
    // encapsulates the data which may need to be shared with a long-lived task or future that
    // implements the asynchronous fetching of a particular object. This is why it gets its own
    // type, wrapped in an [`Arc`] for easy, efficient cloning.
    fetcher: Arc<Fetcher<Types, S, P>>,
    // The proactive scanner task. This is only saved here so that we can cancel it on drop.
    scanner: Option<BackgroundTask>,
    // The aggregator task, which derives aggregate statistics from a block stream.
    aggregator: Option<BackgroundTask>,
    pruner: Pruner<Types, S, P>,
}

#[derive(Derivative)]
#[derivative(Clone(bound = ""), Debug(bound = "S: Debug, P: Debug"))]
pub struct Pruner<Types, S, P>
where
    Types: NodeType,
{
    handle: Option<BackgroundTask>,
    _types: PhantomData<(Types, S, P)>,
}

impl<Types, S, P> Pruner<Types, S, P>
where
    Types: NodeType,
    Payload<Types>: QueryablePayload<Types>,
    S: PruneStorage + Send + Sync + 'static,
    P: AvailabilityProvider<Types>,
{
    async fn new(fetcher: Arc<Fetcher<Types, S, P>>) -> Self {
        let cfg = fetcher.storage.get_pruning_config();
        let Some(cfg) = cfg else {
            return Self {
                handle: None,
                _types: Default::default(),
            };
        };

        let future = async move {
            for i in 1.. {
                tracing::warn!("starting pruner run {i} ");
                fetcher.storage.prune().await;
                sleep(cfg.interval()).await;
            }
        };

        let task = BackgroundTask::spawn("pruner", future);

        Self {
            handle: Some(task),
            _types: Default::default(),
        }
    }
}

impl<Types, S, P> FetchingDataSource<Types, S, P>
where
    Types: NodeType,
    Payload<Types>: QueryablePayload<Types>,
    Header<Types>: QueryableHeader<Types>,
    S: VersionedDataSource + PruneStorage + HasMetrics + 'static,
    for<'a> S::Transaction<'a>: UpdateAvailabilityData<Types> + UpdateAggregatesStorage<Types>,
    for<'a> S::ReadOnly<'a>:
        AvailabilityStorage<Types> + NodeStorage<Types> + PrunedHeightStorage + AggregatesStorage,
    P: AvailabilityProvider<Types>,
{
    /// Build a [`FetchingDataSource`] with the given `storage` and `provider`.
    pub fn builder(storage: S, provider: P) -> Builder<Types, S, P> {
        Builder::new(storage, provider)
    }

    async fn new(builder: Builder<Types, S, P>) -> anyhow::Result<Self> {
        let aggregator = builder.aggregator;
        let proactive_fetching = builder.proactive_fetching;
        let minor_interval = builder.minor_scan_interval;
        let major_interval = builder.major_scan_interval;
        let major_offset = builder.major_scan_offset;
        let proactive_range_chunk_size = builder
            .proactive_range_chunk_size
            .unwrap_or(builder.range_chunk_size);
        let scanner_metrics = ScannerMetrics::new(builder.storage.metrics());
        let aggregator_metrics = AggregatorMetrics::new(builder.storage.metrics());

        let fetcher = Arc::new(Fetcher::new(builder).await?);
        let scanner = if proactive_fetching {
            Some(BackgroundTask::spawn(
                "proactive scanner",
                fetcher.clone().proactive_scan(
                    minor_interval,
                    major_interval,
                    major_offset,
                    proactive_range_chunk_size,
                    scanner_metrics,
                ),
            ))
        } else {
            None
        };

        let aggregator = if aggregator {
            Some(BackgroundTask::spawn(
                "aggregator",
                fetcher.clone().aggregate(aggregator_metrics),
            ))
        } else {
            None
        };

        let pruner = Pruner::new(fetcher.clone()).await;
        let ds = Self {
            fetcher,
            scanner,
            pruner,
            aggregator,
        };

        Ok(ds)
    }
}

impl<Types, S, P> AsRef<S> for FetchingDataSource<Types, S, P>
where
    Types: NodeType,
{
    fn as_ref(&self) -> &S {
        self.fetcher.storage.as_ref()
    }
}

impl<Types, S, P> HasMetrics for FetchingDataSource<Types, S, P>
where
    Types: NodeType,
    S: HasMetrics,
{
    fn metrics(&self) -> &PrometheusMetrics {
        self.as_ref().metrics()
    }
}

#[async_trait]
impl<Types, S, P> StatusDataSource for FetchingDataSource<Types, S, P>
where
    Types: NodeType,
    S: VersionedDataSource + HasMetrics + Send + Sync + 'static,
    for<'a> S::ReadOnly<'a>: NodeStorage<Types>,
    P: Send + Sync,
{
    async fn block_height(&self) -> QueryResult<usize> {
        let mut tx = self.read().await.map_err(|err| QueryError::Error {
            message: err.to_string(),
        })?;
        tx.block_height().await
    }
}

#[async_trait]
impl<Types, S, P> AvailabilityDataSource<Types> for FetchingDataSource<Types, S, P>
where
    Types: NodeType,
    Payload<Types>: QueryablePayload<Types>,
    S: VersionedDataSource + 'static,
    for<'a> S::Transaction<'a>: UpdateAvailabilityData<Types>,
    for<'a> S::ReadOnly<'a>: AvailabilityStorage<Types> + NodeStorage<Types> + PrunedHeightStorage,
    P: AvailabilityProvider<Types>,
{
    type LeafRange<R> = BoxStream<'static, Fetch<LeafQueryData<Types>>>
    where
        R: RangeBounds<usize> + Send;
    type BlockRange<R> = BoxStream<'static, Fetch<BlockQueryData<Types>>>
    where
        R: RangeBounds<usize> + Send;
    type PayloadRange<R> = BoxStream<'static, Fetch<PayloadQueryData<Types>>>
    where
        R: RangeBounds<usize> + Send;
    type VidCommonRange<R> = BoxStream<'static, Fetch<VidCommonQueryData<Types>>>
    where
        R: RangeBounds<usize> + Send;

    async fn get_leaf<ID>(&self, id: ID) -> Fetch<LeafQueryData<Types>>
    where
        ID: Into<LeafId<Types>> + Send + Sync,
    {
        self.fetcher.get(id.into()).await
    }

    async fn get_block<ID>(&self, id: ID) -> Fetch<BlockQueryData<Types>>
    where
        ID: Into<BlockId<Types>> + Send + Sync,
    {
        self.fetcher.get(id.into()).await
    }

    async fn get_payload<ID>(&self, id: ID) -> Fetch<PayloadQueryData<Types>>
    where
        ID: Into<BlockId<Types>> + Send + Sync,
    {
        self.fetcher.get(id.into()).await
    }

    async fn get_vid_common<ID>(&self, id: ID) -> Fetch<VidCommonQueryData<Types>>
    where
        ID: Into<BlockId<Types>> + Send + Sync,
    {
        self.fetcher.get(VidCommonRequest::from(id.into())).await
    }

    async fn get_leaf_range<R>(&self, range: R) -> Self::LeafRange<R>
    where
        R: RangeBounds<usize> + Send + 'static,
    {
        self.fetcher.clone().get_range(range)
    }

    async fn get_block_range<R>(&self, range: R) -> Self::BlockRange<R>
    where
        R: RangeBounds<usize> + Send + 'static,
    {
        self.fetcher.clone().get_range(range)
    }

    async fn get_payload_range<R>(&self, range: R) -> Self::PayloadRange<R>
    where
        R: RangeBounds<usize> + Send + 'static,
    {
        self.fetcher.clone().get_range(range)
    }

    async fn get_vid_common_range<R>(&self, range: R) -> Self::VidCommonRange<R>
    where
        R: RangeBounds<usize> + Send + 'static,
    {
        self.fetcher.clone().get_range(range)
    }

    async fn get_transaction(
        &self,
        hash: TransactionHash<Types>,
    ) -> Fetch<TransactionQueryData<Types>> {
        self.fetcher.get(TransactionRequest::from(hash)).await
    }
}

impl<Types, S, P> VersionedDataSource for FetchingDataSource<Types, S, P>
where
    Types: NodeType,
    S: VersionedDataSource + Send + Sync,
    P: Send + Sync,
{
    type Transaction<'a> = Transaction<'a, Types, S::Transaction<'a>>
    where
        Self: 'a;
    type ReadOnly<'a> = Transaction<'a, Types, S::ReadOnly<'a>>
    where
        Self: 'a;

    async fn write(&self) -> anyhow::Result<Self::Transaction<'_>> {
        self.fetcher.write().await
    }

    async fn read(&self) -> anyhow::Result<Self::ReadOnly<'_>> {
        self.fetcher.read().await
    }
}

/// Asynchronous retrieval and storage of [`Fetchable`] resources.
#[derive(Debug)]
struct Fetcher<Types, S, P>
where
    Types: NodeType,
{
    storage: NotifyStorage<Types, S>,
    provider: Arc<P>,
    payload_fetcher: Arc<PayloadFetcher<Types, S, P>>,
    leaf_fetcher: Arc<LeafFetcher<Types, S, P>>,
    vid_common_fetcher: Arc<VidCommonFetcher<Types, S, P>>,
    range_chunk_size: usize,
    // Duration to sleep after each active fetch,
    active_fetch_delay: Duration,
    // Duration to sleep after each chunk fetched
    chunk_fetch_delay: Duration,
}

impl<Types, S, P> VersionedDataSource for Fetcher<Types, S, P>
where
    Types: NodeType,
    S: VersionedDataSource + Send + Sync,
    P: Send + Sync,
{
    type Transaction<'a> = Transaction<'a, Types, S::Transaction<'a>>
    where
        Self: 'a;
    type ReadOnly<'a> = Transaction<'a, Types, S::ReadOnly<'a>>
    where
        Self: 'a;

    async fn write(&self) -> anyhow::Result<Self::Transaction<'_>> {
        self.storage.write().await
    }

    async fn read(&self) -> anyhow::Result<Self::ReadOnly<'_>> {
        self.storage.read().await
    }
}

impl<Types, S, P> Fetcher<Types, S, P>
where
    Types: NodeType,
    S: VersionedDataSource + Sync,
    for<'a> S::ReadOnly<'a>: PrunedHeightStorage + NodeStorage<Types>,
{
    async fn new(builder: Builder<Types, S, P>) -> anyhow::Result<Self> {
        let mut payload_fetcher = fetching::Fetcher::default();
        let mut leaf_fetcher = fetching::Fetcher::default();
        let mut vid_common_fetcher = fetching::Fetcher::default();
        if let Some(delay) = builder.retry_delay {
            payload_fetcher = payload_fetcher.with_retry_delay(delay);
            leaf_fetcher = leaf_fetcher.with_retry_delay(delay);
            vid_common_fetcher = vid_common_fetcher.with_retry_delay(delay);
        }

        if let Some(limit) = builder.rate_limit {
            let permit = Arc::new(Semaphore::new(limit));

            payload_fetcher = payload_fetcher.with_rate_limit(permit.clone());
            leaf_fetcher = leaf_fetcher.with_rate_limit(permit.clone());
            vid_common_fetcher = vid_common_fetcher.with_rate_limit(permit);
        }

        Ok(Self {
            storage: NotifyStorage::new(builder.storage),
            provider: Arc::new(builder.provider),
            payload_fetcher: Arc::new(payload_fetcher),
            leaf_fetcher: Arc::new(leaf_fetcher),
            vid_common_fetcher: Arc::new(vid_common_fetcher),
            range_chunk_size: builder.range_chunk_size,
            active_fetch_delay: builder.active_fetch_delay,
            chunk_fetch_delay: builder.chunk_fetch_delay,
        })
    }
}

impl<Types, S, P> Fetcher<Types, S, P>
where
    Types: NodeType,
    Payload<Types>: QueryablePayload<Types>,
    S: VersionedDataSource + 'static,
    for<'a> S::Transaction<'a>: UpdateAvailabilityData<Types>,
    for<'a> S::ReadOnly<'a>: AvailabilityStorage<Types> + NodeStorage<Types> + PrunedHeightStorage,
    P: AvailabilityProvider<Types>,
{
    async fn get<T, R>(self: &Arc<Self>, req: R) -> Fetch<T>
    where
        T: Fetchable<Types>,
        R: Into<T::Request> + Send,
    {
        let req = req.into();
        // Subscribe to notifications while we run `ok_or_fetch`. This means we won't miss any
        // notifications sent in between checking local storage and triggering a fetch if necessary.
        let passive = T::passive_fetch(self.storage.notifiers(), req).await;

        let mut tx = match self.read().await {
            Ok(tx) => tx,
            Err(err) => {
                tracing::warn!(
                    ?req,
                    "unable to start transaction to load object, falling back to fetching: {err:#}"
                );
                return self.fetch(None, passive, req).await;
            }
        };

        let res = T::load(&mut tx, req).await;
        self.ok_or_fetch(Some(&mut tx), passive, req, res).await
    }

    /// Get a range of objects from local storage or a provider.
    ///
    /// Convert a finite stream of fallible local storage lookups into a (possibly infinite) stream
    /// of infallible fetches. Objects in `range` are loaded from local storage. Any gaps or missing
    /// objects are filled by fetching from a provider. Items in the resulting stream are futures
    /// that will never fail to produce a resource, although they may block indefinitely if the
    /// resource needs to be fetched.
    ///
    /// Objects are loaded and fetched in chunks, which strikes a good balance of limiting the total
    /// number of storage and network requests, while also keeping the amount of simultaneous
    /// resource consumption bounded.
    fn get_range<R, T>(self: Arc<Self>, range: R) -> BoxStream<'static, Fetch<T>>
    where
        R: RangeBounds<usize> + Send + 'static,
        T: RangedFetchable<Types>,
    {
        let chunk_size = self.range_chunk_size;
        self.get_range_with_chunk_size(chunk_size, range)
    }

    /// Same as [`Self::get_range`], but uses the given chunk size instead of the default.
    fn get_range_with_chunk_size<R, T>(
        self: Arc<Self>,
        chunk_size: usize,
        range: R,
    ) -> BoxStream<'static, Fetch<T>>
    where
        R: RangeBounds<usize> + Send + 'static,
        T: RangedFetchable<Types>,
    {
        let chunk_fetch_delay = self.chunk_fetch_delay;
        let active_fetch_delay = self.active_fetch_delay;

        stream::iter(range_chunks(range, chunk_size))
            .then(move |chunk| {
                let self_clone = self.clone();
                async move {
                    {
                        let chunk = self_clone.get_chunk(chunk).await;

                        // Introduce a delay (`chunk_fetch_delay`) between fetching chunks.
                        // This helps to limit constant high CPU usage when fetching long range of data,
                        // especially for older streams that fetch most of the data from local storage
                        sleep(chunk_fetch_delay).await;
                        chunk
                    }
                }
            })
            .flatten()
            .then(move |f| async move {
                match f {
                    // Introduce a delay (`active_fetch_delay`) for active fetches to reduce load on the catchup provider.
                    // The delay applies between pending fetches, not between chunks.
                    Fetch::Pending(_) => sleep(active_fetch_delay).await,
                    Fetch::Ready(_) => (),
                };
                f
            })
            .boxed()
    }

    /// Get a range of objects from local storage or a provider.
    ///
    /// This method is similar to `get_range`, except that:
    /// * It fetches all desired objects together, as a single chunk
    /// * It loads the object or triggers fetches right now rather than providing a lazy stream
    ///   which only fetches objects when polled.
    async fn get_chunk<T>(self: Arc<Self>, chunk: Range<usize>) -> impl Stream<Item = Fetch<T>>
    where
        T: RangedFetchable<Types>,
    {
        // Subscribe to notifications first. This means we won't miss any notifications sent in
        // between checking local storage and triggering a fetch if necessary.
        let mut passive = join_all(
            chunk
                .clone()
                .map(|i| T::passive_fetch(self.storage.notifiers(), i.into())),
        )
        .await;

        let (mut tx, ts) = match self.read().await {
            Ok(mut tx) => {
                let ts = T::load_range(&mut tx, chunk.clone())
                    .await
                    .context(format!("when fetching items in range {chunk:?}"))
                    .ok_or_trace()
                    .unwrap_or_default();
                (Some(tx), ts)
            }
            Err(err) => {
                tracing::warn!(
                    ?chunk,
                    "unable to open transaction to read chunk, falling back to fetching: {err:#}"
                );
                (None, vec![])
            }
        };

        // Log and discard error information; we want a list of Option where None indicates an
        // object that needs to be fetched. Note that we don't use `FetchRequest::might_exist` to
        // silence the logs here when an object is missing that is not expected to exist at all.
        // When objects are not expected to exist, `load_range` should just return a truncated list
        // rather than returning `Err` objects, so if there are errors in here they are unexpected
        // and we do want to log them.
        let ts = ts.into_iter().filter_map(ResultExt::ok_or_trace);
        // Kick off a fetch for each missing object.
        let mut fetches = Vec::with_capacity(chunk.len());
        for t in ts {
            // Fetch missing objects that should come before `t`.
            while chunk.start + fetches.len() < t.height() as usize {
                tracing::debug!(
                    "item {} in chunk not available, will be fetched",
                    fetches.len()
                );
                fetches.push(
                    self.fetch(tx.as_mut(), passive.remove(0), chunk.start + fetches.len())
                        .await,
                );
            }
            // `t` itself is already available, we don't have to trigger a fetch for it. Remove (and
            // drop without awaiting) the passive fetch we preemptively started.
            drop(passive.remove(0));
            fetches.push(Fetch::Ready(t));
        }
        // Fetch missing objects from the end of the range.
        while fetches.len() < chunk.len() {
            fetches.push(
                self.fetch(tx.as_mut(), passive.remove(0), chunk.start + fetches.len())
                    .await,
            );
        }

        stream::iter(fetches)
    }

    async fn ok_or_fetch<R, T>(
        self: &Arc<Self>,
        tx: Option<&mut <Self as VersionedDataSource>::ReadOnly<'_>>,
        passive: PassiveFetch<T>,
        req: R,
        res: QueryResult<T>,
    ) -> Fetch<T>
    where
        R: Into<T::Request> + Send,
        T: Fetchable<Types> + Send + Sync + 'static,
    {
        let req = req.into();
        self.some_or_fetch(
            tx,
            passive,
            req,
            res.context(format!("req: {req:?}")).ok_or_trace(),
        )
        .await
    }

    async fn some_or_fetch<R, T>(
        self: &Arc<Self>,
        tx: Option<&mut <Self as VersionedDataSource>::ReadOnly<'_>>,
        passive: PassiveFetch<T>,
        req: R,
        res: Option<T>,
    ) -> Fetch<T>
    where
        R: Into<T::Request> + Send,
        T: Fetchable<Types> + Send + Sync + 'static,
    {
        match res {
            Some(t) => Fetch::Ready(t),
            None => self.fetch(tx, passive, req).await,
        }
    }

    async fn fetch<R, T>(
        self: &Arc<Self>,
        tx: Option<&mut <Self as VersionedDataSource>::ReadOnly<'_>>,
        passive: PassiveFetch<T>,
        req: R,
    ) -> Fetch<T>
    where
        R: Into<T::Request>,
        T: Fetchable<Types>,
    {
        let req = req.into();
        tracing::debug!("fetching resource {req:?}");

        // Subscribe to notifications so we are alerted when we get the resource.
        let fut = passive.then(move |opt| async move {
            match opt {
                Some(t) => t,
                None => {
                    // If `passive_fetch` returns `None`, it means the notifier was dropped without
                    // ever sending a notification. In this case, the correct behavior is actually
                    // to block forever (unless the `Fetch` itself is dropped), since the semantics
                    // of `Fetch` are to never fail. This is analogous to fetching an object which
                    // doesn't actually exist: the `Fetch` will never return.
                    //
                    // However, for ease of debugging, and since this is never expected to happen in
                    // normal usage, we panic instead. This should only happen in two cases:
                    // * The server was shut down (dropping the notifier) without cleaning up some
                    //   background tasks. This will not affect runtime behavior, but should be
                    //   fixed if it happens.
                    // * There is a very unexpected runtime bug resulting in the notifier being
                    //   dropped. If this happens, things are very broken in any case, and it is
                    //   better to panic loudly than simply block forever.
                    panic!("notifier dropped without satisfying request {req:?}");
                }
            }
        });

        // Trigger an active fetch from a remote provider if possible.
        if let Some(tx) = tx {
            if let Some(heights) = tx.heights().await.ok_or_trace() {
                if req.might_exist(heights) {
                    T::active_fetch(tx, self.clone(), req).await;
                } else {
                    tracing::debug!("not fetching object {req:?} that cannot exist at {heights:?}");
                }
            } else {
                tracing::warn!("failed to load heights; cannot definitively say object might exist; will skip active fetch");
            }
        } else {
            tracing::warn!(?req, "unable to open transaction; will skip active fetch");
        }

        // Wait for the object to arrive.
        Fetch::Pending(fut.boxed())
    }

    /// Proactively search for and retrieve missing objects.
    ///
    /// This function will proactively identify and retrieve blocks and leaves which are missing
    /// from storage. It will run until cancelled, thus, it is meant to be spawned as a background
    /// task rather than called synchronously.
    async fn proactive_scan(
        self: Arc<Self>,
        minor_interval: Duration,
        major_interval: usize,
        major_offset: usize,
        chunk_size: usize,
        metrics: ScannerMetrics,
    ) {
        let mut prev_height = 0;

        for i in 0.. {
            let major = i % major_interval == major_offset % major_interval;
            let span = tracing::warn_span!("proactive scan", i, major, prev_height);
            metrics.running.set(1);
            metrics.current_scan.set(i);
            metrics.current_is_major.set(major as usize);
            async {
                let mut backoff = minor_interval;
                let max_backoff = Duration::from_secs(60);
                metrics.backoff.set(backoff.as_secs() as usize);

                // We can't start the scan until we know the current block height and pruned height,
                // so we know which blocks to scan. Thus we retry until this succeeds.
                let heights = loop {
                    let mut tx = match self.read().await {
                        Ok(tx) => tx,
                        Err(err) => {
                            tracing::error!(
                                ?backoff,
                                "unable to start transaction for scan: {err:#}"
                            );
                            metrics.retries.update(1);
                            sleep(backoff).await;
                            backoff = min(2 * backoff, max_backoff);
                            metrics.backoff.set(backoff.as_secs() as usize);
                            continue;
                        }
                    };
                    let heights = match tx.heights().await {
                        Ok(heights) => heights,
                        Err(err) => {
                            tracing::error!(?backoff, "unable to load heights: {err:#}");
                            metrics.retries.update(1);
                            sleep(backoff).await;
                            backoff = min(2 * backoff, max_backoff);
                            metrics.backoff.set(backoff.as_secs() as usize);
                            continue;
                        }
                    };
                    metrics.retries.set(0);
                    break heights;
                };

                // Get the pruned height or default to 0 if it is not set. We will start looking for
                // missing blocks from the pruned height.
                let minimum_block_height = heights.pruned_height.unwrap_or(0) as usize;
                // Get the block height; we will look for any missing blocks up to `block_height`.
                let block_height = heights.height as usize;

                // In a major scan, we fetch all blocks between 0 and `block_height`. In minor scans
                // (much more frequent) we fetch blocks that are missing since the last scan.
                let start = if major {
                    // We log major scans at WARN level, since they happen infrequently and can have
                    // a measurable impact on performance while running. This also serves as a
                    // useful progress heartbeat.
                    tracing::warn!(
                        start = minimum_block_height,
                        block_height,
                        "starting major scan"
                    );

                    // If we're starting a major scan, reset the major scan counts of missing data
                    // as we're about to recompute them.
                    metrics.major_missing_blocks.set(0);
                    metrics.major_missing_vid.set(0);

                    minimum_block_height
                } else {
                    tracing::info!(start = prev_height, block_height, "starting minor scan");
                    prev_height
                };
                prev_height = block_height;
                metrics.current_start.set(start);
                metrics.current_end.set(block_height);
                metrics.scanned_blocks.set(0);
                metrics.scanned_vid.set(0);

                // Iterate over all blocks that we should have. Fetching the block is enough to
                // trigger an active fetch of the corresponding leaf if it too is missing. The
                // chunking behavior of `get_range` automatically ensures that, no matter how big
                // the range is, we will release the read lock on storage every `chunk_size` items,
                // so we don't starve out would-be writers.
                let mut blocks = self
                    .clone()
                    .get_range_with_chunk_size::<_, BlockQueryData<Types>>(
                        chunk_size,
                        start..block_height,
                    );
                let mut missing_blocks = 0;
                while let Some(fetch) = blocks.next().await {
                    if fetch.is_pending() {
                        missing_blocks += 1;
                        // Wait for the block to be fetched. This slows down the scanner so that we
                        // don't waste memory generating more active fetch tasks then we can handle
                        // at a given time. Note that even with this await, all blocks within a
                        // chunk are fetched in parallel, so this does not block the next block in
                        // the chunk, only the next chunk until the current chunk completes.
                        fetch.await;
                    }
                    metrics.scanned_blocks.update(1);
                }
                metrics.add_missing_blocks(major, missing_blocks);

                // We have to trigger a separate fetch of the VID data, since this is fetched
                // independently of the block payload.
                let mut vid = self
                    .clone()
                    .get_range_with_chunk_size::<_, VidCommonQueryData<Types>>(
                        chunk_size,
                        start..block_height,
                    );
                let mut missing_vid = 0;
                while let Some(fetch) = vid.next().await {
                    if fetch.is_pending() {
                        missing_vid += 1;
                        // As above, limit the speed at which we spawn new fetches to the speed at
                        // which we can process them.
                        fetch.await;
                    }
                    metrics.scanned_vid.update(1);
                }
                metrics.add_missing_vid(major, missing_vid);

                tracing::info!("completed proactive scan, will scan again in {minor_interval:?}");

                // Reset metrics.
                metrics.running.set(0);
                if major {
                    // If we just completed a major scan, reset the incremental counts of missing
                    // data from minor scans, so the next round of minor scans can recompute/update
                    // them.
                    metrics.minor_missing_blocks.set(0);
                    metrics.minor_missing_vid.set(0);
                }

                sleep(minor_interval).await;
            }
            .instrument(span)
            .await;
        }
    }
}

impl<Types, S, P> Fetcher<Types, S, P>
where
    Types: NodeType,
    Payload<Types>: QueryablePayload<Types>,
    S: VersionedDataSource + 'static,
    for<'a> S::Transaction<'a>: UpdateAvailabilityData<Types> + UpdateAggregatesStorage<Types>,
    for<'a> S::ReadOnly<'a>:
        AvailabilityStorage<Types> + NodeStorage<Types> + PrunedHeightStorage + AggregatesStorage,
    P: AvailabilityProvider<Types>,
{
    #[tracing::instrument(skip_all)]
    async fn aggregate(self: Arc<Self>, metrics: AggregatorMetrics) {
        loop {
            let start = loop {
                let mut tx = match self.read().await {
                    Ok(tx) => tx,
                    Err(err) => {
                        tracing::error!("unable to start aggregator: {err:#}");
                        sleep(Duration::from_secs(5)).await;
                        continue;
                    }
                };
                match tx.aggregates_height().await {
                    Ok(height) => break height,
                    Err(err) => {
                        tracing::error!("unable to load aggregator height: {err:#}");
                        sleep(Duration::from_secs(5)).await;
                        continue;
                    }
                };
            };
            tracing::info!(start, "starting aggregator");
            metrics.height.set(start);

            let mut blocks = self.clone().get_range::<_, BlockQueryData<Types>>(start..);
            while let Some(block) = blocks.next().await {
                let block = block.await;
                let height = block.height();
                tracing::debug!(height, "updating aggregate statistics for block");
                loop {
                    let res = async {
                        let mut tx = self.write().await.context("opening transaction")?;
                        tx.update_aggregates(&block).await?;
                        tx.commit().await.context("committing transaction")
                    }
                    .await;
                    match res {
                        Ok(()) => break,
                        Err(err) => {
                            tracing::warn!(
                                height,
                                "failed to update aggregates for block: {err:#}"
                            );
                            sleep(Duration::from_secs(1)).await;
                        }
                    }
                }
                metrics.height.set(height as usize);
            }
            tracing::warn!("aggregator block stream ended unexpectedly; will restart");
        }
    }
}

#[async_trait]
impl<Types, S, P, State, const ARITY: usize> MerklizedStateDataSource<Types, State, ARITY>
    for FetchingDataSource<Types, S, P>
where
    Types: NodeType,
    S: VersionedDataSource + 'static,
    for<'a> S::ReadOnly<'a>: MerklizedStateStorage<Types, State, ARITY>,
    P: Send + Sync,
    State: MerklizedState<Types, ARITY> + 'static,
    <State as MerkleTreeScheme>::Commitment: Send,
{
    async fn get_path(
        &self,
        snapshot: Snapshot<Types, State, ARITY>,
        key: State::Key,
    ) -> QueryResult<MerkleProof<State::Entry, State::Key, State::T, ARITY>> {
        let mut tx = self.read().await.map_err(|err| QueryError::Error {
            message: err.to_string(),
        })?;
        tx.get_path(snapshot, key).await
    }
}

#[async_trait]
impl<Types, S, P> MerklizedStateHeightPersistence for FetchingDataSource<Types, S, P>
where
    Types: NodeType,
    Payload<Types>: QueryablePayload<Types>,
    S: VersionedDataSource + 'static,
    for<'a> S::ReadOnly<'a>: MerklizedStateHeightStorage,
    P: Send + Sync,
{
    async fn get_last_state_height(&self) -> QueryResult<usize> {
        let mut tx = self.read().await.map_err(|err| QueryError::Error {
            message: err.to_string(),
        })?;
        tx.get_last_state_height().await
    }
}

#[async_trait]
impl<Types, S, P> NodeDataSource<Types> for FetchingDataSource<Types, S, P>
where
    Types: NodeType,
    S: VersionedDataSource + 'static,
    for<'a> S::ReadOnly<'a>: NodeStorage<Types>,
    P: Send + Sync,
{
    async fn block_height(&self) -> QueryResult<usize> {
        let mut tx = self.read().await.map_err(|err| QueryError::Error {
            message: err.to_string(),
        })?;
        tx.block_height().await
    }

    async fn count_transactions_in_range(
        &self,
        range: impl RangeBounds<usize> + Send,
    ) -> QueryResult<usize> {
        let mut tx = self.read().await.map_err(|err| QueryError::Error {
            message: err.to_string(),
        })?;
        tx.count_transactions_in_range(range).await
    }

    async fn payload_size_in_range(
        &self,
        range: impl RangeBounds<usize> + Send,
    ) -> QueryResult<usize> {
        let mut tx = self.read().await.map_err(|err| QueryError::Error {
            message: err.to_string(),
        })?;
        tx.payload_size_in_range(range).await
    }

    async fn vid_share<ID>(&self, id: ID) -> QueryResult<VidShare>
    where
        ID: Into<BlockId<Types>> + Send + Sync,
    {
        let mut tx = self.read().await.map_err(|err| QueryError::Error {
            message: err.to_string(),
        })?;
        tx.vid_share(id).await
    }

    async fn sync_status(&self) -> QueryResult<SyncStatus> {
        let mut tx = self.read().await.map_err(|err| QueryError::Error {
            message: err.to_string(),
        })?;
        tx.sync_status().await
    }

    async fn get_header_window(
        &self,
        start: impl Into<WindowStart<Types>> + Send + Sync,
        end: u64,
        limit: usize,
    ) -> QueryResult<TimeWindowQueryData<Header<Types>>> {
        let mut tx = self.read().await.map_err(|err| QueryError::Error {
            message: err.to_string(),
        })?;
        tx.get_header_window(start, end, limit).await
    }
}

#[async_trait]
impl<Types, S, P> ExplorerDataSource<Types> for FetchingDataSource<Types, S, P>
where
    Types: NodeType,
    Payload<Types>: QueryablePayload<Types>,
    Header<Types>: QueryableHeader<Types> + explorer::traits::ExplorerHeader<Types>,
    crate::Transaction<Types>: explorer::traits::ExplorerTransaction,
    S: VersionedDataSource + 'static,
    for<'a> S::ReadOnly<'a>: ExplorerStorage<Types>,
    P: Send + Sync,
{
    async fn get_block_summaries(
        &self,
        request: explorer::query_data::GetBlockSummariesRequest<Types>,
    ) -> Result<
        Vec<explorer::query_data::BlockSummary<Types>>,
        explorer::query_data::GetBlockSummariesError,
    > {
        let mut tx = self.read().await.map_err(|err| QueryError::Error {
            message: err.to_string(),
        })?;
        tx.get_block_summaries(request).await
    }

    async fn get_block_detail(
        &self,
        request: explorer::query_data::BlockIdentifier<Types>,
    ) -> Result<explorer::query_data::BlockDetail<Types>, explorer::query_data::GetBlockDetailError>
    {
        let mut tx = self.read().await.map_err(|err| QueryError::Error {
            message: err.to_string(),
        })?;
        tx.get_block_detail(request).await
    }

    async fn get_transaction_summaries(
        &self,
        request: explorer::query_data::GetTransactionSummariesRequest<Types>,
    ) -> Result<
        Vec<explorer::query_data::TransactionSummary<Types>>,
        explorer::query_data::GetTransactionSummariesError,
    > {
        let mut tx = self.read().await.map_err(|err| QueryError::Error {
            message: err.to_string(),
        })?;
        tx.get_transaction_summaries(request).await
    }

    async fn get_transaction_detail(
        &self,
        request: explorer::query_data::TransactionIdentifier<Types>,
    ) -> Result<
        explorer::query_data::TransactionDetailResponse<Types>,
        explorer::query_data::GetTransactionDetailError,
    > {
        let mut tx = self.read().await.map_err(|err| QueryError::Error {
            message: err.to_string(),
        })?;
        tx.get_transaction_detail(request).await
    }

    async fn get_explorer_summary(
        &self,
    ) -> Result<
        explorer::query_data::ExplorerSummary<Types>,
        explorer::query_data::GetExplorerSummaryError,
    > {
        let mut tx = self.read().await.map_err(|err| QueryError::Error {
            message: err.to_string(),
        })?;
        tx.get_explorer_summary().await
    }

    async fn get_search_results(
        &self,
        query: TaggedBase64,
    ) -> Result<
        explorer::query_data::SearchResult<Types>,
        explorer::query_data::GetSearchResultsError,
    > {
        let mut tx = self.read().await.map_err(|err| QueryError::Error {
            message: err.to_string(),
        })?;
        tx.get_search_results(query).await
    }
}

/// A provider which can be used as a fetcher by the availability service.
pub trait AvailabilityProvider<Types: NodeType>:
    Provider<Types, request::LeafRequest>
    + Provider<Types, request::PayloadRequest>
    + Provider<Types, request::VidCommonRequest>
    + Sync
    + 'static
{
}
impl<Types: NodeType, P> AvailabilityProvider<Types> for P where
    P: Provider<Types, request::LeafRequest>
        + Provider<Types, request::PayloadRequest>
        + Provider<Types, request::VidCommonRequest>
        + Sync
        + 'static
{
}

trait FetchRequest: Copy + Debug + Send + Sync + 'static {
    /// Indicate whether it is possible this object could exist.
    ///
    /// This can filter out requests quickly for objects that cannot possibly exist, such as
    /// requests for objects with a height greater than the current block height. Not only does this
    /// let us fail faster for such requests (without touching storage at all), it also helps keep
    /// logging quieter when we fail to fetch an object because the user made a bad request, while
    /// still being fairly loud when we fail to fetch an object that might have really existed.
    ///
    /// This method is conservative: it returns `true` if it cannot tell whether the given object
    /// could exist or not.
    fn might_exist(self, _heights: Heights) -> bool {
        true
    }
}

/// Objects which can be fetched from a remote DA provider and cached in local storage.
///
/// This trait lets us abstract over leaves, blocks, and other types that can be fetched. Thus, the
/// logistics of fetching are shared between all objects, and only the low-level particulars are
/// type-specific.
#[async_trait]
trait Fetchable<Types>: Clone + Send + Sync + 'static
where
    Types: NodeType,
    Payload<Types>: QueryablePayload<Types>,
{
    /// A succinct specification of the object to be fetched.
    type Request: FetchRequest;

    /// Does this object satisfy the given request?
    fn satisfies(&self, req: Self::Request) -> bool;

    /// Spawn a task to fetch the object from a remote provider, if possible.
    ///
    /// An active fetch will only be triggered if:
    /// * There is not already an active fetch in progress for the same object
    /// * The requested object is known to exist. For example, we will fetch a leaf by height but
    ///   not by hash, since we can't guarantee that a leaf with an arbitrary hash exists. Note that
    ///   this function assumes `req.might_exist()` has already been checked before calling it, and
    ///   so may do unnecessary work if the caller does not ensure this.
    ///
    /// If we do trigger an active fetch for an object, the provided callback will be called if and
    /// when the fetch completes successfully. The callback should be responsible for notifying any
    /// passive listeners that the object has been retrieved. If we do not trigger an active fetch
    /// for an object, this function does nothing.
    ///
    /// In either case, as long as the requested object does in fact exist, we will eventually
    /// receive it passively, since we will eventually receive all blocks and leaves that are ever
    /// produced. Active fetching merely helps us receive certain objects sooner.
    async fn active_fetch<S, P>(
        tx: &mut impl AvailabilityStorage<Types>,
        fetcher: Arc<Fetcher<Types, S, P>>,
        req: Self::Request,
    ) where
        S: VersionedDataSource + 'static,
        for<'a> S::Transaction<'a>: UpdateAvailabilityData<Types>,
        P: AvailabilityProvider<Types>;

    /// Wait for someone else to fetch the object.
    async fn passive_fetch(notifiers: &Notifiers<Types>, req: Self::Request) -> PassiveFetch<Self>;

    /// Load an object from local storage.
    ///
    /// This function assumes `req.might_exist()` has already been checked before calling it, and so
    /// may do unnecessary work if the caller does not ensure this.
    async fn load<S>(storage: &mut S, req: Self::Request) -> QueryResult<Self>
    where
        S: AvailabilityStorage<Types>;
}

type PassiveFetch<T> = BoxFuture<'static, Option<T>>;

#[async_trait]
trait RangedFetchable<Types>: Fetchable<Types, Request = Self::RangedRequest> + HeightIndexed
where
    Types: NodeType,
    Payload<Types>: QueryablePayload<Types>,
{
    type RangedRequest: FetchRequest + From<usize> + Send;

    /// Load a range of these objects from local storage.
    async fn load_range<S, R>(storage: &mut S, range: R) -> QueryResult<Vec<QueryResult<Self>>>
    where
        S: AvailabilityStorage<Types>,
        R: RangeBounds<usize> + Send + 'static;
}

/// Break a range into fixed-size chunks.
fn range_chunks<R>(range: R, chunk_size: usize) -> impl Iterator<Item = Range<usize>>
where
    R: RangeBounds<usize>,
{
    // Transform range to explicit start (inclusive) and end (exclusive) bounds.
    let mut start = match range.start_bound() {
        Bound::Included(i) => *i,
        Bound::Excluded(i) => *i + 1,
        Bound::Unbounded => 0,
    };
    let end = match range.end_bound() {
        Bound::Included(i) => *i + 1,
        Bound::Excluded(i) => *i,
        Bound::Unbounded => usize::MAX,
    };
    std::iter::from_fn(move || {
        let chunk_end = min(start + chunk_size, end);
        if chunk_end == start {
            return None;
        }

        let chunk = start..chunk_end;
        start = chunk_end;
        Some(chunk)
    })
}

trait ResultExt<T, E> {
    fn ok_or_trace(self) -> Option<T>
    where
        E: Display;
}

impl<T, E> ResultExt<T, E> for Result<T, E> {
    fn ok_or_trace(self) -> Option<T>
    where
        E: Display,
    {
        match self {
            Ok(t) => Some(t),
            Err(err) => {
                tracing::info!(
                    "error loading resource from local storage, will try to fetch: {err:#}"
                );
                None
            }
        }
    }
}

#[derive(Debug)]
struct ScannerMetrics {
    /// Whether a scan is currently running (1) or not (0).
    running: Box<dyn Gauge>,
    /// The current number that is running.
    current_scan: Box<dyn Gauge>,
    /// Whether the currently running scan is a major scan (1) or not (0).
    current_is_major: Box<dyn Gauge>,
    /// Current backoff delay for retries (s).
    backoff: Box<dyn Gauge>,
    /// Number of retries since last success.
    retries: Box<dyn Gauge>,
    /// Block height where the current scan started.
    current_start: Box<dyn Gauge>,
    /// Block height where the current scan will end.
    current_end: Box<dyn Gauge>,
    /// Number of blocks processed in the current scan.
    scanned_blocks: Box<dyn Gauge>,
    /// Number of VID entries processed in the current scan.
    scanned_vid: Box<dyn Gauge>,
    /// The number of missing blocks encountered in the last major scan.
    major_missing_blocks: Box<dyn Gauge>,
    /// The number of missing VID entries encountered in the last major scan.
    major_missing_vid: Box<dyn Gauge>,
    /// The number of missing blocks encountered _cumulatively_ in minor scans since the last major
    /// scan.
    minor_missing_blocks: Box<dyn Gauge>,
    /// The number of missing VID entries encountered _cumulatively_ in minor scans since the last
    /// major scan.
    minor_missing_vid: Box<dyn Gauge>,
}

impl ScannerMetrics {
    fn new(metrics: &PrometheusMetrics) -> Self {
        let group = metrics.subgroup("scanner".into());
        Self {
            running: group.create_gauge("running".into(), None),
            current_scan: group.create_gauge("current".into(), None),
            current_is_major: group.create_gauge("is_major".into(), None),
            backoff: group.create_gauge("backoff".into(), Some("s".into())),
            retries: group.create_gauge("retries".into(), None),
            current_start: group.create_gauge("start".into(), None),
            current_end: group.create_gauge("end".into(), None),
            scanned_blocks: group.create_gauge("scanned_blocks".into(), None),
            scanned_vid: group.create_gauge("scanned_vid".into(), None),
            major_missing_blocks: group.create_gauge("major_missing_blocks".into(), None),
            major_missing_vid: group.create_gauge("major_missing_vid".into(), None),
            minor_missing_blocks: group.create_gauge("minor_missing_blocks".into(), None),
            minor_missing_vid: group.create_gauge("minor_missing_vid".into(), None),
        }
    }

    fn add_missing_blocks(&self, major: bool, missing: usize) {
        if major {
            self.major_missing_blocks.set(missing);
        } else {
            self.minor_missing_blocks.update(missing as i64);
        }
    }

    fn add_missing_vid(&self, major: bool, missing: usize) {
        if major {
            self.major_missing_vid.set(missing);
        } else {
            self.minor_missing_vid.update(missing as i64);
        }
    }
}

#[derive(Debug)]
struct AggregatorMetrics {
    /// The block height for which aggregate statistics are currently available.
    height: Box<dyn Gauge>,
}

impl AggregatorMetrics {
    fn new(metrics: &PrometheusMetrics) -> Self {
        let group = metrics.subgroup("aggregator".into());
        Self {
            height: group.create_gauge("height".into(), None),
        }
    }
}
