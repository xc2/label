import { NoMatchedPackages, NoMatchedTarget } from "./exceptions.js";
import { type ExactLabel, type Label, SpecialTargetTypes } from "./label.js";
import { parse } from "./parse.js";

export interface PackageLookupResult {
  scope: string;
  package: string;
  buildfile: string;
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
  lookupTargets: (
    pkg: PackageLookupResult,
    filter: TargetFilter
  ) => Promise<({ target: string } & TargetResult)[]>;
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
      { pkg: PackageLookupResult; includes: (string | symbol)[]; excludes: (string | symbol)[] }
    > = {};
    for (const { label, negative } of filters) {
      const packages = await this.config.lookupPackages(label);
      if (packages.length === 0 && !this.config.allowUnmatched) {
        throw new NoMatchedPackages(label);
      }
      for (const pkg of packages) {
        const sl = `${pkg.scope}//${pkg.package}`;

        if (!map[sl]) {
          map[sl] = { pkg, includes: [], excludes: [] };
        }
        const list = negative ? map[sl].excludes : map[sl].includes;
        list.push(label.target);
      }
    }
    const results: ({ label: ExactLabel } & TargetResult)[] = [];
    for (const { pkg, includes, excludes } of Object.values(map)) {
      const filter = getFilter({ includes, excludes });
      const targets = (await this.config.lookupTargets(pkg, filter)).map((v) => ({
        ...v,
        label: { ...pkg, target: v.target, includeSubPackages: false },
      }));
      for (const { label, rule, file } of targets) {
        if (rule || file) {
          results.push({ label, rule, file } as any);
        } else if (!this.config.allowUnmatched) {
          throw new NoMatchedTarget(label);
        }
      }
    }
    return results;
  }
}

function parseFilters(targets: (string | symbol)[]) {
  const known = new Set<string>();
  let allFiles = false,
    allRules = false;
  for (const v of targets) {
    if (v === SpecialTargetTypes.ALL_TARGETS) {
      allFiles = true;
      allRules = true;
    } else if (v === SpecialTargetTypes.ALL_RULES) {
      allRules = true;
    } else if (typeof v === "string") {
      known.add(v);
    }
  }
  return { known, allFiles, allRules };
}
function getFilter({
  includes,
  excludes,
}: { includes: (string | symbol)[]; excludes: (string | symbol)[] }): TargetFilter {
  const inc = parseFilters(includes);
  const exc = parseFilters(excludes);

  const files = exc.allFiles ? -1 : inc.allFiles ? 1 : 0;
  const rules = exc.allRules ? -1 : inc.allRules ? 1 : 0;

  for (const v of exc.known) {
    inc.known.delete(v);
  }
  return { exactly: Array.from(inc.known), comprehensively: { files, rules } };
}
