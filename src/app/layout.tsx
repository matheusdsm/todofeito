import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: {
    default: "TODOFEITO - Sistema de Gestão de Notas e Tarefas",
    template: "%s | TODOFEITO",
  },
  description: "Organize suas notas e tarefas de forma eficiente. Sistema completo para gestão de tarefas com histórico e administração.",
  keywords: ["notas", "tarefas", "gestão", "organização", "to-do", "prodividade"],
  authors: [{ name: "TODOFEITO" }],
  openGraph: {
    title: "TODOFEITO",
    description: "Sistema de gestão de notas e tarefas",
    url: "https://todofeito.com",
    siteName: "TODOFEITO",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
