"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl">🎯</div>
            <span className={`text-xl font-bold ${
              scrolled ? "text-gray-900" : "text-white"
            }`}>
              BubaStore
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className={`font-medium transition-colors ${
                scrolled ? "text-gray-700 hover:text-gray-900" : "text-white/80 hover:text-white"
              }`}
            >
              Funcionalidades
            </Link>
            <Link
              href="#templates"
              className={`font-medium transition-colors ${
                scrolled ? "text-gray-700 hover:text-gray-900" : "text-white/80 hover:text-white"
              }`}
            >
              Templates
            </Link>
            <Link
              href="#pricing"
              className={`font-medium transition-colors ${
                scrolled ? "text-gray-700 hover:text-gray-900" : "text-white/80 hover:text-white"
              }`}
            >
              Preços
            </Link>
            <Link
              href="#faq"
              className={`font-medium transition-colors ${
                scrolled ? "text-gray-700 hover:text-gray-900" : "text-white/80 hover:text-white"
              }`}
            >
              FAQ
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            {session ? (
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Dashboard
                </motion.button>
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`font-medium transition-colors ${
                    scrolled ? "text-gray-700 hover:text-gray-900" : "text-white/80 hover:text-white"
                  }`}
                >
                  Entrar
                </Link>
                <Link href="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Criar Loja
                  </motion.button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
} 