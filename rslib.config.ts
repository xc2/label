import { defineConfig } from "@rslib/core";

export default defineConfig({
  source: {
    entry: {
      exports: "./src/exports.ts",
    },
  },
  output: {
    distPath: {
      root: "./dist",
    },
  },
  lib: [
    {
      format: "cjs",
      dts: false,
    },
    {
      format: "esm",
      dts: { bundle: true },
      output: {
        copy: [{ from: "src/manifest.json", to: "package.json" }],
      },
    },
  ],
});
