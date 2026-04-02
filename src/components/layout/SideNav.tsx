"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Document, RecentlyViewed, Settings, Add, User } from "@carbon/icons-react";
import { useState, useEffect } from "react";

const navItems = [
  { href: "/notes", icon: Document, label: "Notas" },
  { href: "/notes/new", icon: Add, label: "Nova Nota" },
  { href: "/history", icon: RecentlyViewed, label: "Histórico" },
];

const settingsItems = [
  { href: "/profile", label: "Meu Perfil" },
  { href: "/change-password", label: "Alterar Senha" },
  { href: "/recover-password", label: "Recuperar Senha" },
];

export default function AppSideNav() {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user && data.user.role === "admin") {
          setIsAdmin(true);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <nav className="custom-sidenav">
      <ul className="custom-sidenav-list">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/notes/new" && pathname.startsWith(item.href));
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`custom-sidenav-link ${isActive ? "active" : ""}`}
              >
                <item.icon size={20} className="custom-sidenav-icon" />
                <span className="custom-sidenav-text">{item.label}</span>
              </Link>
            </li>
          );
        })}
        <li>
          <button
            className={`custom-sidenav-link custom-sidenav-submenu ${settingsOpen ? "open" : ""}`}
            onClick={() => setSettingsOpen(!settingsOpen)}
          >
            <Settings size={20} className="custom-sidenav-icon" />
            <span className="custom-sidenav-text">Configurações</span>
            <span className="custom-sidenav-chevron">{settingsOpen ? "▾" : "▸"}</span>
          </button>
          {settingsOpen && (
            <ul className="custom-sidenav-submenu-list">
              {settingsItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`custom-sidenav-link custom-sidenav-subitem ${pathname === item.href ? "active" : ""}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
        {isAdmin && (
          <li>
            <Link
              href="/admin/history"
              className={`custom-sidenav-link ${pathname === "/admin/history" ? "active" : ""}`}
            >
              <User size={20} className="custom-sidenav-icon" />
              <span className="custom-sidenav-text">Admin</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
