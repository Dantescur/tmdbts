import {
  ConfigDetailsResponse,
  ConfigJobsResponse,
  ConfigCountriesParams,
  ConfigCountriesResponse,
  ConfigLanguagesResponse,
  ConfigTimezoneResponse,
} from "../types/config";
import { HttpClient } from "../utils";
export class ConfigApi {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  async getDetails(): Promise<ConfigDetailsResponse> {
    return this.http.get("/configuration", {});
  }

  async getIsoCountries(
    params: ConfigCountriesParams,
  ): Promise<ConfigCountriesResponse> {
    return this.http.get("/configuration/countries", {
      params: params,
    });
  }

  async getJobs(): Promise<ConfigJobsResponse> {
    return this.http.get("/configuration/jobs", {});
  }

  async getLanguages(): Promise<ConfigLanguagesResponse> {
    return this.http.get("/configuration/languages", {});
  }

  async getTimezones(): Promise<ConfigTimezoneResponse> {
    return this.http.get("/configuration/timezones", {});
  }
}
