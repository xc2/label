[@109cafe/label](index.md) / TargetQuery

# Class: TargetQuery\<Target\>

A query helper for targets

## Example

```ts
import { TargetQuery } from "@109cafe/label";
import { DummySpec } from "@109cafe/dummy";
const query = new TargetQuery(new DummySpec(__dirname, { ignore: ["e2e/**", "dist/**"] }));
const targets = await query.query(["//foo:all", "-//foo:bar"]); // query all targets in foo except bar
```

## Type Parameters

• **Target**

## Constructors

### new TargetQuery()

> **new TargetQuery**\<`Target`\>(`spec`, `config`): [`TargetQuery`](Class.TargetQuery.md)\<`Target`\>

The spec for querying targets

#### Parameters

• **spec**: [`Spec`](Interface.Spec.md)\<`Target`\>

the spec of build system

• **config**: [`TargetQueryConfig`](Interface.TargetQueryConfig.md) = `{}`

configuration for `TargetQuery`

#### Returns

[`TargetQuery`](Class.TargetQuery.md)\<`Target`\>

#### Defined in

[Developer/label/label/query.ts:72](https://github.com/xc2/label/blob/c12a0050bfe7ea4c2cc1dec2e68df3b1f8e58bda/label/query.ts#L72)

## Properties

### allowUnmatched

> **allowUnmatched**: `boolean`

**`Internal`**

#### Defined in

[Developer/label/label/query.ts:65](https://github.com/xc2/label/blob/c12a0050bfe7ea4c2cc1dec2e68df3b1f8e58bda/label/query.ts#L65)

***

### spec

> `readonly` **spec**: [`Spec`](Interface.Spec.md)\<`Target`\>

**`Internal`**

#### Defined in

[Developer/label/label/query.ts:76](https://github.com/xc2/label/blob/c12a0050bfe7ea4c2cc1dec2e68df3b1f8e58bda/label/query.ts#L76)

## Methods

### query()

> **query**(`_labels`, `_base`): `Promise`\<`Record`\<`string`, `Target`\>\>

Query targets by labels

#### Parameters

• **\_labels**: `string`[]

the labels to query, with `-` prefix for excluding labels

• **\_base**: `string` = `"//"`

the base label to resolve the labels, must be an absolute label

#### Returns

`Promise`\<`Record`\<`string`, `Target`\>\>

a `<TargetName, Target>` map of matched targets

#### Throws

[InvalidLabel](Class.InvalidLabel.md) if the label is invalid

#### Throws

[NoMatchedPackages](Class.NoMatchedPackages.md) if no matched packages are found

#### Throws

[NoMatchedTarget](Class.NoMatchedTarget.md) if no matched targets are found

#### Defined in

[Developer/label/label/query.ts:92](https://github.com/xc2/label/blob/c12a0050bfe7ea4c2cc1dec2e68df3b1f8e58bda/label/query.ts#L92)
