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

# Let's inspect luminance across the entire image:
# How many pixels have luminance < 100?
# How many have luminance between 100 and 150?
# How many have luminance between 150 and 175?
# How many have luminance >= 175?
buckets = [0]*10
for i in range(0, len(data), 3):
    r, g, b = data[i], data[i+1], data[i+2]
    lum = 0.299*r + 0.587*g + 0.114*b
    b_idx = min(9, int(lum / 25.6))
    buckets[b_idx] += 1

for b_idx in range(10):
    print(f"Lum {b_idx*25.6:.0f}-{(b_idx+1)*25.6:.0f}: {buckets[b_idx]} pixels ({buckets[b_idx]/(w*h)*100:.1f}%)")
