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

use delegate::delegate;
use derive_more::From;
use futures::{
    future::{self, BoxFuture, FutureExt, TryFutureExt},
    stream::{BoxStream, StreamExt, TryStreamExt},
};
use sqlx::{
    encode::IsNull,
    postgres::{
        PgArgumentBuffer, PgArguments, PgColumn, PgConnectOptions, PgConnection, PgQueryResult,
        PgRow, PgStatement, PgTypeInfo, PgValue, PgValueRef, Postgres,
    },
    query::{Query, QueryAs, QueryScalar},
    sqlite::{
        Sqlite, SqliteArgumentValue, SqliteArguments, SqliteColumn, SqliteConnectOptions,
        SqliteConnection, SqliteQueryResult, SqliteRow, SqliteStatement, SqliteTypeInfo,
        SqliteValue, SqliteValueRef,
    },
    Arguments, Column, ColumnIndex, ConnectOptions, Connection, Database, Decode, Either, Encode,
    Execute, Executor, FromRow, IntoArguments, Row, Statement, Transaction, Type, TypeInfo, Value,
    ValueRef,
};
use sqlx_core::transaction::TransactionManager;
use std::{
    borrow::Cow,
    collections::HashMap,
    error::Error,
    fmt::{self, Debug, Display, Formatter, Write},
    str::FromStr,
    time::Duration,
};
use tracing::log::LevelFilter;
use url::Url;

/// The concrete database backing a SQL data source.
///
/// Postgres and SQLite are supported. The `Db` type is an unit type implementing [`Database`],
/// where each associated type (`Connection`, `Row`, etc.) is an enum with variants for each of
/// these supported backends.
///
/// The reason for taking this approach over sqlx's `Any` database is that we can support SQL types
/// which are implemented for the two backends we care about (Postgres and SQLite) but not for _any_
/// SQL database, such as MySQL. Crucially, JSON types fall in this category. [`Type`] and
/// [`Encode`] are implemented for types supported by both Postgres and SQLite. Not _all_ possible
/// types are currently supported, only those required by the query service.
///
/// The reason for taking this approach rather than writing all of our code to be generic over the
/// `Database` implementation is that `sqlx` does not have the necessary trait bounds on all of the
/// associated types (e.g. `Database::Connection` does not implement `Executor` for all possible
/// databases, the `Executor` impl lives on each concrete connection type) and Rust does not provide
/// a good way of encapsulating a collection of trait bounds on associated types. Thus, our function
/// signatures become untenably messy with bounds like
///
/// ```
/// # use sqlx::{Database, Encode, Executor, IntoArguments, Type};
/// fn foo<DB: Database>()
/// where
///     for<'a> &'a mut DB::Connection: Executor<'a>,
///     for<'q> DB::Arguments<'q>: IntoArguments<'q, DB>,
///     for<'a> i64: Type<DB> + Encode<'a, DB>,
/// {}
/// ```
/// etc.
#[derive(Clone, Copy, Debug, Default)]
pub struct Db;

impl Database for Db {
    type Connection = DbConnection;
    type TransactionManager = DbTransactionManager;
    type Row = DbRow;
    type QueryResult = DbQueryResult;
    type Column = DbColumn;
    type TypeInfo = DbTypeInfo;
    type Value = DbValue;
    type ValueRef<'r> = DbValueRef<'r>;
    type Arguments<'q> = DbArguments<'q>;
    type ArgumentBuffer<'q> = DbArgumentBuffer<'q>;
    type Statement<'q> = DbStatement;

    const NAME: &'static str = "QueryServiceDB";
    const URL_SCHEMES: &'static [&'static str] = &["postgres", "postgresql", "sqlite"];
}

#[derive(Debug, From)]
pub enum DbConnection {
    Pg(PgConnection),
    Sqlite(SqliteConnection),
}

impl Connection for DbConnection {
    type Database = Db;
    type Options = DbConnectOptions;

    fn begin(&mut self) -> BoxFuture<'_, sqlx::Result<Transaction<'_, Self::Database>>>
    where
        Self: Sized,
    {
        Transaction::begin(self)
    }

    delegate! {
        to match self {
            Self::Pg(conn) => conn,
            Self::Sqlite(conn) => conn,
        } {
            fn close(self) -> BoxFuture<'static, sqlx::Result<()>>;
            fn close_hard(self) -> BoxFuture<'static, sqlx::Result<()>>;
            fn ping(&mut self) -> BoxFuture<'_, sqlx::Result<()>>;
            fn cached_statements_size(&self) -> usize;
            fn clear_cached_statements(&mut self) -> BoxFuture<'_, sqlx::Result<()>>;
            fn shrink_buffers(&mut self);
            fn flush(&mut self) -> BoxFuture<'_, sqlx::Result<()>>;
            fn should_flush(&self) -> bool;
        }
    }
}

impl<'c> Executor<'c> for &'c mut DbConnection {
    type Database = Db;

    fn fetch_many<'e, 'q, E>(
        self,
        query: E,
    ) -> BoxStream<'e, sqlx::Result<Either<DbQueryResult, DbRow>>>
    where
        'q: 'e,
        'c: 'e,
        E: 'q + Execute<'q, Db>,
    {
        match self {
            DbConnection::Pg(conn) => conn
                .fetch_many(ExecuteForBackend(query))
                .map_ok(|either| match either {
                    Either::Left(res) => res.into(),
                    Either::Right(row) => row.into(),
                })
                .boxed(),
            DbConnection::Sqlite(conn) => conn
                .fetch_many(ExecuteForBackend(query))
                .map_ok(|either| match either {
                    Either::Left(res) => res.into(),
                    Either::Right(row) => row.into(),
                })
                .boxed(),
        }
    }

    fn fetch_optional<'e, 'q, E>(self, query: E) -> BoxFuture<'e, sqlx::Result<Option<DbRow>>>
    where
        'q: 'e,
        'c: 'e,
        E: 'q + Execute<'q, Db>,
    {
        match self {
            DbConnection::Pg(conn) => conn
                .fetch_optional(ExecuteForBackend(query))
                .map_ok(|opt| opt.map(DbRow::from))
                .boxed(),
            DbConnection::Sqlite(conn) => conn
                .fetch_optional(ExecuteForBackend(query))
                .map_ok(|opt| opt.map(DbRow::from))
                .boxed(),
        }
    }

    fn prepare_with<'e, 'q>(
        self,
        _sql: &'q str,
        _parameters: &'e [DbTypeInfo],
    ) -> BoxFuture<'e, sqlx::Result<DbStatement>>
    where
        'q: 'e,
        'c: 'e,
    {
        future::ready(Err(sqlx::Error::Protocol(
            "prepared statements not supported".to_string(),
        )))
        .boxed()
    }
}

#[derive(Clone, Debug)]
struct ExecuteForBackend<E>(E);

impl<'q, E> Execute<'q, Postgres> for ExecuteForBackend<E>
where
    E: Execute<'q, Db>,
{
    fn statement(&self) -> Option<&PgStatement<'q>> {
        // TODO prepared statement support
        None
    }

    fn take_arguments(&mut self) -> Result<Option<PgArguments>, Box<dyn Error + Sync + Send>> {
        let Some(args) = self.0.take_arguments()? else {
            return Ok(None);
        };
        let mut pg_args = PgArguments::default();
        for arg in args.0 {
            arg.add(&mut pg_args)?;
        }
        Ok(Some(pg_args))
    }

    delegate! {
        to self.0 {
            fn sql(&self) -> &'q str;
            fn persistent(&self) -> bool;
        }
    }
}

impl<'q, E> Execute<'q, Sqlite> for ExecuteForBackend<E>
where
    E: Execute<'q, Db>,
{
    fn statement(&self) -> Option<&SqliteStatement<'q>> {
        // TODO prepared statement support
        None
    }

    fn take_arguments(
        &mut self,
    ) -> Result<Option<SqliteArguments<'q>>, Box<dyn Error + Sync + Send>> {
        let Some(args) = self.0.take_arguments()? else {
            return Ok(None);
        };
        let mut pg_args = SqliteArguments::default();
        for arg in args.0 {
            arg.add(&mut pg_args)?;
        }
        Ok(Some(pg_args))
    }

    delegate! {
        to self.0 {
            fn sql(&self) -> &'q str;
            fn persistent(&self) -> bool;
        }
    }
}

#[derive(Clone, Debug, From)]
pub enum DbConnectOptions {
    Pg(PgConnectOptions),
    Sqlite(SqliteConnectOptions),
}

impl FromStr for DbConnectOptions {
    type Err = sqlx::Error;

    fn from_str(s: &str) -> sqlx::Result<Self> {
        let url = s.parse().map_err(sqlx::Error::config)?;
        Self::from_url(&url)
    }
}

impl ConnectOptions for DbConnectOptions {
    type Connection = DbConnection;

    fn from_url(url: &Url) -> sqlx::Result<Self> {
        if let Ok(opt) = PgConnectOptions::from_url(url) {
            Ok(Self::Pg(opt))
        } else {
            Ok(Self::Sqlite(SqliteConnectOptions::from_url(url)?))
        }
    }

    fn connect(&self) -> BoxFuture<'_, sqlx::Result<DbConnection>>
    where
        Self::Connection: Sized,
    {
        match self {
            Self::Pg(opt) => opt.connect().map_ok(DbConnection::from).boxed(),
            Self::Sqlite(opt) => opt.connect().map_ok(DbConnection::from).boxed(),
        }
    }

    delegate! {
        to match self {
            Self::Pg(opt) => opt,
            Self::Sqlite(opt) => opt,
        } {
            #[into]
            fn log_statements(self, level: LevelFilter) -> Self;
            #[into]
            fn log_slow_statements(self, level: LevelFilter, duration: Duration) -> Self;
            #[into]
            fn disable_statement_logging(self) -> Self;
            fn to_url_lossy(&self) -> Url;
        }
    }
}

#[derive(Clone, Copy, Debug, Default)]
pub struct DbTransactionManager;

impl TransactionManager for DbTransactionManager {
    type Database = Db;

    delegate! {
        to match conn {
            DbConnection::Pg(conn) => conn,
            DbConnection::Sqlite(conn) => conn,
        } {
            fn begin(conn: &mut DbConnection) -> BoxFuture<'_, sqlx::Result<()>>;
            fn commit(conn: &mut DbConnection) -> BoxFuture<'_, sqlx::Result<()>>;
            fn rollback(conn: &mut DbConnection) -> BoxFuture<'_, sqlx::Result<()>>;
            fn start_rollback(conn: &mut DbConnection);
        }
    }
}

#[derive(Debug)]
pub struct DbRow {
    index: HashMap<String, usize>,
    columns: Vec<DbColumn>,
    values: Vec<DbValue>,
}

impl TryFrom<PgRow> for DbRow {
    type Error = sqlx::Error;

    fn try_from(row: PgRow) -> sqlx::Result<Self> {
        let mut index = HashMap::default();
        let mut columns = vec![];
        let mut values = vec![];
        for col in row.columns() {
            index.insert(col.name().into(), col.ordinal());
            values.push(row.try_get_raw(col.ordinal())?.into());
            columns.push(col.clone().into());
        }

        Ok(Self {
            index,
            columns,
            values,
        })
    }
}

impl TryFrom<SqliteRow> for DbRow {
    type Error = sqlx::Error;

    fn try_from(row: SqliteRow) -> sqlx::Result<Self> {
        let mut index = HashMap::default();
        let mut columns = vec![];
        let mut values = vec![];
        for col in row.columns() {
            index.insert(col.name().into(), col.ordinal());
            values.push(row.try_get_raw(col.ordinal())?.into());
            columns.push(col.clone().into());
        }

        Ok(Self {
            index,
            columns,
            values,
        })
    }
}

impl Row for DbRow {
    type Database = Db;

    fn columns(&self) -> &[DbColumn] {
        &self.columns
    }

    fn try_get_raw<I>(&self, index: I) -> sqlx::Result<DbValueRef<'_>>
    where
        I: ColumnIndex<Self>,
    {
        let index = index.index(self)?;
        Ok(self
            .values
            .get(index)
            .ok_or_else(|| sqlx::Error::ColumnIndexOutOfBounds {
                index,
                len: self.len(),
            })?
            .as_ref())
    }
}

impl ColumnIndex<DbRow> for &str {
    fn index(&self, row: &DbRow) -> sqlx::Result<usize> {
        row.index
            .get(*self)
            .copied()
            .ok_or_else(|| sqlx::Error::ColumnNotFound(self.to_string()))
    }
}

impl ColumnIndex<DbRow> for usize {
    fn index(&self, _row: &DbRow) -> sqlx::Result<usize> {
        Ok(*self)
    }
}

#[derive(Clone, Debug)]
pub struct DbColumn {
    ordinal: usize,
    name: String,
    type_info: DbTypeInfo,
}

impl From<PgColumn> for DbColumn {
    fn from(col: PgColumn) -> Self {
        Self {
            ordinal: col.ordinal(),
            name: col.name().into(),
            type_info: col.type_info().clone().into(),
        }
    }
}

impl From<SqliteColumn> for DbColumn {
    fn from(col: SqliteColumn) -> Self {
        Self {
            ordinal: col.ordinal(),
            name: col.name().into(),
            type_info: col.type_info().clone().into(),
        }
    }
}

impl Column for DbColumn {
    type Database = Db;

    fn ordinal(&self) -> usize {
        self.ordinal
    }
    fn name(&self) -> &str {
        &self.name
    }
    fn type_info(&self) -> &DbTypeInfo {
        &self.type_info
    }
}

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct DbTypeInfo {
    // Since we deal only in types that are compatible with Postgres _and_ SQLite, the type info we
    // are interested in consists of information for _both_ backends, and two type are considered
    // equal and compatible only if they are equal and compatible in _both_ backends.
    postgres: PgTypeInfo,
    sqlite: SqliteTypeInfo,
}

impl Display for DbTypeInfo {
    fn fmt(&self, f: &mut Formatter) -> fmt::Result {
        write!(f, "{}", self.postgres)
    }
}

impl TypeInfo for DbTypeInfo {
    fn is_null(&self) -> bool {
        self.postgres.is_null() || self.sqlite.is_null()
    }

    fn name(&self) -> &str {
        self.postgres.name()
    }

    fn type_compatible(&self, other: &Self) -> bool
    where
        Self: Sized,
    {
        self.postgres.type_compatible(&other.postgres) && self.sqlite.type_compatible(&other.sqlite)
    }
}

#[derive(Debug, From)]
pub enum DbValue {
    Pg(PgValue),
    Sqlite(SqliteValue),
}

impl Value for DbValue {
    type Database = Db;

    delegate! {
        to match self {
            Self::Pg(v) => v,
            Self::Sqlite(v) => v,
        } {
            #[into]
            fn as_ref(&self) -> DbValueRef<'_>;
            #[into]
            fn type_info(&self) -> Cow<'_, DbTypeInfo>;
            fn is_null(&self) -> bool;
        }
    }
}

#[derive(Debug, From)]
pub enum DbValueRef<'r> {
    Pg(PgValueRef<'r>),
    Sqlite(SqliteValueRef<'r>),
}

impl<'r> ValueRef<'r> for DbValueRef<'r> {
    type Database = Db;

    delegate! {
        to match self {
            Self::Pg(v) => v,
            Self::Sqlite(v) => v,
        } {
            #[into]
            fn to_owned(&self) -> DbValue;
            #[into]
            fn type_info(&self) -> Cow<'_, DbTypeInfo>;
            fn is_null(&self) -> bool;
        }
    }
}

#[derive(Clone, Copy, Debug, Default)]
pub struct DbQueryResult {
    rows_affected: u64,
}

impl From<PgQueryResult> for DbQueryResult {
    fn from(res: PgQueryResult) -> Self {
        Self {
            rows_affected: res.rows_affected(),
        }
    }
}

impl From<SqliteQueryResult> for DbQueryResult {
    fn from(res: SqliteQueryResult) -> Self {
        Self {
            rows_affected: res.rows_affected(),
        }
    }
}

impl Extend<Self> for DbQueryResult {
    fn extend<T: IntoIterator<Item = Self>>(&mut self, iter: T) {
        for res in iter {
            self.rows_affected += res.rows_affected;
        }
    }
}

impl DbQueryResult {
    pub fn rows_affected(&self) -> u64 {
        self.rows_affected
    }
}

pub trait Argument<'q>: Debug + Send {
    fn add_postgres(&self, args: &mut PgArguments);
    fn add_sqlite(&self, args: &mut SqliteArguments<'q>);
}

impl<'q, T> Argument<'q> for T
where
    T: 'q
        + Encode<'q, Sqlite>
        + Type<Sqlite>
        + Encode<'q, Postgres>
        + Type<Postgres>
        + Clone
        + Debug
        + Send,
{
    fn add_postgres(&self, args: &mut PgArguments) {
        args.add(self.clone());
    }

    fn add_sqlite(&self, args: &mut SqliteArguments<'q>) {
        args.add(self.clone());
    }
}

#[derive(Debug, Default)]
pub struct DbArgumentBuffer<'q>(Vec<Box<dyn Argument<'q>>>);

impl<'q, T> Encode<'q, Db> for T
where
    T: Type<Db> + Argument<'q> + Clone,
{
    fn encode_by_ref(
        &self,
        buf: &mut DbArgumentBuffer<'q>,
    ) -> Result<IsNull, Box<dyn Error + Sync + Send>> {
        let is_null = T::type_info().is_null();
        buf.0.push(Box::new(self.clone()));
        Ok(is_null)
    }

    fn encode(
        self,
        buf: &mut DbArgumentBuffer<'q>,
    ) -> Result<IsNull, Box<dyn Error + Sync + Send>> {
        let is_null = T::type_info().is_null();
        buf.0.push(Box::new(self));
        Ok(is_null)
    }
}

impl<'r, T> Decode<'r, Db> for T
where
    T: Decode<'r, Postgres> + Decode<'r, Sqlite>,
{
    delegate! {
        to match value {
            DbValueRef::Pg(v) => v,
            DbValueRef::Sqlite(v) => v,
        } {
            fn decode(value: DbValueRef<'r>) -> Result<Self, Box<dyn Error + Sync + Send>>;
        }
    }
}

impl<T> Type<Db> for T
where
    T: Type<Postgres> + Type<Sqlite>,
{
    fn type_info() -> DbTypeInfo {
        DbTypeInfo {
            postgres: Self::type_info(),
            sqlite: Self::type_info(),
        }
    }
}

#[derive(Debug, Default)]
pub struct DbArguments<'q>(DbArgumentBuffer<'q>);

impl<'q> Arguments<'q> for DbArguments<'q> {
    type Database = Db;

    fn reserve(&mut self, additional: usize, _size: usize) {
        self.0 .0.reserve(additional);
    }

    fn add<T>(&mut self, value: T) -> Result<(), Box<dyn Error + Sync + Send>>
    where
        T: 'q + Encode<'q, Db> + Type<Db>,
    {
        value.encode(&mut self.0)?;
        Ok(())
    }

    fn len(&self) -> usize {
        self.0 .0.len()
    }

    fn format_placeholder<W: Write>(&self, w: &mut W) -> fmt::Result {
        write!(w, "${}", self.len())
    }
}

impl<'q> IntoArguments<'q, Db> for DbArguments<'q> {
    fn into_arguments(self) -> Self {
        self
    }
}

/// A prepared statement.
///
/// The query service does not make use of prepared statements, and this type is difficult to
/// implement for both Postgres and SQLite, because it is required that it both
/// * can be converted to the underlying statement type
/// * contains as a field a list of [`DbColumn`]s
/// This forces redundancy where we store both the wrapped column list and the underlying statement
/// which also contains the columns, in the underlying database's format. Since we don't need this
/// type, we avoid this mess by making it unconstructable.
#[derive(Clone, Copy, Debug)]
pub enum DbStatement {}

impl<'q> Statement<'q> for DbStatement {
    type Database = Db;

    delegate! {
        to match *self {} {
            fn to_owned(&self) -> Self;
            fn sql(&self) -> &str;
            fn parameters(&self) -> Option<Either<&[DbTypeInfo], usize>>;
            fn columns(&self) -> &[DbColumn];
            fn query(&self) -> Query<'_, Db, DbArguments<'_>>;
            fn query_with<'s, A>(&'s self, arguments: A) -> Query<'s, Db, A>
               where A: IntoArguments<'s, Db>;
            fn query_as<O>(&self) -> QueryAs<'_, Db, O, DbArguments<'_>>
               where O: for<'r> FromRow<'r, DbRow>;
            fn query_as_with<'s, O, A>(&'s self, arguments: A) -> QueryAs<'s, Db, O, A>
               where O: for<'r> FromRow<'r,DbRow>,
                     A: IntoArguments<'s, Db>;
            fn query_scalar<O>(&self) -> QueryScalar<'_, Db, O, DbArguments<'_>>
               where (O,): for<'r> FromRow<'r, DbRow>;
            fn query_scalar_with<'s, O, A>(&'s self, arguments: A) -> QueryScalar<'s, Db, O, A>
               where (O,): for<'r> FromRow<'r, DbRow>,
                     A: IntoArguments<'s, Db>;
        }
    }
}
