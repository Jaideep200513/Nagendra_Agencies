'use client';

import React, { useState } from 'react';
import { FileText, Download, MessageCircle, Phone } from 'lucide-react';
import { InquiryModal } from '../../../components/InquiryModal';

interface Props {
  productName: string;
  productId: string;
  price: string;
  brochurePath: string | null;
}

export function ProductInquiryAction({
  productName,
  productId,
  price,
  brochurePath,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappMessage = encodeURIComponent(
    `Hello Nagendra Agencies, I would like to request technical specifications & commercial quote for: ${productName} (${price}).`
  );

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => setIsOpen(true)}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-orange-700 text-white font-bold text-sm py-3.5 px-6 rounded-lg transition-colors shadow-sm active:scale-[0.98]"
        >
          <FileText className="w-4 h-4 text-white" />
          Request Commercial Quotation
        </button>

        {brochurePath && (
          <a
            href={brochurePath}
            download
            className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm py-3.5 px-5 rounded-lg transition-colors active:scale-[0.98]"
          >
            <Download className="w-4 h-4 text-slate-600" />
            PDF Brochure
          </a>
        )}

        <a
          href={`https://wa.me/9104027707687?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-industrial-950 hover:bg-industrial-850 text-white font-bold text-sm py-3.5 px-5 rounded-lg transition-colors active:scale-[0.98]"
          title="Inquire directly via WhatsApp"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          WhatsApp
        </a>
      </div>

      {/* Mobile Sticky Bottom Conversion Bar (< lg) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-300 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.12)] pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
          <div className="min-w-0">
            <span className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider">Wholesale Price</span>
            <span className="block font-heading font-black text-base text-neutral-950 truncate">{price}</span>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href="tel:04027707687"
              className="w-11 h-11 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 flex items-center justify-center text-neutral-900 active:scale-95 transition-all shadow-sm"
              aria-label="Call Direct Desk"
              title="Call 040 2770 7687"
            >
              <Phone className="w-5 h-5 text-brand-orange" />
            </a>

            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-orange hover:bg-orange-700 text-white font-bold text-sm shadow-md active:scale-95 transition-all"
            >
              <FileText className="w-4 h-4 text-white" />
              <span>Get Quote</span>
            </button>
          </div>
        </div>
      </div>

      <InquiryModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        productTitle={productName}
        productId={productId}
        price={price}
      />
    </>
  );
}
