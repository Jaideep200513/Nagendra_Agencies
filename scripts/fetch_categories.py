import httpx
import re
import os

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

categories = [
    ("rice-machine.html", "Rice Machine"),
    ("cleaning-machine.html", "Cleaning Machine"),
    ("storage-silo.html", "Storage Silo"),
    ("parboiling-plant.html", "Parboiling Plant"),
    ("digital-grain-moisture-meter.html", "Digital Grain Moisture Meter"),
    ("color-sorting-machine.html", "Color Sorting Machine"),
    ("husk-fired-furnace.html", "Husk Fired Furnace"),
    ("rice-mill-heat-exchanger.html", "Rice Mill Heat Exchanger"),
    ("water-recycling-system.html", "Water Recycling System"),
    ("new-items.html", "New Items"),
    ("rice-bran-centrifugal-and-stone-separator.html", "Our Product Range")
]

os.makedirs("html_dumps", exist_ok=True)

for slug, name in categories:
    url = f"https://www.indiamart.com/nagendraagencies/{slug}"
    try:
        r = httpx.get(url, headers=headers, follow_redirects=True, timeout=15)
        path = os.path.join("html_dumps", slug)
        with open(path, "w", encoding="utf-8") as f:
            f.write(r.text)
        print(f"Downloaded {slug} (Status: {r.status_code}, Length: {len(r.text)})")
    except Exception as e:
        print(f"Failed {slug}: {e}")
