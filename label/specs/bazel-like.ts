import type { ExactLabel, Label } from "../label";
import type { Spec } from "../query";

/**
 * Rule target type
 * @public
 */
export interface BazelRuleTarget {
  type: "rule";
  rule: unknown;
}

/**
 * File target type
 * @public
 */
export interface BazelFileTarget {
  type: "file";
  file: unknown;
}

/**
 * Bazel target type
 * @public
 */
export type BazelTarget = BazelRuleTarget | BazelFileTarget;

/**
 * Bazel wildcard targets
 * @public
 */
export const BazelWildcardTargets = {
  /**
   * indicates all rule targets and file targets in the package
   */
  AllTargets: ["all-targets", "*"],
  /**
   * indicates all rule targets in the package
   */
  AllRules: ["all"],
};

/**
 * An abstract spec for Bazel-like build systems
 * @public
 */
export abstract class BazelLikeSpec<Target extends BazelTarget> implements Spec<Target> {
  validate(label: Label) {
    if (
      label.includeSubPackages &&
      label.target &&
      !BazelWildcardTargets.AllTargets.concat(BazelWildcardTargets.AllRules).includes(label.target)
    ) {
      return "`...` can only be used with wildcard targets";
    }
  }
  extract(targets: Record<string, Target>, target: string): string | string[] | null {
    target = target || "all";
    if (BazelWildcardTargets.AllTargets.includes(target)) {
      return Object.keys(targets);
    } else if (BazelWildcardTargets.AllRules.includes(target)) {
      return Object.keys(targets).filter((v) => targets[v].type === "rule");
    } else if (Object.hasOwn(targets, target)) {
      return target;
    }
    return null;
  }
  abstract lookup(label: Label): Promise<ExactLabel[]>;
  abstract load(pkg: ExactLabel): Promise<Record<string, Target>>;
}
