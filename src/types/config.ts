import { Languages } from "./common";

export interface ConfigDetailsResponse {
  images: Images;
  change_keys: string[];
}

export interface Images {
  base_url: string;
  secure_base_url: string;
  backdrop_sizes: string[];
  logo_sizes: string[];
  poster_sizes: string[];
  profile_sizes: string[];
  still_sizes: string[];
}

export interface ConfigCountriesParams {
  language: string;
}

export type ConfigCountriesResponse = ISO[];

export interface ISO {
  iso_3166_1: string;
  english_name: string;
  native_name: string;
}

export type ConfigJobsResponse = Area[];

export interface Area {
  department: string;
  jobs: string[];
}

export type ConfigLanguagesResponse = Lang[];

export interface Lang {
  iso_639_1: string;
  english_name: string;
  name: string;
}

export type ConfigTranslationsResponse = Languages[];

export type ConfigTimezoneResponse = Timezone[];

export interface Timezone {
  iso_3166_1: string;
  zones: string[];
}
