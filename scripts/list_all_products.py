import os
import re
import json
import sys
from html import unescape

sys.stdout.reconfigure(encoding='utf-8')

def clean_text(s):
    if not s:
        return ""
    s = unescape(s)
    s = re.sub(r'<[^>]+>', ' ', s)
    s = re.sub(r'\s+', ' ', s)
    return s.strip()

categories = [
    ("rice-machine.html", "Rice Machine"),
    ("cleaning-machine.html", "Cleaning Machine"),
    ("storage-silo.html", "Storage Silo"),
    ("parboiling-plant.html", "Parboiling Plant"),
    ("digital-grain-moisture-meter.html", "Digital Grain Moisture Meter"),
    ("color-sorting-machine.html", "Color Sorting Machine"),
    ("husk-fired-furnace.html", "Husk Fired Furnace"),
    ("rice-mill-heat-exchanger.html", "Rice Mill Heat Exchanger"),
    ("water-recycling-system.html", "Water Recycling System")
]

products = {}

for filename, cat_name in categories:
    filepath = os.path.join("html_dumps", filename)
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    item_splits = re.split(r'id="(\d+)"\s+class="udg-category-item">', content)
    for i in range(1, len(item_splits), 2):
        prod_id = item_splits[i]
        item_html = item_splits[i+1]
        
        # Product title and URL
        title_match = re.search(r'<h3 class="udg-category-item__title"><a href="([^"]+)"[^>]*>(.*?)</a></h3>', item_html)
        if title_match:
            prod_url = title_match.group(1)
            if prod_url.startswith("//"):
                prod_url = "https:" + prod_url
            elif prod_url.startswith("/"):
                prod_url = "https://www.indiamart.com" + prod_url
            prod_name = clean_text(title_match.group(2))
        else:
            prod_url = ""
            prod_name = ""
        
        # Category Image Gallery data-props
        gallery_match = re.search(r'data-island="CategoryImageGallery" data-props="([^"]+)"', item_html)
        images = []
        if gallery_match:
            try:
                gallery_json = json.loads(unescape(gallery_match.group(1)))
                if not prod_name and "productName" in gallery_json:
                    prod_name = gallery_json["productName"]
                for media in gallery_json.get("galleryMedia", []):
                    if media.get("type") == "image" and media.get("src"):
                        img_url = media["src"]
                        if img_url not in images:
                            images.append(img_url)
            except Exception as e:
                pass
        
        miv_matches = re.findall(r'&quot;displayImage&quot;:&quot;([^&]+)&quot;', item_html)
        for img in miv_matches:
            img = img.replace('\\/', '/')
            if img.startswith("http") and img not in images:
                images.append(img)
                
        # Price
        price_amount_match = re.search(r'<span class="udg-category-item__priceAmount">(.*?)</span>', item_html)
        price_unit_match = re.search(r'<span class="udg-category-item__priceUnit">(.*?)</span>', item_html)
        price_amount = clean_text(price_amount_match.group(1)) if price_amount_match else ""
        price_unit = clean_text(price_unit_match.group(1)) if price_unit_match else ""
        
        if price_amount:
            price_raw = f"{price_amount} {price_unit}".strip()
            if "-" in price_amount or "to" in price_amount.lower():
                price_type = "Price Range"
            else:
                price_type = "Fixed Price"
        else:
            price_raw = "Price on Request"
            price_type = "Request For Quotation (RFQ)"
            
        brochure_match = re.search(r'href="([^"]+\.pdf)"', item_html)
        brochure_url = brochure_match.group(1) if brochure_match else None
        
        specs = {}
        specs_rows = re.findall(r'<tr class="udg-category-item__specRow"><th[^>]*>(.*?)</th><td[^>]*>(.*?)</td></tr>', item_html)
        for k, v in specs_rows:
            key_clean = clean_text(k)
            val_clean = clean_text(v)
            if key_clean and val_clean:
                specs[key_clean] = val_clean
                
        moq = specs.get("Minimum Order Quantity") or specs.get("MOQ")
        
        desc_match = re.search(r'<section class="udg-category-item__sdescRich"[^>]*>(.*?)</section>', item_html, re.DOTALL)
        desc_text = clean_text(desc_match.group(1)) if desc_match else ""
            
        if prod_id not in products:
            products[prod_id] = {
                "id": prod_id,
                "name": prod_name,
                "category": cat_name,
                "categories": [cat_name],
                "url": prod_url,
                "price": price_raw,
                "price_amount": price_amount,
                "price_unit": price_unit,
                "price_type": price_type,
                "moq": moq,
                "specifications": specs,
                "description": desc_text,
                "brochure_url": brochure_url,
                "images": images
            }
        else:
            if cat_name not in products[prod_id]["categories"]:
                products[prod_id]["categories"].append(cat_name)
            for img in images:
                if img not in products[prod_id]["images"]:
                    products[prod_id]["images"].append(img)
            for sk, sv in specs.items():
                if sk not in products[prod_id]["specifications"]:
                    products[prod_id]["specifications"][sk] = sv
            if not products[prod_id]["description"] and desc_text:
                products[prod_id]["description"] = desc_text
            if not products[prod_id]["brochure_url"] and brochure_url:
                products[prod_id]["brochure_url"] = brochure_url

print(f"Total Unique Products: {len(products)}")
for idx, (pid, p) in enumerate(products.items(), 1):
    print(f"\n#{idx} ID: {p['id']}")
    print(f"   Name: {p['name']}")
    print(f"   Category: {p['category']}")
    print(f"   Price: {p['price']} | Type: {p['price_type']}")
    print(f"   MOQ: {p['moq']}")
    print(f"   URL: {p['url']}")
    print(f"   Images ({len(p['images'])}): {p['images']}")
    print(f"   Brochure: {p['brochure_url']}")
    print(f"   Specs ({len(p['specifications'])}): {p['specifications']}")
    print(f"   Description ({len(p['description'])} chars): {p['description'][:120]}...")
