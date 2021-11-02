// original: https://gist.github.com/mindplay-dk/47bc597dcbc28bea009b02c5a0c9010e

import type { NestedCSSDeclaration } from './types'
import { kebabCase } from './util'

const mediaRule = (rule: string, media: string) =>
  media ? `${media}{${rule}}` : rule

const createRule = (target: string, prop: string, value: string) =>
  `${target}{${kebabCase(prop)}:${value}}`

// const isClassOrRoot = /^\s*[.:]/g

const remap = (target: string, map?: Map<string, string>) =>
  // isClassOrRoot.test(target)
  //   ? target
  //   :
  [...target.matchAll(/[\w-]+|./g)]
    .flat()
    .map(x => map?.get(x) ?? x)
    .join('')

/**
 * Compile a JS nested rules {@link NestedCSSDeclaration} to a CSS string.
 *
 * Examples:
 * ```ts
 * jsToCss({ '.foo': { color: 'blue' } })
 * // => .foo{color:blue}
 *
 * // custom root
 * jsToCss({ color: 'red' }, '.my-button')
 * // => .my-button{color:red}
 *
 * // with substitution
 * jsToCss({ '.foo': { color: 'blue' } }, null, new Map([['foo', 'bar']]))
 * // => .bar{color:blue}
 * ```
 *
 * @param rules Rules object
 * @param rootSelector Top level rules will use this selector
 * @param aliasMap Alias identifiers (i.e for `.foo` to become `.bar`
 *  you will need a `foo=bar` entry)
 * @returns The compiled CSS string
 */
export function jsToCss(
  rules: NestedCSSDeclaration,
  rootSelector?: string | void,
  aliasMap?: Map<string, string>
) {
  rootSelector ??= ':host'

  let css = ''

  const parse = (rules: NestedCSSDeclaration, child = '', media = '') => {
    for (let key in rules) {
      const value = rules[key]

      if (typeof value === 'object') {
        const isMedia = /^@/.test(key) ? key : null

        let target = child

        if (!isMedia) {
          key = /^&/.test(key) ? key.slice(1) : ' ' + key

          target = child
            .split(',')
            .map(x => x + key.replace(/&/g, x.trim()))
            .join(',')
        }

        parse(value, target, isMedia || media)
      } else {
        const rule = mediaRule(
          createRule(
            child ? remap(child, aliasMap) : rootSelector!,
            key,
            value
          ),
          media
        )

        css += '\n' + rule.trim()
      }
    }
  }

  parse(rules)

  return css.trim()
}
