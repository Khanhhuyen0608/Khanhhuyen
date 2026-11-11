import React from 'react';
import { Product } from '../types';
import { History, Eye } from 'lucide-react';

interface RecentlyViewedSectionProps {
  products: Product[];
  onQuickView: (product: Product) => void;
}

export const RecentlyViewedSection: React.FC<RecentlyViewedSectionProps> = ({
  products,
  onQuickView
}) => {
  if (products.length < 2) return null;

  return (
    <section
      className="py-8 sm:py-10 bg-[#FAF8F5] border-t border-[#E8DFC8]"
      aria-label="Sản phẩm bạn vừa xem"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-[#7C442A]" />
            <h2 className="text-base sm:text-lg font-bold text-[#1C140E]">
              Sản phẩm bạn vừa xem
            </h2>
          </div>
          <span className="text-xs text-[#7A6453]">
            Bấm để xem lại nhanh
          </span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {products.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => onQuickView(product)}
              className="w-36 sm:w-44 shrink-0 bg-white rounded-xl p-2 border border-[#E8DFC8] hover:border-[#7C442A] shadow-2xs hover:shadow-sm transition-all text-left group cursor-pointer"
            >
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-[#FAF5EE] mb-2">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-1.5 right-1.5 p-1 rounded-full bg-white/90 text-[#3B2519] opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-3 h-3" />
                </span>
              </div>
              <span className="text-xs font-semibold text-[#1C140E] line-clamp-1 block group-hover:text-[#7C442A]">
                {product.name}
              </span>
              <span className="text-xs font-bold text-[#872B10] tabular-nums">
                {product.price.toLocaleString('vi-VN')}₫
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
