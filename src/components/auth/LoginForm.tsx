"use client";

import { Button, TextInput, Stack, Form, InlineNotification } from "@carbon/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Preencha todos os campos.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erro ao fazer login.");
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
        <h1>Login</h1>
        {error && (
          <InlineNotification kind="error" title="Erro" subtitle={error} hideCloseButton />
        )}
        <TextInput
          id="email"
          labelText="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <TextInput
          id="password"
          labelText="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <Button type="submit" kind="primary" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>
        <Link href="/recover-password" className="link">
          Esqueceu sua senha?
        </Link>
        <Link href="/register" className="link">
          Criar conta
        </Link>
      </Stack>
    </Form>
  );
}
