'use client'

import { useQuery } from '@tanstack/react-query'
import { formatCurrency } from '@/lib/admin'
import { Trophy, TrendingUp, Users, Package, Crown, Star } from 'lucide-react'

interface TopPerformer {
  userId: string
  userName: string
  totalSales: number
  totalRevenue: number
  totalCommissions: number
}

interface DashboardData {
  topPerformers: TopPerformer[]
}

export default function TopPerformers() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: async () => {
      const response = await fetch('/api/admin/dashboard')
      if (!response.ok) {
        throw new Error('Erro ao carregar dados')
      }
      return response.json() as Promise<DashboardData>
    }
  })

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="h-6 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3 animate-pulse">
              <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">Erro ao carregar top performers</p>
      </div>
    )
  }

  if (!data?.topPerformers || data.topPerformers.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
          Top Performers
        </h3>
        <div className="text-center py-8">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">Nenhum dado de performance disponível</p>
        </div>
      </div>
    )
  }

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 1:
        return <Star className="h-5 w-5 text-gray-400" />
      case 2:
        return <Star className="h-5 w-5 text-orange-600" />
      default:
        return <div className="h-5 w-5 flex items-center justify-center text-sm font-bold text-gray-500">#{index + 1}</div>
    }
  }

  const getRankBadge = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white'
      case 1:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white'
      case 2:
        return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
          Top Performers
        </h3>
        <p className="text-sm text-gray-600 mt-1">Criadores que mais geram receita</p>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {data.topPerformers.slice(0, 10).map((performer, index) => (
            <div
              key={performer.userId}
              className={`flex items-center space-x-4 p-4 rounded-lg transition-colors ${
                index < 3 ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100' : 'hover:bg-gray-50'
              }`}
            >
              {/* Posição */}
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${getRankBadge(index)}`}>
                {index < 3 ? getRankIcon(index) : <span className="text-sm font-bold">#{index + 1}</span>}
              </div>

              {/* Avatar placeholder */}
              <div className="h-10 w-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {performer.userName.charAt(0).toUpperCase()}
                </span>
              </div>

              {/* Informações do usuário */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {performer.userName}
                  </p>
                  {index === 0 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      <Crown className="h-3 w-3 mr-1" />
                      Campeão
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center">
                    <Package className="h-3 w-3 mr-1" />
                    {performer.totalSales} vendas
                  </span>
                  <span className="flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {formatCurrency(performer.totalCommissions, 'BRL')} comissão
                  </span>
                </div>
              </div>

              {/* Receita */}
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">
                  {formatCurrency(performer.totalRevenue, 'BRL')}
                </p>
                <p className="text-xs text-gray-500">Receita total</p>
              </div>
            </div>
          ))}
        </div>

        {data.topPerformers.length > 10 && (
          <div className="mt-4 pt-4 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              E mais {data.topPerformers.length - 10} criadores...
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 