import { InvalidLabel } from "./exceptions.js";
import { type Label, SpecialTargetTypes } from "./label.js";

function determineTarget(target: string, packageLastPart: string) {
  if (target) {
    if (["*", "all-targets"].includes(target)) {
      // :*, :all-targets
      return SpecialTargetTypes.ALL_TARGETS;
    } else if (target === "all") {
      // :all
      return SpecialTargetTypes.ALL_RULES;
    } else {
      // :foo, :foo.bzl
      return target;
    }
  } else {
    if (packageLastPart === "...") {
      // //...
      return SpecialTargetTypes.ALL_RULES;
    } else {
      // //foo
      return packageLastPart;
    }
  }
}

export function parse(label: string): Label {
  const [match, _scope, _repoName, _packagePath, _targetName] =
    label.match(
      //12222222211111  3333333    4444
      /^(([^\/]+)?\/\/)?([^:]*)(?::(.+))?/
    ) || [];
  if (!match) {
    throw new InvalidLabel(label);
  }
  const packageLastPart = _packagePath.split("/").pop() || "";
  const includeSubPackages = packageLastPart === "...";
  const packagePath = includeSubPackages ? _packagePath.slice(0, -4) : _packagePath;

  const target = determineTarget(_targetName, packageLastPart);

  return {
    scope: _scope ? _repoName || "" : false,
    package: packagePath,
    includeSubPackages,
    target,
  } as Label;
}
