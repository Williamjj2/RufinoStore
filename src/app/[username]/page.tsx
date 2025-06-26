import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getUserProducts } from '@/lib/mock-data'
import { prisma } from '@/lib/db'
import { TEMPLATES, DEFAULT_SETTINGS } from '@/types/templates'
import { AuroraTemplate } from '@/components/templates/aurora/AuroraTemplate'
import { BentoTemplate } from '@/components/templates/bento/BentoTemplate'
import { SpotlightTemplate } from '@/components/templates/spotlight/SpotlightTemplate'
import { CanvasTemplate } from '@/components/templates/canvas/CanvasTemplate'
import { MinimalTemplate } from '@/components/templates/minimal/MinimalTemplate'
import UserStore from '@/components/public/UserStore'

interface PageProps {
  params: { username: string }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const user = await prisma.user.findUnique({
    where: { username: params.username },
    include: {
      products: {
        where: { is_active: true },
        orderBy: { created_at: "desc" },
        take: 1
      }
    }
  });

  if (!user) {
    return {
      title: "Loja não encontrada",
      description: "Esta loja não existe ou foi removida."
    };
  }

  const featuredProduct = user.products[0];
  const baseUrl = process.env.NEXTAUTH_URL || "https://bubastore.com";
  const storeUrl = `${baseUrl}/${user.username}`;
  
  return {
    title: `${user.name} - Loja Digital`,
    description: user.bio || `Confira os produtos digitais de ${user.name}`,
    keywords: [
      user.name,
      "loja digital",
      "produtos digitais",
      "criador de conteúdo",
      user.username
    ],
    authors: [{ name: user.name }],
    creator: user.name,
    publisher: "BubaStore",
    openGraph: {
      title: `${user.name} - Loja Digital`,
      description: user.bio || `Confira os produtos digitais de ${user.name}`,
      url: storeUrl,
      siteName: "BubaStore",
      images: [
        {
          url: user.avatar_url || "/default-avatar.jpg",
          width: 1200,
          height: 630,
          alt: `${user.name} - Loja Digital`,
        },
        ...(featuredProduct ? [{
          url: featuredProduct.cover_image_url || "/default-product.jpg",
          width: 1200,
          height: 630,
          alt: featuredProduct.title,
        }] : [])
      ],
      locale: "pt_BR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${user.name} - Loja Digital`,
      description: user.bio || `Confira os produtos digitais de ${user.name}`,
      creator: `@${user.username}`,
      images: [user.avatar_url || "/default-avatar.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_VERIFICATION,
    },
    alternates: {
      canonical: storeUrl,
    },
  };
}

export default async function UserStorePage({ params }: PageProps) {
  const { username } = params
  
  try {
    // Get user data from database
    let user;
    let products;
    
    try {
      // Fetch user and products from database
      user = await prisma.user.findUnique({
        where: { username: username },
        include: {
          products: {
            where: { is_active: true },
            orderBy: { created_at: 'desc' }
          }
        }
      });

      if (!user) {
        notFound()
      }

      products = user.products;
    } catch (error) {
      console.log('Database not available, falling back to mock data');
      // Fallback to mock data if database is not available
      const result = getUserProducts(username)
      if (!result) {
        notFound()
      }
      user = result.user;
      products = result.products;
    }

    // Get user store settings
    let storeSettings;
    try {
      storeSettings = await prisma.userStoreSettings.findFirst({
        where: {
          user: {
            username: username
          }
        }
      });
    } catch (error) {
      console.log('Database not available, using default settings');
      storeSettings = null;
    }

    // Use default settings if not found
    if (!storeSettings) {
      storeSettings = {
        template_id: DEFAULT_SETTINGS.template_id,
        primary_color: DEFAULT_SETTINGS.primary_color,
        accent_color: DEFAULT_SETTINGS.accent_color,
        background_color: DEFAULT_SETTINGS.background_color
      };
    }

    // Prepare template props
    const templateProps = {
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        bio: user.bio || '',
        avatar_url: user.avatar_url || ''
      },
      products: products.map((product: any) => ({
        id: product.id,
        title: product.title,
        description: product.description || '',
        price_brl: Number(product.price_brl || 0),
        price_usd: Number(product.price_usd || 0),
        cover_image_url: product.cover_image_url || product.cover_url,
        is_active: true
      })),
      settings: {
        primary_color: storeSettings.primary_color,
        accent_color: storeSettings.accent_color,
        background_color: storeSettings.background_color
      },
      salesCount: Math.floor(Math.random() * 100) + 10, // Mock sales count
      isPreview: false
    };

    // Render appropriate template
    switch (storeSettings.template_id) {
      case 'aurora':
        return <AuroraTemplate {...templateProps} />;
      case 'bento':
        return <BentoTemplate {...templateProps} />;
      case 'spotlight':
        return <SpotlightTemplate {...templateProps} />;
      case 'canvas':
        return <CanvasTemplate {...templateProps} />;
      case 'minimal':
        return <MinimalTemplate {...templateProps} />;
      default:
        // Fallback to original UserStore for minimal template or unknown templates
        const data = {
          user: user,
          products: products,
          total_products: products.length
        };
        return <UserStore initialData={data} />;
    }
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