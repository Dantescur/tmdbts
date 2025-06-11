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

export type Translation =
  | "af-ZA"
  | "ar-AE"
  | "ar-SA"
  | "be-BY"
  | "bg-BG"
  | "bn-BD"
  | "ca-ES"
  | "ch-GU"
  | "cn-CN"
  | "cs-CZ"
  | "cy-GB"
  | "da-DK"
  | "de-AT"
  | "de-CH"
  | "de-DE"
  | "el-GR"
  | "en-AU"
  | "en-CA"
  | "en-GB"
  | "en-IE"
  | "en-NZ"
  | "en-US"
  | "eo-EO"
  | "es-ES"
  | "es-MX"
  | "et-EE"
  | "eu-ES"
  | "fa-IR"
  | "fi-FI"
  | "fr-CA"
  | "fr-FR"
  | "ga-IE"
  | "gd-GB"
  | "gl-ES"
  | "he-IL"
  | "hi-IN"
  | "hr-HR"
  | "hu-HU"
  | "id-ID"
  | "it-IT"
  | "ja-JP"
  | "ka-GE"
  | "kk-KZ"
  | "kn-IN"
  | "ko-KR"
  | "ky-KG"
  | "lt-LT"
  | "lv-LV"
  | "ml-IN"
  | "mr-IN"
  | "ms-MY"
  | "ms-SG"
  | "nb-NO"
  | "nl-BE"
  | "nl-NL"
  | "no-NO"
  | "pa-IN"
  | "pl-PL"
  | "pt-BR"
  | "pt-PT"
  | "ro-RO"
  | "ru-RU"
  | "si-LK"
  | "sk-SK"
  | "sl-SI"
  | "sq-AL"
  | "sr-RS"
  | "sv-SE"
  | "ta-IN"
  | "te-IN"
  | "th-TH"
  | "tl-PH"
  | "tr-TR"
  | "uk-UA"
  | "vi-VN"
  | "zh-CN"
  | "zh-HK"
  | "zh-SG"
  | "zh-TW"
  | "zu-ZA";

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

// Helper types for creating paginated responses
export function createPaginatedType<T>(): PaginatedResponse<T> {
  return {} as PaginatedResponse<T>;
}
