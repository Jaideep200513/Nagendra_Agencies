'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Template wraps every page on navigation.
 * Uses a snappy cubic-bezier curve [0.16, 1, 0.3, 1] to provide a
 * silky page-to-page transition without sluggish or floaty feeling.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{
        duration: 0.28,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="flex-1 w-full"
    >
      {children}
    </motion.div>
  );
}
