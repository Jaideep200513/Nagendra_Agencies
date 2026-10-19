'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * NavigationProgressBar:
 * An ultra-sleek, top-of-screen progress line that animates during route transitions.
 * If the user experiences slow network / high latency, it displays an animated pulsing
 * glow head to reassure them that connection data is actively transferring.
 */
export function NavigationProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);

  // Trigger progress whenever pathname or query string changes
  useEffect(() => {
    // Finish animation on route resolve
    setProgress(100);
    const timer = setTimeout(() => {
      setIsNavigating(false);
      setProgress(0);
    }, 250);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  // Intercept click on internal links to provide instant feedback
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (
        href &&
        href.startsWith('/') &&
        !href.startsWith('//') &&
        !target.getAttribute('target') &&
        href !== pathname
      ) {
        setIsNavigating(true);
        setProgress(30);

        // Gradually advance to 80% while waiting for network
        const step1 = setTimeout(() => setProgress(65), 100);
        const step2 = setTimeout(() => setProgress(85), 300);

        return () => {
          clearTimeout(step1);
          clearTimeout(step2);
        };
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, [pathname]);

  if (!isNavigating && progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none h-[3px] bg-transparent">
      <motion.div
        className="h-full bg-gradient-to-r from-emerald-600 via-brand-orange to-amber-500 shadow-[0_0_10px_rgba(234,88,12,0.6)]"
        initial={{ width: '0%' }}
        animate={{ width: `${progress}%` }}
        transition={{
          duration: progress === 100 ? 0.2 : 0.4,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
      {/* Network Pulse Glow Indicator for slow connections */}
      {isNavigating && progress >= 80 && (
        <motion.div
          className="absolute top-0 right-0 h-[3px] w-24 bg-white/80 blur-[2px]"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
        />
      )}
    </div>
  );
}
