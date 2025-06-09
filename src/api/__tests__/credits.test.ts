import { expect, it, describe } from "vitest";
import { CreditsApi } from "../../api";
import { HttpClient } from "../../utils";
import { getOpenApiExample } from "../../../tests/openapi";

describe("CreditsApi", () => {
  const httpClient = new HttpClient({ apiKey: "test-key" });
  const creditsApi = new CreditsApi(httpClient);

  it("should return valid credits", async () => {
    const example = getOpenApiExample("/3/credit/{credit_id}", "get", "200");
    const response = await creditsApi.get("aacfds");
    expect(response).toEqual(example);
  });
});
