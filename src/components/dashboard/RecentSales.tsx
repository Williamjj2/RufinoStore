'use client'

import { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface Sale {
  id: string
  productTitle: string
  buyerEmail: string
  buyerName: string | null
  amount: number
  netAmount: number
  currency: string
  status: string
  createdAt: string
}

interface SalesResponse {
  sales: Sale[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export default function RecentSales() {
  const [salesData, setSalesData] = useState<SalesResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchRecentSales()
  }, [])

  const fetchRecentSales = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/dashboard/recent-sales?limit=10')
      
      if (!response.ok) {
        throw new Error('Failed to fetch recent sales')
      }
      
      const data = await response.json()
      setSalesData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading recent sales')
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusMap = {
      PAID: { label: 'Pago', color: 'bg-green-100 text-green-800' },
      PENDING: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-800' },
      FAILED: { label: 'Falhou', color: 'bg-red-100 text-red-800' },
      REFUNDED: { label: 'Reembolsado', color: 'bg-gray-100 text-gray-800' }
    }

    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.PENDING

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
        {statusInfo.label}
      </span>
    )
  }

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === 'BRL') {
      return `R$ ${amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
    }
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Vendas Recentes</h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Erro ao carregar vendas: {error}</p>
          <button
            onClick={fetchRecentSales}
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
        <h3 className="text-lg font-semibold text-gray-900">Vendas Recentes</h3>
        {salesData && salesData.pagination.total > 10 && (
          <p className="text-sm text-gray-500">
            Mostrando 10 de {salesData.pagination.total} vendas
          </p>
        )}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded animate-pulse w-16"></div>
            </div>
          ))}
        </div>
      ) : !salesData || salesData.sales.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-2">Nenhuma venda encontrada</p>
          <p className="text-gray-400 text-sm">Suas vendas aparecerão aqui</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Comprador
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {salesData.sales.map((sale) => (
                <tr key={sale.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {sale.productTitle}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {sale.buyerName || 'Anônimo'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {sale.buyerEmail}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(sale.netAmount, sale.currency)}
                    </div>
                    <div className="text-xs text-gray-500">
                      Bruto: {formatCurrency(sale.amount, sale.currency)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(sale.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDistanceToNow(new Date(sale.createdAt), {
                      addSuffix: true,
                      locale: ptBR
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
} 