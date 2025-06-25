'use client'

import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set')
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

interface CheckoutFormProps {
  productId: string
  buyerEmail: string
  buyerName: string
  amount: number
  onSuccess: () => void
  onError: (error: string) => void
}

function CheckoutForm({ productId, buyerEmail, buyerName, amount, onSuccess, onError }: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    // Create payment intent when component mounts
    const createPaymentIntent = async () => {
      try {
        const response = await fetch('/api/payments/create-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId,
            buyerEmail,
            buyerName,
          }),
        })

        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to create payment intent')
        }

        setClientSecret(data.clientSecret)
      } catch (error) {
        console.error('Error creating payment intent:', error)
        onError(error instanceof Error ? error.message : 'Failed to initialize payment')
      }
    }

    createPaymentIntent()
  }, [productId, buyerEmail, buyerName, onError])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements || !clientSecret) {
      return
    }

    setLoading(true)

    const cardElement = elements.getElement(CardElement)
    if (!cardElement) {
      setLoading(false)
      return
    }

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: buyerName,
            email: buyerEmail,
          },
        },
      })

      if (error) {
        throw new Error(error.message)
      }

      if (paymentIntent.status === 'succeeded') {
        onSuccess()
      }
    } catch (error) {
      console.error('Payment error:', error)
      onError(error instanceof Error ? error.message : 'Payment failed')
    } finally {
      setLoading(false)
    }
  }

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
        fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
      },
      invalid: {
        color: '#9e2146',
      },
    },
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="card-element" className="block text-sm font-medium text-gray-700 mb-2">
          Informações do Cartão
        </label>
        <div className="border border-gray-300 rounded-md p-3 bg-white">
          <CardElement 
            id="card-element"
            options={cardElementOptions}
          />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Total a pagar:</span>
          <span className="text-lg font-bold text-gray-900">$ {amount.toFixed(2)}</span>
        </div>
      </div>

      <Button
        type="submit"
        disabled={!stripe || loading || !clientSecret}
        className="w-full bg-purple-600 hover:bg-purple-700"
      >
        {loading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Processando pagamento...</span>
          </div>
        ) : (
          `Pagar $ ${amount.toFixed(2)}`
        )}
      </Button>

      <div className="text-xs text-gray-500 text-center">
        <p>🔒 Seu pagamento é processado de forma segura pelo Stripe</p>
        <p>Não armazenamos dados do seu cartão</p>
      </div>
    </form>
  )
}

interface StripeCheckoutProps {
  productId: string
  buyerEmail: string
  buyerName: string
  amount: number
  onSuccess: () => void
  onError: (error: string) => void
}

export default function StripeCheckout(props: StripeCheckoutProps) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm {...props} />
    </Elements>
  )
} 