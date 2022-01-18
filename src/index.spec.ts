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

    expect(style).toBeInstanceOf(Function)

    expect(style('')).toEqual(`.some .nested{color:blue}
.some:hover{color:red}
#someid{background:yellow}`)
  })

  it('replace given host', () => {
    const style = css`
      color: red;
      & {
        color: blue;
        .another {
          color: yellow;
        }
      }
    `
    expect(style('foo')).toEqual(`foo{color:red}
foo{color:blue}
foo .another{color:yellow}`)
  })

  it('should compile complex nested css string', () => {
    const style = css`
      :host {
        color: magenta;
      }

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

    expect(style('')).toEqual(`\
:host{color:magenta}
:root{color:blue}
:root{background:green}
.foo,.bar{color:red}
.foo:hover,.bar:hover,.foo:focus,.bar:focus{color:yellow}
.foo:hover span,.bar:hover span,.foo:focus span,.bar:focus span{display:none}
deep .selector:hover foo::after{margin:0 auto}
deep .selector:hover foo::after .deep .nested:focus{visibility:hidden}
deep .selector:hover foo::after{content:'continues'}`)
  })
})
