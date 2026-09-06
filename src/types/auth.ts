export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  success?: boolean;
  message?: string;
  error?: string;
}

export interface AuthResponse {
  token: string;
  success: boolean;
  message?: string;
  error?: string;
  user?: User;
  data?: {
    token?: string;
    user?: User;
  };
}

export type User = {
  id: number;
  name: string;
  email: string;
  plan?: string;
  avatar?: string | null;
};
