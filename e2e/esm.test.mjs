import { expect, test } from "bun:test";

test("should work with mjs", async () => {
  const a = import("../dist/label").then((r) => r.default || r);
  await expect(a).resolves.toMatchObject({ parse: expect.any(Function) });
});
