import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { PRODUCTS, VOUCHERS } from './src/data/products';
import { BRAND_INFO } from './src/data/brand';
import { getSmartVeraReply } from './src/utils/veraChatAssistant';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

function buildVeraContext(): string {
  const productSummary = PRODUCTS.map((p) => {
    const stockStr = Object.entries(p.sizeStock)
      .map(([sz, qty]) => `${sz}:${qty}`)
      .join(', ');
    return `- ${p.name} (${p.categoryName}, Mã: ${p.sku}): Giá ${p.price.toLocaleString('vi-VN')}₫${
      p.originalPrice ? ` (giá gốc ${p.originalPrice.toLocaleString('vi-VN')}₫)` : ''
    } | Chất liệu: ${p.materialName} | Màu: ${p.colorName} | Tồn kho theo size: [${stockStr}] | Gợi ý phối đồ: ${p.stylingTips}`;
  }).join('\n');

  const sizeGuideStr = BRAND_INFO.sizeGuide
    .map((s) => `Size ${s.size}: Ngực ${s.bust}cm, Eo ${s.waist}cm, Mông ${s.hip}cm, Cân nặng ${s.weight}`)
    .join(' | ');

  const voucherStr = VOUCHERS.map(
    (v) => `${v.code}: ${v.name} (${v.description})`
  ).join(' | ');

  return `Bạn là Tư vấn viên Thời trang & Chăm sóc khách hàng chính thức của thương hiệu thời trang nữ thiết kế VERA ("Vintage for Everyday" - "Trân trọng từng thần thái rạng rỡ").
Nhiệm vụ của bạn là trả lời mọi câu hỏi của khách hàng bằng tiếng Việt lịch sự, ấm áp, tự nhiên, ngắn gọn, dễ đọc (khoảng 2-5 câu, có thể dùng gạch đầu dòng khi liệt kê).

THÔNG TIN THƯƠNG HIỆU & CHÍNH SÁCH:
- Hotline: ${BRAND_INFO.hotline} | Email: ${BRAND_INFO.email} | Giờ mở cửa: 09:00 – 21:30 hàng ngày.
- Showroom:
  1. ${BRAND_INFO.showrooms[0].city}: ${BRAND_INFO.showrooms[0].address}
  2. ${BRAND_INFO.showrooms[1].city}: ${BRAND_INFO.showrooms[1].address}
- Bảng số đo chuẩn phụ nữ Việt: ${sizeGuideStr}
- Vận chuyển: Miễn phí giao hàng toàn quốc đơn từ 499.000₫ (dưới 499.000₫ phí 30.000₫). Nội thành 1–2 ngày, tỉnh 2–4 ngày, được đồng kiểm trước khi thanh toán.
- Đổi trả & Bảo hành: Đổi size/đổi mẫu miễn phí tận nhà trong 7 ngày (còn nguyên tem mác, chưa qua sử dụng). Bảo hành đường may và khuy nút trọn đời.
- Mã ưu đãi hiện có: ${voucherStr}

DANH SÁCH 18 SẢN PHẨM HIỆN CÓ CỦA VERA:
${productSummary}

LƯU Ý QUAN TRỌNG:
- Chỉ tư vấn đúng các sản phẩm, giá bán, tồn kho và chính sách ở trên. Nếu khách hỏi ngoài phạm vi thời trang/VERA (ví dụ chào hỏi, hỏi thời tiết, dịp đi tiệc, phối phụ kiện, cách giặt ủi...), vẫn trả lời thân thiện, hữu ích và khéo léo gợi ý trang phục VERA phù hợp nếu liên quan.
- Không bịa đặt sản phẩm hoặc mã giảm giá không có trong danh sách.`;
}

const VERA_SYSTEM_INSTRUCTION = buildVeraContext();

async function startServer() {
  const app = express();
  app.use(express.json());

  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body as {
        message?: string;
        history?: { sender: 'user' | 'support'; text: string }[];
      };

      if (!message || typeof message !== 'string' || !message.trim()) {
        res.status(400).json({ error: 'Vui lòng nhập nội dung tin nhắn.' });
        return;
      }

      if (!process.env.GEMINI_API_KEY) {
        res.json({ reply: getSmartVeraReply(message) });
        return;
      }

      const contents = [
        ...(Array.isArray(history) ? history.slice(-8) : []).map((msg) => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }],
        })),
        {
          role: 'user',
          parts: [{ text: message.trim() }],
        },
      ];

      const timeoutPromise = new Promise<null>((resolve) =>
        setTimeout(() => resolve(null), 3800)
      );

      const response = await Promise.race([
        ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction: VERA_SYSTEM_INSTRUCTION,
            maxOutputTokens: 350,
          },
        }),
        timeoutPromise,
      ]);

      const replyText = response?.text?.trim() || getSmartVeraReply(message);
      res.json({ reply: replyText });
    } catch (error) {
      console.error('Chat API fallback triggered:', error);
      const userMessage = typeof req.body?.message === 'string' ? req.body.message : '';
      res.json({
        reply: getSmartVeraReply(userMessage),
      });
    }
  });

  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`VERA server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
