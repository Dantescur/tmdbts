import { ChangedDataParams, ChangedResponse } from "../types";
import { HttpClient } from "../utils";

export class ChangedApi {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  async getChangedMovieIds(
    params: ChangedDataParams,
  ): Promise<ChangedResponse> {
    return this.http.get("/movie/changes", {
      params: params,
    });
  }

  async getChangedTvShowIds(
    params: ChangedDataParams,
  ): Promise<ChangedResponse> {
    return this.http.get("/tv/changes", {
      params: params,
    });
  }

  async getChangedPersonIds(
    params: ChangedDataParams,
  ): Promise<ChangedResponse> {
    return this.http.get("/person/changes", {
      params: params,
    });
  }
}
