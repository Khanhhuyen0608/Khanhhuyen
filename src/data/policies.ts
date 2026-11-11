export interface PolicyItem {
  id: string;
  shortTitle: string;
  title: string;
  badge: string;
  summary: string;
  points: string[];
  note?: string;
  isMembership?: boolean;
}

export const POLICY_ITEMS: PolicyItem[] = [
  {
    id: 'return',
    shortTitle: 'Đổi trả 7 ngày miễn phí',
    title: 'Chính sách đổi trả & hoàn tiền 7 ngày',
    badge: 'Đổi trả linh hoạt',
    summary: 'VERA hỗ trợ đổi size, đổi mẫu hoặc hoàn tiền 100% trong vòng 7 ngày kể từ khi quý khách nhận hàng.',
    points: [
      'Sản phẩm còn nguyên tem mác, chưa qua sử dụng, giặt ủi và không có mùi hương lạ.',
      'Miễn phí 100% phí vận chuyển 2 chiều nếu sản phẩm có lỗi từ nhà sản xuất hoặc giao nhầm size/mẫu.',
      'Hỗ trợ đổi size tận nhà: shipper giao size mới và thu hồi sản phẩm cũ trong cùng 1 lượt.',
      'Hoàn tiền qua chuyển khoản ngân hàng trong vòng 24 giờ làm việc sau khi VERA nhận lại kiện hàng.'
    ],
    note: 'Liên hệ Hotline 0908 123 456 hoặc nhắn tin để được tạo đơn đổi trả ngay.'
  },
  {
    id: 'warranty',
    shortTitle: 'Bảo hành đường may trọn đời',
    title: 'Chính sách bảo hành đường may trọn đời',
    badge: 'Bảo hành trọn đời',
    summary: 'Mỗi thiết kế VERA đều được cắt may tỉ mỉ tại xưởng riêng và cam kết đồng hành trọn đời sản phẩm.',
    points: [
      'Bảo hành miễn phí trọn đời: lên gấu, bóp/nới nhẹ vòng eo, đơm lại cúc ngọc/cúc gỗ dừa hoặc sửa đường chỉ bị bung.',
      'Hỗ trợ xử lý miễn phí tại cả showroom TP. Hồ Chí Minh và Hà Nội.',
      'Khách hàng ở tỉnh thành khác có thể gửi về showroom, VERA hỗ trợ chỉnh sửa và gửi lại nhanh chóng.'
    ],
    note: 'Áp dụng cho tất cả sản phẩm chính hãng của VERA - Vintage for Everyday.'
  },
  {
    id: 'care',
    shortTitle: 'Hướng dẫn giặt ủi sợi tự nhiên',
    title: 'Hướng dẫn giặt ủi sợi tự nhiên (Linen & Lụa)',
    badge: 'Chăm sóc chất liệu',
    summary: 'Chất liệu Linen tưng, Cotton hữu cơ và Lụa Satin tự nhiên sẽ bền đẹp và mềm mại hơn theo thời gian nếu được chăm sóc đúng cách.',
    points: [
      'Linen & Cotton: Giặt tay với nước mát hoặc chọn chế độ giặt nhẹ (Delicate) bằng túi giặt, không dùng chất tẩy chứa clo.',
      'Lụa Satin & Ren thêu: Giặt tay nhẹ nhàng với nước xả dịu nhẹ, không vắt xoắn mạnh để giữ cấu trúc sợi ren.',
      'Phơi trong bóng râm thoáng gió, tránh ánh nắng trực tiếp gắt để giữ màu nâu đất và kem ngà bền lâu.',
      'Ủi hơi nước ở nhiệt độ vừa (Linen) hoặc nhiệt độ thấp ở mặt trái (Lụa).'
    ],
    note: 'Mẹo nhỏ: Phun sương nhẹ trước khi ủi giúp sợi Linen phẳng mượt tự nhiên.'
  },
  {
    id: 'shipping',
    shortTitle: 'Vận chuyển & đồng kiểm hàng',
    title: 'Chính sách vận chuyển & đồng kiểm hàng',
    badge: 'Giao nhận toàn quốc',
    summary: 'VERA hợp tác cùng GHTK, GHN và VNPost để giao hàng nhanh chóng và an toàn đến tận tay quý khách.',
    points: [
      'Miễn phí vận chuyển toàn quốc cho đơn hàng từ 499.000₫ (phí đồng giá 30.000₫ với đơn dưới 499.000₫).',
      'Nội thành TP.HCM & Hà Nội: Giao nhanh trong 24 giờ (hỗ trợ giao hỏa tốc trong 2–4 giờ).',
      'Các tỉnh thành khác: Nhận hàng sau 2–4 ngày làm việc.',
      '100% đơn hàng được ĐỒNG KIỂM trước khi thanh toán: quý khách được mở kiểm tra chất vải, đường may và đúng mẫu rồi mới trả tiền.'
    ]
  },
  {
    id: 'privacy',
    shortTitle: 'Bảo mật thông tin khách hàng',
    title: 'Chính sách bảo mật thông tin khách hàng',
    badge: 'Bảo mật tuyệt đối',
    summary: 'VERA cam kết tôn trọng và bảo vệ tuyệt đối thông tin cá nhân của quý khách trong suốt quá trình mua sắm.',
    points: [
      'Thông tin họ tên, số điện thoại và địa chỉ chỉ được sử dụng cho mục đích xác nhận đơn hàng, giao nhận và bảo hành.',
      'Tuyệt đối không chia sẻ, mua bán hoặc trao đổi dữ liệu khách hàng cho bất kỳ bên thứ ba nào ngoại trừ đơn vị vận chuyển.',
      'Quý khách có quyền yêu cầu kiểm tra, chỉnh sửa hoặc xóa thông tin cá nhân bất cứ lúc nào.'
    ]
  },
  {
    id: 'club',
    shortTitle: 'Hội viên VERA Radiant Club',
    title: 'Đăng ký hội viên VERA Radiant Club',
    badge: 'Đặc quyền thành viên',
    summary: 'Gia nhập cộng đồng yêu thích phong cách Vintage Daily Basic để nhận ưu đãi riêng và quà tặng sinh nhật từ VERA.',
    points: [
      'Tặng ngay Voucher 50.000₫ cho đơn hàng đầu tiên khi đăng ký.',
      'Tích điểm 5% giá trị mọi đơn hàng để quy đổi thành phiếu mua sắm.',
      'Ưu đãi giảm 15% trong tháng sinh nhật và quyền đặt trước các BST giới hạn.',
      'Miễn phí chỉnh sửa phom dáng theo số đo riêng tại showroom.'
    ],
    isMembership: true
  }
];
