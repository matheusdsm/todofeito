"use client";

import { useState } from "react";
import { Button, TextArea, TextInput, Stack, Form, InlineNotification } from "@carbon/react";
import { useRouter } from "next/navigation";

interface NoteFormData {
  id?: string;
  title: string;
  content: string;
}

export default function NoteEditor({ initialData }: { initialData?: NoteFormData }) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!title.trim()) {
      setError("O título é obrigatório.");
      return;
    }
    if (!content.trim()) {
      setError("O conteúdo é obrigatório.");
      return;
    }
    setLoading(true);
    try {
      const url = initialData?.id ? `/api/notes/${initialData.id}` : "/api/notes";
      const method = initialData?.id ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Erro ao salvar nota.");
        return;
      }
      router.push("/notes");
      router.refresh();
    } catch {
      setError("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={5}>
        <h1>{initialData?.id ? "Editar Nota" : "Nova Nota"}</h1>
        {error && (
          <InlineNotification kind="error" title="Erro" subtitle={error} hideCloseButton />
        )}
        <TextInput
          id="title"
          labelText="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Título da nota"
        />
        <TextArea
          id="content"
          labelText="Conteúdo"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={10}
          placeholder="Escreva o conteúdo da nota..."
        />
        <div style={{ display: "flex", gap: "var(--cds-spacing-04)" }}>
          <Button type="submit" kind="primary" disabled={loading}>
            {loading ? "Salvando..." : initialData?.id ? "Salvar Alterações" : "Criar Nota"}
          </Button>
          <Button kind="secondary" onClick={() => router.back()}>
            Cancelar
          </Button>
        </div>
      </Stack>
    </Form>
  );
}
