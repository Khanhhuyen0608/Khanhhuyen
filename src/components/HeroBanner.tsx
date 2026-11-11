import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Feather, RefreshCw } from 'lucide-react';

interface HeroBannerProps {
  onExploreClick: () => void;
  onVoucherClick: () => void;
  onStyleGuideClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreClick,
  onVoucherClick,
  onStyleGuideClick
}) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF6F0] border-b border-[#E8DFC8]">
      {/* Subtle organic background textures */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#C4A482_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Brand Story & Call to Action (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tagline / Subtitle */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#7C442A] uppercase">
              <span className="w-8 h-[1px] bg-[#7C442A]"></span>
              <span>Valuing Every Radiant Aura</span>
            </div>

            {/* Main H1 for Technical SEO */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1C140E] leading-[1.2] tracking-tight">
              Trân trọng từng <br />
              <span className="text-[#872B10] font-extrabold">thần thái rạng rỡ</span> của bạn.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#3D2C20] max-w-xl leading-relaxed">
              VERA định nghĩa lại thời trang thường nhật (Daily Basic) bằng nét chấm phá Vintage cổ điển: 
              từ những chiếc <strong>chân váy xòe nâu đất</strong>, <strong>áo kiểu wrap ren chấm bi</strong>, 
              đến <strong>đầm hoa nhí bồng bềnh</strong> dệt trên nền chất liệu <strong>Linen, Cotton và Lụa tự nhiên</strong>.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreClick}
                className="bg-[#7C442A] hover:bg-[#68361E] text-white px-7 py-3.5 rounded-full font-bold text-sm sm:text-base flex items-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer group"
              >
                <span>Xem bộ sưu tập ngay</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onVoucherClick}
                className="bg-transparent hover:bg-[#F0E6D8] text-[#872B10] border-2 border-[#872B10] px-6 py-3.5 rounded-full font-bold text-sm sm:text-base transition-colors cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#872B10]" />
                <span>Nhận voucher 50.000₫</span>
              </button>
            </div>

            {/* Brand Commitments Bar */}
            <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#E8DFC8]/70 text-xs text-[#3D2C20]">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-full bg-[#EFE8DC] text-[#872B10] shrink-0">
                  <Feather className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#1C140E]">100% Sợi Tự Nhiên</div>
                  <div className="text-xs text-[#523E30] mt-0.5 font-medium">Linen, Cotton, Lụa dịu lành</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-full bg-[#EFE8DC] text-[#872B10] shrink-0">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#1C140E]">Đổi Trả 7 Ngày</div>
                  <div className="text-xs text-[#523E30] mt-0.5 font-medium">Hỗ trợ đổi size tận nhà</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-full bg-[#EFE8DC] text-[#872B10] shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#1C140E]">Đồng Kiểm Trước Trả</div>
                  <div className="text-xs text-[#523E30] mt-0.5 font-medium">Kiểm hàng đúng 100% ảnh</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Campaign Collage (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Back Card: Styled Vintage Atmosphere */}
              <div className="rounded-2xl overflow-hidden shadow-lg border border-[#D5C2AF] bg-[#FAF8F5] p-3 transition-transform hover:-translate-y-1">
                <div className="relative aspect-[300/392] w-full rounded-xl overflow-hidden bg-[#FAF6F0] flex items-center justify-center">
                  <img
                    src="/products/dam_hoa_nhi_dao_pho_retro.png"
                    alt="đầm hoa nhí dạo phố retro VERA phong cách vintage pháp màu kem nguyên hình người mẫu"
                    className="w-full h-full object-contain object-top block transform hover:scale-102 transition-transform duration-500"
                    loading="eager"
                  />
                </div>

                {/* Clear message banner: Completely unobstructed */}
                <div className="pt-3 pb-1 px-1 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#7C442A] font-bold block">
                      Lookbook Mùa Mới
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-[#1C140E] mt-0.5 leading-snug">
                      Thanh lịch trong từng nhịp thở thường nhật
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-[#872B10] bg-[#F5EFEB] px-2.5 py-1 rounded-md border border-[#E8DFC8] shrink-0">
                    BST Thu Đông
                  </span>
                </div>
              </div>

              {/* Redesigned Mini Product Highlight (Placed cleanly below, zero overlap) */}
              <div
                onClick={onExploreClick}
                className="mt-3.5 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-md border border-[#E8DFC8] flex items-center justify-between gap-3 cursor-pointer hover:border-[#7C442A] hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src="/products/dam_hai_day_ren_hoa_midi_flatlay.png"
                    alt="đầm midi hai dây cổ vuông ren hoa xòe bồng VERA"
                    className="w-12 h-14 object-contain rounded-lg bg-[#FAF6F0] p-1 border border-[#E8DFC8] shrink-0"
                  />
                  <div>
                    <div className="text-[10px] uppercase font-bold text-[#7C442A] tracking-wider">
                      Sản phẩm tiêu biểu
                    </div>
                    <div className="text-xs font-semibold text-[#3B2519] line-clamp-1 group-hover:text-[#7C442A] transition-colors">
                      Đầm midi hai dây ren hoa
                    </div>
                    <div className="text-xs font-bold text-[#7C442A] mt-0.5 tabular-nums">
                      470.000₫ <span className="line-through text-[10px] text-gray-400 font-normal">540.000₫</span>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] font-semibold text-[#7C442A] bg-[#FAF5EE] group-hover:bg-[#7C442A] group-hover:text-white px-2.5 py-1.5 rounded-lg border border-[#E8DFC8] transition-colors whitespace-nowrap shrink-0">
                  Xem ngay →
                </div>
              </div>

              {/* Floating Monogram Stamp */}
              <div className="absolute -top-3 right-1 sm:-top-4 sm:-right-4 bg-[#7C442A] text-[#FAF6F0] w-14 h-14 sm:w-16 sm:h-16 rounded-full flex flex-col items-center justify-center shadow-lg border-2 border-white rotate-12">
                <span className="text-[11px] sm:text-xs font-bold tracking-wider">VERA</span>
                <span className="text-[8px] sm:text-[9px] tracking-tight font-medium">VINTAGE</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
