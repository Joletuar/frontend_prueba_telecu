export interface AuthResponse {
  user: UserData;
  token: string;
}

export interface UserData {
  name: string;
  role: string;
}

export interface ErrorResponse {
  error: string;
}
