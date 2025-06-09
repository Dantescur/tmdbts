import { http, HttpResponse } from "msw";
import { server } from "../../../tests/mocks";
import { describe, it, expect } from "vitest";
import { HttpClient } from "../../utils/http";
import { DiscoverApi } from "../discover";
import { getOpenApiExample } from "../../../tests/openapi";
import { FindMovieParams, FindTvParams } from "../../types";

describe("DetailsApi", () => {
  const httpClient = new HttpClient({ apiKey: "test_api_key" });
  const discoverApi = new DiscoverApi(httpClient);

  describe("findMovie", () => {
    const example = getOpenApiExample("/3/discover/movie", "get", "200");
    it("should find movies with filters", async () => {
      const params: FindMovieParams = {
        language: "en-US",
        with_genres: "28|12",
        primary_release_year: 2023,
      };
      const response = await discoverApi.findMovie(params);
      expect(response).toEqual(example);
    });

    it("should throw TmdbError on invalid parameters", async () => {
      server.use(
        http.get("https://api.themoviedb.org/3/discover/movie", () => {
          return HttpResponse.json(
            { error: "Missing language" },
            { status: 400 },
          );
        }),
      );
      await expect(discoverApi.findMovie({})).rejects.toThrow(
        /TMDB API Error: 400/,
      );
    });
  });

  describe("findTv", () => {
    it("should find TV shows with filters", async () => {
      const example = getOpenApiExample("/3/discover/tv", "get", "200");
      const params: FindTvParams = {
        language: "en-US",
        with_genres: "18|35",
        first_air_date_year: 2023,
      };
      const response = await discoverApi.findTv(params);
      expect(response).toEqual(example);
    });

    it("should throw TmdbError on invalid parameters", async () => {
      server.use(
        http.get("https://api.themoviedb.org/3/discover/tv", () => {
          return HttpResponse.json(
            { error: "Missing language" },
            { status: 400 },
          );
        }),
      );
      await expect(discoverApi.findTv({})).rejects.toThrow(
        /TMDB API Error: 400/,
      );
    });
  });

  describe("findById", () => {
    it("should find movie by external id", async () => {
      const example = getOpenApiExample("/3/find/{external_id}", "get", "200");
      const response = await discoverApi.findById("123432", {
        external_sources: "imdb_id",
      });
      expect(response).toEqual(example);
    });
  });
});
