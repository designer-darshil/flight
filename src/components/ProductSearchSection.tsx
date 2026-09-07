import React, { useState } from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { Flight } from '../types';
import { formatPrice } from '../utils/currency';

export const ProductSearchSection: React.FC = () => {
  const {
    flights,
    selectFlight,
    openDrawer,
    currency,
    searchParams,
    setActiveView,
  } = useBooking();

  const [activeSort, setActiveSort] = useState<'recommended' | 'cheapest' | 'fastest'>('recommended');

  const sortedFlights = [...flights].sort((a, b) => {
    if (activeSort === 'cheapest') return a.priceINR - b.priceINR;
    if (activeSort === 'fastest') return a.durationMinutes - b.durationMinutes;
    return (b.recommended ? 1 : 0) - (a.recommended ? 1 : 0);
  });

  return (
    <section className="py-28 px-6 sm:px-12 lg:px-16 bg-sand/50 text-ink border-t border-warm-gray-border/60 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: EDITORIAL NARRATIVE */}
          <div className="lg:col-span-5 space-y-6 text-left lg:sticky lg:top-28">
            <div className="flex items-center space-x-3">
              <span className="w-6 h-[1.5px] bg-terracotta" />
              <span className="text-xs font-mono tracking-widest uppercase text-warm-gray font-semibold">
                03 / THE SEARCH ENGINE
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-ink leading-[0.95]">
              THE BETTER<br />
              WAY TO BOOK.
            </h2>

            <p className="text-sm sm:text-base text-warm-gray leading-relaxed font-sans pt-2 max-w-md">
              We stripped away the noise, the bait-and-switch pricing, and the hidden booking fees. Compare 450+ verified airlines on a clean, zero-friction interface built for clarity.
            </p>

            <div className="space-y-4 pt-4 border-t border-warm-gray-border/70 text-xs font-sans">
              <div className="flex items-start space-x-3">
                <span className="w-5 h-5 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                  01
                </span>
                <div>
                  <span className="font-bold text-ink block">Direct Carrier Telemetry</span>
                  <span className="text-warm-gray">Live seat inventories synced directly with IATA GDS systems.</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="w-5 h-5 rounded-full bg-olive/10 text-olive flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                  02
                </span>
                <div>
                  <span className="font-bold text-ink block">Transparent Cabin Bundles</span>
                  <span className="text-warm-gray">Baggage, seat selection, and change policies disclosed upfront.</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="w-5 h-5 rounded-full bg-sand text-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                  03
                </span>
                <div>
                  <span className="font-bold text-ink block">Guaranteed Zero Booking Surcharges</span>
                  <span className="text-warm-gray">The price you see is the exact total charged to your card.</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  setActiveView('results');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-7 py-3.5 bg-ink hover:bg-black text-white font-sans font-semibold text-xs tracking-wider uppercase transition-colors flex items-center space-x-2"
              >
                <span>OPEN FULL APPLICATION</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: FLOATING WHITE BOOKING-RESULTS APPLICATION */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Top Results Header Bar */}
            <div className="bg-white border border-warm-gray-border p-4 flex flex-wrap items-center justify-between gap-3 shadow-paper">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-mono font-bold text-terracotta uppercase">
                  {searchParams.from.code} ➔ {searchParams.to.code}
                </span>
                <span className="text-warm-gray-border">|</span>
                <span className="text-xs font-mono text-warm-gray">18 SEP 2026</span>
              </div>

              {/* Sorting Pills */}
              <div className="flex items-center space-x-2 text-[11px] font-sans">
                <span className="text-warm-gray uppercase text-[10px] font-mono mr-1">SORT:</span>
                {(['recommended', 'cheapest', 'fastest'] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => setActiveSort(s)}
                    className={`px-2.5 py-1 text-xs uppercase font-semibold transition-colors ${
                      activeSort === s
                        ? 'bg-ink text-white'
                        : 'bg-sand/60 text-ink/70 hover:text-ink hover:bg-sand'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* FLIGHT CARDS LIST: WHITE SURFACES ON WARM BACKGROUND */}
            <div className="space-y-3.5">
              {sortedFlights.slice(0, 3).map((flight: Flight) => (
                <div
                  key={flight.id}
                  className="bg-white border border-warm-gray-border p-5 sm:p-6 shadow-paper hover:shadow-paper-elevated transition-all duration-300 relative group"
                >
                  {flight.recommended && (
                    <div className="absolute top-0 right-6 -translate-y-1/2 px-2.5 py-0.5 bg-terracotta text-white font-mono text-[9px] font-bold uppercase tracking-wider">
                      RECOMMENDED
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-warm-gray-border/50">
                    
                    {/* Airline & Aircraft */}
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-sand/60 border border-warm-gray-border flex items-center justify-center font-mono font-bold text-xs text-ink">
                        {flight.airlineCode}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-ink uppercase tracking-wider">
                          {flight.airline}
                        </div>
                        <div className="text-[10px] font-mono text-warm-gray">
                          {flight.flightNumber} · {flight.aircraft}
                        </div>
                      </div>
                    </div>

                    {/* Cabin badge */}
                    <div className="text-xs font-mono text-warm-gray">
                      <span>Cabin: </span>
                      <strong className="text-ink font-semibold">{flight.cabinClass}</strong>
                    </div>
                  </div>

                  {/* FLIGHT TIMELINE ROW */}
                  <div className="py-4 grid grid-cols-12 gap-2 items-center">
                    
                    {/* Departure */}
                    <div className="col-span-4 text-left">
                      <div className="text-2xl sm:text-3xl font-display font-black text-ink">
                        {flight.departureTime}
                      </div>
                      <div className="text-xs font-mono font-bold text-ink/90">
                        {flight.from.code}
                      </div>
                      <div className="text-[11px] text-warm-gray truncate">
                        {flight.from.city}
                      </div>
                    </div>

                    {/* Horizontal Route Line & Duration */}
                    <div className="col-span-4 flex flex-col items-center justify-center px-1">
                      <span className="text-[10px] font-mono text-warm-gray flex items-center space-x-1 mb-1">
                        <Clock className="w-3 h-3 text-warm-gray" />
                        <span>{flight.duration}</span>
                      </span>
                      <div className="w-full relative flex items-center justify-center">
                        <div className="w-full h-[1px] bg-warm-gray-border" />
                        <span className="w-1.5 h-1.5 rounded-full bg-terracotta absolute left-1/2 -translate-x-1/2" />
                      </div>
                      <span className="text-[10px] font-mono text-warm-gray mt-1">
                        {flight.stops === 0 ? 'Non-Stop' : `${flight.stops} Stop (${flight.stopDetails.split(' ')[0]})`}
                      </span>
                    </div>

                    {/* Arrival */}
                    <div className="col-span-4 text-right">
                      <div className="text-2xl sm:text-3xl font-display font-black text-ink">
                        {flight.arrivalTime}
                      </div>
                      <div className="text-xs font-mono font-bold text-ink/90">
                        {flight.to.code}
                      </div>
                      <div className="text-[11px] text-warm-gray truncate">
                        {flight.to.city}
                      </div>
                    </div>

                  </div>

                  {/* BOTTOM ACTION BAR */}
                  <div className="pt-3 border-t border-warm-gray-border/50 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center space-x-3 text-xs text-warm-gray font-mono">
                      <span>{flight.baggage.cabin} Cabin</span>
                      <span>·</span>
                      <span>{flight.baggage.checked}</span>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <span className="text-[10px] font-mono text-warm-gray block">TOTAL PER TRAVELER</span>
                        <span className="text-xl font-display font-black text-ink">
                          {formatPrice(flight.priceINR, currency)}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => openDrawer(flight)}
                          className="px-3 py-2 text-xs font-sans text-warm-gray hover:text-ink border border-warm-gray-border hover:border-ink transition-colors"
                        >
                          Specs
                        </button>
                        <button
                          type="button"
                          onClick={() => selectFlight(flight)}
                          className="px-5 py-2 bg-terracotta hover:bg-terracotta-dark text-white font-sans font-bold text-xs tracking-wider uppercase transition-colors shadow-sm"
                        >
                          SELECT
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Bottom App Bar */}
            <div className="text-center pt-2">
              <span className="text-xs font-mono text-warm-gray">
                Showing 3 of {flights.length} available international flights.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
