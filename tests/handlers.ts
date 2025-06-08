// src/utils/handlers.ts
import { http, HttpResponse } from "msw";
import {
  DetailsResponse,
  FavoriteResponse,
  FavoritesResponse,
  ListsResponse,
  RatedMoviesResponse,
  RatedTvEpisodesResponse,
  WatchlistResponse,
  WatchlistMoviesResponse,
  WatchlistTvResponse,
  RatedTvResponse,
} from "../src/types";
import spec from "../api.specs.json";
import { fromOpenApi } from "@mswjs/source/open-api";
import { OpenAPIV3 } from "openapi-types";

export const openApiHandlers = await fromOpenApi(spec as OpenAPIV3.Document);

interface FavoriteRequestBody {
  media_type: "movie" | "tv";
  media_id: number;
  favorite: boolean;
}

interface WatchlistRequestBody {
  media_type: "movie" | "tv";
  media_id: number;
  watchlist: boolean;
}

export const mockDetailResponse: DetailsResponse = {
  avatar: {
    gravatar: { hash: "c9e9fc152ee756a900db85757c29815d" },
    tmdb: { avatar_path: "/xy44UvpbTgzs9kWmp4C3fEaCl5h.png" },
  },
  id: 548,
  iso_639_1: "en",
  iso_3166_1: "CA",
  name: "Travis Bell",
  include_adult: false,
  username: "travisbell",
};

export const mockMediaFavResponse: FavoriteResponse = {
  status_code: 1,
  status_message: "Success.",
};

export const mockFavMoviesResponse: FavoritesResponse = {
  page: 1,
  results: [
    {
      adult: false,
      backdrop_path: "/se5Hxz7PArQZOG3Nx2bpfOhLhtV.jpg",
      genre_ids: [28, 12, 16, 10751],
      id: 9806,
      original_language: "en",
      original_title: "The Incredibles",
      overview:
        "Bob Parr has given up his superhero days to log in time as an insurance adjuster and raise his three children with his formerly heroic wife in suburbia. But when he receives a mysterious assignment, it's time to get back into costume.",
      popularity: 71.477,
      poster_path: "/2LqaLgk4Z226KkgPJuiOQ58wvrm.jpg",
      release_date: "2004-10-27",
      title: "The Incredibles",
      video: false,
      vote_average: 7.702,
      vote_count: 16162,
    },
  ],
  total_pages: 1,
  total_results: 1,
};

export const mockFavTvResponse: FavoritesResponse = {
  page: 1,
  results: [
    {
      adult: false,
      backdrop_path: "/backdrop.jpg",
      genre_ids: [18],
      id: 789,
      original_language: "en",
      original_title: "Test Show",
      overview: "A test TV show.",
      popularity: 50,
      poster_path: "/poster.jpg",
      release_date: "2023-01-01",
      title: "Test Show",
      video: false,
      vote_average: 8.0,
      vote_count: 500,
    },
  ],
  total_pages: 1,
  total_results: 1,
};

export const mockWatchlistResponse: WatchlistResponse = {
  status_code: 1,
  status_message: "The item was added to the watchlist.",
};

export const mockWatchlistMoviesResponse: WatchlistMoviesResponse = {
  page: 1,
  results: [
    {
      adult: false,
      backdrop_path: "/backdrop.jpg",
      genre_ids: [28],
      id: 456,
      original_language: "en",
      original_title: "Test Movie",
      overview: "A test movie.",
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

export const mockWatchlistTvResponse: WatchlistTvResponse = {
  page: 1,
  results: [
    {
      adult: false,
      backdrop_path: "/backdrop.jpg",
      genre_ids: [18],
      id: 789,
      origin_country: ["US"],
      original_language: "en",
      original_name: "Test Show",
      overview: "A test TV show.",
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

export const mockListsResponse: ListsResponse = {
  page: 1,
  results: [
    {
      description: "My favorite movies",
      favorite_count: 10,
      id: 1,
      item_count: 5,
      iso_639_1: "en",
      list_type: "movie",
      name: "Favorites",
      poster_path: "/poster.jpg",
    },
  ],
  total_pages: 1,
  total_results: 1,
};

export const mockRatedMoviesResponse: RatedMoviesResponse = {
  page: 1,
  results: [
    {
      adult: false,
      backdrop_path: "/backdrop.jpg",
      belongs_to_collection: null,
      budget: 1000000,
      genres: [{ id: 28, name: "Action" }],
      homepage: "http://example.com",
      id: 456,
      imdb_id: "tt1234567",
      origin_country: ["US"],
      original_language: "en",
      original_title: "Test Movie",
      overview: "A test movie.",
      popularity: 100,
      poster_path: "/poster.jpg",
      production_companies: [
        {
          id: 1,
          logo_path: "/logo.jpg",
          name: "Test Studio",
          origin_country: "US",
        },
      ],
      production_countries: [{ iso_3166_1: "US", name: "United States" }],
      release_date: "2023-01-01",
      revenue: 5000000,
      runtime: 120,
      spoken_languages: [
        { english_name: "English", iso_639_1: "en", name: "English" },
      ],
      status: "Released",
      tagline: "A thrilling adventure",
      title: "Test Movie",
      video: false,
      vote_average: 7.5,
      vote_count: 1000,
    },
  ],
  total_pages: 1,
  total_results: 1,
};

export const mockRatedTvResponse: RatedTvResponse = {
  page: 1,
  results: [
    {
      adult: false,
      backdrop_path: "/backdrop.jpg",
      created_by: [],
      episode_run_time: [60],
      first_air_date: "2023-01-01",
      genres: [{ id: 18, name: "Drama" }],
      homepage: "http://example.com",
      id: 789,
      in_production: true,
      languages: ["en"],
      last_air_date: "2023-01-01",
      last_episode_to_air: null,
      name: "Test Show",
      next_episode_to_air: null,
      networks: [
        {
          id: 1,
          logo_path: "/logo.jpg",
          name: "Test Network",
          origin_country: "US",
        },
      ],
      number_of_episodes: 10,
      number_of_seasons: 1,
      origin_country: ["US"],
      original_language: "en",
      original_name: "Test Show",
      overview: "A test TV show.",
      popularity: 50,
      poster_path: "/poster.jpg",
      production_companies: [
        {
          id: 1,
          logo_path: "/logo.jpg",
          name: "Test Studio",
          origin_country: "US",
        },
      ],
      production_countries: [{ iso_3166_1: "US", name: "United States" }],
      seasons: [
        {
          air_date: "2023-01-01",
          episode_count: 10,
          id: 1,
          name: "Season 1",
          overview: "",
          poster_path: "/poster",
          season_number: 1,
          vote_average: 8.0,
        },
      ],
      spoken_languages: [
        { english_name: "English", iso_639_1: "en", name: "English" },
      ],
      status: "Returning Series",
      tagline: "A dramatic journey",
      type: "Scripted",
      vote_average: 8.0,
      vote_count: 500,
    },
  ],
  total_pages: 1,
  total_results: 1,
};

export const mockRatedTvEpisodesResponse: RatedTvEpisodesResponse = {
  page: 1,
  results: [
    {
      air_date: "2023-01-01",
      episode_number: 1,
      id: 101,
      name: "Pilot",
      overview: "The pilot episode.",
      production_code: "E101",
      runtime: 60,
      season_number: 1,
      show_id: 789,
      still_path: "/still.jpg",
      vote_average: 8.0,
      vote_count: 100,
      rating: 8,
    },
  ],
  total_pages: 1,
  total_results: 1,
};

// WARN: ⚠️ Handler Relocation Notice
// The account/:id handler moved to account.test.ts due to MSW matching issues
// See test file for details and migration TODOs
export const handlers = [
  http.post(
    "https://api.themoviedb.org/3/account/:id/favorite",
    async ({ params, request }) => {
      const url = new URL(request.url);
      const query = url.searchParams;
      if (!query.get("session_id")) {
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
      const body = (await request.json()) as FavoriteRequestBody;
      if (
        !body.media_type ||
        !body.media_id ||
        typeof body.favorite !== "boolean"
      ) {
        return HttpResponse.json(
          { error: "Invalid request body" },
          { status: 400 },
        );
      }
      return HttpResponse.json(mockMediaFavResponse, { status: 200 });
    },
  ),

  http.get(
    "https://api.themoviedb.org/3/account/:id/favorite/movies",
    ({ params, request }) => {
      const url = new URL(request.url);
      const query = url.searchParams;
      if (!query.get("session_id")) {
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
      const page = parseInt(query.get("page") || "1", 10);
      if (page !== 1 || query.get("sort_by") !== "created_at.asc") {
        return HttpResponse.json(
          { error: "Invalid query parameters" },
          { status: 400 },
        );
      }
      return HttpResponse.json(mockFavMoviesResponse, { status: 200 });
    },
  ),

  http.get(
    "https://api.themoviedb.org/3/account/:id/favorite/tv",
    ({ params, request }) => {
      const url = new URL(request.url);
      const query = url.searchParams;
      if (!query.get("session_id")) {
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
      const page = parseInt(query.get("page") || "1", 10);
      if (page !== 1 || query.get("sort_by") !== "created_at.asc") {
        return HttpResponse.json(
          { error: "Invalid query parameters" },
          { status: 400 },
        );
      }
      return HttpResponse.json(mockFavTvResponse, { status: 200 });
    },
  ),

  http.post(
    "https://api.themoviedb.org/3/account/:id/watchlist",
    async ({ params, request }) => {
      const query = new URL(request.url).searchParams;
      if (!query.get("session_id")) {
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
      const body = (await request.json()) as WatchlistRequestBody;
      if (
        !body.media_type ||
        !body.media_id ||
        typeof body.watchlist !== "boolean"
      ) {
        return HttpResponse.json(
          { error: "Invalid request body" },
          { status: 400 },
        );
      }
      return HttpResponse.json(mockWatchlistResponse, { status: 200 });
    },
  ),

  http.get(
    "https://api.themoviedb.org/3/account/:id/watchlist/movies",
    ({ params, request }) => {
      const url = new URL(request.url);
      const query = url.searchParams;
      if (!query.get("session_id")) {
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
      const page = parseInt(query.get("page") || "1", 10);
      if (page !== 1 || query.get("sort_by") !== "created_at.asc") {
        return HttpResponse.json(
          { error: "Invalid query parameters" },
          { status: 400 },
        );
      }
      return HttpResponse.json(mockWatchlistMoviesResponse, { status: 200 });
    },
  ),

  http.get(
    "https://api.themoviedb.org/3/account/:id/watchlist/tv",
    ({ params, request }) => {
      const url = new URL(request.url);
      const query = url.searchParams;
      if (!query.get("session_id")) {
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
      const page = parseInt(query.get("page") || "1", 10);
      if (page !== 1 || query.get("sort_by") !== "created_at.asc") {
        return HttpResponse.json(
          { error: "Invalid query parameters" },
          { status: 400 },
        );
      }
      return HttpResponse.json(mockWatchlistTvResponse, { status: 200 });
    },
  ),

  http.get(
    "https://api.themoviedb.org/3/account/:id/lists",
    ({ params, request }) => {
      const url = new URL(request.url);
      const query = url.searchParams;
      if (!query.get("session_id")) {
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
      const page = parseInt(query.get("page") || "1", 10);
      if (page !== 1) {
        return HttpResponse.json(
          { error: "Invalid page parameter" },
          { status: 400 },
        );
      }
      return HttpResponse.json(mockListsResponse, { status: 200 });
    },
  ),

  http.get(
    "https://api.themoviedb.org/3/account/:id/rated/movies",
    ({ params, request }) => {
      const url = new URL(request.url);
      const query = url.searchParams;
      if (!query.get("session_id")) {
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
      const page = parseInt(query.get("page") || "1", 10);
      if (page !== 1 || query.get("sort_by") !== "created_at.asc") {
        return HttpResponse.json(
          { error: "Invalid query parameters" },
          { status: 400 },
        );
      }
      return HttpResponse.json(mockRatedMoviesResponse, { status: 200 });
    },
  ),

  http.get(
    "https://api.themoviedb.org/3/account/:id/rated/tv",
    ({ params, request }) => {
      const url = new URL(request.url);
      const query = url.searchParams;
      if (!query.get("session_id")) {
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
      const page = parseInt(query.get("page") || "1", 10);
      if (page !== 1 || query.get("sort_by") !== "created_at.asc") {
        return HttpResponse.json(
          { error: "Invalid query parameters" },
          { status: 400 },
        );
      }
      return HttpResponse.json(mockRatedTvResponse, { status: 200 });
    },
  ),

  http.get(
    "https://api.themoviedb.org/3/account/:id/rated/tv/episodes",
    ({ params, request }) => {
      const url = new URL(request.url);
      const query = url.searchParams;
      if (!query.get("session_id")) {
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
      const page = parseInt(query.get("page") || "1", 10);
      if (page !== 1 || query.get("sort_by") !== "created_at.asc") {
        return HttpResponse.json(
          { error: "Invalid query parameters" },
          { status: 400 },
        );
      }
      return HttpResponse.json(mockRatedTvEpisodesResponse, { status: 200 });
    },
  ),
];
