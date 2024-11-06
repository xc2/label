import { expect, test } from "bun:test";
import { invalids, labels } from "./__fixtures__/labels";
import { InvalidLabel } from "./exceptions";
import { parse, validateAbsolute } from "./parse.js";

test.each(labels)("parse (%p)", (label) => {
  expect(parse(label)).toMatchSnapshot();
});

test("accept parsed label", () => {
  const parsed = parse(labels[0]);
  expect(parse(parsed)).toBe(parsed);
});

test.each(invalids)('invalid label "%s"', (label) => {
  expect(() => parse(label)).toThrowError(InvalidLabel);
});

test("validate absolute label", () => {
  expect(() => validateAbsolute("foo")).toThrowError(InvalidLabel);
});
