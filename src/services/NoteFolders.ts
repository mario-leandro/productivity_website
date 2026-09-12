import { sendRequest } from "@/src/lib/api";

export const NoteFoldersService = {
    listFolders: async () => {
        return await sendRequest("/notes/folders");
    },

    createFolder: async (data: { name: string }) =>
        await sendRequest("/notes/folders", {
            method: "POST",
            data,
        }),

    updateFolder: async (id: number, data: { name: string }) =>
        await sendRequest(`/notes/folders/${id}`, {
            method: "PATCH",
            data,
        }),
    
    deleteFolder: async (id: number) =>
        await sendRequest(`/notes/folders/${id}`, {
            method: "DELETE",
        }),
};