import type { LibConfig } from "@rslib/core";
import type { Context } from "../dummy-spec/context";

export default ({ tools }: Context): Record<string, LibConfig> => {
  const merge = (c: LibConfig) => {
    return tools.defaults(
      {
        source: {
          entry: {
            main: ["label/**/*.ts", "!**/*.spec.ts", "!**/*.test.ts", "!**/__*__", "!**/BUILD.ts"],
          },
        },
        output: { distPath: { root: "./dist/label" } },
        bundle: false,
        dts: false,
      },
      c
    );
  };
  return {
    esm: merge({ format: "esm", syntax: "es2022" }),
    cjs: merge({ format: "cjs", syntax: "es2022" }),
  };
};
