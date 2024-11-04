export const SpecialTargetTypes = {
  ALL_TARGETS: Symbol.for("All Targets (Rules and Files)"),
  ALL_RULES: Symbol.for("All Rules Targets"),
} as const;

export const SpecialScopes = {
  UNKNOWN: Symbol.for("Relative so unknown"),
};
export interface Label {
  scope: string | symbol;
  package: string;
  includeSubPackages: boolean;
  target: symbol | string;
}

export function isRelative(label: Label) {
  return label.scope === SpecialScopes.UNKNOWN;
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
