import { http, HttpResponse } from "msw";
import { server } from "../../../tests/mocks";
import { describe, it, expect } from "vitest";
import { HttpClient } from "../../utils/http";
import { DiscoverApi } from "../discover";
import {
  FindMovieParams,
  FindMovieResponse,
  FindTvParams,
  FindTvResponse,
} from "../../types";

// Mock response
const mockFindMovieResponse: FindMovieResponse = {
  page: 1,
  results: [
    {
      adult: false,
      backdrop_path: "/backdrop.jpg",
      genre_ids: [28, 12],
      id: 123,
      original_language: "en",
      original_title: "Test Movie",
      overview: "A thrilling adventure.",
      popularity: 100,
      poster_path: "/poster.jpg",
      release_date: "2023-01-01",
      title: "Test Movie",
      video: false,
      vote_average: 7.5,
      vote_count: 1000,
    },
  ],
  total_pages: 1,
  total_results: 1,
};

const mockFindTvResponse: FindTvResponse = {
  page: 1,
  results: [
    {
      backdrop_path: "/backdrop.jpg",
      genre_ids: [18, 35],
      id: 456,
      origin_country: ["US"],
      original_language: "en",
      original_name: "Test Show",
      overview: "A comedic drama.",
      popularity: 50,
      poster_path: "/poster.jpg",
      first_air_date: "2023-01-01",
      name: "Test Show",
      vote_average: 8.0,
      vote_count: 500,
    },
  ],
  total_pages: 1,
  total_results: 1,
};

describe("DetailsApi", () => {
  const httpClient = new HttpClient({ apiKey: "test_api_key" });
  const discoverApi = new DiscoverApi(httpClient);

  describe("findMovie", () => {
    it("should find movies with filters", async () => {
      server.use(
        http.get(
          "https://api.themoviedb.org/3/discover/movie",
          ({ request }) => {
            const url = new URL(request.url);
            const params = Object.fromEntries(url.searchParams);
            if (!params.language) {
              return HttpResponse.json(
                { error: "Missing language" },
                { status: 400 },
              );
            }
            if (
              params.with_genres &&
              !["28", "12", "28|12"].includes(params.with_genres)
            ) {
              return HttpResponse.json(
                { error: "Invalid genres" },
                { status: 400 },
              );
            }
            return HttpResponse.json(mockFindMovieResponse, { status: 200 });
          },
        ),
      );
      const params: FindMovieParams = {
        language: "en-US",
        with_genres: "28|12", // Action OR Adventure
        primary_release_year: 2023,
      };
      const response = await discoverApi.findMovie(params);
      expect(response).toEqual(mockFindMovieResponse);
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
    describe("findTv", () => {
      it("should find TV shows with filters", async () => {
        // Handler defined here due to issues with src/utils/handlers.ts (MSW v2.9.0).
        // See findMovie test for details. Test moving to handlers.ts after MSW updates.
        server.use(
          http.get(
            "https://api.themoviedb.org/3/discover/tv",
            ({ request }) => {
              const url = new URL(request.url);
              const params = Object.fromEntries(url.searchParams);
              if (!params.language) {
                return HttpResponse.json(
                  { error: "Missing language" },
                  { status: 400 },
                );
              }
              if (
                params.with_genres &&
                !["18", "35", "18|35"].includes(params.with_genres)
              ) {
                return HttpResponse.json(
                  { error: "Invalid genres" },
                  { status: 400 },
                );
              }
              return HttpResponse.json(mockFindTvResponse, { status: 200 });
            },
          ),
        );
        const params: FindTvParams = {
          language: "en-US",
          with_genres: "18|35", // Drama OR Comedy
          first_air_date_year: 2023,
        };
        const response = await discoverApi.findTv(params);
        expect(response).toEqual(mockFindTvResponse);
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
  });
});
