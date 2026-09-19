"use client";

import {
  ArrowLeft,
  Pencil,
  Pin,
  Star,
  Trash,
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardContent,
} from "./ui/Card";

import { useState } from "react";
import { Note } from "@/src/types/note";

type Props = {
  note: Note;
  onBack: () => void;
  onUpdate: (id: number, data: Partial<Note>) => void;
};

export function NoteRender({
  note,
  onBack,
  onUpdate,
}: Props) {
  const [editar, setEditar] = useState(false);
  const [conteudo, setConteudo] = useState(note.content);
  const [titulo, setTitulo] = useState(note.title);

  return (
    <Card className="p-6">
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-lg border border-(--surface-four) hover:bg-(--surface-three)"
          >
            <ArrowLeft size={16} />
          </button>

          {editar ? (
            <input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="text-xl font-bold bg-transparent border-b border-(--surface-four) focus:outline-none"
            />
          ) : (
            <h2 className="text-xl font-bold">
              {titulo}
            </h2>
          )}
        </div>

        <div className="flex flex-row items-center gap-2">
          <button className="p-2 rounded-lg border border-(--surface-four)">
            <Star size={16} />
          </button>

          <button className="p-2 rounded-lg border border-(--surface-four)">
            <Pin size={16} />
          </button>

          <button
            className="flex items-center text-xs gap-1 px-3 py-2 rounded-lg bg-(--primary)"
            onClick={() => {
              if (editar) {
                onUpdate(note.id, { title: titulo, content: conteudo });
              }
              setEditar(!editar);
            }}
          >
            <Pencil size={16} />

            {editar ? "Salvar" : "Editar"}
          </button>

          <button className="p-2 rounded-lg border border-(--surface-four)">
            <Trash
              className="text-red-400"
              size={16}
            />
          </button>
        </div>
      </CardHeader>

      <hr className="text-(--surface-four) my-5" />

      <CardContent>
        {editar ? (
          <textarea
            className="w-full h-[500px] rounded-xl p-3 bg-(--surface-three) border border-(--surface-four) focus:outline-none resize-none"
            value={conteudo}
            placeholder="Comece a escrever..."

            onChange={(e) =>
              setConteudo(e.target.value)
            }
          />
        ) : (
          <div className="whitespace-pre-wrap">
            {note.content}
          </div>
        )}
      </CardContent>
    </Card>
  );
}