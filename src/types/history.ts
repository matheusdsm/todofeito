export interface HistoryEntry {
  id: string;
  action: string;
  entityType: "note" | "user" | "system";
  entityId: string;
  userId: string;
  timestamp: Date;
  details?: string;
}

export type ExportFormat = "csv" | "pdf" | "json";
