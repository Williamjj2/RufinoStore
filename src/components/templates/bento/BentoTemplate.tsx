"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckoutModal } from "@/components/public/CheckoutModal";
import { TemplateProps } from "@/types/templates";
import { ShareButtons } from "@/components/common/ShareButtons";
import { useSocialAnalytics } from "@/hooks/useSocialAnalytics";

export function BentoTemplate({ user, products, settings, salesCount = 0 }: TemplateProps) {
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
      {/* Clean Background - Stan Store Style */}
      <div className="min-h-screen bg-white">
        {/* Simple Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-3 border-white/20 shadow-xl">
                <Image
                  src={user.avatar_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* User Info */}
              <div>
                <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                <p className="text-blue-100 text-lg max-w-2xl">{user.bio}</p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="bg-white/20 rounded-full px-3 py-1 text-sm">
                    🎯 {salesCount}+ vendas
                  </span>
                  <span className="bg-white/20 rounded-full px-3 py-1 text-sm">
                    📦 {products.length} produtos
                  </span>
                </div>
                
                {/* Share Buttons */}
                <div className="mt-4">
                  <ShareButtons
                    url={typeof window !== 'undefined' ? window.location.href : ''}
                    title={`Confira a loja de ${user.name}`}
                    description={user.bio || `Produtos digitais de qualidade de ${user.name}`}
                    username={user.username}
                    className="justify-start"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bento Grid Section */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Produtos Disponíveis
          </h2>

          {/* Responsive Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {products.map((product, index) => {
              // Create varied grid layouts for visual interest
              const isLarge = index === 0 || (index % 4 === 0 && index > 0);
              const gridClass = isLarge 
                ? "md:col-span-2 md:row-span-2" 
                : index % 3 === 1 
                  ? "md:row-span-2" 
                  : "";

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 ${gridClass}`}
                >
                  {/* Product Image */}
                  <div className={`relative overflow-hidden ${isLarge ? 'h-64' : 'h-48'}`}>
                    <Image
                      src={product.cover_image_url || "https://images.unsplash.com/photo-1606191617077-ee27643c9b60?w=500&h=400&fit=crop"}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-lg">
                      <span className="text-sm font-semibold text-gray-900">
                        R$ {product.price_brl.toFixed(0)}
                      </span>
                    </div>
                  </div>

                  {/* Product Content */}
                  <div className={`p-6 ${isLarge ? 'space-y-4' : 'space-y-3'}`}>
                    <h3 className={`font-bold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors ${isLarge ? 'text-2xl' : 'text-lg'}`}>
                      {product.title}
                    </h3>
                    
                    <p className={`text-gray-600 ${isLarge ? 'text-base line-clamp-4' : 'text-sm line-clamp-3'}`}>
                      {product.description}
                    </p>

                    {/* Action Section */}
                    <div className={`flex items-center justify-between pt-2 ${isLarge ? 'pt-4' : ''}`}>
                      <div>
                        <div className={`font-bold text-gray-900 ${isLarge ? 'text-2xl' : 'text-xl'}`}>
                          R$ {product.price_brl.toFixed(2).replace('.', ',')}
                        </div>
                        <div className="text-sm text-gray-500">
                          USD ${product.price_usd.toFixed(2)}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleBuyClick(product)}
                        className={`bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl ${isLarge ? 'px-8 py-4 text-lg' : 'px-6 py-3'}`}
                      >
                        Comprar
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Promotional Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: products.length * 0.1, duration: 0.5 }}
              className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl shadow-lg text-white p-8 flex flex-col justify-center text-center"
            >
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-3">Transforme Sua Vida</h3>
              <p className="text-indigo-100 mb-6">
                Junte-se a {salesCount}+ pessoas que já alcançaram seus objetivos
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-sm">
                  <span>✅</span>
                  <span>Suporte Premium</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <span>✅</span>
                  <span>Resultados Garantidos</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <span>✅</span>
                  <span>Acesso Vitalício</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-gray-50 rounded-2xl p-8">
              <div className="text-3xl font-bold text-indigo-600 mb-2">{salesCount}+</div>
              <div className="text-gray-600">Vendas Realizadas</div>
            </div>
            <div className="text-center bg-gray-50 rounded-2xl p-8">
              <div className="text-3xl font-bold text-indigo-600 mb-2">{products.length}</div>
              <div className="text-gray-600">Produtos Disponíveis</div>
            </div>
            <div className="text-center bg-gray-50 rounded-2xl p-8">
              <div className="text-3xl font-bold text-indigo-600 mb-2">4.9★</div>
              <div className="text-gray-600">Avaliação Média</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="text-center">
              <p className="text-gray-500 text-sm">
                Powered by <span className="font-semibold text-gray-700">RufinoStore</span>
              </p>
            </div>
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