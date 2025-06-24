import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    // Token existe, permitir acesso
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Verificar se o usuário está autenticado
        return !!token
      }
    },
    pages: {
      signIn: '/login',
    }
  }
)

// Configurar rotas protegidas
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/products/:path*',
    '/admin/:path*',
    '/api/products/:path*',
    '/api/admin/:path*',
  ]
} 