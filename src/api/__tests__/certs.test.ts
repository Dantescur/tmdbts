import { expect, it, describe } from "vitest";
import { CertsApi } from "../certs";
import { HttpClient } from "../../utils";
import { getOpenApiExample } from "../../../tests/openapi";

describe("CertsApi", () => {
  const httpClient = new HttpClient({ apiKey: "test-key" });
  const certApi = new CertsApi(httpClient);

  it("should list all movies certificates", async () => {
    const example = getOpenApiExample(
      "/3/certification/movie/list",
      "get",
      "200",
    );

    const response = await certApi.getMovieCertifications();
    expect(response).toEqual(example);
  });

  it("should list all tv certificates", async () => {
    const example = getOpenApiExample("/3/certification/tv/list", "get", "200");

    const response = await certApi.getTvCertifications();
    expect(response).toEqual(example);
  });
});
