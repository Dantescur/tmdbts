// src/client.ts
import { AccountApi, AuthApi, CertsApi } from "./api";
import { HttpClient, TmdbConfig } from "./utils";

export class Tmdb {
  public account: AccountApi;
  public auth: AuthApi;
  public certifications: CertsApi;

  constructor(config: TmdbConfig) {
    const httpClient = new HttpClient(config);
    this.account = new AccountApi(httpClient);
    this.auth = new AuthApi(httpClient);
    this.certifications = new CertsApi(httpClient);
  }
}
