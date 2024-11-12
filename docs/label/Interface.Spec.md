[@109cafe/label](index.md) / Spec

# Interface: Spec\<Target\>

A specification for querying targets. E.g., Bazel-like, Buck-like, Non-FS Spec etc.

## Type Parameters

• **Target**

## Properties

### extract()

> **extract**: (`targets`, `target`) => `null` \| `string` \| `string`[]

Extract targets from a package

#### Parameters

• **targets**: `Record`\<`string`, `Target`\>

the map returned by `load`

• **target**: `string`

the target name in a label

#### Returns

`null` \| `string` \| `string`[]

the matched target names or `null` if not found

***

### load()

> **load**: (`pkg`) => `Promise`\<`Record`\<`string`, `Target`\>\>

Load targets from a package

#### Parameters

• **pkg**: [`ExactLabel`](Interface.ExactLabel.md)

the label that is returned by `lookup`

#### Returns

`Promise`\<`Record`\<`string`, `Target`\>\>

a `<TargetName, Target>` map for the package

***

### lookup()

> **lookup**: (`label`) => [`ExactLabel`](Interface.ExactLabel.md)[] \| `Promise`\<[`ExactLabel`](Interface.ExactLabel.md)[]\>

Lookup packages by label. Typically, it should return a list label for the `BUILD` files of these packages.

#### Parameters

• **label**: [`AbsoluteLabel`](Interface.AbsoluteLabel.md)

the label to lookup

#### Returns

[`ExactLabel`](Interface.ExactLabel.md)[] \| `Promise`\<[`ExactLabel`](Interface.ExactLabel.md)[]\>

a list of matched packages presented by `ExactLabel`

***

### validate()

> **validate**: (`label`) => `undefined` \| `null` \| `string` \| `void` \| `Error`

Validate a label

#### Parameters

• **label**: [`AbsoluteLabel`](Interface.AbsoluteLabel.md)

the label to validate

#### Returns

`undefined` \| `null` \| `string` \| `void` \| `Error`

a string or an `Error` for invalid label, and falsy values for valid label
