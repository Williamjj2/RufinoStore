import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { verifyAdminAccess } from '@/lib/admin'
import AdminStats from '@/components/admin/AdminStats'
import TopPerformers from '@/components/admin/TopPerformers'
import { BarChart3, Users, Package, DollarSign } from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login?callbackUrl=/admin')
  }

  const admin = await verifyAdminAccess()
  
  if (!admin) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
              <p className="text-gray-600 mt-1">Gestão completa da plataforma RufinoStore</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                <span className="h-2 w-2 bg-purple-500 rounded-full mr-2"></span>
                Admin
              </span>
              <span className="text-sm text-gray-500">
                {admin.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link
            href="/admin/users"
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Usuários</h3>
                <p className="text-sm text-gray-600">Gerenciar criadores</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/products"
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Produtos</h3>
                <p className="text-sm text-gray-600">Catálogo completo</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/sales"
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 group-hover:bg-yellow-200 transition-colors">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Vendas</h3>
                <p className="text-sm text-gray-600">Transações e comissões</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/reports"
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 group-hover:bg-purple-200 transition-colors">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Relatórios</h3>
                <p className="text-sm text-gray-600">Analytics e exports</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Métricas Principais */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Visão Geral da Plataforma</h2>
          <AdminStats />
        </div>

        {/* Layout em duas colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Top Performers */}
          <div className="lg:col-span-2">
            <TopPerformers />
          </div>

          {/* Sidebar com informações adicionais */}
          <div className="space-y-6">
            {/* Resumo Financeiro */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-green-500" />
                Resumo Financeiro
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Taxa de Comissão</span>
                  <span className="font-semibold text-gray-900">5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Gateways</span>
                  <span className="font-semibold text-gray-900">Stripe + MP</span>
                </div>
                <div className="border-t pt-3">
                  <div className="text-xs text-gray-500 mb-2">Sistema de Pagamentos</div>
                  <div className="space-y-1">
                    <div className="flex items-center text-xs">
                      <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
                      <span>Stripe (Internacional)</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                      <span>MercadoPago (Brasil)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status do Sistema */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Status do Sistema</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Plataforma</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <span className="h-1.5 w-1.5 bg-green-500 rounded-full mr-1"></span>
                    Online
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Pagamentos</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <span className="h-1.5 w-1.5 bg-green-500 rounded-full mr-1"></span>
                    Operacional
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Downloads</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <span className="h-1.5 w-1.5 bg-green-500 rounded-full mr-1"></span>
                    Ativo
                  </span>
                </div>
              </div>
            </div>

            {/* Links Rápidos */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Links Rápidos</h3>
              <div className="space-y-2">
                <Link
                  href="/admin/users?status=inactive"
                  className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  → Usuários Inativos
                </Link>
                <Link
                  href="/admin/sales?status=PENDING"
                  className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  → Pagamentos Pendentes
                </Link>
                <Link
                  href="/admin/products?status=inactive"
                  className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  → Produtos Inativos
                </Link>
                <Link
                  href="/admin/reports"
                  className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  → Exportar Relatórios
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 