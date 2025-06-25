import MercadoPagoConfig, { Payment, Preference } from 'mercadopago'

if (!process.env.MERCADO_PAGO_ACCESS_TOKEN) {
  throw new Error('MERCADO_PAGO_ACCESS_TOKEN is not set')
}

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
  options: {
    timeout: 5000,
  }
})

export const payment = new Payment(client)
export const preference = new Preference(client)

export const createPreference = async ({
  title,
  price,
  quantity = 1,
  currency = 'BRL',
  external_reference,
  payer_email,
  notification_url,
  success_url,
  failure_url,
}: {
  title: string
  price: number
  quantity?: number
  currency?: string
  external_reference: string
  payer_email?: string
  notification_url: string
  success_url: string
  failure_url: string
}) => {
  try {
    const preferenceData = {
      items: [
        {
          id: '1',
          title,
          unit_price: price,
          quantity,
          currency_id: currency,
        }
      ],
      external_reference,
      notification_url,
      back_urls: {
        success: success_url,
        failure: failure_url,
        pending: success_url,
      },
      auto_return: 'approved' as const,
      payment_methods: {
        excluded_payment_methods: [],
        excluded_payment_types: [],
        installments: 12,
      },
      payer: payer_email ? {
        email: payer_email,
      } : undefined,
    }

    const result = await preference.create({ body: preferenceData })
    return result
  } catch (error) {
    console.error('Error creating MercadoPago preference:', error)
    throw error
  }
}

export const getPayment = async (paymentId: string) => {
  try {
    const result = await payment.get({ id: paymentId })
    return result
  } catch (error) {
    console.error('Error getting MercadoPago payment:', error)
    throw error
  }
} 