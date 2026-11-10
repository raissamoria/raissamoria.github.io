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

# Check pixels with B > 100 and B - R > 20
# Where are they located?
# Are any of them inside the black letter bodies?
# Let's inspect where y is in the middle of letters, e.g. y=500
