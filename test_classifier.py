import sys, os

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

# Let's count how many pixels are dark (e.g. brightness < 120)
dark_count = 0
for i in range(0, len(raw), 3):
    r, g, b = raw[i], raw[i+1], raw[i+2]
    brightness = 0.299*r + 0.587*g + 0.114*b
    if brightness < 120:
        dark_count += 1

print(f"Total pixels: {w*h}, dark pixels (brightness < 120): {dark_count} ({dark_count/(w*h)*100:.1f}%)")
