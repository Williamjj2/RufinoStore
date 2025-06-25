import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SessionProvider } from '@/components/auth/SessionProvider'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { LogoutButton } from '@/components/auth/LogoutButton'
import QueryProvider from '@/components/providers/QueryProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RufinoStore - Plataforma para Criadores Digitais',
  description: 'Venda seus produtos e serviços digitais de forma simples e eficiente',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <QueryProvider>
          <SessionProvider>
            {session && (
              <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between h-16">
                    <div className="flex items-center">
                      <a href="/dashboard" className="text-xl font-bold text-gray-900">
                        RufinoStore
                      </a>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">
                        Olá, {session.user.name}
                      </span>
                      <LogoutButton />
                    </div>
                  </div>
                </div>
              </nav>
            )}
            {children}
          </SessionProvider>
        </QueryProvider>
      </body>
    </html>
  )
} 