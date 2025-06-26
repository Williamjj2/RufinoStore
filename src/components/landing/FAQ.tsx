"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "É realmente grátis?",
      answer: "Sim! A BubaStore é 100% gratuita para começar. Não cobramos mensalidade, taxa de setup ou qualquer custo fixo. Você só paga 5% quando vende - simples assim."
    },
    {
      question: "Como recebo meus pagamentos?",
      answer: "Os pagamentos são processados via Stripe ou Mercado Pago e depositados diretamente na sua conta bancária. Com Stripe, você recebe em até 2 dias úteis. Com Mercado Pago, o dinheiro fica disponível imediatamente na sua conta MP."
    },
    {
      question: "Posso vender produtos físicos?",
      answer: "A BubaStore foi criada especialmente para produtos digitais (ebooks, cursos, templates, etc). Para produtos físicos, recomendamos outras plataformas especializadas em logística e envio."
    },
    {
      question: "Preciso ter CNPJ?",
      answer: "Não! Você pode vender como pessoa física. Aceitamos tanto CPF quanto CNPJ. Lembre-se apenas de declarar seus ganhos no Imposto de Renda."
    },
    {
      question: "Como funciona o suporte?",
      answer: "Oferecemos suporte por email e WhatsApp de segunda a sexta, das 9h às 18h. Nosso tempo médio de resposta é de 2 horas. Também temos uma base de conhecimento completa com tutoriais em vídeo."
    },
    {
      question: "Posso migrar do Stan Store?",
      answer: "Com certeza! Temos um processo simples de migração. Nossa equipe te ajuda a importar seus produtos e configurar tudo. A maioria dos creators migra em menos de 1 hora."
    },
    {
      question: "Quantos produtos posso vender?",
      answer: "Produtos ilimitados! Não há limite para quantidade de produtos, vendas ou clientes. Sua loja cresce com você, sem restrições."
    },
    {
      question: "Existe algum tipo de contrato?",
      answer: "Não existe contrato de fidelidade ou multa. Você pode cancelar a qualquer momento, sem burocracia. Se cancelar, seus dados ficam disponíveis para download por 30 dias."
    }
  ];

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Perguntas <span className="text-blue-600">frequentes</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Tudo que você precisa saber antes de começar
          </motion.p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  {openIndex === index ? (
                    <FaMinus className="w-5 h-5 text-blue-600" />
                  ) : (
                    <FaPlus className="w-5 h-5 text-gray-400" />
                  )}
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">
            Ainda tem dúvidas? Fale com a gente!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <span>💬</span>
              WhatsApp
            </a>
            <a
              href="mailto:contato@bubastore.com"
              className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <span>📧</span>
              Email
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 