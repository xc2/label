import { expect, test } from "bun:test";
import { labels } from "./__fixtures__/labels";
import { parse } from "./parse.js";

test.each(labels)("parse (%p)", (label) => {
  expect(parse(label)).toMatchSnapshot();
});
