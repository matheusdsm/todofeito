"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, InlineNotification } from "@carbon/react";
import { Add, Login } from "@carbon/icons-react";
import Link from "next/link";
import NoteList from "@/components/notes/NoteList";

interface Note {
  id: string;
  title: string;
  content: string;
  status: "active" | "completed";
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export default function NotesPage() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [notAuthenticated, setNotAuthenticated] = useState(false);

  const fetchNotes = async () => {
    try {
      const res = await fetch("/api/notes", { credentials: "include" });
      if (res.status === 401) {
        setNotAuthenticated(true);
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setNotes(data);
      }
    } catch (err) {
      console.error("Erro ao buscar notas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleComplete = async (id: string) => {
    try {
      const res = await fetch(`/api/notes/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "completed" }),
      });
      if (res.ok) fetchNotes();
    } catch (err) {
      console.error("Erro ao concluir nota:", err);
    }
  };

  const handleRestore = async (id: string) => {
    try {
      const res = await fetch(`/api/notes/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "active" }),
      });
      if (res.ok) fetchNotes();
    } catch (err) {
      console.error("Erro ao restaurar nota:", err);
    }
  };

  if (loading) {
    return <p style={{ padding: "var(--cds-spacing-07)" }}>Carregando notas...</p>;
  }

  if (notAuthenticated) {
    return (
      <div>
        <InlineNotification
          kind="info"
          title="Autenticação necessária"
          subtitle="Faça login para visualizar suas notas."
          hideCloseButton
          style={{ marginBottom: "var(--cds-spacing-05)" }}
        />
        <Link href="/login" style={{ textDecoration: "none" }}>
          <Button kind="primary" renderIcon={Login}>
            Fazer Login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Minhas Notas</h1>
        <Link href="/notes/new" style={{ textDecoration: "none" }}>
          <Button kind="primary" renderIcon={Add}>
            Nova Nota
          </Button>
        </Link>
      </div>
      <NoteList
        notes={notes.map((n) => ({ ...n, createdAt: new Date(n.createdAt), updatedAt: new Date(n.updatedAt) }))}
        onComplete={handleComplete}
        onRestore={handleRestore}
      />
    </div>
  );
}
