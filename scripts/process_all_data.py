import os
import re
import json
import time
import httpx
from PIL import Image
from html import unescape

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9'
}

def clean_text(s):
    if not s:
        return ""
    s = unescape(s)
    s = re.sub(r'<[^>]+>', ' ', s)
    s = re.sub(r'\s+', ' ', s)
    return s.strip()

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text).strip('-')
    return text[:50]

# Load base products from parse_catalog
from list_all_products import products

print(f"Loaded {len(products)} products from catalog parser.")

# Now enrich each product using its individual product detail page if available
for pid, p in products.items():
    prod_file = os.path.join("html_dumps", "products", f"{pid}.html")
    if os.path.exists(prod_file):
        with open(prod_file, "r", encoding="utf-8") as f:
            p_html = f.read()
            
        # Check JSON-LD
        ld_matches = re.findall(r'<script type="application/ld\+json">(.*?)</script>', p_html, re.DOTALL)
        for m in ld_matches:
            try:
                data = json.loads(m)
                if isinstance(data, dict):
                    if data.get("@type") == "Product":
                        if data.get("description") and len(data["description"]) > len(p["description"]):
                            p["description"] = clean_text(data["description"])
                        if data.get("image") and data["image"] not in p["images"]:
                            p["images"].append(data["image"])
                    elif data.get("@type") == "ImageGallery":
                        for media in data.get("associatedMedia", []):
                            curl = media.get("contentUrl")
                            if curl and curl not in p["images"]:
                                p["images"].append(curl)
            except:
                pass
                
        # Check specs table in detail page
        rows = re.findall(r'<tr[^>]*><td[^>]*>(.*?)</td><td[^>]*>(.*?)</td></tr>', p_html)
        for r in rows:
            k = clean_text(r[0])
            v = clean_text(r[1])
            if k and v and k not in p["specifications"]:
                p["specifications"][k] = v
                
        # Check high-res image URLs in detail page
        imgs = re.findall(r'https://[0-9]\.imimg\.com/data[0-9]/SELLER/Default/[^\'"]+\.(?:jpg|png|jpeg|webp)', p_html)
        for img in imgs:
            # Prefer 1000x1000 or clean high-res
            if "1000x1000" in img:
                if img not in p["images"]:
                    p["images"].append(img)

# Now prepare directories
os.makedirs("assets/products", exist_ok=True)
client = httpx.Client(headers=headers, timeout=20.0, follow_redirects=True)

download_stats = {
    "total_images": 0,
    "successful": 0,
    "failed": 0,
    "errors": []
}

products_list = []

for idx, (pid, p) in enumerate(products.items(), 1):
    slug = slugify(p["name"])
    folder_name = f"{idx:02d}_{slug}"
    prod_dir = os.path.join("assets", "products", folder_name)
    os.makedirs(prod_dir, exist_ok=True)
    
    # Filter and prioritize images: avoid duplicates and small thumbnails (125x125, 250x250)
    filtered_images = []
    seen_base = set()
    for img_url in p["images"]:
        # Extract base identifier without dimension
        base = re.sub(r'-(?:125x125|250x250|500x500|1000x1000)', '', img_url)
        if base in seen_base:
            continue
        seen_base.add(base)
        # Prioritize 1000x1000 version
        high_res_url = base.rsplit('.', 1)[0] + '-1000x1000.' + base.rsplit('.', 1)[1]
        filtered_images.append((img_url, high_res_url))
        
    downloaded_assets = []
    
    for img_idx, (orig_url, high_res_url) in enumerate(filtered_images, 1):
        download_stats["total_images"] += 1
        ext = os.path.splitext(orig_url)[1].split('?')[0]
        if not ext:
            ext = ".png"
        filename = f"{slug}_{img_idx:02d}{ext}"
        filepath = os.path.join(prod_dir, filename)
        rel_path = f"assets/products/{folder_name}/{filename}"
        
        # Try high_res first, fallback to orig_url
        downloaded = False
        final_url = high_res_url
        for target_url in [high_res_url, orig_url]:
            try:
                r = client.get(target_url)
                if r.status_code == 200 and len(r.content) > 500:
                    with open(filepath, "wb") as f:
                        f.write(r.content)
                    with Image.open(filepath) as img_obj:
                        format_name = img_obj.format
                        width, height = img_obj.size
                        size_bytes = len(r.content)
                    downloaded_assets.append({
                        "file_name": filename,
                        "relative_path": rel_path,
                        "url": target_url,
                        "format": format_name,
                        "width": width,
                        "height": height,
                        "size_bytes": size_bytes,
                        "status": "valid"
                    })
                    download_stats["successful"] += 1
                    downloaded = True
                    break
            except Exception as e:
                pass
        
        if not downloaded:
            download_stats["failed"] += 1
            download_stats["errors"].append({
                "product_id": pid,
                "product_name": p["name"],
                "url": orig_url,
                "reason": "Failed to download or invalid image format"
            })
            
    # Also download brochure if available
    brochure_local = None
    if p["brochure_url"]:
        b_filename = f"{slug}_brochure.pdf"
        b_filepath = os.path.join(prod_dir, b_filename)
        b_rel_path = f"assets/products/{folder_name}/{b_filename}"
        try:
            r = client.get(p["brochure_url"])
            if r.status_code == 200:
                with open(b_filepath, "wb") as bf:
                    bf.write(r.content)
                brochure_local = b_rel_path
        except:
            pass
            
    prod_entry = {
        "id": pid,
        "name": p["name"],
        "category": p["category"],
        "categories": p["categories"],
        "url": p["url"],
        "price": p["price"],
        "price_amount": p["price_amount"],
        "price_unit": p["price_unit"],
        "price_type": p["price_type"],
        "moq": p["moq"],
        "specifications": p["specifications"],
        "description": p["description"],
        "brochure_url": p["brochure_url"],
        "brochure_local_path": brochure_local,
        "image_urls": p["images"],
        "local_images": downloaded_assets
    }
    products_list.append(prod_entry)
    print(f"[{idx}/28] {p['name']}: {len(downloaded_assets)} images downloaded.")

# Save products.json
with open("products.json", "w", encoding="utf-8") as f:
    json.dump(products_list, f, indent=2, ensure_ascii=False)
print("Saved products.json successfully!")

# Build and save company.json
company_data = {
    "company_name": "Nagendra Agencies",
    "legal_status": "Sole Proprietorship",
    "established_year": 2005,
    "nature_of_business": "Trader - Wholesaler / Distributor",
    "additional_business": "Manufacturing & Trading of Mill Machines, Separators, Silos, Furnaces",
    "key_personnel": {
        "managing_director": "NAGENDRA PRASAD",
        "company_ceo": "N Gubbala"
    },
    "gst_details": {
        "gstin": "36AGXPG1350N1ZX",
        "registration_year": 2017,
        "status": "Verified"
    },
    "banking": {
        "banker": "SYNDICATE BANK"
    },
    "team_and_workforce": {
        "total_employees": "11 to 25 People",
        "team_composition": "Unskilled labors, skilled labors, sales & marketing executives, warehouse experts, qualified testing unit"
    },
    "contact_information": {
        "primary_phone": "040 2770 7687",
        "indiamart_virtual_phone": "08048967406",
        "email": "nagendraagencies05@gmail.com",
        "full_address": "2nd Floor, Ganesh Chamber, X Road, Bolaram Nagar, Ranigunj, Secunderabad, Telangana 500003, India",
        "locality": "Secunderabad",
        "city": "Hyderabad / Secunderabad",
        "state": "Telangana",
        "postal_code": "500003",
        "country": "India"
    },
    "business_operations": {
        "payment_mode": ["Cash", "Credit Card"],
        "shipment_mode": ["By Road"],
        "customized_packaging": False,
        "quality_testing_facilities": True,
        "member_since": "15+ Years on IndiaMART",
        "rating": {
            "score": 4.3,
            "max_score": 5.0,
            "total_votes": 13
        }
    },
    "full_description": "Since 2005 \"Nagendra Agencies\" is working as \"Sole Proprietorship\" Firm and contending in this fierce market marvelously by the in-depth business dexterity. By the support of our professionals, we are engaged in manufacturing and trading of Mill Machine, Rice Bran Centrifugal Separator, Stone Separator, Rice Polishing Machine and many more. The squad of our venture is committed to purveying products that not only satisfy customer needs but also add value to the equipment investment by minimizing costs. We have hired a team of skilled and experienced personnel who hold immense expertise in the concerned domain. With the support of our diligent team, our firm is able to offer machines containing high capacity and are of different dimensions. In order to provide the quality products, a capacious infrastructural facility has also been developed. At this facility, we are able to manufacture our products in a timely manner and according to the detailed requirements of our customers. Furthermore, we also give the facility of customization to our customers if they require any modification and improvement in the catered range of our products. With the support of our mentor, Mr. Nagendra Prasad, we have successfully marked our presence in the industry. Possessing sharp business acumen and extensive industry knowledge, he directs us to look beyond the possibilities and to design latest equipment in order to meet clients' application specific requirements.",
    "team_description": "We possess the team of trained workers who have absolute knowledge of products which we manufacture in our organization. Our diligent team comprises unskilled labors, skilled labors, sales & marketing executives and warehouse experts. Qualified testing unit has also been appointed to examine the products at multiple stages of production. Due to their close communication and coordination, they are able to accomplish the diverse requirements of our customers. They also endeavor to nurture their talent in the required area of work.",
    "source_urls": {
        "profile": "https://www.indiamart.com/nagendraagencies/",
        "about_us": "https://www.indiamart.com/nagendraagencies/profile.html",
        "catalog": "https://www.indiamart.com/nagendraagencies/rice-bran-centrifugal-and-stone-separator.html",
        "photos": "https://www.indiamart.com/nagendraagencies/photos.html",
        "contact": "https://www.indiamart.com/nagendraagencies/enquiry.html"
    },
    "assets": {
        "logo": {
            "relative_path": "assets/company/logo.png",
            "url": "https://2.imimg.com/data2/GT/UT/MY-3598466/nagendra-agencies-logo-120x120.png",
            "format": "PNG",
            "dimensions": "120x120"
        },
        "infrastructure_board": {
            "relative_path": "assets/company/infrastructure_board.jpg",
            "url": "https://5.imimg.com/data5/SELLER/Default/2026/8/638186470/JO/QE/UZ/3598466/txfprtfv-1743197413390371-1000x1000.jpg",
            "format": "JPEG",
            "dimensions": "1000x751"
        },
        "certification_certificate": {
            "relative_path": "assets/company/certification_certificate.jpg",
            "url": "https://5.imimg.com/data5/SELLER/Default/2026/8/638186072/UL/UF/RV/3598466/gqhtpymx-1459130922712713-page-0001-1000x1000.jpg",
            "format": "JPEG",
            "dimensions": "707x1000"
        },
        "infrastructure_exterior": {
            "relative_path": "assets/company/infrastructure_exterior.jpg",
            "url": "https://5.imimg.com/data5/SELLER/Default/2026/8/638186931/HC/KU/AT/3598466/jdevpfhm-1614857393330825-1000x1000.jpg",
            "format": "JPEG",
            "dimensions": "751x1000"
        },
        "infrastructure_office": {
            "relative_path": "assets/company/infrastructure_office.jpg",
            "url": "https://5.imimg.com/data5/SELLER/Default/2026/8/638187120/OR/WL/KD/3598466/pjtasggo-1568874057981544-1000x1000.jpg",
            "format": "JPEG",
            "dimensions": "751x1000"
        }
    }
}

with open("company.json", "w", encoding="utf-8") as f:
    json.dump(company_data, f, indent=2, ensure_ascii=False)
print("Saved company.json successfully!")

print("\nDownload summary:")
print(f"Total images attempted: {download_stats['total_images']}")
print(f"Successfully downloaded & verified: {download_stats['successful']}")
print(f"Failed: {download_stats['failed']}")
