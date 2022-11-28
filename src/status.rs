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

use crate::api::load_api;
use clap::Args;
use derive_more::From;
use serde::{Deserialize, Serialize};
use snafu::Snafu;
use std::path::PathBuf;
use tide_disco::{api::ApiError, method::ReadState, Api, RequestError, StatusCode};

pub(crate) mod data_source;
pub(crate) mod query_data;
pub use data_source::*;
pub use query_data::*;

#[derive(Args, Default)]
pub struct Options {
    #[arg(long = "status-api-path", env = "HOTSHOT_STATUS_API_PATH")]
    pub api_path: Option<PathBuf>,

    /// Additional API specification files to merge with `status-api-path`.
    ///
    /// These optional files may contain route definitions for application-specific routes that have
    /// been added as extensions to the basic status API.
    #[arg(
        long = "status-extension",
        env = "HOTSHOT_STATUS_EXTENSIONS",
        value_delimiter = ','
    )]
    pub extensions: Vec<PathBuf>,
}

#[derive(Clone, Debug, From, Snafu, Deserialize, Serialize)]
pub enum Error {
    Request { source: RequestError },
}

impl Error {
    pub fn status(&self) -> StatusCode {
        match self {
            Self::Request { .. } => StatusCode::BadRequest,
        }
    }
}

pub fn define_api<State>(options: &Options) -> Result<Api<State, Error>, ApiError>
where
    State: 'static + Send + Sync + ReadState,
    <State as ReadState>::State: Send + Sync + StatusDataSource,
{
    let mut api = load_api(
        options.api_path.as_ref(),
        include_str!("../api/status.toml"),
        &options.extensions,
    )?;
    api.with_version("0.0.1".parse().unwrap());
    Ok(api)
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::{data_source::QueryData, testing::mocks::MockTypes};
    use async_std::sync::RwLock;

    #[test]
    fn instantiate_api() {
        define_api::<RwLock<QueryData<MockTypes, ()>>>(&Default::default()).unwrap();
    }
}
