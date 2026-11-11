import React, { useState, useEffect } from 'react';
import { PolicyItem } from '../data/policies';
import { X, CheckCircle2, RefreshCw, Sparkles, Shirt, Truck, Lock, Crown } from 'lucide-react';

interface PolicyModalProps {
  policy: PolicyItem | null;
  onClose: () => void;
}

export function getPolicyIcon(id: string) {
  switch (id) {
    case 'return':
      return <RefreshCw className="w-5 h-5 text-[#7C442A]" />;
    case 'warranty':
      return <Sparkles className="w-5 h-5 text-[#7C442A]" />;
    case 'care':
      return <Shirt className="w-5 h-5 text-[#7C442A]" />;
    case 'shipping':
      return <Truck className="w-5 h-5 text-[#7C442A]" />;
    case 'privacy':
      return <Lock className="w-5 h-5 text-[#7C442A]" />;
    default:
      return <Crown className="w-5 h-5 text-[#7C442A]" />;
  }
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ policy, onClose }) => {
  const [clubContact, setClubContact] = useState('');
  const [clubJoined, setClubJoined] = useState(false);

  useEffect(() => {
    setClubJoined(false);
    setClubContact('');
  }, [policy?.id]);

  if (!policy) return null;

  const handleJoinClub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clubContact.trim()) return;
    setClubJoined(true);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FAF8F5] rounded-2xl max-w-lg w-full max-h-[90dvh] flex flex-col overflow-hidden shadow-2xl border border-[#E0D5C3]"
        role="dialog"
        aria-label={policy.title}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-white border-b border-[#E8DFC8] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-[#FAF5EE] border border-[#E8DFC8] flex items-center justify-center shrink-0">
              {getPolicyIcon(policy.id)}
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#872B10] block">
                {policy.badge}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-[#1C140E] leading-snug">
                {policy.title}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-[#5C4535] hover:bg-[#F3EBE1] transition-colors cursor-pointer shrink-0"
            aria-label="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#4A382C] leading-relaxed">
          <p className="font-medium text-[#3B2519]">
            {policy.summary}
          </p>

          <ul className="space-y-2.5 bg-white p-4 rounded-xl border border-[#E8DFC8]">
            {policy.points.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#7C442A] shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {policy.note && (
            <div className="bg-[#FAF5EE] border border-[#E8DFC8] rounded-xl p-3 text-xs text-[#664C3B]">
              <strong className="text-[#3B2519]">Lưu ý:</strong> {policy.note}
            </div>
          )}

          {policy.isMembership && (
            <div className="bg-white border border-[#D5C2AF] rounded-xl p-4">
              {clubJoined ? (
                <div className="text-center py-2 space-y-1.5">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <p className="font-bold text-[#1C140E] text-sm">
                    Chào mừng bạn gia nhập VERA Radiant Club!
                  </p>
                  <p className="text-xs text-[#5C4535]">
                    Mã ưu đãi <strong className="text-[#872B10]">VERA50K</strong> đã sẵn sàng để áp dụng cho đơn hàng đầu tiên của bạn.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleJoinClub} className="space-y-2.5">
                  <label className="block text-xs font-bold text-[#3B2519]">
                    Đăng ký nhanh qua Email hoặc Số điện thoại:
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      required
                      value={clubContact}
                      onChange={(e) => setClubContact(e.target.value)}
                      placeholder="Nhập email hoặc SĐT của bạn..."
                      className="flex-1 text-xs bg-[#FAF8F5] border border-[#D5C2AF] focus:border-[#7C442A] rounded-lg px-3 py-2.5 outline-none text-[#1C140E]"
                    />
                    <button
                      type="submit"
                      className="bg-[#7C442A] hover:bg-[#68361E] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer shrink-0"
                    >
                      Đăng ký ngay
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="px-5 py-3.5 bg-white border-t border-[#E8DFC8] flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="bg-[#7C442A] hover:bg-[#68361E] text-white text-xs font-semibold px-5 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Đã hiểu
          </button>
        </div>
      </div>
    </div>
  );
};
