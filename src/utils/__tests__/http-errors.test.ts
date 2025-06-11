import { beforeEach, describe, expect, it, vi } from "vitest";
import axios from "axios";
import { HttpClient } from "../http";
import { TMDBError } from "../errors";

// Mocks
vi.mock("axios");

const instanceMock = {
  get: vi.fn(),
  post: vi.fn(),
  delete: vi.fn(),
};

const mockedAxios = axios as unknown as {
  create: typeof axios.create;
  isAxiosError: (payload: unknown) => payload is import("axios").AxiosError;
};

describe("HttpClient error cases", () => {
  let http: HttpClient;

  beforeEach(() => {
    mockedAxios.create = vi.fn(() => instanceMock as any);
    mockedAxios.isAxiosError = (
      _payload: unknown,
    ): _payload is import("axios").AxiosError => true;

    http = new HttpClient({ apiKey: "test-key" });
  });

  it("should throw TmdbError on get failure", async () => {
    instanceMock.get.mockRejectedValueOnce({
      message: "Not Found",
      response: { status: 404 },
    });

    await expect(http.get("/fail", {})).rejects.toThrow(TMDBError);
  });

  it("should throw TmdbError on post failure", async () => {
    instanceMock.post.mockRejectedValueOnce({
      message: "Unauthorized",
      response: { status: 401 },
    });

    await expect(http.post("/fail", { body: {} })).rejects.toThrow("401");
  });

  it("should throw TmdbError on delete failure", async () => {
    instanceMock.delete.mockRejectedValueOnce({
      message: "Server Error",
      response: { status: 500 },
    });

    await expect(http.delete("/fail", {})).rejects.toThrow("500");
  });

  it("should throw generic TmdbError if error is not AxiosError", async () => {
    mockedAxios.isAxiosError = (
      _payload: unknown,
    ): _payload is import("axios").AxiosError => false;

    instanceMock.get.mockRejectedValueOnce(new Error("Unexpected failure"));

    await expect(http.get("/fail", {})).rejects.toThrow(
      "Unknown error occurred",
    );
  });

  it("should fallback to 'Unknown' when status is undefined in AxiosError", async () => {
    // 👇 asegúrate de que sí lo detecte como AxiosError
    mockedAxios.isAxiosError = (
      _payload: unknown,
    ): _payload is import("axios").AxiosError => true;

    instanceMock.post.mockRejectedValueOnce({
      message: "Timeout",
      response: undefined, // <--- esto forza que status sea undefined
    });

    await expect(http.post("/fail", { body: {} })).rejects.toThrow(
      "Unknown - Timeout",
    );
  });
});
