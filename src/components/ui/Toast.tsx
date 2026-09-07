import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'warning' | 'error' | 'info';

export interface ToastProps {
  id?: string;
  type?: ToastType;
  title: string;
  message?: string;
  duration?: number;
  onClose: () => void;
  className?: string;
}

export const Toast: React.FC<ToastProps> = ({
  type = 'info',
  title,
  message,
  duration = 4000,
  onClose,
  className = '',
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const typeConfig = {
    success: { icon: CheckCircle2, color: 'text-[#3F6B4F]', border: 'border-l-4 border-l-[#3F6B4F]' },
    warning: { icon: AlertTriangle, color: 'text-[#8A5A1F]', border: 'border-l-4 border-l-[#8A5A1F]' },
    error: { icon: AlertCircle, color: 'text-[#9B3D32]', border: 'border-l-4 border-l-[#9B3D32]' },
    info: { icon: Info, color: 'text-[#596052]', border: 'border-l-4 border-l-[#596052]' },
  }[type];

  const IconComp = typeConfig.icon;

  return (
    <div
      role="alert"
      className={`bg-white border border-[#D8D1C5] rounded-[8px] shadow-[0_12px_32px_rgba(23,23,23,0.08)] p-3.5 pr-8 relative flex items-start gap-3 max-w-sm text-left select-none animate-slideInRight ${typeConfig.border} ${className}`}
    >
      <IconComp className={`w-4 h-4 shrink-0 mt-0.5 ${typeConfig.color}`} />
      <div className="space-y-0.5">
        <div className="text-xs font-serif font-bold text-[#171717] leading-snug">{title}</div>
        {message && (
          <div className="text-[11px] font-sans text-[#6F6A61] leading-relaxed">{message}</div>
        )}
      </div>
      <button
        onClick={onClose}
        className="absolute top-3 right-2.5 p-1 text-[#6F6A61] hover:text-[#171717] transition-colors"
        aria-label="Dismiss toast"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
