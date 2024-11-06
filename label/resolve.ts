import { CannotResolveFromSubPackages } from "./exceptions";
import { type Label, normalizePackage } from "./label";

export function resolve<F extends Label, T extends Partial<Label>>(from: F, to: T): F & T {
  if (from.includeSubPackages) {
    throw new CannotResolveFromSubPackages(from);
  }
  return {
    scope: typeof to.scope === "string" ? to.scope : from.scope,
    package: [from.package, to.package ?? ""].map(normalizePackage).filter(Boolean).join("/"),
    includeSubPackages: to.includeSubPackages ?? from.includeSubPackages,
    target: to.target ?? from.target,
  } satisfies Label as any;
}
