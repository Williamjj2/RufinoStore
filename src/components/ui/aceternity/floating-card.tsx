"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const FloatingCard = ({
  children,
  className,
  delay = 0,
}: FloatingCardProps) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={cn(
        "relative group/card backdrop-blur-md bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 rounded-2xl p-6 shadow-2xl",
        "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 group-hover/card:before:opacity-100 before:transition-opacity before:duration-300",
        className
      )}
    >
      {children}
    </motion.div>
  );
}; 