import NodePath from "node:path";
import { Glob } from "bun";
import type { AbsoluteLabel, ExactLabel } from "../../label/exports";
import { BazelLikeSpec, resolve } from "../../label/exports";

export class BazelLikeFsSpec extends BazelLikeSpec<any> {
  constructor(public resolvePackage: (label: AbsoluteLabel) => string) {
    super();
  }
  lookup(label: AbsoluteLabel) {
    const base = this.resolvePackage(label);
    const glob = new Glob(label.includeSubPackages ? "**/BUILD.ts" : "BUILD.ts");
    const globbed = glob.scan({ cwd: base, onlyFiles: true, absolute: false });
    return Array.fromAsync(globbed, (v) => {
      return resolve(
        { ...label, includeSubPackages: false },
        {
          package: NodePath.dirname(v),
          includeSubPackages: false,
          target: NodePath.basename(v),
        }
      ) as ExactLabel;
    });
  }
  async load(buildfile: AbsoluteLabel) {
    const path = NodePath.resolve(this.resolvePackage(buildfile), buildfile.target);
    let mod = await import(path);
    const rules = mod.default?.targets ?? mod.targets ?? {};
    const files = mod.default?.exports_files ?? mod.exports_files ?? [];

    return {
      ...Object.fromEntries(Object.entries(rules).map(([k, v]) => [k, { type: "rule", rule: v }])),
      ...Object.fromEntries(files.map((v: string) => [v, { type: "file", file: v }])),
    };
  }
}
