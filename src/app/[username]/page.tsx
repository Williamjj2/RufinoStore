import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getUserProducts } from '@/lib/mock-data'
import UserStore from '@/components/public/UserStore'

interface PageProps {
  params: { username: string }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = params
  
  try {
    // Use mock data directly instead of API call for now
    const result = getUserProducts(username)

    if (!result) {
      return {
        title: 'Usuário não encontrado - RufinoStore',
        description: 'Este usuário não foi encontrado na plataforma RufinoStore.'
      }
    }

    const { user, products } = result

    return {
      title: `${user.name} - Produtos Digitais | RufinoStore`,
      description: user.bio || `Confira os produtos digitais de ${user.name}. ${products.length} produtos disponíveis.`,
      openGraph: {
        title: `Loja de ${user.name}`,
        description: user.bio || `Confira os produtos digitais de ${user.name}`,
        images: user.avatar_url ? [user.avatar_url] : [],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `Loja de ${user.name}`,
        description: user.bio || `Confira os produtos digitais de ${user.name}`,
        images: user.avatar_url ? [user.avatar_url] : [],
      }
    }
  } catch (error) {
    return {
      title: 'Erro - RufinoStore',
      description: 'Ocorreu um erro ao carregar esta página.'
    }
  }
}

export default async function UserStorePage({ params }: PageProps) {
  const { username } = params
  
  try {
    // Use mock data directly for now to avoid API call issues
    const result = getUserProducts(username)

    if (!result) {
      notFound()
    }

    const data = {
      user: result.user,
      products: result.products,
      total_products: result.products.length
    }

    return <UserStore initialData={data} />
  } catch (error) {
    console.error('Error in UserStorePage:', error)
    notFound()
  }
}

// Generate static params for known users (optional optimization)
export async function generateStaticParams() {
  // Return the mock usernames
  return [
    { username: 'admin' },
    { username: 'joaosilva' },
    { username: 'mariafernanda' },
    { username: 'bubarufino' },
  ]
} 