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
