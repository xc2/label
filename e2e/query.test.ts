import { test } from "bun:test";
import * as NodePath from "node:path";
import { TargetQuery } from "../src/query";
import { BazelLikeFsSpec } from "./__fixtures__/bazel-like-fs-spec";

const FixturesRoot = NodePath.resolve(__dirname, "__fixtures__");
test("test query", async () => {
  const spec = new BazelLikeFsSpec((label) =>
    label.scope === ""
      ? NodePath.resolve(FixturesRoot, "workspace-basic")
      : NodePath.resolve(FixturesRoot, label.scope)
  );

  const query = new TargetQuery(spec);

  await query.query(["//"]);
});
