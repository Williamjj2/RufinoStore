"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aceternity/aurora-background";
import { FloatingCard } from "@/components/ui/aceternity/floating-card";
import { GlowingButton } from "@/components/ui/aceternity/glowing-button";
import { CheckoutModal } from "@/components/public/CheckoutModal";
import { TemplateProps } from "@/types/templates";
import { useState } from "react";
import { ShareButtons } from "@/components/common/ShareButtons";
import { useSocialAnalytics } from "@/hooks/useSocialAnalytics";

interface AuroraTemplateProps extends TemplateProps {}

export function AuroraTemplate({ user, products, settings, salesCount = 0 }: AuroraTemplateProps) {
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
      <AuroraBackground className="dark" showRadialGradient={false}>
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-20">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {user.avatar_url && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="inline-block mb-6"
              >
                <div className="relative w-24 h-24 mx-auto">
                  <Image
                    src={user.avatar_url}
                    alt={user.name}
                    fill
                    className="rounded-full border-4 border-white/20 shadow-2xl object-cover"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-400/20 to-cyan-400/20" />
                </div>
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-5xl md:text-7xl font-bold text-white mb-4"
              style={{ 
                background: `linear-gradient(45deg, ${settings.primary_color}, ${settings.accent_color})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              {user.name}
            </motion.h1>

            {user.bio && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 1 }}
                className="text-xl text-white/80 max-w-2xl mx-auto"
              >
                {user.bio}
              </motion.p>
            )}

            {salesCount > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-white/10 backdrop-blur rounded-full border border-white/20"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white/90 text-sm font-medium">
                  {salesCount}+ vendas realizadas
                </span>
              </motion.div>
            )}

            {/* Share Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="mt-8"
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

          {/* Products Grid */}
          {products.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {products.map((product, index) => (
                <FloatingCard key={product.id} delay={1.2 + index * 0.1}>
                  <div className="space-y-4">
                    {product.cover_image_url && (
                      <div className="relative w-full h-48 rounded-xl overflow-hidden">
                        <Image
                          src={product.cover_image_url}
                          alt={product.title}
                          fill
                          className="object-cover group-hover/card:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </div>
                    )}

                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-white">
                        {product.title}
                      </h3>
                      
                      {product.description && (
                        <p className="text-white/70 text-sm line-clamp-3">
                          {product.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-white">
                            R$ {Number(product.price_brl).toFixed(2)}
                          </div>
                          {product.price_usd && (
                            <div className="text-sm text-white/60">
                              USD ${Number(product.price_usd).toFixed(2)}
                            </div>
                          )}
                        </div>

                        <GlowingButton
                          onClick={() => handleBuyClick(product)}
                          glowColor={settings.accent_color}
                          className="shrink-0"
                        >
                          Comprar
                        </GlowingButton>
                      </div>
                    </div>
                  </div>
                </FloatingCard>
              ))}
            </motion.div>
          )}

          {products.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-center py-20"
            >
              <FloatingCard className="max-w-md mx-auto">
                <div className="text-white/80">
                  <h3 className="text-xl font-semibold mb-2">Em breve...</h3>
                  <p>Produtos incríveis estão sendo preparados para você!</p>
                </div>
              </FloatingCard>
            </motion.div>
          )}

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="text-center mt-20 pt-8 border-t border-white/10"
          >
            <p className="text-white/60 text-sm">
              Powered by{" "}
              <span className="font-semibold text-white/80">RufinoStore</span>
            </p>
          </motion.div>
        </div>
      </AuroraBackground>

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