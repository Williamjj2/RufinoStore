'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface MercadoPagoCheckoutProps {
  productId: string
  buyerEmail: string
  buyerName: string
  amount: number
  onSuccess: () => void
  onError: (error: string) => void
}

export default function MercadoPagoCheckout({
  productId,
  buyerEmail,
  buyerName,
  amount,
  onSuccess,
  onError
}: MercadoPagoCheckoutProps) {
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    setLoading(true)

    try {
      const response = await fetch('/api/payments/mercadopago', {
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
        throw new Error(data.error || 'Failed to create payment preference')
      }

      // Redirect to MercadoPago checkout
      if (data.initPoint) {
        window.location.href = data.initPoint
      } else {
        throw new Error('No payment URL received')
      }
    } catch (error) {
      console.error('MercadoPago payment error:', error)
      onError(error instanceof Error ? error.message : 'Payment initialization failed')
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          🇧🇷
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Pagamento via Mercado Pago
        </h3>
        <p className="text-sm text-gray-600">
          Você será redirecionado para o ambiente seguro do Mercado Pago
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-600">Total a pagar:</span>
          <span className="text-lg font-bold text-gray-900">R$ {amount.toFixed(2)}</span>
        </div>
        <div className="text-xs text-gray-500 space-y-1">
          <p>✅ Cartão de crédito (até 12x)</p>
          <p>✅ PIX (aprovação instantânea)</p>
          <p>✅ Boleto bancário</p>
        </div>
      </div>

      <Button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700"
      >
        {loading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Redirecionando...</span>
          </div>
        ) : (
          `Pagar R$ ${amount.toFixed(2)} no Mercado Pago`
        )}
      </Button>

      <div className="text-xs text-gray-500 text-center space-y-1">
        <p className="flex items-center justify-center space-x-1">
          <span>🔒</span>
          <span>Ambiente 100% seguro do Mercado Pago</span>
        </p>
        <p className="flex items-center justify-center space-x-1">
          <span>🛡️</span>
          <span>Seus dados são protegidos</span>
        </p>
        <p className="flex items-center justify-center space-x-1">
          <span>⚡</span>
          <span>Aprovação instantânea para PIX</span>
        </p>
      </div>
    </div>
  )
} 