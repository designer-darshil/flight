import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: 'sm' | 'md' | 'lg';
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  width = 'md',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Desktop width: 420–520px
  const widthClasses = {
    sm: 'max-w-[420px]',
    md: 'max-w-[480px]',
    lg: 'max-w-[520px]',
  }[width];

  return (
    // Overlay: rgba(23, 23, 23, 0.20), NO BLUR
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#171717]/20 transition-opacity"
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        className={`w-full ${widthClasses} h-full bg-white text-[#171717] border-l border-[#D8D1C5] shadow-[-20px_0_60px_rgba(23,23,23,0.08)] flex flex-col justify-between overflow-y-auto animate-slideInRight`}
      >
        {/* HEADER */}
        <div className="p-6 border-b border-[#D8D1C5] flex items-center justify-between shrink-0">
          <div className="text-left space-y-0.5">
            {title && (
              <h3 className="text-lg font-serif font-medium text-[#171717]">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-xs font-sans text-[#6F6A61]">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#EFE9DE]/50 text-[#6F6A61] hover:text-[#171717] transition-colors"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 flex-1 overflow-y-auto text-left">
          {children}
        </div>

        {/* FOOTER */}
        {footer && (
          <div className="p-6 border-t border-[#D8D1C5] bg-[#FAF8F4] shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
