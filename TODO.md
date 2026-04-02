# 📋 TODO Tracker: TODOFEITO

> Baseado no `TODOFEITO_DIAGRAMA_CSV.csv` | Design System: IBM Carbon

---

## ✅ Completed

- [x] **Project Setup** — Next.js 15 + TypeScript + Carbon Design System
- [x] **RNF-01** — Senhas criptografadas (bcrypt)
- [x] **RNF-03** — Portabilidade (export CSV, JSON, PDF)
- [x] **RNF-04** — Redirects com middleware real
- [x] **Carbon Design** — Tokens, IBM Plex Sans, grid 8px, cores
- [x] **Layout** — Header + SideNav com navegação
- [x] **Acessibilidade** — Aria-labels, lang pt-BR, contraste, navegação teclado
- [x] **Backend** — API Routes com Prisma + PostgreSQL (Supabase)
- [x] **Auth** — JWT sessions + bcrypt
- [x] **Deploy Ready** — Configurado para Vercel + Supabase

---

## 📝 Requirements Checklist

### Autenticação & Conta
- [x] **RF-05** — Criar conta ✅
- [x] **RF-06** — Editar senha ✅
- [x] **RF-07** — Recuperar senha ✅

### Gestão de Notas
- [x] **RF-01** — Criar nota ✅
- [x] **RF-02** — Editar nota ✅
- [x] **RF-03** — Concluir nota ✅
- [x] **RF-04** — Restaurar nota ✅

### Histórico & Logs
- [x] **RF-08** — Acessar histórico Cliente ✅
- [x] **RF-09** — Baixar histórico Cliente (CSV/PDF/JSON) ✅
- [x] **RF-10** — Acessar histórico Admin ✅
- [x] **RF-11** — Baixar histórico Admin ✅

### Infraestrutura
- [x] **RNF-02** — Preparado para deploy (Vercel + Supabase) ✅

---

## 🔧 Deploy

1. **Supabase** — Criar projeto PostgreSQL
2. **Vercel** — Importar repo, configurar env vars
3. **Deploy** — npm run build + npm run db:push

Ver [docs/DEPLOY.md](docs/DEPLOY.md)

---

## 📦 Project Structure

```
TODOFEITO/
├── package.json
├── tsconfig.json
├── next.config.ts
├── .gitignore
├── .env.example
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
└── src/
    ├── app/
    │   ├── api/                  # API Routes
    │   ├── (app)/                # Páginas autenticadas
    │   ├── login/
    │   ├── register/
    │   └── recover-password/
    ├── components/
    │   ├── layout/               # Header, SideNav, MainLayout
    │   ├── notes/                # NoteEditor, NoteCard, NoteList
    │   ├── auth/                 # Forms de autenticação
    │   └── history/              # HistoryTable, ExportButton
    ├── lib/                      # auth, prisma, session, export
    └── types/                    # TypeScript definitions
```

---

## 🚀 Quick Start

```bash
git clone https://github.com/[SEU-USUARIO]/TODOFEITO.git
cd TODOFEITO
cp .env.example .env
npm install
npm run db:generate
npm run db:push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)
