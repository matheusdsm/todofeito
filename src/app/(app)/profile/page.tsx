"use client";

import { useEffect, useState } from "react";
import { Button, InlineNotification, Tag } from "@carbon/react";
import { Logout, Edit, Download, RecentlyViewed } from "@carbon/icons-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  name: string;
  email: string;
  role: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState("");
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (res.status === 401) {
          setRedirecting(true);
          router.push("/login");
          return;
        }
        if (!res.ok) {
          setError("Erro ao carregar perfil.");
          setLoading(false);
          return;
        }
        const data = await res.json();
        setUser(data.user);
      } catch {
        setError("Erro de conexão.");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch {
      setError("Erro ao sair.");
    } finally {
      setLoggingOut(false);
    }
  };

  if (loading || redirecting) return <p style={{ padding: "var(--cds-spacing-07)" }}>Carregando perfil...</p>;
  if (!user) return null;

  const initials = (user.name || "U").split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="profile-page">
      {error && (
        <InlineNotification kind="error" title="Erro" subtitle={error} hideCloseButton style={{ marginBottom: "var(--cds-spacing-05)" }} />
      )}

      <div className="profile-header">
        <div className="avatar">{initials}</div>
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <Tag type={user.role === "admin" ? "red" : "blue"} style={{ marginTop: "var(--cds-spacing-04)" }}>
            {user.role === "admin" ? "Administrador" : "Cliente"}
          </Tag>
        </div>
      </div>

      <div className="profile-section">
        <h3>Informações da Conta</h3>
        <div style={{ display: "grid", gap: "var(--cds-spacing-05)" }}>
          <div>
            <label style={{ fontSize: "0.75rem", color: "var(--cds-text-02)" }}>Nome</label>
            <p style={{ margin: "var(--cds-spacing-02) 0 0", fontWeight: 500 }}>{user.name}</p>
          </div>
          <div>
            <label style={{ fontSize: "0.75rem", color: "var(--cds-text-02)" }}>E-mail</label>
            <p style={{ margin: "var(--cds-spacing-02) 0 0", fontWeight: 500 }}>{user.email}</p>
          </div>
          <div>
            <label style={{ fontSize: "0.75rem", color: "var(--cds-text-02)" }}>Tipo de Conta</label>
            <p style={{ margin: "var(--cds-spacing-02) 0 0", fontWeight: 500 }}>
              {user.role === "admin" ? "Administrador" : "Cliente"}
            </p>
          </div>
        </div>
      </div>

      <div className="profile-section">
        <h3>Ações</h3>
        <div className="profile-actions">
          <Link href="/change-password" style={{ textDecoration: "none" }}>
            <Button kind="secondary" renderIcon={Edit}>
              Alterar Senha
            </Button>
          </Link>
          <Link href="/history" style={{ textDecoration: "none" }}>
            <Button kind="tertiary" renderIcon={Download}>
              Baixar Histórico
            </Button>
          </Link>
          <Link href="/history" style={{ textDecoration: "none" }}>
            <Button kind="ghost" renderIcon={RecentlyViewed}>
              Ver Histórico
            </Button>
          </Link>
          <Button kind="danger--ghost" renderIcon={Logout} onClick={handleLogout} disabled={loggingOut}>
            {loggingOut ? "Saindo..." : "Sair da Conta"}
          </Button>
        </div>
      </div>
    </div>
  );
}
