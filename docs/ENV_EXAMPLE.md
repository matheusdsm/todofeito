# Variáveis de Ambiente

Este documento explica cada variável de ambiente usada no projeto TODOFEITO.

## Arquivos de Ambiente

| Arquivo | Descrição |
|---------|-----------|
| `.env` | Variables reais (NUNCA commitar) |
| `.env.example` | Template com exemplos (PODE commitar) |

---

## Variáveis Obrigatórias

### DATABASE_URL

```
postgresql://postgres:[SENHA]@db.[PROJETO].supabase.co:5432/postgres
```

| Propriedade | Descrição |
|-------------|-----------|
| Tipo | String de conexão PostgreSQL |
| Obrigatório | Sim |
| Onde obter | Supabase → Settings → Database → Connection string |

**Exemplo completo:**
```env
DATABASE_URL="postgresql://postgres:MinhaSenhaForte123@db.abc123.supabase.co:5432/postgres"
```

**Nota:** Substitua `[SENHA]` pela senha que você definiu ao criar o projeto Supabase.

---

### JWT_SECRET

```
[STRING ALEATÓRIA DE 32 CARACTERES]
```

| Propriedade | Descrição |
|-------------|-----------|
| Tipo | String aleatória |
| Obrigatório | Sim |
| Comprimento mínimo | 32 caracteres |
| Usado para | Assinar tokens de sessão JWT |

**Como gerar:**

```bash
# Linux/Mac
openssl rand -base64 32

# Windows (PowerShell)
[Convert]::ToBase64String([Security.Cryptography.RandomNumberGenerator]::GetBytes(32))

# Online
# https://generate-random.org/secure-random-string
```

**Exemplo:**
```env
JWT_SECRET="Xk9mP2vL8qR4wN7jT3hY6cB5sE1fG0dA9zL3mN7pQ2rS8uV0wY4="
```

**Importante:** 
- Mantenha esta chave em segredo!
- Se você perder esta chave, todos os usuários serão desconectados
- Não compartilhe esta chave publicamente

---

### NODE_ENV

```
development | production | test
```

| Valor | Quando Usar |
|-------|--------------|
| `development` | Desenvolvimento local |
| `production` | Deploy (Vercel, produção) |
| `test` | Running de testes |

**Exemplo para produção:**
```env
NODE_ENV=production
```

---

## Variáveis Opcionais

### NEXT_PUBLIC_API_URL

Usado para especificar a URL da API quando o backend está em servidor separado.

| Valor Padrão | Descrição |
|--------------|-----------|
| (vazio) | Assume API do mesmo domínio |

**Exemplo (se usar backend separado):**
```env
NEXT_PUBLIC_API_URL=https://api.todofeito.com
```

---

## Configuração por Ambiente

### Desenvolvimento Local

```env
DATABASE_URL="postgresql://postgres:senha@localhost:5432/todofeito"
JWT_SECRET="dev-secret-key-32-characters-long"
NODE_ENV=development
```

### Produção (Vercel)

```env
DATABASE_URL="postgresql://postgres:senha@db.projeto.supabase.co:5432/postgres"
JWT_SECRET="[GERADO-INTEGER]"
NODE_ENV=production
```

---

## Segurança

### O que NUNCA fazer:

❌ Commitar o arquivo `.env` no GitHub
❌ Colocar credenciais em código fonte
❌ Compartilhar senhas em chat/email
❌ Usar senhas fracas em produção

### O que SEMPRE fazer:

✅ Usar `.env.example` como template
✅ Adicionar `.env` no `.gitignore`
✅ Usar senhas fortes (mínimo 16 caracteres)
✅ Rodar `npm run lint` antes de commit
✅ Verificar variáveis antes do deploy

---

## Checklist de Variáveis para Deploy

| Variável | Valor Esperado | Onde Obter |
|----------|----------------|------------|
| ✅ DATABASE_URL | `postgresql://...` | Supabase Dashboard |
| ✅ JWT_SECRET | 32+ char random string | `openssl rand -base64 32` |
| ✅ NODE_ENV | `production` | Configuração manual |

---

## Troubleshooting

### "Error: Invalid JWT secret"

**Causa:** JWT_SECRET muito curta ou vazia.

**Solução:**
```bash
openssl rand -base64 32
# Copie a saída e cole no .env
```

### "Error: Cannot connect to database"

**Causa:** DATABASE_URL incorreta.

**Solução:**
1. Verifique se o Supabase está ativo
2. Copie a string de conexão exata do Dashboard
3. Teste a conexão com `npx prisma studio`

### "Environment variable not found"

**Causa:** Variável não definida no ambiente.

**Solução:**
1. Verifique se o arquivo `.env` existe
2. Execute `npm run dev` novamente
3. Para Vercel: adicione a variável no Dashboard

---

## Referências

- [Vercel - Environment Variables](https://vercel.com/docs/environment-variables)
- [Supabase - Database](https://supabase.com/docs/guides/database)
- [Prisma - Environment Variables](https://www.prisma.io/docs/guides/development-environment/environment-variables)