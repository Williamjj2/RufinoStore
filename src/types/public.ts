// Shared types for public store components

export interface PublicUser {
  id: string
  name: string
  username: string
  bio: string
  avatar_url: string
}

export interface PublicProduct {
  id: string
  title: string
  description: string
  long_description: string
  price_brl: number
  price_usd: number
  cover_url: string
  file_type: string
  file_size: number
  created_at: string
  updated_at?: string
}

export interface UserStoreData {
  user: PublicUser
  products: PublicProduct[]
  total_products: number
}

export interface CheckoutData {
  product: PublicProduct
  currency: 'BRL' | 'USD'
  buyer: {
    name: string
    email: string
  }
}

export type Currency = 'BRL' | 'USD' 