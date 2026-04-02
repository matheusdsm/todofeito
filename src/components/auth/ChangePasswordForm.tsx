"use client";

import { Button, TextInput, Stack, Form, InlineNotification } from "@carbon/react";
import { useState } from "react";
import Link from "next/link";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Preencha todos os campos.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    if (newPassword.length < 8) {
      setError("A nova senha deve ter pelo menos 8 caracteres.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erro ao alterar senha.");
        return;
      }
      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setError("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={5}>
        <h1>Alterar Senha</h1>
        {error && (
          <InlineNotification kind="error" title="Erro" subtitle={error} hideCloseButton />
        )}
        {success && (
          <InlineNotification
            kind="success"
            title="Sucesso"
            subtitle="Senha alterada com sucesso."
            hideCloseButton
          />
        )}
        <TextInput
          id="currentPassword"
          labelText="Senha Atual"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <TextInput
          id="newPassword"
          labelText="Nova Senha"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          autoComplete="new-password"
          helperText="Mínimo de 8 caracteres"
        />
        <TextInput
          id="confirmPassword"
          labelText="Confirmar Nova Senha"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
        <Button type="submit" kind="primary" disabled={loading}>
          {loading ? "Alterando..." : "Alterar Senha"}
        </Button>
        <Link href="/notes" className="link">
          Voltar às notas
        </Link>
      </Stack>
    </Form>
  );
}
