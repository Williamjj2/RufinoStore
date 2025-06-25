import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import DashboardStats from '@/components/dashboard/DashboardStats'
import SalesChart from '@/components/dashboard/SalesChart'
import RecentSales from '@/components/dashboard/RecentSales'
import ProductPerformance from '@/components/dashboard/ProductPerformance'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Dashboard - RufinoStore 📊
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  Acompanhe suas vendas e performance
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Logado como:</p>
                <p className="font-medium text-gray-900">{session.user.name}</p>
                <p className="text-sm text-gray-600">{session.user.email}</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {session.user.role}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Stats Cards */}
        <DashboardStats />

        {/* Chart and Recent Sales Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="lg:col-span-2">
            <SalesChart />
          </div>
        </div>

        {/* Recent Sales and Product Performance Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <RecentSales />
          <ProductPerformance />
        </div>

        {/* Quick Actions */}
        <div className="mt-6 bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Ações Rápidas
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <a
                href="/products/new"
                className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-lg border border-gray-300 hover:border-gray-400"
              >
                <div>
                  <span className="rounded-lg inline-flex p-3 bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100">
                    <span className="text-xl">📦</span>
                  </span>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">
                    Novo Produto
                  </h4>
                  <p className="mt-1 text-sm text-gray-500">
                    Adicione um novo produto digital
                  </p>
                </div>
              </a>

              <a
                href="/products"
                className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-lg border border-gray-300 hover:border-gray-400"
              >
                <div>
                  <span className="rounded-lg inline-flex p-3 bg-green-50 text-green-600 group-hover:bg-green-100">
                    <span className="text-xl">📋</span>
                  </span>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">
                    Ver Produtos
                  </h4>
                  <p className="mt-1 text-sm text-gray-500">
                    Gerencie seus produtos
                  </p>
                </div>
              </a>

              <a
                href="/products"
                className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-500 rounded-lg border border-gray-300 hover:border-gray-400"
              >
                <div>
                  <span className="rounded-lg inline-flex p-3 bg-green-50 text-green-600 group-hover:bg-green-100">
                    <span className="text-xl">💳</span>
                  </span>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">
                    Sistema de Pagamento
                  </h4>
                  <p className="mt-1 text-sm text-gray-500">
                    Stripe & MercadoPago ativos
                  </p>
                </div>
              </a>

              <div className="relative group bg-white p-6 rounded-lg border border-green-200 bg-green-50">
                <div>
                  <span className="rounded-lg inline-flex p-3 bg-green-100 text-green-600">
                    <span className="text-xl">📊</span>
                  </span>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-green-700">
                    Analytics Ativo
                  </h4>
                  <p className="mt-1 text-sm text-green-600">
                    Dashboard completo funcionando
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 