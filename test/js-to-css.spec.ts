import { jsToCss } from '../src/js-to-css'

describe('jsToCss', () => {
  it('should create style', () => {
    const css = jsToCss({ color: 'blue' }, ':host')
    expect(css).toEqual(':host{color:blue}')
  })

  it('should create style with custom host', () => {
    const css = jsToCss({ color: 'blue' }, 'somehost')
    expect(css).toEqual('somehost{color:blue}')
  })

  it('should remap root & to custom host', () => {
    const css = jsToCss({ color: 'blue', '&': { color: 'yellow' } }, 'somehost')
    expect(css).toEqual('somehost{color:blue}\nsomehost{color:yellow}')
  })

  it('should remap root & when secondary', () => {
    const css = jsToCss({ color: 'blue', '.tree, &.tree': { color: 'yellow' } }, 'somehost')
    expect(css).toEqual('somehost{color:blue}\nsomehost .tree,somehost.tree{color:yellow}')
  })

  it('should remap descendants of & to custom host', () => {
    const css = jsToCss(
      { color: 'blue', '&': { color: 'yellow', '.child': { color: 'red' } } },
      'somehost'
    )
    expect(css).toEqual('somehost{color:blue}\nsomehost{color:yellow}\nsomehost .child{color:red}')
  })

  it('should assign everything under the custom host', () => {
    const css = jsToCss(
      { color: 'blue', '.child': { color: 'red' }, '>': { button: { color: 'blue' } } },
      'somehost'
    )
    expect(css).toEqual(
      'somehost{color:blue}\nsomehost .child{color:red}\nsomehost > button{color:blue}'
    )
  })

  it('should create media style', () => {
    const css = jsToCss({
      '@media screen and (min-width: 400px)': {
        h1: {
          fontSize: '50px',
        },
      },
    })
    expect(css).toEqual('@media screen and (min-width: 400px){h1{font-size:50px}}')
  })

  it('should create complex style', () => {
    const css = jsToCss(
      {
        '.foo, .bar': {
          color: 'red',

          '&:hover': {
            color: 'yellow',
          },
        },
      },
      ':host'
    )
    expect(css).toEqual(`:host .foo,:host .bar{color:red}
:host .foo:hover,:host .bar:hover{color:yellow}`)
  })

  it('should create another complex style', () => {
    const css = jsToCss({
      'deep .selector:hover foo::after': {
        margin: '0 auto',

        '.deep': {
          '.nested': {
            '&:focus': {
              visibility: 'hidden',
            },
          },
        },

        content: "'continues'",
      },
    })
    expect(css).toEqual(`deep .selector:hover foo::after{margin:0 auto}
deep .selector:hover foo::after .deep .nested:focus{visibility:hidden}
deep .selector:hover foo::after{content:'continues'}`)
  })

  it('should remap targets', () => {
    const css = jsToCss({ Foo: { color: 'blue' } }, null, new Map([['Foo', 'bar']]))
    expect(css).toEqual('bar{color:blue}')
  })

  it('should remap tag names', () => {
    const css = jsToCss({ foo: { color: 'blue' } }, null, new Map([['foo', 'bar']]))
    expect(css).toContain(`bar{color:blue}`)
  })

  it('should remap nested tag names', () => {
    const css = jsToCss(
      { foo: { '&:hover': { color: 'blue' }, '#another': { color: 'red' } } },
      null,
      new Map([['foo', 'bar']])
    )
    expect(css).toContain(`bar:hover{color:blue}`)
  })

  it('should remap nested tag names with hyphens', () => {
    const css = jsToCss(
      { 'foo-x': { '&:hover': { color: 'blue' } } },
      null,
      new Map([['foo-x', 'bar-y']])
    )
    expect(css).toContain(`bar-y:hover{color:blue}`)
  })
})
