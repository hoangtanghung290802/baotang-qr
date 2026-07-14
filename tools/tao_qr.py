# -*- coding: utf-8 -*-

import os
import json
import re
import qrcode
from PIL import Image, ImageOps

# =========================
# CẤU HÌNH
# =========================

BASE_URL = "https://hoangtanghung290802.github.io/baotang-qr"

JSON_FILE = "../data/museum.json"
LOGO_FILE = "../logo/sudoan5.png"
OUTPUT_DIR = "../qr"

QR_SIZE = 1000
LOGO_PERCENT = 0.16
BORDER_SIZE = 25

os.makedirs(OUTPUT_DIR, exist_ok=True)


def clean_filename(name):
    name = re.sub(r'[\\/*?:"<>|]', "", name)
    name = name.replace(";", " - ")
    name = re.sub(r"\s+", " ", name).strip()
    return name


with open(JSON_FILE, "r", encoding="utf-8") as f:
    data = json.load(f)

logo = Image.open(LOGO_FILE).convert("RGBA")

for item in data:

    url = f"{BASE_URL}/artifact.html?id={item['id']}"

    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4
    )

    qr.add_data(url)
    qr.make(fit=True)

    img = qr.make_image(
        fill_color="black",
        back_color="white"
    ).convert("RGBA")

    img = img.resize((QR_SIZE, QR_SIZE))

    # =========================
    # LOGO
    # =========================

    logo_size = int(QR_SIZE * LOGO_PERCENT)

    logo_resize = logo.resize(
        (logo_size, logo_size),
        Image.LANCZOS
    )

    x = (QR_SIZE - logo_size) // 2
    y = (QR_SIZE - logo_size) // 2

    img.paste(logo_resize, (x, y), logo_resize)

    # =========================
    # VIỀN ĐỎ
    # =========================

    img = ImageOps.expand(
        img,
        border=BORDER_SIZE,
        fill=(210, 0, 0)
    )

    filename = clean_filename(item["ten"]) + ".png"

    img.save(
        os.path.join(OUTPUT_DIR, filename)
    )

    print("Đã tạo:", filename)

print("\nHoàn thành.")