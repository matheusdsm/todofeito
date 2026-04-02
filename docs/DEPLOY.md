# Deploy - Vercel + Supabase

Este guia ensina como fazer o deploy da aplicação TODOFEITO para produção.

## Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                     ARQUITETURA FINAL                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌──────────────┐         ┌──────────────┐                │
│   │   Vercel    │────────▶│  Supabase    │                │
│   │ Front + API │         │ PostgreSQL   │                │
│   └──────────────┘         └──────────────┘                │
│         │                                                   │
│   https://todofeito.vercel.app                             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Pré-requisitos

| Serviço | Conta Necessária |
|---------|------------------|
| Vercel | [vercel.com](https://vercel.com) |
| Supabase | [supabase.com](https://supabase.com) |
| GitHub | Repo do projeto |

---

## FASE 1: Supabase (Banco de Dados)

### 1.1. Criar Projeto Supabase

1. Acesse [supabase.com](https://supabase.com) e faça login
2. Clique em **"New Project"**
3. Preencha:
   - **Name**: `todofeito`
   - **Database Password**: Crie uma senha forte (guarde!)
   - **Region**: `São Paulo` (mais próximo)
4. Clique em **"Create new project"**
5. Aguarde ~2 minutos para o banco ser criado

### 1.2. Obter Connection String

1. No painel do Supabase, vá para **Settings** (ícone de engrenagem)
2. Clique em **Database**
3. Na seção **Connection string**, marque **"Use connection string"**
4. Copie a string (formato: `postgresql://postgres:[SENHA]@db.xxx.supabase.co:5432/postgres`)

### 1.3. Configurar Variáveis

A string será usada na configuração do Vercel (FASE 3).

---

## FASE 2: GitHub

### 2.1. Criar Repositório

1. Acesse [github.com](https://github.com) e faça login
2. Clique em **"New repository"**
3. Preencha:
   - **Repository name**: `TODOFEITO`
   - **Description**: "Sistema de gestão de notas"
   - **Visibility**: Public ou Private (sua escolha)
4. Clique em **"Create repository"**

### 2.2. Preparar e Enviar Código

Na raiz do projeto (`D:\Sistemas\Nova Era\rascunho\todo-notas`):

```bash
# 1. Inicializar git (se ainda não iniciado)
git init

# 2. Adicionar origin
git remote add origin https://github.com/[SEU-USUARIO]/TODOFEITO.git

# 3. Adicionar todos os arquivos
git add .

# 4. Criar commit inicial
git commit -m "Initial commit - TODOFEITO v1.0.0"

# 5. Enviar para GitHub
git branch -M main
git push -u origin main
```

---

## FASE 3: Vercel (Frontend + Backend)

### 3.1. Importar Projeto

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em **"Add New..."** → **"Project"**
3. Na lista de repositórios, selecione **TODOFEITO**
4. Clique em **"Import"**

### 3.2. Configurar Projeto

Na tela de configuração:

| Campo | Valor |
|-------|-------|
| Framework Preset | `Next.js` |
| Root Directory | `todo-notas` (ou deixe em branco se o projeto estiver na raiz) |
| Build Command | `npm run build` (ou deixe automático) |
| Output Directory | `.next` (ou deixe automático) |

### 3.3. Variáveis de Ambiente

Clique em **"Environment Variables"** e adicione:

```env
# Database (da FASE 1 - Supabase)
DATABASE_URL=postgresql://postgres:[SUA-SENHA]@db.[SEU-PROJETO].supabase.co:5432/postgres

# Auth (JWT Secret - gere uma nova string!)
# Comando: openssl rand -base64 32
JWT_SECRET=[GERE-UMA-STRING-ALEATORIA-DE-32-CARACTERES]

# Environment
NODE_ENV=production
```

### 3.4. Deploy

1. Clique em **"Deploy"**
2. Aguarde ~3-5 minutos
3. Quando finalizar, você verá uma URL como: `https://todofeito-xxx.vercel.app`

### 3.5. Configurar Banco

Após o deploy, você precisa criar as tabelas no banco:

1. No painel do Vercel, vá para **Functions** → **Dashboard**
2. Clique na função (se houver) ou use a CLI:

```bash
# Usando Vercel CLI (opcional)
vercel env pull production
npm run db:push
```

**Alternativamente**, você pode:
1. Abrir o Vercel Dashboard → seu projeto → **Storage**
2. Conectar ao Supabase e executar o migration manualmente

---

## FASE 4: Configuração Final

### 4.1. Testar a Aplicação

1. Acesse a URL do Vercel
2. Você deve ver a página de Login
3. Tente criar uma conta ou fazer login

### 4.2. Verificar Funcionamento

| Funcionalidade | Teste |
|----------------|-------|
| Login | Crie uma conta e faça login |
| Criar Nota | Adicione uma nova nota |
| Editar Nota | Modifique uma nota existente |
| Concluir Nota | Marque como concluída |
| Histórico | Acesse a página de histórico |
| Exportar | Baixe dados em CSV/JSON |

---

## Troubleshooting

### "Prisma: table does not exist"

Execute o migration:
```bash
npx prisma db push
```

### "Error: connect ECONNREFUSED"

Verifique:
1. Supabase está ativo?
2. DATABASE_URL está correta?
3. IP está liberado nas configurações do Supabase (Settings → Database → Network)

### "Next.js API returns 500"

Verifique os logs no Vercel Dashboard → Functions → Logs

### "JWT Secret inválido"

Gere uma nova chave:
```bash
openssl rand -base64 32
```

---

## Custom Domain (Opcional)

Para usar um domínio próprio:

1. No Vercel Dashboard → **Settings** → **Domains**
2. Adicione seu domínio (ex: `todofeito.com`)
3. Configure o DNS conforme instruções do Vercel

---

## Manutenção

| Tarefa | Frequência |
|--------|------------|
| Atualizar dependências | Mensal |
| Verificar logs de erro | Semanal |
| Backup do banco | (Supabase faz automaticamente) |
| Atualizar Node.js | Quando necessário |

---

## Próximos Passos

- Para desenvolvimento local: [SETUP.md](SETUP.md)
- Para entender as variáveis: [ENV_EXAMPLE.md](ENV_EXAMPLE.md)