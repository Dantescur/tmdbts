import { expect, it, describe } from "vitest";
import { GenresApi } from "../../api";
import { HttpClient } from "../../utils";
import { getOpenApiExample } from "../../../tests/openapi";

describe("GenresApi", () => {
  const http = new HttpClient({ apiKey: "test-key" });
  const genresApi = new GenresApi(http);
  it("should return get a list of movies genres", async () => {
    const example = getOpenApiExample("/3/genre/movie/list", "get", "200");
    const response = await genresApi.listMovies();
    expect(response).toEqual(example);
  });

  it("should return get a list of tv genres", async () => {
    const example = getOpenApiExample("/3/genre/tv/list", "get", "200");
    const response = await genresApi.listTvs();
    expect(response).toEqual(example);
  });
});
