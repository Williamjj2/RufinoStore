import { NextRequest, NextResponse } from 'next/server'
import { getPayment } from '@/lib/mercadopago'
import { createSaleRecord, sendPurchaseConfirmationEmail, sendSaleNotificationEmail, generateDownloadToken } from '@/lib/payments'
import { getProductById, mockUsers } from '@/lib/mock-data'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // MercadoPago sends different types of notifications
    if (body.type === 'payment') {
      const paymentId = body.data?.id

      if (!paymentId) {
        return NextResponse.json({ error: 'No payment ID provided' }, { status: 400 })
      }

      try {
        // Get payment details from MercadoPago
        const paymentData = await getPayment(paymentId)
        
        if (paymentData.status !== 'approved') {
          console.log(`Payment ${paymentId} not approved, status: ${paymentData.status}`)
          return NextResponse.json({ received: true })
        }

        // Extract product ID from external_reference
        const externalReference = paymentData.external_reference
        if (!externalReference) {
          console.error('No external reference in payment')
          return NextResponse.json({ error: 'No external reference' }, { status: 400 })
        }

        const productId = externalReference.split('-')[0]
        const product = getProductById(productId)

        if (!product) {
          console.error('Product not found:', productId)
          return NextResponse.json({ error: 'Product not found' }, { status: 404 })
        }

        const user = mockUsers.find(u => u.id === product.user_id)
        if (!user) {
          console.error('User not found:', product.user_id)
          return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        const buyerEmail = paymentData.payer?.email
        const buyerName = paymentData.payer?.first_name ? 
          `${paymentData.payer.first_name} ${paymentData.payer.last_name || ''}`.trim() : 
          'Cliente'

        if (!buyerEmail) {
          console.error('No buyer email in payment')
          return NextResponse.json({ error: 'No buyer email' }, { status: 400 })
        }

        const amount = paymentData.transaction_amount || 0

        try {
          // Create sale record
          const sale = await createSaleRecord({
            productId,
            userId: product.user_id,
            buyerEmail,
            buyerName,
            amount,
            currency: 'BRL',
            paymentMethod: 'mercadopago',
            mpPaymentId: paymentId,
          })

          // Generate download token
          const downloadToken = generateDownloadToken({
            saleId: sale.id,
            productId,
            buyerEmail,
            fileUrl: product.file_url,
          })

          // Send emails in parallel
          await Promise.all([
            sendPurchaseConfirmationEmail({
              buyerEmail,
              buyerName,
              productTitle: product.title,
              amount,
              currency: 'BRL',
              downloadToken,
            }),
            sendSaleNotificationEmail({
              sellerEmail: user.email,
              sellerName: user.name,
              productTitle: product.title,
              buyerEmail,
              amount,
              currency: 'BRL',
              commission: Number(sale.commission_amount),
            }),
          ])

          console.log(`MercadoPago payment processed successfully for product ${productId}`)
        } catch (error) {
          console.error('Error processing MercadoPago payment:', error)
          return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
        }
      } catch (error) {
        console.error('Error fetching payment from MercadoPago:', error)
        return NextResponse.json({ error: 'Payment fetch failed' }, { status: 500 })
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('MercadoPago webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    )
  }
} 