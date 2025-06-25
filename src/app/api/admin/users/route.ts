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

    const skip = (page - 1) * limit

    // Construir filtros
    const where: any = {}
    
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { username: { contains: search } }
      ]
    }

    if (status === 'active') {
      where.is_active = true
    } else if (status === 'inactive') {
      where.is_active = false
    }

    // Buscar usuários com estatísticas de vendas
    const [users, totalUsers] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          username: true,
          is_active: true,
          created_at: true,
          _count: {
            select: {
              sales: {
                where: { payment_status: 'PAID' }
              },
              products: true
            }
          }
        },
        orderBy: { created_at: 'desc' },
        skip,
        take: limit
      }),

      prisma.user.count({ where })
    ])

    // Buscar estatísticas de vendas para cada usuário
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const salesStats = await prisma.sale.aggregate({
          where: {
            user_id: user.id,
            payment_status: 'PAID'
          },
          _sum: {
            amount: true,
            commission_amount: true
          }
        })

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
          isActive: user.is_active,
          createdAt: user.created_at,
          totalSales: user._count.sales,
          totalProducts: user._count.products,
          totalRevenue: Number(salesStats._sum.amount || 0),
          totalCommissions: Number(salesStats._sum.commission_amount || 0)
        }
      })
    )

    return NextResponse.json({
      users: usersWithStats,
      pagination: {
        page,
        limit,
        total: totalUsers,
        pages: Math.ceil(totalUsers / limit)
      }
    })

  } catch (error) {
    console.error('Admin users error:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { userId, isActive } = await request.json()

    if (!userId || typeof isActive !== 'boolean') {
      return NextResponse.json(
        { error: 'userId e isActive são obrigatórios' },
        { status: 400 }
      )
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { is_active: isActive },
      select: {
        id: true,
        name: true,
        email: true,
        is_active: true
      }
    })

    return NextResponse.json({
      message: `Usuário ${isActive ? 'ativado' : 'desativado'} com sucesso`,
      user: updatedUser
    })

  } catch (error) {
    console.error('Admin user update error:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar usuário' },
      { status: 500 }
    )
  }
} 