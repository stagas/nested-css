# nested-css

## Table of contents

### Type aliases

- [NestedCSSCompiler](README.md#nestedcsscompiler)
- [NestedCSSDeclaration](README.md#nestedcssdeclaration)

### Functions

- [css](README.md#css)
- [cssToJs](README.md#csstojs)
- [jsToCss](README.md#jstocss)

## Type aliases

### NestedCSSCompiler

Ƭ **NestedCSSCompiler**: (`rootSelector?`: `string`, `aliasMap?`: `Map`<`string`, `string`\>) => `string`

#### Type declaration

▸ (`rootSelector?`, `aliasMap?`): `string`

Compile to CSS passing parameters to [jsToCss](README.md#jstocss).

##### Parameters

| Name | Type |
| :------ | :------ |
| `rootSelector?` | `string` |
| `aliasMap?` | `Map`<`string`, `string`\> |

##### Returns

`string`

#### Defined in

[index.ts:9](https://github.com/stagas/nested-css/blob/main/src/index.ts#L9)

___

### NestedCSSDeclaration

Ƭ **NestedCSSDeclaration**: `Partial`<`CSSStyleDeclaration`\> & { [name: string]: `string` \| [`NestedCSSDeclaration`](README.md#nestedcssdeclaration);  }

Nested CSS rules.

#### Defined in

[types.ts:6](https://github.com/stagas/nested-css/blob/main/src/types.ts#L6)

## Functions

### css

▸ **css**(`parts`, ...`values`): [`NestedCSSCompiler`](README.md#nestedcsscompiler)

Factory a [NestedCSSCompiler](README.md#nestedcsscompiler) for the given string.

#### Parameters

| Name | Type |
| :------ | :------ |
| `parts` | `TemplateStringsArray` |
| `...values` | `unknown`[] |

#### Returns

[`NestedCSSCompiler`](README.md#nestedcsscompiler)

#### Defined in

[index.ts:20](https://github.com/stagas/nested-css/blob/main/src/index.ts#L20)

___

### cssToJs

▸ **cssToJs**(`input`): `Partial`<`CSSStyleDeclaration`\>

Convert a CSS string to a [NestedCSSDeclaration](README.md#nestedcssdeclaration).

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |

#### Returns

`Partial`<`CSSStyleDeclaration`\>

#### Defined in

[css-to-js.ts:20](https://github.com/stagas/nested-css/blob/main/src/css-to-js.ts#L20)

___

### jsToCss

▸ **jsToCss**(`rules`, `rootSelector?`, `aliasMap?`): `string`

Compile a JS nested rules [NestedCSSDeclaration](README.md#nestedcssdeclaration) to a CSS string.

Examples:
```ts
jsToCss({ '.foo': { color: 'blue' } })
// => .foo{color:blue}

// custom root
jsToCss({ color: 'red' }, '.my-button')
// => .my-button{color:red}

// with substitution
jsToCss({ '.foo': { color: 'blue' } }, null, new Map([['foo', 'bar']]))
// => .bar{color:blue}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rules` | `Partial`<`CSSStyleDeclaration`\> | Rules object |
| `rootSelector?` | `string` \| `void` | Top level rules will use this selector |
| `aliasMap?` | `Map`<`string`, `string`\> | Alias identifiers (i.e for `.foo` to become `.bar`  you will need a `foo=bar` entry) |

#### Returns

`string`

The compiled CSS string

#### Defined in

[js-to-css.ts:46](https://github.com/stagas/nested-css/blob/main/src/js-to-css.ts#L46)
