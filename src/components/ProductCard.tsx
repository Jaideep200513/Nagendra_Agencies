'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
import { Product } from '../data/types';
import { InquiryModal } from './InquiryModal';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const mainImage = product.local_images?.[0]?.relative_path || '/assets/company/logo.png';
  const topSpecs = Object.entries(product.specifications || {}).slice(0, 3);

  return (
    <>
      <article className="group bg-white rounded-lg border border-neutral-300 hover:border-neutral-900 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col overflow-hidden">
        
        {/* Card Media Header with Smooth Image Zoom */}
        <Link 
          href={`/products/${product.slug}`}
          className="relative bg-neutral-100 h-64 sm:h-72 flex items-center justify-center p-6 border-b border-neutral-200 overflow-hidden"
        >
          <span className="absolute top-3.5 left-3.5 z-10 text-xs font-bold tracking-wider uppercase px-3 py-1 rounded bg-black text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
            {product.category}
          </span>

          <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500 ease-out flex items-center justify-center">
            <Image
              src={mainImage}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain"
              loading="lazy"
            />
          </div>
        </Link>

        {/* Card Body */}
        <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-heading font-bold text-base sm:text-xl text-neutral-950 group-hover:text-brand-orange transition-colors duration-200 line-clamp-2 min-h-[3rem] sm:min-h-[3.5rem] mb-2 leading-snug">
              <Link href={`/products/${product.slug}`}>
                {product.name}
              </Link>
            </h3>

            {/* Price Display */}
            <div className="flex items-baseline gap-2 mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl font-black text-neutral-950 tracking-tight">
                {product.price_amount || product.price}
              </span>
              {product.price_unit && (
                <span className="text-xs sm:text-sm font-semibold text-neutral-500">
                  / {product.price_unit.replace('/', '').trim()}
                </span>
              )}
            </div>

            {/* Specifications Snippet - Crisp Lines */}
            <div className="bg-neutral-50 rounded-md p-3 sm:p-3.5 space-y-1.5 sm:space-y-2 text-xs sm:text-sm border border-neutral-200 mb-4 sm:mb-5 group-hover:border-neutral-300 transition-colors">
              {topSpecs.length > 0 ? (
                topSpecs.map(([k, v]) => (
                  <div key={k} className="flex justify-between items-center text-neutral-800">
                    <span className="text-neutral-500 font-medium truncate pr-2">{k}:</span>
                    <strong className="text-neutral-950 truncate text-right font-bold">{v}</strong>
                  </div>
                ))
              ) : (
                <div className="flex items-center gap-2 text-neutral-700 font-semibold text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Industrial Heavy Duty Grade</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons - Tactile & Responsive with Mobile Touch Targets */}
          <div className="pt-3 border-t border-neutral-200 flex items-center gap-2">
            <Link
              href={`/products/${product.slug}`}
              className="group/btn flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-base font-bold py-2.5 sm:py-2.5 px-2.5 sm:px-3 rounded-lg bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-900 border border-neutral-300 hover:border-neutral-900 transition-all duration-200 active:scale-[0.98]"
            >
              <span>Specs & Details</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
            </Link>

            <button
              onClick={() => setIsInquiryOpen(true)}
              className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-base font-bold py-2.5 sm:py-2.5 px-3.5 sm:px-4 rounded-lg bg-brand-orange hover:bg-orange-700 text-white shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 whitespace-nowrap"
              title="Get quotation for this product"
            >
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              Quote
            </button>
          </div>
        </div>
      </article>

      {/* Product-Specific Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        productTitle={product.name}
        productId={product.id}
        price={product.price}
      />
    </>
  );
}
