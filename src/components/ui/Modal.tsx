import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = '2xl',
  showCloseButton = true,
}) => {
  // ESC key listener
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

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
  }[maxWidth];

  return (
    // Overlay: rgba(23, 23, 23, 0.25), completely sharp, NO BACKDROP BLUR
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#171717]/25 overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        className={`w-full ${maxWidthClasses} bg-[#FFFFFF] rounded-[16px] border border-[#D8D1C5] shadow-[0_24px_60px_rgba(23,23,23,0.10)] p-5 sm:p-8 my-auto relative text-[#171717] transition-all transform animate-scaleIn`}
      >
        {/* CLOSE BUTTON */}
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-[8px] hover:bg-[#EFE9DE]/50 text-[#6F6A61] hover:text-[#171717] transition-colors focus-visible:ring-2 focus-visible:ring-[#963F24] cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* HEADER */}
        {(title || description) && (
          <div className="pb-4 border-b border-[#D8D1C5]/60 mb-6 pr-8 text-left space-y-1">
            {title && (
              <h2 className="text-xl sm:text-2xl font-serif font-light text-[#171717] tracking-tight">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-xs font-sans text-[#6F6A61] leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}

        {/* BODY */}
        <div className="text-left">{children}</div>
      </div>
    </div>
  );
};
