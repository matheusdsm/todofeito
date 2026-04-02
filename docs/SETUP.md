# Configuração do Ambiente Local

Este guia ensina como configurar o ambiente de desenvolvimento do TODOFEITO na sua máquina local.

## Pré-requisitos

| Software | Versão Mínima | Link |
|----------|---------------|------|
| Node.js | 18.x ou superior | [nodejs.org](https://nodejs.org) |
| npm | 9.x ou superior | (já vem com Node.js) |
| Git | 2.x ou superior | [git-scm.com](https://git-scm.com) |

## Passo a Passo

### 1. Clonar o Repositório

```bash
git clone https://github.com/[SEU-USUARIO]/TODOFEITO.git
cd TODOFEITO
```

### 2. Criar arquivo de variáveis de ambiente

```bash
cp .env.example .env
```

### 3. Configurar o arquivo `.env`

Edite o arquivo `.env` com suas credenciais:

```env
# Database (Supabase PostgreSQL)
DATABASE_URL="postgresql://postgres:[SUA-SENHA]@db.[SEU-PROJETO].supabase.co:5432/postgres"

# Auth (JWT Secret)
# Gere com: openssl rand -base64 32
JWT_SECRET="[SUA-STRING-SECRETA]"
NODE_ENV=development
```

**Como obter DATABASE_URL:**
1. Acesse [supabase.com](https://supabase.com)
2. Vá para Settings → Database
3. Copie a Connection String

### 4. Instalar dependências

```bash
npm install
```

### 5. Gerar cliente Prisma

```bash
npm run db:generate
```

### 6. Criar/atualizar banco de dados

```bash
npm run db:push
```

### 7. (Opcional) Seed de dados de exemplo

```bash
npm run db:seed
```

### 8. Iniciar servidor de desenvolvimento

```bash
npm run dev
```

### 9. Acessar a aplicação

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## Comandos Úteis

| Comando | Descrição |
|---------|------------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Faz build da aplicação |
| `npm run start` | Inicia servidor de produção |
| `npm run lint` | Verifica erros de lint |
| `npm run db:generate` | Gera cliente Prisma |
| `npm run db:push` | Faz push do schema para o banco |

## Solução de Problemas

### "Cannot find module '@prisma/client'"

```bash
npm install
npm run db:generate
```

### "Error connecting to database"

Verifique se:
1. O arquivo `.env` existe e está correto
2. O banco Supabase está ativo
3. A string de conexão está correta

### "Port 3000 is already in use"

```bash
# Matar processo na porta 3000 (Linux/Mac)
kill $(lsof -t -i:3000)

# Ou usar outra porta
npm run dev -- -p 3001
```

## Estrutura do Projeto

```
TODOFEITO/
├── src/
│   ├── app/           # Next.js App Router
│   ├── components/    # Componentes React
│   ├── lib/          # Utilitários (auth, prisma)
│   └── types/        # TypeScript definitions
├── prisma/
│   ├── schema.prisma # Schema do banco
│   └── seed.ts       # Dados de exemplo
├── docs/             # Documentação
└── .env.example      # Template de variáveis
```

## Próximos Passos

- Configure o ambiente de produção: [DEPLOY.md](DEPLOY.md)
- Entenda as variáveis de ambiente: [ENV_EXAMPLE.md](ENV_EXAMPLE.md)