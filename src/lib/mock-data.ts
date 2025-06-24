// Mock data for development without database
export const mockUsers = [
  {
    id: '1',
    email: 'admin@rufino.com',
    password: 'admin123',
    name: 'Admin Rufino',
    username: 'admin',
    bio: 'Administrador da plataforma RufinoStore',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    role: 'admin',
    is_active: true
  },
  {
    id: '2',
    email: 'user@rufino.com',
    password: 'user123',
    name: 'João Silva',
    username: 'joaosilva',
    bio: 'Desenvolvedor apaixonado por tecnologia e educação',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    role: 'user',
    is_active: true
  },
  {
    id: '3',
    email: 'creator@rufino.com',
    password: 'creator123',
    name: 'Maria Fernanda',
    username: 'mariafernanda',
    bio: 'Designer UX/UI e criadora de conteúdo digital. Ajudo pessoas a criar produtos incríveis!',
    avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
    role: 'creator',
    is_active: true
  },
  {
    id: '4',
    email: 'bubarufino@gmail.com',
    password: 'buba123',
    name: 'Buba Rufino',
    username: 'bubarufino',
    bio: 'Especialista em marketing digital e vendas online. Transformo conhecimento em produtos digitais de sucesso.',
    avatar_url: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=200&h=200&fit=crop&crop=face',
    role: 'creator',
    is_active: true
  }
]

export const mockProducts = [
  {
    id: '1',
    user_id: '3',
    title: 'Curso Completo de UX/UI Design',
    description: 'Aprenda a criar interfaces incríveis do zero. Este curso completo inclui teoria, prática e projetos reais para você se tornar um designer UX/UI profissional.',
    long_description: `
## O que você vai aprender:

### Módulo 1: Fundamentos
- Princípios do design
- Psicologia das cores
- Tipografia essencial
- Layouts responsivos

### Módulo 2: UX Research
- Como fazer pesquisa com usuários
- Criação de personas
- Jornada do usuário
- Testes de usabilidade

### Módulo 3: Prototipagem
- Wireframes e mockups
- Ferramentas do mercado (Figma, Sketch)
- Design systems
- Animações e micro-interações

### Módulo 4: Portfolio
- Como montar um portfolio matador
- Cases de sucesso
- Dicas para conseguir o primeiro emprego

### Bônus:
- Templates Figma exclusivos
- Kit de ícones premium
- Acesso à comunidade VIP
- Mentorias ao vivo mensais

**Mais de 40 horas de conteúdo + materiais exclusivos!**
    `,
    price_brl: 297.00,
    price_usd: 59.00,
    cover_url: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=300&fit=crop',
    file_url: 'https://example.com/curso-ux-ui.zip',
    file_type: 'course',
    file_size: 2048000000, // 2GB
    is_active: true,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    user_id: '3',
    title: 'Kit de Templates Figma Premium',
    description: 'Mais de 50 templates profissionais para Figma. Landing pages, dashboards, apps mobile e muito mais.',
    long_description: `
## Inclui:

### Landing Pages (15 templates)
- Saas, E-commerce, Portfólio
- Variações dark/light mode
- Totalmente responsivos

### Dashboards (10 templates)
- Analytics, CRM, E-commerce
- Componentes reutilizáveis
- Gráficos e tabelas

### Mobile Apps (15 templates)
- Social media, Delivery, Fitness
- Design systems completos
- Pronto para desenvolvimento

### Web Apps (10 templates)
- Produtividade, Educação, Finanças
- Flows completos
- Componentes avançados

**Tudo organizados em design systems reutilizáveis!**

### Bônus:
- Guia de customização
- Paletas de cores premium
- Iconografia exclusiva
- Atualizações gratuitas
    `,
    price_brl: 97.00,
    price_usd: 19.00,
    cover_url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
    file_url: 'https://example.com/templates-figma.zip',
    file_type: 'template',
    file_size: 500000000, // 500MB
    is_active: true,
    created_at: '2024-01-10T14:30:00Z',
    updated_at: '2024-01-10T14:30:00Z'
  },
  {
    id: '3',
    user_id: '4',
    title: 'Método 7 Dígitos: Marketing Digital',
    description: 'O método que me levou de zero a 7 dígitos em vendas online. Estratégias testadas e aprovadas.',
    long_description: `
## O Método que Mudou Tudo:

### Módulo 1: Mindset Milionário
- Como pensar como um empreendedor de sucesso
- Quebra de crenças limitantes
- Definição de metas e objetivos
- Foco e disciplina

### Módulo 2: Produto Digital Matador
- Como encontrar o nicho perfeito
- Validação de produto
- Criação de conteúdo irresistível
- Precificação estratégica

### Módulo 3: Funil de Vendas
- Construção do funil perfeito
- Páginas de captura
- Sequência de e-mails
- Copy que converte

### Módulo 4: Tráfego Pago
- Facebook Ads do zero ao avançado
- Google Ads para iniciantes
- Como escalar sem queimar dinheiro
- Métricas que importam

### Módulo 5: Automação
- CRM e automação de vendas
- Chatbots que vendem
- Remarketing estratégico
- Escalabilidade

### Bônus Exclusivos:
- Planilha de métricas
- Templates de e-mail
- Scripts de vendas
- Acesso ao grupo VIP
- 3 mentorias ao vivo

**Mais de 60 horas de puro conteúdo!**
    `,
    price_brl: 497.00,
    price_usd: 99.00,
    cover_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    file_url: 'https://example.com/metodo-7-digitos.zip',
    file_type: 'course',
    file_size: 3072000000, // 3GB
    is_active: true,
    created_at: '2024-01-20T09:15:00Z',
    updated_at: '2024-01-20T09:15:00Z'
  },
  {
    id: '4',
    user_id: '4',
    title: 'Planilha de Controle Financeiro',
    description: 'Planilha completa para controlar suas finanças pessoais e de negócios. Dashboards automáticos.',
    long_description: `
## Controle Total das Suas Finanças:

### O que está incluso:

#### Aba Receitas
- Controle de múltiplas fontes de renda
- Categorização automática
- Gráficos de evolução
- Metas mensais e anuais

#### Aba Despesas
- Controle por categoria
- Despesas fixas e variáveis
- Alertas de gastos excessivos
- Comparativo mensal

#### Dashboard Pessoal
- Visão geral das finanças
- Fluxo de caixa
- Patrimônio líquido
- Indicadores financeiros

#### Dashboard Empresarial
- Receitas por produto/serviço
- Custos e margem de lucro
- DRE simplificado
- Projeções

#### Planejamento
- Metas financeiras
- Simulador de investimentos
- Planejamento de aposentadoria
- Reserva de emergência

### Funcionalidades:
- Totalmente automatizada
- Fácil de usar
- Compatível com Excel e Google Sheets
- Atualizações gratuitas
- Suporte via WhatsApp

**Transforme sua relação com o dinheiro hoje mesmo!**
    `,
    price_brl: 47.00,
    price_usd: 9.00,
    cover_url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
    file_url: 'https://example.com/planilha-financeira.xlsx',
    file_type: 'spreadsheet',
    file_size: 5000000, // 5MB
    is_active: true,
    created_at: '2024-01-12T16:45:00Z',
    updated_at: '2024-01-12T16:45:00Z'
  },
  {
    id: '5',
    user_id: '2',
    title: 'API RESTful com Node.js - Guia Completo',
    description: 'Aprenda a criar APIs modernas e escaláveis com Node.js, Express, MongoDB e muito mais.',
    long_description: `
## Domine o Backend Moderno:

### Módulo 1: Fundamentos
- Introdução ao Node.js e NPM
- Setup do ambiente de desenvolvimento
- JavaScript ES6+ essencial
- Conceitos de API REST

### Módulo 2: Express.js
- Criando seu primeiro servidor
- Roteamento avançado
- Middlewares personalizados
- Tratamento de erros

### Módulo 3: Banco de Dados
- MongoDB e Mongoose
- Modelagem de dados
- Relacionamentos
- Aggregations

### Módulo 4: Autenticação
- JWT (JSON Web Tokens)
- Bcrypt e hash de senhas
- Middleware de autenticação
- Controle de acesso

### Módulo 5: Recursos Avançados
- Upload de arquivos
- Envio de emails
- Validação de dados
- Logs e monitoramento

### Módulo 6: Deploy e Produção
- Heroku, Vercel, Railway
- Variáveis de ambiente
- CI/CD com GitHub Actions
- Monitoramento e performance

### Projeto Prático:
- API completa de e-commerce
- Autenticação e autorização
- Sistema de pagamentos
- Dashboard administrativo

**Código-fonte completo + Deploy ao vivo!**
    `,
    price_brl: 197.00,
    price_usd: 39.00,
    cover_url: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop',
    file_url: 'https://example.com/api-nodejs.zip',
    file_type: 'course',
    file_size: 1024000000, // 1GB
    is_active: true,
    created_at: '2024-01-18T11:20:00Z',
    updated_at: '2024-01-18T11:20:00Z'
  }
]

// Helper functions
export function getUserByUsername(username: string) {
  return mockUsers.find(user => user.username === username && user.is_active)
}

export function getProductsByUserId(userId: string) {
  return mockProducts.filter(product => product.user_id === userId && product.is_active)
}

export function getProductById(productId: string) {
  return mockProducts.find(product => product.id === productId && product.is_active)
}

export function getUserProducts(username: string) {
  const user = getUserByUsername(username)
  if (!user) return null
  
  const products = getProductsByUserId(user.id)
  return { user, products }
}

// Format currency
export function formatCurrency(amount: number, currency: 'BRL' | 'USD' = 'BRL') {
  return new Intl.NumberFormat(currency === 'BRL' ? 'pt-BR' : 'en-US', {
    style: 'currency',
    currency: currency
  }).format(amount)
}

// Format file size
export function formatFileSize(bytes: number) {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
} 