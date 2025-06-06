import { TmdbStatusResponse } from "./common";

export interface RequestTokenResponse {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface SessionResponse {
  success: boolean;
  session_id: string;
}

export interface GuestSessionResponse {
  success: boolean;
  guest_session_id: string;
  expires_at: string;
}

export interface ValidateKeyResponse extends TmdbStatusResponse {}

export interface DeleteSessionResponse {
  success: boolean;
}

export interface ValidateWithLoginParams {
  username: string;
  password: string;
  request_token: string;
}

export interface ConvertV4TokenParams {
  access_token: string;
}

export interface DeleteSessionParams {
  session_id: string;
}
