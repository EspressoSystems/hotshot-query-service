(function() {
    var type_impls = Object.fromEntries([["hotshot_query_service",[["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Builder%3CTypes,+S,+P%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/fetching.rs.html#163-351\">source</a><a href=\"#impl-Builder%3CTypes,+S,+P%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;Types, S, P&gt; <a class=\"struct\" href=\"hotshot_query_service/data_source/fetching/struct.Builder.html\" title=\"struct hotshot_query_service::data_source::fetching::Builder\">Builder</a>&lt;Types, S, P&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.new\" class=\"method\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/fetching.rs.html#165-198\">source</a><h4 class=\"code-header\">pub fn <a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html#tymethod.new\" class=\"fn\">new</a>(storage: S, provider: P) -&gt; Self</h4></section></summary><div class=\"docblock\"><p>Construct a new builder with the given storage and fetcher and the default options.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.with_min_retry_interval\" class=\"method\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/fetching.rs.html#201-204\">source</a><h4 class=\"code-header\">pub fn <a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html#tymethod.with_min_retry_interval\" class=\"fn\">with_min_retry_interval</a>(self, interval: <a class=\"struct\" href=\"https://doc.rust-lang.org/1.82.0/core/time/struct.Duration.html\" title=\"struct core::time::Duration\">Duration</a>) -&gt; Self</h4></section></summary><div class=\"docblock\"><p>Set the minimum delay between retries of failed operations.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.with_max_retry_interval\" class=\"method\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/fetching.rs.html#207-210\">source</a><h4 class=\"code-header\">pub fn <a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html#tymethod.with_max_retry_interval\" class=\"fn\">with_max_retry_interval</a>(self, interval: <a class=\"struct\" href=\"https://doc.rust-lang.org/1.82.0/core/time/struct.Duration.html\" title=\"struct core::time::Duration\">Duration</a>) -&gt; Self</h4></section></summary><div class=\"docblock\"><p>Set the maximum delay between retries of failed operations.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.with_retry_multiplier\" class=\"method\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/fetching.rs.html#213-216\">source</a><h4 class=\"code-header\">pub fn <a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html#tymethod.with_retry_multiplier\" class=\"fn\">with_retry_multiplier</a>(self, multiplier: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.82.0/std/primitive.f64.html\">f64</a>) -&gt; Self</h4></section></summary><div class=\"docblock\"><p>Set the multiplier for exponential backoff when retrying failed requests.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.with_retry_randomization_factor\" class=\"method\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/fetching.rs.html#219-222\">source</a><h4 class=\"code-header\">pub fn <a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html#tymethod.with_retry_randomization_factor\" class=\"fn\">with_retry_randomization_factor</a>(self, factor: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.82.0/std/primitive.f64.html\">f64</a>) -&gt; Self</h4></section></summary><div class=\"docblock\"><p>Set the randomization factor for randomized backoff when retrying failed requests.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.with_retry_timeout\" class=\"method\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/fetching.rs.html#225-228\">source</a><h4 class=\"code-header\">pub fn <a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html#tymethod.with_retry_timeout\" class=\"fn\">with_retry_timeout</a>(self, timeout: <a class=\"struct\" href=\"https://doc.rust-lang.org/1.82.0/core/time/struct.Duration.html\" title=\"struct core::time::Duration\">Duration</a>) -&gt; Self</h4></section></summary><div class=\"docblock\"><p>Set the maximum time to retry failed operations before giving up.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.with_rate_limit\" class=\"method\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/fetching.rs.html#231-234\">source</a><h4 class=\"code-header\">pub fn <a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html#tymethod.with_rate_limit\" class=\"fn\">with_rate_limit</a>(self, with_rate_limit: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.82.0/std/primitive.usize.html\">usize</a>) -&gt; Self</h4></section></summary><div class=\"docblock\"><p>Set the maximum number of simultaneous fetches.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.with_range_chunk_size\" class=\"method\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/fetching.rs.html#242-245\">source</a><h4 class=\"code-header\">pub fn <a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html#tymethod.with_range_chunk_size\" class=\"fn\">with_range_chunk_size</a>(self, range_chunk_size: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.82.0/std/primitive.usize.html\">usize</a>) -&gt; Self</h4></section></summary><div class=\"docblock\"><p>Set the number of items to process at a time when loading a range or stream.</p>\n<p>This determines:</p>\n<ul>\n<li>The number of objects to load from storage in a single request</li>\n<li>The number of objects to buffer in memory per request/stream</li>\n<li>The number of concurrent notification subscriptions per request/stream</li>\n</ul>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.with_minor_scan_interval\" class=\"method\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/fetching.rs.html#250-253\">source</a><h4 class=\"code-header\">pub fn <a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html#tymethod.with_minor_scan_interval\" class=\"fn\">with_minor_scan_interval</a>(self, interval: <a class=\"struct\" href=\"https://doc.rust-lang.org/1.82.0/core/time/struct.Duration.html\" title=\"struct core::time::Duration\">Duration</a>) -&gt; Self</h4></section></summary><div class=\"docblock\"><p>Set the time interval between minor proactive fetching scans.</p>\n<p>See <a href=\"hotshot_query_service/data_source/fetching/index.html#proactive-fetching\" title=\"mod hotshot_query_service::data_source::fetching\">proactive fetching</a>.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.with_major_scan_interval\" class=\"method\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/fetching.rs.html#259-262\">source</a><h4 class=\"code-header\">pub fn <a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html#tymethod.with_major_scan_interval\" class=\"fn\">with_major_scan_interval</a>(self, interval: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.82.0/std/primitive.usize.html\">usize</a>) -&gt; Self</h4></section></summary><div class=\"docblock\"><p>Set the interval (denominated in <a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html#method.with_minor_scan_interval\" title=\"method hotshot_query_service::data_source::fetching::Builder::with_minor_scan_interval\">minor scans</a>) between\nmajor proactive fetching scans.</p>\n<p>See <a href=\"hotshot_query_service/data_source/fetching/index.html#proactive-fetching\" title=\"mod hotshot_query_service::data_source::fetching\">proactive fetching</a>.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.with_major_scan_offset\" class=\"method\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/fetching.rs.html#273-276\">source</a><h4 class=\"code-header\">pub fn <a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html#tymethod.with_major_scan_offset\" class=\"fn\">with_major_scan_offset</a>(self, offset: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.82.0/std/primitive.usize.html\">usize</a>) -&gt; Self</h4></section></summary><div class=\"docblock\"><p>Set the offset (denominated in <a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html#method.with_minor_scan_interval\" title=\"method hotshot_query_service::data_source::fetching::Builder::with_minor_scan_interval\">minor scans</a>) before the\nfirst major proactive fetching scan.</p>\n<p>This is useful when starting multiple nodes at the same time: major proactive scans can have\na measurable impact on the performance of the node for a brief time while the scan is\nrunning, so it may be desirable to prevent a group of nodes from all doing major scans at\nthe same time. This can be achieved by giving each node a different <code>major_scan_offset</code>.</p>\n<p>See also <a href=\"hotshot_query_service/data_source/fetching/index.html#proactive-fetching\" title=\"mod hotshot_query_service::data_source::fetching\">proactive fetching</a>.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.with_proactive_range_chunk_size\" class=\"method\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/fetching.rs.html#286-289\">source</a><h4 class=\"code-header\">pub fn <a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html#tymethod.with_proactive_range_chunk_size\" class=\"fn\">with_proactive_range_chunk_size</a>(self, range_chunk_size: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.82.0/std/primitive.usize.html\">usize</a>) -&gt; Self</h4></section></summary><div class=\"docblock\"><p>Set the number of items to process at a time when scanning for proactive fetching.</p>\n<p>This is similar to <a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html#method.with_range_chunk_size\" title=\"method hotshot_query_service::data_source::fetching::Builder::with_range_chunk_size\"><code>Self::with_range_chunk_size</code></a>, but only affects the chunk size for\nproactive fetching scans, not for normal subscription streams. This can be useful to tune\nthe proactive scanner to be more or less greedy with persistent storage resources.</p>\n<p>By default (i.e. if this method is not called) the proactive range chunk size will be set to\nwhatever the normal range chunk size is.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.with_active_fetch_delay\" class=\"method\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/fetching.rs.html#296-299\">source</a><h4 class=\"code-header\">pub fn <a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html#tymethod.with_active_fetch_delay\" class=\"fn\">with_active_fetch_delay</a>(self, active_fetch_delay: <a class=\"struct\" href=\"https://doc.rust-lang.org/1.82.0/core/time/struct.Duration.html\" title=\"struct core::time::Duration\">Duration</a>) -&gt; Self</h4></section></summary><div class=\"docblock\"><p>Add a delay between active fetches in proactive scans.</p>\n<p>This can be used to limit the rate at which this query service makes requests to other query\nservices during proactive scans. This is useful if the query service has a lot of blocks to\ncatch up on, as without a delay, scanning can be extremely burdensome on the peer.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.with_chunk_fetch_delay\" class=\"method\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/fetching.rs.html#312-315\">source</a><h4 class=\"code-header\">pub fn <a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html#tymethod.with_chunk_fetch_delay\" class=\"fn\">with_chunk_fetch_delay</a>(self, chunk_fetch_delay: <a class=\"struct\" href=\"https://doc.rust-lang.org/1.82.0/core/time/struct.Duration.html\" title=\"struct core::time::Duration\">Duration</a>) -&gt; Self</h4></section></summary><div class=\"docblock\"><p>Adds a delay between chunk fetches during proactive scans.</p>\n<p>In a proactive scan, we retrieve a range of objects from a provider or local storage (e.g., a database).\nWithout a delay between fetching these chunks, the process can become very CPU-intensive, especially\nwhen chunks are retrieved from local storage. While there is already a delay for active fetches\n(<code>active_fetch_delay</code>), situations may arise when subscribed to an old stream that fetches most of the data\nfrom local storage.</p>\n<p>This additional delay helps to limit constant maximum CPU usage\nand ensures that local storage remains accessible to all processes,\nnot just the proactive scanner.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.disable_proactive_fetching\" class=\"method\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/fetching.rs.html#325-328\">source</a><h4 class=\"code-header\">pub fn <a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html#tymethod.disable_proactive_fetching\" class=\"fn\">disable_proactive_fetching</a>(self) -&gt; Self</h4></section></summary><div class=\"docblock\"><p>Run without <a href=\"hotshot_query_service/data_source/fetching/index.html#proactive-fetching\" title=\"mod hotshot_query_service::data_source::fetching\">proactive fetching</a>.</p>\n<p>This can reduce load on the CPU and the database, but increases the probability that\nrequests will fail due to missing resources. If resources are constrained, it is recommended\nto run with rare proactive fetching (see\n<a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html#method.with_major_scan_interval\" title=\"method hotshot_query_service::data_source::fetching::Builder::with_major_scan_interval\"><code>with_major_scan_interval</code></a>,\n<a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html#method.with_minor_scan_interval\" title=\"method hotshot_query_service::data_source::fetching::Builder::with_minor_scan_interval\"><code>with_minor_scan_interval</code></a>), rather than disabling it\nentirely.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.disable_aggregator\" class=\"method\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/fetching.rs.html#334-337\">source</a><h4 class=\"code-header\">pub fn <a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html#tymethod.disable_aggregator\" class=\"fn\">disable_aggregator</a>(self) -&gt; Self</h4></section></summary><div class=\"docblock\"><p>Run without an aggregator.</p>\n<p>This can reduce load on the CPU and the database, but it will cause aggregate statistics\n(such as transaction counts) not to update.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.with_aggregator_chunk_size\" class=\"method\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/fetching.rs.html#347-350\">source</a><h4 class=\"code-header\">pub fn <a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html#tymethod.with_aggregator_chunk_size\" class=\"fn\">with_aggregator_chunk_size</a>(self, chunk_size: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.82.0/std/primitive.usize.html\">usize</a>) -&gt; Self</h4></section></summary><div class=\"docblock\"><p>Set the number of items to process at a time when computing aggregate statistics.</p>\n<p>This is similar to <a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html#method.with_range_chunk_size\" title=\"method hotshot_query_service::data_source::fetching::Builder::with_range_chunk_size\"><code>Self::with_range_chunk_size</code></a>, but only affects the chunk size for\nthe aggregator task, not for normal subscription streams. This can be useful to tune\nthe aggregator to be more or less greedy with persistent storage resources.</p>\n<p>By default (i.e. if this method is not called) the proactive range chunk size will be set to\nwhatever the normal range chunk size is.</p>\n</div></details></div></details>",0,"hotshot_query_service::data_source::sql::Builder"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Builder%3CTypes,+S,+P%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/fetching.rs.html#353-368\">source</a><a href=\"#impl-Builder%3CTypes,+S,+P%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;Types, S, P&gt; <a class=\"struct\" href=\"hotshot_query_service/data_source/fetching/struct.Builder.html\" title=\"struct hotshot_query_service::data_source::fetching::Builder\">Builder</a>&lt;Types, S, P&gt;<div class=\"where\">where\n    Types: NodeType,\n    <a class=\"type\" href=\"hotshot_query_service/type.Payload.html\" title=\"type hotshot_query_service::Payload\">Payload</a>&lt;Types&gt;: <a class=\"trait\" href=\"hotshot_query_service/availability/trait.QueryablePayload.html\" title=\"trait hotshot_query_service::availability::QueryablePayload\">QueryablePayload</a>&lt;Types&gt;,\n    <a class=\"type\" href=\"hotshot_query_service/type.Header.html\" title=\"type hotshot_query_service::Header\">Header</a>&lt;Types&gt;: <a class=\"trait\" href=\"hotshot_query_service/availability/trait.QueryableHeader.html\" title=\"trait hotshot_query_service::availability::QueryableHeader\">QueryableHeader</a>&lt;Types&gt;,\n    S: <a class=\"trait\" href=\"hotshot_query_service/data_source/storage/pruning/trait.PruneStorage.html\" title=\"trait hotshot_query_service::data_source::storage::pruning::PruneStorage\">PruneStorage</a> + <a class=\"trait\" href=\"hotshot_query_service/data_source/trait.VersionedDataSource.html\" title=\"trait hotshot_query_service::data_source::VersionedDataSource\">VersionedDataSource</a> + <a class=\"trait\" href=\"hotshot_query_service/status/trait.HasMetrics.html\" title=\"trait hotshot_query_service::status::HasMetrics\">HasMetrics</a> + 'static,\n    for&lt;'a&gt; S::<a class=\"associatedtype\" href=\"hotshot_query_service/data_source/trait.VersionedDataSource.html#associatedtype.ReadOnly\" title=\"type hotshot_query_service::data_source::VersionedDataSource::ReadOnly\">ReadOnly</a>&lt;'a&gt;: <a class=\"trait\" href=\"hotshot_query_service/data_source/storage/trait.AvailabilityStorage.html\" title=\"trait hotshot_query_service::data_source::storage::AvailabilityStorage\">AvailabilityStorage</a>&lt;Types&gt; + <a class=\"trait\" href=\"hotshot_query_service/data_source/storage/pruning/trait.PrunedHeightStorage.html\" title=\"trait hotshot_query_service::data_source::storage::pruning::PrunedHeightStorage\">PrunedHeightStorage</a> + <a class=\"trait\" href=\"hotshot_query_service/data_source/storage/trait.NodeStorage.html\" title=\"trait hotshot_query_service::data_source::storage::NodeStorage\">NodeStorage</a>&lt;Types&gt; + <a class=\"trait\" href=\"hotshot_query_service/data_source/storage/trait.AggregatesStorage.html\" title=\"trait hotshot_query_service::data_source::storage::AggregatesStorage\">AggregatesStorage</a>,\n    for&lt;'a&gt; S::<a class=\"associatedtype\" href=\"hotshot_query_service/data_source/trait.VersionedDataSource.html#associatedtype.Transaction\" title=\"type hotshot_query_service::data_source::VersionedDataSource::Transaction\">Transaction</a>&lt;'a&gt;: <a class=\"trait\" href=\"hotshot_query_service/data_source/storage/trait.UpdateAvailabilityStorage.html\" title=\"trait hotshot_query_service::data_source::storage::UpdateAvailabilityStorage\">UpdateAvailabilityStorage</a>&lt;Types&gt; + <a class=\"trait\" href=\"hotshot_query_service/data_source/storage/trait.UpdateAggregatesStorage.html\" title=\"trait hotshot_query_service::data_source::storage::UpdateAggregatesStorage\">UpdateAggregatesStorage</a>&lt;Types&gt;,\n    P: <a class=\"trait\" href=\"hotshot_query_service/data_source/fetching/trait.AvailabilityProvider.html\" title=\"trait hotshot_query_service::data_source::fetching::AvailabilityProvider\">AvailabilityProvider</a>&lt;Types&gt;,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.build\" class=\"method\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/fetching.rs.html#365-367\">source</a><h4 class=\"code-header\">pub async fn <a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html#tymethod.build\" class=\"fn\">build</a>(self) -&gt; <a class=\"type\" href=\"https://docs.rs/anyhow/1.0.93/anyhow/type.Result.html\" title=\"type anyhow::Result\">Result</a>&lt;<a class=\"struct\" href=\"hotshot_query_service/data_source/fetching/struct.FetchingDataSource.html\" title=\"struct hotshot_query_service::data_source::fetching::FetchingDataSource\">FetchingDataSource</a>&lt;Types, S, P&gt;&gt;</h4></section></summary><div class=\"docblock\"><p>Build a <a href=\"hotshot_query_service/data_source/fetching/struct.FetchingDataSource.html\" title=\"struct hotshot_query_service::data_source::fetching::FetchingDataSource\"><code>FetchingDataSource</code></a> with these options.</p>\n</div></details></div></details>",0,"hotshot_query_service::data_source::sql::Builder"]]]]);
    if (window.register_type_impls) {
        window.register_type_impls(type_impls);
    } else {
        window.pending_type_impls = type_impls;
    }
})()
//{"start":55,"fragment_lengths":[21952]}