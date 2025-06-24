'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createProductSchema, CreateProductInput } from '@/lib/validations/product'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { FileUpload } from './FileUpload'

interface ProductFormProps {
  product?: {
    id: string
    title: string
    description?: string | null
    price_brl?: number | null
    price_usd?: number | null
    file_url: string
    cover_image_url?: string | null
    is_active: boolean
  }
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileUrl, setFileUrl] = useState(product?.file_url || '')
  const [coverImageUrl, setCoverImageUrl] = useState(product?.cover_image_url || '')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFieldError
  } = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      title: product?.title || '',
      description: product?.description || '',
      price_brl: product?.price_brl || undefined,
      price_usd: product?.price_usd || undefined,
    }
  })

  const onSubmit = async (data: CreateProductInput) => {
    if (!fileUrl) {
      setError('Arquivo do produto é obrigatório')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const url = product 
        ? `/api/products/${product.id}`
        : '/api/products'
      
      const method = product ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          file_url: fileUrl,
          cover_image_url: coverImageUrl || null
        })
      })

      const result = await response.json()

      if (!response.ok) {
        if (result.details) {
          // Erros de validação
          result.details.forEach((error: any) => {
            setFieldError(error.path[0] as any, { message: error.message })
          })
        } else {
          setError(result.error || 'Erro ao salvar produto')
        }
        return
      }

      router.push('/products')
      router.refresh()
    } catch (error) {
      setError('Erro ao salvar produto. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium text-gray-700">
          Título do Produto*
        </label>
        <Input
          id="title"
          type="text"
          placeholder="Ex: E-book de Marketing Digital"
          {...register('title')}
          disabled={isSubmitting}
          className={errors.title ? 'border-red-500' : ''}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium text-gray-700">
          Descrição
        </label>
        <textarea
          id="description"
          rows={4}
          placeholder="Descreva seu produto..."
          {...register('description')}
          disabled={isSubmitting}
          className={`flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
            errors.description ? 'border-red-500' : ''
          }`}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="price_brl" className="text-sm font-medium text-gray-700">
            Preço em BRL (R$)
          </label>
          <Input
            id="price_brl"
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register('price_brl', { valueAsNumber: true })}
            disabled={isSubmitting}
            className={errors.price_brl ? 'border-red-500' : ''}
          />
          {errors.price_brl && (
            <p className="text-sm text-red-500">{errors.price_brl.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="price_usd" className="text-sm font-medium text-gray-700">
            Preço em USD ($)
          </label>
          <Input
            id="price_usd"
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register('price_usd', { valueAsNumber: true })}
            disabled={isSubmitting}
            className={errors.price_usd ? 'border-red-500' : ''}
          />
          {errors.price_usd && (
            <p className="text-sm text-red-500">{errors.price_usd.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Arquivo do Produto*
        </label>
        <FileUpload
          type="product"
          value={fileUrl}
          onChange={setFileUrl}
          onError={setError}
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Imagem de Capa (opcional)
        </label>
        <FileUpload
          type="cover"
          value={coverImageUrl}
          onChange={setCoverImageUrl}
          onError={setError}
          disabled={isSubmitting}
        />
      </div>

      <div className="flex gap-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 md:flex-initial"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {product ? 'Salvando...' : 'Criando...'}
            </>
          ) : (
            product ? 'Salvar Alterações' : 'Criar Produto'
          )}
        </Button>
        
        <Button
          type="button"
          variant="outline"
          disabled={isSubmitting}
          onClick={() => router.push('/products')}
        >
          Cancelar
        </Button>
      </div>
    </form>
  )
} 