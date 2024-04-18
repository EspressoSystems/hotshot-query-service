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

use super::VersionedDataSource;
use crate::{
    availability::{
        AvailabilityDataSource, BlockId, BlockQueryData, Fetch, LeafId, LeafQueryData,
        PayloadQueryData, QueryablePayload, TransactionHash, TransactionIndex,
        UpdateAvailabilityData, VidCommonQueryData,
    },
    merklized_state::{
        MerklizedState, MerklizedStateDataSource, MerklizedStateHeightPersistence, Snapshot,
        UpdateStateData,
    },
    metrics::PrometheusMetrics,
    node::{NodeDataSource, SyncStatus, TimeWindowQueryData, WindowStart},
    status::StatusDataSource,
    Header, Payload, QueryResult, VidShare,
};
use async_trait::async_trait;
use hotshot_types::traits::node_implementation::NodeType;
use jf_primitives::merkle_tree::prelude::MerkleProof;
use std::ops::RangeBounds;

/// Wrapper to add extensibility to an existing data source.
///
/// [`ExtensibleDataSource`] adds app-specific data to any existing data source. It implements all
/// the data source traits defined in this crate as long as the underlying data source does so,
/// which means it can be used as state for instantiating the APIs defined in this crate. At the
/// same time, it provides access to an application-defined state type, which means it can also be
/// used to implement application-specific endpoints.
///
/// [`ExtensibleDataSource`] implements `AsRef<U>` and `AsMut<U>` for some user-defined type `U`, so
/// your API extensions can always access application-specific state from [`ExtensibleDataSource`].
/// We can use this to complete the [UTXO example](crate#extension) by extending our data source
/// with an index to look up transactions by the UTXOs they contain:
///
/// ```
/// # use async_trait::async_trait;
/// # use hotshot_query_service::availability::{AvailabilityDataSource, TransactionIndex};
/// # use hotshot_query_service::data_source::ExtensibleDataSource;
/// # use hotshot_query_service::testing::mocks::MockTypes as AppTypes;
/// # use std::collections::HashMap;
/// # #[async_trait]
/// # trait UtxoDataSource: AvailabilityDataSource<AppTypes> {
/// #   async fn find_utxo(&self, utxo: u64) -> Option<(usize, TransactionIndex<AppTypes>, usize)>;
/// # }
/// type UtxoIndex = HashMap<u64, (usize, TransactionIndex<AppTypes>, usize)>;
///
/// #[async_trait]
/// impl<UnderlyingDataSource> UtxoDataSource for
///     ExtensibleDataSource<UnderlyingDataSource, UtxoIndex>
/// where
///     UnderlyingDataSource: AvailabilityDataSource<AppTypes> + Send + Sync,
/// {
///     async fn find_utxo(&self, utxo: u64) -> Option<(usize, TransactionIndex<AppTypes>, usize)> {
///         self.as_ref().get(&utxo).cloned()
///     }
/// }
/// ```
#[derive(Clone, Copy, Debug)]
pub struct ExtensibleDataSource<D, U> {
    data_source: D,
    user_data: U,
}

impl<D, U> ExtensibleDataSource<D, U> {
    pub fn new(data_source: D, user_data: U) -> Self {
        Self {
            data_source,
            user_data,
        }
    }

    /// Access the underlying data source.
    ///
    /// This functionality is provided as an inherent method rather than an implementation of the
    /// [`AsRef`] trait so that `self.as_ref()` unambiguously returns `&U`, helping with type
    /// inference.
    pub fn inner(&self) -> &D {
        &self.data_source
    }

    /// Mutably access the underlying data source.
    ///
    /// This functionality is provided as an inherent method rather than an implementation of the
    /// [`AsMut`] trait so that `self.as_mut()` unambiguously returns `&U`, helping with type
    /// inference.
    pub fn inner_mut(&mut self) -> &mut D {
        &mut self.data_source
    }
}

impl<D, U> AsRef<U> for ExtensibleDataSource<D, U> {
    fn as_ref(&self) -> &U {
        &self.user_data
    }
}

impl<D, U> AsMut<U> for ExtensibleDataSource<D, U> {
    fn as_mut(&mut self) -> &mut U {
        &mut self.user_data
    }
}

#[async_trait]
impl<D, U> VersionedDataSource for ExtensibleDataSource<D, U>
where
    D: VersionedDataSource + Send,
    U: Send,
{
    type Error = D::Error;

    async fn commit(&mut self) -> Result<(), Self::Error> {
        self.data_source.commit().await
    }

    async fn revert(&mut self) {
        self.data_source.revert().await
    }
}

#[async_trait]
impl<D, U, Types> AvailabilityDataSource<Types> for ExtensibleDataSource<D, U>
where
    D: AvailabilityDataSource<Types> + Send + Sync,
    U: Send + Sync,
    Types: NodeType,
    Payload<Types>: QueryablePayload,
{
    type LeafRange<R> = D::LeafRange<R>
    where
        R: RangeBounds<usize> + Send;
    type BlockRange<R> = D::BlockRange<R>
    where
        R: RangeBounds<usize> + Send;
    type PayloadRange<R> = D::PayloadRange<R>
    where
        R: RangeBounds<usize> + Send;
    type VidCommonRange<R> = D::VidCommonRange<R>
    where
        R: RangeBounds<usize> + Send;

    async fn get_leaf<ID>(&self, id: ID) -> Fetch<LeafQueryData<Types>>
    where
        ID: Into<LeafId<Types>> + Send + Sync,
    {
        self.data_source.get_leaf(id).await
    }
    async fn get_block<ID>(&self, id: ID) -> Fetch<BlockQueryData<Types>>
    where
        ID: Into<BlockId<Types>> + Send + Sync,
    {
        self.data_source.get_block(id).await
    }
    async fn get_payload<ID>(&self, id: ID) -> Fetch<PayloadQueryData<Types>>
    where
        ID: Into<BlockId<Types>> + Send + Sync,
    {
        self.data_source.get_payload(id).await
    }
    async fn get_vid_common<ID>(&self, id: ID) -> Fetch<VidCommonQueryData<Types>>
    where
        ID: Into<BlockId<Types>> + Send + Sync,
    {
        self.data_source.get_vid_common(id).await
    }
    async fn get_leaf_range<R>(&self, range: R) -> Self::LeafRange<R>
    where
        R: RangeBounds<usize> + Send + 'static,
    {
        self.data_source.get_leaf_range(range).await
    }
    async fn get_block_range<R>(&self, range: R) -> Self::BlockRange<R>
    where
        R: RangeBounds<usize> + Send + 'static,
    {
        self.data_source.get_block_range(range).await
    }
    async fn get_payload_range<R>(&self, range: R) -> Self::PayloadRange<R>
    where
        R: RangeBounds<usize> + Send + 'static,
    {
        self.data_source.get_payload_range(range).await
    }
    async fn get_vid_common_range<R>(&self, range: R) -> Self::VidCommonRange<R>
    where
        R: RangeBounds<usize> + Send + 'static,
    {
        self.data_source.get_vid_common_range(range).await
    }
    async fn get_block_with_transaction(
        &self,
        hash: TransactionHash<Types>,
    ) -> Fetch<(BlockQueryData<Types>, TransactionIndex<Types>)> {
        self.data_source.get_block_with_transaction(hash).await
    }
}

#[async_trait]
impl<D, U, Types> UpdateAvailabilityData<Types> for ExtensibleDataSource<D, U>
where
    D: UpdateAvailabilityData<Types> + Send + Sync,
    U: Send + Sync,
    Types: NodeType,
{
    type Error = D::Error;

    async fn insert_leaf(&mut self, leaf: LeafQueryData<Types>) -> Result<(), Self::Error> {
        self.data_source.insert_leaf(leaf).await
    }

    async fn insert_block(&mut self, block: BlockQueryData<Types>) -> Result<(), Self::Error> {
        self.data_source.insert_block(block).await
    }

    async fn insert_vid(
        &mut self,
        common: VidCommonQueryData<Types>,
        share: Option<VidShare>,
    ) -> Result<(), Self::Error> {
        self.data_source.insert_vid(common, share).await
    }
}

#[async_trait]
impl<D, U, Types> NodeDataSource<Types> for ExtensibleDataSource<D, U>
where
    D: NodeDataSource<Types> + Send + Sync,
    U: Send + Sync,
    Types: NodeType,
{
    async fn block_height(&self) -> QueryResult<usize> {
        self.data_source.block_height().await
    }
    async fn count_transactions(&self) -> QueryResult<usize> {
        self.data_source.count_transactions().await
    }
    async fn payload_size(&self) -> QueryResult<usize> {
        self.data_source.payload_size().await
    }
    async fn vid_share<ID>(&self, id: ID) -> QueryResult<VidShare>
    where
        ID: Into<BlockId<Types>> + Send + Sync,
    {
        self.data_source.vid_share(id).await
    }
    async fn sync_status(&self) -> QueryResult<SyncStatus> {
        self.data_source.sync_status().await
    }
    async fn get_header_window(
        &self,
        start: impl Into<WindowStart<Types>> + Send + Sync,
        end: u64,
    ) -> QueryResult<TimeWindowQueryData<Header<Types>>> {
        self.data_source.get_header_window(start, end).await
    }
}

#[async_trait]
impl<D, U> StatusDataSource for ExtensibleDataSource<D, U>
where
    D: StatusDataSource + Send + Sync,
    U: Send + Sync,
{
    async fn block_height(&self) -> QueryResult<usize> {
        self.data_source.block_height().await
    }

    fn metrics(&self) -> &PrometheusMetrics {
        self.data_source.metrics()
    }
}

#[async_trait]
impl<D, U, Types, State, const ARITY: usize> MerklizedStateDataSource<Types, State, ARITY>
    for ExtensibleDataSource<D, U>
where
    D: MerklizedStateDataSource<Types, State, ARITY> + Send + Sync,
    U: Send + Sync,
    Types: NodeType,
    State: MerklizedState<Types, ARITY>,
{
    async fn get_path(
        &self,
        snapshot: Snapshot<Types, State, ARITY>,
        key: State::Key,
    ) -> QueryResult<MerkleProof<State::Entry, State::Key, State::T, ARITY>> {
        self.data_source.get_path(snapshot, key).await
    }

    async fn keys(&self, snapshot: Snapshot<Types, State, ARITY>) -> QueryResult<Vec<State::Key>> {
        self.data_source.keys(snapshot).await
    }

    async fn get_snapshot(&self, snapshot: Snapshot<Types, State, ARITY>) -> QueryResult<State> {
        self.data_source.get_snapshot(snapshot).await
    }
}

#[async_trait]
impl<D, U> MerklizedStateHeightPersistence for ExtensibleDataSource<D, U>
where
    D: MerklizedStateHeightPersistence + Send + Sync,
    U: Send + Sync,
{
    async fn set_last_state_height(&mut self, height: usize) -> QueryResult<()> {
        self.data_source.set_last_state_height(height).await
    }
    async fn get_last_state_height(&self) -> QueryResult<usize> {
        self.data_source.get_last_state_height().await
    }
}

#[async_trait]
impl<D, U, Types, State, const ARITY: usize> UpdateStateData<Types, State, ARITY>
    for ExtensibleDataSource<D, U>
where
    D: UpdateStateData<Types, State, ARITY> + Send + Sync,
    U: Send + Sync,
    State: MerklizedState<Types, ARITY>,
    Types: NodeType,
{
    async fn insert_merkle_nodes(
        &mut self,
        path: MerkleProof<State::Entry, State::Key, State::T, ARITY>,
        traversal_path: Vec<usize>,
        block_number: u64,
    ) -> QueryResult<()> {
        self.data_source
            .insert_merkle_nodes(path, traversal_path, block_number)
            .await
    }
}

#[cfg(any(test, feature = "testing"))]
mod impl_testable_data_source {
    use super::*;
    use crate::{
        data_source::UpdateDataSource,
        testing::{
            consensus::{DataSourceLifeCycle, TestableDataSource},
            mocks::MockTypes,
        },
    };
    use hotshot::types::Event;

    #[async_trait]
    impl<D, U> DataSourceLifeCycle for ExtensibleDataSource<D, U>
    where
        D: TestableDataSource,
        U: Default + Send + Sync + 'static,
    {
        type Storage = D::Storage;

        async fn create(node_id: usize) -> Self::Storage {
            D::create(node_id).await
        }

        async fn connect(storage: &Self::Storage) -> Self {
            Self::new(D::connect(storage).await, Default::default())
        }

        async fn reset(storage: &Self::Storage) -> Self {
            Self::new(D::reset(storage).await, Default::default())
        }

        async fn handle_event(&mut self, event: &Event<MockTypes>) {
            self.update(event).await.unwrap();
            self.commit().await.unwrap();
        }
    }
}

#[cfg(test)]
mod test {
    use super::ExtensibleDataSource;
    use crate::testing::consensus::MockDataSource;

    // For some reason this is the only way to import the macro defined in another module of this
    // crate.
    use crate::*;

    instantiate_data_source_tests!(ExtensibleDataSource<MockDataSource, ()>);
}
