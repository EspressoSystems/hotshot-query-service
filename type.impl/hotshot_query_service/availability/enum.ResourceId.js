(function() {var type_impls = {
"hotshot_query_service":[["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Clone-for-ResourceId%3CT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/hotshot_query_service/availability/data_source.rs.html#45-49\">source</a><a href=\"#impl-Clone-for-ResourceId%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: Committable&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.75.0/core/clone/trait.Clone.html\" title=\"trait core::clone::Clone\">Clone</a> for <a class=\"enum\" href=\"hotshot_query_service/availability/enum.ResourceId.html\" title=\"enum hotshot_query_service::availability::ResourceId\">ResourceId</a>&lt;T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.clone\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/hotshot_query_service/availability/data_source.rs.html#46-48\">source</a><a href=\"#method.clone\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.75.0/core/clone/trait.Clone.html#tymethod.clone\" class=\"fn\">clone</a>(&amp;self) -&gt; Self</h4></section></summary><div class='docblock'>Returns a copy of the value. <a href=\"https://doc.rust-lang.org/1.75.0/core/clone/trait.Clone.html#tymethod.clone\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.clone_from\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.0.0\">1.0.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/1.75.0/src/core/clone.rs.html#169\">source</a></span><a href=\"#method.clone_from\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.75.0/core/clone/trait.Clone.html#method.clone_from\" class=\"fn\">clone_from</a>(&amp;mut self, source: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.75.0/std/primitive.reference.html\">&amp;Self</a>)</h4></section></summary><div class='docblock'>Performs copy-assignment from <code>source</code>. <a href=\"https://doc.rust-lang.org/1.75.0/core/clone/trait.Clone.html#method.clone_from\">Read more</a></div></details></div></details>","Clone","hotshot_query_service::availability::data_source::BlockId","hotshot_query_service::availability::data_source::LeafId"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-PartialOrd-for-ResourceId%3CT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/hotshot_query_service/availability/data_source.rs.html#51-55\">source</a><a href=\"#impl-PartialOrd-for-ResourceId%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: Committable&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.75.0/core/cmp/trait.PartialOrd.html\" title=\"trait core::cmp::PartialOrd\">PartialOrd</a> for <a class=\"enum\" href=\"hotshot_query_service/availability/enum.ResourceId.html\" title=\"enum hotshot_query_service::availability::ResourceId\">ResourceId</a>&lt;T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.partial_cmp\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/hotshot_query_service/availability/data_source.rs.html#52-54\">source</a><a href=\"#method.partial_cmp\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.75.0/core/cmp/trait.PartialOrd.html#tymethod.partial_cmp\" class=\"fn\">partial_cmp</a>(&amp;self, other: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.75.0/std/primitive.reference.html\">&amp;Self</a>) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.75.0/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;<a class=\"enum\" href=\"https://doc.rust-lang.org/1.75.0/core/cmp/enum.Ordering.html\" title=\"enum core::cmp::Ordering\">Ordering</a>&gt;</h4></section></summary><div class='docblock'>This method returns an ordering between <code>self</code> and <code>other</code> values if one exists. <a href=\"https://doc.rust-lang.org/1.75.0/core/cmp/trait.PartialOrd.html#tymethod.partial_cmp\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.lt\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.0.0\">1.0.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/1.75.0/src/core/cmp.rs.html#1122\">source</a></span><a href=\"#method.lt\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.75.0/core/cmp/trait.PartialOrd.html#method.lt\" class=\"fn\">lt</a>(&amp;self, other: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.75.0/std/primitive.reference.html\">&amp;Rhs</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.75.0/std/primitive.bool.html\">bool</a></h4></section></summary><div class='docblock'>This method tests less than (for <code>self</code> and <code>other</code>) and is used by the <code>&lt;</code> operator. <a href=\"https://doc.rust-lang.org/1.75.0/core/cmp/trait.PartialOrd.html#method.lt\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.le\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.0.0\">1.0.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/1.75.0/src/core/cmp.rs.html#1139\">source</a></span><a href=\"#method.le\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.75.0/core/cmp/trait.PartialOrd.html#method.le\" class=\"fn\">le</a>(&amp;self, other: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.75.0/std/primitive.reference.html\">&amp;Rhs</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.75.0/std/primitive.bool.html\">bool</a></h4></section></summary><div class='docblock'>This method tests less than or equal to (for <code>self</code> and <code>other</code>) and is used by the <code>&lt;=</code>\noperator. <a href=\"https://doc.rust-lang.org/1.75.0/core/cmp/trait.PartialOrd.html#method.le\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.gt\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.0.0\">1.0.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/1.75.0/src/core/cmp.rs.html#1155\">source</a></span><a href=\"#method.gt\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.75.0/core/cmp/trait.PartialOrd.html#method.gt\" class=\"fn\">gt</a>(&amp;self, other: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.75.0/std/primitive.reference.html\">&amp;Rhs</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.75.0/std/primitive.bool.html\">bool</a></h4></section></summary><div class='docblock'>This method tests greater than (for <code>self</code> and <code>other</code>) and is used by the <code>&gt;</code> operator. <a href=\"https://doc.rust-lang.org/1.75.0/core/cmp/trait.PartialOrd.html#method.gt\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.ge\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.0.0\">1.0.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/1.75.0/src/core/cmp.rs.html#1172\">source</a></span><a href=\"#method.ge\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.75.0/core/cmp/trait.PartialOrd.html#method.ge\" class=\"fn\">ge</a>(&amp;self, other: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.75.0/std/primitive.reference.html\">&amp;Rhs</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.75.0/std/primitive.bool.html\">bool</a></h4></section></summary><div class='docblock'>This method tests greater than or equal to (for <code>self</code> and <code>other</code>) and is used by the <code>&gt;=</code>\noperator. <a href=\"https://doc.rust-lang.org/1.75.0/core/cmp/trait.PartialOrd.html#method.ge\">Read more</a></div></details></div></details>","PartialOrd","hotshot_query_service::availability::data_source::BlockId","hotshot_query_service::availability::data_source::LeafId"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Debug-for-ResourceId%3CT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/hotshot_query_service/availability/data_source.rs.html#29\">source</a><a href=\"#impl-Debug-for-ResourceId%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: Committable&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.75.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> for <a class=\"enum\" href=\"hotshot_query_service/availability/enum.ResourceId.html\" title=\"enum hotshot_query_service::availability::ResourceId\">ResourceId</a>&lt;T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.fmt\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/hotshot_query_service/availability/data_source.rs.html#29\">source</a><a href=\"#method.fmt\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.75.0/core/fmt/trait.Debug.html#tymethod.fmt\" class=\"fn\">fmt</a>(&amp;self, __f: &amp;mut <a class=\"struct\" href=\"https://doc.rust-lang.org/1.75.0/core/fmt/struct.Formatter.html\" title=\"struct core::fmt::Formatter\">Formatter</a>&lt;'_&gt;) -&gt; <a class=\"type\" href=\"https://doc.rust-lang.org/1.75.0/core/fmt/type.Result.html\" title=\"type core::fmt::Result\">Result</a></h4></section></summary><div class='docblock'>Formats the value using the given formatter. <a href=\"https://doc.rust-lang.org/1.75.0/core/fmt/trait.Debug.html#tymethod.fmt\">Read more</a></div></details></div></details>","Debug","hotshot_query_service::availability::data_source::BlockId","hotshot_query_service::availability::data_source::LeafId"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-From%3Cusize%3E-for-ResourceId%3CT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/hotshot_query_service/availability/data_source.rs.html#28\">source</a><a href=\"#impl-From%3Cusize%3E-for-ResourceId%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: Committable&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.75.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.75.0/std/primitive.usize.html\">usize</a>&gt; for <a class=\"enum\" href=\"hotshot_query_service/availability/enum.ResourceId.html\" title=\"enum hotshot_query_service::availability::ResourceId\">ResourceId</a>&lt;T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.from\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/hotshot_query_service/availability/data_source.rs.html#28\">source</a><a href=\"#method.from\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.75.0/core/convert/trait.From.html#tymethod.from\" class=\"fn\">from</a>(original: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.75.0/std/primitive.usize.html\">usize</a>) -&gt; <a class=\"enum\" href=\"hotshot_query_service/availability/enum.ResourceId.html\" title=\"enum hotshot_query_service::availability::ResourceId\">ResourceId</a>&lt;T&gt;</h4></section></summary><div class='docblock'>Converts to this type from the input type.</div></details></div></details>","From<usize>","hotshot_query_service::availability::data_source::BlockId","hotshot_query_service::availability::data_source::LeafId"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-PartialEq-for-ResourceId%3CT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/hotshot_query_service/availability/data_source.rs.html#28\">source</a><a href=\"#impl-PartialEq-for-ResourceId%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: Committable&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.75.0/core/cmp/trait.PartialEq.html\" title=\"trait core::cmp::PartialEq\">PartialEq</a> for <a class=\"enum\" href=\"hotshot_query_service/availability/enum.ResourceId.html\" title=\"enum hotshot_query_service::availability::ResourceId\">ResourceId</a>&lt;T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.eq\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/hotshot_query_service/availability/data_source.rs.html#28\">source</a><a href=\"#method.eq\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.75.0/core/cmp/trait.PartialEq.html#tymethod.eq\" class=\"fn\">eq</a>(&amp;self, other: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.75.0/std/primitive.reference.html\">&amp;Self</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.75.0/std/primitive.bool.html\">bool</a></h4></section></summary><div class='docblock'>This method tests for <code>self</code> and <code>other</code> values to be equal, and is used\nby <code>==</code>.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.ne\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.0.0\">1.0.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/1.75.0/src/core/cmp.rs.html#239\">source</a></span><a href=\"#method.ne\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.75.0/core/cmp/trait.PartialEq.html#method.ne\" class=\"fn\">ne</a>(&amp;self, other: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.75.0/std/primitive.reference.html\">&amp;Rhs</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.75.0/std/primitive.bool.html\">bool</a></h4></section></summary><div class='docblock'>This method tests for <code>!=</code>. The default implementation is almost always\nsufficient, and should not be overridden without very good reason.</div></details></div></details>","PartialEq","hotshot_query_service::availability::data_source::BlockId","hotshot_query_service::availability::data_source::LeafId"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Ord-for-ResourceId%3CT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/hotshot_query_service/availability/data_source.rs.html#28\">source</a><a href=\"#impl-Ord-for-ResourceId%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: Committable&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.75.0/core/cmp/trait.Ord.html\" title=\"trait core::cmp::Ord\">Ord</a> for <a class=\"enum\" href=\"hotshot_query_service/availability/enum.ResourceId.html\" title=\"enum hotshot_query_service::availability::ResourceId\">ResourceId</a>&lt;T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.cmp\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/hotshot_query_service/availability/data_source.rs.html#28\">source</a><a href=\"#method.cmp\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.75.0/core/cmp/trait.Ord.html#tymethod.cmp\" class=\"fn\">cmp</a>(&amp;self, other: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.75.0/std/primitive.reference.html\">&amp;Self</a>) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.75.0/core/cmp/enum.Ordering.html\" title=\"enum core::cmp::Ordering\">Ordering</a></h4></section></summary><div class='docblock'>This method returns an <a href=\"https://doc.rust-lang.org/1.75.0/core/cmp/enum.Ordering.html\" title=\"enum core::cmp::Ordering\"><code>Ordering</code></a> between <code>self</code> and <code>other</code>. <a href=\"https://doc.rust-lang.org/1.75.0/core/cmp/trait.Ord.html#tymethod.cmp\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.max\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.21.0\">1.21.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/1.75.0/src/core/cmp.rs.html#826-828\">source</a></span><a href=\"#method.max\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.75.0/core/cmp/trait.Ord.html#method.max\" class=\"fn\">max</a>(self, other: Self) -&gt; Self<span class=\"where fmt-newline\">where\n    Self: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.75.0/core/marker/trait.Sized.html\" title=\"trait core::marker::Sized\">Sized</a>,</span></h4></section></summary><div class='docblock'>Compares and returns the maximum of two values. <a href=\"https://doc.rust-lang.org/1.75.0/core/cmp/trait.Ord.html#method.max\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.min\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.21.0\">1.21.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/1.75.0/src/core/cmp.rs.html#846-848\">source</a></span><a href=\"#method.min\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.75.0/core/cmp/trait.Ord.html#method.min\" class=\"fn\">min</a>(self, other: Self) -&gt; Self<span class=\"where fmt-newline\">where\n    Self: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.75.0/core/marker/trait.Sized.html\" title=\"trait core::marker::Sized\">Sized</a>,</span></h4></section></summary><div class='docblock'>Compares and returns the minimum of two values. <a href=\"https://doc.rust-lang.org/1.75.0/core/cmp/trait.Ord.html#method.min\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.clamp\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.50.0\">1.50.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/1.75.0/src/core/cmp.rs.html#871-874\">source</a></span><a href=\"#method.clamp\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.75.0/core/cmp/trait.Ord.html#method.clamp\" class=\"fn\">clamp</a>(self, min: Self, max: Self) -&gt; Self<span class=\"where fmt-newline\">where\n    Self: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.75.0/core/marker/trait.Sized.html\" title=\"trait core::marker::Sized\">Sized</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.75.0/core/cmp/trait.PartialOrd.html\" title=\"trait core::cmp::PartialOrd\">PartialOrd</a>,</span></h4></section></summary><div class='docblock'>Restrict a value to a certain interval. <a href=\"https://doc.rust-lang.org/1.75.0/core/cmp/trait.Ord.html#method.clamp\">Read more</a></div></details></div></details>","Ord","hotshot_query_service::availability::data_source::BlockId","hotshot_query_service::availability::data_source::LeafId"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Display-for-ResourceId%3CT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/hotshot_query_service/availability/data_source.rs.html#28\">source</a><a href=\"#impl-Display-for-ResourceId%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: Committable&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.75.0/core/fmt/trait.Display.html\" title=\"trait core::fmt::Display\">Display</a> for <a class=\"enum\" href=\"hotshot_query_service/availability/enum.ResourceId.html\" title=\"enum hotshot_query_service::availability::ResourceId\">ResourceId</a>&lt;T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.fmt\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/hotshot_query_service/availability/data_source.rs.html#28\">source</a><a href=\"#method.fmt\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.75.0/core/fmt/trait.Display.html#tymethod.fmt\" class=\"fn\">fmt</a>(&amp;self, _derive_more_display_formatter: &amp;mut <a class=\"struct\" href=\"https://doc.rust-lang.org/1.75.0/core/fmt/struct.Formatter.html\" title=\"struct core::fmt::Formatter\">Formatter</a>&lt;'_&gt;) -&gt; <a class=\"type\" href=\"https://doc.rust-lang.org/1.75.0/core/fmt/type.Result.html\" title=\"type core::fmt::Result\">Result</a></h4></section></summary><div class='docblock'>Formats the value using the given formatter. <a href=\"https://doc.rust-lang.org/1.75.0/core/fmt/trait.Display.html#tymethod.fmt\">Read more</a></div></details></div></details>","Display","hotshot_query_service::availability::data_source::BlockId","hotshot_query_service::availability::data_source::LeafId"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Hash-for-ResourceId%3CT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/hotshot_query_service/availability/data_source.rs.html#28\">source</a><a href=\"#impl-Hash-for-ResourceId%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: Committable&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.75.0/core/hash/trait.Hash.html\" title=\"trait core::hash::Hash\">Hash</a> for <a class=\"enum\" href=\"hotshot_query_service/availability/enum.ResourceId.html\" title=\"enum hotshot_query_service::availability::ResourceId\">ResourceId</a>&lt;T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.hash\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/hotshot_query_service/availability/data_source.rs.html#28\">source</a><a href=\"#method.hash\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.75.0/core/hash/trait.Hash.html#tymethod.hash\" class=\"fn\">hash</a>&lt;__HT&gt;(&amp;self, __state: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.75.0/std/primitive.reference.html\">&amp;mut __HT</a>)<span class=\"where fmt-newline\">where\n    __HT: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.75.0/core/hash/trait.Hasher.html\" title=\"trait core::hash::Hasher\">Hasher</a>,</span></h4></section></summary><div class='docblock'>Feeds this value into the given <a href=\"https://doc.rust-lang.org/1.75.0/core/hash/trait.Hasher.html\" title=\"trait core::hash::Hasher\"><code>Hasher</code></a>. <a href=\"https://doc.rust-lang.org/1.75.0/core/hash/trait.Hash.html#tymethod.hash\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.hash_slice\" class=\"method trait-impl\"><span class=\"rightside\"><span class=\"since\" title=\"Stable since Rust version 1.3.0\">1.3.0</span> · <a class=\"src\" href=\"https://doc.rust-lang.org/1.75.0/src/core/hash/mod.rs.html#242-244\">source</a></span><a href=\"#method.hash_slice\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.75.0/core/hash/trait.Hash.html#method.hash_slice\" class=\"fn\">hash_slice</a>&lt;H&gt;(data: &amp;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.75.0/std/primitive.slice.html\">[Self]</a>, state: <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.75.0/std/primitive.reference.html\">&amp;mut H</a>)<span class=\"where fmt-newline\">where\n    H: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.75.0/core/hash/trait.Hasher.html\" title=\"trait core::hash::Hasher\">Hasher</a>,\n    Self: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.75.0/core/marker/trait.Sized.html\" title=\"trait core::marker::Sized\">Sized</a>,</span></h4></section></summary><div class='docblock'>Feeds a slice of this type into the given <a href=\"https://doc.rust-lang.org/1.75.0/core/hash/trait.Hasher.html\" title=\"trait core::hash::Hasher\"><code>Hasher</code></a>. <a href=\"https://doc.rust-lang.org/1.75.0/core/hash/trait.Hash.html#method.hash_slice\">Read more</a></div></details></div></details>","Hash","hotshot_query_service::availability::data_source::BlockId","hotshot_query_service::availability::data_source::LeafId"],["<section id=\"impl-Copy-for-ResourceId%3CT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/hotshot_query_service/availability/data_source.rs.html#28\">source</a><a href=\"#impl-Copy-for-ResourceId%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: Committable&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.75.0/core/marker/trait.Copy.html\" title=\"trait core::marker::Copy\">Copy</a> for <a class=\"enum\" href=\"hotshot_query_service/availability/enum.ResourceId.html\" title=\"enum hotshot_query_service::availability::ResourceId\">ResourceId</a>&lt;T&gt;</h3></section>","Copy","hotshot_query_service::availability::data_source::BlockId","hotshot_query_service::availability::data_source::LeafId"],["<section id=\"impl-Eq-for-ResourceId%3CT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/hotshot_query_service/availability/data_source.rs.html#28\">source</a><a href=\"#impl-Eq-for-ResourceId%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: Committable&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.75.0/core/cmp/trait.Eq.html\" title=\"trait core::cmp::Eq\">Eq</a> for <a class=\"enum\" href=\"hotshot_query_service/availability/enum.ResourceId.html\" title=\"enum hotshot_query_service::availability::ResourceId\">ResourceId</a>&lt;T&gt;</h3></section>","Eq","hotshot_query_service::availability::data_source::BlockId","hotshot_query_service::availability::data_source::LeafId"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-From%3CCommitment%3CT%3E%3E-for-ResourceId%3CT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/hotshot_query_service/availability/data_source.rs.html#28\">source</a><a href=\"#impl-From%3CCommitment%3CT%3E%3E-for-ResourceId%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: Committable&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.75.0/core/convert/trait.From.html\" title=\"trait core::convert::From\">From</a>&lt;Commitment&lt;T&gt;&gt; for <a class=\"enum\" href=\"hotshot_query_service/availability/enum.ResourceId.html\" title=\"enum hotshot_query_service::availability::ResourceId\">ResourceId</a>&lt;T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.from\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/hotshot_query_service/availability/data_source.rs.html#28\">source</a><a href=\"#method.from\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.75.0/core/convert/trait.From.html#tymethod.from\" class=\"fn\">from</a>(original: Commitment&lt;T&gt;) -&gt; <a class=\"enum\" href=\"hotshot_query_service/availability/enum.ResourceId.html\" title=\"enum hotshot_query_service::availability::ResourceId\">ResourceId</a>&lt;T&gt;</h4></section></summary><div class='docblock'>Converts to this type from the input type.</div></details></div></details>","From<Commitment<T>>","hotshot_query_service::availability::data_source::BlockId","hotshot_query_service::availability::data_source::LeafId"]]
};if (window.register_type_impls) {window.register_type_impls(type_impls);} else {window.pending_type_impls = type_impls;}})()