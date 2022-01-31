export type { NestedCSSDeclaration } from './types'

import { cssToJs } from './css-to-js'
import { jsToCss } from './js-to-css'
import { joinPartsWithValues } from './util'

/**
 * Compile to CSS passing parameters to {@link jsToCss}.
 */
export type NestedCSSCompiler = ((
  rootSelector?: string,
  aliasMap?: Map<string, string>
) => string) & { valueOf: NestedCSSCompiler }

/**
 * Factory a {@link NestedCSSCompiler} for the given string.
 *
 * @param parts
 * @param values
 */
export function css(parts: TemplateStringsArray, ...values: unknown[]): NestedCSSCompiler {
  const nestedCssString = joinPartsWithValues(parts, values)
  const nestedCssObject = cssToJs(nestedCssString)

  function compileCss(rootSelector = ':host', aliasMap?: Map<string, string>) {
    return jsToCss(nestedCssObject, rootSelector, aliasMap)
  }

  compileCss.valueOf = compileCss

  return compileCss
}

export { cssToJs, jsToCss }
