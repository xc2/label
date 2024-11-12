[@109cafe/label](index.md) / AbsoluteLabel

# Interface: AbsoluteLabel

An absolute label is a label that must includes a scope

## Extends

- [`Label`](Interface.Label.md)

## Properties

### includeSubPackages

> **includeSubPackages**: `boolean`

`includeSubPackages` is if the label includes sub-packages

#### Example

```ts
`true` in `//foo/...`
`false` in `//foo`
```

#### Inherited from

[`Label`](Interface.Label.md).[`includeSubPackages`](Interface.Label.md#includesubpackages)

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

#### Inherited from

[`Label`](Interface.Label.md).[`package`](Interface.Label.md#package)

***

### scope

> **scope**: `string`

The scope of the package, typically following double slashes in label.
If the scope is `false`, it means the label is a relative label
If the scope is an empty string, it typically means main repository in most specs

#### Example

```ts
`@npm` in `@npm//foo`
empty string in `//foo`
`false` in `foo`
```

#### Overrides

[`Label`](Interface.Label.md).[`scope`](Interface.Label.md#scope)

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

#### Inherited from

[`Label`](Interface.Label.md).[`target`](Interface.Label.md#target)
