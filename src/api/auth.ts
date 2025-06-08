import {
  ConvertV4TokenParams,
  DeleteSessionParams,
  DeleteSessionResponse,
  GuestSessionResponse,
  RequestTokenResponse,
  SessionResponse,
  ValidateKeyResponse,
  ValidateWithLoginParams,
} from "../types";
import { HttpClient, TmdbError } from "../utils";

/**
 * Handles TMDB authentication and session management
 *
 * @remarks
 * This class manages the complete authentication flow including:
 * - Request token generation
 * - User authentication (via web or credentials)
 * - Session creation/management
 * - Guest sessions
 * - API key validation
 *
 * @example
 * ```typescript
 * const tmdbts = new Tmdbts({ apiKey: 'your_api_key' });
 *
 * // Full authentication flow example:
 * const token = await tmdbts.auth.createRequestToken();
 * const authUrl = tmdbts.auth.getAuthenticationUrl(token.request_token);
 * // Redirect user to authUrl...
 * const session = await tmdbts.auth.createSession(token.request_token);
 * ```
 */
export class AuthApi {
  private http: HttpClient;

  /**
   * Creates a new AuthApi instance
   * @param http - Configured HttpClient for making requests
   */
  constructor(http: HttpClient) {
    this.http = http;
  }

  /**
   * Creates a request token for user authentication
   *
   * @remarks
   * Step 1 of 3 in the authentication process. This token must be approved by the user
   * before it can be used to create a session.
   *
   * @returns Promise resolving to request token data
   *
   * @example
   * ```typescript
   * const { request_token } = await tmdbts.auth.createRequestToken();
   * ```
   */
  async createRequestToken(): Promise<RequestTokenResponse> {
    return this.http.get<RequestTokenResponse>("/authentication/token/new", {});
  }

  /**
   * Generates the TMDB authentication URL for user approval
   *
   * @remarks
   * Step 2 of 3 in the authentication process. The user must visit this URL
   * to approve the request token.
   *
   * @param requestToken - The unapproved request token
   * @param redirectTo - Optional URL to redirect after approval
   * @returns The full authentication URL
   *
   * @example
   * ```typescript
   * const url = tmdbts.auth.getAuthenticationUrl(token, 'https://myapp.com/callback');
   * ```
   */
  getAuthenticationUrl(requestToken: string, redirectTo?: string): string {
    const baseUrl = "https://www.themoviedb.org/authenticate";
    const url = `${baseUrl}/${requestToken}`;
    return redirectTo
      ? `${url}?redirect_to=${encodeURIComponent(redirectTo)}`
      : url;
  }

  /**
   * Creates a session ID using an approved request token
   *
   * @remarks
   * Step 3 of 3 in the authentication process. The request token must be approved
   * by the user before calling this method.
   *
   * @param requestToken - The approved request token
   * @returns Promise resolving to session data
   *
   * @example
   * ```typescript
   * const session = await tmdbts.auth.createSession(approvedToken);
   * ```
   */
  async createSession(requestToken: string): Promise<SessionResponse> {
    return this.http.post<SessionResponse>("/authentication/session/new", {
      body: { request_token: requestToken },
    });
  }

  /**
   * Creates a guest session for limited API access
   *
   * @remarks
   * Guest sessions have reduced functionality but don't require user authentication
   *
   * @returns Promise resolving to guest session data
   */
  async createGuestSession(): Promise<GuestSessionResponse> {
    return this.http.get<GuestSessionResponse>(
      "/authentication/guest_session/new",
      {},
    );
  }

  /**
   * Validates the current API key
   *
   * @returns Promise resolving to validation result
   *
   * @example
   * ```typescript
   * const { success } = await tmdbts.auth.validateKey();
   * ```
   */
  async validateKey(): Promise<ValidateKeyResponse> {
    return this.http.get("/authentication", {});
  }

  /**
   * Creates a session using a v4 API access token
   *
   * @param data - Contains the v4 access token
   * @returns Promise resolving to session data
   */
  async createSessionFromV4Token(
    data: ConvertV4TokenParams,
  ): Promise<SessionResponse> {
    return this.http.post("/authentication/session/convert/4", {
      body: {
        access_token: data.access_token,
      },
    });
  }

  /**
   * Validates a request token with user credentials
   *
   * @remarks
   * Alternative to web-based authentication. Allows programmatic authentication
   * using username/password.
   *
   * @param data - Contains login credentials and request token
   * @returns Promise resolving to validated token data
   */
  async validateWithLogin(
    data: ValidateWithLoginParams,
  ): Promise<RequestTokenResponse> {
    if (!data.password || !data.username || !data.request_token) {
      throw new TmdbError("Missing reuired fields");
    }
    return this.http.post("/authentication/token/validate_with_login", {
      body: {
        username: data.username,
        password: data.password,
        request_token: data.request_token,
      },
    });
  }

  /**
   * Deletes/invalidates a session
   *
   * @param data - Contains the session ID to delete
   * @returns Promise resolving to deletion result
   */
  async deleteSession(
    data: DeleteSessionParams,
  ): Promise<DeleteSessionResponse> {
    return this.http.delete("/authentication/session", {
      body: {
        session_id: data.session_id,
      },
    });
  }
}
