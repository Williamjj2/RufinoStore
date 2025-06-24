export interface User {
  id: string
  email: string
  name: string | null
  username: string | null
  image: string | null
  bio: string | null
  website: string | null
  isVerified: boolean
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  currency: string
  type: ProductType
  status: ProductStatus
  images: string[]
  downloadUrl: string | null
  userId: string
  categoryId: string | null
  createdAt: Date
  updatedAt: Date
}

export enum ProductType {
  DIGITAL = 'DIGITAL',
  PHYSICAL = 'PHYSICAL',
  SERVICE = 'SERVICE',
  COURSE = 'COURSE',
}

export enum ProductStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  id: string
  status: OrderStatus
  total: number
  currency: string
  paymentMethod: PaymentMethod
  paymentId: string | null
  userId: string
  items: OrderItem[]
  createdAt: Date
  updatedAt: Date
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

export enum PaymentMethod {
  STRIPE = 'STRIPE',
  MERCADO_PAGO = 'MERCADO_PAGO',
}

export interface OrderItem {
  id: string
  quantity: number
  price: number
  productId: string
  orderId: string
  product: Product
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
} 