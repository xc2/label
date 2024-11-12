[@109cafe/label](index.md) / Label

# Interface: Label

## Extended by

- [`AbsoluteLabel`](Interface.AbsoluteLabel.md)
- [`ExactLabel`](Interface.ExactLabel.md)

## Properties

### includeSubPackages

> **includeSubPackages**: `boolean`

`includeSubPackages` is if the label includes sub-packages

#### Example

```ts
`true` in `//foo/...`
`false` in `//foo`
```

#### Defined in

[Developer/label/label/label.ts:29](https://github.com/xc2/label/blob/c12a0050bfe7ea4c2cc1dec2e68df3b1f8e58bda/label/label.ts#L29)

***

### package

> **package**: `string`

The known part of package path of the package

#### Example

```ts
`foo` in `//foo`
`foo/bar` in `//foo/bar`
`foo` in `@npm//foo/...`
```

#### Defined in

[Developer/label/label/label.ts:22](https://github.com/xc2/label/blob/c12a0050bfe7ea4c2cc1dec2e68df3b1f8e58bda/label/label.ts#L22)

***

### scope

> **scope**: `string` \| `false`

The scope of the package, typically following double slashes in label.
If the scope is `false`, it means the label is a relative label
If the scope is an empty string, it typically means main repository in most specs

#### Example

```ts
`@npm` in `@npm//foo`
empty string in `//foo`
`false` in `foo`
```

#### Defined in

[Developer/label/label/label.ts:14](https://github.com/xc2/label/blob/c12a0050bfe7ea4c2cc1dec2e68df3b1f8e58bda/label/label.ts#L14)

***

### target

> **target**: `string`

The target of the package

#### Example

```ts
`bar` in `//foo:bar`
`wiz` in `//foo/bar/wiz` which includes an implicit target name
`all` in `//foo:all` which includes all targets in most specs
```

#### Defined in

[Developer/label/label/label.ts:37](https://github.com/xc2/label/blob/c12a0050bfe7ea4c2cc1dec2e68df3b1f8e58bda/label/label.ts#L37)
