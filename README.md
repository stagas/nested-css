<h1 align="center">nested-css</h1>

<p align="center">
compile nested css rules
</p>

<p align="center">
   <a href="#Install">🔧 <strong>Install</strong></a>
 · <a href="#Examples">🧩 <strong>Examples</strong></a>
 · <a href="docs">📜 <strong>API docs</strong></a>
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

`examples/basic/script.ts` :

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

`examples/css-to-js/script.ts` :

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

`examples/js-to-css/script.ts` :

```ts
import { jsToCss } from '../../src'

const rules = {
  background: '#000',
  '.foo': {
    color: 'blue',
    '&:hover': {
      color: 'green'
    }
  }
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

## Contribute

[Fork](https://github.com/stagas/nested-css/fork) or
[edit](https://github.dev/stagas/nested-css) and submit a PR.

All contributions are welcome!

## License

MIT &copy; 2021
[stagas](https://github.com/stagas)
