import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  // Sample creators for showcase
  const featuredCreators = [
    {
      username: 'mariafernanda',
      name: 'Maria Fernanda',
      bio: 'Designer UX/UI e criadora de conteúdo digital',
      avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
      products_count: 2
    },
    {
      username: 'bubarufino',
      name: 'Buba Rufino',
      bio: 'Especialista em marketing digital e vendas online',
      avatar_url: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=200&h=200&fit=crop&crop=face',
      products_count: 2
    },
    {
      username: 'joaosilva',
      name: 'João Silva',
      bio: 'Desenvolvedor apaixonado por tecnologia',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      products_count: 1
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold text-blue-600">🏪</div>
              <span className="text-xl font-bold text-gray-900">RufinoStore</span>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                href="/login"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Entrar
              </Link>
              <Link 
                href="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Criar Loja
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Sua Loja Digital
            <span className="block text-blue-600">Pronta em Minutos</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Crie sua loja online para vender produtos digitais de forma simples e profissional. 
            Sem complicações, sem mensalidades, só você e seus clientes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors inline-flex items-center justify-center gap-2"
            >
              🚀 Começar Agora
            </Link>
            <a 
              href="#examples"
              className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg border border-gray-300 transition-colors inline-flex items-center justify-center gap-2"
            >
              👀 Ver Exemplos
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-600">Gratuito para começar</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">5min</div>
              <div className="text-gray-600">Para criar sua loja</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">∞</div>
              <div className="text-gray-600">Produtos ilimitados</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tudo que você precisa para vender
            </h2>
            <p className="text-xl text-gray-600">
              Funcionalidades pensadas para criadores digitais
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Design Profissional</h3>
              <p className="text-gray-600">Sua loja com visual moderno e responsivo automaticamente</p>
            </div>
            
            <div className="text-center p-6">
              <div className="text-4xl mb-4">💳</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Pagamentos Seguros</h3>
              <p className="text-gray-600">Integração com Stripe e Mercado Pago para máxima segurança</p>
            </div>
            
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Mobile First</h3>
              <p className="text-gray-600">Perfeita em qualquer dispositivo, do celular ao desktop</p>
            </div>
            
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Entrega Automática</h3>
              <p className="text-gray-600">Seus produtos são entregues automaticamente após o pagamento</p>
            </div>
            
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics Completo</h3>
              <p className="text-gray-600">Acompanhe suas vendas e performance em tempo real</p>
            </div>
            
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🌎</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">SEO Otimizado</h3>
              <p className="text-gray-600">Sua loja será encontrada facilmente no Google</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Creators Section */}
      <section id="examples" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Criadores que já estão vendendo
            </h2>
            <p className="text-xl text-gray-600">
              Veja exemplos reais de lojas criadas com RufinoStore
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCreators.map((creator) => (
              <Link 
                key={creator.username}
                href={`/${creator.username}`}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group"
              >
                <div className="text-center">
                  <div className="relative w-16 h-16 mx-auto mb-4">
                    <Image
                      src={creator.avatar_url}
                      alt={creator.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {creator.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {creator.bio}
                  </p>
                  
                  <div className="flex justify-center items-center gap-4 text-sm text-gray-500">
                    <span>{creator.products_count} produtos</span>
                    <span>•</span>
                    <span className="text-blue-600 font-medium">Ver loja →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para começar a vender?
          </h2>
          
          <p className="text-xl text-blue-100 mb-8">
            Crie sua loja em minutos e comece a monetizar seu conhecimento hoje mesmo.
          </p>

          <Link 
            href="/register"
            className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg transition-colors inline-flex items-center justify-center gap-2"
          >
            ✨ Criar Minha Loja Grátis
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="text-2xl font-bold text-blue-600">🏪</div>
              <span className="text-xl font-bold text-gray-900">RufinoStore</span>
            </div>
            
            <p className="text-gray-600 mb-6">
              A plataforma brasileira para criadores digitais
            </p>
            
            <div className="flex justify-center gap-8 text-sm text-gray-500">
              <Link href="/login" className="hover:text-gray-900">Entrar</Link>
              <Link href="/register" className="hover:text-gray-900">Registrar</Link>
              <a href="mailto:contato@rufinostore.com" className="hover:text-gray-900">Contato</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 