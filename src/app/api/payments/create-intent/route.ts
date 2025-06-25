import { NextRequest, NextResponse } from 'next/server'
import { createPaymentIntent } from '@/lib/stripe'
import { getProductById } from '@/lib/mock-data'
import { z } from 'zod'

const createIntentSchema = z.object({
  productId: z.string(),
  buyerEmail: z.string().email(),
  buyerName: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId, buyerEmail, buyerName } = createIntentSchema.parse(body)

    // Get product details
    const product = getProductById(productId)
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    if (!product.price_usd) {
      return NextResponse.json(
        { error: 'Product does not support USD payments' },
        { status: 400 }
      )
    }

    // Create payment intent
    const paymentIntent = await createPaymentIntent({
      amount: Number(product.price_usd),
      currency: 'usd',
      metadata: {
        productId,
        buyerEmail,
        buyerName: buyerName || '',
        userId: product.user_id,
        productTitle: product.title,
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount: Number(product.price_usd),
      productTitle: product.title,
    })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 