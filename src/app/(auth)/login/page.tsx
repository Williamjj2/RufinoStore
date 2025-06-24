import Link from 'next/link'
import { LoginForm } from '@/components/auth/LoginForm'

export default function LoginPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string }
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Faça login na sua conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ou{' '}
            <Link
              href="/register"
              className="font-medium text-primary hover:text-primary/90"
            >
              registre-se aqui
            </Link>
          </p>
        </div>

        {/* Mock Users Info for Development */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <h3 className="text-sm font-medium text-yellow-800 mb-2">
            🚧 Modo Desenvolvimento - Usuários de Teste:
          </h3>
          <div className="text-xs text-yellow-700 space-y-1">
            <div><strong>Admin:</strong> admin@rufino.com / admin123</div>
            <div><strong>Usuário:</strong> user@rufino.com / user123</div>
            <div><strong>Creator:</strong> creator@rufino.com / creator123</div>
          </div>
        </div>

        <LoginForm callbackUrl={searchParams.callbackUrl} />
      </div>
    </div>
  )
} 