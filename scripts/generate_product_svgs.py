import os

os.makedirs('public/products', exist_ok=True)

# Define each of the 20 products with its SVG graphic specs
items = [
    {
        "filename": "ao_co_beo_victorian_ren.svg",
        "title": "Áo Kiểu Victorian Ren",
        "color_bg": "#F8F5EE",
        "color_garment": "#FFFDF9",
        "accent": "#7C442A",
        "tag": "Cotton Ren",
        "type": "blouse_victorian"
    },
    {
        "filename": "dam_yem_linen_nau_gi_set.svg",
        "title": "Đầm Yếm Linen Nâu Gỉ Sét",
        "color_bg": "#F5EFEB",
        "color_garment": "#8A4B32",
        "accent": "#FAF6F0",
        "tag": "100% Linen",
        "type": "dress_apron"
    },
    {
        "filename": "ao_peplum_caro_vintage.svg",
        "title": "Áo Peplum Caro Vintage",
        "color_bg": "#FAF6F0",
        "color_garment": "#E8DFC8",
        "accent": "#7C442A",
        "tag": "Kẻ Caro Cotton",
        "type": "blouse_peplum"
    },
    {
        "filename": "chan_vay_linen_cuc_go_be.svg",
        "title": "Chân Váy Linen Cúc Gỗ",
        "color_bg": "#F5EFEB",
        "color_garment": "#E5DACB",
        "accent": "#6D3F28",
        "tag": "Linen Mộc",
        "type": "skirt_button"
    },
    {
        "filename": "dam_slip_satin_vien_ren.svg",
        "title": "Đầm Slip Dress Lụa Satin",
        "color_bg": "#FAF7F2",
        "color_garment": "#FAF3E6",
        "accent": "#7C442A",
        "tag": "Lụa Satin & Ren",
        "type": "dress_slip"
    },
    {
        "filename": "set_bo_gile_quan_linen_nau.svg",
        "title": "Set Gile & Quần Suông Linen",
        "color_bg": "#F5EFEB",
        "color_garment": "#633B26",
        "accent": "#E8DFC8",
        "tag": "100% Linen",
        "type": "suit_gile"
    },
    {
        "filename": "ao_so_mi_lua_that_no_kem.svg",
        "title": "Áo Sơ Mi Lụa Thắt Nơ",
        "color_bg": "#FAF7F2",
        "color_garment": "#FFFDF8",
        "accent": "#7C442A",
        "tag": "Lụa Mềm Rủ",
        "type": "blouse_bow"
    },
    {
        "filename": "dam_midi_cham_bi_canh_tien.svg",
        "title": "Đầm Chấm Bi Cổ Tim",
        "color_bg": "#F5EFEB",
        "color_garment": "#7C442A",
        "accent": "#FAF5EE",
        "tag": "Chấm Bi Pháp",
        "type": "dress_polka"
    },
    {
        "filename": "chan_vay_xep_ly_nau_gi_set.svg",
        "title": "Chân Váy Xếp Ly Nâu Gỉ Sét",
        "color_bg": "#FAF6F0",
        "color_garment": "#8A472E",
        "accent": "#FAF5EE",
        "tag": "Linen Tưng",
        "type": "skirt_pleated"
    },
    {
        "filename": "quan_suong_lua_satin_kem.svg",
        "title": "Quần Suông Lụa Satin Kem",
        "color_bg": "#F5EFEB",
        "color_garment": "#FAF5EC",
        "accent": "#7C442A",
        "tag": "Lụa Satin Cao Cấp",
        "type": "trousers_silk"
    },
    {
        "filename": "cardigan_det_kim_hoa_nhi.svg",
        "title": "Cardigan Dệt Kim Hoa Nhí",
        "color_bg": "#FAF7F2",
        "color_garment": "#EFE6D8",
        "accent": "#7C442A",
        "tag": "Dệt Kim Sợi Bông",
        "type": "cardigan_knit"
    },
    {
        "filename": "dam_hoa_nhi_co_vuong_tay_phong.svg",
        "title": "Đầm Hoa Nhí Cổ Vuông",
        "color_bg": "#F5EFEB",
        "color_garment": "#F9F3EA",
        "accent": "#7C442A",
        "tag": "Cotton Hoa Nhí",
        "type": "dress_puff"
    },
    {
        "filename": "chan_vay_linen_3_tang_beo.svg",
        "title": "Chân Váy Linen 3 Tầng Bèo",
        "color_bg": "#FAF6F0",
        "color_garment": "#6A3F2A",
        "accent": "#FAF5EE",
        "tag": "100% Linen",
        "type": "skirt_tiered"
    },
    {
        "filename": "ao_so_mi_linen_theu_hoa.svg",
        "title": "Áo Sơ Mi Linen Thêu Hoa",
        "color_bg": "#FAF7F2",
        "color_garment": "#FFFDF9",
        "accent": "#7C442A",
        "tag": "Linen Thêu Tay",
        "type": "blouse_embroidery"
    },
    {
        "filename": "set_ao_lung_chan_vay_tweed.svg",
        "title": "Set Áo Lửng & Váy Tweed",
        "color_bg": "#F5EFEB",
        "color_garment": "#E8DFC8",
        "accent": "#5C3520",
        "tag": "Dệt Kim Tweed",
        "type": "suit_tweed"
    },
    {
        "filename": "quan_culottes_linen_xep_ly.svg",
        "title": "Quần Culottes Linen Xếp Ly",
        "color_bg": "#FAF7F2",
        "color_garment": "#E2D6C5",
        "accent": "#7C442A",
        "tag": "100% Linen",
        "type": "trousers_culottes"
    },
    {
        "filename": "dam_wrap_hoa_nhi_lua.svg",
        "title": "Đầm Wrap Hoa Nhí Lụa",
        "color_bg": "#F5EFEB",
        "color_garment": "#7C442A",
        "accent": "#FAF5EE",
        "tag": "Lụa Satin Hoa Nhí",
        "type": "dress_wrap"
    },
    {
        "filename": "chan_vay_caro_vintage_xoe.svg",
        "title": "Chân Váy Caro Vintage Xòe",
        "color_bg": "#FAF6F0",
        "color_garment": "#D8CAB8",
        "accent": "#7C442A",
        "tag": "Caro Gingham",
        "type": "skirt_gingham"
    },
    {
        "filename": "ao_kieu_co_vuong_ren_hoa.svg",
        "title": "Áo Kiểu Cổ Vuông Ren",
        "color_bg": "#FAF7F2",
        "color_garment": "#FAF4EA",
        "accent": "#7C442A",
        "tag": "Cotton Ren",
        "type": "blouse_square"
    },
    {
        "filename": "set_blazer_coc_tay_linen.svg",
        "title": "Set Blazer Cộc Tay Linen",
        "color_bg": "#F5EFEB",
        "color_garment": "#DFD3C1",
        "accent": "#6D3F28",
        "tag": "100% Linen",
        "type": "suit_blazer"
    }
]

def make_svg(item):
    bg = item["color_bg"]
    g = item["color_garment"]
    acc = item["accent"]
    title = item["title"]
    tag = item["tag"]
    gtype = item["type"]
    
    # Pattern defs
    defs = f'''
    <defs>
      <pattern id="linenGrid" width="6" height="6" patternUnits="userSpaceOnUse">
        <path d="M 0 3 L 6 3 M 3 0 L 3 6" stroke="{acc}" stroke-width="0.3" opacity="0.12"/>
      </pattern>
      <pattern id="ginghamPlaid" width="16" height="16" patternUnits="userSpaceOnUse">
        <rect width="8" height="8" fill="{acc}" opacity="0.25"/>
        <rect x="8" y="8" width="8" height="8" fill="{acc}" opacity="0.25"/>
      </pattern>
      <pattern id="polkaDots" width="14" height="14" patternUnits="userSpaceOnUse">
        <circle cx="7" cy="7" r="1.6" fill="{acc}" opacity="0.6"/>
      </pattern>
      <pattern id="ditsyFlowers" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="1.5" fill="{acc}" opacity="0.7"/>
        <circle cx="7" cy="9" r="1.2" fill="#E8B49B" opacity="0.8"/>
        <circle cx="13" cy="9" r="1.2" fill="#E8B49B" opacity="0.8"/>
        <circle cx="8.5" cy="12" r="1.2" fill="#E8B49B" opacity="0.8"/>
        <circle cx="11.5" cy="12" r="1.2" fill="#E8B49B" opacity="0.8"/>
      </pattern>
      <linearGradient id="softShadow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="black" stop-opacity="0.03"/>
        <stop offset="100%" stop-color="black" stop-opacity="0.08"/>
      </linearGradient>
    </defs>
    '''
    
    # Garment vector path
    garment_svg = ""
    if "dress" in gtype:
        # Full dress silhouette
        pattern_overlay = ""
        if "polka" in gtype:
            pattern_overlay = f'<path d="M 115 130 C 130 110 170 110 185 130 L 195 190 L 225 330 C 150 345 150 345 75 330 L 105 190 Z" fill="url(#polkaDots)"/>'
        elif "puff" in gtype:
            pattern_overlay = f'<path d="M 115 130 C 130 110 170 110 185 130 L 195 190 L 225 330 C 150 345 150 345 75 330 L 105 190 Z" fill="url(#ditsyFlowers)"/>'
        elif "wrap" in gtype:
            pattern_overlay = f'<path d="M 115 130 C 130 110 170 110 185 130 L 195 190 L 225 330 C 150 345 150 345 75 330 L 105 190 Z" fill="url(#ditsyFlowers)"/>'
        
        garment_svg = f'''
        <!-- Dress Base Silhouette -->
        <g filter="drop-shadow(0px 8px 16px rgba(60,35,20,0.06))">
          <!-- Puff Sleeves Left & Right -->
          <ellipse cx="90" cy="145" rx="24" ry="20" fill="{g}" stroke="{acc}" stroke-width="1.2"/>
          <ellipse cx="210" cy="145" rx="24" ry="20" fill="{g}" stroke="{acc}" stroke-width="1.2"/>
          <!-- Bodice & Flared Skirt -->
          <path d="M 115 125 C 135 110 165 110 185 125 L 180 185 C 160 190 140 190 120 185 Z" fill="{g}" stroke="{acc}" stroke-width="1.5"/>
          <path d="M 120 185 C 150 190 150 190 180 185 L 225 325 C 150 340 150 340 75 325 Z" fill="{g}" stroke="{acc}" stroke-width="1.5"/>
          {pattern_overlay}
          <!-- Waist Bow Ribbon -->
          <rect x="118" y="180" width="64" height="8" rx="2" fill="{acc}" opacity="0.85"/>
          <path d="M 145 188 C 142 220 138 235 135 250" stroke="{acc}" stroke-width="3" stroke-linecap="round"/>
          <path d="M 155 188 C 158 220 162 235 165 250" stroke="{acc}" stroke-width="3" stroke-linecap="round"/>
          <!-- Scallop Hem -->
          <path d="M 75 325 Q 90 332 105 327 Q 120 332 135 328 Q 150 333 165 328 Q 180 333 195 327 Q 210 332 225 325" fill="none" stroke="{acc}" stroke-width="1.5"/>
        </g>
        '''
    elif "blouse" in gtype or "cardigan" in gtype:
        # Blouse / Top silhouette
        garment_svg = f'''
        <g filter="drop-shadow(0px 8px 16px rgba(60,35,20,0.06))">
          <!-- Puff Sleeves -->
          <path d="M 80 135 C 60 150 65 190 90 200 C 100 185 105 160 100 140 Z" fill="{g}" stroke="{acc}" stroke-width="1.2"/>
          <path d="M 220 135 C 240 150 235 190 210 200 C 200 185 195 160 200 140 Z" fill="{g}" stroke="{acc}" stroke-width="1.2"/>
          <!-- Torso -->
          <path d="M 100 135 C 120 120 180 120 200 135 L 188 235 C 150 245 150 245 112 235 Z" fill="{g}" stroke="{acc}" stroke-width="1.5"/>
          <!-- Victorian Collar or Peter Pan Collar -->
          <path d="M 125 130 C 135 145 145 148 150 148 C 155 148 165 145 175 130 C 160 122 140 122 125 130 Z" fill="{acc}" opacity="0.15" stroke="{acc}" stroke-width="1.2"/>
          <!-- Delicate Front Buttons -->
          <circle cx="150" cy="165" r="2.5" fill="{acc}"/>
          <circle cx="150" cy="185" r="2.5" fill="{acc}"/>
          <circle cx="150" cy="205" r="2.5" fill="{acc}"/>
          <circle cx="150" cy="225" r="2.5" fill="{acc}"/>
          <!-- Waist Bow or Peplum Frill -->
          <path d="M 112 235 Q 150 255 188 235 L 195 258 Q 150 272 105 258 Z" fill="{g}" stroke="{acc}" stroke-width="1.2"/>
        </g>
        '''
    elif "skirt" in gtype:
        # Skirt silhouette
        pattern_overlay = ""
        if "gingham" in gtype:
            pattern_overlay = f'<path d="M 120 150 L 180 150 L 225 330 C 150 345 150 345 75 330 Z" fill="url(#ginghamPlaid)"/>'
        elif "pleated" in gtype:
            pattern_overlay = f'''
            <line x1="100" y1="160" x2="90" y2="330" stroke="{acc}" stroke-width="0.8" opacity="0.4"/>
            <line x1="120" y1="160" x2="115" y2="332" stroke="{acc}" stroke-width="0.8" opacity="0.4"/>
            <line x1="140" y1="160" x2="140" y2="333" stroke="{acc}" stroke-width="0.8" opacity="0.4"/>
            <line x1="160" y1="160" x2="165" y2="332" stroke="{acc}" stroke-width="0.8" opacity="0.4"/>
            <line x1="180" y1="160" x2="190" y2="330" stroke="{acc}" stroke-width="0.8" opacity="0.4"/>
            <line x1="200" y1="160" x2="210" y2="328" stroke="{acc}" stroke-width="0.8" opacity="0.4"/>
            '''
        garment_svg = f'''
        <g filter="drop-shadow(0px 8px 16px rgba(60,35,20,0.06))">
          <!-- High Waistband -->
          <rect x="118" y="145" width="64" height="14" rx="2" fill="{acc}" opacity="0.25" stroke="{acc}" stroke-width="1.2"/>
          <!-- Flared Skirt -->
          <path d="M 120 159 L 180 159 L 228 328 C 150 342 150 342 72 328 Z" fill="{g}" stroke="{acc}" stroke-width="1.5"/>
          {pattern_overlay}
          <!-- Button Line or Ribbon Belt -->
          <circle cx="150" cy="180" r="3" fill="{acc}"/>
          <circle cx="150" cy="210" r="3" fill="{acc}"/>
          <circle cx="150" cy="240" r="3" fill="{acc}"/>
          <circle cx="150" cy="270" r="3" fill="{acc}"/>
          <circle cx="150" cy="300" r="3" fill="{acc}"/>
        </g>
        '''
    elif "trousers" in gtype:
        # Wide leg trousers
        garment_svg = f'''
        <g filter="drop-shadow(0px 8px 16px rgba(60,35,20,0.06))">
          <!-- Overlap Waistband -->
          <path d="M 115 140 L 185 140 L 185 158 L 115 158 Z" fill="{g}" stroke="{acc}" stroke-width="1.2"/>
          <path d="M 115 140 L 170 158" stroke="{acc}" stroke-width="1.5"/>
          <!-- Left and Right Wide Legs -->
          <path d="M 115 158 L 146 158 L 146 220 L 140 345 L 85 345 L 115 158 Z" fill="{g}" stroke="{acc}" stroke-width="1.5"/>
          <path d="M 154 158 L 185 158 L 185 158 L 215 345 L 160 345 L 154 220 Z" fill="{g}" stroke="{acc}" stroke-width="1.5"/>
          <!-- Crease Line -->
          <line x1="112" y1="170" x2="112" y2="340" stroke="{acc}" stroke-width="0.8" opacity="0.4"/>
          <line x1="188" y1="170" x2="188" y2="340" stroke="{acc}" stroke-width="0.8" opacity="0.4"/>
        </g>
        '''
    else:
        # Suit / Blazer
        garment_svg = f'''
        <g filter="drop-shadow(0px 8px 16px rgba(60,35,20,0.06))">
          <!-- Blazer Body -->
          <path d="M 95 130 C 120 120 180 120 205 130 L 195 240 L 105 240 Z" fill="{g}" stroke="{acc}" stroke-width="1.5"/>
          <!-- Sleeves -->
          <path d="M 95 130 L 72 230 L 95 235 L 105 150 Z" fill="{g}" stroke="{acc}" stroke-width="1.2"/>
          <path d="M 205 130 L 228 230 L 205 235 L 195 150 Z" fill="{g}" stroke="{acc}" stroke-width="1.2"/>
          <!-- Lapels -->
          <path d="M 115 125 L 145 190 L 155 190 L 185 125 L 160 122 L 140 122 Z" fill="{acc}" opacity="0.15" stroke="{acc}" stroke-width="1.2"/>
          <circle cx="150" cy="205" r="3.5" fill="{acc}"/>
          <circle cx="150" cy="225" r="3.5" fill="{acc}"/>
          <!-- Matching Mini Skirt / Trouser -->
          <path d="M 110 245 L 190 245 L 205 320 C 150 330 150 330 95 320 Z" fill="{g}" stroke="{acc}" stroke-width="1.5"/>
        </g>
        '''

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" width="100%" height="100%">
      {defs}
      <!-- Canvas Card Surface -->
      <rect width="300" height="400" fill="{bg}"/>
      <rect x="12" y="12" width="276" height="376" rx="12" fill="none" stroke="{acc}" stroke-width="0.8" opacity="0.25"/>
      <rect x="16" y="16" width="268" height="368" rx="8" fill="none" stroke="{acc}" stroke-width="0.4" stroke-dasharray="3 3" opacity="0.3"/>

      <!-- Top VERA Monogram Stamp -->
      <g transform="translate(150, 48)">
        <circle cx="0" cy="0" r="16" fill="{acc}" opacity="0.08"/>
        <text x="0" y="5" font-family="'Playfair Display', serif" font-style="italic" font-size="14" font-weight="600" fill="{acc}" text-anchor="middle">V</text>
        <text x="0" y="24" font-family="'Plus Jakarta Sans', sans-serif" font-size="7" font-weight="700" letter-spacing="2" fill="{acc}" text-anchor="middle" opacity="0.8">VERA VINTAGE</text>
      </g>

      <!-- Main Garment Silhouette -->
      {garment_svg}

      <!-- Bottom Card Metadata Tag -->
      <g transform="translate(150, 368)">
        <rect x="-85" y="-14" width="170" height="20" rx="4" fill="white" stroke="{acc}" stroke-width="0.8" opacity="0.95"/>
        <text x="0" y="0" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="600" fill="{acc}" text-anchor="middle">
          {tag} · Thiết Kế Độc Quyền
        </text>
      </g>
    </svg>
    '''
    return svg

for item in items:
    content = make_svg(item)
    filepath = os.path.join('public/products', item["filename"])
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Generated {len(items)} product SVG designs successfully!")
