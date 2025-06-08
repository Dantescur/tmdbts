import { expect, it, describe } from "vitest";
import { HttpClient } from "../../utils";
import { http, HttpResponse } from "msw";
import { server } from "../../../tests/mocks";
import { CollectionsApi } from "../collections";
import { getOpenApiExample } from "../../../tests/openapi";

describe("CollectionApi", () => {
  const httpClient = new HttpClient({ apiKey: "test-key" });
  const collectionsApi = new CollectionsApi(httpClient);

  describe("getDetails", () => {
    it("should get collection details", async () => {
      const example = getOpenApiExample(
        "/3/collection/{collection_id}",
        "get",
        "200",
      );
      const response = await collectionsApi.getDetails(10, {
        language: "en-US",
      });
      expect(response).toEqual(example);
    });

    it("should throw TmdbError on invalid collection ID", async () => {
      const example = getOpenApiExample(
        "/3/collection/{collection_id}",
        "get",
        "200",
      );

      server.use(
        http.get(
          "https://api.themoviedb.org/3/collection/:id",
          ({ params }) => {
            if (params.id !== "10") {
              return HttpResponse.json(
                { error: "Invalid collection ID" },
                { status: 404 },
              );
            }
            return HttpResponse.json(example, { status: 200 });
          },
        ),
      );
      await expect(
        collectionsApi.getDetails(999, { language: "en-US" }),
      ).rejects.toThrow(/TMDB API Error: 404/);
    });
  });

  describe("getImages", () => {
    it("should get collection images", async () => {
      const example = getOpenApiExample(
        "/3/collection/{collection_id}/images",
        "get",
        "200",
      );
      const response = await collectionsApi.getImages(10, {
        language: "en-US",
        include_image_language: "en,null",
      });
      expect(response).toEqual(example);
    });

    it("should throw TmdbError on invalid collection ID for images", async () => {
      const example = getOpenApiExample(
        "/3/collection/{collection_id}/images",
        "get",
        "200",
      );
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
            return HttpResponse.json(example, { status: 200 });
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
      const example = getOpenApiExample(
        "/3/collection/{collection_id}/translations",
        "get",
        "200",
      );
      const response = await collectionsApi.getTranslations(10);
      expect(response).toEqual(example);
    });

    it("should throw TmdbError on invalid collection ID", async () => {
      const example = getOpenApiExample(
        "/3/collection/{collection_id}/translations",
        "get",
        "200",
      );
      server.use(
        http.get(
          "https://api.themoviedb.org/3/collection/:id/translations",
          ({ params }) => {
            if (params.id !== "10") {
              return HttpResponse.json(
                { error: "Invalid collection ID" },
                { status: 404 },
              );
            }
            return HttpResponse.json(example, { status: 200 });
          },
        ),
      );
      await expect(collectionsApi.getTranslations(999)).rejects.toThrow(
        /TMDB API Error: 404/,
      );
    });
  });
});
