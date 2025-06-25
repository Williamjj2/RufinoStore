'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { formatCurrency } from '@/lib/mock-data'
import { PublicProduct, CheckoutData } from '@/types/public'
import PaymentSelector from '@/components/checkout/PaymentSelector'
import StripeCheckout from '@/components/checkout/StripeCheckout'
import MercadoPagoCheckout from '@/components/checkout/MercadoPagoCheckout'

interface CheckoutModalProps {
  product: PublicProduct | null
  isOpen: boolean
  onClose: () => void
  onConfirmPurchase: (data: CheckoutData) => void
}

const getFileTypeIcon = (fileType: string) => {
  switch (fileType) {
    case 'course':
      return '🎓'
    case 'template':
      return '🎨'
    case 'spreadsheet':
      return '📊'
    case 'ebook':
      return '📚'
    default:
      return '📁'
  }
}

export function CheckoutModal({ product, isOpen, onClose, onConfirmPurchase }: CheckoutModalProps) {
  const [step, setStep] = useState<'form' | 'payment' | 'success'>('form')
  const [currency, setCurrency] = useState<'BRL' | 'USD'>('BRL')
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'mercadopago' | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep('form')
      setPaymentMethod(null)
      setName('')
      setEmail('')
      setErrors({})
      setIsLoading(false)
    }
  }, [isOpen])

  if (!isOpen || !product) return null

  const price = currency === 'BRL' ? product.price_brl : product.price_usd

  const validateForm = () => {
    const newErrors: { name?: string; email?: string } = {}

    if (!name.trim()) {
      newErrors.name = 'Nome é obrigatório'
    }

    if (!email.trim()) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email inválido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setStep('payment')
    }
  }

  const handlePaymentMethodSelect = (method: 'stripe' | 'mercadopago') => {
    setPaymentMethod(method)
  }

  const handlePaymentSuccess = () => {
    setStep('success')
    // Call the parent callback
    onConfirmPurchase({
      product,
      currency,
      buyer: { name: name.trim(), email: email.trim() }
    })
  }

  const handlePaymentError = (error: string) => {
    alert(`Erro no pagamento: ${error}`)
    setPaymentMethod(null)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{getFileTypeIcon(product.file_type)}</span>
              <div>
                <h2 className="text-lg font-bold">
                  {step === 'form' && 'Suas Informações'}
                  {step === 'payment' && 'Pagamento'}
                  {step === 'success' && 'Compra Realizada'}
                </h2>
                <p className="text-blue-100 text-sm">
                  {step === 'form' && 'Preencha seus dados para continuar'}
                  {step === 'payment' && 'Escolha sua forma de pagamento'}
                  {step === 'success' && 'Verifique seu email para download'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Product Summary */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex gap-4">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={product.cover_url}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
                  {product.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {product.description}
                </p>
              </div>
            </div>
          </div>

          {/* Step Content */}
          {step === 'form' && (
            <>
              {/* Currency Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Escolha a moeda:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrency('BRL')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      currency === 'BRL'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-xl font-bold">🇧🇷</div>
                      <div className="text-sm font-medium mt-1">Real Brasileiro</div>
                      <div className="text-lg font-bold text-green-600 mt-1">
                        {formatCurrency(product.price_brl, 'BRL')}
                      </div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrency('USD')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      currency === 'USD'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-xl font-bold">🇺🇸</div>
                      <div className="text-sm font-medium mt-1">Dólar Americano</div>
                      <div className="text-lg font-bold text-green-600 mt-1">
                        {formatCurrency(product.price_usd, 'USD')}
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Buyer Information Form */}
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Seu nome completo"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="seu@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    O link de download será enviado para este email
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  Continuar para Pagamento
                </button>
              </form>
            </>
          )}

          {step === 'payment' && !paymentMethod && (
            <>
              <div className="mb-4">
                <button
                  onClick={() => setStep('form')}
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Voltar aos dados
                </button>
              </div>

              <PaymentSelector
                selectedCurrency={currency}
                onCurrencyChange={setCurrency}
                onPaymentMethodSelect={handlePaymentMethodSelect}
                priceBRL={currency === 'BRL' ? product.price_brl : undefined}
                priceUSD={currency === 'USD' ? product.price_usd : undefined}
                isLoading={isLoading}
              />
            </>
          )}

          {step === 'payment' && paymentMethod === 'stripe' && (
            <>
              <div className="mb-4">
                <button
                  onClick={() => setPaymentMethod(null)}
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Voltar às formas de pagamento
                </button>
              </div>

              <StripeCheckout
                productId={product.id}
                buyerEmail={email}
                buyerName={name}
                amount={product.price_usd}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            </>
          )}

          {step === 'payment' && paymentMethod === 'mercadopago' && (
            <>
              <div className="mb-4">
                <button
                  onClick={() => setPaymentMethod(null)}
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Voltar às formas de pagamento
                </button>
              </div>

              <MercadoPagoCheckout
                productId={product.id}
                buyerEmail={email}
                buyerName={name}
                amount={product.price_brl}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            </>
          )}

          {step === 'success' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Pagamento Aprovado! 🎉
              </h3>
              <p className="text-gray-600 mb-6">
                Você receberá um email em <strong>{email}</strong> com o link para download do produto.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <span className="text-green-600 text-xl">📧</span>
                  <div className="text-sm text-green-800">
                    <p className="font-medium">Próximos passos:</p>
                    <ul className="mt-2 space-y-1">
                      <li>• Verifique sua caixa de entrada</li>
                      <li>• O link expira em 48 horas</li>
                      <li>• Faça o download imediatamente</li>
                    </ul>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Fechar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 