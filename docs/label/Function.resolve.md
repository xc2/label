[@109cafe/label](index.md) / resolve

# Function: resolve()

> **resolve**\<`F`, `T`\>(`from`, `to`): `F` & `T`

Resolve a label from another label

## Type Parameters

• **F** *extends* [`Label`](Interface.Label.md)

• **T** *extends* `Partial`\<[`Label`](Interface.Label.md)\>

## Parameters

• **from**: `F`

the label to resolve from

• **to**: `T`

the label to resolve to

## Returns

`F` & `T`

## Example

```ts
import { resolve } from "@109cafe/label";
resolve({ package: "foo" }, { package: "bar" }); // { package: "foo/bar" }
resolve({ package: "foo" }, { scope: "", package: "bar" }); // { package: "//bar" }
resolve({ package: "foo" }, { package: "bar", target: "baz" }); // { package: "foo/bar", target: "baz" }
resolve({ package: "foo", target: "bar" }, { includeSubPackages: true }); // { package: "foo", includeSubPackages: true, target: "bar" }
```

## Throws

[CannotResolveFromSubPackages](Class.CannotResolveFromSubPackages.md) if the `from` label includes subpackages

## Defined in

[Developer/label/label/resolve.ts:19](https://github.com/xc2/label/blob/c12a0050bfe7ea4c2cc1dec2e68df3b1f8e58bda/label/resolve.ts#L19)