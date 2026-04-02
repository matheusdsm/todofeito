import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "var(--cds-spacing-09) var(--cds-spacing-07)" }}>
      <h1 style={{ fontSize: "3rem", margin: 0 }}>404</h1>
      <p style={{ color: "var(--cds-text-02)", marginBottom: "var(--cds-spacing-07)" }}>
        Página não encontrada.
      </p>
      <Link href="/notes" style={{ textDecoration: "none" }}>
        <span style={{
          display: "inline-block",
          padding: "var(--cds-spacing-04) var(--cds-spacing-05)",
          background: "var(--cds-interactive-01)",
          color: "#fff",
          borderRadius: "2px",
          fontWeight: 500,
          fontSize: "0.875rem",
        }}>
          Voltar às notas
        </span>
      </Link>
    </div>
  );
}
