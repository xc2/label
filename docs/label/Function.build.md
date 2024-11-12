[@109cafe/label](index.md) / build

# Function: build()

> **build**(`parsed`): `string`

Build a label string from a parsed `Label` object

## Parameters

• **parsed**: [`Label`](Interface.Label.md)

The parsed `Label` object

## Returns

`string`

The label string

## Example

```ts
import { build } from "@109cafe/label";
build({ package: "foo", target: "bar" }); // foo:bar
build({ package: "foo", includeSubPackages: true }); // foo/...
build({ scope: "", package: "foo" }); // //foo
build({ scope: "@npm", package: "foo" }); // @npm//foo
```

## Defined in

[Developer/label/label/build-label.ts:17](https://github.com/xc2/label/blob/c12a0050bfe7ea4c2cc1dec2e68df3b1f8e58bda/label/build-label.ts#L17)
