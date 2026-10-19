import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  getAllCategories, 
  getProductsByCategorySlug 
} from '../../../data/products';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { ProductCard } from '../../../components/ProductCard';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const categories = getAllCategories();
  const category = categories.find((c) => c.slug === params.slug);

  if (!category) {
    return {
      title: 'Category Not Found | Nagendra Agencies',
    };
  }

  return {
    title: `${category.name} Machinery | Nagendra Agencies`,
    description: `${category.description} Explore ${category.productCount} machinery models available with verified specifications and pricing from Nagendra Agencies.`,
  };
}

export default function CategoryDetailPage({ params }: PageProps) {
  const categories = getAllCategories();
  const currentCategory = categories.find((c) => c.slug === params.slug);

  if (!currentCategory) {
    notFound();
  }

  const categoryProducts = getProductsByCategorySlug(params.slug);

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      
      {/* Grounded Industrial Header Section (Matching Products & About) */}
      <section className="bg-[#111818] text-white border-b border-[#242E2E] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation on Dark */}
          <div className="mb-6">
            <Breadcrumbs
              items={[
                { label: 'Products', href: '/products' },
                { label: currentCategory.name },
              ]}
              isDark={true}
            />
          </div>

          <div className="max-w-4xl space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black text-white leading-tight tracking-tight">
              {currentCategory.name}
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-neutral-300 font-normal leading-relaxed pt-1">
              {currentCategory.description}
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-6 text-sm text-neutral-300 border-t border-white/15">
              <div>
                <span className="block font-bold text-white text-base">
                  {categoryProducts.length} {categoryProducts.length === 1 ? 'Machine Model' : 'Machine Models'}
                </span>
                <span className="text-neutral-400">Available in this Category</span>
              </div>
              <div className="h-8 w-px bg-white/20 hidden sm:block" />
              <div>
                <span className="block font-bold text-white text-base">Direct Supply</span>
                <span className="text-neutral-400">Wholesale Factory Pricing</span>
              </div>
              <div className="h-8 w-px bg-white/20 hidden sm:block" />
              <div>
                <span className="block font-bold text-white text-base">Nationwide</span>
                <span className="text-neutral-400">Direct Road Dispatch Across India</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">

        {/* Category Navigation Bar */}
        <div className="bg-white rounded-lg border border-neutral-300 p-6 shadow-sm space-y-3">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-500 block">
            All Categories
          </span>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/products"
              className="px-4 py-2 rounded-md text-sm sm:text-base font-bold bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-300 transition-colors"
            >
              All Products (28)
            </Link>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/categories/${c.slug}`}
                className={`px-4 py-2 rounded-md text-sm sm:text-base font-bold transition-colors whitespace-nowrap border ${
                  c.slug === params.slug
                    ? 'bg-neutral-950 text-white border-neutral-950 shadow-sm'
                    : 'bg-neutral-100 text-neutral-800 border-neutral-300 hover:bg-neutral-200 hover:border-neutral-400'
                }`}
              >
                {c.name} ({c.productCount})
              </Link>
            ))}
          </div>
        </div>

        {/* Category Machinery Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-300 pb-4">
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-neutral-950">
              {currentCategory.name} Models ({categoryProducts.length})
            </h2>
            <Link
              href="/products"
              className="text-sm sm:text-base font-bold text-neutral-900 hover:text-brand-orange inline-flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> View All Products (28 Machines)
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {categoryProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </main>

    </div>
  );
}
