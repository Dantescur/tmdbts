import { ChangedDataParams, ChangedResponse } from "../types";
import { HttpClient } from "../utils";

/**
 * Provides access to TMDB's change tracking functionality
 *
 * @remarks
 * This API allows tracking changes to movies, TV shows, and people in the TMDB database.
 * Useful for keeping local databases in sync with TMDB.
 *
 * @example
 * ```typescript
 * // Initialize the client
 * const tsmdb = new Tsmdb({ apiKey: 'your_api_key' });
 *
 * // Get recently changed movie IDs
 * const changedMovies = await tsmdb.changes.getChangedMovieIds({
 *   start_date: new Date('2023-01-01'),
 *   end_date: new Date('2023-01-07'),
 *   page: 1
 * });
 *
 * // Get recently changed TV show IDs
 * const changedShows = await tsmdb.changes.getChangedTvShowIds({
 *   start_date: new Date('2023-01-01'),
 *   end_date: new Date('2023-01-07'),
 *   page: 1
 * });
 * ```
 */
export class ChangesApi {
  private http: HttpClient;

  /**
   * Creates a new ChangedApi instance
   * @param http - Configured HttpClient for making requests
   */
  constructor(http: HttpClient) {
    this.http = http;
  }

  /**
   * Get changed movie IDs within a date range
   * @param params - Date range and pagination parameters
   * @returns Promise resolving to changed movie IDs and metadata
   *
   * @example
   * ```typescript
   * const changes = await tsmdb.changes.getChangedMovieIds({
   *   start_date: new Date('2023-01-01'),
   *   end_date: new Date('2023-01-31'),
   *   page: 1
   * });
   * console.log('Changed movie IDs:', changes.results);
   * ```
   */
  async getChangedMovieIds(
    params?: ChangedDataParams,
  ): Promise<ChangedResponse> {
    return this.http.get("/movie/changes", {
      params: params,
    });
  }

  /**
   * Get changed TV show IDs within a date range
   * @param params - Date range and pagination parameters
   * @returns Promise resolving to changed TV show IDs and metadata
   *
   * @example
   * ```typescript
   * const changes = await tsmdb.changes.getChangedTvShowIds({
   *   start_date: new Date(Date.now() - 86400000), // Yesterday
   *   end_date: new Date() // Now
   * });
   * ```
   */
  async getChangedTvShowIds(
    params: ChangedDataParams,
  ): Promise<ChangedResponse> {
    return this.http.get("/tv/changes", {
      params: params,
    });
  }

  /**
   * Get changed person IDs within a date range
   * @param params - Date range and pagination parameters
   * @returns Promise resolving to changed person IDs and metadata
   *
   * @example
   * ```typescript
   * // Get changes from last week
   * const weekAgo = new Date();
   * weekAgo.setDate(weekAgo.getDate() - 7);
   *
   * const changes = await tsmdb.changes.getChangedPersonIds({
   *   start_date: weekAgo,
   *   end_date: new Date()
   * });
   * ```
   */
  async getChangedPersonIds(
    params: ChangedDataParams,
  ): Promise<ChangedResponse> {
    return this.http.get("/person/changes", {
      params: params,
    });
  }
}
