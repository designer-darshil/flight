import React, { useState } from 'react';

export type AvatarSize = 24 | 32 | 40 | 48 | 64 | 80;

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name = 'Alex Morgan',
  size = 40,
  className = '',
}) => {
  const [imageError, setImageError] = useState(false);

  // Extract initials (e.g. "Alex Morgan" -> "AM")
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const sizeClasses: Record<AvatarSize, { container: string; text: string }> = {
    24: { container: 'w-6 h-6', text: 'text-[9px]' },
    32: { container: 'w-8 h-8', text: 'text-xs' },
    40: { container: 'w-10 h-10', text: 'text-sm' }, // 40px default
    48: { container: 'w-12 h-12', text: 'text-base' },
    64: { container: 'w-16 h-16', text: 'text-lg font-bold' },
    80: { container: 'w-20 h-20', text: 'text-2xl font-bold' },
  };

  const currentSize = sizeClasses[size] || sizeClasses[40];

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full border border-[#D8D1C5] overflow-hidden select-none shrink-0 ${currentSize.container} ${className}`}
      title={name}
    >
      {src && !imageError ? (
        <img
          src={src}
          alt={alt || name}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <div
          className={`w-full h-full flex items-center justify-center bg-[#596052] text-white font-mono font-medium tracking-wider ${currentSize.text}`}
        >
          {initials}
        </div>
      )}
    </div>
  );
};
