export const SpecialTargetTypes = {
  ALL_TARGETS: Symbol.for("All Targets (Rules and Files)"),
  ALL_RULES: Symbol.for("All Rules Targets"),
} as const;

export interface Label {
  scope: string | false;
  package: string;
  includeSubPackages: boolean;
  target: symbol | string;
}
export interface AbsoluteLabel extends Label {
  scope: string;
}

export function isRelative(label: Label): label is AbsoluteLabel {
  return label.scope === false;
}
export function isWorkspaceScope(label: Label) {
  return label.scope === "";
}

export function clone(label: Label) {
  return { ...label };
}

export interface ExactLabel extends Label {
  scope: string;
  target: string;
  includeSubPackages: false;
}
