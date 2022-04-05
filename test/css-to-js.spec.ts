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

  it('cascade', () => {
    const result = cssToJs(`
      .name {
        > span {
          color: var(--blue);
        }
        position: absolute;
      }
      .name {
        > span {
          background: red;
        }
        display: block;
      }
    `)
    expect(result).toEqual({
      '.name': {
        '> span': {
          color: 'var(--blue)',
          background: 'red',
        },
        position: 'absolute',
        display: 'block',
      },
    })
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

  it('comments in strings', () => {
    const result = cssToJs(`
      .short-text {
        font-style: italic;
        &:before {
          content: '/* ';
        }
        &:after {
          content: '*/ ';
        }
      }
    `)
    expect(result).toMatchSnapshot()
  })

  it('comments case 2', () => {
    const result = cssToJs(`
      .info {
        > .type {
          display: inline-block;
          padding: 0;
          vertical-align: top;
          /*&:before {
            content: ': ';
            color: var(--red);
          }*/
        }
      }
    `)
    expect(result).toMatchSnapshot()
  })

  it('case brackets', () => {
    const result = cssToJs(`
      &:after {
        content: ' {';
        color: var(--white);
      }
      &:before {
        content: ' }';
        color: var(--white);
      }
    `)
    expect(result).toMatchSnapshot()
  })
})
