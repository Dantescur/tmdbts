import { MovieCertsResponse, TvCertsResponse } from "../types";
import { HttpClient } from "../utils";

/**
 * Provides access to TMDB certification data
 *
 * @example
 * ```typescript
 * // Getting movie certifications
 * const tsmdb = new Tsmdb({ apiKey: 'your_api_key' });
 * const movieCerts = await tsmdb.certificates.getMovieCertifications();
 * console.log('US Movie Certifications:', movieCerts.certifications.US);
 *
 * // Getting TV certifications
 * const tvCerts = await tsmdb.certificates.getTvCertifications();
 * console.log('UK TV Certifications:', tvCerts.certifications.GB);
 * ```
 */
export class CertsApi {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  /**
   * Gets all movie certifications organized by country
   * @returns Promise resolving to movie certifications
   */
  async getMovieCertifications(): Promise<MovieCertsResponse> {
    return this.http.get("/certification/movie/list", {});
  }

  /**
   * Gets all TV certifications organized by country
   * @returns Promise resolving to TV certifications
   */
  async getTvCertifications(): Promise<TvCertsResponse> {
    return this.http.get("/certification/tv/list", {});
  }
}
