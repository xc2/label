import { build } from "./build";
import { InvalidLabel, NoMatchedPackages, NoMatchedTarget } from "./exceptions.js";
import type { AbsoluteLabel, ExactLabel } from "./label.js";
import { parse, validateAbsolute } from "./parse.js";
import { resolve } from "./resolve";

export interface Spec<Target> {
  validate: (label: AbsoluteLabel) => string | Error | void | undefined | null;
  lookup: (label: AbsoluteLabel) => ExactLabel[] | Promise<ExactLabel[]>;
  load: (pkg: ExactLabel) => Promise<Record<string, Target>>;
  extract: (targets: Record<string, Target>, target: string) => string | string[] | null;
}
export interface TargetQueryConfig<Target> {
  allowUnmatched?: boolean;
}
export class TargetQuery<Target> {
  allowUnmatched: boolean;
  constructor(
    public readonly spec: Spec<Target>,
    config: TargetQueryConfig<Target> = {}
  ) {
    this.allowUnmatched = config.allowUnmatched || false;
  }
  async query(_labels: string[], _base = "//"): Promise<Record<string, Target>> {
    const base = validateAbsolute(_base);
    const filters = _labels.map((v) => {
      if (v.startsWith("-")) {
        return { label: resolve(base, parse(v.slice(1))), negative: true };
      }
      return { label: resolve(base, parse(v)), negative: false };
    });
    for (const { label } of filters) {
      const validated = this.spec.validate(label);
      if (validated instanceof Error) {
        throw validated;
      } else if (typeof validated === "string") {
        throw new InvalidLabel(label, validated);
      }
    }
    const map: Record<
      string,
      {
        buildfile: ExactLabel;
        includes: string[];
        excludes: string[];
      }
    > = {};
    for (const { label, negative } of filters) {
      const packages = await this.spec.lookup(label);
      if (packages.length === 0 && !this.allowUnmatched) {
        throw new NoMatchedPackages(label);
      }
      for (const pkg of packages) {
        const sl = build(pkg);

        if (!map[sl]) {
          map[sl] = { buildfile: pkg, includes: [], excludes: [] };
        }
        const list = negative ? map[sl].excludes : map[sl].includes;
        list.push(label.target);
      }
    }
    const results: Record<string, Target> = {};
    for (const { buildfile, includes, excludes } of Object.values(map)) {
      const targets = await this.spec.load(buildfile);
      const extract = (target: string) => {
        const r = this.spec.extract(targets, target);
        if (!r?.length && !this.allowUnmatched) {
          throw new NoMatchedTarget({ ...buildfile, target });
        }
        return (Array.isArray(r) ? r : [r]).filter(Boolean) as string[];
      };
      const filtered = filterTarget(extract, includes, excludes);
      for (const target of filtered) {
        results[build({ ...buildfile, target })] = targets[target];
      }
    }
    return results;
  }
}
function filterTarget(
  getTargets: (target: string) => string[],
  includes: string[],
  excludes: string[]
) {
  const result = new Set<string>();
  for (const inc of includes) {
    const targets = getTargets(inc);

    for (const target of targets) {
      result.add(target);
    }
  }
  for (const f of excludes) {
    const targets = getTargets(f);
    for (const target of targets) {
      result.delete(target);
    }
  }
  return Array.from(result);
}
