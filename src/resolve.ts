import { CannotResolveFromSubPackages } from "./exceptions.js";
import type { Label } from "./label.js";

export function resolve<F extends Label, T extends Partial<Label>>(from: F, to: T): F | T {
  if (from.includeSubPackages) {
    throw new CannotResolveFromSubPackages(from);
  }
  return {
    scope: typeof to.scope === "string" ? to.scope : from.scope,
    package: [from.package, to.package ?? ""].filter(Boolean).join("/"),
    includeSubPackages: to.includeSubPackages ?? from.includeSubPackages,
    target: to.target ?? from.target,
  } satisfies Label as any;
}
