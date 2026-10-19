'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductCard } from '../../components/ProductCard';
import { getAllProducts, getAllCategories } from '../../data/products';
import { Search, SlidersHorizontal, X, AlertCircle } from 'lucide-react';

export default function ProductsPage() {
  const allProducts = useMemo(() => getAllProducts(), []);
  const categories = useMemo(() => getAllCategories(), []);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('default');

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((p) => {
        // Category check
        const matchCategory =
          selectedCategory === 'all' || p.categorySlug === selectedCategory;
        if (!matchCategory) return false;

        // Search check
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase().trim();
        const matchName = p.name.toLowerCase().includes(q);
        const matchCat = p.category.toLowerCase().includes(q);
        const matchDesc = (p.description || '').toLowerCase().includes(q);
        const matchSpecs = Object.entries(p.specifications || {}).some(
          ([k, v]) => k.toLowerCase().includes(q) || String(v).toLowerCase().includes(q)
        );
        return matchName || matchCat || matchDesc || matchSpecs;
      })
      .sort((a, b) => {
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
        if (sortBy === 'price-low') {
          const numA = parseInt((a.price_amount || '').replace(/[^0-9]/g, '')) || 0;
          const numB = parseInt((b.price_amount || '').replace(/[^0-9]/g, '')) || 0;
          return numA - numB;
        }
        if (sortBy === 'price-high') {
          const numA = parseInt((a.price_amount || '').replace(/[^0-9]/g, '')) || 0;
          const numB = parseInt((b.price_amount || '').replace(/[^0-9]/g, '')) || 0;
          return numB - numA;
        }
        return 0; // default order
      });
  }, [allProducts, selectedCategory, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('default');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      
      {/* Grounded Industrial Header Section with Full-Bleed Metallic Precision Background */}
      <section className="relative min-h-[460px] lg:min-h-[500px] flex items-center overflow-hidden border-b border-[#242E2E] bg-black text-white">
        {/* Full-Bleed Industrial Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/products-hero-metal.png"
            alt="Industrial Machinery Products - Nagendra Agencies"
            fill
            priority
            quality={100}
            unoptimized
            className="object-cover object-center"
          />
          {/* Directional Gradient Overlay: Light bottom fade on mobile so background image is bright and vivid; preserving exact desktop gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent md:bg-gradient-to-r md:from-black/95 md:via-black/85 sm:md:via-black/70 md:to-black/35"></div>
          <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40"></div>
        </div>

        {/* Hero Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10 w-full space-y-6">
          
          {/* Breadcrumb Navigation on Dark */}
          <div>
            <Breadcrumbs 
              items={[{ label: 'Products' }]} 
              isDark={true}
            />
          </div>

          <div className="max-w-4xl space-y-5">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black text-white leading-tight tracking-tight drop-shadow-lg">
              Products
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-neutral-200 font-normal leading-relaxed pt-1 drop-shadow">
              Explore our complete inventory of 28 industrial rice whitening, polishing, grain cleaning, parboiling, drying, and storage systems. Verified technical specifications, direct wholesale pricing, and nationwide road dispatch.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-6 text-sm text-neutral-300 border-t border-white/15">
              <div>
                <span className="block font-bold text-white text-base">28 Models</span>
                <span className="text-neutral-400">Complete Equipment Range</span>
              </div>
              <div className="h-8 w-px bg-white/20 hidden sm:block" />
              <div>
                <span className="block font-bold text-white text-base">9 Categories</span>
                <span className="text-neutral-400">Cleaning, Polishing, Milling & Silos</span>
              </div>
              <div className="h-8 w-px bg-white/20 hidden sm:block" />
              <div>
                <span className="block font-bold text-white text-base">Nationwide</span>
                <span className="text-neutral-400">Road Transport Across All States</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">

        {/* Industrial Search & Filter Control Panel */}
        <div className="bg-white rounded-lg border border-neutral-300 p-6 sm:p-8 space-y-6 shadow-sm">
          
          {/* Search Bar & Sort Dropdown Row */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-2xl">
              <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search machine name, category, capacity, or specs..."
                className="w-full text-sm sm:text-base pl-12 pr-10 py-3 rounded-md border border-neutral-300 bg-neutral-50 text-neutral-900 font-medium placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-200"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Results Count & Sort Dropdown */}
            <div className="flex items-center justify-between lg:justify-end gap-5 flex-shrink-0">
              <span className="text-sm sm:text-base text-neutral-700 font-semibold whitespace-nowrap">
                Showing <strong className="text-neutral-950 font-bold">{filteredProducts.length}</strong> of {allProducts.length} Machines
              </span>

              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-neutral-500 flex-shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm sm:text-base py-3 px-3.5 rounded-md border border-neutral-300 bg-white text-neutral-900 font-semibold focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 cursor-pointer transition-all duration-200"
                >
                  <option value="default">Default Order</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>
            </div>

          </div>

          {/* Equipment Category Tabs (Crisp Industrial Rectangular Tabs with Horizontal Mobile Swipe) */}
          <div className="pt-4 border-t border-neutral-200">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-500 mb-2.5 block">
              Filter by Category
            </span>

            <div className="flex overflow-x-auto pb-2.5 -mx-1 px-1 sm:mx-0 sm:px-0 sm:flex-wrap gap-2 sm:gap-2.5 scrollbar-none">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-base font-bold transition-all duration-150 whitespace-nowrap border active:scale-[0.97] flex-shrink-0 ${
                  selectedCategory === 'all'
                    ? 'bg-neutral-950 text-white border-neutral-950 shadow-sm'
                    : 'bg-neutral-100 text-neutral-800 border-neutral-300 hover:bg-neutral-200 hover:border-neutral-400'
                }`}
              >
                All Machinery ({allProducts.length})
              </button>

              {categories.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => setSelectedCategory(c.slug)}
                  className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-base font-bold transition-all duration-150 whitespace-nowrap border active:scale-[0.97] flex-shrink-0 ${
                    selectedCategory === c.slug
                      ? 'bg-neutral-950 text-white border-neutral-950 shadow-sm'
                      : 'bg-neutral-100 text-neutral-800 border-neutral-300 hover:bg-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  {c.name} ({c.productCount})
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Product Cards Grid with Smooth Motion Layout */}
        {filteredProducts.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="bg-white rounded-lg border border-neutral-300 p-12 text-center max-w-xl mx-auto space-y-5 shadow-sm">
            <div className="w-14 h-14 rounded-full bg-neutral-100 text-neutral-500 flex items-center justify-center mx-auto">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-neutral-950">
              No Machinery Matching Your Search
            </h3>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              We couldn&apos;t find any equipment matching &ldquo;{searchQuery}&rdquo;. Try another model name, processing capacity, or reset the filters.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 rounded-md bg-neutral-950 text-white text-sm sm:text-base font-bold hover:bg-neutral-800 transition-colors shadow-sm active:scale-95"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </main>

    </div>
  );
}
