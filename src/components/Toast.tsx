import { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastProps {
  message: ToastMessage | null;
  onClose: () => void;
}

const iconMap: Record<ToastType, JSX.Element> = {
  success: <CheckCircle2 size={18} className="text-emerald-400" />,
  error: <XCircle size={18} className="text-red-400" />,
  info: <Info size={18} className="text-indigo-400" />,
};

export function Toast({ message, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      className={`fixed top-20 right-4 z-[100] transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
      }`}
    >
      <div className="bg-slate-800 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 shadow-2xl min-w-[250px]">
        {iconMap[message.type]}
        <span className="text-white text-sm font-medium">{message.message}</span>
      </div>
    </div>
  );
}
