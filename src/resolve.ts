import { CannotResolveFromSubPackages } from "./exceptions.js";
import { type Label, clone, isRelative } from "./label.js";
import { parse } from "./parse.js";

export function resolve(_from: string | Label, _to: string | Label): Label {
  const from = typeof _from === "string" ? parse(_from) : _from;
  const to = typeof _to === "string" ? parse(_to) : _to;
  if (from.includeSubPackages) {
    throw new CannotResolveFromSubPackages(from);
  }
  if (!isRelative(to)) {
    return clone(to);
  }
  return {
    scope: from.scope,
    package: [from.package, to.package].filter(Boolean).join("/"),
    includeSubPackages: to.includeSubPackages,
    target: to.target,
  };
}
