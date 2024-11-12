import type { LibConfig } from "@rslib/core";
import type { Context } from "../dummy-spec/context";

export default ({ tools, pkg }: Context): Record<string, LibConfig> => {
  const merge = (c: LibConfig) => {
    return tools.defaults(c, {
      autoExtension: false,
      source: {
        entry: {
          main: [`${pkg}/**/*.ts`, "!**/*.spec.ts", "!**/*.test.ts", "!**/__*__", "!**/BUILD.ts"],
        },
      },
      output: {
        distPath: { root: `./dist/${pkg}` },
        minify: {
          jsOptions: {
            minimizerOptions: {
              compress: false,
              mangle: false,
              format: {
                comments: "some",
                beautify: true,
              },
            },
          },
        },
      },
      bundle: false,
      dts: false,
    } satisfies LibConfig);
  };
  return {
    esm: merge({ format: "esm", syntax: "es2020", redirect: { js: ".mjs" } }),
    cjs: merge({ format: "cjs", syntax: "es2020", redirect: { js: ".cjs" } }),
    legacy: merge({
      format: "esm",
      syntax: "es5",
      redirect: { js: ".legacy.mjs" },
      output: { minify: true },
    }),
    pkg: {
      format: "esm",
      syntax: "es2022",
      source: {
        entry: { main: [] },
        tsconfigPath: "./tsconfig.json",
      },
      output: {
        distPath: { root: `./dist/${pkg}` },
        copy: [{ from: `${pkg}/manifest.json`, to: "package.json" }, { from: `${pkg}/README.md` }],
        minify: { js: false },
      },
      dts: { bundle: false },
    },
  };
};
