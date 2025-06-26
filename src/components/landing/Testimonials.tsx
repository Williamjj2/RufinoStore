"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const testimonials = [
    {
      name: "Julia Silva",
      username: "@juliasilva",
      avatar: "https://i.pravatar.cc/100?img=1",
      content: "Migrei do link tree e minhas vendas TRIPLICARAM! O checkout direto faz toda diferença.",
      metric: "R$ 30K/mês",
      rating: 5,
    },
    {
      name: "Pedro Costa",
      username: "@pedrocosta",
      avatar: "https://i.pravatar.cc/100?img=2",
      content: "A entrega automática mudou meu negócio. Não preciso mais ficar enviando links manualmente.",
      metric: "R$ 45K/mês",
      rating: 5,
    },
    {
      name: "Ana Beatriz",
      username: "@anabeatriz",
      avatar: "https://i.pravatar.cc/100?img=3",
      content: "O dashboard é incrível! Consigo ver exatamente de onde vem cada venda. Melhor investimento!",
      metric: "R$ 25K/mês",
      rating: 5,
    },
    {
      name: "Carlos Eduardo",
      username: "@carlosedu",
      avatar: "https://i.pravatar.cc/100?img=4",
      content: "Comecei do zero e já faturei R$ 10K no primeiro mês. A plataforma é muito intuitiva.",
      metric: "R$ 18K/mês",
      rating: 5,
    },
    {
      name: "Mariana Souza",
      username: "@marisouza",
      avatar: "https://i.pravatar.cc/100?img=5",
      content: "Os templates são lindos! Minha loja ficou profissional sem precisar contratar designer.",
      metric: "R$ 22K/mês",
      rating: 5,
    },
    {
      name: "Rafael Lima",
      username: "@rafalima",
      avatar: "https://i.pravatar.cc/100?img=6",
      content: "O suporte é excepcional. Sempre que preciso, me ajudam em minutos. Vale cada centavo!",
      metric: "R$ 50K/mês",
      rating: 5,
    },
  ];

  // Duplicate for infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Creators que já <span className="text-blue-600">faturam</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Veja o que dizem os creators que já transformaram seu negócio
          </motion.p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

          {/* Scrolling Container */}
          <div className="overflow-hidden">
            <motion.div
              animate={{
                x: [0, -50 * testimonials.length + "%"],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
              className="flex gap-6"
            >
              {duplicatedTestimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="flex-shrink-0 w-[400px]"
                >
                  <div className="bg-white rounded-2xl shadow-lg p-8 h-full border border-gray-100 hover:shadow-xl transition-shadow">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            width={56}
                            height={56}
                            className="rounded-full object-cover"
                          />
                          <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                            ✓
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                          <p className="text-gray-500 text-sm">{testimonial.username}</p>
                        </div>
                      </div>
                      
                      {/* Metric Badge */}
                      <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {testimonial.metric}
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>

                    {/* Content */}
                    <blockquote className="text-gray-700 leading-relaxed">
                      "{testimonial.content}"
                    </blockquote>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-blue-600 rounded-2xl p-8 text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">R$ 5M+</div>
              <p className="text-blue-100">Vendidos pelos creators</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <p className="text-blue-100">Taxa de satisfação</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24h</div>
              <p className="text-blue-100">Tempo médio para primeira venda</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 