import { describe, it, expect, vi, beforeEach } from "vitest";
import { TMDB } from "../client";
import { HttpClient, type TMDBConfig } from "../utils";
import {
  AccountApi,
  AuthApi,
  CertsApi,
  ChangesApi,
  CollectionsApi,
  CompaniesApi,
  CreditsApi,
  DiscoverApi,
  GenresApi,
  GuestApi,
} from "../api";

vi.mock("../utils/http", () => ({
  HttpClient: vi.fn((config: TMDBConfig) => ({
    apiKey: config.apiKey,
    baseUrl: config.baseUrl ?? "https://api.themoviedb.org/3",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
      ...config.headers,
    },
    get: vi.fn(),
    post: vi.fn(),
    client: { defaults: {} },
  })),
}));

vi.mock("../api/account", () => ({
  AccountApi: vi.fn(() => ({})),
}));
vi.mock("../api/auth", () => ({
  AuthApi: vi.fn(() => ({})),
}));
vi.mock("../api/certs", () => ({
  CertsApi: vi.fn(() => ({})),
}));
vi.mock("../api/changes", () => ({
  ChangesApi: vi.fn(() => ({})),
}));
vi.mock("../api/collections", () => ({
  CollectionsApi: vi.fn(() => ({})),
}));
vi.mock("../api/companies", () => ({
  CompaniesApi: vi.fn(() => ({})),
}));
vi.mock("../api/credits", () => ({
  CreditsApi: vi.fn(() => ({})),
}));
vi.mock("../api/discover", () => ({
  DiscoverApi: vi.fn(() => ({})),
}));
vi.mock("../api/genres", () => ({
  GenresApi: vi.fn(() => ({})),
}));
vi.mock("../api/guest", () => ({
  GuestApi: vi.fn(() => ({})),
}));

describe("TMDB Client", () => {
  const testConfig = {
    apiKey: "test-api-key",
    baseUrl: "https://api.test.tmdb.org/3",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with provided configuration", () => {
    new TMDB(testConfig);

    expect(HttpClient).toHaveBeenCalledTimes(1);
    expect(HttpClient).toHaveBeenCalledWith(testConfig);
  });

  it("should initialize all API sub-clients", () => {
    const client = new TMDB(testConfig);

    expect(client.account).toBeDefined();
    expect(client.auth).toBeDefined();
    expect(client.certifications).toBeDefined();
    expect(client.changes).toBeDefined();
    expect(client.collection).toBeDefined();
    expect(client.company).toBeDefined();
    expect(client.credit).toBeDefined();
    expect(client.discover).toBeDefined();
    expect(client.genres).toBeDefined();
    expect(client.guest).toBeDefined();
  });

  it("should pass HttpClient to all API sub-clients", () => {
    const mockHttpInstance = new HttpClient(testConfig);
    vi.mocked(HttpClient).mockReturnValueOnce(mockHttpInstance);

    new TMDB(testConfig);

    const apiConstructors = [
      vi.mocked(AccountApi),
      vi.mocked(AuthApi),
      vi.mocked(CertsApi),
      vi.mocked(ChangesApi),
      vi.mocked(CollectionsApi),
      vi.mocked(CompaniesApi),
      vi.mocked(CreditsApi),
      vi.mocked(DiscoverApi),
      vi.mocked(GenresApi),
      vi.mocked(GuestApi),
    ];

    apiConstructors.forEach((mock) => {
      expect(mock).toHaveBeenCalledWith(mockHttpInstance);
    });
  });

  describe("getClientInfo()", () => {
    it("should return client configuration info", () => {
      const client = new TMDB(testConfig);
      const mockHttpInstance = vi.mocked(HttpClient).mock.results[0].value;

      mockHttpInstance.client = {
        defaults: {
          baseURL: testConfig.baseUrl,
          headers: {
            Authorization: "Bearer test-api-key",
            "Content-Type": "application/json",
          },
        },
      };

      const info = client.getClientInfo();

      expect(info).toEqual({
        baseUrl: testConfig.baseUrl,
        headers: mockHttpInstance.client.defaults.headers,
        apiKeyMasked: "****-key",
      });
    });

    it("should handle missing configuration gracefully", () => {
      const client = new TMDB({ apiKey: "test" });
      const mockHttpInstance = vi.mocked(HttpClient).mock.results[0].value;

      mockHttpInstance.client = { defaults: {} };

      const info = client.getClientInfo();

      expect(info).toEqual({
        baseUrl: null,
        headers: {},
        apiKeyMasked: null,
      });
    });
  });

  // it("should use default baseUrl if not provided", () => {
  //   const _client = new TMDB({ apiKey: "test" });
  //
  //   console.log("HttpClient mock calls:", vi.mocked(HttpClient).mock.calls);
  //
  //   expect(HttpClient).toHaveBeenCalledWith({
  //     apiKey: "test",
  //     baseUrl: "https://api.themoviedb.org/3",
  //   });
  // });
});
