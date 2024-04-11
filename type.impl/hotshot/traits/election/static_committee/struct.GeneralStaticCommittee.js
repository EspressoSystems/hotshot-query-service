(function() {var type_impls = {
"hotshot_query_service":[["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-GeneralStaticCommittee%3CT,+PUBKEY%3E\" class=\"impl\"><a href=\"#impl-GeneralStaticCommittee%3CT,+PUBKEY%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T, PUBKEY&gt; GeneralStaticCommittee&lt;T, PUBKEY&gt;<div class=\"where\">where\n    PUBKEY: SignatureKey,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.new\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">new</a>(\n    _nodes: &amp;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.slice.html\">[PUBKEY]</a>,\n    nodes_with_stake: <a class=\"struct\" href=\"https://doc.rust-lang.org/1.77.1/alloc/vec/struct.Vec.html\" title=\"struct alloc::vec::Vec\">Vec</a>&lt;&lt;PUBKEY as SignatureKey&gt;::StakeTableEntry&gt;,\n    nodes_without_stake: <a class=\"struct\" href=\"https://doc.rust-lang.org/1.77.1/alloc/vec/struct.Vec.html\" title=\"struct alloc::vec::Vec\">Vec</a>&lt;PUBKEY&gt;,\n    fixed_leader_for_gpuvid: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.usize.html\">usize</a>\n) -&gt; GeneralStaticCommittee&lt;T, PUBKEY&gt;</h4></section></summary><div class=\"docblock\"><p>Creates a new dummy elector</p>\n</div></details></div></details>",0,"hotshot_query_service::testing::mocks::MockMembership"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-GeneralStaticCommittee%3CTYPES,+PUBKEY%3E\" class=\"impl\"><a href=\"#impl-GeneralStaticCommittee%3CTYPES,+PUBKEY%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;TYPES, PUBKEY&gt; GeneralStaticCommittee&lt;TYPES, PUBKEY&gt;<div class=\"where\">where\n    PUBKEY: SignatureKey + 'static,\n    TYPES: NodeType&lt;SignatureKey = PUBKEY, ElectionConfigType = StaticElectionConfig&gt;,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.non_staked_nodes_count\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">non_staked_nodes_count</a>(&amp;self) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.usize.html\">usize</a></h4></section></summary><div class=\"docblock\"><p>get the non-staked builder nodes</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.get_non_staked_nodes\" class=\"method\"><h4 class=\"code-header\">pub fn <a class=\"fn\">get_non_staked_nodes</a>(&amp;self) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.77.1/alloc/vec/struct.Vec.html\" title=\"struct alloc::vec::Vec\">Vec</a>&lt;PUBKEY&gt;</h4></section></summary><div class=\"docblock\"><p>get all the non-staked nodes</p>\n</div></details></div></details>",0,"hotshot_query_service::testing::mocks::MockMembership"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Hash-for-GeneralStaticCommittee%3CT,+PUBKEY%3E\" class=\"impl\"><a href=\"#impl-Hash-for-GeneralStaticCommittee%3CT,+PUBKEY%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T, PUBKEY&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/hash/trait.Hash.html\" title=\"trait core::hash::Hash\">Hash</a> for GeneralStaticCommittee&lt;T, PUBKEY&gt;<div class=\"where\">where\n    T: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/hash/trait.Hash.html\" title=\"trait core::hash::Hash\">Hash</a>,\n    PUBKEY: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/hash/trait.Hash.html\" title=\"trait core::hash::Hash\">Hash</a> + SignatureKey,\n    &lt;PUBKEY as SignatureKey&gt;::StakeTableEntry: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/hash/trait.Hash.html\" title=\"trait core::hash::Hash\">Hash</a>,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.hash\" class=\"method trait-impl\"><a href=\"#method.hash\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.77.1/core/hash/trait.Hash.html#tymethod.hash\" class=\"fn\">hash</a>&lt;__H&gt;(&amp;self, state: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.reference.html\">&amp;mut __H</a>)<div class=\"where\">where\n    __H: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/hash/trait.Hasher.html\" title=\"trait core::hash::Hasher\">Hasher</a>,</div></h4></section></summary><div class='docblock'>Feeds this value into the given <a href=\"https://doc.rust-lang.org/1.77.1/core/hash/trait.Hasher.html\" title=\"trait core::hash::Hasher\"><code>Hasher</code></a>. <a href=\"https://doc.rust-lang.org/1.77.1/core/hash/trait.Hash.html#tymethod.hash\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.hash_slice\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.3.0\">1.3.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/1.77.1/src/core/hash/mod.rs.html#238-240\">source</a></span><a href=\"#method.hash_slice\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.77.1/core/hash/trait.Hash.html#method.hash_slice\" class=\"fn\">hash_slice</a>&lt;H&gt;(data: &amp;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.slice.html\">[Self]</a>, state: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.reference.html\">&amp;mut H</a>)<div class=\"where\">where\n    H: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/hash/trait.Hasher.html\" title=\"trait core::hash::Hasher\">Hasher</a>,\n    Self: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/marker/trait.Sized.html\" title=\"trait core::marker::Sized\">Sized</a>,</div></h4></section></summary><div class='docblock'>Feeds a slice of this type into the given <a href=\"https://doc.rust-lang.org/1.77.1/core/hash/trait.Hasher.html\" title=\"trait core::hash::Hasher\"><code>Hasher</code></a>. <a href=\"https://doc.rust-lang.org/1.77.1/core/hash/trait.Hash.html#method.hash_slice\">Read more</a></div></details></div></details>","Hash","hotshot_query_service::testing::mocks::MockMembership"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Debug-for-GeneralStaticCommittee%3CT,+PUBKEY%3E\" class=\"impl\"><a href=\"#impl-Debug-for-GeneralStaticCommittee%3CT,+PUBKEY%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T, PUBKEY&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> for GeneralStaticCommittee&lt;T, PUBKEY&gt;<div class=\"where\">where\n    T: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a>,\n    PUBKEY: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> + SignatureKey,\n    &lt;PUBKEY as SignatureKey&gt;::StakeTableEntry: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a>,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.fmt\" class=\"method trait-impl\"><a href=\"#method.fmt\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.77.1/core/fmt/trait.Debug.html#tymethod.fmt\" class=\"fn\">fmt</a>(&amp;self, f: &amp;mut <a class=\"struct\" href=\"https://doc.rust-lang.org/1.77.1/core/fmt/struct.Formatter.html\" title=\"struct core::fmt::Formatter\">Formatter</a>&lt;'_&gt;) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.77.1/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.unit.html\">()</a>, <a class=\"struct\" href=\"https://doc.rust-lang.org/1.77.1/core/fmt/struct.Error.html\" title=\"struct core::fmt::Error\">Error</a>&gt;</h4></section></summary><div class='docblock'>Formats the value using the given formatter. <a href=\"https://doc.rust-lang.org/1.77.1/core/fmt/trait.Debug.html#tymethod.fmt\">Read more</a></div></details></div></details>","Debug","hotshot_query_service::testing::mocks::MockMembership"],["<section id=\"impl-StructuralPartialEq-for-GeneralStaticCommittee%3CT,+PUBKEY%3E\" class=\"impl\"><a href=\"#impl-StructuralPartialEq-for-GeneralStaticCommittee%3CT,+PUBKEY%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T, PUBKEY&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/marker/trait.StructuralPartialEq.html\" title=\"trait core::marker::StructuralPartialEq\">StructuralPartialEq</a> for GeneralStaticCommittee&lt;T, PUBKEY&gt;<div class=\"where\">where\n    PUBKEY: SignatureKey,</div></h3></section>","StructuralPartialEq","hotshot_query_service::testing::mocks::MockMembership"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-PartialEq-for-GeneralStaticCommittee%3CT,+PUBKEY%3E\" class=\"impl\"><a href=\"#impl-PartialEq-for-GeneralStaticCommittee%3CT,+PUBKEY%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T, PUBKEY&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/cmp/trait.PartialEq.html\" title=\"trait core::cmp::PartialEq\">PartialEq</a> for GeneralStaticCommittee&lt;T, PUBKEY&gt;<div class=\"where\">where\n    T: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/cmp/trait.PartialEq.html\" title=\"trait core::cmp::PartialEq\">PartialEq</a>,\n    PUBKEY: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/cmp/trait.PartialEq.html\" title=\"trait core::cmp::PartialEq\">PartialEq</a> + SignatureKey,\n    &lt;PUBKEY as SignatureKey&gt;::StakeTableEntry: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/cmp/trait.PartialEq.html\" title=\"trait core::cmp::PartialEq\">PartialEq</a>,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.eq\" class=\"method trait-impl\"><a href=\"#method.eq\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.77.1/core/cmp/trait.PartialEq.html#tymethod.eq\" class=\"fn\">eq</a>(&amp;self, other: &amp;GeneralStaticCommittee&lt;T, PUBKEY&gt;) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.bool.html\">bool</a></h4></section></summary><div class='docblock'>This method tests for <code>self</code> and <code>other</code> values to be equal, and is used\nby <code>==</code>.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.ne\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.0.0\">1.0.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/1.77.1/src/core/cmp.rs.html#242\">source</a></span><a href=\"#method.ne\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.77.1/core/cmp/trait.PartialEq.html#method.ne\" class=\"fn\">ne</a>(&amp;self, other: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.reference.html\">&amp;Rhs</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.bool.html\">bool</a></h4></section></summary><div class='docblock'>This method tests for <code>!=</code>. The default implementation is almost always\nsufficient, and should not be overridden without very good reason.</div></details></div></details>","PartialEq","hotshot_query_service::testing::mocks::MockMembership"],["<section id=\"impl-Eq-for-GeneralStaticCommittee%3CT,+PUBKEY%3E\" class=\"impl\"><a href=\"#impl-Eq-for-GeneralStaticCommittee%3CT,+PUBKEY%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T, PUBKEY&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/cmp/trait.Eq.html\" title=\"trait core::cmp::Eq\">Eq</a> for GeneralStaticCommittee&lt;T, PUBKEY&gt;<div class=\"where\">where\n    T: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/cmp/trait.Eq.html\" title=\"trait core::cmp::Eq\">Eq</a>,\n    PUBKEY: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/cmp/trait.Eq.html\" title=\"trait core::cmp::Eq\">Eq</a> + SignatureKey,\n    &lt;PUBKEY as SignatureKey&gt;::StakeTableEntry: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/cmp/trait.Eq.html\" title=\"trait core::cmp::Eq\">Eq</a>,</div></h3></section>","Eq","hotshot_query_service::testing::mocks::MockMembership"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Clone-for-GeneralStaticCommittee%3CT,+PUBKEY%3E\" class=\"impl\"><a href=\"#impl-Clone-for-GeneralStaticCommittee%3CT,+PUBKEY%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T, PUBKEY&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> for GeneralStaticCommittee&lt;T, PUBKEY&gt;<div class=\"where\">where\n    T: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a>,\n    PUBKEY: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> + SignatureKey,\n    &lt;PUBKEY as SignatureKey&gt;::StakeTableEntry: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a>,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.clone\" class=\"method trait-impl\"><a href=\"#method.clone\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.77.1/core/clone/trait.Clone.html#tymethod.clone\" class=\"fn\">clone</a>(&amp;self) -&gt; GeneralStaticCommittee&lt;T, PUBKEY&gt;</h4></section></summary><div class='docblock'>Returns a copy of the value. <a href=\"https://doc.rust-lang.org/1.77.1/core/clone/trait.Clone.html#tymethod.clone\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.clone_from\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.0.0\">1.0.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/1.77.1/src/core/clone.rs.html#169\">source</a></span><a href=\"#method.clone_from\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.77.1/core/clone/trait.Clone.html#method.clone_from\" class=\"fn\">clone_from</a>(&amp;mut self, source: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.reference.html\">&amp;Self</a>)</h4></section></summary><div class='docblock'>Performs copy-assignment from <code>source</code>. <a href=\"https://doc.rust-lang.org/1.77.1/core/clone/trait.Clone.html#method.clone_from\">Read more</a></div></details></div></details>","Clone","hotshot_query_service::testing::mocks::MockMembership"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Membership%3CTYPES%3E-for-GeneralStaticCommittee%3CTYPES,+PUBKEY%3E\" class=\"impl\"><a href=\"#impl-Membership%3CTYPES%3E-for-GeneralStaticCommittee%3CTYPES,+PUBKEY%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;TYPES, PUBKEY&gt; Membership&lt;TYPES&gt; for GeneralStaticCommittee&lt;TYPES, PUBKEY&gt;<div class=\"where\">where\n    PUBKEY: SignatureKey + 'static,\n    TYPES: NodeType&lt;SignatureKey = PUBKEY, ElectionConfigType = StaticElectionConfig&gt;,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.get_committee_qc_stake_table\" class=\"method trait-impl\"><a href=\"#method.get_committee_qc_stake_table\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">get_committee_qc_stake_table</a>(\n    &amp;self\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.77.1/alloc/vec/struct.Vec.html\" title=\"struct alloc::vec::Vec\">Vec</a>&lt;&lt;PUBKEY as SignatureKey&gt;::StakeTableEntry&gt;</h4></section></summary><div class=\"docblock\"><p>Clone the public key and corresponding stake table for current elected committee</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.get_leader\" class=\"method trait-impl\"><a href=\"#method.get_leader\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">get_leader</a>(&amp;self, view_number: &lt;TYPES as NodeType&gt;::Time) -&gt; PUBKEY</h4></section></summary><div class=\"docblock\"><p>Index the vector of public keys with the current view number</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.has_stake\" class=\"method trait-impl\"><a href=\"#method.has_stake\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">has_stake</a>(&amp;self, pub_key: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.reference.html\">&amp;PUBKEY</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.bool.html\">bool</a></h4></section></summary><div class='docblock'>Check if a key has stake</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.get_stake\" class=\"method trait-impl\"><a href=\"#method.get_stake\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">get_stake</a>(\n    &amp;self,\n    pub_key: &amp;&lt;TYPES as NodeType&gt;::SignatureKey\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.77.1/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;&lt;&lt;TYPES as NodeType&gt;::SignatureKey as SignatureKey&gt;::StakeTableEntry&gt;</h4></section></summary><div class='docblock'>Get the stake table entry for a public key, returns <code>None</code> if the\nkey is not in the table</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.default_election_config\" class=\"method trait-impl\"><a href=\"#method.default_election_config\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">default_election_config</a>(\n    num_nodes_with_stake: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.u64.html\">u64</a>,\n    num_nodes_without_stake: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.u64.html\">u64</a>\n) -&gt; &lt;TYPES as NodeType&gt;::ElectionConfigType</h4></section></summary><div class='docblock'>generate a default election configuration</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.create_election\" class=\"method trait-impl\"><a href=\"#method.create_election\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">create_election</a>(\n    entries: <a class=\"struct\" href=\"https://doc.rust-lang.org/1.77.1/alloc/vec/struct.Vec.html\" title=\"struct alloc::vec::Vec\">Vec</a>&lt;PeerConfig&lt;PUBKEY&gt;&gt;,\n    config: &lt;TYPES as NodeType&gt;::ElectionConfigType,\n    fixed_leader_for_gpuvid: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.usize.html\">usize</a>\n) -&gt; GeneralStaticCommittee&lt;TYPES, PUBKEY&gt;</h4></section></summary><div class='docblock'>create an election\nTODO may want to move this to a testableelection trait</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.total_nodes\" class=\"method trait-impl\"><a href=\"#method.total_nodes\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">total_nodes</a>(&amp;self) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.usize.html\">usize</a></h4></section></summary><div class='docblock'>Returns the number of total nodes in the committee</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.success_threshold\" class=\"method trait-impl\"><a href=\"#method.success_threshold\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">success_threshold</a>(&amp;self) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.77.1/core/num/nonzero/struct.NonZero.html\" title=\"struct core::num::nonzero::NonZero\">NonZero</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.u64.html\">u64</a>&gt;</h4></section></summary><div class='docblock'>Returns the threshold for a specific <code>Membership</code> implementation</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.failure_threshold\" class=\"method trait-impl\"><a href=\"#method.failure_threshold\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">failure_threshold</a>(&amp;self) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.77.1/core/num/nonzero/struct.NonZero.html\" title=\"struct core::num::nonzero::NonZero\">NonZero</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.u64.html\">u64</a>&gt;</h4></section></summary><div class='docblock'>Returns the threshold for a specific <code>Membership</code> implementation</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.upgrade_threshold\" class=\"method trait-impl\"><a href=\"#method.upgrade_threshold\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">upgrade_threshold</a>(&amp;self) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.77.1/core/num/nonzero/struct.NonZero.html\" title=\"struct core::num::nonzero::NonZero\">NonZero</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.u64.html\">u64</a>&gt;</h4></section></summary><div class='docblock'>Returns the threshold required to upgrade the network protocol</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.get_staked_committee\" class=\"method trait-impl\"><a href=\"#method.get_staked_committee\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">get_staked_committee</a>(\n    &amp;self,\n    _view_number: &lt;TYPES as NodeType&gt;::Time\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.77.1/alloc/collections/btree/set/struct.BTreeSet.html\" title=\"struct alloc::collections::btree::set::BTreeSet\">BTreeSet</a>&lt;&lt;TYPES as NodeType&gt;::SignatureKey&gt;</h4></section></summary><div class='docblock'>The staked members of the committee for view <code>view_number</code>.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.get_non_staked_committee\" class=\"method trait-impl\"><a href=\"#method.get_non_staked_committee\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">get_non_staked_committee</a>(\n    &amp;self,\n    _view_number: &lt;TYPES as NodeType&gt;::Time\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.77.1/alloc/collections/btree/set/struct.BTreeSet.html\" title=\"struct alloc::collections::btree::set::BTreeSet\">BTreeSet</a>&lt;&lt;TYPES as NodeType&gt;::SignatureKey&gt;</h4></section></summary><div class='docblock'>The non-staked members of the committee for view <code>view_number</code>.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.get_whole_committee\" class=\"method trait-impl\"><a href=\"#method.get_whole_committee\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">get_whole_committee</a>(\n    &amp;self,\n    view_number: &lt;TYPES as NodeType&gt;::Time\n) -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.77.1/alloc/collections/btree/set/struct.BTreeSet.html\" title=\"struct alloc::collections::btree::set::BTreeSet\">BTreeSet</a>&lt;&lt;TYPES as NodeType&gt;::SignatureKey&gt;</h4></section></summary><div class='docblock'>Get whole (staked + non-staked) committee for view <code>view_number</code>.</div></details></div></details>","Membership<TYPES>","hotshot_query_service::testing::mocks::MockMembership"]]
};if (window.register_type_impls) {window.register_type_impls(type_impls);} else {window.pending_type_impls = type_impls;}})()