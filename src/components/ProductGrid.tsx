import React from 'react';
import { Product, ProductCategory, PatternType, MaterialType, ColorTone, FilterState } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, RotateCcw, Sparkles } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  filterState: FilterState;
  onFilterChange: (updates: Partial<FilterState>) => void;
  onResetFilters: () => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  filterState,
  onFilterChange,
  onResetFilters,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds
}) => {
  const categories: { key: ProductCategory; label: string }[] = [
    { key: 'all', label: 'Tất cả' },
    { key: 'blouse', label: 'Áo kiểu' },
    { key: 'skirt', label: 'Chân váy' },
    { key: 'dress', label: 'Đầm thiết kế' },
    { key: 'suit', label: 'Set bộ' },
    { key: 'trousers', label: 'Quần ống rộng' }
  ];

  const getCategoryCount = (key: ProductCategory) =>
    key === 'all' ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === key).length;

  const patterns: { key: PatternType; label: string }[] = [
    { key: 'all', label: 'Mọi họa tiết' },
    { key: 'lace', label: 'Ren thêu' },
    { key: 'polka_dot', label: 'Chấm bi' },
    { key: 'plaid', label: 'Kẻ caro' },
    { key: 'solid', label: 'Trơn basic' }
  ];

  const materials: { key: MaterialType; label: string }[] = [
    { key: 'all', label: 'Mọi chất liệu' },
    { key: 'linen', label: '100% Linen' },
    { key: 'cotton', label: 'Cotton hữu cơ' },
    { key: 'silk', label: 'Lụa Satin' },
    { key: 'knitwear', label: 'Dệt kim cao cấp' }
  ];

  const colorTones: { key: ColorTone; label: string }[] = [
    { key: 'all', label: 'Mọi tông màu' },
    { key: 'cream_beige', label: 'Be & Kem' },
    { key: 'rust_brown', label: 'Nâu đất & Gỉ sét' },
    { key: 'white_ivory', label: 'Trắng ngà' },
    { key: 'charcoal_black', label: 'Xám than' }
  ];

  const sortOptions = [
    { value: 'featured', label: 'Nổi bật nhất' },
    { value: 'popular', label: 'Bán chạy nhất' },
    { value: 'newest', label: 'Mới về' },
    { value: 'price-asc', label: 'Giá: Thấp đến cao' },
    { value: 'price-desc', label: 'Giá: Cao đến thấp' }
  ];

  const isFiltered =
    filterState.category !== 'all' ||
    filterState.pattern !== 'all' ||
    filterState.material !== 'all' ||
    filterState.colorTone !== 'all' ||
    filterState.searchQuery.trim() !== '';

  return (
    <section id="collection-grid" className="py-10 sm:py-12 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Title & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#E8DFC8] gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#872B10] mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Thiết kế độc quyền VERA</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C140E] tracking-tight">
              Bộ Sưu Tập Daily Basic Cổ Điển
            </h2>
            <p className="text-sm text-[#4A382C] mt-1.5">
              Chắt lọc tinh hoa phong cách Vintage nhẹ nhàng, thanh lịch và trường tồn với thời gian.
            </p>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs text-[#7A6453] whitespace-nowrap">Sắp xếp:</span>
            <select
              value={filterState.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
              className="text-xs font-medium text-[#3B2519] bg-white border border-[#D5C2AF] rounded-lg px-3 py-2 outline-none focus:border-[#7C442A] cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Primary Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {categories.map((cat) => {
            const isActive = filterState.category === cat.key;
            const count = getCategoryCount(cat.key);
            return (
              <button
                key={cat.key}
                onClick={() => onFilterChange({ category: cat.key })}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#7C442A] text-white shadow-sm'
                    : 'bg-[#F2ECE1] text-[#5C4535] hover:bg-[#EAE0D2]'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[11px] font-bold tabular-nums px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#E5DBCA] text-[#5C4535]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Multi-Dimensional Filter Controls (Pattern, Material, Color) */}
        <div className="bg-[#FAF5EE] rounded-xl p-3 sm:p-4 mb-6 sm:mb-8 border border-[#E8DFC8] flex flex-col sm:flex-row sm:flex-wrap sm:items-center justify-between gap-3 sm:gap-4">
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <div className="col-span-2 sm:col-span-1 flex items-center gap-1.5 text-xs font-semibold text-[#5C4535] mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#7C442A]" />
              <span>Bộ lọc:</span>
            </div>

            {/* Pattern Filter */}
            <select
              value={filterState.pattern}
              onChange={(e) => onFilterChange({ pattern: e.target.value as any })}
              className="w-full sm:w-auto text-xs text-[#3B2519] bg-white border border-[#D5C2AF] rounded-md px-2.5 py-2 sm:py-1.5 outline-none focus:border-[#7C442A] cursor-pointer"
            >
              {patterns.map((p) => (
                <option key={p.key} value={p.key}>
                  {p.label}
                </option>
              ))}
            </select>

            {/* Material Filter */}
            <select
              value={filterState.material}
              onChange={(e) => onFilterChange({ material: e.target.value as any })}
              className="w-full sm:w-auto text-xs text-[#3B2519] bg-white border border-[#D5C2AF] rounded-md px-2.5 py-2 sm:py-1.5 outline-none focus:border-[#7C442A] cursor-pointer"
            >
              {materials.map((m) => (
                <option key={m.key} value={m.key}>
                  {m.label}
                </option>
              ))}
            </select>

            {/* Color Filter */}
            <select
              value={filterState.colorTone}
              onChange={(e) => onFilterChange({ colorTone: e.target.value as any })}
              className="col-span-2 sm:col-span-1 w-full sm:w-auto text-xs text-[#3B2519] bg-white border border-[#D5C2AF] rounded-md px-2.5 py-2 sm:py-1.5 outline-none focus:border-[#7C442A] cursor-pointer"
            >
              {colorTones.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters CTA if active */}
          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="text-xs text-[#7C442A] hover:text-[#5A2F1F] font-semibold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Xóa bộ lọc</span>
            </button>
          )}
        </div>

        {/* Filter Summary & Count */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-[#523E30] mb-6 font-medium">
          <div>
            Hiển thị <strong className="text-[#1C140E] font-bold text-sm sm:text-base tabular-nums">{products.length}</strong> sản phẩm thiết kế
            {filterState.searchQuery && (
              <span> cho từ khóa "<em>{filterState.searchQuery}</em>"</span>
            )}
          </div>
        </div>

        {/* Product Cards Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlistIds.includes(product.id)}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-[#D5C2AF] max-w-lg mx-auto p-8">
            <div className="w-12 h-12 rounded-full bg-[#F5EFEB] text-[#7C442A] flex items-center justify-center mx-auto mb-4">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#1C140E]">
              Không tìm thấy sản phẩm phù hợp
            </h3>
            <p className="text-xs text-[#7A6453] mt-2 mb-6">
              Bạn hãy thử điều chỉnh lại bộ lọc danh mục, chất liệu hoặc tìm kiếm với từ khóa khác nhé.
            </p>
            <button
              onClick={onResetFilters}
              className="bg-[#7C442A] text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-[#68361E] transition-colors cursor-pointer"
            >
              Xem tất cả sản phẩm
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
