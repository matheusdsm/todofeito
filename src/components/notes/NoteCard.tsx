"use client";

import { Button } from "@carbon/react";
import { Edit, Checkmark, Renew, View } from "@carbon/icons-react";
import Link from "next/link";
import { Note } from "@/types/note";

interface NoteCardProps {
  note: Note;
  onComplete?: (id: string) => void;
  onRestore?: (id: string) => void;
}

export default function NoteCard({ note, onComplete, onRestore }: NoteCardProps) {
  const isCompleted = note.status === "completed";

  return (
    <div className={`note-card ${isCompleted ? "completed" : ""}`}>
      <h3>
        <Link href={`/notes/${note.id}`} style={{ color: "inherit", textDecoration: "none" }}>
          {note.title}
        </Link>
      </h3>
      <p>{note.content.substring(0, 150)}{note.content.length > 150 ? "..." : ""}</p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "0.75rem", color: "var(--cds-text-02)" }}>
          {isCompleted ? "Concluída" : "Ativa"} •{" "}
          {new Date(note.updatedAt).toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        <div className="note-actions">
          <Link href={`/notes/${note.id}`} style={{ textDecoration: "none" }}>
            <Button
              kind="ghost"
              size="sm"
              renderIcon={View}
              iconDescription="Ver nota"
            >
              Ver
            </Button>
          </Link>
          <Link href={`/notes/${note.id}/edit`} style={{ textDecoration: "none" }}>
            <Button
              kind="ghost"
              size="sm"
              renderIcon={Edit}
              iconDescription="Editar nota"
            >
              Editar
            </Button>
          </Link>
          {isCompleted ? (
            <Button
              kind="ghost"
              size="sm"
              renderIcon={Renew}
              onClick={() => onRestore?.(note.id)}
              iconDescription="Restaurar nota"
            >
              Restaurar
            </Button>
          ) : (
            <Button
              kind="ghost"
              size="sm"
              renderIcon={Checkmark}
              onClick={() => onComplete?.(note.id)}
              iconDescription="Concluir nota"
            >
              Concluir
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
