"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, InlineNotification } from "@carbon/react";
import { ArrowLeft, Login } from "@carbon/icons-react";
import NoteEditor from "@/components/notes/NoteEditor";
import Link from "next/link";

interface Note {
  id: string;
  title: string;
  content: string;
}

export default function EditNotePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notAuthenticated, setNotAuthenticated] = useState(false);

  useEffect(() => {
    async function fetchNote() {
      try {
        const res = await fetch(`/api/notes/${id}`, { credentials: "include" });
        if (res.status === 401) {
          setNotAuthenticated(true);
          setLoading(false);
          return;
        }
        if (!res.ok) {
          setError("Nota não encontrada.");
          setLoading(false);
          return;
        }
        const data = await res.json();
        setNote(data);
      } catch {
        setError("Erro de conexão.");
      } finally {
        setLoading(false);
      }
    }
    fetchNote();
  }, [id]);

  if (loading) return <p style={{ padding: "var(--cds-spacing-07)" }}>Carregando...</p>;

  if (notAuthenticated) {
    return (
      <div>
        <InlineNotification
          kind="info"
          title="Autenticação necessária"
          subtitle="Faça login para editar esta nota."
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

  if (error) {
    return (
      <div>
        <InlineNotification kind="error" title="Erro" subtitle={error} hideCloseButton />
        <Button kind="ghost" renderIcon={ArrowLeft} onClick={() => router.push("/notes")} style={{ marginTop: "var(--cds-spacing-05)" }}>
          Voltar às notas
        </Button>
      </div>
    );
  }

  if (!note) return null;

  return (
    <div className="page-container">
      <div className="note-editor">
        <NoteEditor initialData={note} />
      </div>
    </div>
  );
}
