export interface CompanyDetailsResponse {
  description: string;
  headquarters: string;
  homepage: string;
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
  parent_company: any;
}

export interface CompanyAlternativeNamesResponse {
  id: number;
  results: Result[];
}

export interface Result {
  name: string;
  type: string;
}

export interface CompanyLogoResponse {
  id: number;
  logos: Logo[];
}

export interface Logo {
  aspect_ratio: number;
  file_path: string;
  height: number;
  id: string;
  file_type: string;
  vote_average: number;
  vote_count: number;
  width: number;
}
