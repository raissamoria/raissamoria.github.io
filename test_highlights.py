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

# Look at the differences:
# Sky:
# - Blue is high: B > 180 (even up to 255)
# - Blue minus Red is large: (B - R) > 20 for blue sky.
# - In clouds: R > 170, G > 200, B > 235. Notice in clouds B is still > 230 and G is > 200!
# - Green is always > 160 in sky!
# Let's check highlights on the black letters:
# Highlights on black gloss:
# Specular reflection of light source (which is neutral or white/grey):
# Let's see: on the letters, does G ever exceed 160?
letter_bright = []
for y in range(int(h*0.25), int(h*0.8)):
    for x in range(int(w*0.05), int(w*0.95)):
        idx = (y * w + x) * 3
        r, g, b = raw[idx], raw[idx+1], raw[idx+2]
        # If this pixel is NOT sky:
        # What distinguishes sky?
        # In sky: B >= 220 and G >= 160
