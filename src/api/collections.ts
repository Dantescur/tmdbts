import {
  CollectionDetailsResponse,
  CollectionImagesParams,
  CollectionImagesResponse,
  CollectionsDetailsParams,
  CollectionTranslationResponse,
} from "../types/collections";
import { HttpClient } from "../utils";

/**
 * Provides access to TMDB collection data including:
 * - Collection details
 * - Images and posters
 * - Translations
 *
 * @example
 * ```typescript
 * // Initialize the client
 * const typemdb = new TMDB({ apiKey: 'your_api_key' });
 *
 * // Get collection details
 * const collection = await typemdb.collection.getDetails(10, {
 *   language: 'en-US'
 * });
 *
 * // Get collection images
 * const images = await typemdb.collection.getCollectionImages(10, {
 *   include_image_language: 'en,null'
 * });
 * ```
 */
export class CollectionsApi {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  /**
   * Get collection details by ID
   * @param collection_id - The collection ID (e.g., 10 for Star Wars)
   * @param params - Language
   * @returns Promise resolving to collection details
   *
   * @example
   * ```typescript
   * // Get Star Wars collection details in French
   * const starWars = await typemdb.collection.getDetails(10, {
   *   language: 'fr-FR'
   * });
   * console.log(starWars.overview); // "Luke Skywalker, la Princesse Leia, Dark Vador, C3PO, R2D2 et de nombreux..."
   * ```
   */
  async getDetails(
    collection_id: number,
    params: CollectionsDetailsParams = {},
  ): Promise<CollectionDetailsResponse> {
    return this.http.get(`/collection/${collection_id}`, { params });
  }

  /**
   * Get images for a specific collection
   * @param collection_id - The collection ID
   * @param params - Image language and filtering options
   * @returns Promise resolving to collection images
   *
   * @example
   * ```typescript
   * // Get all English images for a collection
   * const images = await typemdb.collection.getImages(10, {
   *   include_image_language: 'en',
   *   language: 'en-US'
   * });
   * console.log(images.backdrops.length); // Number of backdrops
   * ```
   */
  async getImages(
    collection_id: number,
    params: CollectionImagesParams = {},
  ): Promise<CollectionImagesResponse> {
    return this.http.get(`/collection/${collection_id}/images`, { params });
  }

  /**
   * Get available translations for a collection
   * @param collection_id - The collection ID
   * @returns Promise resolving to available translations
   *
   * @example
   * ```typescript
   * // Get translations for a collection
   * const translations = await typemdb.collection.getTranslations(10);
   * console.log('Available translations:', translations.translations.map(t => t.english_name));
   * ```
   */
  async getTranslations(
    collection_id: number,
  ): Promise<CollectionTranslationResponse> {
    return this.http.get(`/collection/${collection_id}/translations`, {});
  }
}
