import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { startOfMonth, endOfMonth, subMonths, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const now = new Date()
    
    // Current month
    const thisMonthStart = startOfMonth(now)
    const thisMonthEnd = endOfMonth(now)
    
    // Last month
    const lastMonthStart = startOfMonth(subMonths(now, 1))
    const lastMonthEnd = endOfMonth(subMonths(now, 1))

    // Get sales data for both months
    const [thisMonthSales, lastMonthSales] = await Promise.all([
      // This month sales
      prisma.sale.findMany({
        where: {
          user_id: userId,
          payment_status: 'PAID',
          created_at: {
            gte: thisMonthStart,
            lte: thisMonthEnd
          }
        },
        select: {
          amount: true,
          commission_amount: true,
          currency: true,
          created_at: true
        }
      }),
      
      // Last month sales
      prisma.sale.findMany({
        where: {
          user_id: userId,
          payment_status: 'PAID',
          created_at: {
            gte: lastMonthStart,
            lte: lastMonthEnd
          }
        },
        select: {
          amount: true,
          commission_amount: true,
          currency: true
        }
      })
    ])

    // Calculate this month metrics
    const thisMonthRevenue = thisMonthSales.reduce((acc, sale) => {
      return acc + (Number(sale.amount) - Number(sale.commission_amount))
    }, 0)

    const thisMonthAvgTicket = thisMonthSales.length > 0 
      ? thisMonthRevenue / thisMonthSales.length 
      : 0

    // Calculate last month metrics
    const lastMonthRevenue = lastMonthSales.reduce((acc, sale) => {
      return acc + (Number(sale.amount) - Number(sale.commission_amount))
    }, 0)

    const lastMonthAvgTicket = lastMonthSales.length > 0 
      ? lastMonthRevenue / lastMonthSales.length 
      : 0

    // Calculate growth percentages
    const salesGrowth = lastMonthSales.length > 0 
      ? ((thisMonthSales.length - lastMonthSales.length) / lastMonthSales.length) * 100
      : thisMonthSales.length > 0 ? 100 : 0

    const revenueGrowth = lastMonthRevenue > 0 
      ? ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
      : thisMonthRevenue > 0 ? 100 : 0

    const avgTicketGrowth = lastMonthAvgTicket > 0 
      ? ((thisMonthAvgTicket - lastMonthAvgTicket) / lastMonthAvgTicket) * 100
      : thisMonthAvgTicket > 0 ? 100 : 0

    // Get top selling product this month
    const topProductQuery = await prisma.sale.groupBy({
      by: ['product_id'],
      where: {
        user_id: userId,
        payment_status: 'PAID',
        created_at: {
          gte: thisMonthStart,
          lte: thisMonthEnd
        }
      },
      _count: {
        id: true
      },
      orderBy: {
        _count: {
          id: 'desc'
        }
      },
      take: 1
    })

    let topProduct = null
    if (topProductQuery.length > 0) {
      const product = await prisma.product.findUnique({
        where: { id: topProductQuery[0].product_id },
        select: { title: true }
      })
      topProduct = {
        title: product?.title || 'Produto não encontrado',
        sales: topProductQuery[0]._count.id
      }
    }

    return NextResponse.json({
      thisMonth: {
        name: format(thisMonthStart, 'MMMM yyyy', { locale: ptBR }),
        sales: thisMonthSales.length,
        revenue: Math.round(thisMonthRevenue * 100) / 100,
        avgTicket: Math.round(thisMonthAvgTicket * 100) / 100
      },
      lastMonth: {
        name: format(lastMonthStart, 'MMMM yyyy', { locale: ptBR }),
        sales: lastMonthSales.length,
        revenue: Math.round(lastMonthRevenue * 100) / 100,
        avgTicket: Math.round(lastMonthAvgTicket * 100) / 100
      },
      growth: {
        sales: Math.round(salesGrowth * 100) / 100,
        revenue: Math.round(revenueGrowth * 100) / 100,
        avgTicket: Math.round(avgTicketGrowth * 100) / 100
      },
      topProduct
    })

  } catch (error) {
    console.error('Monthly overview error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch monthly overview' },
      { status: 500 }
    )
  }
} 