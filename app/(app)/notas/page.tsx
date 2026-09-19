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
import { CreateNoteData, Note, UpdateNoteData } from "@/src/types/note";
import { NoteRender } from "@/src/components/NoteRender";
import { NoteFoldersService } from "@/src/services/NoteFolders";
import { Spinner } from "@/src/components/ui/Spinner";

export default function Notas() {
  const [modalPasta, setModalPasta] = useState(false);
  const [modalNota, setModalNota] = useState(false);
  const [nomePasta, setNomePasta] = useState("");
  const [navegacao, setNavegacao] = useState("Todas as notas");
  const [notas, setNotas] = useState<Note[]>([]);
  const [pastas, setPastas] = useState<{ id: number; name: string }[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [folderId, setFolderId] = useState<number | undefined>(undefined);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [pasta, setPasta] = useState<{ id: number; name: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadNotes = async () => {
    setIsLoading(true);
    try {
      const response = await NoteService.list();
      setNotas(response.data);
    } catch (error) {
      console.error("Erro ao buscar notas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadFolders = async () => {
    setIsLoading(true);
    try {
      const response = await NoteFoldersService.listFolders();
      setPastas(response.data);
    } catch (error) {
      console.error("Erro ao buscar pastas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createNote = async () => {
    if (!title.trim() || !content.trim()) {
      return;
    }

    try {
      await NoteService.create({
        title: title.trim(),
        content: content.trim(),
        folder_id: folderId,
        is_favorite: isFavorite,
        is_pinned: isPinned,
      });

      await loadNotes();

      setTitle("");
      setContent("");
      setFolderId(undefined);
      setIsFavorite(false);
      setIsPinned(false);

      setModalNota(false);
    } catch (error) {
      console.error("Erro ao criar nota:", error);
    }
  };

  const createFolder = async () => {
    if (!nomePasta.trim()) {
      return;
    }

    try {
      const response = await NoteFoldersService.createFolder({
        name: nomePasta.trim(),
      });

      setPasta(response.data);

      setPastas((prev) => [
        ...prev,
        response.data,
      ]);

      setNomePasta("");
      setModalPasta(false);
    } catch (error) {
      console.error("Erro ao criar pasta:", error);
    }
  };

  const updateNote = async (
    id: number,
    data: Partial<UpdateNoteData>
  ) => {
    try {
      await NoteService.update(id, data);

      setNotas((prevNotas) =>
        prevNotas.map((note) =>
          note.id === id
            ? { ...note, ...data }
            : note
        )
      );

      setSelectedNote((prev) =>
        prev?.id === id
          ? { ...prev, ...data }
          : prev
      );
    } catch (error) {
      console.error("Erro ao atualizar nota:", error);
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
          <button
            onClick={() => setModalNota(true)}
            className="h-8 bg-[var(--secundary)] text-white p-2 rounded-xl text-xs flex justify-center items-center cursor-pointer"
          >
            <Plus size={16} />
            Nova Nota
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

              <div className="flex flex-col gap-1">
                {isLoading ? (
                  <Spinner />
                ) : pastas.length > 0 ? pastas.map((pasta) => (
                  <button
                    key={pasta.id}
                    className={`flex flex-row items-center text-sm text-[var(--text)] ${navegacao === pasta.name ? "bg-(--primary)/20" : ""} gap-2 p-2 rounded-lg`}
                    onClick={() => setNavegacao(pasta.name)}
                  >
                    <Folder size={16} />
                    {pasta.name}
                  </button>
                )) : (<p className="text-sm text-[var(--text-secundary)]">Nenhuma pasta encontrada</p>)}
              </div>
            </div>
          </Card>
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
            <button
              className="bg-(--primary) text-white p-2 rounded-lg hover:bg-(--primary)/80 transition-colors"
              onClick={() => createFolder(nomePasta)}
            >
              Criar Pasta
            </button>
            <button className="bg-(--surface-four) text-[var(--text)] p-2 rounded-lg hover:bg-(--surface-four)/80 transition-colors" onClick={() => setModalPasta(false)}>
              Fechar Modal
            </button>
          </div>
        </Modal>

        <Modal
          isOpen={modalNota}
          onClose={() => setModalNota(false)}
        >
          <div className="flex flex-col gap-4">

            <input
              type="text"
              placeholder="Título da nota"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-(--surface-four) rounded-lg"
            />

            <textarea
              placeholder="Escreva sua nota..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full min-h-40 p-2 border border-(--surface-four) rounded-lg resize-none"
            />

            {pastas.length > 0 && (
              <select
                value={folderId ?? ""}
                onChange={(e) =>
                  setFolderId(
                    e.target.value
                      ? Number(e.target.value)
                      : undefined
                  )
                }
                className="w-full p-2 bg-(--surface) border border-(--surface-four) rounded-lg"
              >
                <option className="bg-(--surface)" value="">Sem pasta</option>

                {pastas.map((pasta) => (
                  <option className="bg-(--surface)"
                    key={pasta.id}
                    value={pasta.id}
                  >
                    {pasta.name}
                  </option>
                ))}
              </select>
            )}

            {/* fazer um botao switch para marcar a nota como favorita ou fixada */}
            <div className="flex flex-row gap-2">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFavorite}
                  onChange={(e) => setIsFavorite(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="relative w-9 h-5 bg-(--surface-four) peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-(--primary)"></div>
                <span className="select-none ms-3 text-sm font-medium text-heading">Favorita</span>
              </label>

              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="relative w-9 h-5 bg-(--surface-four) peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-(--primary)"></div>
                <span className="select-none ms-3 text-sm font-medium text-heading">Fixada</span>
              </label>
            </div>

            <button
              onClick={createNote}
              className="bg-(--primary) text-white p-2 rounded-lg"
            >
              Criar nota
            </button>

            <button
              onClick={() => setModalNota(false)}
              className="bg-(--surface-four) text-(--text) p-2 rounded-lg"
            >
              Cancelar
            </button>
          </div>
        </Modal>

        {/* div das notas */}
        <div className="md:w-3/4">
          {selectedNote ? (
            <NoteRender
              note={selectedNote}
              onBack={() => setSelectedNote(null)}
              onUpdate={updateNote}
            />
          ) : (
            <Card>
              <div className="flex flex-col gap-4">
                {isLoading ? (
                  <Spinner />
                ) : notas.length === 0 ? (
                  <p className="text-(--text-secundary)">Você não possui notas criadas.</p>
                ) : (
                  notas.map((nota) => (
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
                  ))
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
