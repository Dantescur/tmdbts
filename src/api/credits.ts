import { CreditsResponse } from "../types";
import { HttpClient } from "../utils";

export class CreditsApi {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  async get(credit_id: string): Promise<CreditsResponse> {
    return this.http.get(`/credit/${credit_id}`, {});
  }
}
