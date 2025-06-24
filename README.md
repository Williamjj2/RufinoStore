# RufinoStore - Plataforma de Vendas para Criadores

Uma plataforma completa para criadores digitais venderem seus produtos e serviços, similar ao Stan Store/Beacons, focada no mercado brasileiro.

## 🚀 Stack Tecnológico

- **Frontend**: Next.js 14 (App Router) + TypeScript + TailwindCSS
- **UI**: Shadcn/ui + Radix UI + Lucide React
- **Database**: PostgreSQL + Prisma ORM
- **Autenticação**: NextAuth.js v4
- **Pagamentos**: Stripe + Mercado Pago
- **Upload**: Cloudinary
- **Email**: Resend
- **Forms**: React Hook Form + Zod

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 14)
│   ├── (auth)/            # Grupo de rotas de autenticação
│   ├── (dashboard)/       # Dashboard do usuário
│   ├── (admin)/           # Painel administrativo
│   ├── api/               # API Routes
│   └── [username]/        # Páginas públicas dos criadores
├── components/            # Componentes React
│   ├── ui/               # Componentes de UI (Shadcn)
│   ├── auth/             # Componentes de autenticação
│   ├── dashboard/        # Componentes do dashboard
│   └── admin/            # Componentes administrativos
├── lib/                  # Utilitários e configurações
├── types/                # Definições de tipos TypeScript
└── styles/               # Estilos globais
```

## 🛠️ Setup do Desenvolvimento

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

```bash
cp .env.example .env.local
```

Preencha as variáveis no arquivo `.env.local`:

- Database (PostgreSQL/Supabase)
- NextAuth.js secrets
- OAuth providers (Google, GitHub)
- Stripe & Mercado Pago
- Cloudinary
- Resend

### 3. Configurar o banco de dados

```bash
# Gerar cliente Prisma
npm run db:generate

# Push do schema (desenvolvimento)
npm run db:push

# Ou executar migrações (produção)
npm run db:migrate
```

### 4. Executar o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) para ver o resultado.

## 📋 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run start` - Servidor de produção
- `npm run lint` - ESLint
- `npm run type-check` - Verificação de tipos TypeScript
- `npm run db:generate` - Gerar cliente Prisma
- `npm run db:push` - Push do schema para o banco
- `npm run db:studio` - Abrir Prisma Studio
- `npm run db:migrate` - Executar migrações
- `npm run db:reset` - Reset do banco de dados

## 🎯 Funcionalidades Planejadas

### Fase 1 - Base
- [ ] Autenticação (Email + OAuth)
- [ ] Perfis de usuário
- [ ] Dashboard básico

### Fase 2 - Produtos
- [ ] CRUD de produtos
- [ ] Upload de imagens
- [ ] Categorização

### Fase 3 - Pagamentos
- [ ] Integração Stripe
- [ ] Integração Mercado Pago
- [ ] Checkout personalizado

### Fase 4 - Avançado
- [ ] Analytics
- [ ] Email marketing
- [ ] Customização de páginas

## 📝 Convenções de Código

- **Componentes**: PascalCase (`ProductCard.tsx`)
- **Arquivos**: kebab-case (`user-profile.ts`)
- **Hooks**: camelCase com prefixo `use` (`useProducts.ts`)
- **Tipos**: PascalCase (`User`, `Product`)
- **Constantes**: SCREAMING_SNAKE_CASE (`API_ENDPOINTS`)

## 🔧 Tecnologias e Dependências

### Core
- Next.js 14.0.4
- React 18.2.0
- TypeScript 5.3.0

### Database & Auth
- Prisma 5.7.0
- NextAuth.js 4.24.5

### UI & Styling
- TailwindCSS 3.3.6
- Radix UI Components
- Lucide React Icons

### Forms & Validation
- React Hook Form 7.48.2
- Zod 3.22.4

### Payments
- Stripe 14.9.0
- Mercado Pago 2.0.0

## 🤝 Contribuição

Este é um projeto privado. Para contribuir:

1. Clone o repositório
2. Crie uma branch para sua feature
3. Faça commit das mudanças
4. Abra um Pull Request

## 📄 Licença

Projeto privado - Todos os direitos reservados. 