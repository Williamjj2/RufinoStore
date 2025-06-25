import jwt from 'jsonwebtoken'
import { Resend } from 'resend'
import { prisma } from './db'

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not set')
}

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not set')
}

const resend = new Resend(process.env.RESEND_API_KEY)

export interface DownloadToken {
  saleId: string
  productId: string
  buyerEmail: string
  fileUrl: string
  exp: number
}

export const generateDownloadToken = (saleData: {
  saleId: string
  productId: string
  buyerEmail: string
  fileUrl: string
}) => {
  const payload: DownloadToken = {
    ...saleData,
    exp: Math.floor(Date.now() / 1000) + (48 * 60 * 60), // 48 hours
  }

  return jwt.sign(payload, process.env.JWT_SECRET!)
}

export const verifyDownloadToken = (token: string): DownloadToken => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as DownloadToken
  } catch (error) {
    throw new Error('Invalid or expired download token')
  }
}

export const sendPurchaseConfirmationEmail = async ({
  buyerEmail,
  buyerName,
  productTitle,
  amount,
  currency,
  downloadToken,
}: {
  buyerEmail: string
  buyerName: string
  productTitle: string
  amount: number
  currency: string
  downloadToken: string
}) => {
  const downloadUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/download/${downloadToken}`
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Compra Confirmada - RufinoStore</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #3b82f6; color: white; text-align: center; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
        .download-button { 
          display: inline-block; 
          background: #10b981; 
          color: white; 
          padding: 12px 24px; 
          text-decoration: none; 
          border-radius: 6px; 
          margin: 20px 0;
          font-weight: bold;
        }
        .info-box { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Compra Confirmada!</h1>
        </div>
        <div class="content">
          <p>Olá <strong>${buyerName}</strong>,</p>
          
          <p>Sua compra foi processada com sucesso! Aqui estão os detalhes:</p>
          
          <div class="info-box">
            <h3>📦 Produto Adquirido</h3>
            <p><strong>${productTitle}</strong></p>
            <p><strong>Valor pago:</strong> ${currency === 'BRL' ? 'R$' : '$'} ${amount.toFixed(2)}</p>
          </div>
          
          <div class="info-box">
            <h3>⬇️ Download do Produto</h3>
            <p>Clique no botão abaixo para fazer o download do seu produto:</p>
            <a href="${downloadUrl}" class="download-button">
              📥 Baixar Produto
            </a>
            <p><small>⚠️ Este link expira em 48 horas por segurança.</small></p>
          </div>
          
          <div class="info-box">
            <h3>🔒 Garantia e Suporte</h3>
            <p>• Download seguro e garantido</p>
            <p>• Suporte técnico disponível</p>
            <p>• Produto digital de alta qualidade</p>
          </div>
          
          <div class="footer">
            <p>Obrigado por escolher RufinoStore!</p>
            <p>Este email foi enviado automaticamente, não responda.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  try {
    await resend.emails.send({
      from: 'RufinoStore <noreply@rufinostore.com>',
      to: [buyerEmail],
      subject: `✅ Compra Confirmada: ${productTitle}`,
      html,
    })
  } catch (error) {
    console.error('Error sending purchase confirmation email:', error)
    throw error
  }
}

export const sendSaleNotificationEmail = async ({
  sellerEmail,
  sellerName,
  productTitle,
  buyerEmail,
  amount,
  currency,
  commission,
}: {
  sellerEmail: string
  sellerName: string
  productTitle: string
  buyerEmail: string
  amount: number
  currency: string
  commission: number
}) => {
  const netAmount = amount - commission
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Nova Venda - RufinoStore</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #10b981; color: white; text-align: center; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
        .info-box { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; }
        .earnings { background: #ecfdf5; border: 2px solid #10b981; }
        .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>💰 Nova Venda Realizada!</h1>
        </div>
        <div class="content">
          <p>Parabéns <strong>${sellerName}</strong>!</p>
          
          <p>Você acaba de fazer uma nova venda na RufinoStore! 🎉</p>
          
          <div class="info-box">
            <h3>📦 Produto Vendido</h3>
            <p><strong>${productTitle}</strong></p>
            <p><strong>Comprador:</strong> ${buyerEmail}</p>
          </div>
          
          <div class="info-box earnings">
            <h3>💵 Seus Ganhos</h3>
            <p><strong>Valor da venda:</strong> ${currency === 'BRL' ? 'R$' : '$'} ${amount.toFixed(2)}</p>
            <p><strong>Comissão RufinoStore (5%):</strong> ${currency === 'BRL' ? 'R$' : '$'} ${commission.toFixed(2)}</p>
            <p><strong>Seu ganho líquido:</strong> ${currency === 'BRL' ? 'R$' : '$'} ${netAmount.toFixed(2)}</p>
          </div>
          
          <div class="info-box">
            <h3>📊 Próximos Passos</h3>
            <p>• O produto foi entregue automaticamente ao comprador</p>
            <p>• Seus ganhos serão processados em até 7 dias úteis</p>
            <p>• Acesse seu dashboard para ver mais detalhes</p>
          </div>
          
          <div class="footer">
            <p>Continue vendendo e crescendo conosco!</p>
            <p>Equipe RufinoStore</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  try {
    await resend.emails.send({
      from: 'RufinoStore <vendas@rufinostore.com>',
      to: [sellerEmail],
      subject: `💰 Nova Venda: ${productTitle}`,
      html,
    })
  } catch (error) {
    console.error('Error sending sale notification email:', error)
    throw error
  }
}

export const calculateCommission = (amount: number, rate: number = 0.05): number => {
  return Math.round(amount * rate * 100) / 100
}

export const createSaleRecord = async ({
  productId,
  userId,
  buyerEmail,
  buyerName,
  amount,
  currency,
  paymentMethod,
  stripePaymentId,
  mpPaymentId,
}: {
  productId: string
  userId: string
  buyerEmail: string
  buyerName?: string
  amount: number
  currency: string
  paymentMethod: 'stripe' | 'mercadopago'
  stripePaymentId?: string
  mpPaymentId?: string
}) => {
  const commission = calculateCommission(amount)
  
  try {
    const sale = await prisma.sale.create({
      data: {
        product_id: productId,
        user_id: userId,
        buyer_email: buyerEmail,
        buyer_name: buyerName,
        amount,
        currency,
        payment_method: paymentMethod,
        stripe_payment_id: stripePaymentId,
        mp_payment_id: mpPaymentId,
        commission_amount: commission,
        payment_status: 'PAID',
      },
      include: {
        product: {
          include: {
            user: true,
          },
        },
      },
    })

    return sale
  } catch (error) {
    console.error('Error creating sale record:', error)
    throw error
  }
} 