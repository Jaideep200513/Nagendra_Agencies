# Nagendra Agencies — Modern Industrial Business Website & Machinery Catalog

A professional, high-performance, multi-page industrial business website and machinery catalog for **Nagendra Agencies** (Secunderabad, Telangana). Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Motion for React** (`framer-motion`), inspired by modern industrial engineering portals like *Suri Engineers*.

---

## 🚀 Quick Start — How to Run Locally

### Prerequisites
- **Node.js**: v18.17.0 or later (Tested with Node v22.18.0)
- **npm**: v9.0.0 or later

### 1. Install Dependencies
If running for the first time or on a fresh clone:
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:3000
```
The site features instant Fast Refresh, dynamic routing, and interactive animations.

---

### 3. Production Build & Local Preview
To test the production build with full static generation (SSG) across all 28 product routes and 9 category routes:

```bash
npm run build
npm run start
```
The optimized production server will run on `http://localhost:3000`.

---

## 🌐 Website Architecture & Working Routes

Every route is statically optimized and accessible via direct deep linking:

| Route | Description |
| :--- | :--- |
| **`/`** | **Homepage**: Industrial hero section, business stats counter, 9 category cards, featured machinery showcase, company heritage story, facility photos, and quick quote banner. |
| **`/products`** | **Complete Machinery Catalog**: Searchable and filterable grid of all 28 machines with category pills, real-time keyword search, sorting options (Price / Name), and quick inquiry triggers. |
| **`/products/[slug]`** | **Individual Product Detail Pages**: Dynamic deep links for each of the 28 products featuring multi-angle image galleries with thumbnail switching, technical parameter tables, full descriptions, verified fixed pricing, PDF brochure download (where available), and related machines. |
| **`/categories/[slug]`** | **Product Category Pages**: Dedicated pages for each of the 9 machinery categories (Rice Machines, Parboiling Plants, Storage Silos, Cleaning Machines, Color Sorters, etc.) displaying category descriptions and models. |
| **`/about`** | **Company Profile**: 20-year history since 2005, leadership profile of CEO Mr. Nagendra Prasad Gubbala, comprehensive business factsheet (GSTIN, Banker, Legal Status), team standards, and full infrastructure photo gallery. |
| **`/contact`** | **Contact & Location**: Verified address at Ranigunj Secunderabad, Google Maps link, direct landline (`040 2770 7687`), telephony desk (`080 4896 7406`), email, WhatsApp quick connect, and a working equipment inquiry form. |

---

## 📁 Project Structure

```
Nagendra_Agencies/
├── company.json                    # Original extracted company factsheet & contact data
├── products.json                   # Complete dataset of 28 products with specs and prices
├── extraction-report.md            # Comprehensive audit & verification report
├── README.md                       # This setup & run guide
├── package.json                    # Next.js, React, Tailwind, and Motion dependencies
├── tsconfig.json                   # TypeScript configuration with @/* path aliases
├── tailwind.config.js              # Custom industrial slate & blue color system
├── postcss.config.js               # PostCSS configuration
├── next.config.mjs                 # Next.js configuration
├── public/
│   └── assets/                     # Publicly served local media
│       ├── company/                # Logo, sign board, certificate, exterior, office
│       └── products/               # 28 product directories (70 verified images + brochure)
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Global layout with Google fonts, Navbar, and Footer
│   │   ├── page.tsx                # Homepage
│   │   ├── globals.css             # Tailwind base styles and reduced-motion rules
│   │   ├── about/
│   │   │   └── page.tsx            # Company profile & infrastructure page
│   │   ├── contact/
│   │   │   ├── page.tsx            # Contact information & map links
│   │   │   └── ContactForm.tsx     # Working interactive contact form component
│   │   ├── products/
│   │   │   ├── page.tsx            # Searchable & filterable 28-machine catalog
│   │   │   └── [slug]/
│   │   │       ├── page.tsx        # Dynamic individual product detail page
│   │   │       └── ProductInquiryAction.tsx # Client-side quotation & brochure trigger
│   │   └── categories/
│   │       └── [slug]/
│   │           └── page.tsx        # Dynamic category page with model listings
│   ├── components/
│   │   ├── Navbar.tsx              # Header with mega menu dropdown & contact bar
│   │   ├── Footer.tsx              # Industrial footer with GSTIN & compliance links
│   │   ├── ProductCard.tsx         # Machinery card with specs preview & quote action
│   │   ├── ProductGallery.tsx      # Multi-image viewer with thumbnail switching
│   │   ├── InquiryModal.tsx        # Pre-filled quotation request dialog
│   │   ├── Breadcrumbs.tsx         # Semantic breadcrumb navigation
│   │   └── MotionWrapper.tsx       # Motion for React animations with reduced-motion support
│   └── data/
│       ├── types.ts                # TypeScript interfaces for Product, Category, and Company
│       ├── company.ts              # Typed company data module
│       └── products.ts             # Products data helper (slug mapping, category lookup)
└── scripts/                        # Python extraction and verification utilities
```

---

## 🛠️ Key Features & Engineering Highlights

1. **Authentic Data Integrity**:
   - 100% of the 28 products, technical parameters, and exact prices (`₹ 3,50,000 / Unit`, `₹ 1,00,00,000 / Unit`, etc.) are preserved directly from Nagendra Agencies' verified IndiaMART profile.
   - 70 high-resolution images downloaded locally into `public/assets/products/` and verified with Pillow (PIL).
2. **Motion for React Animations**:
   - Scroll-triggered reveals, staggered card entrance, hover micro-interactions, smooth dropdown animations, and full accessibility support for `prefers-reduced-motion`.
3. **Real-Time Search & Filtering**:
   - Search across machine names, capacities, motor powers, brands (e.g. *Graintec*, *Induss*, *QGA*), and applications.
   - Category filtering with active counts across all 9 sectors.
4. **Direct Commercial Inquiries**:
   - Global and product-specific quotation modals pre-fill machine titles and catalog prices.
   - Instant click-to-chat WhatsApp button (`https://wa.me/...`) with pre-configured requirement text.
   - Clickable telephone buttons for direct landline (`040 2770 7687`) and toll-free virtual lines.
5. **SEO & Performance**:
   - Dynamic page titles, rich meta descriptions, OpenGraph tags, semantic HTML5 hierarchy, and local responsive image delivery.

---

## ✉️ Backend Inquiry Configuration (Production Deployment)

The contact and quotation forms currently handle validation and state on the client side with instant confirmation and direct WhatsApp escalation.

For production email delivery:
1. Create a Next.js API route at `src/app/api/inquiry/route.ts`.
2. Connect your preferred transactional email service (e.g., [Resend](https://resend.com), SendGrid, or Nodemailer with SMTP).
3. Update `handleQuoteSubmit` and `handleSubmit` in `InquiryModal.tsx` and `ContactForm.tsx` to `POST` to `/api/inquiry`.
