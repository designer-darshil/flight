import React from 'react';
import { Search, X, AlertCircle, ChevronDown } from 'lucide-react';

/* ==================================================
   1. STANDARD TEXT / NUMBER / DATE INPUT
   ================================================== */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  sizeVariant?: 'default' | 'large';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      sizeVariant = 'default',
      leftIcon,
      rightIcon,
      disabled,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const heightClass = sizeVariant === 'large' ? 'h-14 text-base' : 'h-12 text-sm';

    return (
      <div className="w-full space-y-1.5 text-left font-sans">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-mono font-bold uppercase tracking-wider text-[#171717]">
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-4 text-[#6F6A61] pointer-events-none shrink-0">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={`w-full ${heightClass} bg-white text-[#171717] placeholder-[#6F6A61] rounded-[8px] border px-4 font-normal transition-all duration-200 outline-none ${
              leftIcon ? 'pl-11' : ''
            } ${rightIcon ? 'pr-11' : ''} ${
              error
                ? 'border-[#9B3D32] focus:ring-2 focus:ring-[#9B3D32]/20'
                : 'border-[#D8D1C5] hover:border-[#171717]/40 focus:border-[#963F24] focus:ring-2 focus:ring-[#963F24]/20'
            } ${disabled ? 'bg-[#EFE9DE]/40 text-[#6F6A61] cursor-not-allowed opacity-60' : ''} ${className}`}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-4 text-[#6F6A61] pointer-events-none shrink-0">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-1.5 text-xs text-[#9B3D32] font-mono mt-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {!error && helperText && (
          <div className="text-[11px] text-[#6F6A61] font-sans mt-0.5">{helperText}</div>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

/* ==================================================
   2. SEARCH INPUT
   ================================================== */
export interface SearchInputProps extends Omit<InputProps, 'leftIcon' | 'type'> {
  onClear?: () => void;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onClear, className = '', ...props }, ref) => {
    return (
      <Input
        ref={ref}
        type="search"
        leftIcon={<Search className="w-4 h-4" />}
        rightIcon={
          value && onClear ? (
            <button
              type="button"
              onClick={onClear}
              className="p-1 text-[#6F6A61] hover:text-[#171717] transition-colors pointer-events-auto"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : undefined
        }
        value={value}
        className={className}
        {...props}
      />
    );
  }
);
SearchInput.displayName = 'SearchInput';

/* ==================================================
   3. SELECT COMPONENT
   ================================================== */
export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  sizeVariant?: 'default' | 'large';
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, helperText, sizeVariant = 'default', disabled, className = '', id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const heightClass = sizeVariant === 'large' ? 'h-14 text-base' : 'h-12 text-sm';

    return (
      <div className="w-full space-y-1.5 text-left font-sans">
        {label && (
          <label htmlFor={selectId} className="block text-xs font-mono font-bold uppercase tracking-wider text-[#171717]">
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            className={`w-full ${heightClass} bg-white text-[#171717] rounded-[8px] border pl-4 pr-10 font-normal appearance-none cursor-pointer transition-all duration-200 outline-none ${
              error
                ? 'border-[#9B3D32] focus:ring-2 focus:ring-[#9B3D32]/20'
                : 'border-[#D8D1C5] hover:border-[#171717]/40 focus:border-[#963F24] focus:ring-2 focus:ring-[#963F24]/20'
            } ${disabled ? 'bg-[#EFE9DE]/40 text-[#6F6A61] cursor-not-allowed opacity-60' : ''} ${className}`}
            {...props}
          >
            {options.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <ChevronDown className="absolute right-4 w-4 h-4 text-[#6F6A61] pointer-events-none" />
        </div>

        {error && (
          <div className="flex items-center gap-1.5 text-xs text-[#9B3D32] font-mono mt-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {!error && helperText && (
          <div className="text-[11px] text-[#6F6A61] font-sans mt-0.5">{helperText}</div>
        )}
      </div>
    );
  }
);
Select.displayName = 'Select';

/* ==================================================
   4. TEXTAREA COMPONENT
   ================================================== */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, disabled, className = '', id, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5 text-left font-sans">
        {label && (
          <label htmlFor={textareaId} className="block text-xs font-mono font-bold uppercase tracking-wider text-[#171717]">
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          className={`w-full min-h-[100px] p-4 bg-white text-[#171717] placeholder-[#6F6A61] rounded-[8px] border font-normal transition-all duration-200 outline-none text-sm ${
            error
              ? 'border-[#9B3D32] focus:ring-2 focus:ring-[#9B3D32]/20'
              : 'border-[#D8D1C5] hover:border-[#171717]/40 focus:border-[#963F24] focus:ring-2 focus:ring-[#963F24]/20'
          } ${disabled ? 'bg-[#EFE9DE]/40 text-[#6F6A61] cursor-not-allowed opacity-60' : ''} ${className}`}
          {...props}
        />

        {error && (
          <div className="flex items-center gap-1.5 text-xs text-[#9B3D32] font-mono mt-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {!error && helperText && (
          <div className="text-[11px] text-[#6F6A61] font-sans mt-0.5">{helperText}</div>
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
