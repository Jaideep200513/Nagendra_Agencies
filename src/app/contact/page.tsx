import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ContactForm } from './ContactForm';
import { companyData } from '../../data/company';
import { FadeIn } from '../../components/MotionWrapper';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Building2, 
  MessageCircle,
  ExternalLink
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | Nagendra Agencies Secunderabad',
  description: 'Get in touch with Nagendra Agencies in Secunderabad for rice machine inquiries, grain silo quotations, and parboiling plants. Direct phone: 040 2770 7687.',
};

export default function ContactPage() {
  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Nagendra Agencies, Ganesh Chamber, Ranigunj, Secunderabad, Telangana 500003'
  )}`;

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      
      {/* Grounded Industrial Header Section with Full-Bleed Desk & Facility Background */}
      <section className="relative min-h-[480px] lg:min-h-[520px] flex items-center overflow-hidden border-b border-[#242E2E] bg-black text-white">
        {/* Full-Bleed Commercial Consultation Desk Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/contact-hero-desk.jpg"
            alt="Consultation Desk & Grain Milling Facility - Nagendra Agencies"
            fill
            priority
            quality={100}
            unoptimized
            className="object-cover object-right md:object-center transform scale-100 hover:scale-[1.01] transition-transform duration-1000 ease-out"
          />
          {/* Directional Gradient Overlay to ensure crisp text readability on the left while keeping the illuminated consultation desk and silos visible on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 sm:via-black/70 to-black/35"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40"></div>
        </div>

        {/* Hero Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10 w-full space-y-6">
          
          {/* Breadcrumb Navigation on Dark */}
          <div>
            <Breadcrumbs 
              items={[{ label: 'Contact & Inquiry' }]} 
              isDark={true}
            />
          </div>

          <div className="max-w-3xl lg:max-w-4xl space-y-5">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black text-white leading-tight tracking-tight drop-shadow-lg">
              Contact & Commercial Inquiry Desk
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-neutral-200 font-normal leading-relaxed pt-1 drop-shadow">
              Reach our central Secunderabad consultation office or connect directly with CEO Mr. Nagendra Prasad Gubbala for customized equipment capacity sizing, commercial quotations, and nationwide dispatch logistics.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-6 text-sm text-neutral-300 border-t border-white/15">
              <div>
                <span className="block font-bold text-white text-base">040 2770 7687</span>
                <span className="text-neutral-400">Direct Landline (Mon–Sat, 9AM–8PM)</span>
              </div>
              <div className="h-8 w-px bg-white/20 hidden sm:block" />
              <div>
                <span className="block font-bold text-white text-base">080 4896 7406</span>
                <span className="text-neutral-400">IndiaMART Telephony Hotline</span>
              </div>
              <div className="h-8 w-px bg-white/20 hidden sm:block" />
              <div>
                <span className="block font-bold text-white text-base">Secunderabad</span>
                <span className="text-neutral-400">Consultation Office & Registered Works</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Registered Office Details & Commercial Verification */}
          <div className="lg:col-span-5">
            <FadeIn direction="up">
              <div className="bg-white rounded-lg border border-neutral-300 p-6 sm:p-8 space-y-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                
                <div className="border-b border-neutral-200 pb-4">
                  <h2 className="text-xl sm:text-2xl font-heading font-black text-neutral-950">
                    Registered Consultation Office
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-600 mt-1">
                    Ranigunj office for client consultation, machinery selection, and commercial inquiries.
                  </p>
                </div>

                <div className="space-y-4">
                  
                  {/* Address Block */}
                  <div className="p-5 rounded-md bg-neutral-50 border border-neutral-200 space-y-2 hover:bg-neutral-100/70 hover:border-neutral-300 transition-all duration-200">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-neutral-950 flex-shrink-0 mt-1" />
                      <div className="space-y-1 flex-1">
                        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-500 block">
                          Office & Works Location
                        </span>
                        <address className="not-italic text-base sm:text-lg font-bold text-neutral-950 leading-relaxed">
                          2nd Floor, Ganesh Chamber, X Road,<br />
                          Bolaram Nagar, Ranigunj,<br />
                          Secunderabad, Telangana 500003, India
                        </address>
                        <a
                          href={mapSearchUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/map inline-flex items-center gap-1.5 text-sm font-bold text-brand-orange hover:text-orange-700 pt-1 transition-colors"
                        >
                          <span>Open in Google Maps</span>
                          <ExternalLink className="w-3.5 h-3.5 group-hover/map:translate-x-0.5 group-hover/map:-translate-y-0.5 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Direct Landline */}
                  <div className="p-5 rounded-md bg-neutral-50 border border-neutral-200 flex items-center gap-4 hover:bg-neutral-100/70 hover:border-neutral-300 transition-all duration-200">
                    <Phone className="w-5 h-5 text-neutral-950 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-500 block">
                        Direct Central Landline
                      </span>
                      <a 
                        href="tel:04027707687" 
                        className="text-lg sm:text-xl font-bold text-neutral-950 hover:text-brand-orange transition-colors"
                      >
                        040 2770 7687
                      </a>
                    </div>
                  </div>

                  {/* Telephony Hotline */}
                  <div className="p-5 rounded-md bg-neutral-50 border border-neutral-200 flex items-center gap-4 hover:bg-neutral-100/70 hover:border-neutral-300 transition-all duration-200">
                    <Phone className="w-5 h-5 text-neutral-950 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-500 block">
                        IndiaMART Telephony Hotline
                      </span>
                      <a 
                        href="tel:08048967406" 
                        className="text-lg sm:text-xl font-bold text-neutral-950 hover:text-brand-orange transition-colors"
                      >
                        080 4896 7406
                      </a>
                    </div>
                  </div>

                  {/* Official Email */}
                  <div className="p-5 rounded-md bg-neutral-50 border border-neutral-200 flex items-center gap-4 hover:bg-neutral-100/70 hover:border-neutral-300 transition-all duration-200">
                    <Mail className="w-5 h-5 text-neutral-950 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-500 block">
                        Official Email Inquiries
                      </span>
                      <a 
                        href="mailto:nagendraagencies05@gmail.com" 
                        className="text-base sm:text-lg font-bold text-neutral-950 hover:text-brand-orange transition-colors truncate block"
                      >
                        nagendraagencies05@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp Action Button */}
                  <div className="pt-1">
                    <a
                      href="https://wa.me/9104027707687?text=Hello%20Nagendra%20Agencies%2C%20I%20have%20an%20inquiry%20regarding%20grain%20processing%20machinery."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-base py-3.5 px-4 rounded-md transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98] hover:-translate-y-0.5"
                    >
                      <MessageCircle className="w-5 h-5" /> Message Directly on WhatsApp
                    </a>
                  </div>

                  {/* Operating Parameters & Statutory Verification */}
                  <div className="pt-4 border-t border-neutral-200 space-y-2.5 text-sm sm:text-base text-neutral-700">
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-neutral-500 flex-shrink-0" />
                      <span>Working Hours: <strong className="text-neutral-950">Mon – Sat, 9:00 AM – 8:00 PM</strong></span>
                    </div>
                    <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span>GSTIN: <strong className="font-mono text-neutral-950">{companyData.gst_details.gstin}</strong> (Active)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4 text-neutral-500 flex-shrink-0" />
                  <span>Company CEO: <strong className="text-neutral-950">{companyData.key_personnel.company_ceo}</strong></span>
                </div>
              </div>

            </div>
          </div>
        </FadeIn>
      </div>

        {/* Right Column: High-Legibility Requirement Submission Form */}
        <div className="lg:col-span-7">
          <FadeIn direction="up" delay={0.1}>
            <div className="bg-white rounded-lg border border-neutral-300 p-6 sm:p-10 shadow-sm space-y-6">
              
              <div className="border-b border-neutral-200 pb-4">
                <h2 className="text-2xl sm:text-3xl font-heading font-black text-neutral-950">
                  Send Equipment Requirement
                </h2>
                <p className="text-base sm:text-lg text-neutral-600 mt-1 leading-relaxed">
                  Submit your facility specifications, desired tonnage, and machine requirements to receive direct commercial quotes and technical recommendations.
                </p>
              </div>

              <ContactForm />

            </div>
          </FadeIn>
        </div>

      </div>

      </main>

    </div>
  );
}
