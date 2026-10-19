'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, AlertCircle, RefreshCw, Phone, MessageCircle } from 'lucide-react';

export default function RootLoading() {
  const [isSlow, setIsSlow] = useState(false);
  const [offlineDetected, setOfflineDetected] = useState(false);

  useEffect(() => {
    // If the user is completely offline
    if (typeof window !== 'undefined' && !navigator.onLine) {
      setOfflineDetected(true);
    }

    // If loading takes more than 1.8 seconds, the user is experiencing high latency / slow internet
    const timer = setTimeout(() => {
      setIsSlow(true);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md mx-auto text-center space-y-6">
        
        {/* Clean Industrial Machinery Spinner */}
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          {/* Outer rotating dashed ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-dashed border-brand-orange/60"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
          />
          {/* Inner smooth spinning track */}
          <motion.div
            className="absolute inset-1 rounded-full border-3 border-emerald-700/20 border-t-emerald-700"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
          />
          {/* Center machinery hub */}
          <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center shadow-md">
            <span className="font-heading font-black text-xs text-brand-orange">NA</span>
          </div>
        </div>

        {/* Brand & Loading Indicator */}
        <div className="space-y-2">
          <h3 className="font-heading font-bold text-lg text-neutral-900 tracking-tight">
            Nagendra Agencies
          </h3>
          <p className="text-sm text-neutral-600 font-medium">
            Loading machinery specifications...
          </p>
          
          {/* Sleek indeterminate progress track */}
          <div className="w-48 h-1.5 bg-neutral-200 rounded-full mx-auto overflow-hidden mt-3">
            <motion.div
              className="h-full bg-brand-orange rounded-full"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.4,
                ease: 'easeInOut',
              }}
            />
          </div>
        </div>

        {/* Dynamic Alert IF USER HAS INTERNET ISSUE (High Latency or Offline) */}
        <AnimatePresence>
          {(isSlow || offlineDetected) && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 bg-white border border-amber-300 rounded-xl p-5 shadow-lg text-left space-y-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Wifi className="w-5 h-5 animate-pulse" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-neutral-900">
                    {offlineDetected ? 'Internet Connection Lost' : 'Slow Internet Connection Detected'}
                  </h4>
                  <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                    {offlineDetected
                      ? 'You are currently disconnected. You can retry connection or reach out directly by phone.'
                      : 'Connecting to Secunderabad machinery database over high-latency network. Optimizing data stream...'}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-100 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs transition-colors active:scale-95"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Reload Page
                </button>

                <a
                  href="https://wa.me/9104027707687?text=Hello%20Nagendra%20Agencies%2C%20I%20am%20trying%20to%20view%20your%20machinery%20catalog."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors active:scale-95"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Support
                </a>

                <a
                  href="tel:04027707687"
                  className="inline-flex items-center gap-1 px-2 py-1.5 text-xs text-neutral-600 hover:text-neutral-900 font-medium ml-auto"
                >
                  <Phone className="w-3.5 h-3.5" /> 040 2770 7687
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
