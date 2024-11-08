const { expect, test } = require("bun:test");
test("should work with cjs", () => {
  const a = require("../dist/label/exports.cjs");
  expect(a).toMatchObject({ parse: expect.any(Function) });
});
