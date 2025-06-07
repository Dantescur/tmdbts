export interface CollectionsDetailsParams {
  language: string;
}

export interface CollectionDetailsResponse {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  parts: Part[];
}

export interface Part {
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

export interface CollectionImagesParams {
  include_image_language: string;
  language: string;
}

export interface CollectionImagesResponse {
  id: number;
  backdrops: Backdrop[];
  posters: Poster[];
}

export interface Backdrop {
  aspect_ratio: number;
  height: number;
  iso_639_1?: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface Poster {
  aspect_ratio: number;
  height: number;
  iso_639_1?: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface CollectionTranslationResponse {
  id: number;
  translations: CollectionTranslation[];
}

export interface CollectionTranslation {
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  english_name: string;
  data: Data;
}

export interface Data {
  title: string;
  overview: string;
  homepage: string;
}
