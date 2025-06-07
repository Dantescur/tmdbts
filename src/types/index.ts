/*
  types/index.ts
*/
import { CommonParams } from "./account";

/*
  types/index.ts
*/
export * from "./account";
export * from "./common";
export * from "./auth";
export * from "./certs";
export * from "./changes";

export const DEFAULT_COMMON_PARAMS: CommonParams = {
  language: "en-US",
  page: 1,
  sort_by: "created_at.asc",
};
