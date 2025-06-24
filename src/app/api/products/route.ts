import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { createProductSchema } from '@/lib/validations/product'
import { z } from 'zod'

// GET /api/products - Listar produtos do usuário
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const orderBy = searchParams.get('orderBy') || 'created_at'
    const order = searchParams.get('order') || 'desc'
    const status = searchParams.get('status') // 'active', 'inactive', or null for all

    const skip = (page - 1) * limit

    const where = {
      user_id: session.user.id,
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' as const } },
          { description: { contains: search, mode: 'insensitive' as const } }
        ]
      }),
      ...(status === 'active' && { is_active: true }),
      ...(status === 'inactive' && { is_active: false })
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [orderBy]: order },
        include: {
          _count: {
            select: { sales: true }
          }
        }
      }),
      prisma.product.count({ where })
    ])

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Erro ao listar produtos:', error)
    return NextResponse.json(
      { error: 'Erro ao listar produtos' },
      { status: 500 }
    )
  }
}

// POST /api/products - Criar novo produto
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    // Validar dados
    const validatedData = createProductSchema.parse(body)
    
    // Verificar se os arquivos foram enviados
    if (!body.file_url) {
      return NextResponse.json(
        { error: 'Arquivo do produto é obrigatório' },
        { status: 400 }
      )
    }

    // Criar produto
    const product = await prisma.product.create({
      data: {
        user_id: session.user.id,
        title: validatedData.title,
        description: validatedData.description || null,
        price_brl: validatedData.price_brl || null,
        price_usd: validatedData.price_usd || null,
        file_url: body.file_url,
        cover_image_url: body.cover_image_url || null,
        is_active: true
      }
    })

    return NextResponse.json(
      { 
        message: 'Produto criado com sucesso',
        product 
      },
      { status: 201 }
    )
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Erro ao criar produto:', error)
    return NextResponse.json(
      { error: 'Erro ao criar produto' },
      { status: 500 }
    )
  }
} 