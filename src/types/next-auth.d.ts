import { DefaultSession, DefaultUser } from 'next-auth'
import { JWT, DefaultJWT } from 'next-auth/jwt'
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: string
      username?: string
      bio?: string
      phone?: string
      avatar_url?: string
      stripe_account_id?: string
      mercadopago_access_token?: string
    }
  }

  interface User {
    id: string
    email: string
    name: string
    role: string
    username?: string
    bio?: string
    phone?: string
    avatar_url?: string
    stripe_account_id?: string
    mercadopago_access_token?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    username: string
    role: string
  }
} 