import { expect } from '@esm-bundle/chai'
import { cssToJs } from './css-to-js'

describe('css to js', () => {
  it('should parse css to js object', () => {
    const result = cssToJs(`
      color: magenta;

      :root {
        color: blue;
        background: green;
        /* comment */
      }
      /* comment */
      .foo,
      .bar {
        color : red;

        &:hover {
          color: yellow;
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
    `)

    expect(result).to.deep.equal({
      color: 'magenta',

      ':root': {
        color: 'blue',
        background: 'green'
      },

      '.foo, .bar': {
        color: 'red',

        '&:hover': {
          color: 'yellow'
        }
      },

      'deep .selector:hover foo::after': {
        margin: '0 auto',

        '.deep': {
          '.nested': {
            '&:focus': {
              visibility: 'hidden'
            }
          }
        },

        content: "'continues'"
      }
    })
  })

  it('should not break on broken css prop', () => {
    const result = cssToJs(`
      color:
    `)
    expect(result).to.deep.equal({
      color: undefined
    })
  })
})
