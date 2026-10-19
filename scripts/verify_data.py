import json
import os

with open("company.json", "r", encoding="utf-8") as f:
    company = json.load(f)

with open("products.json", "r", encoding="utf-8") as f:
    products = json.load(f)

print(f"Company: {company['company_name']}")
print(f"Total Products in products.json: {len(products)}")

# Check duplicate product IDs or names
ids = [p["id"] for p in products]
names = [p["name"] for p in products]
print(f"Unique IDs: {len(set(ids))} / {len(ids)}")
print(f"Unique Names: {len(set(names))} / {len(names)}")

# Check duplicates if any
from collections import Counter
id_counts = Counter(ids)
name_counts = Counter(names)
for pid, c in id_counts.items():
    if c > 1:
        print(f"Duplicate ID found: {pid}")
for name, c in name_counts.items():
    if c > 1:
        print(f"Duplicate Name found: {name}")

# Check price types
price_types = Counter(p["price_type"] for p in products)
print("\nPrice Types:", dict(price_types))

# Check categories
categories = Counter(p["category"] for p in products)
print("\nCategories breakdown:")
for cat, count in categories.items():
    print(f" - {cat}: {count} products")

# Check missing fields
missing_desc = [p["name"] for p in products if not p.get("description")]
missing_specs = [p["name"] for p in products if not p.get("specifications")]
missing_price = [p["name"] for p in products if not p.get("price") or p["price"] == "Price on Request"]
missing_images = [p["name"] for p in products if len(p.get("local_images", [])) == 0]

print(f"\nMissing descriptions: {len(missing_desc)}")
if missing_desc:
    print(" ", missing_desc)
print(f"Missing specifications: {len(missing_specs)}")
print(f"Missing price / Price on Request: {len(missing_price)}")
print(f"Missing local images: {len(missing_images)}")

# Check total downloaded image files
total_prod_images = sum(len(p.get("local_images", [])) for p in products)
print(f"\nTotal product images referenced: {total_prod_images}")

# Verify file existence on disk
missing_files = []
for p in products:
    for img in p.get("local_images", []):
        rpath = img["relative_path"]
        if not os.path.exists(rpath):
            missing_files.append(rpath)

print(f"Missing product image files on disk: {len(missing_files)}")

# Check company assets on disk
company_missing = []
for k, v in company.get("assets", {}).items():
    rpath = v["relative_path"]
    if not os.path.exists(rpath):
        company_missing.append(rpath)
print(f"Missing company asset files on disk: {len(company_missing)}")
