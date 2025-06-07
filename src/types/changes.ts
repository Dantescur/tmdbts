import { PaginatedResponse } from "./common";

export interface ChangedDataParams {
  end_date: Date;
  page: number;
  start_date: Date;
}

export interface ChangedData {
  id: number;
  adult?: boolean;
}

export type ChangedResponse = PaginatedResponse<ChangedData>;
