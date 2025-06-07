import { GuestSessionResponse, RatedTvEpisodesResponse } from "../types";
import {
  GhesRatedParams as GhestRatedParams,
  GuestTvResponse,
} from "../types/guest";
import { HttpClient } from "../utils";

export class GuessApi {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  async ratedMovies(
    guest_session_id: string,
    params: GhestRatedParams,
  ): Promise<GuestSessionResponse> {
    return this.http.get(`/guest_session/${guest_session_id}/rated/movies`, {
      params,
    });
  }

  async ratedTvs(
    guest_session_id: string,
    params: GhestRatedParams,
  ): Promise<GuestTvResponse> {
    return this.http.get(`/guest_session/${guest_session_id}/rated/tv`, {
      params,
    });
  }

  async ratedTvEposides(
    guest_session_id: string,
    params: GhestRatedParams,
  ): Promise<RatedTvEpisodesResponse> {
    return this.http.get(`/guest_session/${guest_session_id}/rated/tv`, {
      params,
    });
  }
}
