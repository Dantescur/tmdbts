// src/client.ts
import { AccountApi, AuthApi } from "./api";
import { HttpClient, TmdbConfig } from "./utils";

export class Tmdb {
  public account: AccountApi;
  public auth: AuthApi;

  constructor(config: TmdbConfig) {
    const httpClient = new HttpClient(config);
    this.account = new AccountApi(httpClient);
    this.auth = new AuthApi(httpClient);
  }
}
