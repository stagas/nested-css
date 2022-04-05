<h1 align="center">nested-css</h1>

<p align="center">
compile nested css rules
</p>

<p align="center">
   <a href="#Install">🔧 <strong>Install</strong></a>
 · <a href="#Examples">🧩 <strong>Examples</strong></a>
 · <a href="#API">📜 <strong>API docs</strong></a>
 · <a href="https://github.com/stagas/nested-css/releases">🔥 <strong>Releases</strong></a>
 · <a href="#Contribute">💪🏼 <strong>Contribute</strong></a>
 · <a href="https://github.com/stagas/nested-css/issues">🖐️ <strong>Help</strong></a>
</p>

---

## Install

```sh
$ npm i nested-css
```

## Examples

[`examples/basic/script.ts`](examples/basic/script.ts) :

```ts
import { css } from '../../src'

const style = css`
  background: #000;
  .foo {
    color: blue;
    &:hover {
      color: green;
    }
  }
`

console.log(style())
// =>
// :host{background:#000}
// .foo{color:blue}
// .foo:hover{color:green}

// with custom root selector
console.log(style('.my-button'))
// =>
// .my-button{background:#000}
// .foo{color:blue}
// .foo:hover{color:green}

// with substitution
console.log(style(null, new Map([['foo', 'bar']])))
// =>
// .my-button{background:#000}
// .bar{color:blue}
// .bar:hover{color:green}
```

[`examples/css-to-js/script.ts`](examples/css-to-js/script.ts) :

```ts
import { cssToJs } from '../../src'

const style = cssToJs(`
  background: #000;
  .foo {
    color: blue;
    &:hover {
      color: green;
    }
  }
`)

console.log(style)
/* =>

{
  "background": "#000",
  ".foo": {
    "color": "blue",
    "&:hover": {
      "color": "green"
    }
  }
}

*/
```

[`examples/js-to-css/script.ts`](examples/js-to-css/script.ts) :

```ts
import { jsToCss } from '../../src'

const rules = {
  background: '#000',
  '.foo': {
    color: 'blue',
    '&:hover': {
      color: 'green',
    },
  },
}

const style = jsToCss(rules)

console.log(style)
/* =>
:host{background:#000}
.foo{color:blue}
.foo:hover{color:green}
*/

// with custom root selector
console.log(jsToCss(rules, '.my-button'))
// =>
// .my-button{background:#000}
// .foo{color:blue}
// .foo:hover{color:green}

// with substitution
console.log(jsToCss(rules, null, new Map([['foo', 'bar']])))
// =>
// .my-button{background:#000}
// .bar{color:blue}
// .bar:hover{color:green}
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

- [cssToJs](#csstojs)
  - [Parameters](#parameters)
- [NestedCSSCompiler](#nestedcsscompiler)
- [css](#css)
  - [Parameters](#parameters-1)
- [jsToCss](#jstocss)
  - [Parameters](#parameters-2)
- [NestedCSSDeclaration](#nestedcssdeclaration)
- [joinPartsWithValues](#joinpartswithvalues)
  - [Parameters](#parameters-3)
- [kebabCase](#kebabcase)
  - [Parameters](#parameters-4)

### cssToJs

[src/css-to-js.ts:21-57](https://github.com/stagas/nested-css/blob/bbbacfde0f07b9cfa48f5341412637d0d666673b/src/css-to-js.ts#L21-L57 "Source code on GitHub")

Convert a CSS string to a [NestedCSSDeclaration](#nestedcssdeclaration).

#### Parameters

- `input` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;

### NestedCSSCompiler

[src/index.ts:10-15](https://github.com/stagas/nested-css/blob/bbbacfde0f07b9cfa48f5341412637d0d666673b/src/index.ts#L7-L9 "Source code on GitHub")

Compile to CSS passing parameters to [jsToCss](#jstocss).

Type: any

### css

[src/index.ts:23-34](https://github.com/stagas/nested-css/blob/bbbacfde0f07b9cfa48f5341412637d0d666673b/src/index.ts#L23-L34 "Source code on GitHub")

Factory a [NestedCSSCompiler](#nestedcsscompiler) for the given string.

#### Parameters

- `parts` **TemplateStringsArray**&#x20;
- `values` **...[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)\<any>**&#x20;

Returns **[NestedCSSCompiler](#nestedcsscompiler)**&#x20;

### jsToCss

[src/js-to-css.ts:44-92](https://github.com/stagas/nested-css/blob/bbbacfde0f07b9cfa48f5341412637d0d666673b/src/js-to-css.ts#L44-L92 "Source code on GitHub")

Compile a JS nested rules [NestedCSSDeclaration](#nestedcssdeclaration) to a CSS string.

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

#### Parameters

- `rules` **[NestedCSSDeclaration](#nestedcssdeclaration)** Rules object
- `rootSelector` **([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | null | [undefined](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined))?** Top level rules will use this selector
- `aliasMap` **[Map](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>?** Alias identifiers (i.e for `.foo` to become `.bar`
  you will need a `foo=bar` entry)

Returns **any** The compiled CSS string

### NestedCSSDeclaration

[src/types.ts:6-8](https://github.com/stagas/nested-css/blob/bbbacfde0f07b9cfa48f5341412637d0d666673b/src/types.ts#L3-L5 "Source code on GitHub")

Nested CSS rules.

Type: any

### joinPartsWithValues

[src/util.ts:7-15](https://github.com/stagas/nested-css/blob/bbbacfde0f07b9cfa48f5341412637d0d666673b/src/util.ts#L7-L15 "Source code on GitHub")

Joins parts with values

#### Parameters

- `parts` **TemplateStringsArray**&#x20;
- `values` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)\<any>**&#x20;

### kebabCase

[src/util.ts:22-24](https://github.com/stagas/nested-css/blob/bbbacfde0f07b9cfa48f5341412637d0d666673b/src/util.ts#L22-L24 "Source code on GitHub")

Convert string to kebab-case.

#### Parameters

- `s` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** PascalCase or camelCase string

## Contribute

[Fork](https://github.com/stagas/nested-css/fork) or
[edit](https://github.dev/stagas/nested-css) and submit a PR.

All contributions are welcome!

## License

MIT © 2021
[stagas](https://github.com/stagas)
