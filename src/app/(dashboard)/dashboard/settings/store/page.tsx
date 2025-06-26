"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { TEMPLATES } from "@/types/templates";
import { GlowingButton } from "@/components/ui/aceternity/glowing-button";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Store, Palette, Globe, Settings } from 'lucide-react'

interface UserStoreSettings {
  template_id: string;
  primary_color: string;
  accent_color: string;
  background_color: string;
}

export default async function StoreSettingsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Voltar ao Dashboard
              </Link>
              <div className="border-l border-gray-300 h-6"></div>
              <div className="flex items-center space-x-2">
                <Store className="h-6 w-6 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Configurações da Loja</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Configurações</h3>
              <nav className="space-y-2">
                <a
                  href="#template"
                  className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md"
                >
                  <Palette className="mr-3 h-4 w-4" />
                  Template & Cores
                </a>
                <a
                  href="#domain"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  <Globe className="mr-3 h-4 w-4" />
                  Domínio Personalizado
                </a>
                <a
                  href="#seo"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  <Settings className="mr-3 h-4 w-4" />
                  SEO & Metadata
                </a>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Template Selection */}
            <div id="template" className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Template da Loja</h3>
              <p className="text-gray-600 mb-6">
                Escolha o template que melhor representa sua marca
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['minimal', 'aurora', 'bento', 'spotlight', 'canvas'].map((template) => (
                  <div
                    key={template}
                    className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors"
                  >
                    <div className="aspect-video bg-gray-100 rounded mb-3 flex items-center justify-center">
                      <span className="text-gray-500 capitalize">{template}</span>
                    </div>
                    <h4 className="font-medium capitalize">{template}</h4>
                    <p className="text-sm text-gray-500">Template {template}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Color Customization */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personalização de Cores</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cor Primária
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      defaultValue="#3B82F6"
                      className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      defaultValue="#3B82F6"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cor de Destaque
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      defaultValue="#10B981"
                      className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      defaultValue="#10B981"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cor de Fundo
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      defaultValue="#FFFFFF"
                      className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      defaultValue="#FFFFFF"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Domain Settings */}
            <div id="domain" className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Domínio Personalizado</h3>
              <p className="text-gray-600 mb-6">
                Configure um domínio personalizado para sua loja
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Atual
                  </label>
                  <div className="bg-gray-50 px-3 py-2 rounded-md text-sm text-gray-600">
                    bubastore.com/{session.user.username || 'seu-usuario'}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Domínio Personalizado
                  </label>
                  <input
                    type="text"
                    placeholder="meudominio.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Configure o DNS do seu domínio para apontar para nossos servidores
                  </p>
                </div>
              </div>
            </div>

            {/* SEO Settings */}
            <div id="seo" className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO & Metadata</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título da Página
                  </label>
                  <input
                    type="text"
                    placeholder="Minha Loja Digital - Produtos Incríveis"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição Meta
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Descrição da sua loja para aparecer nos resultados de busca"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Palavras-chave
                  </label>
                  <input
                    type="text"
                    placeholder="produto digital, curso online, ebook"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors">
                Salvar Configurações
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 