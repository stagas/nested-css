import { createTokenizer } from 'tokenizer-next'
import type { NestedCSSDeclaration } from './types'

const comments = /\/\*[^]*?\*\//g
const extraWhitespace = /\s+/g

const tokenizer = createTokenizer(
  /(?<open>\s*\{\s*)/,
  /(?<close>\s*\}\s*)/,
  /\s*(?<rule>[^{;}]+)\s+?(?={)/,
  /\s*(?<string>'.*?'|".*?")(?=;)/,
  /\s*(?<prop>[^:;]+)(?=:)/,
  /\s*(?<value>[^:;]+)(?=;)/,
)

/**
 * Convert a CSS string to a {@link NestedCSSDeclaration}.
 *
 * @param input
 */
export function cssToJs(input: string) {
  input = input.replace(comments, ' ').replace(extraWhitespace, ' ')

  const next = tokenizer(input)

  const parse = (style: NestedCSSDeclaration = {}) => {
    let token

    while ((token = next())) {
      const { value, group } = token

      switch (group) {
        case 'rule':
          next() // open {
          parse(style[value.trim()] = {})
          break
        case 'prop':
          style[value.trim()] = (next()?.value as string)?.trim()
          break
        case 'close':
          return style
      }
    }

    return style
  }

  return parse()
}
