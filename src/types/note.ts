export interface Note {
    id: number;
    title: string; 
    content: string;
    folder_id?: number;
    is_favorite?: boolean;
    is_pinned?: boolean;
}

export interface CreateNoteData {
    title: string;
    content: string;
    folder_id?: number;
    is_favorite?: boolean;
    is_pinned?: boolean;
}

export interface UpdateNoteData {
    title?: string;
    content?: string;
    folder_id?: number;
    is_favorite?: boolean;
    is_pinned?: boolean;
}