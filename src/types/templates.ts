export interface StoreTemplate {
  id: string
  name: string
  description: string
  preview: string
  features: string[]
  idealFor: string[]
  colors: {
    primary: string
    accent: string
    background: string
  }
}

export interface UserStoreSettings {
  id?: string
  user_id: string
  template_id: string
  primary_color: string
  accent_color: string
  background_color: string
  custom_css?: string
  created_at?: Date
  updated_at?: Date
}

export interface TemplateProps {
  user: {
    id: string
    name: string
    username: string
    bio?: string
    avatar_url?: string
  }
  products: Array<{
    id: string
    title: string
    description: string
    price_brl: number
    price_usd: number
    cover_image_url: string
    is_active: boolean
  }>
  settings: {
    primary_color: string
    accent_color: string
    background_color: string
  }
  salesCount?: number
  isPreview?: boolean
}

export const TEMPLATES: Record<string, StoreTemplate> = {
  aurora: {
    id: 'aurora',
    name: 'Aurora Dreams',
    description: 'Efeitos visuais deslumbrantes com aurora boreal e glassmorphism',
    preview: '/templates/aurora-preview.jpg',
    features: ['Aurora Background', 'Glassmorphism', 'Floating Cards', 'Smooth Animations'],
    idealFor: ['Produtos Premium', 'Cursos Online', 'Arte Digital', 'Mentorias'],
    colors: {
      primary: '#8B5CF6',
      accent: '#06B6D4',
      background: '#0F0F23'
    }
  },
  bento: {
    id: 'bento',
    name: 'Bento Grid',
    description: 'Layout moderno em grid com efeitos hover e revelação',
    preview: '/templates/bento-preview.jpg',
    features: ['Bento Grid', 'Hover Effects', 'Sticky Scroll', 'Dynamic Cards'],
    idealFor: ['Múltiplos Produtos', 'Portfolios', 'Templates', 'Recursos'],
    colors: {
      primary: '#3B82F6',
      accent: '#10B981',
      background: '#FFFFFF'
    }
  },
  spotlight: {
    id: 'spotlight',
    name: 'Spotlight Focus',
    description: 'Foco total no produto com efeitos 3D e spotlight',
    preview: '/templates/spotlight-preview.jpg',
    features: ['Spotlight Effect', '3D Cards', 'Typewriter Text', 'Magnetic Buttons'],
    idealFor: ['Produto Único', 'Lançamentos', 'E-books', 'Infoprodutos'],
    colors: {
      primary: '#F59E0B',
      accent: '#EF4444',
      background: '#111827'
    }
  },
  canvas: {
    id: 'canvas',
    name: 'Creative Canvas',
    description: 'Design criativo com formas morphing e animações interativas',
    preview: '/templates/canvas-preview.jpg',
    features: ['Canvas Effects', 'Morphing Shapes', 'Interactive Elements', 'Creative Typography'],
    idealFor: ['Creators', 'Designers', 'Artistas', 'Produtos Visuais'],
    colors: {
      primary: '#EC4899',
      accent: '#8B5CF6',
      background: '#1F2937'
    }
  },
  minimal: {
    id: 'minimal',
    name: 'Minimal Luxe',
    description: 'Design elegante e minimalista para marcas premium',
    preview: '/templates/minimal-preview.jpg',
    features: ['Clean Design', 'Elegant Typography', 'Subtle Animations', 'Premium Feel'],
    idealFor: ['Consultoria', 'High-ticket', 'Marca Pessoal', 'Serviços Premium'],
    colors: {
      primary: '#000000',
      accent: '#6B7280',
      background: '#FAFAFA'
    }
  }
}

export const DEFAULT_SETTINGS: Omit<UserStoreSettings, 'id' | 'user_id'> = {
  template_id: 'minimal',
  primary_color: '#000000',
  accent_color: '#3B82F6',
  background_color: '#FFFFFF'
} 