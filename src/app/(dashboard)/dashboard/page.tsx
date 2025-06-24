import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

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
                  Bem-vindo ao RufinoStore! 👋
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  Seu painel de controle para vendas digitais
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

        {/* Development Notice */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-yellow-400 text-lg">🚧</span>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Modo Desenvolvimento Ativo
              </h3>
              <p className="mt-2 text-sm text-yellow-700">
                Você está usando autenticação mock. Nenhum banco de dados é necessário. 
                As funcionalidades de produtos e vendas serão implementadas em breve.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">📦</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Produtos
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      0
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">💰</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Vendas
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      R$ 0,00
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">👥</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Clientes
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      0
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
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

              <div className="relative group bg-white p-6 rounded-lg border border-gray-200 opacity-50">
                <div>
                  <span className="rounded-lg inline-flex p-3 bg-gray-50 text-gray-400">
                    <span className="text-xl">💳</span>
                  </span>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-500">
                    Pagamentos (Em breve)
                  </h4>
                  <p className="mt-1 text-sm text-gray-400">
                    Configure Stripe/Mercado Pago
                  </p>
                </div>
              </div>

              <div className="relative group bg-white p-6 rounded-lg border border-gray-200 opacity-50">
                <div>
                  <span className="rounded-lg inline-flex p-3 bg-gray-50 text-gray-400">
                    <span className="text-xl">📊</span>
                  </span>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-500">
                    Analytics (Em breve)
                  </h4>
                  <p className="mt-1 text-sm text-gray-400">
                    Acompanhe suas vendas
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