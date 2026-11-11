import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { getSmartVeraReply } from '../utils/veraChatAssistant';

interface ChatMessage {
  id: string;
  sender: 'user' | 'support';
  text: string;
  time: string;
}

interface ChatWidgetProps {
  onOpenVoucherModal?: () => void;
}

const QUICK_TOPICS = [
  'Tư vấn chọn size',
  'Phí ship & Freeship',
  'Chính sách đổi trả',
  'Mã giảm giá 50K',
  'Địa chỉ Showroom'
];

function getCurrentTime(): string {
  const now = new Date();
  return now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ onOpenVoucherModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'support',
      text: 'Xin chào! VERA rất vui được đồng hành cùng bạn. Bạn cần tư vấn chọn size, phối đồ hay kiểm tra chính sách đơn hàng ạ?',
      time: getCurrentTime()
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const sendQuickReply = (topic: string) => {
    if (isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: topic,
      time: getCurrentTime()
    };

    const replyMsg: ChatMessage = {
      id: `support-${Date.now() + 1}`,
      sender: 'support',
      text: getSmartVeraReply(topic),
      time: getCurrentTime()
    };

    setMessages((prev) => [...prev, userMsg, replyMsg]);
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      time: getCurrentTime()
    };

    const currentHistory = messages.map((m) => ({
      sender: m.sender,
      text: m.text
    }));

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 4500);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          message: trimmed,
          history: currentHistory
        })
      });

      const data = await response.json();
      const replyText =
        response.ok && data.reply
          ? data.reply
          : getSmartVeraReply(trimmed);

      const supportMsg: ChatMessage = {
        id: `support-${Date.now()}`,
        sender: 'support',
        text: replyText,
        time: getCurrentTime()
      };
      setMessages((prev) => [...prev, supportMsg]);
    } catch {
      const fallbackMsg: ChatMessage = {
        id: `support-${Date.now()}`,
        sender: 'support',
        text: getSmartVeraReply(trimmed),
        time: getCurrentTime()
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      window.clearTimeout(timeoutId);
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div
          className="mb-3 w-[calc(100vw-2rem)] sm:w-[360px] max-h-[75dvh] sm:max-h-[520px] bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#D5C2AF] flex flex-col overflow-hidden animate-fadeIn"
          role="dialog"
          aria-label="Khung chat hỗ trợ khách hàng VERA"
        >
          {/* Header */}
          <div className="bg-[#7C442A] text-[#FAF8F5] px-4 py-3 flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-full bg-[#FAF8F5] text-[#7C442A] flex items-center justify-center font-extrabold text-sm shrink-0 shadow-xs">
                V
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm truncate">Tư vấn viên VERA</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" title="Đang trực tuyến" />
                </div>
                <p className="text-[11px] text-[#E8DFC8] truncate">
                  Hỗ trợ chọn size &amp; đơn hàng 09:00 – 21:30
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/15 text-[#FAF8F5] transition-colors cursor-pointer shrink-0"
              aria-label="Đóng khung chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 min-h-[220px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-[#7C442A] text-white rounded-br-sm'
                      : 'bg-white text-[#3B2519] border border-[#E8DFC8] rounded-bl-sm shadow-2xs'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-[#8C6D58] mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start">
                <div className="bg-white border border-[#E8DFC8] rounded-2xl rounded-bl-sm px-3.5 py-2 text-xs text-[#8C6D58]">
                  Tư vấn viên đang nhập...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Reply Chips */}
          <div className="px-3 py-2 bg-[#F5EFE6] border-t border-[#E8DFC8] flex items-center gap-1.5 overflow-x-auto shrink-0">
            {QUICK_TOPICS.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => sendQuickReply(topic)}
                className="text-[11px] font-medium bg-white hover:bg-[#FAF5EE] text-[#7C442A] border border-[#D5C2AF] hover:border-[#7C442A] px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 transition-colors cursor-pointer"
              >
                {topic}
              </button>
            ))}
            {onOpenVoucherModal && (
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenVoucherModal();
                }}
                className="text-[11px] font-semibold bg-[#7C442A] text-white px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 flex items-center gap-1 cursor-pointer hover:bg-[#68361E] transition-colors"
              >
                <Sparkles className="w-3 h-3" />
                <span>Lấy mã 50K</span>
              </button>
            )}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={handleSubmit}
            className="p-2.5 bg-white border-t border-[#E8DFC8] flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Nhập câu hỏi của bạn (size, đơn hàng...)"
              className="flex-1 text-xs text-[#3B2519] bg-[#FAF8F5] border border-[#D5C2AF] focus:border-[#7C442A] rounded-full px-3.5 py-2 outline-none placeholder:text-[#A89382]"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2 rounded-full bg-[#7C442A] hover:bg-[#68361E] disabled:opacity-40 text-white transition-colors cursor-pointer disabled:cursor-not-allowed shrink-0"
              aria-label="Gửi tin nhắn"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-[#7C442A] hover:bg-[#68361E] text-[#FAF8F5] px-3.5 sm:px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer border border-[#FAF8F5]/20"
        aria-label={isOpen ? 'Đóng khung chat' : 'Mở khung chat tư vấn VERA'}
      >
        {isOpen ? (
          <X className="w-5 h-5 shrink-0" />
        ) : (
          <>
            <MessageCircle className="w-5 h-5 shrink-0" />
            <span className="hidden sm:inline text-xs font-bold tracking-wide">
              Chat tư vấn
            </span>
          </>
        )}
      </button>
    </div>
  );
};
