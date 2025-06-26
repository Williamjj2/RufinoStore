import { Metadata } from "next";
import { Hero } from "@/components/landing/Hero";
import { SocialProof } from "@/components/landing/SocialProof";
import { Demo } from "@/components/landing/Demo";
import { Features } from "@/components/landing/Features";
import { Templates } from "@/components/landing/Templates";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { VideoSection } from "@/components/landing/VideoSection";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: "BubaStore - Venda Produtos Digitais no Instagram | Link na Bio Profissional",
  description: "Plataforma gratuita para creators venderem produtos digitais. Link na bio inteligente, pagamentos seguros, entrega automática. Melhor que Stan Store!",
  keywords: "vender no instagram, produtos digitais, link na bio, stan store brasil, beacons alternativa, loja digital instagram, creator economy brasil",
  authors: [{ name: "BubaStore" }],
  creator: "BubaStore",
  publisher: "BubaStore",
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
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://bubastore.com",
    siteName: "BubaStore",
    title: "BubaStore - Sua Loja Digital no Instagram",
    description: "Transforme seguidores em clientes em 5 minutos. Grátis para sempre!",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BubaStore - Plataforma de Vendas para Creators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BubaStore - Venda no Instagram como os Grandes Creators",
    description: "Plataforma gratuita para vender produtos digitais. 0 mensalidade, apenas 5% por venda.",
    images: ["/twitter-image.png"],
    creator: "@bubastore",
  },
  alternates: {
    canonical: "https://bubastore.com",
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
  },
};

export default function HomePage() {
  return (
    <>
      {/* Header */}
      <Header />
      
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <Hero />
        
        {/* Social Proof Bar */}
        <SocialProof />
        
        {/* Demo Section */}
        <section id="demo">
          <Demo />
        </section>
        
        {/* Features Grid */}
        <section id="features">
          <Features />
        </section>
        
        {/* Templates Showcase */}
        <section id="templates">
          <Templates />
        </section>
        
        {/* Testimonials */}
        <Testimonials />
        
        {/* Pricing */}
        <section id="pricing">
          <Pricing />
        </section>
        
        {/* How it Works Video */}
        <VideoSection />
        
        {/* FAQ */}
        <section id="faq">
          <FAQ />
        </section>
        
        {/* Final CTA */}
        <FinalCTA />
        
        {/* Footer */}
        <Footer />
      </main>
    </>
  );
} 