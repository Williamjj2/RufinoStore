'use client'

import { useEffect, useState } from 'react'
import { ShoppingBag, DollarSign, Calendar, Package } from 'lucide-react'
import MetricCard from './MetricCard'

interface DashboardStats {
  totalSales: number
  totalRevenue: { brl: number; usd: number }
  thisMonthSales: number
  activeProducts: number
  monthlyGrowth: number
  avgTicket: number
}

export default function DashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/dashboard/stats')
      
      if (!response.ok) {
        throw new Error('Failed to fetch stats')
      }
      
      const data = await response.json()
      setStats(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading stats')
    } finally {
      setLoading(false)
    }
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">Erro ao carregar estatísticas: {error}</p>
        <button
          onClick={fetchStats}
          className="mt-2 text-red-600 hover:text-red-800 font-medium"
        >
          Tentar novamente
        </button>
      </div>
    )
  }

  // Format revenue display
  const formatRevenue = (brl: number, usd: number) => {
    if (brl > 0 && usd > 0) {
      return `R$ ${brl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} + $${usd.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
    } else if (brl > 0) {
      return `R$ ${brl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
    } else if (usd > 0) {
      return `$${usd.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
    }
    return 'R$ 0,00'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <MetricCard
        title="Total de Vendas"
        value={stats?.totalSales || 0}
        icon={ShoppingBag}
        loading={loading}
      />
      
      <MetricCard
        title="Receita Total"
        value={stats ? formatRevenue(stats.totalRevenue.brl, stats.totalRevenue.usd) : 'R$ 0,00'}
        icon={DollarSign}
        loading={loading}
      />
      
      <MetricCard
        title="Vendas do Mês"
        value={stats?.thisMonthSales || 0}
        change={stats?.monthlyGrowth}
        icon={Calendar}
        loading={loading}
      />
      
      <MetricCard
        title="Produtos Ativos"
        value={stats?.activeProducts || 0}
        icon={Package}
        loading={loading}
      />
    </div>
  )
} 