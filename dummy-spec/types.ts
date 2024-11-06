import type { Context } from "./context";

export type DummyBuildFileFnReturn =
  | Record<string, unknown>
  | { rules?: Record<string, unknown>; files: string[] }
  | { rules: Record<string, unknown>; files?: string[] }
  | { rules: Record<string, unknown>; files: string[] };

export interface DummyBuildFileFn {
  (context: Context): Promise<DummyBuildFileFnReturn> | DummyBuildFileFnReturn;
}
