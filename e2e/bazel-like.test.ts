import { describe, expect, test } from "bun:test";
import * as NodePath from "node:path";
import { InvalidLabel, NoMatchedPackages, NoMatchedTarget } from "../src/exceptions";
import { TargetQuery } from "../src/query";
import { BazelLikeFsSpec } from "./__fixtures__/bazel-like-fs-spec";

const FixturesRoot = NodePath.resolve(__dirname, "__fixtures__");

describe("bazel-like query", () => {
  const spec = new BazelLikeFsSpec((label) =>
    label.scope === ""
      ? NodePath.resolve(FixturesRoot, "workspace-basic", label.package)
      : NodePath.resolve(FixturesRoot, label.scope, label.package)
  );

  const tq = new TargetQuery(spec);
  test("should throw if no matched packages", async () => {
    await expect(tq.query(["//"])).rejects.toThrowError(NoMatchedPackages);
  });
  test("should throw if no matched targets", async () => {
    await expect(tq.query(["//foo/bar:non-exists"])).rejects.toThrowError(NoMatchedTarget);
  });

  test("should throw if package is ... and named target is given", async () => {
    await expect(tq.query(["//...:named"])).rejects.toThrowError(InvalidLabel);
  });

  test("should match specific taraget", async () => {
    await expect(tq.query(["foo/bar:wiz"])).resolves.toMatchSnapshot();
    await expect(tq.query(["foo/bar:file.txt"])).resolves.toMatchSnapshot();
  });
  test("should match default target if target is not given", async () => {
    await expect(tq.query(["foo/bar"])).resolves.toMatchSnapshot();
  });
  test('should match all rules if target is "all"', async () => {
    await expect(tq.query(["foo/bar:all"])).resolves.toMatchSnapshot();
  });

  test("should match all rules if package is ...", async () => {
    await expect(tq.query(["//foo/..."])).resolves.toMatchSnapshot();
  });

  test.each(["all-targets", "*"])(
    'should match all rules and files if target is "%s"',
    async (target) => {
      await expect(tq.query([`foo/bar:${target}`])).resolves.toMatchSnapshot();
    }
  );
  test("should exclude specific target", async () => {
    await expect(tq.query(["//foo/bar:all", "-//foo/bar:wiz"])).resolves.toMatchSnapshot();
  });

  test("should match repo target", async () => {
    await expect(tq.query(["@foo//:ababa"])).resolves.toMatchSnapshot();
  });
});
