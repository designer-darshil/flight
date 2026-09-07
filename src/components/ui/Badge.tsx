import React from 'react';

export type BadgeVariant = 'on-time' | 'popular' | 'good-price' | 'refundable' | 'stop' | 'neutral';

export interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  children,
  icon,
  className = '',
}) => {
  // Height: 28–32px. Radius: 6px strictly (not a giant pill)
  const variantStyles: Record<BadgeVariant, string> = {
    'on-time': 'bg-[#3F6B4F]/10 text-[#3F6B4F] border border-[#3F6B4F]/30',
    'popular': 'bg-[#C96B45]/10 text-[#963F24] border border-[#C96B45]/30',
    'good-price': 'bg-[#B79B69]/15 text-[#6E5933] border border-[#B79B69]/40',
    'refundable': 'bg-[#596052]/10 text-[#596052] border border-[#596052]/30',
    'stop': 'bg-[#EFE9DE] text-[#6F6A61] border border-[#D8D1C5]',
    'neutral': 'bg-white text-[#171717] border border-[#D8D1C5]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 h-[30px] px-2.5 rounded-[6px] text-[11px] font-mono font-bold tracking-wider uppercase select-none ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {!icon && variant === 'on-time' && (
        <span className="w-1.5 h-1.5 rounded-full bg-[#3F6B4F] shrink-0" />
      )}
      <span>{children}</span>
    </span>
  );
};
