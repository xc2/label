import NodePath from "node:path";
import type { LibConfig } from "@rslib/core";
import type { Context } from "./context";

export default ({ tools, pkg, workspace }: Context): Record<string, LibConfig> => {
  const merge = (c: LibConfig) => {
    return tools.defaults(c, {
      autoExtension: false,
      source: {
        entry: {
          exports: `./${pkg}/exports.ts`,
        },
        tsconfigPath: `./${pkg}/tsconfig.json`,
      },
      output: { target: "node", distPath: { root: NodePath.resolve(workspace, `./dist/${pkg}/`) } },
      bundle: true,
      dts: false,
    } satisfies LibConfig);
  };
  return {
    esm: merge({ format: "esm", syntax: "es2020", redirect: { js: ".js" } }),
    pkg: merge({
      format: "esm",
      syntax: "es2022",
      bundle: false,
      autoExternal: false,
      source: {
        tsconfigPath: `./${pkg}/tsconfig.json`,
      },
      tools: {
        rspack(config) {
          config.entry = {};
          return config;
        },
      },
      output: {
        copy: [
          { from: `./${pkg}/manifest.json`, to: "package.json" },
          { from: `./${pkg}/README.md` },
        ],
      },
      dts: { bundle: true },
    }),
  };
};
