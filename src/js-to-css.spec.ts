import { expect } from '@esm-bundle/chai'
import { jsToCss } from './js-to-css'

describe('jsToCss', () => {
  it('should create style', () => {
    const css = jsToCss({ color: 'blue' })
    expect(css).to.equal(':host{color:blue}')
  })

  it('should create style with custom host', () => {
    const css = jsToCss({ color: 'blue' }, null)
    expect(css).to.equal(':host{color:blue}')
  })

  it('should create style with media', () => {
    const css = jsToCss({
      '@media screen and (min-width: 400px)': {
        h1: {
          fontSize: '50px'
        }
      }
    })
    expect(css).to.equal(
      '@media screen and (min-width: 400px){ h1{font-size:50px}}'
    )
  })

  it('should create complex style', () => {
    const css = jsToCss(
      {
        '.foo, .bar': {
          color: 'red',

          '&:hover': {
            color: 'yellow'
          }
        }
      },
      ':host'
    )
    expect(css).to.equal(`.foo, .bar{color:red}
.foo:hover, .bar:hover{color:yellow}`)
  })

  it('should create another complex style', () => {
    const css = jsToCss({
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
    expect(css).to.equal(`deep .selector:hover foo::after{margin:0 auto}
deep .selector:hover foo::after .deep .nested:focus{visibility:hidden}
deep .selector:hover foo::after{content:'continues'}`)
  })

  it('should remap targets', () => {
    const css = jsToCss(
      { Foo: { color: 'blue' } },
      null,
      new Map([['Foo', 'bar']])
    )
    expect(css).to.equal('bar{color:blue}')
  })

  it('should remap tag names', () => {
    const css = jsToCss(
      { foo: { color: 'blue' } },
      null,
      new Map([['foo', 'bar']])
    )
    expect(css).to.contain(`bar{color:blue}`)
  })

  it('should remap nested tag names', () => {
    const css = jsToCss(
      { foo: { '&:hover': { color: 'blue' }, '#another': { color: 'red' } } },
      null,
      new Map([['foo', 'bar']])
    )
    expect(css).to.contain(`bar:hover{color:blue}`)
  })

  it('should remap nested tag names with hyphens', () => {
    const css = jsToCss(
      { 'foo-x': { '&:hover': { color: 'blue' } } },
      null,
      new Map([['foo-x', 'bar-y']])
    )
    expect(css).to.contain(`bar-y:hover{color:blue}`)
  })
})
