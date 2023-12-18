(function() {var implementors = {
"hotshot_query_service":[["impl&lt;__T0, __T1&gt; IntoError&lt;<a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>&gt; for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.InvalidTransactionIndexSnafu.html\" title=\"struct hotshot_query_service::availability::InvalidTransactionIndexSnafu\">InvalidTransactionIndexSnafu</a>&lt;__T0, __T1&gt;<span class=\"where fmt-newline\">where\n    <a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.74.1/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> + ErrorCompat,\n    __T0: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.74.1/core/convert/trait.Into.html\" title=\"trait core::convert::Into\">Into</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.74.1/std/primitive.u64.html\">u64</a>&gt;,\n    __T1: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.74.1/core/convert/trait.Into.html\" title=\"trait core::convert::Into\">Into</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.74.1/std/primitive.u64.html\">u64</a>&gt;,</span>"],["impl&lt;__T0&gt; IntoError&lt;<a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>&gt; for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.QueryProposalsSnafu.html\" title=\"struct hotshot_query_service::availability::QueryProposalsSnafu\">QueryProposalsSnafu</a>&lt;__T0&gt;<span class=\"where fmt-newline\">where\n    <a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.74.1/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> + ErrorCompat,\n    __T0: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.74.1/core/convert/trait.Into.html\" title=\"trait core::convert::Into\">Into</a>&lt;EncodedPublicKey&gt;,</span>"],["impl&lt;__T0, __T1&gt; IntoError&lt;<a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>&gt; for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.CustomSnafu.html\" title=\"struct hotshot_query_service::availability::CustomSnafu\">CustomSnafu</a>&lt;__T0, __T1&gt;<span class=\"where fmt-newline\">where\n    <a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.74.1/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> + ErrorCompat,\n    __T0: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.74.1/core/convert/trait.Into.html\" title=\"trait core::convert::Into\">Into</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.74.1/alloc/string/struct.String.html\" title=\"struct alloc::string::String\">String</a>&gt;,\n    __T1: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.74.1/core/convert/trait.Into.html\" title=\"trait core::convert::Into\">Into</a>&lt;StatusCode&gt;,</span>"],["impl&lt;__T0&gt; IntoError&lt;<a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>&gt; for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.QueryTransactionSnafu.html\" title=\"struct hotshot_query_service::availability::QueryTransactionSnafu\">QueryTransactionSnafu</a>&lt;__T0&gt;<span class=\"where fmt-newline\">where\n    <a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.74.1/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> + ErrorCompat,\n    __T0: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.74.1/core/convert/trait.Into.html\" title=\"trait core::convert::Into\">Into</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.74.1/alloc/string/struct.String.html\" title=\"struct alloc::string::String\">String</a>&gt;,</span>"],["impl IntoError&lt;<a class=\"enum\" href=\"hotshot_query_service/enum.QueryError.html\" title=\"enum hotshot_query_service::QueryError\">QueryError</a>&gt; for <a class=\"struct\" href=\"hotshot_query_service/struct.MissingSnafu.html\" title=\"struct hotshot_query_service::MissingSnafu\">MissingSnafu</a><span class=\"where fmt-newline\">where\n    <a class=\"enum\" href=\"hotshot_query_service/enum.QueryError.html\" title=\"enum hotshot_query_service::QueryError\">QueryError</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.74.1/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> + ErrorCompat,</span>"],["impl IntoError&lt;<a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>&gt; for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.StreamBlockSnafu.html\" title=\"struct hotshot_query_service::availability::StreamBlockSnafu\">StreamBlockSnafu</a><span class=\"where fmt-newline\">where\n    <a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.74.1/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> + ErrorCompat,</span>"],["impl IntoError&lt;<a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>&gt; for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.RequestSnafu.html\" title=\"struct hotshot_query_service::availability::RequestSnafu\">RequestSnafu</a><span class=\"where fmt-newline\">where\n    <a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.74.1/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> + ErrorCompat,</span>"],["impl&lt;__T0&gt; IntoError&lt;<a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>&gt; for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.QueryBlockSnafu.html\" title=\"struct hotshot_query_service::availability::QueryBlockSnafu\">QueryBlockSnafu</a>&lt;__T0&gt;<span class=\"where fmt-newline\">where\n    <a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.74.1/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> + ErrorCompat,\n    __T0: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.74.1/core/convert/trait.Into.html\" title=\"trait core::convert::Into\">Into</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.74.1/alloc/string/struct.String.html\" title=\"struct alloc::string::String\">String</a>&gt;,</span>"],["impl&lt;__T0&gt; IntoError&lt;<a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>&gt; for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.QueryLeafSnafu.html\" title=\"struct hotshot_query_service::availability::QueryLeafSnafu\">QueryLeafSnafu</a>&lt;__T0&gt;<span class=\"where fmt-newline\">where\n    <a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.74.1/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> + ErrorCompat,\n    __T0: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.74.1/core/convert/trait.Into.html\" title=\"trait core::convert::Into\">Into</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.74.1/alloc/string/struct.String.html\" title=\"struct alloc::string::String\">String</a>&gt;,</span>"],["impl IntoError&lt;<a class=\"enum\" href=\"hotshot_query_service/enum.QueryError.html\" title=\"enum hotshot_query_service::QueryError\">QueryError</a>&gt; for <a class=\"struct\" href=\"hotshot_query_service/struct.NotFoundSnafu.html\" title=\"struct hotshot_query_service::NotFoundSnafu\">NotFoundSnafu</a><span class=\"where fmt-newline\">where\n    <a class=\"enum\" href=\"hotshot_query_service/enum.QueryError.html\" title=\"enum hotshot_query_service::QueryError\">QueryError</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.74.1/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> + ErrorCompat,</span>"],["impl&lt;__T0, __T1&gt; IntoError&lt;<a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>&gt; for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.LeafStreamSnafu.html\" title=\"struct hotshot_query_service::availability::LeafStreamSnafu\">LeafStreamSnafu</a>&lt;__T0, __T1&gt;<span class=\"where fmt-newline\">where\n    <a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.74.1/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> + ErrorCompat,\n    __T0: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.74.1/core/convert/trait.Into.html\" title=\"trait core::convert::Into\">Into</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.74.1/std/primitive.usize.html\">usize</a>&gt;,\n    __T1: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.74.1/core/convert/trait.Into.html\" title=\"trait core::convert::Into\">Into</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.74.1/alloc/string/struct.String.html\" title=\"struct alloc::string::String\">String</a>&gt;,</span>"],["impl IntoError&lt;<a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>&gt; for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.StreamLeafSnafu.html\" title=\"struct hotshot_query_service::availability::StreamLeafSnafu\">StreamLeafSnafu</a><span class=\"where fmt-newline\">where\n    <a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.74.1/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> + ErrorCompat,</span>"],["impl&lt;__T0&gt; IntoError&lt;<a class=\"enum\" href=\"hotshot_query_service/enum.QueryError.html\" title=\"enum hotshot_query_service::QueryError\">QueryError</a>&gt; for <a class=\"struct\" href=\"hotshot_query_service/struct.Snafu.html\" title=\"struct hotshot_query_service::Snafu\">Snafu</a>&lt;__T0&gt;<span class=\"where fmt-newline\">where\n    <a class=\"enum\" href=\"hotshot_query_service/enum.QueryError.html\" title=\"enum hotshot_query_service::QueryError\">QueryError</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.74.1/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> + ErrorCompat,\n    __T0: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.74.1/core/convert/trait.Into.html\" title=\"trait core::convert::Into\">Into</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.74.1/alloc/string/struct.String.html\" title=\"struct alloc::string::String\">String</a>&gt;,</span>"],["impl&lt;__T0, __T1&gt; IntoError&lt;<a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>&gt; for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.BlockStreamSnafu.html\" title=\"struct hotshot_query_service::availability::BlockStreamSnafu\">BlockStreamSnafu</a>&lt;__T0, __T1&gt;<span class=\"where fmt-newline\">where\n    <a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.74.1/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> + ErrorCompat,\n    __T0: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.74.1/core/convert/trait.Into.html\" title=\"trait core::convert::Into\">Into</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.74.1/std/primitive.usize.html\">usize</a>&gt;,\n    __T1: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.74.1/core/convert/trait.Into.html\" title=\"trait core::convert::Into\">Into</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.74.1/alloc/string/struct.String.html\" title=\"struct alloc::string::String\">String</a>&gt;,</span>"]]
};if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()