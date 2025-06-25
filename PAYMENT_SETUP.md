# 💳 Sistema de Pagamentos RufinoStore

## 🎯 Visão Geral

Sistema completo de pagamentos integrado com:
- **Stripe** (pagamentos USD/internacionais)
- **Mercado Pago** (pagamentos BRL/Brasil)
- **Webhooks** para confirmação automática
- **Entrega automática** por email
- **Downloads seguros** com tokens JWT

---

## 🔧 Configuração das Integrações

### 1. Stripe (USD/Internacional)

1. **Crie uma conta**: https://dashboard.stripe.com/register
2. **Obtenha as chaves**:
   - Publishable Key (pk_test_...)
   - Secret Key (sk_test_...)
   - Webhook Secret (whsec_...)

3. **Configure webhook**:
   - URL: `https://seudominio.com/api/webhooks/stripe`
   - Eventos: `payment_intent.succeeded`

### 2. Mercado Pago (BRL/Brasil)

1. **Crie uma conta**: https://www.mercadopago.com.br/developers
2. **Obtenha as credenciais**:
   - Access Token
   - Public Key

3. **Configure webhook**:
   - URL: `https://seudominio.com/api/webhooks/mercadopago`
   - Eventos: `payment`

### 3. Resend (Email)

1. **Crie uma conta**: https://resend.com
2. **Obtenha a API Key**
3. **Configure o domínio** (opcional)

---

## 🔐 Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env.local` e configure:

```env
# Stripe
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_publishable_key"

# Mercado Pago
MERCADO_PAGO_ACCESS_TOKEN="your_mp_access_token"
MERCADO_PAGO_PUBLIC_KEY="your_mp_public_key"

# JWT for download tokens
JWT_SECRET="your-super-secret-jwt-key-here"

# Resend
RESEND_API_KEY="re_your_resend_api_key"

# App URLs
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 🚀 Fluxo de Pagamento

### Stripe (USD)
1. ✅ Usuário escolhe produto e USD
2. ✅ Preenche dados (nome, email)
3. ✅ Seleciona Stripe como pagamento
4. ✅ Insere dados do cartão (Stripe Elements)
5. ✅ Pagamento processado em tempo real
6. ✅ Webhook confirma → email enviado
7. ✅ Download liberado

### Mercado Pago (BRL)
1. ✅ Usuário escolhe produto e BRL
2. ✅ Preenche dados (nome, email)
3. ✅ Seleciona Mercado Pago
4. ✅ Redirecionado para MP Checkout
5. ✅ Paga (cartão, PIX, boleto)
6. ✅ Webhook confirma → email enviado
7. ✅ Download liberado

---

## 📋 Endpoints da API

### Pagamentos
- `POST /api/payments/create-intent` - Cria Payment Intent (Stripe)
- `POST /api/payments/mercadopago` - Cria Preference (MP)

### Webhooks
- `POST /api/webhooks/stripe` - Recebe confirmações Stripe
- `POST /api/webhooks/mercadopago` - Recebe notificações MP

### Downloads
- `GET /api/download/[token]` - Download seguro com token JWT

### Páginas de Resultado
- `/payment/success` - Sucesso MP
- `/payment/failure` - Falha MP

---

## 🧪 Como Testar

### 1. Ambiente de Desenvolvimento

```bash
# Instalar dependências
npm install

# Configurar .env.local
cp env-example.txt .env.local
# Editar com suas chaves de teste

# Iniciar servidor
npm run dev
```

### 2. Testar Stripe

**Cartões de Teste:**
- Sucesso: `4242 4242 4242 4242`
- Falha: `4000 0000 0000 0002`
- CVC: qualquer 3 dígitos
- Data: qualquer data futura

**Fluxo:**
1. Acesse uma loja: `http://localhost:3000/mariafernanda`
2. Clique "Comprar" em um produto
3. Preencha dados e escolha USD
4. Use cartão de teste
5. Verifique console para logs

### 3. Testar Mercado Pago

**Usuário de Teste:**
- Email: `test_user_123@testuser.com`
- Senha: `qatest123`

**Cartão de Teste:**
- Número: `5031 7557 3453 0604`
- CVC: `123`
- Vencimento: `11/25`

**Fluxo:**
1. Acesse uma loja
2. Escolha BRL e Mercado Pago
3. Complete o fluxo no ambiente MP
4. Retornará para success/failure

### 4. Testar Webhooks Localmente

Use ngrok para expor seu localhost:

```bash
# Instalar ngrok
npm install -g ngrok

# Expor porta 3000
ngrok http 3000

# Usar URL ngrok nos webhooks:
# https://abc123.ngrok.io/api/webhooks/stripe
# https://abc123.ngrok.io/api/webhooks/mercadopago
```

---

## 📧 Sistema de Email

### Templates Incluídos:

**Para o Comprador:**
- ✅ Confirmação de compra
- ✅ Link de download seguro
- ✅ Instruções de acesso
- ✅ Informações de suporte

**Para o Vendedor:**
- ✅ Notificação de venda
- ✅ Dados do comprador
- ✅ Valor líquido (descontada comissão)
- ✅ Próximos passos

### Personalização:
Edite os templates em `/lib/payments.ts`:
- `sendPurchaseConfirmationEmail()`
- `sendSaleNotificationEmail()`

---

## 🔒 Segurança Implementada

### Downloads Seguros:
- ✅ Tokens JWT com expiração (48h)
- ✅ Verificação de compra válida
- ✅ Links únicos por transação
- ✅ Logs de acesso

### Webhooks:
- ✅ Verificação de assinatura (Stripe)
- ✅ Validação de origem
- ✅ Rate limiting (recomendado)
- ✅ Retry logic (recomendado)

### Dados:
- ✅ Não armazenamos dados de cartão
- ✅ Emails criptografados em trânsito
- ✅ HTTPS obrigatório em produção

---

## 💰 Sistema de Comissões

### Configuração Atual:
- **Taxa**: 5% sobre cada venda
- **Cálculo**: Automático nos webhooks
- **Vendedor recebe**: 95% do valor
- **Registros**: Tabela `sales` no banco

### Customização:
```typescript
// lib/payments.ts
export const calculateCommission = (amount: number, rate: number = 0.05)
```

---

## 🐛 Troubleshooting

### Erros Comuns:

**1. Stripe Elements não carrega**
```
Erro: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY não configurada
Solução: Adicionar chave no .env.local
```

**2. Webhook não recebido**
```
Erro: 401 Unauthorized
Solução: Verificar STRIPE_WEBHOOK_SECRET
```

**3. Email não enviado**
```
Erro: RESEND_API_KEY inválida
Solução: Verificar chave e domínio configurado
```

**4. MP redirect falha**
```
Erro: Preference inválida
Solução: Verificar MERCADO_PAGO_ACCESS_TOKEN
```

### Logs Úteis:
```bash
# Verificar logs do webhook
curl -X POST http://localhost:3000/api/webhooks/stripe

# Testar criação de payment intent
curl -X POST http://localhost:3000/api/payments/create-intent \
  -H "Content-Type: application/json" \
  -d '{"productId":"1","buyerEmail":"test@test.com"}'
```

---

## 🚀 Deploy em Produção

### 1. Configurar Webhooks Reais:
- Stripe: Dashboard → Webhooks → Add endpoint
- MP: Aplicação → Webhooks → Configurar

### 2. Usar Chaves de Produção:
```env
STRIPE_SECRET_KEY="sk_live_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
MERCADO_PAGO_ACCESS_TOKEN="APP_USR-..."
```

### 3. HTTPS Obrigatório:
- Certificado SSL configurado
- Redirect HTTP → HTTPS
- Headers de segurança

### 4. Monitoramento:
- Logs de webhook ativo
- Alertas de falha de pagamento
- Métricas de conversão

---

## 📊 Métricas e Analytics

### Dados Coletados:
- Volume de vendas por método
- Taxa de conversão por moeda
- Produtos mais vendidos
- Comissões acumuladas

### Relatórios Disponíveis:
- Dashboard de vendas (em desenvolvimento)
- Export para Excel/CSV
- Gráficos de performance

---

## 🔄 Próximas Melhorias

### Em Desenvolvimento:
- [ ] PIX direto (sem redirect)
- [ ] Parcelamento configurável
- [ ] Cupons de desconto
- [ ] Assinaturas recorrentes
- [ ] Multi-moeda automática
- [ ] Dashboard analytics
- [ ] Notifications push

### Sugestões:
- Integração com outros gateways
- Sistema de afiliados
- Programa de cashback
- API para parceiros

---

## 🆘 Suporte

### Documentação Oficial:
- [Stripe Docs](https://stripe.com/docs)
- [Mercado Pago Docs](https://www.mercadopago.com.br/developers)
- [Resend Docs](https://resend.com/docs)

### Contato:
- 📧 dev@rufinostore.com
- 💬 Discord: RufinoStore Devs
- 📱 WhatsApp: (11) 99999-9999

---

**✅ Sistema 100% Funcional e Testado!**

*Última atualização: Janeiro 2024* 