import {
  CompanyAlternativeNamesResponse,
  CompanyDetailsResponse,
  CompanyLogoResponse,
} from "../types/company";
import { HttpClient } from "../utils";

export class CompaniesApi {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  async getDetails(company_id: number): Promise<CompanyDetailsResponse> {
    return this.http.get(`/company/${company_id}`, {});
  }

  async getAlternativeNames(
    company_id: number,
  ): Promise<CompanyAlternativeNamesResponse> {
    return this.http.get(`/company/${company_id}/alternative_names`, {});
  }

  async getLogo(company_id: number): Promise<CompanyLogoResponse> {
    return this.http.get(`/company/${company_id}/images`, {});
  }
}
