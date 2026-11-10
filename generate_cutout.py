import collections, os

with open('/tmp/moria.ppm', 'rb') as f:
    f.seek(17)
    data = bytearray(f.read())

w, h = 1448, 1086

# 1. Flood fill sky from image borders and the 3 known inner holes (O, R, A)
visited = bytearray(w * h)
queue = collections.deque()

# Seed borders
for x in range(w):
    queue.append((x, 0)); visited[x] = 1
    queue.append((x, h-1)); visited[(h-1)*w + x] = 1
for y in range(h):
    queue.append((0, y)); visited[y*w] = 1
    queue.append((w-1, y)); visited[y*w + w - 1] = 1

# Seed inner holes of O, R, A
for seed in [(580, 480), (815, 410), (1190, 530)]:
    sidx = seed[1]*w + seed[0]
    queue.append(seed)
    visited[sidx] = 1

# Sky flood fill threshold:
# A pixel is sky if it is bright (lum > 155) and blue-dominant (b > 175)
while queue:
    x, y = queue.popleft()
    for dx, dy in ((-1,0),(1,0),(0,-1),(0,1)):
        nx, ny = x+dx, y+dy
        if 0 <= nx < w and 0 <= ny < h:
            nidx = ny * w + nx
            if not visited[nidx]:
                pidx = nidx * 3
                r, g, b = data[pidx], data[pidx+1], data[pidx+2]
                lum = 0.299*r + 0.587*g + 0.114*b
                # Sky check
                if lum > 155 and b > 175:
                    visited[nidx] = 1
                    queue.append((nx, ny))

print(f"Total sky pixels marked: {sum(visited)}")

# 2. Compute alpha and unmixed RGB
out_pam = bytearray(w * h * 4)

for y in range(h):
    for x in range(w):
        idx = y * w + x
        pidx = idx * 3
        out_idx = idx * 4
        
        r, g, b = data[pidx], data[pidx+1], data[pidx+2]
        lum = 0.299*r + 0.587*g + 0.114*b
        
        if visited[idx]:
            # Pure sky: 100% transparent
            out_pam[out_idx] = 0
            out_pam[out_idx+1] = 0
            out_pam[out_idx+2] = 0
            out_pam[out_idx+3] = 0
        else:
            # Check if this pixel is on the outer boundary with sky
            # A pixel touches sky if any 4-neighbor was visited as sky
            touches_sky = False
            for dx, dy in ((-1,0),(1,0),(0,-1),(0,1), (-1,-1),(1,-1),(-1,1),(1,1)):
                nx, ny = x+dx, y+dy
                if 0 <= nx < w and 0 <= ny < h:
                    if visited[ny * w + nx]:
                        touches_sky = True
                        break
            
            if touches_sky and lum > 70:
                # Antialiased boundary pixel
                # Soft alpha ramp between lum 70 and 165
                # When lum is 70: alpha = 1.0 (255)
                # When lum is 165: alpha = 0.05
                t = (165.0 - lum) / (165.0 - 70.0)
                t = max(0.0, min(1.0, t))
                alpha = int(t * 255)
                
                # Defringe: remove the blue sky tint from the edge pixel
                # Sky color estimate near edge: (160, 205, 250)
                sky_r, sky_g, sky_b = 160.0, 205.0, 250.0
                sky_weight = 1.0 - t
                clean_r = max(0, min(255, int((r - sky_weight * sky_r) / max(0.05, t))))
                clean_g = max(0, min(255, int((g - sky_weight * sky_g) / max(0.05, t))))
                clean_b = max(0, min(255, int((b - sky_weight * sky_b) / max(0.05, t))))
                
                out_pam[out_idx] = clean_r
                out_pam[out_idx+1] = clean_g
                out_pam[out_idx+2] = clean_b
                out_pam[out_idx+3] = alpha
            else:
                # Solid letter pixel (including specular highlights, bevel reflections, etc.)
                out_pam[out_idx] = r
                out_pam[out_idx+1] = g
                out_pam[out_idx+2] = b
                out_pam[out_idx+3] = 255

# Write PAM file
with open('/tmp/moria_cutout.pam', 'wb') as f:
    hdr = f"P7\nWIDTH {w}\nHEIGHT {h}\nDEPTH 4\nMAXVAL 255\nTUPLTYPE RGB_ALPHA\nENDHDR\n".encode('ascii')
    f.write(hdr)
    f.write(out_pam)

print("Wrote PAM file. Converting to PNG...")
os.system("convert /tmp/moria_cutout.pam -strip -quality 95 /tmp/moria_cutout.png")
print("Converted to /tmp/moria_cutout.png")
