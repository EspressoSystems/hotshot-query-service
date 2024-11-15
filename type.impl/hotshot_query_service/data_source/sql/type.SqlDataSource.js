(function() {
    var type_impls = Object.fromEntries([["hotshot_query_service",[["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-DataSourceLifeCycle-for-FetchingDataSource%3CMockTypes,+SqlStorage,+P%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/sql.rs.html#317-342\">source</a><a href=\"#impl-DataSourceLifeCycle-for-FetchingDataSource%3CMockTypes,+SqlStorage,+P%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;P: <a class=\"trait\" href=\"hotshot_query_service/data_source/fetching/trait.AvailabilityProvider.html\" title=\"trait hotshot_query_service::data_source::fetching::AvailabilityProvider\">AvailabilityProvider</a>&lt;<a class=\"struct\" href=\"hotshot_query_service/testing/mocks/struct.MockTypes.html\" title=\"struct hotshot_query_service::testing::mocks::MockTypes\">MockTypes</a>&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.82.0/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a>&gt; <a class=\"trait\" href=\"hotshot_query_service/testing/consensus/trait.DataSourceLifeCycle.html\" title=\"trait hotshot_query_service::testing::consensus::DataSourceLifeCycle\">DataSourceLifeCycle</a> for <a class=\"type\" href=\"hotshot_query_service/data_source/sql/type.SqlDataSource.html\" title=\"type hotshot_query_service::data_source::sql::SqlDataSource\">SqlDataSource</a>&lt;<a class=\"struct\" href=\"hotshot_query_service/testing/mocks/struct.MockTypes.html\" title=\"struct hotshot_query_service::testing::mocks::MockTypes\">MockTypes</a>, P&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle\" open><summary><section id=\"associatedtype.Storage\" class=\"associatedtype trait-impl\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/sql.rs.html#320\">source</a><a href=\"#associatedtype.Storage\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a href=\"hotshot_query_service/testing/consensus/trait.DataSourceLifeCycle.html#associatedtype.Storage\" class=\"associatedtype\">Storage</a> = <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/testing/struct.TmpDb.html\" title=\"struct hotshot_query_service::data_source::storage::sql::testing::TmpDb\">TmpDb</a></h4></section></summary><div class='docblock'>Backing storage for the data source. <a href=\"hotshot_query_service/testing/consensus/trait.DataSourceLifeCycle.html#associatedtype.Storage\">Read more</a></div></details><section id=\"method.create\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/sql.rs.html#322-324\">source</a><a href=\"#method.create\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"hotshot_query_service/testing/consensus/trait.DataSourceLifeCycle.html#tymethod.create\" class=\"fn\">create</a>&lt;'async_trait&gt;(\n    _node_id: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.82.0/std/primitive.usize.html\">usize</a>,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.82.0/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.82.0/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.82.0/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = Self::<a class=\"associatedtype\" href=\"hotshot_query_service/testing/consensus/trait.DataSourceLifeCycle.html#associatedtype.Storage\" title=\"type hotshot_query_service::testing::consensus::DataSourceLifeCycle::Storage\">Storage</a>&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.82.0/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'async_trait&gt;&gt;<div class=\"where\">where\n    Self: 'async_trait,</div></h4></section><section id=\"method.connect\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/sql.rs.html#326-328\">source</a><a href=\"#method.connect\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"hotshot_query_service/testing/consensus/trait.DataSourceLifeCycle.html#tymethod.connect\" class=\"fn\">connect</a>&lt;'life0, 'async_trait&gt;(\n    tmp_db: &amp;'life0 Self::<a class=\"associatedtype\" href=\"hotshot_query_service/testing/consensus/trait.DataSourceLifeCycle.html#associatedtype.Storage\" title=\"type hotshot_query_service::testing::consensus::DataSourceLifeCycle::Storage\">Storage</a>,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.82.0/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.82.0/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.82.0/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = Self&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.82.0/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'async_trait&gt;&gt;<div class=\"where\">where\n    Self: 'async_trait,\n    'life0: 'async_trait,</div></h4></section><section id=\"method.reset\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/sql.rs.html#330-337\">source</a><a href=\"#method.reset\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"hotshot_query_service/testing/consensus/trait.DataSourceLifeCycle.html#tymethod.reset\" class=\"fn\">reset</a>&lt;'life0, 'async_trait&gt;(\n    tmp_db: &amp;'life0 Self::<a class=\"associatedtype\" href=\"hotshot_query_service/testing/consensus/trait.DataSourceLifeCycle.html#associatedtype.Storage\" title=\"type hotshot_query_service::testing::consensus::DataSourceLifeCycle::Storage\">Storage</a>,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.82.0/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.82.0/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.82.0/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = Self&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.82.0/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'async_trait&gt;&gt;<div class=\"where\">where\n    Self: 'async_trait,\n    'life0: 'async_trait,</div></h4></section><section id=\"method.handle_event\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/sql.rs.html#339-341\">source</a><a href=\"#method.handle_event\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"hotshot_query_service/testing/consensus/trait.DataSourceLifeCycle.html#tymethod.handle_event\" class=\"fn\">handle_event</a>&lt;'life0, 'life1, 'async_trait&gt;(\n    &amp;'life0 self,\n    event: &amp;'life1 Event&lt;<a class=\"struct\" href=\"hotshot_query_service/testing/mocks/struct.MockTypes.html\" title=\"struct hotshot_query_service::testing::mocks::MockTypes\">MockTypes</a>&gt;,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.82.0/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.82.0/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.82.0/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.82.0/std/primitive.unit.html\">()</a>&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.82.0/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'async_trait&gt;&gt;<div class=\"where\">where\n    Self: 'async_trait,\n    'life0: 'async_trait,\n    'life1: 'async_trait,</div></h4></section><details class=\"toggle method-toggle\" open><summary><section id=\"method.setup\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/hotshot_query_service/testing/consensus.rs.html#329\">source</a><a href=\"#method.setup\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"hotshot_query_service/testing/consensus/trait.DataSourceLifeCycle.html#method.setup\" class=\"fn\">setup</a>&lt;'life0, 'async_trait&gt;(\n    _network: &amp;'life0 mut <a class=\"struct\" href=\"hotshot_query_service/testing/consensus/struct.MockNetwork.html\" title=\"struct hotshot_query_service::testing::consensus::MockNetwork\">MockNetwork</a>&lt;Self&gt;,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.82.0/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.82.0/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.82.0/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.82.0/std/primitive.unit.html\">()</a>&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.82.0/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'async_trait&gt;&gt;<div class=\"where\">where\n    Self: 'async_trait,\n    'life0: 'async_trait,</div></h4></section></summary><div class='docblock'>Setup runs after setting up the network but before starting a test.</div></details></div></details>","DataSourceLifeCycle","hotshot_query_service::testing::consensus::MockSqlDataSource"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-FetchingDataSource%3CTypes,+SqlStorage,+P%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/sql.rs.html#286-301\">source</a><a href=\"#impl-FetchingDataSource%3CTypes,+SqlStorage,+P%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;Types, P: <a class=\"trait\" href=\"hotshot_query_service/data_source/fetching/trait.AvailabilityProvider.html\" title=\"trait hotshot_query_service::data_source::fetching::AvailabilityProvider\">AvailabilityProvider</a>&lt;Types&gt;&gt; <a class=\"type\" href=\"hotshot_query_service/data_source/sql/type.SqlDataSource.html\" title=\"type hotshot_query_service::data_source::sql::SqlDataSource\">SqlDataSource</a>&lt;Types, P&gt;<div class=\"where\">where\n    Types: NodeType,\n    <a class=\"type\" href=\"hotshot_query_service/type.Header.html\" title=\"type hotshot_query_service::Header\">Header</a>&lt;Types&gt;: <a class=\"trait\" href=\"hotshot_query_service/availability/trait.QueryableHeader.html\" title=\"trait hotshot_query_service::availability::QueryableHeader\">QueryableHeader</a>&lt;Types&gt;,\n    <a class=\"type\" href=\"hotshot_query_service/type.Payload.html\" title=\"type hotshot_query_service::Payload\">Payload</a>&lt;Types&gt;: <a class=\"trait\" href=\"hotshot_query_service/availability/trait.QueryablePayload.html\" title=\"trait hotshot_query_service::availability::QueryablePayload\">QueryablePayload</a>&lt;Types&gt;,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.connect\" class=\"method\"><a class=\"src rightside\" href=\"src/hotshot_query_service/data_source/sql.rs.html#298-300\">source</a><h4 class=\"code-header\">pub async fn <a href=\"hotshot_query_service/data_source/sql/type.SqlDataSource.html#tymethod.connect\" class=\"fn\">connect</a>(\n    config: <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.Config.html\" title=\"struct hotshot_query_service::data_source::storage::sql::Config\">Config</a>,\n    provider: P,\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.82.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"type\" href=\"hotshot_query_service/data_source/sql/type.Builder.html\" title=\"type hotshot_query_service::data_source::sql::Builder\">Builder</a>&lt;Types, P&gt;, <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.Error.html\" title=\"struct hotshot_query_service::data_source::storage::sql::Error\">Error</a>&gt;</h4></section></summary><div class=\"docblock\"><p>Connect to a remote database.</p>\n<p>This function returns a <a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html\" title=\"struct hotshot_query_service::data_source::fetching::Builder\"><code>fetching::Builder</code></a> which can be used to set options on the\nunderlying <a href=\"hotshot_query_service/data_source/fetching/struct.FetchingDataSource.html\" title=\"struct hotshot_query_service::data_source::fetching::FetchingDataSource\"><code>FetchingDataSource</code></a>, before constructing the <a href=\"hotshot_query_service/data_source/sql/type.SqlDataSource.html\" title=\"type hotshot_query_service::data_source::sql::SqlDataSource\"><code>SqlDataSource</code></a> with\n<a href=\"hotshot_query_service/data_source/fetching/struct.Builder.html#method.build\" title=\"method hotshot_query_service::data_source::fetching::Builder::build\"><code>build</code></a>. For a convenient constructor that uses the default\nfetching options, see <a href=\"hotshot_query_service/data_source/storage/sql/struct.Config.html#method.connect\" title=\"method hotshot_query_service::data_source::storage::sql::Config::connect\"><code>Config::connect</code></a>.</p>\n</div></details></div></details>",0,"hotshot_query_service::testing::consensus::MockSqlDataSource"]]]]);
    if (window.register_type_impls) {
        window.register_type_impls(type_impls);
    } else {
        window.pending_type_impls = type_impls;
    }
})()
//{"start":55,"fragment_lengths":[13756]}