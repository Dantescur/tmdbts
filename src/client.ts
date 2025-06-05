// src/client.ts
import { HttpClient, TmdbConfig } from "./utils";
import { AccountApi } from "./api/account";

export class Tmdb {
  public account: AccountApi;

  constructor(config: TmdbConfig) {
    const httpClient = new HttpClient(config);
    this.account = new AccountApi(httpClient);
  }
}
