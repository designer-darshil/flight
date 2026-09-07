import React from 'react';

export interface SwitchProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  className = '',
}) => {
  return (
    <label
      className={`inline-flex items-center justify-between gap-4 select-none cursor-pointer group ${
        disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
      } ${className}`}
    >
      {(label || description) && (
        <div className="text-left space-y-0.5">
          {label && (
            <div className="text-xs font-sans font-medium text-[#171717] group-hover:text-[#963F24] transition-colors">
              {label}
            </div>
          )}
          {description && (
            <div className="text-[11px] text-[#6F6A61] font-sans">
              {description}
            </div>
          )}
        </div>
      )}

      {/* Switch track: Off #D8D1C5, Active #596052 */}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#963F24] focus-visible:ring-offset-2 ${
          checked ? 'bg-[#596052]' : 'bg-[#D8D1C5]'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </label>
  );
};
