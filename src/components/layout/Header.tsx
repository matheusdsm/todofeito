"use client";

import { Header, HeaderName, HeaderGlobalBar, HeaderGlobalAction, HeaderPanel } from "@carbon/react";
import { UserAvatar, Notification, Logout, Menu, Close } from "@carbon/icons-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface HeaderProps {
  isSideNavOpen?: boolean;
  onToggleSideNav?: () => void;
  isAuthenticated?: boolean;
}

export default function AppHeader({ isSideNavOpen, onToggleSideNav, isAuthenticated }: HeaderProps) {
  const router = useRouter();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user);
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <Header aria-label="TODOFEITO" className="app-header">
      {isAuthenticated && onToggleSideNav && (
        <button
          className="header-menu-btn"
          onClick={onToggleSideNav}
          aria-label={isSideNavOpen ? "Fechar menu" : "Abrir menu"}
          type="button"
        >
          {isSideNavOpen ? <Close size={20} /> : <Menu size={20} />}
        </button>
      )}
      <HeaderName href="/" prefix="">
        TODOFEITO
      </HeaderName>
      <HeaderGlobalBar>
        <HeaderGlobalAction aria-label="Notificações">
          <Notification size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction
          aria-label="Perfil"
          onClick={() => setIsPanelOpen(!isPanelOpen)}
        >
          <UserAvatar size={20} />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
      <HeaderPanel expanded={isPanelOpen}>
        <div style={{ padding: "var(--cds-spacing-05)" }}>
          {user ? (
            <>
              <div style={{ marginBottom: "var(--cds-spacing-05)" }}>
                <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>{user.name}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--cds-text-02)" }}>{user.email}</div>
              </div>
              <Link
                href="/profile"
                onClick={() => setIsPanelOpen(false)}
                style={{
                  display: "block",
                  padding: "var(--cds-spacing-04) 0",
                  color: "var(--cds-interactive-01)",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  borderTop: "1px solid var(--cds-border-subtle)",
                }}
              >
                Meu Perfil
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--cds-spacing-04)",
                  padding: "var(--cds-spacing-04) 0",
                  border: "none",
                  background: "none",
                  color: "var(--cds-support-01)",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  width: "100%",
                  borderTop: "1px solid var(--cds-border-subtle)",
                }}
              >
                <Logout size={16} />
                Sair
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setIsPanelOpen(false)}
              style={{
                display: "block",
                padding: "var(--cds-spacing-04) 0",
                color: "var(--cds-interactive-01)",
                textDecoration: "none",
                fontSize: "0.875rem",
              }}
            >
              Fazer Login
            </Link>
          )}
        </div>
      </HeaderPanel>
    </Header>
  );
}
