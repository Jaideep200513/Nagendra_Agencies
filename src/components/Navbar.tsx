'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  Menu, 
  X, 
  FileText,
  MessageCircle
} from 'lucide-react';
import { InquiryModal } from './InquiryModal';

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  // Smart Sticky / Hide on Scroll Down, Reveal on Scroll Up
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollYRef = useRef(0);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsVisible(true);
  }, [pathname]);

  // Lock body scroll when mobile menu is open to prevent awkward background scroll
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Scroll listener for smart sticky navbar reveal on scroll-up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 15);

      // Keep navbar visible if mobile drawer is currently open
      if (isMobileMenuOpen) {
        setIsVisible(true);
        lastScrollYRef.current = currentScrollY;
        return;
      }

      // Always show when near the very top of page
      if (currentScrollY < 60) {
        setIsVisible(true);
        lastScrollYRef.current = currentScrollY;
        return;
      }

      const diff = currentScrollY - lastScrollYRef.current;

      // Scrolling UP (even slightly by 5px or more) -> appear at top
      if (diff < -5) {
        setIsVisible(true);
      } 
      // Scrolling DOWN by more than 10px -> hide off-screen
      else if (diff > 10 && currentScrollY > 100) {
        setIsVisible(false);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Smart Sticky Header: Slides in when scrolling up anywhere on the page */}
      <header 
        className={`sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E1D5] transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 h-20 sm:h-[84px] flex items-center justify-between gap-4">
          
          {/* Brand Logo & Title */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 group min-w-0 flex-shrink-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white p-1 sm:p-1.5 border-2 border-amber-500/30 shadow-md flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:border-brand-orange group-hover:scale-105 transition-all">
              <Image 
                src="/assets/company/logo.png" 
                alt="Nagendra Agencies Logo" 
                width={56} 
                height={56} 
                className="object-contain"
                priority
              />
            </div>
            <div className="min-w-0">
              <span className="font-heading font-black text-xl sm:text-2xl lg:text-[26px] text-industrial-950 tracking-tight block leading-tight truncate">
                NAGENDRA AGENCIES
              </span>
              <span className="text-[9px] sm:text-[11px] lg:text-xs font-bold text-emerald-800 tracking-wider uppercase block mt-0.5 truncate max-w-[220px] xs:max-w-none">
                Rice Milling & Grain Processing Machinery
              </span>
            </div>
          </Link>

          {/* 4 Simple Desktop Options: Home, Products, About, Contact & Inquiry */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-9 flex-shrink-0">
            <Link 
              href="/" 
              className={`text-[15px] font-bold whitespace-nowrap transition-colors py-1 ${
                pathname === '/' ? 'text-brand-orange' : 'text-slate-700 hover:text-industrial-950'
              }`}
            >
              Home
            </Link>

            <Link 
              href="/products" 
              className={`text-[15px] font-bold whitespace-nowrap transition-colors py-1 ${
                pathname.startsWith('/products') || pathname.startsWith('/categories') 
                  ? 'text-brand-orange' 
                  : 'text-slate-700 hover:text-industrial-950'
              }`}
            >
              Products
            </Link>

            <Link 
              href="/about" 
              className={`text-[15px] font-bold whitespace-nowrap transition-colors py-1 ${
                pathname === '/about' ? 'text-brand-orange' : 'text-slate-700 hover:text-industrial-950'
              }`}
            >
              About
            </Link>

            <Link 
              href="/contact" 
              className={`text-[15px] font-bold whitespace-nowrap transition-colors py-1 ${
                pathname === '/contact' ? 'text-brand-orange' : 'text-slate-700 hover:text-industrial-950'
              }`}
            >
              Contact and Inquiry
            </Link>
          </nav>

          {/* Desktop Right Actions: Call Option, WhatsApp Option, Request Formal Price Quotation */}
          <div className="hidden lg:flex items-center gap-2.5 xl:gap-3 flex-shrink-0">
            {/* The Call Option */}
            <a 
              href="tel:04027707687" 
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/70 hover:bg-white border border-[#E8E1D5] text-industrial-950 hover:text-brand-orange transition-all shadow-sm active:scale-95 text-xs xl:text-sm font-bold"
              title="Call Direct Desk: 040 2770 7687"
            >
              <Phone className="w-4 h-4 text-brand-orange flex-shrink-0" />
              <span>040 2770 7687</span>
            </a>

            {/* The WhatsApp Option */}
            <a 
              href="https://wa.me/9104027707687?text=Hello%20Nagendra%20Agencies%2C%20I%20am%20inquiring%20about%20grain%20milling%20machinery." 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs xl:text-sm font-bold transition-all shadow-sm active:scale-95"
              title="Chat with Nagendra Agencies on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>WhatsApp</span>
            </a>

            {/* Request Formal Price Quotation Button */}
            <button
              onClick={() => setIsInquiryModalOpen(true)}
              className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-700 text-white text-xs xl:text-sm font-bold px-4 py-2.5 rounded-lg transition-all whitespace-nowrap shadow-sm hover:shadow-md active:scale-95"
            >
              <FileText className="w-4 h-4 text-white" />
              <span>Request Formal Price Quotation</span>
            </button>
          </div>

          {/* Clean Mobile Menu Trigger on Right */}
          <div className="flex items-center lg:hidden flex-shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="w-11 h-11 rounded-xl bg-white border border-[#E8E1D5] hover:bg-[#FAF7F2] flex items-center justify-center text-neutral-900 active:scale-95 transition-all shadow-sm"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* FIXED Full-Viewport Mobile Menu Drawer (Slides down directly in front of the user) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-start">
            {/* Dark Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Slide-Down Menu Sheet (Directly at top of viewport, no scrolling up needed) */}
            <motion.div 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full bg-white rounded-b-3xl shadow-2xl border-b border-[#E8E1D5] px-6 pt-5 pb-8 space-y-6 max-h-[90vh] overflow-y-auto z-10"
            >
              {/* Drawer Header: Brand + Direct Close Button */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <Link 
                  href="/" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="flex items-center gap-2.5 min-w-0"
                >
                  <div className="w-10 h-10 rounded-xl bg-white p-1 border-2 border-amber-500/30 shadow-sm flex items-center justify-center flex-shrink-0">
                    <Image 
                      src="/assets/company/logo.png" 
                      alt="Nagendra Agencies" 
                      width={40} 
                      height={40} 
                      className="object-contain" 
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="font-heading font-black text-lg text-industrial-950 block leading-tight truncate">
                      NAGENDRA AGENCIES
                    </span>
                    <span className="text-[9px] font-bold text-emerald-800 tracking-wider uppercase block truncate">
                      Rice Milling Machinery
                    </span>
                  </div>
                </Link>

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-xl bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-800 active:scale-95 transition-all shadow-sm flex-shrink-0"
                  aria-label="Close Menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Clean Vertical Navigation Links */}
              <nav className="flex flex-col space-y-4 pt-1">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-xl font-heading font-bold transition-colors py-1 ${
                    pathname === '/' ? 'text-brand-orange' : 'text-industrial-950 hover:text-brand-orange'
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-xl font-heading font-bold transition-colors py-1 ${
                    pathname.startsWith('/products') || pathname.startsWith('/categories')
                      ? 'text-brand-orange'
                      : 'text-industrial-950 hover:text-brand-orange'
                  }`}
                >
                  Products
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-xl font-heading font-bold transition-colors py-1 ${
                    pathname === '/about' ? 'text-brand-orange' : 'text-industrial-950 hover:text-brand-orange'
                  }`}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-xl font-heading font-bold transition-colors py-1 ${
                    pathname === '/contact' ? 'text-brand-orange' : 'text-industrial-950 hover:text-brand-orange'
                  }`}
                >
                  Contact and Inquiry
                </Link>
              </nav>

              {/* Primary Call-to-Action & Contact Actions */}
              <div className="pt-4 border-t border-neutral-100 space-y-3">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsInquiryModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-brand-orange hover:bg-orange-700 text-white font-heading font-bold text-base py-3.5 rounded-xl shadow-md transition-all active:scale-[0.98]"
                >
                  <FileText className="w-5 h-5 text-white" />
                  <span>Request Formal Price Quotation</span>
                </button>

                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <a
                    href="tel:04027707687"
                    className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-bold text-xs border border-neutral-200 transition-colors active:scale-[0.98]"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-orange flex-shrink-0" />
                    <span>040 2770 7687</span>
                  </a>
                  <a
                    href="https://wa.me/9104027707687?text=Hello%20Nagendra%20Agencies%2C%20I%20have%20an%20inquiry."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 transition-colors active:scale-[0.98]"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Reusable Global Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
      />
    </>
  );
}
