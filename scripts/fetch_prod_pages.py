import os
import time
import httpx
import json

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9'
}

with open("html_dumps/all_products_raw.json", "w", encoding="utf-8") as f:
    pass

# We can import our parse_catalog logic to get the product urls
from list_all_products import products

os.makedirs("html_dumps/products", exist_ok=True)

client = httpx.Client(headers=headers, timeout=20.0, follow_redirects=True)

print(f"Total products to fetch: {len(products)}")
for pid, p in products.items():
    filepath = os.path.join("html_dumps/products", f"{pid}.html")
    if os.path.exists(filepath) and os.path.getsize(filepath) > 1000:
        print(f"Already have {pid}")
        continue
    url = p["url"]
    print(f"Fetching [{pid}] {p['name']} from {url}...")
    try:
        r = client.get(url)
        if r.status_code == 200:
            with open(filepath, "w", encoding="utf-8") as pf:
                pf.write(r.text)
            print(f" -> OK ({len(r.text)} bytes)")
        else:
            print(f" -> HTTP {r.status_code}")
    except Exception as e:
        print(f" -> Error: {e}")
    time.sleep(0.5)

print("Finished fetching all product detail pages.")
