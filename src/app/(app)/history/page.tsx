"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { InlineNotification, Button } from "@carbon/react";
import { Login } from "@carbon/icons-react";
import HistoryTable from "@/components/history/HistoryTable";
import Link from "next/link";

interface HistoryEntry {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  userId: string;
  timestamp: string | Date;
  details?: string;
}

export default function HistoryPage() {
  const router = useRouter();
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notAuthenticated, setNotAuthenticated] = useState(false);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch("/api/history", { credentials: "include" });

        if (res.status === 401) {
          setNotAuthenticated(true);
          setLoading(false);
          return;
        }
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || "Erro ao carregar histórico.");
          setLoading(false);
          return;
        }
        const data = await res.json();
        setEntries(data.entries || []);
      } catch {
        setError("Erro de conexão.");
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  if (loading) return <p style={{ padding: "var(--cds-spacing-07)" }}>Carregando histórico...</p>;
  if (notAuthenticated) {
    return (
      <div>
        <InlineNotification
          kind="info"
          title="Autenticação necessária"
          subtitle="Faça login para visualizar seu histórico."
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
  if (error) return <p style={{ padding: "var(--cds-spacing-07)", color: "var(--cds-support-01)" }}>{error}</p>;

  return (
    <div className="page-container">
      <HistoryTable
        entries={entries}
        title="Meu Histórico"
      />
    </div>
  );
}
