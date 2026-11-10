import collections

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

# A pixel is "sky-colored" if it matches sky range:
# Blue sky or white cloud:
# B >= 200 and G >= 160 and R >= 110
def is_sky(r, g, b):
    # Blue sky has high B, moderate/high G, lower R (B - R > 15)
    # Clouds have high R, high G, very high B (all > 180, B > 220)
    if b >= 195 and g >= 155 and (b > r + 10 or (r > 160 and g > 175 and b > 215)):
        return True
    return False

visited = bytearray(w * h)
queue = collections.deque()

# Seed with all 4 borders
for x in range(w):
    queue.append((x, 0))
    visited[0 * w + x] = 1
    queue.append((x, h - 1))
    visited[(h - 1) * w + x] = 1

for y in range(h):
    queue.append((0, y))
    visited[y * w + 0] = 1
    queue.append((w - 1, y))
    visited[y * w + (w - 1)] = 1

while queue:
    x, y = queue.popleft()
    for dx, dy in ((-1, 0), (1, 0), (0, -1), (0, 1)):
        nx, ny = x + dx, y + dy
        if 0 <= nx < w and 0 <= ny < h:
            nidx = ny * w + nx
            if not visited[nidx]:
                pidx = nidx * 3
                r, g, b = data[pidx], data[pidx+1], data[pidx+2]
                if is_sky(r, g, b):
                    visited[nidx] = 1
                    queue.append((nx, ny))

print(f"Total pixels: {w*h}")
print(f"Flooded outer sky pixels: {sum(visited)}")

# Now find unvisited pixels that match is_sky (these will be the enclosed holes inside O, R, A!)
unvisited_sky = []
for y in range(h):
    for x in range(w):
        idx = y * w + x
        if not visited[idx]:
            pidx = idx * 3
            r, g, b = data[pidx], data[pidx+1], data[pidx+2]
            if is_sky(r, g, b):
                unvisited_sky.append((x, y))

print(f"Unvisited sky pixels (holes in O, R, A): {len(unvisited_sky)}")
