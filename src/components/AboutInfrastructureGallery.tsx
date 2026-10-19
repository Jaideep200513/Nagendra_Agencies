'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ZoomIn } from 'lucide-react';
import { ImageLightboxModal, LightboxImage } from './ImageLightboxModal';

interface AboutInfrastructureGalleryProps {
  boardImage: string;
  certImage: string;
  exteriorImage: string;
}

export function AboutInfrastructureGallery({
  boardImage,
  certImage,
  exteriorImage
}: AboutInfrastructureGalleryProps) {
  const [activeImage, setActiveImage] = useState<LightboxImage | null>(null);

  const items = [
    {
      src: boardImage,
      alt: 'Our Infrastructure Board',
      title: 'Our Infrastructure Board',
      subtitle: 'Branding and setup registration at Secunderabad facility.',
      caption: 'Commercial Infrastructure Sign Board - Nagendra Agencies, Ranigunj, Secunderabad, Telangana.'
    },
    {
      src: certImage,
      alt: 'Business Certification',
      title: 'Business Certification Document',
      subtitle: 'Official trade certificate and statutory compliance.',
      caption: 'Udyam / Statutory Business Registration Certificate verifying Nagendra Agencies under Ministry of MSME.'
    },
    {
      src: exteriorImage,
      alt: 'Consultation Office',
      title: 'Consultation & Trade Office',
      subtitle: 'Small central office in Secunderabad for client consultation and machinery inquiries.',
      caption: 'Commercial office in Ranigunj, Secunderabad for client consultation, machinery selection, and commercial inquiries.'
    }
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {items.map((item) => (
          <div
            key={item.title}
            onClick={() => setActiveImage(item)}
            className="rounded-lg border border-neutral-300 overflow-hidden bg-white group hover:border-neutral-900 transition-all duration-200 cursor-pointer flex flex-col shadow-sm"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setActiveImage(item);
              }
            }}
          >
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-neutral-100">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-bold shadow-lg border border-neutral-600 rounded">
                  <ZoomIn className="w-4 h-4 text-amber-400" /> Click to Expand Full Image
                </span>
              </div>
            </div>

            <div className="p-6 bg-white border-t border-neutral-200 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h4 className="font-heading font-bold text-base sm:text-lg text-neutral-950 group-hover:text-brand-orange transition-colors">
                  {item.title}
                </h4>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mt-2">
                  {item.subtitle}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-900">
                <ZoomIn className="w-4 h-4 text-brand-orange" />
                <span>Click to view full high-res</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <ImageLightboxModal
        image={activeImage}
        onClose={() => setActiveImage(null)}
      />
    </>
  );
}
