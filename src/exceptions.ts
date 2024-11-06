import { build } from "./build.js";
import type { Label } from "./label.js";

export class InvalidLabel extends Error {
  readonly label: string;
  constructor(label: string | Label, message?: string) {
    label = typeof label === "string" ? label : build(label);
    super(message || `invalid label: ` + label);
    this.label = label;
  }
}

export class CannotResolveFromSubPackages extends Error {
  constructor(public label: Label) {
    super("Cannot resolve from a label that includes subpackages: " + build(label));
  }
}

export class NoMatchedPackages extends Error {
  constructor(public label: Label) {
    super("Cannot find any matched packages: " + build(label));
  }
}

export class NoMatchedTarget extends Error {
  constructor(public label: Label) {
    super("Cannot find any matched target: " + build(label));
  }
}
