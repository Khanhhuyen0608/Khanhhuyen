import os
import zlib
import struct

def write_png(filename, width, height, rgb_data):
    # rgb_data is bytes of length width * height * 3
    raw_lines = bytearray()
    for y in range(height):
        raw_lines.append(0) # filter type 0 (None)
        start = y * width * 3
        raw_lines.extend(rgb_data[start:start + width * 3])
    
    compressed = zlib.compress(bytes(raw_lines), 9)
    
    png = bytearray(b'\x89PNG\r\n\x1a\n')
    
    def chunk(tag, data):
        c = bytearray(struct.pack('>I', len(data)))
        c.extend(tag)
        c.extend(data)
        crc = zlib.crc32(tag + data) & 0xffffffff
        c.extend(struct.pack('>I', crc))
        return c

    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0)
    png.extend(chunk(b'IHDR', ihdr_data))
    png.extend(chunk(b'IDAT', compressed))
    png.extend(chunk(b'IEND', b''))
    
    with open(filename, 'wb') as f:
        f.write(png)

def load_ppm(ppm_file):
    with open(ppm_file, 'rb') as f:
        tokens = []
        while len(tokens) < 4:
            line = f.readline()
            if not line:
                break
            line = line.strip()
            if not line or line.startswith(b'#'):
                continue
            tokens.extend(line.split())
        magic = tokens[0]
        w = int(tokens[1])
        h = int(tokens[2])
        maxval = int(tokens[3])
        data = f.read()
    return w, h, data

def crop(w, h, data, x0, y0, x1, y1):
    x0 = max(0, x0)
    y0 = max(0, y0)
    x1 = min(w, x1)
    y1 = min(h, y1)
    cw = x1 - x0
    ch = y1 - y0
    out = bytearray(cw * ch * 3)
    for row in range(ch):
        src_start = ((y0 + row) * w + x0) * 3
        src_end = src_start + cw * 3
        dst_start = row * cw * 3
        out[dst_start:dst_start + cw * 3] = data[src_start:src_end]
    return cw, ch, bytes(out)

os.makedirs('public/products', exist_ok=True)
os.makedirs('public/branding', exist_ok=True)

# Process Page 2
w2, h2, d2 = load_ppm('public/assets/pdf/p-02.ppm')
print(f'Page 2: {w2}x{h2}')

# Page 2 has:
# 1. Logo at top center
# 2. Polka dot brown wrap blouse
# 3. White baby doll lace cami
# 4. Cream floral puff midi dress
# 5. White puff corset blouse
# 6. Cream flare ribbon skirt

# Let's crop candidate regions with padding:
# Logo is in upper third
# In 150 DPI, 8.5x11in or A4 is approx 1242x1754
# Let's inspect coordinates proportionally:
# Let's write crops based on proportion of (w2, h2)
def p_crop(w, h, d, px0, py0, px1, py1):
    return crop(w, h, d, int(w * px0), int(h * py0), int(w * px1), int(h * py1))

# Page 2 Logo (V with laurel wreath and text)
cw, ch, cd = p_crop(w2, h2, d2, 0.18, 0.17, 0.65, 0.40)
write_png('public/branding/logo_full.png', cw, ch, cd)

# Blouse 1: Brown polka dot wrap top
cw, ch, cd = p_crop(w2, h2, d2, 0.11, 0.44, 0.32, 0.63)
write_png('public/products/ao_wrap_cham_bi_nau.png', cw, ch, cd)

# Blouse 2: White lace cami baby doll
cw, ch, cd = p_crop(w2, h2, d2, 0.33, 0.44, 0.53, 0.63)
write_png('public/products/ao_hai_day_ren_trang.png', cw, ch, cd)

# Dress 1: Cream vintage fairy dress with puff sleeves
cw, ch, cd = p_crop(w2, h2, d2, 0.57, 0.44, 0.76, 0.64)
write_png('public/products/dam_hoa_nhi_vintage_kem.png', cw, ch, cd)

# Blouse 3: White puff sleeve corset blouse
cw, ch, cd = p_crop(w2, h2, d2, 0.13, 0.66, 0.35, 0.82)
write_png('public/products/ao_kieu_cup_nguc_tay_bong.png', cw, ch, cd)

# Skirt 1: Cream flare skirt with brown belt
cw, ch, cd = p_crop(w2, h2, d2, 0.36, 0.66, 0.55, 0.82)
write_png('public/products/chan_vay_xoe_kem_that_no.png', cw, ch, cd)

# Process Page 3
w3, h3, d3 = load_ppm('public/assets/pdf/p-03.ppm')
print(f'Page 3: {w3}x{h3}')

# Skirt 2: Earth brown gathered midi skirt
cw, ch, cd = p_crop(w3, h3, d3, 0.11, 0.13, 0.27, 0.31)
write_png('public/products/chan_vay_xoe_vintage_nau_dat.png', cw, ch, cd)

# Skirt 3: Satin skirt with black lace hem
cw, ch, cd = p_crop(w3, h3, d3, 0.27, 0.16, 0.41, 0.29)
write_png('public/products/chan_vay_lua_satin_vien_ren.png', cw, ch, cd)

# Dress 2: Milk tea puff sleeve lace dress
cw, ch, cd = p_crop(w3, h3, d3, 0.41, 0.12, 0.61, 0.31)
write_png('public/products/dam_ren_tay_bong_that_no.png', cw, ch, cd)

# Dress 3: French street vintage ditsy floral dress
cw, ch, cd = p_crop(w3, h3, d3, 0.61, 0.08, 0.80, 0.32)
write_png('public/products/dam_hoa_nhi_dao_pho_retro.png', cw, ch, cd)

# Trousers 1: Linen wide leg trousers beige
cw, ch, cd = p_crop(w3, h3, d3, 0.11, 0.32, 0.29, 0.50)
write_png('public/products/quan_linen_ong_rong_be.png', cw, ch, cd)

# Trousers 2: Linen wide leg trousers charcoal
cw, ch, cd = p_crop(w3, h3, d3, 0.30, 0.32, 0.45, 0.50)
write_png('public/products/quan_linen_ong_rong_charcoal.png', cw, ch, cd)

# Set 1: Cream lace embroidered tweed blazer & skirt set (flatlay)
cw, ch, cd = p_crop(w3, h3, d3, 0.11, 0.51, 0.33, 0.73)
write_png('public/products/set_bo_ren_cao_cap_kem.png', cw, ch, cd)

# Set 1 on model:
cw, ch, cd = p_crop(w3, h3, d3, 0.34, 0.51, 0.56, 0.73)
write_png('public/products/set_bo_ren_kem_model.png', cw, ch, cd)

# Skirt 4: Cream tiered pleated chiffon midi skirt
cw, ch, cd = p_crop(w3, h3, d3, 0.57, 0.58, 0.71, 0.73)
write_png('public/products/chan_vay_midi_xep_tang_kem.png', cw, ch, cd)

print("Asset cropping completed!")
