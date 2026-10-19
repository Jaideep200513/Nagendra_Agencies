'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Send, MessageCircle, CheckCircle, Building2 } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle?: string;
  productId?: string;
  price?: string;
}

export function InquiryModal({
  isOpen,
  onClose,
  productTitle,
  productId,
  price,
}: InquiryModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [quantity, setQuantity] = useState('1 Unit');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      // Auto close after 3 seconds if submitted
    }, 3000);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName('');
    setPhone('');
    setEmail('');
    setQuantity('1 Unit');
    setCity('');
    setMessage('');
    onClose();
  };

  const defaultTitle = productTitle || 'General Machinery Inquiry';

  // Direct WhatsApp Message link generator
  const whatsappText = encodeURIComponent(
    `Hello Nagendra Agencies, I am interested in: ${defaultTitle}${price ? ` (${price})` : ''}. Please provide technical catalog and quotation.`
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Smooth Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm" 
            onClick={handleReset}
          />

          {/* Centering / Mobile Bottom-Sheet wrapper */}
          <div className="flex min-h-full items-end sm:items-center justify-center p-0 sm:p-4 md:p-6">
            {/* Modal Dialog with smooth entrance and exit */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 16 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white rounded-t-2xl sm:rounded-xl shadow-2xl border border-neutral-300 border-t-4 border-t-brand-orange w-full max-w-2xl max-h-[92vh] sm:max-h-[860px] flex flex-col z-10 overflow-hidden sm:my-auto"
            >
              <button
                onClick={handleReset}
                className="group absolute top-3.5 sm:top-5 right-3.5 sm:right-5 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 flex items-center justify-center text-neutral-600 hover:text-neutral-950 transition-colors z-20 active:scale-95"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
              </button>

          {isSubmitted ? (
            <div className="p-6 sm:p-10 text-center space-y-4 sm:space-y-6 overflow-y-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border-2 border-emerald-300">
                <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-heading font-black text-neutral-950">
                Quotation Request Received!
              </h3>
              <p className="text-neutral-700 text-sm sm:text-base lg:text-lg max-w-lg mx-auto leading-relaxed">
                Thank you, <strong className="text-neutral-950 font-bold">{name}</strong>. Your requirement for{' '}
                <strong className="text-brand-orange font-bold">{defaultTitle}</strong> has been logged with our Secunderabad commercial sales desk.
              </p>
              <div className="bg-neutral-50 p-4 sm:p-5 rounded-lg border border-neutral-200 text-xs sm:text-sm lg:text-base text-neutral-700 max-w-lg mx-auto text-left space-y-1.5 sm:space-y-2">
                <p>📍 Delivery Location: <strong className="text-neutral-950">{city || 'Specified Destination'}</strong></p>
                <p>📞 Registered Phone: <strong className="text-neutral-950">{phone}</strong></p>
                <p>🏢 Commercial Desk: <strong className="text-neutral-950">Mr. Nagendra Prasad Gubbala</strong> (CEO, Nagendra Agencies)</p>
              </div>
              <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button
                  onClick={handleReset}
                  className="bg-neutral-900 text-white font-bold text-sm sm:text-base px-6 py-3 sm:py-3.5 rounded-lg hover:bg-neutral-800 transition-colors active:scale-95"
                >
                  Close Window
                </button>
                <a
                  href={`https://wa.me/9104027707687?text=${whatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm sm:text-base px-6 py-3 sm:py-3.5 rounded-lg transition-colors active:scale-95"
                >
                  <MessageCircle className="w-5 h-5" /> Connect on WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full overflow-hidden">
              {/* Fixed Header */}
              <div className="flex-shrink-0 px-5 sm:px-7 pt-4 sm:pt-5 pb-3 sm:pb-4 border-b border-neutral-200 pr-14 sm:pr-16">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-heading font-black text-neutral-950 tracking-tight">
                  Request Formal Quotation
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 mt-0.5 font-medium">
                  Nagendra Agencies • Secunderabad (Industrial Machinery Wholesaler Since 2005)
                </p>
              </div>

              {/* Scrollable Form Body */}
              <div className="overflow-y-auto flex-1 px-5 sm:px-7 py-3.5 sm:py-4 space-y-3.5 sm:space-y-4">
                {/* Target Machinery Banner */}
                <div className="bg-neutral-50 rounded-lg p-3 sm:p-4 border border-neutral-200 border-l-4 border-l-brand-orange flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] sm:text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-0.5">
                      Target Machinery
                    </span>
                    <span className="font-heading font-black text-base sm:text-lg text-neutral-950 block">
                      {defaultTitle}
                    </span>
                  </div>
                  {price && (
                    <div className="sm:text-right border-t sm:border-t-0 pt-1.5 sm:pt-0 border-neutral-200">
                      <span className="text-[10px] sm:text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-0.5">
                        Catalog Price
                      </span>
                      <span className="font-heading font-black text-base sm:text-lg text-brand-orange block">
                        {price}
                      </span>
                    </div>
                  )}
                </div>

                <form id="inquiry-form" onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-neutral-900 mb-1">
                        Your Full Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rajesh Reddy"
                        className="w-full text-base px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 text-neutral-950 bg-neutral-50/50 focus:bg-white transition-colors font-medium placeholder:text-neutral-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-neutral-900 mb-1">
                        Phone / Mobile Number <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full text-base px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 text-neutral-950 bg-neutral-50/50 focus:bg-white transition-colors font-medium placeholder:text-neutral-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-neutral-900 mb-1">
                        Installation City / State <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Karimnagar, Telangana"
                        className="w-full text-base px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 text-neutral-950 bg-neutral-50/50 focus:bg-white transition-colors font-medium placeholder:text-neutral-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-neutral-900 mb-1">
                        Required Quantity
                      </label>
                      <input
                        type="text"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="e.g. 1 Unit, 2 Sets"
                        className="w-full text-base px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 text-neutral-950 bg-neutral-50/50 focus:bg-white transition-colors font-medium placeholder:text-neutral-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-neutral-900 mb-1">
                      Email Address <span className="text-neutral-500 font-normal text-[11px] sm:text-xs">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. contact@yourmill.com"
                      className="w-full text-base px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 text-neutral-950 bg-neutral-50/50 focus:bg-white transition-colors font-medium placeholder:text-neutral-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-neutral-900 mb-1">
                      Specific Milling Requirements / Remarks
                    </label>
                    <textarea
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Specify raw material (paddy / parboiled), capacity required (tons/hr), electric power specs, or delivery urgency..."
                      className="w-full text-base px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 text-neutral-950 bg-neutral-50/50 focus:bg-white transition-colors font-medium placeholder:text-neutral-400"
                    />
                  </div>

                  <div className="pt-1 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                    <button
                      type="submit"
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-orange-700 text-white font-bold text-sm sm:text-base py-3 sm:py-3.5 px-5 rounded-lg transition-colors shadow-sm"
                    >
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" /> Submit Quotation Request
                    </button>

                    <a
                      href={`https://wa.me/9104027707687?text=${whatsappText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm sm:text-base px-5 py-3 sm:py-3.5 rounded-lg transition-colors shadow-sm"
                      title="Chat directly on WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" /> WhatsApp Inquiry
                    </a>
                  </div>
                </form>
              </div>

              {/* Fixed Footer Bar */}
              <div className="flex-shrink-0 px-5 sm:px-7 py-2.5 sm:py-3 bg-neutral-100 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2 text-xs sm:text-sm text-neutral-700">
                <a
                  href="tel:04027707687"
                  className="flex items-center gap-1.5 font-semibold hover:text-brand-orange transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-orange" /> Landline: <strong>040 2770 7687</strong>
                </a>
                <span className="flex items-center gap-1.5 font-medium">
                  <Building2 className="w-3.5 h-3.5 text-emerald-700" /> Ranigunj, Secunderabad
                </span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )}
</AnimatePresence>
  );
}
