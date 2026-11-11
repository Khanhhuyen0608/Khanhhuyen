import React, { useState } from 'react';
import { CartItem, Product, Voucher } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Check, Truck, Plus } from 'lucide-react';
import { VOUCHERS, PRODUCTS } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onQuickAddProduct?: (product: Product) => void;
  appliedVoucher: Voucher | null;
  onApplyVoucher: (code: string) => boolean;
  onRemoveVoucher: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onQuickAddProduct,
  appliedVoucher,
  onApplyVoucher,
  onRemoveVoucher,
  onProceedToCheckout
}) => {
  const [voucherCodeInput, setVoucherCodeInput] = useState('');
  const [voucherError, setVoucherError] = useState('');
  const [voucherSuccess, setVoucherSuccess] = useState('');

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 499000;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  let discountAmount = 0;
  if (appliedVoucher) {
    if (appliedVoucher.discountType === 'fixed') {
      discountAmount = appliedVoucher.discountValue;
    } else if (appliedVoucher.discountType === 'percent') {
      discountAmount = Math.min(100000, Math.round((subtotal * appliedVoucher.discountValue) / 100));
    }
  }

  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 30000;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const amountToFreeShip = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShipPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const formatPrice = (val: number) => val.toLocaleString('vi-VN') + '₫';

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setVoucherError('');
    setVoucherSuccess('');
    if (!voucherCodeInput.trim()) return;

    const success = onApplyVoucher(voucherCodeInput.trim().toUpperCase());
    if (success) {
      setVoucherSuccess(`Đã áp dụng mã ${voucherCodeInput.toUpperCase()} thành công!`);
      setVoucherCodeInput('');
    } else {
      setVoucherError('Mã không hợp lệ hoặc chưa đạt giá trị đơn hàng tối thiểu.');
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-fadeIn"
    >
      <div
        className="w-full max-w-md bg-[#FAF8F5] h-[100dvh] max-h-[100dvh] shadow-2xl flex flex-col justify-between border-l border-[#E8DFC8] animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E8DFC8] flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#7C442A]" />
            <h2 className="text-base sm:text-lg font-bold text-[#1C140E]">
              Giỏ Hàng Của Bạn
            </h2>
            <span className="text-xs bg-[#F3EBE1] text-[#7C442A] px-2 py-0.5 rounded-full font-bold">
              {items.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#5C4535] hover:text-[#7C442A] hover:bg-[#F3EBE1] rounded-full transition-colors cursor-pointer"
            aria-label="Đóng giỏ hàng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#FAF5EE] px-4 sm:px-5 py-2.5 sm:py-3 border-b border-[#E8DFC8] shrink-0">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <div className="flex items-center gap-1.5 font-medium text-[#5C4535]">
              <Truck className="w-4 h-4 text-[#7C442A]" />
              {amountToFreeShip > 0 ? (
                <span>
                  Mua thêm <strong className="text-[#7C442A]">{formatPrice(amountToFreeShip)}</strong> để được <strong>FREESHIP</strong>
                </span>
              ) : (
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  Chúc mừng! Bạn được Miễn Phí Giao Hàng Toàn Quốc
                </span>
              )}
            </div>
            <span className="text-xs font-bold text-[#664C3B] tabular-nums">{freeShipPercent}%</span>
          </div>

          <div className="w-full bg-[#E8DFC8] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#7C442A] h-full transition-all duration-500 rounded-full"
              style={{ width: `${freeShipPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 space-y-3 sm:space-y-4">
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 bg-white p-3 rounded-xl border border-[#E8DFC8] shadow-sm relative group"
              >
                {/* Thumbnail */}
                <div className="w-16 h-20 bg-[#FAF8F5] rounded-lg overflow-hidden border border-[#E8DFC8] shrink-0">
                  <img
                    src={item.selectedImage || item.product.images[0]}
                    alt={item.product.seoAlt}
                    className="w-full h-full object-contain p-1"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xs font-semibold text-[#3B2519] line-clamp-1">
                        {item.product.name}
                      </h3>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#A89382] hover:text-[#A8583B] p-1 cursor-pointer"
                        title="Xóa sản phẩm"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#8C6D58] mt-0.5">
                      <span className="bg-[#FAF5EE] px-1.5 py-0.5 rounded border border-[#E8DFC8]">
                        Size: {item.selectedSize}
                      </span>
                      {item.selectedColor && (
                        <span className="bg-[#FAF5EE] px-1.5 py-0.5 rounded border border-[#E8DFC8] text-[#7C442A] font-medium">
                          {item.selectedColor.split('(')[0].trim()}
                        </span>
                      )}
                      <span>{item.product.materialName}</span>
                    </div>
                  </div>

                  {/* Quantity Stepper & Price */}
                  <div className="flex items-center justify-between mt-2.5">
                    <div className="flex items-center border border-[#D5C2AF] rounded-md bg-white">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2.5 py-1 text-sm text-[#5C4535] hover:bg-[#F3EBE1] cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-sm font-bold text-[#1C140E] tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-2.5 py-1 text-sm text-[#5C4535] hover:bg-[#F3EBE1] cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-sm font-bold text-[#872B10] tabular-nums">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
              ))
            ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-[#FAF5EE] text-[#A89382] flex items-center justify-center mx-auto mb-3">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-base font-bold text-[#1C140E]">
                Giỏ hàng của bạn đang trống
              </p>
              <p className="text-sm text-[#4A382C] mt-1 mb-5">
                Hãy lựa chọn những thiết kế vintage thanh lịch từ VERA nhé.
              </p>
              <button
                onClick={onClose}
                className="bg-[#7C442A] text-white text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-[#68361E] transition-colors cursor-pointer"
              >
                Khám phá bộ sưu tập
              </button>
            </div>
          )}

          {/* Smart Upsell / Mix & Match Recommendations */}
          {items.length > 0 && onQuickAddProduct && (() => {
            const inCartIds = new Set(items.map((i) => i.product.id));
            const suggestions = PRODUCTS.filter((p) => !inCartIds.has(p.id) && p.inStock)
              .sort((a, b) => a.price - b.price)
              .slice(0, 2);
            if (suggestions.length === 0) return null;

            return (
              <div className="pt-3 border-t border-[#E8DFC8] space-y-2">
                <div className="text-xs font-bold text-[#3B2519]">
                  {amountToFreeShip > 0
                    ? `Gợi ý thêm để đủ Freeship (còn thiếu ${formatPrice(amountToFreeShip)}):`
                    : 'Gợi ý phối cùng cực xinh:'}
                </div>
                <div className="space-y-2">
                  {suggestions.map((sug) => (
                    <div
                      key={sug.id}
                      className="flex items-center justify-between gap-2.5 bg-white p-2 rounded-xl border border-[#E8DFC8]"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={sug.images[0]}
                          alt={sug.name}
                          className="w-10 h-12 rounded-lg object-cover bg-[#FAF5EE] shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="text-xs font-semibold text-[#1C140E] block truncate">
                            {sug.name}
                          </span>
                          <span className="text-xs font-bold text-[#872B10] tabular-nums">
                            {formatPrice(sug.price)}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onQuickAddProduct(sug)}
                        className="shrink-0 bg-[#FAF5EE] hover:bg-[#7C442A] text-[#7C442A] hover:text-white border border-[#D5C2AF] hover:border-[#7C442A] text-[11px] font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Thêm</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
          {/* Voucher Coupon Section (inside scrollable area so items list isn't squeezed) */}
          {items.length > 0 && (
            <div className="pt-3 border-t border-[#E8DFC8] space-y-2">
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-[#8C6D58] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={voucherCodeInput}
                    onChange={(e) => setVoucherCodeInput(e.target.value)}
                    placeholder="Nhập mã ưu đãi (VD: VERA50K)"
                    className="w-full text-xs font-semibold bg-white border border-[#D5C2AF] rounded-lg pl-9 pr-3 py-2 outline-none focus:border-[#7C442A] uppercase placeholder:normal-case tracking-wider"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#5C4535] hover:bg-[#7C442A] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  Áp dụng
                </button>
              </form>

              <div className="flex flex-wrap gap-1.5">
                {VOUCHERS.map((v) => (
                  <button
                    key={v.code}
                    type="button"
                    onClick={() => {
                      onApplyVoucher(v.code);
                      setVoucherSuccess(`Đã áp dụng mã ${v.code}!`);
                    }}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
                      appliedVoucher?.code === v.code
                        ? 'bg-[#7C442A] text-white border-[#7C442A]'
                        : 'bg-white text-[#7C442A] border-[#E8DFC8] hover:bg-[#EFE5D9]'
                    }`}
                  >
                    {v.code} ({v.discountType === 'fixed' ? `-${v.discountValue / 1000}K` : `-${v.discountValue}%`})
                  </button>
                ))}
              </div>

              {appliedVoucher && (
                <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 p-2 rounded-lg border border-emerald-200">
                  <span className="flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    Mã <strong>{appliedVoucher.code}</strong>: {appliedVoucher.name}
                  </span>
                  <button
                    type="button"
                    onClick={onRemoveVoucher}
                    className="text-xs text-red-600 underline font-semibold cursor-pointer"
                  >
                    Gỡ bỏ
                  </button>
                </div>
              )}

              {voucherError && (
                <p className="text-[11px] text-red-600">{voucherError}</p>
              )}
              {voucherSuccess && !appliedVoucher && (
                <p className="text-[11px] text-emerald-600">{voucherSuccess}</p>
              )}
            </div>
          )}
        </div>

        {/* Compact Sticky Footer: Subtotals & Checkout CTA */}
        {items.length > 0 && (
          <div className="p-3.5 sm:p-4 border-t border-[#E8DFC8] bg-white space-y-2.5 shrink-0 shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs text-[#5C4535]">
              <span>
                Tạm tính: <strong className="text-[#1C140E] tabular-nums">{formatPrice(subtotal)}</strong>
                {discountAmount > 0 && (
                  <span className="text-emerald-700 font-semibold ml-2">
                    (-{formatPrice(discountAmount)})
                  </span>
                )}
              </span>
              <span>
                Ship:{' '}
                {shippingFee === 0 ? (
                  <strong className="text-emerald-700">Miễn phí</strong>
                ) : (
                  <strong className="text-[#1C140E] tabular-nums">{formatPrice(shippingFee)}</strong>
                )}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="text-[11px] text-[#664C3B] block leading-none">Tổng thanh toán</span>
                <span className="text-lg sm:text-xl font-extrabold text-[#872B10] tabular-nums tracking-tight">
                  {formatPrice(grandTotal)}
                </span>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="flex-1 bg-[#7C442A] hover:bg-[#68361E] text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer text-xs sm:text-sm"
              >
                <span>Đặt hàng ngay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
