import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/admin'

export async function GET(request: NextRequest) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') // 'active' | 'inactive' | ''
    const sortBy = searchParams.get('sortBy') || 'created_at' // 'created_at' | 'sales' | 'revenue'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    const skip = (page - 1) * limit

    // Construir filtros
    const where: any = {}
    
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { user: { name: { contains: search } } },
        { user: { username: { contains: search } } }
      ]
    }

    if (status === 'active') {
      where.is_active = true
    } else if (status === 'inactive') {
      where.is_active = false
    }

    // Buscar produtos com informações do criador
    const products = await prisma.product.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true
          }
        },
        _count: {
          select: {
            sales: {
              where: { payment_status: 'PAID' }
            }
          }
        }
      },
      orderBy: { created_at: sortOrder as 'asc' | 'desc' },
      skip,
      take: limit
    })

    // Buscar estatísticas de vendas para cada produto
    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const salesStats = await prisma.sale.aggregate({
          where: {
            product_id: product.id,
            payment_status: 'PAID'
          },
          _sum: {
            amount: true,
            commission_amount: true
          },
          _count: {
            id: true
          }
        })

        return {
          id: product.id,
          title: product.title,
          description: product.description,
          priceBrl: Number(product.price_brl || 0),
          priceUsd: Number(product.price_usd || 0),
          isActive: product.is_active,
          createdAt: product.created_at,
          updatedAt: product.updated_at,
          coverImageUrl: product.cover_image_url,
          creator: {
            id: product.user.id,
            name: product.user.name || product.user.username,
            username: product.user.username
          },
          stats: {
            totalSales: salesStats._count.id,
            totalRevenue: Number(salesStats._sum.amount || 0),
            totalCommissions: Number(salesStats._sum.commission_amount || 0)
          }
        }
      })
    )

    // Ordenar por vendas ou receita se solicitado
    if (sortBy === 'sales') {
      productsWithStats.sort((a, b) => {
        const compare = b.stats.totalSales - a.stats.totalSales
        return sortOrder === 'desc' ? compare : -compare
      })
    } else if (sortBy === 'revenue') {
      productsWithStats.sort((a, b) => {
        const compare = b.stats.totalRevenue - a.stats.totalRevenue
        return sortOrder === 'desc' ? compare : -compare
      })
    }

    const totalProducts = await prisma.product.count({ where })

    // Estatísticas gerais dos produtos
    const generalStats = await Promise.all([
      prisma.product.count({ where: { is_active: true } }),
      prisma.product.count({ where: { is_active: false } }),
      prisma.sale.aggregate({
        where: { payment_status: 'PAID' },
        _sum: { amount: true, commission_amount: true },
        _count: { id: true }
      })
    ])

    return NextResponse.json({
      products: productsWithStats,
      pagination: {
        page,
        limit,
        total: totalProducts,
        pages: Math.ceil(totalProducts / limit)
      },
      stats: {
        activeProducts: generalStats[0],
        inactiveProducts: generalStats[1],
        totalSales: generalStats[2]._count.id,
        totalRevenue: Number(generalStats[2]._sum.amount || 0),
        totalCommissions: Number(generalStats[2]._sum.commission_amount || 0)
      }
    })

  } catch (error) {
    console.error('Admin products error:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 