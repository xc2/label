import { type Label, SpecialTargetTypes } from "./label.js";

export function build(parsed: Label): string {
  let label = "";
  if (typeof parsed.scope === "string") {
    label += `${parsed.scope}//`;
  }

  label += [parsed.package || "", parsed.includeSubPackages ? "..." : ""].filter(Boolean).join("/");
  if (parsed.target === SpecialTargetTypes.ALL_TARGETS) {
    label += ":*";
  } else if (parsed.target === SpecialTargetTypes.ALL_RULES) {
    label += ":all";
  } else if (parsed.target && typeof parsed.target === "string") {
    label += `:${parsed.target}`;
  }
  return label;
}
