import { NextRequest, NextResponse } from 'next/server'
import { createPreference } from '@/lib/mercadopago'
import { getProductById } from '@/lib/mock-data'
import { z } from 'zod'

const mercadoPagoSchema = z.object({
  productId: z.string(),
  buyerEmail: z.string().email(),
  buyerName: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId, buyerEmail, buyerName } = mercadoPagoSchema.parse(body)

    // Get product details
    const product = getProductById(productId)
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    if (!product.price_brl) {
      return NextResponse.json(
        { error: 'Product does not support BRL payments' },
        { status: 400 }
      )
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    
    // Create MercadoPago preference
    const preference = await createPreference({
      title: product.title,
      price: Number(product.price_brl),
      currency: 'BRL',
      external_reference: `${productId}-${Date.now()}`,
      payer_email: buyerEmail,
      notification_url: `${baseUrl}/api/webhooks/mercadopago`,
      success_url: `${baseUrl}/payment/success?product=${productId}`,
      failure_url: `${baseUrl}/payment/failure?product=${productId}`,
    })

    return NextResponse.json({
      preferenceId: preference.id,
      initPoint: preference.init_point,
      amount: Number(product.price_brl),
      productTitle: product.title,
    })
  } catch (error) {
    console.error('Error creating MercadoPago preference:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 