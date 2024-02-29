(function() {var type_impls = {
"hotshot_query_service":[["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Committable-for-TestBlockHeader\" class=\"impl\"><a href=\"#impl-Committable-for-TestBlockHeader\" class=\"anchor\">§</a><h3 class=\"code-header\">impl Committable for TestBlockHeader</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.commit\" class=\"method trait-impl\"><a href=\"#method.commit\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">commit</a>(&amp;self) -&gt; Commitment&lt;TestBlockHeader&gt;</h4></section></summary><div class='docblock'>Create a binding commitment to <code>self</code>.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.tag\" class=\"method trait-impl\"><a href=\"#method.tag\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">tag</a>() -&gt; <a class=\"struct\" href=\"https://doc.rust-lang.org/1.76.0/alloc/string/struct.String.html\" title=\"struct alloc::string::String\">String</a></h4></section></summary><div class='docblock'>Tag that should be used when serializing commitments to this type. <a>Read more</a></div></details></div></details>","Committable","hotshot_query_service::testing::mocks::MockHeader"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Clone-for-TestBlockHeader\" class=\"impl\"><a href=\"#impl-Clone-for-TestBlockHeader\" class=\"anchor\">§</a><h3 class=\"code-header\">impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> for TestBlockHeader</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.clone\" class=\"method trait-impl\"><a href=\"#method.clone\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.76.0/core/clone/trait.Clone.html#tymethod.clone\" class=\"fn\">clone</a>(&amp;self) -&gt; TestBlockHeader</h4></section></summary><div class='docblock'>Returns a copy of the value. <a href=\"https://doc.rust-lang.org/1.76.0/core/clone/trait.Clone.html#tymethod.clone\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.clone_from\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.0.0\">1.0.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/1.76.0/src/core/clone.rs.html#169\">source</a></span><a href=\"#method.clone_from\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.76.0/core/clone/trait.Clone.html#method.clone_from\" class=\"fn\">clone_from</a>(&amp;mut self, source: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.76.0/std/primitive.reference.html\">&amp;Self</a>)</h4></section></summary><div class='docblock'>Performs copy-assignment from <code>source</code>. <a href=\"https://doc.rust-lang.org/1.76.0/core/clone/trait.Clone.html#method.clone_from\">Read more</a></div></details></div></details>","Clone","hotshot_query_service::testing::mocks::MockHeader"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-BlockHeader%3CTYPES%3E-for-TestBlockHeader\" class=\"impl\"><a href=\"#impl-BlockHeader%3CTYPES%3E-for-TestBlockHeader\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;TYPES&gt; BlockHeader&lt;TYPES&gt; for TestBlockHeader<div class=\"where\">where\n    TYPES: NodeType&lt;BlockPayload = TestBlockPayload&gt;,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.new\" class=\"method trait-impl\"><a href=\"#method.new\" class=\"anchor\">§</a><h4 class=\"code-header\">async fn <a class=\"fn\">new</a>(\n    _parent_state: &amp;&lt;TYPES as NodeType&gt;::ValidatedState,\n    _instance_state: &amp;&lt;&lt;TYPES as NodeType&gt;::ValidatedState as ValidatedState&lt;TYPES&gt;&gt;::Instance,\n    parent_leaf: &amp;<a class=\"struct\" href=\"hotshot_query_service/struct.Leaf.html\" title=\"struct hotshot_query_service::Leaf\">Leaf</a>&lt;TYPES&gt;,\n    payload_commitment: &lt;VidSchemeType as VidScheme&gt;::Commit,\n    _metadata: &lt;&lt;TYPES as NodeType&gt;::BlockPayload as BlockPayload&gt;::Metadata\n) -&gt; TestBlockHeader</h4></section></summary><div class='docblock'>Build a header with the parent validate state, instance-level state, parent leaf, payload\ncommitment, and metadata.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.genesis\" class=\"method trait-impl\"><a href=\"#method.genesis\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">genesis</a>(\n    _instance_state: &amp;&lt;&lt;TYPES as NodeType&gt;::ValidatedState as ValidatedState&lt;TYPES&gt;&gt;::Instance,\n    payload_commitment: &lt;VidSchemeType as VidScheme&gt;::Commit,\n    _metadata: &lt;&lt;TYPES as NodeType&gt;::BlockPayload as BlockPayload&gt;::Metadata\n) -&gt; TestBlockHeader</h4></section></summary><div class='docblock'>Build the genesis header, payload, and metadata.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.block_number\" class=\"method trait-impl\"><a href=\"#method.block_number\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">block_number</a>(&amp;self) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.76.0/std/primitive.u64.html\">u64</a></h4></section></summary><div class='docblock'>Get the block number.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.payload_commitment\" class=\"method trait-impl\"><a href=\"#method.payload_commitment\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">payload_commitment</a>(&amp;self) -&gt; &lt;VidSchemeType as VidScheme&gt;::Commit</h4></section></summary><div class='docblock'>Get the payload commitment.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.metadata\" class=\"method trait-impl\"><a href=\"#method.metadata\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a class=\"fn\">metadata</a>(\n    &amp;self\n) -&gt; &amp;&lt;&lt;TYPES as NodeType&gt;::BlockPayload as BlockPayload&gt;::Metadata</h4></section></summary><div class='docblock'>Get the metadata.</div></details></div></details>","BlockHeader<TYPES>","hotshot_query_service::testing::mocks::MockHeader"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Hash-for-TestBlockHeader\" class=\"impl\"><a href=\"#impl-Hash-for-TestBlockHeader\" class=\"anchor\">§</a><h3 class=\"code-header\">impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/hash/trait.Hash.html\" title=\"trait core::hash::Hash\">Hash</a> for TestBlockHeader</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.hash\" class=\"method trait-impl\"><a href=\"#method.hash\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.76.0/core/hash/trait.Hash.html#tymethod.hash\" class=\"fn\">hash</a>&lt;__H&gt;(&amp;self, state: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.76.0/std/primitive.reference.html\">&amp;mut __H</a>)<div class=\"where\">where\n    __H: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/hash/trait.Hasher.html\" title=\"trait core::hash::Hasher\">Hasher</a>,</div></h4></section></summary><div class='docblock'>Feeds this value into the given <a href=\"https://doc.rust-lang.org/1.76.0/core/hash/trait.Hasher.html\" title=\"trait core::hash::Hasher\"><code>Hasher</code></a>. <a href=\"https://doc.rust-lang.org/1.76.0/core/hash/trait.Hash.html#tymethod.hash\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.hash_slice\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.3.0\">1.3.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/1.76.0/src/core/hash/mod.rs.html#238-240\">source</a></span><a href=\"#method.hash_slice\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.76.0/core/hash/trait.Hash.html#method.hash_slice\" class=\"fn\">hash_slice</a>&lt;H&gt;(data: &amp;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.76.0/std/primitive.slice.html\">[Self]</a>, state: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.76.0/std/primitive.reference.html\">&amp;mut H</a>)<div class=\"where\">where\n    H: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/hash/trait.Hasher.html\" title=\"trait core::hash::Hasher\">Hasher</a>,\n    Self: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/marker/trait.Sized.html\" title=\"trait core::marker::Sized\">Sized</a>,</div></h4></section></summary><div class='docblock'>Feeds a slice of this type into the given <a href=\"https://doc.rust-lang.org/1.76.0/core/hash/trait.Hasher.html\" title=\"trait core::hash::Hasher\"><code>Hasher</code></a>. <a href=\"https://doc.rust-lang.org/1.76.0/core/hash/trait.Hash.html#method.hash_slice\">Read more</a></div></details></div></details>","Hash","hotshot_query_service::testing::mocks::MockHeader"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Debug-for-TestBlockHeader\" class=\"impl\"><a href=\"#impl-Debug-for-TestBlockHeader\" class=\"anchor\">§</a><h3 class=\"code-header\">impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> for TestBlockHeader</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.fmt\" class=\"method trait-impl\"><a href=\"#method.fmt\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.76.0/core/fmt/trait.Debug.html#tymethod.fmt\" class=\"fn\">fmt</a>(&amp;self, f: &amp;mut <a class=\"struct\" href=\"https://doc.rust-lang.org/1.76.0/core/fmt/struct.Formatter.html\" title=\"struct core::fmt::Formatter\">Formatter</a>&lt;'_&gt;) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.76.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.76.0/std/primitive.unit.html\">()</a>, <a class=\"struct\" href=\"https://doc.rust-lang.org/1.76.0/core/fmt/struct.Error.html\" title=\"struct core::fmt::Error\">Error</a>&gt;</h4></section></summary><div class='docblock'>Formats the value using the given formatter. <a href=\"https://doc.rust-lang.org/1.76.0/core/fmt/trait.Debug.html#tymethod.fmt\">Read more</a></div></details></div></details>","Debug","hotshot_query_service::testing::mocks::MockHeader"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Deserialize%3C'de%3E-for-TestBlockHeader\" class=\"impl\"><a href=\"#impl-Deserialize%3C'de%3E-for-TestBlockHeader\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;'de&gt; <a class=\"trait\" href=\"https://docs.rs/serde/1.0.197/serde/de/trait.Deserialize.html\" title=\"trait serde::de::Deserialize\">Deserialize</a>&lt;'de&gt; for TestBlockHeader</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.deserialize\" class=\"method trait-impl\"><a href=\"#method.deserialize\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://docs.rs/serde/1.0.197/serde/de/trait.Deserialize.html#tymethod.deserialize\" class=\"fn\">deserialize</a>&lt;__D&gt;(\n    __deserializer: __D\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.76.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;TestBlockHeader, &lt;__D as <a class=\"trait\" href=\"https://docs.rs/serde/1.0.197/serde/de/trait.Deserializer.html\" title=\"trait serde::de::Deserializer\">Deserializer</a>&lt;'de&gt;&gt;::<a class=\"associatedtype\" href=\"https://docs.rs/serde/1.0.197/serde/de/trait.Deserializer.html#associatedtype.Error\" title=\"type serde::de::Deserializer::Error\">Error</a>&gt;<div class=\"where\">where\n    __D: <a class=\"trait\" href=\"https://docs.rs/serde/1.0.197/serde/de/trait.Deserializer.html\" title=\"trait serde::de::Deserializer\">Deserializer</a>&lt;'de&gt;,</div></h4></section></summary><div class='docblock'>Deserialize this value from the given Serde deserializer. <a href=\"https://docs.rs/serde/1.0.197/serde/de/trait.Deserialize.html#tymethod.deserialize\">Read more</a></div></details></div></details>","Deserialize<'de>","hotshot_query_service::testing::mocks::MockHeader"],["<section id=\"impl-StructuralEq-for-TestBlockHeader\" class=\"impl\"><a href=\"#impl-StructuralEq-for-TestBlockHeader\" class=\"anchor\">§</a><h3 class=\"code-header\">impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/marker/trait.StructuralEq.html\" title=\"trait core::marker::StructuralEq\">StructuralEq</a> for TestBlockHeader</h3></section>","StructuralEq","hotshot_query_service::testing::mocks::MockHeader"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Serialize-for-TestBlockHeader\" class=\"impl\"><a href=\"#impl-Serialize-for-TestBlockHeader\" class=\"anchor\">§</a><h3 class=\"code-header\">impl <a class=\"trait\" href=\"https://docs.rs/serde/1.0.197/serde/ser/trait.Serialize.html\" title=\"trait serde::ser::Serialize\">Serialize</a> for TestBlockHeader</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.serialize\" class=\"method trait-impl\"><a href=\"#method.serialize\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://docs.rs/serde/1.0.197/serde/ser/trait.Serialize.html#tymethod.serialize\" class=\"fn\">serialize</a>&lt;__S&gt;(\n    &amp;self,\n    __serializer: __S\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.76.0/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;&lt;__S as <a class=\"trait\" href=\"https://docs.rs/serde/1.0.197/serde/ser/trait.Serializer.html\" title=\"trait serde::ser::Serializer\">Serializer</a>&gt;::<a class=\"associatedtype\" href=\"https://docs.rs/serde/1.0.197/serde/ser/trait.Serializer.html#associatedtype.Ok\" title=\"type serde::ser::Serializer::Ok\">Ok</a>, &lt;__S as <a class=\"trait\" href=\"https://docs.rs/serde/1.0.197/serde/ser/trait.Serializer.html\" title=\"trait serde::ser::Serializer\">Serializer</a>&gt;::<a class=\"associatedtype\" href=\"https://docs.rs/serde/1.0.197/serde/ser/trait.Serializer.html#associatedtype.Error\" title=\"type serde::ser::Serializer::Error\">Error</a>&gt;<div class=\"where\">where\n    __S: <a class=\"trait\" href=\"https://docs.rs/serde/1.0.197/serde/ser/trait.Serializer.html\" title=\"trait serde::ser::Serializer\">Serializer</a>,</div></h4></section></summary><div class='docblock'>Serialize this value into the given Serde serializer. <a href=\"https://docs.rs/serde/1.0.197/serde/ser/trait.Serialize.html#tymethod.serialize\">Read more</a></div></details></div></details>","Serialize","hotshot_query_service::testing::mocks::MockHeader"],["<section id=\"impl-StructuralPartialEq-for-TestBlockHeader\" class=\"impl\"><a href=\"#impl-StructuralPartialEq-for-TestBlockHeader\" class=\"anchor\">§</a><h3 class=\"code-header\">impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/marker/trait.StructuralPartialEq.html\" title=\"trait core::marker::StructuralPartialEq\">StructuralPartialEq</a> for TestBlockHeader</h3></section>","StructuralPartialEq","hotshot_query_service::testing::mocks::MockHeader"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-PartialEq-for-TestBlockHeader\" class=\"impl\"><a href=\"#impl-PartialEq-for-TestBlockHeader\" class=\"anchor\">§</a><h3 class=\"code-header\">impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/cmp/trait.PartialEq.html\" title=\"trait core::cmp::PartialEq\">PartialEq</a> for TestBlockHeader</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.eq\" class=\"method trait-impl\"><a href=\"#method.eq\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.76.0/core/cmp/trait.PartialEq.html#tymethod.eq\" class=\"fn\">eq</a>(&amp;self, other: &amp;TestBlockHeader) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.76.0/std/primitive.bool.html\">bool</a></h4></section></summary><div class='docblock'>This method tests for <code>self</code> and <code>other</code> values to be equal, and is used\nby <code>==</code>.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.ne\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.0.0\">1.0.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/1.76.0/src/core/cmp.rs.html#242\">source</a></span><a href=\"#method.ne\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.76.0/core/cmp/trait.PartialEq.html#method.ne\" class=\"fn\">ne</a>(&amp;self, other: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.76.0/std/primitive.reference.html\">&amp;Rhs</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.76.0/std/primitive.bool.html\">bool</a></h4></section></summary><div class='docblock'>This method tests for <code>!=</code>. The default implementation is almost always\nsufficient, and should not be overridden without very good reason.</div></details></div></details>","PartialEq","hotshot_query_service::testing::mocks::MockHeader"],["<section id=\"impl-Eq-for-TestBlockHeader\" class=\"impl\"><a href=\"#impl-Eq-for-TestBlockHeader\" class=\"anchor\">§</a><h3 class=\"code-header\">impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.76.0/core/cmp/trait.Eq.html\" title=\"trait core::cmp::Eq\">Eq</a> for TestBlockHeader</h3></section>","Eq","hotshot_query_service::testing::mocks::MockHeader"]]
};if (window.register_type_impls) {window.register_type_impls(type_impls);} else {window.pending_type_impls = type_impls;}})()