import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/admin'

export async function GET(request: NextRequest) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

    // Métricas básicas
    const [
      totalUsers,
      newUsersToday,
      newUsersThisWeek,
      newUsersThisMonth,
      totalProducts,
      totalSales,
      totalRevenue,
      totalCommissions
    ] = await Promise.all([
      prisma.user.count(),
      
      prisma.user.count({
        where: { created_at: { gte: today } }
      }),
      
      prisma.user.count({
        where: { created_at: { gte: weekAgo } }
      }),
      
      prisma.user.count({
        where: { created_at: { gte: monthAgo } }
      }),
      
      prisma.product.count(),
      
      prisma.sale.count({
        where: { payment_status: 'PAID' }
      }),
      
      prisma.sale.aggregate({
        where: { payment_status: 'PAID' },
        _sum: { amount: true }
      }),
      
      prisma.sale.aggregate({
        where: { payment_status: 'PAID' },
        _sum: { commission_amount: true }
      })
    ])

    // Top performers (usuários que mais vendem)
    const topPerformers = await prisma.sale.groupBy({
      by: ['user_id'],
      where: { payment_status: 'PAID' },
      _count: { id: true },
      _sum: { amount: true, commission_amount: true },
      orderBy: { _sum: { amount: 'desc' } },
      take: 10
    })

    // Buscar nomes dos top performers
    const topPerformersWithNames = await Promise.all(
      topPerformers.map(async (performer) => {
        const user = await prisma.user.findUnique({
          where: { id: performer.user_id },
          select: { name: true, username: true }
        })
        
        return {
          userId: performer.user_id,
          userName: user?.name || user?.username || 'Usuário',
          totalSales: performer._count.id,
          totalRevenue: Number(performer._sum.amount || 0),
          totalCommissions: Number(performer._sum.commission_amount || 0)
        }
      })
    )

    // Vendas recentes para o admin
    const recentSales = await prisma.sale.findMany({
      where: { payment_status: 'PAID' },
      include: {
        product: { select: { title: true } },
        user: { select: { name: true, username: true } }
      },
      orderBy: { created_at: 'desc' },
      take: 20
    })

    const recentSalesFormatted = recentSales.map(sale => ({
      id: sale.id,
      productTitle: sale.product.title,
      sellerName: sale.user.name || sale.user.username,
      buyerEmail: sale.buyer_email,
      amount: Number(sale.amount),
      currency: sale.currency,
      commissionAmount: Number(sale.commission_amount),
      createdAt: sale.created_at,
      paymentMethod: sale.payment_method
    }))

    // Dados para gráfico de crescimento (últimos 30 dias)
    const growthData = []
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000)
      const nextDate = new Date(date.getTime() + 24 * 60 * 60 * 1000)
      
      const [dayUsers, daySales, dayRevenue] = await Promise.all([
        prisma.user.count({
          where: { 
            created_at: { 
              gte: date, 
              lt: nextDate 
            } 
          }
        }),
        
        prisma.sale.count({
          where: { 
            payment_status: 'PAID',
            created_at: { 
              gte: date, 
              lt: nextDate 
            } 
          }
        }),
        
        prisma.sale.aggregate({
          where: { 
            payment_status: 'PAID',
            created_at: { 
              gte: date, 
              lt: nextDate 
            } 
          },
          _sum: { amount: true }
        })
      ])

      growthData.push({
        date: date.toISOString().split('T')[0],
        users: dayUsers,
        sales: daySales,
        revenue: Number(dayRevenue._sum.amount || 0)
      })
    }

    const response = {
      totalUsers,
      newUsersToday,
      newUsersThisWeek,
      newUsersThisMonth,
      totalProducts,
      totalSales,
      totalRevenue: Number(totalRevenue._sum.amount || 0),
      totalCommissions: Number(totalCommissions._sum.commission_amount || 0),
      topPerformers: topPerformersWithNames,
      recentSales: recentSalesFormatted,
      growthChart: growthData
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Admin dashboard error:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 