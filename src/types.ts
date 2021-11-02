// TODO: docs are not rendering correctly for this type
// https://github.com/TypeStrong/typedoc/issues/1519
/**
 * Nested CSS rules.
 */
export type NestedCSSDeclaration = Partial<CSSStyleDeclaration> & {
  [name: string]: string | NestedCSSDeclaration
}
