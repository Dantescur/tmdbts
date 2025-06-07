import { expect, it, describe } from "vitest";
import { HttpClient } from "../../utils";
import { http, HttpResponse } from "msw";
import { server } from "../../../tests/mocks";
import { CollectionsApi } from "../collections";
import {
  CollectionDetailsResponse,
  CollectionImagesResponse,
  CollectionTranslationResponse,
} from "../../types";

const mockDetailsResponse: CollectionDetailsResponse = {
  id: 10,
  name: "Star Wars Collection",
  overview: "A saga of good versus evil, set in a galaxy far, far away.",
  poster_path: "/starwars_poster.jpg",
  backdrop_path: "/starwars_backdrop.jpg",
  parts: [
    {
      id: 11,
      original_language: "en",
      original_title: "Star Wars",
      media_type: "movie",
      genre_ids: [4],
      popularity: 8,
      video: true,
      vote_average: 8.0,
      vote_count: 100,
      title: "Star Wars: Episode IV - A New Hope",
      release_date: "1977-05-25",
      overview: "Luke Skywalker begins his journey.",
      poster_path: "/ep4_poster.jpg",
      adult: false,
      backdrop_path: "/starwars_backdrop.jpg",
    },
  ],
};

const mockImagesResponse: CollectionImagesResponse = {
  id: 10,
  backdrops: [
    {
      aspect_ratio: 1.78,
      file_path: "/backdrop1.jpg",
      height: 1080,
      width: 1920,
      iso_639_1: "en",
      vote_average: 5.0,
      vote_count: 10,
    },
  ],
  posters: [
    {
      aspect_ratio: 0.67,
      file_path: "/poster1.jpg",
      height: 1500,
      width: 1000,
      iso_639_1: "en",
      vote_average: 4.5,
      vote_count: 8,
    },
  ],
};

const mockTranslationsResponse: CollectionTranslationResponse = {
  id: 10,
  translations: [
    {
      iso_3166_1: "FR",
      iso_639_1: "fr",
      name: "Collection Star Wars",
      english_name: "Star Wars Collection",
      data: {
        title: "Star Wars",
        overview: "Une saga épique dans une galaxie lointaine.",
        homepage: "",
      },
    },
  ],
};

describe("CollectionApi", () => {
  const httpClient = new HttpClient({ apiKey: "test-key" });
  const collectionsApi = new CollectionsApi(httpClient);
  it("should get collection details", async () => {
    server.use(
      http.get(
        "https://api.themoviedb.org/3/collection/:id",
        ({ params, request }) => {
          const url = new URL(request.url);
          if (params.id !== "10") {
            return HttpResponse.json(
              { error: "Invalid collection ID" },
              { status: 404 },
            );
          }
          if (!url.searchParams.get("language")) {
            return HttpResponse.json(
              { error: "Missing language" },
              { status: 400 },
            );
          }
          return HttpResponse.json(mockDetailsResponse, { status: 200 });
        },
      ),
    );
    const response = await collectionsApi.getDetails(10, { language: "en-US" });
    expect(response).toEqual(mockDetailsResponse);
  });

  it("should throw TmdbError on invalid collection ID", async () => {
    server.use(
      http.get("https://api.themoviedb.org/3/collection/:id", ({ params }) => {
        if (params.id !== "10") {
          return HttpResponse.json(
            { error: "Invalid collection ID" },
            { status: 404 },
          );
        }
        return HttpResponse.json(mockDetailsResponse, { status: 200 });
      }),
    );
    await expect(
      collectionsApi.getDetails(999, { language: "en-US" }),
    ).rejects.toThrow(/TMDB API Error: 404/);
  });

  describe("getImages", () => {
    it("should get collection images", async () => {
      server.use(
        http.get(
          "https://api.themoviedb.org/3/collection/:id/images",
          ({ params, request }) => {
            const url = new URL(request.url);
            if (params.id !== "10") {
              return HttpResponse.json(
                { error: "Invalid collection ID" },
                { status: 404 },
              );
            }
            if (!url.searchParams.get("language")) {
              return HttpResponse.json(
                { error: "Missing language" },
                { status: 400 },
              );
            }
            return HttpResponse.json(mockImagesResponse, { status: 200 });
          },
        ),
      );
      const response = await collectionsApi.getImages(10, {
        language: "en-US",
        include_image_language: "en,null",
      });
      expect(response).toEqual(mockImagesResponse);
    });

    it("should throw TmdbError on invalid collection ID", async () => {
      server.use(
        http.get(
          "https://api.themoviedb.org/3/collection/:id/images",
          ({ params }) => {
            if (params.id !== "10") {
              return HttpResponse.json(
                { error: "Invalid collection ID" },
                { status: 404 },
              );
            }
            return HttpResponse.json(mockImagesResponse, { status: 200 });
          },
        ),
      );
      await expect(
        collectionsApi.getImages(999, {
          language: "en-US",
          include_image_language: "en,null",
        }),
      ).rejects.toThrow(/TMDB API Error: 404/);
    });
  });

  describe("getTranslations", () => {
    it("should get collection translations", async () => {
      server.use(
        http.get(
          "https://api.themoviedb.org/3/collections/:id/translations",
          ({ params }) => {
            if (params.id !== "10") {
              return HttpResponse.json(
                { error: "Invalid collection ID" },
                { status: 404 },
              );
            }
            return HttpResponse.json(mockTranslationsResponse, { status: 200 });
          },
        ),
      );
      const response = await collectionsApi.getTranslations(10);
      expect(response).toEqual(mockTranslationsResponse);
    });

    it("should throw TmdbError on invalid collection ID", async () => {
      server.use(
        http.get(
          "https://api.themoviedb.org/3/collections/:id/translations",
          ({ params }) => {
            if (params.id !== "10") {
              return HttpResponse.json(
                { error: "Invalid collection ID" },
                { status: 404 },
              );
            }
            return HttpResponse.json(mockTranslationsResponse, { status: 200 });
          },
        ),
      );
      await expect(collectionsApi.getTranslations(999)).rejects.toThrow(
        /TMDB API Error: 404/,
      );
    });
  });
});
