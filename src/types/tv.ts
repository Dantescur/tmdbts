/*
  types/tv.ts
*/
import { Genre } from "./genres";
import { ProductionCompany, ProductionCountry } from "./movie";

export interface Network {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
}

export interface LastEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string | null;
}

export interface TVShow {
  adult: boolean;
  backdrop_path: string | null;
  created_by: any[]; // TODO: Replace with proper interface if needed
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[]; // Reusing Genre from movie.ts
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: LastEpisodeToAir | null;
  name: string;
  next_episode_to_air: any | null; // TODO: Replace with proper interface
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[]; // Reusing from movie.ts
  production_countries: ProductionCountry[]; // Reusing from movie.ts
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}
