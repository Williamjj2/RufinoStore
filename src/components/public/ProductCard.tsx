'use client'

import { useState } from 'react'
import Image from 'next/image'
import { formatCurrency } from '@/lib/mock-data'
import { PublicProduct, Currency } from '@/types/public'

interface ProductCardProps {
  product: PublicProduct
  currency: Currency
  onProductClick: (product: PublicProduct) => void
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
      return 'Curso'
    case 'template':
      return 'Template'
    case 'spreadsheet':
      return 'Planilha'
    case 'ebook':
      return 'E-book'
    default:
      return 'Arquivo'
  }
}

export function ProductCard({ product, currency, onProductClick, onBuyClick }: ProductCardProps) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const price = currency === 'BRL' ? product.price_brl : product.price_usd

  const handleBuyClick = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLoading(true)
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
      onBuyClick(product)
    }, 300)
  }

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
      onClick={() => onProductClick(product)}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {!imageError ? (
          <Image
            src={product.cover_url}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">{getFileTypeIcon(product.file_type)}</div>
              <span className="text-sm text-gray-500">{getFileTypeLabel(product.file_type)}</span>
            </div>
          </div>
        )}

        {/* File Type Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full">
            {getFileTypeLabel(product.file_type)}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1.5 bg-green-500 text-white text-sm font-bold rounded-full">
            {formatCurrency(price, currency)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {product.description}
        </p>

        {/* Buy Button */}
        <button
          onClick={handleBuyClick}
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Carregando...
            </>
          ) : (
            <>
              🛒 Comprar Agora
            </>
          )}
        </button>
      </div>
    </div>
  )
} 