import React from 'react';
import { Product } from '../types';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistedProducts: Product[];
  onAddToCart: (product: Product) => void;
  onRemoveWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistedProducts,
  onAddToCart,
  onRemoveWishlist,
  onQuickView
}) => {
  if (!isOpen) return null;

  const formatPrice = (v: number) => v.toLocaleString('vi-VN') + '₫';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="bg-[#FAF8F5] rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E0D5C3] p-6 relative max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="pb-4 border-b border-[#E8DFC8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#A8583B] fill-current" />
            <h2 className="text-lg font-bold text-[#1C140E]">
              Sản Phẩm Bạn Đã Lưu ({wishlistedProducts.length})
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#5C4535] hover:text-[#7C442A] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="overflow-y-auto py-4 flex-1 space-y-3">
          {wishlistedProducts.length > 0 ? (
            wishlistedProducts.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between gap-3 bg-white p-3 rounded-xl border border-[#E8DFC8] shadow-sm"
              >
                <div
                  onClick={() => {
                    onQuickView(p);
                    onClose();
                  }}
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <img
                    src={p.images[0]}
                    alt={p.seoAlt}
                    className="w-14 h-16 object-contain bg-[#FAF8F5] rounded-lg p-1 border border-[#E8DFC8]"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-[#1C140E] line-clamp-1 hover:text-[#872B10]">
                      {p.name}
                    </h3>
                    <div className="text-xs text-[#664C3B] mt-0.5 font-medium">
                      {p.materialName} · {p.colorName}
                    </div>
                    <div className="text-sm font-bold text-[#872B10] tabular-nums mt-1">
                      {formatPrice(p.price)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onAddToCart(p);
                    }}
                    className="bg-[#7C442A] hover:bg-[#68361E] text-white text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Thêm giỏ</span>
                  </button>

                  <button
                    onClick={() => onRemoveWishlist(p)}
                    className="p-2 text-[#A89382] hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                    title="Bỏ lưu"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Heart className="w-12 h-12 text-[#D5C2AF] mx-auto mb-3" />
              <p className="text-sm font-semibold text-[#3B2519]">
                Bạn chưa lưu sản phẩm nào
              </p>
              <p className="text-xs text-[#8C6D58] mt-1">
                Bấm vào biểu tượng trái tim trên các sản phẩm bạn yêu thích để xem lại sau nhé.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
