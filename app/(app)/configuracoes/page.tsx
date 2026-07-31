"use client";

import { useAuth } from "@/src/contexts/AuthContext";
import { useState } from "react";

export default function Configuracoes() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("Perfil");

  const isActive = "bg-violet-500/30 text-[var(--text)]";

  return (
    <div className="flex flex-col p-6 gap-4 overflow-y-auto">
      <div className="flex flex-col">
        <h1 className="text-2xl text-[var(--text)] font-semibold">
          Configurações
        </h1>
        <p className="text-xs text-[var(--text-secundary)]">
          Gerencie suas configurações de conta e perfil
        </p>
      </div>

      <hr className="text-(--surface-four)" />

      <div className="flex flex-row w-full gap-4">
        <div className="flex flex-col gap-2 w-1/4">
          <p
            onClick={() => setActiveTab("Geral")}
            className={`text-xs text-(--text-secundary) font-semibold p-2 rounded-xl cursor-pointer ${activeTab === "Geral" ? isActive : ""}`}
          >
            Geral
          </p>
          <p
            onClick={() => setActiveTab("Perfil")}
            className={`text-xs text-(--text-secundary) font-semibold p-2 rounded-xl cursor-pointer ${activeTab === "Perfil" ? isActive : ""}`}
          >
            Perfil
          </p>
          <p
            onClick={() => setActiveTab("Notificações")}
            className={`text-xs text-(--text-secundary) font-semibold p-2 rounded-xl cursor-pointer ${activeTab === "Notificações" ? isActive : ""}`}
          >
            Notificações
          </p>
          <p
            onClick={() => setActiveTab("Segurança")}
            className={`text-xs text-(--text-secundary) font-semibold p-2 rounded-xl cursor-pointer ${activeTab === "Segurança" ? isActive : ""}`}
          >
            Segurança
          </p>
        </div>

        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            {/* <div>
              <h2 className="text-lg text-[var(--text)] font-semibold">
                Perfil
              </h2>
              <p className="text-xs text-(--text-secundary)">
                Gerencie suas configurações de conta e perfil
              </p>
            </div> */}

            <div className="flex flex-col md:flex-row gap-2 w-full">
              <div className="flex flex-col w-full gap-2">
                <label
                  htmlFor="name"
                  className="text-xs text-(--text-secundary) font-semibold"
                >
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 rounded-xl text-xs bg-(--surface-three)"
                  placeholder="Ex: João da Silva"
                />
              </div>

              <div className="flex flex-col w-full gap-2">
                <label
                  htmlFor="email"
                  className="text-xs text-(--text-secundary) font-semibold"
                >
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 rounded-xl text-xs bg-(--surface-three)"
                  placeholder="Ex: nome@exemplo.com"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="plan"
                className="text-xs text-(--text-secundary) font-semibold"
              >
                Plano
              </label>
              <input
                type="text"
                id="plan"
                className="w-full p-2 rounded-xl text-xs bg-(--surface-three)"
                value="Free"
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
