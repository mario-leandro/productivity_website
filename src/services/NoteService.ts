import { sendRequest } from "@/src/lib/api";
import { Note, CreateNoteData, UpdateNoteData } from "../types/note";

export const NoteService = {
    list: async () => {
        return await sendRequest<Note[]>("/notes");
    },

    create: async (data: CreateNoteData) =>
        await sendRequest("/notes", {
            method: "POST",
            data,
        }),

    update: async (id: number, data: Partial<UpdateNoteData>) =>
        await sendRequest(`/notes/${id}`, {
            method: "PATCH",
            data,
        }),
}