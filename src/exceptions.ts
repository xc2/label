import { build } from "./build.js";
import type { Label } from "./label.js";

export class InvalidLabel extends Error {
  constructor(public label: string) {
    super(`Cannot parse label: ${label}`);
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
