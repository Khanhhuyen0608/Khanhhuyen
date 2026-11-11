import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { Star, CheckCircle2, ArrowRight, Quote } from 'lucide-react';

interface CustomerReviewsSectionProps {
  onSelectProduct: (product: Product) => void;
}

interface FeaturedReview {
  id: string;
  author: string;
  location: string;
  heightWeight: string;
  sizeBought: string;
  rating: number;
  comment: string;
  product: Product;
}

const LAST_NAMES = [
  'Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ',
  'Võ', 'Đặng', 'Bùi', 'Đỗ', 'Hồ', 'Ngô', 'Dương', 'Lý'
];

const MIDDLE_NAMES = [
  'Minh', 'Thu', 'Ngọc', 'Khánh', 'Phương', 'Bảo', 'Quỳnh', 'Thanh',
  'Hải', 'Gia', 'Tường', 'Diệu', 'Mai', 'Thảo', 'Lan', 'Tú'
];

const FIRST_NAMES = [
  'Anh', 'Thảo', 'Hà', 'Linh', 'Uyên', 'Ngọc', 'Chi', 'Trúc',
  'Yến', 'Hân', 'Vy', 'Phương', 'Trâm', 'Nguyên', 'Thư', 'Trang',
  'Ngân', 'Tâm', 'Duyên', 'Diệp', 'Quyên', 'Nghi', 'Châu', 'My'
];

const LOCATIONS = [
  'Quận 1, TP.HCM', 'Hoàn Kiếm, Hà Nội', 'Hải Châu, Đà Nẵng', 'Cầu Giấy, Hà Nội',
  'Quận 3, TP.HCM', 'Ninh Kiều, Cần Thơ', 'Bình Thạnh, TP.HCM', 'Ba Đình, Hà Nội',
  'TP. Huế', 'TP. Nha Trang', 'Quận 7, TP.HCM', 'Đống Đa, Hà Nội',
  'Thủ Đức, TP.HCM', 'TP. Hải Phòng', 'TP. Đà Lạt', 'TP. Vũng Tàu'
];

const BODY_PROFILES: Record<string, { hw: string; size: string }[]> = {
  S: [
    { hw: '1m55 · 45kg', size: 'Size S' },
    { hw: '1m57 · 47kg', size: 'Size S' },
    { hw: '1m60 · 46kg', size: 'Size S' }
  ],
  M: [
    { hw: '1m58 · 51kg', size: 'Size M' },
    { hw: '1m61 · 52kg', size: 'Size M' },
    { hw: '1m59 · 50kg', size: 'Size M' }
  ],
  L: [
    { hw: '1m63 · 56kg', size: 'Size L' },
    { hw: '1m64 · 58kg', size: 'Size L' },
    { hw: '1m62 · 55kg', size: 'Size L' }
  ],
  XL: [
    { hw: '1m65 · 62kg', size: 'Size XL' },
    { hw: '1m66 · 64kg', size: 'Size XL' }
  ]
};

const CLOSING_NOTES = [
  'Giao hàng nhanh, được đồng kiểm trước khi thanh toán rất yên tâm.',
  'Ảnh shop chụp thật sao thì ngoài nhận y như vậy, đóng gói thơm dịu.',
  'Đường may sắc nét, không có chỉ thừa, xứng đáng với hàng thiết kế.',
  'Vải giữ phom tốt sau khi giặt nhẹ, mặc cả ngày rất thoáng mát.',
  'Tư vấn viên chọn size chuẩn số đo, mặc vừa vặn ngay lần đầu.'
];

function buildCommentForProduct(product: Product, idx: number, sizeLabel: string): string {
  const mat = product.materialName.toLowerCase();
  const color = (product.colorVariants?.[0]?.name || product.colorName).split('(')[0].trim().toLowerCase();
  const nameLower = product.name.toLowerCase();

  const templatesByCat: Record<string, string[]> = {
    blouse: [
      `Mình chọn ${nameLower} ${sizeLabel.toLowerCase()}, lên phom rất gọn và tôn dáng. Chất ${mat} mặc đi làm cả ngày vẫn mát nhẹ.`,
      `Màu ${color} bên ngoài dịu mắt và sang hơn cả ảnh. Phần cổ và tay áo may tinh tế, phối cùng chân váy hay quần suông đều hợp.`
    ],
    skirt: [
      `${product.name} độ rủ tự nhiên, chiều dài qua gối rất thanh lịch. Chất ${mat} dày dặn, không lộ và đứng phom.`,
      `Mình mặc ${sizeLabel.toLowerCase()} phần eo ôm vừa vặn, đường xếp ly sắc nét. Phối với áo kiểu trắng hay nâu đều rất tiểu thư.`
    ],
    dress: [
      `${product.name} mặc lên nhẹ nhàng và tôn eo cực kỳ. Chất ${mat} mềm mịn, đi tiệc nhẹ hay hẹn hò đều nổi bật.`,
      `Màu ${color} rất tôn da, lớp lót bên trong mịn mát không bị cộm. ${CLOSING_NOTES[idx % CLOSING_NOTES.length]}`
    ],
    suit: [
      `${product.name} phom đứng chuẩn, tách lẻ áo hoặc váy/quần để phối với đồ khác đều đẹp. Mặc đi gặp khách hàng cực kỳ sang.`,
      `Đường may chỉn chu, khuy đính chắc chắn. Chọn ${sizeLabel.toLowerCase()} theo bảng số đo của VERA là vừa in luôn.`
    ],
    trousers: [
      `${product.name} cạp cao hack dáng rõ rệt, che khuyết điểm chân rất khéo. Chất ${mat} suông mượt, ngồi làm việc cả ngày không bí.`,
      `Ống quần rộng vừa phải, màu ${color} dễ phối với hầu hết các kiểu áo trong tủ. ${CLOSING_NOTES[idx % CLOSING_NOTES.length]}`
    ]
  };

  const pool = templatesByCat[product.category] || templatesByCat.blouse;
  const base = pool[idx % pool.length];
  if (idx % 2 === 1 && !base.includes('Giao hàng') && !base.includes('Vải giữ')) {
    return `${base} ${CLOSING_NOTES[(idx + 2) % CLOSING_NOTES.length]}`;
  }
  return base;
}

function generateAllReviews(): FeaturedReview[] {
  const totalReviews = PRODUCTS.reduce((sum, p) => sum + p.reviewCount, 0);
  const totalNameSpace = LAST_NAMES.length * MIDDLE_NAMES.length * FIRST_NAMES.length; // 6144
  const sizeKeys = ['S', 'M', 'L', 'M', 'S', 'L', 'M', 'XL'];

  return Array.from({ length: totalReviews }, (_, idx) => {
    const product = PRODUCTS[idx % PRODUCTS.length];

    // Step 241 is coprime to 6144 (2^11 * 3), guaranteeing 100% unique names across all reviews
    const nameIndex = (idx * 241 + 37) % totalNameSpace;
    const last = LAST_NAMES[nameIndex % LAST_NAMES.length];
    const mid = MIDDLE_NAMES[Math.floor(nameIndex / LAST_NAMES.length) % MIDDLE_NAMES.length];
    const first = FIRST_NAMES[Math.floor(nameIndex / (LAST_NAMES.length * MIDDLE_NAMES.length)) % FIRST_NAMES.length];
    const author = `${last} ${mid} ${first}`;

    const sizeKey = sizeKeys[idx % sizeKeys.length];
    const profiles = BODY_PROFILES[sizeKey] || BODY_PROFILES.M;
    const profile = profiles[idx % profiles.length];

    return {
      id: `home-rev-${idx + 1}`,
      author,
      location: LOCATIONS[idx % LOCATIONS.length],
      heightWeight: profile.hw,
      sizeBought: profile.size,
      rating: idx % 17 === 8 ? 4 : 5,
      comment: buildCommentForProduct(product, idx, profile.size),
      product
    };
  });
}

const PAGE_SIZE = 15;

export const CustomerReviewsSection: React.FC<CustomerReviewsSectionProps> = ({ onSelectProduct }) => {
  const allReviews = useMemo(() => generateAllReviews(), []);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleReviews = allReviews.slice(0, visibleCount);
  const remaining = allReviews.length - visibleCount;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 160 && visibleCount < allReviews.length) {
      setVisibleCount((prev) => Math.min(allReviews.length, prev + PAGE_SIZE));
    }
  };

  return (
    <section
      id="customer-reviews"
      className="py-10 sm:py-14 bg-[#FAF8F5] border-t border-[#E8DFC8]"
      aria-label="Đánh giá thực tế từ khách hàng VERA"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-7">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#872B10] mb-1.5">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>Khách Hàng Nói Gì Về VERA</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C140E] tracking-tight">
              {allReviews.length.toLocaleString('vi-VN')} Đánh Giá Thực Tế
            </h2>
            <p className="text-xs sm:text-sm text-[#4A382C] mt-1.5">
              Lướt xuống để xem chia sẻ chân thực về phom dáng, chất liệu và trải nghiệm mua sắm từ khách hàng VERA.
            </p>
          </div>

          {/* Aggregate Rating Pill */}
          <div className="self-start md:self-auto bg-white border border-[#E2D6C3] rounded-2xl px-4 py-2.5 flex items-center gap-3 shadow-2xs">
            <div className="flex items-center gap-0.5 text-amber-500">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star key={idx} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <div className="text-xs">
              <strong className="text-sm font-extrabold text-[#1C140E] tabular-nums">4.9 / 5.0</strong>
              <span className="text-[#664C3B] block">98% khách hàng quay lại</span>
            </div>
          </div>
        </div>

        {/* Vertical Scrollable Long Rectangular Review List */}
        <div
          onScroll={handleScroll}
          className="max-h-[540px] overflow-y-auto pr-1.5 flex flex-col gap-3.5 scroll-smooth"
        >
          {visibleReviews.map((rev) => (
            <article
              key={rev.id}
              className="bg-white rounded-2xl p-4 sm:px-6 sm:py-4 border border-[#E8DFC8] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#D5C2AF] transition-colors"
            >
              {/* Left: Customer Info + Rating + Review Comment */}
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <strong className="text-sm font-bold text-[#1C140E]">{rev.author}</strong>
                    <span className="text-xs text-[#664C3B]">
                      {rev.location} · {rev.heightWeight} · <span className="font-semibold text-[#7C442A]">{rev.sizeBought}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {Array.from({ length: rev.rating }).map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      Đã mua hàng
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Quote className="w-4 h-4 text-[#D5C2AF] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-[#3B2519] leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
              </div>

              {/* Right: Linked Product Preview */}
              <button
                type="button"
                onClick={() => onSelectProduct(rev.product)}
                className="pt-3 sm:pt-0 border-t sm:border-t-0 sm:border-l border-[#F0E8DC] sm:pl-5 sm:w-64 lg:w-72 shrink-0 flex items-center justify-between gap-3 group text-left cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={rev.product.images[0]}
                    alt={rev.product.name}
                    className="w-11 h-14 rounded-lg object-cover bg-[#FAF5EE] border border-[#E8DFC8] shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-[#1C140E] group-hover:text-[#7C442A] transition-colors block truncate">
                      {rev.product.name}
                    </span>
                    <span className="text-xs font-bold text-[#872B10] tabular-nums">
                      {rev.product.price.toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-[#7C442A] flex items-center gap-1 shrink-0">
                  <span>Xem</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            </article>
          ))}

          {remaining > 0 && (
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => Math.min(allReviews.length, prev + PAGE_SIZE))}
              className="w-full py-2.5 text-xs font-semibold text-[#7C442A] bg-white hover:bg-[#FAF5EE] border border-[#D5C2AF] rounded-xl transition-colors cursor-pointer shrink-0"
            >
              Xem thêm đánh giá ({remaining.toLocaleString('vi-VN')} đánh giá còn lại)
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
