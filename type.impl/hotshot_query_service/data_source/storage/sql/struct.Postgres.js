(function() {var type_impls = {
"hotshot_query_service":[["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Database-for-Postgres\" class=\"impl\"><a href=\"#impl-Database-for-Postgres\" class=\"anchor\">§</a><h3 class=\"code-header\">impl <a class=\"trait\" href=\"hotshot_query_service/data_source/storage/sql/trait.Database.html\" title=\"trait hotshot_query_service::data_source::storage::sql::Database\">Database</a> for <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.Postgres.html\" title=\"struct hotshot_query_service::data_source::storage::sql::Postgres\">Postgres</a></h3></section></summary><div class=\"impl-items\"><details class=\"toggle\" open><summary><section id=\"associatedtype.Connection\" class=\"associatedtype trait-impl\"><a href=\"#associatedtype.Connection\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a href=\"hotshot_query_service/data_source/storage/sql/trait.Database.html#associatedtype.Connection\" class=\"associatedtype\">Connection</a> = PgConnection</h4></section></summary><div class='docblock'>The concrete <code>Connection</code> implementation for this database.</div></details><details class=\"toggle\" open><summary><section id=\"associatedtype.TransactionManager\" class=\"associatedtype trait-impl\"><a href=\"#associatedtype.TransactionManager\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a href=\"hotshot_query_service/data_source/storage/sql/trait.Database.html#associatedtype.TransactionManager\" class=\"associatedtype\">TransactionManager</a> = PgTransactionManager</h4></section></summary><div class='docblock'>The concrete <code>TransactionManager</code> implementation for this database.</div></details><details class=\"toggle\" open><summary><section id=\"associatedtype.Row\" class=\"associatedtype trait-impl\"><a href=\"#associatedtype.Row\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a href=\"hotshot_query_service/data_source/storage/sql/trait.Database.html#associatedtype.Row\" class=\"associatedtype\">Row</a> = PgRow</h4></section></summary><div class='docblock'>The concrete <code>Row</code> implementation for this database.</div></details><details class=\"toggle\" open><summary><section id=\"associatedtype.QueryResult\" class=\"associatedtype trait-impl\"><a href=\"#associatedtype.QueryResult\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a href=\"hotshot_query_service/data_source/storage/sql/trait.Database.html#associatedtype.QueryResult\" class=\"associatedtype\">QueryResult</a> = PgQueryResult</h4></section></summary><div class='docblock'>The concrete <code>QueryResult</code> implementation for this database.</div></details><details class=\"toggle\" open><summary><section id=\"associatedtype.Column\" class=\"associatedtype trait-impl\"><a href=\"#associatedtype.Column\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a href=\"hotshot_query_service/data_source/storage/sql/trait.Database.html#associatedtype.Column\" class=\"associatedtype\">Column</a> = PgColumn</h4></section></summary><div class='docblock'>The concrete <code>Column</code> implementation for this database.</div></details><details class=\"toggle\" open><summary><section id=\"associatedtype.TypeInfo\" class=\"associatedtype trait-impl\"><a href=\"#associatedtype.TypeInfo\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a href=\"hotshot_query_service/data_source/storage/sql/trait.Database.html#associatedtype.TypeInfo\" class=\"associatedtype\">TypeInfo</a> = PgTypeInfo</h4></section></summary><div class='docblock'>The concrete <code>TypeInfo</code> implementation for this database.</div></details><details class=\"toggle\" open><summary><section id=\"associatedtype.Value\" class=\"associatedtype trait-impl\"><a href=\"#associatedtype.Value\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a href=\"hotshot_query_service/data_source/storage/sql/trait.Database.html#associatedtype.Value\" class=\"associatedtype\">Value</a> = PgValue</h4></section></summary><div class='docblock'>The concrete type used to hold an owned copy of the not-yet-decoded value that was\nreceived from the database.</div></details><details class=\"toggle\" open><summary><section id=\"associatedtype.ValueRef\" class=\"associatedtype trait-impl\"><a href=\"#associatedtype.ValueRef\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a href=\"hotshot_query_service/data_source/storage/sql/trait.Database.html#associatedtype.ValueRef\" class=\"associatedtype\">ValueRef</a>&lt;'r&gt; = PgValueRef&lt;'r&gt;</h4></section></summary><div class='docblock'>The concrete type used to hold a reference to the not-yet-decoded value that has just been\nreceived from the database.</div></details><details class=\"toggle\" open><summary><section id=\"associatedtype.Arguments\" class=\"associatedtype trait-impl\"><a href=\"#associatedtype.Arguments\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a href=\"hotshot_query_service/data_source/storage/sql/trait.Database.html#associatedtype.Arguments\" class=\"associatedtype\">Arguments</a>&lt;'q&gt; = PgArguments</h4></section></summary><div class='docblock'>The concrete <code>Arguments</code> implementation for this database.</div></details><details class=\"toggle\" open><summary><section id=\"associatedtype.ArgumentBuffer\" class=\"associatedtype trait-impl\"><a href=\"#associatedtype.ArgumentBuffer\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a href=\"hotshot_query_service/data_source/storage/sql/trait.Database.html#associatedtype.ArgumentBuffer\" class=\"associatedtype\">ArgumentBuffer</a>&lt;'q&gt; = PgArgumentBuffer</h4></section></summary><div class='docblock'>The concrete type used as a buffer for arguments while encoding.</div></details><details class=\"toggle\" open><summary><section id=\"associatedtype.Statement\" class=\"associatedtype trait-impl\"><a href=\"#associatedtype.Statement\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a href=\"hotshot_query_service/data_source/storage/sql/trait.Database.html#associatedtype.Statement\" class=\"associatedtype\">Statement</a>&lt;'q&gt; = PgStatement&lt;'q&gt;</h4></section></summary><div class='docblock'>The concrete <code>Statement</code> implementation for this database.</div></details><details class=\"toggle\" open><summary><section id=\"associatedconstant.NAME\" class=\"associatedconstant trait-impl\"><a href=\"#associatedconstant.NAME\" class=\"anchor\">§</a><h4 class=\"code-header\">const <a href=\"hotshot_query_service/data_source/storage/sql/trait.Database.html#associatedconstant.NAME\" class=\"constant\">NAME</a>: &amp;'static <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.81.0/std/primitive.str.html\">str</a> = &quot;PostgreSQL&quot;</h4></section></summary><div class='docblock'>The display name for this database driver.</div></details><details class=\"toggle\" open><summary><section id=\"associatedconstant.URL_SCHEMES\" class=\"associatedconstant trait-impl\"><a href=\"#associatedconstant.URL_SCHEMES\" class=\"anchor\">§</a><h4 class=\"code-header\">const <a href=\"hotshot_query_service/data_source/storage/sql/trait.Database.html#associatedconstant.URL_SCHEMES\" class=\"constant\">URL_SCHEMES</a>: &amp;'static [&amp;'static <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.81.0/std/primitive.str.html\">str</a>] = _</h4></section></summary><div class='docblock'>The schemes for database URLs that should match this driver.</div></details></div></details>","Database","hotshot_query_service::data_source::storage::sql::db::Db"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Debug-for-Postgres\" class=\"impl\"><a href=\"#impl-Debug-for-Postgres\" class=\"anchor\">§</a><h3 class=\"code-header\">impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.81.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> for <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.Postgres.html\" title=\"struct hotshot_query_service::data_source::storage::sql::Postgres\">Postgres</a></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.fmt\" class=\"method trait-impl\"><a href=\"#method.fmt\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.81.0/core/fmt/trait.Debug.html#tymethod.fmt\" class=\"fn\">fmt</a>(&amp;self, f: &amp;mut <a class=\"struct\" href=\"https://doc.rust-lang.org/1.81.0/core/fmt/struct.Formatter.html\" title=\"struct core::fmt::Formatter\">Formatter</a>&lt;'_&gt;) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.81.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.81.0/std/primitive.unit.html\">()</a>, <a class=\"struct\" href=\"https://doc.rust-lang.org/1.81.0/core/fmt/struct.Error.html\" title=\"struct core::fmt::Error\">Error</a>&gt;</h4></section></summary><div class='docblock'>Formats the value using the given formatter. <a href=\"https://doc.rust-lang.org/1.81.0/core/fmt/trait.Debug.html#tymethod.fmt\">Read more</a></div></details></div></details>","Debug","hotshot_query_service::data_source::storage::sql::db::Db"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-MigrateDatabase-for-Postgres\" class=\"impl\"><a href=\"#impl-MigrateDatabase-for-Postgres\" class=\"anchor\">§</a><h3 class=\"code-header\">impl MigrateDatabase for <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.Postgres.html\" title=\"struct hotshot_query_service::data_source::storage::sql::Postgres\">Postgres</a></h3></section></summary><div class=\"impl-items\"><section id=\"method.create_database\" class=\"method trait-impl\"><a href=\"#method.create_database\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">create_database</a>(\n    url: &amp;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.81.0/std/primitive.str.html\">str</a>,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.81.0/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.81.0/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.81.0/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/1.81.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.81.0/std/primitive.unit.html\">()</a>, Error&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.81.0/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + '_&gt;&gt;</h4></section><section id=\"method.database_exists\" class=\"method trait-impl\"><a href=\"#method.database_exists\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">database_exists</a>(\n    url: &amp;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.81.0/std/primitive.str.html\">str</a>,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.81.0/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.81.0/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.81.0/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/1.81.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.81.0/std/primitive.bool.html\">bool</a>, Error&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.81.0/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + '_&gt;&gt;</h4></section><section id=\"method.drop_database\" class=\"method trait-impl\"><a href=\"#method.drop_database\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">drop_database</a>(\n    url: &amp;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.81.0/std/primitive.str.html\">str</a>,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.81.0/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.81.0/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.81.0/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/1.81.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.81.0/std/primitive.unit.html\">()</a>, Error&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.81.0/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + '_&gt;&gt;</h4></section><section id=\"method.force_drop_database\" class=\"method trait-impl\"><a href=\"#method.force_drop_database\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">force_drop_database</a>(\n    url: &amp;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.81.0/std/primitive.str.html\">str</a>,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.81.0/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.81.0/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.81.0/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/1.81.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.81.0/std/primitive.unit.html\">()</a>, Error&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.81.0/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + '_&gt;&gt;</h4></section></div></details>","MigrateDatabase","hotshot_query_service::data_source::storage::sql::db::Db"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-TestSupport-for-Postgres\" class=\"impl\"><a href=\"#impl-TestSupport-for-Postgres\" class=\"anchor\">§</a><h3 class=\"code-header\">impl TestSupport for <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.Postgres.html\" title=\"struct hotshot_query_service::data_source::storage::sql::Postgres\">Postgres</a></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.test_context\" class=\"method trait-impl\"><a href=\"#method.test_context\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">test_context</a>(\n    args: &amp;TestArgs,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.81.0/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.81.0/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.81.0/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/1.81.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;TestContext&lt;<a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.Postgres.html\" title=\"struct hotshot_query_service::data_source::storage::sql::Postgres\">Postgres</a>&gt;, Error&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.81.0/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + '_&gt;&gt;</h4></section></summary><div class='docblock'>Get parameters to construct a <code>Pool</code> suitable for testing. <a>Read more</a></div></details><section id=\"method.cleanup_test\" class=\"method trait-impl\"><a href=\"#method.cleanup_test\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">cleanup_test</a>(\n    db_name: &amp;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.81.0/std/primitive.str.html\">str</a>,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.81.0/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.81.0/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.81.0/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/1.81.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.81.0/std/primitive.unit.html\">()</a>, Error&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.81.0/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + '_&gt;&gt;</h4></section><details class=\"toggle method-toggle\" open><summary><section id=\"method.cleanup_test_dbs\" class=\"method trait-impl\"><a href=\"#method.cleanup_test_dbs\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">cleanup_test_dbs</a>() -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.81.0/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.81.0/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.81.0/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/1.81.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"enum\" href=\"https://doc.rust-lang.org/1.81.0/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.81.0/std/primitive.usize.html\">usize</a>&gt;, Error&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.81.0/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a>&gt;&gt;</h4></section></summary><div class='docblock'>Cleanup any test databases that are no longer in-use. <a>Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.snapshot\" class=\"method trait-impl\"><a href=\"#method.snapshot\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">snapshot</a>(\n    _conn: &amp;mut &lt;<a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.Postgres.html\" title=\"struct hotshot_query_service::data_source::storage::sql::Postgres\">Postgres</a> as <a class=\"trait\" href=\"hotshot_query_service/data_source/storage/sql/trait.Database.html\" title=\"trait hotshot_query_service::data_source::storage::sql::Database\">Database</a>&gt;::<a class=\"associatedtype\" href=\"hotshot_query_service/data_source/storage/sql/trait.Database.html#associatedtype.Connection\" title=\"type hotshot_query_service::data_source::storage::sql::Database::Connection\">Connection</a>,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.81.0/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.81.0/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.81.0/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/1.81.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;FixtureSnapshot&lt;<a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.Postgres.html\" title=\"struct hotshot_query_service::data_source::storage::sql::Postgres\">Postgres</a>&gt;, Error&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.81.0/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + '_&gt;&gt;</h4></section></summary><div class='docblock'>Take a snapshot of the current state of the database (data only). <a>Read more</a></div></details></div></details>","TestSupport","hotshot_query_service::data_source::storage::sql::db::Db"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-TypeChecking-for-Postgres\" class=\"impl\"><a href=\"#impl-TypeChecking-for-Postgres\" class=\"anchor\">§</a><h3 class=\"code-header\">impl TypeChecking for <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.Postgres.html\" title=\"struct hotshot_query_service::data_source::storage::sql::Postgres\">Postgres</a></h3></section></summary><div class=\"impl-items\"><details class=\"toggle\" open><summary><section id=\"associatedconstant.PARAM_CHECKING\" class=\"associatedconstant trait-impl\"><a href=\"#associatedconstant.PARAM_CHECKING\" class=\"anchor\">§</a><h4 class=\"code-header\">const <a class=\"constant\">PARAM_CHECKING</a>: ParamChecking = ::sqlx_core::type_checking::ParamChecking::Strong</h4></section></summary><div class='docblock'>Describes how the database in question typechecks query parameters.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.param_type_for_id\" class=\"method trait-impl\"><a href=\"#method.param_type_for_id\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">param_type_for_id</a>(\n    info: &amp;&lt;<a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.Postgres.html\" title=\"struct hotshot_query_service::data_source::storage::sql::Postgres\">Postgres</a> as <a class=\"trait\" href=\"hotshot_query_service/data_source/storage/sql/trait.Database.html\" title=\"trait hotshot_query_service::data_source::storage::sql::Database\">Database</a>&gt;::<a class=\"associatedtype\" href=\"hotshot_query_service/data_source/storage/sql/trait.Database.html#associatedtype.TypeInfo\" title=\"type hotshot_query_service::data_source::storage::sql::Database::TypeInfo\">TypeInfo</a>,\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.81.0/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;&amp;'static <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.81.0/std/primitive.str.html\">str</a>&gt;</h4></section></summary><div class='docblock'>Get the full path of the Rust type that corresponds to the given <code>TypeInfo</code>, if applicable. <a>Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.return_type_for_id\" class=\"method trait-impl\"><a href=\"#method.return_type_for_id\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">return_type_for_id</a>(\n    info: &amp;&lt;<a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.Postgres.html\" title=\"struct hotshot_query_service::data_source::storage::sql::Postgres\">Postgres</a> as <a class=\"trait\" href=\"hotshot_query_service/data_source/storage/sql/trait.Database.html\" title=\"trait hotshot_query_service::data_source::storage::sql::Database\">Database</a>&gt;::<a class=\"associatedtype\" href=\"hotshot_query_service/data_source/storage/sql/trait.Database.html#associatedtype.TypeInfo\" title=\"type hotshot_query_service::data_source::storage::sql::Database::TypeInfo\">TypeInfo</a>,\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.81.0/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;&amp;'static <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.81.0/std/primitive.str.html\">str</a>&gt;</h4></section></summary><div class='docblock'>Get the full path of the Rust type that corresponds to the given <code>TypeInfo</code>, if applicable. <a>Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.get_feature_gate\" class=\"method trait-impl\"><a href=\"#method.get_feature_gate\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">get_feature_gate</a>(\n    info: &amp;&lt;<a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.Postgres.html\" title=\"struct hotshot_query_service::data_source::storage::sql::Postgres\">Postgres</a> as <a class=\"trait\" href=\"hotshot_query_service/data_source/storage/sql/trait.Database.html\" title=\"trait hotshot_query_service::data_source::storage::sql::Database\">Database</a>&gt;::<a class=\"associatedtype\" href=\"hotshot_query_service/data_source/storage/sql/trait.Database.html#associatedtype.TypeInfo\" title=\"type hotshot_query_service::data_source::storage::sql::Database::TypeInfo\">TypeInfo</a>,\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.81.0/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;&amp;'static <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.81.0/std/primitive.str.html\">str</a>&gt;</h4></section></summary><div class='docblock'>Get the name of the Cargo feature gate that must be enabled to process the given <code>TypeInfo</code>,\nif applicable.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.fmt_value_debug\" class=\"method trait-impl\"><a href=\"#method.fmt_value_debug\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">fmt_value_debug</a>(\n    value: &amp;&lt;<a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.Postgres.html\" title=\"struct hotshot_query_service::data_source::storage::sql::Postgres\">Postgres</a> as <a class=\"trait\" href=\"hotshot_query_service/data_source/storage/sql/trait.Database.html\" title=\"trait hotshot_query_service::data_source::storage::sql::Database\">Database</a>&gt;::<a class=\"associatedtype\" href=\"hotshot_query_service/data_source/storage/sql/trait.Database.html#associatedtype.Value\" title=\"type hotshot_query_service::data_source::storage::sql::Database::Value\">Value</a>,\n) -&gt; FmtValue&lt;'_, <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.Postgres.html\" title=\"struct hotshot_query_service::data_source::storage::sql::Postgres\">Postgres</a>&gt;</h4></section></summary><div class='docblock'>If <code>value</code> is a well-known type, decode and format it using <code>Debug</code>. <a>Read more</a></div></details></div></details>","TypeChecking","hotshot_query_service::data_source::storage::sql::db::Db"],["<section id=\"impl-HasStatementCache-for-Postgres\" class=\"impl\"><a href=\"#impl-HasStatementCache-for-Postgres\" class=\"anchor\">§</a><h3 class=\"code-header\">impl HasStatementCache for <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.Postgres.html\" title=\"struct hotshot_query_service::data_source::storage::sql::Postgres\">Postgres</a></h3></section>","HasStatementCache","hotshot_query_service::data_source::storage::sql::db::Db"]]
};if (window.register_type_impls) {window.register_type_impls(type_impls);} else {window.pending_type_impls = type_impls;}})()