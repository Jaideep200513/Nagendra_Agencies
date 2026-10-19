import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  getAllProducts, 
  getProductBySlug, 
  getRelatedProducts 
} from '../../../data/products';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { ProductGallery } from '../../../components/ProductGallery';
import { ProductCard } from '../../../components/ProductCard';
import { 
  ShieldCheck, 
  Truck, 
  ExternalLink, 
  Building2, 
  CheckCircle2 
} from 'lucide-react';
import { ProductInquiryAction } from './ProductInquiryAction';

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all 28 products
export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return {
      title: 'Machine Not Found | Nagendra Agencies',
    };
  }

  return {
    title: `${product.name} | ${product.category} - Nagendra Agencies`,
    description: product.description 
      ? product.description.slice(0, 160)
      : `High-performance ${product.name} supplied by Nagendra Agencies, Secunderabad. Price: ${product.price}.`,
    openGraph: {
      title: `${product.name} | Nagendra Agencies`,
      description: `Buy ${product.name} at ${product.price}. High capacity, industrial grain machinery from Nagendra Agencies, Secunderabad.`,
      images: product.local_images?.[0] ? [product.local_images[0].relative_path] : [],
    },
  };
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.id, 4);

  return (
    <div className="bg-natural min-h-screen py-8 pb-28 lg:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Products', href: '/products' },
            { label: product.category, href: `/categories/${product.categorySlug}` },
            { label: product.name },
          ]}
        />

        {/* Main Product Showcase Box */}
        <div className="bg-[#FEFCFA] rounded-2xl border border-[#E8E1D5] p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Gallery Column */}
            <div className="lg:col-span-6">
              <ProductGallery
                images={product.local_images}
                productName={product.name}
              />
            </div>

            {/* Product Details & Actions Column */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/categories/${product.categorySlug}`}
                    className="text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md transition-colors"
                  >
                    {product.category}
                  </Link>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {product.price_type}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-industrial-900 leading-tight">
                  {product.name}
                </h1>

                {/* Price Display */}
                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-brand-blue font-heading">
                    {product.price_amount || product.price}
                  </span>
                  {product.price_unit && (
                    <span className="text-sm font-semibold text-slate-500">
                      / {product.price_unit.replace('/', '').trim()}
                    </span>
                  )}
                  {product.moq && (
                    <span className="text-xs text-slate-400 ml-auto font-medium">
                      MOQ: {product.moq}
                    </span>
                  )}
                </div>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {product.description ||
                    `${product.name} engineered for superior output, high capacity, and reliable continuous operation in commercial grain processing facilities.`}
                </p>

                {/* Key Verification & Procurement Attributes */}
                <div className="grid grid-cols-2 gap-2.5 pt-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2 bg-[#FAF7F2] p-2.5 rounded-lg border border-[#E8E1D5]">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>GST 36AGXPG1350N1ZX</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#FAF7F2] p-2.5 rounded-lg border border-[#E8E1D5]">
                    <Truck className="w-4 h-4 text-brand-blue flex-shrink-0" />
                    <span>Road Freight Delivery</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#FAF7F2] p-2.5 rounded-lg border border-[#E8E1D5]">
                    <Building2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>Nagendra Agencies (2005)</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#FAF7F2] p-2.5 rounded-lg border border-[#E8E1D5]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Tested Pre-Dispatch</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#E8E1D5] space-y-3">
                <ProductInquiryAction
                  productName={product.name}
                  productId={product.id}
                  price={product.price}
                  brochurePath={product.brochure_local_path}
                />

                <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
                  <span>Authentic IndiaMART Listing ID: {product.id}</span>
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-slate-600 hover:text-brand-blue"
                  >
                    View Original Source <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Technical Specifications Section */}
        <div className="bg-[#FEFCFA] rounded-2xl border border-[#E8E1D5] p-6 sm:p-10 shadow-sm space-y-6">
          <div className="border-b border-[#E8E1D5] pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue block mb-1">
              Engineering Parameters
            </span>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-industrial-900">
              Technical Specifications
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left border-collapse">
              <tbody>
                {Object.entries(product.specifications || {}).map(([key, value], idx) => (
                  <tr
                    key={key}
                    className={`border-b border-[#E8E1D5] ${
                      idx % 2 === 0 ? 'bg-[#FAF7F2]/70' : 'bg-[#FEFCFA]'
                    }`}
                  >
                    <th scope="row" className="py-3 px-4 font-semibold text-slate-500 w-1/3 sm:w-1/4">
                      {key}
                    </th>
                    <td className="py-3 px-4 font-bold text-industrial-900">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Related Machinery in Same/Similar Category */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-blue block mb-1">
                  Complementary Plant Equipment
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-industrial-900">
                  Related Machinery in {product.category}
                </h3>
              </div>
              <Link
                href={`/categories/${product.categorySlug}`}
                className="text-xs font-bold text-brand-blue hover:text-brand-blue-dark"
              >
                View Category ({product.category}) →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
