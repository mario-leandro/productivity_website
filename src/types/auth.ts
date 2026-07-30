export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export type User = {
  id: number;
  name: string;
  email: string;
  plan?: string;
  avatar?: string | null;
};
