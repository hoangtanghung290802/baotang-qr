from docx import Document
import os
import html

INPUT = "../word"
OUTPUT = "../documents"

os.makedirs(OUTPUT, exist_ok=True)

for filename in os.listdir(INPUT):

    if not filename.lower().endswith(".docx"):
        continue

    doc = Document(os.path.join(INPUT, filename))

    body = ""

    for p in doc.paragraphs:

        text = html.escape(p.text.strip())

        if text == "":
            continue

        if text.startswith("CHIẾN THẮNG"):
            body += f"<h1>{text}</h1>\n"

        elif text.startswith("a)") or text.startswith("b)") or text.startswith("c)") or text.startswith("d)"):
            body += f"<h2>{text}</h2>\n"

        else:
            body += f"<p>{text}</p>\n"

    html_text = f"""<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="utf-8">
<title></title>
</head>
<body>

{body}

</body>
</html>
"""

    out = os.path.splitext(filename)[0] + ".html"

    with open(os.path.join(OUTPUT, out),"w",encoding="utf-8") as f:
        f.write(html_text)

print("Hoàn thành.")