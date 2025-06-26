"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

interface GlowingButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  glowColor?: string;
  className?: string;
  onClick?: () => void;
}

export const GlowingButton = ({
  children,
  className,
  variant = "primary",
  glowColor,
  onClick
}: GlowingButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
        className
      )}
      onClick={onClick}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2E8F0_0%,#3B82F6_50%,#E2E8F0_100%)]" />
      <span
        className={cn(
          "inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full px-8 py-1 text-sm font-medium text-white backdrop-blur-3xl transition-colors",
          variant === "primary" && "bg-slate-950/80 hover:bg-slate-800/80",
          variant === "secondary" && "bg-white/20 hover:bg-white/30"
        )}
        style={glowColor ? { backgroundColor: `${glowColor}80` } : {}}
      >
        {children}
      </span>
    </motion.button>
  );
}; 