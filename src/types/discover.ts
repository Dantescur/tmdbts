import { PaginatedResponse } from "./common";

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

export interface Movie {
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

export type FindMovieResponse = PaginatedResponse<Movie>;
