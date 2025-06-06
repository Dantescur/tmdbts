import { expect, it, describe } from "vitest";
import { CertsApi } from "./certs";
import { HttpClient } from "../utils";
import { http, HttpResponse } from "msw";
import { server } from "../../tests/mocks";
import { faker } from "@faker-js/faker";

describe("CertsApi", () => {
  const httpClient = new HttpClient({ apiKey: "test-key" });
  const certApi = new CertsApi(httpClient);

  it("should list all movies certificates", async () => {
    const mockCertifications = {
      US: generateCountryCerts(3),
      GB: generateCountryCerts(4),
      DE: generateCountryCerts(2),
    };
    server.use(
      http.get("https://api.themoviedb.org/3/certification/movie/list", () => {
        return HttpResponse.json({
          certifications: mockCertifications,
        });
      }),
    );

    const response = await certApi.getMovieCertifications();
    expect(response.certifications).toEqual(mockCertifications);
  });

  it("should list all tv certificates", async () => {
    const mockCertifications = {
      US: generateCountryCerts(3),
      GB: generateCountryCerts(4),
      DE: generateCountryCerts(2),
    };
    server.use(
      http.get("https://api.themoviedb.org/3/certification/tv/list", () => {
        return HttpResponse.json({
          certifications: mockCertifications,
        });
      }),
    );

    const response = await certApi.getTvCertifications();
    expect(response.certifications).toEqual(mockCertifications);
  });
});

function generateCountryCerts(count: number) {
  return Array.from({ length: count }, () => ({
    certification: faker.helpers.arrayElement(["PG", "12", "15", "18", "R"]),
    meaning: faker.lorem.sentence(),
    order: faker.number.int({ min: 1, max: 10 }),
  }));
}
