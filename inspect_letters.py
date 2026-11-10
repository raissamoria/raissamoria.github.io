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

# Let's check letter "M" around x=200, y=500
# Let's inspect a horizontal slice across M: y=500, x from 50 to 450
print("Slice across M at y=500:")
for x in range(60, 480, 20):
    idx = (500 * w + x) * 3
    print(f"x={x}: R={raw[idx]} G={raw[idx+1]} B={raw[idx+2]}")

# Let's check letter "O" around x=580, y=470
print("\nSlice across O at y=470:")
for x in range(400, 750, 25):
    idx = (470 * w + x) * 3
    print(f"x={x}: R={raw[idx]} G={raw[idx+1]} B={raw[idx+2]}")
