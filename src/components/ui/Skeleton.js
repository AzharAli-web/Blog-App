"use client";

import { motion } from "framer-motion";

export function Skeleton({ className, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      className={`bg-muted/20 rounded-md ${className}`}
      {...props}
    />
  );
}
