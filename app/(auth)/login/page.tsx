"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/contexts/AuthContext";
import Alerta from "@/src/components/ui/Alert";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [alerta, setAlerta] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await login({ email, password });

      setAlerta({
        success: true,
        message: "Login realizado com sucesso!",
      });
      setTimeout(() => {
        router.push("/");
      }, 2500);
    } catch (error) {
      setAlerta({
        success: false,
        message: (error as Error).message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="md:w-96 w-full min-h-fit border border-[var(--surface)] bg-[var(--surface)] flex flex-col items-center justify-start gap-4 p-6 rounded-2xl">
      <p className="text-xl md:text-2xl font-bold text-[var(--text)]">Login</p>

      {alerta && (
        <Alerta
          success={alerta.success}
          message={alerta.message}
          onClose={() => setAlerta(null)}
        />
      )}

      <form
        onSubmit={handleLogin}
        className="w-full flex flex-col items-start justify-start gap-4"
      >
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            className="w-full bg-[var(--surface-two)] text-base placeholder:text-sm text-white rounded-2xl p-2"
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Digite seu email"
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="password">Senha</label>
          <input
            className="w-full bg-[var(--surface-two)] text-base placeholder:text-sm text-white rounded-2xl p-2"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Digite sua senha"
          />
        </div>
        <button
          className="w-full bg-[var(--primary)] text-base placeholder:text-sm text-white rounded-2xl p-2"
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <div className="w-full flex items-center justify-center">
        <p>
          Não tem uma conta?{" "}
          <Link href="/register" className="text-[var(--primary)]">
            Registre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
