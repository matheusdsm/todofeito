"use client";

import { useState } from "react";
import NoteCard from "./NoteCard";
import { Note } from "@/types/note";

interface NoteListProps {
  notes: Note[];
  onComplete?: (id: string) => void;
  onRestore?: (id: string) => void;
}

export default function NoteList({ notes, onComplete, onRestore }: NoteListProps) {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const filteredNotes = notes.filter((note) => {
    if (filter === "active") return note.status === "active";
    if (filter === "completed") return note.status === "completed";
    return true;
  });

  return (
    <div>
      <div style={{ display: "flex", gap: "var(--cds-spacing-04)", marginBottom: "var(--cds-spacing-05)" }}>
        <button
          onClick={() => setFilter("all")}
          style={{
            padding: "var(--cds-spacing-04) var(--cds-spacing-05)",
            border: filter === "all" ? "2px solid var(--cds-interactive-01)" : "1px solid var(--cds-ui-03)",
            background: filter === "all" ? "#edf5ff" : "var(--cds-ui-02)",
            borderRadius: "2px",
            cursor: "pointer",
            color: filter === "all" ? "var(--cds-interactive-01)" : "var(--cds-text-01)",
          }}
        >
          Todas
        </button>
        <button
          onClick={() => setFilter("active")}
          style={{
            padding: "var(--cds-spacing-04) var(--cds-spacing-05)",
            border: filter === "active" ? "2px solid var(--cds-interactive-01)" : "1px solid var(--cds-ui-03)",
            background: filter === "active" ? "#edf5ff" : "var(--cds-ui-02)",
            borderRadius: "2px",
            cursor: "pointer",
            color: filter === "active" ? "var(--cds-interactive-01)" : "var(--cds-text-01)",
          }}
        >
          Ativas
        </button>
        <button
          onClick={() => setFilter("completed")}
          style={{
            padding: "var(--cds-spacing-04) var(--cds-spacing-05)",
            border: filter === "completed" ? "2px solid var(--cds-support-02)" : "1px solid var(--cds-ui-03)",
            background: filter === "completed" ? "#defbe6" : "var(--cds-ui-02)",
            borderRadius: "2px",
            cursor: "pointer",
            color: filter === "completed" ? "var(--cds-support-02)" : "var(--cds-text-01)",
          }}
        >
          Concluídas
        </button>
      </div>
      {filteredNotes.length === 0 ? (
        <p style={{ color: "var(--cds-text-02)", textAlign: "center", padding: "var(--cds-spacing-07)" }}>
          Nenhuma nota encontrada.
        </p>
      ) : (
        filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onComplete={onComplete}
            onRestore={onRestore}
          />
        ))
      )}
    </div>
  );
}
