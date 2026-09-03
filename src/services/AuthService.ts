import { sendRequest } from "@/src/lib/api";
import { LoginData, RegisterData, AuthResponse, User } from "@/src/types/auth";

export const AuthService = {
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

  me: () =>
    sendRequest<User>("/auth/me"),
};
