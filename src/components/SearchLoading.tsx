import React from 'react';
import { Plane } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const SearchLoading: React.FC = () => {
  const { isSearching, searchProgressText, searchParams } = useBooking();

  if (!isSearching) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-aeriva-navy/95 backdrop-blur-2xl">
      <div className="text-center space-y-6 max-w-md px-6">
        
        {/* Animated radar sonar pulse with aircraft icon */}
        <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-ping opacity-60" />
          <div className="absolute inset-2 rounded-full border border-aerova-blue/50 animate-pulse" />
          <div className="w-16 h-16 rounded-2xl bg-aeriva-charcoal border border-cyan-400/40 shadow-glow-cyan flex items-center justify-center">
            <Plane className="w-8 h-8 text-cyan-400 animate-pulse" />
          </div>
        </div>

        {/* Animated Route Line */}
        <div className="flex items-center justify-center space-x-3 text-xs font-mono text-cyan-300">
          <span className="font-bold text-white text-sm">{searchParams.from.code}</span>
          <div className="w-24 border-t-2 border-dashed border-cyan-400 relative">
            <span className="w-2 h-2 rounded-full bg-cyan-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping" />
          </div>
          <span className="font-bold text-white text-sm">{searchParams.to.code}</span>
        </div>

        {/* Headline and Progress Text */}
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-widestlabel text-cyan-400 font-bold">
            SEARCHING THE GLOBAL NETWORK
          </div>
          <div className="text-lg font-display font-medium text-slate-200 min-h-[28px] transition-all">
            {searchProgressText}
          </div>
        </div>

        <div className="w-64 h-1.5 bg-slate-800 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-gradient-to-r from-aerova-blue via-cyan-400 to-aerova-orange rounded-full animate-pulse w-3/4 mx-auto" />
        </div>
      </div>
    </div>
  );
};
