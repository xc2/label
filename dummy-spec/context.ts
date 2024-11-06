import { glob } from "glob";
import { defaultsDeep } from "lodash-es";

export function getContext() {
  return { tools: { glob, defaults: defaultsDeep } };
}

export type Context = ReturnType<typeof getContext>;
