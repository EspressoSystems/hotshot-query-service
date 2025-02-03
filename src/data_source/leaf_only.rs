use super::{
    storage::{
        pruning::{PruneStorage, PrunedHeightDataSource, PrunedHeightStorage},
        AvailabilityStorage, MerklizedStateHeightStorage, MerklizedStateStorage, NodeStorage,
        UpdateAvailabilityStorage,
    },
    Transaction, VersionedDataSource,
};
use crate::data_source::fetching::passive;
use crate::data_source::fetching::range_chunks;
use crate::data_source::fetching::Notifiers;
use crate::data_source::fetching::Pruner;
use crate::data_source::fetching::RangedFetchable;
use crate::data_source::fetching::ResultExt;
use crate::data_source::fetching::Storable;
use crate::{
    availability::{
        AvailabilityDataSource, BlockId, BlockInfo, BlockQueryData, Fetch, FetchStream, LeafId,
        LeafQueryData, PayloadMetadata, PayloadQueryData, QueryableHeader, QueryablePayload,
        TransactionHash, TransactionQueryData, UpdateAvailabilityData, VidCommonMetadata,
        VidCommonQueryData,
    },
    merklized_state::{
        MerklizedState, MerklizedStateDataSource, MerklizedStateHeightPersistence, Snapshot,
    },
    metrics::PrometheusMetrics,
    node::{NodeDataSource, SyncStatus, TimeWindowQueryData, WindowStart},
    status::{HasMetrics, StatusDataSource},
    Header, Payload, QueryError, QueryResult, VidShare,
};
use anyhow::{bail, Context};
use async_lock::Semaphore;
use async_trait::async_trait;
use backoff::{backoff::Backoff, ExponentialBackoff, ExponentialBackoffBuilder};
use derivative::Derivative;
use futures::{
    channel::oneshot,
    future::{self, join_all, BoxFuture, Either, Future, FutureExt},
    stream::{self, BoxStream, StreamExt},
};
use hotshot_types::traits::{
    metrics::{Gauge, Metrics},
    node_implementation::NodeType,
};
use jf_merkle_tree::{prelude::MerkleProof, MerkleTreeScheme};
use std::{
    cmp::{max, min},
    fmt::{Debug, Display},
    iter::repeat_with,
    marker::PhantomData,
    ops::{Bound, Range, RangeBounds},
    time::Duration,
};
use std::{ops::RangeInclusive, sync::Arc};
use tagged_base64::TaggedBase64;
use tokio::{spawn, time::sleep};
use tracing::Instrument;

#[derive(Derivative)]
#[derivative(Clone(bound = ""), Debug(bound = "S: Debug,"))]
pub struct LeafOnlyDataSource<Types, S>
where
    Types: NodeType,
{
    storage: Arc<S>,
    pruner: Pruner<Types, S>,
    notifiers: Arc<Notifiers<Types>>,
    backoff: ExponentialBackoff,
    chunk_size: usize,
    chunk_delay: Duration,
}

impl<Types, S> LeafOnlyDataSource<Types, S>
where
    Types: NodeType,
    Payload<Types>: QueryablePayload<Types>,
    Header<Types>: QueryableHeader<Types>,
    S: VersionedDataSource + PruneStorage + HasMetrics + 'static,
    for<'a> S::Transaction<'a>: UpdateAvailabilityStorage<Types>,
    for<'a> S::ReadOnly<'a>: AvailabilityStorage<Types> + NodeStorage<Types> + PrunedHeightStorage,
{
    pub async fn new(storage: S, chunk_size: usize, chunk_delay: Duration) -> anyhow::Result<Self> {
        let storage = Arc::new(storage);
        let pruner = Pruner::new(storage.clone()).await;
        let backoff = ExponentialBackoffBuilder::default().build();
        let notifiers = Arc::new(Notifiers::default());
        Ok(Self {
            storage,
            pruner,
            notifiers,
            backoff,
            chunk_size,
            chunk_delay,
        })
    }

    fn get_range<R, T>(self, range: R) -> BoxStream<'static, Fetch<T>>
    where
        R: RangeBounds<usize> + Send + 'static,
        T: RangedFetchable<Types>,
    {
        let chunk_size = self.chunk_size;
        self.get_range_with_chunk_size(chunk_size, range)
    }

    /// Same as [`Self::get_range`], but uses the given chunk size instead of the default.
    fn get_range_with_chunk_size<R, T>(
        self,
        chunk_size: usize,
        range: R,
    ) -> BoxStream<'static, Fetch<T>>
    where
        R: RangeBounds<usize> + Send + 'static,
        T: RangedFetchable<Types>,
    {
        let chunk_delay = self.chunk_delay;

        stream::iter(range_chunks(range, chunk_size))
            .then(move |chunk| {
                let self_clone = self.clone();
                async move {
                    {
                        let chunk = self_clone.get_chunk(chunk).await;

                        // Introduce a delay (`chunk_fetch_delay`) between fetching chunks. This
                        // helps to limit constant high CPU usage when fetching long range of data
                        // from the storage
                        sleep(chunk_delay).await;
                        stream::iter(chunk)
                    }
                }
            })
            .flatten()
            .boxed()
    }

    async fn get_chunk<T>(&self, chunk: Range<usize>) -> Vec<Fetch<T>>
    where
        T: RangedFetchable<Types>,
    {
        // Subscribe to notifications first.
        let passive_fetches = join_all(
            chunk
                .clone()
                .map(|i| T::passive_fetch(&self.notifiers, i.into())),
        )
        .await;

        match self.try_get_chunk(&chunk).await {
            Ok(objs) => {
                // Convert to fetches. Objects which are not immediately available (`None` in the
                // chunk) become passive fetches awaiting a notification of availability.
                return objs
                    .into_iter()
                    .zip(passive_fetches)
                    .enumerate()
                    .map(move |(i, (obj, passive_fetch))| match obj {
                        Some(obj) => Fetch::Ready(obj),
                        None => passive(T::Request::from(chunk.start + i), passive_fetch),
                    })
                    .collect();
            }
            Err(err) => {
                tracing::warn!(?chunk, "unable to fetch chunk: {err:#}");
            }
        }

        // return passive fetches for all items in the chunk if the chunk could not be fetched
        // these fetches are resolved as soon as the data is available in storage
        passive_fetches
            .into_iter()
            .enumerate()
            .map(move |(i, passive_fetch)| {
                passive(T::Request::from(chunk.start + i), passive_fetch)
            })
            .collect()
    }

    /// Try to get a range of objects from local storage
    ///
    /// If this function succeeded, then for each object in the requested range, either:
    /// * the object was available locally, and corresponds to `Some(_)` object in the result
    /// * the object was not available locally (and corresponds to `None` in the result)
    /// This function will fail if it could not be determined which objects in the requested range
    /// are available locally
    async fn try_get_chunk<T>(&self, chunk: &Range<usize>) -> anyhow::Result<Vec<Option<T>>>
    where
        T: RangedFetchable<Types>,
    {
        let mut tx = self.read().await.context("opening read transaction")?;
        let ts = T::load_range(&mut tx, chunk.clone())
            .await
            .context(format!("when fetching items in range {chunk:?}"))?;

        // Log and discard error information; we want a list of Option where None indicates an
        // object is not yet available.
        // When objects are not expected to exist, `load_range` should just return a truncated list
        // rather than returning `Err` objects, so if there are errors in here they are unexpected
        // and we do want to log them.
        let ts = ts.into_iter().filter_map(ResultExt::ok_or_trace);

        let mut results = Vec::with_capacity(chunk.len());
        for t in ts {
            while chunk.start + results.len() < t.height() as usize {
                tracing::debug!(
                    "item {} in chunk not available, will be fetched",
                    results.len()
                );

                results.push(None);
            }

            results.push(Some(t));
        }

        while results.len() < chunk.len() {
            results.push(None);
        }

        Ok(results)
    }
}

impl<Types, S> VersionedDataSource for LeafOnlyDataSource<Types, S>
where
    Types: NodeType,
    S: VersionedDataSource + Send + Sync,
{
    type Transaction<'a>
        = S::Transaction<'a>
    where
        Self: 'a;
    type ReadOnly<'a>
        = S::ReadOnly<'a>
    where
        Self: 'a;

    async fn write(&self) -> anyhow::Result<Self::Transaction<'_>> {
        self.storage.write().await
    }

    async fn read(&self) -> anyhow::Result<Self::ReadOnly<'_>> {
        self.storage.read().await
    }
}

#[async_trait]
impl<Types, S> NodeDataSource<Types> for LeafOnlyDataSource<Types, S>
where
    Types: NodeType,
    S: VersionedDataSource + 'static,
    for<'a> S::ReadOnly<'a>: NodeStorage<Types>,
{
    async fn block_height(&self) -> QueryResult<usize> {
        let mut tx = self.read().await.map_err(|err| QueryError::Error {
            message: err.to_string(),
        })?;
        tx.block_height().await
    }

    async fn count_transactions_in_range(
        &self,
        _range: impl RangeBounds<usize> + Send,
    ) -> QueryResult<usize> {
        Err(QueryError::Error {
            message: "transaction count is not supported for leaf only data source".to_string(),
        })
    }

    async fn payload_size_in_range(
        &self,
        _range: impl RangeBounds<usize> + Send,
    ) -> QueryResult<usize> {
        Err(QueryError::Error {
            message: "payload size is not supported for leaf only data source".to_string(),
        })
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
        Err(QueryError::Error {
            message: "sync status is not available in leafonly data source".to_string(),
        })
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
impl<Types, S> AvailabilityDataSource<Types> for LeafOnlyDataSource<Types, S>
where
    Types: NodeType,
    Payload<Types>: QueryablePayload<Types>,
    Header<Types>: QueryableHeader<Types>,
    S: VersionedDataSource + PruneStorage + HasMetrics + 'static,
    for<'a> S::Transaction<'a>: UpdateAvailabilityStorage<Types>,
    for<'a> S::ReadOnly<'a>: AvailabilityStorage<Types> + NodeStorage<Types> + PrunedHeightStorage,
{
    async fn get_leaf<ID>(&self, id: ID) -> QueryResult<Fetch<LeafQueryData<Types>>>
    where
        ID: Into<LeafId<Types>> + Send + Sync,
    {
        let mut tx = self.read().await.map_err(|e| QueryError::Error {
            message: e.to_string(),
        })?;
        tx.get_leaf(id.into()).await.map(Fetch::Ready)
    }

    async fn get_header<ID>(&self, id: ID) -> QueryResult<Fetch<Header<Types>>>
    where
        ID: Into<BlockId<Types>> + Send + Sync,
    {
        let mut tx = self.read().await.map_err(|e| QueryError::Error {
            message: e.to_string(),
        })?;

        tx.get_header(id.into()).await.map(Fetch::Ready)
    }

    async fn get_block<ID>(&self, id: ID) -> QueryResult<Fetch<BlockQueryData<Types>>>
    where
        ID: Into<BlockId<Types>> + Send + Sync,
    {
        let mut tx = self.read().await.map_err(|e| QueryError::Error {
            message: e.to_string(),
        })?;
        tx.get_block(id.into()).await.map(Fetch::Ready)
    }

    async fn get_payload<ID>(&self, _id: ID) -> QueryResult<Fetch<PayloadQueryData<Types>>>
    where
        ID: Into<BlockId<Types>> + Send + Sync,
    {
        Err(QueryError::Error {
            message: "payload is not supported for leaf only data source".to_string(),
        })
    }

    async fn get_payload_metadata<ID>(&self, _id: ID) -> QueryResult<Fetch<PayloadMetadata<Types>>>
    where
        ID: Into<BlockId<Types>> + Send + Sync,
    {
        Err(QueryError::Error {
            message: "payload metadata is not supported for leaf only data source".to_string(),
        })
    }

    async fn get_vid_common<ID>(&self, id: ID) -> QueryResult<Fetch<VidCommonQueryData<Types>>>
    where
        ID: Into<BlockId<Types>> + Send + Sync,
    {
        let mut tx = self.read().await.map_err(|e| QueryError::Error {
            message: e.to_string(),
        })?;
        tx.get_vid_common(id.into()).await.map(Fetch::Ready)
    }

    async fn get_vid_common_metadata<ID>(
        &self,
        id: ID,
    ) -> QueryResult<Fetch<VidCommonMetadata<Types>>>
    where
        ID: Into<BlockId<Types>> + Send + Sync,
    {
        let mut tx = self.read().await.map_err(|e| QueryError::Error {
            message: e.to_string(),
        })?;
        tx.get_vid_common_metadata(id.into())
            .await
            .map(Fetch::Ready)
    }

    async fn get_leaf_range<R>(&self, range: R) -> QueryResult<FetchStream<LeafQueryData<Types>>>
    where
        R: RangeBounds<usize> + Send + 'static,
    {
        Ok(self.clone().get_range(range).boxed())
    }

    async fn get_header_range<R>(&self, range: R) -> QueryResult<FetchStream<Header<Types>>>
    where
        R: RangeBounds<usize> + Send + 'static,
    {
        let leaves = self.get_leaf_range(range).await?;
        Ok(leaves
            .map(|fetch| fetch.map(|leaf| leaf.leaf.block_header().clone()))
            .boxed())
    }

    async fn get_block_range<R>(&self, _range: R) -> QueryResult<FetchStream<BlockQueryData<Types>>>
    where
        R: RangeBounds<usize> + Send + 'static,
    {
        Err(QueryError::Error {
            message: "block range is not supported for leaf only data source".to_string(),
        })
    }

    async fn get_payload_range<R>(
        &self,
        _range: R,
    ) -> QueryResult<FetchStream<PayloadQueryData<Types>>>
    where
        R: RangeBounds<usize> + Send + 'static,
    {
        Err(QueryError::Error {
            message: "payload is not supported for leaf only data source".to_string(),
        })
    }

    async fn get_payload_metadata_range<R>(
        &self,
        _range: R,
    ) -> QueryResult<FetchStream<PayloadMetadata<Types>>>
    where
        R: RangeBounds<usize> + Send + 'static,
    {
        Err(QueryError::Error {
            message: "payload metadata is not supported for leaf only data source".to_string(),
        })
    }

    async fn get_vid_common_range<R>(
        &self,
        range: R,
    ) -> QueryResult<FetchStream<VidCommonQueryData<Types>>>
    where
        R: RangeBounds<usize> + Send + 'static,
    {
        Ok(self.clone().get_range(range).boxed())
    }

    async fn get_vid_common_metadata_range<R>(
        &self,
        range: R,
    ) -> QueryResult<FetchStream<VidCommonMetadata<Types>>>
    where
        R: RangeBounds<usize> + Send + 'static,
    {
        Ok(self.clone().get_range(range).boxed())
    }

    async fn get_leaf_range_rev(
        &self,
        start: Bound<usize>,
        end: usize,
    ) -> QueryResult<FetchStream<LeafQueryData<Types>>> {
        self.get_leaf_range(convert_bound_to_range(start, end))
            .await
    }

    async fn get_block_range_rev(
        &self,
        start: Bound<usize>,
        end: usize,
    ) -> QueryResult<FetchStream<BlockQueryData<Types>>> {
        self.get_block_range(convert_bound_to_range(start, end))
            .await
    }

    async fn get_payload_range_rev(
        &self,
        _start: Bound<usize>,
        _end: usize,
    ) -> QueryResult<FetchStream<PayloadQueryData<Types>>> {
        Err(QueryError::Error {
            message: "payload is not supported for leaf only data source".to_string(),
        })
    }

    async fn get_payload_metadata_range_rev(
        &self,
        _start: Bound<usize>,
        _end: usize,
    ) -> QueryResult<FetchStream<PayloadMetadata<Types>>> {
        Err(QueryError::Error {
            message: "payload metadata is not supported for leaf only data source".to_string(),
        })
    }

    async fn get_vid_common_range_rev(
        &self,
        start: Bound<usize>,
        end: usize,
    ) -> QueryResult<FetchStream<VidCommonQueryData<Types>>> {
        self.get_vid_common_range(convert_bound_to_range(start, end))
            .await
    }

    async fn get_vid_common_metadata_range_rev(
        &self,
        start: Bound<usize>,
        end: usize,
    ) -> QueryResult<FetchStream<VidCommonMetadata<Types>>> {
        self.get_vid_common_metadata_range(convert_bound_to_range(start, end))
            .await
    }

    async fn get_transaction(
        &self,
        hash: TransactionHash<Types>,
    ) -> QueryResult<Fetch<TransactionQueryData<Types>>> {
        let mut tx = self.read().await.map_err(|e| QueryError::Error {
            message: e.to_string(),
        })?;
        tx.get_transaction(hash).await.map(Fetch::Ready)
    }

    async fn subscribe_blocks(
        &self,
        _from: usize,
    ) -> QueryResult<BoxStream<'static, BlockQueryData<Types>>> {
        Err(QueryError::Error {
            message: "block subscription is not supported for leaf only data source".to_string(),
        })
    }

    async fn subscribe_payloads(
        &self,
        _from: usize,
    ) -> QueryResult<BoxStream<'static, PayloadQueryData<Types>>> {
        Err(QueryError::Error {
            message: "payload subscription is not supported for leaf only data source".to_string(),
        })
    }

    async fn subscribe_payload_metadata(
        &self,
        _from: usize,
    ) -> QueryResult<BoxStream<'static, PayloadMetadata<Types>>> {
        Err(QueryError::Error {
            message: "payload metadata subscription is not supported for leaf only data source"
                .to_string(),
        })
    }

    async fn subscribe_leaves(
        &self,
        from: usize,
    ) -> QueryResult<BoxStream<'static, LeafQueryData<Types>>> {
        Ok(self
            .get_leaf_range(from..)
            .await?
            .then(Fetch::resolve)
            .boxed())
    }

    async fn subscribe_vid_common(
        &self,
        from: usize,
    ) -> QueryResult<BoxStream<'static, VidCommonQueryData<Types>>> {
        Ok(self
            .get_vid_common_range(from..)
            .await?
            .then(Fetch::resolve)
            .boxed())
    }

    async fn subscribe_vid_common_metadata(
        &self,
        from: usize,
    ) -> QueryResult<BoxStream<'static, VidCommonMetadata<Types>>> {
        Ok(self
            .get_vid_common_metadata_range(from..)
            .await?
            .then(Fetch::resolve)
            .boxed())
    }
}

fn convert_bound_to_range(start: Bound<usize>, end: usize) -> RangeInclusive<usize> {
    match start {
        Bound::Included(s) => s..=end,
        Bound::Excluded(s) => (s + 1)..=end,
        Bound::Unbounded => 0..=end,
    }
}

impl<Types, S> UpdateAvailabilityData<Types> for LeafOnlyDataSource<Types, S>
where
    Types: NodeType,
    Payload<Types>: QueryablePayload<Types>,
    S: VersionedDataSource + 'static,
    for<'a> S::Transaction<'a>: UpdateAvailabilityStorage<Types>,
    for<'a> S::ReadOnly<'a>: AvailabilityStorage<Types> + NodeStorage<Types> + PrunedHeightStorage,
{
    async fn append(&self, mut info: BlockInfo<Types>) -> anyhow::Result<()> {
        info.block = None;

        let try_store = || async {
            let mut tx = self.storage.write().await?;
            info.clone().store(&mut tx).await?;
            tracing::info!(?info, "appended !!!");
            tx.commit().await
        };

        let mut backoff = self.backoff.clone();
        backoff.reset();
        loop {
            let Err(_) = try_store().await else {
                break;
            };

            let Some(delay) = backoff.next_backoff() else {
                break;
            };
            tracing::info!(?delay, "retrying failed operation");
            sleep(delay).await;
        }
        info.notify(&self.notifiers).await;
        Ok(())
    }
}

#[async_trait]
impl<Types, S> StatusDataSource for LeafOnlyDataSource<Types, S>
where
    Types: NodeType,
    S: VersionedDataSource + HasMetrics + Send + Sync + 'static,
    for<'a> S::ReadOnly<'a>: NodeStorage<Types>,
{
    async fn block_height(&self) -> QueryResult<usize> {
        let mut tx = self.read().await.map_err(|err| QueryError::Error {
            message: err.to_string(),
        })?;
        tx.block_height().await
    }
}

#[async_trait]
impl<Types, S> PrunedHeightDataSource for LeafOnlyDataSource<Types, S>
where
    Types: NodeType,
    S: VersionedDataSource + HasMetrics + Send + Sync + 'static,
    for<'a> S::ReadOnly<'a>: PrunedHeightStorage,
{
    async fn load_pruned_height(&self) -> anyhow::Result<Option<u64>> {
        let mut tx = self.read().await?;
        tx.load_pruned_height().await
    }
}

impl<Types, S> AsRef<S> for LeafOnlyDataSource<Types, S>
where
    Types: NodeType,
{
    fn as_ref(&self) -> &S {
        &self.storage
    }
}

impl<Types, S> HasMetrics for LeafOnlyDataSource<Types, S>
where
    Types: NodeType,
    S: HasMetrics,
{
    fn metrics(&self) -> &PrometheusMetrics {
        self.as_ref().metrics()
    }
}

#[async_trait]
impl<Types, S, State, const ARITY: usize> MerklizedStateDataSource<Types, State, ARITY>
    for LeafOnlyDataSource<Types, S>
where
    Types: NodeType,
    S: VersionedDataSource + 'static,
    for<'a> S::ReadOnly<'a>: MerklizedStateStorage<Types, State, ARITY>,

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
impl<Types, S> MerklizedStateHeightPersistence for LeafOnlyDataSource<Types, S>
where
    Types: NodeType,
    Payload<Types>: QueryablePayload<Types>,
    S: VersionedDataSource + 'static,
    for<'a> S::ReadOnly<'a>: MerklizedStateHeightStorage,
{
    async fn get_last_state_height(&self) -> QueryResult<usize> {
        let mut tx = self.read().await.map_err(|err| QueryError::Error {
            message: err.to_string(),
        })?;
        tx.get_last_state_height().await
    }
}
