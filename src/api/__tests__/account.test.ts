// src/api/account.test.ts
import { describe, it, expect, afterEach } from "vitest";
import { AccountApi } from "../account";
import { HttpClient } from "../../utils/http";
import { http, HttpResponse } from "msw";
import { server } from "../../../tests/mocks";
import { getOpenApiExample } from "../../../tests/openapi";
import specs from "../../../api.specs.json";

describe("AccountApi", () => {
  const httpClient = new HttpClient({ apiKey: "test-key" });
  const accountApi = new AccountApi(httpClient);

  afterEach(() => {
    server.resetHandlers(); // Reset handlers to global defaults after each test
  });

  // it("should get account details", async () => {
  //   const response = await accountApi.getDetails(123, "session123");
  //   expect(response).toEqual(mockDetailResponse);
  // });

  it("should get account details", async () => {
    // HACK: MSW Quirk Notice:
    // This handler lives here because MSW v2.9.0 ghosts requests when it's in handlers.ts
    // Tried everything: :id params, regex paths - no dice. Current workaround works.
    // Try moving back after MSW updates (tracking #mswjs/issues)
    // server.use(
    //   http.get<{ id: string }>(
    //     "https://api.themoviedb.org/3/account/:id",
    //     ({ request, params }) => {
    //       const url = new URL(request.url);
    //       if (!url.searchParams.get("session_id")) {
    //         return HttpResponse.json(
    //           { error: "Missing session_id" },
    //           { status: 401 },
    //         );
    //       }
    //       if (params.id !== "123") {
    //         return HttpResponse.json(
    //           { error: "Invalid account ID" },
    //           { status: 404 },
    //         );
    //       }
    //       return HttpResponse.json(mockDetailResponse, { status: 200 });
    //     },
    //   ),
    // );
    const response = await accountApi.getDetails(123, "session123");
    const example =
      specs.paths["/3/account/{account_id}"].get.responses[200].content[
        "application/json"
      ].examples.Result.value;
    expect(response).toEqual(JSON.parse(example));
  });

  it("should throw TmdbError on invalid accountId", async () => {
    // Same handler as above for consistency
    server.use(
      http.get<{ id: string }>(
        "https://api.themoviedb.org/3/account/:id",
        ({ params, request }) => {
          const url = new URL(request.url);
          if (!url.searchParams.get("session_id")) {
            return HttpResponse.json(
              { error: "Missing session_id" },
              { status: 401 },
            );
          }
          if (params.id !== "123") {
            return HttpResponse.json(
              { error: "Invalid account ID" },
              { status: 404 },
            );
          }

          const example =
            specs.paths["/3/account/{account_id}"].get.responses[200].content[
              "application/json"
            ].examples.Result.value;

          return HttpResponse.json(example, { status: 200 });
        },
      ),
    );
    await expect(accountApi.getDetails(999, "session123")).rejects.toThrow(
      /TMDB API Error: 404/,
    );
  });

  it("should NOT include session_id param if undefined", async () => {
    const example =
      specs.paths["/3/account/{account_id}"].get.responses[200].content[
        "application/json"
      ].examples.Result.value;
    let receivedUrl: URL | undefined;

    server.use(
      http.get("https://api.themoviedb.org/3/account/:id", ({ request }) => {
        receivedUrl = new URL(request.url);

        return HttpResponse.json(example);
      }),
    );

    const res = await accountApi.getDetails(123);

    expect(res).toEqual(example);

    expect(receivedUrl).toBeDefined();
    expect(receivedUrl!.searchParams.has("session_id")).toBe(false);
  });

  it("should mark media as favorite", async () => {
    const response = await accountApi.markAsFavorite(
      123,
      { media_type: "movie", media_id: 456, favorite: true },
      "session123",
    );

    const example =
      specs.paths["/3/account/{account_id}/favorite"].post.responses[200]
        .content["application/json"].examples.Result.value;
    expect(response).toEqual(JSON.parse(example));
  });

  it("should get favorite movies", async () => {
    const response = await accountApi.getFavoriteMovies(123, {
      session_id: "session123",
    });

    const example =
      specs.paths["/3/account/{account_id}/favorite/movies"].get.responses[200]
        .content["application/json"].examples.Result.value;
    expect(response).toEqual(JSON.parse(example));
  });

  it("should get favorite TV shows", async () => {
    const response = await accountApi.getFavoriteTVShows(123, {
      session_id: "session123",
    });
    const example =
      specs.paths["/3/account/{account_id}/favorite/tv"].get.responses[200]
        .content["application/json"].examples.Result.value;
    expect(response).toEqual(JSON.parse(example));
  });

  it("should add media to watchlist", async () => {
    const response = await accountApi.addToWatchlist(
      123,
      { media_type: "tv", media_id: 789, watchlist: true },
      "session123",
    );
    const example =
      specs.paths["/3/account/{account_id}/watchlist"].post.responses[200]
        .content["application/json"].examples.Result.value;
    expect(response).toEqual(JSON.parse(example));
  });

  it("should get watchlist movies", async () => {
    const response = await accountApi.getWatchlistMovies(123, {
      session_id: "session123",
    });
    const example =
      specs.paths["/3/account/{account_id}/watchlist/movies"].get.responses[200]
        .content["application/json"].examples.Result.value;
    expect(response).toEqual(JSON.parse(example));
  });

  it("should get watchlist TV shows", async () => {
    const response = await accountApi.getWatchlistTv(123, {
      session_id: "session123",
    });
    const example =
      specs.paths["/3/account/{account_id}/watchlist/tv"].get.responses[200]
        .content["application/json"].examples.Result.value;
    expect(response).toEqual(JSON.parse(example));
  });

  it("should get account lists", async () => {
    const response = await accountApi.getLists(123, "session123", { page: 1 });
    const example = getOpenApiExample(
      "/3/account/{account_id}/lists",
      "get",
      "200",
    );
    expect(response).toEqual(example);
  });

  it("should get account lists with default page 1", async () => {
    const response = await accountApi.getLists(123, "session123");
    const example = getOpenApiExample(
      "/3/account/{account_id}/lists",
      "get",
      "200",
    );
    expect(response).toEqual(example);
  });

  it("should get rated movies", async () => {
    const response = await accountApi.getRatedMovies(123, {
      session_id: "session123",
    });
    const example = getOpenApiExample(
      "/3/account/{account_id}/rated/movies",
      "get",
      "200",
    );
    expect(response).toEqual(example);
  });

  it("should get rated TV shows", async () => {
    const response = await accountApi.getRatedTVShows(123, {
      session_id: "session123",
    });
    const example = getOpenApiExample(
      "/3/account/{account_id}/rated/tv",
      "get",
      "200",
    );
    expect(response).toEqual(example);
  });

  it("should get rated TV episodes", async () => {
    const response = await accountApi.getRatedTVEpisodes(123, {
      session_id: "session123",
    });
    const example = getOpenApiExample(
      "/3/account/{account_id}/rated/tv/episodes",
      "get",
      "200",
    );
    expect(response).toEqual(example);
  });

  it("should throw TmdbError on failed getDetails", async () => {
    server.use(
      http.get("https://api.themoviedb.org/3/account/:accountId", () => {
        return HttpResponse.json({ error: "Unauthorized" }, { status: 401 });
      }),
    );

    await expect(accountApi.getDetails(123, "session123")).rejects.toThrow(
      /TMDB API Error: 401/,
    );
  });

  it("should throw TmdbError on failed markAsFavorite", async () => {
    server.use(
      http.post(
        "https://api.themoviedb.org/3/account/:accountId/favorite",
        () => {
          return HttpResponse.json(
            { error: "Invalid session" },
            { status: 401 },
          );
        },
      ),
    );

    await expect(
      accountApi.markAsFavorite(
        123,
        { media_type: "movie", media_id: 456, favorite: true },
        "invalid",
      ),
    ).rejects.toThrow(/TMDB API Error: 401/);
  });

  it("should throw TmdbError on getFavoriteMovies without session_id", async () => {
    server.use(
      http.get(
        "https://api.themoviedb.org/3/account/:accountId/favorite/movies",
        () => {
          return HttpResponse.json(
            { error: "Missing session_id" },
            { status: 401 },
          );
        },
      ),
    );

    await expect(accountApi.getFavoriteMovies(123, {})).rejects.toThrow(
      /TMDB API Error: 401/,
    );
  });
});
