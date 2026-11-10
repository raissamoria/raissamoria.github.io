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

max_lum = 0
bright_highlights = []
for y in range(int(h * 0.2), int(h * 0.8)):
    for x in range(int(w * 0.05), int(w * 0.95)):
        idx = (y * w + x) * 3
        r, g, b = raw[idx], raw[idx+1], raw[idx+2]
        # In black letters, is there pure white?
        if r > 180 and g > 180 and b > 180:
            bright_highlights.append((x, y, r, g, b))

print(f"Bright pixels (R,G,B > 180) in central region: {len(bright_highlights)}")
if bright_highlights:
    print("Samples:", bright_highlights[:5])
