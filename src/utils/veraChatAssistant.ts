import { PRODUCTS, VOUCHERS } from '../data/products';
import { BRAND_INFO } from '../data/brand';
import { Product } from '../types';

function formatVnd(amount: number): string {
  return amount.toLocaleString('vi-VN') + '₫';
}

function normalizeText(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd');
}

function formatProductBrief(p: Product): string {
  const availableSizes = p.sizes.filter((s) => (p.sizeStock[s] ?? 0) > 0).join(', ');
  return `• ${p.name} — ${formatVnd(p.price)} (còn size: ${availableSizes || 'liên hệ'})`;
}

export function getSmartVeraReply(rawQuery: string): string {
  const q = rawQuery.toLowerCase().trim();
  const nq = normalizeText(rawQuery);

  // 1. Greetings & thanks
  if (/^(xin chao|chao|hello|hi|hey|alo|shop oi|ad oi)\b/.test(nq) && nq.length < 25) {
    return `Xin chào bạn! VERA rất vui được hỗ trợ bạn hôm nay. Bạn đang tìm mẫu áo, đầm, chân váy hay cần VERA tư vấn chọn size theo chiều cao, cân nặng ạ?`;
  }

  if (/\b(cam on|thank|thanks|ok|oke|da|vang)\b/.test(nq) && nq.length < 25) {
    return `Dạ không có gì ạ! Nếu bạn cần tư vấn thêm về mẫu mã, số đo hoặc cách áp dụng mã giảm giá VERA50K (giảm 50.000₫), cứ nhắn cho VERA bất cứ lúc nào nhé.`;
  }

  // 2. Parse weight (kg) for personalized size recommendation
  const weightMatch = nq.match(/(\d{2})\s*kg/);
  if (weightMatch) {
    const kg = parseInt(weightMatch[1], 10);
    let recSize = 'M';
    let detail = 'Ngực 85–88cm, Eo 67–70cm, Mông 91–94cm';
    if (kg <= 48) {
      recSize = 'S';
      detail = 'Ngực 80–84cm, Eo 62–66cm, Mông 86–90cm';
    } else if (kg <= 54) {
      recSize = 'M';
      detail = 'Ngực 85–88cm, Eo 67–70cm, Mông 91–94cm';
    } else if (kg <= 60) {
      recSize = 'L';
      detail = 'Ngực 89–92cm, Eo 71–75cm, Mông 95–98cm';
    } else {
      recSize = 'XL';
      detail = 'Ngực 93–98cm, Eo 76–80cm, Mông 99–104cm';
    }
    return `Với cân nặng ${kg}kg, VERA gợi ý bạn chọn **Size ${recSize}** (${detail}) sẽ lên phom chuẩn và thoải mái nhất.\nNếu bạn thích mặc rộng rãi hoặc ở ranh giới giữa hai size, mình có thể nhích lên 1 size nhé. Bạn đang quan tâm mẫu nào để VERA kiểm tra tồn kho size ${recSize} giúp bạn ạ?`;
  }

  // 3. Size & measurements general
  if (nq.includes('size') || nq.includes('so do') || nq.includes('can nang') || nq.includes('chieu cao') || nq.includes('mac vua')) {
    return `Bảng size chuẩn dáng phụ nữ Việt tại VERA:\n• Size S: 42–48kg (Ngực 80-84, Eo 62-66)\n• Size M: 49–54kg (Ngực 85-88, Eo 67-70)\n• Size L: 55–60kg (Ngực 89-92, Eo 71-75)\n• Size XL: 61–66kg (Ngực 93-98, Eo 76-80)\nBạn nhắn giúp VERA chiều cao và cân nặng để tư vấn viên chọn size chuẩn nhất cho bạn nhé!`;
  }

  // 4. Shipping & delivery
  if (nq.includes('ship') || nq.includes('van chuyen') || nq.includes('giao hang') || nq.includes('freeship') || nq.includes('bao lau')) {
    return `VERA **miễn phí giao hàng toàn quốc** cho đơn từ 499.000₫ (đơn dưới 499.000₫ phí đồng giá 30.000₫).\n• Nội thành TP.HCM & Hà Nội: 1–2 ngày làm việc.\n• Các tỉnh thành khác: 2–4 ngày làm việc.\nQuý khách được **đồng kiểm hàng** trước khi thanh toán ạ.`;
  }

  // 5. Return & warranty
  if (nq.includes('doi') || nq.includes('tra') || nq.includes('bao hanh') || nq.includes('khong vua')) {
    return `VERA hỗ trợ **đổi size hoặc đổi mẫu tận nhà trong 7 ngày** kể từ khi nhận hàng (sản phẩm còn nguyên tem mác, chưa qua sử dụng).\nNgoài ra, đường may và khuy nút được **bảo hành trọn đời miễn phí** tại hệ thống VERA ạ.`;
  }

  // 6. Vouchers & promotions
  if (nq.includes('voucher') || nq.includes('giam gia') || nq.includes('ma ') || nq.includes('khuyen mai') || nq.includes('uu dai') || nq.includes('50k')) {
    const voucherList = VOUCHERS.map((v) => `• **${v.code}**: ${v.description}`).join('\n');
    return `Các mã ưu đãi đang áp dụng tại VERA:\n${voucherList}\nBạn chỉ cần nhập mã tại bước Giỏ hàng hoặc Thanh toán để được giảm trực tiếp nhé!`;
  }

  // 7. Showrooms & contact
  if (nq.includes('dia chi') || nq.includes('showroom') || nq.includes('cua hang') || nq.includes('o dau') || nq.includes('hotline') || nq.includes('lien he')) {
    return `Hệ thống Showroom VERA (mở cửa 09:00 – 21:30 mỗi ngày):\n• ${BRAND_INFO.showrooms[0].city}: ${BRAND_INFO.showrooms[0].address}\n• ${BRAND_INFO.showrooms[1].city}: ${BRAND_INFO.showrooms[1].address}\nHotline hỗ trợ nhanh: **${BRAND_INFO.hotline}** | Email: ${BRAND_INFO.email}.`;
  }

  // 8. Payment methods
  if (nq.includes('thanh toan') || nq.includes('cod') || nq.includes('chuyen khoan')) {
    return `VERA hỗ trợ 2 hình thức thanh toán linh hoạt:\n• Thanh toán khi nhận hàng (COD) — được mở kiểm tra hàng trước khi trả tiền.\n• Chuyển khoản ngân hàng nhanh qua QR/Internet Banking.`;
  }

  // 9. Care & washing
  if (nq.includes('giat') || nq.includes('ui') || nq.includes('nhan') || nq.includes('bao quan')) {
    return `Để giữ phom và độ bền sợi tự nhiên (Linen, Lụa Satin, Cotton hữu cơ, Ren):\n• Giặt tay nhẹ nhàng với nước mát dưới 30°C hoặc giặt máy chế độ đồ mỏng trong túi giặt.\n• Phơi ở nơi thoáng mát, tránh nắng gắt trực tiếp và ủi hơi nước ở nhiệt độ thấp khi vải còn hơi ẩm.`;
  }

  // 10. Occasion / Styling recommendations
  if (nq.includes('di tiec') || nq.includes('dam cuoi') || nq.includes('hen ho') || nq.includes('du tiec')) {
    const partyItems = PRODUCTS.filter((p) => p.category === 'dress' || p.category === 'suit').slice(0, 3);
    return `Với dịp đi tiệc, hẹn hò hoặc sự kiện nhẹ nhàng, VERA gợi ý các thiết kế tôn dáng và sang trọng:\n${partyItems.map(formatProductBrief).join('\n')}\nBạn thích phong cách nữ tính bay bổng hay thanh lịch chỉn chu để VERA tư vấn kỹ hơn ạ?`;
  }

  if (nq.includes('di lam') || nq.includes('cong so') || nq.includes('van phong') || nq.includes('di choi') || nq.includes('ca phe')) {
    const dailyItems = PRODUCTS.filter((p) => p.category === 'blouse' || p.category === 'skirt' || p.category === 'trousers').slice(0, 3);
    return `Để mặc đi làm công sở hay dạo phố cuối tuần thật thanh lịch và thoải mái, bạn tham khảo ngay các mẫu bán chạy:\n${dailyItems.map(formatProductBrief).join('\n')}\nChất liệu Linen và Cotton hữu cơ rất thoáng mát suốt cả ngày ạ.`;
  }

  // 11. Product search by category, material, color, or keyword
  const keywordMatches = PRODUCTS.filter((p) => {
    const hay = normalizeText(`${p.name} ${p.subtitle} ${p.categoryName} ${p.materialName} ${p.colorName} ${p.patternName}`);
    const words = nq.split(/\s+/).filter((w) => w.length >= 2 && !['cho', 'hoi', 'co', 'khong', 'gia', 'bao', 'nhieu', 'mau', 'nao', 'san', 'pham', 'vera', 'mua', 'tim', 'tu', 'van'].includes(w));
    return words.some((w) => hay.includes(w));
  });

  if (keywordMatches.length > 0) {
    const topMatches = keywordMatches.slice(0, 4);
    return `VERA tìm thấy ${keywordMatches.length} thiết kế phù hợp với yêu cầu "${rawQuery.trim()}":\n${topMatches.map(formatProductBrief).join('\n')}\nBạn bấm vào sản phẩm để xem đủ ảnh người mẫu & chi tiết vải, hoặc nhắn size bạn mặc để VERA giữ hàng nhé!`;
  }

  // 12. Price / cheap / budget queries
  if (nq.includes('gia') || nq.includes('bao nhieu') || nq.includes('tien') || nq.includes('re')) {
    const sorted = [...PRODUCTS].sort((a, b) => a.price - b.price);
    return `Các thiết kế tại VERA hiện có mức giá từ **${formatVnd(sorted[0].price)}** đến **${formatVnd(sorted[sorted.length - 1].price)}**.\nMột số mẫu giá tốt đang được yêu thích:\n${sorted.slice(0, 3).map(formatProductBrief).join('\n')}\nĐừng quên nhập mã **VERA50K** để giảm thêm 50.000₫ cho đơn từ 399.000₫ nhé!`;
  }

  // 13. Universal helpful response for any other question
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 3);
  return `Cảm ơn bạn đã quan tâm đến "${q}"! Tại VERA, mọi thiết kế đều hướng đến phong cách Vintage thanh lịch, chất liệu tự nhiên thoáng mát với giá từ 230.000₫ – 770.000₫.\nCác mẫu nổi bật nhất hiện nay:\n${bestSellers.map(formatProductBrief).join('\n')}\nBạn có thể cho VERA biết bạn đang tìm dòng sản phẩm nào (áo kiểu, chân váy, đầm, set bộ, quần ống rộng) hoặc chiều cao/cân nặng để VERA tư vấn chi tiết hơn ạ!`;
}
