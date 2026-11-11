import React, { useState } from 'react';
import { CartItem, Order, Voucher } from '../types';
import { X, ShieldCheck, Truck, QrCode, CreditCard, Banknote, Check } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedVoucher: Voucher | null;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  appliedVoucher,
  onOrderSuccess
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [province, setProvince] = useState('Hồ Chí Minh');
  const [district, setDistrict] = useState('Quận 1');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'banking'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  let discountAmount = 0;
  if (appliedVoucher) {
    if (appliedVoucher.discountType === 'fixed') {
      discountAmount = appliedVoucher.discountValue;
    } else if (appliedVoucher.discountType === 'percent') {
      discountAmount = Math.min(100000, Math.round((subtotal * appliedVoucher.discountValue) / 100));
    }
  }

  const shippingFee = subtotal >= 499000 ? 0 : 30000;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const formatPrice = (v: number) => v.toLocaleString('vi-VN') + '₫';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Vui lòng nhập họ và tên nhận hàng.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 9) {
      setErrorMsg('Vui lòng nhập số điện thoại hợp lệ để giao hàng.');
      return;
    }
    if (!address.trim()) {
      setErrorMsg('Vui lòng nhập địa chỉ giao hàng cụ thể.');
      return;
    }

    setIsSubmitting(true);

    const orderId = 'VERA' + Math.floor(100000 + Math.random() * 900000);
    const trackingCode = 'VNPOST' + Math.floor(10000000 + Math.random() * 90000000);

    const newOrder: Order = {
      id: orderId,
      customerName: name.trim(),
      customerPhone: phone.trim(),
      customerEmail: email.trim(),
      province,
      district,
      address: address.trim(),
      note: note.trim(),
      paymentMethod,
      items: [...items],
      subtotal,
      discount: discountAmount,
      discountCode: appliedVoucher?.code,
      shippingFee,
      total,
      createdAt: new Date().toLocaleString('vi-VN'),
      trackingCode
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onOrderSuccess(newOrder);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="bg-[#FAF8F5] rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#E0D5C3] relative flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E8DFC8] flex items-center justify-between bg-white">
          <div>
            <h2 className="text-xl font-bold text-[#1C140E]">
              Thông Tin Đặt Hàng & Thanh Toán
            </h2>
            <p className="text-xs text-[#664C3B] mt-0.5 font-medium">
              Cam kết đồng kiểm khi nhận hàng · Hỗ trợ đổi size tận nhà trong 7 ngày
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#5C4535] hover:text-[#7C442A] hover:bg-[#F3EBE1] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 flex-1 space-y-6">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left: Customer Info */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-[#7C442A] uppercase tracking-wider flex items-center gap-1.5">
                <Truck className="w-4 h-4" />
                <span>1. Thông tin người nhận</span>
              </h3>

              <div>
                <label className="block text-xs font-medium text-[#3B2519] mb-1">
                  Họ và tên quý khách <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Thanh Thảo"
                  className="w-full text-xs bg-white border border-[#D5C2AF] rounded-lg px-3 py-2.5 outline-none focus:border-[#7C442A]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#3B2519] mb-1">
                  Số điện thoại nhận hàng <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ví dụ: 0908 123 456"
                  className="w-full text-xs bg-white border border-[#D5C2AF] rounded-lg px-3 py-2.5 outline-none focus:border-[#7C442A]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#3B2519] mb-1">
                  Địa chỉ Email (Nhận mã vận đơn & voucher)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="thanhthao@gmail.com"
                  className="w-full text-xs bg-white border border-[#D5C2AF] rounded-lg px-3 py-2.5 outline-none focus:border-[#7C442A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#3B2519] mb-1">
                    Tỉnh / Thành phố
                  </label>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full text-xs bg-white border border-[#D5C2AF] rounded-lg px-3 py-2.5 outline-none focus:border-[#7C442A] cursor-pointer"
                  >
                    <option value="Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Cần Thơ">Cần Thơ</option>
                    <option value="Hải Phòng">Hải Phòng</option>
                    <option value="Bình Dương">Bình Dương</option>
                    <option value="Khác">Tỉnh thành khác</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#3B2519] mb-1">
                    Quận / Huyện
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="Quận 1 / Cầu Giấy..."
                    className="w-full text-xs bg-white border border-[#D5C2AF] rounded-lg px-3 py-2.5 outline-none focus:border-[#7C442A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#3B2519] mb-1">
                  Địa chỉ nhà cụ thể (Số nhà, tên đường, tòa nhà) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="184 Pasteur, P. Bến Nghé"
                  className="w-full text-xs bg-white border border-[#D5C2AF] rounded-lg px-3 py-2.5 outline-none focus:border-[#7C442A]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#3B2519] mb-1">
                  Ghi chú cho shipper (Tùy chọn)
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Giao giờ hành chính, gọi trước khi đến..."
                  className="w-full text-xs bg-white border border-[#D5C2AF] rounded-lg px-3 py-2.5 outline-none focus:border-[#7C442A]"
                />
              </div>
            </div>

            {/* Right: Payment Method & Order Summary */}
            <div className="space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-[#7C442A] uppercase tracking-wider flex items-center gap-1.5 mb-3">
                  <CreditCard className="w-4 h-4" />
                  <span>2. Phương thức thanh toán</span>
                </h3>

                <div className="space-y-2.5">
                  {/* COD Option */}
                  <label
                    className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'bg-[#FAF5EE] border-[#7C442A] shadow-sm'
                        : 'bg-white border-[#E8DFC8]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-0.5 text-[#7C442A] focus:ring-[#7C442A]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-[#7C442A]" />
                        <span className="text-xs font-bold text-[#3B2519]">
                          Thanh toán khi nhận hàng (COD)
                        </span>
                      </div>
                      <p className="text-[11px] text-[#7A6453] mt-1 leading-normal">
                        Kiểm tra sản phẩm tận tay đúng chất liệu, đường may rồi mới thanh toán cho nhân viên giao vận.
                      </p>
                    </div>
                  </label>

                  {/* QR Banking Option */}
                  <label
                    className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                      paymentMethod === 'banking'
                        ? 'bg-[#FAF5EE] border-[#7C442A] shadow-sm'
                        : 'bg-white border-[#E8DFC8]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'banking'}
                      onChange={() => setPaymentMethod('banking')}
                      className="mt-0.5 text-[#7C442A] focus:ring-[#7C442A]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <QrCode className="w-4 h-4 text-[#7C442A]" />
                        <span className="text-xs font-bold text-[#3B2519]">
                          Chuyển khoản QR (VietQR / Internet Banking)
                        </span>
                      </div>
                      <p className="text-[11px] text-[#7A6453] mt-1 leading-normal">
                        Quét mã QR tự động điền số tiền và nội dung, xác nhận đơn hàng siêu tốc.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Mini Order Summary */}
                <div className="mt-5 p-3.5 bg-white rounded-xl border border-[#E8DFC8] space-y-2 text-xs">
                  <div className="font-bold text-[#3B2519] border-b border-[#F0E6D8] pb-1.5 flex justify-between">
                    <span>Đơn hàng ({items.reduce((a, b) => a + b.quantity, 0)} món)</span>
                    <span className="text-[#7C442A] font-semibold">{appliedVoucher?.code || 'Không có mã'}</span>
                  </div>

                  <div className="max-h-28 overflow-y-auto space-y-1.5 pr-1 text-xs text-[#4A382C]">
                    {items.map((i) => (
                      <div key={i.id} className="flex justify-between items-center">
                        <span className="line-clamp-1 flex-1 mr-2 font-medium">
                          {i.product.name} ({i.selectedColor ? i.selectedColor.split('(')[0].trim() + ' · ' : ''}Size {i.selectedSize} · x{i.quantity})
                        </span>
                        <span className="font-bold text-[#1C140E] tabular-nums shrink-0">{formatPrice(i.product.price * i.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-[#F0E6D8] pt-2 space-y-1.5 text-xs">
                    <div className="flex justify-between text-[#523E30]">
                      <span>Tạm tính:</span>
                      <span className="font-bold text-[#1C140E] tabular-nums">{formatPrice(subtotal)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-700 font-semibold">
                        <span>Giảm giá ({appliedVoucher?.code}):</span>
                        <span className="font-bold text-emerald-700 tabular-nums">-{formatPrice(discountAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[#523E30]">
                      <span>Phí giao hàng:</span>
                      <span className="font-bold text-[#1C140E] tabular-nums">
                        {shippingFee === 0 ? <strong className="text-emerald-700 font-bold">Miễn phí</strong> : formatPrice(shippingFee)}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline font-bold text-[#1C140E] pt-2 text-sm border-t border-[#E8DFC8]">
                      <span>Tổng tiền cần trả:</span>
                      <span className="text-xl font-extrabold text-[#872B10] tabular-nums">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#7C442A] hover:bg-[#68361E] disabled:bg-gray-400 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer text-sm"
                >
                  {isSubmitting ? (
                    <span>Đang xử lý đơn hàng...</span>
                  ) : (
                    <span>Xác nhận đặt hàng ngay ({formatPrice(total)})</span>
                  )}
                </button>
                <div className="text-center text-xs text-[#664C3B] mt-2 flex items-center justify-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Bảo mật thông tin đơn hàng 100% · VERA liên hệ trước khi gửi</span>
                </div>
              </div>

            </div>

          </div>
        </form>
      </div>
    </div>
  );
};
