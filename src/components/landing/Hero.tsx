"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "@/components/ui/aceternity/text-generate-effect";
import { Spotlight } from "@/components/ui/aceternity/spotlight";
import { BackgroundGradient } from "@/components/ui/aceternity/background-gradient";

export function Hero() {
  const words = "Transforme seus seguidores em clientes em 5 minutos";
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-neutral-950 via-neutral-900 to-black">
      {/* Spotlights */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <Spotlight
        className="h-[80vh] w-[50vw] top-10 left-full"
        fill="purple"
      />
      <Spotlight 
        className="left-80 top-28 h-[80vh] w-[50vw]" 
        fill="blue"
      />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 w-full h-full bg-grid-white/[0.02] z-10" />

      <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Headline com efeito */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center lg:text-left">
              <TextGenerateEffect words={words} className="text-white" />
            </h1>
            
            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="mt-6 text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto lg:mx-0"
            >
              A plataforma que os <span className="text-blue-400 font-semibold">maiores creators do Brasil</span> usam 
              para vender produtos digitais direto do Instagram
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.8 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-8 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    Criar Minha Loja Grátis →
                  </span>
                </motion.button>
              </Link>
              
              <Link href="#demo">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border border-neutral-700 rounded-lg text-white hover:bg-neutral-900 transition-colors"
                >
                  Ver Demo
                </motion.button>
              </Link>
            </motion.div>

            {/* Social Proof Preview */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 0.8 }}
              className="mt-8 flex items-center gap-4 justify-center lg:justify-start"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-black bg-gradient-to-br from-purple-400 to-blue-400"
                  />
                ))}
              </div>
              <p className="text-sm text-neutral-400">
                <span className="text-white font-semibold">5.000+</span> creators já vendem todos os dias
              </p>
            </motion.div>
          </motion.div>

          {/* Right Content - Mockup 3D */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 1, duration: 1, type: "spring" }}
            className="relative"
          >
            <BackgroundGradient className="rounded-[22px] max-w-sm mx-auto p-1 bg-zinc-900">
              <div className="relative h-[600px] w-[300px] mx-auto">
                {/* Phone Frame */}
                <div className="absolute inset-0 bg-black rounded-[20px] shadow-2xl overflow-hidden">
                  {/* Status Bar */}
                  <div className="h-6 bg-black flex items-center justify-between px-6 text-white text-xs">
                    <span>9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-3 border border-white rounded-sm" />
                      <div className="w-1 h-1 bg-white rounded-full" />
                      <div className="w-4 h-3 bg-white rounded-sm" />
                    </div>
                  </div>
                  
                  {/* Instagram Stories Mock */}
                  <div className="bg-gradient-to-br from-purple-600 to-pink-600 h-full relative">
                    {/* User Info */}
                    <div className="absolute top-4 left-4 flex items-center gap-3 z-10">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm" />
                      <div>
                        <p className="text-white font-semibold">@criador_digital</p>
                        <p className="text-white/80 text-xs">2 min atrás</p>
                      </div>
                    </div>
                    
                    {/* Link Sticker */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 2, type: "spring" }}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    >
                      <div className="bg-white rounded-2xl p-4 shadow-2xl">
                        <p className="text-black font-bold text-lg mb-2">🛍️ Minha Loja</p>
                        <p className="text-gray-600 text-sm">Produtos exclusivos!</p>
                        <div className="mt-3 bg-black text-white rounded-lg py-2 px-4 text-center text-sm font-medium">
                          Ver Produtos →
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Animated Notifications */}
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 3, duration: 0.5 }}
                      className="absolute bottom-20 left-4 right-4"
                    >
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                        <p className="text-green-600 font-semibold text-sm">💰 Nova venda!</p>
                        <p className="text-gray-700 text-xs">Maria comprou "Ebook Premium"</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
                
                {/* Phone Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-black rounded-b-2xl" />
              </div>
            </BackgroundGradient>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 