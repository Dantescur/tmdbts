import { FindMovieParams, FindMovieResponse } from "../types/discover";
import { HttpClient } from "../utils";

export class DiscoverApi {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  /**
   * Find movies using over 30 filters and sort options.
   * Supports AND (comma-separated) and OR (pipe-separated) logic for certain fields.
   * @param params - Query parameters for filtering and sorting
   * @returns Promise resolving to a paginated list of movies
   *
   * @example
   * ```typescript
   * const movies = await tmdbts.discover.findMovie({
   *   language: "en-US",
   *   with_genres: "28|12", // Action OR Adventure
   *   primary_release_year: 2023,
   * });
   * console.log(movies.results[0].title); // Movie title
   * ```
   */
  async findMovie(params: FindMovieParams = {}): Promise<FindMovieResponse> {
    return this.http.get("/discover/movie", { params });
  }
}
