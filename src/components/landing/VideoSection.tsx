"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";

export function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Veja a plataforma em <span className="text-blue-600">ação</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Tour completo de 60 segundos mostrando tudo que você precisa saber
          </motion.p>
        </div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
            <div className="aspect-video relative">
              {!isPlaying ? (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
                  {/* Video Thumbnail */}
                  <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🎥</div>
                      <p className="text-white text-xl">Demonstração da Plataforma</p>
                    </div>
                  </div>
                  
                  {/* Play Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsPlaying(true)}
                    className="relative z-10 bg-white rounded-full p-8 shadow-2xl hover:shadow-3xl transition-shadow"
                  >
                    <FaPlay className="w-8 h-8 text-blue-600 ml-1" />
                  </motion.button>
                </div>
              ) : (
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="BubaStore Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              )}
            </div>
          </div>

          {/* Video Timeline */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">O que você vai ver:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { time: "0-20s", title: "Criando sua loja", icon: "🏪" },
                { time: "20-40s", title: "Adicionando produtos", icon: "📦" },
                { time: "40-60s", title: "Primeira venda", icon: "💰" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="text-2xl">{item.icon}</div>
                  <div>
                    <p className="font-medium text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { value: "2M+", label: "Views no demo" },
            { value: "4.8", label: "Avaliação média" },
            { value: "60s", label: "Para entender tudo" },
            { value: "95%", label: "Taxa de conversão" },
          ].map((stat, index) => (
            <div key={index}>
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 