/**
 * @public
 */
export interface Label {
  /**
   * The scope of the package, typically following double slashes in label.
   * If the scope is `false`, it means the label is a relative label
   * If the scope is an empty string, it typically means main repository in most specs
   * @example
   * `@npm` in `@npm//foo`
   * empty string in `//foo`
   * `false` in `foo`
   */
  scope: string | false;
  /**
   * The known part of package path of the package
   * @example
   * `foo` in `//foo`
   * `foo/bar` in `//foo/bar`
   * `foo` in `@npm//foo/...`
   */
  package: string;
  /**
   * `includeSubPackages` is if the label includes sub-packages
   * @example
   * `true` in `//foo/...`
   * `false` in `//foo`
   */
  includeSubPackages: boolean;
  /**
   * The target of the package
   * @example
   * `bar` in `//foo:bar`
   * `wiz` in `//foo/bar/wiz` which includes an implicit target name
   * `all` in `//foo:all` which includes all targets in most specs
   */
  target: string;
}

/**
 * An absolute label is a label that must includes a scope
 * @public
 */
export interface AbsoluteLabel extends Label {
  scope: string;
}

/**
 * An exact label is a label that must includes a scope and cannot include sub-packages
 * @public
 */
export interface ExactLabel extends Label {
  scope: string;
  includeSubPackages: false;
}

/**
 * remove the leading `./` in the package path for label specs
 * @param path - the package path
 * @public
 */
export function normalizePackage(path: string) {
  if (path === ".") return "";
  if (path.startsWith("./")) return path.slice(2);
  return path;
}
