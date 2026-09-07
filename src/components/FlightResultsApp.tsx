import React, { useState, useMemo } from 'react';
import {
  SlidersHorizontal,
  Bell,
  Filter,
  X,
  Plane,
  ArrowLeft,
  Luggage,
  ShieldCheck,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { FlightCard } from './FlightCard';
import { FlightDetailsDrawer } from './FlightDetailsDrawer';
import { formatPrice, CURRENCIES } from '../utils/currency';
import { Currency } from '../types';

type SortOption = 'recommended' | 'cheapest' | 'fastest' | 'value';

export const FlightResultsApp: React.FC = () => {
  const {
    flights,
    searchParams,
    currency,
    setCurrency,
    setActiveView,
    setIsMyTripsOpen,
  } = useBooking();

  const [sortOption, setSortOption] = useState<SortOption>('recommended');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filters
  const [stopsFilter, setStopsFilter] = useState<number[]>([]);
  const [depTimeFilter, setDepTimeFilter] = useState<string>('all');
  const [arrTimeFilter, setArrTimeFilter] = useState<string>('all');
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(75000);
  const [refundableOnly, setRefundableOnly] = useState(false);
  const [checkedBagOnly, setCheckedBagOnly] = useState(false);

  const airlinesList = [
    'Emirates',
    'British Airways',
    'Air India',
    'Qatar Airways',
    'Lufthansa',
    'Singapore Airlines',
    'Turkish Airlines',
  ];

  const filteredFlights = useMemo(() => {
    return flights.filter(f => {
      // Stops
      if (stopsFilter.length > 0 && !stopsFilter.includes(f.stops)) return false;
      // Airlines
      if (selectedAirlines.length > 0 && !selectedAirlines.includes(f.airline)) return false;
      // Max price
      if (f.priceINR > maxPrice) return false;
      // Refundable
      if (refundableOnly && !f.refundable) return false;
      // Baggage
      if (checkedBagOnly && (f.baggage.checked.toLowerCase().includes('none') || f.baggage.checked.toLowerCase().includes('0'))) return false;
      
      // Departure times
      if (depTimeFilter !== 'all') {
        const hour = parseInt(f.departureTime.split(':')[0], 10);
        if (depTimeFilter === '0-6' && (hour < 0 || hour >= 6)) return false;
        if (depTimeFilter === '6-12' && (hour < 6 || hour >= 12)) return false;
        if (depTimeFilter === '12-18' && (hour < 12 || hour >= 18)) return false;
        if (depTimeFilter === '18-24' && (hour < 18 || hour >= 24)) return false;
      }

      // Arrival times
      if (arrTimeFilter !== 'all') {
        const hour = parseInt(f.arrivalTime.split(':')[0], 10);
        if (arrTimeFilter === '0-6' && (hour < 0 || hour >= 6)) return false;
        if (arrTimeFilter === '6-12' && (hour < 6 || hour >= 12)) return false;
        if (arrTimeFilter === '12-18' && (hour < 12 || hour >= 18)) return false;
        if (arrTimeFilter === '18-24' && (hour < 18 || hour >= 24)) return false;
      }

      return true;
    });
  }, [flights, stopsFilter, selectedAirlines, maxPrice, refundableOnly, checkedBagOnly, depTimeFilter, arrTimeFilter]);

  const sortedFlights = useMemo(() => {
    const list = [...filteredFlights];
    if (sortOption === 'cheapest') {
      return list.sort((a, b) => a.priceINR - b.priceINR);
    }
    if (sortOption === 'fastest') {
      return list.sort((a, b) => a.durationMinutes - b.durationMinutes);
    }
    if (sortOption === 'value') {
      // Best value balances duration and price
      return list.sort((a, b) => (a.priceINR + a.durationMinutes * 40) - (b.priceINR + b.durationMinutes * 40));
    }
    // Recommended
    return list.sort((a, b) => {
      if (a.recommended && !b.recommended) return -1;
      if (!a.recommended && b.recommended) return 1;
      return a.priceINR - b.priceINR;
    });
  }, [filteredFlights, sortOption]);

  const resetFilters = () => {
    setStopsFilter([]);
    setDepTimeFilter('all');
    setArrTimeFilter('all');
    setSelectedAirlines([]);
    setMaxPrice(75000);
    setRefundableOnly(false);
    setCheckedBagOnly(false);
  };

  const toggleStop = (val: number) => {
    setStopsFilter(prev => (prev.includes(val) ? prev.filter(s => s !== val) : [...prev, val]));
  };

  const toggleAirline = (a: string) => {
    setSelectedAirlines(prev => (prev.includes(a) ? prev.filter(item => item !== a) : [...prev, a]));
  };

  // Reusable Filter Body
  const renderFilterControls = () => (
    <div className="space-y-6">
      {/* STOPS */}
      <div>
        <label className="text-[11px] font-mono uppercase tracking-wider text-warm-gray block mb-3 font-semibold">
          Stops
        </label>
        <div className="space-y-2.5">
          {[
            { label: 'Non-stop', value: 0 },
            { label: '1 stop', value: 1 },
            { label: '2+ stops', value: 2 },
          ].map(opt => (
            <label key={opt.value} className="flex items-center space-x-2.5 text-xs text-ink cursor-pointer select-none">
              <input
                type="checkbox"
                checked={stopsFilter.includes(opt.value)}
                onChange={() => toggleStop(opt.value)}
                className="w-4 h-4 rounded border-border text-[#963F24] focus:ring-[#963F24] accent-[#963F24] cursor-pointer"
              />
              <span className="font-sans">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* DEPARTURE TIME SLOTS */}
      <div className="pt-4 border-t border-border">
        <label className="text-[11px] font-mono uppercase tracking-wider text-warm-gray block mb-3 font-semibold">
          Departure Time
        </label>
        <div className="grid grid-cols-2 gap-1.5 text-xs font-mono">
          {[
            { id: 'all', label: 'All times' },
            { id: '0-6', label: '00:00 — 06:00' },
            { id: '6-12', label: '06:00 — 12:00' },
            { id: '12-18', label: '12:00 — 18:00' },
            { id: '18-24', label: '18:00 — 24:00' },
          ].map(slot => (
            <button
              key={`dep-${slot.id}`}
              type="button"
              onClick={() => setDepTimeFilter(slot.id)}
              className={`p-2 rounded-[6px] text-left text-[11px] transition-colors border ${
                depTimeFilter === slot.id
                  ? 'bg-ink text-white border-ink font-medium'
                  : 'bg-sand/30 text-ink border-transparent hover:bg-sand'
              }`}
            >
              {slot.label}
            </button>
          ))}
        </div>
      </div>

      {/* ARRIVAL TIME SLOTS */}
      <div className="pt-4 border-t border-border">
        <label className="text-[11px] font-mono uppercase tracking-wider text-warm-gray block mb-3 font-semibold">
          Arrival Time
        </label>
        <div className="grid grid-cols-2 gap-1.5 text-xs font-mono">
          {[
            { id: 'all', label: 'All times' },
            { id: '0-6', label: '00:00 — 06:00' },
            { id: '6-12', label: '06:00 — 12:00' },
            { id: '12-18', label: '12:00 — 18:00' },
            { id: '18-24', label: '18:00 — 24:00' },
          ].map(slot => (
            <button
              key={`arr-${slot.id}`}
              type="button"
              onClick={() => setArrTimeFilter(slot.id)}
              className={`p-2 rounded-[6px] text-left text-[11px] transition-colors border ${
                arrTimeFilter === slot.id
                  ? 'bg-ink text-white border-ink font-medium'
                  : 'bg-sand/30 text-ink border-transparent hover:bg-sand'
              }`}
            >
              {slot.label}
            </button>
          ))}
        </div>
      </div>

      {/* PRICE INTERACTIVE SLIDER */}
      <div className="pt-4 border-t border-border">
        <div className="flex justify-between items-center text-xs mb-2">
          <span className="font-mono uppercase text-warm-gray font-semibold text-[11px]">Max Price</span>
          <span className="font-mono font-bold text-ink">{formatPrice(maxPrice, currency)}</span>
        </div>
        <input
          type="range"
          min={40000}
          max={75000}
          step={500}
          value={maxPrice}
          onChange={e => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[#963F24] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-warm-gray font-mono mt-1">
          <span>₹40,000</span>
          <span>₹75,000</span>
        </div>
      </div>

      {/* AIRLINES CHECKLIST */}
      <div className="pt-4 border-t border-border">
        <label className="text-[11px] font-mono uppercase tracking-wider text-warm-gray block mb-3 font-semibold">
          Airlines
        </label>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {airlinesList.map(airline => (
            <label key={airline} className="flex items-center space-x-2.5 text-xs text-ink cursor-pointer select-none">
              <input
                type="checkbox"
                checked={selectedAirlines.includes(airline)}
                onChange={() => toggleAirline(airline)}
                className="w-4 h-4 rounded border-border accent-[#963F24] cursor-pointer"
              />
              <span className="font-sans">{airline}</span>
            </label>
          ))}
        </div>
      </div>

      {/* BAGGAGE & REFUNDABILITY */}
      <div className="pt-4 border-t border-border space-y-3">
        <label className="text-[11px] font-mono uppercase tracking-wider text-warm-gray block font-semibold">
          Baggage & Refundability
        </label>
        
        <label className="flex items-center space-x-2.5 text-xs text-ink cursor-pointer select-none">
          <input
            type="checkbox"
            checked={checkedBagOnly}
            onChange={() => setCheckedBagOnly(!checkedBagOnly)}
            className="w-4 h-4 rounded border-border accent-[#963F24] cursor-pointer"
          />
          <span className="flex items-center space-x-1.5">
            <Luggage className="w-3.5 h-3.5 text-[#963F24]" />
            <span>Checked baggage included</span>
          </span>
        </label>

        <label className="flex items-center space-x-2.5 text-xs text-ink cursor-pointer select-none">
          <input
            type="checkbox"
            checked={refundableOnly}
            onChange={() => setRefundableOnly(!refundableOnly)}
            className="w-4 h-4 rounded border-border accent-[#963F24] cursor-pointer"
          />
          <span className="flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-olive" />
            <span>Refundable tickets only</span>
          </span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F6F2EA] text-ink pb-24">
      
      {/* TOP APPLICATION NAVIGATION */}
      <header className="sticky top-0 z-40 bg-[#F6F2EA] border-b border-border shadow-sm">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 flex items-center justify-between h-16">
          
          <div className="flex items-center space-x-8">
            <button
              onClick={() => setActiveView('marketing')}
              className="flex items-center space-x-2.5 text-left group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-[8px] bg-ink text-white flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M12 2L21 20L12 16L3 20L12 2Z" />
                </svg>
              </div>
              <span className="text-xl font-serif font-light tracking-widest text-ink">
                AERIVA
              </span>
            </button>

            {/* App Nav Items */}
            <nav className="hidden md:flex items-center space-x-6 text-xs font-mono text-warm-gray">
              <span className="text-ink border-b-2 border-[#963F24] py-5 font-semibold">Flights</span>
              <button onClick={() => setActiveView('marketing')} className="hover:text-ink py-5 transition-colors cursor-pointer">Explore</button>
              <button onClick={() => setIsMyTripsOpen(true)} className="hover:text-ink py-5 transition-colors cursor-pointer">Trips</button>
            </nav>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <button className="p-2 rounded-[8px] text-warm-gray hover:text-ink hover:bg-sand transition-colors cursor-pointer" title="Notifications">
              <Bell className="w-4 h-4" />
            </button>

            <select
              value={currency}
              onChange={e => setCurrency(e.target.value as Currency)}
              className="px-2.5 py-1.5 rounded-[8px] bg-white border border-border text-xs font-mono font-medium text-ink focus:outline-none focus:border-[#963F24] cursor-pointer"
            >
              {(['USD', 'INR', 'EUR', 'AED', 'GBP'] as Currency[]).map(c => (
                <option key={c} value={c}>{c} ({CURRENCIES[c].symbol})</option>
              ))}
            </select>

            <button
              onClick={() => setIsMyTripsOpen(true)}
              className="flex items-center space-x-2 p-1.5 pl-2.5 rounded-[8px] bg-white border border-border hover:border-ink/40 text-ink font-mono text-xs transition-colors cursor-pointer"
            >
              <span>Alex</span>
              <div className="w-6 h-6 rounded-[6px] bg-ink text-white flex items-center justify-center text-[10px] font-mono font-bold">
                A
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN HEADER AS REQUIRED */}
      <div className="bg-white border-b border-border py-8">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono text-warm-gray mb-3">
                <button
                  onClick={() => setActiveView('marketing')}
                  className="text-[#963F24] hover:underline flex items-center space-x-1 font-medium cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Modify Search</span>
                </button>
                <span>&bull;</span>
                <span>{searchParams.cabinClass.toUpperCase()}</span>
                <span>&bull;</span>
                <span>{searchParams.passengers.adults + searchParams.passengers.children + searchParams.passengers.infants} TRAVELERS</span>
              </div>

              {/* Exact Header Specification:
                  DELHI → LONDON
                  18 SEPTEMBER
                  127 FLIGHTS FOUND
              */}
              <h1 className="text-3xl sm:text-5xl font-serif font-light text-ink tracking-tight mb-2 uppercase">
                {searchParams.from.city.toUpperCase()} → {searchParams.to.city.toUpperCase()}
              </h1>

              <div className="text-sm sm:text-base font-mono font-medium text-warm-gray uppercase tracking-wider mb-1">
                {searchParams.departureDate.replace(/202\d/, '').trim().toUpperCase() || '18 SEPTEMBER'}
              </div>

              <div className="text-xs sm:text-sm font-mono font-bold text-[#963F24] tracking-widest uppercase">
                127 FLIGHTS FOUND
                <span className="text-warm-gray font-normal lowercase tracking-normal ml-2">
                  ({sortedFlights.length} matching current filters)
                </span>
              </div>
            </div>

            {/* Micro Route Visualization Widget */}
            <div className="hidden lg:flex items-center space-x-6 p-4 rounded-[12px] bg-sand/40 border border-border text-xs font-mono">
              <div className="text-center">
                <span className="text-warm-gray block text-[10px]">ORIGIN</span>
                <span className="font-bold text-ink text-sm">{searchParams.from.code}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-[#963F24] font-semibold">10h 00m</span>
                <div className="w-20 border-t border-dashed border-border relative my-1">
                  <Plane className="w-3.5 h-3.5 text-[#963F24] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90" />
                </div>
                <span className="text-[9px] text-warm-gray">1 STOP (DXB)</span>
              </div>
              <div className="text-center">
                <span className="text-warm-gray block text-[10px]">DESTINATION</span>
                <span className="font-bold text-ink text-sm">{searchParams.to.code}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT: FILTER SIDEBAR & RESULTS */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 pt-8">
        
        {/* Mobile Filter Trigger Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="w-full py-3 rounded-[8px] bg-white border border-border text-ink font-mono text-xs uppercase flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
          >
            <Filter className="w-4 h-4 text-[#963F24]" />
            <span>FILTER RESULTS ({stopsFilter.length + selectedAirlines.length + (depTimeFilter !== 'all' ? 1 : 0) + (arrTimeFilter !== 'all' ? 1 : 0)})</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* DESKTOP SIDEBAR FILTERS */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 space-y-6">
            <div className="bg-white rounded-[12px] p-6 border border-[#D8D1C5] shadow-sm space-y-6 sticky top-24">
              
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center space-x-2 text-sm font-serif font-medium text-ink">
                  <SlidersHorizontal className="w-4 h-4 text-[#963F24]" />
                  <span>Filters</span>
                </div>
                <button
                  onClick={resetFilters}
                  className="text-xs font-mono text-[#963F24] hover:underline font-semibold cursor-pointer"
                >
                  RESET
                </button>
              </div>

              {renderFilterControls()}
            </div>
          </aside>

          {/* MOBILE BOTTOM SHEET FILTERS */}
          {mobileFilterOpen && (
            <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-[rgba(23,23,23,0.25)]">
              <div className="bg-[#FFFFFF] rounded-t-[16px] border-t border-x border-[#D8D1C5] shadow-[0_-24px_60px_rgba(23,23,23,0.10)] max-h-[85vh] overflow-y-auto p-6 space-y-6">
                
                {/* Drag Handle */}
                <div className="w-12 h-1 rounded-full bg-[#D8D1C5] mx-auto -mt-1 mb-2" />

                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div className="flex items-center space-x-2 text-sm font-serif font-medium text-ink">
                    <SlidersHorizontal className="w-4 h-4 text-[#963F24]" />
                    <span>Filter Flights</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={resetFilters}
                      className="text-xs font-mono text-[#963F24] hover:underline font-semibold cursor-pointer"
                    >
                      RESET
                    </button>
                    <button
                      onClick={() => setMobileFilterOpen(false)}
                      className="p-1.5 rounded-[6px] bg-sand hover:bg-sand/80 text-ink cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {renderFilterControls()}

                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-3 rounded-[8px] bg-[#963F24] hover:bg-[#7E331B] text-white font-sans font-bold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                >
                  Apply Filters ({sortedFlights.length} Flights)
                </button>
              </div>
            </div>
          )}

          {/* RESULTS COLUMN */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-4">
            
            {/* SORTING BAR */}
            <div className="bg-white p-3 rounded-[12px] border border-border flex flex-wrap items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center space-x-1">
                <span className="text-xs font-mono text-warm-gray px-3 hidden sm:inline">
                  {sortedFlights.length} results
                </span>
                <span className="text-xs font-mono text-warm-gray hidden sm:inline">Sort:</span>

                {(['recommended', 'cheapest', 'fastest', 'value'] as SortOption[]).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setSortOption(tab)}
                    className={`px-3.5 py-1.5 rounded-[8px] text-xs font-mono capitalize transition-all cursor-pointer ${
                      sortOption === tab
                        ? 'bg-ink text-white font-medium shadow-xs'
                        : 'text-warm-gray hover:text-ink hover:bg-sand'
                    }`}
                  >
                    {tab === 'value' ? 'Best Value' : tab}
                  </button>
                ))}
              </div>

              <span className="text-xs font-mono text-olive font-medium px-3">
                Lowest: {formatPrice(sortedFlights[0]?.priceINR || 46800, currency)}
              </span>
            </div>

            {/* FLIGHT RESULT CARDS LIST */}
            {sortedFlights.length > 0 ? (
              <div className="space-y-4">
                {sortedFlights.map(flight => (
                  <FlightCard key={flight.id} flight={flight} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-[12px] border border-border text-center space-y-3 shadow-sm">
                <Plane className="w-10 h-10 text-warm-gray/60 mx-auto rotate-45" />
                <h4 className="text-lg font-serif font-light text-ink uppercase tracking-wider">
                  WE COULDN'T FIND THAT FLIGHT.
                </h4>
                <p className="text-xs text-warm-gray max-w-sm mx-auto font-sans">
                  Try adjusting your dates, airports, stops, or price range.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-[8px] bg-[#963F24] hover:bg-[#7E331B] text-white font-sans font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  RESET FILTERS
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* FLIGHT DETAILS RIGHT DRAWER */}
      <FlightDetailsDrawer />
    </div>
  );
};
