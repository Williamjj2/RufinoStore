"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckoutModal } from "@/components/public/CheckoutModal";
import { TemplateProps } from "@/types/templates";
import { Spotlight } from "@/components/ui/aceternity/spotlight";
import { TypewriterEffect } from "@/components/ui/aceternity/typewriter-effect";
import { ShareButtons } from "@/components/common/ShareButtons";
import { useSocialAnalytics } from "@/hooks/useSocialAnalytics";

export function SpotlightTemplate({ user, products, settings, salesCount = 0 }: TemplateProps) {
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

  const words = [
    { text: "Criador" },
    { text: "Digital" },
    { text: "Expert" },
    { text: "em" },
    { text: "Resultados", className: "text-blue-500 dark:text-blue-500" },
  ];

  return (
    <>
      <div className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        {/* Spotlights */}
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
        <Spotlight className="top-10 left-full h-[80vh] w-[50vw]" fill="purple" />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />

        {/* Hero Section */}
        <div className="relative z-10 w-full pt-20 md:pt-0">
          <div className="mx-auto max-w-7xl px-4 h-screen flex items-center">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left Content */}
              <div className="flex-1 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="mb-8">
                    <div className="relative inline-block">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                        <Image
                          src={user.avatar_url || "/placeholder-avatar.jpg"}
                          alt={user.name}
                          width={128}
                          height={128}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                    </div>
                  </div>

                  <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 mb-6">
                    {user.name}
                  </h1>

                  <TypewriterEffect words={words} />

                  <p className="mt-6 text-lg md:text-xl text-neutral-300 max-w-lg mx-auto lg:mx-0">
                    {user.bio}
                  </p>

                  {/* Social Proof */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    className="mt-8 inline-flex items-center gap-3 bg-white/5 backdrop-blur-lg rounded-full px-6 py-3 border border-white/10"
                  >
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-white/90 font-medium">
                      {salesCount}+ transformações realizadas
                    </span>
                  </motion.div>

                  {/* Share Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 0.5 }}
                    className="mt-8"
                  >
                    <ShareButtons
                      url={typeof window !== 'undefined' ? window.location.href : ''}
                      title={`Confira a loja de ${user.name}`}
                      description={user.bio || `Produtos digitais de qualidade de ${user.name}`}
                      username={user.username}
                      className="justify-center lg:justify-start"
                    />
                  </motion.div>
                </motion.div>
              </div>

              {/* Right Content - Featured Product */}
              {products.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="flex-1 max-w-md"
                >
                  <div className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative bg-black border border-white/10 rounded-lg p-6">
                      <div className="relative h-64 rounded-lg overflow-hidden mb-6">
                        <Image
                          src={products[0].cover_image_url || "/placeholder-product.jpg"}
                          alt={products[0].title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute top-4 right-4 bg-green-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                          DESTAQUE
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-3">
                        {products[0].title}
                      </h3>
                      
                      <p className="text-neutral-300 text-sm mb-4 line-clamp-3">
                        {products[0].description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-2xl font-bold text-white">
                            R$ {products[0].price_brl.toFixed(2)}
                          </p>
                          <p className="text-sm text-neutral-400">
                            USD ${products[0].price_usd.toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={() => handleBuyClick(products[0])}
                          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200"
                        >
                          Comprar Agora
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 1 && (
          <div className="relative z-10 py-20">
            <div className="mx-auto max-w-7xl px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold text-white mb-4">
                  Todos os Produtos
                </h2>
                <p className="text-neutral-300 text-lg">
                  Transforme sua vida com nossos materiais exclusivos
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.slice(1).map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative bg-black border border-white/10 rounded-lg p-6 h-full flex flex-col">
                      <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                        <Image
                          src={product.cover_image_url || "/placeholder-product.jpg"}
                          alt={product.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      
                      <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                        {product.title}
                      </h3>
                      
                      <p className="text-neutral-400 text-sm mb-4 flex-1 line-clamp-3">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-bold text-white">
                            R$ {product.price_brl.toFixed(2)}
                          </p>
                          <p className="text-xs text-neutral-400">
                            USD ${product.price_usd.toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={() => handleBuyClick(product)}
                          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all duration-200 backdrop-blur-sm border border-white/10"
                        >
                          Comprar
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="relative z-10 border-t border-white/10 bg-black/50 backdrop-blur-sm py-12">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <p className="text-neutral-400 mb-2">
              © {new Date().getFullYear()} {user.name}. Todos os direitos reservados.
            </p>
            <p className="text-neutral-500 text-sm">
              Powered by{" "}
              <span className="font-semibold text-neutral-300">RufinoStore</span>
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