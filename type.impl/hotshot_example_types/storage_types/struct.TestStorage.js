(function() {
    var type_impls = Object.fromEntries([["hotshot_query_service",[["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Clone-for-TestStorage%3CTYPES%3E\" class=\"impl\"><a href=\"#impl-Clone-for-TestStorage%3CTYPES%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;TYPES&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> for TestStorage&lt;TYPES&gt;<div class=\"where\">where\n    TYPES: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> + NodeType,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.clone\" class=\"method trait-impl\"><a href=\"#method.clone\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.83.0/core/clone/trait.Clone.html#tymethod.clone\" class=\"fn\">clone</a>(&amp;self) -&gt; TestStorage&lt;TYPES&gt;</h4></section></summary><div class='docblock'>Returns a copy of the value. <a href=\"https://doc.rust-lang.org/1.83.0/core/clone/trait.Clone.html#tymethod.clone\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.clone_from\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.0.0\">1.0.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/1.83.0/src/core/clone.rs.html#174\">source</a></span><a href=\"#method.clone_from\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.83.0/core/clone/trait.Clone.html#method.clone_from\" class=\"fn\">clone_from</a>(&amp;mut self, source: &amp;Self)</h4></section></summary><div class='docblock'>Performs copy-assignment from <code>source</code>. <a href=\"https://doc.rust-lang.org/1.83.0/core/clone/trait.Clone.html#method.clone_from\">Read more</a></div></details></div></details>","Clone","hotshot_query_service::testing::mocks::MockStorage"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Debug-for-TestStorage%3CTYPES%3E\" class=\"impl\"><a href=\"#impl-Debug-for-TestStorage%3CTYPES%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;TYPES&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> for TestStorage&lt;TYPES&gt;<div class=\"where\">where\n    TYPES: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> + NodeType,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.fmt\" class=\"method trait-impl\"><a href=\"#method.fmt\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.83.0/core/fmt/trait.Debug.html#tymethod.fmt\" class=\"fn\">fmt</a>(&amp;self, f: &amp;mut <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/core/fmt/struct.Formatter.html\" title=\"struct core::fmt::Formatter\">Formatter</a>&lt;'_&gt;) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.83.0/std/primitive.unit.html\">()</a>, <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/core/fmt/struct.Error.html\" title=\"struct core::fmt::Error\">Error</a>&gt;</h4></section></summary><div class='docblock'>Formats the value using the given formatter. <a href=\"https://doc.rust-lang.org/1.83.0/core/fmt/trait.Debug.html#tymethod.fmt\">Read more</a></div></details></div></details>","Debug","hotshot_query_service::testing::mocks::MockStorage"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Default-for-TestStorage%3CTYPES%3E\" class=\"impl\"><a href=\"#impl-Default-for-TestStorage%3CTYPES%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;TYPES&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a> for TestStorage&lt;TYPES&gt;<div class=\"where\">where\n    TYPES: NodeType,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.default\" class=\"method trait-impl\"><a href=\"#method.default\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.83.0/core/default/trait.Default.html#tymethod.default\" class=\"fn\">default</a>() -&gt; TestStorage&lt;TYPES&gt;</h4></section></summary><div class='docblock'>Returns the “default value” for a type. <a href=\"https://doc.rust-lang.org/1.83.0/core/default/trait.Default.html#tymethod.default\">Read more</a></div></details></div></details>","Default","hotshot_query_service::testing::mocks::MockStorage"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Storage%3CTYPES%3E-for-TestStorage%3CTYPES%3E\" class=\"impl\"><a href=\"#impl-Storage%3CTYPES%3E-for-TestStorage%3CTYPES%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;TYPES&gt; Storage&lt;TYPES&gt; for TestStorage&lt;TYPES&gt;<div class=\"where\">where\n    TYPES: NodeType,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.append_vid\" class=\"method trait-impl\"><a href=\"#method.append_vid\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">append_vid</a>&lt;'life0, 'life1, 'async_trait&gt;(\n    &amp;'life0 self,\n    proposal: &amp;'life1 Proposal&lt;TYPES, VidDisperseShare&lt;TYPES&gt;&gt;,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.83.0/std/primitive.unit.html\">()</a>, <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.Error.html\" title=\"struct hotshot_query_service::data_source::storage::sql::Error\">Error</a>&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'async_trait&gt;&gt;<div class=\"where\">where\n    'life0: 'async_trait,\n    'life1: 'async_trait,\n    TestStorage&lt;TYPES&gt;: 'async_trait,</div></h4></section></summary><div class='docblock'>Add a proposal to the stored VID proposals.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.append_vid2\" class=\"method trait-impl\"><a href=\"#method.append_vid2\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">append_vid2</a>&lt;'life0, 'life1, 'async_trait&gt;(\n    &amp;'life0 self,\n    proposal: &amp;'life1 Proposal&lt;TYPES, VidDisperseShare2&lt;TYPES&gt;&gt;,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.83.0/std/primitive.unit.html\">()</a>, <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.Error.html\" title=\"struct hotshot_query_service::data_source::storage::sql::Error\">Error</a>&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'async_trait&gt;&gt;<div class=\"where\">where\n    'life0: 'async_trait,\n    'life1: 'async_trait,\n    TestStorage&lt;TYPES&gt;: 'async_trait,</div></h4></section></summary><div class='docblock'>Add a proposal to the stored VID proposals.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.append_da\" class=\"method trait-impl\"><a href=\"#method.append_da\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">append_da</a>&lt;'life0, 'life1, 'async_trait&gt;(\n    &amp;'life0 self,\n    proposal: &amp;'life1 Proposal&lt;TYPES, DaProposal&lt;TYPES&gt;&gt;,\n    _vid_commit: &lt;VidSchemeType as VidScheme&gt;::Commit,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.83.0/std/primitive.unit.html\">()</a>, <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.Error.html\" title=\"struct hotshot_query_service::data_source::storage::sql::Error\">Error</a>&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'async_trait&gt;&gt;<div class=\"where\">where\n    'life0: 'async_trait,\n    'life1: 'async_trait,\n    TestStorage&lt;TYPES&gt;: 'async_trait,</div></h4></section></summary><div class='docblock'>Add a proposal to the stored DA proposals.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.append_da2\" class=\"method trait-impl\"><a href=\"#method.append_da2\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">append_da2</a>&lt;'life0, 'life1, 'async_trait&gt;(\n    &amp;'life0 self,\n    proposal: &amp;'life1 Proposal&lt;TYPES, DaProposal2&lt;TYPES&gt;&gt;,\n    _vid_commit: &lt;VidSchemeType as VidScheme&gt;::Commit,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.83.0/std/primitive.unit.html\">()</a>, <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.Error.html\" title=\"struct hotshot_query_service::data_source::storage::sql::Error\">Error</a>&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'async_trait&gt;&gt;<div class=\"where\">where\n    'life0: 'async_trait,\n    'life1: 'async_trait,\n    TestStorage&lt;TYPES&gt;: 'async_trait,</div></h4></section></summary><div class='docblock'>Add a proposal to the stored DA proposals.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.append_proposal\" class=\"method trait-impl\"><a href=\"#method.append_proposal\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">append_proposal</a>&lt;'life0, 'life1, 'async_trait&gt;(\n    &amp;'life0 self,\n    proposal: &amp;'life1 Proposal&lt;TYPES, QuorumProposal&lt;TYPES&gt;&gt;,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.83.0/std/primitive.unit.html\">()</a>, <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.Error.html\" title=\"struct hotshot_query_service::data_source::storage::sql::Error\">Error</a>&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'async_trait&gt;&gt;<div class=\"where\">where\n    'life0: 'async_trait,\n    'life1: 'async_trait,\n    TestStorage&lt;TYPES&gt;: 'async_trait,</div></h4></section></summary><div class='docblock'>Add a proposal we sent to the store</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.append_proposal2\" class=\"method trait-impl\"><a href=\"#method.append_proposal2\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">append_proposal2</a>&lt;'life0, 'life1, 'async_trait&gt;(\n    &amp;'life0 self,\n    proposal: &amp;'life1 Proposal&lt;TYPES, QuorumProposal2&lt;TYPES&gt;&gt;,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.83.0/std/primitive.unit.html\">()</a>, <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.Error.html\" title=\"struct hotshot_query_service::data_source::storage::sql::Error\">Error</a>&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'async_trait&gt;&gt;<div class=\"where\">where\n    'life0: 'async_trait,\n    'life1: 'async_trait,\n    TestStorage&lt;TYPES&gt;: 'async_trait,</div></h4></section></summary><div class='docblock'>Add a proposal we sent to the store</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.append_proposal_wrapper\" class=\"method trait-impl\"><a href=\"#method.append_proposal_wrapper\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">append_proposal_wrapper</a>&lt;'life0, 'life1, 'async_trait&gt;(\n    &amp;'life0 self,\n    proposal: &amp;'life1 Proposal&lt;TYPES, QuorumProposalWrapper&lt;TYPES&gt;&gt;,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.83.0/std/primitive.unit.html\">()</a>, <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.Error.html\" title=\"struct hotshot_query_service::data_source::storage::sql::Error\">Error</a>&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'async_trait&gt;&gt;<div class=\"where\">where\n    'life0: 'async_trait,\n    'life1: 'async_trait,\n    TestStorage&lt;TYPES&gt;: 'async_trait,</div></h4></section></summary><div class='docblock'>Add a proposal we sent to the store</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.record_action\" class=\"method trait-impl\"><a href=\"#method.record_action\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">record_action</a>&lt;'life0, 'async_trait&gt;(\n    &amp;'life0 self,\n    view: &lt;TYPES as NodeType&gt;::View,\n    action: HotShotAction,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.83.0/std/primitive.unit.html\">()</a>, <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.Error.html\" title=\"struct hotshot_query_service::data_source::storage::sql::Error\">Error</a>&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'async_trait&gt;&gt;<div class=\"where\">where\n    'life0: 'async_trait,\n    TestStorage&lt;TYPES&gt;: 'async_trait,</div></h4></section></summary><div class='docblock'>Record a HotShotAction taken.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.update_high_qc\" class=\"method trait-impl\"><a href=\"#method.update_high_qc\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">update_high_qc</a>&lt;'life0, 'async_trait&gt;(\n    &amp;'life0 self,\n    new_high_qc: SimpleCertificate&lt;TYPES, QuorumData&lt;TYPES&gt;, SuccessThreshold&gt;,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.83.0/std/primitive.unit.html\">()</a>, <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.Error.html\" title=\"struct hotshot_query_service::data_source::storage::sql::Error\">Error</a>&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'async_trait&gt;&gt;<div class=\"where\">where\n    'life0: 'async_trait,\n    TestStorage&lt;TYPES&gt;: 'async_trait,</div></h4></section></summary><div class='docblock'>Update the current high QC in storage.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.update_high_qc2\" class=\"method trait-impl\"><a href=\"#method.update_high_qc2\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">update_high_qc2</a>&lt;'life0, 'async_trait&gt;(\n    &amp;'life0 self,\n    new_high_qc: SimpleCertificate&lt;TYPES, QuorumData2&lt;TYPES&gt;, SuccessThreshold&gt;,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.83.0/std/primitive.unit.html\">()</a>, <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.Error.html\" title=\"struct hotshot_query_service::data_source::storage::sql::Error\">Error</a>&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'async_trait&gt;&gt;<div class=\"where\">where\n    'life0: 'async_trait,\n    TestStorage&lt;TYPES&gt;: 'async_trait,</div></h4></section></summary><div class='docblock'>Update the current high QC in storage.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.update_next_epoch_high_qc2\" class=\"method trait-impl\"><a href=\"#method.update_next_epoch_high_qc2\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">update_next_epoch_high_qc2</a>&lt;'life0, 'async_trait&gt;(\n    &amp;'life0 self,\n    new_next_epoch_high_qc: SimpleCertificate&lt;TYPES, NextEpochQuorumData2&lt;TYPES&gt;, SuccessThreshold&gt;,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.83.0/std/primitive.unit.html\">()</a>, <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.Error.html\" title=\"struct hotshot_query_service::data_source::storage::sql::Error\">Error</a>&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'async_trait&gt;&gt;<div class=\"where\">where\n    'life0: 'async_trait,\n    TestStorage&lt;TYPES&gt;: 'async_trait,</div></h4></section></summary><div class='docblock'>Update the current high QC in storage.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.update_undecided_state\" class=\"method trait-impl\"><a href=\"#method.update_undecided_state\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">update_undecided_state</a>&lt;'life0, 'async_trait&gt;(\n    &amp;'life0 self,\n    _leaves: <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/std/collections/hash/map/struct.HashMap.html\" title=\"struct std::collections::hash::map::HashMap\">HashMap</a>&lt;Commitment&lt;<a class=\"struct\" href=\"hotshot_query_service/struct.Leaf.html\" title=\"struct hotshot_query_service::Leaf\">Leaf</a>&lt;TYPES&gt;&gt;, <a class=\"struct\" href=\"hotshot_query_service/struct.Leaf.html\" title=\"struct hotshot_query_service::Leaf\">Leaf</a>&lt;TYPES&gt;&gt;,\n    _state: <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/alloc/collections/btree/map/struct.BTreeMap.html\" title=\"struct alloc::collections::btree::map::BTreeMap\">BTreeMap</a>&lt;&lt;TYPES as NodeType&gt;::View, View&lt;TYPES&gt;&gt;,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.83.0/std/primitive.unit.html\">()</a>, <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.Error.html\" title=\"struct hotshot_query_service::data_source::storage::sql::Error\">Error</a>&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'async_trait&gt;&gt;<div class=\"where\">where\n    'life0: 'async_trait,\n    TestStorage&lt;TYPES&gt;: 'async_trait,</div></h4></section></summary><div class='docblock'>Update the currently undecided state of consensus.  This includes the undecided leaf chain,\nand the undecided state.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.update_undecided_state2\" class=\"method trait-impl\"><a href=\"#method.update_undecided_state2\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">update_undecided_state2</a>&lt;'life0, 'async_trait&gt;(\n    &amp;'life0 self,\n    _leaves: <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/std/collections/hash/map/struct.HashMap.html\" title=\"struct std::collections::hash::map::HashMap\">HashMap</a>&lt;Commitment&lt;Leaf2&lt;TYPES&gt;&gt;, Leaf2&lt;TYPES&gt;&gt;,\n    _state: <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/alloc/collections/btree/map/struct.BTreeMap.html\" title=\"struct alloc::collections::btree::map::BTreeMap\">BTreeMap</a>&lt;&lt;TYPES as NodeType&gt;::View, View&lt;TYPES&gt;&gt;,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.83.0/std/primitive.unit.html\">()</a>, <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.Error.html\" title=\"struct hotshot_query_service::data_source::storage::sql::Error\">Error</a>&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'async_trait&gt;&gt;<div class=\"where\">where\n    'life0: 'async_trait,\n    TestStorage&lt;TYPES&gt;: 'async_trait,</div></h4></section></summary><div class='docblock'>Update the currently undecided state of consensus.  This includes the undecided leaf chain,\nand the undecided state.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.update_decided_upgrade_certificate\" class=\"method trait-impl\"><a href=\"#method.update_decided_upgrade_certificate\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">update_decided_upgrade_certificate</a>&lt;'life0, 'async_trait&gt;(\n    &amp;'life0 self,\n    decided_upgrade_certificate: <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;SimpleCertificate&lt;TYPES, UpgradeProposalData&lt;TYPES&gt;, UpgradeThreshold&gt;&gt;,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.83.0/std/primitive.unit.html\">()</a>, <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.Error.html\" title=\"struct hotshot_query_service::data_source::storage::sql::Error\">Error</a>&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'async_trait&gt;&gt;<div class=\"where\">where\n    'life0: 'async_trait,\n    TestStorage&lt;TYPES&gt;: 'async_trait,</div></h4></section></summary><div class='docblock'>Upgrade the current decided upgrade certificate in storage.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.migrate_consensus\" class=\"method trait-impl\"><a href=\"#method.migrate_consensus\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">migrate_consensus</a>&lt;'life0, 'async_trait&gt;(\n    &amp;'life0 self,\n    _convert_leaf: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.83.0/std/primitive.fn.html\">fn</a>(_: <a class=\"struct\" href=\"hotshot_query_service/struct.Leaf.html\" title=\"struct hotshot_query_service::Leaf\">Leaf</a>&lt;TYPES&gt;) -&gt; Leaf2&lt;TYPES&gt;,\n    convert_proposal: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.83.0/std/primitive.fn.html\">fn</a>(_: Proposal&lt;TYPES, QuorumProposal&lt;TYPES&gt;&gt;) -&gt; Proposal&lt;TYPES, QuorumProposal2&lt;TYPES&gt;&gt;,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.83.0/std/primitive.unit.html\">()</a>, <a class=\"struct\" href=\"hotshot_query_service/data_source/storage/sql/struct.Error.html\" title=\"struct hotshot_query_service::data_source::storage::sql::Error\">Error</a>&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'async_trait&gt;&gt;<div class=\"where\">where\n    'life0: 'async_trait,\n    TestStorage&lt;TYPES&gt;: 'async_trait,</div></h4></section></summary><div class='docblock'>Migrate leaves from <code>Leaf</code> to <code>Leaf2</code>, and proposals from <code>QuorumProposal</code> to <code>QuorumProposal2</code></div></details></div></details>","Storage<TYPES>","hotshot_query_service::testing::mocks::MockStorage"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-TestStorage%3CTYPES%3E\" class=\"impl\"><a href=\"#impl-TestStorage%3CTYPES%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;TYPES&gt; TestStorage&lt;TYPES&gt;<div class=\"where\">where\n    TYPES: NodeType,</div></h3></section></summary><div class=\"impl-items\"><section id=\"method.proposals_cloned\" class=\"method\"><h4 class=\"code-header\">pub async fn <a class=\"fn\">proposals_cloned</a>(\n    &amp;self,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/alloc/collections/btree/map/struct.BTreeMap.html\" title=\"struct alloc::collections::btree::map::BTreeMap\">BTreeMap</a>&lt;&lt;TYPES as NodeType&gt;::View, Proposal&lt;TYPES, QuorumProposalWrapper&lt;TYPES&gt;&gt;&gt;</h4></section><section id=\"method.high_qc_cloned\" class=\"method\"><h4 class=\"code-header\">pub async fn <a class=\"fn\">high_qc_cloned</a>(\n    &amp;self,\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;SimpleCertificate&lt;TYPES, QuorumData2&lt;TYPES&gt;, SuccessThreshold&gt;&gt;</h4></section><section id=\"method.next_epoch_high_qc_cloned\" class=\"method\"><h4 class=\"code-header\">pub async fn <a class=\"fn\">next_epoch_high_qc_cloned</a>(\n    &amp;self,\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;SimpleCertificate&lt;TYPES, NextEpochQuorumData2&lt;TYPES&gt;, SuccessThreshold&gt;&gt;</h4></section><section id=\"method.decided_upgrade_certificate\" class=\"method\"><h4 class=\"code-header\">pub async fn <a class=\"fn\">decided_upgrade_certificate</a>(\n    &amp;self,\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;SimpleCertificate&lt;TYPES, UpgradeProposalData&lt;TYPES&gt;, UpgradeThreshold&gt;&gt;</h4></section><section id=\"method.last_actioned_view\" class=\"method\"><h4 class=\"code-header\">pub async fn <a class=\"fn\">last_actioned_view</a>(&amp;self) -&gt; &lt;TYPES as NodeType&gt;::View</h4></section><section id=\"method.last_actioned_epoch\" class=\"method\"><h4 class=\"code-header\">pub async fn <a class=\"fn\">last_actioned_epoch</a>(&amp;self) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;&lt;TYPES as NodeType&gt;::Epoch&gt;</h4></section><section id=\"method.vids_cloned\" class=\"method\"><h4 class=\"code-header\">pub async fn <a class=\"fn\">vids_cloned</a>(\n    &amp;self,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/alloc/collections/btree/map/struct.BTreeMap.html\" title=\"struct alloc::collections::btree::map::BTreeMap\">BTreeMap</a>&lt;&lt;TYPES as NodeType&gt;::View, <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/std/collections/hash/map/struct.HashMap.html\" title=\"struct std::collections::hash::map::HashMap\">HashMap</a>&lt;&lt;TYPES as NodeType&gt;::SignatureKey, Proposal&lt;TYPES, VidDisperseShare2&lt;TYPES&gt;&gt;&gt;&gt;</h4></section></div></details>",0,"hotshot_query_service::testing::mocks::MockStorage"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-TestableDelay-for-TestStorage%3CTYPES%3E\" class=\"impl\"><a href=\"#impl-TestableDelay-for-TestStorage%3CTYPES%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;TYPES&gt; TestableDelay for TestStorage&lt;TYPES&gt;<div class=\"where\">where\n    TYPES: NodeType,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.run_delay_settings_from_config\" class=\"method trait-impl\"><a href=\"#method.run_delay_settings_from_config\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">run_delay_settings_from_config</a>&lt;'life0, 'async_trait&gt;(\n    delay_config: &amp;'life0 DelayConfig,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.83.0/std/primitive.unit.html\">()</a>&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'async_trait&gt;&gt;<div class=\"where\">where\n    'life0: 'async_trait,</div></h4></section></summary><div class='docblock'>Look for settings in the config and run it</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.handle_async_delay\" class=\"method trait-impl\"><a href=\"#method.handle_async_delay\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">handle_async_delay</a>&lt;'life0, 'async_trait&gt;(\n    settings: &amp;'life0 DelaySettings,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.83.0/std/primitive.unit.html\">()</a>&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'async_trait&gt;&gt;<div class=\"where\">where\n    'life0: 'async_trait,</div></h4></section></summary><div class='docblock'>Add a delay from settings</div></details></div></details>","TestableDelay","hotshot_query_service::testing::mocks::MockStorage"]]]]);
    if (window.register_type_impls) {
        window.register_type_impls(type_impls);
    } else {
        window.pending_type_impls = type_impls;
    }
})()
//{"start":55,"fragment_lengths":[38310]}