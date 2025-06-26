"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Demo() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01",
      title: "Crie sua conta",
      description: "Cadastre-se em segundos com email ou Google",
      demo: (
        <div className="bg-white rounded-lg p-6 shadow-xl">
          <h4 className="font-semibold mb-4">Criar conta</h4>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Seu nome"
              className="w-full px-4 py-2 border rounded-lg"
              defaultValue="Maria Silva"
            />
            <input
              type="email"
              placeholder="seu@email.com"
              className="w-full px-4 py-2 border rounded-lg"
              defaultValue="maria@email.com"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-black text-white py-3 rounded-lg font-medium"
            >
              Continuar
            </motion.button>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: activeStep === 0 ? 1 : 0 }}
            className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
          >
            ✓
          </motion.div>
        </div>
      ),
    },
    {
      number: "02",
      title: "Adicione seus produtos",
      description: "Upload simples com drag & drop",
      demo: (
        <div className="bg-white rounded-lg p-6 shadow-xl">
          <h4 className="font-semibold mb-4">Novo produto</h4>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer"
          >
            <div className="text-4xl mb-2">📁</div>
            <p className="text-gray-600">Arraste arquivos aqui</p>
            <p className="text-sm text-gray-400 mt-1">ou clique para selecionar</p>
          </motion.div>
          
          {activeStep >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-green-50 rounded-lg flex items-center gap-3"
            >
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                PDF
              </div>
              <div className="flex-1">
                <p className="font-medium">Ebook Premium.pdf</p>
                <p className="text-sm text-gray-500">2.4 MB - Enviado!</p>
              </div>
            </motion.div>
          )}
        </div>
      ),
    },
    {
      number: "03",
      title: "Compartilhe e venda",
      description: "Copie o link e cole no Instagram",
      demo: (
        <div className="bg-white rounded-lg p-6 shadow-xl">
          <h4 className="font-semibold mb-4">Sua loja está pronta!</h4>
          
          <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600 truncate">
              bubastore.com/mariasilva
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              Copiar
            </motion.button>
          </div>

          {activeStep >= 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg p-4"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">🎉</div>
                <div>
                  <p className="font-semibold">Nova venda!</p>
                  <p className="text-sm opacity-90">João comprou seu Ebook Premium</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      ),
    },
  ];

  return (
    <section id="demo" className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Veja como é <span className="text-blue-600">fácil</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Em apenas 3 passos simples, sua loja está pronta para vender
          </motion.p>
        </div>

        {/* Steps Container */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveStep(index)}
                className={cn(
                  "flex gap-6 cursor-pointer group",
                  activeStep === index ? "opacity-100" : "opacity-60"
                )}
              >
                {/* Step Number */}
                <div
                  className={cn(
                    "flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg transition-all",
                    activeStep === index
                      ? "bg-blue-600 text-white scale-110"
                      : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                  )}
                >
                  {step.number}
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                  
                  {/* Progress Line */}
                  {index < steps.length - 1 && (
                    <div className="mt-8 ml-8 w-0.5 h-8 bg-gray-200 relative">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{
                          height: activeStep > index ? "100%" : "0%",
                        }}
                        className="absolute top-0 left-0 w-full bg-blue-600"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Side - Demo */}
          <div className="relative h-[400px] flex items-center justify-center">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: activeStep === index ? 1 : 0,
                  scale: activeStep === index ? 1 : 0.8,
                  display: activeStep === index ? "block" : "none",
                }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {step.demo}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Auto Progress */}
        <div className="mt-12 max-w-md mx-auto">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 12,
                ease: "linear",
                repeat: Infinity,
              }}
              onUpdate={(latest) => {
                const progress = parseInt(latest.width as string);
                const newStep = Math.floor((progress / 100) * 3);
                if (newStep !== activeStep && newStep < 3) {
                  setActiveStep(newStep);
                }
              }}
              className="h-full bg-blue-600"
            />
          </div>
        </div>
      </div>
    </section>
  );
} 