import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  ShieldCheck, 
  PhoneCall, 
  Building2, 
  Check,
  Phone,
  MapPin,
  MessageCircle,
  FileText
} from 'lucide-react';
import { getAllCategories, getAllProducts } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { FadeIn, StaggerContainer, StaggerItem, AnimatedStatNumber, SectionTransition } from '../components/MotionWrapper';
import { HomeInfrastructureGallery } from '../components/HomeInfrastructureGallery';

export default function HomePage() {
  const categories = getAllCategories();
  const allProducts = getAllProducts();
  const featuredProducts = allProducts.slice(0, 8); // Top featured machines
  const mobileFeaturedProducts = allProducts.slice(0, 4); // Top 4 for clean mobile height

  return (
    <>
      {/* ========================================================================= */}
      {/* DESKTOP VERSION: 100% UNCHANGED, PRESERVED EXACTLY AS CREATED            */}
      {/* ========================================================================= */}
      <div className="hidden lg:block space-y-20 pb-20">
        
        {/* Full-Bleed Agro-Tech Hero Section (Desktop) */}
        <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden border-b border-emerald-950 bg-black">
          {/* Full-bleed Rice Crop Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/hero-rice-crop.jpg"
              alt="Nagendra Agencies - Serving Rice Millers Since 2005"
              fill
              priority
              sizes="100vw"
              className="object-cover object-right md:object-center transform scale-100 hover:scale-[1.01] transition-transform duration-1000 ease-out"
            />
            {/* Directional Gradient Overlay to ensure text readability on the left while keeping the natural golden crop fully visible on the right */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 sm:via-black/55 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
          </div>

          {/* Hero Content Container */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-32 relative z-10 w-full">
            <div className="max-w-3xl lg:max-w-4xl space-y-6 sm:space-y-8">

              <FadeIn direction="up" delay={0.05}>
                <h1 className="text-3xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading font-black tracking-tight text-white leading-tight sm:leading-[1.06] drop-shadow-2xl">
                  Serving Rice Millers <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                    Since 2005
                  </span>
                </h1>
              </FadeIn>

              <FadeIn direction="up" delay={0.12}>
                <p className="text-base sm:text-2xl text-slate-100 font-medium leading-relaxed max-w-3xl drop-shadow-md">
                  Trusted machinery wholesaler supplying industrial rice whiteners, silky polishers, and grain processing equipment across India.
                </p>
              </FadeIn>

              <FadeIn direction="up" delay={0.18}>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
                  <Link
                    href="/products"
                    className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-brand-orange hover:bg-orange-700 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-xl transition-all duration-200 uppercase tracking-wider active:scale-[0.98] hover:-translate-y-0.5 text-center"
                  >
                    <span>Explore Products (28 Machines)</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
                  </Link>

                  <Link
                    href="/about"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-black/80 hover:bg-black text-white font-bold text-sm sm:text-base border border-neutral-700 hover:border-neutral-500 transition-all duration-200 shadow-md active:scale-[0.98] hover:-translate-y-0.5 text-center"
                  >
                    About Firm & Works
                  </Link>
                </div>
              </FadeIn>

              {/* Micro Trust Strip - Metric Grid */}
              <FadeIn direction="up" delay={0.24}>
                <div className="pt-6 sm:pt-8 border-t border-white/20 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 sm:p-4 border border-white/10 flex flex-col justify-center">
                    <AnimatedStatNumber value={20} suffix="+" className="text-2xl sm:text-4xl font-black font-heading text-amber-400" />
                    <span className="text-xs sm:text-sm text-slate-200 font-semibold mt-0.5">Years Wholesaling</span>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 sm:p-4 border border-white/10 flex flex-col justify-center">
                    <AnimatedStatNumber value={28} className="text-2xl sm:text-4xl font-black font-heading text-emerald-400" />
                    <span className="text-xs sm:text-sm text-slate-200 font-semibold mt-0.5">Machinery Models</span>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 sm:p-4 border border-white/10 flex flex-col justify-center">
                    <AnimatedStatNumber value={9} className="text-2xl sm:text-4xl font-black font-heading text-white" />
                    <span className="text-xs sm:text-sm text-slate-200 font-semibold mt-0.5">Plant Categories</span>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 sm:p-4 border border-white/10 flex flex-col justify-center">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-sm sm:text-base">
                      <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      <span>GST Verified</span>
                    </div>
                    <span className="text-[11px] sm:text-xs text-slate-200 font-medium mt-0.5 truncate">Secunderabad, Telangana</span>
                  </div>
                </div>
              </FadeIn>

            </div>
          </div>
        </section>

        {/* Product Categories Overview Section (Desktop) */}
        <SectionTransition id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-b border-[#E8E1D5] pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-2">
                Machinery Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-industrial-950">
                Machinery by Industrial Category
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-base sm:text-lg transition-all shadow-sm hover:shadow-md whitespace-nowrap self-start md:self-auto group"
            >
              <span>Browse All 28 Products</span>
              <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <StaggerItem key={cat.slug}>
                <Link
                  href={`/categories/${cat.slug}`}
                  className="group bg-[#FEFCFA] rounded-2xl border border-[#E8E1D5] p-7 flex flex-col justify-between hover:border-brand-orange hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out h-full active:scale-[0.99]"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className="w-20 h-20 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] p-2.5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:border-brand-orange/40 transition-all duration-300">
                        <Image
                          src={cat.image}
                          alt={cat.name}
                          width={64}
                          height={64}
                          className="object-contain max-h-full"
                        />
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#F5EFE6] text-slate-700 transition-colors group-hover:bg-amber-100 group-hover:text-amber-900">
                        {cat.productCount} {cat.productCount === 1 ? 'Machine' : 'Machines'}
                      </span>
                    </div>

                    <h3 className="font-heading font-black text-xl sm:text-2xl text-industrial-950 group-hover:text-brand-orange transition-colors mb-3 leading-snug">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-6 font-normal">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E8E1D5] flex items-center justify-between text-sm font-black text-slate-700 group-hover:text-brand-orange transition-colors">
                    <span>Explore Machinery Models</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-200" />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </SectionTransition>

        {/* Featured Machinery Grid (Desktop) */}
        <SectionTransition id="featured" className="bg-[#F4EFE6]/75 py-20 border-y border-[#E8E1D5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn direction="up">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-2">
                  Catalog Highlights
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-industrial-950">
                  Featured Grain Processing Equipment
                </h2>
                <p className="text-base sm:text-lg text-slate-600 mt-3">
                  All machinery supplied with verified specifications, genuine components, and transparent commercial pricing.
                </p>
              </div>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
              {featuredProducts.map((p) => (
                <StaggerItem key={p.id}>
                  <ProductCard product={p} />
                </StaggerItem>
              ))}
            </StaggerContainer>

            <FadeIn direction="up" delay={0.15}>
              <div className="mt-14 text-center">
                <Link
                  href="/products"
                  className="group inline-flex items-center gap-2.5 px-9 py-4 rounded-xl bg-industrial-950 hover:bg-neutral-900 text-white font-black text-base shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 hover:-translate-y-0.5"
                >
                  <span>Browse All 28 Machinery Listings</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-200" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </SectionTransition>

        {/* Company Heritage & Infrastructure Preview (Desktop) */}
        <SectionTransition id="about-preview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
              
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
                  About Nagendra Agencies
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-industrial-950 leading-tight">
                  Delivering Reliable Milling & Grain Equipment Across India
                </h2>
                <p className="text-base text-slate-700 leading-relaxed font-normal">
                  Founded in 2005 in Secunderabad under the experienced leadership of CEO <strong>Mr. Nagendra Prasad Gubbala</strong>, Nagendra Agencies supplies heavy-duty grain processing machinery designed to deliver superior yield, low maintenance, and continuous operational uptime.
                </p>
                <p className="text-base text-slate-700 leading-relaxed font-normal">
                  Our technical team examines and benchmark-tests every machinery unit prior to dispatch, ensuring seamless commercial integration into your processing plant from day one.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="flex items-start gap-2 text-xs text-slate-700 hover:text-industrial-950 transition-colors">
                    <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Heavy-Duty Construction Lowers Maintenance</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-slate-700 hover:text-industrial-950 transition-colors">
                    <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Custom Machine Modifications Available</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-slate-700 hover:text-industrial-950 transition-colors">
                    <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Prompt Road Delivery Across All States</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-slate-700 hover:text-industrial-950 transition-colors">
                    <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Full Statutory & GST Compliance</span>
                  </div>
                </div>

                <div className="pt-3">
                  <Link
                    href="/about"
                    className="group inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-blue hover:text-brand-blue-dark transition-colors"
                  >
                    <span>Read Full Company Profile & Infrastructure</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              <HomeInfrastructureGallery />

            </div>
          </FadeIn>
        </SectionTransition>

        {/* Industrial Callout Banner (Desktop) */}
        <SectionTransition id="inquiry-cta" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="bg-gradient-to-r from-industrial-950 via-industrial-900 to-emerald-950 rounded-2xl p-8 sm:p-12 border border-emerald-900/60 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 opacity-15 mix-blend-luminosity pointer-events-none">
                <Image
                  src="/assets/hero-rice-crop.jpg"
                  alt="Harvest field"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative z-10 max-w-2xl space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                  Secunderabad Machinery Supply
                </span>
                <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                  Planning to Upgrade or Install New Grain Processing Machinery?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Connect directly with Mr. Nagendra Prasad Gubbala or our sales engineers for equipment recommendations, capacity matching, and transparent ex-factory pricing.
                </p>
                
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    href="tel:04027707687"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-brand-orange hover:bg-orange-700 text-white font-bold text-xs sm:text-sm transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 hover:-translate-y-0.5"
                  >
                    <PhoneCall className="w-4 h-4 text-white" /> Call 040 2770 7687
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-black hover:bg-neutral-900 text-white font-bold text-xs sm:text-sm border border-neutral-700 hover:border-neutral-500 transition-all duration-200 shadow-sm active:scale-95 hover:-translate-y-0.5"
                  >
                    Send Online Inquiry
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </SectionTransition>

      </div>

      {/* ========================================================================= */}
      {/* RE-MODELED MOBILE EXPERIENCE: SCALED FOR SMARTPHONES (< 1024px)           */}
      {/* ========================================================================= */}
      <div className="block lg:hidden space-y-10 pb-16 bg-[#FAF7F2]">
        
        {/* MOBILE HERO: Crystal-Clear Resized Image Showcase + High-Impact Value */}
        <section className="bg-black text-white overflow-hidden">
          
          {/* Prominent, Bright Rice Crop Panoramic Frame (NO black mud overlays!) */}
          <div className="relative w-full h-[260px] xs:h-[290px] overflow-hidden bg-neutral-900">
            <Image
              src="/assets/hero-rice-crop.jpg"
              alt="Nagendra Agencies Rice Mill Machinery"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_35%]"
            />
            {/* Delicate bottom blend gradient only */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

            {/* Floating Badges on Top of Crisp Image */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-amber-300 font-bold text-xs border border-white/20 shadow-md">
                🌾 Established 2005
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-emerald-400 font-bold text-[11px] border border-white/20 shadow-md">
                <MapPin className="w-3 h-3" /> Secunderabad
              </span>
            </div>

            <div className="absolute bottom-2.5 left-3">
              <span className="text-[11px] font-bold text-white/90 drop-shadow-md bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                Industrial Grain Processing Specialists
              </span>
            </div>
          </div>

          {/* Mobile Hero Content Card */}
          <div className="px-4 pt-5 pb-8 space-y-5 bg-gradient-to-b from-black via-[#0C1A14] to-black">
            
            <div className="space-y-2">
              <h1 className="text-3xl xs:text-4xl font-heading font-black tracking-tight leading-[1.12]">
                Serving Rice Millers <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                  Since 2005
                </span>
              </h1>
              <p className="text-sm text-slate-200 font-medium leading-relaxed">
                Wholesale supplier of industrial rice whiteners, silky polishers, and grain processing equipment across India.
              </p>
            </div>

            {/* Full-Width Mobile Action Buttons */}
            <div className="space-y-2.5 pt-1">
              <Link
                href="/products"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-brand-orange hover:bg-orange-700 text-white font-bold text-sm shadow-md active:scale-95 transition-all text-center"
              >
                <span>Explore 28 Machinery Models</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:04027707687"
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/20 active:scale-95 transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span className="truncate">040 2770 7687</span>
                </a>

                <Link
                  href="/about"
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/20 active:scale-95 transition-all"
                >
                  <Building2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>About Works</span>
                </Link>
              </div>
            </div>

            {/* Mobile 2x2 Metric Cards (Tight & Scaled) */}
            <div className="pt-4 border-t border-white/15 grid grid-cols-2 gap-2.5">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                <AnimatedStatNumber value={20} suffix="+" className="text-2xl font-black font-heading text-amber-400 block" />
                <span className="text-[11px] text-slate-300 font-semibold block mt-0.5">Years Wholesaling</span>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                <AnimatedStatNumber value={28} className="text-2xl font-black font-heading text-emerald-400 block" />
                <span className="text-[11px] text-slate-300 font-semibold block mt-0.5">Machinery Models</span>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                <AnimatedStatNumber value={9} className="text-2xl font-black font-heading text-white block" />
                <span className="text-[11px] text-slate-300 font-semibold block mt-0.5">Plant Categories</span>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 flex flex-col justify-center">
                <div className="flex items-center gap-1 text-emerald-400 font-bold text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>GST Verified</span>
                </div>
                <span className="text-[10px] text-slate-300 font-medium block truncate mt-0.5">Secunderabad Works</span>
              </div>
            </div>

          </div>
        </section>

        {/* MOBILE MACHINERY CATEGORIES: 2-Column Visual Card Grid */}
        <section className="px-4 space-y-4">
          <div className="flex items-end justify-between border-b border-[#E8E1D5] pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                Machinery Portfolio
              </span>
              <h2 className="text-xl font-heading font-black text-industrial-950">
                Plant Categories
              </h2>
            </div>
            <Link
              href="/products"
              className="text-xs font-bold text-brand-orange hover:text-orange-700 flex items-center gap-1"
            >
              <span>View All 28</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 2-Column Compact Mobile Cards (No more endless scrolling!) */}
          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group bg-[#FEFCFA] rounded-xl border border-[#E8E1D5] p-3 flex flex-col justify-between hover:border-brand-orange shadow-sm active:scale-[0.98] transition-all"
              >
                <div>
                  <div className="w-full aspect-square rounded-lg bg-[#FAF7F2] border border-[#E8E1D5] p-2 flex items-center justify-center relative overflow-hidden mb-2.5">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      width={56}
                      height={56}
                      className="object-contain max-h-full group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute top-1.5 right-1.5 text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900">
                      {cat.productCount}M
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xs text-industrial-950 group-hover:text-brand-orange transition-colors line-clamp-2 leading-tight">
                    {cat.name}
                  </h3>
                </div>

                <div className="pt-2 mt-2 border-t border-[#E8E1D5] flex items-center justify-between text-[11px] font-bold text-slate-600 group-hover:text-brand-orange">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* MOBILE FEATURED MACHINERY: Crisp Stack */}
        <section className="bg-[#F4EFE6]/80 py-8 border-y border-[#E8E1D5]">
          <div className="px-4 space-y-4">
            
            <div className="flex items-end justify-between border-b border-[#E8E1D5] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                  Catalog Highlights
                </span>
                <h2 className="text-xl font-heading font-black text-industrial-950">
                  Featured Machinery
                </h2>
              </div>
              <Link
                href="/products"
                className="text-xs font-bold text-brand-orange hover:text-orange-700"
              >
                Browse All 28 →
              </Link>
            </div>

            <div className="space-y-4">
              {mobileFeaturedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            <div className="pt-2 text-center">
              <Link
                href="/products"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-neutral-950 hover:bg-neutral-900 text-white font-bold text-sm shadow-md active:scale-95 transition-all"
              >
                <span>Browse All 28 Machinery Listings</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </section>

        {/* MOBILE COMPANY HERITAGE & INFRASTRUCTURE */}
        <section className="px-4 space-y-4">
          <div className="border-b border-[#E8E1D5] pb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
              Heritage Since 2005
            </span>
            <h2 className="text-xl font-heading font-black text-industrial-950">
              Secunderabad Infrastructure
            </h2>
          </div>

          <div className="bg-[#FEFCFA] rounded-2xl border border-[#E8E1D5] overflow-hidden shadow-sm space-y-4">
            <div className="relative h-48 w-full bg-neutral-100">
              <Image
                src="/assets/company/infrastructure_exterior.jpg"
                alt="Nagendra Agencies Consultation Office"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-xs font-bold text-white drop-shadow">
                  Ranigunj, Secunderabad Consultation Office & Works
                </span>
              </div>
            </div>

            <div className="p-4 pt-0 space-y-3">
              <p className="text-xs text-slate-700 leading-relaxed font-normal">
                Founded in 2005 by CEO <strong>Mr. Nagendra Prasad Gubbala</strong>, supplying heavy-duty rice processing machinery designed for continuous uptime and high kernel yield.
              </p>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700 pt-1">
                <div className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Low Maintenance Build</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Pre-Dispatch Tested</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>All-India Delivery</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Active GST Verified</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-bold text-xs border border-neutral-300 transition-colors"
                >
                  <span>Read Full Company Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* MOBILE COMMERCIAL CALLOUT BANNER */}
        <section className="px-4">
          <div className="bg-gradient-to-b from-industrial-950 to-emerald-950 rounded-2xl p-5 text-white border border-emerald-900/60 shadow-xl space-y-3.5 relative overflow-hidden">
            <div className="relative z-10 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                Direct Consultation
              </span>
              <h3 className="text-xl font-heading font-black text-white leading-snug">
                Planning a Mill Upgrade?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect directly with our Secunderabad sales desk for equipment matching, capacity guidance, and ex-factory pricing.
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-2 pt-1">
              <a
                href="tel:04027707687"
                className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-brand-orange hover:bg-orange-700 text-white font-bold text-xs shadow-md active:scale-95 transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>040 2770 7687</span>
              </a>

              <a
                href="https://wa.me/9104027707687?text=Hello%20Nagendra%20Agencies%2C%20I%20am%20inquiring%20about%20grain%20machinery."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md active:scale-95 transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

            <Link
              href="/contact"
              className="relative z-10 w-full block text-center py-2.5 text-xs text-neutral-300 hover:text-white underline underline-offset-2 font-medium"
            >
              Or Submit Formal Requirement Form →
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}
