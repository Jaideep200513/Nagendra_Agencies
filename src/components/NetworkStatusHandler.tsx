'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Wifi, RefreshCw, AlertTriangle, CheckCircle2 } from 'lucide-react';

export function NetworkStatusHandler() {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [isSlowNetwork, setIsSlowNetwork] = useState<boolean>(false);
  const [wasOffline, setWasOffline] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [showRestored, setShowRestored] = useState<boolean>(false);

  useEffect(() => {
    // Initial status
    if (typeof window !== 'undefined') {
      setIsOnline(navigator.onLine);

      // Check Network Information API if available
      const conn = (navigator as unknown as { connection?: { effectiveType?: string; addEventListener?: (type: string, fn: () => void) => void } }).connection;
      if (conn && (conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g')) {
        setIsSlowNetwork(true);
      }
    }

    const handleOnline = () => {
      setIsOnline(true);
      if (wasOffline) {
        setShowRestored(true);
        const timer = setTimeout(() => {
          setShowRestored(false);
          setWasOffline(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setWasOffline(true);
      setShowRestored(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [wasOffline]);

  const handleManualCheck = async () => {
    setIsChecking(true);
    try {
      // Fast ping to verify true internet reachability
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);
      
      const res = await fetch('/api/health?t=' + Date.now(), {
        method: 'HEAD',
        signal: controller.signal,
        cache: 'no-store',
      }).catch(() => null);

      clearTimeout(timeoutId);

      if (res && (res.ok || res.status < 500)) {
        setIsOnline(true);
        setShowRestored(true);
        setTimeout(() => {
          setShowRestored(false);
          setWasOffline(false);
        }, 3000);
      } else if (!navigator.onLine) {
        setIsOnline(false);
      }
    } catch {
      setIsOnline(navigator.onLine);
    } finally {
      setTimeout(() => setIsChecking(false), 500);
    }
  };

  return (
    <>
      <AnimatePresence>
        {/* OFFLINE STATE BANNER & DIALOG */}
        {!isOnline && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-[9998]"
            role="alert"
          >
            <div className="bg-neutral-950 text-white rounded-xl p-4 sm:p-5 shadow-2xl border-2 border-amber-500/80 backdrop-blur-md">
              <div className="flex items-start gap-3.5">
                <div className="relative flex-shrink-0 w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <WifiOff className="w-5 h-5" />
                  {/* Gentle pulsing ping dot */}
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-heading font-black text-sm sm:text-base text-white tracking-tight">
                      Internet Connection Issue
                    </h4>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Offline
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 mt-1 leading-relaxed">
                    You appear to have lost internet connectivity. Loaded machinery details remain cached, but live quotations may be delayed.
                  </p>

                  <div className="mt-3.5 flex items-center gap-2.5">
                    <button
                      onClick={handleManualCheck}
                      disabled={isChecking}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition-colors active:scale-95 disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isChecking ? 'animate-spin' : ''}`} />
                      {isChecking ? 'Testing Network...' : 'Retry Connection'}
                    </button>

                    <a
                      href="tel:04027707687"
                      className="inline-flex items-center text-xs text-neutral-300 hover:text-white underline underline-offset-2 transition-colors font-medium"
                    >
                      Call Direct: 040 2770 7687
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* RESTORED CONNECTION CONFIRMATION */}
        {showRestored && isOnline && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-[9998]"
          >
            <div className="bg-emerald-950 text-white rounded-xl p-4 shadow-xl border border-emerald-500/60 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="font-bold text-sm text-white">Connection Restored</h5>
                <p className="text-xs text-emerald-200/80">You are back online. Live data synced.</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* SLOW NETWORK ADVISORY (Subtle top strip if on 2G/slow connection) */}
        {isOnline && isSlowNetwork && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-amber-500/10 border-b border-amber-500/30 px-4 py-1.5 text-center text-xs text-amber-900 font-medium"
          >
            <span className="inline-flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              Slow network detected. Images and specifications are loading in optimized lightweight mode.
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
