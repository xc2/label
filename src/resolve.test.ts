import { expect, test } from "bun:test";
import { CannotResolveFromSubPackages } from "./exceptions";
import { parse } from "./parse";
import { resolve } from "./resolve";

test("cannot resolve from ...", () => {
  expect(() => resolve(parse("//..."), parse("foo"))).toThrowError(CannotResolveFromSubPackages);
});
