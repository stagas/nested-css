<h1>
nested-css <a href="https://npmjs.org/package/nested-css"><img src="https://img.shields.io/badge/npm-v3.0.7-F00.svg?colorA=000"/></a> <a href="src"><img src="https://img.shields.io/badge/loc-129-FFF.svg?colorA=000"/></a> <a href="https://cdn.jsdelivr.net/npm/nested-css@3.0.7/dist/nested-css.min.js"><img src="https://img.shields.io/badge/brotli-1.1K-333.svg?colorA=000"/></a> <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-F0B.svg?colorA=000"/></a>
</h1>

<p></p>

compile nested css rules

<h4>
<table><tr><td title="Triple click to select and copy paste">
<code>npm i nested-css </code>
</td><td title="Triple click to select and copy paste">
<code>pnpm add nested-css </code>
</td><td title="Triple click to select and copy paste">
<code>yarn add nested-css</code>
</td></tr></table>
</h4>

## API

<p>  <details id="NestedCSSCompiler$5" title="TypeAlias" ><summary><span><a href="#NestedCSSCompiler$5">#</a></span>  <code><strong>NestedCSSCompiler</strong></code>     &ndash; Compile to CSS passing parameters to {@link jsToCss}.</summary>  <a href="src/index.ts#L10">src/index.ts#L10</a>  <ul><p><details id="__type$6" title="Function" ><summary><span><a href="#__type$6">#</a></span>  <em>(rootSelector, aliasMap)</em>    </summary>    <ul>    <p>    <details id="rootSelector$8" title="Parameter" ><summary><span><a href="#rootSelector$8">#</a></span>  <code><strong>rootSelector</strong></code>    </summary>    <ul><p>string</p>        </ul></details><details id="aliasMap$9" title="Parameter" ><summary><span><a href="#aliasMap$9">#</a></span>  <code><strong>aliasMap</strong></code>    </summary>    <ul><p><span>Map</span>&lt;string, string&gt;</p>        </ul></details>  <p><strong></strong><em>(rootSelector, aliasMap)</em>  &nbsp;=&gt;  <ul>string</ul></p></p>    </ul></details> &amp; {<p>  <details id="valueOf$11" title="Property" ><summary><span><a href="#valueOf$11">#</a></span>  <code><strong>valueOf</strong></code>    </summary>  <a href="src/index.ts#L15">src/index.ts#L15</a>  <ul><p><a href="#NestedCSSCompiler$5">NestedCSSCompiler</a></p>        </ul></details></p>}</p>        </ul></details><details id="NestedCSSDeclaration$12" title="TypeAlias" ><summary><span><a href="#NestedCSSDeclaration$12">#</a></span>  <code><strong>NestedCSSDeclaration</strong></code>     &ndash; Nested CSS rules.</summary>  <a href="src/types.ts#L6">src/types.ts#L6</a>  <ul><p><span>Partial</span>&lt;<span>CSSStyleDeclaration</span>&gt; &amp; {}</p>        </ul></details><details id="css$1" title="Function" ><summary><span><a href="#css$1">#</a></span>  <code><strong>css</strong></code><em>(parts, values)</em>     &ndash; Factory a {@link NestedCSSCompiler} for the given string.</summary>  <a href="src/index.ts#L23">src/index.ts#L23</a>  <ul>    <p>    <details id="parts$3" title="Parameter" ><summary><span><a href="#parts$3">#</a></span>  <code><strong>parts</strong></code>    </summary>    <ul><p><span>TemplateStringsArray</span></p>        </ul></details><details id="values$4" title="Parameter" ><summary><span><a href="#values$4">#</a></span>  <code><strong>values</strong></code>     &ndash;
</summary>    <ul><p>unknown  []</p>        </ul></details>  <p><strong>css</strong><em>(parts, values)</em>  &nbsp;=&gt;  <ul><a href="#NestedCSSCompiler$5">NestedCSSCompiler</a></ul></p></p>    </ul></details><details id="cssToJs$16" title="Function" ><summary><span><a href="#cssToJs$16">#</a></span>  <code><strong>cssToJs</strong></code><em>(input)</em>     &ndash; Convert a CSS string to a {@link NestedCSSDeclaration}.</summary>  <a href="src/css-to-js.ts#L21">src/css-to-js.ts#L21</a>  <ul>    <p>    <details id="input$18" title="Parameter" ><summary><span><a href="#input$18">#</a></span>  <code><strong>input</strong></code>     &ndash;
</summary>    <ul><p>string</p>        </ul></details>  <p><strong>cssToJs</strong><em>(input)</em>  &nbsp;=&gt;  <ul><span>Partial</span>&lt;<span>CSSStyleDeclaration</span>&gt;</ul></p></p>    </ul></details><details id="jsToCss$19" title="Function" ><summary><span><a href="#jsToCss$19">#</a></span>  <code><strong>jsToCss</strong></code><em>(rules, rootSelector, aliasMap)</em>     &ndash; Compile a JS nested rules {@link NestedCSSDeclaration} to a CSS string.</summary>  <a href="src/js-to-css.ts#L44">src/js-to-css.ts#L44</a>  <ul>    <p>  <p>

Examples:

```ts
jsToCss({ '.foo': { color: 'blue' } })
// => .foo{color:blue}

// custom root
jsToCss({ color: 'red' }, '.my-button')
// => .my-button{color:red}

// with substitution
jsToCss({ '.foo': { color: 'blue' } }, null, new Map([['foo', 'bar']]))
// => .bar{color:blue}
```

</p>
  <details id="rules$21" title="Parameter" ><summary><span><a href="#rules$21">#</a></span>  <code><strong>rules</strong></code>     &ndash; Rules object</summary>    <ul><p><span>Partial</span>&lt;<span>CSSStyleDeclaration</span>&gt;</p>        </ul></details><details id="rootSelector$22" title="Parameter" ><summary><span><a href="#rootSelector$22">#</a></span>  <code><strong>rootSelector</strong></code>     &ndash; Top level rules will use this selector</summary>    <ul><p><code>null</code> | string</p>        </ul></details><details id="aliasMap$23" title="Parameter" ><summary><span><a href="#aliasMap$23">#</a></span>  <code><strong>aliasMap</strong></code>     &ndash; Alias identifiers (i.e for <code>.foo</code> to become <code>.bar</code>
you will need a <code>foo=bar</code> entry)</summary>    <ul><p><span>Map</span>&lt;string, string&gt;</p>        </ul></details>  <p><strong>jsToCss</strong><em>(rules, rootSelector, aliasMap)</em>  &nbsp;=&gt;  <ul>string</ul></p></p>    </ul></details></p>

## Credits

- [tokenizer-next](https://npmjs.org/package/tokenizer-next) by [stagas](https://github.com/stagas) &ndash; iterator based tokenizer for writing parsers

## Contributing

[Fork](https://github.com/stagas/nested-css/fork) or [edit](https://github.dev/stagas/nested-css) and submit a PR.

All contributions are welcome!

## License

<a href="LICENSE">MIT</a> &copy; 2022 [stagas](https://github.com/stagas)
