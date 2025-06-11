import { expect, it, describe } from "vitest";
import { KeywordsApi } from "../../api";
import { HttpClient } from "../../utils";
import { getOpenApiExample } from "../../../tests/openapi";

describe("KeywordsApi", () => {
  const http = new HttpClient({ apiKey: "test-key" });
  const keywords = new KeywordsApi(http);

  it("should return correct keyword response", async () => {
    const example = getOpenApiExample("/3/keyword/{keyword_id}", "get", "200");
    const response = await keywords.details(1702);
    expect(response).toEqual(example);
  });
});
