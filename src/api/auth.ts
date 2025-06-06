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
import { HttpClient } from "../utils";

export class AuthApi {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  /**
   * Creates a new request token for user authentication.
   * Step 1 of the authentication process
   * @returns A promise resolving to the request token response
   */
  async createRequestToken(): Promise<RequestTokenResponse> {
    return this.http.get<RequestTokenResponse>("/authentication/token/new", {});
  }

  /**
   * Generates the TMDb authentication URL for user approval.
   * Step 2 of the authentication process (client-side redirect).
   * @param requestToken The request token from createRequestToken.
   * @param redirectTo Optional URL to redirect to after approval.
   * @returns The authentication URL string.
   */
  getAuthenticationUrl(requestToken: string, redirectTo?: string): string {
    const baseUrl = "https://www.themoviedb.org/authenticate";
    const url = `${baseUrl}/${requestToken}`;
    return redirectTo
      ? `${url}?redirect_to=${encodeURIComponent(redirectTo)}`
      : url;
  }

  /**
   * Creates a session ID using an approved request token.
   * Step 3 of the authentication process.
   * @param requestToken The approved request token.
   * @returns A promise resolving to the session response.
   */
  async createSession(requestToken: string): Promise<SessionResponse> {
    return this.http.post<SessionResponse>("/authentication/session/new", {
      body: { request_token: requestToken },
    });
  }

  /**
   * Creates a guest session for limited account functionality.
   * @returns A promise resolving to the guest session response.
   */
  async createGuestSession(): Promise<GuestSessionResponse> {
    return this.http.get<GuestSessionResponse>(
      "/authentication/guest_session/new",
      {},
    );
  }

  /**
   * Validates the API key.
   * @returns A promise resolving to the validate key response.
   */
  async validateKey(): Promise<ValidateKeyResponse> {
    return this.http.get("/authentication", {});
  }

  /**
   * Creates a session ID using a v4 access token.
   * @param data The v4 access token parameters.
   * @returns A promise resolving to the session response.
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
   * Validates a request token with user login credentials.
   * @param data The login credentials and request token.
   * @returns A promise resolving to the request token response.
   */
  async validateWithLogin(
    data: ValidateWithLoginParams,
  ): Promise<RequestTokenResponse> {
    return this.http.post("/authentication/token/validate_with_login", {
      body: {
        username: data.username,
        password: data.password,
        request_token: data.request_token,
      },
    });
  }

  /**
   * Deletes a session.
   * @param params The session ID to delete.
   * @returns A promise resolving to the delete session response.
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
