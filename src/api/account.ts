/*
  api/account.ts
*/
import { HttpClient } from "../utils/http";
import {
  DetailsResponse,
  FavoriteResponse,
  FavoritesResponse,
  ListsResponse,
  RatedMoviesResponse,
  RatedTvEpisodesResponse,
  WatchlistResponse,
  WatchlistMoviesResponse,
  MarkAsFavoriteParams,
  AddToWatchlistParams,
  CommonParams,
  RatedTvResponse,
  WatchlistTvResponse,
} from "../types/account";

export class AccountApi {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  private buildQueryParams(params: Partial<CommonParams> = {}): CommonParams {
    return {
      language: "en-US",
      page: 1,
      sort_by: "created_at.asc",
      ...params,
    };
  }

  async getDetails(
    accountId: number,
    sessionId?: string,
  ): Promise<DetailsResponse> {
    return this.http.get<DetailsResponse>(`/account/${accountId}`, {
      params: sessionId ? { session_id: sessionId } : undefined,
    });
  }

  async markAsFavorite(
    accountId: number,
    data: MarkAsFavoriteParams,
    sessionId: string,
  ): Promise<FavoriteResponse> {
    return this.http.post<FavoriteResponse>(`/account/${accountId}/favorite`, {
      body: data,
      params: { session_id: sessionId },
    });
  }

  async getFavoriteMovies(
    accountId: number,
    params: Partial<CommonParams> = {},
  ): Promise<FavoritesResponse> {
    return this.http.get<FavoritesResponse>(
      `/account/${accountId}/favorite/movies`,
      { params: this.buildQueryParams(params) },
    );
  }

  async getFavoriteTVShows(
    accountId: number,
    params: Partial<CommonParams> = {},
  ): Promise<FavoritesResponse> {
    return this.http.get<FavoritesResponse>(
      `/account/${accountId}/favorite/tv`,
      { params: this.buildQueryParams(params) },
    );
  }

  async addToWatchlist(
    accountId: number,
    data: AddToWatchlistParams,
    sessionId: string,
  ): Promise<WatchlistResponse> {
    return this.http.post<WatchlistResponse>(
      `/account/${accountId}/watchlist`,
      {
        body: data,
        params: { session_id: sessionId },
      },
    );
  }

  async getWatchlistMovies(
    accountId: number,
    params: Partial<CommonParams> = {},
  ): Promise<WatchlistMoviesResponse> {
    return this.http.get<WatchlistMoviesResponse>(
      `/account/${accountId}/watchlist/movies`,
      { params: this.buildQueryParams(params) },
    );
  }

  async getWatchlistTv(
    accountId: number,
    params: Partial<CommonParams> = {},
  ): Promise<WatchlistTvResponse> {
    return this.http.get<WatchlistTvResponse>(
      `/account/${accountId}/watchlist/tv`,
      { params: this.buildQueryParams(params) },
    );
  }

  async getLists(
    accountId: number,
    sessionId: string,
    params: { page?: number } = {},
  ): Promise<ListsResponse> {
    return this.http.get<ListsResponse>(`/account/${accountId}/lists`, {
      params: {
        session_id: sessionId,
        page: params.page ?? 1,
      },
    });
  }

  async getRatedMovies(
    accountId: number,
    params: Partial<CommonParams> = {},
  ): Promise<RatedMoviesResponse> {
    return this.http.get<RatedMoviesResponse>(
      `/account/${accountId}/rated/movies`,
      { params: this.buildQueryParams(params) },
    );
  }

  async getRatedTVShows(
    accountId: number,
    params: Partial<CommonParams> = {},
  ): Promise<RatedTvResponse> {
    return this.http.get<RatedTvResponse>(`/account/${accountId}/rated/tv`, {
      params: this.buildQueryParams(params),
    });
  }

  async getRatedTVEpisodes(
    accountId: number,
    params: Partial<CommonParams> = {},
  ): Promise<RatedTvEpisodesResponse> {
    return this.http.get<RatedTvEpisodesResponse>(
      `/account/${accountId}/rated/tv/episodes`,
      { params: this.buildQueryParams(params) },
    );
  }
}
