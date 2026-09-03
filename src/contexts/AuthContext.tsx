"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, RegisterData, LoginData, AuthResponse } from "../types/auth";
import { AuthService } from "../services/AuthService";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function getMe(): Promise<User> {
    return await AuthService.me();
  }

  async function loadUser() {
    const token = localStorage.getItem("token");
    const userStorage = localStorage.getItem("user");

    if (!token || !userStorage) {
      setLoading(false);
      return;
    }

    try {
      setUser(JSON.parse(userStorage));
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  async function login(data: LoginData) {
    const response: AuthResponse = await AuthService.login(data);

    if (!response.success) {
      throw new Error(
        response.error || response.message || "Falha ao fazer login. Por favor, tente novamente."
      );
    }

    const token = response.data?.token as string;
    const usuario = response.data?.user as User;

    if (!token || !usuario) {
      throw new Error("Resposta de login inválida");
    }

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(usuario));

    setUser(usuario);
  }

  async function register(data: RegisterData) {
    await AuthService.register(data);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }

  return context;
}
