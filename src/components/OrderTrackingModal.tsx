import React, { useState } from 'react';
import { Order } from '../types';
import { X, PackageCheck, Search, Truck, CheckCircle2, Clock } from 'lucide-react';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  orders
}) => {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();
  const matchedOrders = trimmed
    ? orders.filter(
        (o) =>
          o.trackingCode.toLowerCase().includes(trimmed) ||
          o.customerPhone.replace(/\s+/g, '').includes(trimmed.replace(/\s+/g, ''))
      )
    : orders;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };

  const formatPrice = (val: number) => val.toLocaleString('vi-VN') + '₫';

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FAF8F5] rounded-2xl max-w-lg w-full max-h-[90dvh] flex flex-col overflow-hidden shadow-2xl border border-[#E0D5C3]"
        role="dialog"
        aria-label="Tra cứu đơn hàng VERA"
      >
        {/* Header */}
        <div className="px-5 py-4 bg-white border-b border-[#E8DFC8] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FAF5EE] border border-[#E8DFC8] flex items-center justify-center">
              <PackageCheck className="w-5 h-5 text-[#7C442A]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1C140E]">Tra Cứu Đơn Hàng</h3>
              <p className="text-[11px] text-[#7A6453]">
                Nhập mã vận đơn (VD: VERA-...) hoặc số điện thoại đặt hàng
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-[#5C4535] hover:bg-[#F3EBE1] transition-colors cursor-pointer"
            aria-label="Đóng tra cứu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8C6D58] absolute left-3 top-2.5" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSearched(true);
                }}
                placeholder="Nhập mã đơn VERA-... hoặc SĐT"
                className="w-full text-xs sm:text-sm bg-white border border-[#D5C2AF] focus:border-[#7C442A] rounded-xl pl-9 pr-3 py-2 outline-none text-[#1C140E]"
              />
            </div>
            <button
              type="submit"
              className="bg-[#7C442A] hover:bg-[#68361E] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer shrink-0"
            >
              Kiểm tra
            </button>
          </form>

          {matchedOrders.length > 0 ? (
            <div className="space-y-3">
              {matchedOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-xl p-4 border border-[#E8DFC8] space-y-3"
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap border-b border-[#F5EFEB] pb-2.5">
                    <div>
                      <span className="text-[11px] text-[#7A6453] block">Mã vận đơn</span>
                      <strong className="text-sm font-extrabold text-[#7C442A] tracking-wide">
                        {order.trackingCode}
                      </strong>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                      <Truck className="w-3.5 h-3.5" />
                      Đang chuẩn bị giao hàng
                    </span>
                  </div>

                  {/* Timeline */}
                  <div className="grid grid-cols-3 gap-2 text-[11px] text-center bg-[#FAF5EE] p-2.5 rounded-lg">
                    <div className="flex flex-col items-center gap-1 text-emerald-700 font-semibold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Đã tiếp nhận</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-[#7C442A] font-semibold">
                      <Clock className="w-4 h-4" />
                      <span>Đang đóng gói</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-[#A89382]">
                      <Truck className="w-4 h-4" />
                      <span>Đang vận chuyển</span>
                    </div>
                  </div>

                  <div className="text-xs text-[#4A382C] space-y-1">
                    <div>
                      <strong>Người nhận:</strong> {order.customerName} · {order.customerPhone}
                    </div>
                    <div>
                      <strong>Địa chỉ:</strong> {order.address}, {order.district}, {order.province}
                    </div>
                    <div className="pt-1">
                      <strong>Sản phẩm ({order.items.reduce((s, i) => s + i.quantity, 0)}):</strong>{' '}
                      {order.items.map((i) => `${i.product.name} (${i.selectedSize} x${i.quantity})`).join(', ')}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#F5EFEB] flex items-center justify-between text-xs">
                    <span className="text-[#664C3B]">Tổng thanh toán:</span>
                    <strong className="text-sm font-extrabold text-[#872B10] tabular-nums">
                      {formatPrice(order.total)}
                    </strong>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-xl border border-dashed border-[#D5C2AF] px-4">
              <PackageCheck className="w-8 h-8 text-[#A89382] mx-auto mb-2" />
              <p className="text-sm font-bold text-[#1C140E]">
                {searched && orders.length > 0
                  ? 'Không tìm thấy đơn hàng khớp với thông tin vừa nhập'
                  : 'Bạn chưa có đơn hàng nào trên trình duyệt này'}
              </p>
              <p className="text-xs text-[#7A6453] mt-1">
                Sau khi đặt hàng thành công, mã vận đơn sẽ tự động lưu tại đây hoặc bạn có thể gọi Hotline 0908 123 456 để tra cứu.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
