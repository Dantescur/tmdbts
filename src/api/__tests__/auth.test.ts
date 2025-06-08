import { expect, it, describe } from "vitest";
import { AuthApi } from "../auth";
import { HttpClient } from "../../utils";
import { http, HttpResponse } from "msw";
import { server } from "../../../tests/mocks";
import { getOpenApiExample } from "../../../tests/openapi";

describe("AuthApi", () => {
  const httpClient = new HttpClient({ apiKey: "test-key" });
  const authApi = new AuthApi(httpClient);

  it("should create a request token", async () => {
    const example = getOpenApiExample(
      "/3/authentication/token/new",
      "get",
      "200",
    );

    const response = await authApi.createRequestToken();
    expect(response).toEqual(example);
  });

  it("shoud generate a authentication URL", () => {
    const url = authApi.getAuthenticationUrl("abc123", "http://example.com");
    expect(url).toBe(
      "https://www.themoviedb.org/authenticate/abc123?redirect_to=http%3A%2F%2Fexample.com",
    );
  });

  it("should create a session", async () => {
    const example = getOpenApiExample(
      "/3/authentication/session/new",
      "post",
      "200",
    );

    const response = await authApi.createSession("abc123");
    expect(response).toEqual(example);
  });

  it("should create a guest session", async () => {
    const example = getOpenApiExample(
      "/3/authentication/guest_session/new",
      "get",
      "200",
    );
    const response = await authApi.createGuestSession();
    expect(response).toEqual(example);
  });

  it("should create a session from v4 token", async () => {
    const example = getOpenApiExample(
      "/3/authentication/session/convert/4",
      "post",
      "200",
    );

    const response = await authApi.createSessionFromV4Token({
      access_token: "v4token123",
    });
    expect(response).toEqual(example);
  });

  it("should validate request token with login", async () => {
    const example = getOpenApiExample(
      "/3/authentication/token/validate_with_login",
      "post",
      "200",
    );

    const response = await authApi.validateWithLogin({
      username: "testuser",
      password: "testpass",
      request_token: "abc123",
    });
    expect(response).toEqual(example);
  });

  it("should delete a session", async () => {
    const example = getOpenApiExample(
      "/3/authentication/session",
      "delete",
      "200",
    );

    const response = await authApi.deleteSession({ session_id: "xyz789" });
    expect(response).toEqual(example);
  });

  it("should validate API key", async () => {
    const example = getOpenApiExample("/3/authentication", "get", "200");

    const response = await authApi.validateKey();
    expect(response).toEqual(example);
  });

  it("should throw TmdbError on failed request token creation", async () => {
    server.use(
      http.get("https://api.themoviedb.org/3/authentication/token/new", () => {
        return HttpResponse.text("Unauthorized", { status: 401 });
      }),
    );

    await expect(authApi.createRequestToken()).rejects.toThrow(
      /TMDB API Error: 401 - Request failed with status code 401/,
    );
  });

  it("should throw TmdbError on failed session creation from v4 token", async () => {
    server.use(
      http.post(
        "https://api.themoviedb.org/3/authentication/session/convert/4",
        () => {
          return HttpResponse.text("Invalid v4 token", { status: 400 });
        },
      ),
    );

    await expect(
      authApi.createSessionFromV4Token({ access_token: "invalid" }),
    ).rejects.toThrow(
      /TMDB API Error: 400 - Request failed with status code 400/,
    );
  });

  it("should throw TmdbError on failed validate with login", async () => {
    server.use(
      http.post(
        "https://api.themoviedb.org/3/authentication/token/validate_with_login",
        () => {
          return HttpResponse.text("Invalid credentials", { status: 401 });
        },
      ),
    );

    await expect(
      authApi.validateWithLogin({
        username: "wronguser",
        password: "wrongpass",
        request_token: "abc123",
      }),
    ).rejects.toThrow(
      /TMDB API Error: 401 - Request failed with status code 401/,
    );
  });

  it("should reject when missing required fields", async () => {
    await expect(
      authApi.validateWithLogin({
        username: "",
        password: "testpass",
        request_token: "abc123",
      }),
    ).rejects.toThrow();
  });

  it("should throw TmdbError on failed session deletion", async () => {
    server.use(
      http.delete("https://api.themoviedb.org/3/authentication/session", () => {
        return HttpResponse.text("Session not found", { status: 404 });
      }),
    );

    await expect(
      authApi.deleteSession({ session_id: "invalid" }),
    ).rejects.toThrow(
      /TMDB API Error: 404 - Request failed with status code 404/,
    );
  });

  it("should throw TmdbError on failed API key validation", async () => {
    server.use(
      http.get("https://api.themoviedb.org/3/authentication", () => {
        return HttpResponse.text("Invalid API key", { status: 401 });
      }),
    );

    await expect(authApi.validateKey()).rejects.toThrow(
      /TMDB API Error: 401 - Request failed with status code 401/,
    );
  });
});
