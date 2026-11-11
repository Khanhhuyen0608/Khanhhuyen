import React, { useState } from 'react';
import { BRAND_INFO } from '../data/brand';
import { POLICY_ITEMS, PolicyItem } from '../data/policies';
import { PolicyModal } from './PolicyModal';
import { ChevronDown, ChevronUp, MapPin, Phone, Clock, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activePolicy, setActivePolicy] = useState<PolicyItem | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleOpenPolicy = (item: PolicyItem) => {
    setActivePolicy(item);
  };

  return (
    <footer className="bg-[#2D2118] text-[#EFE7DE] pt-16 pb-12 border-t border-[#3E2F23]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Frequently Asked Questions (SEO FAQs) */}
        <div className="mb-14 pb-12 border-b border-[#443326]">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[11px] font-bold text-[#D5B295] uppercase tracking-widest">
              Hỗ Trợ Quý Khách
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">
              Câu Hỏi Thường Gặp (FAQ)
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {BRAND_INFO.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#382B21] rounded-xl border border-[#4E3D30] overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-white hover:text-[#D5B295] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-[#D5B295] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#A89382] shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-[#D5C2AF] leading-relaxed border-t border-[#4E3D30]/60 pt-3 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Middle Section: 4 Columns Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-[#443326]">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#8C6D58] bg-[#3B2B1F] flex items-center justify-center">
                <span className="font-bold text-lg text-[#E8DFC8]">V</span>
              </div>
              <div>
                <span className="text-xl font-bold tracking-wider text-white">VERA</span>
                <div className="text-[9px] tracking-[0.2em] uppercase text-[#B89B85]">Vintage for Everyday</div>
              </div>
            </div>

            <p className="text-xs text-[#C4B2A1] leading-relaxed">
              <strong>Valuing Every Radiant Aura</strong> — Trân trọng từng thần thái rạng rỡ. 
              Thương hiệu thời trang thiết kế kết hợp tinh hoa nét đẹp cổ điển Vintage và sự tiện dụng của trang phục thường nhật.
            </p>

            <div className="text-xs text-[#B89B85] space-y-1">
              <div>Mã số doanh nghiệp: <strong>0318291048</strong></div>
              <div>Nơi cấp: Sở Kế hoạch & Đầu tư TP. Hồ Chí Minh</div>
            </div>

            {/* Ministry of Industry and Trade certification badge */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#3A2C20] border border-[#523F30] text-[11px] text-[#E0D5C7]">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Đã thông báo Bộ Công Thương</span>
              </div>
            </div>
          </div>

          {/* Showroom System (3 cols) */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Hệ Thống Cửa Hàng
            </h3>
            {BRAND_INFO.showrooms.map((sh, idx) => (
              <div key={idx} className="p-3 bg-[#382B21] rounded-lg border border-[#4A392C] space-y-1">
                <div className="font-bold text-[#E8DFC8] flex items-center gap-1.5 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-[#D5B295]" />
                  <span>{sh.city}</span>
                </div>
                <div className="text-[#C4B2A1] text-xs leading-relaxed">{sh.address}</div>
                <div className="text-xs text-[#B89B85] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{sh.hours}</span>
                </div>
                <div className="text-xs text-[#B89B85] flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  <span>Hotline: <strong className="text-white font-semibold">{sh.phone}</strong></span>
                </div>
              </div>
            ))}
          </div>

          {/* Customer Care & Policies (3 cols) */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Chính Sách & Hỗ Trợ
            </h3>
            <ul className="space-y-2 text-[#C4B2A1] text-xs">
              {POLICY_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleOpenPolicy(item)}
                    className="text-left hover:text-white hover:underline underline-offset-4 transition-colors cursor-pointer flex items-start gap-1.5"
                  >
                    <span aria-hidden="true">·</span>
                    <span>{item.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment & Logistics Partners (2 cols) */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Thanh Toán & Vận Chuyển
            </h3>
            <div className="space-y-2 text-[#C4B2A1] text-xs">
              <div className="font-medium">Phương thức thanh toán:</div>
              <div className="flex flex-wrap gap-1.5">
                <span className="bg-[#3A2C20] border border-[#523F30] text-[#E8DFC8] px-2 py-0.5 rounded text-xs font-semibold">COD</span>
                <span className="bg-[#3A2C20] border border-[#523F30] text-[#E8DFC8] px-2 py-0.5 rounded text-xs font-semibold">VietQR</span>
                <span className="bg-[#3A2C20] border border-[#523F30] text-[#E8DFC8] px-2 py-0.5 rounded text-xs font-semibold">VNPAY</span>
                <span className="bg-[#3A2C20] border border-[#523F30] text-[#E8DFC8] px-2 py-0.5 rounded text-xs font-semibold">Visa/Master</span>
              </div>

              <div className="pt-2 font-medium">Đối tác giao nhận:</div>
              <div className="flex flex-wrap gap-1.5">
                <span className="bg-[#3A2C20] border border-[#523F30] text-[#E8DFC8] px-2 py-0.5 rounded text-xs font-semibold">GHTK</span>
                <span className="bg-[#3A2C20] border border-[#523F30] text-[#E8DFC8] px-2 py-0.5 rounded text-xs font-semibold">GHN</span>
                <span className="bg-[#3A2C20] border border-[#523F30] text-[#E8DFC8] px-2 py-0.5 rounded text-xs font-semibold">VNPost</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#9E8775] gap-4">
          <div>
            © {new Date().getFullYear()} VERA - Vintage for Everyday. Bản quyền thuộc về VERA Fashion.
          </div>

          <div className="flex items-center gap-1 text-[11px]">
            <span>Được thiết kế với sự tỉ mỉ & trân trọng nét đẹp phụ nữ Á Đông</span>
            <Heart className="w-3.5 h-3.5 text-[#C47D62] fill-current" />
          </div>
        </div>

      </div>

      {/* Policy & Membership Detail Modal */}
      <PolicyModal policy={activePolicy} onClose={() => setActivePolicy(null)} />
    </footer>
  );
};
