import React, { useState } from 'react';
import { X, Calendar as CalendarIcon } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const DatePickerModal: React.FC = () => {
  const {
    isDatePickerOpen,
    setIsDatePickerOpen,
    setSearchParams,
  } = useBooking();

  const [depDate, setDepDate] = useState(18); // 18 Sep
  const [retDate, setRetDate] = useState(26); // 26 Sep
  const [hoverDate, setHoverDate] = useState<number | null>(null);

  if (!isDatePickerOpen) return null;

  // Mock price beneath dates for Sep 2026
  const priceMap: Record<number, string> = {
    14: '₹48K',
    15: '₹44K',
    16: '₹41K',
    17: '₹45K',
    18: '₹42K',
    19: '₹47K',
    20: '₹39K',
    21: '₹43K',
    22: '₹46K',
    23: '₹41K',
    24: '₹44K',
    25: '₹48K',
    26: '₹42K',
    27: '₹49K',
    28: '₹40K',
    29: '₹45K',
    30: '₹43K',
  };

  const daysSep = Array.from({ length: 30 }, (_, i) => i + 1);
  const daysOct = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleDateClick = (day: number) => {
    if (day <= depDate) {
      setDepDate(day);
      setRetDate(day + 8);
    } else {
      setRetDate(day);
    }
  };

  const handleApply = () => {
    setSearchParams(prev => ({
      ...prev,
      departureDate: `${depDate} Sep 2026`,
      returnDate: `${retDate} Sep 2026`,
    }));
    setIsDatePickerOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-aeriva-navy/85 backdrop-blur-2xl overflow-y-auto">
      <div className="glass-panel w-full max-w-3xl rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8 my-auto relative overflow-hidden">
        
        {/* HEADER */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center space-x-2.5">
            <CalendarIcon className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-lg font-display font-bold text-white">Select Travel Dates</h3>
              <p className="text-xs text-slate-400">Lowest estimated round-trip fares shown beneath dates</p>
            </div>
          </div>
          <button
            onClick={() => setIsDatePickerOpen(false)}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SELECTED RANGE PILLS */}
        <div className="flex items-center space-x-4 my-5 p-3 rounded-2xl bg-aeriva-charcoal border border-white/10 text-xs">
          <div className="flex-1">
            <span className="text-[10px] uppercase font-mono text-slate-400 block">Departure Date</span>
            <span className="text-white font-bold text-sm font-mono">{depDate} Sep 2026</span>
          </div>
          <div className="text-slate-500 font-mono">➔</div>
          <div className="flex-1 text-right">
            <span className="text-[10px] uppercase font-mono text-slate-400 block">Return Date</span>
            <span className="text-cyan-400 font-bold text-sm font-mono">{retDate} Sep 2026</span>
          </div>
        </div>

        {/* DUAL MONTH DISPLAY */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 my-4">
          
          {/* MONTH 1: SEPTEMBER 2026 */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold font-display text-white">September 2026</span>
              <span className="text-xs font-mono text-slate-400">Autumn</span>
            </div>

            {/* Day labels */}
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-mono text-slate-500 mb-1">
              <span>SU</span><span>MO</span><span>TU</span><span>WE</span><span>TH</span><span>FR</span><span>SA</span>
            </div>

            {/* Sep Dates Grid */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {/* Offset for Sep 2026 (Starts on Tuesday = 2 empty slots) */}
              <div /><div />
              {daysSep.map(d => {
                const isSelected = d === depDate || d === retDate;
                const inRange = d > depDate && d < (hoverDate !== null && hoverDate > depDate ? hoverDate : retDate);
                const price = priceMap[d];

                return (
                  <button
                    key={`sep-${d}`}
                    onClick={() => handleDateClick(d)}
                    onMouseEnter={() => setHoverDate(d)}
                    onMouseLeave={() => setHoverDate(null)}
                    className={`h-12 rounded-xl text-xs flex flex-col items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-cyan-400 text-slate-950 font-bold shadow-glow-cyan scale-105 z-10'
                        : inRange
                        ? 'bg-aeriva-blue/20 text-cyan-300 font-medium'
                        : 'text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <span>{d}</span>
                    <span className={`text-[9px] font-mono ${isSelected ? 'text-slate-950 font-bold' : 'text-slate-400'}`}>
                      {price || '—'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* MONTH 2: OCTOBER 2026 */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold font-display text-white">October 2026</span>
              <span className="text-xs font-mono text-slate-400">Peak Season</span>
            </div>

            {/* Day labels */}
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-mono text-slate-500 mb-1">
              <span>SU</span><span>MO</span><span>TU</span><span>WE</span><span>TH</span><span>FR</span><span>SA</span>
            </div>

            {/* Oct Dates Grid */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {/* Oct 2026 starts Thursday = 4 empty slots */}
              <div /><div /><div /><div />
              {daysOct.map(d => (
                <button
                  key={`oct-${d}`}
                  onClick={() => setRetDate(30 + d)}
                  className="h-12 rounded-xl text-xs text-slate-300 hover:bg-white/10 flex flex-col items-center justify-center"
                >
                  <span>{d}</span>
                  <span className="text-[9px] font-mono text-slate-500">₹44K</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Trip duration: <strong className="text-white font-mono">{retDate - depDate} nights</strong>
          </div>
          <button
            onClick={handleApply}
            className="px-6 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs hover:bg-cyan-300 transition-colors shadow-glow-cyan"
          >
            Apply Dates
          </button>
        </div>
      </div>
    </div>
  );
};
