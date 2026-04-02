"use client";

import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableContainer,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  Pagination,
  Tag,
} from "@carbon/react";
import { useState } from "react";
interface HistoryEntry {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  userId: string;
  timestamp: string | Date;
  details?: string;
}
import ExportButton from "./ExportButton";

interface HistoryTableProps {
  entries: HistoryEntry[];
  title: string;
}

export default function HistoryTable({ entries, title }: HistoryTableProps) {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 10;

  const filtered = entries.filter(
    (e) =>
      e.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.entityType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.details && e.details.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const typeColors: Record<string, string> = {
    note: "blue",
    user: "purple",
    system: "gray",
  };

  return (
    <div>
      <div className="page-header">
        <h1>{title}</h1>
        <ExportButton data={entries} filename={title.toLowerCase().replace(/\s+/g, "-")} />
      </div>
      <TableContainer>
        <TableToolbar>
          <TableToolbarContent>
            <TableToolbarSearch
              placeholder="Buscar no histórico"
              onChange={(e) => {
                if (e && typeof e !== "string" && "target" in e) {
                  setSearchTerm((e as React.ChangeEvent<HTMLInputElement>).target.value);
                }
                setPage(1);
              }}
            />
          </TableToolbarContent>
        </TableToolbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Ação</TableHeader>
              <TableHeader>Tipo</TableHeader>
              <TableHeader>Detalhes</TableHeader>
              <TableHeader>Data</TableHeader>
              <TableHeader>Entidade</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} style={{ textAlign: "center", padding: "var(--cds-spacing-07)", color: "var(--cds-text-02)" }}>
                  Nenhum registro encontrado.
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.action}</TableCell>
                  <TableCell>
                    <Tag type={(typeColors[entry.entityType] as any) || "gray"}>
                      {entry.entityType}
                    </Tag>
                  </TableCell>
                  <TableCell>{entry.details || "-"}</TableCell>
                  <TableCell>{entry.timestamp instanceof Date ? entry.timestamp.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }) : new Date(entry.timestamp).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}</TableCell>
                  <TableCell>{entry.entityId}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <Pagination
          page={safePage}
          pageSize={pageSize}
          pageSizes={[10, 25, 50, 100]}
          totalItems={totalItems}
          onChange={({ page: p }) => setPage(p)}
        />
      </TableContainer>
    </div>
  );
}
