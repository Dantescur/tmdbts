import { GenreParams, GenreResponse } from "../types/genres";
import { HttpClient } from "../utils";

export class GenresApi {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  async listMovies(params: GenreParams = {}): Promise<GenreResponse> {
    return this.http.get("/genre/movie/list", { params });
  }

  async listTvs(params: GenreParams = {}): Promise<GenreResponse> {
    return this.http.get("/genre/tv/list", { params });
  }
}
