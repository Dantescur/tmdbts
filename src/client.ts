// src/client.ts
import {
  AccountApi,
  AuthApi,
  CertsApi,
  ChangesApi,
  CollectionsApi,
  CompaniesApi,
  CreditsApi,
  DiscoverApi,
  GenresApi,
  GuestApi,
} from "./api";
import { HttpClient, TMDBConfig } from "./utils";

/**
 * The main TypeMDB client class providing access to all API endpoints
 *
 * @remarks
 * This is the primary entry point for interacting with the TMDB API. It provides
 * organized access to all available API domains through sub-clients.
 *
 * @example
 * ```typescript
 * // Basic initialization
 * const typemdb = new TMDB({
 *   apiKey: 'your_api_key_here',
 *   baseUrl: 'https://api.themoviedb.org/3' // optional
 * });
 *
 * // Using different API domains
 * const accountDetails = await typemdb.account.getDetails(123);
 * const movieCerts = await typemdb.certifications.getMovieCertifications();
 * ```
 */
export class TMDB {
  private readonly http: HttpClient;

  /**
   * Account management and user-specific data
   * @example
   * ```typescript
   * await typemdb.account.getWatchlistMovies(123);
   * ```
   */
  public account: AccountApi;

  /**
   * Authentication and session management
   * @example
   * ```typescript
   * const session = await typemdb.auth.createSession(requestToken);
   * ```
   */
  public auth: AuthApi;

  /**
   * Content certification data
   * @example
   * ```typescript
   * const certifications = await typemdb.certifications.getTvCertifications();
   * ```
   */
  public certifications: CertsApi;

  /**
   * Change tracking functionality
   * @example
   * ```typescript
   * const changes = await typemdb.changes.getChangedMovieIds({
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
   * const typemdb = new TMDB({ apiKey: 'your_api_key' });
   *
   * // Get details for the Star Wars collection (ID: 10)
   * const starWars = await typemdb.collection.getDetails(10, {
   *   language: 'en-US'
   * });
   *
   * // Get images for the James Bond collection
   * const bondImages = await typemdb.collection.getImages(645, {
   *   include_image_language: 'en,null'
   * });
   *
   * // Get available translations for a collection
   * const translations = await typemdb.collection.getTranslations(10);
   * ```
   */
  public collection: CollectionsApi;

  public company: CompaniesApi;

  public credit: CreditsApi;

  public discover: DiscoverApi;

  public genres: GenresApi;

  public guest: GuestApi;

  /**
   * Creates a new TMDB client instance
   * @param config - Configuration options
   */
  constructor(config: TMDBConfig) {
    this.http = new HttpClient(config);
    this.account = new AccountApi(this.http);
    this.auth = new AuthApi(this.http);
    this.certifications = new CertsApi(this.http);
    this.changes = new ChangesApi(this.http);
    this.collection = new CollectionsApi(this.http);
    this.company = new CompaniesApi(this.http);
    this.credit = new CreditsApi(this.http);
    this.discover = new DiscoverApi(this.http);
    this.genres = new GenresApi(this.http);
    this.guest = new GuestApi(this.http);
  }

  public getClientInfo(): {
    baseUrl: string | null;
    headers: Record<string, string>;
    apiKeyMasked: string | null;
  } {
    const axiosConfig = (this.http as any).client?.defaults ?? {};

    const authorization = axiosConfig.headers?.Authorization;
    const apiKeyMasked =
      typeof authorization === "string"
        ? "****" + authorization.slice(-4)
        : null;

    return {
      baseUrl: axiosConfig.baseURL ?? null,
      headers: axiosConfig.headers ?? {},
      apiKeyMasked,
    };
  }
}
