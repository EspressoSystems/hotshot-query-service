(function() {var type_impls = {
"hotshot_query_service":[["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Builder%3CTypes,+S,+P%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/fetching.rs.html#130-211\">source</a><a href=\"#impl-Builder%3CTypes,+S,+P%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;Types, S, P&gt; <a class=\"struct\" href=\"hotshot_query_service/data_source/fetching/struct.Builder.html\" title=\"struct hotshot_query_service::data_source::fetching::Builder\">Builder</a>&lt;Types, S, P&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.new\" class=\"method\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/fetching.rs.html#132-150\">source</a><h4 class=\"code-header\">pub fn <a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html#tymethod.new\" class=\"fn\">new</a>(storage: S, provider: P) -&gt; Self</h4></section></summary><div class=\"docblock\"><p>Construct a new builder with the given storage and fetcher and the default options.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.with_retry_delay\" class=\"method\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/fetching.rs.html#153-156\">source</a><h4 class=\"code-header\">pub fn <a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html#tymethod.with_retry_delay\" class=\"fn\">with_retry_delay</a>(self, retry_delay: <a class=\"struct\" href=\"https://doc.rust-lang.org/1.76.0/core/time/struct.Duration.html\" title=\"struct core::time::Duration\">Duration</a>) -&gt; Self</h4></section></summary><div class=\"docblock\"><p>Set the maximum delay between retries of fetches.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.with_range_chunk_size\" class=\"method\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/fetching.rs.html#164-167\">source</a><h4 class=\"code-header\">pub fn <a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html#tymethod.with_range_chunk_size\" class=\"fn\">with_range_chunk_size</a>(self, range_chunk_size: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.76.0/std/primitive.usize.html\">usize</a>) -&gt; Self</h4></section></summary><div class=\"docblock\"><p>Set the number of items to process at a time when loading a range or stream.</p>\n<p>This determines:</p>\n<ul>\n<li>The number of objects to load from storage in a single request</li>\n<li>The number of objects to buffer in memory per request/stream</li>\n<li>The number of concurrent notification subscriptions per request/stream</li>\n</ul>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.with_minor_scan_interval\" class=\"method\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/fetching.rs.html#172-175\">source</a><h4 class=\"code-header\">pub fn <a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html#tymethod.with_minor_scan_interval\" class=\"fn\">with_minor_scan_interval</a>(self, interval: <a class=\"struct\" href=\"https://doc.rust-lang.org/1.76.0/core/time/struct.Duration.html\" title=\"struct core::time::Duration\">Duration</a>) -&gt; Self</h4></section></summary><div class=\"docblock\"><p>Set the time interval between minor proactive fetching scans.</p>\n<p>See <a href=\"hotshot_query_service/data_source/fetching/index.html#proactive-fetching\" title=\"mod hotshot_query_service::data_source::fetching\">proactive fetching</a>.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.with_major_scan_interval\" class=\"method\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/fetching.rs.html#181-184\">source</a><h4 class=\"code-header\">pub fn <a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html#tymethod.with_major_scan_interval\" class=\"fn\">with_major_scan_interval</a>(self, interval: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.76.0/std/primitive.usize.html\">usize</a>) -&gt; Self</h4></section></summary><div class=\"docblock\"><p>Set the interval (denominated in <a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html#method.with_minor_scan_interval\" title=\"method hotshot_query_service::data_source::fetching::Builder::with_minor_scan_interval\">minor scans</a>) between\nmajor proactive fetching scans.</p>\n<p>See <a href=\"hotshot_query_service/data_source/fetching/index.html#proactive-fetching\" title=\"mod hotshot_query_service::data_source::fetching\">proactive fetching</a>.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.with_proactive_range_chunk_size\" class=\"method\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/fetching.rs.html#194-197\">source</a><h4 class=\"code-header\">pub fn <a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html#tymethod.with_proactive_range_chunk_size\" class=\"fn\">with_proactive_range_chunk_size</a>(self, range_chunk_size: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.76.0/std/primitive.usize.html\">usize</a>) -&gt; Self</h4></section></summary><div class=\"docblock\"><p>Set the number of items to process at a time when scanning for proactive fetching.</p>\n<p>This is similar to <a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html#method.with_range_chunk_size\" title=\"method hotshot_query_service::data_source::fetching::Builder::with_range_chunk_size\"><code>Self::with_range_chunk_size</code></a>, but only affects the chunk size for\nproactive fetching scans, not for normal subscription streams. This can be useful to tune\nthe proactive scanner to be more or less greedy with the lock on persistent storage.</p>\n<p>By default (i.e. if this method is not called) the proactive range chunk size will be set to\nwhatever the normal range chunk size is.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.disable_proactive_fetching\" class=\"method\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/fetching.rs.html#207-210\">source</a><h4 class=\"code-header\">pub fn <a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html#tymethod.disable_proactive_fetching\" class=\"fn\">disable_proactive_fetching</a>(self) -&gt; Self</h4></section></summary><div class=\"docblock\"><p>Run without <a href=\"hotshot_query_service/data_source/fetching/index.html#proactive-fetching\" title=\"mod hotshot_query_service::data_source::fetching\">proactive fetching</a>.</p>\n<p>This can reduce load on the CPU and the database, but increases the probability that\nrequests will fail due to missing resources. If resources are constrained, it is recommended\nto run with rare proactive fetching (see\n<a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html#method.with_major_scan_interval\" title=\"method hotshot_query_service::data_source::fetching::Builder::with_major_scan_interval\"><code>with_major_scan_interval</code></a>,\n<a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html#method.with_minor_scan_interval\" title=\"method hotshot_query_service::data_source::fetching::Builder::with_minor_scan_interval\"><code>with_minor_scan_interval</code></a>), rather than disabling it\nentirely.</p>\n</div></details></div></details>",0,"hotshot_query_service::data_source::sql::Builder"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Builder%3CTypes,+S,+P%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/fetching.rs.html#213-224\">source</a><a href=\"#impl-Builder%3CTypes,+S,+P%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;Types, S, P&gt; <a class=\"struct\" href=\"hotshot_query_service/data_source/fetching/struct.Builder.html\" title=\"struct hotshot_query_service::data_source::fetching::Builder\">Builder</a>&lt;Types, S, P&gt;<div class=\"where\">where\n    Types: NodeType,\n    <a class=\"type\" href=\"hotshot_query_service/type.Payload.html\" title=\"type hotshot_query_service::Payload\">Payload</a>&lt;Types&gt;: <a class=\"trait\" href=\"hotshot_query_service/availability/trait.QueryablePayload.html\" title=\"trait hotshot_query_service::availability::QueryablePayload\">QueryablePayload</a>,\n    S: <a class=\"trait\" href=\"hotshot_query_service/node/trait.NodeDataSource.html\" title=\"trait hotshot_query_service::node::NodeDataSource\">NodeDataSource</a>&lt;Types&gt; + <a class=\"trait\" href=\"hotshot_query_service/data_source/storage/trait.AvailabilityStorage.html\" title=\"trait hotshot_query_service::data_source::storage::AvailabilityStorage\">AvailabilityStorage</a>&lt;Types&gt; + 'static,\n    P: <a class=\"trait\" href=\"hotshot_query_service/data_source/fetching/trait.AvailabilityProvider.html\" title=\"trait hotshot_query_service::data_source::fetching::AvailabilityProvider\">AvailabilityProvider</a>&lt;Types&gt;,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.build\" class=\"method\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/fetching.rs.html#221-223\">source</a><h4 class=\"code-header\">pub async fn <a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html#tymethod.build\" class=\"fn\">build</a>(self) -&gt; <a class=\"type\" href=\"https://docs.rs/anyhow/1.0.80/anyhow/type.Result.html\" title=\"type anyhow::Result\">Result</a>&lt;<a class=\"struct\" href=\"hotshot_query_service/data_source/fetching/struct.FetchingDataSource.html\" title=\"struct hotshot_query_service::data_source::fetching::FetchingDataSource\">FetchingDataSource</a>&lt;Types, S, P&gt;&gt;</h4></section></summary><div class=\"docblock\"><p>Build a <a href=\"hotshot_query_service/data_source/fetching/struct.FetchingDataSource.html\" title=\"struct hotshot_query_service::data_source::fetching::FetchingDataSource\"><code>FetchingDataSource</code></a> with these options.</p>\n</div></details></div></details>",0,"hotshot_query_service::data_source::sql::Builder"]]
};if (window.register_type_impls) {window.register_type_impls(type_impls);} else {window.pending_type_impls = type_impls;}})()