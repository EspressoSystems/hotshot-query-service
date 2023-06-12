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

use surf_disco::StatusCode;

use crate::Error;

impl surf_disco::Error for Error {
    fn catch_all(status: StatusCode, message: String) -> Self {
        Self::Custom { status, message }
    }

    fn status(&self) -> StatusCode {
        match self {
            Self::Availability { source } => source.status(),
            Self::Status { source } => source.status(),
            Self::Custom { status, .. } => *status,
        }
    }
}
