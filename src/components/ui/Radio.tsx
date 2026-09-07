import React from 'react';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: React.ReactNode;
  description?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, description, checked, disabled, className = '', id, ...props }, ref) => {
    const inputId = id || (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <label
        htmlFor={inputId}
        className={`inline-flex items-start gap-3 select-none text-left cursor-pointer group ${
          disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
        } ${className}`}
      >
        <div className="relative flex items-center justify-center pt-0.5">
          <input
            ref={ref}
            id={inputId}
            type="radio"
            checked={checked}
            disabled={disabled}
            className="sr-only peer"
            {...props}
          />
          {/* 20px radio, selected #596052 */}
          <div
            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200 ${
              checked
                ? 'border-[#596052] bg-white'
                : 'bg-white border-[#D8D1C5] group-hover:border-[#171717]/60'
            } peer-focus-visible:ring-2 peer-focus-visible:ring-[#963F24] peer-focus-visible:ring-offset-1`}
          >
            {checked && (
              <div className="w-2.5 h-2.5 rounded-full bg-[#596052] transition-transform animate-scaleIn" />
            )}
          </div>
        </div>

        {(label || description) && (
          <div className="space-y-0.5">
            {label && (
              <div className="text-xs font-sans font-medium text-[#171717] group-hover:text-[#963F24] transition-colors leading-tight">
                {label}
              </div>
            )}
            {description && (
              <div className="text-[11px] text-[#6F6A61] font-sans leading-tight">
                {description}
              </div>
            )}
          </div>
        )}
      </label>
    );
  }
);

Radio.displayName = 'Radio';
