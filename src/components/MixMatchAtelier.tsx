import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import { Product, ProductSize } from '../types';
import { Sparkles, ShoppingBag, Shuffle, Check, Wand2, Eye, AlertCircle } from 'lucide-react';

interface MixMatchAtelierProps {
  onAddOutfitToCart: (
    top: Product,
    topSize: ProductSize,
    bottom: Product,
    bottomSize: ProductSize
  ) => void;
  onQuickView: (product: Product) => void;
}

const MOOD_PRESETS: {
  id: string;
  label: string;
  topId: string;
  bottomId: string;
  tip: string;
}[] = [
  {
    id: 'office',
    label: 'Công sở thanh lịch',
    topId: 'vera-blouse-gingham-peplum',
    bottomId: 'vera-trousers-linen-beige',
    tip: 'Áo peplum chiết eo kết hợp quần ống rộng linen be ngà tạo tỷ lệ chân dài, gọn gàng và chuyên nghiệp.'
  },
  {
    id: 'cafe',
    label: 'Cà phê cuối tuần',
    topId: 'vera-blouse-polka-dot',
    bottomId: 'vera-skirt-earth-brown',
    tip: 'Áo wrap chấm bi nâu đất đồng điệu hoàn toàn với chân váy midi linen nâu đất, mang lại vẻ mộc mạc đậm chất Vintage.'
  },
  {
    id: 'date',
    label: 'Hẹn hò dịu dàng',
    topId: 'vera-blouse-corset-puff',
    bottomId: 'vera-skirt-pleated-tiered',
    tip: 'Áo corset tay bồng trắng ngà ôm gọn phần thân trên, cân bằng hoàn hảo với chân váy voan dập ly xếp tầng bay bổng.'
  },
  {
    id: 'party',
    label: 'Tiểu thư dạo phố',
    topId: 'vera-blouse-victorian-lace',
    bottomId: 'vera-skirt-cream-bow',
    tip: 'Áo cổ vuông viền ren cúc ngọc phối cùng chân váy kem thắt nơ nâu tôn vòng eo nhỏ và nét thanh lịch cổ điển.'
  }
];

interface HarmonyResult {
  score: number;
  isRecommended: boolean;
  headline: string;
  detail: string;
  betterBottomId?: string;
}

function getHarmonyFeedback(top: Product, bottom: Product): HarmonyResult {
  const pairKey = `${top.id}__${bottom.id}`;

  const DESIGNER_MATRIX: Record<string, HarmonyResult> = {
    // 1. Áo kiểu wrap phối caro & chấm bi nâu đất
    'vera-blouse-polka-dot__vera-skirt-earth-brown': {
      score: 97,
      isRecommended: true,
      headline: 'Chuẩn mực Vintage — Nền trơn tôn áo họa tiết',
      detail: 'Chân váy midi nâu đất trơn đồng điệu màu sắc và tiết chế vừa đủ để làm nổi bật phần wrap caro & chấm bi của áo.'
    },
    'vera-blouse-polka-dot__vera-skirt-cream-bow': {
      score: 95,
      isRecommended: true,
      headline: 'Sáng bừng khuôn mặt — Kết nối đai nơ nâu',
      detail: 'Sắc kem dịu làm tổng thể nhẹ nhàng hơn, trong khi đai nơ nâu ở cạp váy ăn nhập tinh tế với tông áo.'
    },
    'vera-blouse-polka-dot__vera-trousers-linen-beige': {
      score: 93,
      isRecommended: true,
      headline: 'Phóng khoáng & gọn gàng cho ngày dạo phố',
      detail: 'Quần ống rộng be ngà trung tính giúp cân bằng họa tiết caro chấm bi, tạo cảm giác cao ráo và dễ di chuyển.'
    },
    'vera-blouse-polka-dot__vera-trousers-linen-charcoal': {
      score: 58,
      isRecommended: false,
      headline: 'Lệch nhiệt màu & đụng họa tiết',
      detail: 'Áo nâu đất ấm mang họa tiết caro + chấm bi khi đi cùng quần kẻ sọc xám than lạnh sẽ bị rối mắt và lệch tông.',
      betterBottomId: 'vera-skirt-earth-brown'
    },
    'vera-blouse-polka-dot__vera-skirt-satin-lace': {
      score: 55,
      isRecommended: false,
      headline: 'Lệch chất liệu & phong cách',
      detail: 'Áo wrap đồng nội mộc mạc không ăn nhập với chân váy lụa satin bóng viền ren đen quyến rũ.',
      betterBottomId: 'vera-skirt-earth-brown'
    },
    'vera-blouse-polka-dot__vera-skirt-pleated-tiered': {
      score: 64,
      isRecommended: false,
      headline: 'Thừa chi tiết trên cùng một set đồ',
      detail: 'Áo đã có caro, chấm bi, viền ren và nơ eo; ghép thêm chân váy xếp tầng cúc ngọc sẽ làm tổng thể bị nặng và rối.',
      betterBottomId: 'vera-skirt-cream-bow'
    },

    // 2. Áo hai dây ren trắng baby doll tiểu thư
    'vera-blouse-lace-cami__vera-skirt-satin-lace': {
      score: 95,
      isRecommended: true,
      headline: 'Trẻ trung & bay bổng — Tỷ lệ trên xòe dưới ngắn',
      detail: 'Áo hai dây ren dáng ngắn kết hợp chân váy ngắn lụa satin giúp khoe đôi chân thon, rất hợp đi chơi hoặc hẹn hò.'
    },
    'vera-blouse-lace-cami__vera-skirt-cream-bow': {
      score: 92,
      isRecommended: true,
      headline: 'Ngọt ngào & cân đối (Nên sơ vin nhẹ)',
      detail: 'Gam trắng – kem đồng điệu; phần đai thắt nơ nâu của chân váy giúp định hình lại vòng eo cho dáng áo baby doll.'
    },
    'vera-blouse-lace-cami__vera-trousers-linen-beige': {
      score: 90,
      isRecommended: true,
      headline: 'Nữ tính pha nét phóng khoáng mùa hè',
      detail: 'Ren trắng mềm mại cân bằng cùng quần suông linen be ngà tạo cảm giác thoáng mát, tự nhiên.'
    },
    'vera-blouse-lace-cami__vera-skirt-pleated-tiered': {
      score: 60,
      isRecommended: false,
      headline: 'Cả set đều xòe rủ, dễ làm dáng bị thấp',
      detail: 'Áo baby doll xòe kết hợp chân váy dài xếp tầng sẽ làm mất đường eo, khiến tỷ lệ cơ thể bị rộng và ngắn hơn.',
      betterBottomId: 'vera-skirt-satin-lace'
    },
    'vera-blouse-lace-cami__vera-skirt-earth-brown': {
      score: 66,
      isRecommended: false,
      headline: 'Phồng phần bụng & hông',
      detail: 'Dáng áo xòe kết hợp chân váy midi nhún eo tạo độ phồng kép ở vùng eo, không tôn dáng bằng chân váy ngắn hoặc quần suông.',
      betterBottomId: 'vera-trousers-linen-beige'
    },
    'vera-blouse-lace-cami__vera-trousers-linen-charcoal': {
      score: 62,
      isRecommended: false,
      headline: 'Lệch vibe (Tiểu thư bánh bèo vs Công sở nghiêm túc)',
      detail: 'Áo hai dây ren baby doll quá mềm mại so với quần kẻ sọc xám than đứng dáng.',
      betterBottomId: 'vera-skirt-satin-lace'
    },

    // 3. Áo kiểu corset tay bồng cổ vuông thắt nơ trắng ngà
    'vera-blouse-corset-puff__vera-skirt-pleated-tiered': {
      score: 98,
      isRecommended: true,
      headline: 'Tỷ lệ đồng hồ cát chuẩn mực — Trên ôm dưới bay',
      detail: 'Thân áo corset ôm gọn vòng eo kết hợp tay bồng cổ vuông tạo điểm nhấn hoàn hảo cho chân váy voan xếp tầng thướt tha.'
    },
    'vera-blouse-corset-puff__vera-skirt-earth-brown': {
      score: 96,
      isRecommended: true,
      headline: 'Tương phản Trắng ngà – Nâu đất cực kỳ sang',
      detail: 'Phom corset chiết eo giúp tổng thể khi đi cùng chân váy midi nâu đất trông cao ráo và thanh thoát.'
    },
    'vera-blouse-corset-puff__vera-skirt-cream-bow': {
      score: 95,
      isRecommended: true,
      headline: 'Thanh lịch & tôn eo tối đa',
      detail: 'Sắc trắng ngà hòa quyện với chân váy kem đai nâu mang lại vẻ tiểu thư chỉn chu, phù hợp cả đi tiệc nhẹ lẫn dạo phố.'
    },
    'vera-blouse-corset-puff__vera-trousers-linen-beige': {
      score: 93,
      isRecommended: true,
      headline: 'Hiện đại & kéo dài đôi chân',
      detail: 'Áo corset dáng gọn đi cùng quần ống rộng cạp cao tạo hiệu ứng chân dài miên man mà vẫn giữ nét nữ tính.'
    },
    'vera-blouse-corset-puff__vera-skirt-satin-lace': {
      score: 68,
      isRecommended: false,
      headline: 'Chưa đồng điệu về phong cách',
      detail: 'Áo tay bồng cổ điển có nơ ngực hơi kín đáo khi ghép với chân váy ngắn lụa satin viền ren đen gợi cảm.',
      betterBottomId: 'vera-skirt-pleated-tiered'
    },
    'vera-blouse-corset-puff__vera-trousers-linen-charcoal': {
      score: 69,
      isRecommended: false,
      headline: 'Kém hài hòa về chất liệu & tinh thần thiết kế',
      detail: 'Quần sọc xám than mang hơi hướng tối giản công sở, chưa làm bật được nét lãng mạn của áo corset tay bồng.',
      betterBottomId: 'vera-trousers-linen-beige'
    },

    // 4. Áo kiểu cổ vuông viền ren thêu hoa tay lửng cài cúc ngọc
    'vera-blouse-victorian-lace__vera-skirt-cream-bow': {
      score: 97,
      isRecommended: true,
      headline: 'Tinh tế cổ điển — Tôn trọn ren thêu & cúc ngọc',
      detail: 'Chân váy kem trơn có đai nơ nâu làm nền hoàn hảo để hàng cúc ngọc và đường ren thêu hoa của áo tỏa sáng.'
    },
    'vera-blouse-victorian-lace__vera-skirt-earth-brown': {
      score: 96,
      isRecommended: true,
      headline: 'Cổ điển & ấm áp chuẩn Victorian Vintage',
      detail: 'Sắc trắng ngà ren hoa trên nền nâu đất tạo chiều sâu sang trọng, mặc đi làm hay dự tiệc trà đều rất đẹp.'
    },
    'vera-blouse-victorian-lace__vera-trousers-linen-beige': {
      score: 94,
      isRecommended: true,
      headline: 'Thanh nhã & ứng dụng cao nơi công sở',
      detail: 'Quần linen be ngà giúp tiết chế độ điệu đà của áo ren, mang lại diện mạo chuyên nghiệp nhưng vẫn mềm mại.'
    },
    'vera-blouse-victorian-lace__vera-skirt-pleated-tiered': {
      score: 67,
      isRecommended: false,
      headline: 'Trùng lặp chi tiết cúc ngọc & độ cầu kỳ',
      detail: 'Cả áo và váy đều đính cúc ngọc và nhiều chi tiết xếp/ren, ghép chung dễ bị rối và kém điểm nhấn.',
      betterBottomId: 'vera-skirt-cream-bow'
    },
    'vera-blouse-victorian-lace__vera-skirt-satin-lace': {
      score: 61,
      isRecommended: false,
      headline: 'Xung đột hai loại ren (Ren trắng vs Ren đen)',
      detail: 'Ren thêu hoa trắng cổ điển và ren đen viền lụa satin thuộc hai phong cách đối lập, không nên ghép cùng một set.',
      betterBottomId: 'vera-skirt-cream-bow'
    },
    'vera-blouse-victorian-lace__vera-trousers-linen-charcoal': {
      score: 63,
      isRecommended: false,
      headline: 'Khác biệt phong cách (Thơ mộng vs Nghiêm nghị)',
      detail: 'Quần kẻ sọc xám than làm mất đi vẻ nhẹ nhàng, dịu dàng vốn có của áo ren cổ vuông Victorian.',
      betterBottomId: 'vera-skirt-earth-brown'
    },

    // 5. Áo peplum kẻ caro nâu cổ V tay cộc thắt đai eo
    'vera-blouse-gingham-peplum__vera-trousers-linen-beige': {
      score: 97,
      isRecommended: true,
      headline: 'Công thức vàng — Peplum xòe eo + Quần ống suông',
      detail: 'Tà peplum thắt đai eo kết hợp quần ống rộng trơn màu be ngà giúp che khuyết điểm vòng 2 và kéo dài tỷ lệ chân tối đa.'
    },
    'vera-blouse-gingham-peplum__vera-trousers-linen-charcoal': {
      score: 91,
      isRecommended: true,
      headline: 'Chỉn chu & gọn gàng cho môi trường công sở',
      detail: 'Phom peplum đứng dáng đi cùng quần suông xám than tạo tổng thể chuyên nghiệp, lịch sự và tôn vòng eo.'
    },
    'vera-blouse-gingham-peplum__vera-skirt-satin-lace': {
      score: 62,
      isRecommended: false,
      headline: 'Tà peplum che mất dáng váy ngắn & lệch chất liệu',
      detail: 'Áo peplum xòe phủ xuống cạp váy ngắn lụa satin làm mất tỷ lệ, đồng thời caro cotton không hợp với lụa ren đen.',
      betterBottomId: 'vera-trousers-linen-beige'
    },
    'vera-blouse-gingham-peplum__vera-skirt-pleated-tiered': {
      score: 58,
      isRecommended: false,
      headline: 'Xòe chồng xòe — Nặng phần hông',
      detail: 'Tà peplum xòe sẵn ghép với chân váy xếp tầng phồng sẽ tạo cảm giác nặng nề ở vùng eo hông.',
      betterBottomId: 'vera-trousers-linen-beige'
    },
    'vera-blouse-gingham-peplum__vera-skirt-earth-brown': {
      score: 60,
      isRecommended: false,
      headline: 'Đè lên phần nhún eo của chân váy',
      detail: 'Tà peplum sẽ che và làm cộm phần cạp nhún eo của chân váy midi, khiến lưng trông ngắn lại.',
      betterBottomId: 'vera-trousers-linen-beige'
    },
    'vera-blouse-gingham-peplum__vera-skirt-cream-bow': {
      score: 63,
      isRecommended: false,
      headline: 'Trùng hai chiếc đai thắt eo',
      detail: 'Cả áo peplum và chân váy kem đều có đai thắt nơ ở eo, khi mặc chung sẽ bị cộm và trùng chi tiết.',
      betterBottomId: 'vera-trousers-linen-beige'
    }
  };

  return (
    DESIGNER_MATRIX[pairKey] || {
      score: 70,
      isRecommended: false,
      headline: 'Cần cân nhắc thêm khi phối cùng nhau',
      detail: 'Hai thiết kế này có phom dáng hoặc chi tiết chưa thật sự tôn nhau lên.',
      betterBottomId: 'vera-trousers-linen-beige'
    }
  );
}

export const MixMatchAtelier: React.FC<MixMatchAtelierProps> = ({
  onAddOutfitToCart,
  onQuickView
}) => {
  const tops = useMemo(() => PRODUCTS.filter((p) => p.category === 'blouse'), []);
  const bottoms = useMemo(
    () => PRODUCTS.filter((p) => p.category === 'skirt' || p.category === 'trousers'),
    []
  );

  const [selectedTopId, setSelectedTopId] = useState<string>(tops[0]?.id || '');
  const [selectedBottomId, setSelectedBottomId] = useState<string>(bottoms[0]?.id || '');
  const [topSize, setTopSize] = useState<ProductSize>('M');
  const [bottomSize, setBottomSize] = useState<ProductSize>('M');
  const [activeMoodId, setActiveMoodId] = useState<string>('office');
  const [addedFeedback, setAddedFeedback] = useState(false);

  const selectedTop = tops.find((t) => t.id === selectedTopId) || tops[0];
  const selectedBottom = bottoms.find((b) => b.id === selectedBottomId) || bottoms[0];

  if (!selectedTop || !selectedBottom) return null;

  const harmony = getHarmonyFeedback(selectedTop, selectedBottom);
  const activeMood = MOOD_PRESETS.find((m) => m.id === activeMoodId);
  const comboTotal = selectedTop.price + selectedBottom.price;
  const formatPrice = (v: number) => v.toLocaleString('vi-VN') + '₫';

  const handleApplyPreset = (preset: (typeof MOOD_PRESETS)[number]) => {
    setActiveMoodId(preset.id);
    if (tops.some((t) => t.id === preset.topId)) setSelectedTopId(preset.topId);
    if (bottoms.some((b) => b.id === preset.bottomId)) setSelectedBottomId(preset.bottomId);
  };

  const handleRandomize = () => {
    const goodCombos: { top: Product; bottom: Product }[] = [];
    for (const t of tops) {
      for (const b of bottoms) {
        if (getHarmonyFeedback(t, b).isRecommended) {
          goodCombos.push({ top: t, bottom: b });
        }
      }
    }
    const pick = goodCombos[Math.floor(Math.random() * goodCombos.length)];
    setActiveMoodId('');
    if (pick) {
      setSelectedTopId(pick.top.id);
      setSelectedBottomId(pick.bottom.id);
    }
  };

  const handleAddBoth = () => {
    onAddOutfitToCart(selectedTop, topSize, selectedBottom, bottomSize);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  return (
    <section
      id="mix-match-atelier"
      className="py-12 sm:py-16 bg-gradient-to-b from-[#FAF8F5] to-[#F3EBE1] border-t border-[#E8DFC8]"
      aria-label="Phòng phối đồ trực quan VERA Atelier"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#872B10] mb-1.5">
              <Wand2 className="w-4 h-4" />
              <span>Độc Quyền Tại VERA Atelier</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C140E] tracking-tight">
              Phòng Thử &amp; Phối Đồ Trực Quan
            </h2>
            <p className="text-xs sm:text-sm text-[#4A382C] mt-1.5 max-w-2xl">
              Tự tay ghép Áo kiểu &amp; Chân váy/Quần ống rộng để xem độ hài hòa màu sắc, chọn size riêng cho từng món và chốt cả set nhanh gọn với ưu đãi Freeship tự động.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRandomize}
            className="self-start lg:self-auto inline-flex items-center gap-2 bg-white hover:bg-[#FAF5EE] text-[#7C442A] border border-[#D5C2AF] hover:border-[#7C442A] text-xs font-bold px-4 py-2.5 rounded-full shadow-2xs transition-all cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Gợi ý ngẫu nhiên</span>
          </button>
        </div>

        {/* Occasion Presets */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6">
          {MOOD_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleApplyPreset(preset)}
              className={`px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer border ${
                activeMoodId === preset.id
                  ? 'bg-[#7C442A] text-white border-[#7C442A] shadow-sm'
                  : 'bg-white text-[#5C4535] border-[#E2D6C3] hover:border-[#7C442A]'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Main Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Selectors (Top & Bottom Pickers) - 7 cols */}
          <div className="lg:col-span-7 space-y-5">
            {/* Step 1: Choose Top */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8DFC8] shadow-2xs">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs sm:text-sm font-bold text-[#1C140E]">
                  1. Chọn Áo kiểu ({tops.length} mẫu)
                </span>
                <span className="text-xs font-semibold text-[#7C442A] truncate">
                  {selectedTop.name}
                </span>
              </div>
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {tops.map((item) => {
                  const isSelected = item.id === selectedTop.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setSelectedTopId(item.id);
                        setActiveMoodId('');
                      }}
                      className={`w-24 sm:w-28 shrink-0 rounded-xl p-1.5 border-2 text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#7C442A] bg-[#FAF5EE] shadow-xs'
                          : 'border-[#E8DFC8] bg-white hover:border-[#C4B29E]'
                      }`}
                    >
                      <div className="aspect-[3/4] rounded-lg overflow-hidden bg-[#FAF8F5] mb-1.5">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-[#1C140E] line-clamp-1 block">
                        {item.name}
                      </span>
                      <span className="text-[11px] font-bold text-[#872B10] tabular-nums">
                        {formatPrice(item.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Choose Bottom */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8DFC8] shadow-2xs">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs sm:text-sm font-bold text-[#1C140E]">
                  2. Chọn Chân váy hoặc Quần ống rộng ({bottoms.length} mẫu)
                </span>
                <span className="text-xs font-semibold text-[#7C442A] truncate">
                  {selectedBottom.name}
                </span>
              </div>
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {bottoms.map((item) => {
                  const isSelected = item.id === selectedBottom.id;
                  const compat = getHarmonyFeedback(selectedTop, item);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setSelectedBottomId(item.id);
                        setActiveMoodId('');
                      }}
                      className={`w-24 sm:w-28 shrink-0 rounded-xl p-1.5 border-2 text-left transition-all cursor-pointer relative ${
                        isSelected
                          ? 'border-[#7C442A] bg-[#FAF5EE] shadow-xs'
                          : compat.isRecommended
                          ? 'border-[#E8DFC8] bg-white hover:border-[#C4B29E]'
                          : 'border-[#EFECE6] bg-[#FAF8F5] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div className="aspect-[3/4] rounded-lg overflow-hidden bg-[#FAF8F5] mb-1.5 relative">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        {compat.isRecommended ? (
                          <span className="absolute top-1 left-1 bg-emerald-600/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                            Hợp
                          </span>
                        ) : (
                          <span className="absolute top-1 left-1 bg-amber-600/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                            Ít hợp
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-semibold text-[#1C140E] line-clamp-1 block">
                        {item.name}
                      </span>
                      <span className="text-[11px] font-bold text-[#872B10] tabular-nums">
                        {formatPrice(item.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Live Outfit Preview & Quick Set Checkout - 5 cols */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-4 sm:p-6 border border-[#E2D6C3] shadow-md space-y-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#872B10] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Bản Phối Của Bạn</span>
              </span>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full tabular-nums border ${
                  harmony.isRecommended
                    ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                    : 'text-amber-800 bg-amber-50 border-amber-200'
                }`}
              >
                Độ hài hòa {harmony.score}%
              </span>
            </div>

            {/* Unified Vertical Outfit Lookbook Canvas (1 Complete Outfit) */}
            <div className="bg-[#F7F3EE] rounded-2xl border border-[#E8DFC8] p-3.5 sm:p-4 relative overflow-hidden">
              <div className="flex flex-col items-center">
                {/* Top Piece */}
                <div className="relative w-44 sm:w-48 h-40 sm:h-44 z-10 -mb-4 flex items-end justify-center">
                  <img
                    src={selectedTop.images[1] || selectedTop.images[0]}
                    alt={selectedTop.name}
                    className="max-w-full max-h-full object-contain drop-shadow-sm mix-blend-multiply"
                  />
                  <button
                    type="button"
                    onClick={() => onQuickView(selectedTop)}
                    className="absolute top-1 right-1 p-1.5 rounded-full bg-white/90 text-[#3B2519] hover:text-[#7C442A] shadow-xs cursor-pointer"
                    title={`Xem chi tiết ${selectedTop.name}`}
                    aria-label={`Xem chi tiết ${selectedTop.name}`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Bottom Piece */}
                <div className="relative w-48 sm:w-52 h-48 sm:h-52 flex items-start justify-center">
                  <img
                    src={selectedBottom.images[1] || selectedBottom.images[0]}
                    alt={selectedBottom.name}
                    className="max-w-full max-h-full object-contain drop-shadow-sm mix-blend-multiply"
                  />
                  <button
                    type="button"
                    onClick={() => onQuickView(selectedBottom)}
                    className="absolute bottom-1 right-1 p-1.5 rounded-full bg-white/90 text-[#3B2519] hover:text-[#7C442A] shadow-xs cursor-pointer"
                    title={`Xem chi tiết ${selectedBottom.name}`}
                    aria-label={`Xem chi tiết ${selectedBottom.name}`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Size Selectors for Each Piece in the Outfit */}
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { item: selectedTop, role: 'Áo', size: topSize, setSize: setTopSize },
                { item: selectedBottom, role: 'Váy / Quần', size: bottomSize, setSize: setBottomSize }
              ].map(({ item, role, size, setSize }) => (
                <div key={item.id + role} className="bg-[#FAF8F5] rounded-xl p-2.5 border border-[#E8DFC8] space-y-1.5">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-bold uppercase text-[#8C6D58]">{role}</span>
                    <span className="text-[11px] font-bold text-[#872B10] tabular-nums">{formatPrice(item.price)}</span>
                  </div>
                  <span className="text-xs font-bold text-[#1C140E] line-clamp-1 block">{item.name}</span>
                  <div className="flex gap-1 pt-0.5">
                    {item.sizes.map((sz) => {
                      const out = (item.sizeStock[sz] ?? 0) === 0;
                      return (
                        <button
                          key={sz}
                          type="button"
                          disabled={out}
                          onClick={() => setSize(sz)}
                          className={`flex-1 py-1 rounded text-[11px] font-bold transition-colors ${
                            out
                              ? 'bg-[#EFECE6] text-[#B5A598] line-through cursor-not-allowed'
                              : size === sz
                              ? 'bg-[#7C442A] text-white cursor-pointer'
                              : 'bg-white text-[#5C4535] border border-[#D5C2AF] hover:border-[#7C442A] cursor-pointer'
                          }`}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Stylist Note */}
            <div
              className={`rounded-xl p-3 border text-xs space-y-1.5 ${
                harmony.isRecommended
                  ? 'bg-[#FAF5EE] border-[#E8DFC8]'
                  : 'bg-amber-50/80 border-amber-200'
              }`}
            >
              <div className={`font-bold flex items-center gap-1.5 ${harmony.isRecommended ? 'text-[#3B2519]' : 'text-amber-900'}`}>
                {!harmony.isRecommended && <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />}
                <span>{harmony.headline}</span>
              </div>
              <p className={`leading-relaxed ${harmony.isRecommended ? 'text-[#5C4535]' : 'text-amber-800'}`}>
                {activeMood ? activeMood.tip : harmony.detail}
              </p>
              {!harmony.isRecommended && harmony.betterBottomId && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedBottomId(harmony.betterBottomId!);
                    setActiveMoodId('');
                  }}
                  className="mt-1 inline-flex items-center gap-1 bg-amber-700 hover:bg-amber-800 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  Đổi sang mẫu hợp hơn
                </button>
              )}
            </div>

            {/* Combo Total & 1-Click Add Both */}
            <div className="pt-2 border-t border-[#E8DFC8] space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-[#664C3B] block">Tổng cả set 2 món</span>
                  {comboTotal >= 499000 && (
                    <span className="text-[11px] font-semibold text-emerald-700">
                      ✓ Đủ điều kiện Freeship toàn quốc + Áp dụng được mã VERA50K
                    </span>
                  )}
                </div>
                <span className="text-xl font-extrabold text-[#872B10] tabular-nums">
                  {formatPrice(comboTotal)}
                </span>
              </div>

              <button
                type="button"
                onClick={handleAddBoth}
                className="w-full bg-[#7C442A] hover:bg-[#68361E] text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer text-sm"
              >
                {addedFeedback ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Đã thêm cả set vào giỏ hàng!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Thêm cả set (Áo {topSize} + Dưới {bottomSize}) vào giỏ</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
