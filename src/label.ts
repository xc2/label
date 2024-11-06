export interface Label {
  scope: string | false;
  package: string;
  includeSubPackages: boolean;
  target: string;
}
export interface AbsoluteLabel extends Label {
  scope: string;
}

export interface ExactLabel extends Label {
  scope: string;
  includeSubPackages: false;
}

export function normalizePackage(path: string) {
  if (path === ".") return "";
  if (path.startsWith("./")) return path.slice(2);
  return path;
}
