(function() {var implementors = {
"hotshot_query_service":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> for <a class=\"enum\" href=\"hotshot_query_service/status/enum.Error.html\" title=\"enum hotshot_query_service::status::Error\">Error</a>"],["impl&lt;Types: NodeType, I: NodeImplementation&lt;Types&gt;, UserData&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> for <a class=\"struct\" href=\"hotshot_query_service/data_source/struct.QueryData.html\" title=\"struct hotshot_query_service::data_source::QueryData\">QueryData</a>&lt;Types, I, UserData&gt;<span class=\"where fmt-newline\">where\n    <a class=\"struct\" href=\"https://doc.rust-lang.org/1.70.0/std/collections/hash/map/struct.HashMap.html\" title=\"struct std::collections::hash::map::HashMap\">HashMap</a>&lt;<a class=\"type\" href=\"hotshot_query_service/availability/type.LeafHash.html\" title=\"type hotshot_query_service::availability::LeafHash\">LeafHash</a>&lt;Types, I&gt;, <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.70.0/std/primitive.u64.html\">u64</a>&gt;: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a>,\n    <a class=\"struct\" href=\"https://doc.rust-lang.org/1.70.0/std/collections/hash/map/struct.HashMap.html\" title=\"struct std::collections::hash::map::HashMap\">HashMap</a>&lt;<a class=\"type\" href=\"hotshot_query_service/availability/type.BlockHash.html\" title=\"type hotshot_query_service::availability::BlockHash\">BlockHash</a>&lt;Types&gt;, <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.70.0/std/primitive.u64.html\">u64</a>&gt;: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a>,\n    <a class=\"struct\" href=\"https://doc.rust-lang.org/1.70.0/std/collections/hash/map/struct.HashMap.html\" title=\"struct std::collections::hash::map::HashMap\">HashMap</a>&lt;<a class=\"type\" href=\"hotshot_query_service/availability/type.TransactionHash.html\" title=\"type hotshot_query_service::availability::TransactionHash\">TransactionHash</a>&lt;Types&gt;, (<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.70.0/std/primitive.u64.html\">u64</a>, <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.70.0/std/primitive.u64.html\">u64</a>)&gt;: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a>,\n    LedgerLog&lt;<a class=\"struct\" href=\"hotshot_query_service/availability/struct.LeafQueryData.html\" title=\"struct hotshot_query_service::availability::LeafQueryData\">LeafQueryData</a>&lt;Types, I&gt;&gt;: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a>,\n    LedgerLog&lt;<a class=\"struct\" href=\"hotshot_query_service/availability/struct.BlockQueryData.html\" title=\"struct hotshot_query_service::availability::BlockQueryData\">BlockQueryData</a>&lt;Types&gt;&gt;: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a>,\n    UserData: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a>,</span>"],["impl&lt;Types: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> + NodeType, I: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> + NodeImplementation&lt;Types&gt;&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> for <a class=\"enum\" href=\"hotshot_query_service/availability/enum.InconsistentBlockError.html\" title=\"enum hotshot_query_service::availability::InconsistentBlockError\">InconsistentBlockError</a>&lt;Types, I&gt;<span class=\"where fmt-newline\">where\n    <a class=\"type\" href=\"hotshot_query_service/type.Deltas.html\" title=\"type hotshot_query_service::Deltas\">Deltas</a>&lt;Types, I&gt;: <a class=\"trait\" href=\"hotshot_query_service/trait.Resolvable.html\" title=\"trait hotshot_query_service::Resolvable\">Resolvable</a>&lt;<a class=\"type\" href=\"hotshot_query_service/type.Block.html\" title=\"type hotshot_query_service::Block\">Block</a>&lt;Types&gt;&gt;,\n    <a class=\"type\" href=\"hotshot_query_service/type.Block.html\" title=\"type hotshot_query_service::Block\">Block</a>&lt;Types&gt;: <a class=\"trait\" href=\"https://docs.rs/serde/1.0.160/serde/ser/trait.Serialize.html\" title=\"trait serde::ser::Serialize\">Serialize</a>,</span>"],["impl&lt;Types: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> + NodeType&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.BlockQueryData.html\" title=\"struct hotshot_query_service::availability::BlockQueryData\">BlockQueryData</a>&lt;Types&gt;"],["impl&lt;Types: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> + NodeType, I: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> + NodeImplementation&lt;Types&gt;&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.InconsistentLeafError.html\" title=\"struct hotshot_query_service::availability::InconsistentLeafError\">InconsistentLeafError</a>&lt;Types, I&gt;"],["impl&lt;Types: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> + NodeType, I: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> + NodeImplementation&lt;Types&gt;&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.LeafQueryData.html\" title=\"struct hotshot_query_service::availability::LeafQueryData\">LeafQueryData</a>&lt;Types, I&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> for <a class=\"struct\" href=\"hotshot_query_service/status/struct.MempoolQueryData.html\" title=\"struct hotshot_query_service::status::MempoolQueryData\">MempoolQueryData</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> for <a class=\"struct\" href=\"hotshot_query_service/data_source/struct.StreamError.html\" title=\"struct hotshot_query_service::data_source::StreamError\">StreamError</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> for <a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>"],["impl&lt;Types: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> + NodeType&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.TransactionQueryData.html\" title=\"struct hotshot_query_service::availability::TransactionQueryData\">TransactionQueryData</a>&lt;Types&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> for <a class=\"enum\" href=\"hotshot_query_service/enum.Error.html\" title=\"enum hotshot_query_service::Error\">Error</a>"]]
};if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()