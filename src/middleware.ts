import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    
    // Check for admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
      if (token?.role !== 'admin') {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }
    }

    // Check for API admin routes
    if (req.nextUrl.pathname.startsWith('/api/admin')) {
      if (token?.role !== 'admin') {
        return NextResponse.json(
          { error: 'Acesso negado' },
          { status: 403 }
        )
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // All protected routes require authentication
        if (req.nextUrl.pathname.startsWith('/admin') || 
            req.nextUrl.pathname.startsWith('/api/admin')) {
          return !!token && token.role === 'admin'
        }
        
        // Other protected routes just need authentication
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
    '/settings/:path*',
    '/admin/:path*',
    '/api/products/:path*',
    '/api/admin/:path*',
    '/api/user/:path*',
  ]
} 