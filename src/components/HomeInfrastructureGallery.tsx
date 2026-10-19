'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ZoomIn } from 'lucide-react';
import { ImageLightboxModal, LightboxImage } from './ImageLightboxModal';

export function HomeInfrastructureGallery() {
  const [activeImage, setActiveImage] = useState<LightboxImage | null>(null);

  const images = {
    exterior: {
      src: '/assets/company/infrastructure_exterior.jpg',
      alt: 'Secunderabad Consultation Office',
      title: 'Consultation & Trade Office',
      caption: 'Commercial office at Ranigunj, Secunderabad, Telangana for client consultation and machinery inquiries.'
    },
    board: {
      src: '/assets/company/infrastructure_board.jpg',
      alt: 'Facility Commercial Sign Board',
      title: 'Facility Commercial Sign Board',
      caption: 'Official trade sign board registered at Ganesh Chamber, Ranigunj, Secunderabad.'
    },
    certification: {
      src: '/assets/company/certification_certificate.jpg',
      alt: 'Trade & Statutory Certification',
      title: 'Business & Statutory Registration Certificate',
      caption: 'Official MSME & Statutory Business Registration document for Nagendra Agencies.'
    }
  };

  return (
    <>
      <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Primary Facility Exterior Showcase */}
        <div
          onClick={() => setActiveImage(images.exterior)}
          className="relative h-72 sm:h-auto min-h-[300px] rounded-2xl overflow-hidden border border-[#E8E1D5] shadow-md group cursor-pointer"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setActiveImage(images.exterior);
            }
          }}
        >
          <Image
            src={images.exterior.src}
            alt={images.exterior.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-4 group-hover:bg-black/50 transition-colors">
            <div className="self-end opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-sm text-white text-xs font-bold shadow-lg border border-white/20">
                <ZoomIn className="w-3.5 h-3.5 text-brand-gold" /> View Full
              </span>
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-white drop-shadow block">
                Secunderabad Consultation Office
              </span>
            </div>
          </div>
        </div>

        {/* Stacked Sign Board & Statutory Certification */}
        <div className="space-y-4">
          <div
            onClick={() => setActiveImage(images.board)}
            className="relative h-48 rounded-xl overflow-hidden border border-[#E8E1D5] shadow-sm group cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setActiveImage(images.board);
              }
            }}
          >
            <Image
              src={images.board.src}
              alt={images.board.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-3.5 group-hover:bg-black/50 transition-colors">
              <div className="self-end opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-sm text-white text-[11px] font-bold shadow-lg border border-white/20">
                  <ZoomIn className="w-3 h-3 text-brand-gold" /> View Full
                </span>
              </div>
              <div>
                <span className="text-xs font-bold text-white drop-shadow block">
                  Facility Commercial Sign Board
                </span>
              </div>
            </div>
          </div>

          <div
            onClick={() => setActiveImage(images.certification)}
            className="relative h-56 rounded-xl overflow-hidden border border-[#E8E1D5] shadow-sm group cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setActiveImage(images.certification);
              }
            }}
          >
            <Image
              src={images.certification.src}
              alt={images.certification.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-3.5 group-hover:bg-black/50 transition-colors">
              <div className="self-end opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-sm text-white text-[11px] font-bold shadow-lg border border-white/20">
                  <ZoomIn className="w-3 h-3 text-brand-gold" /> View Full
                </span>
              </div>
              <div>
                <span className="text-xs font-bold text-white drop-shadow block">
                  Trade & Statutory Certification
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <ImageLightboxModal
        image={activeImage}
        onClose={() => setActiveImage(null)}
      />
    </>
  );
}
