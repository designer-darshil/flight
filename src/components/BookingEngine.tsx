import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeftRight,
  Calendar,
  Search,
  ChevronDown,
  Check,
  Sparkles,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { Airport, TripType, CabinClass } from '../types';
import { AIRPORTS } from '../data/airports';

export const BookingEngine: React.FC = () => {
  const {
    searchParams,
    setSearchParams,
    searchFlights,
    isSearching,
    swapAirports,
    setIsDatePickerOpen,
  } = useBooking();

  // Dropdown states
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  const [passengerOpen, setPassengerOpen] = useState(false);

  // Search input filters
  const [fromQuery, setFromQuery] = useState('');
  const [toQuery, setToQuery] = useState('');

  // Dropdown click-outside refs
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);
  const passengerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (fromRef.current && !fromRef.current.contains(e.target as Node)) {
        setFromOpen(false);
      }
      if (toRef.current && !toRef.current.contains(e.target as Node)) {
        setToOpen(false);
      }
      if (passengerRef.current && !passengerRef.current.contains(e.target as Node)) {
        setPassengerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredFrom = AIRPORTS.filter(
    a =>
      a.city.toLowerCase().includes(fromQuery.toLowerCase()) ||
      a.code.toLowerCase().includes(fromQuery.toLowerCase()) ||
      a.name.toLowerCase().includes(fromQuery.toLowerCase())
  );

  const filteredTo = AIRPORTS.filter(
    a =>
      a.city.toLowerCase().includes(toQuery.toLowerCase()) ||
      a.code.toLowerCase().includes(toQuery.toLowerCase()) ||
      a.name.toLowerCase().includes(toQuery.toLowerCase())
  );

  const totalPax =
    searchParams.passengers.adults +
    searchParams.passengers.children +
    searchParams.passengers.infants;

  const cabinClasses: CabinClass[] = ['Economy', 'Premium Economy', 'Business', 'First'];

  const handleSelectAirport = (type: 'from' | 'to', airport: Airport) => {
    setSearchParams(prev => ({
      ...prev,
      [type]: airport,
    }));
    if (type === 'from') {
      setFromOpen(false);
      setFromQuery('');
    } else {
      setToOpen(false);
      setToQuery('');
    }
  };

  const updateCount = (key: 'adults' | 'children' | 'infants', delta: number) => {
    setSearchParams(prev => {
      const val = Math.max(key === 'adults' ? 1 : 0, prev.passengers[key] + delta);
      return {
        ...prev,
        passengers: {
          ...prev.passengers,
          [key]: val,
        },
      };
    });
  };

  return (
    <div id="booking-engine-section" className="relative z-20 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 -mt-10 sm:-mt-16">
      
      {/* LARGE PREMIUM BOOKING PANEL */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl backdrop-blur-2xl relative overflow-hidden bg-aeriva-charcoal/90">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-aeriva-blue/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* TABS: ROUND TRIP / ONE WAY / MULTI CITY */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center space-x-1 p-1 bg-black/40 rounded-2xl border border-white/10">
            {(['round', 'oneway', 'multicity'] as TripType[]).map(type => (
              <button
                key={type}
                onClick={() => setSearchParams(prev => ({ ...prev, tripType: type }))}
                className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                  searchParams.tripType === type
                    ? 'bg-gradient-to-r from-aerova-blue to-cyan-500 text-white shadow-glow-blue'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {type === 'round' && 'ROUND TRIP'}
                {type === 'oneway' && 'ONE WAY'}
                {type === 'multicity' && 'MULTI CITY'}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center space-x-3 text-xs text-slate-400 font-mono">
            <span className="flex items-center space-x-1.5 text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-Time GDS Direct Carrier Rates</span>
            </span>
          </div>
        </div>

        {/* SEARCH FIELDS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-6 items-center">
          
          {/* FROM AIRPORT (Col 1-3) */}
          <div ref={fromRef} className="relative lg:col-span-3">
            <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1.5">
              FROM
            </label>
            <div
              onClick={() => setFromOpen(!fromOpen)}
              className="glass-input p-4 rounded-2xl cursor-pointer hover:border-cyan-400/50 flex items-center justify-between group transition-all"
            >
              <div>
                <div className="text-2xl font-bold font-display text-white flex items-center space-x-2">
                  <span>{searchParams.from.city}</span>
                  <span className="text-cyan-400 font-mono text-base font-semibold">({searchParams.from.code})</span>
                </div>
                <div className="text-xs text-slate-300 truncate max-w-[200px] mt-0.5">
                  {searchParams.from.name}
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
            </div>

            {/* FROM AUTOCOMPLETE DROPDOWN */}
            {fromOpen && (
              <div className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-aeriva-charcoal border border-white/20 shadow-2xl p-3 z-50 backdrop-blur-xl">
                <input
                  type="text"
                  placeholder="Search city or airport code (DEL, DXB)..."
                  value={fromQuery}
                  onChange={e => setFromQuery(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs placeholder-slate-400 mb-2 focus:outline-none focus:border-cyan-400"
                  autoFocus
                />
                
                <div className="text-[10px] font-mono uppercase text-slate-400 px-2 py-1">Popular Hubs</div>
                <div className="max-h-60 overflow-y-auto space-y-1">
                  {filteredFrom.map(a => (
                    <button
                      key={a.code}
                      onClick={() => handleSelectAirport('from', a)}
                      className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between text-xs transition-colors ${
                        searchParams.from.code === a.code
                          ? 'bg-aeriva-blue/20 text-cyan-300 font-bold border border-cyan-500/30'
                          : 'text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <span className="text-base">{a.flag}</span>
                        <div>
                          <div className="font-bold text-white flex items-center space-x-1.5">
                            <span>{a.city}</span>
                            <span className="text-cyan-400 font-mono text-[11px]">({a.code})</span>
                          </div>
                          <div className="text-[10px] text-slate-400 truncate max-w-[180px]">{a.name}</div>
                        </div>
                      </div>
                      {searchParams.from.code === a.code && <Check className="w-4 h-4 text-cyan-400" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SWAP BUTTON (Col Center) */}
          <div className="flex justify-center -my-2 lg:my-0 lg:col-span-1">
            <button
              onClick={swapAirports}
              title="Swap Departure and Arrival"
              className="w-11 h-11 rounded-full bg-slate-800/90 border border-white/15 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-all duration-300 hover:rotate-180 hover:shadow-glow-cyan"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>
          </div>

          {/* TO AIRPORT (Col 4-6) */}
          <div ref={toRef} className="relative lg:col-span-3">
            <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1.5">
              TO
            </label>
            <div
              onClick={() => setToOpen(!toOpen)}
              className="glass-input p-4 rounded-2xl cursor-pointer hover:border-cyan-400/50 flex items-center justify-between group transition-all"
            >
              <div>
                <div className="text-2xl font-bold font-display text-white flex items-center space-x-2">
                  <span>{searchParams.to.city}</span>
                  <span className="text-cyan-400 font-mono text-base font-semibold">({searchParams.to.code})</span>
                </div>
                <div className="text-xs text-slate-300 truncate max-w-[200px] mt-0.5">
                  {searchParams.to.name}
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
            </div>

            {/* TO AUTOCOMPLETE DROPDOWN */}
            {toOpen && (
              <div className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-aeriva-charcoal border border-white/20 shadow-2xl p-3 z-50 backdrop-blur-xl">
                <input
                  type="text"
                  placeholder="Search city or airport code (LHR, HND)..."
                  value={toQuery}
                  onChange={e => setToQuery(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs placeholder-slate-400 mb-2 focus:outline-none focus:border-cyan-400"
                  autoFocus
                />
                
                <div className="text-[10px] font-mono uppercase text-slate-400 px-2 py-1">Popular Hubs</div>
                <div className="max-h-60 overflow-y-auto space-y-1">
                  {filteredTo.map(a => (
                    <button
                      key={a.code}
                      onClick={() => handleSelectAirport('to', a)}
                      className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between text-xs transition-colors ${
                        searchParams.to.code === a.code
                          ? 'bg-aeriva-blue/20 text-cyan-300 font-bold border border-cyan-500/30'
                          : 'text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <span className="text-base">{a.flag}</span>
                        <div>
                          <div className="font-bold text-white flex items-center space-x-1.5">
                            <span>{a.city}</span>
                            <span className="text-cyan-400 font-mono text-[11px]">({a.code})</span>
                          </div>
                          <div className="text-[10px] text-slate-400 truncate max-w-[180px]">{a.name}</div>
                        </div>
                      </div>
                      {searchParams.to.code === a.code && <Check className="w-4 h-4 text-cyan-400" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* DATES: DEPARTURE & RETURN (Col 7-9) */}
          <div className="lg:col-span-3">
            <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1.5">
              DATES (DEPARTURE ➔ RETURN)
            </label>
            <div
              onClick={() => setIsDatePickerOpen(true)}
              className="glass-input p-4 rounded-2xl cursor-pointer hover:border-cyan-400/50 flex items-center justify-between group transition-all"
            >
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <div>
                  <div className="text-sm font-bold font-mono text-white">
                    {searchParams.departureDate}
                  </div>
                  <div className="text-[11px] font-mono text-cyan-400">
                    {searchParams.tripType === 'round' ? `Return: ${searchParams.returnDate}` : 'One Way'}
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase bg-white/5 px-2 py-1 rounded-lg">
                Modify
              </span>
            </div>
          </div>

          {/* PASSENGERS & CABIN (Col 10-12) */}
          <div ref={passengerRef} className="relative lg:col-span-2">
            <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1.5">
              PASSENGERS & CABIN
            </label>
            <div
              onClick={() => setPassengerOpen(!passengerOpen)}
              className="glass-input p-4 rounded-2xl cursor-pointer hover:border-cyan-400/50 flex items-center justify-between group transition-all"
            >
              <div>
                <div className="text-sm font-bold text-white">
                  {totalPax} {totalPax === 1 ? 'Adult' : 'Travelers'}
                </div>
                <div className="text-[11px] text-cyan-400 font-mono">
                  {searchParams.cabinClass}
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
            </div>

            {/* PASSENGER POPOVER */}
            {passengerOpen && (
              <div
                onClick={e => e.stopPropagation()}
                className="absolute top-full right-0 mt-2 w-72 rounded-2xl bg-aeriva-charcoal border border-white/20 shadow-2xl p-4 z-50 backdrop-blur-xl"
              >
                <div className="space-y-3.5">
                  {/* Adults */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Adults</div>
                      <div className="text-[10px] text-slate-400">Age 12+</div>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      <button
                        onClick={() => updateCount('adults', -1)}
                        disabled={searchParams.passengers.adults <= 1}
                        className="w-7 h-7 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 disabled:opacity-30 flex items-center justify-center font-bold"
                      >
                        −
                      </button>
                      <span className="w-4 text-center font-mono text-xs text-white">
                        {searchParams.passengers.adults}
                      </span>
                      <button
                        onClick={() => updateCount('adults', 1)}
                        className="w-7 h-7 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center justify-center font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Children</div>
                      <div className="text-[10px] text-slate-400">Age 2–11</div>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      <button
                        onClick={() => updateCount('children', -1)}
                        disabled={searchParams.passengers.children <= 0}
                        className="w-7 h-7 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 disabled:opacity-30 flex items-center justify-center font-bold"
                      >
                        −
                      </button>
                      <span className="w-4 text-center font-mono text-xs text-white">
                        {searchParams.passengers.children}
                      </span>
                      <button
                        onClick={() => updateCount('children', 1)}
                        className="w-7 h-7 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center justify-center font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Infants */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Infants</div>
                      <div className="text-[10px] text-slate-400">Under 2</div>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      <button
                        onClick={() => updateCount('infants', -1)}
                        disabled={searchParams.passengers.infants <= 0}
                        className="w-7 h-7 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 disabled:opacity-30 flex items-center justify-center font-bold"
                      >
                        −
                      </button>
                      <span className="w-4 text-center font-mono text-xs text-white">
                        {searchParams.passengers.infants}
                      </span>
                      <button
                        onClick={() => updateCount('infants', 1)}
                        className="w-7 h-7 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center justify-center font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Cabin Classes */}
                  <div className="pt-3 border-t border-white/10">
                    <div className="text-[10px] font-mono uppercase text-slate-400 mb-2">Cabin Class</div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {cabinClasses.map(cls => (
                        <button
                          key={cls}
                          onClick={() => setSearchParams(prev => ({ ...prev, cabinClass: cls }))}
                          className={`p-2 rounded-xl text-left text-xs font-medium transition-colors ${
                            searchParams.cabinClass === cls
                              ? 'bg-aeriva-blue/25 text-cyan-300 border border-cyan-500/40 font-bold'
                              : 'text-slate-300 hover:bg-white/5'
                          }`}
                        >
                          {cls}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setPassengerOpen(false)}
                    className="w-full mt-2 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs hover:bg-cyan-300 transition-colors shadow-glow-cyan"
                  >
                    DONE
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM ACTION BAR WITH PRIMARY SEARCH BUTTON */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4 text-xs text-slate-400 font-mono">
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Direct airline inventory feed</span>
            </span>
            <span>· All fares include standard taxes</span>
          </div>

          <button
            onClick={searchFlights}
            disabled={isSearching}
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-aerova-blue via-blue-600 to-cyan-500 text-white font-extrabold text-xs tracking-wider uppercase shadow-glow-blue hover:shadow-cyan-500/40 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2"
          >
            <span>SEARCH FLIGHTS</span>
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
