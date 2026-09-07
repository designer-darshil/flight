import React from 'react';
import { Check } from 'lucide-react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: React.ReactNode;
  description?: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, error, checked, disabled, className = '', id, ...props }, ref) => {
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
            type="checkbox"
            checked={checked}
            disabled={disabled}
            className="sr-only peer"
            {...props}
          />
          {/* 18px checkbox, white surface, warm gray border, selected #596052 */}
          <div
            className={`w-[18px] h-[18px] rounded-[4px] border flex items-center justify-center transition-all duration-200 ${
              checked
                ? 'bg-[#596052] border-[#596052] text-white'
                : 'bg-white border-[#D8D1C5] group-hover:border-[#171717]/60'
            } peer-focus-visible:ring-2 peer-focus-visible:ring-[#963F24] peer-focus-visible:ring-offset-1 ${
              error ? 'border-[#9B3D32]' : ''
            }`}
          >
            {checked && <Check className="w-3 h-3 stroke-[2.5]" />}
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
            {error && (
              <div className="text-[10px] text-[#9B3D32] font-mono mt-0.5">
                {error}
              </div>
            )}
          </div>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
