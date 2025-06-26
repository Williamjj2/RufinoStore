"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Features() {
  const features = [
    {
      icon: "📱",
      title: "Link na Bio Inteligente",
      description: "Sua loja em um link só. Perfeito para Instagram, TikTok e WhatsApp.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: "💳",
      title: "Pagamentos Seguros",
      description: "Stripe + Mercado Pago integrados. Receba em reais ou dólares.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: "📊",
      title: "Dashboard Completo",
      description: "Acompanhe suas vendas, clientes e métricas em tempo real.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: "🚀",
      title: "Entrega Automática",
      description: "Cliente compra, recebe na hora. Sem trabalho manual.",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: "🎨",
      title: "5 Templates Incríveis",
      description: "Personalize com sua cara. Mobile-first e otimizados para conversão.",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      icon: "💰",
      title: "Sem Mensalidade",
      description: "Apenas 5% por venda. Você fica com 95% de tudo que vender.",
      gradient: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Tudo que você <span className="text-blue-600">precisa</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Ferramentas profissionais para vender como os grandes creators
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group"
            >
              <div className="relative h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                {/* Gradient Border */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                  feature.gradient
                )} />
                
                <div className="relative bg-white m-[1px] rounded-2xl p-8 h-full">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="text-5xl mb-6"
                  >
                    {feature.icon}
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover Effect */}
                  <div className={cn(
                    "absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300",
                    feature.gradient
                  )} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Extra Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: "SSL Seguro", icon: "🔒" },
            { label: "Suporte 24/7", icon: "💬" },
            { label: "API Aberta", icon: "🔌" },
            { label: "Multi-idioma", icon: "🌍" },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl mb-2">{item.icon}</div>
              <p className="text-sm font-medium text-gray-700">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 