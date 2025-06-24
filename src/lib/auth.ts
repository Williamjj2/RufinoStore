import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from './db'

// Mock users for development without database
const mockUsers = [
  {
    id: '1',
    email: 'admin@rufino.com',
    password: 'admin123',
    name: 'Admin Rufino',
    role: 'admin'
  },
  {
    id: '2', 
    email: 'user@rufino.com',
    password: 'user123',
    name: 'Usuário Teste',
    role: 'user'
  },
  {
    id: '3',
    email: 'creator@rufino.com', 
    password: 'creator123',
    name: 'Creator Teste',
    role: 'creator'
  }
]

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // First try mock users (for development without DB)
          const mockUser = mockUsers.find(user => user.email === credentials.email)
          if (mockUser && credentials.password === mockUser.password) {
            return {
              id: mockUser.id,
              email: mockUser.email,
              name: mockUser.name,
              role: mockUser.role
            }
          }

          // Then try real database (if available)
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          })

          if (!user) {
            return null
          }

          const isValidPassword = await bcrypt.compare(credentials.password, user.password_hash)

          if (!isValidPassword) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: 'user'
          }
        } catch (error) {
          // If database is not available, fallback to mock users only
          console.log('Database not available, using mock authentication')
          const mockUser = mockUsers.find(user => user.email === credentials.email)
          if (mockUser && credentials.password === mockUser.password) {
            return {
              id: mockUser.id,
              email: mockUser.email,
              name: mockUser.name,
              role: mockUser.role
            }
          }
          return null
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.sub!
      session.user.role = token.role as string
      return session
    }
  },
  pages: {
    signIn: '/login'
  },
  debug: process.env.NODE_ENV === 'development'
} 