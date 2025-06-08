import { describe, it, expect } from "vitest";
import { CompaniesApi } from "../../api";
import { HttpClient } from "../../utils";
import { getOpenApiExample } from "../../../tests/openapi";

describe("CompanyApi", () => {
  const httpClient = new HttpClient({
    apiKey: "test-key",
  });
  const companiesApi = new CompaniesApi(httpClient);
  it("should return a company details", async () => {
    const example = getOpenApiExample("/3/company/{company_id}", "get", "200");

    const response = await companiesApi.getDetails(123);
    expect(response).toEqual(example);
  });

  it("should return alternative names for a company", async () => {
    const example = getOpenApiExample(
      "/3/company/{company_id}/alternative_names",
      "get",
      "200",
    );
    const response = await companiesApi.getAlternativeNames(123);
    expect(response).toEqual(example);
  });

  it("should get a company logos by id", async () => {
    const example = getOpenApiExample(
      "/3/company/{company_id}/images",
      "get",
      "200",
    );
    const response = await companiesApi.getLogo(123);
    expect(response).toEqual(example);
  });
});
