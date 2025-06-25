import { Suspense } from 'react'
import Link from 'next/link'
import { getProductById } from '@/lib/mock-data'

function SuccessContent() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Pagamento Aprovado! 🎉
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Sua compra foi processada com sucesso pelo Mercado Pago.
        </p>

        {/* Email Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-3">
            <span className="text-blue-600 text-2xl">📧</span>
            <div className="text-left">
              <h3 className="font-semibold text-blue-900 mb-2">
                Verifique seu email
              </h3>
              <div className="text-sm text-blue-800 space-y-1">
                <p>• Link de download enviado automaticamente</p>
                <p>• O link expira em 48 horas</p>
                <p>• Faça o download imediatamente</p>
                <p>• Guarde o produto em local seguro</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
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

        {/* Support Info */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Não recebeu o email? Verifique sua caixa de spam.
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Problemas? Entre em contato conosco.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <SuccessContent />
    </Suspense>
  )
} 