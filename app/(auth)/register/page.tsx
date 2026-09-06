"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/contexts/AuthContext";
import Alerta from "@/src/components/ui/Alert";
import Link from "next/link";
import { RegisterData } from "@/src/types/auth";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [alerta, setAlerta] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleRegister = async () => {
    setSubmitting(true);
    try {
      if (password !== confirmPassword) {
        setAlerta({
          success: false,
          message: "As senhas não coincidem!",
        });
        return;
      }

      await register({ name, email, password } as RegisterData);

      setAlerta({
        success: true,
        message: "Cadastro realizado com sucesso!",
      });
      setTimeout(() => {
        router.push("/login");
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
      <p className="text-xl md:text-2xl font-bold text-[var(--text)]">
        Cadastro
      </p>

      {alerta && (
        <Alerta
          success={alerta.success}
          message={alerta.message}
          onClose={() => setAlerta(null)}
        />
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
        className="w-full flex flex-col items-start justify-start gap-4"
      >
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="name">Nome</label>
          <input
            className="w-full bg-[var(--surface-two)] text-base placeholder:text-sm text-white rounded-2xl p-2"
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Digite seu nome"
          />
        </div>
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
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="confirmPassword">Confirmar senha</label>
          <input
            className="w-full bg-[var(--surface-two)] text-base placeholder:text-sm text-white rounded-2xl p-2"
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Digite sua senha"
          />
        </div>
        <button
          className="w-full bg-[var(--primary)] text-base placeholder:text-sm text-white rounded-2xl p-2"
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Criando..." : "Criar conta"}
        </button>
      </form>

      <div className="w-full flex items-center justify-center">
        <p>
          Já tem conta?{" "}
          <Link href="/login" className="text-[var(--primary)]">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}
