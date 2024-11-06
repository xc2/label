import { InvalidLabel } from "./exceptions.js";
import type { AbsoluteLabel, Label } from "./label.js";

function determineTarget(target: string, packageLastPart: string): string {
  if (target) {
    return target;
  } else {
    if (packageLastPart === "...") {
      return target;
    } else {
      // //foo
      return packageLastPart;
    }
  }
}

export function parse(label: string | Label): Label {
  if (typeof label !== "string") {
    return label;
  }
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

export function parseAbsolute(label: string | Label): AbsoluteLabel {
  const l = parse(label);
  if (l.scope !== false) {
    return l as AbsoluteLabel;
  }
  throw new InvalidLabel(label, "must be an absolute label");
}
