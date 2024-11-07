import { type BazelTarget, TargetQuery } from "../label/exports";
import { DummySpec, type DummySpecOptions } from "./dummy-spec";

export class DummyQuery extends TargetQuery<BazelTarget> {
  constructor(context: string, options?: DummySpecOptions) {
    super(new DummySpec(context, options));
  }
}
