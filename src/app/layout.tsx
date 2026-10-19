import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FloatingWhatsAppButton } from '../components/FloatingWhatsAppButton';
import { NavigationProgressBar } from '../components/NavigationProgressBar';
import { NetworkStatusHandler } from '../components/NetworkStatusHandler';

const sfPro = localFont({
  src: [
    {
      path: '../fonts/sf-pro-text_light.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/sf-pro-display_regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/sf-pro-display_medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/sf-pro-display_semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/sf-pro-display_bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/sf-pro-display_bold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../fonts/sf-pro-display_bold.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-sf-pro',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.indiamart.com/nagendraagencies/'),
  title: {
    default: 'Nagendra Agencies | Industrial Rice Milling & Grain Machinery Wholesaler',
    template: '%s | Nagendra Agencies',
  },
  description: 'Wholesaler, Trader & Manufacturer of Rice Milling Machines, Parboiling Plants, Grain Storage Silos, Destoners, and Color Sorters in Secunderabad, Telangana. Established 2005. Verified GST.',
  keywords: [
    'Rice Machine',
    'Rice Whitener Machine',
    'Silky Rice Polishing Machine',
    'Grain Storage Silo',
    'Parboiling Plant',
    'Digital Grain Moisture Meter',
    'Color Sorting Machine',
    'Husk Fired Furnace',
    'Nagendra Agencies',
    'Secunderabad',
    'Telangana',
    'India'
  ],
  authors: [{ name: 'Nagendra Agencies' }],
  creator: 'Nagendra Agencies',
  icons: {
    icon: '/assets/company/logo.png',
    apple: '/assets/company/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.indiamart.com/nagendraagencies/',
    title: 'Nagendra Agencies | Industrial Rice Milling & Grain Machinery Wholesaler',
    description: 'Wholesaler, Trader & Manufacturer of Rice Milling Machines, Parboiling Plants, Grain Storage Silos, Destoners, and Color Sorters in Secunderabad, Telangana.',
    siteName: 'Nagendra Agencies',
    images: [
      {
        url: '/assets/company/infrastructure_exterior.jpg',
        width: 1000,
        height: 751,
        alt: 'Nagendra Agencies Facility Secunderabad',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sfPro.variable}>
      <body className={`${sfPro.className} min-h-screen flex flex-col bg-natural text-industrial-900 antialiased selection:bg-brand-blue selection:text-white`}>
        <Suspense fallback={null}>
          <NavigationProgressBar />
        </Suspense>
        <NetworkStatusHandler />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}
