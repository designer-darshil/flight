import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeftRight,
  Calendar,
  Search,
  ChevronDown,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { TripType, CabinClass } from '../types';
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

  return (
    <div
      id="booking-panel"
      className="w-full max-w-[1320px] mx-auto bg-white border border-warm-gray-border shadow-paper-elevated p-6 sm:p-8 text-ink select-none relative z-30"
    >
      {/* 1. TABS ROW: ROUND TRIP, ONE WAY, MULTI CITY + CABIN CLASS */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-warm-gray-border/60">
        <div className="flex items-center space-x-6 sm:space-x-8 text-xs font-sans tracking-wider uppercase font-semibold">
          {(['round', 'oneway', 'multicity'] as TripType[]).map(type => (
            <button
              key={type}
              type="button"
              onClick={() => setSearchParams(prev => ({ ...prev, tripType: type }))}
              className={`pb-2 relative transition-colors ${
                searchParams.tripType === type
                  ? 'text-ink font-bold'
                  : 'text-warm-gray hover:text-ink'
              }`}
            >
              <span>{type === 'round' ? 'ROUND TRIP' : type === 'oneway' ? 'ONE WAY' : 'MULTI CITY'}</span>
              {searchParams.tripType === type && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-terracotta" />
              )}
            </button>
          ))}
        </div>

        {/* Quick class indicator */}
        <div className="text-xs font-mono uppercase text-warm-gray flex items-center space-x-2">
          <span>CABIN:</span>
          <span className="text-ink font-bold">{searchParams.cabinClass}</span>
        </div>
      </div>

      {/* 2. PHYSICAL FIELDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0 pt-6 items-stretch border-b border-warm-gray-border/40">
        
        {/* FROM FIELD (Col 1-3) */}
        <div ref={fromRef} className="md:col-span-3 relative p-4 border-b md:border-b-0 md:border-r border-warm-gray-border/60 hover:bg-sand/20 transition-colors">
          <label className="block text-[10px] font-mono tracking-widest uppercase text-warm-gray mb-1">
            FROM
          </label>
          <button
            type="button"
            onClick={() => {
              setFromOpen(!fromOpen);
              setToOpen(false);
              setPassengerOpen(false);
            }}
            className="w-full text-left"
          >
            <div className="text-xl sm:text-2xl font-display font-bold text-ink truncate">
              {searchParams.from.city}
            </div>
            <div className="text-xs font-mono text-warm-gray flex items-center space-x-1.5 mt-0.5">
              <span className="text-terracotta font-semibold">{searchParams.from.code}</span>
              <span>·</span>
              <span className="truncate">{searchParams.from.name}</span>
            </div>
          </button>

          {/* FROM DROPDOWN */}
          {fromOpen && (
            <div className="absolute left-0 top-full mt-2 w-80 bg-paper border border-border rounded-xl shadow-[0_12px_32px_rgba(23,23,23,0.08)] p-3 z-50">
              <input
                type="text"
                placeholder="Search airport or city..."
                value={fromQuery}
                onChange={e => setFromQuery(e.target.value)}
                autoFocus
                className="w-full p-2.5 text-xs bg-sand/30 border border-border text-ink mb-2 focus:outline-none focus:border-terracotta"
              />
              <div className="max-h-56 overflow-y-auto space-y-1">
                {filteredFrom.map(a => (
                  <button
                    key={a.code}
                    type="button"
                    onClick={() => {
                      setSearchParams(prev => ({ ...prev, from: a }));
                      setFromOpen(false);
                    }}
                    className="w-full p-2 text-left text-xs hover:bg-sand/40 flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-ink">{a.city}</span>
                      <span className="text-[11px] text-warm-gray block truncate">{a.name}</span>
                    </div>
                    <span className="font-mono text-xs font-semibold text-terracotta">{a.code}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SWAP AIRPORTS BUTTON (Floating center icon) */}
        <div className="hidden md:flex absolute left-[25%] -translate-x-1/2 top-1/2 -translate-y-1/2 z-20">
          <button
            type="button"
            onClick={swapAirports}
            title="Swap Origin and Destination"
            className="w-8 h-8 rounded-full bg-white border border-border text-warm-gray hover:text-ink hover:border-ink flex items-center justify-center transition-all shadow-sm"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* TO FIELD (Col 4-6) */}
        <div ref={toRef} className="md:col-span-3 relative p-4 border-b md:border-b-0 md:border-r border-border/60 hover:bg-sand/20 transition-colors md:pl-6">
          <label className="block text-[10px] font-mono tracking-widest uppercase text-warm-gray mb-1">
            TO
          </label>
          <button
            type="button"
            onClick={() => {
              setToOpen(!toOpen);
              setFromOpen(false);
              setPassengerOpen(false);
            }}
            className="w-full text-left"
          >
            <div className="text-xl sm:text-2xl font-display font-bold text-ink truncate">
              {searchParams.to.city}
            </div>
            <div className="text-xs font-mono text-warm-gray flex items-center space-x-1.5 mt-0.5">
              <span className="text-terracotta font-semibold">{searchParams.to.code}</span>
              <span>·</span>
              <span className="truncate">{searchParams.to.name}</span>
            </div>
          </button>

          {/* TO DROPDOWN */}
          {toOpen && (
            <div className="absolute left-0 top-full mt-2 w-80 bg-paper border border-border rounded-xl shadow-[0_12px_32px_rgba(23,23,23,0.08)] p-3 z-50">
              <input
                type="text"
                placeholder="Search destination airport..."
                value={toQuery}
                onChange={e => setToQuery(e.target.value)}
                autoFocus
                className="w-full p-2.5 text-xs bg-sand/30 border border-border text-ink mb-2 focus:outline-none focus:border-terracotta"
              />
              <div className="max-h-56 overflow-y-auto space-y-1">
                {filteredTo.map(a => (
                  <button
                    key={a.code}
                    type="button"
                    onClick={() => {
                      setSearchParams(prev => ({ ...prev, to: a }));
                      setToOpen(false);
                    }}
                    className="w-full p-2 text-left text-xs hover:bg-sand/40 flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-ink">{a.city}</span>
                      <span className="text-[11px] text-warm-gray block truncate">{a.name}</span>
                    </div>
                    <span className="font-mono text-xs font-semibold text-terracotta">{a.code}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* DATES FIELD: DEPART & RETURN (Col 7-9) */}
        <div
          onClick={() => setIsDatePickerOpen(true)}
          className="md:col-span-3 p-4 border-b md:border-b-0 md:border-r border-border/60 hover:bg-sand/20 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-warm-gray mb-1">
            <span>DATES</span>
            <Calendar className="w-3 h-3 text-warm-gray" />
          </div>
          <div className="flex items-center space-x-3">
            <div>
              <span className="text-[10px] font-mono text-warm-gray block">DEPART</span>
              <span className="text-base sm:text-lg font-display font-bold text-ink">
                {searchParams.departureDate}
              </span>
            </div>
            {searchParams.tripType === 'round' && (
              <>
                <span className="text-warm-gray-border font-light text-lg">/</span>
                <div>
                  <span className="text-[10px] font-mono text-warm-gray block">RETURN</span>
                  <span className="text-base sm:text-lg font-display font-bold text-ink">
                    {searchParams.returnDate || '26 Sep'}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* PASSENGERS & CABIN (Col 10-12) */}
        <div ref={passengerRef} className="md:col-span-3 relative p-4 hover:bg-sand/20 transition-colors">
          <label className="block text-[10px] font-mono tracking-widest uppercase text-warm-gray mb-1">
            PASSENGERS & CABIN
          </label>
          <button
            type="button"
            onClick={() => {
              setPassengerOpen(!passengerOpen);
              setFromOpen(false);
              setToOpen(false);
            }}
            className="w-full text-left"
          >
            <div className="text-lg sm:text-xl font-display font-bold text-ink truncate">
              {totalPax} {totalPax === 1 ? 'Adult' : 'Travelers'}
            </div>
            <div className="text-xs font-mono text-warm-gray mt-0.5 flex items-center justify-between">
              <span>{searchParams.cabinClass}</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </div>
          </button>

          {/* PASSENGERS POPOVER */}
          {passengerOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-paper border border-border rounded-xl shadow-[0_12px_32px_rgba(23,23,23,0.08)] p-4 z-50 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-ink">Adults</div>
                  <div className="text-[10px] text-warm-gray">Age 12+</div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    disabled={searchParams.passengers.adults <= 1}
                    onClick={() =>
                      setSearchParams(prev => ({
                        ...prev,
                        passengers: { ...prev.passengers, adults: Math.max(1, prev.passengers.adults - 1) },
                      }))
                    }
                    className="w-7 h-7 border border-border text-ink disabled:opacity-30 hover:border-ink"
                  >
                    -
                  </button>
                  <span className="font-mono text-xs font-bold w-4 text-center">
                    {searchParams.passengers.adults}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setSearchParams(prev => ({
                        ...prev,
                        passengers: { ...prev.passengers, adults: prev.passengers.adults + 1 },
                      }))
                    }
                    className="w-7 h-7 border border-border text-ink hover:border-ink"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Cabin Class Selection */}
              <div className="pt-3 border-t border-border/60">
                <label className="text-[10px] font-mono uppercase text-warm-gray block mb-2">Cabin Class</label>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  {(['Economy', 'Premium Economy', 'Business', 'First'] as CabinClass[]).map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setSearchParams(prev => ({ ...prev, cabinClass: c }));
                      }}
                      className={`p-1.5 text-left text-xs border ${
                        searchParams.cabinClass === c
                          ? 'border-terracotta bg-terracotta/5 text-terracotta font-bold'
                          : 'border-border text-ink/80 hover:border-ink'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* 3. CTA FOOTER: MUTED TERRACOTTA ACCENT */}
      <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-warm-gray font-sans flex items-center space-x-4">
          <span className="font-mono text-terracotta">DEL ➔ DXB · LHR</span>
          <span className="hidden sm:inline">|</span>
          <span>Zero booking fees · 24h free cancellation</span>
        </div>

        <button
          type="button"
          onClick={searchFlights}
          disabled={isSearching}
          className="w-full sm:w-auto px-10 py-4 bg-terracotta hover:bg-terracotta-dark text-white font-sans font-bold text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center space-x-2.5 shadow-terracotta"
        >
          {isSearching ? (
            <span>SEARCHING FLIGHTS...</span>
          ) : (
            <>
              <Search className="w-3.5 h-3.5" />
              <span>SEARCH FLIGHTS</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
