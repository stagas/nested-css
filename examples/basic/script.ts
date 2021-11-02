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
