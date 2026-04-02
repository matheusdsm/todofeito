export interface Note {
  id: string;
  title: string;
  content: string;
  status: "active" | "completed";
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export type NoteFormData = Pick<Note, "title" | "content">;
