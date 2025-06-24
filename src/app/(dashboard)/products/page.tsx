import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { ProductList } from '@/components/dashboard/ProductList'
import { LogoutButton } from '@/components/auth/LogoutButton'

export default async function ProductsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    redirect('/login')
  }

  const products = await prisma.product.findMany({
    where: {
      user_id: session.user.id
    },
    include: {
      _count: {
        select: { sales: true }
      }
    },
    orderBy: {
      created_at: 'desc'
    }
  })

  const serializedProducts = products.map((product: any) => ({
    ...product,
    price_brl: product.price_brl?.toNumber() || null,
    price_usd: product.price_usd?.toNumber() || null,
    created_at: product.created_at.toISOString(),
    updated_at: product.updated_at.toISOString()
  }))

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Meus Produtos</h1>
            <div className="flex items-center gap-4">
              <a 
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900"
              >
                Dashboard
              </a>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductList initialProducts={serializedProducts} />
      </main>
    </div>
  )
} 