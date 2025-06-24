'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ProductCard } from './ProductCard'
import { ProductModal } from './ProductModal'
import { CheckoutModal } from './CheckoutModal'
import { PublicUser, PublicProduct, UserStoreData, CheckoutData, Currency } from '@/types/public'

interface UserStoreProps {
  initialData: UserStoreData
}

export default function UserStore({ initialData }: UserStoreProps) {
  const { user, products } = initialData
  
  const [currency, setCurrency] = useState<Currency>('BRL')
  const [selectedProduct, setSelectedProduct] = useState<PublicProduct | null>(null)
  const [checkoutProduct, setCheckoutProduct] = useState<PublicProduct | null>(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)

  const handleProductClick = (product: PublicProduct) => {
    setSelectedProduct(product)
    setIsProductModalOpen(true)
  }

  const handleBuyClick = (product: PublicProduct) => {
    setCheckoutProduct(product)
    setIsCheckoutModalOpen(true)
    setIsProductModalOpen(false) // Close product modal if open
  }

  const handleConfirmPurchase = (data: CheckoutData) => {
    // Close modals
    setIsCheckoutModalOpen(false)
    setIsProductModalOpen(false)
    
    // In a real app, this would redirect to payment gateway
    // For now, we'll just show an alert
    alert(`Obrigado ${data.buyer.name}! Em breve você será redirecionado para o pagamento.\n\nProduto: ${data.product.title}\nValor: ${data.currency === 'BRL' ? `R$ ${data.product.price_brl}` : `$ ${data.product.price_usd}`}\nEmail: ${data.buyer.email}`)
  }

  const closeModals = () => {
    setIsProductModalOpen(false)
    setIsCheckoutModalOpen(false)
    setSelectedProduct(null)
    setCheckoutProduct(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Profile Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Avatar */}
            <div className="relative w-24 h-24 mx-auto mb-4">
              <Image
                src={user.avatar_url}
                alt={user.name}
                fill
                className="rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>

            {/* User Info */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {user.name}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              {user.bio}
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{products.length}</div>
                <div className="text-sm text-gray-500">Produtos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">⭐</div>
                <div className="text-sm text-gray-500">Verificado</div>
              </div>
            </div>

            {/* Currency Toggle */}
            <div className="flex justify-center">
              <div className="bg-gray-100 rounded-lg p-1 flex">
                <button
                  onClick={() => setCurrency('BRL')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    currency === 'BRL'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  🇧🇷 BRL
                </button>
                <button
                  onClick={() => setCurrency('USD')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    currency === 'USD'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  🇺🇸 USD
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {products.length === 0 ? (
          // Empty State
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Nenhum produto disponível
            </h2>
            <p className="text-gray-600">
              {user.name} ainda não publicou nenhum produto.
            </p>
          </div>
        ) : (
          <>
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Produtos Digitais
              </h2>
              <p className="text-lg text-gray-600">
                Transforme seu conhecimento com estes recursos incríveis
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={currency}
                  onProductClick={handleProductClick}
                  onBuyClick={handleBuyClick}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500 text-sm">
            <p>
              Loja criada com{' '}
              <span className="text-red-500">❤️</span>
              {' '}no{' '}
              <a 
                href="/" 
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                RufinoStore
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ProductModal
        product={selectedProduct}
        currency={currency}
        isOpen={isProductModalOpen}
        onClose={closeModals}
        onBuyClick={handleBuyClick}
      />

      <CheckoutModal
        product={checkoutProduct}
        isOpen={isCheckoutModalOpen}
        onClose={closeModals}
        onConfirmPurchase={handleConfirmPurchase}
      />
    </div>
  )
} 