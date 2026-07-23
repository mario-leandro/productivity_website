"use client";
import { Card, CardContent, CardHeader } from "@/src/components/ui/Card";
import {
  BriefcaseBusiness,
  Folder,
  FolderPlus,
  House,
  Pencil,
  Pin,
  Plus,
  Search,
  Sparkles,
  Star,
  Trash,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { useState } from "react";

export default function Notas() {
  const [editar, setEditar] = useState(false);

  const notas = [
    {
      id: 1,
      titulo: "Manual de uso do Syncro",
      conteudo: `# Bem-vindo ao Aura Productivity!\n\nO Aura é o seu novo ecossistema integrado para foco, agilidade e clareza mental. Reunimos as suas três ferramentas fundamentais em uma interface unificada e fluida:\n\n## 1. Calendário Inteligente\n* Visualize o seu dia, semana e mês sem sair de contexto.\n* Controle conflitos de horário com notificações instantâneas de sobreposição de eventos.\n* Arraste compromissos para mudar o dia e horário dinamicamente.\n\n## 2. Gerenciador de Tarefas Poderoso\n* Divida atividades complexas em sub-tarefas (Checklist).\n* Atribua **Prioridade Máxima**, datas de entrega e anexe documentos úteis.\n* Alterne entre as visualizações em **Lista**, **Kanban**, **Calendário** e **Timeline**.\n\n## 3. Notas em Markdown (Notion-style)\n* Organize em pastas inteligentes como '💼Trabalho', '🎓'Estudos' ou '🏠Pessoal'.\n* Escreva rascunhos limpos, relatórios de reunião e fixe no topo os de acesso constante.\n* Utilize templates prontos para reuniões, brainstormings e registros pessoais.\n\n*Dica de Produtividade: Mantenha seu dashboard limpo focando no widget "Resumo do Dia". Um dia produtivo começa com um plano simples!*`,
    },
  ];

  return (
    <div className="flex flex-col p-6 gap-4 ">
      <div className="flex flex-row justify-between items-center py-6">
        <div className="flex flex-col">
          <p className="text-2xl text-(--text) font-semibold">
            Notas & Documentação
          </p>
          <p className="text-xs text-(--text-secundary)">
            Crie bases de conhecimento, atas de reunião e relatórios limpos com
            renderizador Markdown integrado
          </p>
        </div>

        <div className="flex flex-row items-center gap-3">
          <button className="flex flex-row items-center bg-(--primary) gap-2 p-2 rounded-2xl">
            <Plus size={16} />
            Nova Nota
          </button>
          <button className="flex flex-row items-center bg-(--surface-four)/20 hover:bg-(--surface-four) transition-colors border border-(--surface-four) gap-2 p-2 rounded-2xl">
            <Sparkles className="text-(--primary)" size={16} />
            Usar Template
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* div das categorias */}
        <div className="md:w-1/4 flex flex-col gap-4">
          <Card>
            <div className="flex flex-col">
              <div className="flex flex-row justify-between items-center mb-3">
                <p className="text-sm uppercase font-semibold">Navegação</p>
              </div>

              <div className="flex flex-col gap-1">
                <button className="flex flex-row items-center bg-(--primary)/20 gap-2 p-2 rounded-lg">
                  <Folder className="text-[var(--primary)]" size={16} />
                  <span className="text-sm text-[var(--text)]">
                    Todas as notas
                  </span>
                </button>

                <button className="flex flex-row items-center gap-2 p-2 rounded-lg">
                  <Star className="text-yellow-300" size={16} />
                  <span className="text-sm text-[var(--text)]">Favoritas</span>
                </button>
              </div>
            </div>

            <hr className="text-[var(--surface-four)] my-4" />

            <div className="flex flex-col">
              <div className="flex flex-row justify-between items-center mb-3">
                <p className="text-sm uppercase font-semibold">Pastas</p>

                <button className="text-[var(--text-secundary)] hover:text-[var(--primary)]">
                  <FolderPlus size={16} />
                </button>
              </div>

              <div className="flex flex-col gap-1">
                <button className="flex flex-row items-center text-sm text-[var(--text)] gap-2 p-2 rounded-lg">
                  <BriefcaseBusiness size={16} />
                  Trabalho
                </button>

                <button className="flex flex-row items-center text-sm text-[var(--text)] gap-2 p-2 rounded-lg">
                  <House size={16} />
                  Pessoal
                </button>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row items-center bg-(--surface-three) border border-(--surface-four) gap-2 p-2 rounded-2xl">
                <Search className="text-[var(--text-secundary)]" size={16} />
                <input
                  type="text"
                  name="search"
                  className="w-full text-xs text-[var(--text)] focus:outline-none placeholder-[var(--text-secundary)]"
                  placeholder="Buscar nota ou termo..."
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex flex-col bg-(--surface-three) border border-(--surface-four) rounded-xl p-3 gap-2">
                  <div className="flex flex-row justify-between items-center">
                    <p className="text-sm font-semibold">
                      Manual de uso do Syncro
                    </p>

                    <div className="flex flex-row items-center gap-2">
                      <Pin className="text-yellow-400" size={16} />
                      <Star className="text-yellow-400" size={16} />
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-(--text-secundary)">
                      Descrição do projeto Syncro...
                    </p>
                  </div>

                  <div className="flex flex-row justify-end items-center">
                    <p className="text-[10px] text-(--text-secundary)">
                      23/07/2026
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* div das notas */}
        <div className="md:w-3/4">
          <Card className="p-6">
            <CardHeader className="flex flex-row justify-between items-center">
              <div>
                <p>Tag</p>
              </div>

              <div className="flex flex-row items-center gap-2">
                <button className="p-2 rounded-lg border border-(--surface-four) hover:bg-(--surface-three) transition-colors">
                  <Star size={16} />
                </button>

                <button className="p-2 rounded-lg border border-(--surface-four) hover:bg-(--surface-three) transition-colors">
                  <Pin size={16} />
                </button>

                <button
                  className="flex flex-row items-center text-xs gap-1 px-3 py-2 rounded-lg bg-(--primary) hover:bg-(--primary)/60 transition-colors"
                  onClick={() => setEditar(!editar)}
                >
                  <Pencil size={16} />
                  {editar ? "Salvar" : "Editar"}
                </button>

                <button className="p-2 rounded-lg border border-(--surface-four) hover:bg-(--surface-three) transition-colors">
                  <Trash className="text-red-400" size={16} />
                </button>
              </div>
            </CardHeader>

            <hr className="text-(--surface-four) my-5" />

            <CardContent>
              <h2 className="text-xl font-bold">Manual de uso do Syncro</h2>

              {/* preview aqui */}
              <div className="mt-6 text-[var(--text)] text-base leading-relaxed">
                {editar ? (
                  <div className="bg-(--surface-three) border border-(--surface-four) rounded-xl flex flex-col gap-2 mt-6">
                    <textarea
                      className="w-full h-[500px] rounded-xl p-3 text-[var(--text)] text-base leading-relaxed focus:outline-none resize-none"
                      value={notas[0].conteudo}
                      onChange={(e) => setEditar(e.target.value)}
                    />
                  </div>
                ) : (
                  <div className="bg-(--surface-three) border border-(--surface-four) rounded-xl p-3">
                    <ReactMarkdown
                      components={{
                        h1: ({ children }) => (
                          <h1 className="text-xl font-bold mb-6 text-[var(--text)]">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-lg font-semibold mt-8 mb-3 text-[var(--primary)]">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-base font-semibold mt-6 mb-2">
                            {children}
                          </h3>
                        ),
                        p: ({ children }) => (
                          <p className="text-xs leading-6 mb-4 text-[var(--text-secundary)]">
                            {children}
                          </p>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc ml-6 space-y-2 mb-4">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal ml-6 space-y-2 mb-4">
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => (
                          <li className="text-[var(--text-secundary)] text-xs">
                            {children}
                          </li>
                        ),
                        strong: ({ children }) => (
                          <strong className="text-[var(--text)] font-bold">
                            {children}
                          </strong>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-[var(--primary)] pl-4 italic my-4">
                            {children}
                          </blockquote>
                        ),
                      }}
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                    >
                      {notas[0].conteudo}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
