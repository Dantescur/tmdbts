import { expect, it, describe } from "vitest";
import { ChangesApi } from "../../api";
import { HttpClient } from "../../utils";
import { getOpenApiExample } from "../../../tests/openapi";
import { server } from "../../../tests/mocks";
import { http, HttpResponse } from "msw";

describe("ChangesApi", () => {
  const httpClient = new HttpClient({ apiKey: "test-key" });
  const changesApi = new ChangesApi(httpClient);
  it("should return latest changed movies id", async () => {
    const example = getOpenApiExample("/3/movie/changes", "get", "200");
    server.use(
      http.get("https://api.themoviedb.org/3/movie/changes", () => {
        return HttpResponse.json(example);
      }),
    );
    const response = await changesApi.getChangedMovieIds();
    expect(response).toEqual(example);
  });
});
