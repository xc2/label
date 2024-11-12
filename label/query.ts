import { build } from "./build-label";
import { InvalidLabel, NoMatchedPackages, NoMatchedTarget } from "./exceptions";
import type { AbsoluteLabel, ExactLabel } from "./label";
import { parse, validateAbsolute } from "./parse";
import { resolve } from "./resolve";

/**
 * A specification for querying targets. E.g., Bazel-like, Buck-like, Non-FS Spec etc.
 * @public
 */
export interface Spec<Target> {
  /**
   * Validate a label
   * @param label - the label to validate
   * @returns a string or an `Error` for invalid label, and falsy values for valid label
   */
  validate: (label: AbsoluteLabel) => string | Error | void | undefined | null;
  /**
   * Lookup packages by label. Typically, it should return a list label for the `BUILD` files of these packages.
   * @param label - the label to lookup
   * @returns a list of matched packages presented by `ExactLabel`
   */
  lookup: (label: AbsoluteLabel) => ExactLabel[] | Promise<ExactLabel[]>;
  /**
   * Load targets from a package
   * @param pkg - the label that is returned by `lookup`
   * @returns a `<TargetName, Target>` map for the package
   */
  load: (pkg: ExactLabel) => Promise<Record<string, Target>>;
  /**
   * Extract targets from a package
   * @param targets - the map returned by `load`
   * @param target - the target name in a label
   * @returns the matched target names or `null` if not found
   */
  extract: (targets: Record<string, Target>, target: string) => string | string[] | null;
}

/**
 * Configuration for querying targets
 * @public
 */
export interface TargetQueryConfig {
  /**
   * Allow unmatched labels. If `true`, the query will not throw an error when no matched packages or targets are found.
   */
  allowUnmatched?: boolean;
}

/**
 * A query helper for targets
 * @public
 * @example
 * ```ts
 * import { TargetQuery } from "@109cafe/label";
 * import { DummySpec } from "@109cafe/dummy";
 * const query = new TargetQuery(new DummySpec(__dirname, { ignore: ["e2e/**", "dist/**"] }));
 * const targets = await query.query(["//foo:all", "-//foo:bar"]); // query all targets in foo except bar
 * ```
 */
export class TargetQuery<Target> {
  /**
   * @internal
   */
  allowUnmatched: boolean;

  /**
   * The spec for querying targets
   * @param spec - the spec of build system
   * @param config - configuration for `TargetQuery`
   */
  constructor(
    /**
     * @internal
     */
    public readonly spec: Spec<Target>,
    config: TargetQueryConfig = {}
  ) {
    this.allowUnmatched = config.allowUnmatched || false;
  }

  /**
   * Query targets by labels
   * @param _labels - the labels to query, with `-` prefix for excluding labels
   * @param _base - the base label to resolve the labels, must be an absolute label
   * @throws {@link InvalidLabel} if the label is invalid
   * @throws {@link NoMatchedPackages} if no matched packages are found
   * @throws {@link NoMatchedTarget} if no matched targets are found
   * @returns a `<TargetName, Target>` map of matched targets
   * @public
   */
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
