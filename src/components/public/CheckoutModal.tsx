'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { formatCurrency } from '@/lib/mock-data'
import { PublicProduct, CheckoutData } from '@/types/public'

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
  const [currency, setCurrency] = useState<'BRL' | 'USD'>('BRL')
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onConfirmPurchase({
        product,
        currency,
        buyer: { name: name.trim(), email: email.trim() }
      })
    }, 1500)
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
                <h2 className="text-lg font-bold">Finalizar Compra</h2>
                <p className="text-blue-100 text-sm">Últimos passos para adquirir seu produto</p>
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nome completo *
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Como você se chama?"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="seu@email.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              <p className="text-xs text-gray-500 mt-1">
                Enviaremos o produto e recibo para este email
              </p>
            </div>

            {/* Total */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
              <div className="flex justify-between items-center">
                <span className="text-green-800 font-medium">Total a pagar:</span>
                <span className="text-2xl font-bold text-green-600">
                  {formatCurrency(price, currency)}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-3 text-lg"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processando compra...
                </>
              ) : (
                <>
                  🔒 Finalizar Compra
                </>
              )}
            </button>

            {/* Security Note */}
            <div className="text-center pt-4">
              <p className="text-xs text-gray-500">
                🔒 Pagamento 100% seguro • Você será redirecionado para o gateway de pagamento
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 