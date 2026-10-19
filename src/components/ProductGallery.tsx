'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ProductImage } from '../data/types';

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const displayImages = images.length > 0 
    ? images 
    : [{ relative_path: '/assets/company/logo.png', file_name: 'logo.png', width: 500, height: 500 }];

  const activeImage = displayImages[activeIndex] || displayImages[0];

  return (
    <div className="space-y-4">
      {/* Main Large Viewport */}
      <div className="relative bg-[#FAF7F2] border border-[#E8E1D5] rounded-2xl h-[360px] sm:h-[440px] flex items-center justify-center p-6 overflow-hidden shadow-inner group">
        <Image
          src={activeImage.relative_path}
          alt={`${productName} - View ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />

        {displayImages.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-industrial-950/70 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
            {activeIndex + 1} / {displayImages.length} Photos
          </div>
        )}
      </div>

      {/* Thumbnails Row */}
      {displayImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {displayImages.map((img, idx) => (
            <button
              key={img.relative_path + idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative w-20 h-20 rounded-xl bg-[#FAF7F2] border-2 overflow-hidden flex-shrink-0 transition-all ${
                activeIndex === idx 
                  ? 'border-brand-blue shadow-md ring-2 ring-brand-blue/20' 
                  : 'border-[#E8E1D5] hover:border-[#D5CCBE] opacity-75 hover:opacity-100'
              }`}
            >
              <Image
                src={img.relative_path}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-contain p-1.5"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
