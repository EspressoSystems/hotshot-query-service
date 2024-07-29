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

use crate::{
    availability::{
        BlockId, BlockQueryData, LeafId, LeafQueryData, PayloadQueryData, QueryablePayload,
        TransactionHash, TransactionQueryData, UpdateAvailabilityData, VidCommonQueryData,
    },
    data_source::{
        notifier::Notifier,
        storage::{
            pruning::{PruneStorage, PrunerCfg},
            AvailabilityStorage,
        },
        update::{self, VersionedDataSource},
    },
    merklized_state::{MerklizedState, UpdateStateData},
    node::{NodeDataSource, SyncStatus, TimeWindowQueryData, WindowStart},
    types::HeightIndexed,
    Header, Payload, QueryResult, VidShare,
};
use async_std::sync::RwLock;
use async_trait::async_trait;
use futures::future::{BoxFuture, Future, FutureExt};
use hotshot_types::traits::node_implementation::NodeType;
use jf_merkle_tree::prelude::MerkleProof;
use std::{cmp::max, ops::RangeBounds};

#[derive(Debug)]
pub(super) struct NotifyStorage<Types, S>
where
    Types: NodeType,
{
    storage: S,
    notifiers: Notifiers<Types>,

    /// In-memory cache for commonly read fields.
    ///
    /// This cache keeps fields which are read frequently and which can be kept up-to-date by dead
    /// reckoning on each update. Thus, we avoid ever reading these fields from the database after
    /// startup, and we don't have to write back when the cache is modified either.
    ///
    /// Currently the cached fields include latest height and pruned height.
    ///
    /// The concurrency semantics are inherited from the underlying database. That is, any read from
    /// the cache is *always* guaranteed to be consistent with the results we would have gotten had
    /// we read from the database at that instant, and thus it is as if there is no cache at all --
    /// except performance. This is accomplished by exclusively locking the cache during any
    /// critical section where it might be out of sync with the database, for example just before
    /// committing a database transaction, until the cache is updated with the results of that
    /// transaction. While the cache is locked (hopefully only briefly) readers can bypass it and
    /// read directly from the database, getting consistent data to the extent that the databse
    /// itself maintains consistency. Thus, a reader should never block on cache updates.
    cache: RwLock<Cache>,
}

impl<Types, S> AsRef<S> for NotifyStorage<Types, S>
where
    Types: NodeType,
{
    fn as_ref(&self) -> &S {
        &self.storage
    }
}

impl<Types, S> NotifyStorage<Types, S>
where
    Types: NodeType,
    S: NodeDataSource<Types> + PruneStorage + Sync,
{
    pub(super) async fn new(storage: S) -> anyhow::Result<Self> {
        let height = storage.block_height().await? as u64;
        let pruned_height = storage.load_pruned_height().await?;

        Ok(Self {
            cache: RwLock::new(Cache {
                height,
                pruned_height,
            }),
            storage,
            notifiers: Default::default(),
        })
    }
}

impl<Types, S> NotifyStorage<Types, S>
where
    Types: NodeType,
{
    pub(super) fn notifiers(&self) -> &Notifiers<Types> {
        &self.notifiers
    }

    /// Read a value which may be accessible from the cache.
    ///
    /// In most cases, this simply extracts a value from memory. However, if the in-memory cache is
    /// locked (for example, a transaction is in the process of being committed) the value can also
    /// be fetched from storage. In this way, this function will never have to wait for a writer to
    /// complete in order to return a value, allowing readers to proceed concurrently with writers
    /// and preventing locking queues from forming behind writers.
    async fn read_cached<T>(
        &self,
        from_cache: impl Fn(&Cache) -> T,
        from_storage: impl FnOnce(&S) -> BoxFuture<anyhow::Result<T>>,
    ) -> T {
        // Read from cache if unlocked.
        if let Some(cache) = self.cache.try_read() {
            return from_cache(&cache);
        }

        // Try reading from storage if the cache is locked.
        match from_storage(&self.storage).await {
            Ok(t) => return t,
            Err(err) => {
                tracing::warn!("unable to read cached value from storage; waiting for cache to unlock: {err:#}");
            }
        }

        // If we failed to read from storage for some reason, fall back to waiting on the cache.
        let cache = self.cache.read().await;
        from_cache(&cache)
    }
}

impl<Types, S> NotifyStorage<Types, S>
where
    Types: NodeType,
    S: NodeDataSource<Types> + Sync,
{
    pub(super) async fn height(&self) -> u64 {
        self.read_cached(
            |cache| cache.height,
            |storage| async move { Ok(storage.block_height().await? as u64) }.boxed(),
        )
        .await
    }
}

impl<Types, S> NotifyStorage<Types, S>
where
    Types: NodeType,
    S: PruneStorage + Sync,
{
    pub(super) fn get_pruning_config(&self) -> Option<PrunerCfg> {
        self.storage.get_pruning_config()
    }

    pub(super) async fn pruned_height(&self) -> Option<u64> {
        self.read_cached(
            |cache| cache.pruned_height,
            |storage| storage.load_pruned_height().boxed(),
        )
        .await
    }

    pub(super) async fn prune(&self) {
        // We loop until the whole run pruner run is complete
        let mut pruner = S::Pruner::default();
        loop {
            match self.storage.prune(&mut pruner).await {
                Ok(Some(height)) => {
                    tracing::warn!("Pruned to height {height}");
                    self.cache.write().await.pruned_height = Some(height);
                }
                Ok(None) => {
                    tracing::warn!("pruner run complete.");
                    break;
                }
                Err(e) => {
                    tracing::error!("pruner run failed: {e:?}");
                    break;
                }
            }
        }
    }
}

impl<Types, S> NotifyStorage<Types, S>
where
    Types: NodeType,
    S: VersionedDataSource,
{
    pub(super) async fn transaction(
        &self,
    ) -> anyhow::Result<Transaction<'_, Types, S::Transaction<'_>>> {
        Ok(Transaction {
            inner: self.storage.transaction().await?,
            cache: &self.cache,
            notifiers: &self.notifiers,
            updated_height: None,
            updated_pruned_height: None,
        })
    }
}

pub struct Transaction<'a, Types, T>
where
    Types: NodeType,
{
    inner: T,
    cache: &'a RwLock<Cache>,
    notifiers: &'a Notifiers<Types>,

    // Modifications to the in-memory cache. If applicable, these will be applied (atomically) to
    // the in-memory cache upon commit.
    updated_height: Option<u64>,
    updated_pruned_height: Option<Option<u64>>,
}

impl<'a, Types, T> AsRef<T> for Transaction<'a, Types, T>
where
    Types: NodeType,
{
    fn as_ref(&self) -> &T {
        &self.inner
    }
}

impl<'a, Types, T> AsMut<T> for Transaction<'a, Types, T>
where
    Types: NodeType,
{
    fn as_mut(&mut self) -> &mut T {
        &mut self.inner
    }
}

impl<'a, Types, T> update::Transaction for Transaction<'a, Types, T>
where
    Types: NodeType,
    T: update::Transaction,
{
    async fn commit(self) -> anyhow::Result<()> {
        // Lock the in-memory cache. Even though we will not write to the cache until the storage
        // update completes successfully, we must hold an exclusive lock on the cache throughout,
        // because for a brief moment between committing the storage transaction and updating the
        // cache, the cache may be out of sync with storage.
        let mut cache = self.cache.write().await;

        // Commit to storage.
        self.inner.commit().await?;

        // Update cache.
        if let Some(updated_height) = self.updated_height {
            cache.height = max(cache.height, updated_height);
        }
        if let Some(updated_pruned_height) = self.updated_pruned_height {
            cache.pruned_height = max(cache.pruned_height, updated_pruned_height);
        }

        Ok(())
    }

    fn revert(self) -> impl Future + Send {
        self.inner.revert()
    }
}

#[async_trait]
impl<'a, Types, T, State, const ARITY: usize> UpdateStateData<Types, State, ARITY>
    for Transaction<'a, Types, T>
where
    Types: NodeType,
    State: MerklizedState<Types, ARITY>,
    T: UpdateStateData<Types, State, ARITY> + Send + Sync + 'static,
{
    async fn set_last_state_height(&mut self, height: usize) -> anyhow::Result<()> {
        self.inner.set_last_state_height(height).await
    }

    async fn insert_merkle_nodes(
        &mut self,
        path: MerkleProof<State::Entry, State::Key, State::T, ARITY>,
        traversal_path: Vec<usize>,
        block_number: u64,
    ) -> anyhow::Result<()> {
        self.inner
            .insert_merkle_nodes(path, traversal_path, block_number)
            .await
    }
}

#[async_trait]
impl<'a, Types, T> UpdateAvailabilityData<Types> for Transaction<'a, Types, T>
where
    Types: NodeType,
    Payload<Types>: QueryablePayload<Types>,
    T: UpdateAvailabilityData<Types> + Send + Sync,
{
    async fn insert_leaf(&mut self, leaf: LeafQueryData<Types>) -> anyhow::Result<()> {
        // Send a notification about the newly received leaf.
        self.notifiers.leaf.notify(&leaf).await;

        // Record the latest height we have received in this transaction, so we can insert it in the
        // in-memory cache on commit. The known height of the chain is one more than the height of
        // its heighest object.
        self.updated_height = max(self.updated_height, Some(leaf.height() + 1));

        // Store the new leaf.
        self.inner.insert_leaf(leaf).await
    }

    async fn insert_block(&mut self, block: BlockQueryData<Types>) -> anyhow::Result<()> {
        // Send a notification about the newly received block.
        self.notifiers.block.notify(&block).await;

        // Record the latest height we have received in this transaction, so we can insert it in the
        // in-memory cache on commit. The known height of the chain is one more than the height of
        // its heighest object.
        self.updated_height = max(self.updated_height, Some(block.height() + 1));

        // Store the new block.
        self.inner.insert_block(block).await
    }

    async fn insert_vid(
        &mut self,
        common: VidCommonQueryData<Types>,
        share: Option<VidShare>,
    ) -> anyhow::Result<()> {
        // Send a notification about the newly received data.
        self.notifiers.vid_common.notify(&common).await;

        // Record the latest height we have received in this transaction, so we can insert it in the
        // in-memory cache on commit. The known height of the chain is one more than the height of
        // its heighest object.
        self.updated_height = max(self.updated_height, Some(common.height() + 1));

        // Store the new data.
        self.inner.insert_vid(common, share).await
    }
}

/// [`Transaction`] implements [`AvailabilityStorage`], not the richer [`AvailabilityDataSource`].
///
/// Privding the full [`AvailabilityDataSource`] interface through a transaction would be ill
/// advised, because read operations through this interface trigger side effects (fetches) that may
/// not be rolled back if the transaction is rolled back, and may also compete for resources being
/// used by the transaction itself. Thus, we only provide [`AvailabilityStorage`], which returns
/// errors if data is not available instead of fetching.
#[async_trait]
impl<'a, Types, T> AvailabilityStorage<Types> for Transaction<'a, Types, T>
where
    Types: NodeType,
    Payload<Types>: QueryablePayload<Types>,
    T: AvailabilityStorage<Types>,
{
    async fn get_leaf(&self, id: LeafId<Types>) -> QueryResult<LeafQueryData<Types>> {
        self.inner.get_leaf(id).await
    }

    async fn get_block(&self, id: BlockId<Types>) -> QueryResult<BlockQueryData<Types>> {
        self.inner.get_block(id).await
    }

    async fn get_header(&self, id: BlockId<Types>) -> QueryResult<Header<Types>> {
        self.inner.get_header(id).await
    }

    async fn get_payload(&self, id: BlockId<Types>) -> QueryResult<PayloadQueryData<Types>> {
        self.inner.get_payload(id).await
    }

    async fn get_vid_common(&self, id: BlockId<Types>) -> QueryResult<VidCommonQueryData<Types>> {
        self.inner.get_vid_common(id).await
    }

    async fn get_leaf_range<R>(
        &self,
        range: R,
    ) -> QueryResult<Vec<QueryResult<LeafQueryData<Types>>>>
    where
        R: RangeBounds<usize> + Send + 'static,
    {
        self.inner.get_leaf_range(range).await
    }

    async fn get_block_range<R>(
        &self,
        range: R,
    ) -> QueryResult<Vec<QueryResult<BlockQueryData<Types>>>>
    where
        R: RangeBounds<usize> + Send + 'static,
    {
        self.inner.get_block_range(range).await
    }

    async fn get_payload_range<R>(
        &self,
        range: R,
    ) -> QueryResult<Vec<QueryResult<PayloadQueryData<Types>>>>
    where
        R: RangeBounds<usize> + Send + 'static,
    {
        self.inner.get_payload_range(range).await
    }

    async fn get_vid_common_range<R>(
        &self,
        range: R,
    ) -> QueryResult<Vec<QueryResult<VidCommonQueryData<Types>>>>
    where
        R: RangeBounds<usize> + Send + 'static,
    {
        self.inner.get_vid_common_range(range).await
    }

    async fn get_transaction(
        &self,
        hash: TransactionHash<Types>,
    ) -> QueryResult<TransactionQueryData<Types>> {
        self.inner.get_transaction(hash).await
    }
}

#[async_trait]
impl<'a, Types, T> NodeDataSource<Types> for Transaction<'a, Types, T>
where
    Types: NodeType,
    T: NodeDataSource<Types> + Sync,
{
    async fn block_height(&self) -> QueryResult<usize> {
        if let Some(height) = self.updated_height {
            return Ok(height as usize);
        }

        // Read from cache if unlocked.
        if let Some(cache) = self.cache.try_read() {
            return Ok(cache.height as usize);
        }

        // Try reading from storage if the cache is locked.
        self.inner.block_height().await
    }

    async fn count_transactions(&self) -> QueryResult<usize> {
        self.inner.count_transactions().await
    }

    async fn payload_size(&self) -> QueryResult<usize> {
        self.inner.payload_size().await
    }

    async fn vid_share<ID>(&self, id: ID) -> QueryResult<VidShare>
    where
        ID: Into<BlockId<Types>> + Send + Sync,
    {
        self.inner.vid_share(id).await
    }

    async fn sync_status(&self) -> QueryResult<SyncStatus> {
        self.inner.sync_status().await
    }

    async fn get_header_window(
        &self,
        start: impl Into<WindowStart<Types>> + Send + Sync,
        end: u64,
    ) -> QueryResult<TimeWindowQueryData<Header<Types>>> {
        self.inner.get_header_window(start, end).await
    }
}

#[derive(Debug)]
pub(super) struct Notifiers<Types>
where
    Types: NodeType,
{
    pub(super) block: Notifier<BlockQueryData<Types>>,
    pub(super) leaf: Notifier<LeafQueryData<Types>>,
    pub(super) vid_common: Notifier<VidCommonQueryData<Types>>,
}

impl<Types> Default for Notifiers<Types>
where
    Types: NodeType,
{
    fn default() -> Self {
        Self {
            block: Notifier::new(),
            leaf: Notifier::new(),
            vid_common: Notifier::new(),
        }
    }
}

#[derive(Clone, Debug)]
struct Cache {
    height: u64,
    pruned_height: Option<u64>,
}
