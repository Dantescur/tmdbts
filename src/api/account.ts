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
} from "../types";

/**
 * Provides access to TMDB account-related endpoints
 *
 * @remarks
 * This class handles all operations related to user accounts including:
 * - Account details
 * - Favorite management
 * - Watchlist operations
 * - Rated content
 * - User lists
 *
 * @example
 * ```typescript
 * const typemdb = new TMDB({ apiKey: 'your_api_key' });
 *
 * // Get account details
 * const details = await typemdb.account.getDetails(123, 'session_id');
 * ```
 */
export class AccountApi {
  private http: HttpClient;

  /**
   * Creates a new AccountApi instance
   * @param http - Configured HttpClient instance for making requests
   */
  constructor(http: HttpClient) {
    this.http = http;
  }

  /**
   * Builds common query parameters with defaults
   * @param params - Partial parameters to override defaults
   * @returns Complete CommonParams object with defaults filled in
   * @internal
   */
  private buildQueryParams(params: Partial<CommonParams> = {}): CommonParams {
    return {
      language: "en-US",
      page: 1,
      sort_by: "created_at.asc",
      ...params,
    };
  }

  /**
   * Get the primary account details
   * @param accountId - TMDB account ID
   * @param sessionId - Optional session ID for authenticated requests
   * @returns Promise resolving to account details
   *
   * @example
   * ```typescript
   * const details = await typemdb.account.getDetails(12345, 'valid_session_id');
   * ```
   */
  async getDetails(
    accountId: number,
    sessionId?: string,
  ): Promise<DetailsResponse> {
    return this.http.get<DetailsResponse>(`/account/${accountId}`, {
      params: sessionId ? { session_id: sessionId } : undefined,
    });
  }

  /**
   * Mark a media item as favorite
   * @param accountId - TMDB account ID
   * @param data - Favorite parameters including media type and ID
   * @param sessionId - Valid session ID
   * @returns Promise resolving to operation status
   *
   * @example
   * ```typescript
   * await typemdb.account.markAsFavorite(123, {
   *   media_type: 'movie',
   *   media_id: 550,
   *   favorite: true
   * }, 'session_id');
   * ```
   */
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

  /**
   * Get a list of favorite movies
   * @param accountId - TMDB account ID
   * @param params - Optional query parameters
   * @returns Promise resolving to favorite movies response
   */
  async getFavoriteMovies(
    accountId: number,
    params: Partial<CommonParams> = {},
  ): Promise<FavoritesResponse> {
    return this.http.get<FavoritesResponse>(
      `/account/${accountId}/favorite/movies`,
      { params: this.buildQueryParams(params) },
    );
  }

  /**
   * Get a list of favorite TV shows
   * @param accountId - TMDB account ID
   * @param params - Optional query parameters
   * @returns Promise resolving to favorite TV shows response
   */
  async getFavoriteTVShows(
    accountId: number,
    params: Partial<CommonParams> = {},
  ): Promise<FavoritesResponse> {
    return this.http.get<FavoritesResponse>(
      `/account/${accountId}/favorite/tv`,
      { params: this.buildQueryParams(params) },
    );
  }

  /**
   * Add a media item to watchlist
   * @param accountId - TMDB account ID
   * @param data - Watchlist parameters including media type and ID
   * @param sessionId - Valid session ID
   * @returns Promise resolving to operation status
   */
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

  /**
   * Get movies in watchlist
   * @param accountId - TMDB account ID
   * @param params - Optional query parameters
   * @returns Promise resolving to watchlist movies response
   */
  async getWatchlistMovies(
    accountId: number,
    params: Partial<CommonParams> = {},
  ): Promise<WatchlistMoviesResponse> {
    return this.http.get<WatchlistMoviesResponse>(
      `/account/${accountId}/watchlist/movies`,
      { params: this.buildQueryParams(params) },
    );
  }

  /**
   * Get TV shows in watchlist
   * @param accountId - TMDB account ID
   * @param params - Optional query parameters
   * @returns Promise resolving to watchlist TV shows response
   */
  async getWatchlistTv(
    accountId: number,
    params: Partial<CommonParams> = {},
  ): Promise<WatchlistTvResponse> {
    return this.http.get<WatchlistTvResponse>(
      `/account/${accountId}/watchlist/tv`,
      { params: this.buildQueryParams(params) },
    );
  }

  /**
   * Get lists created by account
   * @param accountId - TMDB account ID
   * @param sessionId - Valid session ID
   * @param params - Optional pagination parameters
   * @returns Promise resolving to account lists response
   */
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

  /**
   * Get rated movies
   * @param accountId - TMDB account ID
   * @param params - Optional query parameters
   * @returns Promise resolving to rated movies response
   */
  async getRatedMovies(
    accountId: number,
    params: Partial<CommonParams> = {},
  ): Promise<RatedMoviesResponse> {
    return this.http.get<RatedMoviesResponse>(
      `/account/${accountId}/rated/movies`,
      { params: this.buildQueryParams(params) },
    );
  }

  /**
   * Get rated TV shows
   * @param accountId - TMDB account ID
   * @param params - Optional query parameters
   * @returns Promise resolving to rated TV shows response
   */
  async getRatedTVShows(
    accountId: number,
    params: Partial<CommonParams> = {},
  ): Promise<RatedTvResponse> {
    return this.http.get<RatedTvResponse>(`/account/${accountId}/rated/tv`, {
      params: this.buildQueryParams(params),
    });
  }

  /**
   * Get rated TV episodes
   * @param accountId - TMDB account ID
   * @param params - Optional query parameters
   * @returns Promise resolving to rated TV episodes response
   */
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
