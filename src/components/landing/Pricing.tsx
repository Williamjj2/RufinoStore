"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Pricing() {
  const competitors = [
    { name: "Stan Store", price: "$29/mês", fee: "+3%", total: "$348/ano + taxas" },
    { name: "Beacons", price: "$0/mês", fee: "9%", total: "9% de cada venda" },
    { name: "Gumroad", price: "$0/mês", fee: "10%", total: "10% de cada venda" },
  ];

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
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
            Simples e <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">transparente</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Sem pegadinhas, sem letras miúdas. Você sempre sabe quanto vai pagar.
          </motion.p>
        </div>

        {/* Main Pricing Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto mb-16"
        >
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl blur-xl opacity-50" />
            
            <div className="relative bg-gray-900 border border-gray-800 rounded-3xl p-8 text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                MODELO ÚNICO
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="text-6xl font-bold text-white mb-2">
                  R$ 0<span className="text-2xl text-gray-400">/mês</span>
                </div>
                <p className="text-gray-400">Grátis para sempre</p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="text-green-400 text-xl">✓</div>
                  <p className="text-gray-300 text-left">Sem taxa de setup</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-green-400 text-xl">✓</div>
                  <p className="text-gray-300 text-left">Sem mensalidade</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-green-400 text-xl">✓</div>
                  <p className="text-gray-300 text-left">
                    <span className="font-semibold">Apenas 5% por venda</span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-green-400 text-xl">✓</div>
                  <p className="text-gray-300 text-left">
                    <span className="font-semibold text-white">Você fica com 95%</span>
                  </p>
                </div>
              </div>

              {/* CTA */}
              <Link href="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-green-500/25 transition-all duration-200"
                >
                  Começar Agora - É Grátis!
                </motion.button>
              </Link>

              <p className="text-gray-500 text-sm mt-4">
                Não pedimos cartão de crédito
              </p>
            </div>
          </div>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Compare com a concorrência
          </h3>

          <div className="bg-gray-900 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left p-6 text-gray-400 font-medium">Plataforma</th>
                  <th className="text-center p-6 text-gray-400 font-medium">Mensalidade</th>
                  <th className="text-center p-6 text-gray-400 font-medium">Taxa por venda</th>
                  <th className="text-center p-6 text-gray-400 font-medium">Custo anual</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800 bg-green-500/5">
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🎯</div>
                      <div>
                        <p className="font-semibold text-white">BubaStore</p>
                        <p className="text-sm text-green-400">Recomendado</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-center p-6 text-white font-semibold">R$ 0</td>
                  <td className="text-center p-6 text-white font-semibold">5%</td>
                  <td className="text-center p-6 text-green-400 font-semibold">
                    Só paga quando vende
                  </td>
                </tr>
                
                {competitors.map((competitor, index) => (
                  <tr key={index} className="border-b border-gray-800">
                    <td className="p-6 text-gray-300">{competitor.name}</td>
                    <td className="text-center p-6 text-gray-300">{competitor.price}</td>
                    <td className="text-center p-6 text-gray-300">{competitor.fee}</td>
                    <td className="text-center p-6 text-gray-400">{competitor.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              * Valores baseados em R$ 10.000 de vendas mensais
            </p>
          </div>
        </motion.div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-6">
            <div className="text-4xl">💰</div>
            <div className="text-left">
              <h4 className="text-yellow-400 font-semibold text-lg">Garantia de 30 dias</h4>
              <p className="text-gray-300">Se não gostar, devolvemos 100% das taxas pagas</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 