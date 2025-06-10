/*
 * TMDB TypeScript API Client
 *
 * @remarks
 * This package provides a type-safe client for The Movie Database (TMDB) API v3.
 *
 * @example
 * ```typescript
 * // Basic usage
 * import { Tsmdb } from 'tsmdb';
 *
 * const tmdb = new Tsmdb({ apiKey: 'your_key' });
 * const popularMovies = await tsmdb.movies.getPopular();
 * ```
 */
export * from "./client";
export * from "./types";
export * from "./api";
