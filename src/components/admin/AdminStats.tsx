'use client'

import { useQuery } from '@tanstack/react-query'
import { formatCurrency } from '@/lib/admin'
import { Users, Package, DollarSign, TrendingUp, Calendar, Award } from 'lucide-react'

interface AdminDashboardData {
  totalUsers: number
  newUsersToday: number
  newUsersThisWeek: number
  newUsersThisMonth: number
  totalProducts: number
  totalSales: number
  totalRevenue: number
  totalCommissions: number
}

export default function AdminStats() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: async () => {
      const response = await fetch('/api/admin/dashboard')
      if (!response.ok) {
        throw new Error('Erro ao carregar dados administrativos')
      }
      return response.json() as Promise<AdminDashboardData>
    },
    refetchInterval: 30000 // Atualizar a cada 30 segundos
  })

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">Erro ao carregar estatísticas administrativas</p>
      </div>
    )
  }

  if (!data) return null

  const stats = [
    {
      title: 'Total de Usuários',
      value: data.totalUsers.toLocaleString('pt-BR'),
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Novos Hoje',
      value: data.newUsersToday.toLocaleString('pt-BR'),
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Total de Produtos',
      value: data.totalProducts.toLocaleString('pt-BR'),
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Total de Vendas',
      value: data.totalSales.toLocaleString('pt-BR'),
      icon: Award,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Receita Total',
      value: formatCurrency(data.totalRevenue, 'BRL'),
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    },
    {
      title: 'Comissões (5%)',
      value: formatCurrency(data.totalCommissions, 'BRL'),
      icon: TrendingUp,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    },
    {
      title: 'Novos Esta Semana',
      value: data.newUsersThisWeek.toLocaleString('pt-BR'),
      icon: Calendar,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-100'
    },
    {
      title: 'Novos Este Mês',
      value: data.newUsersThisMonth.toLocaleString('pt-BR'),
      icon: TrendingUp,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 