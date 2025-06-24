# 🔧 GUIA DE CONFIGURAÇÃO SUPABASE

## 📋 Passo a Passo Completo

### 1️⃣ Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Faça login ou crie uma conta
3. Clique em **"New Project"**
4. Configure:
   - **Project name:** `rufinostore-mvp`
   - **Database Password:** Anote com segurança!
   - **Region:** South America (São Paulo)
   - **Pricing Plan:** Free tier (perfeito para MVP)

### 2️⃣ Pegar Connection String

1. Após criar o projeto, vá em **Settings → Database**
2. Em **Connection string**, copie a URI
3. Ela deve parecer com:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
   ```

### 3️⃣ Configurar Variáveis de Ambiente

1. Copie o arquivo de exemplo:
   ```bash
   cp env-example.txt .env.local
   ```

2. Edite `.env.local` e substitua:
   - `[YOUR-PASSWORD]` pela senha que você criou
   - `[YOUR-PROJECT-REF]` pelo ID do seu projeto

3. Use a mesma string para `DATABASE_URL` e `DIRECT_URL`

### 4️⃣ Instalar Dependências e Gerar Prisma Client

```bash
# Instalar a nova dependência (tsx)
npm install

# Gerar o Prisma Client
npm run db:generate
```

### 5️⃣ Criar as Tabelas no Supabase

```bash
# Push do schema para o banco
npm run db:push
```

### 6️⃣ Popular o Banco com Dados Iniciais

```bash
# Executar o seed
npm run db:seed
```

### 7️⃣ Verificar no Supabase

1. Vá no dashboard do Supabase
2. Clique em **Table Editor**
3. Você deve ver as tabelas:
   - `users`
   - `products`
   - `sales`
   - `admins`

### 8️⃣ Testar com Prisma Studio

```bash
# Abrir interface visual do banco
npm run db:studio
```

## ✅ Checklist de Verificação

- [ ] Projeto criado no Supabase
- [ ] Connection string copiada
- [ ] `.env.local` configurado
- [ ] `npm run db:push` executado sem erros
- [ ] Tabelas visíveis no Supabase
- [ ] Seed executado com sucesso
- [ ] Dados de teste criados

## 🔐 Credenciais de Teste (após seed)

**Admin:**
- Email: `admin@rufinostore.com`
- Senha: `admin123456`

**Usuário Teste:**
- Email: `test@rufinostore.com`
- Senha: `test123456`

## 🚨 Troubleshooting

### Erro de conexão
- Verifique se a senha está correta
- Confirme se o projeto está ativo no Supabase
- Teste a conexão no Supabase SQL Editor

### Erro no db:push
- Verifique se o `.env.local` existe
- Confirme se as variáveis DATABASE_URL e DIRECT_URL estão definidas
- Tente rodar `npm run db:generate` primeiro

### Prisma Studio não abre
- Certifique-se que o `db:push` foi executado
- Verifique se a porta 5555 está livre
- Tente `npx prisma studio` diretamente

## 📚 Comandos Úteis

```bash
# Verificar status do Prisma
npx prisma migrate status

# Reset completo do banco (CUIDADO!)
npm run db:reset

# Ver logs de queries (desenvolvimento)
# As queries aparecerão no console quando usar o app
```

## 🎯 Próximos Passos

Após configurar o banco com sucesso:
1. Implementar autenticação com NextAuth.js
2. Criar APIs CRUD para produtos
3. Desenvolver dashboard de usuário
4. Integrar pagamentos

---

**Dica:** Mantenha o dashboard do Supabase aberto durante o desenvolvimento para monitorar as queries e dados em tempo real! 