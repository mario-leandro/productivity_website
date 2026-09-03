"use client";
import { Card } from "@/src/components/ui/Card";
import {
  BriefcaseBusiness,
  Folder,
  FolderPlus,
  House,
  Pin,
  Plus,
  Search,
  Sparkles,
  Star
} from "lucide-react";
import { useState } from "react";
import Modal from "@/src/components/ui/Modal";
import { NoteService } from "@/src/services/NoteService";
import { CreateNoteData, Note } from "@/src/types/note";
import { MarkdownRender } from "@/src/components/MarkdownRender";

export default function Notas() {
  const [ modalPasta, setModalPasta ] = useState(false);
  const [ nomePasta, setNomePasta ] = useState("");
  const [ navegacao, setNavegacao ] = useState("Todas as notas");
  const [ notas, setNotas ] = useState<Note[]>([]);
  const [ editar, setEditar ] = useState(false);
  const [ conteudo, setConteudo ] = useState("");
  const [ title, setTitle ] = useState("");
  const [ content, setContent ] = useState("");
  const [ folderId, setFolderId ] = useState<number | undefined>(undefined);
  const [ isFavorite, setIsFavorite ] = useState(false);
  const [ isPinned, setIsPinned ] = useState(false);

  const loadNotes = async () => {
    try {
      const response = await NoteService.list();
      console.log("Notas:", response);
      setNotas(response);
    } catch (error) {
      console.error("Erro ao buscar notas:", error);
    }
  }

  const createNote = async () => {
    try {
      const response = await NoteService.create({
        title,
        content,
        folder_id: folderId,
        is_favorite: isFavorite,
        is_pinned: isPinned,
      } as CreateNoteData);
      console.log("Nota criada:", response);
      setNotas([...notas, response]);
    } catch (error) {
      console.error("Erro ao criar nota:", error);
    }
  };

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
          <button className="h-8 bg-[var(--secundary)] text-white p-2 rounded-xl text-xs flex justify-center items-center cursor-pointer">
            <Plus size={16} />
            Nova Nota
          </button>
          <button className="h-8 flex flex-row items-center bg-(--surface-four)/20 hover:bg-(--surface-four) transition-colors border border-(--surface-four) gap-2 p-2 rounded-2xl">
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
                <button 
                  className={`flex flex-row items-center ${navegacao === "Todas as notas" ? "bg-(--primary)/20" : ""} gap-2 p-2 rounded-lg`}
                  onClick={() => setNavegacao("Todas as notas")}
                >
                  <Folder className="text-[var(--primary)]" size={16} />
                  <span className="text-sm text-[var(--text)]">
                    Todas as notas
                  </span>
                </button>

                <button 
                  className={`flex flex-row items-center ${navegacao === "Favoritas" ? "bg-(--primary)/20" : ""} gap-2 p-2 rounded-lg`}
                  onClick={() => setNavegacao("Favoritas")}
                >
                  <Star className="text-yellow-300" size={16} />
                  <span className="text-sm text-[var(--text)]">Favoritas</span>
                </button>
              </div>
            </div>

            <hr className="text-[var(--surface-four)] my-4" />

            <div className="flex flex-col">
              <div className="flex flex-row justify-between items-center mb-3">
                <p className="text-sm uppercase font-semibold">Pastas</p>

                <button onClick={() => setModalPasta(true)} className="text-[var(--text-secundary)] hover:text-[var(--primary)]">
                  <FolderPlus size={16} />
                </button>
              </div>

              <Modal isOpen={modalPasta} onClose={() => setModalPasta(false)}>
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Nome da pasta"
                    className="w-full p-2 border border-(--surface-four) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--primary)"
                    value={nomePasta}
                    onChange={(e) => setNomePasta(e.target.value)}
                  />
                  <button className="bg-(--primary) text-white p-2 rounded-lg hover:bg-(--primary)/80 transition-colors">
                    Criar Pasta
                  </button>
                  <button className="bg-(--surface-four) text-[var(--text)] p-2 rounded-lg hover:bg-(--surface-four)/80 transition-colors" onClick={() => setModalPasta(false)}>
                    Fechar Modal
                  </button>
                </div>
              </Modal>

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
          {/* <MarkdownRender /> */}
        </div>
      </div>
    </div>
  );
}
