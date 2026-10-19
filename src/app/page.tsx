import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  ShieldCheck, 
  PhoneCall, 
  Check
} from 'lucide-react';
import { getAllCategories, getAllProducts } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { FadeIn, StaggerContainer, StaggerItem, AnimatedStatNumber, SectionTransition } from '../components/MotionWrapper';
import { HomeInfrastructureGallery } from '../components/HomeInfrastructureGallery';

export default function HomePage() {
  const categories = getAllCategories();
  const allProducts = getAllProducts();
  const featuredProducts = allProducts.slice(0, 8); // Top 8 featured machines

  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20 pb-16 sm:pb-20">
      
      {/* ========================================================================= */}
      {/* FULL-BLEED AGRO-TECH HERO SECTION (Exact desktop model, responsive mobile) */}
      {/* ========================================================================= */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden border-b border-emerald-950 bg-black">
        {/* Full-bleed Rice Crop Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/hero-rice-crop.jpg"
            alt="Nagendra Agencies - Serving Rice Millers Since 2005"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_35%] lg:object-center transform scale-100 hover:scale-[1.01] transition-transform duration-1000 ease-out"
          />
          {/* Directional Gradient Overlays:
              Mobile: gentle top gradient so the golden rice crop heads are bright and visible, smoothly transitioning to dark contrast behind the text.
              Desktop: exact original left-to-right gradient to keep crop visible on right and text sharp on left. */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/25 lg:bg-gradient-to-r lg:from-black/90 lg:via-black/70 sm:lg:via-black/55 lg:to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
        </div>

        {/* Hero Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-32 relative z-10 w-full">
          <div className="max-w-3xl lg:max-w-4xl space-y-5 sm:space-y-8">

            {/* Mobile Top Subtle Glass Badge */}
            <FadeIn direction="up" delay={0.02}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-bold text-amber-300 shadow-md">
                <span>🌾 Established 2005</span>
                <span className="text-white/40">•</span>
                <span className="text-emerald-400">Secunderabad</span>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.05}>
              <h1 className="text-3xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading font-black tracking-tight text-white leading-tight sm:leading-[1.06] drop-shadow-2xl">
                Serving Rice Millers <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                  Since 2005
                </span>
              </h1>
            </FadeIn>

            <FadeIn direction="up" delay={0.12}>
              <p className="text-sm sm:text-xl lg:text-2xl text-slate-100 font-medium leading-relaxed max-w-3xl drop-shadow-md">
                Trusted machinery wholesaler supplying industrial rice whiteners, silky polishers, and grain processing equipment across India.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.18}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
                <Link
                  href="/products"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-brand-orange hover:bg-orange-700 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-xl transition-all duration-200 uppercase tracking-wider active:scale-[0.98] hover:-translate-y-0.5 text-center"
                >
                  <span>Explore Products (28 Machines)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
                </Link>

                <Link
                  href="/about"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-black/80 hover:bg-black text-white font-bold text-sm sm:text-base border border-neutral-700 hover:border-neutral-500 transition-all duration-200 shadow-md active:scale-[0.98] hover:-translate-y-0.5 text-center"
                >
                  About Firm & Works
                </Link>
              </div>
            </FadeIn>

            {/* Micro Trust Strip - Metric Grid */}
            <FadeIn direction="up" delay={0.24}>
              <div className="pt-6 sm:pt-8 border-t border-white/20 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10 flex flex-col justify-center">
                  <AnimatedStatNumber value={20} suffix="+" className="text-2xl sm:text-4xl font-black font-heading text-amber-400" />
                  <span className="text-xs sm:text-sm text-slate-200 font-semibold mt-0.5">Years Wholesaling</span>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10 flex flex-col justify-center">
                  <AnimatedStatNumber value={28} className="text-2xl sm:text-4xl font-black font-heading text-emerald-400" />
                  <span className="text-xs sm:text-sm text-slate-200 font-semibold mt-0.5">Machinery Models</span>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10 flex flex-col justify-center">
                  <AnimatedStatNumber value={9} className="text-2xl sm:text-4xl font-black font-heading text-white" />
                  <span className="text-xs sm:text-sm text-slate-200 font-semibold mt-0.5">Plant Categories</span>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10 flex flex-col justify-center">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs sm:text-base">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span>GST Verified</span>
                  </div>
                  <span className="text-[10px] sm:text-xs text-slate-200 font-medium mt-0.5 truncate">Secunderabad, Telangana</span>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PRODUCT CATEGORIES OVERVIEW SECTION                                       */}
      {/* ========================================================================= */}
      <SectionTransition id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12 border-b border-[#E8E1D5] pb-4 sm:pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-2">
              Machinery Portfolio
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-black text-industrial-950">
              Machinery by Industrial Category
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm sm:text-lg transition-all shadow-sm hover:shadow-md whitespace-nowrap self-start sm:self-auto group"
          >
            <span>Browse All 28 Products</span>
            <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 text-white group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {categories.map((cat) => (
            <StaggerItem key={cat.slug}>
              <Link
                href={`/categories/${cat.slug}`}
                className="group bg-[#FEFCFA] rounded-2xl border border-[#E8E1D5] p-5 sm:p-7 flex flex-col justify-between hover:border-brand-orange hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out h-full active:scale-[0.99]"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4 sm:mb-5">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] p-2 sm:p-2.5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:border-brand-orange/40 transition-all duration-300">
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

                  <h3 className="font-heading font-black text-lg sm:text-2xl text-industrial-950 group-hover:text-brand-orange transition-colors mb-2 sm:mb-3 leading-snug">
                    {cat.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 sm:line-clamp-3 leading-relaxed mb-4 sm:mb-6 font-normal">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-[#E8E1D5] flex items-center justify-between text-xs sm:text-sm font-black text-slate-700 group-hover:text-brand-orange transition-colors">
                  <span>Explore Machinery Models</span>
                  <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 transform group-hover:translate-x-1.5 transition-transform duration-200" />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SectionTransition>

      {/* ========================================================================= */}
      {/* FEATURED MACHINERY GRID SECTION                                           */}
      {/* ========================================================================= */}
      <SectionTransition id="featured" className="bg-[#F4EFE6]/75 py-12 sm:py-20 border-y border-[#E8E1D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-2">
                Catalog Highlights
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-black text-industrial-950">
                Featured Grain Processing Equipment
              </h2>
              <p className="text-sm sm:text-lg text-slate-600 mt-2 sm:mt-3">
                All machinery supplied with verified specifications, genuine components, and transparent commercial pricing.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-7">
            {featuredProducts.map((p) => (
              <StaggerItem key={p.id}>
                <ProductCard product={p} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn direction="up" delay={0.15}>
            <div className="mt-8 sm:mt-14 text-center">
              <Link
                href="/products"
                className="group inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 sm:px-9 py-3.5 sm:py-4 rounded-xl bg-industrial-950 hover:bg-neutral-900 text-white font-black text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 hover:-translate-y-0.5"
              >
                <span>Browse All 28 Machinery Listings</span>
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1.5 transition-transform duration-200" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </SectionTransition>

      {/* ========================================================================= */}
      {/* COMPANY HERITAGE & INFRASTRUCTURE PREVIEW                                 */}
      {/* ========================================================================= */}
      <SectionTransition id="about-preview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            <div className="lg:col-span-6 space-y-4 sm:space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
                About Nagendra Agencies
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-black text-industrial-950 leading-tight">
                Delivering Reliable Milling & Grain Equipment Across India
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                Founded in 2005 in Secunderabad under the experienced leadership of CEO <strong>Mr. Nagendra Prasad Gubbala</strong>, Nagendra Agencies supplies heavy-duty grain processing machinery designed to deliver superior yield, low maintenance, and continuous operational uptime.
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                Our technical team examines and benchmark-tests every machinery unit prior to dispatch, ensuring seamless commercial integration into your processing plant from day one.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-2">
                <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 hover:text-industrial-950 transition-colors">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Heavy-Duty Construction Lowers Maintenance</span>
                </div>
                <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 hover:text-industrial-950 transition-colors">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Custom Machine Modifications Available</span>
                </div>
                <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 hover:text-industrial-950 transition-colors">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Prompt Road Delivery Across All States</span>
                </div>
                <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 hover:text-industrial-950 transition-colors">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Full Statutory & GST Compliance</span>
                </div>
              </div>

              <div className="pt-2 sm:pt-3">
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

      {/* ========================================================================= */}
      {/* INDUSTRIAL CALLOUT BANNER                                                 */}
      {/* ========================================================================= */}
      <SectionTransition id="inquiry-cta" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <div className="bg-gradient-to-r from-industrial-950 via-industrial-900 to-emerald-950 rounded-2xl p-6 sm:p-12 border border-emerald-900/60 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-15 mix-blend-luminosity pointer-events-none">
              <Image
                src="/assets/hero-rice-crop.jpg"
                alt="Harvest field"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative z-10 max-w-2xl space-y-3 sm:space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                Secunderabad Machinery Supply
              </span>
              <h2 className="text-xl sm:text-3xl font-heading font-extrabold text-white">
                Planning to Upgrade or Install New Grain Processing Machinery?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Connect directly with Mr. Nagendra Prasad Gubbala or our sales engineers for equipment recommendations, capacity matching, and transparent ex-factory pricing.
              </p>
              
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <a
                  href="tel:04027707687"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-md bg-brand-orange hover:bg-orange-700 text-white font-bold text-xs sm:text-sm transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 hover:-translate-y-0.5 text-center"
                >
                  <PhoneCall className="w-4 h-4 text-white" /> Call 040 2770 7687
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-md bg-black hover:bg-neutral-900 text-white font-bold text-xs sm:text-sm border border-neutral-700 hover:border-neutral-500 transition-all duration-200 shadow-sm active:scale-95 hover:-translate-y-0.5 text-center"
                >
                  Send Online Inquiry
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </SectionTransition>

    </div>
  );
}
