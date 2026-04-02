interface HistoryEntry {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  userId: string;
  timestamp: string | Date;
  details?: string;
}

export function exportToCSV(data: HistoryEntry[], filename: string): void {
  const headers = ["Ação", "Tipo", "Detalhes", "Data", "Entidade"];
  const rows = data.map((e) => [
    e.action,
    e.entityType,
    e.details || "",
    new Date(e.timestamp).toISOString(),
    e.entityId,
  ]);
  const csv = [
    headers.join(","),
    ...rows.map((r) => r.map((c) => `"${c}"`).join(",")),
  ].join("\n");
  downloadFile(csv, `${filename}.csv`, "text/csv");
}

export function exportToJSON(data: HistoryEntry[], filename: string): void {
  const json = JSON.stringify(data, null, 2);
  downloadFile(json, `${filename}.json`, "application/json");
}

export function exportToPDF(data: HistoryEntry[], filename: string): void {
  const html = `
    <html>
      <head><title>${filename}</title></head>
      <body style="font-family: IBM Plex Sans, sans-serif; padding: 2rem;">
        <h1>${filename}</h1>
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #f4f4f4;">
              <th>Ação</th><th>Tipo</th><th>Entidade</th><th>Data</th><th>Detalhes</th>
            </tr>
          </thead>
          <tbody>
            ${data
              .map(
                (e) => `
              <tr>
                <td>${e.action}</td>
                <td>${e.entityType}</td>
                <td>${e.entityId}</td>
                <td>${new Date(e.timestamp).toLocaleString("pt-BR")}</td>
                <td>${e.details || "-"}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </body>
    </html>
  `;
  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
  }
}

function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
