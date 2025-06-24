'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProductCard } from './ProductCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search, Loader2 } from 'lucide-react'

interface Product {
  id: string
  title: string
  description?: string | null
  price_brl?: number | null
  price_usd?: number | null
  cover_image_url?: string | null
  is_active: boolean
  created_at: string
  _count?: {
    sales: number
  }
}

interface ProductListProps {
  initialProducts: Product[]
}

export function ProductList({ initialProducts }: ProductListProps) {
  const router = useRouter()
  const [products, setProducts] = useState(initialProducts)
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all')

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.description?.toLowerCase().includes(search.toLowerCase())
    
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'active' && product.is_active) ||
      (filter === 'inactive' && !product.is_active)
    
    return matchesSearch && matchesFilter
  })

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setProducts(products.filter(p => p.id !== id))
      }
    } catch (error) {
      console.error('Erro ao deletar produto:', error)
    }
  }

  const handleToggleStatus = async (id: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: isActive })
      })

      if (response.ok) {
        setProducts(products.map(p => 
          p.id === id ? { ...p, is_active: isActive } : p
        ))
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar produtos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            Todos
          </Button>
          <Button
            variant={filter === 'active' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('active')}
          >
            Ativos
          </Button>
          <Button
            variant={filter === 'inactive' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('inactive')}
          >
            Inativos
          </Button>
        </div>

        <Button onClick={() => router.push('/products/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Produto
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {search || filter !== 'all' 
              ? 'Nenhum produto encontrado' 
              : 'Você ainda não tem produtos'
            }
          </h3>
          <p className="text-gray-500 mb-4">
            {search || filter !== 'all'
              ? 'Tente ajustar os filtros de busca'
              : 'Crie seu primeiro produto para começar a vender'
            }
          </p>
          {!search && filter === 'all' && (
            <Button onClick={() => router.push('/products/new')}>
              <Plus className="mr-2 h-4 w-4" />
              Criar Primeiro Produto
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </div>
      )}
    </div>
  )
} 