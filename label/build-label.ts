import type { Label } from "./label";

/**
 * Build a label string from a parsed `Label` object
 * @public
 * @example
 * ```ts
 * import { build } from "@109cafe/label";
 * build({ package: "foo", target: "bar" }); // foo:bar
 * build({ package: "foo", includeSubPackages: true }); // foo/...
 * build({ scope: "", package: "foo" }); // //foo
 * build({ scope: "@npm", package: "foo" }); // @npm//foo
 * ```
 * @param parsed - The parsed `Label` object
 * @returns The label string
 */
export function build(parsed: Label): string {
  let label = "";
  if (typeof parsed.scope === "string") {
    label += `${parsed.scope}//`;
  }

  label += [parsed.package || "", parsed.includeSubPackages ? "..." : ""].filter(Boolean).join("/");
  if (parsed.target) {
    label += `:${parsed.target}`;
  }
  return label;
}
