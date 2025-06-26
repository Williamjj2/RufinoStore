"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Templates() {
  const [activeTemplate, setActiveTemplate] = useState(0);

  const templates = [
    {
      id: "minimal",
      name: "Minimal",
      description: "Clean e direto ao ponto. Perfeito para quem quer simplicidade.",
      preview: "/templates/minimal-preview.jpg",
      gradient: "from-gray-600 to-gray-900",
    },
    {
      id: "aurora",
      name: "Aurora",
      description: "Vibrante e moderno. Ideal para creators criativos.",
      preview: "/templates/aurora-preview.jpg",
      gradient: "from-purple-600 to-pink-600",
    },
    {
      id: "bento",
      name: "Bento",
      description: "Organizado em grids. Ótimo para múltiplos produtos.",
      preview: "/templates/bento-preview.jpg",
      gradient: "from-blue-600 to-cyan-600",
    },
    {
      id: "spotlight",
      name: "Spotlight",
      description: "Foco no produto hero. Conversão maximizada.",
      preview: "/templates/spotlight-preview.jpg",
      gradient: "from-indigo-600 to-purple-600",
    },
    {
      id: "canvas",
      name: "Canvas",
      description: "Artístico e único. Para quem quer se destacar.",
      preview: "/templates/canvas-preview.jpg",
      gradient: "from-orange-600 to-red-600",
    },
  ];

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Escolha seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">estilo</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Templates criados por designers, otimizados para vendas
          </motion.p>
        </div>

        {/* Template Selector */}
        <div className="flex justify-center mb-12 flex-wrap gap-4">
          {templates.map((template, index) => (
            <motion.button
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveTemplate(index)}
              className={cn(
                "px-6 py-3 rounded-full font-medium transition-all duration-300",
                activeTemplate === index
                  ? "bg-white text-black shadow-lg scale-105"
                  : "bg-white/10 text-white hover:bg-white/20"
              )}
            >
              {template.name}
            </motion.button>
          ))}
        </div>

        {/* Template Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Browser Frame */}
          <div className="bg-gray-900 rounded-t-xl p-3 flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 bg-gray-800 rounded-md px-4 py-1 text-gray-400 text-sm">
              bubastore.com/seunome
            </div>
          </div>

          {/* Template Display */}
          <div className="relative bg-gray-900 rounded-b-xl overflow-hidden">
            <div className="aspect-[16/10] relative">
              {templates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: activeTemplate === index ? 1 : 0,
                    scale: activeTemplate === index ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "absolute inset-0",
                    activeTemplate !== index && "pointer-events-none"
                  )}
                >
                  {/* Template Preview Placeholder */}
                  <div className={cn(
                    "w-full h-full bg-gradient-to-br flex items-center justify-center",
                    template.gradient
                  )}>
                    <div className="text-center text-white">
                      <h3 className="text-4xl font-bold mb-4">{template.name}</h3>
                      <p className="text-xl opacity-80 max-w-md mx-auto">{template.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Template Info Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={activeTemplate}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-2">
                {templates[activeTemplate].name}
              </h3>
              <p className="text-gray-300 mb-4">
                {templates[activeTemplate].description}
              </p>
              <button className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Ver demo completa →
              </button>
            </motion.div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {templates.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTemplate(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  activeTemplate === index
                    ? "w-8 bg-white"
                    : "bg-white/30 hover:bg-white/50"
                )}
              />
            ))}
          </div>
        </motion.div>

        {/* Features List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            "Mobile First",
            "SEO Otimizado",
            "Carregamento Rápido",
            "100% Customizável",
          ].map((feature, index) => (
            <div key={index}>
              <div className="text-green-400 text-xl mb-2">✓</div>
              <p className="text-gray-300">{feature}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 