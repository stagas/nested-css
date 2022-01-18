/**
 * Joins parts with values
 *
 * @param parts
 * @param values
 */
export function joinPartsWithValues(parts: TemplateStringsArray, values: unknown[]) {
  let str = ''
  for (let i = 0; i < parts.length; i++) {
    str += parts[i]
    // if (i < values.length) str += values[i]
    str += values[i]
  }
  return str
}

/**
 * Convert string to kebab-case.
 *
 * @param s PascalCase or camelCase string
 */
export function kebabCase(s: string) {
  return s.replace(/[A-Z]/g, (m: string, i: number) => (i ? '-' : '') + m).toLowerCase()
}
