import os
import httpx
from PIL import Image

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}
os.makedirs("assets/company", exist_ok=True)

company_images = [
    ("logo", "https://2.imimg.com/data2/GT/UT/MY-3598466/nagendra-agencies-logo-120x120.png"),
    ("infrastructure_board", "https://5.imimg.com/data5/SELLER/Default/2026/8/638186470/JO/QE/UZ/3598466/txfprtfv-1743197413390371-1000x1000.jpg"),
    ("certification_certificate", "https://5.imimg.com/data5/SELLER/Default/2026/8/638186072/UL/UF/RV/3598466/gqhtpymx-1459130922712713-page-0001-1000x1000.jpg"),
    ("infrastructure_exterior", "https://5.imimg.com/data5/SELLER/Default/2026/8/638186931/HC/KU/AT/3598466/jdevpfhm-1614857393330825-1000x1000.jpg"),
    ("infrastructure_office", "https://5.imimg.com/data5/SELLER/Default/2026/8/638187120/OR/WL/KD/3598466/pjtasggo-1568874057981544-1000x1000.jpg")
]

for name, url in company_images:
    ext = os.path.splitext(url)[1].split('?')[0]
    if not ext:
        ext = ".jpg"
    filename = f"{name}{ext}"
    filepath = os.path.join("assets/company", filename)
    print(f"Downloading {name} from {url}...")
    try:
        r = httpx.get(url, headers=headers, follow_redirects=True, timeout=15)
        if r.status_code == 200:
            with open(filepath, "wb") as f:
                f.write(r.content)
            # Verify with PIL
            with Image.open(filepath) as img:
                print(f" -> Saved {filename}: {img.format}, {img.size[0]}x{img.size[1]}, {len(r.content)} bytes")
        else:
            print(f" -> HTTP {r.status_code}")
    except Exception as e:
        print(f" -> Error: {e}")
