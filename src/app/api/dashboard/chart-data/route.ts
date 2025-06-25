import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { subDays, format, eachDayOfInterval, startOfDay } from 'date-fns'

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '30')
    
    const userId = session.user.id
    const endDate = new Date()
    const startDate = subDays(endDate, days)

    // Get sales grouped by date
    const sales = await prisma.sale.findMany({
      where: {
        user_id: userId,
        payment_status: 'PAID',
        created_at: {
          gte: startDate,
          lte: endDate
        }
      },
      select: {
        created_at: true,
        amount: true,
        commission_amount: true,
        currency: true
      }
    })

    // Create date range array
    const dateRange = eachDayOfInterval({ start: startDate, end: endDate })
    
    // Group sales by date
    const salesByDate = sales.reduce((acc, sale) => {
      const dateKey = format(startOfDay(sale.created_at), 'yyyy-MM-dd')
      if (!acc[dateKey]) {
        acc[dateKey] = {
          sales: 0,
          revenue: 0
        }
      }
      acc[dateKey].sales++
      acc[dateKey].revenue += Number(sale.amount) - Number(sale.commission_amount)
      return acc
    }, {} as Record<string, { sales: number; revenue: number }>)

    // Format data for chart
    const chartData = dateRange.map(date => {
      const dateKey = format(date, 'yyyy-MM-dd')
      const dayData = salesByDate[dateKey] || { sales: 0, revenue: 0 }
      
      return {
        date: format(date, 'MMM dd'),
        sales: dayData.sales,
        revenue: Math.round(dayData.revenue * 100) / 100
      }
    })

    return NextResponse.json({ chartData })

  } catch (error) {
    console.error('Chart data error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch chart data' },
      { status: 500 }
    )
  }
} 