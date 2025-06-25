'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { TrendingUp, Package, DollarSign } from 'lucide-react'

interface Product {
  id: string
  title: string
  priceBrl: number | null
  priceUsd: number | null
  coverImageUrl: string | null
  isActive: boolean
  totalSales: number
  totalRevenue: number
  revenueBrl: number
  revenueUsd: number
  avgSaleValue: number
  createdAt: string
}

interface ProductPerformanceResponse {
  products: Product[]
}

export default function ProductPerformance() {
  const [productsData, setProductsData] = useState<ProductPerformanceResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProductPerformance()
  }, [])

  const fetchProductPerformance = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/dashboard/product-performance')
      
      if (!response.ok) {
        throw new Error('Failed to fetch product performance')
      }
      
      const data = await response.json()
      setProductsData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading product performance')
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number, currency: 'BRL' | 'USD') => {
    if (currency === 'BRL') {
      return `R$ ${amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
    }
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
  }

  const formatRevenue = (revenueBrl: number, revenueUsd: number) => {
    if (revenueBrl > 0 && revenueUsd > 0) {
      return `${formatCurrency(revenueBrl, 'BRL')} + ${formatCurrency(revenueUsd, 'USD')}`
    } else if (revenueBrl > 0) {
      return formatCurrency(revenueBrl, 'BRL')
    } else if (revenueUsd > 0) {
      return formatCurrency(revenueUsd, 'USD')
    }
    return 'R$ 0,00'
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance dos Produtos</h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Erro ao carregar performance: {error}</p>
          <button
            onClick={fetchProductPerformance}
            className="mt-2 text-red-600 hover:text-red-800 font-medium"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Performance dos Produtos</h3>
        <p className="text-sm text-gray-500">Ordenado por vendas</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
              <div className="h-16 w-16 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-1/3"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-12"></div>
              </div>
            </div>
          ))}
        </div>
      ) : !productsData || productsData.products.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-2">Nenhum produto encontrado</p>
          <p className="text-gray-400 text-sm">Crie produtos para ver a performance</p>
        </div>
      ) : (
        <div className="space-y-4">
          {productsData.products.map((product, index) => (
            <div key={product.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
              {/* Product Image */}
              <div className="relative h-16 w-16 flex-shrink-0">
                {product.coverImageUrl ? (
                  <Image
                    src={product.coverImageUrl}
                    alt={product.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                ) : (
                  <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-gray-400" />
                  </div>
                )}
                {!product.isActive && (
                  <div className="absolute inset-0 bg-gray-900 bg-opacity-50 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-medium">Inativo</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {product.title}
                  </h4>
                  {index === 0 && product.totalSales > 0 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      🏆 Bestseller
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                  <span className="flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {product.totalSales} vendas
                  </span>
                  <span className="flex items-center">
                    <DollarSign className="h-3 w-3 mr-1" />
                    {formatRevenue(product.revenueBrl, product.revenueUsd)}
                  </span>
                </div>

                {product.totalSales > 0 && (
                  <div className="text-xs text-gray-400 mt-1">
                    Ticket médio: {formatCurrency(product.avgSaleValue, 'BRL')}
                  </div>
                )}
              </div>

              {/* Sales Stats */}
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">
                  {product.totalSales}
                </div>
                <div className="text-xs text-gray-500">vendas</div>
                
                {product.totalSales === 0 && (
                  <div className="text-xs text-red-500 mt-1">
                    Sem vendas
                  </div>
                )}
              </div>

              {/* Revenue */}
              <div className="text-right min-w-0 w-32">
                <div className="text-sm font-semibold text-gray-900 truncate">
                  {formatRevenue(product.revenueBrl, product.revenueUsd)}
                </div>
                <div className="text-xs text-gray-500">receita líquida</div>
              </div>
            </div>
          ))}
          
          {/* Summary */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Resumo</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-gray-500">Total de produtos:</span>
                <div className="font-semibold">{productsData.products.length}</div>
              </div>
              <div>
                <span className="text-gray-500">Com vendas:</span>
                <div className="font-semibold">
                  {productsData.products.filter(p => p.totalSales > 0).length}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Sem vendas:</span>
                <div className="font-semibold text-red-600">
                  {productsData.products.filter(p => p.totalSales === 0).length}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Inativos:</span>
                <div className="font-semibold text-gray-600">
                  {productsData.products.filter(p => !p.isActive).length}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 