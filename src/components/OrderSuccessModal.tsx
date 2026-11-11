import React from 'react';
import { Order } from '../types';
import { CheckCircle2, QrCode, Truck, Copy, ShoppingBag, ArrowRight } from 'lucide-react';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
  onCopyText: (text: string, msg: string) => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  onCopyText
}) => {
  if (!order) return null;

  const formatPrice = (v: number) => v.toLocaleString('vi-VN') + '₫';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="bg-[#FAF8F5] rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-[#E0D5C3] p-6 sm:p-8 relative max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Header */}
        <div className="text-center pb-6 border-b border-[#E8DFC8]">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3 shadow-sm">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <span className="text-xs font-bold text-[#7C442A] uppercase tracking-widest">
            Valuing Every Radiant Aura
          </span>
          <h2 className="text-2xl font-bold text-[#1C140E] mt-1">
            Đặt Hàng Thành Công!
          </h2>
          <p className="text-sm text-[#4A382C] mt-1.5 max-w-md mx-auto">
            Cảm ơn quý khách <strong>{order.customerName}</strong> đã gửi gắm niềm tin nơi VERA. 
            Đội ngũ tư vấn sẽ liên hệ qua số <strong>{order.customerPhone}</strong> để xác nhận giao hàng.
          </p>
        </div>

        {/* Order Meta Box */}
        <div className="my-5 p-4 bg-white rounded-xl border border-[#E8DFC8] space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[#664C3B] font-medium">Mã đơn hàng:</span>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-[#872B10] text-sm tracking-wide">{order.id}</span>
              <button
                onClick={() => onCopyText(order.id, 'Đã sao chép mã đơn hàng')}
                className="text-[#664C3B] hover:text-[#872B10] p-0.5 cursor-pointer"
                title="Sao chép"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#664C3B] font-medium">Mã vận đơn đối tác:</span>
            <span className="font-bold text-[#1C140E]">{order.trackingCode}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#664C3B] font-medium">Thời gian đặt:</span>
            <span className="font-medium text-[#1C140E]">{order.createdAt}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#664C3B] font-medium">Địa chỉ giao hàng:</span>
            <span className="font-semibold text-[#1C140E] text-right max-w-xs truncate">
              {order.address}, {order.district}, {order.province}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#664C3B] font-medium">Hình thức thanh toán:</span>
            <span className="font-bold text-[#872B10]">
              {order.paymentMethod === 'cod' ? 'Thanh toán khi nhận (COD)' : 'Chuyển khoản QR'}
            </span>
          </div>
        </div>

        {/* Bank Transfer QR if Banking Chosen */}
        {order.paymentMethod === 'banking' && (
          <div className="mb-5 p-4 bg-[#FAF5EE] rounded-xl border border-[#E0D5C3] text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#872B10] mb-2">
              <QrCode className="w-4 h-4" />
              <span>Quét mã VietQR chuyển khoản thanh toán</span>
            </div>

            {/* Generated QR Box */}
            <div className="bg-white p-3 rounded-lg inline-block border border-[#D5C2AF] shadow-sm mb-2">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=VERA-${order.id}-${order.total}`}
                alt="Mã QR thanh toán chuyển khoản VERA"
                className="w-36 h-36 mx-auto"
              />
            </div>

            <div className="text-xs text-[#3D2C20] space-y-1">
              <div>Ngân hàng: <strong>Vietcombank (Chi nhánh Sài Gòn)</strong></div>
              <div>Số tài khoản: <strong className="text-base text-[#872B10] font-bold tracking-wide">0071 0008 99999</strong></div>
              <div>Chủ tài khoản: <strong>CTY TNHH THỜI TRANG VERA</strong></div>
              <div>Số tiền: <strong className="text-base font-extrabold text-[#872B10] tabular-nums">{formatPrice(order.total)}</strong></div>
              <div>Nội dung chuyển khoản: <strong className="bg-white px-2 py-0.5 rounded border border-[#E8DFC8] font-bold text-[#1C140E]">{order.id} {order.customerPhone}</strong></div>
            </div>
          </div>
        )}

        {/* Order Item Details */}
        <div className="mb-5 space-y-2 border-t border-[#E8DFC8] pt-4">
          <div className="text-xs font-bold text-[#3B2519] mb-2">Chi tiết sản phẩm đã chọn:</div>
          <div className="space-y-2 max-h-36 overflow-y-auto pr-1 text-xs">
            {order.items.map((i) => (
              <div key={i.id} className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-[#E8DFC8]">
                <div className="flex items-center gap-2.5">
                  <img src={i.product.images[0]} alt={i.product.name} className="w-9 h-11 object-contain bg-[#FAF8F5] rounded" />
                  <div>
                    <div className="font-semibold text-[#1C140E] line-clamp-1">{i.product.name}</div>
                    <div className="text-xs text-[#664C3B] font-medium">Size: {i.selectedSize} · SL: {i.quantity}</div>
                  </div>
                </div>
                <span className="font-bold text-[#872B10] tabular-nums">{formatPrice(i.product.price * i.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="pt-2.5 text-sm flex justify-between items-baseline font-bold text-[#1C140E]">
            <span>Tổng thanh toán:</span>
            <span className="text-xl font-extrabold text-[#872B10] tabular-nums">{formatPrice(order.total)}</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full bg-[#7C442A] hover:bg-[#68361E] text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer text-xs sm:text-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Tiếp tục mua sắm cùng VERA</span>
          </button>
        </div>

      </div>
    </div>
  );
};
