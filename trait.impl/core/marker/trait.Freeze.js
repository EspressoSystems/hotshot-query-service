(function() {var implementors = {
"hotshot_query_service":[["impl&lt;Types&gt; Freeze for <a class=\"enum\" href=\"hotshot_query_service/availability/enum.LeafId.html\" title=\"enum hotshot_query_service::availability::LeafId\">LeafId</a>&lt;Types&gt;",1,["hotshot_query_service::availability::data_source::LeafId"]],["impl&lt;Types&gt; Freeze for <a class=\"enum\" href=\"hotshot_query_service/availability/enum.BlockId.html\" title=\"enum hotshot_query_service::availability::BlockId\">BlockId</a>&lt;Types&gt;",1,["hotshot_query_service::availability::data_source::BlockId"]],["impl&lt;T&gt; Freeze for <a class=\"enum\" href=\"hotshot_query_service/availability/enum.Fetch.html\" title=\"enum hotshot_query_service::availability::Fetch\">Fetch</a>&lt;T&gt;<div class=\"where\">where\n    T: Freeze,</div>",1,["hotshot_query_service::availability::fetch::Fetch"]],["impl&lt;Types&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.LeafQueryData.html\" title=\"struct hotshot_query_service::availability::LeafQueryData\">LeafQueryData</a>&lt;Types&gt;<div class=\"where\">where\n    &lt;Types as NodeType&gt;::BlockHeader: Freeze,\n    &lt;Types as NodeType&gt;::BlockPayload: Freeze,\n    &lt;&lt;Types as NodeType&gt;::SignatureKey as SignatureKey&gt;::QCType: Freeze,\n    &lt;Types as NodeType&gt;::Time: Freeze,</div>",1,["hotshot_query_service::availability::query_data::LeafQueryData"]],["impl&lt;Types&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.InconsistentLeafError.html\" title=\"struct hotshot_query_service::availability::InconsistentLeafError\">InconsistentLeafError</a>&lt;Types&gt;",1,["hotshot_query_service::availability::query_data::InconsistentLeafError"]],["impl&lt;Types&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.BlockQueryData.html\" title=\"struct hotshot_query_service::availability::BlockQueryData\">BlockQueryData</a>&lt;Types&gt;<div class=\"where\">where\n    &lt;Types as NodeType&gt;::BlockHeader: Freeze,\n    &lt;Types as NodeType&gt;::BlockPayload: Freeze,</div>",1,["hotshot_query_service::availability::query_data::BlockQueryData"]],["impl&lt;Types&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.PayloadQueryData.html\" title=\"struct hotshot_query_service::availability::PayloadQueryData\">PayloadQueryData</a>&lt;Types&gt;<div class=\"where\">where\n    &lt;Types as NodeType&gt;::BlockPayload: Freeze,</div>",1,["hotshot_query_service::availability::query_data::PayloadQueryData"]],["impl&lt;Types&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.VidCommonQueryData.html\" title=\"struct hotshot_query_service::availability::VidCommonQueryData\">VidCommonQueryData</a>&lt;Types&gt;",1,["hotshot_query_service::availability::query_data::VidCommonQueryData"]],["impl&lt;Types&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.TransactionQueryData.html\" title=\"struct hotshot_query_service::availability::TransactionQueryData\">TransactionQueryData</a>&lt;Types&gt;<div class=\"where\">where\n    &lt;&lt;Types as NodeType&gt;::BlockPayload as <a class=\"trait\" href=\"hotshot_query_service/availability/trait.QueryablePayload.html\" title=\"trait hotshot_query_service::availability::QueryablePayload\">QueryablePayload</a>&gt;::<a class=\"associatedtype\" href=\"hotshot_query_service/availability/trait.QueryablePayload.html#associatedtype.InclusionProof\" title=\"type hotshot_query_service::availability::QueryablePayload::InclusionProof\">InclusionProof</a>: Freeze,\n    &lt;Types as NodeType&gt;::Transaction: Freeze,</div>",1,["hotshot_query_service::availability::query_data::TransactionQueryData"]],["impl&lt;Types&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.BlockSummaryQueryData.html\" title=\"struct hotshot_query_service::availability::BlockSummaryQueryData\">BlockSummaryQueryData</a>&lt;Types&gt;<div class=\"where\">where\n    &lt;Types as NodeType&gt;::BlockHeader: Freeze,</div>",1,["hotshot_query_service::availability::query_data::BlockSummaryQueryData"]],["impl&lt;Types&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.TransactionSummaryQueryData.html\" title=\"struct hotshot_query_service::availability::TransactionSummaryQueryData\">TransactionSummaryQueryData</a>&lt;Types&gt;<div class=\"where\">where\n    &lt;Types as NodeType&gt;::BlockHeader: Freeze,\n    &lt;Types as NodeType&gt;::Transaction: Freeze,</div>",1,["hotshot_query_service::availability::query_data::TransactionSummaryQueryData"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.Options.html\" title=\"struct hotshot_query_service::availability::Options\">Options</a>",1,["hotshot_query_service::availability::Options"]],["impl Freeze for <a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>",1,["hotshot_query_service::availability::Error"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.RequestSnafu.html\" title=\"struct hotshot_query_service::availability::RequestSnafu\">RequestSnafu</a>",1,["hotshot_query_service::availability::RequestSnafu"]],["impl&lt;__T0&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.FetchLeafSnafu.html\" title=\"struct hotshot_query_service::availability::FetchLeafSnafu\">FetchLeafSnafu</a>&lt;__T0&gt;<div class=\"where\">where\n    __T0: Freeze,</div>",1,["hotshot_query_service::availability::FetchLeafSnafu"]],["impl&lt;__T0&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.FetchBlockSnafu.html\" title=\"struct hotshot_query_service::availability::FetchBlockSnafu\">FetchBlockSnafu</a>&lt;__T0&gt;<div class=\"where\">where\n    __T0: Freeze,</div>",1,["hotshot_query_service::availability::FetchBlockSnafu"]],["impl&lt;__T0&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.FetchTransactionSnafu.html\" title=\"struct hotshot_query_service::availability::FetchTransactionSnafu\">FetchTransactionSnafu</a>&lt;__T0&gt;<div class=\"where\">where\n    __T0: Freeze,</div>",1,["hotshot_query_service::availability::FetchTransactionSnafu"]],["impl&lt;__T0, __T1&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.InvalidTransactionIndexSnafu.html\" title=\"struct hotshot_query_service::availability::InvalidTransactionIndexSnafu\">InvalidTransactionIndexSnafu</a>&lt;__T0, __T1&gt;<div class=\"where\">where\n    __T0: Freeze,\n    __T1: Freeze,</div>",1,["hotshot_query_service::availability::InvalidTransactionIndexSnafu"]],["impl&lt;__T0, __T1&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.CustomSnafu.html\" title=\"struct hotshot_query_service::availability::CustomSnafu\">CustomSnafu</a>&lt;__T0, __T1&gt;<div class=\"where\">where\n    __T0: Freeze,\n    __T1: Freeze,</div>",1,["hotshot_query_service::availability::CustomSnafu"]],["impl&lt;D, U&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/data_source/struct.ExtensibleDataSource.html\" title=\"struct hotshot_query_service::data_source::ExtensibleDataSource\">ExtensibleDataSource</a>&lt;D, U&gt;<div class=\"where\">where\n    D: Freeze,\n    U: Freeze,</div>",1,["hotshot_query_service::data_source::extension::ExtensibleDataSource"]],["impl&lt;Types, S, P&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/data_source/fetching/struct.Builder.html\" title=\"struct hotshot_query_service::data_source::fetching::Builder\">Builder</a>&lt;Types, S, P&gt;<div class=\"where\">where\n    P: Freeze,\n    S: Freeze,</div>",1,["hotshot_query_service::data_source::fetching::Builder"]],["impl&lt;Types, S, P&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/data_source/fetching/struct.FetchingDataSource.html\" title=\"struct hotshot_query_service::data_source::fetching::FetchingDataSource\">FetchingDataSource</a>&lt;Types, S, P&gt;",1,["hotshot_query_service::data_source::fetching::FetchingDataSource"]],["impl&lt;Types, S, P&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/data_source/fetching/struct.Pruner.html\" title=\"struct hotshot_query_service::data_source::fetching::Pruner\">Pruner</a>&lt;Types, S, P&gt;",1,["hotshot_query_service::data_source::fetching::Pruner"]],["impl&lt;'a, Types, S&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/data_source/fetching/struct.StorageReadGuard.html\" title=\"struct hotshot_query_service::data_source::fetching::StorageReadGuard\">StorageReadGuard</a>&lt;'a, Types, S&gt;",1,["hotshot_query_service::data_source::fetching::StorageReadGuard"]],["impl&lt;'a, Types, S&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/data_source/fetching/struct.StorageWriteGuard.html\" title=\"struct hotshot_query_service::data_source::fetching::StorageWriteGuard\">StorageWriteGuard</a>&lt;'a, Types, S&gt;",1,["hotshot_query_service::data_source::fetching::StorageWriteGuard"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/data_source/struct.MetricsDataSource.html\" title=\"struct hotshot_query_service::data_source::MetricsDataSource\">MetricsDataSource</a>",1,["hotshot_query_service::data_source::metrics::MetricsDataSource"]],["impl&lt;Types&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/fs/struct.FileSystemStorage.html\" title=\"struct hotshot_query_service::data_source::storage::fs::FileSystemStorage\">FileSystemStorage</a>&lt;Types&gt;",1,["hotshot_query_service::data_source::storage::fs::FileSystemStorage"]],["impl Freeze for <a class=\"enum\" href=\"hotshot_query_service/data_source/storage/no_storage/testing/enum.Storage.html\" title=\"enum hotshot_query_service::data_source::storage::no_storage::testing::Storage\">Storage</a>",1,["hotshot_query_service::data_source::storage::no_storage::testing::Storage"]],["impl Freeze for <a class=\"enum\" href=\"hotshot_query_service/data_source/storage/no_storage/testing/enum.DataSource.html\" title=\"enum hotshot_query_service::data_source::storage::no_storage::testing::DataSource\">DataSource</a>",1,["hotshot_query_service::data_source::storage::no_storage::testing::DataSource"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/no_storage/struct.NoStorage.html\" title=\"struct hotshot_query_service::data_source::storage::no_storage::NoStorage\">NoStorage</a>",1,["hotshot_query_service::data_source::storage::no_storage::NoStorage"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/pruning/struct.PrunerCfg.html\" title=\"struct hotshot_query_service::data_source::storage::pruning::PrunerCfg\">PrunerCfg</a>",1,["hotshot_query_service::data_source::storage::pruning::PrunerCfg"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/testing/struct.TmpDb.html\" title=\"struct hotshot_query_service::data_source::storage::sql::testing::TmpDb\">TmpDb</a>",1,["hotshot_query_service::data_source::storage::sql::testing::TmpDb"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/testing/struct.TestMerkleTreeMigration.html\" title=\"struct hotshot_query_service::data_source::storage::sql::testing::TestMerkleTreeMigration\">TestMerkleTreeMigration</a>",1,["hotshot_query_service::data_source::storage::sql::testing::TestMerkleTreeMigration"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.Config.html\" title=\"struct hotshot_query_service::data_source::storage::sql::Config\">Config</a>",1,["hotshot_query_service::data_source::storage::sql::Config"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.SqlStorage.html\" title=\"struct hotshot_query_service::data_source::storage::sql::SqlStorage\">SqlStorage</a>",1,["hotshot_query_service::data_source::storage::sql::SqlStorage"]],["impl&lt;'a&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.Transaction.html\" title=\"struct hotshot_query_service::data_source::storage::sql::Transaction\">Transaction</a>&lt;'a&gt;",1,["hotshot_query_service::data_source::storage::sql::Transaction"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.LTree.html\" title=\"struct hotshot_query_service::data_source::storage::sql::LTree\">LTree</a>",1,["hotshot_query_service::data_source::storage::sql::LTree"]],["impl Freeze for <a class=\"enum\" href=\"hotshot_query_service/enum.Error.html\" title=\"enum hotshot_query_service::Error\">Error</a>",1,["hotshot_query_service::error::Error"]],["impl&lt;Types&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/fetching/provider/struct.AnyProvider.html\" title=\"struct hotshot_query_service::fetching::provider::AnyProvider\">AnyProvider</a>&lt;Types&gt;",1,["hotshot_query_service::fetching::provider::any::AnyProvider"]],["impl&lt;Ver&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/fetching/provider/struct.QueryServiceProvider.html\" title=\"struct hotshot_query_service::fetching::provider::QueryServiceProvider\">QueryServiceProvider</a>&lt;Ver&gt;",1,["hotshot_query_service::fetching::provider::query_service::QueryServiceProvider"]],["impl&lt;P&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/fetching/provider/struct.TestProvider.html\" title=\"struct hotshot_query_service::fetching::provider::TestProvider\">TestProvider</a>&lt;P&gt;",1,["hotshot_query_service::fetching::provider::testing::TestProvider"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/fetching/provider/struct.NoFetching.html\" title=\"struct hotshot_query_service::fetching::provider::NoFetching\">NoFetching</a>",1,["hotshot_query_service::fetching::provider::NoFetching"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/fetching/request/struct.PayloadRequest.html\" title=\"struct hotshot_query_service::fetching::request::PayloadRequest\">PayloadRequest</a>",1,["hotshot_query_service::fetching::request::PayloadRequest"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/fetching/request/struct.VidCommonRequest.html\" title=\"struct hotshot_query_service::fetching::request::VidCommonRequest\">VidCommonRequest</a>",1,["hotshot_query_service::fetching::request::VidCommonRequest"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/fetching/request/struct.LeafRequest.html\" title=\"struct hotshot_query_service::fetching::request::LeafRequest\">LeafRequest</a>",1,["hotshot_query_service::fetching::request::LeafRequest"]],["impl&lt;T, C&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/fetching/struct.Fetcher.html\" title=\"struct hotshot_query_service::fetching::Fetcher\">Fetcher</a>&lt;T, C&gt;",1,["hotshot_query_service::fetching::Fetcher"]],["impl&lt;Types, T&gt; Freeze for <a class=\"enum\" href=\"hotshot_query_service/merklized_state/enum.Snapshot.html\" title=\"enum hotshot_query_service::merklized_state::Snapshot\">Snapshot</a>&lt;Types, T&gt;<div class=\"where\">where\n    &lt;T as <a class=\"trait\" href=\"hotshot_query_service/merklized_state/trait.MerklizedState.html\" title=\"trait hotshot_query_service::merklized_state::MerklizedState\">MerklizedState</a>&lt;Types&gt;&gt;::<a class=\"associatedtype\" href=\"hotshot_query_service/merklized_state/trait.MerklizedState.html#associatedtype.Commit\" title=\"type hotshot_query_service::merklized_state::MerklizedState::Commit\">Commit</a>: Freeze,</div>",1,["hotshot_query_service::merklized_state::data_source::Snapshot"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/merklized_state/struct.Options.html\" title=\"struct hotshot_query_service::merklized_state::Options\">Options</a>",1,["hotshot_query_service::merklized_state::Options"]],["impl Freeze for <a class=\"enum\" href=\"hotshot_query_service/merklized_state/enum.Error.html\" title=\"enum hotshot_query_service::merklized_state::Error\">Error</a>",1,["hotshot_query_service::merklized_state::Error"]],["impl Freeze for <a class=\"enum\" href=\"hotshot_query_service/metrics/enum.MetricsError.html\" title=\"enum hotshot_query_service::metrics::MetricsError\">MetricsError</a>",1,["hotshot_query_service::metrics::MetricsError"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/metrics/struct.PrometheusMetrics.html\" title=\"struct hotshot_query_service::metrics::PrometheusMetrics\">PrometheusMetrics</a>",1,["hotshot_query_service::metrics::PrometheusMetrics"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/metrics/struct.Counter.html\" title=\"struct hotshot_query_service::metrics::Counter\">Counter</a>",1,["hotshot_query_service::metrics::Counter"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/metrics/struct.Gauge.html\" title=\"struct hotshot_query_service::metrics::Gauge\">Gauge</a>",1,["hotshot_query_service::metrics::Gauge"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/metrics/struct.Histogram.html\" title=\"struct hotshot_query_service::metrics::Histogram\">Histogram</a>",1,["hotshot_query_service::metrics::Histogram"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/metrics/struct.Label.html\" title=\"struct hotshot_query_service::metrics::Label\">Label</a>",1,["hotshot_query_service::metrics::Label"]],["impl&lt;Types&gt; Freeze for <a class=\"enum\" href=\"hotshot_query_service/node/enum.WindowStart.html\" title=\"enum hotshot_query_service::node::WindowStart\">WindowStart</a>&lt;Types&gt;",1,["hotshot_query_service::node::data_source::WindowStart"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/node/struct.SyncStatus.html\" title=\"struct hotshot_query_service::node::SyncStatus\">SyncStatus</a>",1,["hotshot_query_service::node::query_data::SyncStatus"]],["impl&lt;T&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/node/struct.TimeWindowQueryData.html\" title=\"struct hotshot_query_service::node::TimeWindowQueryData\">TimeWindowQueryData</a>&lt;T&gt;<div class=\"where\">where\n    T: Freeze,</div>",1,["hotshot_query_service::node::query_data::TimeWindowQueryData"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/node/struct.Options.html\" title=\"struct hotshot_query_service::node::Options\">Options</a>",1,["hotshot_query_service::node::Options"]],["impl Freeze for <a class=\"enum\" href=\"hotshot_query_service/node/enum.Error.html\" title=\"enum hotshot_query_service::node::Error\">Error</a>",1,["hotshot_query_service::node::Error"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/node/struct.RequestSnafu.html\" title=\"struct hotshot_query_service::node::RequestSnafu\">RequestSnafu</a>",1,["hotshot_query_service::node::RequestSnafu"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/node/struct.QuerySnafu.html\" title=\"struct hotshot_query_service::node::QuerySnafu\">QuerySnafu</a>",1,["hotshot_query_service::node::QuerySnafu"]],["impl&lt;__T0&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/node/struct.QueryVidSnafu.html\" title=\"struct hotshot_query_service::node::QueryVidSnafu\">QueryVidSnafu</a>&lt;__T0&gt;<div class=\"where\">where\n    __T0: Freeze,</div>",1,["hotshot_query_service::node::QueryVidSnafu"]],["impl&lt;__T0, __T1&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/node/struct.QueryWindowSnafu.html\" title=\"struct hotshot_query_service::node::QueryWindowSnafu\">QueryWindowSnafu</a>&lt;__T0, __T1&gt;<div class=\"where\">where\n    __T0: Freeze,\n    __T1: Freeze,</div>",1,["hotshot_query_service::node::QueryWindowSnafu"]],["impl&lt;__T0, __T1&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/node/struct.CustomSnafu.html\" title=\"struct hotshot_query_service::node::CustomSnafu\">CustomSnafu</a>&lt;__T0, __T1&gt;<div class=\"where\">where\n    __T0: Freeze,\n    __T1: Freeze,</div>",1,["hotshot_query_service::node::CustomSnafu"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/status/struct.MempoolQueryData.html\" title=\"struct hotshot_query_service::status::MempoolQueryData\">MempoolQueryData</a>",1,["hotshot_query_service::status::query_data::MempoolQueryData"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/status/struct.Options.html\" title=\"struct hotshot_query_service::status::Options\">Options</a>",1,["hotshot_query_service::status::Options"]],["impl Freeze for <a class=\"enum\" href=\"hotshot_query_service/status/enum.Error.html\" title=\"enum hotshot_query_service::status::Error\">Error</a>",1,["hotshot_query_service::status::Error"]],["impl&lt;D&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/testing/consensus/struct.MockNetwork.html\" title=\"struct hotshot_query_service::testing::consensus::MockNetwork\">MockNetwork</a>&lt;D&gt;",1,["hotshot_query_service::testing::consensus::MockNetwork"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/testing/mocks/struct.MockTypes.html\" title=\"struct hotshot_query_service::testing::mocks::MockTypes\">MockTypes</a>",1,["hotshot_query_service::testing::mocks::MockTypes"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/testing/mocks/struct.MockNodeImpl.html\" title=\"struct hotshot_query_service::testing::mocks::MockNodeImpl\">MockNodeImpl</a>",1,["hotshot_query_service::testing::mocks::MockNodeImpl"]],["impl Freeze for <a class=\"enum\" href=\"hotshot_query_service/enum.QueryError.html\" title=\"enum hotshot_query_service::QueryError\">QueryError</a>",1,["hotshot_query_service::QueryError"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/struct.NotFoundSnafu.html\" title=\"struct hotshot_query_service::NotFoundSnafu\">NotFoundSnafu</a>",1,["hotshot_query_service::NotFoundSnafu"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/struct.MissingSnafu.html\" title=\"struct hotshot_query_service::MissingSnafu\">MissingSnafu</a>",1,["hotshot_query_service::MissingSnafu"]],["impl&lt;__T0&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/struct.Snafu.html\" title=\"struct hotshot_query_service::Snafu\">Snafu</a>&lt;__T0&gt;<div class=\"where\">where\n    __T0: Freeze,</div>",1,["hotshot_query_service::Snafu"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/struct.Options.html\" title=\"struct hotshot_query_service::Options\">Options</a>",1,["hotshot_query_service::Options"]]]
};if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()