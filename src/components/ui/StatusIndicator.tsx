import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info } from 'lucide-react';

export type StatusType = 'success' | 'warning' | 'error' | 'info';

export interface StatusIndicatorProps {
  status: StatusType;
  label: string;
  description?: string;
  showIcon?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  description,
  showIcon = true,
  size = 'md',
  className = '',
}) => {
  const statusConfig = {
    // Success: #3F6B4F
    success: {
      color: 'text-[#3F6B4F]',
      bg: 'bg-[#3F6B4F]/10',
      border: 'border-[#3F6B4F]/30',
      icon: CheckCircle2,
    },
    // Warning: #8A5A1F
    warning: {
      color: 'text-[#8A5A1F]',
      bg: 'bg-[#8A5A1F]/10',
      border: 'border-[#8A5A1F]/30',
      icon: AlertTriangle,
    },
    // Error: #9B3D32
    error: {
      color: 'text-[#9B3D32]',
      bg: 'bg-[#9B3D32]/10',
      border: 'border-[#9B3D32]/30',
      icon: AlertCircle,
    },
    // Info: #596052
    info: {
      color: 'text-[#596052]',
      bg: 'bg-[#596052]/10',
      border: 'border-[#596052]/30',
      icon: Info,
    },
  }[status];

  const IconComp = statusConfig.icon;
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const textClass = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {showIcon && (
        <span className={`p-1 rounded-[4px] ${statusConfig.bg} ${statusConfig.color} ${statusConfig.border} border`}>
          <IconComp className={iconSize} />
        </span>
      )}
      <div className="text-left">
        <div className={`font-mono font-bold uppercase tracking-wider ${statusConfig.color} ${textClass}`}>
          {label}
        </div>
        {description && (
          <div className="text-[11px] text-[#6F6A61] font-sans mt-0.5">
            {description}
          </div>
        )}
      </div>
    </div>
  );
};
