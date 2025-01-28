(function() {
    var type_impls = Object.fromEntries([["hotshot_query_service",[["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Clone-for-StaticCommittee%3CT%3E\" class=\"impl\"><a href=\"#impl-Clone-for-StaticCommittee%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> for StaticCommittee&lt;T&gt;<div class=\"where\">where\n    T: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> + NodeType,\n    &lt;T as NodeType&gt;::SignatureKey: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a>,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.clone\" class=\"method trait-impl\"><a href=\"#method.clone\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.83.0/core/clone/trait.Clone.html#tymethod.clone\" class=\"fn\">clone</a>(&amp;self) -&gt; StaticCommittee&lt;T&gt;</h4></section></summary><div class='docblock'>Returns a copy of the value. <a href=\"https://doc.rust-lang.org/1.83.0/core/clone/trait.Clone.html#tymethod.clone\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.clone_from\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.0.0\">1.0.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/1.83.0/src/core/clone.rs.html#174\">source</a></span><a href=\"#method.clone_from\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.83.0/core/clone/trait.Clone.html#method.clone_from\" class=\"fn\">clone_from</a>(&amp;mut self, source: &amp;Self)</h4></section></summary><div class='docblock'>Performs copy-assignment from <code>source</code>. <a href=\"https://doc.rust-lang.org/1.83.0/core/clone/trait.Clone.html#method.clone_from\">Read more</a></div></details></div></details>","Clone","hotshot_query_service::testing::mocks::MockMembership"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Debug-for-StaticCommittee%3CT%3E\" class=\"impl\"><a href=\"#impl-Debug-for-StaticCommittee%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> for StaticCommittee&lt;T&gt;<div class=\"where\">where\n    T: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> + NodeType,\n    &lt;T as NodeType&gt;::SignatureKey: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a>,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.fmt\" class=\"method trait-impl\"><a href=\"#method.fmt\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.83.0/core/fmt/trait.Debug.html#tymethod.fmt\" class=\"fn\">fmt</a>(&amp;self, f: &amp;mut <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/core/fmt/struct.Formatter.html\" title=\"struct core::fmt::Formatter\">Formatter</a>&lt;'_&gt;) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.83.0/std/primitive.unit.html\">()</a>, <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/core/fmt/struct.Error.html\" title=\"struct core::fmt::Error\">Error</a>&gt;</h4></section></summary><div class='docblock'>Formats the value using the given formatter. <a href=\"https://doc.rust-lang.org/1.83.0/core/fmt/trait.Debug.html#tymethod.fmt\">Read more</a></div></details></div></details>","Debug","hotshot_query_service::testing::mocks::MockMembership"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Hash-for-StaticCommittee%3CT%3E\" class=\"impl\"><a href=\"#impl-Hash-for-StaticCommittee%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/hash/trait.Hash.html\" title=\"trait core::hash::Hash\">Hash</a> for StaticCommittee&lt;T&gt;<div class=\"where\">where\n    T: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/hash/trait.Hash.html\" title=\"trait core::hash::Hash\">Hash</a> + NodeType,\n    &lt;T as NodeType&gt;::SignatureKey: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/hash/trait.Hash.html\" title=\"trait core::hash::Hash\">Hash</a>,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.hash\" class=\"method trait-impl\"><a href=\"#method.hash\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.83.0/core/hash/trait.Hash.html#tymethod.hash\" class=\"fn\">hash</a>&lt;__H&gt;(&amp;self, state: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.83.0/std/primitive.reference.html\">&amp;mut __H</a>)<div class=\"where\">where\n    __H: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/hash/trait.Hasher.html\" title=\"trait core::hash::Hasher\">Hasher</a>,</div></h4></section></summary><div class='docblock'>Feeds this value into the given <a href=\"https://doc.rust-lang.org/1.83.0/core/hash/trait.Hasher.html\" title=\"trait core::hash::Hasher\"><code>Hasher</code></a>. <a href=\"https://doc.rust-lang.org/1.83.0/core/hash/trait.Hash.html#tymethod.hash\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.hash_slice\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.3.0\">1.3.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/1.83.0/src/core/hash/mod.rs.html#235-237\">source</a></span><a href=\"#method.hash_slice\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.83.0/core/hash/trait.Hash.html#method.hash_slice\" class=\"fn\">hash_slice</a>&lt;H&gt;(data: &amp;[Self], state: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.83.0/std/primitive.reference.html\">&amp;mut H</a>)<div class=\"where\">where\n    H: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/hash/trait.Hasher.html\" title=\"trait core::hash::Hasher\">Hasher</a>,\n    Self: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/marker/trait.Sized.html\" title=\"trait core::marker::Sized\">Sized</a>,</div></h4></section></summary><div class='docblock'>Feeds a slice of this type into the given <a href=\"https://doc.rust-lang.org/1.83.0/core/hash/trait.Hasher.html\" title=\"trait core::hash::Hasher\"><code>Hasher</code></a>. <a href=\"https://doc.rust-lang.org/1.83.0/core/hash/trait.Hash.html#method.hash_slice\">Read more</a></div></details></div></details>","Hash","hotshot_query_service::testing::mocks::MockMembership"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Membership%3CTYPES%3E-for-StaticCommittee%3CTYPES%3E\" class=\"impl\"><a href=\"#impl-Membership%3CTYPES%3E-for-StaticCommittee%3CTYPES%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;TYPES&gt; Membership&lt;TYPES&gt; for StaticCommittee&lt;TYPES&gt;<div class=\"where\">where\n    TYPES: NodeType,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.new\" class=\"method trait-impl\"><a href=\"#method.new\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">new</a>(\n    committee_members: <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/alloc/vec/struct.Vec.html\" title=\"struct alloc::vec::Vec\">Vec</a>&lt;PeerConfig&lt;&lt;TYPES as NodeType&gt;::SignatureKey&gt;&gt;,\n    da_members: <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/alloc/vec/struct.Vec.html\" title=\"struct alloc::vec::Vec\">Vec</a>&lt;PeerConfig&lt;&lt;TYPES as NodeType&gt;::SignatureKey&gt;&gt;,\n) -&gt; StaticCommittee&lt;TYPES&gt;</h4></section></summary><div class=\"docblock\"><p>Create a new election</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.stake_table\" class=\"method trait-impl\"><a href=\"#method.stake_table\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">stake_table</a>(\n    &amp;self,\n    _epoch: <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;&lt;TYPES as NodeType&gt;::Epoch&gt;,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/alloc/vec/struct.Vec.html\" title=\"struct alloc::vec::Vec\">Vec</a>&lt;&lt;&lt;TYPES as NodeType&gt;::SignatureKey as SignatureKey&gt;::StakeTableEntry&gt;</h4></section></summary><div class=\"docblock\"><p>Get the stake table for the current view</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.da_stake_table\" class=\"method trait-impl\"><a href=\"#method.da_stake_table\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">da_stake_table</a>(\n    &amp;self,\n    _epoch: <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;&lt;TYPES as NodeType&gt;::Epoch&gt;,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/alloc/vec/struct.Vec.html\" title=\"struct alloc::vec::Vec\">Vec</a>&lt;&lt;&lt;TYPES as NodeType&gt;::SignatureKey as SignatureKey&gt;::StakeTableEntry&gt;</h4></section></summary><div class=\"docblock\"><p>Get the stake table for the current view</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.committee_members\" class=\"method trait-impl\"><a href=\"#method.committee_members\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">committee_members</a>(\n    &amp;self,\n    _view_number: &lt;TYPES as NodeType&gt;::View,\n    _epoch: <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;&lt;TYPES as NodeType&gt;::Epoch&gt;,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/alloc/collections/btree/set/struct.BTreeSet.html\" title=\"struct alloc::collections::btree::set::BTreeSet\">BTreeSet</a>&lt;&lt;TYPES as NodeType&gt;::SignatureKey&gt;</h4></section></summary><div class=\"docblock\"><p>Get all members of the committee for the current view</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.da_committee_members\" class=\"method trait-impl\"><a href=\"#method.da_committee_members\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">da_committee_members</a>(\n    &amp;self,\n    _view_number: &lt;TYPES as NodeType&gt;::View,\n    _epoch: <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;&lt;TYPES as NodeType&gt;::Epoch&gt;,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/alloc/collections/btree/set/struct.BTreeSet.html\" title=\"struct alloc::collections::btree::set::BTreeSet\">BTreeSet</a>&lt;&lt;TYPES as NodeType&gt;::SignatureKey&gt;</h4></section></summary><div class=\"docblock\"><p>Get all members of the committee for the current view</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.committee_leaders\" class=\"method trait-impl\"><a href=\"#method.committee_leaders\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">committee_leaders</a>(\n    &amp;self,\n    _view_number: &lt;TYPES as NodeType&gt;::View,\n    _epoch: <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;&lt;TYPES as NodeType&gt;::Epoch&gt;,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/alloc/collections/btree/set/struct.BTreeSet.html\" title=\"struct alloc::collections::btree::set::BTreeSet\">BTreeSet</a>&lt;&lt;TYPES as NodeType&gt;::SignatureKey&gt;</h4></section></summary><div class=\"docblock\"><p>Get all eligible leaders of the committee for the current view</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.stake\" class=\"method trait-impl\"><a href=\"#method.stake\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">stake</a>(\n    &amp;self,\n    pub_key: &amp;&lt;TYPES as NodeType&gt;::SignatureKey,\n    _epoch: <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;&lt;TYPES as NodeType&gt;::Epoch&gt;,\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;&lt;&lt;TYPES as NodeType&gt;::SignatureKey as SignatureKey&gt;::StakeTableEntry&gt;</h4></section></summary><div class=\"docblock\"><p>Get the stake table entry for a public key</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.da_stake\" class=\"method trait-impl\"><a href=\"#method.da_stake\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">da_stake</a>(\n    &amp;self,\n    pub_key: &amp;&lt;TYPES as NodeType&gt;::SignatureKey,\n    _epoch: <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;&lt;TYPES as NodeType&gt;::Epoch&gt;,\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;&lt;&lt;TYPES as NodeType&gt;::SignatureKey as SignatureKey&gt;::StakeTableEntry&gt;</h4></section></summary><div class=\"docblock\"><p>Get the DA stake table entry for a public key</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.has_stake\" class=\"method trait-impl\"><a href=\"#method.has_stake\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">has_stake</a>(\n    &amp;self,\n    pub_key: &amp;&lt;TYPES as NodeType&gt;::SignatureKey,\n    _epoch: <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;&lt;TYPES as NodeType&gt;::Epoch&gt;,\n) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.83.0/std/primitive.bool.html\">bool</a></h4></section></summary><div class=\"docblock\"><p>Check if a node has stake in the committee</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.has_da_stake\" class=\"method trait-impl\"><a href=\"#method.has_da_stake\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">has_da_stake</a>(\n    &amp;self,\n    pub_key: &amp;&lt;TYPES as NodeType&gt;::SignatureKey,\n    _epoch: <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;&lt;TYPES as NodeType&gt;::Epoch&gt;,\n) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.83.0/std/primitive.bool.html\">bool</a></h4></section></summary><div class=\"docblock\"><p>Check if a node has stake in the committee</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.lookup_leader\" class=\"method trait-impl\"><a href=\"#method.lookup_leader\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">lookup_leader</a>(\n    &amp;self,\n    view_number: &lt;TYPES as NodeType&gt;::View,\n    _epoch: <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;&lt;TYPES as NodeType&gt;::Epoch&gt;,\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;&lt;TYPES as NodeType&gt;::SignatureKey, Error&gt;</h4></section></summary><div class=\"docblock\"><p>Index the vector of public keys with the current view number</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.total_nodes\" class=\"method trait-impl\"><a href=\"#method.total_nodes\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">total_nodes</a>(&amp;self, _epoch: <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;&lt;TYPES as NodeType&gt;::Epoch&gt;) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.83.0/std/primitive.usize.html\">usize</a></h4></section></summary><div class=\"docblock\"><p>Get the total number of nodes in the committee</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.da_total_nodes\" class=\"method trait-impl\"><a href=\"#method.da_total_nodes\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">da_total_nodes</a>(&amp;self, _epoch: <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;&lt;TYPES as NodeType&gt;::Epoch&gt;) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.83.0/std/primitive.usize.html\">usize</a></h4></section></summary><div class=\"docblock\"><p>Get the total number of DA nodes in the committee</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.success_threshold\" class=\"method trait-impl\"><a href=\"#method.success_threshold\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">success_threshold</a>(\n    &amp;self,\n    _epoch: <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;&lt;TYPES as NodeType&gt;::Epoch&gt;,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/core/num/nonzero/struct.NonZero.html\" title=\"struct core::num::nonzero::NonZero\">NonZero</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.83.0/std/primitive.u64.html\">u64</a>&gt;</h4></section></summary><div class=\"docblock\"><p>Get the voting success threshold for the committee</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.da_success_threshold\" class=\"method trait-impl\"><a href=\"#method.da_success_threshold\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">da_success_threshold</a>(\n    &amp;self,\n    _epoch: <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;&lt;TYPES as NodeType&gt;::Epoch&gt;,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/core/num/nonzero/struct.NonZero.html\" title=\"struct core::num::nonzero::NonZero\">NonZero</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.83.0/std/primitive.u64.html\">u64</a>&gt;</h4></section></summary><div class=\"docblock\"><p>Get the voting success threshold for the committee</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.failure_threshold\" class=\"method trait-impl\"><a href=\"#method.failure_threshold\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">failure_threshold</a>(\n    &amp;self,\n    _epoch: <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;&lt;TYPES as NodeType&gt;::Epoch&gt;,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/core/num/nonzero/struct.NonZero.html\" title=\"struct core::num::nonzero::NonZero\">NonZero</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.83.0/std/primitive.u64.html\">u64</a>&gt;</h4></section></summary><div class=\"docblock\"><p>Get the voting failure threshold for the committee</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.upgrade_threshold\" class=\"method trait-impl\"><a href=\"#method.upgrade_threshold\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">upgrade_threshold</a>(\n    &amp;self,\n    _epoch: <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;&lt;TYPES as NodeType&gt;::Epoch&gt;,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/core/num/nonzero/struct.NonZero.html\" title=\"struct core::num::nonzero::NonZero\">NonZero</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.83.0/std/primitive.u64.html\">u64</a>&gt;</h4></section></summary><div class=\"docblock\"><p>Get the voting upgrade threshold for the committee</p>\n</div></details><details class=\"toggle\" open><summary><section id=\"associatedtype.Error\" class=\"associatedtype trait-impl\"><a href=\"#associatedtype.Error\" class=\"anchor\">§</a><h4 class=\"code-header\">type <a class=\"associatedtype\">Error</a> = Error</h4></section></summary><div class='docblock'>The error type returned by methods like <code>lookup_leader</code>.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.leader\" class=\"method trait-impl\"><a href=\"#method.leader\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">leader</a>(\n    &amp;self,\n    view: &lt;TYPES as NodeType&gt;::View,\n    epoch: <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;&lt;TYPES as NodeType&gt;::Epoch&gt;,\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;&lt;TYPES as NodeType&gt;::SignatureKey, Error&gt;</h4></section></summary><div class='docblock'>The leader of the committee for view <code>view_number</code> in <code>epoch</code>. <a>Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.add_epoch_root\" class=\"method trait-impl\"><a href=\"#method.add_epoch_root\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">add_epoch_root</a>&lt;'life0, 'async_trait&gt;(\n    &amp;'life0 self,\n    _epoch: &lt;TYPES as NodeType&gt;::Epoch,\n    _block_header: &lt;TYPES as NodeType&gt;::BlockHeader,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/ops/function/trait.FnOnce.html\" title=\"trait core::ops::function::FnOnce\">FnOnce</a>(&amp;mut Self) + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a>&gt;&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'async_trait&gt;&gt;<div class=\"where\">where\n    'life0: 'async_trait,\n    Self: 'async_trait,</div></h4></section></summary><div class='docblock'>Handles notifications that a new epoch root has been created\nIs called under a read lock to the Membership. Return a callback\nwith Some to have that callback invoked under a write lock. <a>Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.sync_l1\" class=\"method trait-impl\"><a href=\"#method.sync_l1\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">sync_l1</a>&lt;'life0, 'async_trait&gt;(\n    &amp;'life0 self,\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/core/pin/struct.Pin.html\" title=\"struct core::pin::Pin\">Pin</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/future/future/trait.Future.html\" title=\"trait core::future::future::Future\">Future</a>&lt;Output = <a class=\"enum\" href=\"https://doc.rust-lang.org/1.83.0/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;<a class=\"struct\" href=\"https://doc.rust-lang.org/1.83.0/alloc/boxed/struct.Box.html\" title=\"struct alloc::boxed::Box\">Box</a>&lt;dyn <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/ops/function/trait.FnOnce.html\" title=\"trait core::ops::function::FnOnce\">FnOnce</a>(&amp;mut Self) + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a>&gt;&gt;&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'async_trait&gt;&gt;<div class=\"where\">where\n    'life0: 'async_trait,\n    Self: 'async_trait,</div></h4></section></summary><div class='docblock'>Called after add_epoch_root runs and any callback has been invoked.\nCauses a read lock to be reacquired for this functionality.</div></details></div></details>","Membership<TYPES>","hotshot_query_service::testing::mocks::MockMembership"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-PartialEq-for-StaticCommittee%3CT%3E\" class=\"impl\"><a href=\"#impl-PartialEq-for-StaticCommittee%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/cmp/trait.PartialEq.html\" title=\"trait core::cmp::PartialEq\">PartialEq</a> for StaticCommittee&lt;T&gt;<div class=\"where\">where\n    T: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/cmp/trait.PartialEq.html\" title=\"trait core::cmp::PartialEq\">PartialEq</a> + NodeType,\n    &lt;T as NodeType&gt;::SignatureKey: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/cmp/trait.PartialEq.html\" title=\"trait core::cmp::PartialEq\">PartialEq</a>,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.eq\" class=\"method trait-impl\"><a href=\"#method.eq\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.83.0/core/cmp/trait.PartialEq.html#tymethod.eq\" class=\"fn\">eq</a>(&amp;self, other: &amp;StaticCommittee&lt;T&gt;) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.83.0/std/primitive.bool.html\">bool</a></h4></section></summary><div class='docblock'>Tests for <code>self</code> and <code>other</code> values to be equal, and is used by <code>==</code>.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.ne\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.0.0\">1.0.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/1.83.0/src/core/cmp.rs.html#261\">source</a></span><a href=\"#method.ne\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.83.0/core/cmp/trait.PartialEq.html#method.ne\" class=\"fn\">ne</a>(&amp;self, other: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.83.0/std/primitive.reference.html\">&amp;Rhs</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.83.0/std/primitive.bool.html\">bool</a></h4></section></summary><div class='docblock'>Tests for <code>!=</code>. The default implementation is almost always sufficient,\nand should not be overridden without very good reason.</div></details></div></details>","PartialEq","hotshot_query_service::testing::mocks::MockMembership"],["<section id=\"impl-Eq-for-StaticCommittee%3CT%3E\" class=\"impl\"><a href=\"#impl-Eq-for-StaticCommittee%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/cmp/trait.Eq.html\" title=\"trait core::cmp::Eq\">Eq</a> for StaticCommittee&lt;T&gt;<div class=\"where\">where\n    T: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/cmp/trait.Eq.html\" title=\"trait core::cmp::Eq\">Eq</a> + NodeType,\n    &lt;T as NodeType&gt;::SignatureKey: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/cmp/trait.Eq.html\" title=\"trait core::cmp::Eq\">Eq</a>,</div></h3></section>","Eq","hotshot_query_service::testing::mocks::MockMembership"],["<section id=\"impl-StructuralPartialEq-for-StaticCommittee%3CT%3E\" class=\"impl\"><a href=\"#impl-StructuralPartialEq-for-StaticCommittee%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.83.0/core/marker/trait.StructuralPartialEq.html\" title=\"trait core::marker::StructuralPartialEq\">StructuralPartialEq</a> for StaticCommittee&lt;T&gt;<div class=\"where\">where\n    T: NodeType,</div></h3></section>","StructuralPartialEq","hotshot_query_service::testing::mocks::MockMembership"]]]]);
    if (window.register_type_impls) {
        window.register_type_impls(type_impls);
    } else {
        window.pending_type_impls = type_impls;
    }
})()
//{"start":55,"fragment_lengths":[30220]}