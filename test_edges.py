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

# Let's inspect the edge of M on the left: y=500, x from 125 to 145
print("Left edge of M at y=500:")
for x in range(125, 145):
    idx = (500 * w + x) * 3
    r, g, b = data[idx], data[idx+1], data[idx+2]
    lum = 0.299*r + 0.587*g + 0.114*b
    print(f"x={x:3d}: RGB=({r:3d}, {g:3d}, {b:3d}), Lum={lum:5.1f}, B-R={b-r:3d}")

print("\nBottom edge of O at x=600, y from 620 to 650:")
for y in range(620, 650):
    idx = (y * w + 600) * 3
    r, g, b = data[idx], data[idx+1], data[idx+2]
    lum = 0.299*r + 0.587*g + 0.114*b
    print(f"y={y:3d}: RGB=({r:3d}, {g:3d}, {b:3d}), Lum={lum:5.1f}, B-R={b-r:3d}")
