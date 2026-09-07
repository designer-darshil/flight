import React, { useState, useMemo } from 'react';
import {
  SlidersHorizontal,
  Bell,
  Filter,
  X,
  Plane,
  ArrowLeft,
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
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(75000);
  const [refundableOnly, setRefundableOnly] = useState(false);
  const [checkedBagOnly, setCheckedBagOnly] = useState(false);

  const airlinesList = ['Emirates', 'British Airways', 'Air India', 'Qatar Airways', 'Lufthansa', 'Singapore Airlines', 'Turkish Airlines'];

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
      if (checkedBagOnly && f.baggage.checked.toLowerCase().includes('none')) return false;
      // Departure times
      if (depTimeFilter !== 'all') {
        const hour = parseInt(f.departureTime.split(':')[0], 10);
        if (depTimeFilter === '0-6' && (hour < 0 || hour >= 6)) return false;
        if (depTimeFilter === '6-12' && (hour < 6 || hour >= 12)) return false;
        if (depTimeFilter === '12-18' && (hour < 12 || hour >= 18)) return false;
        if (depTimeFilter === '18-24' && (hour < 18 || hour >= 24)) return false;
      }
      return true;
    });
  }, [flights, stopsFilter, selectedAirlines, maxPrice, refundableOnly, checkedBagOnly, depTimeFilter]);

  const sortedFlights = useMemo(() => {
    const list = [...filteredFlights];
    if (sortOption === 'cheapest') {
      return list.sort((a, b) => a.priceINR - b.priceINR);
    }
    if (sortOption === 'fastest') {
      return list.sort((a, b) => a.durationMinutes - b.durationMinutes);
    }
    if (sortOption === 'value') {
      return list.sort((a, b) => a.priceINR * 0.7 - b.priceINR * 0.7);
    }
    return list.sort((a, b) => {
      if (a.recommended && !b.recommended) return -1;
      if (!a.recommended && b.recommended) return 1;
      return a.priceINR - b.priceINR;
    });
  }, [filteredFlights, sortOption]);

  const resetFilters = () => {
    setStopsFilter([]);
    setDepTimeFilter('all');
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24">
      
      {/* 13. TOP APPLICATION NAVIGATION (LIGHT CONTRAST) */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex items-center justify-between h-16">
          
          <div className="flex items-center space-x-8">
            <button
              onClick={() => setActiveView('marketing')}
              className="flex items-center space-x-2.5 text-left group"
            >
              <div className="w-8 h-8 rounded-lg bg-aeriva-blue flex items-center justify-center text-white">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <polygon points="12 2 2 22 12 17 22 22 12 2" fill="white" />
                </svg>
              </div>
              <span className="text-xl font-display font-black tracking-tightest text-slate-900">
                AERIVA
              </span>
            </button>

            {/* App Nav Items */}
            <nav className="hidden md:flex items-center space-x-6 text-xs font-semibold text-slate-600">
              <span className="text-aeriva-blue border-b-2 border-aeriva-blue py-5">Flights</span>
              <button onClick={() => setActiveView('marketing')} className="hover:text-slate-900 py-5">Explore</button>
              <button onClick={() => setIsMyTripsOpen(true)} className="hover:text-slate-900 py-5">Trips</button>
              <button onClick={() => setActiveView('dashboard')} className="hover:text-slate-900 py-5">Rewards</button>
            </nav>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <button className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100" title="Notifications">
              <Bell className="w-4 h-4" />
            </button>

            <select
              value={currency}
              onChange={e => setCurrency(e.target.value as Currency)}
              className="px-2.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono font-semibold text-slate-800"
            >
              {(['USD', 'INR', 'EUR', 'AED', 'GBP'] as Currency[]).map(c => (
                <option key={c} value={c}>{c} ({CURRENCIES[c].symbol})</option>
              ))}
            </select>

            <button
              onClick={() => setActiveView('dashboard')}
              className="flex items-center space-x-2 p-1.5 pl-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold"
            >
              <span className="text-xs">Alex</span>
              <div className="w-7 h-7 rounded-lg bg-aeriva-blue text-white flex items-center justify-center text-xs font-bold">
                A
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* 13. MAIN APPLICATION HEADER */}
      <div className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono text-slate-500 mb-1">
                <button
                  onClick={() => setActiveView('marketing')}
                  className="text-aeriva-blue hover:underline flex items-center space-x-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Home</span>
                </button>
                <span>·</span>
                <span>{searchParams.cabinClass.toUpperCase()}</span>
                <span>·</span>
                <span>{searchParams.passengers.adults} ADULT</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-display font-black text-slate-900 flex items-center space-x-3">
                <span>{searchParams.from.city.toUpperCase()}</span>
                <span className="text-aeriva-blue font-mono font-normal">({searchParams.from.code})</span>
                <span>➔</span>
                <span>{searchParams.to.city.toUpperCase()}</span>
                <span className="text-aeriva-blue font-mono font-normal">({searchParams.to.code})</span>
              </h1>

              <div className="flex items-center space-x-3 text-xs text-slate-500 font-mono mt-1">
                <span className="font-bold text-slate-800">{searchParams.departureDate}</span>
                <span>·</span>
                <span className="text-emerald-600 font-bold">{sortedFlights.length} FLIGHTS FOUND</span>
              </div>
            </div>

            {/* Micro Route Visualization Widget */}
            <div className="hidden lg:flex items-center space-x-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono">
              <div className="text-center">
                <span className="text-slate-400 block text-[10px]">ORIGIN</span>
                <span className="font-bold text-slate-800">{searchParams.from.code}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-aeriva-blue font-bold">10h 00m</span>
                <div className="w-20 border-t border-dashed border-slate-400 relative my-1">
                  <Plane className="w-3.5 h-3.5 text-aeriva-blue absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <span className="text-[9px] text-slate-400">1 STOP (DXB)</span>
              </div>
              <div className="text-center">
                <span className="text-slate-400 block text-[10px]">DESTINATION</span>
                <span className="font-bold text-slate-800">{searchParams.to.code}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 14 & 15. MAIN CONTENT: FILTER SIDEBAR (LEFT) & RESULTS (RIGHT) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-8">
        
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="w-full py-3 rounded-2xl bg-white border border-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center space-x-2 shadow-sm"
          >
            <Filter className="w-4 h-4 text-aeriva-blue" />
            <span>FILTER RESULTS ({stopsFilter.length + selectedAirlines.length})</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 14. LEFT SIDEBAR FILTERS (DESKTOP / MOBILE MODAL) */}
          <aside className={`${mobileFilterOpen ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto block' : 'hidden lg:block'} lg:col-span-4 xl:col-span-3 space-y-6`}>
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6 sticky top-24">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center space-x-2 text-sm font-bold text-slate-900 font-display">
                  <SlidersHorizontal className="w-4 h-4 text-aeriva-blue" />
                  <span>FILTERS</span>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={resetFilters}
                    className="text-xs font-mono text-aeriva-blue hover:text-blue-700 font-semibold"
                  >
                    RESET FILTERS
                  </button>
                  {mobileFilterOpen && (
                    <button
                      onClick={() => setMobileFilterOpen(false)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 lg:hidden text-slate-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* STOPS */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3">
                  Stops
                </label>
                <div className="space-y-2">
                  {[
                    { label: 'Non-stop', value: 0 },
                    { label: '1 stop', value: 1 },
                    { label: '2+ stops', value: 2 },
                  ].map(opt => (
                    <label key={opt.value} className="flex items-center space-x-2.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={stopsFilter.includes(opt.value)}
                        onChange={() => toggleStop(opt.value)}
                        className="w-4 h-4 rounded text-aeriva-blue focus:ring-0 cursor-pointer"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* DEPARTURE TIME SLOTS */}
              <div className="pt-4 border-t border-slate-100">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3">
                  Departure
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
                      key={slot.id}
                      onClick={() => setDepTimeFilter(slot.id)}
                      className={`p-2 rounded-xl text-left text-[11px] transition-colors ${
                        depTimeFilter === slot.id
                          ? 'bg-aeriva-blue text-white font-bold'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {slot.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* PRICE INTERACTIVE SLIDER */}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-mono uppercase text-slate-400">Price</span>
                  <span className="font-bold text-slate-900 font-mono">{formatPrice(maxPrice, currency)}</span>
                </div>
                <input
                  type="range"
                  min={40000}
                  max={75000}
                  step={500}
                  value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-aeriva-blue"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>₹40,000</span>
                  <span>₹75,000</span>
                </div>
              </div>

              {/* AIRLINES CHECKLIST */}
              <div className="pt-4 border-t border-slate-100">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3">
                  Airlines
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {airlinesList.map(airline => (
                    <label key={airline} className="flex items-center space-x-2.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedAirlines.includes(airline)}
                        onChange={() => toggleAirline(airline)}
                        className="w-4 h-4 rounded text-aeriva-blue focus:ring-0 cursor-pointer"
                      />
                      <span>{airline}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* BAGGAGE & REFUNDABILITY */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                  Fare Attributes
                </label>
                <label className="flex items-center space-x-2.5 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={refundableOnly}
                    onChange={() => setRefundableOnly(!refundableOnly)}
                    className="w-4 h-4 rounded text-aeriva-blue focus:ring-0"
                  />
                  <span>Refundable flights only</span>
                </label>
              </div>
            </div>
          </aside>

          {/* 15 & 16. RESULTS COLUMN */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-4">
            
            {/* SORTING BAR */}
            <div className="bg-white p-3 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center space-x-1">
                <span className="text-xs font-mono text-slate-400 px-3 hidden sm:inline">
                  {sortedFlights.length} results
                </span>
                <span className="text-xs font-mono text-slate-400 hidden sm:inline">Sort by:</span>

                {(['recommended', 'cheapest', 'fastest', 'value'] as SortOption[]).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setSortOption(tab)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                      sortOption === tab
                        ? 'bg-aeriva-blue text-white shadow-md'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {tab === 'value' ? 'Best Value' : tab}
                  </button>
                ))}
              </div>

              <span className="text-xs font-mono text-emerald-600 font-semibold px-3">
                Lowest Fare: {formatPrice(sortedFlights[0]?.priceINR || 46800, currency)}
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
              <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3 shadow-sm">
                <Plane className="w-10 h-10 text-slate-300 mx-auto" />
                <h4 className="text-lg font-bold text-slate-800">NO ROUTES FOUND</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try changing your dates, airports, stops, or price range.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-xl bg-aeriva-blue text-white font-bold text-xs"
                >
                  CHANGE SEARCH / RESET FILTERS
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
