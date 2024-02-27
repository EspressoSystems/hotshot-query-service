(function() {var implementors = {
"hotshot_query_service":[["impl&lt;__T0, __T1&gt; IntoError&lt;<a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>&gt; for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.InvalidTransactionIndexSnafu.html\" title=\"struct hotshot_query_service::availability::InvalidTransactionIndexSnafu\">InvalidTransactionIndexSnafu</a>&lt;__T0, __T1&gt;<div class=\"where\">where\n    <a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> + ErrorCompat,\n    __T0: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/convert/trait.Into.html\" title=\"trait core::convert::Into\">Into</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.76.0/std/primitive.u64.html\">u64</a>&gt;,\n    __T1: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/convert/trait.Into.html\" title=\"trait core::convert::Into\">Into</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.76.0/std/primitive.u64.html\">u64</a>&gt;,</div>"],["impl IntoError&lt;<a class=\"enum\" href=\"hotshot_query_service/node/enum.Error.html\" title=\"enum hotshot_query_service::node::Error\">Error</a>&gt; for <a class=\"struct\" href=\"hotshot_query_service/node/struct.QuerySnafu.html\" title=\"struct hotshot_query_service::node::QuerySnafu\">QuerySnafu</a><div class=\"where\">where\n    <a class=\"enum\" href=\"hotshot_query_service/node/enum.Error.html\" title=\"enum hotshot_query_service::node::Error\">Error</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> + ErrorCompat,</div>"],["impl&lt;__T0&gt; IntoError&lt;<a class=\"enum\" href=\"hotshot_query_service/node/enum.Error.html\" title=\"enum hotshot_query_service::node::Error\">Error</a>&gt; for <a class=\"struct\" href=\"hotshot_query_service/node/struct.QueryProposalsSnafu.html\" title=\"struct hotshot_query_service::node::QueryProposalsSnafu\">QueryProposalsSnafu</a>&lt;__T0&gt;<div class=\"where\">where\n    <a class=\"enum\" href=\"hotshot_query_service/node/enum.Error.html\" title=\"enum hotshot_query_service::node::Error\">Error</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> + ErrorCompat,\n    __T0: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/convert/trait.Into.html\" title=\"trait core::convert::Into\">Into</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.76.0/alloc/string/struct.String.html\" title=\"struct alloc::string::String\">String</a>&gt;,</div>"],["impl&lt;__T0&gt; IntoError&lt;<a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>&gt; for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.FetchBlockSnafu.html\" title=\"struct hotshot_query_service::availability::FetchBlockSnafu\">FetchBlockSnafu</a>&lt;__T0&gt;<div class=\"where\">where\n    <a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> + ErrorCompat,\n    __T0: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/convert/trait.Into.html\" title=\"trait core::convert::Into\">Into</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.76.0/alloc/string/struct.String.html\" title=\"struct alloc::string::String\">String</a>&gt;,</div>"],["impl&lt;__T0&gt; IntoError&lt;<a class=\"enum\" href=\"hotshot_query_service/enum.QueryError.html\" title=\"enum hotshot_query_service::QueryError\">QueryError</a>&gt; for <a class=\"struct\" href=\"hotshot_query_service/struct.Snafu.html\" title=\"struct hotshot_query_service::Snafu\">Snafu</a>&lt;__T0&gt;<div class=\"where\">where\n    <a class=\"enum\" href=\"hotshot_query_service/enum.QueryError.html\" title=\"enum hotshot_query_service::QueryError\">QueryError</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> + ErrorCompat,\n    __T0: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/convert/trait.Into.html\" title=\"trait core::convert::Into\">Into</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.76.0/alloc/string/struct.String.html\" title=\"struct alloc::string::String\">String</a>&gt;,</div>"],["impl&lt;__T0, __T1&gt; IntoError&lt;<a class=\"enum\" href=\"hotshot_query_service/node/enum.Error.html\" title=\"enum hotshot_query_service::node::Error\">Error</a>&gt; for <a class=\"struct\" href=\"hotshot_query_service/node/struct.CustomSnafu.html\" title=\"struct hotshot_query_service::node::CustomSnafu\">CustomSnafu</a>&lt;__T0, __T1&gt;<div class=\"where\">where\n    <a class=\"enum\" href=\"hotshot_query_service/node/enum.Error.html\" title=\"enum hotshot_query_service::node::Error\">Error</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> + ErrorCompat,\n    __T0: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/convert/trait.Into.html\" title=\"trait core::convert::Into\">Into</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.76.0/alloc/string/struct.String.html\" title=\"struct alloc::string::String\">String</a>&gt;,\n    __T1: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/convert/trait.Into.html\" title=\"trait core::convert::Into\">Into</a>&lt;StatusCode&gt;,</div>"],["impl&lt;__T0&gt; IntoError&lt;<a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>&gt; for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.FetchLeafSnafu.html\" title=\"struct hotshot_query_service::availability::FetchLeafSnafu\">FetchLeafSnafu</a>&lt;__T0&gt;<div class=\"where\">where\n    <a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> + ErrorCompat,\n    __T0: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/convert/trait.Into.html\" title=\"trait core::convert::Into\">Into</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.76.0/alloc/string/struct.String.html\" title=\"struct alloc::string::String\">String</a>&gt;,</div>"],["impl IntoError&lt;<a class=\"enum\" href=\"hotshot_query_service/enum.QueryError.html\" title=\"enum hotshot_query_service::QueryError\">QueryError</a>&gt; for <a class=\"struct\" href=\"hotshot_query_service/struct.MissingSnafu.html\" title=\"struct hotshot_query_service::MissingSnafu\">MissingSnafu</a><div class=\"where\">where\n    <a class=\"enum\" href=\"hotshot_query_service/enum.QueryError.html\" title=\"enum hotshot_query_service::QueryError\">QueryError</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> + ErrorCompat,</div>"],["impl&lt;__T0&gt; IntoError&lt;<a class=\"enum\" href=\"hotshot_query_service/node/enum.Error.html\" title=\"enum hotshot_query_service::node::Error\">Error</a>&gt; for <a class=\"struct\" href=\"hotshot_query_service/node/struct.QueryVidSnafu.html\" title=\"struct hotshot_query_service::node::QueryVidSnafu\">QueryVidSnafu</a>&lt;__T0&gt;<div class=\"where\">where\n    <a class=\"enum\" href=\"hotshot_query_service/node/enum.Error.html\" title=\"enum hotshot_query_service::node::Error\">Error</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> + ErrorCompat,\n    __T0: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/convert/trait.Into.html\" title=\"trait core::convert::Into\">Into</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.76.0/alloc/string/struct.String.html\" title=\"struct alloc::string::String\">String</a>&gt;,</div>"],["impl&lt;__T0&gt; IntoError&lt;<a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>&gt; for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.FetchTransactionSnafu.html\" title=\"struct hotshot_query_service::availability::FetchTransactionSnafu\">FetchTransactionSnafu</a>&lt;__T0&gt;<div class=\"where\">where\n    <a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> + ErrorCompat,\n    __T0: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/convert/trait.Into.html\" title=\"trait core::convert::Into\">Into</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.76.0/alloc/string/struct.String.html\" title=\"struct alloc::string::String\">String</a>&gt;,</div>"],["impl IntoError&lt;<a class=\"enum\" href=\"hotshot_query_service/node/enum.Error.html\" title=\"enum hotshot_query_service::node::Error\">Error</a>&gt; for <a class=\"struct\" href=\"hotshot_query_service/node/struct.RequestSnafu.html\" title=\"struct hotshot_query_service::node::RequestSnafu\">RequestSnafu</a><div class=\"where\">where\n    <a class=\"enum\" href=\"hotshot_query_service/node/enum.Error.html\" title=\"enum hotshot_query_service::node::Error\">Error</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> + ErrorCompat,</div>"],["impl IntoError&lt;<a class=\"enum\" href=\"hotshot_query_service/node/enum.Error.html\" title=\"enum hotshot_query_service::node::Error\">Error</a>&gt; for <a class=\"struct\" href=\"hotshot_query_service/node/struct.InvalidSignatureKeySnafu.html\" title=\"struct hotshot_query_service::node::InvalidSignatureKeySnafu\">InvalidSignatureKeySnafu</a><div class=\"where\">where\n    <a class=\"enum\" href=\"hotshot_query_service/node/enum.Error.html\" title=\"enum hotshot_query_service::node::Error\">Error</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> + ErrorCompat,</div>"],["impl IntoError&lt;<a class=\"enum\" href=\"hotshot_query_service/enum.QueryError.html\" title=\"enum hotshot_query_service::QueryError\">QueryError</a>&gt; for <a class=\"struct\" href=\"hotshot_query_service/struct.NotFoundSnafu.html\" title=\"struct hotshot_query_service::NotFoundSnafu\">NotFoundSnafu</a><div class=\"where\">where\n    <a class=\"enum\" href=\"hotshot_query_service/enum.QueryError.html\" title=\"enum hotshot_query_service::QueryError\">QueryError</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> + ErrorCompat,</div>"],["impl&lt;__T0, __T1&gt; IntoError&lt;<a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>&gt; for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.CustomSnafu.html\" title=\"struct hotshot_query_service::availability::CustomSnafu\">CustomSnafu</a>&lt;__T0, __T1&gt;<div class=\"where\">where\n    <a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> + ErrorCompat,\n    __T0: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/convert/trait.Into.html\" title=\"trait core::convert::Into\">Into</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.76.0/alloc/string/struct.String.html\" title=\"struct alloc::string::String\">String</a>&gt;,\n    __T1: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/convert/trait.Into.html\" title=\"trait core::convert::Into\">Into</a>&lt;StatusCode&gt;,</div>"],["impl IntoError&lt;<a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>&gt; for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.RequestSnafu.html\" title=\"struct hotshot_query_service::availability::RequestSnafu\">RequestSnafu</a><div class=\"where\">where\n    <a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> + ErrorCompat,</div>"]]
};if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()