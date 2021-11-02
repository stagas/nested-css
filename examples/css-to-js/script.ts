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
