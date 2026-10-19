'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ExternalLink } from 'lucide-react';

export interface LightboxImage {
  src: string;
  alt: string;
  title: string;
  caption?: string;
}

interface ImageLightboxModalProps {
  image: LightboxImage | null;
  onClose: () => void;
}

export function ImageLightboxModal({ image, onClose }: ImageLightboxModalProps) {
  // Handle escape key
  useEffect(() => {
    if (!image) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Lock body scroll
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [image, onClose]);

  return (
    <AnimatePresence>
      {image && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
          {/* Dark Translucent Backdrop with Smooth Blur Fade */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
            onClick={onClose}
            aria-label="Close modal overlay"
          />

          {/* Main Lightbox Card with Smooth Scale & Elevation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-w-5xl w-full max-h-[95vh] bg-[#111814] rounded-2xl border border-white/15 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Top Bar with Title & Actions */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-black/60 border-b border-white/10 text-white">
              <div className="flex items-center gap-2.5 min-w-0 pr-4">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-orange flex-shrink-0" />
                <h3 className="font-heading font-black text-base sm:text-lg text-white truncate">
                  {image.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href={image.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors active:scale-95"
                  title="Open full-resolution image in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={onClose}
                  className="group p-2 rounded-lg bg-white/10 hover:bg-rose-600 text-white transition-colors active:scale-95"
                  aria-label="Close lightbox"
                  title="Close (Esc)"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
                </button>
              </div>
            </div>

            {/* Image Viewport - Full View Without Cropping */}
            <div className="relative w-full h-[60vh] sm:h-[72vh] bg-black/40 flex items-center justify-center p-4 overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Bottom Caption Bar */}
            {image.caption && (
              <div className="px-5 py-3.5 bg-black/80 border-t border-white/10 flex items-center text-xs sm:text-sm text-neutral-200 font-medium">
                <span>{image.caption}</span>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
