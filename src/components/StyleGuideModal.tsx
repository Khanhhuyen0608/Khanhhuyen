import React from 'react';
import { X, BookOpen, Sparkles, Heart, CheckCircle2 } from 'lucide-react';

interface StyleGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProductLook: (productId: string) => void;
}

export const StyleGuideModal: React.FC<StyleGuideModalProps> = ({
  isOpen,
  onClose,
  onSelectProductLook
}) => {
  if (!isOpen) return null;

  const formulas = [
    {
      title: '01. Quý Cô Parisienne Cổ Điển',
      tag: 'Đi làm & Dạo phố',
      combo: 'Áo wrap chấm bi nâu gỉ sét + Chân váy xòe nâu đất nhún eo',
      desc: 'Sự hòa quyện giữa họa tiết chấm bi kinh điển và chân váy linen màu nâu đất tạo nên chiều sâu thị giác ấm áp, tôn dáng tối đa cho vòng eo.',
      shoes: 'Giày búp bê Mary Jane da bóng, túi baguette vintage',
      productId: 'vera-skirt-earth-brown',
      image: '/products/chan_vay_xoe_vintage_nau_dat.png'
    },
    {
      title: '02. Nàng Thơ Tiểu Thư Đầm Ren Hoa',
      tag: 'Hẹn hò & Tiệc trà',
      combo: 'Đầm hai dây cổ vuông ren hoa xòe + Giày Mary Jane ánh bạc',
      desc: 'Chất liệu voan tơ thêu hoa nhí ren trắng bồng bềnh lướt nhẹ theo từng bước chân. Cổ vuông gấp nếp thanh tú cùng tùng xòe midi vintage tôn vinh vóc dáng yêu kiều.',
      shoes: 'Giày búp bê Mary Jane ánh bạc, tất lửng ren trắng',
      productId: 'vera-dress-ditsy-floral',
      image: '/products/dam_hai_day_ren_hoa_midi_flatlay.png'
    },
    {
      title: '03. Tối Giản Mộc Mạc & Phóng Khoáng',
      tag: 'Thường nhật thoải mái',
      combo: 'Áo hai dây ren baby doll + Quần linen ống rộng cạp vạt chéo',
      desc: 'Sự đối lập giữa nét nữ tính mong manh của ren trắng và độ suông rủ tự nhiên của quần linen mang lại thần thái tự tin, thanh tao không cần cố gắng.',
      shoes: 'Giày mule da mềm tone kem sữa hoặc loafer',
      productId: 'vera-trousers-linen-beige',
      image: '/products/quan_linen_ong_rong_be.png'
    },
    {
      title: '04. Phong Thái Sang Trọng Quiet Luxury',
      tag: 'Gặp gỡ & Sự kiện',
      combo: 'Set bộ vest ren thêu hoa & Chân váy chữ A dệt kim',
      desc: 'Được dệt bằng sợi dệt kim hoa nổi 3D, hàng cúc bọc ngọc trai và phom dáng may đo chuẩn mực giúp quý cô rạng rỡ đầy quyền lực nhưng vẫn dịu dàng.',
      shoes: 'Giày cao gót mũi nhọn kitten heels tone be nude',
      productId: 'vera-suit-lace-tweed',
      image: '/products/set_bo_ren_cao_cap_kem.png'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="bg-[#FAF8F5] rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#E0D5C3] relative flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E8DFC8] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#7C442A]" />
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#1C140E]">
                Cẩm Nang Phối Đồ Vintage VERA
              </h2>
              <span className="text-xs text-[#664C3B] font-medium">
                Bí quyết tỏa sáng thần thái tự nhiên trong mọi khoảnh khắc
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#5C4535] hover:text-[#7C442A] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          <div className="bg-[#FAF5EE] p-4 rounded-xl border border-[#E8DFC8] text-sm text-[#4A382C] leading-relaxed">
            <p>
              Phong cách <strong>Vintage for Everyday</strong> của VERA không hướng đến sự cầu kỳ, nặng nề mà tập trung vào: 
              <em>Sự cân bằng bảng màu</em> (Kem, Be, Nâu đất) kết hợp cùng <em>kết cấu vải tự nhiên</em> (Linen mộc, Lụa rủ, Ren nổi). 
              Dưới đây là 4 công thức phối đồ kinh điển nhất:
            </p>
          </div>

          {/* Formulas List */}
          <div className="space-y-4">
            {formulas.map((f, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-4 sm:p-5 border border-[#E8DFC8] shadow-sm flex flex-col sm:flex-row items-center gap-4 hover:border-[#7C442A] transition-colors"
              >
                <div className="w-24 h-28 bg-[#FAF8F5] rounded-lg overflow-hidden border border-[#E8DFC8] shrink-0">
                  <img src={f.image} alt={f.title} className="w-full h-full object-contain p-1" />
                </div>

                <div className="flex-1 space-y-1.5 text-xs text-left">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#1C140E]">{f.title}</span>
                    <span className="bg-[#F5EFEB] text-[#872B10] font-bold text-xs px-2.5 py-0.5 rounded">
                      {f.tag}
                    </span>
                  </div>

                  <div className="font-bold text-[#872B10]">
                    Công thức: {f.combo}
                  </div>

                  <p className="text-[#4A382C] leading-relaxed text-xs">
                    {f.desc}
                  </p>

                  <div className="text-xs text-[#664C3B]">
                    <strong>Phụ kiện gợi ý:</strong> {f.shoes}
                  </div>

                  <div className="pt-1">
                    <button
                      onClick={() => {
                        onSelectProductLook(f.productId);
                        onClose();
                      }}
                      className="text-[#7C442A] font-bold underline hover:text-[#5A2F1F] text-xs cursor-pointer"
                    >
                      Xem chi tiết sản phẩm chủ đạo →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
