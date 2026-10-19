export interface ProductImage {
  file_name: string;
  relative_path: string;
  url: string;
  format: string;
  width: number;
  height: number;
  size_bytes: number;
  status: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categories: string[];
  categorySlug: string;
  url: string;
  price: string;
  price_amount: string;
  price_unit: string;
  price_type: string;
  moq: string | null;
  specifications: Record<string, string>;
  description: string;
  brochure_url: string | null;
  brochure_local_path: string | null;
  image_urls: string[];
  local_images: ProductImage[];
}

export interface CategoryInfo {
  name: string;
  slug: string;
  description: string;
  productCount: number;
  image: string;
}

export interface CompanyData {
  company_name: string;
  legal_status: string;
  established_year: number;
  nature_of_business: string;
  additional_business: string;
  key_personnel: {
    managing_director?: string;
    company_ceo: string;
  };
  gst_details: {
    gstin: string;
    registration_year: number;
    status: string;
  };
  banking: {
    banker: string;
  };
  team_and_workforce: {
    total_employees: string;
    team_composition: string;
  };
  contact_information: {
    primary_phone: string;
    indiamart_virtual_phone: string;
    email: string;
    full_address: string;
    locality: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  business_operations: {
    payment_mode: string[];
    shipment_mode: string[];
    customized_packaging: boolean;
    quality_testing_facilities: boolean;
    member_since: string;
    rating: {
      score: number;
      max_score: number;
      total_votes: number;
    };
  };
  full_description: string;
  team_description: string;
  source_urls: Record<string, string>;
  assets: Record<string, {
    relative_path: string;
    url: string;
    format: string;
    dimensions: string;
  }>;
}
