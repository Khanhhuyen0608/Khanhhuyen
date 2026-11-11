import React from 'react';
import { BRAND_INFO } from '../data/brand';
import { Sparkles, Palette, Layers } from 'lucide-react';

interface FabricStoryProps {
  onSelectMaterial: (material: any) => void;
  onSelectPattern: (pattern: any) => void;
}

export const FabricStory: React.FC<FabricStoryProps> = ({
  onSelectMaterial,
  onSelectPattern
}) => {
  return (
    <section className="py-16 bg-[#F5EFEB] border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#872B10] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Triết lý chất liệu & Bảng màu bản sắc</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1C140E]">
            Hơi thở mộc mạc từ Linen, Lụa & Sắc Nâu Đất
          </h2>
          <p className="mt-3 text-sm text-[#4A382C] leading-relaxed">
            Mỗi thiết kế tại VERA đều khởi nguồn từ việc chọn lựa chất vải tự nhiên lành tính, 
            đồng điệu cùng bảng màu cổ điển tôn vinh sắc da phụ nữ Á Đông.
          </p>
        </div>

        {/* 4 Core Materials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {BRAND_INFO.fabrics.map((fabric, idx) => (
            <div
              key={fabric.name}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-[#E0D5C3] shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-[#872B10] tracking-wider uppercase bg-[#F3EBE1] px-2.5 py-1 rounded">
                    {fabric.tag}
                  </span>
                  <div
                    className="w-5 h-5 rounded-full border border-black/10 shadow-inner"
                    style={{ backgroundColor: fabric.color }}
                  ></div>
                </div>

                <h3 className="text-lg font-bold text-[#1C140E] group-hover:text-[#872B10] transition-colors">
                  {fabric.name}
                </h3>
                <p className="mt-2 text-xs text-[#523E30] leading-relaxed">
                  {fabric.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F0E6D8] text-xs text-[#664C3B] font-semibold flex items-center justify-between">
                <span>Bộ sưu tập tự nhiên</span>
                <span className="text-[#872B10] font-bold group-hover:underline">Khám phá →</span>
              </div>
            </div>
          ))}
        </div>

        {/* Two-Column Brand Identity Cards: Color Palette & Vintage Patterns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Palette Card */}
          <div className="bg-[#FAF8F5] rounded-2xl p-6 sm:p-8 border border-[#E0D5C3] shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-[#872B10]">
              <Palette className="w-5 h-5" />
              <h3 className="text-xl font-bold text-[#1C140E]">
                Bảng màu chủ đạo: Kem & Nâu đất
              </h3>
            </div>
            <p className="text-sm text-[#4A382C] leading-relaxed mb-6">
              Lấy cảm hứng từ những trang sách cũ, hạt cà phê rang mộc và ánh nắng chiều, 
              sự phối hợp giữa tone Be/Kem và Nâu gỉ sét mang đến cảm giác an yên, sang trọng.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {BRAND_INFO.colorPalette.map((c) => (
                <div key={c.name} className="flex flex-col items-center text-center p-3 rounded-lg bg-white border border-[#EAE0D2]">
                  <div
                    className="w-10 h-10 rounded-full border border-black/10 shadow-sm mb-2"
                    style={{ backgroundColor: c.hex }}
                  ></div>
                  <div className="text-xs font-bold text-[#1C140E]">{c.viName}</div>
                  <div className="text-xs text-[#664C3B] mt-0.5">{c.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Vintage Patterns Card */}
          <div className="bg-[#FAF8F5] rounded-2xl p-6 sm:p-8 border border-[#E0D5C3] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 text-[#872B10]">
                <Layers className="w-5 h-5" />
                <h3 className="text-xl font-bold text-[#1C140E]">
                  4 Họa tiết Vintage bất hủ
                </h3>
              </div>
              <p className="text-sm text-[#4A382C] leading-relaxed mb-6">
                Những họa tiết không bao giờ lỗi mốt theo dòng chảy thời trang, 
                được VERA ứng dụng tinh tế vào các phom dáng trang phục thường nhật:
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white rounded-lg border border-[#EAE0D2]">
                  <div className="font-bold text-[#3B2519]">1. Chấm bi (Polka Dot)</div>
                  <div className="text-[11px] text-[#7A6453] mt-1">Cổ điển nước Pháp, vui tươi và thanh lịch.</div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-[#EAE0D2]">
                  <div className="font-bold text-[#3B2519]">2. Hoa nhí (Ditsy Floral)</div>
                  <div className="text-[11px] text-[#7A6453] mt-1">Hơi thở đồng nội dịu dàng, trong trẻo.</div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-[#EAE0D2]">
                  <div className="font-bold text-[#3B2519]">3. Ren cao cấp (Lace)</div>
                  <div className="text-[11px] text-[#7A6453] mt-1">Nữ tính, đài các với các hoa văn thêu nổi.</div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-[#EAE0D2]">
                  <div className="font-bold text-[#3B2519]">4. Kẻ caro (Gingham)</div>
                  <div className="text-[11px] text-[#7A6453] mt-1">Mộc mạc, năng động và gần gũi thường nhật.</div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
