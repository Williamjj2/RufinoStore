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
    const limit = parseInt(searchParams.get('limit') || '50')
    const status = searchParams.get('status') || '' // 'PAID' | 'PENDING' | 'FAILED' | 'REFUNDED'
    const paymentMethod = searchParams.get('paymentMethod') || '' // 'stripe' | 'mercadopago'
    const currency = searchParams.get('currency') || '' // 'BRL' | 'USD'
    const dateFrom = searchParams.get('dateFrom') // YYYY-MM-DD
    const dateTo = searchParams.get('dateTo') // YYYY-MM-DD
    const search = searchParams.get('search') || ''

    const skip = (page - 1) * limit

    // Construir filtros
    const where: any = {}
    
    if (status) {
      where.payment_status = status
    }

    if (paymentMethod) {
      where.payment_method = paymentMethod
    }

    if (currency) {
      where.currency = currency
    }

    if (dateFrom && dateTo) {
      where.created_at = {
        gte: new Date(dateFrom),
        lte: new Date(dateTo + 'T23:59:59.999Z')
      }
    } else if (dateFrom) {
      where.created_at = {
        gte: new Date(dateFrom)
      }
    } else if (dateTo) {
      where.created_at = {
        lte: new Date(dateTo + 'T23:59:59.999Z')
      }
    }

    if (search) {
      where.OR = [
        { buyer_email: { contains: search } },
        { buyer_name: { contains: search } },
        { product: { title: { contains: search } } },
        { user: { name: { contains: search } } },
        { user: { username: { contains: search } } }
      ]
    }

    // Buscar vendas com dados relacionados
    const [sales, totalSales] = await Promise.all([
      prisma.sale.findMany({
        where,
        include: {
          product: {
            select: {
              id: true,
              title: true,
              cover_image_url: true
            }
          },
          user: {
            select: {
              id: true,
              name: true,
              username: true,
              email: true
            }
          }
        },
        orderBy: { created_at: 'desc' },
        skip,
        take: limit
      }),

      prisma.sale.count({ where })
    ])

    const salesFormatted = sales.map(sale => ({
      id: sale.id,
      productId: sale.product.id,
      productTitle: sale.product.title,
      productImage: sale.product.cover_image_url,
      sellerId: sale.user.id,
      sellerName: sale.user.name || sale.user.username,
      sellerEmail: sale.user.email,
      buyerName: sale.buyer_name,
      buyerEmail: sale.buyer_email,
      amount: Number(sale.amount),
      currency: sale.currency,
      paymentMethod: sale.payment_method,
      paymentStatus: sale.payment_status,
      commissionAmount: Number(sale.commission_amount),
      netAmount: Number(sale.amount) - Number(sale.commission_amount),
      stripePaymentId: sale.stripe_payment_id,
      mpPaymentId: sale.mp_payment_id,
      createdAt: sale.created_at
    }))

    // Estatísticas das vendas filtradas
    const salesStats = await prisma.sale.aggregate({
      where,
      _sum: {
        amount: true,
        commission_amount: true
      },
      _count: {
        id: true
      }
    })

    // Estatísticas por gateway de pagamento
    const paymentMethodStats = await Promise.all([
      prisma.sale.aggregate({
        where: { ...where, payment_method: 'stripe', payment_status: 'PAID' },
        _sum: { amount: true, commission_amount: true },
        _count: { id: true }
      }),
      prisma.sale.aggregate({
        where: { ...where, payment_method: 'mercadopago', payment_status: 'PAID' },
        _sum: { amount: true, commission_amount: true },
        _count: { id: true }
      })
    ])

    // Estatísticas por status
    const statusStats = await Promise.all([
      prisma.sale.count({ where: { ...where, payment_status: 'PAID' } }),
      prisma.sale.count({ where: { ...where, payment_status: 'PENDING' } }),
      prisma.sale.count({ where: { ...where, payment_status: 'FAILED' } }),
      prisma.sale.count({ where: { ...where, payment_status: 'REFUNDED' } })
    ])

    // Estatísticas por moeda
    const currencyStats = await Promise.all([
      prisma.sale.aggregate({
        where: { ...where, currency: 'BRL', payment_status: 'PAID' },
        _sum: { amount: true, commission_amount: true },
        _count: { id: true }
      }),
      prisma.sale.aggregate({
        where: { ...where, currency: 'USD', payment_status: 'PAID' },
        _sum: { amount: true, commission_amount: true },
        _count: { id: true }
      })
    ])

    return NextResponse.json({
      sales: salesFormatted,
      pagination: {
        page,
        limit,
        total: totalSales,
        pages: Math.ceil(totalSales / limit)
      },
      stats: {
        total: {
          count: salesStats._count.id,
          revenue: Number(salesStats._sum.amount || 0),
          commissions: Number(salesStats._sum.commission_amount || 0)
        },
        byPaymentMethod: {
          stripe: {
            count: paymentMethodStats[0]._count.id,
            revenue: Number(paymentMethodStats[0]._sum.amount || 0),
            commissions: Number(paymentMethodStats[0]._sum.commission_amount || 0)
          },
          mercadopago: {
            count: paymentMethodStats[1]._count.id,
            revenue: Number(paymentMethodStats[1]._sum.amount || 0),
            commissions: Number(paymentMethodStats[1]._sum.commission_amount || 0)
          }
        },
        byStatus: {
          paid: statusStats[0],
          pending: statusStats[1],
          failed: statusStats[2],
          refunded: statusStats[3]
        },
        byCurrency: {
          BRL: {
            count: currencyStats[0]._count.id,
            revenue: Number(currencyStats[0]._sum.amount || 0),
            commissions: Number(currencyStats[0]._sum.commission_amount || 0)
          },
          USD: {
            count: currencyStats[1]._count.id,
            revenue: Number(currencyStats[1]._sum.amount || 0),
            commissions: Number(currencyStats[1]._sum.commission_amount || 0)
          }
        }
      }
    })

  } catch (error) {
    console.error('Admin sales error:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 