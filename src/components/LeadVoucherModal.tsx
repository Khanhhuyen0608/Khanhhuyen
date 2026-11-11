import React, { useState } from 'react';
import { X, Sparkles, Check, Copy, ArrowRight, Tag } from 'lucide-react';

interface LeadVoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyCode: (code: string) => void;
  onCopyText: (text: string, msg: string) => void;
}

export const LeadVoucherModal: React.FC<LeadVoucherModalProps> = ({
  isOpen,
  onClose,
  onApplyCode,
  onCopyText
}) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    onApplyCode('VERA50K');
  };

  const handleCopy = () => {
    onCopyText('VERA50K', 'Đã sao chép mã VERA50K vào bộ nhớ tạm!');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="bg-[#FAF8F5] rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-[#E0D5C3] p-6 sm:p-8 relative text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#5C4535] hover:text-[#7C442A] rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Laurel Monogram Icon */}
            <div className="w-14 h-14 rounded-full bg-[#F5EFEB] border border-[#D5C2AF] text-[#7C442A] flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Sparkles className="w-6 h-6" />
            </div>

            <span className="text-[11px] font-bold text-[#7C442A] tracking-widest uppercase">
              Valuing Every Radiant Aura
            </span>

            <h2 className="text-2xl font-bold text-[#1C140E] mt-1 mb-2">
              Tặng Bạn Voucher 50.000₫
            </h2>

            <p className="text-sm text-[#4A382C] leading-relaxed mb-6">
              Đăng ký nhận cẩm nang thời trang Vintage & mã ưu đãi <strong className="text-[#872B10]">50.000₫</strong> áp dụng ngay cho đơn hàng đầu tiên từ 399K tại VERA.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email của bạn (VD: nangtho@gmail.com)"
                  className="w-full text-sm bg-white border border-[#D5C2AF] rounded-xl px-4 py-3 outline-none focus:border-[#7C442A] shadow-inner text-[#1C140E] placeholder:text-[#A89382]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#7C442A] hover:bg-[#68361E] text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer text-sm"
              >
                <span>Nhận mã ưu đãi ngay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-4 text-xs text-[#664C3B] font-medium">
              Cam kết không gửi thư rác · Hủy đăng ký bất kỳ lúc nào.
            </div>
          </div>
        ) : (
          <div className="animate-fadeIn py-2">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3 shadow-sm">
              <Check className="w-7 h-7" />
            </div>

            <h2 className="text-2xl font-bold text-[#1C140E] mb-1">
              Tuyệt Vời! Mã Của Bạn Là:
            </h2>

            <p className="text-sm text-[#4A382C] mb-4">
              Mã đã được kích hoạt tự động vào giỏ hàng của bạn.
            </p>

            {/* Voucher Code Box */}
            <div className="p-4 bg-white rounded-xl border-2 border-dashed border-[#7C442A] flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-[#872B10]" />
                <span className="text-2xl font-extrabold text-[#872B10] tracking-wider">
                  VERA50K
                </span>
              </div>

              <button
                onClick={handleCopy}
                className="bg-[#FAF5EE] hover:bg-[#EFE5D9] text-[#7C442A] text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#D5C2AF] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopied ? 'Đã chép' : 'Sao chép'}</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-[#7C442A] hover:bg-[#68361E] text-white font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all cursor-pointer"
            >
              Bắt đầu sắm đồ Vintage ngay
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
