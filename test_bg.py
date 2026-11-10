import sys, os, struct

# Convert PNG to PPM P6 using convert
os.system("convert public/assets/aistudio/Logo_tipo_MORIA_em_3D_brilhante_8796f4cc.png /tmp/moria.ppm")

with open("/tmp/moria.ppm", "rb") as f:
    header = []
    while len(header) < 3:
        line = f.readline().strip()
        if not line or line.startswith(b'#'):
            continue
        header.extend(line.split())
    magic, w, h = header[0], int(header[1]), int(header[2])
    maxval = int(f.readline().strip())
    raw = f.read()

print(f"Loaded PPM: {w}x{h}, maxval={maxval}, bytes={len(raw)}")
