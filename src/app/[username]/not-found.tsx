import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* 404 Illustration */}
        <div className="text-8xl mb-8">🔍</div>
        
        {/* Error Message */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Usuário não encontrado
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Este criador não existe ou ainda não publicou sua loja no RufinoStore.
        </p>
        
        {/* Action Buttons */}
        <div className="space-y-4">
          <Link 
            href="/"
            className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            🏠 Voltar ao início
          </Link>
          
          <Link 
            href="/register"
            className="inline-block w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            ✨ Criar minha loja
          </Link>
        </div>
        
        {/* Additional Info */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Está procurando por alguém específico?
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Verifique se o nome de usuário está correto na URL.
          </p>
        </div>
      </div>
    </div>
  )
} 