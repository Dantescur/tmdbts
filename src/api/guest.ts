import { GuestSessionResponse, RatedTvEpisodesResponse } from "../types";
import { GuestRatedParams, GuestTvResponse } from "../types/guest";
import { HttpClient } from "../utils";

export class GuestApi {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  async ratedMovies(
    guest_session_id: string,
    params?: GuestRatedParams,
  ): Promise<GuestSessionResponse> {
    return this.http.get(`/guest_session/${guest_session_id}/rated/movies`, {
      params,
    });
  }

  async ratedTvs(
    guest_session_id: string,
    params?: GuestRatedParams,
  ): Promise<GuestTvResponse> {
    return this.http.get(`/guest_session/${guest_session_id}/rated/tv`, {
      params,
    });
  }

  async ratedTvEposides(
    guest_session_id: string,
    params?: GuestRatedParams,
  ): Promise<RatedTvEpisodesResponse> {
    return this.http.get(
      `/guest_session/${guest_session_id}/rated/tv/episodes`,
      {
        params,
      },
    );
  }
}
