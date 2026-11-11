import React from 'react';
import { Check, Info } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'info';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-subtle">
      <div className="bg-[#3B2519] text-[#FAF8F5] px-4 py-3 rounded-xl shadow-xl border border-[#D5C2AF]/40 flex items-center gap-3 max-w-sm">
        <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
          <Check className="w-3.5 h-3.5" />
        </div>
        <p className="text-xs font-medium flex-1">{message}</p>
        <button
          onClick={onClose}
          className="text-[#D5C2AF] hover:text-white text-xs font-bold pl-2 cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
