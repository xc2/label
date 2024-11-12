import { build } from "./build-label";
import type { Label } from "./label";

/**
 * Exception for invalid label
 * @public
 */
export class InvalidLabel extends Error {
  readonly label: string;
  constructor(label: string | Label, message?: string) {
    label = typeof label === "string" ? label : build(label);
    super(message || `invalid label: ` + label);
    this.label = label;
  }
}

/**
 * Exception for resolving from sub-packages
 * @public
 */
export class CannotResolveFromSubPackages extends Error {
  constructor(public label: Label) {
    super("Cannot resolve from a label that includes subpackages: " + build(label));
  }
}

/**
 * Exception for no matched packages found
 * @public
 */
export class NoMatchedPackages extends Error {
  constructor(public label: Label) {
    super("Cannot find any matched packages: " + build(label));
  }
}

/**
 * Exception for no matched target found
 * @public
 */
export class NoMatchedTarget extends Error {
  constructor(public label: Label) {
    super("Cannot find any matched target: " + build(label));
  }
}
