/*
 * TMDB TypeScript API Client
 *
 * @remarks
 * This package provides a type-safe client for The Movie Database (TMDB) API v3.
 *
 * @example
 * ```typescript
 * // Basic usage
 * import { Tmdbts } from 'tmdbts';
 *
 * const tmdb = new Tmdbts({ apiKey: 'your_key' });
 * const popularMovies = await tmdbts.movies.getPopular();
 * ```
 */
export * from "./client";
export * from "./types";
export * from "./api";
