/*
  utils/http.ts
*/
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { TMDBError } from "./errors";

/**
 * Configuration options for the TMDB HTTP client
 */
export interface TMDBConfig {
  /** TMDB API key (required) */
  apiKey: string;
  /** Base API URL (defaults to official TMDB API) */
  baseUrl?: string;
  /** Additional headers to include with requests */
  headers?: Record<string, string>;
  /** Default query parameters to include with all requests */
  defaultParams?: Record<string, unknown>;
}

/**
 * HTTP client for making requests to the TMDB API
 *
 * @remarks
 * Wraps Axios with TMDB-specific error handling and configuration
 *
 * @example
 * ```ts
 * const http = new HttpClient({
 *   apiKey: 'your_api_key',
 *   baseUrl: 'https://api.themoviedb.org/3'
 * });
 * ```
 */
export class HttpClient {
  private client: AxiosInstance;

  /** Public base URL used in requests */
  public readonly baseUrl: string;

  /** Public headers (merged defaults) */
  public readonly headers: Record<string, string>;

  /** API Key (masked suggestion available later) */
  public readonly apiKey: string;

  /**
   * Creates a new HttpClient instance
   * @param config - Configuration for the TMDB client
   */
  constructor(config: TMDBConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl ?? "https://api.themoviedb.org/3";
    this.headers = {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
      ...config.headers,
    };

    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: this.headers,
      params: {
        ...config.defaultParams,
      },
    });
  }

  /**
   * Makes a GET request to the TMDB API
   * @typeParam T - Expected response type
   * @param url - API endpoint URL (relative to base URL)
   * @param options - Request options
   * @param options.params - Query parameters
   * @param options.config - Additional Axios configuration
   * @returns Promise resolving to the response data
   * @throws {TMDBError} When the request fails
   *
   * @example
   * ```ts
   * const movies = await http.get<Movie[]>('/discover/movie', {
   *   params: { sort_by: 'popularity.desc' }
   * });
   * ```
   */
  async get<T>(
    url: string,
    {
      params,
      config = {},
    }: {
      params?: unknown;
      config?: AxiosRequestConfig;
    },
  ): Promise<T> {
    try {
      const response = await this.client.get(url, {
        params,
        ...config,
      });
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new TMDBError(
          `TMDB API Error: ${err.response?.status ?? "Unknown"} - ${err.message}`,
          err,
        );
      }
      throw new TMDBError("Unknown error occurred", err);
    }
  }

  /**
   * Makes a POST request to the TMDB API
   * @typeParam T - Expected response type
   * @param url - API endpoint URL (relative to base URL)
   * @param options - Request options
   * @param options.body - Request body data
   * @param options.params - Query parameters
   * @param options.config - Additional Axios configuration
   * @returns Promise resolving to the response data
   * @throws {TMDBError} When the request fails
   */
  async post<T>(
    url: string,
    {
      body,
      params,
      config = {},
    }: {
      body?: unknown;
      params?: unknown;
      config?: AxiosRequestConfig;
    },
  ): Promise<T> {
    try {
      const response = await this.client.post(url, body, {
        params,
        ...config,
      });
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new TMDBError(
          `TMDB API Error: ${err.response?.status ?? "Unknown"} - ${err.message}`,
          err,
        );
      }
      throw new TMDBError("Unknown error occurred", err);
    }
  }

  /**
   * Makes a DELETE request to the TMDB API
   * @typeParam T - Expected response type
   * @param url - API endpoint URL (relative to base URL)
   * @param options - Request options
   * @param options.body - Request body data (for DELETE with body)
   * @param options.params - Query parameters
   * @param options.config - Additional Axios configuration
   * @returns Promise resolving to the response data
   * @throws {TMDBError} When the request fails
   */
  async delete<T>(
    url: string,
    {
      body,
      params,
      config = {},
    }: {
      body?: unknown;
      params?: unknown;
      config?: AxiosRequestConfig;
    },
  ): Promise<T> {
    try {
      const response = await this.client.delete(url, {
        data: body,
        params,
        ...config,
      });
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new TMDBError(
          `TMDB API Error: ${err.response?.status ?? "Unknown"} - ${err.message}`,
          err,
        );
      }
      throw new TMDBError("Unknown error occurred", err);
    }
  }
}
