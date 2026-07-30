"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { sendRequest } from "../lib/api";
import { User } from "../types/auth";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function getMe(): Promise<User> {
    return await sendRequest<User>("/auth/me");
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

  async function login(email: string, password: string) {
    const response = await sendRequest("/auth/login", {
      method: "POST",
      data: { email, password },
    });

    if (!response.success) {
      throw new Error(
        response.message || response.error || "Erro ao fazer login",
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

  async function register(name: string, email: string, password: string) {
    await sendRequest("/auth/register", {
      method: "POST",
      data: { name, email, password },
    });
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
