import NodePath from "node:path";
import {
  type AbsoluteLabel,
  BazelLikeSpec,
  type ExactLabel,
  type Spec,
  build,
  resolve,
} from "@109cafe/label/exports";
import { Glob, type GlobOptionsWithFileTypesUnset } from "glob";
import { getContext } from "./context";
import type { DummyBuildFileFn } from "./types";

export class DummySpec extends BazelLikeSpec<any> implements Spec<any> {
  readonly buildFileName: string[];
  readonly resolveRepoRoot?: (repoName: string) => string;
  readonly context: string;
  readonly globOptions: GlobOptionsWithFileTypesUnset;
  constructor(
    context: string,
    options: {
      ignore?: string[];
      buildFileName?: string | string[];
      resolveRepoRoot?: (v: string) => string;
    } = {}
  ) {
    super();
    this.context = context;
    if (!NodePath.isAbsolute(this.context)) {
      throw new Error(`Context must be absolute path`);
    }
    this.buildFileName = (
      Array.isArray(options.buildFileName) ? options.buildFileName : [options.buildFileName]
    ).filter(Boolean as unknown as (v: any) => v is string);
    if (this.buildFileName.length === 0) {
      this.buildFileName.push("BUILD.{mjs,ts,js,mts,cts,cjs}");
    }
    this.resolveRepoRoot = options.resolveRepoRoot;
    this.globOptions = {
      ignore: options.ignore || [],
    };
  }
  protected resolvePackage(label: AbsoluteLabel) {
    if (label.scope === "") {
      return NodePath.resolve(this.context, label.package);
    } else if (this.resolveRepoRoot) {
      return NodePath.resolve(this.resolveRepoRoot(label.scope), label.package);
    } else {
      throw new Error(
        `Cannot resolve scope label "${build(label)}" without "resolveRepoRoot" provided`
      );
    }
  }
  async lookup(label: AbsoluteLabel) {
    const base = this.resolvePackage(label);
    const glob = new Glob(
      this.buildFileName.map((v) => (label.includeSubPackages ? `**/${v}` : v)),
      {
        ...this.globOptions,
        cwd: base,
        nodir: true,
        absolute: false,
        ignore: [
          "**/node_modules/**",
          "**/dist/**",
          ...((this.globOptions?.ignore as string[]) || []),
        ],
      }
    );

    return Array.from(await glob.walk(), (v) => {
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
    const mod = (await import(path)) as
      | { default: DummyBuildFileFn }
      | { default: { default: DummyBuildFileFn } };
    if (!mod.default) {
      console.log(buildfile);
    }
    console.log(1, mod.default);
    let fn = "default" in mod.default ? mod.default.default : mod.default;
    fn = fn ?? (() => ({}));
    const f = await fn(getContext());
    const { rules, files = [] } = ("rules" in f || "files" in f ? f : { rules: f, files: [] }) as {
      rules: Record<string, unknown>;
      files: string[];
    };

    return {
      ...Object.fromEntries(Object.entries(rules).map(([k, v]) => [k, { type: "rule", rule: v }])),
      ...Object.fromEntries(files.map((v: string) => [v, { type: "file", file: v }])),
    };
  }
}
