import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { startOfMonth, endOfMonth, subMonths, startOfDay, endOfDay } from 'date-fns'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const now = new Date()
    const thisMonthStart = startOfMonth(now)
    const thisMonthEnd = endOfMonth(now)
    const lastMonthStart = startOfMonth(subMonths(now, 1))
    const lastMonthEnd = endOfMonth(subMonths(now, 1))

    // Get all sales for the user
    const [
      totalSalesCount,
      totalRevenue,
      thisMonthSales,
      lastMonthSales,
      activeProducts,
      allSales
    ] = await Promise.all([
      // Total sales count
      prisma.sale.count({
        where: {
          user_id: userId,
          payment_status: 'PAID'
        }
      }),
      
      // Total revenue by currency
      prisma.sale.aggregate({
        where: {
          user_id: userId,
          payment_status: 'PAID'
        },
        _sum: {
          amount: true
        }
      }),
      
      // This month sales
      prisma.sale.count({
        where: {
          user_id: userId,
          payment_status: 'PAID',
          created_at: {
            gte: thisMonthStart,
            lte: thisMonthEnd
          }
        }
      }),
      
      // Last month sales for comparison
      prisma.sale.count({
        where: {
          user_id: userId,
          payment_status: 'PAID',
          created_at: {
            gte: lastMonthStart,
            lte: lastMonthEnd
          }
        }
      }),
      
      // Active products count
      prisma.product.count({
        where: { user_id: userId }
      }),
      
      // All sales for average ticket calculation
      prisma.sale.findMany({
        where: {
          user_id: userId,
          payment_status: 'PAID'
        },
        select: {
          amount: true,
          commission_amount: true,
          currency: true
        }
      })
    ])

    // Calculate revenue by currency (net amount after commission)
    const revenueByCurrency = allSales.reduce((acc, sale) => {
      const netAmount = Number(sale.amount) - Number(sale.commission_amount)
      if (sale.currency === 'BRL') {
        acc.brl += netAmount
      } else {
        acc.usd += netAmount
      }
      return acc
    }, { brl: 0, usd: 0 })

    // Calculate monthly growth percentage
    const monthlyGrowth = lastMonthSales > 0 
      ? ((thisMonthSales - lastMonthSales) / lastMonthSales) * 100 
      : thisMonthSales > 0 ? 100 : 0

    // Calculate average ticket
    const avgTicket = totalSalesCount > 0 
      ? Number(totalRevenue._sum.amount || 0) / totalSalesCount 
      : 0

    return NextResponse.json({
      totalSales: totalSalesCount,
      totalRevenue: revenueByCurrency,
      thisMonthSales,
      activeProducts,
      monthlyGrowth: Math.round(monthlyGrowth * 100) / 100,
      avgTicket: Math.round(avgTicket * 100) / 100
    })

  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    )
  }
} 