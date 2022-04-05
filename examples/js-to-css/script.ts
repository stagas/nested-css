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
