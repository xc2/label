# @109cafe/label

A library for parsing, resolving, and querying Bazel-like labels.

This package provides:

- [TargetQuery](docs/label/Class.TargetQuery.md) for querying targets
- [BazelLikeSpec](docs/label/Class.BazelLikeSpec.md) for implementing your own Bazel-like label specification
- [parse](docs/label/Function.parse.md) for parsing labels
- [build](docs/label/Function.build.md) for building labels
- [resolve](docs/label/Function.resolve.md) for resolving labels

This package is filesystem-agnostic so that you can use it in any JavaScript runtime.

If you'd like to build a Bazel-like query in Node.js with `node:fs` and `glob`, please refer to the [@109cafe/dummy implementation](./dummy-spec/dummy-spec.ts).

[API References](docs/label/index.md)