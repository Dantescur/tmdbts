import { PaginatedResponse } from "./common";
import { DiscoveredMovie } from "./discover";

export interface GuestRatedParams {
  language?: string;
  page?: number;
  sort_by?: string;
}

export type GuestRatedMovieResponse = PaginatedResponse<DiscoveredMovie>;

export interface RatedTv {
  adult: boolean;
  backdrop_path: string;
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
  rating: number;
}

export type GuestTvResponse = PaginatedResponse<RatedTv>;

export interface RatedTvEpisodeResponse {
  page: number;
  results: RatedTvEpisodes[];
  total_pages: number;
  total_results: number;
}

export interface RatedTvEpisodes {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
  rating: number;
}
