import os
import time
import httpx
from list_all_products import products

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9'
}

client = httpx.Client(headers=headers, timeout=20.0, follow_redirects=True)

remaining = []
for pid, p in products.items():
    filepath = os.path.join("html_dumps/products", f"{pid}.html")
    if not os.path.exists(filepath) or os.path.getsize(filepath) < 1000:
        remaining.append((pid, p))

print(f"Remaining to fetch: {len(remaining)}")

for pid, p in remaining:
    filepath = os.path.join("html_dumps/products", f"{pid}.html")
    url = p["url"]
    print(f"Fetching [{pid}] {p['name']}...")
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
    time.sleep(2.0)
