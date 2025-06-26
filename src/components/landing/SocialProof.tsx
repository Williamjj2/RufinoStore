"use client";
import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { cn } from "@/lib/utils";

export function SocialProof() {
  const stats = [
    {
      value: 1000000,
      prefix: "R$ ",
      suffix: "+",
      label: "Processados na plataforma",
      decimals: 0,
    },
    {
      value: 5000,
      suffix: "+",
      label: "Creators ativos",
      decimals: 0,
    },
    {
      value: 50000,
      suffix: "+",
      label: "Produtos vendidos",
      decimals: 0,
    },
    {
      value: 99.9,
      suffix: "%",
      label: "Uptime garantido",
      decimals: 1,
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-black to-neutral-950 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                <CountUp
                  start={0}
                  end={stat.value}
                  duration={2.5}
                  separator=","
                  decimals={stat.decimals}
                  decimal=","
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  enableScrollSpy
                  scrollSpyOnce
                />
              </div>
              <p className="text-neutral-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Creator Logos Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <p className="text-center text-neutral-400 mb-8">
            Trusted by creators from
          </p>
          
          {/* Infinite Scroll Container */}
          <div className="relative flex overflow-hidden">
            <motion.div
              animate={{
                x: [0, -1920],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
              className="flex gap-8 pr-8"
            >
              {/* Creator Avatars - First Set */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={`avatar-1-${i}`}
                  className="flex items-center gap-3 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-full px-4 py-2 min-w-fit"
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full",
                      `bg-gradient-to-br ${
                        i % 3 === 0
                          ? "from-purple-400 to-pink-400"
                          : i % 3 === 1
                          ? "from-blue-400 to-cyan-400"
                          : "from-orange-400 to-red-400"
                      }`
                    )}
                  />
                  <span className="text-white text-sm font-medium">
                    @creator_{i + 1}
                  </span>
                </div>
              ))}
              
              {/* Creator Avatars - Second Set (for seamless loop) */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={`avatar-2-${i}`}
                  className="flex items-center gap-3 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-full px-4 py-2 min-w-fit"
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full",
                      `bg-gradient-to-br ${
                        i % 3 === 0
                          ? "from-purple-400 to-pink-400"
                          : i % 3 === 1
                          ? "from-blue-400 to-cyan-400"
                          : "from-orange-400 to-red-400"
                      }`
                    )}
                  />
                  <span className="text-white text-sm font-medium">
                    @creator_{i + 1}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 