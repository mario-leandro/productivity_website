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
import { useEffect, useState } from "react";
import Modal from "@/src/components/ui/Modal";
import { NoteService } from "@/src/services/NoteService";
import { CreateNoteData, Note } from "@/src/types/note";
import { MarkdownRender } from "@/src/components/MarkdownRender";
import { NoteFoldersService } from "@/src/services/NoteFolders";

export default function Notas() {
  const [modalPasta, setModalPasta] = useState(false);
  const [nomePasta, setNomePasta] = useState("");
  const [navegacao, setNavegacao] = useState("Todas as notas");
  const [notas, setNotas] = useState<Note[]>([]);
  const [pastas, setPastas] = useState<{ id: number; name: string }[]>([]);
  const [editar, setEditar] = useState(false);
  const [conteudo, setConteudo] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [folderId, setFolderId] = useState<number | undefined>(undefined);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const loadNotes = async () => {
    try {
      const response = await NoteService.list();
      setNotas(response.data);
    } catch (error) {
      console.error("Erro ao buscar notas:", error);
    }
  }

  const loadFolders = async () => {
    try {
      const response = await NoteFoldersService.listFolders();
      setPastas(response.data); // Assuming you have a state for folders
    } catch (error) {
      console.error("Erro ao buscar pastas:", error);
    }
  };

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
      setNotas([...notas, response.data]);
    } catch (error) {
      console.error("Erro ao criar nota:", error);
    }
  };

  const createFolder = async (name: string) => {
    try {
      const response = await NoteFoldersService.createFolder({ name });
      console.log("Pasta criada:", response);
      // Update your folders state here if you have one
    } catch (error) {
      console.error("Erro ao criar pasta:", error);
    }
  };

  useEffect(() => {
    loadNotes();
    loadFolders();
  }, []);

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

      <div className="w-full bg-(--surface) rounded-2xl p-3">
        <div className="flex flex-row items-center bg-(--surface-three) border border-(--surface-four) gap-2 p-2 rounded-2xl">
          <Search className="text-[var(--text-secundary)]" size={16} />
          <input
            type="text"
            name="search"
            className="w-full text-xs text-[var(--text)] focus:outline-none placeholder-[var(--text-secundary)]"
            placeholder="Buscar nota ou termo..."
          />
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
                { pastas && pastas.length > 0 ? pastas.map((pasta) => (
                  <button key={pasta.id} className="flex flex-row items-center text-sm text-[var(--text)] gap-2 p-2 rounded-lg">
                    <BriefcaseBusiness size={16} />
                    {pasta.name}
                  </button>
                )) : (<p className="text-sm text-[var(--text-secundary)]">Nenhuma pasta encontrada</p>) }
              </div>
            </div>
          </Card>
        </div>

        {/* div das notas */}
        <div className="md:w-3/4">
          {selectedNote ? (
            <MarkdownRender
              note={selectedNote}
              onBack={() => setSelectedNote(null)}
            />
          ) : (
            <Card>
              <div className="flex flex-col gap-4">
                {notas.map((nota) => (
                  <div
                    key={nota.id}
                    onClick={() => setSelectedNote(nota)}
                    className="flex flex-col bg-(--surface-three)
                       hover:bg-(--surface-two)
                       duration-100
                       border border-(--surface-four)
                       rounded-xl p-3 gap-2 cursor-pointer"
                  >
                    <div className="flex flex-row justify-between items-center">
                      <p className="text-sm font-semibold">
                        {nota.title}
                      </p>

                      <div className="flex flex-row items-center gap-2">
                        <Pin
                          size={16}
                          className={
                            nota.is_pinned
                              ? "text-yellow-400"
                              : "text-(--text-secundary)"
                          }
                        />

                        <Star
                          size={16}
                          className={
                            nota.is_favorite
                              ? "text-yellow-400"
                              : "text-(--text-secundary)"
                          }
                        />
                      </div>
                    </div>

                    <p className="text-xs text-(--text-secundary)">
                      {nota.content.substring(0, 120)}...
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
