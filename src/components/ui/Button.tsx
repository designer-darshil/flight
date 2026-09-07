import React from 'react';
import { Loader2, ArrowRight } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled = false,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    // 48px height default, 36px sm, 56px lg. 8px radius (rounded-sm)
    const sizeClasses = {
      sm: 'h-9 px-3 text-xs tracking-wider gap-1.5',
      md: 'h-12 px-6 text-[13px] tracking-widest gap-2', // 48px standard
      lg: 'h-14 px-8 text-sm tracking-widest gap-2.5',   // 56px large
    }[size];

    const variantClasses = {
      // Primary: #963F24 background, #FFFFFF text, 8px radius
      primary:
        'bg-[#963F24] text-white hover:bg-[#7E331B] active:bg-[#682915] border border-transparent shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#963F24] focus-visible:ring-offset-2',
      // Secondary: White background, #D8D1C5 border, #171717 text
      secondary:
        'bg-white text-[#171717] border border-[#D8D1C5] hover:bg-[#EFE9DE]/50 active:bg-[#EFE9DE] hover:border-[#171717]/40 shadow-sm focus-visible:ring-2 focus-visible:ring-[#171717] focus-visible:ring-offset-2',
      // Tertiary: Text + arrow, minimal editorial link
      tertiary:
        'bg-transparent text-[#171717] hover:text-[#963F24] border-b border-transparent hover:border-[#963F24] p-0 h-auto font-semibold focus-visible:ring-1 focus-visible:ring-[#963F24]',
    }[variant];

    const baseClasses =
      'inline-flex items-center justify-center rounded-[8px] font-sans font-semibold uppercase transition-all duration-200 select-none outline-none disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none cursor-pointer';

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseClasses} ${variant !== 'tertiary' ? sizeClasses : ''} ${variantClasses} ${
          fullWidth ? 'w-full' : ''
        } ${className}`}
        {...props}
      >
        {isLoading && (
          <Loader2 className="w-4 h-4 animate-spin shrink-0 text-current" />
        )}
        {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
        {!isLoading && variant === 'tertiary' && !rightIcon && (
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 shrink-0 ml-1" />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
