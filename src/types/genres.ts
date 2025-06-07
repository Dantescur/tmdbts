export interface GenreParams {
  language?: string;
}

export interface GenreResponse {
  genres: Genre[];
}

export interface Genre {
  id: number;
  name: string;
}
