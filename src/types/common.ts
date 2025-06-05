/*
  types/common.ts
*/
export interface Lang {
  iso_639_1: string;
  english_name: string;
  name: string;
}

export type Languages = Lang[];

export interface TmdbStatusResponse {
  success: boolean;
  status_code: number;
  status_message: string;
}

export interface Episode {
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

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

// Helper types for creating paginated responses
export function createPaginatedType<T>(): PaginatedResponse<T> {
  return {} as PaginatedResponse<T>;
}
