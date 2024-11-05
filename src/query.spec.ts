import { expect, test } from "bun:test";
import { TargetQuery } from "./query";

test("lookup matrix", async () => {
  const a = new TargetQuery({
    lookupPackages: async (label) => {
      return [
        { label: { scope: "", package: "foo" }, buildfile: "BUILD.bazel" },
        { label: { scope: "@npm", package: "109cafe__label" }, buildfile: "BUILD.bazel" },
      ];
    },
    lookupTargets: async () => [{ target: "foo", rule: Symbol.for("foo") }],
  });
  await expect(a.query(["//foo:foo"])).resolves.toMatchSnapshot();
});
