"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaTwitter, FaInstagram, FaQrcode, FaGlobe, FaChartLine, FaUsers, FaShoppingCart } from "react-icons/fa";
import { getSocialConversionData, SocialFunnelData } from "@/lib/analytics";

interface SocialAnalyticsDashboardProps {
  className?: string;
}

export function SocialAnalyticsDashboard({ className = "" }: SocialAnalyticsDashboardProps) {
  const [analyticsData, setAnalyticsData] = useState<SocialFunnelData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading analytics data
    const timer = setTimeout(() => {
      setAnalyticsData(getSocialConversionData());
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'whatsapp':
        return <FaWhatsapp className="text-green-500" />;
      case 'twitter':
        return <FaTwitter className="text-blue-500" />;
      case 'instagram':
        return <FaInstagram className="text-pink-500" />;
      case 'qrcode':
        return <FaQrcode className="text-purple-500" />;
      case 'direct':
        return <FaGlobe className="text-gray-500" />;
      default:
        return <FaGlobe className="text-gray-500" />;
    }
  };

  const getSourceName = (source: string) => {
    switch (source) {
      case 'whatsapp':
        return 'WhatsApp';
      case 'twitter':
        return 'Twitter';
      case 'instagram':
        return 'Instagram';
      case 'qrcode':
        return 'QR Code';
      case 'direct':
        return 'Direto';
      default:
        return source.charAt(0).toUpperCase() + source.slice(1);
    }
  };

  const totalStats = analyticsData.reduce(
    (acc, curr) => ({
      page_views: acc.page_views + curr.page_views,
      purchases: acc.purchases + curr.purchases,
      total_value: acc.total_value + curr.total_value,
      shares: acc.shares + curr.shares,
    }),
    { page_views: 0, purchases: 0, total_value: 0, shares: 0 }
  );

  const overallConversionRate = totalStats.page_views > 0 
    ? (totalStats.purchases / totalStats.page_views) * 100 
    : 0;

  if (isLoading) {
    return (
      <div className={`p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center">
            <FaChartLine className="text-blue-500 text-2xl mr-3" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total de Visitas</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {totalStats.page_views.toLocaleString()}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center">
            <FaShoppingCart className="text-green-500 text-2xl mr-3" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Vendas</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {totalStats.purchases.toLocaleString()}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center">
            <FaUsers className="text-purple-500 text-2xl mr-3" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Taxa de Conversão</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {overallConversionRate.toFixed(1)}%
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center">
            <div className="text-green-500 text-2xl mr-3">💰</div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Receita Total</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                R$ {totalStats.total_value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Social Sources Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Performance por Rede Social
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Análise detalhada de conversões por fonte de tráfego
          </p>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {analyticsData
              .sort((a, b) => b.total_value - a.total_value)
              .map((data, index) => (
                <motion.div
                  key={data.source}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">
                      {getSourceIcon(data.source)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {getSourceName(data.source)}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {data.page_views} visitas • {data.purchases} vendas
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      R$ {data.total_value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {(data.conversion_rate * 100).toFixed(1)}% conversão
                    </p>
                  </div>

                  <div className="ml-4">
                    <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${Math.min((data.conversion_rate * 100) * 10, 100)}%` 
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </motion.div>

      {/* Funnel Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Funil de Conversão Social
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Jornada do visitante desde o compartilhamento até a compra
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg mb-2">
                <FaUsers className="text-blue-600 dark:text-blue-400 text-2xl mx-auto" />
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white">Visitantes</h4>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {totalStats.page_views}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg mb-2">
                <div className="text-yellow-600 dark:text-yellow-400 text-2xl mx-auto">👁️</div>
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white">Visualizações</h4>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {analyticsData.reduce((acc, curr) => acc + curr.product_views, 0)}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg mb-2">
                <div className="text-purple-600 dark:text-purple-400 text-2xl mx-auto">📤</div>
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white">Compartilhamentos</h4>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {totalStats.shares}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg mb-2">
                <FaShoppingCart className="text-green-600 dark:text-green-400 text-2xl mx-auto" />
              </div>
              <h4 className="font-medium text-gray-900 dark:text-white">Vendas</h4>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {totalStats.purchases}
              </p>
            </div>
          </div>
        </div>
 