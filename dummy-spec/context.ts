import { type GlobOptionsWithFileTypesUnset, glob } from "glob";
import { defaultsDeep } from "lodash-es";

interface Glob {
  (pattern: string, options: GlobOptionsWithFileTypesUnset): Promise<string[]>;
}
export function getContext({ workspace, pkg }: Omit<Context, "tools">): Context {
  return { tools: { glob, defaults: defaultsDeep }, workspace, pkg };
}

export interface Context {
  workspace: string;
  pkg: string;
  tools: ContextTools;
}
export interface ContextTools {
  glob: Glob;
  defaults: typeof defaultsDeep;
}
