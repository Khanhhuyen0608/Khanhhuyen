import React, { useState, useEffect, useMemo } from 'react';
import { PRODUCTS, VOUCHERS } from './data/products';
import { Product, CartItem, Order, FilterState, Voucher, ProductSize } from './types';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { FabricStory } from './components/FabricStory';
import { ProductGrid } from './components/ProductGrid';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { LeadVoucherModal } from './components/LeadVoucherModal';
import { StyleGuideModal } from './components/StyleGuideModal';
import { WishlistModal } from './components/WishlistModal';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { ChatWidget } from './components/ChatWidget';
import { CustomerPoliciesSection } from './components/CustomerPoliciesSection';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { MixMatchAtelier } from './components/MixMatchAtelier';
import { RecentlyViewedSection } from './components/RecentlyViewedSection';

export default function App() {
  // LocalStorage-backed state for realistic e-commerce persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('vera_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('vera_wishlist');
      return saved ? JSON.parse(saved) : ['vera-skirt-earth-brown', 'vera-blouse-polka-dot'];
    } catch {
      return ['vera-skirt-earth-brown', 'vera-blouse-polka-dot'];
    }
  });

  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(() => {
    try {
      const saved = localStorage.getItem('vera_voucher');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Filter & Search State
  const [filterState, setFilterState] = useState<FilterState>({
    category: 'all',
    pattern: 'all',
    material: 'all',
    colorTone: 'all',
    searchQuery: '',
    sortBy: 'featured'
  });

  // Modals & Drawers
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
  const [isStyleGuideOpen, setIsStyleGuideOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('vera_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('vera_recent');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('vera_recent', JSON.stringify(recentlyViewedIds));
  }, [recentlyViewedIds]);

  useEffect(() => {
    localStorage.setItem('vera_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('vera_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('vera_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  useEffect(() => {
    if (appliedVoucher) {
      localStorage.setItem('vera_voucher', JSON.stringify(appliedVoucher));
    } else {
      localStorage.removeItem('vera_voucher');
    }
  }, [appliedVoucher]);

  // Timed popup for CPL Voucher (CRO conversion: shows after 12s if user hasn't seen it)
  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('vera_lead_seen');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsVoucherModalOpen(true);
        sessionStorage.setItem('vera_lead_seen', 'true');
      }, 12000);
      return () => clearTimeout(timer);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (filterState.category !== 'all' && item.category !== filterState.category) {
        return false;
      }
      // Pattern filter
      if (filterState.pattern !== 'all' && item.pattern !== filterState.pattern) {
        return false;
      }
      // Material filter
      if (filterState.material !== 'all' && item.material !== filterState.material) {
        return false;
      }
      // Color filter
      if (filterState.colorTone !== 'all' && item.colorTone !== filterState.colorTone) {
        return false;
      }
      // Search query
      if (filterState.searchQuery.trim() !== '') {
        const q = filterState.searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesCat = item.categoryName.toLowerCase().includes(q);
        const matchesMat = item.materialName.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesSeo = item.seoAlt.toLowerCase().includes(q);
        if (!matchesName && !matchesCat && !matchesMat && !matchesDesc && !matchesSeo) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (filterState.sortBy === 'price-asc') return a.price - b.price;
      if (filterState.sortBy === 'price-desc') return b.price - a.price;
      if (filterState.sortBy === 'popular') return b.soldCount - a.soldCount;
      if (filterState.sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return 0; // featured maintains default order
    });
  }, [filterState]);

  // Wishlisted product objects
  const wishlistedProducts = useMemo(() => {
    return PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  }, [wishlistIds]);

  // Cart operations
  const handleAddToCart = (
    product: Product,
    size: ProductSize = 'M',
    quantity: number = 1,
    colorName?: string,
    colorImage?: string
  ) => {
    const maxStock = product.sizeStock?.[size] ?? 0;
    if (maxStock <= 0) {
      showToast(`Size ${size} của "${product.name}" hiện tạm hết hàng`);
      return;
    }
    const chosenColor = colorName || product.colorName;
    const itemKey = `${product.id}-${size}-${chosenColor}`;
    const existingItem = cartItems.find((i) => i.id === itemKey);
    if (existingItem && existingItem.quantity + quantity > maxStock) {
      showToast(`Kho chỉ còn ${maxStock} sản phẩm size ${size} cho "${product.name}"`);
      return;
    }
    const safeQuantity = Math.min(quantity, maxStock);
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === itemKey);
      if (existing) {
        return prev.map((i) =>
          i.id === itemKey ? { ...i, quantity: Math.min(maxStock, i.quantity + safeQuantity) } : i
        );
      }
      return [
        ...prev,
        {
          id: itemKey,
          product,
          selectedSize: size,
          selectedColor: chosenColor,
          selectedImage: colorImage || product.images[0],
          quantity: safeQuantity
        }
      ];
    });
    showToast(`Đã thêm "${product.name}" (${chosenColor.split('(')[0].trim()} · Size ${size}) vào giỏ hàng`);
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const maxStock = item.product.sizeStock?.[item.selectedSize] ?? 99;
            const newQty = item.quantity + delta;
            if (delta > 0 && newQty > maxStock) {
              showToast(`Kho chỉ còn ${maxStock} sản phẩm size ${item.selectedSize}`);
              return item;
            }
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
    showToast('Đã xóa sản phẩm khỏi giỏ hàng');
  };

  // Buy Now: adds item and directly opens checkout
  const handleBuyNow = (
    product: Product,
    size: ProductSize,
    quantity: number,
    colorName?: string,
    colorImage?: string
  ) => {
    handleAddToCart(product, size, quantity, colorName, colorImage);
    setQuickViewProduct(null);
    setIsCheckoutOpen(true);
  };

  // Wishlist toggle
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      if (prev.includes(product.id)) {
        showToast(`Đã bỏ lưu "${product.name}"`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Đã lưu "${product.name}" vào danh sách yêu thích`);
        return [...prev, product.id];
      }
    });
  };

  // Voucher application
  const handleApplyVoucher = (code: string): boolean => {
    const found = VOUCHERS.find((v) => v.code.toUpperCase() === code.toUpperCase());
    if (found) {
      setAppliedVoucher(found);
      showToast(`Áp dụng thành công mã ưu đãi: ${found.code}`);
      return true;
    }
    return false;
  };

  const handleRemoveVoucher = () => {
    setAppliedVoucher(null);
    showToast('Đã gỡ bỏ mã giảm giá');
  };

  const handleCopyText = (text: string, msg: string) => {
    navigator.clipboard.writeText(text);
    showToast(msg);
  };

  // Filter updates
  const handleFilterChange = (updates: Partial<FilterState>) => {
    setFilterState((prev) => ({ ...prev, ...updates }));
  };

  const handleResetFilters = () => {
    setFilterState({
      category: 'all',
      pattern: 'all',
      material: 'all',
      colorTone: 'all',
      searchQuery: '',
      sortBy: 'featured'
    });
  };

  const scrollToGrid = () => {
    const el = document.getElementById('collection-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Select a look from style guide
  const handleSelectProductLook = (productId: string) => {
    const found = PRODUCTS.find((p) => p.id === productId);
    if (found) {
      setQuickViewProduct(found);
    }
  };

  const recentlyViewedProducts = useMemo(() => {
    return recentlyViewedIds
      .map((id) => PRODUCTS.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p));
  }, [recentlyViewedIds]);

  const handleOpenQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setRecentlyViewedIds((prev) => [product.id, ...prev.filter((id) => id !== product.id)].slice(0, 8));
  };

  // Total cart item count
  const totalCartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      
      {/* 1. Header with Monogram, Navigation & Live Cart Counter */}
      <Header
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenVoucherModal={() => setIsVoucherModalOpen(true)}
        onOpenStyleGuide={() => setIsStyleGuideOpen(true)}
        onOpenOrderTracking={() => setIsOrderTrackingOpen(true)}
        onOpenAtelier={() => {
          document.getElementById('mix-match-atelier')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onSelectCategory={(cat) => {
          handleFilterChange({ category: cat });
          scrollToGrid();
        }}
        activeCategory={filterState.category}
        searchQuery={filterState.searchQuery}
        onSearchChange={(q) => handleFilterChange({ searchQuery: q })}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {/* 2. Welcome Banner / Hero Campaign */}
        <HeroBanner
          onExploreClick={scrollToGrid}
          onVoucherClick={() => setIsVoucherModalOpen(true)}
          onStyleGuideClick={() => setIsStyleGuideOpen(true)}
        />

        {/* 3. Fabrics & Color Heritage Storytelling */}
        <FabricStory
          onSelectMaterial={(mat) => {
            handleFilterChange({ material: mat });
            scrollToGrid();
          }}
          onSelectPattern={(pat) => {
            handleFilterChange({ pattern: pat });
            scrollToGrid();
          }}
        />

        {/* 4. Product Grid with multi-filters and SEO alt tags */}
        <ProductGrid
          products={filteredProducts}
          filterState={filterState}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          onQuickView={handleOpenQuickView}
          onAddToCart={(p) => handleAddToCart(p, p.sizes[0] || 'M', 1)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
        />

        {/* 4.5. Unique Feature: VERA Mix & Match Atelier */}
        <MixMatchAtelier
          onAddOutfitToCart={(top, topSize, bottom, bottomSize) => {
            handleAddToCart(top, topSize, 1);
            handleAddToCart(bottom, bottomSize, 1);
            showToast(`Đã thêm cả set "${top.name}" (${topSize}) + "${bottom.name}" (${bottomSize}) vào giỏ!`);
          }}
          onQuickView={handleOpenQuickView}
        />

        {/* 4.6. Recently Viewed Products */}
        <RecentlyViewedSection
          products={recentlyViewedProducts}
          onQuickView={handleOpenQuickView}
        />

        {/* 4.7. Homepage Social Proof: Customer Reviews */}
        <CustomerReviewsSection onSelectProduct={handleOpenQuickView} />

        {/* 4.6. Prominent Customer Policies & Support Section for Easy Reading */}
        <CustomerPoliciesSection />
      </main>

      {/* 5. Comprehensive Footer with legal, showroom and policies */}
      <Footer />

      {/* --- Interactive Modals & Drawers --- */}

      {/* Quick View Product Modal */}
      <QuickViewModal
        key={quickViewProduct?.id || 'empty'}
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
      />

      {/* Dynamic Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onQuickAddProduct={(p) => handleAddToCart(p, p.sizes[0] || 'M', 1)}
        appliedVoucher={appliedVoucher}
        onApplyVoucher={handleApplyVoucher}
        onRemoveVoucher={handleRemoveVoucher}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        appliedVoucher={appliedVoucher}
        onOrderSuccess={(order) => {
          setOrders((prev) => [order, ...prev]);
          setConfirmedOrder(order);
          setCartItems([]);
          setIsCheckoutOpen(false);
        }}
      />

      {/* Order Tracking Lookup Modal */}
      <OrderTrackingModal
        isOpen={isOrderTrackingOpen}
        onClose={() => setIsOrderTrackingOpen(false)}
        orders={orders}
      />

      {/* Order Success Confirmation Modal */}
      <OrderSuccessModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
        onCopyText={handleCopyText}
      />

      {/* Lead Generation Voucher 50K Modal (CPL CRO) */}
      <LeadVoucherModal
        isOpen={isVoucherModalOpen}
        onClose={() => setIsVoucherModalOpen(false)}
        onApplyCode={(code) => handleApplyVoucher(code)}
        onCopyText={handleCopyText}
      />

      {/* Vintage Style Guide & Lookbook Modal */}
      <StyleGuideModal
        isOpen={isStyleGuideOpen}
        onClose={() => setIsStyleGuideOpen(false)}
        onSelectProductLook={handleSelectProductLook}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistedProducts={wishlistedProducts}
        onAddToCart={(p) => handleAddToCart(p, p.sizes[0] || 'M', 1)}
        onRemoveWishlist={handleToggleWishlist}
        onQuickView={(p) => setQuickViewProduct(p)}
      />

      {/* Floating Customer Support Chat Widget */}
      <ChatWidget onOpenVoucherModal={() => setIsVoucherModalOpen(true)} />

      {/* Toast Feedback */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

    </div>
  );
}
