import Link from 'next/link'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Animation */}
        <div className="relative mb-8">
          <div className="text-8xl font-bold text-blue-100 select-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl animate-bounce">🔍</div>
          </div>
        </div>

        {/* Main Message */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Página não encontrada
        </h1>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          Oops! A página que você está procurando não existe ou foi movida. 
          Que tal navegar para uma dessas opções?
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link 
            href="/"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Voltar ao Início
          </Link>

          <Link 
            href="/dashboard"
            className="w-full bg-white hover:bg-gray-50 text-gray-900 px-6 py-3 rounded-lg font-medium border border-gray-300 transition-colors inline-flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Ir para Dashboard
          </Link>

          <Link 
            href="/register"
            className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            Criar Minha Loja
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Se você acredita que isso é um erro, entre em contato conosco em{' '}
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