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

export interface BookingEngineProps {
  isEmbedded?: boolean;
  onSearchComplete?: () => void;
}

export const BookingEngine: React.FC<BookingEngineProps> = ({ isEmbedded = false, onSearchComplete }) => {
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

  // Validation error states
  const [fromError, setFromError] = useState<string | null>(null);
  const [toError, setToError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);

  // Search input filters
  const [fromQuery, setFromQuery] = useState('');
  const [toQuery, setToQuery] = useState('');

  const handleSearchSubmit = () => {
    let hasError = false;
    setFromError(null);
    setToError(null);
    setDateError(null);

    if (!searchParams.from || !searchParams.from.code) {
      setFromError('Please select departure airport');
      hasError = true;
    }
    if (!searchParams.to || !searchParams.to.code) {
      setToError('Please select destination airport');
      hasError = true;
    }
    if (searchParams.from && searchParams.to && searchParams.from.code === searchParams.to.code) {
      setToError('Origin & destination cannot be the same');
      hasError = true;
    }
    if (!searchParams.departureDate) {
      setDateError('Please select departure date');
      hasError = true;
    }

    if (hasError) return;

    searchFlights(searchParams, onSearchComplete);
  };


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

  const recentAirports = AIRPORTS.filter(a => ['DEL', 'DXB', 'LHR'].includes(a.code));
  const popularAirports = AIRPORTS.filter(a => ['HND', 'SIN', 'JFK', 'CDG'].includes(a.code));

  const filteredFrom = AIRPORTS.filter(
    a =>
      a.city.toLowerCase().includes(fromQuery.toLowerCase()) ||
      a.code.toLowerCase().includes(fromQuery.toLowerCase()) ||
      a.name.toLowerCase().includes(fromQuery.toLowerCase()) ||
      a.country.toLowerCase().includes(fromQuery.toLowerCase())
  );

  const filteredTo = AIRPORTS.filter(
    a =>
      a.city.toLowerCase().includes(toQuery.toLowerCase()) ||
      a.code.toLowerCase().includes(toQuery.toLowerCase()) ||
      a.name.toLowerCase().includes(toQuery.toLowerCase()) ||
      a.country.toLowerCase().includes(toQuery.toLowerCase())
  );

  const totalPax =
    searchParams.passengers.adults +
    searchParams.passengers.children +
    searchParams.passengers.infants;

  return (
    <div
      id={isEmbedded ? undefined : 'booking-panel'}
      className={`w-full bg-white border border-[#D8D1C5] rounded-[12px] text-ink select-none relative z-30 ${
        isEmbedded
          ? 'p-5 sm:p-6 shadow-xs'
          : 'max-w-[1320px] mx-auto shadow-[0_12px_32px_rgba(23,23,23,0.08)] p-6 sm:p-8'
      }`}
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
          {fromError && (
            <p className="text-[11px] font-mono text-[#963F24] font-semibold mt-1.5 animate-fadeIn">
              {fromError}
            </p>
          )}

          {/* FROM DROPDOWN / AIRPORT SELECTOR POPOVER */}
          {fromOpen && (
            <div className="absolute left-0 top-full mt-2 w-[calc(100vw-3rem)] max-w-[400px] sm:w-[400px] bg-[#FFFFFF] border border-[#D8D1C5] rounded-[16px] shadow-[0_24px_60px_rgba(23,23,23,0.10)] p-4 z-50 text-ink">
              {/* Search bar */}
              <div className="relative mb-3">
                <Search className="w-3.5 h-3.5 text-warm-gray absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search city, airport, code, country..."
                  value={fromQuery}
                  onChange={e => setFromQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-sand/30 border border-border rounded-[8px] text-ink focus:outline-none focus:border-[#963F24] font-sans"
                />
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-border/40 pr-1">
                {fromQuery.trim() === '' ? (
                  <>
                    {/* Recent Searches */}
                    <div className="pb-3">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-warm-gray mb-2 px-1">
                        Recent Searches
                      </div>
                      <div className="space-y-1">
                        {recentAirports.map(a => (
                          <button
                            key={`from-recent-${a.code}`}
                            type="button"
                            onClick={() => {
                              setSearchParams(prev => ({ ...prev, from: a }));
                              setFromOpen(false);
                            }}
                            className="w-full p-2.5 text-left rounded-[8px] hover:bg-sand/50 transition-colors flex items-center justify-between group"
                          >
                            <div className="min-w-0 pr-2">
                              <div className="flex items-center space-x-1.5">
                                <span className="font-bold text-ink text-xs">{a.city}</span>
                                <span className="text-[11px] text-warm-gray font-normal">· {a.country}</span>
                              </div>
                              <span className="text-[11px] text-warm-gray block truncate mt-0.5">{a.name}</span>
                            </div>
                            <span className="font-mono text-xs font-bold text-[#963F24] bg-sand/80 px-2 py-0.5 rounded-[4px] shrink-0">
                              {a.code}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Popular Airports */}
                    <div className="pt-3">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-warm-gray mb-2 px-1">
                        Popular Airports
                      </div>
                      <div className="space-y-1">
                        {popularAirports.map(a => (
                          <button
                            key={`from-pop-${a.code}`}
                            type="button"
                            onClick={() => {
                              setSearchParams(prev => ({ ...prev, from: a }));
                              setFromOpen(false);
                            }}
                            className="w-full p-2.5 text-left rounded-[8px] hover:bg-sand/50 transition-colors flex items-center justify-between group"
                          >
                            <div className="min-w-0 pr-2">
                              <div className="flex items-center space-x-1.5">
                                <span className="font-bold text-ink text-xs">{a.city}</span>
                                <span className="text-[11px] text-warm-gray font-normal">· {a.country}</span>
                              </div>
                              <span className="text-[11px] text-warm-gray block truncate mt-0.5">{a.name}</span>
                            </div>
                            <span className="font-mono text-xs font-bold text-[#963F24] bg-sand/80 px-2 py-0.5 rounded-[4px] shrink-0">
                              {a.code}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  /* Filtered Airports */
                  <div className="py-1 space-y-1">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-warm-gray mb-2 px-1">
                      Matching Airports ({filteredFrom.length})
                    </div>
                    {filteredFrom.length > 0 ? (
                      filteredFrom.map(a => (
                        <button
                          key={`from-match-${a.code}`}
                          type="button"
                          onClick={() => {
                            setSearchParams(prev => ({ ...prev, from: a }));
                            setFromOpen(false);
                          }}
                          className="w-full p-2.5 text-left rounded-[8px] hover:bg-sand/50 transition-colors flex items-center justify-between group"
                        >
                          <div className="min-w-0 pr-2">
                            <div className="flex items-center space-x-1.5">
                              <span className="font-bold text-ink text-xs">{a.city}</span>
                              <span className="text-[11px] text-warm-gray font-normal">· {a.country}</span>
                            </div>
                            <span className="text-[11px] text-warm-gray block truncate mt-0.5">{a.name}</span>
                          </div>
                          <span className="font-mono text-xs font-bold text-[#963F24] bg-sand/80 px-2 py-0.5 rounded-[4px] shrink-0">
                            {a.code}
                          </span>
                        </button>
                      ))
                    ) : (
                      <div className="p-4 text-center text-xs text-warm-gray font-mono">
                        No airports match "{fromQuery}"
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* SWAP AIRPORTS BUTTON */}
        <div className="hidden md:flex absolute left-[25%] -translate-x-1/2 top-1/2 -translate-y-1/2 z-20">
          <button
            type="button"
            onClick={swapAirports}
            title="Swap Origin and Destination"
            aria-label="Swap Origin and Destination"
            className="w-8 h-8 rounded-full bg-white border border-[#D8D1C5] text-[#6F6A61] hover:text-[#171717] hover:border-[#171717] flex items-center justify-center transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-[#963F24]"
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
              <span className="text-[#963F24] font-semibold">{searchParams.to.code}</span>
              <span>·</span>
              <span className="truncate">{searchParams.to.name}</span>
            </div>
          </button>
          {toError && (
            <p className="text-[11px] font-mono text-[#963F24] font-semibold mt-1.5 animate-fadeIn">
              {toError}
            </p>
          )}

          {/* TO DROPDOWN / AIRPORT SELECTOR POPOVER */}
          {toOpen && (
            <div className="absolute left-0 sm:left-auto md:left-0 top-full mt-2 w-[calc(100vw-3rem)] max-w-[400px] sm:w-[400px] bg-[#FFFFFF] border border-[#D8D1C5] rounded-[16px] shadow-[0_24px_60px_rgba(23,23,23,0.10)] p-4 z-50 text-ink">
              {/* Search bar */}
              <div className="relative mb-3">
                <Search className="w-3.5 h-3.5 text-warm-gray absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search city, airport, code, country..."
                  value={toQuery}
                  onChange={e => setToQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-sand/30 border border-border rounded-[8px] text-ink focus:outline-none focus:border-[#963F24] font-sans"
                />
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-border/40 pr-1">
                {toQuery.trim() === '' ? (
                  <>
                    {/* Recent Searches */}
                    <div className="pb-3">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-warm-gray mb-2 px-1">
                        Recent Searches
                      </div>
                      <div className="space-y-1">
                        {recentAirports.map(a => (
                          <button
                            key={`to-recent-${a.code}`}
                            type="button"
                            onClick={() => {
                              setSearchParams(prev => ({ ...prev, to: a }));
                              setToOpen(false);
                            }}
                            className="w-full p-2.5 text-left rounded-[8px] hover:bg-sand/50 transition-colors flex items-center justify-between group"
                          >
                            <div className="min-w-0 pr-2">
                              <div className="flex items-center space-x-1.5">
                                <span className="font-bold text-ink text-xs">{a.city}</span>
                                <span className="text-[11px] text-warm-gray font-normal">· {a.country}</span>
                              </div>
                              <span className="text-[11px] text-warm-gray block truncate mt-0.5">{a.name}</span>
                            </div>
                            <span className="font-mono text-xs font-bold text-[#963F24] bg-sand/80 px-2 py-0.5 rounded-[4px] shrink-0">
                              {a.code}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Popular Airports */}
                    <div className="pt-3">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-warm-gray mb-2 px-1">
                        Popular Airports
                      </div>
                      <div className="space-y-1">
                        {popularAirports.map(a => (
                          <button
                            key={`to-pop-${a.code}`}
                            type="button"
                            onClick={() => {
                              setSearchParams(prev => ({ ...prev, to: a }));
                              setToOpen(false);
                            }}
                            className="w-full p-2.5 text-left rounded-[8px] hover:bg-sand/50 transition-colors flex items-center justify-between group"
                          >
                            <div className="min-w-0 pr-2">
                              <div className="flex items-center space-x-1.5">
                                <span className="font-bold text-ink text-xs">{a.city}</span>
                                <span className="text-[11px] text-warm-gray font-normal">· {a.country}</span>
                              </div>
                              <span className="text-[11px] text-warm-gray block truncate mt-0.5">{a.name}</span>
                            </div>
                            <span className="font-mono text-xs font-bold text-[#963F24] bg-sand/80 px-2 py-0.5 rounded-[4px] shrink-0">
                              {a.code}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  /* Filtered Airports */
                  <div className="py-1 space-y-1">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-warm-gray mb-2 px-1">
                      Matching Airports ({filteredTo.length})
                    </div>
                    {filteredTo.length > 0 ? (
                      filteredTo.map(a => (
                        <button
                          key={`to-match-${a.code}`}
                          type="button"
                          onClick={() => {
                            setSearchParams(prev => ({ ...prev, to: a }));
                            setToOpen(false);
                          }}
                          className="w-full p-2.5 text-left rounded-[8px] hover:bg-sand/50 transition-colors flex items-center justify-between group"
                        >
                          <div className="min-w-0 pr-2">
                            <div className="flex items-center space-x-1.5">
                              <span className="font-bold text-ink text-xs">{a.city}</span>
                              <span className="text-[11px] text-warm-gray font-normal">· {a.country}</span>
                            </div>
                            <span className="text-[11px] text-warm-gray block truncate mt-0.5">{a.name}</span>
                          </div>
                          <span className="font-mono text-xs font-bold text-[#963F24] bg-sand/80 px-2 py-0.5 rounded-[4px] shrink-0">
                            {a.code}
                          </span>
                        </button>
                      ))
                    ) : (
                      <div className="p-4 text-center text-xs text-warm-gray font-mono">
                        No airports match "{toQuery}"
                      </div>
                    )}
                  </div>
                )}
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
                    {searchParams.returnDate || '26 Sep 2026'}
                  </span>
                </div>
              </>
            )}
          </div>
          {dateError && (
            <p className="text-[11px] font-mono text-[#963F24] font-semibold mt-1.5 animate-fadeIn">
              {dateError}
            </p>
          )}
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
              {totalPax} {totalPax === 1 ? 'Traveler' : 'Travelers'}
            </div>
            <div className="text-xs font-mono text-warm-gray mt-0.5 flex items-center justify-between">
              <span>{searchParams.cabinClass}</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </div>
          </button>

          {/* PASSENGERS POPOVER (Adults, Children, Infants with quantity controls) */}
          {passengerOpen && (
            <div className="absolute right-0 top-full mt-2 w-[calc(100vw-3rem)] sm:w-80 max-w-[320px] bg-[#FFFFFF] border border-[#D8D1C5] rounded-[16px] shadow-[0_24px_60px_rgba(23,23,23,0.10)] p-5 z-50 space-y-4 text-ink">
              
              {/* Adults Control */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-ink">Adults</div>
                  <div className="text-[10px] text-warm-gray font-mono">Age 12+</div>
                </div>
                <div className="flex items-center space-x-2.5">
                  <button
                    type="button"
                    disabled={searchParams.passengers.adults <= 1}
                    onClick={() =>
                      setSearchParams(prev => ({
                        ...prev,
                        passengers: { ...prev.passengers, adults: Math.max(1, prev.passengers.adults - 1) },
                      }))
                    }
                    className="w-8 h-8 rounded-[6px] border border-border text-ink hover:border-ink disabled:opacity-30 disabled:hover:border-border font-mono font-bold flex items-center justify-center transition-colors"
                  >
                    -
                  </button>
                  <span className="font-mono text-xs font-bold w-5 text-center">
                    {searchParams.passengers.adults}
                  </span>
                  <button
                    type="button"
                    disabled={totalPax >= 9}
                    onClick={() =>
                      setSearchParams(prev => ({
                        ...prev,
                        passengers: { ...prev.passengers, adults: prev.passengers.adults + 1 },
                      }))
                    }
                    className="w-8 h-8 rounded-[6px] border border-border text-ink hover:border-ink disabled:opacity-30 font-mono font-bold flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Children Control */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-ink">Children</div>
                  <div className="text-[10px] text-warm-gray font-mono">Age 2–11</div>
                </div>
                <div className="flex items-center space-x-2.5">
                  <button
                    type="button"
                    disabled={searchParams.passengers.children <= 0}
                    onClick={() =>
                      setSearchParams(prev => ({
                        ...prev,
                        passengers: { ...prev.passengers, children: Math.max(0, prev.passengers.children - 1) },
                      }))
                    }
                    className="w-8 h-8 rounded-[6px] border border-border text-ink hover:border-ink disabled:opacity-30 disabled:hover:border-border font-mono font-bold flex items-center justify-center transition-colors"
                  >
                    -
                  </button>
                  <span className="font-mono text-xs font-bold w-5 text-center">
                    {searchParams.passengers.children}
                  </span>
                  <button
                    type="button"
                    disabled={totalPax >= 9}
                    onClick={() =>
                      setSearchParams(prev => ({
                        ...prev,
                        passengers: { ...prev.passengers, children: prev.passengers.children + 1 },
                      }))
                    }
                    className="w-8 h-8 rounded-[6px] border border-border text-ink hover:border-ink disabled:opacity-30 font-mono font-bold flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Infants Control */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-ink">Infants</div>
                  <div className="text-[10px] text-warm-gray font-mono">Under 2</div>
                </div>
                <div className="flex items-center space-x-2.5">
                  <button
                    type="button"
                    disabled={searchParams.passengers.infants <= 0}
                    onClick={() =>
                      setSearchParams(prev => ({
                        ...prev,
                        passengers: { ...prev.passengers, infants: Math.max(0, prev.passengers.infants - 1) },
                      }))
                    }
                    className="w-8 h-8 rounded-[6px] border border-border text-ink hover:border-ink disabled:opacity-30 disabled:hover:border-border font-mono font-bold flex items-center justify-center transition-colors"
                  >
                    -
                  </button>
                  <span className="font-mono text-xs font-bold w-5 text-center">
                    {searchParams.passengers.infants}
                  </span>
                  <button
                    type="button"
                    disabled={totalPax >= 9}
                    onClick={() =>
                      setSearchParams(prev => ({
                        ...prev,
                        passengers: { ...prev.passengers, infants: prev.passengers.infants + 1 },
                      }))
                    }
                    className="w-8 h-8 rounded-[6px] border border-border text-ink hover:border-ink disabled:opacity-30 font-mono font-bold flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Cabin Class Selection */}
              <div className="pt-3 border-t border-border/60">
                <label className="text-[10px] font-mono uppercase tracking-wider text-warm-gray block mb-2">Cabin Class</label>
                <div className="grid grid-cols-2 gap-1.5 text-xs font-sans">
                  {(['Economy', 'Premium Economy', 'Business', 'First'] as CabinClass[]).map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setSearchParams(prev => ({ ...prev, cabinClass: c }));
                      }}
                      className={`p-2 text-left rounded-[6px] text-xs border transition-colors ${
                        searchParams.cabinClass === c
                          ? 'border-[#963F24] bg-[#963F24]/5 text-[#963F24] font-bold'
                          : 'border-border text-ink hover:border-ink'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Done button */}
              <button
                type="button"
                onClick={() => setPassengerOpen(false)}
                className="w-full py-2 bg-[#963F24] hover:bg-[#7E331B] text-white rounded-[6px] text-xs font-mono font-semibold uppercase tracking-wider transition-colors"
              >
                Apply Travelers
              </button>
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
          onClick={handleSearchSubmit}
          disabled={isSearching}
          className="w-full sm:w-auto h-12 px-8 rounded-[8px] bg-[#963F24] hover:bg-[#7E331B] text-white font-sans font-bold text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center space-x-2.5 shadow-sm hover:shadow-md cursor-pointer disabled:opacity-50"
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
