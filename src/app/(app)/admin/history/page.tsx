"use client";

import { useEffect, useState } from "react";
import HistoryTable from "@/components/history/HistoryTable";

interface HistoryEntry {
  id: string;
  action: string;
  entityType: "note" | "user" | "system";
  entityId: string;
  userId: string;
  timestamp: string;
  details?: string;
}

export default function AdminHistoryPage() {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch("/api/history?admin=true");
        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            window.location.href = "/login";
            return;
          }
          setError("Acesso negado. Apenas administradores.");
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
  if (error) return <p style={{ padding: "var(--cds-spacing-07)", color: "var(--cds-support-01)" }}>{error}</p>;

  return (
    <div className="page-container">
      <HistoryTable
        entries={entries}
        title="Histórico do Sistema (Admin)"
      />
    </div>
  );
}
