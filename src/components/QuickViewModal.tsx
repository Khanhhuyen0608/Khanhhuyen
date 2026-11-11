import React, { useState, useRef } from 'react';
import { Product, ProductSize } from '../types';
import { X, Star, ShoppingBag, Heart, ShieldCheck, Ruler, Truck, RotateCcw, Check, ZoomIn, ZoomOut, Camera, Search, Sparkles, CheckCircle2, Share2 } from 'lucide-react';
import { BRAND_INFO } from '../data/brand';

interface CustomerReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  size: string;
  color: string;
  comment: string;
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

const EXTRA_CLOSINGS = [
  'Đóng gói hộp giấy chỉn chu, mở ra có mùi thơm dịu nhẹ rất ưng.',
  'Giao hàng nhanh, được kiểm tra hàng trước khi thanh toán nên rất yên tâm.',
  'Đường may sắc nét, không có chỉ thừa, xứng đáng với tầm giá thiết kế.',
  'Mặc đi làm hay đi cà phê cuối tuần đều nhận được nhiều lời khen.',
  'Vải giữ phom tốt sau khi giặt nhẹ, không bị bai nhão hay xù lông.',
  'Tư vấn viên hỗ trợ chọn size rất nhiệt tình và chuẩn số đo.'
];

function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h;
}

function getProductReviews(product: Product): CustomerReview[] {
  const mainColor = (product.colorVariants?.[0]?.name || product.colorName).split('(')[0].trim();
  const altColor = product.colorVariants?.[1]?.name.split('(')[0].trim() || mainColor;
  const size1 = product.sizes[1] || product.sizes[0] || 'M';
  const size2 = product.sizes[0] || 'S';
  const size3 = product.sizes[2] || product.sizes[1] || 'L';

  const seed = hashString(product.id);

  const categoryNotes: Record<string, string[]> = {
    blouse: [
      `Áo ${product.name.toLowerCase()} lên phom rất gọn, phần tay và cổ áo tinh tế đúng chất vintage. Chất liệu ${product.materialName.toLowerCase()} mặc thoáng mát cả ngày ở văn phòng.`,
      `Mình 52kg cao 1m58 mặc size ${size2} vừa vặn, phối cùng chân váy chữ A hay quần ống rộng đều xinh.`,
      `Màu ${mainColor.toLowerCase()} bên ngoài dịu mắt và sang hơn cả ảnh. Vải mềm, không bị nhăn nhiều sau khi giặt nhẹ.`,
      `Chất liệu ${product.materialName.toLowerCase()} của mẫu ${product.name.toLowerCase()} sờ mát tay và không bị mỏng lộ.`,
      `Phom áo chuẩn dáng phụ nữ Việt, phần vai và ngực mặc rất thoải mái khi cử động.`,
      `Thiết kế thanh lịch, dễ phối cùng nhiều kiểu chân váy hoặc quần suông khác nhau.`
    ],
    skirt: [
      `Chân váy ${product.name.toLowerCase()} rủ tự nhiên, độ dài qua gối vừa thanh lịch vừa che khuyết điểm tốt. Chất ${product.materialName.toLowerCase()} dày dặn, không bị lộ.`,
      `Mình cao 1m58 mặc size ${size1} rất tôn eo. Đi làm hay đi cà phê cuối tuần phối với áo kiểu basic đều hợp.`,
      `Đường xếp ly và cạp váy may chắc chắn, mặc ngồi lâu không bị cộm.`,
      `Màu ${mainColor.toLowerCase()} dễ phối với hầu hết các mẫu áo sáng màu trong tủ. Vải giữ phom đẹp sau khi giặt tay.`,
      `Cạp váy ôm vừa phải không gây khó chịu, chọn theo bảng số đo của shop là mặc chuẩn luôn.`,
      `Khóa kéo mượt và lớp lót bên trong mềm mịn, mặc cả ngày rất dễ chịu.`
    ],
    dress: [
      `${product.name} lên dáng cực kỳ nữ tính, phần eo ôm nhẹ tạo cảm giác thon gọn. Chất liệu ${product.materialName.toLowerCase()} mềm mại, mặc đi tiệc nhẹ hay dạo phố đều nổi bật.`,
      `Mình chọn màu ${mainColor.toLowerCase()} size ${size1}, mặc vừa như may đo. Chi tiết may tinh xảo, lớp lót bên trong mịn mát.`,
      `Rất ưng phong cách cổ điển nhẹ nhàng của mẫu này. Ảnh shop chụp thật sao thì ngoài nhận y như vậy.`,
      `Mình 1m60 nặng 51kg mặc size ${size1} tôn dáng rõ rệt, che khuyết điểm bắp tay và vòng 2 rất khéo.`,
      `Chất ${product.materialName.toLowerCase()} nhẹ nhàng, mặc cả buổi tối đi hẹn hò không hề bị bí hay ngứa da.`,
      `Lên hình cực kỳ ăn ảnh, phong cách tiểu thư thanh lịch đúng gu mình tìm kiếm.`
    ],
    suit: [
      `${product.name} mặc lên nhìn sang và đồng điệu hẳn, tiết kiệm thời gian phối đồ buổi sáng. Chất ${product.materialName.toLowerCase()} đứng phom mà vẫn thoải mái.`,
      `Cả áo và váy/quần trong set đều có thể tách lẻ mix với đồ khác rất tiện. Size ${size1} vừa vặn với người 1m60, 53kg.`,
      `Đường may sắc nét, khuy và chi tiết hoàn thiện cao cấp. Rất đáng tiền so với các mẫu thiết kế cùng tầm giá.`,
      `Màu ${mainColor.toLowerCase()} cực kỳ tôn da, mặc đi gặp đối tác hay dự sự kiện nhẹ đều rất lịch sự và có gu.`,
      `Phom dáng chỉn chu, che khuyết điểm tốt mà vẫn giữ được nét mềm mại nữ tính.`,
      `Chất liệu ${product.materialName.toLowerCase()} thoáng khí, không bị cứng khó chịu khi ngồi làm việc lâu.`
    ],
    trousers: [
      `${product.name} che khuyết điểm chân rất tốt, cạp cao hack dáng rõ rệt. Chất ${product.materialName.toLowerCase()} suông mượt, bước đi rất bay.`,
      `Mình 1m62 mặc size ${size1} chiều dài vừa chạm mắt cá chân rất đẹp. Túi quần sâu tiện lợi, khóa kéo mượt.`,
      `Màu ${mainColor.toLowerCase()} dễ phối với hầu hết áo trong tủ. Mặc cả ngày ngồi làm việc không bị bí hay hằn vết.`,
      `Ống quần rộng vừa phải, không quá thùng thình nên người nhỏ nhắn 1m55 mặc vẫn rất gọn gàng.`,
      `Chất ${product.materialName.toLowerCase()} ít nhăn hơn mình nghĩ, ủi hơi nước qua một lượt là phẳng phiu cả ngày.`,
      `Đường ly quần thẳng tắp, mặc kết hợp áo peplum hoặc áo sơ mi đều lên dáng rất thanh lịch.`
    ]
  };

  const baseComments = categoryNotes[product.category] || categoryNotes.blouse;
  const totalCount = Math.max(1, product.reviewCount);
  const sizesPool = [size1, size2, size3];
  const colorsPool = [mainColor, altColor];

  // Deterministic LCG permutation over 16 * 16 * 24 = 6144 unique Vietnamese names
  const totalNameSpace = LAST_NAMES.length * MIDDLE_NAMES.length * FIRST_NAMES.length;
  const baseDate = new Date(2026, 9, 24).getTime();

  return Array.from({ length: totalCount }, (_, idx) => {
    const nameIndex = (seed * 7 + idx * 131 + 17) % totalNameSpace;
    const last = LAST_NAMES[nameIndex % LAST_NAMES.length];
    const mid = MIDDLE_NAMES[Math.floor(nameIndex / LAST_NAMES.length) % MIDDLE_NAMES.length];
    const first = FIRST_NAMES[Math.floor(nameIndex / (LAST_NAMES.length * MIDDLE_NAMES.length)) % FIRST_NAMES.length];
    const author = `${last} ${mid} ${first}`;

    const d = new Date(baseDate - idx * 2 * 24 * 60 * 60 * 1000);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();

    const mainSentence = baseComments[(idx + seed) % baseComments.length];
    const extra = idx >= 6 ? ` ${EXTRA_CLOSINGS[(idx + seed) % EXTRA_CLOSINGS.length]}` : '';

    return {
      id: `${product.id}-r${idx + 1}`,
      author,
      rating: idx % 9 === 4 && product.rating < 4.9 ? 4 : 5,
      date: `${dd}/${mm}/${yyyy}`,
      size: sizesPool[(idx + seed) % sizesPool.length],
      color: colorsPool[(idx + seed) % colorsPool.length],
      comment: `${mainSentence}${extra}`
    };
  });
}

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: ProductSize, quantity: number, colorName?: string, colorImage?: string) => void;
  onBuyNow: (product: Product, size: ProductSize, quantity: number, colorName?: string, colorImage?: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<ProductSize>(product.sizes[0] || 'M');
  const [selectedColorId, setSelectedColorId] = useState<string>(
    product.colorVariants?.[0]?.id || ''
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'size' | 'care'>('desc');
  const [selectedImage, setSelectedImage] = useState(0);
  const [showSizeTable, setShowSizeTable] = useState(false);
  const [userHeight, setUserHeight] = useState('');
  const [userWeight, setUserWeight] = useState('');
  const [isZoomed, setIsZoomed] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [zoomCoords, setZoomCoords] = useState({ x: 50, y: 50 });
  const [visibleReviewCount, setVisibleReviewCount] = useState(12);
  const reviewsScrollRef = useRef<HTMLDivElement>(null);

  const allReviews = getProductReviews(product);
  const visibleReviews = allReviews.slice(0, visibleReviewCount);

  const handleReviewsScroll = () => {
    const el = reviewsScrollRef.current;
    if (!el) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 160 && visibleReviewCount < allReviews.length) {
      setVisibleReviewCount((prev) => Math.min(allReviews.length, prev + 12));
    }
  };

  const activeVariant = product.colorVariants?.find((c) => c.id === selectedColorId) || product.colorVariants?.[0];
  const activeImages = activeVariant ? activeVariant.images : product.images;
  const activeColorName = activeVariant ? activeVariant.name : product.colorName;
  const currentSizeStock = product.sizeStock?.[selectedSize] ?? 0;

  const formatPrice = (p: number) => p.toLocaleString('vi-VN') + '₫';

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, quantity, activeColorName, activeImages[0]);
  };

  const handleBuyNow = () => {
    onBuyNow(product, selectedSize, quantity, activeColorName, activeImages[0]);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    setZoomCoords({ x, y });
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-2.5 sm:p-6 animate-fadeIn"
    >
      <div
        className="bg-[#FAF8F5] rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-[#E0D5C3] relative flex flex-col max-h-[92dvh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 rounded-full bg-white/90 text-[#3B2519] hover:bg-white hover:text-[#7C442A] shadow-sm transition-colors cursor-pointer"
          aria-label="Đóng xem nhanh"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-8 flex-1 min-h-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Left Column: Product Imagery (5 cols) */}
            <div className="md:col-span-5 flex flex-col gap-3.5">
              
              {/* Dual View Mode Switcher Pills (Lookbook Model vs Lace/Garment Detail) */}
              {activeImages.length > 1 && (
                <div className="bg-[#EFE7DA] p-1 rounded-xl flex gap-1 border border-[#E0D5C3]">
                  <button
                    onClick={() => {
                      setSelectedImage(0);
                      setIsZoomed(false);
                    }}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      selectedImage === 0
                        ? 'bg-white text-[#7C442A] shadow-sm'
                        : 'text-[#634E3F] hover:text-[#3B2519]'
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Dáng người mẫu</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedImage(1);
                      setIsZoomed(false);
                    }}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      selectedImage === 1
                        ? 'bg-white text-[#7C442A] shadow-sm'
                        : 'text-[#634E3F] hover:text-[#3B2519]'
                    }`}
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Ảnh sản phẩm & Chi tiết</span>
                  </button>
                </div>
              )}

              {/* Main Image Display Box with Zoom Inspection */}
              <div
                className="relative aspect-[3/4] bg-white rounded-xl overflow-hidden border border-[#E8DFC8] cursor-crosshair group select-none"
                onMouseMove={handleMouseMove}
                onClick={() => setIsZoomed(!isZoomed)}
                title="Bấm để phóng to / thu nhỏ kiểm tra từng đường may"
              >
                <img
                  src={activeImages[selectedImage] || activeImages[0]}
                  alt={`${product.seoAlt} - ${selectedImage === 0 ? 'Dáng người mẫu mặc' : 'Ảnh sản phẩm và chi tiết ren'}`}
                  className={`w-full h-full object-contain p-4 transition-transform duration-200 ${
                    isZoomed ? 'scale-[2.4]' : 'scale-100'
                  }`}
                  style={
                    isZoomed
                      ? {
                          transformOrigin: `${zoomCoords.x}% ${zoomCoords.y}%`
                        }
                      : undefined
                  }
                />

                {/* Badges on Main Image */}
                <div className="absolute top-3 left-3 flex flex-col gap-1 items-start pointer-events-none">
                  {selectedImage === 0 ? (
                    <span className="bg-[#7C442A] text-white text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded-sm shadow-sm flex items-center gap-1">
                      <Camera className="w-3 h-3" />
                      <span>Ảnh người mẫu mặc</span>
                    </span>
                  ) : (
                    <span className="bg-[#4A3B32] text-white text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded-sm shadow-sm flex items-center gap-1">
                      <Search className="w-3 h-3" />
                      <span>Ảnh sản phẩm & Chi tiết</span>
                    </span>
                  )}

                  {product.isBestSeller && (
                    <span className="bg-[#A8583B] text-white text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm shadow-sm">
                      Tiêu Biểu VERA
                    </span>
                  )}
                </div>

                {/* Zoom In/Out Floating Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsZoomed(!isZoomed);
                  }}
                  className="absolute bottom-3 right-3 bg-white/95 hover:bg-white text-[#3B2519] text-[11px] font-semibold px-2.5 py-1.5 rounded-lg shadow-md border border-[#D5C2AF] flex items-center gap-1.5 transition-all cursor-pointer backdrop-blur-xs"
                >
                  {isZoomed ? (
                    <>
                      <ZoomOut className="w-3.5 h-3.5 text-[#7C442A]" />
                      <span>Thu nhỏ</span>
                    </>
                  ) : (
                    <>
                      <ZoomIn className="w-3.5 h-3.5 text-[#7C442A]" />
                      <span>Soi mũi chỉ & ren</span>
                    </>
                  )}
                </button>
              </div>

              {/* Thumbnails with Explicit Labels */}
              {activeImages.length > 1 && (
                <div className="grid grid-cols-2 gap-2">
                  {activeImages.map((img, idx) => {
                    const isSelected = selectedImage === idx;
                    const label = idx === 0 ? 'Dáng người mẫu' : 'Ảnh sản phẩm & Chi tiết';
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedImage(idx);
                          setIsZoomed(false);
                        }}
                        className={`p-1.5 rounded-xl border-2 bg-white transition-all cursor-pointer flex items-center gap-2 text-left ${
                          isSelected
                            ? 'border-[#7C442A] shadow-sm bg-[#FAF5EE]'
                            : 'border-[#E8DFC8] opacity-75 hover:opacity-100 hover:border-[#C4B29E]'
                        }`}
                      >
                        <div className="w-10 h-12 rounded-lg overflow-hidden bg-[#FAF8F5] shrink-0 border border-[#E8DFC8]">
                          <img src={img} alt={`${product.name} ${label}`} className="w-full h-full object-contain p-0.5" />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-[10px] text-[#8C6D58] uppercase font-semibold">Góc {idx + 1}</span>
                          <span className={`block text-xs truncate ${isSelected ? 'font-bold text-[#7C442A]' : 'font-medium text-[#3B2519]'}`}>
                            {label}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Quality Guarantee Mini Badges */}
              <div className="bg-white/80 rounded-lg p-3 border border-[#E8DFC8] text-xs text-[#634E3F] space-y-1.5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#7C442A] shrink-0" />
                  <span className="font-medium text-[#3B2519]">Đầy đủ 2 góc chụp: Lookbook người mẫu & Cận cảnh ren thật</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#7C442A] shrink-0" />
                  <span>100% Ảnh chụp thật độc quyền từ VERA Studio</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#7C442A] shrink-0" />
                  <span>Miễn phí giao hàng toàn quốc từ 499.000₫</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#7C442A] shrink-0" />
                  <span>Đổi trả 7 ngày tận nhà miễn phí</span>
                </div>
              </div>
            </div>

            {/* Right Column: Contiguous Purchase Module (7 cols) */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                {/* Category & SKU */}
                <div className="flex items-center justify-between text-xs text-[#664C3B] mb-1 font-semibold">
                  <span className="uppercase tracking-wider">{product.categoryName}</span>
                  <span className="tracking-wide">Mã: <strong className="text-[#1C140E] font-bold">{product.sku}</strong></span>
                </div>

                {/* Product Name */}
                <h2 className="text-xl sm:text-2xl font-bold text-[#1C140E] leading-snug">
                  {product.name}
                </h2>

                {/* Subtitle / Essence */}
                <p className="text-sm text-[#4A382C] mt-1.5 leading-relaxed">
                  {product.subtitle}
                </p>

                {/* Rating & Social Proof */}
                <div className="flex items-center gap-3 text-xs text-[#523E30] mt-3 font-medium">
                  <div className="flex items-center text-amber-600">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-1 font-bold text-sm text-[#1C140E]">{product.rating}</span>
                  </div>
                  <span aria-hidden="true" className="text-[#A89382]">·</span>
                  <button
                    type="button"
                    onClick={() => {
                      document.getElementById('quickview-reviews')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="underline underline-offset-4 hover:text-[#7C442A] transition-colors cursor-pointer"
                  >
                    {product.reviewCount} đánh giá
                  </button>
                  <span aria-hidden="true" className="text-[#A89382]">·</span>
                  <span className="text-[#872B10] font-bold">Đã bán {product.soldCount}</span>
                </div>

                {/* Price Display */}
                <div className="mt-4 p-3.5 bg-[#FAF5EE] rounded-xl border border-[#E8DFC8] flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#872B10] tabular-nums tracking-tight">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm sm:text-base text-[#7D695A] line-through tabular-nums font-medium">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="text-xs font-bold text-[#872B10] bg-[#FBEAE4] px-2.5 py-1 rounded-md border border-[#F4D1C6]">
                      Tiết kiệm {formatPrice(product.originalPrice - product.price)}
                    </span>
                  )}
                </div>

                {/* Key Material & Color Info */}
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-lg border border-[#E8DFC8]">
                    <span className="text-[#664C3B] block text-xs uppercase font-bold tracking-wider mb-0.5">Chất liệu chính</span>
                    <span className="font-bold text-sm text-[#1C140E]">{product.materialName}</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-[#E8DFC8]">
                    <span className="text-[#664C3B] block text-xs uppercase font-bold tracking-wider mb-0.5">Tông màu & Họa tiết</span>
                    <span className="font-bold text-sm text-[#1C140E]">{activeColorName}</span>
                  </div>
                </div>

                {/* Color Variant Selector */}
                {product.colorVariants && product.colorVariants.length > 0 && (
                  <div className="mt-5">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-bold text-[#3B2519]">Màu sắc trang phục:</span>
                      <span className="text-xs font-semibold text-[#7C442A]">{activeColorName}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {product.colorVariants.map((c) => {
                        const isSelected = selectedColorId === c.id;
                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => {
                              setSelectedColorId(c.id);
                              setSelectedImage(0);
                              setIsZoomed(false);
                            }}
                            className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 border-2 transition-all cursor-pointer text-left ${
                              isSelected
                                ? 'border-[#7C442A] bg-[#FAF5EE] text-[#7C442A] shadow-xs ring-1 ring-[#7C442A]/20'
                                : 'border-[#E8DFC8] bg-white text-[#5C4535] hover:border-[#C4B29E]'
                            }`}
                          >
                            <span
                              className="w-4 h-4 rounded-full border border-black/20 shrink-0 shadow-xs"
                              style={{ backgroundColor: c.colorHex }}
                            />
                            <div className="min-w-0">
                              <span className="block text-xs font-bold truncate leading-tight">{c.name.split('(')[0].trim()}</span>
                              <span className="block text-[10px] text-[#8C6D58] font-normal truncate">
                                2 ảnh: Dáng mẫu & Chi tiết
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-[#3B2519]">Chọn kích cỡ (Size):</span>
                    <button
                      onClick={() => setShowSizeTable(!showSizeTable)}
                      className="text-[#7C442A] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Bảng số đo chuẩn</span>
                    </button>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size) => {
                      const stockForSize = product.sizeStock?.[size] ?? 0;
                      const isOut = stockForSize === 0;
                      return (
                        <button
                          key={size}
                          disabled={isOut}
                          onClick={() => {
                            setSelectedSize(size);
                            setQuantity((prev) => Math.min(prev, Math.max(1, stockForSize)));
                          }}
                          className={`min-w-[44px] h-11 px-2.5 rounded-lg font-semibold text-xs transition-all flex flex-col items-center justify-center ${
                            isOut
                              ? 'bg-[#F3EFE9] text-[#A89382] border border-[#E2D8CB] cursor-not-allowed line-through'
                              : selectedSize === size
                              ? 'bg-[#7C442A] text-white shadow-sm ring-2 ring-[#7C442A]/20 cursor-pointer'
                              : 'bg-white text-[#3B2519] border border-[#D5C2AF] hover:border-[#7C442A] cursor-pointer'
                          }`}
                        >
                          <span>{size}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Size Guide Table & Interactive Size Finder Toggle */}
                  {showSizeTable && (() => {
                    const wNum = parseFloat(userWeight);
                    const hNum = parseFloat(userHeight);
                    let recommendedSize: ProductSize | null = null;
                    if (!isNaN(wNum) && wNum > 0) {
                      if (wNum <= 48 && (isNaN(hNum) || hNum <= 159)) recommendedSize = 'S';
                      else if (wNum <= 54 && (isNaN(hNum) || hNum <= 164)) recommendedSize = 'M';
                      else if (wNum <= 60) recommendedSize = 'L';
                      else recommendedSize = 'XL';
                      if (!product.sizes.includes(recommendedSize)) {
                        recommendedSize = product.sizes[0] || null;
                      }
                    }

                    return (
                      <div className="mt-3 p-3.5 bg-white rounded-xl border border-[#E8DFC8] text-[11px] space-y-3 animate-fadeIn">
                        <div className="font-bold text-[#3B2519] flex items-center justify-between">
                          <span>Gợi ý chọn size nhanh &amp; Bảng số đo:</span>
                          <span className="text-[#7C442A] cursor-pointer" onClick={() => setShowSizeTable(false)}>Đóng ✕</span>
                        </div>

                        {/* Interactive Height & Weight Calculator */}
                        <div className="bg-[#FAF5EE] p-2.5 rounded-lg border border-[#E8DFC8] space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="number"
                              min={140}
                              max={185}
                              value={userHeight}
                              onChange={(e) => setUserHeight(e.target.value)}
                              placeholder="Chiều cao (cm), VD: 158"
                              className="bg-white border border-[#D5C2AF] rounded-md px-2.5 py-1.5 text-[11px] outline-none focus:border-[#7C442A]"
                            />
                            <input
                              type="number"
                              min={35}
                              max={90}
                              value={userWeight}
                              onChange={(e) => setUserWeight(e.target.value)}
                              placeholder="Cân nặng (kg), VD: 52"
                              className="bg-white border border-[#D5C2AF] rounded-md px-2.5 py-1.5 text-[11px] outline-none focus:border-[#7C442A]"
                            />
                          </div>
                          {recommendedSize && (
                            <div className="flex items-center justify-between gap-2 pt-0.5">
                              <span className="text-[#3B2519]">
                                Gợi ý chuẩn nhất cho bạn: <strong className="text-[#872B10]">Size {recommendedSize}</strong>
                              </span>
                              <button
                                type="button"
                                onClick={() => setSelectedSize(recommendedSize)}
                                className="bg-[#7C442A] text-white font-semibold px-2.5 py-1 rounded-md cursor-pointer hover:bg-[#68361E] transition-colors"
                              >
                                Chọn Size {recommendedSize}
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="border-b border-[#E8DFC8] text-[#8C6D58]">
                                <th className="py-1">Size</th>
                                <th>Ngực</th>
                                <th>Eo</th>
                                <th>Mông</th>
                                <th>Cân nặng</th>
                              </tr>
                            </thead>
                            <tbody>
                              {BRAND_INFO.sizeGuide.map((sg) => (
                                <tr key={sg.size} className={`border-b border-[#F5EFEB] ${selectedSize === sg.size ? 'font-bold text-[#7C442A] bg-[#FAF5EE]' : ''}`}>
                                  <td className="py-1">{sg.size}</td>
                                  <td>{sg.bust}</td>
                                  <td>{sg.waist}</td>
                                  <td>{sg.hip}</td>
                                  <td>{sg.weight}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Quantity Stepper */}
                <div className="mt-5 flex items-center gap-4 flex-wrap">
                  <span className="text-xs font-bold text-[#3B2519]">Số lượng:</span>
                  <div className="flex items-center border border-[#D5C2AF] bg-white rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={currentSizeStock === 0 || quantity <= 1}
                      className="px-3 py-1.5 text-sm text-[#5C4535] hover:bg-[#F3EBE1] disabled:opacity-40 rounded-l-lg transition-colors cursor-pointer disabled:cursor-not-allowed"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-sm font-bold text-[#1C140E] tabular-nums">
                      {currentSizeStock === 0 ? 0 : quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(currentSizeStock, quantity + 1))}
                      disabled={currentSizeStock === 0 || quantity >= currentSizeStock}
                      className="px-3 py-1.5 text-sm text-[#5C4535] hover:bg-[#F3EBE1] disabled:opacity-40 rounded-r-lg transition-colors cursor-pointer disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-[#523E30]">
                    {currentSizeStock > 0 ? (
                      <>
                        Còn{' '}
                        <strong
                          className={`font-bold tabular-nums ${
                            currentSizeStock <= 5 ? 'text-[#A8583B]' : 'text-emerald-700'
                          }`}
                        >
                          {currentSizeStock}
                        </strong>{' '}
                        sản phẩm size {selectedSize} tại kho
                      </>
                    ) : (
                      <strong className="text-red-600 font-semibold">Tạm hết hàng size {selectedSize}</strong>
                    )}
                  </span>
                </div>

                {/* CTAs: Add to Cart & Buy Now */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={currentSizeStock === 0}
                    className="flex-1 bg-[#F5EFEB] hover:bg-[#EAE0D2] disabled:opacity-50 text-[#7C442A] border border-[#7C442A] font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:cursor-not-allowed text-sm"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Thêm vào giỏ hàng</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    disabled={currentSizeStock === 0}
                    className="flex-1 bg-[#7C442A] hover:bg-[#68361E] disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer disabled:cursor-not-allowed text-sm"
                  >
                    <span>Mua ngay</span>
                  </button>

                  <button
                    onClick={() => onToggleWishlist(product)}
                    className={`p-3 rounded-xl border transition-colors cursor-pointer flex items-center justify-center ${
                      isWishlisted
                        ? 'bg-[#FBEAE4] border-[#A8583B] text-[#A8583B]'
                        : 'bg-white border-[#D5C2AF] text-[#5C4535] hover:border-[#7C442A]'
                    }`}
                    title={isWishlisted ? 'Đã yêu thích' : 'Lưu vào yêu thích'}
                  >
                    <Heart className="w-5 h-5" fill={isWishlisted ? 'currentColor' : 'none'} />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const shareText = `${product.name} (${formatPrice(product.price)}) - VERA Vintage for Everyday`;
                      navigator.clipboard?.writeText(`${shareText}\n${window.location.href}`);
                      setCopiedShare(true);
                      setTimeout(() => setCopiedShare(false), 2000);
                    }}
                    className="p-3 rounded-xl border bg-white border-[#D5C2AF] text-[#5C4535] hover:border-[#7C442A] hover:text-[#7C442A] transition-colors cursor-pointer flex items-center justify-center"
                    title="Sao chép thông tin sản phẩm để chia sẻ"
                    aria-label="Chia sẻ sản phẩm"
                  >
                    {copiedShare ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Informational Tabs: Description, Features, Care */}
              <div className="pt-6 border-t border-[#E8DFC8]">
                <div className="flex border-b border-[#E8DFC8] gap-6 text-xs font-semibold mb-3">
                  <button
                    onClick={() => setActiveTab('desc')}
                    className={`pb-2 transition-colors cursor-pointer ${
                      activeTab === 'desc' ? 'border-b-2 border-[#7C442A] text-[#7C442A]' : 'text-[#8C6D58] hover:text-[#3B2519]'
                    }`}
                  >
                    Mô tả thiết kế
                  </button>
                  <button
                    onClick={() => setActiveTab('size')}
                    className={`pb-2 transition-colors cursor-pointer ${
                      activeTab === 'size' ? 'border-b-2 border-[#7C442A] text-[#7C442A]' : 'text-[#8C6D58] hover:text-[#3B2519]'
                    }`}
                  >
                    Đặc điểm & Gợi ý mix
                  </button>
                  <button
                    onClick={() => setActiveTab('care')}
                    className={`pb-2 transition-colors cursor-pointer ${
                      activeTab === 'care' ? 'border-b-2 border-[#7C442A] text-[#7C442A]' : 'text-[#8C6D58] hover:text-[#3B2519]'
                    }`}
                  >
                    Bảo quản giặt ủi
                  </button>
                </div>

                <div className="text-xs text-[#5C4535] leading-relaxed min-h-[90px]">
                  {activeTab === 'desc' && (
                    <p>{product.description}</p>
                  )}

                  {activeTab === 'size' && (
                    <div className="space-y-2">
                      <div className="font-semibold text-[#3B2519]">Chi tiết nổi bật:</div>
                      <ul className="space-y-1">
                        {product.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-[#7C442A] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="pt-2 text-[#7C442A] font-medium">
                        <strong>Gợi ý phối đồ:</strong> {product.stylingTips}
                      </div>
                    </div>
                  )}

                  {activeTab === 'care' && (
                    <ul className="space-y-1.5 list-disc pl-4 text-[#634E3F]">
                      {product.careInstructions.map((inst, idx) => (
                        <li key={idx}>{inst}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Customer Feedback Section */}
              <div id="quickview-reviews" className="pt-6 border-t border-[#E8DFC8]">
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <div>
                    <h3 className="text-sm font-bold text-[#1C140E]">
                      Feedback từ khách hàng
                    </h3>
                    <p className="text-[11px] text-[#7A6453]">
                      Cuộn dọc để xem đủ {product.reviewCount} đánh giá đã mua
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-[#FAF5EE] border border-[#E8DFC8] px-2.5 py-1 rounded-lg">
                    <Star className="w-3.5 h-3.5 text-amber-600 fill-current" />
                    <span className="text-xs font-extrabold text-[#1C140E] tabular-nums">{product.rating}</span>
                    <span className="text-[11px] text-[#7A6453]">/ 5.0</span>
                  </div>
                </div>

                <div
                  ref={reviewsScrollRef}
                  onScroll={handleReviewsScroll}
                  className="max-h-[340px] overflow-y-auto space-y-2.5 pr-1 scroll-smooth"
                >
                  {visibleReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="bg-white rounded-xl p-3.5 border border-[#E8DFC8] space-y-1.5 shadow-2xs"
                    >
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#1C140E]">{rev.author}</span>
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded shrink-0">
                            <CheckCircle2 className="w-3 h-3" />
                            Đã mua hàng
                          </span>
                        </div>
                        <span className="text-[11px] text-[#8C6D58] shrink-0">{rev.date}</span>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-[#664C3B] flex-wrap">
                        <div className="flex items-center text-amber-500" aria-label={`${rev.rating} sao`}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < rev.rating ? 'fill-current' : 'text-[#E0D5C3]'}`}
                            />
                          ))}
                        </div>
                        <span aria-hidden="true" className="text-[#C4B29E]">·</span>
                        <span>Phân loại: Size {rev.size}, {rev.color}</span>
                      </div>

                      <p className="text-xs text-[#4A382C] leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>
                  ))}

                  {visibleReviewCount < allReviews.length && (
                    <button
                      type="button"
                      onClick={() => setVisibleReviewCount((prev) => Math.min(allReviews.length, prev + 12))}
                      className="w-full py-2 text-xs font-semibold text-[#7C442A] bg-[#FAF5EE] hover:bg-[#EFE5D9] rounded-xl border border-[#E8DFC8] transition-colors cursor-pointer"
                    >
                      Xem thêm đánh giá ({allReviews.length - visibleReviewCount} còn lại)
                    </button>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
