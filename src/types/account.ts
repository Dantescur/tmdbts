/*
  types/account.ts
*/
import { PaginatedResponse, Episode } from "./common";
import { Movie } from "./movie";
import { TVShow } from "./tv";

// Parameter Types
export interface CommonParams {
  language?: string;
  page?: number;
  session_id?: string;
  sort_by?: "created_at.asc" | "created_at.desc";
}

export interface MarkAsFavoriteParams {
  media_type: "movie" | "tv";
  media_id: number;
  favorite: boolean;
}

export interface AddToWatchlistParams {
  media_type: "movie" | "tv";
  media_id: number;
  watchlist: boolean;
}

// Entity Types
export interface MediaItem {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface WatchlistTv {
  adult: boolean;
  backdrop_path?: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
}

export interface List {
  description: string;
  favorite_count: number;
  id: number;
  item_count: number;
  iso_639_1: string;
  list_type: string;
  name: string;
  poster_path: string | null;
}

export interface Avatar {
  gravatar: { hash: string };
  tmdb: { avatar_path?: string };
}

export interface DetailsResponse {
  avatar: Avatar;
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
}

export interface FavoriteResponse {
  status_code: number;
  status_message: string;
}

export interface WatchlistResponse {
  status_code: number;
  status_message: string;
}

// Response Types
export type FavoritesResponse = PaginatedResponse<MediaItem>;
export type WatchlistMoviesResponse = PaginatedResponse<MediaItem>;
export type WatchlistTvResponse = PaginatedResponse<WatchlistTv>;
export type ListsResponse = PaginatedResponse<List>;
export type RatedMoviesResponse = PaginatedResponse<Movie>;
export type RatedTvResponse = PaginatedResponse<TVShow>;
export type RatedTvEpisodesResponse = PaginatedResponse<Episode>;
