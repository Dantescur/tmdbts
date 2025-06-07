// src/client.ts
import {
  AccountApi,
  AuthApi,
  CertsApi,
  ChangesApi,
  CollectionsApi,
} from "./api";
import { HttpClient, TmdbConfig } from "./utils";

/**
 * The main TMDB client class providing access to all API endpoints
 *
 * @remarks
 * This is the primary entry point for interacting with the TMDB API. It provides
 * organized access to all available API domains through sub-clients.
 *
 * @example
 * ```typescript
 * // Basic initialization
 * const tmdbts = new Tmdb({
 *   apiKey: 'your_api_key_here',
 *   baseUrl: 'https://api.themoviedb.org/3' // optional
 * });
 *
 * // Using different API domains
 * const accountDetails = await tmdbts.account.getDetails(123);
 * const movieCerts = await tmdbts.certifications.getMovieCertifications();
 * ```
 */
export class Tmdbts {
  /**
   * Account management and user-specific data
   * @example
   * ```typescript
   * await tmdbts.account.getWatchlistMovies(123);
   * ```
   */
  public account: AccountApi;

  /**
   * Authentication and session management
   * @example
   * ```typescript
   * const session = await tmdbts.auth.createSession(requestToken);
   * ```
   */
  public auth: AuthApi;

  /**
   * Content certification data
   * @example
   * ```typescript
   * const certifications = await tmdbts.certifications.getTvCertifications();
   * ```
   */
  public certifications: CertsApi;

  /**
   * Change tracking functionality
   * @example
   * ```typescript
   * const changes = await tmdbts.changes.getChangedMovieIds({
   *   start_date: new Date('2023-01-01'),
   *   end_date: new Date('2023-01-31')
   * });
   * ```
   */
  public changes: ChangesApi;

  /**
   * Provides access to TMDB movie collections
   *
   * @remarks
   * Collections are groups of movies that are part of the same franchise, series, or theme.
   *
   * @example
   * ```typescript
   * // Initialize the client
   * const tmdbts = new Tmdbts({ apiKey: 'your_api_key' });
   *
   * // Get details for the Star Wars collection (ID: 10)
   * const starWars = await tmdbts.collection.getDetails(10, {
   *   language: 'en-US'
   * });
   *
   * // Get images for the James Bond collection
   * const bondImages = await tmdbts.collection.getImages(645, {
   *   include_image_language: 'en,null'
   * });
   *
   * // Get available translations for a collection
   * const translations = await tmdbts.collection.getTranslations(10);
   * ```
   */
  public collection: CollectionsApi;

  /**
   * Creates a new TMDB client instance
   * @param config - Configuration options
   */
  constructor(config: TmdbConfig) {
    const httpClient = new HttpClient(config);
    this.account = new AccountApi(httpClient);
    this.auth = new AuthApi(httpClient);
    this.certifications = new CertsApi(httpClient);
    this.changes = new ChangesApi(httpClient);
    this.collection = new CollectionsApi(httpClient);
  }
}
