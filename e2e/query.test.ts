import { test } from "bun:test";
import * as NodePath from "node:path";
import { Glob } from "bun";
import { type AbsoluteLabel, type Label, extractRepo } from "../src/label";
import type { PackageLookupResult } from "../src/query";
import { resolve } from "../src/resolve";

const glob = new Glob("**/BUILD.ts");
const FixturesRoot = NodePath.resolve(__dirname, "__fixtures__");
test("test query", () => {
  const root = NodePath.resolve(FixturesRoot, "workspace-basic");
  const packageToPath = (label: AbsoluteLabel) => {
    const [repo] = extractRepo(label.scope);
    if (repo === "") {
      return NodePath.resolve(root, label.package);
    } else {
      return NodePath.resolve(FixturesRoot, `repo-${repo}`, label.package);
    }
  };
  const lookupPackages = async (label: Label) => {
    const l = resolve("//", label) as AbsoluteLabel;
    const base = packageToPath(l);
    const glob = new Glob(l.includeSubPackages ? "**/BUILD.ts" : "BUILD.ts");
    const globbed = glob.scan({ cwd: base, onlyFiles: true, absolute: false });
    return Array.fromAsync(globbed, (v) => {
      return resolve(l, {
        scope: false,
        package: NodePath.dirname(v),
        includeSubPackages: false,
        target: NodePath.basename(v),
      }) as PackageLookupResult;
    });
  };
  const loadPackage = async (pkg: PackageLookupResult) => {
    const buildfile = NodePath.resolve(packageToPath(pkg), pkg.target);
    const mod = await import(buildfile);
    return {
      rules: mod.default?.targets ?? mod.targets ?? {},
      files: {},
    };
  };
});
