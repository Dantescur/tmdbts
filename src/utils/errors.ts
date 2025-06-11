/**
 * Custom error class for TMDB API errors
 *
 * @remarks
 * Extends the native JavaScript Error class to provide additional TMDB-specific error information
 *
 * @example
 * ```ts
 * throw new TMDBError('API request failed', originalError);
 * ```
 */
export class TMDBError extends Error {
  /**
   * Creates a new TMDBError instance
   * @param message - Human-readable error message
   * @param original - Original error that caused this exception (if available)
   */
  constructor(
    message: string,
    public original?: unknown,
  ) {
    super(message);
    this.name = "TmdbError";
    if (original instanceof Error) {
      this.stack = original.stack;
    }
  }
}
