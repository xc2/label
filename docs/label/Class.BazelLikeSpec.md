[@109cafe/label](index.md) / BazelLikeSpec

# Class: `abstract` BazelLikeSpec\<Target\>

An abstract spec for Bazel-like build systems

## Type Parameters

• **Target** *extends* [`BazelTarget`](TypeAlias.BazelTarget.md)

## Implements

- [`Spec`](Interface.Spec.md)\<`Target`\>

## Constructors

### new BazelLikeSpec()

> **new BazelLikeSpec**\<`Target`\>(): [`BazelLikeSpec`](Class.BazelLikeSpec.md)\<`Target`\>

#### Returns

[`BazelLikeSpec`](Class.BazelLikeSpec.md)\<`Target`\>

## Methods

### extract()

> **extract**(`targets`, `target`): `null` \| `string` \| `string`[]

Extract targets from a package

#### Parameters

• **targets**: `Record`\<`string`, `Target`\>

the map returned by `load`

• **target**: `string`

the target name in a label

#### Returns

`null` \| `string` \| `string`[]

the matched target names or `null` if not found

#### Implementation of

[`Spec`](Interface.Spec.md).[`extract`](Interface.Spec.md#extract)

#### Defined in

[Developer/label/label/specs/bazel-like.ts:57](https://github.com/xc2/label/blob/c12a0050bfe7ea4c2cc1dec2e68df3b1f8e58bda/label/specs/bazel-like.ts#L57)

***

### load()

> `abstract` **load**(`pkg`): `Promise`\<`Record`\<`string`, `Target`\>\>

Load targets from a package

#### Parameters

• **pkg**: [`ExactLabel`](Interface.ExactLabel.md)

the label that is returned by `lookup`

#### Returns

`Promise`\<`Record`\<`string`, `Target`\>\>

a `<TargetName, Target>` map for the package

#### Implementation of

[`Spec`](Interface.Spec.md).[`load`](Interface.Spec.md#load)

#### Defined in

[Developer/label/label/specs/bazel-like.ts:69](https://github.com/xc2/label/blob/c12a0050bfe7ea4c2cc1dec2e68df3b1f8e58bda/label/specs/bazel-like.ts#L69)

***

### lookup()

> `abstract` **lookup**(`label`): `Promise`\<[`ExactLabel`](Interface.ExactLabel.md)[]\>

Lookup packages by label. Typically, it should return a list label for the `BUILD` files of these packages.

#### Parameters

• **label**: [`Label`](Interface.Label.md)

the label to lookup

#### Returns

`Promise`\<[`ExactLabel`](Interface.ExactLabel.md)[]\>

a list of matched packages presented by `ExactLabel`

#### Implementation of

[`Spec`](Interface.Spec.md).[`lookup`](Interface.Spec.md#lookup)

#### Defined in

[Developer/label/label/specs/bazel-like.ts:68](https://github.com/xc2/label/blob/c12a0050bfe7ea4c2cc1dec2e68df3b1f8e58bda/label/specs/bazel-like.ts#L68)

***

### validate()

> **validate**(`label`): `undefined` \| "\`...\` can only be used with wildcard targets"

Validate a label

#### Parameters

• **label**: [`Label`](Interface.Label.md)

the label to validate

#### Returns

`undefined` \| "\`...\` can only be used with wildcard targets"

a string or an `Error` for invalid label, and falsy values for valid label

#### Implementation of

[`Spec`](Interface.Spec.md).[`validate`](Interface.Spec.md#validate)

#### Defined in

[Developer/label/label/specs/bazel-like.ts:48](https://github.com/xc2/label/blob/c12a0050bfe7ea4c2cc1dec2e68df3b1f8e58bda/label/specs/bazel-like.ts#L48)
