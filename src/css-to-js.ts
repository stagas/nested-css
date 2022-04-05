import { createTokenizer } from 'tokenizer-next'
import type { NestedCSSDeclaration } from './types'

const extraWhitespace = /\s+/g

const tokenizer = createTokenizer(
  /(?<open>\s*\{\s*)/,
  /(?<close>\s*\}\s*)/,
  /(?<comment>\/\*[^]*?\*\/)/,
  /\s*(?<rule>[^{;}/'"]+)\s+?(?={)/,
  /\s*(?<string>'.*?'|".*?")(?=;)/,
  /\s*(?<prop>[^:;/]+)(?=:)/,
  /\s*(?<value>[^:;]+)(?=;)/,
)

/**
 * Convert a CSS string to a {@link NestedCSSDeclaration}.
 *
 * @param input
 */
export function cssToJs(input: string) {
  input = input.replace(extraWhitespace, ' ')

  const nextToken = tokenizer(input)
  const filter = (ignored: string[]) => (() => {
    let token
    while (token = nextToken())
      if (!ignored.includes(token.group)) break
    return token
  })
  const next = filter(['comment'])

  const parse = (style: NestedCSSDeclaration = {}) => {
    let token

    while ((token = next())) {
      const { value, group } = token

      switch (group) {
        case 'rule':
          next() // open {
          // @ts-ignore can't handle the ??= for some reason
          parse(style[value.trim()] ??= {})
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
