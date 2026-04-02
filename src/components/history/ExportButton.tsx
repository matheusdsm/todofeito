"use client";

import { Button } from "@carbon/react";
import { Download } from "@carbon/icons-react";
import { exportToCSV, exportToJSON, exportToPDF } from "@/lib/export";

interface HistoryEntry {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  userId: string;
  timestamp: string | Date;
  details?: string;
}

interface ExportButtonProps {
  data: HistoryEntry[];
  filename: string;
}

export default function ExportButton({ data, filename }: ExportButtonProps) {
  return (
    <div style={{ display: "flex", gap: "var(--cds-spacing-04)" }}>
      <Button
        kind="secondary"
        size="sm"
        renderIcon={Download}
        onClick={() => exportToCSV(data, filename)}
      >
        CSV
      </Button>
      <Button
        kind="secondary"
        size="sm"
        renderIcon={Download}
        onClick={() => exportToJSON(data, filename)}
      >
        JSON
      </Button>
      <Button
        kind="secondary"
        size="sm"
        renderIcon={Download}
        onClick={() => exportToPDF(data, filename)}
      >
        PDF
      </Button>
    </div>
  );
}
