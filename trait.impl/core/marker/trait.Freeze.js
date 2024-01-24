(function() {var implementors = {
"hotshot_query_service":[["impl&lt;Types&gt; Freeze for <a class=\"enum\" href=\"hotshot_query_service/availability/enum.LeafId.html\" title=\"enum hotshot_query_service::availability::LeafId\">LeafId</a>&lt;Types&gt;",1,["hotshot_query_service::availability::data_source::LeafId"]],["impl&lt;Types&gt; Freeze for <a class=\"enum\" href=\"hotshot_query_service/availability/enum.BlockId.html\" title=\"enum hotshot_query_service::availability::BlockId\">BlockId</a>&lt;Types&gt;",1,["hotshot_query_service::availability::data_source::BlockId"]],["impl&lt;T&gt; Freeze for <a class=\"enum\" href=\"hotshot_query_service/availability/enum.Fetch.html\" title=\"enum hotshot_query_service::availability::Fetch\">Fetch</a>&lt;T&gt;<span class=\"where fmt-newline\">where\n    T: Freeze,</span>",1,["hotshot_query_service::availability::fetch::Fetch"]],["impl&lt;Types&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.LeafQueryData.html\" title=\"struct hotshot_query_service::availability::LeafQueryData\">LeafQueryData</a>&lt;Types&gt;<span class=\"where fmt-newline\">where\n    &lt;Types as NodeType&gt;::BlockHeader: Freeze,\n    &lt;Types as NodeType&gt;::BlockPayload: Freeze,\n    &lt;&lt;Types as NodeType&gt;::SignatureKey as SignatureKey&gt;::QCType: Freeze,\n    &lt;Types as NodeType&gt;::SignatureKey: Freeze,\n    &lt;Types as NodeType&gt;::Time: Freeze,</span>",1,["hotshot_query_service::availability::query_data::LeafQueryData"]],["impl&lt;Types&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.InconsistentLeafError.html\" title=\"struct hotshot_query_service::availability::InconsistentLeafError\">InconsistentLeafError</a>&lt;Types&gt;",1,["hotshot_query_service::availability::query_data::InconsistentLeafError"]],["impl&lt;Types&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.BlockQueryData.html\" title=\"struct hotshot_query_service::availability::BlockQueryData\">BlockQueryData</a>&lt;Types&gt;<span class=\"where fmt-newline\">where\n    &lt;Types as NodeType&gt;::BlockHeader: Freeze,\n    &lt;Types as NodeType&gt;::BlockPayload: Freeze,</span>",1,["hotshot_query_service::availability::query_data::BlockQueryData"]],["impl&lt;Types&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.PayloadQueryData.html\" title=\"struct hotshot_query_service::availability::PayloadQueryData\">PayloadQueryData</a>&lt;Types&gt;<span class=\"where fmt-newline\">where\n    &lt;Types as NodeType&gt;::BlockPayload: Freeze,</span>",1,["hotshot_query_service::availability::query_data::PayloadQueryData"]],["impl&lt;Types&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.TransactionQueryData.html\" title=\"struct hotshot_query_service::availability::TransactionQueryData\">TransactionQueryData</a>&lt;Types&gt;<span class=\"where fmt-newline\">where\n    &lt;&lt;Types as NodeType&gt;::BlockPayload as <a class=\"trait\" href=\"hotshot_query_service/availability/trait.QueryablePayload.html\" title=\"trait hotshot_query_service::availability::QueryablePayload\">QueryablePayload</a>&gt;::<a class=\"associatedtype\" href=\"hotshot_query_service/availability/trait.QueryablePayload.html#associatedtype.InclusionProof\" title=\"type hotshot_query_service::availability::QueryablePayload::InclusionProof\">InclusionProof</a>: Freeze,\n    &lt;Types as NodeType&gt;::Transaction: Freeze,</span>",1,["hotshot_query_service::availability::query_data::TransactionQueryData"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.Options.html\" title=\"struct hotshot_query_service::availability::Options\">Options</a>",1,["hotshot_query_service::availability::Options"]],["impl Freeze for <a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>",1,["hotshot_query_service::availability::Error"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.RequestSnafu.html\" title=\"struct hotshot_query_service::availability::RequestSnafu\">RequestSnafu</a>",1,["hotshot_query_service::availability::RequestSnafu"]],["impl&lt;__T0&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.FetchLeafSnafu.html\" title=\"struct hotshot_query_service::availability::FetchLeafSnafu\">FetchLeafSnafu</a>&lt;__T0&gt;<span class=\"where fmt-newline\">where\n    __T0: Freeze,</span>",1,["hotshot_query_service::availability::FetchLeafSnafu"]],["impl&lt;__T0&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.FetchBlockSnafu.html\" title=\"struct hotshot_query_service::availability::FetchBlockSnafu\">FetchBlockSnafu</a>&lt;__T0&gt;<span class=\"where fmt-newline\">where\n    __T0: Freeze,</span>",1,["hotshot_query_service::availability::FetchBlockSnafu"]],["impl&lt;__T0&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.FetchTransactionSnafu.html\" title=\"struct hotshot_query_service::availability::FetchTransactionSnafu\">FetchTransactionSnafu</a>&lt;__T0&gt;<span class=\"where fmt-newline\">where\n    __T0: Freeze,</span>",1,["hotshot_query_service::availability::FetchTransactionSnafu"]],["impl&lt;__T0, __T1&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.InvalidTransactionIndexSnafu.html\" title=\"struct hotshot_query_service::availability::InvalidTransactionIndexSnafu\">InvalidTransactionIndexSnafu</a>&lt;__T0, __T1&gt;<span class=\"where fmt-newline\">where\n    __T0: Freeze,\n    __T1: Freeze,</span>",1,["hotshot_query_service::availability::InvalidTransactionIndexSnafu"]],["impl&lt;__T0, __T1&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.CustomSnafu.html\" title=\"struct hotshot_query_service::availability::CustomSnafu\">CustomSnafu</a>&lt;__T0, __T1&gt;<span class=\"where fmt-newline\">where\n    __T0: Freeze,\n    __T1: Freeze,</span>",1,["hotshot_query_service::availability::CustomSnafu"]],["impl&lt;D, U&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/data_source/struct.ExtensibleDataSource.html\" title=\"struct hotshot_query_service::data_source::ExtensibleDataSource\">ExtensibleDataSource</a>&lt;D, U&gt;<span class=\"where fmt-newline\">where\n    D: Freeze,\n    U: Freeze,</span>",1,["hotshot_query_service::data_source::extension::ExtensibleDataSource"]],["impl&lt;Types, S, P&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/data_source/struct.FetchingDataSource.html\" title=\"struct hotshot_query_service::data_source::FetchingDataSource\">FetchingDataSource</a>&lt;Types, S, P&gt;",1,["hotshot_query_service::data_source::fetching::FetchingDataSource"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/data_source/struct.MetricsDataSource.html\" title=\"struct hotshot_query_service::data_source::MetricsDataSource\">MetricsDataSource</a>",1,["hotshot_query_service::data_source::metrics::MetricsDataSource"]],["impl&lt;Types&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/fs/struct.FileSystemStorage.html\" title=\"struct hotshot_query_service::data_source::storage::fs::FileSystemStorage\">FileSystemStorage</a>&lt;Types&gt;",1,["hotshot_query_service::data_source::storage::fs::FileSystemStorage"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.Config.html\" title=\"struct hotshot_query_service::data_source::storage::sql::Config\">Config</a>",1,["hotshot_query_service::data_source::storage::sql::Config"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.SqlStorage.html\" title=\"struct hotshot_query_service::data_source::storage::sql::SqlStorage\">SqlStorage</a>",1,["hotshot_query_service::data_source::storage::sql::SqlStorage"]],["impl&lt;'a&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.Transaction.html\" title=\"struct hotshot_query_service::data_source::storage::sql::Transaction\">Transaction</a>&lt;'a&gt;",1,["hotshot_query_service::data_source::storage::sql::Transaction"]],["impl Freeze for <a class=\"enum\" href=\"hotshot_query_service/enum.Error.html\" title=\"enum hotshot_query_service::Error\">Error</a>",1,["hotshot_query_service::error::Error"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/fetching/provider/struct.QueryServiceProvider.html\" title=\"struct hotshot_query_service::fetching::provider::QueryServiceProvider\">QueryServiceProvider</a>",1,["hotshot_query_service::fetching::provider::query_service::QueryServiceProvider"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/fetching/provider/struct.NoFetching.html\" title=\"struct hotshot_query_service::fetching::provider::NoFetching\">NoFetching</a>",1,["hotshot_query_service::fetching::provider::NoFetching"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/fetching/request/struct.PayloadRequest.html\" title=\"struct hotshot_query_service::fetching::request::PayloadRequest\">PayloadRequest</a>",1,["hotshot_query_service::fetching::request::PayloadRequest"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/fetching/request/struct.LeafRequest.html\" title=\"struct hotshot_query_service::fetching::request::LeafRequest\">LeafRequest</a>",1,["hotshot_query_service::fetching::request::LeafRequest"]],["impl&lt;T, C&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/fetching/struct.Fetcher.html\" title=\"struct hotshot_query_service::fetching::Fetcher\">Fetcher</a>&lt;T, C&gt;",1,["hotshot_query_service::fetching::Fetcher"]],["impl Freeze for <a class=\"enum\" href=\"hotshot_query_service/metrics/enum.MetricsError.html\" title=\"enum hotshot_query_service::metrics::MetricsError\">MetricsError</a>",1,["hotshot_query_service::metrics::MetricsError"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/metrics/struct.PrometheusMetrics.html\" title=\"struct hotshot_query_service::metrics::PrometheusMetrics\">PrometheusMetrics</a>",1,["hotshot_query_service::metrics::PrometheusMetrics"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/metrics/struct.Counter.html\" title=\"struct hotshot_query_service::metrics::Counter\">Counter</a>",1,["hotshot_query_service::metrics::Counter"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/metrics/struct.Gauge.html\" title=\"struct hotshot_query_service::metrics::Gauge\">Gauge</a>",1,["hotshot_query_service::metrics::Gauge"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/metrics/struct.Histogram.html\" title=\"struct hotshot_query_service::metrics::Histogram\">Histogram</a>",1,["hotshot_query_service::metrics::Histogram"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/metrics/struct.Label.html\" title=\"struct hotshot_query_service::metrics::Label\">Label</a>",1,["hotshot_query_service::metrics::Label"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/node/struct.Options.html\" title=\"struct hotshot_query_service::node::Options\">Options</a>",1,["hotshot_query_service::node::Options"]],["impl Freeze for <a class=\"enum\" href=\"hotshot_query_service/node/enum.Error.html\" title=\"enum hotshot_query_service::node::Error\">Error</a>",1,["hotshot_query_service::node::Error"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/node/struct.RequestSnafu.html\" title=\"struct hotshot_query_service::node::RequestSnafu\">RequestSnafu</a>",1,["hotshot_query_service::node::RequestSnafu"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/node/struct.QuerySnafu.html\" title=\"struct hotshot_query_service::node::QuerySnafu\">QuerySnafu</a>",1,["hotshot_query_service::node::QuerySnafu"]],["impl&lt;__T0&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/node/struct.QueryProposalsSnafu.html\" title=\"struct hotshot_query_service::node::QueryProposalsSnafu\">QueryProposalsSnafu</a>&lt;__T0&gt;<span class=\"where fmt-newline\">where\n    __T0: Freeze,</span>",1,["hotshot_query_service::node::QueryProposalsSnafu"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/node/struct.InvalidSignatureKeySnafu.html\" title=\"struct hotshot_query_service::node::InvalidSignatureKeySnafu\">InvalidSignatureKeySnafu</a>",1,["hotshot_query_service::node::InvalidSignatureKeySnafu"]],["impl&lt;__T0, __T1&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/node/struct.CustomSnafu.html\" title=\"struct hotshot_query_service::node::CustomSnafu\">CustomSnafu</a>&lt;__T0, __T1&gt;<span class=\"where fmt-newline\">where\n    __T0: Freeze,\n    __T1: Freeze,</span>",1,["hotshot_query_service::node::CustomSnafu"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/status/struct.MempoolQueryData.html\" title=\"struct hotshot_query_service::status::MempoolQueryData\">MempoolQueryData</a>",1,["hotshot_query_service::status::query_data::MempoolQueryData"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/status/struct.Options.html\" title=\"struct hotshot_query_service::status::Options\">Options</a>",1,["hotshot_query_service::status::Options"]],["impl Freeze for <a class=\"enum\" href=\"hotshot_query_service/status/enum.Error.html\" title=\"enum hotshot_query_service::status::Error\">Error</a>",1,["hotshot_query_service::status::Error"]],["impl Freeze for <a class=\"enum\" href=\"hotshot_query_service/enum.QueryError.html\" title=\"enum hotshot_query_service::QueryError\">QueryError</a>",1,["hotshot_query_service::QueryError"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/struct.NotFoundSnafu.html\" title=\"struct hotshot_query_service::NotFoundSnafu\">NotFoundSnafu</a>",1,["hotshot_query_service::NotFoundSnafu"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/struct.MissingSnafu.html\" title=\"struct hotshot_query_service::MissingSnafu\">MissingSnafu</a>",1,["hotshot_query_service::MissingSnafu"]],["impl&lt;__T0&gt; Freeze for <a class=\"struct\" href=\"hotshot_query_service/struct.Snafu.html\" title=\"struct hotshot_query_service::Snafu\">Snafu</a>&lt;__T0&gt;<span class=\"where fmt-newline\">where\n    __T0: Freeze,</span>",1,["hotshot_query_service::Snafu"]],["impl Freeze for <a class=\"struct\" href=\"hotshot_query_service/struct.Options.html\" title=\"struct hotshot_query_service::Options\">Options</a>",1,["hotshot_query_service::Options"]]]
};if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()