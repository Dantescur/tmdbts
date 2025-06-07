import { describe, expect, it } from "vitest";
import { DEFAULT_COMMON_PARAMS } from "../../types";

describe("DEFAULT_COMMON_PARAMS", () => {
  it("should match the default values", () => {
    expect(DEFAULT_COMMON_PARAMS).toEqual({
      language: "en-US",
      page: 1,
      sort_by: "created_at.asc",
    });
  });
});
