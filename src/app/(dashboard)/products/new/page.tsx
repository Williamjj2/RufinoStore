import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { ProductForm } from '@/components/dashboard/ProductForm'
import { LogoutButton } from '@/components/auth/LogoutButton'

export default async function NewProductPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Novo Produto</h1>
            <div className="flex items-center gap-4">
              <a 
                href="/products"
                className="text-gray-600 hover:text-gray-900"
              >
                Voltar
              </a>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <ProductForm />
        </div>
      </main>
    </div>
  )
} 