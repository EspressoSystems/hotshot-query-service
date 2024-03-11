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

#![cfg(feature = "sql-data-source")]

use std::{
    borrow::Cow,
    cmp::min,
    fmt::Display,
    ops::{Bound, RangeBounds},
    pin::Pin,
    str::FromStr,
    time::Duration,
};

pub use anyhow::Error;
use async_std::{
    net::ToSocketAddrs,
    sync::Arc,
    task::{sleep, spawn},
};
use async_trait::async_trait;
use chrono::Utc;
use commit::Committable;
use futures::{
    channel::oneshot,
    future::{select, Either, FutureExt},
    stream::{BoxStream, StreamExt, TryStreamExt},
    task::{Context, Poll},
    AsyncRead, AsyncWrite,
};
use hotshot_types::{
    simple_certificate::QuorumCertificate,
    traits::{
        block_contents::{BlockHeader, BlockPayload},
        node_implementation::NodeType,
    },
};
// This needs to be reexported so that we can reference it by absolute path relative to this crate
// in the expansion of `include_migrations`, even when `include_migrations` is invoked from another
// crate which doesn't have `include_dir` as a dependency.
pub use include_dir::include_dir;
use itertools::{izip, Itertools};
use postgres_native_tls::TlsConnector;
pub use refinery::Migration;
use snafu::OptionExt;
pub use tokio_postgres as postgres;
use tokio_postgres::{
    config::Host,
    tls::TlsConnect,
    types::{BorrowToSql, ToSql},
    Client, NoTls, Row, ToStatement,
};

use super::{pruning::PrunedHeightStorage, AvailabilityStorage};
pub use crate::include_migrations;
use crate::{
    availability::{
        BlockId, BlockQueryData, LeafId, LeafQueryData, PayloadQueryData, QueryableHeader,
        QueryablePayload, TransactionHash, TransactionIndex, UpdateAvailabilityData,
        VidCommonQueryData,
    },
    data_source::{
        storage::pruning::{PruneStorage, PrunerCfg, PrunerConfig},
        VersionedDataSource,
    },
    node::{NodeDataSource, SyncStatus, TimeWindowQueryData, WindowStart},
    types::HeightIndexed,
    Header, Leaf, MissingSnafu, NotFoundSnafu, Payload, QueryError, QueryResult, VidShare,
};

/// Embed migrations from the given directory into the current binary.
///
/// The macro invocation `include_migrations!(path)` evaluates to an expression of type `impl
/// Iterator<Item = Migration>`. Each migration must be a text file which is an immediate child of
/// `path`, and there must be no non-migration files in `path`. The migration files must have names
/// of the form `V${version}__${name}.sql`, where `version` is a positive integer indicating how the
/// migration is to be ordered relative to other migrations, and `name` is a descriptive name for
/// the migration.
///
/// `path` should be an absolute path. It is possible to give a path relative to the root of the
/// invoking crate by using environment variable expansions and the `CARGO_MANIFEST_DIR` environment
/// variable.
///
/// As an example, this is the invocation used to load the default migrations from the
/// `hotshot-query-service` crate. The migrations are located in a directory called `migrations` at
/// the root of the crate.
///
/// ```
/// # use hotshot_query_service::data_source::sql::{include_migrations, Migration};
/// let migrations: Vec<Migration> =
///     include_migrations!("$CARGO_MANIFEST_DIR/migrations").collect();
/// assert_eq!(migrations[0].version(), 10);
/// assert_eq!(migrations[0].name(), "init_schema");
/// ```
///
/// Note that a similar macro is available from Refinery:
/// [embed_migrations](https://docs.rs/refinery/0.8.11/refinery/macro.embed_migrations.html). This
/// macro differs in that it evaluates to an iterator of [migrations](Migration), making it an
/// expression macro, while `embed_migrations` is a statement macro that defines a module which
/// provides access to the embedded migrations only indirectly via a
/// [`Runner`](https://docs.rs/refinery/0.8.11/refinery/struct.Runner.html). The direct access to
/// migrations provided by [`include_migrations`] makes this macro easier to use with
/// [`Config::migrations`], for combining custom migrations with [`default_migrations`].
#[macro_export]
macro_rules! include_migrations {
    ($dir:tt) => {
        $crate::data_source::storage::sql::include_dir!($dir)
            .files()
            .map(|file| {
                let path = file.path();
                let name = path
                    .file_name()
                    .and_then(std::ffi::OsStr::to_str)
                    .unwrap_or_else(|| {
                        panic!(
                            "migration file {} must have a non-empty UTF-8 name",
                            path.display()
                        )
                    });
                let sql = file
                    .contents_utf8()
                    .unwrap_or_else(|| panic!("migration file {name} must use UTF-8 encoding"));
                $crate::data_source::storage::sql::Migration::unapplied(name, sql)
                    .expect("invalid migration")
            })
    };
}

/// The migrations requied to build the default schema for this version of [`SqlStorage`].
pub fn default_migrations() -> Vec<Migration> {
    let mut migrations = include_migrations!("$CARGO_MANIFEST_DIR/migrations").collect::<Vec<_>>();

    // Check version uniqueness and sort by version.
    validate_migrations(&mut migrations).expect("default migrations are invalid");

    // Check that all migration versions are multiples of 10, so that custom migrations can be
    // inserted in between.
    for m in &migrations {
        if m.version() == 0 || m.version() % 10 != 0 {
            panic!(
                "default migration version {} is not a positive multiple of 10",
                m.version()
            );
        }
    }

    migrations
}

/// Validate and preprocess a sequence of migrations.
///
/// * Ensure all migrations have distinct versions
/// * Ensure migrations are sorted by increasing version
fn validate_migrations(migrations: &mut [Migration]) -> Result<(), Error> {
    migrations.sort_by_key(|m| m.version());

    // Check version uniqueness.
    for (prev, next) in migrations.iter().zip(migrations.iter().skip(1)) {
        if next <= prev {
            return Err(Error::msg(format!(
                "migration versions are not strictly increasing ({prev}->{next})"
            )));
        }
    }

    Ok(())
}

/// Add custom migrations to a default migration sequence.
///
/// Migrations in `custom` replace migrations in `default` with the same version. Otherwise, the two
/// sequences `default` and `custom` are merged so that the resulting sequence is sorted by
/// ascending version number. Each of `default` and `custom` is assumed to be the output of
/// [`validate_migrations`]; that is, each is sorted by version and contains no duplicate versions.
fn add_custom_migrations(
    default: impl IntoIterator<Item = Migration>,
    custom: impl IntoIterator<Item = Migration>,
) -> impl Iterator<Item = Migration> {
    default
        .into_iter()
        // Merge sorted lists, joining pairs of equal version into `EitherOrBoth::Both`.
        .merge_join_by(custom, |l, r| l.version().cmp(&r.version()))
        // Prefer the custom migration for a given version when both default and custom versions
        // are present.
        .map(|pair| pair.reduce(|_, custom| custom))
}

/// Postgres client config.
#[derive(Clone, Debug)]
pub struct Config {
    pgcfg: postgres::Config,
    host: String,
    port: u16,
    schema: String,
    reset: bool,
    migrations: Vec<Migration>,
    no_migrations: bool,
    tls: bool,
    pruner_cfg: Option<PrunerCfg>,
}

impl Default for Config {
    fn default() -> Self {
        Self {
            pgcfg: Default::default(),
            host: "localhost".into(),
            port: 5432,
            schema: "hotshot".into(),
            reset: false,
            migrations: vec![],
            no_migrations: false,
            tls: false,
            pruner_cfg: None,
        }
    }
}

impl From<postgres::Config> for Config {
    fn from(pgcfg: postgres::Config) -> Self {
        // We connect via TCP manually, without using the host and port from pgcfg. So we need to
        // pull those out of pgcfg if they have been specified, to override the defaults.
        let host = match pgcfg.get_hosts().first() {
            Some(Host::Tcp(host)) => host.to_string(),
            _ => "localhost".into(),
        };
        let port = *pgcfg.get_ports().first().unwrap_or(&5432);
        Self {
            pgcfg,
            host,
            port,
            ..Default::default()
        }
    }
}

impl FromStr for Config {
    type Err = <postgres::Config as FromStr>::Err;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        Ok(postgres::Config::from_str(s)?.into())
    }
}

impl Config {
    /// Set the hostname of the database server.
    ///
    /// The default is `localhost`.
    pub fn host(mut self, host: impl Into<String>) -> Self {
        self.host = host.into();
        self
    }

    /// Set the port on which to connect to the database.
    ///
    /// The default is 5432, the default Postgres port.
    pub fn port(mut self, port: u16) -> Self {
        self.port = port;
        self
    }

    /// Set the DB user to connect as.
    pub fn user(mut self, user: &str) -> Self {
        self.pgcfg.user(user);
        self
    }

    /// Set a password for connecting to the database.
    pub fn password(mut self, password: &str) -> Self {
        self.pgcfg.password(password);
        self
    }

    /// Set the name of the database to connect to.
    pub fn database(mut self, database: &str) -> Self {
        self.pgcfg.dbname(database);
        self
    }

    /// Set the name of the schema to use for queries.
    ///
    /// The default schema is named `hotshot` and is created via the default migrations.
    pub fn schema(mut self, schema: impl Into<String>) -> Self {
        self.schema = schema.into();
        self
    }

    /// Reset the schema on connection.
    ///
    /// When this [`Config`] is used to [`connect`](Self::connect) a
    /// [`SqlDataSource`](crate::data_source::SqlDataSource), if this option is set, the relevant
    /// [`schema`](Self::schema) will first be dropped and then recreated, yielding a completely
    /// fresh instance of the query service.
    ///
    /// This is a particularly useful capability for development and staging environments. Still, it
    /// must be used with extreme caution, as using this will irrevocably delete any data pertaining
    /// to the query service in the database.
    pub fn reset_schema(mut self) -> Self {
        self.reset = true;
        self
    }

    /// Add custom migrations to run when connecting to the database.
    pub fn migrations(mut self, migrations: impl IntoIterator<Item = Migration>) -> Self {
        self.migrations.extend(migrations);
        self
    }

    /// Skip all migrations when connecting to the database.
    pub fn no_migrations(mut self) -> Self {
        self.no_migrations = true;
        self
    }

    /// Use TLS for an encrypted connection to the database.
    pub fn tls(mut self) -> Self {
        self.tls = true;
        self
    }

    pub fn pruner_cfg(mut self, cfg: PrunerCfg) -> Result<Self, Error> {
        cfg.validate()?;
        self.pruner_cfg = Some(cfg);
        Ok(self)
    }
}

/// Storage for the APIs provided in this crate, backed by a remote PostgreSQL database.
#[derive(Debug)]
pub struct SqlStorage {
    client: Arc<Client>,
    tx_in_progress: bool,
    kill: Option<oneshot::Sender<()>>,
    pruner_cfg: Option<PrunerCfg>,
}

impl SqlStorage {
    /// Connect to a remote database.
    pub async fn connect(mut config: Config) -> Result<Self, Error> {
        // Establish a TCP connection to the server.
        let tcp = TcpStream::connect((config.host.as_str(), config.port)).await?;

        // Convert the TCP connection into a postgres connection.
        let (mut client, kill) = if config.tls {
            let tls = TlsConnector::new(native_tls::TlsConnector::new()?, config.host.as_str());
            connect(config.pgcfg, tcp, tls).await?
        } else {
            connect(config.pgcfg, tcp, NoTls).await?
        };

        // Create or connect to the schema for this query service.
        if config.reset {
            client
                .batch_execute(&format!("DROP SCHEMA IF EXISTS {} CASCADE", config.schema))
                .await?;
        }
        client
            .batch_execute(&format!("CREATE SCHEMA IF NOT EXISTS {}", config.schema))
            .await?;
        client
            .batch_execute(&format!("SET search_path TO {}", config.schema))
            .await?;

        // Get migrations and interleave with custom migrations, sorting by version number.
        validate_migrations(&mut config.migrations)?;
        let migrations =
            add_custom_migrations(default_migrations(), config.migrations).collect::<Vec<_>>();

        // Get a migration runner. Depending on the config, we can either use this to actually run
        // the migrations or just check if the database is up to date.
        let runner = refinery::Runner::new(&migrations).set_grouped(true);

        if config.no_migrations {
            // We've been asked not to run any migrations. Abort if the DB is not already up to
            // date.
            let last_applied = runner.get_last_applied_migration_async(&mut client).await?;
            let last_expected = migrations.last();
            if last_applied.as_ref() != last_expected {
                return Err(Error::msg(format!(
                    "DB is out of date: last applied migration is {last_applied:?}, but expected {last_expected:?}"
                )));
            }
        } else {
            // Run migrations using `refinery`.
            match runner.run_async(&mut client).await {
                Ok(report) => {
                    tracing::info!("ran DB migrations: {report:?}");
                }
                Err(err) => {
                    tracing::error!("DB migrations failed: {:?}", err.report());
                    Err(err)?;
                }
            }
        }

        Ok(Self {
            client: Arc::new(client),
            tx_in_progress: false,
            kill: Some(kill),
            pruner_cfg: config.pruner_cfg,
        })
    }

    /// Access the transaction which is accumulating all uncommitted changes to the data source.
    pub async fn transaction(&mut self) -> QueryResult<Transaction<'_>> {
        if !self.tx_in_progress {
            // If there is no transaction in progress, open one.
            self.client
                .batch_execute("BEGIN")
                .await
                .map_err(postgres_err)?;
            self.tx_in_progress = true;
        }
        Ok(Transaction {
            client: Cow::Borrowed(&self.client),
        })
    }
}

impl PrunerConfig for SqlStorage {
    fn set_pruning_config(&mut self, cfg: PrunerCfg) {
        self.pruner_cfg = Some(cfg);
    }

    fn get_pruning_config(&self) -> Option<PrunerCfg> {
        self.pruner_cfg.clone()
    }
}

impl SqlStorage {
    async fn get_minimum_height(&self) -> QueryResult<Option<u64>> {
        let row = self
            .query_one_static("SELECT MIN(height) as height FROM header")
            .await?;

        let height = row.get::<_, Option<i64>>(0).map(|h| h as u64);

        Ok(height)
    }

    async fn get_height_by_timestamp(&self, timestamp: i64) -> QueryResult<Option<u64>> {
        let row = self
            .query_opt(
                "SELECT height FROM header WHERE timestamp <= $1 ORDER BY height DESC LIMIT 1",
                [&timestamp],
            )
            .await?;

        let height = row.map(|row| row.get::<_, i64>(0) as u64);

        Ok(height)
    }

    /// Load a header from storage.
    ///
    /// This function is similar to `AvailabilityStorage::get_header`, but
    /// * does not require the `QueryablePayload` bound that that trait impl does
    /// * makes it easier to specify types since the type parameter is on the function and not on a
    ///   trait impl
    /// * allows type conversions for the `id` parameter
    /// This more ergonomic interface is useful as loading headers is important for many SQL storage
    /// functions, not just the `AvailabilityStorage` interface.
    async fn load_header<Types: NodeType>(
        &self,
        id: impl Into<BlockId<Types>>,
    ) -> QueryResult<Header<Types>> {
        let (where_clause, param) = header_where_clause(id.into());
        // ORDER BY h.height ASC ensures that if there are duplicate blocks (this can happen when
        // selecting by payload ID, as payloads are not unique), we return the first one.
        let query = format!(
            "SELECT {HEADER_COLUMNS}
               FROM header AS h
              WHERE {where_clause}
              ORDER BY h.height ASC
              LIMIT 1"
        );
        let row = self.query_one(&query, [param]).await?;
        parse_header::<Types>(row)
    }
}

#[async_trait]
impl PrunedHeightStorage for SqlStorage {
    type Error = QueryError;
    async fn save_pruned_height(&mut self, height: u64) -> Result<(), Self::Error> {
        // id is set to 1 so that there is only one row in the table.
        // height is updated if the row already exists.
        self.transaction()
            .await?
            .upsert(
                "pruned_height",
                ["id", "last_height"],
                ["id"],
                [[sql_param(&(1_i32)), sql_param(&(height as i64))]],
            )
            .await
    }

    async fn load_pruned_height(&self) -> Result<Option<u64>, Self::Error> {
        let row = self
            .query_opt_static("SELECT last_height FROM pruned_height ORDER BY id DESC LIMIT 1")
            .await?;

        let height = row.map(|row| row.get::<_, i64>(0) as u64);

        Ok(height)
    }
}

#[async_trait]
impl PruneStorage for SqlStorage {
    async fn get_disk_usage(&self) -> QueryResult<u64> {
        let row = self
            .query_one_static("SELECT pg_database_size(current_database())")
            .await?;
        let size: i64 = row.get(0);
        Ok(size as u64)
    }

    async fn prune(&mut self) -> Result<Option<u64>, QueryError> {
        let cfg = self.get_pruning_config().ok_or(QueryError::Error {
            message: "Pruning config not found".to_string(),
        })?;

        let Some(mut height) = self.get_minimum_height().await? else {
            tracing::info!("database is empty, nothing to prune");
            return Ok(None);
        };

        let batch_size = cfg.batch_size();
        let max_usage = cfg.max_usage();
        let mut pruned_height = None;
        // Prune data exceeding target retention in batches
        let target_height = self
            .get_height_by_timestamp(
                Utc::now().timestamp() - (cfg.target_retention().as_secs()) as i64,
            )
            .await?;

        if let Some(target_height) = target_height {
            while height < target_height {
                height = min(height + batch_size, target_height);
                self.query_opt("DELETE FROM header WHERE height <= $1", &[&(height as i64)])
                    .await?;
                pruned_height = Some(height);

                tracing::info!("Pruned data up to height {height}");
            }
        }

        // If threshold is set, prune data exceeding minimum retention in batches
        // This parameter is needed for SQL storage as there is no direct way to get free space.
        if let Some(threshold) = cfg.pruning_threshold() {
            let mut usage = self.get_disk_usage().await?;

            // Prune data exceeding minimum retention in batches starting from minimum height
            // until usage is below threshold
            if usage > threshold {
                tracing::warn!(
                    "Disk usage {usage} exceeds pruning threshold {:?}",
                    cfg.pruning_threshold()
                );
                let minimum_retention_height = self
                    .get_height_by_timestamp(
                        Utc::now().timestamp() - (cfg.minimum_retention().as_secs()) as i64,
                    )
                    .await?;

                if let Some(min_retention_height) = minimum_retention_height {
                    while (usage as f64 / threshold as f64) > (f64::from(max_usage) / 10000.0)
                        && height < min_retention_height
                    {
                        height = min(height + batch_size, min_retention_height);
                        self.query_opt(
                            "DELETE FROM header WHERE height <= $1",
                            &[&(height as i64)],
                        )
                        .await?;
                        usage = self.get_disk_usage().await?;
                        pruned_height = Some(height);
                        tracing::info!("Pruned data up to height {height}");
                    }
                }
            }
        }
        // Vacuum the database to reclaim space.
        // Note: VACUUM FULL is not used as it requires an exclusive lock on the tables, which can
        // cause downtime for the query service.
        self.client
            .batch_execute("VACUUM")
            .await
            .map_err(postgres_err)?;

        Ok(pruned_height)
    }
}

#[async_trait]
impl Query for SqlStorage {
    async fn client(&self) -> Cow<Arc<Client>> {
        Cow::Borrowed(&self.client)
    }
}

impl Drop for SqlStorage {
    fn drop(&mut self) {
        if let Some(kill) = self.kill.take() {
            // Ignore errors, they just mean the task has already exited.
            kill.send(()).ok();
        }
    }
}

#[async_trait]
impl VersionedDataSource for SqlStorage {
    type Error = postgres::error::Error;

    async fn commit(&mut self) -> Result<(), Self::Error> {
        if self.tx_in_progress {
            self.client.batch_execute("COMMIT").await?;
            self.tx_in_progress = false;
        }
        Ok(())
    }

    async fn revert(&mut self) {
        if self.tx_in_progress {
            // If we're trying to roll back a transaction, something has already gone wrong and
            // we're trying to recover. If we're unable to revert the changes and recover, all we
            // can do is panic.
            self.client
                .batch_execute("ROLLBACK")
                .await
                .expect("DB rollback succeeds");
            self.tx_in_progress = false;
        }
    }
}

#[async_trait]
impl<Types> AvailabilityStorage<Types> for SqlStorage
where
    Types: NodeType,
    Payload<Types>: QueryablePayload,
    Header<Types>: QueryableHeader<Types>,
{
    async fn get_leaf(&self, id: LeafId<Types>) -> QueryResult<LeafQueryData<Types>> {
        let (where_clause, param): (&str, Box<dyn ToSql + Send + Sync>) = match id {
            LeafId::Number(n) => ("height = $1", Box::new(n as i64)),
            LeafId::Hash(h) => ("hash = $1", Box::new(h.to_string())),
        };
        let query = format!("SELECT leaf, qc FROM leaf WHERE {where_clause}");
        let row = self.query_one(&query, [param]).await?;
        parse_leaf(row)
    }

    async fn get_block(&self, id: BlockId<Types>) -> QueryResult<BlockQueryData<Types>> {
        let (where_clause, param) = header_where_clause(id);
        // ORDER BY h.height ASC ensures that if there are duplicate blocks (this can happen when
        // selecting by payload ID, as payloads are not unique), we return the first one.
        let query = format!(
            "SELECT {BLOCK_COLUMNS}
              FROM header AS h
              JOIN payload AS p ON h.height = p.height
              WHERE {where_clause}
              ORDER BY h.height ASC
              LIMIT 1"
        );
        let row = self.query_one(&query, [param]).await?;
        parse_block(row)
    }

    async fn get_header(&self, id: BlockId<Types>) -> QueryResult<Header<Types>> {
        self.load_header(id).await
    }

    async fn get_payload(&self, id: BlockId<Types>) -> QueryResult<PayloadQueryData<Types>> {
        let (where_clause, param) = header_where_clause(id);
        // ORDER BY h.height ASC ensures that if there are duplicate blocks (this can happen when
        // selecting by payload ID, as payloads are not unique), we return the first one.
        let query = format!(
            "SELECT {PAYLOAD_COLUMNS}
               FROM header AS h
               JOIN payload AS p ON h.height = p.height
               WHERE {where_clause}
               ORDER BY h.height ASC
               LIMIT 1"
        );
        let row = self.query_one(&query, [param]).await?;
        parse_payload(row)
    }

    async fn get_vid_common(&self, id: BlockId<Types>) -> QueryResult<VidCommonQueryData<Types>> {
        let (where_clause, param) = header_where_clause(id);
        // ORDER BY h.height ASC ensures that if there are duplicate blocks (this can happen when
        // selecting by payload ID, as payloads are not unique), we return the first one.
        let query = format!(
            "SELECT {VID_COMMON_COLUMNS}
               FROM header AS h
               JOIN vid AS v ON h.height = v.height
               WHERE {where_clause}
               ORDER BY h.height ASC
               LIMIT 1"
        );
        let row = self.query_one(&query, [param]).await?;
        parse_vid_common(row)
    }

    async fn get_leaf_range<R>(
        &self,
        range: R,
    ) -> QueryResult<Vec<QueryResult<LeafQueryData<Types>>>>
    where
        R: RangeBounds<usize> + Send,
    {
        let (where_clause, params) = bounds_to_where_clause(range, "height");
        let query = format!("SELECT leaf, qc FROM leaf {where_clause} ORDER BY height ASC");
        let rows = self.query(&query, params).await?;

        Ok(rows.map(|res| parse_leaf(res?)).collect().await)
    }

    async fn get_block_range<R>(
        &self,
        range: R,
    ) -> QueryResult<Vec<QueryResult<BlockQueryData<Types>>>>
    where
        R: RangeBounds<usize> + Send,
    {
        let (where_clause, params) = bounds_to_where_clause(range, "h.height");
        let query = format!(
            "SELECT {BLOCK_COLUMNS}
              FROM header AS h
              JOIN payload AS p ON h.height = p.height
              {where_clause}
              ORDER BY h.height ASC"
        );
        let rows = self.query(&query, params).await?;

        Ok(rows.map(|res| parse_block(res?)).collect().await)
    }

    async fn get_payload_range<R>(
        &self,
        range: R,
    ) -> QueryResult<Vec<QueryResult<PayloadQueryData<Types>>>>
    where
        R: RangeBounds<usize> + Send,
    {
        let (where_clause, params) = bounds_to_where_clause(range, "h.height");
        let query = format!(
            "SELECT {PAYLOAD_COLUMNS}
              FROM header AS h
              JOIN payload AS p ON h.height = p.height
              {where_clause}
              ORDER BY h.height ASC"
        );
        let rows = self.query(&query, params).await?;

        Ok(rows.map(|res| parse_payload(res?)).collect().await)
    }

    async fn get_vid_common_range<R>(
        &self,
        range: R,
    ) -> QueryResult<Vec<QueryResult<VidCommonQueryData<Types>>>>
    where
        R: RangeBounds<usize> + Send,
    {
        let (where_clause, params) = bounds_to_where_clause(range, "h.height");
        let query = format!(
            "SELECT {VID_COMMON_COLUMNS}
              FROM header AS h
              JOIN vid AS v ON h.height = v.height
              {where_clause}
              ORDER BY h.height ASC"
        );
        let rows = self.query(&query, params).await?;

        Ok(rows.map(|res| parse_vid_common(res?)).collect().await)
    }

    async fn get_block_with_transaction(
        &self,
        hash: TransactionHash<Types>,
    ) -> QueryResult<(BlockQueryData<Types>, TransactionIndex<Types>)> {
        // ORDER BY ASC ensures that if there are duplicate transactions, we return the first
        // one.
        let query = format!(
            "SELECT {BLOCK_COLUMNS}, t.index AS tx_index
                FROM header AS h
                JOIN payload AS p ON h.height = p.height
                JOIN transaction AS t ON t.block_height = h.height
                WHERE t.hash = $1
                ORDER BY (t.block_height, t.index) ASC
                LIMIT 1"
        );
        let row = self.query_one(&query, &[&hash.to_string()]).await?;

        // Extract the transaction index.
        let index = row.try_get("tx_index").map_err(|err| QueryError::Error {
            message: format!("error extracting transaction index from query results: {err}"),
        })?;
        let index: TransactionIndex<Types> =
            serde_json::from_value(index).map_err(|err| QueryError::Error {
                message: format!("malformed transaction index: {err}"),
            })?;

        // Extract the block.
        let block = parse_block(row)?;

        Ok((block, index))
    }
}

#[async_trait]
impl<Types> UpdateAvailabilityData<Types> for SqlStorage
where
    Types: NodeType,
    Payload<Types>: QueryablePayload,
    Header<Types>: QueryableHeader<Types>,
{
    type Error = QueryError;

    async fn insert_leaf(&mut self, leaf: LeafQueryData<Types>) -> Result<(), Self::Error> {
        let mut tx = self.transaction().await?;

        // While we don't necessarily have the full block for this leaf yet, we can initialize the
        // header table with block metadata taken from the leaf.
        let header_json =
            serde_json::to_value(&leaf.leaf().block_header).map_err(|err| QueryError::Error {
                message: format!("failed to serialize header: {err}"),
            })?;
        tx.upsert(
            "header",
            ["height", "hash", "payload_hash", "data", "timestamp"],
            ["height"],
            [[
                sql_param(&(leaf.height() as i64)),
                sql_param(&leaf.block_hash().to_string()),
                sql_param(&leaf.leaf().block_header.payload_commitment().to_string()),
                sql_param(&header_json),
                sql_param(&(leaf.leaf().block_header.timestamp() as i64)),
            ]],
        )
        .await?;

        // Similarly, we can initialize the payload table with a null payload, which can help us
        // distinguish between blocks that haven't been produced yet and blocks we haven't received
        // yet when answering queries.
        tx.upsert("payload", ["height"], ["height"], [[leaf.height() as i64]])
            .await?;

        // Finally, we insert the leaf itself, which references the header row we created.
        // Serialize the full leaf and QC to JSON for easy storage.
        let leaf_json = serde_json::to_value(leaf.leaf()).map_err(|err| QueryError::Error {
            message: format!("failed to serialize leaf: {err}"),
        })?;
        let qc_json = serde_json::to_value(leaf.qc()).map_err(|err| QueryError::Error {
            message: format!("failed to serialize QC: {err}"),
        })?;
        tx.upsert(
            "leaf",
            ["height", "hash", "block_hash", "leaf", "qc"],
            ["height"],
            [[
                sql_param(&(leaf.height() as i64)),
                sql_param(&leaf.hash().to_string()),
                sql_param(&leaf.block_hash().to_string()),
                sql_param(&leaf_json),
                sql_param(&qc_json),
            ]],
        )
        .await?;

        Ok(())
    }

    async fn insert_block(&mut self, block: BlockQueryData<Types>) -> Result<(), Self::Error> {
        let mut tx = self.transaction().await?;

        // The header and payload tables should already have been initialized when we inserted the
        // corresponding leaf. All we have to do is add the payload itself and its size.
        let payload = block
            .payload
            .encode()
            .map_err(|err| QueryError::Error {
                message: format!("failed to serialize block: {err}"),
            })?
            .collect::<Vec<_>>();
        tx.upsert(
            "payload",
            ["height", "data", "size"],
            ["height"],
            [[
                sql_param(&(block.height() as i64)),
                sql_param(&payload),
                sql_param(&(block.size() as i32)),
            ]],
        )
        .await?;

        // Index the transactions in the block. For each transaction, collect, separately, its hash,
        // height, and index. These items all have different types, so we collect them into
        // different vecs.
        let mut tx_hashes = vec![];
        let mut tx_block_heights = vec![];
        let mut tx_indexes = vec![];
        for (txn_ix, txn) in block.enumerate() {
            let txn_ix = serde_json::to_value(&txn_ix).map_err(|err| QueryError::Error {
                message: format!("failed to serialize transaction index: {err}"),
            })?;
            tx_hashes.push(txn.commit().to_string());
            tx_block_heights.push(block.height() as i64);
            tx_indexes.push(txn_ix);
        }
        if !tx_hashes.is_empty() {
            tx.upsert(
                "transaction",
                ["hash", "block_height", "index"],
                ["block_height", "index"],
                // Now that we have the transaction hashes, block heights, and indexes collected in
                // memory, we can combine them all into a single vec using type erasure: all the
                // values get converted to `&dyn ToSql`. The references all borrow from one of
                // `tx_hashes`, `tx_block_heights`, or `tx_indexes`, which all outlive this function
                // call, so the lifetimes work out.
                izip!(
                    tx_hashes.iter().map(sql_param),
                    tx_block_heights.iter().map(sql_param),
                    tx_indexes.iter().map(sql_param),
                )
                .map(|(hash, height, index)| [hash, height, index]),
            )
            .await?;
        }

        Ok(())
    }

    async fn insert_vid(
        &mut self,
        common: VidCommonQueryData<Types>,
        share: Option<VidShare>,
    ) -> Result<(), Self::Error> {
        let mut tx = self.transaction().await?;
        let common_data = bincode::serialize(common.common()).map_err(|err| QueryError::Error {
            message: format!("failed to serialize VID common data: {err}"),
        })?;
        if let Some(share) = share {
            let share_data = bincode::serialize(&share).map_err(|err| QueryError::Error {
                message: format!("failed to serialize VID share: {err}"),
            })?;
            tx.upsert(
                "vid",
                ["height", "common", "share"],
                ["height"],
                [[
                    sql_param(&(common.height() as i64)),
                    sql_param(&common_data),
                    sql_param(&share_data),
                ]],
            )
            .await
        } else {
            // Don't touch the `share` column at all if we don't have a share to insert. It's
            // possible that this column already exists, and we are just upserting the common data,
            // in which case we don't want to overwrite the share with NULL.
            tx.upsert(
                "vid",
                ["height", "common"],
                ["height"],
                [[
                    sql_param(&(common.height() as i64)),
                    sql_param(&common_data),
                ]],
            )
            .await
        }
    }
}

#[async_trait]
impl<Types> NodeDataSource<Types> for SqlStorage
where
    Types: NodeType,
{
    async fn block_height(&self) -> QueryResult<usize> {
        let query = "SELECT max(height) FROM header";
        let row = self.query_one_static(query).await?;
        let height: Option<i64> = row.get(0);
        match height {
            Some(height) => {
                // The height of the block is the number of blocks below it, so the total number of
                // blocks is one more than the height of the highest block.
                Ok(height as usize + 1)
            }
            None => {
                // If there are no blocks yet, the height is 0.
                Ok(0)
            }
        }
    }

    async fn count_transactions(&self) -> QueryResult<usize> {
        let row = self
            .query_one_static("SELECT count(*) FROM transaction")
            .await?;
        let count: i64 = row.get(0);
        Ok(count as usize)
    }

    async fn payload_size(&self) -> QueryResult<usize> {
        let row = self
            .query_one_static("SELECT sum(size) FROM payload")
            .await?;
        let sum: Option<i64> = row.get(0);
        Ok(sum.unwrap_or(0) as usize)
    }

    async fn vid_share<ID>(&self, id: ID) -> QueryResult<VidShare>
    where
        ID: Into<BlockId<Types>> + Send + Sync,
    {
        let (where_clause, param) = header_where_clause(id.into());
        // ORDER BY h.height ASC ensures that if there are duplicate blocks (this can happen when
        // selecting by payload ID, as payloads are not unique), we return the first one.
        let query = format!(
            "SELECT v.share AS share FROM vid AS v
               JOIN header AS h ON v.height = h.height
              WHERE {where_clause}
              ORDER BY h.height ASC
              LIMIT 1"
        );
        let row = self.query_one(&query, [param]).await?;
        let share_data: Option<Vec<u8>> =
            row.try_get("share").map_err(|err| QueryError::Error {
                message: format!("error extracting share data from query results: {err}"),
            })?;
        let share_data = share_data.context(MissingSnafu)?;
        bincode::deserialize(&share_data).map_err(|err| QueryError::Error {
            message: format!("malformed VID share: {err}"),
        })
    }

    async fn sync_status(&self) -> QueryResult<SyncStatus> {
        // A leaf can only be missing if there is no row for it in the database (all its columns are
        // non-nullable). A block can be missing if its corresponding leaf is missing or if the
        // block's `data` field is `NULL`. We can find the number of missing leaves and blocks by
        // getting the number of fully missing leaf rows and the number of present but null-payload
        // block rows.
        //
        // Note that it should not be possible for a block's row to be missing (as opposed to
        // present but having a `NULL` payload) if the corresponding leaf is present. The schema
        // enforces this, since the payload table `REFERENCES` the corresponding leaf row. Thus,
        // missing block rows should be a subset of missing leaf rows and do not need to be counted
        // separately. This is very important: if we had to count the number of block rows that were
        // missing whose corresponding leaf row was present, this would require an expensive join
        // and table traversal.
        //
        // We can get the number of missing leaf rows very efficiently, by subtracting the total
        // number of leaf rows from the block height (since the block height by definition is the
        // height of the highest leaf we do have). We can also get the number of null payloads
        // directly using an `IS NULL` filter.
        //
        // For VID, common data can only be missing if the entire row is missing. Shares can be
        // missing in that case _or_ if the row is present but share data is NULL. Thus, we also
        // need to select the total number of VID rows and the number of present VID rows with a
        // NULL share.
        let row = self
            .query_one_static(
                "SELECT max_height, total_leaves, null_payloads, total_vid, null_vid, pruned_height FROM
                    (SELECT max(leaf.height) AS max_height, count(*) AS total_leaves FROM leaf),
                    (SELECT count(*) AS null_payloads FROM payload WHERE data IS NULL),
                    (SELECT count(*) AS total_vid FROM vid),
                    (SELECT count(*) AS null_vid FROM vid WHERE share IS NULL),
                    coalesce((SELECT last_height FROM pruned_height ORDER BY id DESC LIMIT 1)) as pruned_height
                ",
            )
            .await?;

        let block_height = match row.get::<_, Option<i64>>("max_height") {
            Some(height) => {
                // The height of the block is the number of blocks below it, so the total number of
                // blocks is one more than the height of the highest block.
                height as usize + 1
            }
            None => {
                // If there are no blocks yet, the height is 0.
                0
            }
        };
        let total_leaves = row.get::<_, i64>("total_leaves") as usize;
        let null_payloads = row.get::<_, i64>("null_payloads") as usize;
        let total_vid = row.get::<_, i64>("total_vid") as usize;
        let null_vid = row.get::<_, i64>("null_vid") as usize;
        let pruned_height = row
            .get::<_, Option<i64>>("pruned_height")
            .map(|h| h as usize);

        let missing_leaves = block_height.saturating_sub(total_leaves);
        let missing_blocks = missing_leaves + null_payloads;
        let missing_vid_common = block_height.saturating_sub(total_vid);
        let missing_vid_shares = missing_vid_common + null_vid;

        Ok(SyncStatus {
            missing_leaves,
            missing_blocks,
            missing_vid_common,
            missing_vid_shares,
            pruned_height,
        })
    }

    async fn get_header_window(
        &self,
        start: impl Into<WindowStart<Types>> + Send + Sync,
        end: u64,
    ) -> QueryResult<TimeWindowQueryData<Header<Types>>> {
        // Find the specific block that starts the requested window.
        let first_block = match start.into() {
            WindowStart::Time(t) => {
                // If the request is not to start from a specific block, but from a timestamp, we
                // use a different method to find the window, as detecting whether we have
                // sufficient data to answer the query is not as simple as just trying `load_header`
                // for a specific block ID.
                return self.time_window::<Types>(t, end).await;
            }
            WindowStart::Height(h) => h,
            WindowStart::Hash(h) => self.load_header::<Types>(h).await?.block_number(),
        };

        // Find all blocks starting from `first_block` with timestamps less than `end`. Block
        // timestamps are monotonically increasing, so this query is guaranteed to return a
        // contiguous range of blocks ordered by increasing height.
        let query = format!(
            "SELECT {HEADER_COLUMNS}
               FROM header AS h
              WHERE h.height >= $1 AND h.timestamp < $2
              ORDER BY h.height"
        );
        let rows = self
            .query(&query, [&(first_block as i64), &(end as i64)])
            .await?;
        let window = rows
            .map(|row| {
                parse_header::<Types>(row.map_err(|err| QueryError::Error {
                    message: err.to_string(),
                })?)
            })
            .try_collect()
            .await?;

        // Find the block just before the window.
        let prev = if first_block > 0 {
            Some(self.load_header::<Types>(first_block as usize - 1).await?)
        } else {
            None
        };

        // Find the block just after the window.
        let query = format!(
            "SELECT {HEADER_COLUMNS}
               FROM header AS h
              WHERE h.timestamp >= $1
              ORDER BY h.height
              LIMIT 1"
        );
        let next = self
            .query_opt(&query, [&(end as i64)])
            .await?
            .map(parse_header::<Types>)
            .transpose()?;

        Ok(TimeWindowQueryData { window, prev, next })
    }
}

impl SqlStorage {
    async fn time_window<Types: NodeType>(
        &self,
        start: u64,
        end: u64,
    ) -> QueryResult<TimeWindowQueryData<Header<Types>>> {
        // Find all blocks whose timestamps fall within the window [start, end). Block timestamps
        // are monotonically increasing, so this query is guaranteed to return a contiguous range of
        // blocks ordered by increasing height. Note that we order by height explicitly, rather than
        // ordering by timestamp (which might be more efficient, since it could reuse the timestamp
        // index that is used in the WHERE clause) because multiple blocks may have the same
        // timestamp, due to the 1-second timestamp resolution.
        let query = format!(
            "SELECT {HEADER_COLUMNS}
               FROM header AS h
              WHERE h.timestamp >= $1 AND h.timestamp < $2
              ORDER BY h.height"
        );
        let rows = self.query(&query, [&(start as i64), &(end as i64)]).await?;
        let window: Vec<_> = rows
            .map(|row| {
                parse_header::<Types>(row.map_err(|err| QueryError::Error {
                    message: err.to_string(),
                })?)
            })
            .try_collect()
            .await?;

        // Find the block just after the window.
        let query = format!(
            "SELECT {HEADER_COLUMNS}
               FROM header AS h
              WHERE h.timestamp >= $1
              ORDER BY h.height
              LIMIT 1"
        );
        let next = self
            .query_opt(&query, [&(end as i64)])
            .await?
            .map(parse_header::<Types>)
            .transpose()?;

        // If the `next` block exists, _or_ if any block in the window exists, we know we have
        // enough information to definitively say at least where the window starts (we may or may
        // not have where it ends, depending on how many blocks have thus far been produced).
        // However, if we have neither a block in the window nor a block after it, we cannot say
        // whether the next block produced will have a timestamp before or after the window start.
        // In this case, we don't know what the `prev` field of the response should be, so we return
        // an error: the caller must try again after more blocks have been produced.
        if window.is_empty() && next.is_none() {
            return Err(QueryError::NotFound);
        }

        // Find the block just before the window.
        let query = format!(
            "SELECT {HEADER_COLUMNS}
               FROM header AS h
              WHERE h.timestamp < $1
              ORDER BY h.height DESC
              LIMIT 1"
        );
        let prev = self
            .query_opt(&query, [&(start as i64)])
            .await?
            .map(parse_header::<Types>)
            .transpose()?;

        Ok(TimeWindowQueryData { window, prev, next })
    }
}

/// An atomic SQL transaction.
//
// Note: we use a custom `Transaction` type instead of `tokio_postgres::Transaction` because with
// the latter, the lifecycle of the underlying SQL transaction is coupled to the lifecycle of the
// Rust object: a `BEGIN` statement is executed every time a `Transaction` is created and a `COMMIT`
// is executed whenever the `Transaction` is dropped. This is undesirable here because, logically,
// the underlying SQL transaction may persist between several calls into the `SqlDataSource`, and is
// only closed when `commit` is finally called. However, due to the lifetime of the reference within
// `Transaction`, we cannot actually store the `Transaction` object in the `SqlDataSource`, and so
// we create a new `Transaction` wrapper each time `SqlDataSource::transaction` is called. Thus, the
// lifecycle of the underlying logical transaction is not the same as the lifecycle of the Rust
// wrapper object.
//
// The lifetime parameter here is mostly for type safety for callers. Internally, we can change the
// lifetime parameter to `'static` very easily, using `Cow::into_owned` on the inner `client`. This
// is even necessary, to move the [`Transaction`] out of an [`RwLockWriteGuard`] when exposing it
// via the higher-level [`SqlDataSource`]. However, none of the _public_ APIs exposed by this crate
// allow a caller to detach the lifetime parameter here from the lifetime of the [`SqlStorage`] or
// [`SqlDataSource`] from which the [`Transaction`] is borrowed, providing enhanced type safety.
pub struct Transaction<'a> {
    client: Cow<'a, Arc<Client>>,
}

impl<'a> Transaction<'a> {
    /// Change the lifetime parameter of a [`Transaction`].
    ///
    /// This allows the caller to change the lifetime parameter of this [`Transaction`], by taking
    /// ownership of a clone of the referenced client. This function must be used with care (hence
    /// the restricted visibility). It is used in this crate to return a [`Transaction`] which is
    /// borrowed from an [`RwLockWriteGuard`] up the stack, by replacing the lifetime parameter of
    /// the write guard with the lifetime parameter of the [`SqlDataSource`] that owns the
    /// [`RwLock`].
    pub(crate) fn change_lifetime<'b>(self) -> Transaction<'b> {
        Transaction {
            client: Cow::Owned(self.client.into_owned()),
        }
    }
}

impl<'a> Transaction<'a> {
    /// Execute a statement against the underlying database.
    ///
    /// The results of the statement will be reflected immediately in future statements made within
    /// this transaction, but will not be reflected in the underlying database until the transaction
    /// is committed with [`commit`](VersionedDataSource::commit).
    pub async fn execute<T, P>(&mut self, statement: &T, params: P) -> QueryResult<u64>
    where
        T: ?Sized + ToStatement,
        P: IntoIterator,
        P::IntoIter: ExactSizeIterator,
        P::Item: BorrowToSql,
    {
        self.client
            .execute_raw(statement, params)
            .await
            .map_err(|err| QueryError::Error {
                message: err.to_string(),
            })
    }

    /// Execute a statement that is expected to modify exactly one row.
    ///
    /// Returns an error if the database is not modified.
    pub async fn execute_one<T, P>(&mut self, statement: &T, params: P) -> QueryResult<()>
    where
        T: ?Sized + ToStatement + Display,
        P: IntoIterator,
        P::IntoIter: ExactSizeIterator,
        P::Item: BorrowToSql,
    {
        let nrows = self.execute_many(statement, params).await?;
        if nrows > 1 {
            // If more than one row is affected, we don't return an error, because clearly
            // _something_ happened and modified the database. So we don't necessarily want the
            // caller to retry. But we do log an error, because it seems the query did something
            // different than the caller intended.
            tracing::error!(
                %statement,
                "statement modified more rows ({nrows}) than expected (1)"
            );
        }
        Ok(())
    }

    /// Execute a statement that is expected to modify exactly one row.
    ///
    /// Returns an error if the database is not modified. Retries several times before failing.
    pub async fn execute_one_with_retries<T, P>(
        &mut self,
        statement: &T,
        params: P,
    ) -> QueryResult<()>
    where
        T: ?Sized + ToStatement + Display,
        P: IntoIterator + Clone,
        P::IntoIter: ExactSizeIterator,
        P::Item: BorrowToSql,
    {
        let interval = Duration::from_secs(1);
        let mut retries = 5;

        while let Err(err) = self.execute_one(statement, params.clone()).await {
            tracing::error!(
                %statement,
                "error in statement execution ({retries} tries remaining): {err}"
            );
            if retries == 0 {
                return Err(err);
            }
            retries -= 1;
            sleep(interval).await;
        }

        Ok(())
    }

    /// Execute a statement that is expected to modify at least one row.
    ///
    /// Returns an error if the database is not modified.
    pub async fn execute_many<T, P>(&mut self, statement: &T, params: P) -> QueryResult<u64>
    where
        T: ?Sized + ToStatement + Display,
        P: IntoIterator,
        P::IntoIter: ExactSizeIterator,
        P::Item: BorrowToSql,
    {
        let nrows = self.execute(statement, params).await?;
        if nrows == 0 {
            return Err(QueryError::Error {
                message: format!("statement failed: 0 rows affected. Statement: {statement}"),
            });
        }

        Ok(nrows)
    }

    /// Execute a statement that is expected to modify at least one row.
    ///
    /// Returns an error if the database is not modified. Retries several times before failing.
    pub async fn execute_many_with_retries<T, P>(
        &mut self,
        statement: &T,
        params: P,
    ) -> QueryResult<u64>
    where
        T: ?Sized + ToStatement + Display,
        P: IntoIterator + Clone,
        P::IntoIter: ExactSizeIterator,
        P::Item: BorrowToSql,
    {
        let interval = Duration::from_secs(1);
        let mut retries = 5;

        loop {
            match self.execute_many(statement, params.clone()).await {
                Ok(nrows) => return Ok(nrows),
                Err(err) => {
                    tracing::error!(
                        %statement,
                        "error in statement execution ({retries} tries remaining): {err}"
                    );
                    if retries == 0 {
                        return Err(err);
                    }
                    retries -= 1;
                    sleep(interval).await;
                }
            }
        }
    }

    pub async fn upsert<const N: usize, P>(
        &mut self,
        table: &str,
        columns: [&str; N],
        pk: impl IntoIterator<Item = &str>,
        rows: impl IntoIterator<Item = [P; N]>,
    ) -> QueryResult<()>
    where
        P: BorrowToSql + Clone,
    {
        let set_columns = columns
            .iter()
            .map(|col| format!("{col} = excluded.{col}"))
            .join(",");
        let columns = columns.into_iter().join(",");
        let pk = pk.into_iter().join(",");

        let mut values = vec![];
        let mut params = vec![];
        let mut num_rows = 0;
        for (row, entries) in rows.into_iter().enumerate() {
            let start = row * N;
            let end = (row + 1) * N;
            let row_params = (start..end).map(|i| format!("${}", i + 1)).join(",");

            values.push(format!("({row_params})"));
            params.extend(entries);
            num_rows += 1;
        }

        if num_rows == 0 {
            tracing::warn!("trying to upsert 0 rows, this has no effect");
            return Ok(());
        }
        tracing::debug!("upserting {num_rows} rows");

        let values = values.into_iter().join(",");
        let stmt = format!(
            "INSERT INTO {table} ({columns})
                  VALUES {values}
             ON CONFLICT ({pk}) DO UPDATE SET {set_columns}"
        );
        let rows_modified = self.execute_many_with_retries(&stmt, params).await?;
        if rows_modified != num_rows {
            tracing::error!(
                stmt,
                "unexpected number of rows modified: expected {num_rows} but got {rows_modified}"
            );
        }
        Ok(())
    }
}

/// Query the underlying SQL database.
///
/// The results will reflect the state after the statements thus far added to this transaction have
/// been applied, even though those effects have not been committed to the database yet.
#[async_trait]
impl<'a> Query for Transaction<'a> {
    async fn client(&self) -> Cow<Arc<Client>> {
        self.client.clone()
    }
}

#[async_trait]
pub trait Query {
    async fn client(&self) -> Cow<Arc<Client>>;

    // Query the underlying SQL database.
    async fn query<T, P>(
        &self,
        query: &T,
        params: P,
    ) -> QueryResult<BoxStream<'static, QueryResult<Row>>>
    where
        T: ?Sized + ToStatement + Sync,
        P: IntoIterator + Send,
        P::IntoIter: ExactSizeIterator,
        P::Item: BorrowToSql,
    {
        Ok(self
            .client()
            .await
            .query_raw(query, params)
            .await
            .map_err(postgres_err)?
            .map_err(postgres_err)
            .boxed())
    }

    /// Query the underlying SQL database with no parameters.
    async fn query_static<T>(&self, query: &T) -> QueryResult<BoxStream<'static, QueryResult<Row>>>
    where
        T: ?Sized + ToStatement + Sync,
    {
        self.query::<T, [i64; 0]>(query, []).await
    }

    /// Query the underlying SQL database, returning exactly one result or failing.
    async fn query_one<T, P>(&self, query: &T, params: P) -> QueryResult<Row>
    where
        T: ?Sized + ToStatement + Sync,
        P: IntoIterator + Send,
        P::IntoIter: ExactSizeIterator,
        P::Item: BorrowToSql,
    {
        self.query_opt(query, params).await?.context(NotFoundSnafu)
    }

    /// Query the underlying SQL database with no parameters, returning exactly one result or
    /// failing.
    async fn query_one_static<T>(&self, query: &T) -> QueryResult<Row>
    where
        T: ?Sized + ToStatement + Sync,
    {
        self.query_one::<T, [i64; 0]>(query, []).await
    }

    /// Query the underlying SQL database, returning zero or one results.
    async fn query_opt<T, P>(&self, query: &T, params: P) -> QueryResult<Option<Row>>
    where
        T: ?Sized + ToStatement + Sync,
        P: IntoIterator + Send,
        P::IntoIter: ExactSizeIterator,
        P::Item: BorrowToSql,
    {
        self.query(query, params).await?.try_next().await
    }

    /// Query the underlying SQL database with no parameters, returning zero or one results.
    async fn query_opt_static<T>(&self, query: &T) -> QueryResult<Option<Row>>
    where
        T: ?Sized + ToStatement + Sync,
    {
        self.query_opt::<T, [i64; 0]>(query, []).await
    }
}

fn postgres_err(err: tokio_postgres::Error) -> QueryError {
    QueryError::Error {
        message: err.to_string(),
    }
}

fn parse_leaf<Types>(row: Row) -> QueryResult<LeafQueryData<Types>>
where
    Types: NodeType,
{
    let leaf = row.try_get("leaf").map_err(|err| QueryError::Error {
        message: format!("error extracting leaf from query results: {err}"),
    })?;
    let leaf: Leaf<Types> = serde_json::from_value(leaf).map_err(|err| QueryError::Error {
        message: format!("malformed leaf: {err}"),
    })?;

    let qc = row.try_get("qc").map_err(|err| QueryError::Error {
        message: format!("error extracting QC from query results: {err}"),
    })?;
    let qc: QuorumCertificate<Types> =
        serde_json::from_value(qc).map_err(|err| QueryError::Error {
            message: format!("malformed QC: {err}"),
        })?;

    Ok(LeafQueryData { leaf, qc })
}

fn header_where_clause<Types: NodeType>(
    id: BlockId<Types>,
) -> (&'static str, Box<dyn ToSql + Send + Sync>) {
    match id {
        BlockId::Number(n) => ("h.height = $1", Box::new(n as i64)),
        BlockId::Hash(h) => ("h.hash = $1", Box::new(h.to_string())),
        BlockId::PayloadHash(h) => ("h.payload_hash = $1", Box::new(h.to_string())),
    }
}

const BLOCK_COLUMNS: &str =
    "h.hash AS hash, h.data AS header_data, p.size AS payload_size, p.data AS payload_data";

fn parse_block<Types>(row: Row) -> QueryResult<BlockQueryData<Types>>
where
    Types: NodeType,
    Payload<Types>: QueryablePayload,
{
    // First, check if we have the payload for this block yet.
    let size: Option<i32> = row
        .try_get("payload_size")
        .map_err(|err| QueryError::Error {
            message: format!("error extracting payload size from query results: {err}"),
        })?;
    let payload_data: Option<Vec<u8>> =
        row.try_get("payload_data")
            .map_err(|err| QueryError::Error {
                message: format!("error extracting payload data from query results: {err}"),
            })?;
    let (size, payload_data) = size.zip(payload_data).context(MissingSnafu)?;
    let size = size as u64;

    // Reconstruct the full header.
    let header_data = row
        .try_get("header_data")
        .map_err(|err| QueryError::Error {
            message: format!("error extracting header data from query results: {err}"),
        })?;
    let header: Header<Types> =
        serde_json::from_value(header_data).map_err(|err| QueryError::Error {
            message: format!("malformed header: {err}"),
        })?;

    // Reconstruct the full block payload.
    let payload = Payload::<Types>::from_bytes(payload_data.into_iter(), header.metadata());

    // Reconstruct the query data by adding metadata.
    let hash: String = row.try_get("hash").map_err(|err| QueryError::Error {
        message: format!("error extracting block hash from query results: {err}"),
    })?;
    let hash = hash.parse().map_err(|err| QueryError::Error {
        message: format!("malformed block hash: {err}"),
    })?;

    Ok(BlockQueryData {
        num_transactions: payload.len(header.metadata()) as u64,
        header,
        payload,
        size,
        hash,
    })
}

const PAYLOAD_COLUMNS: &str = BLOCK_COLUMNS;

fn parse_payload<Types>(row: Row) -> QueryResult<PayloadQueryData<Types>>
where
    Types: NodeType,
    Payload<Types>: QueryablePayload,
{
    parse_block(row).map(PayloadQueryData::from)
}

const VID_COMMON_COLUMNS: &str = "h.height AS height, h.hash AS block_hash, h.payload_hash AS payload_hash, v.common AS common_data";

fn parse_vid_common<Types>(row: Row) -> QueryResult<VidCommonQueryData<Types>>
where
    Types: NodeType,
    Payload<Types>: QueryablePayload,
{
    let height = row
        .try_get::<_, i64>("height")
        .map_err(|err| QueryError::Error {
            message: format!("error extracting height from query results: {err}"),
        })? as u64;
    let block_hash: String = row.try_get("block_hash").map_err(|err| QueryError::Error {
        message: format!("error extracting block_hash from query results: {err}"),
    })?;
    let block_hash = block_hash.parse().map_err(|err| QueryError::Error {
        message: format!("malformed block hash: {err}"),
    })?;
    let payload_hash: String = row
        .try_get("payload_hash")
        .map_err(|err| QueryError::Error {
            message: format!("error extracting payload_hash from query results: {err}"),
        })?;
    let payload_hash = payload_hash.parse().map_err(|err| QueryError::Error {
        message: format!("malformed payload hash: {err}"),
    })?;
    let common_data: Vec<u8> = row
        .try_get("common_data")
        .map_err(|err| QueryError::Error {
            message: format!("error extracting common_data from query results: {err}"),
        })?;
    let common = bincode::deserialize(&common_data).map_err(|err| QueryError::Error {
        message: format!("malformed VID common data: {err}"),
    })?;
    Ok(VidCommonQueryData {
        height,
        block_hash,
        payload_hash,
        common,
    })
}

const HEADER_COLUMNS: &str = "h.data AS data";

fn parse_header<Types>(row: Row) -> QueryResult<Header<Types>>
where
    Types: NodeType,
{
    // Reconstruct the full header.
    let data = row.try_get("data").map_err(|err| QueryError::Error {
        message: format!("error extracting header data from query results: {err}"),
    })?;
    serde_json::from_value(data).map_err(|err| QueryError::Error {
        message: format!("malformed header: {err}"),
    })
}

/// Convert range bounds to a SQL where clause constraining a given column.
///
/// Returns the where clause as a string and a list of query parameters. We assume that there are no
/// other parameters in the query; that is, parameters in the where clause will start from $1.
fn bounds_to_where_clause<R>(range: R, column: &str) -> (String, Vec<i64>)
where
    R: RangeBounds<usize>,
{
    let mut bounds = vec![];
    let mut params = vec![];

    match range.start_bound() {
        Bound::Included(n) => {
            params.push(*n as i64);
            bounds.push(format!("{column} >= ${}", params.len()));
        }
        Bound::Excluded(n) => {
            params.push(*n as i64);
            bounds.push(format!("{column} > ${}", params.len()));
        }
        Bound::Unbounded => {}
    }
    match range.end_bound() {
        Bound::Included(n) => {
            params.push(*n as i64);
            bounds.push(format!("{column} <= ${}", params.len()));
        }
        Bound::Excluded(n) => {
            params.push(*n as i64);
            bounds.push(format!("{column} < ${}", params.len()));
        }
        Bound::Unbounded => {}
    }

    let mut where_clause = bounds.join(" AND ");
    if !where_clause.is_empty() {
        where_clause = format!(" WHERE {where_clause}");
    }

    (where_clause, params)
}

/// Connect to a Postgres database with a TLS implementation.
///
/// Spawns a background task to run the connection. Returns a client and a channel to kill the
/// connection task.
async fn connect<T>(
    pgcfg: postgres::Config,
    tcp: TcpStream,
    tls: T,
) -> anyhow::Result<(Client, oneshot::Sender<()>)>
where
    T: TlsConnect<TcpStream>,
    T::Stream: Send + 'static,
{
    let (client, connection) = pgcfg.connect_raw(tcp, tls).await?;

    // Spawn a task to drive the connection, with a channel to kill it when this data source is
    // dropped.
    let (kill, killed) = oneshot::channel();
    spawn(select(killed, connection).inspect(|res| {
        if let Either::Right((res, _)) = res {
            // If we were killed, do nothing. That is the normal shutdown path. But if the `select`
            // returned because the `connection` terminated, we should log something, as that is
            // unusual.
            match res {
                Ok(()) => tracing::warn!("postgres connection terminated unexpectedly"),
                Err(err) => tracing::error!("postgres connection closed with error: {err}"),
            }
        }
    }));

    Ok((client, kill))
}

fn sql_param<T: ToSql + Sync>(param: &T) -> &(dyn ToSql + Sync) {
    param
}

// tokio-postgres is written in terms of the tokio AsyncRead/AsyncWrite traits. However, these
// traits do not require any specifics of the tokio runtime. Thus we can implement them using the
// async_std TcpStream type, and have a stream which is compatible with tokio-postgres but will run
// on the async_std executor.
//
// To avoid orphan impls, we wrap this tream in a new type.
struct TcpStream(async_std::net::TcpStream);

impl TcpStream {
    async fn connect<A: ToSocketAddrs>(addrs: A) -> Result<Self, Error> {
        Ok(Self(async_std::net::TcpStream::connect(addrs).await?))
    }
}

impl tokio::io::AsyncRead for TcpStream {
    fn poll_read(
        mut self: Pin<&mut Self>,
        cx: &mut Context<'_>,
        buf: &mut tokio::io::ReadBuf<'_>,
    ) -> Poll<std::io::Result<()>> {
        // tokio uses this hyper-optimized `ReadBuf` construct, where there is a filled portion, an
        // unfilled portion where we append new data, and the unfilled portion of the buffer need
        // not even be initialized. However the async_std implementation we're delegating to just
        // expects a normal `&mut [u8]` buffer which is entirely unfilled. To simplify the
        // conversion, we will abandon the uninitialized buffer optimization and force
        // initialization of the entire buffer, resulting in a plain old `&mut [u8]` representing
        // the unfilled portion. But first, we need to grab the length of the filled region so we
        // can increment it after we read new data from async_std.
        let filled = buf.filled().len();

        // Initialize the buffer and get a slice of the unfilled region. This operation is free
        // after the first time it is called, so we don't need to worry about maintaining state
        // between subsequent calls to `poll_read`.
        let unfilled = buf.initialize_unfilled();

        // Read data into the unfilled portion of the buffer.
        match Pin::new(&mut self.0).poll_read(cx, unfilled) {
            Poll::Ready(Ok(bytes_read)) => {
                // After the read completes, the first `bytes_read` of `unfilled` have now been
                // filled. Increment the `filled` cursor within the `ReadBuf` to account for this.
                buf.set_filled(filled + bytes_read);
                Poll::Ready(Ok(()))
            }
            Poll::Ready(Err(err)) => Poll::Ready(Err(err)),
            Poll::Pending => Poll::Pending,
        }
    }
}

impl tokio::io::AsyncWrite for TcpStream {
    fn poll_write(
        mut self: Pin<&mut Self>,
        cx: &mut Context<'_>,
        buf: &[u8],
    ) -> Poll<std::io::Result<usize>> {
        Pin::new(&mut self.0).poll_write(cx, buf)
    }

    fn poll_flush(mut self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<std::io::Result<()>> {
        Pin::new(&mut self.0).poll_flush(cx)
    }

    fn poll_shutdown(mut self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<std::io::Result<()>> {
        Pin::new(&mut self.0).poll_close(cx)
    }
}

// These tests run the `postgres` Docker image, which doesn't work on Windows.
#[cfg(all(any(test, feature = "testing"), not(target_os = "windows")))]
pub mod testing {
    use std::{
        env,
        process::{Command, Stdio},
        str,
        time::Duration,
    };

    use portpicker::pick_unused_port;

    use super::Config;
    use crate::testing::sleep;

    #[derive(Debug)]
    pub struct TmpDb {
        host: String,
        port: u16,
        container_id: String,
    }

    impl TmpDb {
        pub async fn init() -> Self {
            let docker_hostname = env::var("DOCKER_HOSTNAME");
            // This picks an unused port on the current system.  If docker is
            // configured to run on a different host then this may not find a
            // "free" port on that system.
            // We *might* be able to get away with this as any remote docker
            // host should hopefully be pretty open with it's port space.
            let port = pick_unused_port().unwrap();
            let host = docker_hostname.unwrap_or("localhost".to_string());

            let output = Command::new("docker")
                .arg("run")
                .arg("--rm")
                .arg("-d")
                .args(["-p", &format!("{port}:5432")])
                .args(["-e", "POSTGRES_PASSWORD=password"])
                .arg("postgres")
                .output()
                .unwrap();
            let stdout = str::from_utf8(&output.stdout).unwrap();
            let stderr = str::from_utf8(&output.stderr).unwrap();
            if !output.status.success() {
                panic!("failed to start postgres docker: {stderr}");
            }

            // Create the TmpDb object immediately after starting the Docker container, so if
            // anything panics after this `drop` will be called and we will clean up.
            let container_id = stdout.trim().to_owned();
            tracing::info!("launched postgres docker {container_id}");
            let db = Self {
                host,
                port,
                container_id,
            };

            // Wait for the database to be ready.
            while !Command::new("psql")
                .args([
                    "-h",
                    &(db.host()),
                    "-p",
                    &(db.port().to_string()),
                    "-U",
                    "postgres",
                ])
                .env("PGPASSWORD", "password")
                // Null input so the command terminates as soon as it manages to connect.
                .stdin(Stdio::null())
                // Output from this command is not useful, it's just a prompt.
                .stdout(Stdio::null())
                .stderr(Stdio::null())
                .status()
                .unwrap()
                .success()
            {
                tracing::warn!("database is not ready");
                sleep(Duration::from_secs(1)).await;
            }

            db
        }

        pub fn host(&self) -> String {
            self.host.clone()
        }

        pub fn port(&self) -> u16 {
            self.port
        }

        pub fn config(&self) -> Config {
            Config::default()
                .user("postgres")
                .password("password")
                .host(self.host())
                .port(self.port())
                .tls()
        }
    }

    impl Drop for TmpDb {
        fn drop(&mut self) {
            let output = Command::new("docker")
                .args(["stop", self.container_id.as_str()])
                .output()
                .unwrap();
            if !output.status.success() {
                tracing::error!(
                    "error killing postgres docker {}: {}",
                    self.container_id,
                    str::from_utf8(&output.stderr).unwrap()
                );
            }
        }
    }
}

// These tests run the `postgres` Docker image, which doesn't work on Windows.
#[cfg(all(test, not(target_os = "windows")))]
mod test {

    use hotshot_example_types::state_types::TestInstanceState;

    use super::{testing::TmpDb, *};
    use crate::testing::{mocks::MockTypes, setup_test};
    #[async_std::test]
    async fn test_migrations() {
        setup_test();

        let db = TmpDb::init().await;
        let port = db.port();
        let host = &db.host();

        let connect = |migrations: bool, custom_migrations| async move {
            let mut cfg = Config::default()
                .user("postgres")
                .password("password")
                .host(host)
                .port(port)
                .migrations(custom_migrations);
            if !migrations {
                cfg = cfg.no_migrations();
            }
            let client = SqlStorage::connect(cfg).await?;
            Ok::<_, Error>(client)
        };

        // Connecting with migrations disabled should fail if the database is not already up to date
        // (since we've just created a fresh database, it isn't).
        let err = connect(false, vec![]).await.unwrap_err();
        tracing::info!("connecting without running migrations failed as expected: {err}");

        // Now connect and run migrations to bring the database up to date.
        connect(true, vec![]).await.unwrap();
        // Now connecting without migrations should work.
        connect(false, vec![]).await.unwrap();

        // Connect with some custom migrations, to advance the schema even further. Pass in the
        // custom migrations out of order; they should still execute in order of version number.
        // The SQL commands used here will fail if not run in order.
        let migrations = vec![
            Migration::unapplied(
                "V12__create_test_table.sql",
                "ALTER TABLE test ADD COLUMN data INTEGER;",
            )
            .unwrap(),
            Migration::unapplied("V11__create_test_table.sql", "CREATE TABLE test ();").unwrap(),
        ];
        connect(true, migrations.clone()).await.unwrap();

        // Connect using the default schema (no custom migrations) and not running migrations. This
        // should fail because the database is _ahead_ of the client in terms of schema.
        let err = connect(false, vec![]).await.unwrap_err();
        tracing::info!("connecting without running migrations failed as expected: {err}");

        // Connecting with the customized schema should work even without running migrations.
        connect(true, migrations).await.unwrap();
    }

    #[test]
    fn test_config_from_str() {
        let cfg = Config::from_str("postgresql://user:password@host:8080").unwrap();
        assert_eq!(cfg.pgcfg.get_user(), Some("user"));
        assert_eq!(cfg.pgcfg.get_password(), Some("password".as_bytes()));
        assert_eq!(cfg.host, "host");
        assert_eq!(cfg.port, 8080);
    }

    #[test]
    fn test_config_from_pgcfg() {
        let mut pgcfg = postgres::Config::default();
        pgcfg.dbname("db");
        let cfg = Config::from(pgcfg.clone());
        assert_eq!(cfg.pgcfg, pgcfg);
        // Default values.
        assert_eq!(cfg.host, "localhost");
        assert_eq!(cfg.port, 5432);
    }

    #[async_std::test]
    async fn test_target_period_pruning() {
        setup_test();

        let db = TmpDb::init().await;
        let port = db.port();
        let host = &db.host();

        let cfg = Config::default()
            .user("postgres")
            .password("password")
            .host(host)
            .port(port);

        let mut storage = SqlStorage::connect(cfg).await.unwrap();
        let mut leaf = LeafQueryData::<MockTypes>::genesis(&TestInstanceState {});
        // insert some mock data
        for i in 0..20 {
            leaf.leaf.block_header.block_number = i;
            leaf.leaf.block_header.timestamp = Utc::now().timestamp() as u64;
            storage.insert_leaf(leaf.clone()).await.unwrap();
            storage.commit().await.unwrap();
        }

        let height_before_pruning = storage.get_minimum_height().await.unwrap().unwrap();

        // Set pruner config to default which has minimum retention set to 1 day
        storage.set_pruning_config(PrunerCfg::new());
        // No data will be pruned
        let pruned_height = storage.prune().await.unwrap();
        // Pruned height should be none
        assert!(pruned_height.is_none());

        let height_after_pruning = storage.get_minimum_height().await.unwrap().unwrap();

        assert_eq!(
            height_after_pruning, height_before_pruning,
            "some data has been pruned"
        );

        // Set pruner config to target retention set to 1s
        storage.set_pruning_config(PrunerCfg::new().with_target_retention(Duration::from_secs(1)));
        sleep(Duration::from_secs(2)).await;
        let usage_before_pruning = storage.get_disk_usage().await.unwrap();
        // All of the data is now older than 1s.
        // This would prune all the data as the target retention is set to 1s
        let pruned_height = storage.prune().await.unwrap();

        // Pruned height should be some
        assert!(pruned_height.is_some());
        let usage_after_pruning = storage.get_disk_usage().await.unwrap();
        // All the tables should be empty
        // counting rows in header table
        let header_rows = storage
            .query_one_static("select count(*) as count from header")
            .await
            .unwrap()
            .get::<_, i64>("count");
        // the table should be empty
        assert_eq!(header_rows, 0);

        // counting rows in leaf table.
        // Deleting rows from header table would delete rows in all the tables
        // as each of table implement "ON DELETE CASCADE" fk constraint with the header table.
        let leaf_rows = storage
            .query_one_static("select count(*) as count from leaf")
            .await
            .unwrap()
            .get::<_, i64>("count");
        // the table should be empty
        assert_eq!(leaf_rows, 0);

        assert!(
            usage_before_pruning > usage_after_pruning,
            " disk usage should decrease after pruning"
        )
    }

    #[async_std::test]
    async fn test_minimum_retention_pruning() {
        setup_test();

        let db = TmpDb::init().await;
        let port = db.port();
        let host = &db.host();

        let cfg = Config::default()
            .user("postgres")
            .password("password")
            .host(host)
            .port(port);

        let mut storage = SqlStorage::connect(cfg).await.unwrap();
        let mut leaf = LeafQueryData::<MockTypes>::genesis(&TestInstanceState {});
        // insert some mock data
        for i in 0..20 {
            leaf.leaf.block_header.block_number = i;
            leaf.leaf.block_header.timestamp = Utc::now().timestamp() as u64;
            storage.insert_leaf(leaf.clone()).await.unwrap();
            storage.commit().await.unwrap();
        }

        let height_before_pruning = storage.get_minimum_height().await.unwrap().unwrap();
        let cfg = PrunerCfg::new();
        // Set pruning_threshold to 1
        // SQL storage size is more than 1000 bytes even without any data indexed
        // This would mean that the threshold would always be greater than the disk usage
        // However, minimum retention is set to 24 hours by default so the data would not be pruned
        storage.set_pruning_config(cfg.clone().with_pruning_threshold(1));
        println!("{:?}", storage.get_pruning_config().unwrap());
        // Pruning would not delete any data
        // All the data is younger than minimum retention period even though the usage > threshold
        let pruned_height = storage.prune().await.unwrap();

        // Pruned height should be none
        assert!(pruned_height.is_none());

        let height_after_pruning = storage.get_minimum_height().await.unwrap().unwrap();

        assert_eq!(
            height_after_pruning, height_before_pruning,
            "some data has been pruned"
        );

        // Change minimum retention to 1s
        storage.set_pruning_config(
            cfg.with_minimum_retention(Duration::from_secs(1))
                .with_pruning_threshold(1),
        );
        // sleep for 2s to make sure the data is older than minimum retention
        sleep(Duration::from_secs(2)).await;
        // This would prune all the data
        let pruned_height = storage.prune().await.unwrap();

        // Pruned height should be some
        assert!(pruned_height.is_some());
        // All the tables should be empty
        // counting rows in header table
        let header_rows = storage
            .query_one_static("select count(*) as count from header")
            .await
            .unwrap()
            .get::<_, i64>("count");
        // the table should be empty
        assert_eq!(header_rows, 0);
    }

    #[async_std::test]
    async fn test_pruned_height_storage() {
        setup_test();

        let db = TmpDb::init().await;
        let port = db.port();
        let host = &db.host();

        let cfg = Config::default()
            .user("postgres")
            .password("password")
            .host(host)
            .port(port);

        let mut storage = SqlStorage::connect(cfg).await.unwrap();
        assert!(storage.load_pruned_height().await.unwrap().is_none());
        storage.save_pruned_height(10).await.unwrap();
        storage.save_pruned_height(20).await.unwrap();
        storage.save_pruned_height(30).await.unwrap();
        assert_eq!(storage.load_pruned_height().await.unwrap(), Some(30));
    }
}
