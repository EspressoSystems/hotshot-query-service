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

//! A generic algorithm for updating a HotShot Query Service data source with new data.
use crate::availability::{BlockQueryData, LeafQueryData, UpdateAvailabilityData};
use crate::status::UpdateStatusData;
use async_trait::async_trait;
use hotshot::types::{Event, EventType};
use hotshot_types::traits::{block_contents::BlockHeader, node_implementation::NodeType};
use std::error::Error;
use std::fmt::Debug;
use std::iter::once;

/// An extension trait for types which implement the update trait for each API module.
///
/// If a type implements both [UpdateAvailabilityData] and [UpdateStatusData], then it can be fully
/// kept up to date through two interfaces:
/// * [populate_metrics](UpdateStatusData::populate_metrics), to get a handle for populating the
///   status metrics, which should be used when initializing a
///   [SystemContextHandle](hotshot::types::SystemContextHandle)
/// * [update](Self::update), to update the query state when a new HotShot event is emitted
#[async_trait]
pub trait UpdateDataSource<Types: NodeType>:
    UpdateAvailabilityData<Types> + UpdateStatusData
{
    /// Update query state based on a new consensus event.
    ///
    /// The caller is responsible for authenticating `event`. This function does not perform any
    /// authentication, and if given an invalid `event` (one which does not follow from the latest
    /// known state of the ledger) it may panic or silently accept the invalid `event`. This allows
    /// the best possible performance in the case where the query service and the HotShot instance
    /// are running in the same process (and thus the event stream, directly from HotShot) is
    /// trusted.
    ///
    /// If you want to update the data source with an untrusted event, for example one received from
    /// a peer over the network, you must authenticate it first.
    async fn update(&mut self, event: &Event<Types>) -> Result<(), Self::Error>;
}

#[async_trait]
impl<Types: NodeType, T: UpdateAvailabilityData<Types> + UpdateStatusData + Send>
    UpdateDataSource<Types> for T
{
    async fn update(&mut self, event: &Event<Types>) -> Result<(), Self::Error> {
        if let EventType::Decide { leaf_chain, qc, .. } = &event.event {
            // `qc` justifies the first (most recent) leaf...
            let qcs = once((**qc).clone())
                // ...and each leaf in the chain justifies the subsequent leaf (its parent) through
                // `leaf.justify_qc`.
                .chain(leaf_chain.iter().map(|leaf| leaf.get_justify_qc()))
                // Put the QCs in chronological order.
                .rev()
                // The oldest QC is the `justify_qc` of the oldest leaf, which does not justify any
                // leaf in the new chain, so we don't need it.
                .skip(1);
            for (qc, leaf) in qcs.zip(leaf_chain.iter().rev()) {
                // `LeafQueryData::new` only fails if `qc` does not reference `leaf`. We have just
                // gotten `leaf` and `qc` directly from a consensus `Decide` event, so they are
                // guaranteed to correspond, and this should never panic.
                self.insert_leaf(
                    LeafQueryData::new(leaf.clone(), qc.clone()).expect("inconsistent leaf"),
                )
                .await?;

                if let Some(block) = leaf.get_block_payload() {
                    // For the same reason, this will not panic either.
                    self.insert_block(
                        BlockQueryData::new(leaf.clone(), qc.clone(), block)
                            .expect("inconsistent block"),
                    )
                    .await?;
                } else {
                    tracing::error!(
                        "block {} not available at decide",
                        leaf.block_header.block_number()
                    );
                }
            }
        }
        Ok(())
    }
}

/// A data source with an atomic transaction-based synchronization interface.
///
/// Any changes made to a versioned data source are initially visible when queried through that same
/// data source object only. They are not immediately written back to storage, which means that a
/// new data source object opened against the same persistent storage will not reflect the changes.
/// In particular, this means that if the process restarts and reopens its storage, uncommitted
/// changes will be lost.
///
/// The methods provided by this trait can be used to write such pending changes back to persistent
/// storage ([commit](Self::commit)) so that they become visible to other clients of the same
/// underlying storage, and are saved if the process restarts. It also allows pending changes to be
/// rolled back ([revert](Self::revert)) so that they are never written back to storage and are no
/// longer reflected even through the data source object which was used to make the changes.
#[async_trait]
pub trait VersionedDataSource {
    type Error: Error + Debug + Send + Sync + 'static;

    /// Atomically commit to all outstanding modifications to the data.
    ///
    /// If this method fails, outstanding changes are left unmodified. The caller may opt to retry
    /// or to erase outstanding changes with [`revert`](Self::revert).
    async fn commit(&mut self) -> Result<(), Self::Error>;

    /// Erase all oustanding modifications to the data.
    ///
    /// This function must not return if it has failed to revert changes. Inability to revert
    /// changes to the database is considered a fatal error, and this function may panic.
    async fn revert(&mut self);
}
