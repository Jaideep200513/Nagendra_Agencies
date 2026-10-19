import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { companyData } from '../../data/company';
import { AboutInfrastructureGallery } from '../../components/AboutInfrastructureGallery';
import { FadeIn, StaggerContainer, StaggerItem } from '../../components/MotionWrapper';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  FileCheck2,
  Building2,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About | Nagendra Agencies - Rice Milling Machinery Wholesaler',
  description: 'Learn about Nagendra Agencies, established in 2005 as a premier rice milling machinery wholesaler and trader in Secunderabad, Telangana. Led by CEO Mr. Nagendra Prasad Gubbala.',
};

export default function AboutPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      
      {/* Top Banner / Full-Bleed Grain Heritage Hero Section */}
      <section className="relative min-h-[480px] lg:min-h-[540px] flex items-center overflow-hidden border-b border-[#242E2E] bg-black text-white">
        {/* Full-Bleed Multi-Grain Heritage Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/about-hero-grains.png"
            alt="Rice & Grain Processing Varieties - Nagendra Agencies"
            fill
            priority
            quality={100}
            unoptimized
            className="object-cover object-center transform scale-100 hover:scale-[1.01] transition-transform duration-1000 ease-out"
          />
          {/* Directional Gradient Overlay to ensure crisp text readability on the left while keeping the natural grain texture visible across the banner */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 sm:via-black/70 to-black/35"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40"></div>
        </div>

        {/* Hero Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10 w-full space-y-6">
          
          {/* Breadcrumb Navigation on Dark */}
          <div>
            <Breadcrumbs 
              items={[{ label: 'About' }]} 
              isDark={true}
            />
          </div>

          <div className="max-w-3xl lg:max-w-4xl space-y-5">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black text-white leading-[1.1] tracking-tight drop-shadow-lg">
              Two Decades of Engineering Dedication to the Grain Milling Industry
            </h1>

            <p className="text-base sm:text-xl text-neutral-200 font-normal leading-relaxed pt-1 drop-shadow">
              Since 2005, Nagendra Agencies has supplied high-performance rice whitening, polishing, cleaning, and grain processing machinery from Secunderabad to rice millers and agro-processors across all states of India.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-6 text-sm text-neutral-300 border-t border-white/15">
              <div>
                <span className="block font-bold text-white text-base">20+ Years</span>
                <span className="text-neutral-400">Milling Machinery Wholesaler</span>
              </div>
              <div className="h-8 w-px bg-white/20 hidden sm:block" />
              <div>
                <span className="block font-bold text-white text-base">Nationwide</span>
                <span className="text-neutral-400">Direct Road Dispatch Across India</span>
              </div>
              <div className="h-8 w-px bg-white/20 hidden sm:block" />
              <div>
                <span className="block font-bold text-white text-base">Zero Breakage</span>
                <span className="text-neutral-400">High Kernel Recovery & Yield</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">

        {/* Section 1: Firm Overview & Operational Background */}
        <FadeIn direction="up">
          <section className="space-y-8">
            <div className="border-b border-neutral-300 pb-4">
              <h2 className="text-2xl sm:text-4xl font-heading font-black text-neutral-950 tracking-tight">
                Company Background & Technical Scope
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-8 space-y-6 text-base sm:text-lg text-neutral-800 leading-relaxed">
                <p>
                  Since 2005, <strong>Nagendra Agencies</strong> has been functioning as a reputed <strong>Sole Proprietorship</strong> firm in Secunderabad, Telangana. Over two decades, our commercial dexterity and technical competence have established us as a trusted machinery wholesaler and distributor in the grain processing sector.
                </p>

                <p>
                  Backed by our dedicated engineering team and established manufacturing partners, we wholesale and supply high-precision <strong>Rice Whitener Machines, Silky Polishing Equipment, Rice Bran Centrifugal Separators, Destoners & Grain Cleaners, Parboiling & Drying Processing Plants, and Storage Silos</strong>.
                </p>

                <p>
                  The core ethos of our enterprise is purveying machinery that delivers consistent high-tonnage output, minimizes broken kernel percentage, and maximizes the return on capital investment by lowering maintenance downtime throughout demanding harvest seasons.
                </p>
              </div>

              <div className="lg:col-span-4 bg-white border border-neutral-300 rounded-lg p-6 sm:p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="text-base sm:text-lg font-bold text-neutral-950 uppercase tracking-wide border-b border-neutral-200 pb-2">
                  Core Machinery Specializations
                </h3>
                <ul className="space-y-2 text-sm sm:text-base text-neutral-800 font-medium">
                  <li className="flex items-start gap-2.5 p-1.5 rounded hover:bg-neutral-50 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                    <span>Rice Whitener & Emery Cone Polishers</span>
                  </li>
                  <li className="flex items-start gap-2.5 p-1.5 rounded hover:bg-neutral-50 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                    <span>Silky Water Polishing Machinery</span>
                  </li>
                  <li className="flex items-start gap-2.5 p-1.5 rounded hover:bg-neutral-50 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                    <span>Paddy Destoners & High-Volume Cleaners</span>
                  </li>
                  <li className="flex items-start gap-2.5 p-1.5 rounded hover:bg-neutral-50 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                    <span>Rice Bran Centrifugal Separators</span>
                  </li>
                  <li className="flex items-start gap-2.5 p-1.5 rounded hover:bg-neutral-50 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                    <span>Parboiling Plants & Grain Drying Systems</span>
                  </li>
                  <li className="flex items-start gap-2.5 p-1.5 rounded hover:bg-neutral-50 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                    <span>Industrial Heavy-Duty Storage Silos</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Section 2: Executive Leadership (CEO Mr. Nagendra Prasad Gubbala) */}
        <FadeIn direction="up">
          <section className="bg-white border border-neutral-300 rounded-lg p-8 sm:p-12 shadow-sm space-y-6 hover:shadow-md hover:border-neutral-400 transition-all duration-300">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-500">
              <span>Executive Leadership & Direction</span>
            </div>

            <blockquote className="text-xl sm:text-2xl text-neutral-950 font-medium leading-relaxed border-l-4 border-amber-600 pl-6 sm:pl-8 py-2 italic">
              &ldquo;Possessing sharp business acumen and extensive industry knowledge, our CEO, Mr. Nagendra Prasad Gubbala, directs our engineering and logistics teams to supply equipment configured precisely for each client&apos;s application-specific requirements.&rdquo;
            </blockquote>

            <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-lg sm:text-xl font-bold text-neutral-950">
                  Mr. Nagendra Prasad Gubbala
                </div>
                <div className="text-sm sm:text-base font-semibold text-neutral-600">
                  Chief Executive Officer (CEO), Nagendra Agencies
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-neutral-900 text-white font-bold text-sm rounded border border-neutral-700 hover:border-neutral-500 transition-all duration-200 self-start sm:self-auto active:scale-95 hover:-translate-y-0.5 shadow-sm"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                Connect with CEO Desk
              </Link>
            </div>
          </section>
        </FadeIn>

        {/* Section 3: Workforce Quality & Engineering Standards */}
        <FadeIn direction="up">
          <section className="space-y-4">
            <div className="border-b border-neutral-300 pb-3">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-neutral-950">
                Workforce Quality Standards & Technical Evaluation
              </h3>
            </div>
            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed max-w-5xl">
              {companyData.team_description}
            </p>
          </section>
        </FadeIn>

        {/* Section 4: Comprehensive Business Factsheet */}
        <FadeIn direction="up">
          <section className="space-y-6">
            <div className="border-b border-neutral-300 pb-4">
              <h2 className="text-2xl sm:text-4xl font-heading font-black text-neutral-950 tracking-tight">
                Business Factsheet & Statutory Verification
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 mt-1">
                Verified corporate credentials, statutory compliance numbers, and operational parameters.
              </p>
            </div>

            <div className="bg-white border border-neutral-300 rounded-lg overflow-hidden shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
                
                {/* Column 1 */}
                <div className="divide-y divide-neutral-200">
                  <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-1 hover:bg-neutral-50/80 transition-colors">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wide text-neutral-500">Legal Business Name</span>
                    <span className="text-base sm:text-lg font-bold text-neutral-950">{companyData.company_name}</span>
                  </div>

                  <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-1 hover:bg-neutral-50/80 transition-colors">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wide text-neutral-500">Nature of Business</span>
                    <span className="text-base sm:text-lg font-bold text-neutral-950 text-right">{companyData.nature_of_business}</span>
                  </div>

                  <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-1 hover:bg-neutral-50/80 transition-colors">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wide text-neutral-500">Legal Firm Status</span>
                    <span className="text-base sm:text-lg font-bold text-neutral-950">{companyData.legal_status}</span>
                  </div>

                  <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-1 hover:bg-neutral-50/80 transition-colors">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wide text-neutral-500">Year of Establishment</span>
                    <span className="text-base sm:text-lg font-bold text-neutral-950">2005 (15+ Years Active Member)</span>
                  </div>

                  <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-1 hover:bg-neutral-50/80 transition-colors">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wide text-neutral-500">Company CEO</span>
                    <span className="text-base sm:text-lg font-bold text-neutral-950">{companyData.key_personnel.company_ceo}</span>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="divide-y divide-neutral-200">
                  <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-1 hover:bg-neutral-50/80 transition-colors">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wide text-neutral-500">GST Identification (GSTIN)</span>
                    <span className="text-base sm:text-lg font-mono font-bold text-neutral-950">{companyData.gst_details.gstin}</span>
                  </div>

                  <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-1 hover:bg-neutral-50/80 transition-colors">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wide text-neutral-500">Total Workforce</span>
                    <span className="text-base sm:text-lg font-bold text-neutral-950">{companyData.team_and_workforce.total_employees}</span>
                  </div>

                  <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-1 hover:bg-neutral-50/80 transition-colors">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wide text-neutral-500">Primary Banker</span>
                    <span className="text-base sm:text-lg font-bold text-neutral-950">{companyData.banking.banker}</span>
                  </div>

                  <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-1 hover:bg-neutral-50/80 transition-colors">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wide text-neutral-500">Nationwide Logistics</span>
                    <span className="text-base sm:text-lg font-bold text-neutral-950">By Road Transport Across India</span>
                  </div>

                  <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-1 hover:bg-neutral-50/80 transition-colors">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wide text-neutral-500">Accepted Payment Terms</span>
                    <span className="text-base sm:text-lg font-bold text-neutral-950">RTGS / NEFT, Cash, Credit Card</span>
                  </div>
                </div>

              </div>
            </div>
          </section>
        </FadeIn>

        {/* Section 5: Office Premises & Commercial Certifications Gallery */}
        <FadeIn direction="up">
          <section className="space-y-6">
            <div className="border-b border-neutral-300 pb-4">
              <h2 className="text-2xl sm:text-4xl font-heading font-black text-neutral-950 tracking-tight">
                Registered Office Premises & Commercial Certifications
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 mt-1">
                Photographs of our commercial consultation office in Secunderabad and official statutory business certifications.
              </p>
            </div>

            <AboutInfrastructureGallery
              boardImage={companyData.assets.infrastructure_board.relative_path}
              certImage={companyData.assets.certification_certificate.relative_path}
              exteriorImage={companyData.assets.infrastructure_exterior.relative_path}
            />
          </section>
        </FadeIn>

        {/* Section 6: Direct Machinery Inquiry & Support Strip */}
        <FadeIn direction="up">
          <section className="bg-neutral-950 text-white rounded-lg p-8 sm:p-12 border border-neutral-800 space-y-6 shadow-xl">
            <div className="max-w-3xl space-y-3">
              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                Consult with Our Technical Team for Your Milling Plant
              </h3>
              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
                Whether you are modernizing an existing rice mill or planning new machinery installation, our Secunderabad office provides comprehensive equipment recommendations and nationwide logistics support.
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex flex-wrap items-center gap-4">
              <a
                href="tel:04027707687"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-brand-orange hover:bg-orange-600 text-white font-bold text-base rounded transition-all duration-200 shadow hover:shadow-md active:scale-95 hover:-translate-y-0.5"
              >
                <PhoneCall className="w-5 h-5 text-white" />
                Call Office: 040 2770 7687
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-black hover:bg-neutral-900 text-white font-bold text-base rounded border border-neutral-700 hover:border-neutral-500 transition-all duration-200 active:scale-95 hover:-translate-y-0.5"
              >
                <Mail className="w-5 h-5 text-neutral-300" />
                Send Online Inquiry
              </Link>
            </div>
          </section>
        </FadeIn>

      </main>

    </div>
  );
}
