import productsJson from '../../products.json';
import { Product, CategoryInfo } from './types';

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

// Map base products with slugs and normalized asset paths
export const allProducts: Product[] = (productsJson as any[]).map((p) => {
  const prodSlug = slugify(p.name);
  const catSlug = slugify(p.category);

  // Normalize image paths to ensure leading slash for Next.js public directory
  const localImages = (p.local_images || []).map((img: any) => ({
    ...img,
    relative_path: img.relative_path.startsWith('/') ? img.relative_path : `/${img.relative_path}`,
  }));

  const brochurePath = p.brochure_local_path 
    ? (p.brochure_local_path.startsWith('/') ? p.brochure_local_path : `/${p.brochure_local_path}`)
    : null;

  return {
    ...p,
    slug: prodSlug,
    categorySlug: catSlug,
    local_images: localImages,
    brochure_local_path: brochurePath,
  };
});

// Category descriptions for industrial catalog presentation
const categoryDescriptions: Record<string, string> = {
  'rice-machine': 'Heavy-duty whiteners, silky polishers, length graders, thickness graders, destoners, and pneumatic shellers designed for high-throughput, low-breakage rice milling.',
  'cleaning-machine': 'Precision vibratory and classifier cleaning machines designed to remove dust, stones, chaff, and foreign contaminants prior to milling.',
  'storage-silo': 'High-capacity galvanized steel flat bottom and hopper bottom silos engineered for secure, moisture-controlled bulk grain storage.',
  'parboiling-plant': 'Energy-efficient single and double steaming/boiling parboiling plants and continuous paddy dryers for commercial grain processing.',
  'digital-grain-moisture-meter': 'Field-portable digital moisture testing meters providing quick and accurate moisture readings for paddy and grains.',
  'color-sorting-machine': 'High-definition CCD color sorting equipment delivering 99.5%+ sorting accuracy for raw rice, parboiled grain, and cashew nuts.',
  'husk-fired-furnace': 'Compact biomass husk-fired furnaces providing direct, eco-friendly heat for industrial paddy dryers with 30% reduced fuel consumption.',
  'rice-mill-heat-exchanger': 'Counter-flow plate and tube aluminium heat exchangers designed for rapid drying and heat recovery in food processing.',
  'water-recycling-system': 'Civil and skid-based effluent filtration systems enabling automatic water treatment and recycling for industrial rice mills.',
};

export function getAllProducts(): Product[] {
  return allProducts;
}

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug);
}

export function getProductsByCategorySlug(catSlug: string): Product[] {
  return allProducts.filter((p) => p.categorySlug === catSlug);
}

export function getAllCategories(): CategoryInfo[] {
  const catMap = new Map<string, { name: string; count: number; image: string }>();

  allProducts.forEach((p) => {
    if (!catMap.has(p.categorySlug)) {
      const firstImg = p.local_images?.[0]?.relative_path || '/assets/company/logo.png';
      catMap.set(p.categorySlug, {
        name: p.category,
        count: 1,
        image: firstImg,
      });
    } else {
      const item = catMap.get(p.categorySlug)!;
      item.count += 1;
    }
  });

  return Array.from(catMap.entries()).map(([slug, data]) => ({
    slug,
    name: data.name,
    productCount: data.count,
    description: categoryDescriptions[slug] || `Industrial ${data.name} solutions from Nagendra Agencies.`,
    image: data.image,
  }));
}

export function getRelatedProducts(currentProductId: string, limit = 4): Product[] {
  const current = allProducts.find((p) => p.id === currentProductId);
  if (!current) return allProducts.slice(0, limit);

  // First try same category
  const sameCategory = allProducts.filter(
    (p) => p.id !== currentProductId && p.categorySlug === current.categorySlug
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  // Fill remainder from other categories
  const others = allProducts.filter(
    (p) => p.id !== currentProductId && p.categorySlug !== current.categorySlug
  );

  return [...sameCategory, ...others].slice(0, limit);
}
