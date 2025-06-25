'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface PaymentSelectorProps {
  selectedCurrency: 'USD' | 'BRL'
  onCurrencyChange: (currency: 'USD' | 'BRL') => void
  onPaymentMethodSelect: (method: 'stripe' | 'mercadopago') => void
  priceBRL?: number
  priceUSD?: number
  isLoading?: boolean
}

export default function PaymentSelector({
  selectedCurrency,
  onCurrencyChange,
  onPaymentMethodSelect,
  priceBRL,
  priceUSD,
  isLoading = false
}: PaymentSelectorProps) {
  return (
    <div className="space-y-6">
      {/* Currency Toggle */}
      <div className="flex items-center justify-center">
        <div className="bg-gray-100 p-1 rounded-lg flex">
          <button
            onClick={() => onCurrencyChange('BRL')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedCurrency === 'BRL'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🇧🇷 Real (BRL)
          </button>
          <button
            onClick={() => onCurrencyChange('USD')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedCurrency === 'USD'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🇺🇸 Dólar (USD)
          </button>
        </div>
      </div>

      {/* Price Display */}
      <div className="text-center">
        <div className="text-3xl font-bold text-gray-900">
          {selectedCurrency === 'BRL' && priceBRL && (
            <>R$ {priceBRL.toFixed(2)}</>
          )}
          {selectedCurrency === 'USD' && priceUSD && (
            <>$ {priceUSD.toFixed(2)}</>
          )}
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Pagamento único • Download imediato
        </p>
      </div>

      {/* Payment Method Selection */}
      <div className="space-y-3">
        {selectedCurrency === 'BRL' && priceBRL && (
          <div className="border rounded-lg p-4 bg-white">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  🇧🇷
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Mercado Pago</h3>
                  <p className="text-sm text-gray-600">Cartão, PIX, Boleto</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <img src="/icons/visa.svg" alt="Visa" className="h-6" />
                <img src="/icons/mastercard.svg" alt="Mastercard" className="h-6" />
                <img src="/icons/pix.svg" alt="PIX" className="h-6" />
              </div>
            </div>
            <Button
              onClick={() => onPaymentMethodSelect('mercadopago')}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? 'Processando...' : `Pagar R$ ${priceBRL.toFixed(2)}`}
            </Button>
          </div>
        )}

        {selectedCurrency === 'USD' && priceUSD && (
          <div className="border rounded-lg p-4 bg-white">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  💳
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Stripe</h3>
                  <p className="text-sm text-gray-600">Cartão Internacional</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <img src="/icons/visa.svg" alt="Visa" className="h-6" />
                <img src="/icons/mastercard.svg" alt="Mastercard" className="h-6" />
                <img src="/icons/amex.svg" alt="American Express" className="h-6" />
              </div>
            </div>
            <Button
              onClick={() => onPaymentMethodSelect('stripe')}
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              {isLoading ? 'Processing...' : `Pay $ ${priceUSD.toFixed(2)}`}
            </Button>
          </div>
        )}
      </div>

      {/* Security Info */}
      <div className="text-center text-xs text-gray-500 space-y-1">
        <p className="flex items-center justify-center space-x-1">
          <span>🔒</span>
          <span>Pagamento 100% seguro e criptografado</span>
        </p>
        <p className="flex items-center justify-center space-x-1">
          <span>⚡</span>
          <span>Download liberado automaticamente após o pagamento</span>
        </p>
        <p className="flex items-center justify-center space-x-1">
          <span>🛡️</span>
          <span>Garantia de 7 dias ou seu dinheiro de volta</span>
        </p>
      </div>
    </div>
  )
} 