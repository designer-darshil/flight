import React, { useState, useMemo } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Info,
  Check,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { generateAerivaSeats } from '../utils/seatGenerator';
import { Seat } from '../types';
import { formatPrice } from '../utils/currency';

export const SeatMapModal: React.FC = () => {
  const {
    selectedFlight,
    selectedSeats,
    toggleSeat,
    searchParams,
    selectedFarePackage,
    proceedToStep,
    currency,
  } = useBooking();

  // Generate aircraft seat layout
  const allSeats = useMemo(() => generateAerivaSeats(), []);

  // Hovered seat for tooltip
  const [hoveredSeat, setHoveredSeat] = useState<Seat | null>(null);

  const totalTravelers =
    searchParams.passengers.adults + searchParams.passengers.children;

  // Calculate dynamic seat fees based on fare tier:
  const getSeatEffectivePrice = (seat: Seat) => {
    if (selectedFarePackage.id === 'flex') return 0;
    if (selectedFarePackage.id === 'standard' && seat.cabin === 'Economy' && !seat.isExitRow) {
      return 0; // Standard seat included
    }
    return seat.priceINR;
  };

  const totalSeatCostINR = selectedSeats.reduce(
    (sum, s) => sum + getSeatEffectivePrice(s),
    0
  );

  const isSeatSelected = (seatId: string) =>
    selectedSeats.some(s => s.id === seatId);

  // Group seats by rows
  const rows = useMemo<[number, Seat[]][]>(() => {
    const map = new Map<number, Seat[]>();
    allSeats.forEach((s: Seat) => {
      if (!map.has(s.row)) map.set(s.row, []);
      map.get(s.row)!.push(s);
    });
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
  }, [allSeats]);

  if (!selectedFlight) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-ink/40 backdrop-blur-sm overflow-y-auto">
      <div className="bg-paper w-full max-w-5xl rounded-2xl border border-border shadow-2xl p-5 sm:p-8 my-auto relative flex flex-col max-h-[92vh] text-ink">
        
        {/* HEADER & TELEMETRY */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border shrink-0">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-terracotta mb-0.5">
              <span>STEP 3 OF 5</span>
              <span>&bull;</span>
              <span>SEAT SELECTION</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-light text-ink flex items-center space-x-2">
              <span>Select Your Seat</span>
              <span className="text-xs font-mono text-warm-gray font-normal">
                ({selectedSeats.length}/{totalTravelers} selected)
              </span>
            </h2>
          </div>

          <div className="text-right text-xs">
            <div className="text-warm-gray font-mono">Aircraft Layout</div>
            <div className="font-serif font-medium text-ink flex items-center space-x-1.5">
              <span>{selectedFlight.aircraft}</span>
              <span className="text-terracotta font-mono">({selectedFlight.flightNumber})</span>
            </div>
          </div>
        </div>

        {/* SEAT MAP LEGEND */}
        <div className="py-3 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-warm-gray border-b border-border shrink-0 font-mono">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-md bg-sand border border-border" />
            <span className="text-ink">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-md bg-terracotta border border-terracotta text-paper flex items-center justify-center text-[9px]">✓</div>
            <span className="font-semibold text-ink">Selected</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-md bg-ink/10 border border-border/50 opacity-40" />
            <span>Occupied</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-md bg-olive/15 border border-olive/30 text-olive flex items-center justify-center text-[9px] font-bold">
              XL
            </div>
            <span className="text-olive font-medium">Extra Legroom</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-md bg-champagne/20 border border-champagne/40 text-ink flex items-center justify-center text-[9px] font-bold">
              B
            </div>
            <span className="text-ink font-medium">Business Suite</span>
          </div>
        </div>

        {/* MAIN BODY: AIRCRAFT FUSELAGE + SUMMARY PANEL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-4 overflow-y-auto pr-1">
          
          {/* AIRCRAFT CABIN VISUALIZER (Col 1-8) */}
          <div className="lg:col-span-8 flex flex-col items-center">
            
            {/* NOSE CONE & COCKPIT */}
            <div className="w-64 sm:w-80 h-14 rounded-t-full bg-sand/40 border-t-2 border-x-2 border-border flex flex-col items-center justify-center relative overflow-hidden">
              <div className="w-24 h-4 rounded-t-full bg-sand border-t border-border mb-0.5 flex items-center justify-center">
                <span className="text-[9px] font-mono tracking-widest text-warm-gray uppercase">COCKPIT</span>
              </div>
              <div className="text-[10px] font-mono text-warm-gray">FRONT OF AIRCRAFT &bull; FORWARD</div>
            </div>

            {/* CABIN BODY CONTAINER */}
            <div className="w-64 sm:w-80 bg-paper border-x-2 border-border p-3 sm:p-5 space-y-3 relative shadow-inner">
              
              {/* GALLEY BARRIER */}
              <div className="py-1.5 px-3 rounded-lg bg-sand/30 border border-border flex items-center justify-between text-[10px] font-mono text-warm-gray">
                <span>GALLEY ☕</span>
                <span>LAVATORY 🚻</span>
              </div>

              {/* CABIN SEAT ROWS */}
              {rows.map(([rowNum, seatsInRow]) => {
                const isExit = rowNum === 12;

                return (
                  <div key={rowNum} className="relative">
                    
                    {/* Emergency Exit Row Notice */}
                    {isExit && (
                      <div className="my-2 py-1 px-2 rounded-md bg-olive/10 border border-olive/20 text-[10px] font-mono text-olive flex items-center justify-between">
                        <span>◀ EXIT</span>
                        <span>EXTRA LEGROOM (+38")</span>
                        <span>EXIT ▶</span>
                      </div>
                    )}

                    {/* Section Header for Business vs Economy */}
                    {rowNum === 1 && (
                      <div className="text-[10px] font-mono text-warm-gray uppercase tracking-wider py-1 border-b border-border mb-2">
                        First & Business Cabin (1-2-1)
                      </div>
                    )}
                    {rowNum === 4 && (
                      <div className="text-[10px] font-mono text-warm-gray uppercase tracking-wider py-1 border-b border-border mb-2">
                        Main Cabin (3-3)
                      </div>
                    )}

                    {/* SEATS ROW */}
                    <div className="flex items-center justify-between">
                      {/* Left Block */}
                      <div className="flex items-center space-x-1.5">
                        {seatsInRow
                          .filter((s: Seat) => s.col <= 'C')
                          .map((seat: Seat) => {
                            const selected = isSeatSelected(seat.id);
                            const occupied = seat.status === 'occupied';
                            const price = getSeatEffectivePrice(seat);

                            return (
                              <button
                                key={seat.id}
                                disabled={occupied}
                                onClick={() => toggleSeat(seat)}
                                onMouseEnter={() => setHoveredSeat(seat)}
                                onMouseLeave={() => setHoveredSeat(null)}
                                className={`w-8 h-9 sm:w-9 sm:h-10 rounded-lg text-[11px] font-medium font-mono transition-colors flex flex-col items-center justify-center relative ${
                                  occupied
                                    ? 'bg-ink/5 text-warm-gray/30 border border-border/40 cursor-not-allowed'
                                    : selected
                                    ? 'bg-terracotta text-paper border border-terracotta shadow-sm'
                                    : seat.isExitRow
                                    ? 'bg-olive/10 text-olive border border-olive/30 hover:bg-olive/20'
                                    : seat.cabin === 'Business'
                                    ? 'bg-champagne/15 text-ink border border-champagne/30 hover:bg-champagne/25'
                                    : 'bg-sand/60 text-ink border border-border hover:border-ink'
                                }`}
                                title={`Seat ${seat.id} - ${seat.cabin} - ${formatPrice(price, currency)}`}
                              >
                                <span>{seat.id}</span>
                                {selected && <Check className="w-2.5 h-2.5 stroke-[3] -mt-0.5" />}
                              </button>
                            );
                          })}
                      </div>

                      {/* AISLE NUMBER */}
                      <div className="text-[10px] font-mono text-warm-gray w-6 text-center select-none">
                        {rowNum}
                      </div>

                      {/* Right Block */}
                      <div className="flex items-center space-x-1.5">
                        {seatsInRow
                          .filter((s: Seat) => s.col >= 'D')
                          .map((seat: Seat) => {
                            const selected = isSeatSelected(seat.id);
                            const occupied = seat.status === 'occupied';
                            const price = getSeatEffectivePrice(seat);

                            return (
                              <button
                                key={seat.id}
                                disabled={occupied}
                                onClick={() => toggleSeat(seat)}
                                onMouseEnter={() => setHoveredSeat(seat)}
                                onMouseLeave={() => setHoveredSeat(null)}
                                className={`w-8 h-9 sm:w-9 sm:h-10 rounded-lg text-[11px] font-medium font-mono transition-colors flex flex-col items-center justify-center relative ${
                                  occupied
                                    ? 'bg-ink/5 text-warm-gray/30 border border-border/40 cursor-not-allowed'
                                    : selected
                                    ? 'bg-terracotta text-paper border border-terracotta shadow-sm'
                                    : seat.isExitRow
                                    ? 'bg-olive/10 text-olive border border-olive/30 hover:bg-olive/20'
                                    : seat.cabin === 'Business'
                                    ? 'bg-champagne/15 text-ink border border-champagne/30 hover:bg-champagne/25'
                                    : 'bg-sand/60 text-ink border border-border hover:border-ink'
                                }`}
                                title={`Seat ${seat.id} - ${seat.cabin} - ${formatPrice(price, currency)}`}
                              >
                                <span>{seat.id}</span>
                                {selected && <Check className="w-2.5 h-2.5 stroke-[3] -mt-0.5" />}
                              </button>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* REAR TAIL CONE */}
            <div className="w-64 sm:w-80 h-10 rounded-b-full bg-sand/40 border-b-2 border-x-2 border-border flex items-center justify-center text-[10px] font-mono text-warm-gray">
              AFT LAVATORIES & REAR EXIT 🚻
            </div>
          </div>

          {/* STICKY LIVE SEAT SUMMARY & FARE BREAKDOWN (Col 9-12) */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* HOVERED / ACTIVE SEAT INSPECTOR */}
            <div className="p-4 rounded-xl bg-sand/30 border border-border">
              <div className="text-[10px] font-mono text-warm-gray uppercase tracking-wider mb-2 flex items-center space-x-1">
                <Info className="w-3.5 h-3.5 text-terracotta" />
                <span>Seat Telemetry</span>
              </div>
              {hoveredSeat ? (
                <div className="space-y-1">
                  <div className="text-xl font-serif font-medium text-ink flex items-center justify-between">
                    <span>Seat {hoveredSeat.id}</span>
                    <span className="text-sm text-terracotta font-mono">
                      {formatPrice(getSeatEffectivePrice(hoveredSeat), currency)}
                    </span>
                  </div>
                  <div className="text-xs text-warm-gray">
                    {hoveredSeat.cabin} Class &bull; {hoveredSeat.isWindow ? 'Window' : hoveredSeat.isAisle ? 'Aisle' : 'Middle'}
                  </div>
                  {hoveredSeat.isExitRow && (
                    <div className="text-[11px] text-olive font-mono">
                      Extra Legroom (+38" ergonomic pitch)
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-xs text-warm-gray font-sans italic">
                  Hover or tap any seat on the cabin plan to inspect category and fare.
                </div>
              )}
            </div>

            {/* SELECTED SEATS LIST */}
            <div className="p-5 rounded-xl bg-sand/30 border border-border space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-ink font-semibold flex items-center justify-between">
                <span>Selected Seats</span>
                <span className="text-terracotta font-mono">
                  {selectedSeats.length} of {totalTravelers}
                </span>
              </h4>

              {selectedSeats.length > 0 ? (
                <div className="space-y-2">
                  {selectedSeats.map(seat => {
                    const price = getSeatEffectivePrice(seat);
                    return (
                      <div
                        key={seat.id}
                        className="p-2.5 rounded-lg bg-paper border border-border flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center space-x-2.5">
                          <div className="w-7 h-7 rounded-md bg-terracotta/10 text-terracotta font-mono font-bold flex items-center justify-center">
                            {seat.id}
                          </div>
                          <div>
                            <div className="font-medium text-ink">
                              {seat.cabin} &bull; {seat.isWindow ? 'Window' : seat.isAisle ? 'Aisle' : 'Standard'}
                            </div>
                            <div className="text-[10px] font-mono text-warm-gray">Row {seat.row}</div>
                          </div>
                        </div>
                        <span className="font-mono text-terracotta font-medium">
                          {price === 0 ? 'Included' : formatPrice(price, currency)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-xs text-warm-gray p-3 rounded-lg bg-sand/50 text-center font-sans">
                  No seats selected yet. Choose seats above or proceed for complimentary random assignment.
                </div>
              )}

              {/* Dynamic Price Summary */}
              <div className="pt-3 border-t border-border space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-warm-gray">
                  <span>Base Fare ({selectedFarePackage.name}):</span>
                  <span>{formatPrice(selectedFarePackage.priceINR || selectedFlight.priceINR, currency)}</span>
                </div>
                <div className="flex justify-between text-warm-gray">
                  <span>Seat Assignment:</span>
                  <span className="text-terracotta">{formatPrice(totalSeatCostINR, currency)}</span>
                </div>
                <div className="flex justify-between text-ink font-bold pt-2 border-t border-border text-sm">
                  <span>Total Itinerary:</span>
                  <span className="font-serif text-base text-terracotta">
                    {formatPrice(
                      (selectedFarePackage.priceINR || selectedFlight.priceINR) + totalSeatCostINR,
                      currency
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM STEP CONTROLS */}
        <div className="flex items-center justify-between pt-4 border-t border-border shrink-0">
          <button
            onClick={() => proceedToStep('fare')}
            className="px-5 py-2.5 rounded-lg bg-paper border border-border text-ink hover:border-ink/50 font-mono text-xs uppercase flex items-center space-x-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Fares</span>
          </button>

          <button
            onClick={() => proceedToStep('passengers')}
            className="px-6 py-3 rounded-lg bg-terracotta hover:bg-terracotta-hover text-paper font-mono font-medium text-xs tracking-wider uppercase transition-colors flex items-center space-x-2 shadow-sm"
          >
            <span>Proceed to Passenger Details</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
