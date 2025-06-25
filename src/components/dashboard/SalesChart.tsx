'use client'

import { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'

interface ChartData {
  date: string
  sales: number
  revenue: number
}

export default function SalesChart() {
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState(30)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchChartData()
  }, [period])

  const fetchChartData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/dashboard/chart-data?days=${period}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch chart data')
      }
      
      const data = await response.json()
      setChartData(data.chartData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading chart data')
    } finally {
      setLoading(false)
    }
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Vendas por Período</h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Erro ao carregar gráfico: {error}</p>
          <button
            onClick={fetchChartData}
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
        <h3 className="text-lg font-semibold text-gray-900">Vendas por Período</h3>
        
        <div className="flex gap-2">
          {[7, 30, 90].map((days) => (
            <button
              key={days}
              onClick={() => setPeriod(days)}
              className={`px-3 py-1 text-sm rounded-md font-medium transition-colors ${
                period === days
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {days}d
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="h-80 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse delay-100"></div>
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse delay-200"></div>
          </div>
        </div>
      ) : chartData.length === 0 ? (
        <div className="h-80 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 text-lg mb-2">Nenhuma venda encontrada</p>
            <p className="text-gray-400 text-sm">Os dados aparecerão aqui assim que você fizer vendas</p>
          </div>
        </div>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickMargin={10}
                stroke="#6b7280"
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickMargin={10}
                stroke="#6b7280"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
                formatter={(value: any, name: string) => [
                  name === 'sales' ? `${value} vendas` : `R$ ${value.toFixed(2)}`,
                  name === 'sales' ? 'Vendas' : 'Receita'
                ]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                name="Vendas"
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
                name="Receita (R$)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
} 