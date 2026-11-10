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

# Let's inspect brightness: L = 0.299*R + 0.587*G + 0.114*B
# In the sky, what is the minimum brightness?
# Let's inspect the 4 borders (which we know are 100% sky):
border_lums = []
for x in range(w):
    idx1 = (0 * w + x) * 3
    idx2 = ((h-1) * w + x) * 3
    border_lums.append(0.299*data[idx1] + 0.587*data[idx1+1] + 0.114*data[idx1+2])
    border_lums.append(0.299*data[idx2] + 0.587*data[idx2+1] + 0.114*data[idx2+2])
for y in range(h):
    idx1 = (y * w + 0) * 3
    idx2 = (y * w + (w-1)) * 3
    border_lums.append(0.299*data[idx1] + 0.587*data[idx1+1] + 0.114*data[idx1+2])
    border_lums.append(0.299*data[idx2] + 0.587*data[idx2+1] + 0.114*data[idx2+2])

print(f"Sky border min luminance: {min(border_lums):.1f}, max: {max(border_lums):.1f}, avg: {sum(border_lums)/len(border_lums):.1f}")
