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

use async_std::sync::Arc;
use commit::{Commitment, Committable, RawCommitmentBuilder};
use derive_more::{Display, Index, IndexMut};
use hotshot::{
    traits::{
        election::static_committee::{
            GeneralStaticCommittee, StaticElectionConfig, StaticVoteToken,
        },
        implementations::{MemoryCommChannel, MemoryStorage},
        Block, NodeImplementation,
    },
    types::Message,
};
use hotshot_types::{
    data::{ValidatingLeaf, ValidatingProposal, ViewNumber},
    message::ValidatingMessage,
    traits::{
        block_contents::Transaction,
        consensus_type::validating_consensus::ValidatingConsensus,
        election::QuorumExchange,
        node_implementation::{ChannelMaps, NodeType, ValidatingExchanges},
        signature_key::ed25519::Ed25519Pub,
        state::{State, TestableBlock, TestableState},
    },
    vote::QuorumVote,
};
use rand::RngCore;
use serde::{Deserialize, Serialize};
use snafu::{ensure, Snafu};
use std::collections::{BTreeSet, HashSet};

#[derive(Clone, Debug, Snafu)]
pub enum MockError {
    InvalidBlockParent {
        last_block: Commitment<MockBlock>,
        parent: Commitment<MockBlock>,
    },
    DoubleSpend {
        nonce: u64,
    },
}

#[derive(PartialEq, Eq, Hash, Serialize, Deserialize, Clone, Debug)]
pub struct MockTransaction {
    pub nonce: u64,
}

impl Committable for MockTransaction {
    fn commit(&self) -> Commitment<Self> {
        commit::RawCommitmentBuilder::new("MockTransaction")
            .u64_field("nonce", self.nonce)
            .finalize()
    }

    fn tag() -> String {
        "MOCKTXN".to_string()
    }
}

impl Transaction for MockTransaction {}

#[derive(Clone, Debug, Display, PartialEq, Eq, Serialize, Deserialize, Hash)]
#[display(fmt = "{:?}", self)]
pub struct MockState {
    pub last_block: Commitment<MockBlock>,
    pub spent: Arc<BTreeSet<u64>>,
}

impl Default for MockState {
    fn default() -> Self {
        Self {
            last_block: MockBlock::genesis().parent,
            spent: Default::default(),
        }
    }
}

impl Committable for MockState {
    fn commit(&self) -> Commitment<Self> {
        RawCommitmentBuilder::new("MockState")
            .field("last_block", self.last_block)
            .var_size_bytes(&bincode::serialize(&self.spent).unwrap())
            .finalize()
    }

    fn tag() -> String {
        "MOCKSTATE".to_string()
    }
}

impl MockState {
    fn validate(&self, block: &MockBlock) -> Result<(), MockError> {
        ensure!(
            block.parent == self.last_block,
            InvalidBlockParentSnafu {
                last_block: self.last_block,
                parent: block.parent,
            }
        );
        if let Some(txn) = block.iter().find(|txn| self.spent.contains(&txn.nonce)) {
            return Err(DoubleSpendSnafu { nonce: txn.nonce }.build());
        }
        Ok(())
    }
}

impl State for MockState {
    type Error = MockError;
    type BlockType = MockBlock;
    type Time = ViewNumber;

    fn next_block(prev_commitment: Option<Self>) -> Self::BlockType {
        MockBlock::new(
            prev_commitment
                .expect("No previous state commitment")
                .last_block,
        )
    }

    fn validate_block(&self, block: &Self::BlockType, _view_number: &Self::Time) -> bool {
        self.validate(block).is_ok()
    }

    fn append(
        &self,
        block: &Self::BlockType,
        _view_number: &Self::Time,
    ) -> Result<Self, Self::Error> {
        self.validate(block)?;

        let mut spent = (*self.spent).clone();
        for txn in block.iter() {
            spent.insert(txn.nonce);
        }
        Ok(Self {
            last_block: block.commit(),
            spent: Arc::new(spent),
        })
    }

    fn on_commit(&self) {}
}

impl TestableState for MockState {
    fn create_random_transaction(
        state: Option<&Self>,
        rng: &mut dyn RngCore,
        _padding: u64,
    ) -> <Self::BlockType as Block>::Transaction {
        loop {
            let nonce = rng.next_u64();
            if let Some(state) = state {
                if state.spent.contains(&nonce) {
                    continue;
                }
            }
            break MockTransaction { nonce };
        }
    }
}

#[derive(PartialEq, Eq, Hash, Serialize, Deserialize, Clone, Debug, Display, Index, IndexMut)]
#[display(fmt = "{:?}", self)]
pub struct MockBlock {
    pub parent: Commitment<MockBlock>,
    #[index]
    #[index_mut]
    pub transactions: Vec<MockTransaction>,
}

impl Committable for MockBlock {
    fn commit(&self) -> Commitment<Self> {
        RawCommitmentBuilder::new("MockBlock")
            .field("parent", self.parent)
            .array_field(
                "transactions",
                &self
                    .transactions
                    .iter()
                    .map(|txn| txn.commit())
                    .collect::<Vec<_>>(),
            )
            .finalize()
    }

    fn tag() -> String {
        "MOCKBLOCK".to_string()
    }
}

impl MockBlock {
    pub fn new(parent: Commitment<MockBlock>) -> Self {
        Self {
            parent,
            transactions: Default::default(),
        }
    }

    pub fn genesis() -> Self {
        Self::new(RawCommitmentBuilder::new("GenesisMockBlock").finalize())
    }

    pub fn len(&self) -> usize {
        self.transactions.len()
    }

    pub fn is_empty(&self) -> bool {
        self.transactions.is_empty()
    }

    pub fn iter(&self) -> impl Iterator<Item = &MockTransaction> {
        self.transactions.iter()
    }

    pub fn iter_mut(&mut self) -> impl Iterator<Item = &mut MockTransaction> {
        self.transactions.iter_mut()
    }
}

impl IntoIterator for MockBlock {
    type Item = MockTransaction;
    type IntoIter = std::vec::IntoIter<MockTransaction>;

    fn into_iter(self) -> Self::IntoIter {
        self.transactions.into_iter()
    }
}

impl Block for MockBlock {
    type Transaction = MockTransaction;
    type Error = MockError;

    fn add_transaction_raw(&self, tx: &Self::Transaction) -> Result<Self, Self::Error> {
        let mut block = self.clone();
        block.transactions.push(tx.clone());
        Ok(block)
    }
    fn contained_transactions(&self) -> HashSet<Commitment<Self::Transaction>> {
        self.transactions.iter().map(|tx| tx.commit()).collect()
    }

    fn new() -> Self {
        Self::genesis()
    }
}

impl TestableBlock for MockBlock {
    fn genesis() -> Self {
        Self::genesis()
    }

    fn txn_count(&self) -> u64 {
        self.transactions.len() as u64
    }
}

#[derive(
    Copy, Clone, Debug, Default, Hash, PartialEq, Eq, PartialOrd, Ord, Serialize, Deserialize,
)]
pub struct MockTypes;

impl NodeType for MockTypes {
    type ConsensusType = ValidatingConsensus;
    type Time = ViewNumber;
    type BlockType = MockBlock;
    type SignatureKey = Ed25519Pub;
    type VoteTokenType = StaticVoteToken<Ed25519Pub>;
    type Transaction = MockTransaction;
    type ElectionConfigType = StaticElectionConfig;
    type StateType = MockState;
}

pub type MockLeaf = ValidatingLeaf<MockTypes>;
pub type MockMembership =
    GeneralStaticCommittee<MockTypes, MockLeaf, <MockTypes as NodeType>::SignatureKey>;
pub type MockNetwork =
    MemoryCommChannel<MockTypes, MockNodeImpl, MockProposal, MockVote, MockMembership>;
pub type MockProposal = ValidatingProposal<MockTypes, MockLeaf>;
pub type MockVote = QuorumVote<MockTypes, MockLeaf>;

#[derive(
    Copy, Clone, Debug, Default, Hash, PartialEq, Eq, PartialOrd, Ord, Serialize, Deserialize,
)]
pub struct MockNodeImpl;

impl NodeImplementation<MockTypes> for MockNodeImpl {
    type Storage = MemoryStorage<MockTypes, Self::Leaf>;
    type Leaf = MockLeaf;
    type ConsensusMessage = ValidatingMessage<MockTypes, Self>;
    type Exchanges = ValidatingExchanges<
        MockTypes,
        Message<MockTypes, Self>,
        QuorumExchange<
            MockTypes,
            Self::Leaf,
            MockProposal,
            MockMembership,
            MockNetwork,
            Message<MockTypes, Self>,
        >,
    >;

    fn new_channel_maps(
        start_view: <MockTypes as NodeType>::Time,
    ) -> (
        ChannelMaps<MockTypes, Self>,
        Option<ChannelMaps<MockTypes, Self>>,
    ) {
        (ChannelMaps::new(start_view), None)
    }
}
