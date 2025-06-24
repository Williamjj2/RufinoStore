import { User, Product, Sale, Admin, PaymentStatus } from '@prisma/client'

// Tipos base exportados do Prisma
export type { User, Product, Sale, Admin, PaymentStatus }

// Tipos de resposta da API
export interface DatabaseUser extends User {
  products?: Product[]
  sales?: Sale[]
}

export interface DatabaseProduct extends Product {
  user?: User
  sales?: Sale[]
}

export interface DatabaseSale extends Sale {
  product?: Product
  user?: User
}

// Tipos de input para criação/atualização
export interface CreateUserInput {
  email: string
  password: string
  name: string
  username: string
  bio?: string
  avatar_url?: string
  phone?: string
}

export interface UpdateUserInput {
  name?: string
  username?: string
  bio?: string
  avatar_url?: string
  phone?: string
  is_active?: boolean
  stripe_account_id?: string
  mercadopago_access_token?: string
}

export interface CreateProductInput {
  title: string
  description?: string
  price_brl?: number
  price_usd?: number
  file_url: string
  cover_image_url?: string
}

export interface UpdateProductInput {
  title?: string
  description?: string
  price_brl?: number
  price_usd?: number
  file_url?: string
  cover_image_url?: string
  is_active?: boolean
}

export interface CreateSaleInput {
  product_id: string
  buyer_email: string
  buyer_name?: string
  amount: number
  currency: 'BRL' | 'USD'
  payment_method: 'stripe' | 'mercadopago'
  stripe_payment_id?: string
  mp_payment_id?: string
}

// Tipos de estatísticas
export interface UserStats {
  totalProducts: number
  totalSales: number
  totalRevenue: number
  totalCommissions: number
}

export interface ProductStats {
  totalSales: number
  totalRevenue: number
  conversionRate?: number
}

export interface DashboardStats {
  totalUsers: number
  totalProducts: number
  totalSales: number
  totalRevenue: number
  recentSales: DatabaseSale[]
}

// Tipos de filtros
export interface UserFilters {
  search?: string
  is_active?: boolean
  has_products?: boolean
  created_after?: Date
  created_before?: Date
}

export interface ProductFilters {
  search?: string
  user_id?: string
  is_active?: boolean
  min_price?: number
  max_price?: number
  currency?: 'BRL' | 'USD'
}

export interface SaleFilters {
  user_id?: string
  product_id?: string
  buyer_email?: string
  payment_status?: PaymentStatus
  payment_method?: 'stripe' | 'mercadopago'
  created_after?: Date
  created_before?: Date
}

// Tipos de paginação
export interface PaginationParams {
  page?: number
  limit?: number
  orderBy?: string
  order?: 'asc' | 'desc'
}

export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
} 