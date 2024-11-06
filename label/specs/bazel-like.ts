import type { ExactLabel, Label } from "../label";
import type { Spec } from "../query";

export interface BazelRuleTarget {
  type: "rule";
  rule: unknown;
}
export interface BazelFileTarget {
  type: "file";
  file: unknown;
}
export type BazelTarget = BazelRuleTarget | BazelFileTarget;

export const BazelWildcardTargets = {
  AllTargets: ["all-targets", "*"],
  AllRules: ["all"],
};

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
