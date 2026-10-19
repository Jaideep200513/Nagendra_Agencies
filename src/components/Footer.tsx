import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Clock, 
  ExternalLink,
  CreditCard,
  Truck
} from 'lucide-react';
import { companyData } from '../data/company';
import { getAllCategories } from '../data/products';

export function Footer() {
  const categories = getAllCategories();

  return (
    <footer className="bg-industrial-950 text-slate-400 border-t border-slate-800">
      {/* Upper Support Bar */}
      <div className="border-b border-slate-800/80 bg-industrial-900/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="text-white text-xs font-bold uppercase tracking-wider">Statutory Verification</h5>
              <p className="text-xs text-slate-400 font-mono mt-0.5">GSTIN: {companyData.gst_details.gstin} (Active)</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="text-white text-xs font-bold uppercase tracking-wider">Logistics & Supply</h5>
              <p className="text-xs text-slate-400 mt-0.5">Road Freight Across India • Robust Export Packaging</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CreditCard className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="text-white text-xs font-bold uppercase tracking-wider">Banking & Settlement</h5>
              <p className="text-xs text-slate-400 mt-0.5">Syndicate Bank • Cash, Credit Card, RTGS/NEFT</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Col 1: Company Profile */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-white p-1 flex items-center justify-center flex-shrink-0">
              <Image 
                src="/assets/company/logo.png" 
                alt="Nagendra Agencies" 
                width={36} 
                height={36} 
                className="object-contain" 
              />
            </div>
            <span className="font-heading font-extrabold text-white text-lg tracking-tight">
              NAGENDRA AGENCIES
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Established in 2005, Nagendra Agencies is an esteemed industrial distributor, trader, and manufacturer of high-capacity rice milling machines, grain separators, parboiling plants, and storage silos headquartered in Secunderabad, Telangana.
          </p>

          <div className="pt-2 text-xs space-y-1">
            <p><span className="text-slate-500 font-semibold">Leadership:</span> <strong className="text-slate-300">Mr. Nagendra Prasad Gubbala</strong> (CEO)</p>
            <p><span className="text-slate-500 font-semibold">Firm Status:</span> Sole Proprietorship</p>
            <p><span className="text-slate-500 font-semibold">IndiaMART Trust:</span> 15+ Years Active Member (4.3★ Rating)</p>
          </div>
        </div>

        {/* Col 2: Machinery Categories */}
        <div>
          <h4 className="text-white font-heading font-bold text-sm tracking-wider uppercase mb-4 border-b border-slate-800 pb-2">
            Machinery Categories
          </h4>
          <ul className="space-y-2 text-xs">
            {categories.slice(0, 7).map((c) => (
              <li key={c.slug}>
                <Link 
                  href={`/categories/${c.slug}`}
                  className="hover:text-white hover:translate-x-1 transition-all flex items-center justify-between"
                >
                  <span>{c.name}</span>
                  <span className="text-slate-600 font-mono">({c.productCount})</span>
                </Link>
              </li>
            ))}
            <li>
              <Link 
                href="/products" 
                className="text-brand-orange hover:text-orange-400 font-bold inline-block pt-1"
              >
                View all 9 categories & 28 products →
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Quick Navigation */}
        <div>
          <h4 className="text-white font-heading font-bold text-sm tracking-wider uppercase mb-4 border-b border-slate-800 pb-2">
            Quick Navigation
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home Overview
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                Company Profile & Infrastructure
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-white transition-colors">
                Products (28 Items)
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact Sales & Plant Inquiries
              </Link>
            </li>
            <li className="pt-3">
              <a 
                href={companyData.source_urls.profile} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
              >
                Official IndiaMART Profile
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: Registered Office & Contacts */}
        <div className="space-y-3">
          <h4 className="text-white font-heading font-bold text-sm tracking-wider uppercase mb-4 border-b border-slate-800 pb-2">
            Secunderabad Office
          </h4>

          <div className="flex items-start gap-2.5 text-xs">
            <MapPin className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
            <address className="not-italic leading-relaxed text-slate-300">
              2nd Floor, Ganesh Chamber, X Road,<br />
              Bolaram Nagar, Ranigunj,<br />
              Secunderabad, Telangana 500003, India
            </address>
          </div>

          <div className="flex items-center gap-2.5 text-xs pt-1">
            <Phone className="w-4 h-4 text-brand-orange flex-shrink-0" />
            <div>
              <span className="text-slate-500 block text-[11px]">Direct Landline</span>
              <a href="tel:04027707687" className="text-white font-semibold hover:text-brand-orange transition-colors">
                040 2770 7687
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-xs">
            <Phone className="w-4 h-4 text-brand-orange flex-shrink-0" />
            <div>
              <span className="text-slate-500 block text-[11px]">IndiaMART Virtual Telephony</span>
              <a href="tel:08048967406" className="text-white font-semibold hover:text-brand-orange transition-colors">
                080 4896 7406
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-xs">
            <Mail className="w-4 h-4 text-brand-orange flex-shrink-0" />
            <a href="mailto:nagendraagencies05@gmail.com" className="text-slate-300 hover:text-brand-orange transition-colors truncate">
              nagendraagencies05@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-2.5 text-xs text-slate-400 pt-1">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span>Mon – Sat: 9:00 AM – 8:00 PM</span>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-slate-900 bg-industrial-950 py-5 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2005–2026 Nagendra Agencies. All Rights Reserved. Secunderabad, Telangana.</p>
          <p className="text-[11px] text-slate-600">
            Industrial Grain Processing Machinery Catalog • Verified Seller
          </p>
        </div>
      </div>
    </footer>
  );
}
