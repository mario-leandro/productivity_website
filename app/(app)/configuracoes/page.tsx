"use client";

import { useAuth } from "@/src/contexts/AuthContext";
import { LockKeyhole, Mail, User } from "lucide-react";
import Image from "next/image";
// import { useState } from "react";

export default function Configuracoes() {
  const { user } = useAuth();
  // const [activeTab, setActiveTab] = useState("Perfil");

  // const isActive = "bg-violet-500/30 text-[var(--text)]";

  return (
    <div className="flex flex-col p-6 gap-4 overflow-y-auto">
      <div className="flex flex-col py-4">
        <h1 className="text-lg md:text-xl text-[var(--text)] font-semibold">
          Configurações
        </h1>
      </div>

      <div className="flex flex-row w-full gap-4">
        {/* <div className="flex flex-col gap-2 w-1/4">
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
        </div> */}

        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:flex-wrap w-full justify-between items-start gap-4">
            <div className="w-full md:w-1/5 flex flex-col gap-2">
              <h2 className="text-base text-[var(--text)] font-semibold">
                Perfil
              </h2>
              <p className="text-xs text-(--text-secundary)">
                Atualize suas informações pessoais
              </p>
            </div>

            <div className="w-full md:w-3/4 flex flex-col gap-2">
              {/* Imagem de perfil */}
              <div className="w-full flex flex-row gap-2">
                <div className="relative w-24 h-24 rounded-full bg-(--surface-three)">
                  <Image
                    src={user?.avatar || "/user.svg"}
                    alt="Avatar"
                    width={96}
                    height={96}
                    className="rounded-full p-2"
                  />

                  <input
                    type="file"
                    accept="image/*"
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer rounded-full"
                  />
                </div>
              </div>

              <div className="flex flex-col w-full gap-2">
                <label
                  htmlFor="name"
                  className="text-xs text-(--text-secundary) font-semibold"
                >
                  Nome Completo
                </label>

                <div className="flex flex-row items-center gap-2 w-full p-2 rounded-xl text-xs bg-(--surface-three)">
                  <User size={16} className="text-(--text-secundary)" />
                  <input
                    type="text"
                    id="name"
                    className="w-full focus:outline-none text-(--text) placeholder:text-(--text-secundary)"
                    placeholder="Digite seu nome completo"
                    defaultValue={user?.name}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col w-full gap-2">
                <label
                  htmlFor="email"
                  className="text-xs text-(--text-secundary) font-semibold"
                >
                  E-mail
                </label>
                <div className="flex flex-row items-center gap-2 w-full p-2 rounded-xl text-xs bg-(--surface-three)">
                  <Mail size={16} className="text-(--text-secundary)" />
                  <input
                    type="email"
                    id="email"
                    className="w-full focus:outline-none text-(--text) placeholder:text-(--text-secundary)"
                    placeholder="Digite seu email"
                    defaultValue={user?.email}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col w-full gap-2">
                <label
                  htmlFor="password"
                  className="text-xs text-(--text-secundary) font-semibold"
                >
                  Senha
                </label>
                <div className="flex flex-row items-center gap-2 w-full p-2 rounded-xl text-xs bg-(--surface-three)">
                  <LockKeyhole size={16} className="text-(--text-secundary)" />
                  <input
                    type="password"
                    id="password"
                    className="w-full focus:outline-none bg-transparent text-(--text) placeholder:text-(--text-secundary)"
                    placeholder="Insira a nova senha"
                  />
                </div>
              </div>
            </div>

            {/* <div className="flex flex-col gap-2">
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
            </div> */}
          </div>

          <hr className="text-(--surface-four) my-4" />

          <div className="flex flex-col md:flex-row md:flex-wrap w-full justify-between items-start gap-4">
            <div className="w-full md:w-1/5 flex flex-col gap-2">
              <h2 className="text-base text-(--text) font-semibold">
                Autenticação de dois fatores (2FA)
              </h2>
              <p className="text-xs text-(--text-secundary) font-semibold">
                Mantenha sua conta segura habilitando a autenticação de dois
                fatores via SMS ou usando uma senha temporária (TOTP) de um
                aplicativo autenticador.
              </p>
            </div>

            <div className="w-full md:w-3/4 flex flex-col gap-6">
              <div className="flex flex-row items-center gap-2">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  className="accent-(--primary) cursor-pointer"
                />
                <div className="flex flex-col">
                  <label className="text-sm text-(--text) font-semibold">
                    Mensagem de Texto (SMS)
                  </label>
                  <p className="text-xs text-(--text-secundary)">
                    Receba um código de acesso único por SMS sempre que fizer
                    login.
                  </p>
                </div>
              </div>

              <div className="flex flex-row items-center gap-2">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  className="accent-(--primary) cursor-pointer"
                />
                <div className="flex flex-col">
                  <label className="text-sm text-(--text) font-semibold">
                    Autenticador de Aplicativo
                  </label>
                  <p className="text-xs text-(--text-secundary)">
                    Use um aplicativo autenticador como Google Authenticator
                    para receber códigos de acesso único.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <hr className="text-(--surface-four) my-4" />

          <div className="w-full flex flex-col md:flex-row md:flex-wrap justify-between items-start gap-4">
            <div className="w-full md:w-1/5 flex flex-col gap-2">
              <h2 className="text-base text-(--text) font-semibold">
                Zona de perigo
              </h2>
              <p className="text-xs text-(--text-secundary) font-semibold">
                Prossiga com cuidado. Estas ações não podem ser desfeitas.
              </p>
            </div>

            <div className="w-full md:w-3/4 flex flex-col gap-6">
              <div className="flex flex-row justify-between items-center gap-2">
                <p className="text-sm text-(--text)">
                  Saia de todas as sessões, inclusive as do dispositivo móvel,
                  do iPad e de outros navegadores
                </p>

                <button className="w-full md:w-1/4 p-2 rounded-xl text-xs bg-transparent border border-(--surface-four) text-(--text) font-semibold cursor-pointer">
                  Sair de todas as sessões
                </button>
              </div>

              <div className="w-full flex justify-end items-center">
                <button className="w-full md:w-1/4 p-2 rounded-xl text-xs bg-red-600 text-white font-semibold cursor-pointer">
                  Excluir Conta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
