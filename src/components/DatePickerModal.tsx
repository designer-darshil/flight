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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[rgba(23,23,23,0.25)] overflow-y-auto">
      <div className="bg-[#FFFFFF] w-full max-w-3xl rounded-[16px] border border-[#D8D1C5] shadow-[0_24px_60px_rgba(23,23,23,0.10)] p-6 sm:p-8 my-auto relative text-ink">
        
        {/* HEADER */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center space-x-2.5">
            <CalendarIcon className="w-5 h-5 text-[#963F24]" />
            <div>
              <h3 className="text-lg font-serif font-medium text-ink">Select Travel Dates</h3>
              <p className="text-xs text-warm-gray font-serif">Estimated round-trip fares indicated beneath dates</p>
            </div>
          </div>
          <button
            onClick={() => setIsDatePickerOpen(false)}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-[8px] hover:bg-sand text-warm-gray hover:text-ink transition-colors focus-visible:ring-2 focus-visible:ring-[#963F24] cursor-pointer"
            aria-label="Close date picker"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SELECTED RANGE PILLS */}
        <div className="flex items-center space-x-4 my-5 p-3.5 rounded-[8px] bg-sand/40 border border-border text-xs font-mono">
          <div className="flex-1">
            <span className="text-[10px] uppercase text-warm-gray block">Departure</span>
            <span className="text-ink font-semibold text-sm">{depDate} Sep 2026</span>
          </div>
          <div className="text-warm-gray">➔</div>
          <div className="flex-1 text-right">
            <span className="text-[10px] uppercase text-warm-gray block">Return</span>
            <span className="text-[#963F24] font-semibold text-sm">{retDate} Sep 2026</span>
          </div>
        </div>

        {/* DUAL MONTH DISPLAY */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 my-4">
          
          {/* MONTH 1: SEPTEMBER 2026 */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-serif font-medium text-ink">September 2026</span>
              <span className="text-xs font-mono text-warm-gray">Autumn</span>
            </div>

            {/* Day labels */}
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-mono text-warm-gray mb-1">
              <span>SU</span><span>MO</span><span>TU</span><span>WE</span><span>TH</span><span>FR</span><span>SA</span>
            </div>

            {/* Sep Dates Grid */}
            <div className="grid grid-cols-7 gap-1 text-center">
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
                    className={`h-11 rounded-[6px] text-xs flex flex-col items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-[#963F24] text-white font-bold shadow-sm'
                        : inRange
                        ? 'bg-sand/70 text-ink font-medium'
                        : 'text-ink hover:bg-sand/60'
                    }`}
                  >
                    <span className="text-xs">{d}</span>
                    <span className={`text-[8px] font-mono ${isSelected ? 'text-white' : 'text-warm-gray'}`}>
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
              <span className="text-sm font-serif font-medium text-ink">October 2026</span>
              <span className="text-xs font-mono text-warm-gray">Peak</span>
            </div>

            {/* Day labels */}
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-mono text-warm-gray mb-1">
              <span>SU</span><span>MO</span><span>TU</span><span>WE</span><span>TH</span><span>FR</span><span>SA</span>
            </div>

            {/* Oct Dates Grid */}
            <div className="grid grid-cols-7 gap-1 text-center">
              <div /><div /><div /><div />
              {daysOct.map(d => (
                <button
                  key={`oct-${d}`}
                  onClick={() => setRetDate(30 + d)}
                  className="h-11 rounded-[6px] text-xs text-ink hover:bg-sand/60 flex flex-col items-center justify-center transition-colors"
                >
                  <span className="text-xs">{d}</span>
                  <span className="text-[8px] font-mono text-warm-gray">₹44K</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="pt-4 border-t border-border flex items-center justify-between font-mono text-xs">
          <div className="text-warm-gray">
            Trip duration: <strong className="text-ink">{retDate - depDate} nights</strong>
          </div>
          <button
            onClick={handleApply}
            className="px-6 py-2.5 rounded-[8px] bg-[#963F24] hover:bg-[#7E331B] text-white font-medium uppercase tracking-wider transition-colors shadow-sm"
          >
            Apply Dates
          </button>
        </div>
      </div>
    </div>
  );
};
