(function() {var implementors = {
"hotshot_query_service":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;RequestError&gt; for <a class=\"enum\" href=\"hotshot_query_service/status/enum.Error.html\" title=\"enum hotshot_query_service::status::Error\">Error</a>"],["impl&lt;'a, Types, S&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;RwLockReadGuard&lt;'a, NotifyStorage&lt;Types, S&gt;&gt;&gt; for <a class=\"struct\" href=\"hotshot_query_service/data_source/fetching/struct.StorageReadGuard.html\" title=\"struct hotshot_query_service::data_source::fetching::StorageReadGuard\">StorageReadGuard</a>&lt;'a, Types, S&gt;<div class=\"where\">where\n    Types: NodeType,</div>"],["impl&lt;I, Iter: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/iter/traits/iterator/trait.Iterator.html\" title=\"trait core::iter::traits::iterator::Iterator\">Iterator</a>&lt;Item = I&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/iter/traits/double_ended/trait.DoubleEndedIterator.html\" title=\"trait core::iter::traits::double_ended::DoubleEndedIterator\">DoubleEndedIterator</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;Iter&gt; for <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.LTree.html\" title=\"struct hotshot_query_service::data_source::storage::sql::LTree\">LTree</a><div class=\"where\">where\n    I: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/fmt/trait.Display.html\" title=\"trait core::fmt::Display\">Display</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a>,</div>"],["impl&lt;Types: NodeType&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"struct\" href=\"hotshot_query_service/availability/struct.BlockQueryData.html\" title=\"struct hotshot_query_service::availability::BlockQueryData\">BlockQueryData</a>&lt;Types&gt;&gt; for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.BlockSummaryQueryData.html\" title=\"struct hotshot_query_service::availability::BlockSummaryQueryData\">BlockSummaryQueryData</a>&lt;Types&gt;<div class=\"where\">where\n    <a class=\"type\" href=\"hotshot_query_service/type.Payload.html\" title=\"type hotshot_query_service::Payload\">Payload</a>&lt;Types&gt;: <a class=\"trait\" href=\"hotshot_query_service/availability/trait.QueryablePayload.html\" title=\"trait hotshot_query_service::availability::QueryablePayload\">QueryablePayload</a>,</div>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;(<a class=\"struct\" href=\"https://doc.rust-lang.org/1.77.1/alloc/string/struct.String.html\" title=\"struct alloc::string::String\">String</a>, StatusCode)&gt; for <a class=\"enum\" href=\"hotshot_query_service/merklized_state/enum.Error.html\" title=\"enum hotshot_query_service::merklized_state::Error\">Error</a>"],["impl&lt;Types: NodeType&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;Commitment&lt;&lt;Types as NodeType&gt;::BlockHeader&gt;&gt; for <a class=\"enum\" href=\"hotshot_query_service/availability/enum.BlockId.html\" title=\"enum hotshot_query_service::availability::BlockId\">BlockId</a>&lt;Types&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;RequestError&gt; for <a class=\"enum\" href=\"hotshot_query_service/node/enum.Error.html\" title=\"enum hotshot_query_service::node::Error\">Error</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;Error&gt; for <a class=\"enum\" href=\"hotshot_query_service/metrics/enum.MetricsError.html\" title=\"enum hotshot_query_service::metrics::MetricsError\">MetricsError</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.77.1/alloc/string/struct.String.html\" title=\"struct alloc::string::String\">String</a>&gt; for <a class=\"enum\" href=\"hotshot_query_service/status/enum.Error.html\" title=\"enum hotshot_query_service::status::Error\">Error</a>"],["impl&lt;Types: NodeType&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"struct\" href=\"hotshot_query_service/availability/struct.BlockQueryData.html\" title=\"struct hotshot_query_service::availability::BlockQueryData\">BlockQueryData</a>&lt;Types&gt;&gt; for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.PayloadQueryData.html\" title=\"struct hotshot_query_service::availability::PayloadQueryData\">PayloadQueryData</a>&lt;Types&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.usize.html\">usize</a>&gt; for <a class=\"struct\" href=\"hotshot_query_service/fetching/request/struct.LeafRequest.html\" title=\"struct hotshot_query_service::fetching::request::LeafRequest\">LeafRequest</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"struct\" href=\"hotshot_query_service/fetching/request/struct.LeafRequest.html\" title=\"struct hotshot_query_service::fetching::request::LeafRequest\">LeafRequest</a>&gt; for <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.usize.html\">usize</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;RequestError&gt; for <a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>"],["impl&lt;Types: NodeType&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.usize.html\">usize</a>&gt; for <a class=\"enum\" href=\"hotshot_query_service/availability/enum.BlockId.html\" title=\"enum hotshot_query_service::availability::BlockId\">BlockId</a>&lt;Types&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"enum\" href=\"hotshot_query_service/merklized_state/enum.Error.html\" title=\"enum hotshot_query_service::merklized_state::Error\">Error</a>&gt; for <a class=\"enum\" href=\"hotshot_query_service/enum.Error.html\" title=\"enum hotshot_query_service::Error\">Error</a>"],["impl&lt;Types: NodeType&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;Commitment&lt;<a class=\"struct\" href=\"hotshot_query_service/struct.Leaf.html\" title=\"struct hotshot_query_service::Leaf\">Leaf</a>&lt;Types&gt;&gt;&gt; for <a class=\"enum\" href=\"hotshot_query_service/availability/enum.LeafId.html\" title=\"enum hotshot_query_service::availability::LeafId\">LeafId</a>&lt;Types&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>&gt; for <a class=\"enum\" href=\"hotshot_query_service/enum.Error.html\" title=\"enum hotshot_query_service::Error\">Error</a>"],["impl&lt;Types: NodeType&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;Commitment&lt;&lt;Types as NodeType&gt;::BlockHeader&gt;&gt; for <a class=\"enum\" href=\"hotshot_query_service/node/enum.WindowStart.html\" title=\"enum hotshot_query_service::node::WindowStart\">WindowStart</a>&lt;Types&gt;"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;(<a class=\"struct\" href=\"https://doc.rust-lang.org/1.77.1/alloc/string/struct.String.html\" title=\"struct alloc::string::String\">String</a>, StatusCode)&gt; for <a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"enum\" href=\"hotshot_query_service/status/enum.Error.html\" title=\"enum hotshot_query_service::status::Error\">Error</a>&gt; for <a class=\"enum\" href=\"hotshot_query_service/enum.Error.html\" title=\"enum hotshot_query_service::Error\">Error</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;RequestError&gt; for <a class=\"enum\" href=\"hotshot_query_service/merklized_state/enum.Error.html\" title=\"enum hotshot_query_service::merklized_state::Error\">Error</a>"],["impl&lt;Types: NodeType&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.usize.html\">usize</a>&gt; for <a class=\"enum\" href=\"hotshot_query_service/availability/enum.LeafId.html\" title=\"enum hotshot_query_service::availability::LeafId\">LeafId</a>&lt;Types&gt;"],["impl&lt;'a, Types, S&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;RwLockWriteGuard&lt;'a, NotifyStorage&lt;Types, S&gt;&gt;&gt; for <a class=\"struct\" href=\"hotshot_query_service/data_source/fetching/struct.StorageWriteGuard.html\" title=\"struct hotshot_query_service::data_source::fetching::StorageWriteGuard\">StorageWriteGuard</a>&lt;'a, Types, S&gt;<div class=\"where\">where\n    Types: NodeType,</div>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;Config&gt; for <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.Config.html\" title=\"struct hotshot_query_service::data_source::storage::sql::Config\">Config</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"enum\" href=\"hotshot_query_service/enum.QueryError.html\" title=\"enum hotshot_query_service::QueryError\">QueryError</a>&gt; for <a class=\"enum\" href=\"hotshot_query_service/merklized_state/enum.Error.html\" title=\"enum hotshot_query_service::merklized_state::Error\">Error</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;(<a class=\"struct\" href=\"https://doc.rust-lang.org/1.77.1/alloc/string/struct.String.html\" title=\"struct alloc::string::String\">String</a>, StatusCode)&gt; for <a class=\"enum\" href=\"hotshot_query_service/node/enum.Error.html\" title=\"enum hotshot_query_service::node::Error\">Error</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"enum\" href=\"hotshot_query_service/node/enum.Error.html\" title=\"enum hotshot_query_service::node::Error\">Error</a>&gt; for <a class=\"enum\" href=\"hotshot_query_service/enum.Error.html\" title=\"enum hotshot_query_service::Error\">Error</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;(<a class=\"struct\" href=\"https://doc.rust-lang.org/1.77.1/alloc/string/struct.String.html\" title=\"struct alloc::string::String\">String</a>, StatusCode)&gt; for <a class=\"enum\" href=\"hotshot_query_service/enum.Error.html\" title=\"enum hotshot_query_service::Error\">Error</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"enum\" href=\"hotshot_query_service/enum.QueryError.html\" title=\"enum hotshot_query_service::QueryError\">QueryError</a>&gt; for <a class=\"enum\" href=\"hotshot_query_service/node/enum.Error.html\" title=\"enum hotshot_query_service::node::Error\">Error</a>"]]
};if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()