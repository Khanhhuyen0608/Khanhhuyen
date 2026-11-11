import React, { useState } from 'react';
import { POLICY_ITEMS, PolicyItem } from '../data/policies';
import { PolicyModal, getPolicyIcon } from './PolicyModal';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export const CustomerPoliciesSection: React.FC = () => {
  const [activePolicy, setActivePolicy] = useState<PolicyItem | null>(null);

  return (
    <section
      id="customer-policies"
      className="py-10 sm:py-14 bg-[#F5EFE6] border-t border-[#E8DFC8]"
      aria-label="Chính sách và hỗ trợ khách hàng VERA"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#872B10] mb-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Trải Nghiệm Mua Sắm An Tâm</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1C140E] tracking-tight">
            Chính Sách &amp; Hỗ Trợ Khách Hàng
          </h2>
          <p className="text-xs sm:text-sm text-[#4A382C] mt-1.5 leading-relaxed">
            Mọi quyền lợi đổi trả, bảo hành đường may, hướng dẫn chăm sóc chất liệu tự nhiên và đặc quyền hội viên VERA đều được công khai minh bạch.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
          {POLICY_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActivePolicy(item)}
              className="group bg-[#FAF8F5] hover:bg-white rounded-2xl p-4 sm:p-5 border border-[#E2D6C3] hover:border-[#7C442A] shadow-2xs hover:shadow-md transition-all text-left flex flex-col justify-between gap-3 cursor-pointer"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="w-10 h-10 rounded-xl bg-[#EFE7DA] group-hover:bg-[#FAF5EE] border border-[#E2D6C3] flex items-center justify-center shrink-0 transition-colors">
                    {getPolicyIcon(item.id)}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#872B10] bg-[#FBEAE4] px-2.5 py-1 rounded-full">
                    {item.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#1C140E] group-hover:text-[#7C442A] transition-colors">
                    {item.shortTitle}
                  </h3>
                  <p className="text-xs text-[#5C4535] mt-1 leading-relaxed line-clamp-2">
                    {item.summary}
                  </p>
                </div>
              </div>

              <div className="pt-2.5 border-t border-[#EAE0D2] flex items-center justify-between text-xs font-semibold text-[#7C442A]">
                <span>{item.isMembership ? 'Đăng ký nhận mã 50K' : 'Xem chi tiết chính sách'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <PolicyModal policy={activePolicy} onClose={() => setActivePolicy(null)} />
    </section>
  );
};
