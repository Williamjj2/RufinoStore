"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GlowingButton } from "@/components/ui/aceternity/glowing-button";
import { CheckoutModal } from "@/components/public/CheckoutModal";
import { TemplateProps } from "@/types/templates";
import { ShareButtons } from "@/components/common/ShareButtons";
import { useSocialAnalytics } from "@/hooks/useSocialAnalytics";

export function CanvasTemplate({ user, products, settings, salesCount = 0 }: TemplateProps) {
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
      <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: settings.background_color }}>
        {/* Animated Background */}
        <div className="absolute inset-0">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="canvasGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={settings.primary_color} stopOpacity="0.1" />
                <stop offset="100%" stopColor={settings.accent_color} stopOpacity="0.05" />
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#canvasGradient)" />
            
            {/* Animated Shapes */}
            <motion.circle
              cx="200"
              cy="200"
              r="100"
              fill={settings.accent_color}
              fillOpacity="0.1"
              animate={{
                cx: [200, 300, 200],
                cy: [200, 150, 200],
                r: [100, 120, 100],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.rect
              x="700"
              y="400"
              width="150"
              height="150"
              fill={settings.primary_color}
              fillOpacity="0.1"
              animate={{
                rotate: [0, 180, 360],
                x: [700, 750, 700],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </svg>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-20">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            {user.avatar_url && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="inline-block mb-8"
              >
                <div className="relative w-32 h-32 mx-auto">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 animate-pulse" />
                  <Image
                    src={user.avatar_url}
                    alt={user.name}
                    fill
                    className="rounded-full object-cover border-4 border-white shadow-2xl"
                    style={{ 
                      transform: "translate(8px, 8px)"
                    }}
                  />
                </div>
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold mb-6"
              style={{ 
                background: `linear-gradient(45deg, ${settings.primary_color}, ${settings.accent_color})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent"
              }}
            >
              {user.name}
            </motion.h1>

            {user.bio && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light"
              >
                {user.bio}
              </motion.p>
            )}

            {salesCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="inline-flex items-center gap-3 mt-8 px-6 py-3 bg-white/20 backdrop-blur-lg rounded-full border border-white/30"
              >
                <motion.div
                  className="w-4 h-4 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {salesCount}+ criações vendidas
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

          {/* Products Gallery */}
          {products.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50, rotate: -5 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -10, rotate: 2, scale: 1.02 }}
                  className="group relative"
                >
                  <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/50 overflow-hidden">
                    {/* Decorative gradient */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500" />
                    
                    {product.cover_image_url && (
                      <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-6">
                        <Image
                          src={product.cover_image_url}
                          alt={product.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </div>
                    )}

                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                        {product.title}
                      </h3>
                      
                      {product.description && (
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {product.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-4">
                        <div>
                          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                            R$ {Number(product.price_brl).toFixed(2)}
                          </div>
                          {product.price_usd && (
                            <div className="text-sm text-gray-500">
                              USD ${Number(product.price_usd).toFixed(2)}
                            </div>
                          )}
                        </div>

                        <GlowingButton
                          onClick={() => handleBuyClick(product)}
                          glowColor={settings.accent_color}
                          className="shrink-0"
                        >
                          ✨ Comprar
                        </GlowingButton>
                      </div>
                    </div>
                  </div>
                </motion.div>
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
              <div className="max-w-md mx-auto p-8 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50">
                <div className="text-6xl mb-6">🎨</div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  Obras em Criação...
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Criações incríveis estão sendo desenvolvidas. Volte em breve!
                </p>
              </div>
            </motion.div>
          )}

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="text-center mt-20 pt-8 border-t border-gray-300 dark:border-gray-700"
          >
            <p className="text-gray-500 dark:text-gray-400">
              Powered by{" "}
              <span className="font-semibold" style={{ color: settings.accent_color }}>
                RufinoStore
              </span>
            </p>
          </motion.div>
        </div>
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