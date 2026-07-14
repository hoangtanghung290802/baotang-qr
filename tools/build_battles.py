import os
import json

WORD_DIR = "../word"
DOC_DIR = "../documents"
MEDIA_DIR = "../media"

items = []

for file in os.listdir(DOC_DIR):

    if not file.endswith(".html"):
        continue

    name = os.path.splitext(file)[0]

    slug = (
        name.lower()
        .replace("trận chiến thắng ","")
        .replace(" ","")
        .replace("-","")
        .replace("ộ","o")
        .replace("ộ","o")
    )

    mp3 = ""

    for m in os.listdir(MEDIA_DIR):

        if m.lower().startswith(slug):

            mp3 = "media/" + m
            break

    items.append({

        "id": slug,

        "title": name.upper(),

        "file": "documents/" + file,

        "image": "images/battles/" + slug + ".jpg",

        "audio": mp3

    })

with open("../data/battles.json","w",encoding="utf-8") as f:

    json.dump(items,f,ensure_ascii=False,indent=4)

print("Đã tạo battles.json")