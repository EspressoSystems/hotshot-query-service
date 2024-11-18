searchState.loadedDescShard("hotshot_query_service", 0, "The HotShot Query Service is a minimal, generic query …\nRead-only wrapper for API state which does not require …\nContains the error value\nThere was an error while trying to fetch the requested …\nSNAFU context selector for the <code>QueryError::Error</code> variant\nThis is the consensus-internal analogous concept to a …\nThe requested resource exists but is not currently …\nSNAFU context selector for the <code>QueryError::Missing</code> variant\nThe requested resource does not exist or is not known to …\nSNAFU context selector for the <code>QueryError::NotFound</code> variant\nContains the success value\nA reference to a <code>T</code> which can be resolved into a whole <code>T</code>.\nItem within a <code>Payload</code>.\nVID commitment type\nVID common type\nVID share type\nQueries for HotShot chain state.\nThe block header contained in this leaf.\nGet a mutable reference to the block header contained in …\nOptional block payload.\nConsume the selector and return the associated error\nConsume the selector and return the associated error\nConsume the selector and return the associated error\nCalculate the leaf commitment, which is gated on the …\nGet a commitment to the underlying object.\nPersistent storage and sources of data consumed by APIs.\nValidate that a leaf has the right upgrade certificate to …\nConsume the selector and return a <code>Result</code> with the …\nConsume the selector and return a <code>Result</code> with the …\nConsume the selector and return a <code>Result</code> with the …\nFetching missing data from remote providers.\nFill this leaf with the block payload.\nFill this leaf with the block payload, without checking …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nConstructs a leaf from a given quorum proposal.\nCreate a new leaf from its components.\nHeight of this leaf in the chain.\nEmbed migrations from the given directory into the current …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nThe QC linking this leaf to its parent in the chain.\nApi for querying merklized state\nA node’s view of a HotShot chain\nCommitment to this leaf’s parent.\nA commitment to the block payload contained in this leaf.\nRun an instance of the HotShot Query service with no …\nQueries for node-specific state and uncommitted data.\nAsync task utilites.\nGet the underlying object if it is available without …\nCommon functionality provided by types used in this crate.\nTake the block payload from the leaf and return it if it …\nThe QC linking this leaf to its parent in the chain.\nTime when this leaf was created.\nAn interface for querying a HotShot blockchain.\nA block hash is the hash of the block header.\nInformation about a block.\nSNAFU context selector for the <code>Error::Custom</code> variant\nAn in-progress request to fetch some data.\nSNAFU context selector for the <code>Error::FetchBlock</code> variant\nSNAFU context selector for the <code>Error::FetchLeaf</code> variant\nSNAFU context selector for the <code>Error::FetchTransaction</code> …\nA proof that a certain transaction exists in the block.\nSNAFU context selector for the …\nEnumerate the transactions in this block.\nA summary of a payload without all the data.\nA block payload whose contents (e.g. individual …\nSNAFU context selector for the <code>Error::Request</code> variant\nAn index which can be used to efficiently retrieve a …\nA summary of a VID payload without all the data.\nAppend information about a new block to the database.\nThe hash of the block containing this transaction.\nThe height of the block containing this transaction.\nConsume the selector and return the associated error\nConsume the selector and return the associated error\nConsume the selector and return the associated error\nConsume the selector and return the associated error\nConsume the selector and return the associated error\nGet the index of the transaction with a given hash, if it …\nGet the index of the transaction with a given hash, if it …\nConvert this <code>Fetch</code> to a <code>Result</code> with the provided error …\nEnumerate the transactions in the block with their indices.\nEnumerate the transactions in the block with their indices.\nAdditional API specification files to merge with …\nConsume the selector and return a <code>Result</code> with the …\nConsume the selector and return a <code>Result</code> with the …\nConsume the selector and return a <code>Result</code> with the …\nConsume the selector and return a <code>Result</code> with the …\nConsume the selector and return a <code>Result</code> with the …\nTimeout for failing requests due to missing data.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the transaction with the given <code>hash</code>.\nThe hash of this transaction.\nThe (0-based) position of this transaction within its …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nWhether this block is empty of transactions.\nWhether this block is empty of transactions.\nDoes this fetch represent an unresolved query?\nList the transaction indices in the block.\nThe number of transactions in the block.\nTransform the result of this fetch.\nCollect information about a <code>Leaf</code>.\nGet the index of the <code>nth</code> transaction.\nGet the index of the <code>nth</code> transaction.\nGet the <code>nth</code> transaction.\nGet the <code>nth</code> transaction.\nGet the <code>nth</code> transaction, along with an inclusion proof.\nGet the <code>nth</code> transaction, along with an inclusion proof.\nGet an inclusion proof for a transaction with a given …\nGet an inclusion proof for a transaction with a given …\nA proof of inclusion of this transaction in its block.\nWait for the data to become available, if it is not …\nGet a transaction by its block-specific index.\nGet a transaction by its block-specific index.\nThe underlying transaction data.\nGet the transaction with a given hash, if it is in the …\nGet the transaction with a given hash, if it is in the …\nGet the transaction with a given hash, if it is in the …\nGet the transaction with a given hash, if it is in the …\nGet a transaction by its block-specific index, along with …\nGet the requested data if it is available immediately.\nConvert this <code>Fetch</code> to a <code>Result</code> with the provided error …\nWait for the requested data to become available, but only …\nWrapper to add extensibility to an existing data source.\nA minimal data source for the status API provided in this …\nA unit of atomicity for updating a shared data sourec.\nA transaction which can read and modify the data source.\nAn extension trait for types which implement the update …\nA data source with an atomic transaction-based …\nGeneric tests we can instantiate for all the availability …\nAsynchronous retrieval of missing data.\nReturns the argument unchanged.\nReturns the argument unchanged.\nAccess the underlying data source.\nMutably access the underlying data source.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nGeneric tests we can instantiate for all the node data …\nGeneric tests we can instantiate for any data source with …\nStart a read-only transaction on the data source.\nGeneric tests we can instantiate for all the status data …\nPersistent storage for data sources.\nUpdate query state based on a new consensus event.\nStart an atomic transaction on the data source.\nA provider which can be used as a fetcher by the …\nBuilder for <code>FetchingDataSource</code> with configuration.\nThe most basic kind of data source.\nBuild a <code>FetchingDataSource</code> with these options.\nBuild a <code>FetchingDataSource</code> with the given <code>storage</code> and …\nConnect to a remote database.\nCreate a new FileSystemDataSource with storage at <code>path</code>.\nCreate a new FileSystemDataSource using a persistent …\nRun without an aggregator.\nRun without proactive fetching.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nConstruct a new builder with the given storage and fetcher …\nOpen an existing FileSystemDataSource from storage at <code>path</code>.\nOpen an existing FileSystemDataSource using a persistent …\nAdvance the version of the persistent store without …\nAdd a delay between active fetches in proactive scans.\nSet the number of items to process at a time when …\nAdds a delay between chunk fetches during proactive scans.\nSet the interval (denominated in minor scans) between …\nSet the offset (denominated in minor scans) before the …\nSet the maximum delay between retries of failed operations.\nSet the minimum delay between retries of failed operations.\nSet the time interval between minor proactive fetching …\nSet the number of items to process at a time when scanning …\nSet the number of items to process at a time when loading …\nSet the maximum number of simultaneous fetches.\nSet the multiplier for exponential backoff when retrying …\nSet the randomization factor for randomized backoff when …\nSet the maximum time to retry failed operations before …\nA data source for the APIs provided in this crate, backed …\nCreate a new FileSystemDataSource with storage at <code>path</code>.\nCreate a new FileSystemDataSource using a persistent …\nOpen an existing FileSystemDataSource from storage at <code>path</code>.\nOpen an existing FileSystemDataSource using a persistent …\nAdvance the version of the persistent store without …\nThe <code>Error</code> type, a wrapper around a dynamic error type.\nRepresents a schema migration to be run on the database, …\nA data source for the APIs provided in this crate, backed …\nConnect to a remote database.\nEmbed migrations from the given directory into the current …\nPersistent storage for a HotShot blockchain.\nAn interface for querying Data and Statistics from the …\nThis trait defines methods that a data source should …\nThe block height for which aggregate statistics are …\n<code>get_block_detail</code> is a method that retrieves the details of …\n<code>get_block_summaries</code> is a method that retrieves a list of …\n<code>get_explorer_summary</code> is a method that retrieves a summary …\n<code>get_search_results</code> is a method that retrieves the results …\n<code>get_transaction_detail</code> is a method that retrieves the …\n<code>get_transaction_summaries</code> is a method that retrieves a …\nSearch the database for missing objects and generate a …\nUpdate aggregate statistics based on a new block.\nTarget any action for failure.\nStorage wrapper for error injection.\nA specific action that can be targetted to inject an error.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nStorage for the APIs provided in this crate, backed by a …\nCreate a new FileSystemStorage with storage at <code>path</code>.\nCreate a new FileSystemStorage using a persistent storage …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nOpen an existing FileSystemStorage from storage at <code>path</code>.\nOpen an existing FileSystemStorage using a persistent …\nAdvance the version of the persistent store without …\nMock storage implementation which doesn’t actually store …\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nEither Postgres or no storage.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nNumber of blocks to remove in a single pruning operation.\nReturns the argument unchanged.\nPruning interval\nCalls <code>U::from(self)</code>.\nMaximum disk usage (in basis points).\nMinimum data retention period\nDisk space threshold (in bytes).\nTarget data retention period\nThe concrete type used as a buffer for arguments while …\nThe concrete <code>Arguments</code> implementation for this database.\nThe concrete <code>Column</code> implementation for this database.\nPostgres client config.\nThe concrete <code>Connection</code> implementation for this database.\nA database driver.\nThe concrete database backing a SQL data source.\nThe <code>Error</code> type, a wrapper around a dynamic error type.\nA type that contains or can provide a database connection …\nA collection of parameters with a statically known length.\nRepresents a schema migration to be run on the database, …\nThe display name for this database driver.\nA collection of parameters which can be bound to a SQL …\nHelper type for programatically constructing queries.\nThe concrete <code>QueryResult</code> implementation for this database.\nMarker type indicating a transaction with read-only access …\nThe concrete <code>Row</code> implementation for this database.\nStorage for the APIs provided in this crate, backed by a …\nSqlite database driver.\nThe concrete <code>Statement</code> implementation for this database.\nAn atomic SQL transaction.\nThe concrete <code>TransactionManager</code> implementation for this …\nTrait for marker types indicating what type of access a …\nThe concrete <code>TypeInfo</code> implementation for this database.\nThe schemes for database URLs that should match this …\nThe concrete type used to hold an owned copy of the …\nThe concrete type used to hold a reference to the …\nMarker type indicating a transaction with read-write …\nGet the timestamp from when the Migration was applied. <code>None</code>…\nDisable pruning and reconstruct previously pruned data.\nGet the backtrace for this Error.\nAdd an argument and return its name as a formal parameter …\nConvert range bounds to a SQL <code>WHERE</code> clause constraining a …\nConnect to the database, setting options on the underlying …\nAn iterator of the chain of source errors contained by …\nGet the Migration checksum. Checksum is formed from the …\nConnect to the database with this config.\nConnect to a remote database.\nSet the maximum lifetime of a connection.\nWrap the error value with additional context.\nSet the name of the database to connect to.\nThe migrations requied to build the default schema for …\nAttempt to downcast the error object to a concrete type.\nDowncast this error object by mutable reference.\nDowncast this error object by reference.\nExecute the query and return the total number of rows …\nExecute the query and return the total number of rows …\nExecute multiple queries and return the rows affected from …\nExecute multiple queries and return the rows affected from …\nExecute a statement that is expected to modify at least …\nExecute a statement that is expected to modify at least …\nExecute a statement that is expected to modify exactly one …\nExecute a statement that is expected to modify exactly one …\nExecute the query and return the generated results as a …\nExecute the query and return the generated results as a …\nExecute the query and return all the generated results, …\nExecute the query and return all the generated results, …\nExecute multiple queries and return the generated results …\nExecute the query and returns exactly one row.\nExecute the query and returns exactly one row.\nExecute the query and returns at most one row.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nRetreives a Merkle path from the database\nConstruct a SQL <code>WHERE</code> clause which filters for a header …\nSet the hostname of the database server.\nSet the maximum idle time of a connection.\nEmbed the contents of a directory in your crate.\nEmbed migrations from the given directory into the current …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nReturns true if <code>E</code> is the type held by this error object.\nLoad a header from storage.\nSet the maximum number of connections to maintain at any …\nAdd custom migrations to run when connecting to the …\nSet the minimum number of connections to maintain at any …\nCreate a new error object from a printable error message.\nGet the Migration Name\nCreate a new error object from any error type.\nSkip all migrations when connecting to the database.\nSet a password for connecting to the database.\nSet the port on which to connect to the database.\nGet the Prefix\nPrepare the SQL query to inspect the type information of …\nPrepare the SQL query to inspect the type information of …\nPrepare the SQL query, with parameter type information, to …\nNote: The prune operation may not immediately free up …\nEnable pruning with a given configuration.\nFinalize the query with a constructed SQL statement.\nFinalize the query with a constructed SQL statement and a …\nReset the schema on connection.\nThe lowest level cause of this error — this error’s …\nSet the name of the schema to use for queries.\nLog at WARN level any time a SQL statement takes longer …\nUse TLS for an encrypted connection to the database.\nCreate an unapplied migration, name and version are parsed …\nSet the DB user to connect as.\nGet the Migration version\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nBalanceAmount is a type that represents a general balance …\nBlockDetail is a struct that represents the details of a …\nBlockDetailResponse is a struct that represents the …\nBlockIdentifier is an enum that represents multiple ways …\nBlockRange is a struct that represents a range for a …\nBlockSummary is a struct that represents a summary …\nBlockSummaryResponse is a struct that represents the …\nCurrencyCode represents an enumeration of all …\nCurrencyMismatchError is an error that occurs when two …\nError is an enum that represents the various errors that …\nAn interface for querying Data and Statistics from the …\nExplorerHeader is a trait that represents certain …\nExplorerHistograms provides a series of data points that …\nExplorerSummary is a struct that represents an at-a-glance …\nExplorerSummaryResponse is a struct that represents the …\nExplorerTransaction is a trait that allows the Explorer …\nFeeAttribution represents a specific attribution of fees …\nGenesisOverview provides a summary overview of the block …\nGetBlockDetailError represents an error that has occurred …\nGetBlockSummariesError represents an error that has …\nGetBlockSummariesRequest is a struct that represents an …\nGetExplorerSummaryError represents an error that has …\nGetSearchResultsError represents an error that has …\nGetTransactionDetailError represents an error that has …\nGetTransactionSummariesError represents an error that has …\nGetTransactionSummariesRequest is a struct that represents …\nInvalidCurrencyCodeError is an error that occurs when an …\nMonetaryValues is a struct that paris a CurrencyCode with …\nNamespaceId is a type that represents the id of a …\nNamespaceId is a type that represents the id of a …\nProposerId is a type that represents the proposer id of …\nSearchResult is a struct that represents the results of …\nSearchResultResponse is a struct that represents the …\nTimestamp represents a specific point in time that has a …\nTimestampConversionError represents an error that has …\nTransactionDetail is a struct that represents the details …\nTransactionDetailResponse is a struct that represents the …\nTransactionIdentifier is an enum that represents multiple …\nTransactionRange is a struct that represents a range for a …\nTransactionSummariesResponse is a struct that represents …\nTransactionSummary is a struct that represents a summary …\nTransactionSummaryFilter represents the various filters …\nWalletAddress is a type that represents the address of a …\nadd attempts to add the two MonetaryValues together.  This …\nbtc is a convenience function to create a MonetaryValue …\n<code>define_api</code> is a function that defines the API endpoints …\ndeserialize attempts to convert a string into a …\ndeserialize converts a string representation of a RFC3339 …\nesp is a convenience function to create a MonetaryValue …\neth is a convenience function to create a MonetaryValue …\nThe wallet address of the fee info account contained …\nThe balance amount of the fee info contained within the …\nfmt formats the error into a human readable string\nfmt formats the error into a human readable string\nfmt formats the currency code into a human readable string\nfmt formats the MonetaryValue into a human readable …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nfrom converts an i128 into a MonetaryValue with the USD …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\n<code>get_block_detail</code> is a method that retrieves the details of …\n<code>get_block_summaries</code> is a method that retrieves a list of …\n<code>get_explorer_summary</code> is a method that retrieves a summary …\n<code>get_search_results</code> is a method that retrieves the results …\n<code>get_transaction_detail</code> is a method that retrieves the …\n<code>get_transaction_summaries</code> is a method that retrieves a …\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nA collection of namespace ids that are contained within …\nnew creates a new MonetaryValue instance with the given …\nThe proposer id of the block as stored within the block …\nThe balance amount of the reward for constructing the …\nserialize converts the error into a struct representation\nserialize converts the error into a struct representation\nserialize converts the MonetaryValue into a String …\nserialize converts the timestamp into a string …\nsignificant_digits represents the total number of …\nsub attempts to subtract the two MonetaryValues together.  …\nusd is a convenience function to create a MonetaryValue …\nA callback to process the result of a request.\nManagement of concurrent requests to fetch resources.\nA callback to process the result of a request.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nAsynchronous fetching from external data availability …\nRequests for fetching resources.\nFetch a resource, if it is not already being fetched.\nAdaptor combining multiple data availability providers.\nTrivial <code>Provider</code> where fetching always fails.\nA provider which is able to satisfy requests for data of …\nData availability provider backed by another instance of …\nAdaptor to add test-only functionality to an existing …\nDelay fetch requests until <code>unblock</code>.\nCause subsequent requests to fail.\nFetch a resource.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nAllow blocked fetch requests to proceed.\nStop requests from failing as a result of a previous call …\nAdd a sub-provider which fetches blocks.\nAdd a sub-provider which fetches leaves.\nAdd a sub-provider which fetches both blocks and leaves.\nAdd a sub-provider which fetches VID common data.\nA request for a leaf with a given height.\nA request for a payload with a given commitment.\nA request for a resource.\nThe type of resource that will be returned as a successful …\nA request for VID common data.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nThis trait should be implemented by the MerkleTree that …\nThis trait defines methods that a data source should …\nSnapshot can be queried by block height (index) or merkle …\nThis trait defines methods for updating the storage with …\nAdditional API specification files to merge with …\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nRetrieves the field in the header containing the Merkle …\nInsert a forgotten path into the tree.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nRetrieves the name of the state being queried.\nGet the height of the tree\nA Counter metric.\nA CounterFamily metric.\nA Gauge metric.\nA GaugeFamily metric.\nA Histogram metric.\nA HistogramFamily metric.\nA Prometheus-based implementation of a Metrics registry.\nA TextFamily metric.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nGet a gauge family in this sub-group by name.\nGet a counter in this sub-group by name.\nGet a counter family in this sub-group by name.\nGet a gauge in this sub-group by name.\nGet a histogram in this sub-group by name.\nGet a histogram family in this sub-group by name.\nGet a (possibly nested) subgroup of this group by its path.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nSNAFU context selector for the <code>Error::Custom</code> variant\nSNAFU context selector for the <code>Error::Query</code> variant\nSNAFU context selector for the <code>Error::QueryVid</code> variant\nSNAFU context selector for the <code>Error::QueryWindow</code> variant\nSNAFU context selector for the <code>Error::Request</code> variant\nResponse to a <code>/:resource/window</code> query.\nConsume the selector and return the associated error\nAdditional API specification files to merge with …\nConsume the selector and return a <code>Result</code> with the …\nReturns the argument unchanged.\nReturns the argument unchanged.\nThe block height of the block that starts the window.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nSearch the database for missing objects and generate a …\nAdditional API specification files to merge with …\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nA background task which is cancelled on <code>Drop</code>\nA task handle which can be joined, but is cancelled on <code>Drop</code>\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nWait for the task to complete and get its output.\nSpawn a background task, which will be cancelled when …\nSpawn a task, which will be cancelled when dropped.\nBacking storage for the data source.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nSetup runs after setting up the network but before …\nA type alias for the mock base version\nThe block header to append\nBlock number.\nFast commitment for builder verification\nReturns the argument unchanged.\nReturns the argument unchanged.\nReturns the argument unchanged.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nCalls <code>U::from(self)</code>.\nPer spec, justification\nblock metdata\nVID commitment to the payload.\nPossible timeout or view sync certificate.\nrandom\n<code>should_return_err</code> is a testing utility to validate …\nTimestamp when this header was created.\nList of transactions.\nPossible upgrade certificate, which the leader may …\nThe URL of the builder to reach out to.\nCurView from leader when proposing leaf\nTypes which have a notion of “height” within a chain.")