import { CannotResolveFromSubPackages } from "./exceptions";
import { type Label, normalizePackage } from "./label";

/**
 * Resolve a label from another label
 * @example
 * ```ts
 * import { resolve } from "@109cafe/label";
 * resolve({ package: "foo" }, { package: "bar" }); // { package: "foo/bar" }
 * resolve({ package: "foo" }, { scope: "", package: "bar" }); // { package: "//bar" }
 * resolve({ package: "foo" }, { package: "bar", target: "baz" }); // { package: "foo/bar", target: "baz" }
 * resolve({ package: "foo", target: "bar" }, { includeSubPackages: true }); // { package: "foo", includeSubPackages: true, target: "bar" }
 * ```
 * @public
 * @param from - the label to resolve from
 * @param to - the label to resolve to
 * @throws {@link CannotResolveFromSubPackages} if the `from` label includes subpackages
 */
export function resolve<F extends Label, T extends Partial<Label>>(from: F, to: T): F & T {
  if (from.includeSubPackages) {
    throw new CannotResolveFromSubPackages(from);
  }
  const scope = typeof to.scope === "string" ? to.scope : from.scope;
  const includeSubPackages = to.includeSubPackages ?? from.includeSubPackages;
  return {
    scope,
    package: [typeof to.scope === "string" ? "" : from.package, to.package ?? ""]
      .map(normalizePackage)
      .filter(Boolean)
      .join("/"),
    includeSubPackages,
    target: to.target ?? from.target,
  } satisfies Label as any;
}
