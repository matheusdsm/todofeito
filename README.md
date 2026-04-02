# TODOFEITO

Sistema de gestão de notas com histórico completo, desenvolvido com Next.js 15, TypeScript e IBM Carbon Design System.

## 🚀 Tech Stack

| Tecnologia | Descrição |
|------------|-----------|
| **Next.js 15** | Framework React com App Router |
| **TypeScript** | Tipagem estática |
| **IBM Carbon** | Design System (UI components) |
| **Prisma** | ORM para banco de dados |
| **PostgreSQL** | Banco de dados (Supabase) |
| **JWT** | Autenticação via tokens |

## 📋 Funcionalidades

- ✅ Criar, editar e excluir notas
- ✅ Marcar notas como concluídas/restauradas
- ✅ Histórico de ações por usuário
- ✅ Exportar dados (CSV, JSON, PDF)
- ✅ Autenticação JWT segura
- ✅ Design responsivo (IBM Carbon)
- ✅ Acessibilidade (WCAG 2.1 AA)

## 🛠️ Setup Local

```bash
# 1. Clonar o repositório
git clone https://github.com/[SEU-USUARIO]/TODOFEITO.git
cd TODOFEITO

# 2. Criar arquivo de variáveis
cp .env.example .env

# 3. Instalar dependências
npm install

# 4. Configurar banco de dados
npm run db:generate
npm run db:push

# 5. Iniciar desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 📚 Documentação

| Arquivo | Descrição |
|---------|-----------|
| [docs/SETUP.md](docs/SETUP.md) | Configuração do ambiente local |
| [docs/DEPLOY.md](docs/DEPLOY.md) | Deploy (Vercel + Supabase) |
| [docs/ENV_EXAMPLE.md](docs/ENV_EXAMPLE.md) | Variáveis de ambiente |

## 🖥️ Deploy

### Stack de Produção

| Serviço | Função |
|---------|--------|
| **Vercel** | Frontend + API (Next.js) |
| **Supabase** | PostgreSQL Database |

Consulte [docs/DEPLOY.md](docs/DEPLOY.md) para instruções detalhadas.

## 📁 Estrutura do Projeto

```
TODOFEITO/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/         # API Routes
│   │   ├── (app)/       # Páginas autenticadas
│   │   ├── login/       # Página de login
│   │   ├── register/    # Página de registro
│   │   └── recover-password/
│   ├── components/      # Componentes React
│   │   ├── auth/        # Componentes de autenticação
│   │   ├── history/     # Histórico e exportação
│   │   ├── layout/      # Header, SideNav
│   │   └── notes/       # Componentes de notas
│   ├── lib/             # Utilitários
│   │   ├── auth.ts      # Hash de senhas
│   │   ├── prisma.ts    # Cliente Prisma
│   │   ├── session.ts   # Gestão de sessões JWT
│   │   └── export.ts    # Exportação de dados
│   └── types/           # Definições TypeScript
├── prisma/
│   ├── schema.prisma    # Schema do banco
│   └── seed.ts          # Dados de exemplo
├── docs/                # Documentação
├── .env.example         # Template de variáveis
├── package.json
└── README.md
```

## 🔧 Scripts Disponíveis

| Comando | Descrição |
|---------|------------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Servidor de produção |
| `npm run lint` | Verificar lint |
| `npm run db:generate` | Gerar cliente Prisma |
| `npm run db:push` | Atualizar schema do banco |
| `npm run db:seed` | Popular banco com dados de exemplo |

## 📝 Requirements

- Node.js 18.x ou superior
- npm 9.x ou superior

## 📄 Licença

ISC

---

Para dúvidas ou contribuições, abra uma issue no GitHub.