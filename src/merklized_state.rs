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

//! Api for querying merklized state
//!
//! The state API provides an interface for serving queries against arbitrarily old snapshots of the state.
//! This allows a full Merkle tree to be reconstructed from storage.
//! If any parent state is missing then the partial snapshot can not be queried.
use std::{fmt::Display, path::PathBuf};

use clap::Args;
use derive_more::From;
use futures::FutureExt;
use hotshot_types::traits::node_implementation::NodeType;
use serde::{Deserialize, Serialize};
use snafu::{ResultExt, Snafu};
use std::fmt::Debug;
use tagged_base64::TaggedBase64;
use tide_disco::{api::ApiError, method::ReadState, Api, RequestError, StatusCode};
use versioned_binary_serialization::version::StaticVersionType;

use crate::{api::load_api, QueryError};

pub(crate) mod data_source;
pub use data_source::*;

#[derive(Args, Default)]
pub struct Options {
    #[arg(
        long = "merklized-state-api-path",
        env = "HOTSHOT_MERKLIZED_STATE_API_PATH"
    )]
    pub api_path: Option<PathBuf>,

    /// Additional API specification files to merge with `merklized-state-api-path`.
    ///
    /// These optional files may contain route definitions for application-specific routes that have
    /// been added as extensions to the basic status API.
    #[arg(
        long = "merklized-state-extension",
        env = "HOTSHOT_MERKLIZED_STATE_EXTENSIONS",
        value_delimiter = ','
    )]
    pub extensions: Vec<toml::Value>,
}

#[derive(Clone, Debug, From, Snafu, Deserialize, Serialize)]
pub enum Error {
    Request {
        source: RequestError,
    },
    #[snafu(display("{source}"))]
    Query {
        source: QueryError,
    },
    Custom {
        message: String,
        status: StatusCode,
    },
}

impl Error {
    pub fn status(&self) -> StatusCode {
        match self {
            Self::Request { .. } => StatusCode::BadRequest,
            Self::Query { source, .. } => source.status(),
            Self::Custom { status, .. } => *status,
        }
    }
}

pub fn define_api<
    State,
    Types: NodeType,
    M: MerklizedState<Types>,
    Ver: StaticVersionType + 'static,
>(
    options: &Options,
) -> Result<Api<State, Error, Ver>, ApiError>
where
    State: 'static + Send + Sync + ReadState,
    <State as ReadState>::State: Send + Sync + MerklizedStateDataSource<Types, M>,
    Types: NodeType,
    for<'a> <M::Commit as TryFrom<&'a TaggedBase64>>::Error: Display,
{
    let mut api = load_api::<State, Error, Ver>(
        options.api_path.as_ref(),
        include_str!("../api/state.toml"),
        options.extensions.clone(),
    )?;

    api.with_version("0.0.1".parse().unwrap())
        .get("get_path", move |req, state| {
            async move {
                // Determine the snapshot type based on request parameters, either index or commit
                let snapshot = if let Some(height) = req.opt_integer_param("height")? {
                    Snapshot::Index(height)
                } else {
                    Snapshot::Commit(req.blob_param("commit")?)
                };

                let key = req.string_param("key")?;
                let key = key.parse::<M::Key>().map_err(|_| Error::Custom {
                    message: "failed to parse Key param".to_string(),
                    status: StatusCode::InternalServerError,
                })?;

                state.get_path(snapshot, key).await.context(QuerySnafu)
            }
            .boxed()
        })?;

    Ok(api)
}
