'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home, MessageCircle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-12 h-12 text-red-500" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Main Message */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Algo deu errado!
        </h1>
        
        <p className="text-gray-600 mb-2 leading-relaxed">
          Ocorreu um erro inesperado. Nossa equipe foi notificada e está trabalhando para resolver o problema.
        </p>

        {/* Error Details (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="my-6 p-4 bg-gray-100 rounded-lg text-left">
            <h3 className="font-medium text-gray-900 mb-2">Detalhes do erro:</h3>
            <pre className="text-xs text-gray-600 overflow-x-auto">
              {error.message}
            </pre>
            {error.digest && (
              <p className="text-xs text-gray-500 mt-2">
                ID do erro: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-4 mt-8">
          <button
            onClick={reset}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Tentar Novamente
          </button>

          <Link 
            href="/"
            className="w-full bg-white hover:bg-gray-50 text-gray-900 px-6 py-3 rounded-lg font-medium border border-gray-300 transition-colors inline-flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Voltar ao Início
          </Link>

          <Link 
            href="/dashboard"
            className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Ir para Dashboard
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Se o problema persistir, entre em contato em{' '}
            <a 
              href="mailto:suporte@rufinostore.com" 
              className="text-blue-600 hover:underline font-medium"
            >
              suporte@rufinostore.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
} 