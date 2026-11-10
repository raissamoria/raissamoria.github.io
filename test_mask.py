import os

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

    magic = next_token()
    w = int(next_token())
    h = int(next_token())
    maxv = int(next_token())
    data = bytearray(f.read())

# Let's inspect any pixels where data is neither pure sky nor pure letter
# Let's see: on the black letters, what is the color of the specular reflection?
# Let's check letter "O" hole:
# Let's find pixels inside the hole of O (around x=570, y=470):
hole_o_colors = []
for y in range(450, 490):
    for x in range(560, 580):
        idx = (y*w + x)*3
        hole_o_colors.append((data[idx], data[idx+1], data[idx+2]))

print(f"Hole of O sample: R={min(c[0] for c in hole_o_colors)}-{max(c[0] for c in hole_o_colors)}, G={min(c[1] for c in hole_o_colors)}-{max(c[1] for c in hole_o_colors)}, B={min(c[2] for c in hole_o_colors)}-{max(c[2] for c in hole_o_colors)}")

# Now let's check the letters themselves:
# In the letters, what are the pixels with B > 150?
letter_high_b = []
for y in range(250, 850):
    for x in range(100, 1350):
        idx = (y*w + x)*3
        r, g, b = data[idx], data[idx+1], data[idx+2]
        # Check if R, G, B indicate letter reflection
        # In letter reflections: often white specular highlight where R, G, B are roughly equal:
        # e.g. |R-B| is small, whereas in sky B - R > 30 (often 60-100!)
        if b > 150:
            diff_br = b - r
            diff_bg = b - g
            # Let's see
