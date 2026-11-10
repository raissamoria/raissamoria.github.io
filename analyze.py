import sys, os

with open("/tmp/moria.ppm", "rb") as f:
    header = []
    while len(header) < 3:
        line = f.readline().strip()
        if not line or line.startswith(b'#'):
            continue
        header.extend(line.split())
    magic, w, h = header[0], int(header[1]), int(header[2])
    maxval = int(f.readline().strip())
    raw = bytearray(f.read())

# Check pixel statistics for border
border_pixels = []
for x in range(w):
    idx_top = (0 * w + x) * 3
    idx_bot = ((h - 1) * w + x) * 3
    border_pixels.append((raw[idx_top], raw[idx_top+1], raw[idx_top+2]))
    border_pixels.append((raw[idx_bot], raw[idx_bot+1], raw[idx_bot+2]))
for y in range(h):
    idx_left = (y * w + 0) * 3
    idx_right = (y * w + (w - 1)) * 3
    border_pixels.append((raw[idx_left], raw[idx_left+1], raw[idx_left+2]))
    border_pixels.append((raw[idx_right], raw[idx_right+1], raw[idx_right+2]))

min_r = min(p[0] for p in border_pixels)
max_r = max(p[0] for p in border_pixels)
min_g = min(p[1] for p in border_pixels)
max_g = max(p[1] for p in border_pixels)
min_b = min(p[2] for p in border_pixels)
max_b = max(p[2] for p in border_pixels)
print(f"Border RGB range: R[{min_r}, {max_r}] G[{min_g}, {max_g}] B[{min_b}, {max_b}]")

# Let's find what is definitively background vs foreground
# Notice in background: B >= 180 and B > R + 20 or (R > 180 and G > 200 and B > 220)
# Let's test a simple classifier:
# For each pixel, is it sky?
