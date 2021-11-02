import { expect } from '@esm-bundle/chai'
import { css } from './'

describe('css', () => {
  it('should compile a nested css string to css', () => {
    const style = css`
      .some {
        .nested {
          color: blue;
        }
        &:hover {
          color: red;
        }
      }

      #someid {
        background: yellow;
      }
    `

    expect(style).to.be.a('function')

    expect(style()).to.equal(`.some .nested{color:blue}
.some:hover{color:red}
#someid{background:yellow}`)
  })

  it('should compile complex nested css string', () => {
    const style = css`
      color: magenta;

      :root {
        color: blue;
        background: green;
        /* comment */
      }
      /* comment */
      .foo,
      .bar {
        color: red;

        &:hover,
        &:focus {
          color: yellow;

          span {
            display: none; /* comment */
          }
        }
      }
      deep .selector:hover foo::after {
        margin: 0 auto;

        .deep {
          .nested {
            &:focus {
              visibility: hidden;
            }
          }
        }

        content: 'continues';
      }
    `

    expect(style()).to.equal(`\
:host{color:magenta}
:root{color:blue}
:root{background:green}
.foo, .bar{color:red}
.foo:hover, .foo:focus, .bar:hover, .bar:focus{color:yellow}
.foo:hover span, .foo:focus span, .bar:hover span, .bar:focus span{display:none}
deep .selector:hover foo::after{margin:0 auto}
deep .selector:hover foo::after .deep .nested:focus{visibility:hidden}
deep .selector:hover foo::after{content:'continues'}`)
  })
})
