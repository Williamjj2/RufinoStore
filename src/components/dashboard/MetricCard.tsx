'use client'

import { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  icon: LucideIcon
  prefix?: string
  suffix?: string
  loading?: boolean
}

export default function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  prefix = '',
  suffix = '',
  loading = false
}: MetricCardProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse w-20"></div>
          </div>
          <div className="h-12 w-12 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        {change !== undefined && (
          <div className="mt-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
          </p>
        </div>
        <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
      </div>
      
      {change !== undefined && (
        <div className="mt-4 flex items-center">
          <span
            className={`text-sm font-medium ${
              change > 0
                ? 'text-green-600'
                : change < 0
                ? 'text-red-600'
                : 'text-gray-600'
            }`}
          >
            {change > 0 && '+'}
            {change.toFixed(1)}%
          </span>
          <span className="text-sm text-gray-600 ml-2">desde o mês passado</span>
        </div>
      )}
    </div>
  )
} 