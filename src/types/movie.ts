/*
  types/movie.ts
*/
import {
  PaginatedResponse,
  ProductionCompany,
  ProductionCountry,
  SpokenLanguage,
} from "./common";
import { Genre } from "./genres";

export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection | null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type PopularMoviesResponse = PaginatedResponse<Movie>;
