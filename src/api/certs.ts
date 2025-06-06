import { MovieCertsResponse, TvCertsResponse } from "../types";
import { HttpClient } from "../utils";

export class CertsApi {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  async getMovieCertifications(): Promise<MovieCertsResponse> {
    return this.http.get("/certification/movie/list", {});
  }

  async getTvCertifications(): Promise<TvCertsResponse> {
    return this.http.get("/certification/tv/list", {});
  }
}
