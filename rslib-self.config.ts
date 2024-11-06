import NodePath from "node:path";
import { type LibConfig, defineConfig } from "@rslib/core";
import a from "./package.json";

type ToArray<T> = T extends (infer C)[] ? C[] : T[];

export default defineConfig({
  lib: [
    {
      format: "esm",
      syntax: "es2022",
      source: {
        entry: { main: { import: "./rslib.config.ts", filename: ".rslib.config.js" } },
        alias: {
          "@109cafe/dummy-spec": NodePath.resolve(__dirname, "./dummy-spec/exports.ts"),
          "@109cafe/label": NodePath.resolve(__dirname, "./label"),
        },
      },

      output: {
        externals: ([] as ToArray<NonNullable<NonNullable<LibConfig["output"]>["externals"]>>)
          .concat(Object.keys(a.dependencies))
          .concat(Object.keys(a.devDependencies)),
        target: "node",
        distPath: { root: "." },
        cleanDistPath: false,
      },
    },
  ],
});
