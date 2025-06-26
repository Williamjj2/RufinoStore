"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import confetti from "canvas-confetti";

export function FinalCTA() {
  const [hovering, setHovering] = useState(false);

  const handleConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#3B82F6", "#8B5CF6", "#10B981"],
    });
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F64d_1px,transparent_1px),linear-gradient(to_bottom,#3B82F64d_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            ÚLTIMAS VAGAS DO MÊS
          </motion.div>

          {/* Headline */}
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Junte-se a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              5.000+ creators
            </span>
            <br />
            que já vendem todos os dias
          </h2>

          {/* Subheadline */}
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            Configuração em 5 minutos. Sem cartão de crédito. 
            Comece a vender hoje mesmo.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                onClick={handleConfetti}
                className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-200"
              >
                <span className="relative z-10">
                  Criar Minha Loja Agora →
                </span>
                {hovering && (
                  <motion.div
                    layoutId="hover-bg"
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.button>
            </Link>

            <Link href="#demo">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200"
              >
                Ver Demo
              </motion.button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-12">
            <div className="flex items-center gap-2 text-gray-600">
              <span className="text-green-500">✓</span>
              <span>Sem mensalidade</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <span className="text-green-500">✓</span>
              <span>Pagamento seguro</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <span className="text-green-500">✓</span>
              <span>Suporte em português</span>
            </div>
          </div>

          {/* Live Activity */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 border-2 border-white"
                />
              ))}
            </div>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">12 pessoas</span> criaram suas lojas na última hora
            </p>
          </motion.div>
        </motion.div>

        {/* Testimonial Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 relative">
            <div className="absolute -top-4 -left-4 text-6xl text-blue-200">❝</div>
            
            <blockquote className="text-xl text-gray-700 leading-relaxed mb-6">
              "Em apenas 3 meses usando a BubaStore, consegui 
              <span className="font-semibold text-gray-900"> faturar R$ 127.000</span> vendendo meu curso online. 
              A plataforma é simples, confiável e o suporte é excepcional!"
            </blockquote>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-400" />
              <div>
                <p className="font-semibold text-gray-900">Fernanda Lima</p>
                <p className="text-gray-600">@fernanda.lima</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 