'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Star, 
  ChevronDown, 
  Menu, 
  X, 
  FileText,
  ArrowRight,
  MessageCircle
} from 'lucide-react';
import { getAllCategories } from '../data/products';
import { InquiryModal } from './InquiryModal';

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    setCategories(getAllCategories());
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProductsDropdownOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Main Navbar - Full-Width Edge Layout, Spaced Out & Crisp */}
      <header className="sticky top-0 z-50 bg-[#FAF8F5] border-b border-[#E8E1D5] shadow-sm">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 h-20 sm:h-[88px] flex items-center justify-between gap-6">
          
          {/* Brand Logo & Title - Positioned nicely to the left */}
          <Link href="/" className="flex items-center gap-3 sm:gap-4 group flex-shrink-0">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white p-1.5 border-2 border-amber-500/30 shadow-md flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:border-brand-orange group-hover:scale-105 transition-all">
              <Image 
                src="/assets/company/logo.png" 
                alt="Nagendra Agencies Logo" 
                width={60} 
                height={60} 
                className="object-contain"
                priority
              />
            </div>
            <div className="min-w-0">
              <span className="font-heading font-black text-2xl sm:text-[28px] text-industrial-950 tracking-tight block leading-tight whitespace-nowrap">
                NAGENDRA AGENCIES
              </span>
              <span className="text-[11px] sm:text-xs font-bold text-emerald-800 tracking-wider uppercase block mt-0.5 whitespace-nowrap">
                Rice Milling & Grain Processing Machinery
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Spaced Out Generously, No Wrapping */}
          <nav className="hidden lg:flex items-center gap-7 lg:gap-9 xl:gap-12 flex-shrink-0">
            <Link 
              href="/" 
              className={`text-[15px] sm:text-base font-bold whitespace-nowrap transition-colors py-1 ${
                pathname === '/' ? 'text-brand-orange' : 'text-slate-700 hover:text-industrial-950'
              }`}
            >
              Home
            </Link>

            <Link 
              href="/about" 
              className={`text-[15px] sm:text-base font-bold whitespace-nowrap transition-colors py-1 ${
                pathname === '/about' ? 'text-brand-orange' : 'text-slate-700 hover:text-industrial-950'
              }`}
            >
              About
            </Link>

            {/* Products Mega Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsProductsDropdownOpen(true)}
              onMouseLeave={() => setIsProductsDropdownOpen(false)}
            >
              <Link 
                href="/products" 
                className={`text-[15px] sm:text-base font-bold flex items-center gap-1.5 whitespace-nowrap transition-colors py-2 ${
                  pathname.startsWith('/products') || pathname.startsWith('/categories') 
                    ? 'text-brand-orange' 
                    : 'text-slate-700 hover:text-industrial-950'
                }`}
              >
                Products
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isProductsDropdownOpen ? 'rotate-180' : ''}`} />
              </Link>

              {/* Dropdown Menu - Smooth Silky Reveal */}
              <AnimatePresence>
                {isProductsDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 8, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.99 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full -left-28 w-[760px] bg-[#FDFCF9] rounded-2xl shadow-2xl border border-[#E8E1D5] p-7 grid grid-cols-2 gap-3.5 transition-all z-50"
                  >
                    <div className="col-span-2 pb-3 mb-1 border-b border-[#E8E1D5] flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-500">
                        Product Categories (9 Categories • 28 Machines)
                      </span>
                      <Link 
                        href="/products" 
                        className="group/all text-xs sm:text-sm font-extrabold text-brand-orange hover:text-amber-700 flex items-center gap-1.5 transition-colors"
                      >
                        <span>View All 28 Machines</span>
                        <ArrowRight className="w-4 h-4 group-hover/all:translate-x-1 transition-transform" />
                      </Link>
                    </div>

                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/categories/${cat.slug}`}
                        className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-[#FAF7F2] border border-transparent hover:border-[#E8E1D5] transition-all group active:scale-[0.99]"
                      >
                        <div className="w-13 h-13 sm:w-14 sm:h-14 w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] rounded-xl bg-white p-2 flex-shrink-0 flex items-center justify-center border border-[#E8E1D5] shadow-sm group-hover:scale-105 group-hover:border-brand-orange/40 transition-transform">
                          <Image 
                            src={cat.image} 
                            alt={cat.name} 
                            width={44} 
                            height={44} 
                            className="object-contain max-h-full" 
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm sm:text-[15px] font-extrabold text-industrial-950 group-hover:text-brand-orange truncate transition-colors">
                            {cat.name}
                          </div>
                          <div className="text-xs sm:text-[13px] text-slate-500 font-medium mt-0.5">
                            {cat.productCount} {cat.productCount === 1 ? 'Machine Model' : 'Models Available'}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link 
              href="/contact" 
              className={`text-[15px] sm:text-base font-bold whitespace-nowrap transition-colors py-1 ${
                pathname === '/contact' ? 'text-brand-orange' : 'text-slate-700 hover:text-industrial-950'
              }`}
            >
              Contact & Inquiry
            </Link>
          </nav>

          {/* Desktop Right Actions - Spaced & Scaled */}
          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
            <a 
              href="tel:04027707687" 
              className="flex items-center gap-2.5 px-3 py-1.5 text-industrial-950 hover:text-brand-orange transition-colors"
              title="Call Central Secunderabad Office"
            >
              <Phone className="w-4 h-4 text-brand-orange flex-shrink-0" />
              <div className="text-left leading-tight">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Direct Desk</span>
                <span className="text-sm font-bold text-industrial-950">040 2770 7687</span>
              </div>
            </a>

            <button
              onClick={() => setIsInquiryModalOpen(true)}
              className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-700 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap shadow-sm"
            >
              <FileText className="w-4 h-4 text-white" />
              Request Quotation
            </button>
          </div>

          {/* Mobile Action Buttons & Menu Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="tel:04027707687"
              className="w-10 h-10 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-[#E8E1D5] flex items-center justify-center text-brand-orange active:scale-95 transition-all shadow-sm"
              aria-label="Call Direct Desk"
              title="Call Direct: 040 2770 7687"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/9104027707687?text=Hello%20Nagendra%20Agencies%2C%20I%20am%20inquiring%20about%20grain%20machinery."
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 active:scale-95 transition-all shadow-sm"
              aria-label="Chat on WhatsApp"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 rounded-xl bg-white border border-[#E8E1D5] hover:bg-[#FAF7F2] flex items-center justify-center text-neutral-900 active:scale-95 transition-all shadow-sm"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer with Smooth AnimatePresence */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden bg-[#FAF8F5] border-b border-[#E8E1D5] px-4 pt-4 pb-8 space-y-5 overflow-hidden shadow-2xl"
            >
              {/* Primary Links Grid */}
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-center py-3 px-4 rounded-xl font-bold text-sm border transition-all active:scale-[0.98] ${
                    pathname === '/'
                      ? 'bg-neutral-950 text-white border-neutral-950 shadow-sm'
                      : 'bg-white text-neutral-800 border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-center py-3 px-4 rounded-xl font-bold text-sm border transition-all active:scale-[0.98] ${
                    pathname.startsWith('/products') || pathname.startsWith('/categories')
                      ? 'bg-brand-orange text-white border-brand-orange shadow-sm'
                      : 'bg-white text-neutral-800 border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  All 28 Products
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-center py-3 px-4 rounded-xl font-bold text-sm border transition-all active:scale-[0.98] ${
                    pathname === '/about'
                      ? 'bg-neutral-950 text-white border-neutral-950 shadow-sm'
                      : 'bg-white text-neutral-800 border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  About Firm
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-center py-3 px-4 rounded-xl font-bold text-sm border transition-all active:scale-[0.98] ${
                    pathname === '/contact'
                      ? 'bg-neutral-950 text-white border-neutral-950 shadow-sm'
                      : 'bg-white text-neutral-800 border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  Contact & Inquiry
                </Link>
              </div>

              {/* Machinery Categories Mobile Visual Grid */}
              <div className="space-y-2.5 pt-2 border-t border-neutral-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-neutral-500">
                    Machinery Categories (9)
                  </span>
                  <Link
                    href="/products"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xs font-bold text-brand-orange hover:text-orange-700"
                  >
                    Browse All 28 →
                  </Link>
                </div>
                
                <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/categories/${c.slug}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-neutral-200 hover:border-brand-orange transition-all active:scale-[0.98]"
                    >
                      <div className="w-9 h-9 rounded-md bg-neutral-50 p-1 flex items-center justify-center flex-shrink-0 border border-neutral-100">
                        <Image
                          src={c.image}
                          alt={c.name}
                          width={28}
                          height={28}
                          className="object-contain max-h-full"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block text-xs font-bold text-neutral-950 truncate">
                          {c.name}
                        </span>
                        <span className="block text-[10px] text-neutral-500 font-medium">
                          {c.productCount} {c.productCount === 1 ? 'model' : 'models'}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Direct Contact & Action Bar */}
              <div className="pt-2 border-t border-neutral-200 space-y-2.5">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsInquiryModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-brand-orange hover:bg-orange-700 text-white font-bold text-sm py-3.5 rounded-xl shadow-md transition-all active:scale-95"
                >
                  <FileText className="w-4 h-4 text-white" />
                  Request Formal Price Quotation
                </button>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <a
                    href="tel:04027707687"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-bold border border-neutral-200 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-orange" />
                    <span>040 2770 7687</span>
                  </a>
                  <a
                    href="https://wa.me/9104027707687?text=Hello%20Nagendra%20Agencies%2C%20I%20have%20an%20inquiry."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Reusable Global Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
      />
    </>
  );
}
