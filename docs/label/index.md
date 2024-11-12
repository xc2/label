# @109cafe/label

A library for parsing, resolving, and querying Bazel-like labels.

## Remarks

This package provides:

- [TargetQuery](Class.TargetQuery.md) for querying targets
- [BazelLikeSpec](Class.BazelLikeSpec.md) for implementing your own Bazel-like label specification
- [parse](Function.parse.md) for parsing labels
- [build](Function.build.md) for building labels
- [resolve](Function.resolve.md) for resolving labels

This package is filesystem-agnostic so that you can use it in any JavaScript runtime.

If you'd like to build a Bazel-like query in Node.js with `node:fs` and `glob`, please refer to the [the @109cafe/dummy implementation](https://github.com/xc2/label/blob/main/dummy-spec/dummy-spec.ts).

## Classes

| Class | Description |
| ------ | ------ |
| [BazelLikeSpec](Class.BazelLikeSpec.md) | An abstract spec for Bazel-like build systems |
| [CannotResolveFromSubPackages](Class.CannotResolveFromSubPackages.md) | Exception for resolving from sub-packages |
| [InvalidLabel](Class.InvalidLabel.md) | Exception for invalid label |
| [NoMatchedPackages](Class.NoMatchedPackages.md) | Exception for no matched packages found |
| [NoMatchedTarget](Class.NoMatchedTarget.md) | Exception for no matched target found |
| [TargetQuery](Class.TargetQuery.md) | A query helper for targets |

## Interfaces

| Interface | Description |
| ------ | ------ |
| [AbsoluteLabel](Interface.AbsoluteLabel.md) | An absolute label is a label that must includes a scope |
| [BazelFileTarget](Interface.BazelFileTarget.md) | File target type |
| [BazelRuleTarget](Interface.BazelRuleTarget.md) | Rule target type |
| [ExactLabel](Interface.ExactLabel.md) | An exact label is a label that must includes a scope and cannot include sub-packages |
| [Label](Interface.Label.md) | - |
| [Spec](Interface.Spec.md) | A specification for querying targets. E.g., Bazel-like, Buck-like, Non-FS Spec etc. |
| [TargetQueryConfig](Interface.TargetQueryConfig.md) | Configuration for querying targets |

## Type Aliases

| Type alias | Description |
| ------ | ------ |
| [BazelTarget](TypeAlias.BazelTarget.md) | Bazel target type |

## Variables

| Variable | Description |
| ------ | ------ |
| [BazelWildcardTargets](Variable.BazelWildcardTargets.md) | Bazel wildcard targets |

## Functions

| Function | Description |
| ------ | ------ |
| [build](Function.build.md) | Build a label string from a parsed `Label` object |
| [normalizePackage](Function.normalizePackage.md) | remove the leading `./` in the package path for label specs |
| [parse](Function.parse.md) | Parse a label string into a `Label` object |
| [resolve](Function.resolve.md) | Resolve a label from another label |
| [validateAbsolute](Function.validateAbsolute.md) | Check if a label is with a scope |
