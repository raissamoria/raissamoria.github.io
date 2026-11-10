# Let's find connected components of "sky-like" pixels
# A pixel is sky-like if:
# B > 180 and G > 140 and (B - R) > 15 or (R > 180 and G > 180 and B > 200)

with open("/tmp/moria.ppm", "rb") as f:
    header = []
    while len(header) < 3:
        line = f.readline().strip()
        if not line or line.startswith(b'#'):
            continue
        header.extend(line.split())
    w, h = int(header[1]), int(header[2])
    maxval = int(f.readline().strip())
    raw = bytearray(f.read())

is_sky_candidate = bytearray(w * h)
for y in range(h):
    for x in range(w):
        idx = (y * w + x) * 3
        r, g, b = raw[idx], raw[idx+1], raw[idx+2]
        # sky criteria
        if b > 160 and g > 140 and (b > r + 10 or (r > 170 and g > 170 and b > 200)):
            is_sky_candidate[y * w + x] = 1

# Check if any pixels inside the letters are falsely marked as sky
# Wait! In specular highlights on the black letters, what are R, G, B?
highlights = []
for y in range(h):
    for x in range(w):
        idx = (y * w + x) * 3
        r, g, b = raw[idx], raw[idx+1], raw[idx+2]
        if r > 100 or g > 100 or b > 100:
            if not is_sky_candidate[y * w + x]:
                highlights.append((x, y, r, g, b))

print(f"Candidate sky pixels: {sum(is_sky_candidate)} out of {w*h}")
print(f"Non-sky bright pixels (highlights on letters): {len(highlights)}")
if highlights:
    print("Sample highlights on letters:", highlights[:10])
