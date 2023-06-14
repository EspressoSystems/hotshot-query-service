(function() {var implementors = {
"hotshot_query_service":[["impl&lt;Types, I&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.LeafQueryData.html\" title=\"struct hotshot_query_service::availability::LeafQueryData\">LeafQueryData</a>&lt;Types, I&gt;<span class=\"where fmt-newline\">where\n    &lt;I as NodeImplementation&lt;Types&gt;&gt;::Leaf: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/panic/unwind_safe/trait.RefUnwindSafe.html\" title=\"trait core::panic::unwind_safe::RefUnwindSafe\">RefUnwindSafe</a>,\n    &lt;Types as NodeType&gt;::Time: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a>,\n    &lt;Types as NodeType&gt;::VoteTokenType: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/panic/unwind_safe/trait.RefUnwindSafe.html\" title=\"trait core::panic::unwind_safe::RefUnwindSafe\">RefUnwindSafe</a>,</span>",1,["hotshot_query_service::availability::query_data::LeafQueryData"]],["impl&lt;Types, I&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.InconsistentLeafError.html\" title=\"struct hotshot_query_service::availability::InconsistentLeafError\">InconsistentLeafError</a>&lt;Types, I&gt;<span class=\"where fmt-newline\">where\n    &lt;I as NodeImplementation&lt;Types&gt;&gt;::Leaf: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/panic/unwind_safe/trait.RefUnwindSafe.html\" title=\"trait core::panic::unwind_safe::RefUnwindSafe\">RefUnwindSafe</a>,\n    &lt;Types as NodeType&gt;::Time: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a>,\n    &lt;Types as NodeType&gt;::VoteTokenType: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/panic/unwind_safe/trait.RefUnwindSafe.html\" title=\"trait core::panic::unwind_safe::RefUnwindSafe\">RefUnwindSafe</a>,</span>",1,["hotshot_query_service::availability::query_data::InconsistentLeafError"]],["impl&lt;Types&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.BlockQueryData.html\" title=\"struct hotshot_query_service::availability::BlockQueryData\">BlockQueryData</a>&lt;Types&gt;<span class=\"where fmt-newline\">where\n    &lt;Types as NodeType&gt;::BlockType: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a>,</span>",1,["hotshot_query_service::availability::query_data::BlockQueryData"]],["impl&lt;Types, I&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> for <a class=\"enum\" href=\"hotshot_query_service/availability/enum.InconsistentBlockError.html\" title=\"enum hotshot_query_service::availability::InconsistentBlockError\">InconsistentBlockError</a>&lt;Types, I&gt;<span class=\"where fmt-newline\">where\n    &lt;Types as NodeType&gt;::BlockType: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a>,\n    &lt;I as NodeImplementation&lt;Types&gt;&gt;::Leaf: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/panic/unwind_safe/trait.RefUnwindSafe.html\" title=\"trait core::panic::unwind_safe::RefUnwindSafe\">RefUnwindSafe</a>,\n    &lt;Types as NodeType&gt;::Time: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a>,\n    &lt;Types as NodeType&gt;::VoteTokenType: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/panic/unwind_safe/trait.RefUnwindSafe.html\" title=\"trait core::panic::unwind_safe::RefUnwindSafe\">RefUnwindSafe</a>,</span>",1,["hotshot_query_service::availability::query_data::InconsistentBlockError"]],["impl&lt;Types&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.TransactionQueryData.html\" title=\"struct hotshot_query_service::availability::TransactionQueryData\">TransactionQueryData</a>&lt;Types&gt;<span class=\"where fmt-newline\">where\n    &lt;Types as NodeType&gt;::BlockType: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a>,\n    &lt;&lt;Types as NodeType&gt;::BlockType as <a class=\"trait\" href=\"hotshot_query_service/availability/trait.QueryableBlock.html\" title=\"trait hotshot_query_service::availability::QueryableBlock\">QueryableBlock</a>&gt;::<a class=\"associatedtype\" href=\"hotshot_query_service/availability/trait.QueryableBlock.html#associatedtype.InclusionProof\" title=\"type hotshot_query_service::availability::QueryableBlock::InclusionProof\">InclusionProof</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a>,\n    &lt;Types as NodeType&gt;::Transaction: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a>,</span>",1,["hotshot_query_service::availability::query_data::TransactionQueryData"]],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> for <a class=\"struct\" href=\"hotshot_query_service/availability/struct.Options.html\" title=\"struct hotshot_query_service::availability::Options\">Options</a>",1,["hotshot_query_service::availability::Options"]],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> for <a class=\"enum\" href=\"hotshot_query_service/availability/enum.Error.html\" title=\"enum hotshot_query_service::availability::Error\">Error</a>",1,["hotshot_query_service::availability::Error"]],["impl&lt;'a, T&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> for <a class=\"struct\" href=\"hotshot_query_service/data_source/struct.Iter.html\" title=\"struct hotshot_query_service::data_source::Iter\">Iter</a>&lt;'a, T&gt;<span class=\"where fmt-newline\">where\n    T: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/panic/unwind_safe/trait.RefUnwindSafe.html\" title=\"trait core::panic::unwind_safe::RefUnwindSafe\">RefUnwindSafe</a>,</span>",1,["hotshot_query_service::ledger_log::Iter"]],["impl&lt;Types, I, UserData&gt; !<a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> for <a class=\"struct\" href=\"hotshot_query_service/data_source/struct.QueryData.html\" title=\"struct hotshot_query_service::data_source::QueryData\">QueryData</a>&lt;Types, I, UserData&gt;",1,["hotshot_query_service::data_source::QueryData"]],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> for <a class=\"struct\" href=\"hotshot_query_service/data_source/struct.StreamError.html\" title=\"struct hotshot_query_service::data_source::StreamError\">StreamError</a>",1,["hotshot_query_service::data_source::StreamError"]],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> for <a class=\"enum\" href=\"hotshot_query_service/enum.Error.html\" title=\"enum hotshot_query_service::Error\">Error</a>",1,["hotshot_query_service::error::Error"]],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> for <a class=\"struct\" href=\"hotshot_query_service/status/struct.MempoolQueryData.html\" title=\"struct hotshot_query_service::status::MempoolQueryData\">MempoolQueryData</a>",1,["hotshot_query_service::status::query_data::MempoolQueryData"]],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> for <a class=\"struct\" href=\"hotshot_query_service/status/struct.Options.html\" title=\"struct hotshot_query_service::status::Options\">Options</a>",1,["hotshot_query_service::status::Options"]],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> for <a class=\"enum\" href=\"hotshot_query_service/status/enum.Error.html\" title=\"enum hotshot_query_service::status::Error\">Error</a>",1,["hotshot_query_service::status::Error"]],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.70.0/core/panic/unwind_safe/trait.UnwindSafe.html\" title=\"trait core::panic::unwind_safe::UnwindSafe\">UnwindSafe</a> for <a class=\"struct\" href=\"hotshot_query_service/struct.Options.html\" title=\"struct hotshot_query_service::Options\">Options</a>",1,["hotshot_query_service::Options"]]]
};if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()