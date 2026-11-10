with open('/tmp/moria.ppm', 'rb') as f:
    def next_token():
        token = b''
        while True:
            c = f.read(1)
            if not c: break
            if c == b'#':
                while c and c != b'\n': c = f.read(1)
                continue
            if c in b' \t\r\n':
                if token: return token
            else:
                token += c
        return token

    next_token(); w = int(next_token()); h = int(next_token()); next_token()
    data = bytearray(f.read())

# Check the color of pixels with lum between 120 and 180:
edge_pixels = []
inside_letter_pixels = []

for y in range(h):
    for x in range(w):
        idx = (y * w + x) * 3
        r, g, b = data[idx], data[idx+1], data[idx+2]
        lum = 0.299*r + 0.587*g + 0.114*b
        if 130 <= lum <= 175:
            # Check saturation / color:
            # In sky / antialiasing with sky, B is much higher than R: B - R > 25
            # What about specular highlights inside black letters?
            edge_pixels.append((x, y, r, g, b, b - r))

print(f"Total pixels in lum [130, 175]: {len(edge_pixels)}")
# Distribution of (b - r):
b_minus_r = [p[5] for p in edge_pixels]
print(f"b - r: min={min(b_minus_r)}, max={max(b_minus_r)}, avg={sum(b_minus_r)/len(b_minus_r):.1f}")
print("Sample with lowest b-r:", sorted(edge_pixels, key=lambda p: p[5])[:10])
print("Sample with highest b-r:", sorted(edge_pixels, key=lambda p: -p[5])[:10])
