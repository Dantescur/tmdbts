import { describe, it, expect } from "vitest";
import { getOpenApiExample } from "../../../tests/openapi";
import { HttpClient } from "../../utils";
import { ConfigApi } from "../../api";

describe("ConfigApi", () => {
  const httpClient = new HttpClient({
    apiKey: "test-key",
  });
  const configApi = new ConfigApi(httpClient);

  it("should return configuration details", async () => {
    const example = getOpenApiExample("/3/configuration", "get", "200");
    const response = await configApi.getDetails();
    expect(response).toEqual(example);
  });

  it("should return valid ISO countries", async () => {
    const example = getOpenApiExample(
      "/3/configuration/countries",
      "get",
      "200",
    );
    const response = await configApi.getIsoCountries();
    expect(response).toEqual(example);
  });

  it("should return valid jobs response", async () => {
    const example = getOpenApiExample("/3/configuration/jobs", "get", "200");
    const response = await configApi.getJobs();
    expect(response).toEqual(example);
  });

  it("should return valid languages response", async () => {
    const example = getOpenApiExample(
      "/3/configuration/languages",
      "get",
      "200",
    );
    const response = await configApi.getLanguages();
    expect(response).toEqual(example);
  });

  it("should return valid timezones response", async () => {
    const example = getOpenApiExample(
      "/3/configuration/timezones",
      "get",
      "200",
    );
    const response = await configApi.getTimezones();
    expect(response).toEqual(example);
  });
});
