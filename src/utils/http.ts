/*
  utils/http.ts
*/
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { TmdbError } from "./errors";

export interface TmdbConfig {
  apiKey: string;
  baseUrl?: string;
  headers?: Record<string, string>;
  defaultParams?: Record<string, unknown>;
}

export class HttpClient {
  private client: AxiosInstance;

  constructor(config: TmdbConfig) {
    this.client = axios.create({
      baseURL: config.baseUrl ?? "https://api.themoviedb.org/3",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
        ...config.headers,
      },
      params: {
        language: "en-US",
        ...config.defaultParams,
      },
    });
  }

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
        throw new TmdbError(
          `TMDB API Error: ${err.response?.status ?? "Unknown"} - ${err.message}`,
          err,
        );
      }
      throw new TmdbError("Unknown error occurred", err);
    }
  }

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
        throw new TmdbError(
          `TMDB API Error: ${err.response?.status ?? "Unknown"} - ${err.message}`,
          err,
        );
      }
      throw new TmdbError("Unknown error occurred", err);
    }
  }
}
