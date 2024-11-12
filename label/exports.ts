/**
 *
 * A library for parsing, resolving, and querying Bazel-like labels.
 *
 * @remarks
 * This package provides:
 *
 * - {@link TargetQuery} for querying targets
 * - {@link BazelLikeSpec} for implementing your own Bazel-like label specification
 * - {@link parse} for parsing labels
 * - {@link build} for building labels
 * - {@link resolve} for resolving labels
 *
 * This package is filesystem-agnostic so that you can use it in any JavaScript runtime.
 *
 * If you'd like to build a Bazel-like query in Node.js with `node:fs` and `glob`, please refer to the {@link https://github.com/xc2/label/blob/main/dummy-spec/dummy-spec.ts | the @109cafe/dummy implementation}.
 *
 * @packageDocumentation
 */

export * from "./build-label";
export * from "./exceptions";
export * from "./label";
export * from "./parse";
export * from "./query";
export * from "./resolve";
export * from "./specs/bazel-like";
