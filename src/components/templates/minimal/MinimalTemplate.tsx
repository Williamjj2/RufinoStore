"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckoutModal } from "@/components/public/CheckoutModal";
import { TemplateProps } from "@/types/templates";
import { ShareButtons } from "@/components/common/ShareButtons";
import { useSocialAnalytics } from "@/hooks/useSocialAnalytics";

export function MinimalTemplate({ user, products, settings, salesCount = 0 }: TemplateProps) {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Social Analytics Hook
  const { trackProductView, trackPurchase } = useSocialAnalytics({
    username: user.username
  });

  const handleBuyClick = (product: any) => {
    setSelectedProduct(product);
    setIsCheckoutOpen(true);
    trackProductView(product.id);
  };

  const handlePurchaseConfirm = (product: any) => {
    trackPurchase(product.id, product.price_brl);
    setIsCheckoutOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Hero Section with Background Image - Stan Store Style */}
        <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <Image
              src={user.avatar_url || "/placeholder-avatar.jpg"}
              alt={user.name}
              fill
              className="object-cover object-center"
              priority
              quality={90}
            />
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              {/* Avatar Circle */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mb-6 inline-block"
              >
                <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-2xl">
                  <Image
                    src={user.avatar_url || "/placeholder-avatar.jpg"}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              {/* Name and Bio */}
              <h1 className="mb-4 text-5xl font-bold text-white drop-shadow-lg md:text-6xl">
                {user.name}
              </h1>
              <p className="mb-6 text-xl text-white/90 drop-shadow-md md:text-2xl">
                {user.bio}
              </p>

              {/* Social Proof */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="inline-flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 backdrop-blur-md"
              >
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                <span className="text-sm font-medium text-white">
                  {salesCount}+ clientes satisfeitos
                </span>
              </motion.div>

              {/* Share Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-6"
              >
                <ShareButtons
                  url={typeof window !== 'undefined' ? window.location.href : ''}
                  title={`Confira a loja de ${user.name}`}
                  description={user.bio || `Produtos digitais de qualidade de ${user.name}`}
                  username={user.username}
                  className="justify-center"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm text-white/80">Conheça meus produtos</span>
              <svg
                className="h-6 w-6 animate-bounce text-white/80"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Products Section */}
        <div className="mx-auto max-w-6xl px-4 py-20">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Produtos Disponíveis
            </h2>
            <p className="text-lg text-gray-600">
              Transforme seu conhecimento com nossos materiais exclusivos
            </p>
          </motion.div>

          {/* Products Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                {/* Product Image */}
                <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={product.cover_image_url || "/placeholder-product.jpg"}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-gray-900 line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="mb-4 text-sm text-gray-600 line-clamp-3">
                    {product.description}
                  </p>

                  {/* Price and Button */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        R$ {product.price_brl.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        USD ${product.price_usd.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleBuyClick(product)}
                      className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${settings.primary_color}, ${settings.accent_color})`,
                      }}
                    >
                      Comprar
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-gray-50 py-12">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <p className="mb-2 text-sm text-gray-600">
              © {new Date().getFullYear()} {user.name}. Todos os direitos reservados.
            </p>
            <p className="text-sm text-gray-500">
              Powered by{" "}
              <span className="font-semibold text-gray-700">RufinoStore</span>
            </p>
          </div>
        </footer>
      </div>

      {/* Checkout Modal */}
      {selectedProduct && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => {
            setIsCheckoutOpen(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
          onConfirmPurchase={() => handlePurchaseConfirm(selectedProduct)}
        />
      )}
    </>
  );
} 