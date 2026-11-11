import React from 'react';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted
}) => {
  const [selectedColorIdx, setSelectedColorIdx] = React.useState(0);
  const activeVariant = product.colorVariants?.[selectedColorIdx];
  const displayImages = activeVariant ? activeVariant.images : product.images;
  const displayColorName = activeVariant ? activeVariant.name : product.colorName;

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + '₫';
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <article className="group bg-white rounded-xl overflow-hidden border border-[#E8DFC8] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      
      {/* Product Image Slot */}
      <div
        onClick={() => onQuickView(product)}
        className="relative aspect-[3/4] bg-[#FAF8F5] overflow-hidden cursor-pointer"
      >
        {/* Primary Image: On-Model Lookbook */}
        <img
          src={displayImages[0]}
          alt={product.seoAlt}
          className={`w-full h-full object-contain p-2 sm:p-4 transition-all duration-500 ${
            displayImages.length > 1
              ? 'group-hover:opacity-0 group-hover:scale-105'
              : 'group-hover:scale-105'
          }`}
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Secondary Image: Garment & Lace Detail (Smooth Crossfade on Hover) */}
        {displayImages.length > 1 && (
          <img
            src={displayImages[1]}
            alt={`${product.seoAlt} - chi tiết đường may và chất ren`}
            className="w-full h-full object-contain p-2 sm:p-4 absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        )}

        {/* 2-Angle Badge Indicator */}
        {displayImages.length > 1 && (
          <div className="absolute bottom-3 right-3 opacity-90 group-hover:opacity-0 transition-opacity bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 pointer-events-none">
            <span>2 góc ảnh</span>
          </div>
        )}

        {/* Hover Tip Badge */}
        {product.images.length > 1 && (
          <div className="absolute top-3 right-12 opacity-0 group-hover:opacity-100 transition-opacity bg-[#7C442A] text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-md pointer-events-none">
            Ảnh chụp sản phẩm & ren
          </div>
        )}

        {/* Quiet badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          {product.isBestSeller && (
            <span className="bg-[#7C442A] text-white text-[11px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded shadow-sm">
              Bán Chạy
            </span>
          )}
          {product.isNewArrival && !product.isBestSeller && (
            <span className="bg-[#5C4535] text-white text-[11px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded shadow-sm">
              Mới Về
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-[#A8583B] text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-sm">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
            isWishlisted
              ? 'bg-white text-[#A8583B] shadow-md'
              : 'bg-white/80 text-[#5C4535] hover:bg-white hover:text-[#A8583B] shadow-sm'
          }`}
          aria-label={isWishlisted ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
          title={isWishlisted ? 'Bỏ yêu thích' : 'Lưu sản phẩm yêu thích'}
        >
          <Heart className="w-4 h-4" fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Quick View Hover Overlay */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
          <button
            onClick={() => onQuickView(product)}
            className="flex-1 bg-white/95 hover:bg-white text-[#3B2519] text-xs font-semibold py-2.5 px-3 rounded-lg shadow-md border border-[#D5C2AF] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#7C442A]" />
            <span>Xem nhanh</span>
          </button>
          
          <button
            onClick={() => onAddToCart(product)}
            className="bg-[#7C442A] hover:bg-[#68361E] text-white text-xs font-semibold p-2.5 rounded-lg shadow-md flex items-center justify-center transition-all cursor-pointer"
            title="Thêm vào giỏ"
            aria-label="Thêm nhanh vào giỏ"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Content & Typography */}
      <div className="p-2.5 sm:p-4 flex flex-col flex-1 justify-between min-w-0">
        <div className="min-w-0">
          {/* Metadata: Category & Material with high-contrast text */}
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11px] sm:text-xs text-[#664C3B] mb-1 sm:mb-1.5 font-semibold">
            <span>{product.categoryName}</span>
            <span aria-hidden="true" className="text-[#A89382]">·</span>
            <span className="truncate">{product.materialName}</span>
          </div>

          {/* Product Title: Crisp, bold, highly legible sans-serif */}
          <h3
            onClick={() => onQuickView(product)}
            className="text-[13px] sm:text-[15px] font-semibold text-[#1C140E] line-clamp-2 hover:text-[#872B10] transition-colors cursor-pointer leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Social Proof: High-contrast rating and sold count */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#523E30] mt-1.5 sm:mt-2 font-medium">
            <div className="flex items-center text-amber-600">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
              <span className="ml-0.5 sm:ml-1 font-bold text-[11px] sm:text-xs text-[#1C140E]">{product.rating}</span>
            </div>
            <span aria-hidden="true" className="text-[#A89382]">·</span>
            <span>Đã bán <strong className="text-[#1C140E] font-semibold">{product.soldCount}</strong></span>
          </div>

          {/* Color Variants Swatches on Card */}
          {product.colorVariants && product.colorVariants.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <span className="text-[11px] sm:text-xs text-[#664C3B] font-medium">{product.colorVariants.length} màu:</span>
              <div className="flex items-center gap-1.5">
                {product.colorVariants.map((c, idx) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedColorIdx(idx);
                    }}
                    className={`w-4 h-4 rounded-full border transition-all cursor-pointer ${
                      selectedColorIdx === idx
                        ? 'ring-2 ring-[#872B10] ring-offset-1 scale-110 border-white'
                        : 'border-black/20 hover:scale-105 opacity-85 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: c.colorHex }}
                    title={c.name}
                    aria-label={c.name}
                  />
                ))}
              </div>
              <span className="text-[11px] sm:text-xs text-[#872B10] font-semibold truncate max-w-full">
                {displayColorName.split('(')[0].trim()}
              </span>
            </div>
          )}
        </div>

        {/* Price & Purchase Action baseline - Responsive so nothing clips on mobile */}
        <div className="mt-3 pt-2.5 sm:pt-3 border-t border-[#F0E6D8] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5 flex-wrap min-w-0">
            <span className="font-bold text-sm sm:text-lg text-[#872B10] tabular-nums tracking-tight">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] sm:text-sm font-medium text-[#7D695A] line-through tabular-nums">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="w-full sm:w-auto justify-center text-xs font-bold text-[#872B10] bg-[#FAF3ED] hover:bg-[#872B10] hover:text-white px-2.5 sm:px-3 py-1.5 rounded-lg border border-[#E8D6C6] transition-all flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>Thêm giỏ</span>
            <span aria-hidden="true">+</span>
          </button>
        </div>

      </div>

    </article>
  );
};
