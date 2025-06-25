import { Suspense } from 'react'
import Link from 'next/link'

function FailureContent() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        {/* Error Icon */}
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Pagamento não processado
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Algo deu errado com seu pagamento. Tente novamente.
        </p>

        {/* Possible Reasons */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <div className="text-left">
            <h3 className="font-semibold text-yellow-900 mb-3">
              Possíveis motivos:
            </h3>
            <div className="text-sm text-yellow-800 space-y-2">
              <p>• Cartão sem limite disponível</p>
              <p>• Dados incorretos do cartão</p>
              <p>• Problema de conexão</p>
              <p>• Pagamento cancelado pelo usuário</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <button 
            onClick={() => window.history.back()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            🔄 Tentar novamente
          </button>
          
          <Link 
            href="/"
            className="inline-block w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            🏠 Voltar ao início
          </Link>
        </div>

        {/* Support Info */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-2">
            Precisa de ajuda?
          </h4>
          <p className="text-sm text-gray-500">
            Entre em contato conosco e resolveremos rapidamente.
          </p>
          <div className="mt-4 space-y-2">
            <p className="text-sm">
              📧 suporte@rufinostore.com
            </p>
            <p className="text-sm">
              💬 WhatsApp: (11) 99999-9999
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PaymentFailurePage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <FailureContent />
    </Suspense>
  )
} 