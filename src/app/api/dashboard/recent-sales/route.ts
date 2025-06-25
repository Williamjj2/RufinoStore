import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    const userId = session.user.id

    // Get recent sales with product information
    const [sales, totalSales] = await Promise.all([
      prisma.sale.findMany({
        where: {
          user_id: userId
        },
        select: {
          id: true,
          amount: true,
          currency: true,
          payment_status: true,
          buyer_email: true,
          buyer_name: true,
          commission_amount: true,
          created_at: true,
          product: {
            select: {
              title: true
            }
          }
        },
        orderBy: {
          created_at: 'desc'
        },
        take: limit,
        skip: offset
      }),
      
      prisma.sale.count({
        where: {
          user_id: userId
        }
      })
    ])

    // Format sales data
    const formattedSales = sales.map(sale => ({
      id: sale.id,
      productTitle: sale.product.title,
      buyerEmail: sale.buyer_email,
      buyerName: sale.buyer_name,
      amount: Number(sale.amount),
      netAmount: Number(sale.amount) - Number(sale.commission_amount),
      currency: sale.currency,
      status: sale.payment_status,
      createdAt: sale.created_at.toISOString()
    }))

    return NextResponse.json({
      sales: formattedSales,
      pagination: {
        page,
        limit,
        total: totalSales,
        totalPages: Math.ceil(totalSales / limit)
      }
    })

  } catch (error) {
    console.error('Recent sales error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch recent sales' },
      { status: 500 }
    )
  }
} 