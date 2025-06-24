'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { formatCurrency, formatFileSize } from '@/lib/mock-data'
import { PublicProduct, Currency } from '@/types/public'

interface ProductModalProps {
  product: PublicProduct | null
  currency: Currency
  isOpen: boolean
  onClose: () => void
  onBuyClick: (product: PublicProduct) => void
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

const getFileTypeLabel = (fileType: string) => {
  switch (fileType) {
    case 'course':
      return 'Curso Online'
    case 'template':
      return 'Template Digital'
    case 'spreadsheet':
      return 'Planilha'
    case 'ebook':
      return 'E-book'
    default:
      return 'Arquivo Digital'
  }
}

export function ProductModal({ product, currency, isOpen, onClose, onBuyClick }: ProductModalProps) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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

  if (!isOpen || !product) return null

  const price = currency === 'BRL' ? product.price_brl : product.price_usd

  const handleBuyClick = async () => {
    setIsLoading(true)
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
      onBuyClick(product)
    }, 300)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Simple markdown-like formatting
  const formatDescription = (text: string) => {
    return text
      .replace(/### (.*)/g, '<h3 class="text-lg font-bold text-gray-900 mt-6 mb-3">$1</h3>')
      .replace(/## (.*)/g, '<h2 class="text-xl font-bold text-gray-900 mt-8 mb-4">$1</h2>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
      .replace(/- (.*)/g, '<li class="ml-4">$1</li>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>')
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{getFileTypeIcon(product.file_type)}</span>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{product.title}</h2>
              <p className="text-sm text-gray-500">{getFileTypeLabel(product.file_type)}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {/* Product Image */}
          <div className="relative aspect-[16/9] mb-6 rounded-xl overflow-hidden">
            {!imageError ? (
              <Image
                src={product.cover_url}
                alt={product.title}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">{getFileTypeIcon(product.file_type)}</div>
                  <span className="text-lg text-gray-500">{getFileTypeLabel(product.file_type)}</span>
                </div>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Content */}
            <div className="md:col-span-2">
              <div className="prose prose-gray max-w-none">
                <div 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: formatDescription(product.long_description) 
                  }}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-6">
                {/* Price */}
                <div className="mb-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {formatCurrency(price, currency)}
                  </div>
                  <p className="text-sm text-gray-500">Pagamento único • Acesso vitalício</p>
                </div>

                {/* File Info */}
                <div className="mb-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tipo:</span>
                    <span className="font-medium">{getFileTypeLabel(product.file_type)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tamanho:</span>
                    <span className="font-medium">{formatFileSize(product.file_size)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Formato:</span>
                    <span className="font-medium">Download digital</span>
                  </div>
                </div>

                {/* Buy Button */}
                <button
                  onClick={handleBuyClick}
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-3 text-lg"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processando...
                    </>
                  ) : (
                    <>
                      🛒 Comprar Agora
                    </>
                  )}
                </button>

                {/* Security Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Pagamento 100% seguro</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Download imediato</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Suporte via email</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 