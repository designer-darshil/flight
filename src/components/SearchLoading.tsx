import React from 'react';
import { Plane } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const SearchLoading: React.FC = () => {
  const { isSearching, searchProgressText, searchParams } = useBooking();

  if (!isSearching) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cream/95 backdrop-blur-xl">
      <div className="text-center space-y-6 max-w-md px-6">
        
        {/* Animated radar pulse with aircraft icon */}
        <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-terracotta/30 animate-ping opacity-50" />
          <div className="absolute inset-2 rounded-full border border-border animate-pulse" />
          <div className="w-16 h-16 rounded-2xl bg-paper border border-border shadow-xl flex items-center justify-center">
            <Plane className="w-8 h-8 text-terracotta animate-pulse rotate-45" />
          </div>
        </div>

        {/* Route Line */}
        <div className="flex items-center justify-center space-x-3 text-xs font-mono text-warm-gray">
          <span className="font-bold text-ink text-base">{searchParams.from.code}</span>
          <div className="w-24 border-t-2 border-dashed border-terracotta relative">
            <span className="w-2 h-2 rounded-full bg-terracotta absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping" />
          </div>
          <span className="font-bold text-ink text-base">{searchParams.to.code}</span>
        </div>

        {/* Headline and Progress Text */}
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-terracotta font-medium">
            SEARCHING GLOBAL AIRSPACE
          </div>
          <div className="text-lg font-serif font-light text-ink min-h-[28px] transition-all">
            {searchProgressText}
          </div>
        </div>

        <div className="w-64 h-1.5 bg-sand rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-gradient-to-r from-terracotta via-champagne to-terracotta rounded-full animate-pulse w-3/4 mx-auto" />
        </div>
      </div>
    </div>
  );
};
