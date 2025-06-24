import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { updateProductSchema } from '@/lib/validations/product'
import { deleteFromCloudinary } from '@/lib/cloudinary'
import { z } from 'zod'

interface RouteParams {
  params: {
    id: string
  }
}

// GET /api/products/[id] - Obter produto específico
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const product = await prisma.product.findFirst({
      where: {
        id: params.id,
        user_id: session.user.id
      },
      include: {
        _count: {
          select: { sales: true }
        }
      }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Erro ao buscar produto:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar produto' },
      { status: 500 }
    )
  }
}

// PUT /api/products/[id] - Atualizar produto
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    // Verificar se o produto pertence ao usuário
    const existingProduct = await prisma.product.findFirst({
      where: {
        id: params.id,
        user_id: session.user.id
      }
    })

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      )
    }

    const body = await request.json()
    
    // Validar dados
    const validatedData = updateProductSchema.parse(body)
    
    // Preparar dados para atualização
    const updateData: any = {
      title: validatedData.title,
      description: validatedData.description || null,
      price_brl: validatedData.price_brl || null,
      price_usd: validatedData.price_usd || null,
      is_active: validatedData.is_active ?? existingProduct.is_active,
      updated_at: new Date()
    }

    // Se novos arquivos foram enviados, atualizar URLs
    if (body.file_url) {
      updateData.file_url = body.file_url
    }
    if (body.cover_image_url !== undefined) {
      updateData.cover_image_url = body.cover_image_url
    }

    // Atualizar produto
    const product = await prisma.product.update({
      where: { id: params.id },
      data: updateData
    })

    return NextResponse.json({
      message: 'Produto atualizado com sucesso',
      product
    })
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Erro ao atualizar produto:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar produto' },
      { status: 500 }
    )
  }
}

// DELETE /api/products/[id] - Deletar produto
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    // Verificar se o produto pertence ao usuário
    const product = await prisma.product.findFirst({
      where: {
        id: params.id,
        user_id: session.user.id
      }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      )
    }

    // Verificar se tem vendas
    const salesCount = await prisma.sale.count({
      where: { product_id: params.id }
    })

    if (salesCount > 0) {
      // Se tem vendas, apenas desativar
      await prisma.product.update({
        where: { id: params.id },
        data: { is_active: false }
      })

      return NextResponse.json({
        message: 'Produto desativado (possui vendas)'
      })
    } else {
      // Se não tem vendas, deletar fisicamente
      // Primeiro, tentar deletar arquivos do Cloudinary
      if (product.file_url) {
        // Extrair public_id da URL do Cloudinary
        const filePublicId = extractPublicId(product.file_url)
        if (filePublicId) {
          await deleteFromCloudinary(filePublicId)
        }
      }
      
      if (product.cover_image_url) {
        const coverPublicId = extractPublicId(product.cover_image_url)
        if (coverPublicId) {
          await deleteFromCloudinary(coverPublicId)
        }
      }

      // Deletar produto do banco
      await prisma.product.delete({
        where: { id: params.id }
      })

      return NextResponse.json({
        message: 'Produto deletado com sucesso'
      })
    }
    
  } catch (error) {
    console.error('Erro ao deletar produto:', error)
    return NextResponse.json(
      { error: 'Erro ao deletar produto' },
      { status: 500 }
    )
  }
}

// Função auxiliar para extrair public_id da URL do Cloudinary
function extractPublicId(url: string): string | null {
  try {
    const matches = url.match(/\/v\d+\/(.+)\.[^.]+$/)
    return matches ? matches[1] : null
  } catch {
    return null
  }
} 