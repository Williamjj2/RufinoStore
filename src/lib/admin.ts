import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth'
import { prisma } from './db'

export async function verifyAdminAccess(req?: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    return null
  }

  // Verificar se é admin no banco
  const admin = await prisma.admin.findUnique({
    where: { email: session.user.email }
  })

  if (!admin) {
    return null
  }

  return admin
}

export async function requireAdmin() {
  const admin = await verifyAdminAccess()
  
  if (!admin) {
    throw new Error('Acesso negado: apenas administradores')
  }

  return admin
}

export interface AdminStats {
  totalUsers: number
  newUsersToday: number
  newUsersThisWeek: number
  newUsersThisMonth: number
  totalProducts: number
  totalSales: number
  totalCommissions: number
  totalRevenue: number
  topPerformers: Array<{
    userId: string
    userName: string
    totalSales: number
    totalRevenue: number
  }>
  recentSales: Array<{
    id: string
    productTitle: string
    sellerName: string
    buyerEmail: string
    amount: number
    currency: string
    commissionAmount: number
    createdAt: Date
  }>
}

export function formatCurrency(amount: number, currency: 'BRL' | 'USD') {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2
  }).format(amount)
}

export function calculateCommission(amount: number, rate: number = 0.05) {
  return amount * rate
} 