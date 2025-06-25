import { NextRequest, NextResponse } from 'next/server'
import { constructEvent } from '@/lib/stripe'
import { createSaleRecord, sendPurchaseConfirmationEmail, sendSaleNotificationEmail, generateDownloadToken } from '@/lib/payments'
import { getProductById, getUserByUsername, mockUsers } from '@/lib/mock-data'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature provided' },
        { status: 400 }
      )
    }

    // Construct and verify webhook event
    const event = constructEvent(body, signature)

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object
      const metadata = paymentIntent.metadata

      const { productId, buyerEmail, buyerName, userId, productTitle } = metadata

      if (!productId || !buyerEmail || !userId) {
        console.error('Missing required metadata in payment intent')
        return NextResponse.json({ error: 'Invalid metadata' }, { status: 400 })
      }

      // Get product and user details
      const product = getProductById(productId)
      const user = mockUsers.find(u => u.id === product?.user_id)

      if (!product || !user) {
        console.error('Product or user not found')
        return NextResponse.json({ error: 'Product or user not found' }, { status: 404 })
      }

      const amount = paymentIntent.amount / 100 // Convert from cents

      try {
        // Create sale record
        const sale = await createSaleRecord({
          productId,
          userId,
          buyerEmail,
          buyerName: buyerName || '',
          amount,
          currency: 'USD',
          paymentMethod: 'stripe',
          stripePaymentId: paymentIntent.id,
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
            buyerName: buyerName || 'Cliente',
            productTitle: product.title,
            amount,
            currency: 'USD',
            downloadToken,
          }),
          sendSaleNotificationEmail({
            sellerEmail: user.email,
            sellerName: user.name,
            productTitle: product.title,
            buyerEmail,
            amount,
            currency: 'USD',
            commission: Number(sale.commission_amount),
          }),
        ])

        console.log(`Payment processed successfully for product ${productId}`)
      } catch (error) {
        console.error('Error processing payment:', error)
        return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    )
  }
} 