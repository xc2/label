import type { Label } from "./label.js";

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
