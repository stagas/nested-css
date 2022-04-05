import { cssToJs } from '../src/css-to-js'

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

    expect(result).toEqual({
      color: 'magenta',

      ':root': {
        color: 'blue',
        background: 'green',
      },

      '.foo, .bar': {
        color: 'red',

        '&:hover': {
          color: 'yellow',
        },
      },

      'deep .selector:hover foo::after': {
        margin: '0 auto',

        '.deep': {
          '.nested': {
            '&:focus': {
              visibility: 'hidden',
            },
          },
        },

        content: '\'continues\'',
      },
    })
  })

  it('should not break on broken css prop', () => {
    const result = cssToJs(`
      color:
    `)
    expect(result).toEqual({ color: undefined })
  })

  it('should ignore string content', () => {
    const result = cssToJs(`
      content: ':;\\'"';
      color: blue;
      .other {
        content: ":;\\"'";
        color: blue;
      }
    `)
    expect(result).toEqual({
      content: '\':;\\\'"\'',
      color: 'blue',
      '.other': {
        content: '":;\\"\'"',
        color: 'blue',
      },
    })
  })

  it('should parse root &', () => {
    const result = cssToJs(`
      color: magenta;
      & {
        color: yellow;
        .another {
          color: blue;
        }
      }
    `)
    expect(result).toEqual({
      color: 'magenta',
      '&': { color: 'yellow', '.another': { color: 'blue' } },
    })
  })
})
