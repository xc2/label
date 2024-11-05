import { build } from "./build";
import { NoMatchedPackages } from "./exceptions.js";
import type { ExactLabel, Label } from "./label.js";
import { parse } from "./parse.js";

export interface PackageLookupResult {
  scope: string;
  package: string;
  includeSubPackages: false;
  target: string;
}
export interface TargetFilter {
  /** all named targets to include */
  exactly: string[];
  /** -1: exclude all files/rules, 0: no file/rule filter, 1: include all files/rules */
  comprehensively: Record<"files" | "rules", -1 | 0 | 1>;
}

export type TargetResult =
  | { rule: unknown; file?: undefined }
  | { file: unknown; rule?: undefined };

export interface TargetQueryConfig {
  allowUnmatched?: boolean;
  lookupPackages: (label: Label) => PackageLookupResult[] | Promise<PackageLookupResult[]>;
  loadPackage: (
    pkg: PackageLookupResult
  ) => Promise<Record<"rules" | "files", undefined | Record<string, unknown>>>;
}
export class TargetQuery {
  constructor(public config: TargetQueryConfig) {}
  async query(_labels: string[]): Promise<({ label: ExactLabel } & TargetResult)[]> {
    const filters = _labels.map((v) => {
      if (v.startsWith("-")) {
        return { label: parse(v.slice(1)), negative: true };
      }
      return { label: parse(v), negative: false };
    });
    const map: Record<
      string,
      {
        buildfile: PackageLookupResult;
        includes: (string | symbol)[];
        excludes: (string | symbol)[];
      }
    > = {};
    for (const { label, negative } of filters) {
      const packages = await this.config.lookupPackages(label);
      if (packages.length === 0 && !this.config.allowUnmatched) {
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
    const results: ({ label: ExactLabel } & TargetResult)[] = [];
    for (const { buildfile, includes, excludes } of Object.values(map)) {
      const targets = await this.config.loadPackage(buildfile);
    }
    return results;
  }
}
function filterTarget(
  getTargets: (target: string | symbol) => string[],
  includes: (string | symbol)[],
  excludes: (string | symbol)[]
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
