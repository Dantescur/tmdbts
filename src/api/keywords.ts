import { KeywordResponse } from "../types";
import { HttpClient } from "../utils";

export class KeywordsApi {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  async details(keyword_id: number): Promise<KeywordResponse> {
    return this.http.get(`/keyword/${keyword_id}`, {});
  }
}
