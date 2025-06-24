'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Edit, 
  Trash2, 
  MoreVertical, 
  Eye, 
  EyeOff,
  DollarSign,
  ShoppingCart
} from 'lucide-react'

interface ProductCardProps {
  product: {
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
  onDelete: (id: string) => void
  onToggleStatus: (id: string, isActive: boolean) => void
}

export function ProductCard({ product, onDelete, onToggleStatus }: ProductCardProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleEdit = () => {
    router.push(`/products/edit/${product.id}`)
  }

  const handleToggleStatus = async () => {
    setIsLoading(true)
    await onToggleStatus(product.id, !product.is_active)
    setIsLoading(false)
  }

  const handleDelete = async () => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      setIsLoading(true)
      await onDelete(product.id)
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video relative bg-gray-100">
        {product.cover_image_url ? (
          <Image
            src={product.cover_image_url}
            alt={product.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <ShoppingCart className="h-12 w-12" />
          </div>
        )}
        {!product.is_active && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold bg-black/75 px-3 py-1 rounded">
              Inativo
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {product.title}
          </h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                disabled={isLoading}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleToggleStatus}>
                {product.is_active ? (
                  <>
                    <EyeOff className="mr-2 h-4 w-4" />
                    Desativar
                  </>
                ) : (
                  <>
                    <Eye className="mr-2 h-4 w-4" />
                    Ativar
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleDelete}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {product.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="space-y-2">
          {(product.price_brl || product.price_usd) && (
            <div className="flex items-center gap-2 flex-wrap">
              <DollarSign className="h-4 w-4 text-gray-400" />
              {product.price_brl && (
                <span className="font-semibold text-gray-900">
                  {formatPrice(product.price_brl, { currency: 'BRL' })}
                </span>
              )}
              {product.price_brl && product.price_usd && (
                <span className="text-gray-400">•</span>
              )}
              {product.price_usd && (
                <span className="font-semibold text-gray-900">
                  {formatPrice(product.price_usd, { currency: 'USD' })}
                </span>
              )}
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>
              {product._count?.sales || 0} venda{product._count?.sales !== 1 ? 's' : ''}
            </span>
            <span>
              {new Date(product.created_at).toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
} 