import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, Tag, PackageCheck } from 'lucide-react';
import { ProductCategory } from '../types';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenVoucherModal: () => void;
  onOpenStyleGuide: () => void;
  onOpenOrderTracking: () => void;
  onOpenAtelier: () => void;
  onSelectCategory: (cat: ProductCategory) => void;
  activeCategory: ProductCategory;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenVoucherModal,
  onOpenStyleGuide,
  onOpenOrderTracking,
  onOpenAtelier,
  onSelectCategory,
  activeCategory,
  searchQuery,
  onSearchChange
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const navItems: { label: string; category?: ProductCategory; isStyleGuide?: boolean; isAtelier?: boolean }[] = [
    { label: 'Tất cả', category: 'all' },
    { label: 'Áo kiểu', category: 'blouse' },
    { label: 'Chân váy', category: 'skirt' },
    { label: 'Đầm thiết kế', category: 'dress' },
    { label: 'Set bộ', category: 'suit' },
    { label: 'Quần ống rộng', category: 'trousers' },
    { label: 'Phối đồ Atelier', isAtelier: true },
    { label: 'Cẩm nang phối đồ', isStyleGuide: true },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8DFC8]/60 transition-all">
      {/* Top Promotional Announcement Banner (SEO & CRO CPL conversion) */}
      <div className="bg-[#7C442A] text-[#FAF8F5] text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Tag className="w-3.5 h-3.5 text-[#F5EFEB] shrink-0" />
        <span>Trân trọng từng thần thái rạng rỡ · Nhận ngay <strong>Voucher 50.000₫</strong> cho đơn hàng đầu tiên</span>
        <button
          onClick={onOpenVoucherModal}
          className="ml-2 underline font-semibold hover:text-[#E8DFC8] transition-colors cursor-pointer"
        >
          Nhận voucher ngay
        </button>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4 lg:gap-4 xl:gap-6">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 text-[#4A3326] hover:text-[#7C442A] focus:outline-none"
              aria-label="Mở menu danh mục"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>

          {/* Zone 1: Monogram Logo and Brand Name */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('all');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 sm:gap-3 group text-decoration-none shrink-0"
            title="VERA - Vintage for Everyday Trang chủ"
          >
            {/* Laurel Wreath enclosing V Monogram SVG */}
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-[#D5C2AF] bg-[#F7F2E8] flex items-center justify-center relative shadow-sm group-hover:border-[#7C442A] transition-colors shrink-0">
              <svg viewBox="0 0 100 100" className="w-7 h-7 sm:w-10 sm:h-10 text-[#7C442A]" fill="currentColor">
                {/* Stylized Laurel Wreath */}
                <path d="M 50,92 C 30,86 16,68 18,44 C 18,34 22,24 28,16 C 26,24 28,34 33,40 C 37,45 42,46 44,40 C 44,32 38,22 36,12 C 44,18 46,28 47,36 C 40,32 34,44 41,50 C 45,54 50,50 49,42 C 48,34 50,26 55,20 C 52,28 54,38 60,42 C 64,45 68,41 66,35 C 64,28 62,20 68,14 C 67,24 72,32 78,38 C 76,46 70,52 64,48 C 69,56 75,56 80,48 C 84,68 70,86 50,92 Z" opacity="0.25"/>
                {/* Stylized Laurel Leaves Border */}
                <path d="M 24 50 Q 22 35 32 24 Q 30 36 38 42 Q 28 46 24 50 Z" />
                <path d="M 76 50 Q 78 35 68 24 Q 70 36 62 42 Q 72 46 76 50 Z" />
                <path d="M 28 68 Q 24 58 32 54 Q 32 64 42 66 Q 32 70 28 68 Z" />
                <path d="M 72 68 Q 76 58 68 54 Q 68 64 58 66 Q 68 70 72 68 Z" />
                {/* Center Monogram "V" */}
                <text
                  x="50"
                  y="64"
                  textAnchor="middle"
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                  fontWeight="800"
                  fontSize="44"
                  fill="#7C442A"
                >
                  V
                </text>
              </svg>
            </div>

            <div className="flex flex-col min-w-0">
              <span className="tracking-widest text-lg sm:text-2xl font-extrabold text-[#3D2619] group-hover:text-[#872B10] transition-colors leading-none">
                VERA
              </span>
              <span className="text-[9px] sm:text-xs tracking-[0.1em] sm:tracking-[0.2em] text-[#634B3B] uppercase font-semibold mt-0.5 truncate">
                Vintage for Everyday
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-2.5 xl:gap-4 2xl:gap-6 text-xs xl:text-[13px] 2xl:text-sm font-semibold text-[#3D2C20] min-w-0 overflow-x-auto" aria-label="Menu chính">
            {navItems.map((item) => {
              if (item.isAtelier) {
                return (
                  <button
                    key={item.label}
                    onClick={onOpenAtelier}
                    className="text-[#872B10] hover:text-[#68361E] font-bold transition-colors whitespace-nowrap cursor-pointer hover:underline underline-offset-8"
                  >
                    {item.label}
                  </button>
                );
              }
              if (item.isStyleGuide) {
                return (
                  <button
                    key={item.label}
                    onClick={onOpenStyleGuide}
                    className="hover:text-[#872B10] transition-colors whitespace-nowrap cursor-pointer hover:underline underline-offset-8"
                  >
                    {item.label}
                  </button>
                );
              }
              const isActive = activeCategory === item.category;
              return (
                <button
                  key={item.label}
                  onClick={() => onSelectCategory(item.category || 'all')}
                  className={`transition-colors whitespace-nowrap cursor-pointer hover:underline underline-offset-8 ${
                    isActive ? 'text-[#872B10] font-bold underline' : 'hover:text-[#872B10]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Search, Wishlist, Cart) */}
          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            
            {/* Search Toggle Button */}
            <button
              onClick={() => setShowSearchInput(!showSearchInput)}
              className={`p-2 text-[#4A3326] hover:text-[#7C442A] hover:bg-[#F3EBE1] rounded-full transition-colors cursor-pointer ${showSearchInput ? 'bg-[#F3EBE1] text-[#7C442A]' : ''}`}
              title="Tìm kiếm sản phẩm"
              aria-label="Tìm kiếm sản phẩm"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Order Tracking Button (Desktop/Tablet) */}
            <button
              onClick={onOpenOrderTracking}
              className="hidden sm:flex p-2 text-[#4A3326] hover:text-[#7C442A] hover:bg-[#F3EBE1] rounded-full transition-colors cursor-pointer"
              title="Tra cứu đơn hàng"
              aria-label="Tra cứu đơn hàng"
            >
              <PackageCheck className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-[#4A3326] hover:text-[#7C442A] hover:bg-[#F3EBE1] rounded-full transition-colors relative"
              title="Danh sách yêu thích"
              aria-label="Xem sản phẩm yêu thích"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#872B10] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-1.5 sm:gap-2 bg-[#7C442A] hover:bg-[#68361E] text-[#FAF8F5] px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer font-bold text-xs sm:text-sm tracking-wide shrink-0"
              aria-label={`Giỏ hàng, có ${cartCount} sản phẩm`}
            >
              <ShoppingBag className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Giỏ hàng</span>
              <span className="bg-[#FAF8F5] text-[#872B10] text-xs font-extrabold px-1.5 sm:px-2 py-0.5 rounded-full tabular-nums">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Expandable Search Bar Row (keeps navbar layout stable on all screen widths) */}
        {showSearchInput && (
          <div className="pb-3 animate-fadeIn">
            <div className="max-w-xl mx-auto flex items-center border border-[#D5C2AF] bg-white rounded-full px-3.5 py-2 shadow-inner">
              <Search className="w-4 h-4 text-[#8C6D58] mr-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Tìm kiếm: đầm hoa, chân váy..."
                className="flex-1 text-xs sm:text-sm text-[#4A3326] bg-transparent outline-none placeholder:text-[#A89382]"
                autoFocus
              />
              <button
                onClick={() => {
                  setShowSearchInput(false);
                  onSearchChange('');
                }}
                className="text-[#8C6D58] hover:text-[#4A3326] text-xs font-semibold px-1.5 cursor-pointer"
                aria-label="Đóng tìm kiếm"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8DFC8] bg-[#FAF8F5] px-4 pt-3 pb-5 space-y-1 shadow-lg animate-fadeIn">
          <div className="px-2 pb-2 text-[11px] font-semibold text-[#8C6D58] uppercase tracking-wider">
            Danh mục sản phẩm
          </div>
          {navItems.map((item) => {
            if (item.isAtelier) {
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    onOpenAtelier();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-[#872B10] font-bold hover:bg-[#F3EBE1] rounded-lg"
                >
                  {item.label}
                </button>
              );
            }
            if (item.isStyleGuide) {
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    onOpenStyleGuide();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-[#4A3326] font-medium hover:bg-[#F3EBE1] rounded-lg"
                >
                  {item.label}
                </button>
              );
            }
            const isActive = activeCategory === item.category;
            return (
              <button
                key={item.label}
                onClick={() => {
                  onSelectCategory(item.category || 'all');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg font-medium transition-colors ${
                  isActive
                    ? 'bg-[#EFE5D9] text-[#7C442A] font-semibold'
                    : 'text-[#4A3326] hover:bg-[#F3EBE1]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          
          <button
            onClick={() => {
              onOpenOrderTracking();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm text-[#4A3326] font-medium hover:bg-[#F3EBE1] rounded-lg flex items-center gap-2"
          >
            <PackageCheck className="w-4 h-4 text-[#7C442A]" />
            <span>Tra cứu đơn hàng</span>
          </button>

          <div className="pt-3 border-t border-[#E8DFC8] px-2 flex justify-between items-center text-xs text-[#8C6D58]">
            <span>Slogan: "Trân trọng từng thần thái rạng rỡ"</span>
            <button
              onClick={() => {
                onOpenVoucherModal();
                setMobileMenuOpen(false);
              }}
              className="text-[#7C442A] font-bold underline"
            >
              Nhận voucher 50K
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
