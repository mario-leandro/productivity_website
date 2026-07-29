import { sendRequest } from "@/src/lib/api";
import { LoginData, RegisterData, AuthResponse, User } from "@/src/types/auth";

export const authService = {
  login: (data: LoginData) =>
    sendRequest<AuthResponse>("/auth/login", {
      method: "POST",
      data,
    }),

  register: (data: RegisterData) =>
    sendRequest("/auth/register", {
      method: "POST",
      data,
    }),

  me: (token: string) =>
    sendRequest<User>("/auth/me", {
      token,
    }),
};
