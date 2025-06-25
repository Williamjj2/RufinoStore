import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id

    // Get products with sales statistics
    const products = await prisma.product.findMany({
      where: {
        user_id: userId
      },
      select: {
        id: true,
        title: true,
        price_brl: true,
        price_usd: true,
        cover_image_url: true,
        is_active: true,
        created_at: true,
        sales: {
          where: {
            payment_status: 'PAID'
          },
          select: {
            amount: true,
            currency: true,
            commission_amount: true
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    })

    // Calculate performance metrics for each product
    const productPerformance = products.map(product => {
      const totalSales = product.sales.length
      const totalRevenue = product.sales.reduce((acc, sale) => {
        return acc + (Number(sale.amount) - Number(sale.commission_amount))
      }, 0)
      
      const revenueByCurrency = product.sales.reduce((acc, sale) => {
        const netAmount = Number(sale.amount) - Number(sale.commission_amount)
        if (sale.currency === 'BRL') {
          acc.brl += netAmount
        } else {
          acc.usd += netAmount
        }
        return acc
      }, { brl: 0, usd: 0 })

      return {
        id: product.id,
        title: product.title,
        priceBrl: product.price_brl ? Number(product.price_brl) : null,
        priceUsd: product.price_usd ? Number(product.price_usd) : null,
        coverImageUrl: product.cover_image_url,
        isActive: product.is_active,
        totalSales,
        totalRevenue: Math.round(totalRevenue * 100) / 100,
        revenueBrl: Math.round(revenueByCurrency.brl * 100) / 100,
        revenueUsd: Math.round(revenueByCurrency.usd * 100) / 100,
        avgSaleValue: totalSales > 0 ? Math.round((totalRevenue / totalSales) * 100) / 100 : 0,
        createdAt: product.created_at.toISOString()
      }
    })

    // Sort by total sales (bestsellers first)
    productPerformance.sort((a, b) => b.totalSales - a.totalSales)

    return NextResponse.json({
      products: productPerformance
    })

  } catch (error) {
    console.error('Product performance error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product performance' },
      { status: 500 }
    )
  }
} 