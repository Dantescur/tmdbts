/*
 * TMDB TypeScript API Client
 *
 * @remarks
 * This package provides a type-safe client for The Movie Database (TMDB) API v3.
 *
 * @example
 * ```typescript
 * // Basic usage
 * import { TMDB } from 'typemdb';
 *
 * const typemdb = new TMDB({ apiKey: 'your_key' });
 * const popularMovies = await typemdb.movies.getPopular();
 * ```
 */
export * from "./client";
export * from "./types";
export * from "./api";
