"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Tag, InlineNotification } from "@carbon/react";
import { Edit, ArrowLeft, Checkmark, Renew, Login } from "@carbon/icons-react";
import Link from "next/link";

interface Note {
  id: string;
  title: string;
  content: string;
  status: "active" | "completed";
  createdAt: string;
  updatedAt: string;
}

export default function NoteViewPage() {
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
        const res = await fetch("/api/notes/" + id, { credentials: "include" });
        if (res.status === 401) {
          setNotAuthenticated(true);
          setLoading(false);
          return;
        }
        if (res.status === 404) {
          setError("Nota não encontrada.");
          setLoading(false);
          return;
        }
        if (!res.ok) {
          setError("Erro ao carregar nota.");
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

  const handleStatusChange = async (newStatus: "active" | "completed") => {
    try {
      const res = await fetch("/api/notes/" + id + "/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const updated = await res.json();
        setNote(updated);
      }
    } catch (err) {
      console.error("Erro ao alterar status:", err);
    }
  };

  if (loading) return <p style={{ padding: "var(--cds-spacing-07)" }}>Carregando nota...</p>;

  if (notAuthenticated) {
    return (
      <div>
        <InlineNotification
          kind="info"
          title="Autenticação necessária"
          subtitle="Faça login para visualizar esta nota."
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
    <div style={{ maxWidth: "48rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--cds-spacing-05)", marginBottom: "var(--cds-spacing-06)" }}>
        <Button kind="ghost" size="sm" renderIcon={ArrowLeft} onClick={() => router.push("/notes")}>
          Voltar
        </Button>
        <Tag type={note.status === "completed" ? "green" : "blue"}>
          {note.status === "completed" ? "Concluída" : "Ativa"}
        </Tag>
      </div>

      <h1 style={{ fontSize: "var(--cds-font-size-heading-04)", fontWeight: "var(--cds-font-weight-regular)", margin: "0 0 var(--cds-spacing-04)" }}>{note.title}</h1>

      <div style={{ fontSize: "0.75rem", color: "var(--cds-text-02)", marginBottom: "var(--cds-spacing-07)" }}>
        Criada em {new Date(note.createdAt).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })} •{" "}
        Atualizada em {new Date(note.updatedAt).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}
      </div>

      <div
        style={{
          padding: "var(--cds-spacing-06)",
          background: "var(--cds-ui-02)",
          borderRadius: "2px",
          whiteSpace: "pre-wrap",
          lineHeight: 1.6,
          marginBottom: "var(--cds-spacing-07)",
        }}
      >
        {note.content}
      </div>

      <div style={{ display: "flex", gap: "var(--cds-spacing-04)", flexWrap: "wrap" }}>
        <Link href={"/notes/" + id + "/edit"} style={{ textDecoration: "none" }}>
          <Button kind="secondary" renderIcon={Edit}>
            Editar Nota
          </Button>
        </Link>
        {note.status === "active" ? (
          <Button kind="primary" renderIcon={Checkmark} onClick={() => handleStatusChange("completed")}>
            Concluir Nota
          </Button>
        ) : (
          <Button kind="tertiary" renderIcon={Renew} onClick={() => handleStatusChange("active")}>
            Restaurar Nota
          </Button>
        )}
      </div>
    </div>
  );
}
