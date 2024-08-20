(function() {var type_impls = {
"hotshot_query_service":[["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Clone-for-MemoryNetwork%3CK%3E\" class=\"impl\"><a href=\"#impl-Clone-for-MemoryNetwork%3CK%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;K&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.80.1/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> for MemoryNetwork&lt;K&gt;<div class=\"where\">where\n    K: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.80.1/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> + SignatureKey,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.clone\" class=\"method trait-impl\"><a href=\"#method.clone\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.80.1/core/clone/trait.Clone.html#tymethod.clone\" class=\"fn\">clone</a>(&amp;self) -&gt; MemoryNetwork&lt;K&gt;</h4></section></summary><div class='docblock'>Returns a copy of the value. <a href=\"https://doc.rust-lang.org/1.80.1/core/clone/trait.Clone.html#tymethod.clone\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.clone_from\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.0.0\">1.0.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/1.80.1/src/core/clone.rs.html#169\">source</a></span><a href=\"#method.clone_from\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.80.1/core/clone/trait.Clone.html#method.clone_from\" class=\"fn\">clone_from</a>(&amp;mut self, source: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.80.1/std/primitive.reference.html\">&amp;Self</a>)</h4></section></summary><div class='docblock'>Performs copy-assignment from <code>source</code>. <a href=\"https://doc.rust-lang.org/1.80.1/core/clone/trait.Clone.html#method.clone_from\">Read more</a></div></details></div></details>","Clone","hotshot_query_service::testing::mocks::MockNetwork"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-ConnectedNetwork%3CK%3E-for-MemoryNetwork%3CK%3E\" class=\"impl\"><a href=\"#impl-ConnectedNetwork%3CK%3E-for-MemoryNetwork%3CK%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;K&gt; ConnectedNetwork&lt;K&gt; for MemoryNetwork&lt;K&gt;<div class=\"where\">where\n    K: SignatureKey + 'static,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.recv_msgs\" class=\"method trait-impl\"><a href=\"#method.recv_msgs\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">recv_msgs</a>&lt;'life0, 'async_trait&gt;(\n    &amp;'life0 self,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.80.1/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/1.80.1/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/alloc/vec/struct.Vec.html\" title=\"struct alloc::vec::Vec\">Vec</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/alloc/vec/struct.Vec.html\" title=\"struct alloc::vec::Vec\">Vec</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.80.1/std/primitive.u8.html\">u8</a>&gt;&gt;, NetworkError&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.80.1/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'async_trait&gt;&gt;<div class=\"where\">where\n    'life0: 'async_trait,\n    MemoryNetwork&lt;K&gt;: 'async_trait,</div></h4></section></summary><div class=\"docblock\"><p>Receive one or many messages from the underlying network.</p>\n<h5 id=\"errors\"><a class=\"doc-anchor\" href=\"#errors\">§</a>Errors</h5>\n<p>If the other side of the channel is closed</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.wait_for_ready\" class=\"method trait-impl\"><a href=\"#method.wait_for_ready\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">wait_for_ready</a>&lt;'life0, 'async_trait&gt;(\n    &amp;'life0 self,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.80.1/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.80.1/std/primitive.unit.html\">()</a>&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.80.1/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'async_trait&gt;&gt;<div class=\"where\">where\n    'life0: 'async_trait,\n    MemoryNetwork&lt;K&gt;: 'async_trait,</div></h4></section></summary><div class='docblock'>Blocks until the network is successfully initialized</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.pause\" class=\"method trait-impl\"><a href=\"#method.pause\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">pause</a>(&amp;self)</h4></section></summary><div class='docblock'>Pauses the underlying network</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.resume\" class=\"method trait-impl\"><a href=\"#method.resume\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">resume</a>(&amp;self)</h4></section></summary><div class='docblock'>Resumes the underlying network</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.shut_down\" class=\"method trait-impl\"><a href=\"#method.shut_down\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">shut_down</a>&lt;'a, 'b&gt;(\n    &amp;'a self,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.80.1/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.80.1/std/primitive.unit.html\">()</a>&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.80.1/core/marker/trait.Sync.html\" title=\"trait core::marker::Sync\">Sync</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.80.1/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'b&gt;&gt;<div class=\"where\">where\n    'a: 'b,\n    MemoryNetwork&lt;K&gt;: 'b,</div></h4></section></summary><div class='docblock'>Blocks until the network is shut down</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.broadcast_message\" class=\"method trait-impl\"><a href=\"#method.broadcast_message\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">broadcast_message</a>&lt;'life0, 'async_trait&gt;(\n    &amp;'life0 self,\n    message: <a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/alloc/vec/struct.Vec.html\" title=\"struct alloc::vec::Vec\">Vec</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.80.1/std/primitive.u8.html\">u8</a>&gt;,\n    topic: Topic,\n    _broadcast_delay: BroadcastDelay,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.80.1/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/1.80.1/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.80.1/std/primitive.unit.html\">()</a>, NetworkError&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.80.1/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'async_trait&gt;&gt;<div class=\"where\">where\n    'life0: 'async_trait,\n    MemoryNetwork&lt;K&gt;: 'async_trait,</div></h4></section></summary><div class='docblock'>broadcast message to some subset of nodes\nblocking</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.da_broadcast_message\" class=\"method trait-impl\"><a href=\"#method.da_broadcast_message\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">da_broadcast_message</a>&lt;'life0, 'async_trait&gt;(\n    &amp;'life0 self,\n    message: <a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/alloc/vec/struct.Vec.html\" title=\"struct alloc::vec::Vec\">Vec</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.80.1/std/primitive.u8.html\">u8</a>&gt;,\n    recipients: <a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/alloc/collections/btree/set/struct.BTreeSet.html\" title=\"struct alloc::collections::btree::set::BTreeSet\">BTreeSet</a>&lt;K&gt;,\n    broadcast_delay: BroadcastDelay,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.80.1/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/1.80.1/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.80.1/std/primitive.unit.html\">()</a>, NetworkError&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.80.1/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'async_trait&gt;&gt;<div class=\"where\">where\n    'life0: 'async_trait,\n    MemoryNetwork&lt;K&gt;: 'async_trait,</div></h4></section></summary><div class='docblock'>broadcast a message only to a DA committee\nblocking</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.direct_message\" class=\"method trait-impl\"><a href=\"#method.direct_message\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">direct_message</a>&lt;'life0, 'async_trait&gt;(\n    &amp;'life0 self,\n    message: <a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/alloc/vec/struct.Vec.html\" title=\"struct alloc::vec::Vec\">Vec</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.80.1/std/primitive.u8.html\">u8</a>&gt;,\n    recipient: K,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.80.1/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/1.80.1/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.80.1/std/primitive.unit.html\">()</a>, NetworkError&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.80.1/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'async_trait&gt;&gt;<div class=\"where\">where\n    'life0: 'async_trait,\n    MemoryNetwork&lt;K&gt;: 'async_trait,</div></h4></section></summary><div class='docblock'>Sends a direct message to a specific node\nblocking</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.vid_broadcast_message\" class=\"method trait-impl\"><a href=\"#method.vid_broadcast_message\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">vid_broadcast_message</a>&lt;'life0, 'async_trait&gt;(\n    &amp;'life0 self,\n    messages: <a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/std/collections/hash/map/struct.HashMap.html\" title=\"struct std::collections::hash::map::HashMap\">HashMap</a>&lt;K, <a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/alloc/vec/struct.Vec.html\" title=\"struct alloc::vec::Vec\">Vec</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.80.1/std/primitive.u8.html\">u8</a>&gt;&gt;,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.80.1/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/1.80.1/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.80.1/std/primitive.unit.html\">()</a>, NetworkError&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.80.1/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'async_trait&gt;&gt;<div class=\"where\">where\n    'life0: 'async_trait,\n    Self: 'async_trait,</div></h4></section></summary><div class='docblock'>send messages with vid shares to its recipients\nblocking</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.request_data\" class=\"method trait-impl\"><a href=\"#method.request_data\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">request_data</a>&lt;'life0, 'life1, 'async_trait, TYPES&gt;(\n    &amp;'life0 self,\n    _request: <a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/alloc/vec/struct.Vec.html\" title=\"struct alloc::vec::Vec\">Vec</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.80.1/std/primitive.u8.html\">u8</a>&gt;,\n    _recipient: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.80.1/std/primitive.reference.html\">&amp;'life1 K</a>,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.80.1/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/1.80.1/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/alloc/vec/struct.Vec.html\" title=\"struct alloc::vec::Vec\">Vec</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.80.1/std/primitive.u8.html\">u8</a>&gt;, NetworkError&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.80.1/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'async_trait&gt;&gt;<div class=\"where\">where\n    'life0: 'async_trait,\n    'life1: 'async_trait,\n    TYPES: 'async_trait + NodeType,\n    Self: 'async_trait,</div></h4></section></summary><div class='docblock'>Ask request the network for some data.  Returns the request ID for that data,\nThe ID returned can be used for cancelling the request</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.spawn_request_receiver_task\" class=\"method trait-impl\"><a href=\"#method.spawn_request_receiver_task\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">spawn_request_receiver_task</a>&lt;'life0, 'async_trait&gt;(\n    &amp;'life0 self,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.80.1/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/1.80.1/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;Receiver&lt;(<a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/alloc/vec/struct.Vec.html\" title=\"struct alloc::vec::Vec\">Vec</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.80.1/std/primitive.u8.html\">u8</a>&gt;, NetworkMsgResponseChannel&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/alloc/vec/struct.Vec.html\" title=\"struct alloc::vec::Vec\">Vec</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.80.1/std/primitive.u8.html\">u8</a>&gt;&gt;)&gt;&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.80.1/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'async_trait&gt;&gt;<div class=\"where\">where\n    'life0: 'async_trait,\n    Self: 'async_trait,</div></h4></section></summary><div class='docblock'>Spawn a request task in the given network layer.  If it supports\nRequest and responses it will return the receiving end of a channel.\nRequests the network receives will be sent over this channel along\nwith a return channel to send the response back to. <a>Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.queue_node_lookup\" class=\"method trait-impl\"><a href=\"#method.queue_node_lookup\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">queue_node_lookup</a>(\n    &amp;self,\n    _view_number: ViewNumber,\n    _pk: K,\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.80.1/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.80.1/std/primitive.unit.html\">()</a>, TrySendError&lt;<a class=\"enum\" href=\"https://doc.rust-lang.org/1.80.1/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;(ViewNumber, K)&gt;&gt;&gt;</h4></section></summary><div class='docblock'>queues lookup of a node <a>Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.update_view\" class=\"method trait-impl\"><a href=\"#method.update_view\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">update_view</a>&lt;'a, 'life0, 'async_trait, TYPES&gt;(\n    &amp;'a self,\n    _view: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.80.1/std/primitive.u64.html\">u64</a>,\n    _membership: &amp;'life0 &lt;TYPES as NodeType&gt;::Membership,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.80.1/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.80.1/std/primitive.unit.html\">()</a>&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.80.1/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'async_trait&gt;&gt;<div class=\"where\">where\n    'a: 'async_trait,\n    'life0: 'async_trait,\n    TYPES: NodeType&lt;SignatureKey = K&gt; + 'a + 'async_trait,\n    Self: 'async_trait,</div></h4></section></summary><div class='docblock'>Update view can be used for any reason, but mostly it’s for canceling tasks,\nand looking up the address of the leader of a future view.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.is_primary_down\" class=\"method trait-impl\"><a href=\"#method.is_primary_down\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">is_primary_down</a>(&amp;self) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.80.1/std/primitive.bool.html\">bool</a></h4></section></summary><div class='docblock'>Is primary network down? Makes sense only for combined network</div></details></div></details>","ConnectedNetwork<K>","hotshot_query_service::testing::mocks::MockNetwork"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Debug-for-MemoryNetwork%3CK%3E\" class=\"impl\"><a href=\"#impl-Debug-for-MemoryNetwork%3CK%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;K&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.80.1/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> for MemoryNetwork&lt;K&gt;<div class=\"where\">where\n    K: SignatureKey,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.fmt\" class=\"method trait-impl\"><a href=\"#method.fmt\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.80.1/core/fmt/trait.Debug.html#tymethod.fmt\" class=\"fn\">fmt</a>(&amp;self, f: &amp;mut <a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/core/fmt/struct.Formatter.html\" title=\"struct core::fmt::Formatter\">Formatter</a>&lt;'_&gt;) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.80.1/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.80.1/std/primitive.unit.html\">()</a>, <a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/core/fmt/struct.Error.html\" title=\"struct core::fmt::Error\">Error</a>&gt;</h4></section></summary><div class='docblock'>Formats the value using the given formatter. <a href=\"https://doc.rust-lang.org/1.80.1/core/fmt/trait.Debug.html#tymethod.fmt\">Read more</a></div></details></div></details>","Debug","hotshot_query_service::testing::mocks::MockNetwork"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-MemoryNetwork%3CK%3E\" class=\"impl\"><a href=\"#impl-MemoryNetwork%3CK%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;K&gt; MemoryNetwork&lt;K&gt;<div class=\"where\">where\n    K: SignatureKey,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.new\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">new</a>(\n    pub_key: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.80.1/std/primitive.reference.html\">&amp;K</a>,\n    master_map: &amp;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/alloc/sync/struct.Arc.html\" title=\"struct alloc::sync::Arc\">Arc</a>&lt;MasterMap&lt;K&gt;&gt;,\n    subscribed_topics: &amp;[Topic],\n    reliability_config: <a class=\"enum\" href=\"https://doc.rust-lang.org/1.80.1/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn NetworkReliability&gt;&gt;,\n) -&gt; MemoryNetwork&lt;K&gt;</h4></section></summary><div class=\"docblock\"><p>Creates a new <code>MemoryNetwork</code> and hooks it up to the group through the provided <code>MasterMap</code></p>\n</div></details></div></details>",0,"hotshot_query_service::testing::mocks::MockNetwork"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-TestableNetworkingImplementation%3CTYPES%3E-for-MemoryNetwork%3C%3CTYPES+as+NodeType%3E::SignatureKey%3E\" class=\"impl\"><a href=\"#impl-TestableNetworkingImplementation%3CTYPES%3E-for-MemoryNetwork%3C%3CTYPES+as+NodeType%3E::SignatureKey%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;TYPES&gt; TestableNetworkingImplementation&lt;TYPES&gt; for MemoryNetwork&lt;&lt;TYPES as NodeType&gt;::SignatureKey&gt;<div class=\"where\">where\n    TYPES: NodeType,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.generator\" class=\"method trait-impl\"><a href=\"#method.generator\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">generator</a>(\n    _expected_node_count: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.80.1/std/primitive.usize.html\">usize</a>,\n    _num_bootstrap: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.80.1/std/primitive.usize.html\">usize</a>,\n    _network_id: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.80.1/std/primitive.usize.html\">usize</a>,\n    da_committee_size: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.80.1/std/primitive.usize.html\">usize</a>,\n    _is_da: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.80.1/std/primitive.bool.html\">bool</a>,\n    reliability_config: <a class=\"enum\" href=\"https://doc.rust-lang.org/1.80.1/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn NetworkReliability&gt;&gt;,\n    _secondary_network_delay: <a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/core/time/struct.Duration.html\" title=\"struct core::time::Duration\">Duration</a>,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.80.1/core/ops/function/trait.Fn.html\" title=\"trait core::ops::function::Fn\">Fn</a>(<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.80.1/std/primitive.u64.html\">u64</a>) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.80.1/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"struct\" href=\"https://doc.rust-lang.org/1.80.1/alloc/sync/struct.Arc.html\" title=\"struct alloc::sync::Arc\">Arc</a>&lt;MemoryNetwork&lt;&lt;TYPES as NodeType&gt;::SignatureKey&gt;&gt;&gt;&gt;&gt;&gt;&gt;</h4></section></summary><div class='docblock'>generates a network given an expected node count</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.in_flight_message_count\" class=\"method trait-impl\"><a href=\"#method.in_flight_message_count\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">in_flight_message_count</a>(&amp;self) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.80.1/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.80.1/std/primitive.usize.html\">usize</a>&gt;</h4></section></summary><div class='docblock'>Get the number of messages in-flight. <a>Read more</a></div></details></div></details>","TestableNetworkingImplementation<TYPES>","hotshot_query_service::testing::mocks::MockNetwork"]]
};if (window.register_type_impls) {window.register_type_impls(type_impls);} else {window.pending_type_impls = type_impls;}})()