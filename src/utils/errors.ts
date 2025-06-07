/**
 * Custom error class for TMDB API errors
 *
 * @remarks
 * Extends the native JavaScript Error class to provide additional TMDB-specific error information
 *
 * @example
 * ```ts
 * throw new TmdbError('API request failed', originalError);
 * ```
 */
export class TmdbError extends Error {
  /**
   * Creates a new TmdbError instance
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
