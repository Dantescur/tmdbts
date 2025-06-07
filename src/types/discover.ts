import { Lang, PaginatedResponse } from "./common";

export interface FindMovieParams {
  certification?: string;
  certification_gte?: string;
  certification_lte?: string;
  certification_country?: string;
  include_adult?: boolean;
  include_video?: boolean;
  language?: string;
  page?: number;
  primary_release_year?: number;
  primary_release_date_gte?: string; // ISO 8601 date, e.g., "2020-01-01"
  primary_release_date_lte?: string;
  region?: string;
  release_date_gte?: string;
  release_date_lte?: string;
  sort_by?: string; // e.g., "popularity.desc"
  vote_average_gte?: number;
  vote_average_lte?: number;
  vote_count_gte?: number;
  vote_count_lte?: number;
  watch_region?: string;
  with_cast?: string; // Comma (AND) or pipe (OR) separated IDs
  with_companies?: string;
  with_crew?: string;
  with_genres?: string;
  with_keywords?: string;
  with_origin_country?: string;
  with_original_language?: string;
  with_people?: string;
  with_release_type?: string; // e.g., "2|3" for OR, "2,3" for AND
  with_runtime_gte?: number;
  with_runtime_lte?: number;
  with_watch_monetization_types?: string; // e.g., "flatrate|rent"
  with_watch_providers?: string;
  without_companies?: string;
  without_genres?: string;
  without_keywords?: string;
  without_watch_providers?: string;
  year?: number;
}

export interface DiscoveredMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type FindMovieResponse = PaginatedResponse<DiscoveredMovie>;

export interface FindTvParams {
  air_date_gte?: string; // ISO 8601 date, e.g., "2020-01-01"
  air_date_lte?: string;
  first_air_date_year?: number;
  first_air_date_gte?: string;
  first_air_date_lte?: string;
  include_adult?: boolean;
  include_null_first_air_dates?: boolean;
  language?: string;
  page?: number;
  screened_theatrically?: boolean;
  sort_by?: string; // e.g., "popularity.desc"
  timezone?: string;
  vote_average_gte?: number;
  vote_average_lte?: number;
  vote_count_gte?: number;
  vote_count_lte?: number;
  watch_region?: string;
  with_companies?: string; // Comma (AND) or pipe (OR) separated IDs
  with_genres?: string;
  with_keywords?: string;
  with_networks?: string;
  with_origin_country?: string;
  with_original_language?: string;
  with_runtime_gte?: number;
  with_runtime_lte?: number;
  with_status?: string; // e.g., "0|1" for OR, "0,1" for AND
  with_watch_monetization_types?: string; // e.g., "flatrate|rent"
  with_watch_providers?: string;
  without_companies?: string;
  without_genres?: string;
  without_keywords?: string;
  without_watch_providers?: string;
  with_type?: string; // e.g., "0|1"
}

export interface TvShow {
  backdrop_path?: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export type FindTvResponse = PaginatedResponse<TvShow>;

export interface FindByIdParams {
  external_sources: ExternalSources;
  language?: Lang;
}

export type ExternalSources =
  | "imdb_id"
  | "facebook_id"
  | "instagram_id"
  | "tvdb_id"
  | "tiktok_id"
  | "twitter_id"
  | "wikidata_id"
  | "youtube_id";

export interface FindByIdResponse {
  movie_results: MovieResult[];
  person_results: any[];
  tv_results: any[];
  tv_episode_results: any[];
  tv_season_results: any[];
}

export interface MovieResult {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
