"use client";

import { Button, TextInput, Stack, Form, InlineNotification } from "@carbon/react";
import { useState } from "react";
import Link from "next/link";

export default function RecoverPasswordForm() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (!email) {
      setError("Informe seu e-mail.");
      return;
    }
    setLoading(true);
    // TODO: Implement password recovery with email service
    await new Promise((r) => setTimeout(r, 1000));
    setSuccess(true);
    setLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={5}>
        <h1>Recuperar Senha</h1>
        {error && (
          <InlineNotification kind="error" title="Erro" subtitle={error} hideCloseButton />
        )}
        {success && (
          <InlineNotification
            kind="success"
            title="Sucesso"
            subtitle="Um link de recuperação foi enviado para seu e-mail."
            hideCloseButton
          />
        )}
        <TextInput
          id="email"
          labelText="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          helperText="Informe o e-mail cadastrado para receber o link de recuperação"
        />
        <Button type="submit" kind="primary" disabled={loading}>
          {loading ? "Enviando..." : "Enviar Link de Recuperação"}
        </Button>
        <Link href="/login" className="link">
          Voltar ao login
        </Link>
      </Stack>
    </Form>
  );
}
