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
  // If user chose 'flex', standard and extra-legroom seats are free!
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-navy-950/85 backdrop-blur-xl overflow-y-auto">
      <div className="glass-panel w-full max-w-5xl rounded-3xl border border-white/15 shadow-2xl p-5 sm:p-8 my-auto relative overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* HEADER & TELEMETRY */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 shrink-0">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 mb-0.5">
              <span>STEP 3 OF 5</span>
              <span>·</span>
              <span>CABIN SEATING ASSIGNMENT</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white flex items-center space-x-2">
              <span>Select Your Seat</span>
              <span className="text-xs font-mono text-slate-400 font-normal">
                ({selectedSeats.length}/{totalTravelers} selected)
              </span>
            </h2>
          </div>

          <div className="text-right text-xs">
            <div className="text-slate-400 font-mono">Aircraft Layout</div>
            <div className="font-bold text-white flex items-center space-x-1.5">
              <span>{selectedFlight.aircraft}</span>
              <span className="text-cyan-400 font-mono">({selectedFlight.flightNumber})</span>
            </div>
          </div>
        </div>

        {/* SEAT MAP LEGEND */}
        <div className="py-3 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-300 border-b border-white/10 shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded-lg bg-slate-800 border border-white/20" />
            <span>Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded-lg bg-cyan-400 border border-cyan-300 shadow-glow-cyan" />
            <span className="font-bold text-white">Selected</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded-lg bg-slate-900 border border-white/5 opacity-40" />
            <span className="text-slate-500">Occupied</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded-lg bg-amber-500/20 border border-amber-400 text-amber-400 flex items-center justify-center text-[10px] font-bold">
              XL
            </div>
            <span>Extra Legroom</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded-lg bg-purple-500/20 border border-purple-400 text-purple-300 flex items-center justify-center text-[10px] font-bold">
              B
            </div>
            <span>Business Pod</span>
          </div>
        </div>

        {/* MAIN BODY: AIRCRAFT FUSELAGE + STICKY SUMMARY PANEL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-4 overflow-y-auto pr-1">
          
          {/* AIRCRAFT CABIN VISUALIZER (Col 1-8) */}
          <div className="lg:col-span-8 flex flex-col items-center">
            
            {/* NOSE CONE & COCKPIT */}
            <div className="w-64 sm:w-80 h-16 rounded-t-full bg-slate-900/90 border-t-2 border-x-2 border-cyan-400/40 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="w-32 h-6 rounded-t-full bg-cyan-500/20 border-t border-cyan-400/60 mb-1 flex items-center justify-center">
                <span className="text-[10px] font-mono tracking-widest text-cyan-300 uppercase">COCKPIT</span>
              </div>
              <div className="text-[10px] font-mono text-slate-500">FRONT OF AIRCRAFT ✈</div>
            </div>

            {/* CABIN BODY CONTAINER */}
            <div className="w-64 sm:w-80 bg-slate-950/70 border-x-2 border-white/10 p-3 sm:p-5 space-y-3 relative">
              
              {/* GALLEY & LAVATORY BARRIER */}
              <div className="py-1.5 px-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
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
                      <div className="my-2 py-1 px-2 rounded-lg bg-amber-500/15 border border-amber-500/30 text-[10px] font-mono text-amber-300 flex items-center justify-between">
                        <span>◀ EXIT ROW</span>
                        <span>EXTRA LEGROOM (+38")</span>
                        <span>EXIT ROW ▶</span>
                      </div>
                    )}

                    {/* Section Header for Business vs Economy */}
                    {rowNum === 1 && (
                      <div className="text-[10px] font-mono text-purple-400 uppercase tracking-wider py-1 border-b border-purple-500/20 mb-2">
                        Business Class (1-2-1 / 2-2)
                      </div>
                    )}
                    {rowNum === 4 && (
                      <div className="text-[10px] font-mono text-blue-400 uppercase tracking-wider py-1 border-b border-blue-500/20 mb-2">
                        Premium & Economy Class (3-3)
                      </div>
                    )}

                    {/* SEATS ROW */}
                    <div className="flex items-center justify-between">
                      {/* Left Block (Seats A, B, C or A, C) */}
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
                                className={`w-8 h-9 sm:w-9 sm:h-10 rounded-xl text-[11px] font-bold font-mono transition-all duration-200 flex flex-col items-center justify-center relative ${
                                  occupied
                                    ? 'bg-slate-900/40 text-slate-700 border border-white/5 cursor-not-allowed'
                                    : selected
                                    ? 'bg-cyan-400 text-slate-950 border border-cyan-300 shadow-glow-cyan scale-105 z-10'
                                    : seat.isExitRow
                                    ? 'bg-amber-500/15 text-amber-300 border border-amber-400/40 hover:bg-amber-500/30'
                                    : seat.cabin === 'Business'
                                    ? 'bg-purple-500/15 text-purple-300 border border-purple-400/40 hover:bg-purple-500/30'
                                    : 'bg-slate-800/80 text-slate-300 border border-white/10 hover:border-cyan-400 hover:text-white'
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
                      <div className="text-[10px] font-mono text-slate-500 w-6 text-center select-none">
                        {rowNum}
                      </div>

                      {/* Right Block (Seats D, E, F or D, F) */}
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
                                className={`w-8 h-9 sm:w-9 sm:h-10 rounded-xl text-[11px] font-bold font-mono transition-all duration-200 flex flex-col items-center justify-center relative ${
                                  occupied
                                    ? 'bg-slate-900/40 text-slate-700 border border-white/5 cursor-not-allowed'
                                    : selected
                                    ? 'bg-cyan-400 text-slate-950 border border-cyan-300 shadow-glow-cyan scale-105 z-10'
                                    : seat.isExitRow
                                    ? 'bg-amber-500/15 text-amber-300 border border-amber-400/40 hover:bg-amber-500/30'
                                    : seat.cabin === 'Business'
                                    ? 'bg-purple-500/15 text-purple-300 border border-purple-400/40 hover:bg-purple-500/30'
                                    : 'bg-slate-800/80 text-slate-300 border border-white/10 hover:border-cyan-400 hover:text-white'
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
            <div className="w-64 sm:w-80 h-10 rounded-b-full bg-slate-900/90 border-b-2 border-x-2 border-white/10 flex items-center justify-center text-[10px] font-mono text-slate-500">
              REAR LAVATORIES & EXIT 🚻
            </div>
          </div>

          {/* STICKY LIVE SEAT SUMMARY & FARE BREAKDOWN (Col 9-12) */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* HOVERED / ACTIVE SEAT INSPECTOR */}
            <div className="glass-panel p-4 rounded-2xl border border-white/10">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center space-x-1">
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                <span>Seat Inspector</span>
              </div>
              {hoveredSeat ? (
                <div className="space-y-1">
                  <div className="text-xl font-bold font-display text-white flex items-center justify-between">
                    <span>Seat {hoveredSeat.id}</span>
                    <span className="text-sm text-cyan-400 font-mono">
                      {formatPrice(getSeatEffectivePrice(hoveredSeat), currency)}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300">
                    {hoveredSeat.cabin} Class · {hoveredSeat.isWindow ? 'Window' : hoveredSeat.isAisle ? 'Aisle' : 'Middle'}
                  </div>
                  {hoveredSeat.isExitRow && (
                    <div className="text-[11px] text-amber-300 font-mono">
                      ⚡ Extra Legroom (+38" seat pitch)
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-xs text-slate-400 italic">
                  Hover or tap any seat on the aircraft map to view pitch, category and price.
                </div>
              )}
            </div>

            {/* SELECTED SEATS LIST */}
            <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold flex items-center justify-between">
                <span>Selected Seats</span>
                <span className="text-cyan-400">
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
                        className="p-2.5 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center space-x-2.5">
                          <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 font-mono font-bold flex items-center justify-center">
                            {seat.id}
                          </div>
                          <div>
                            <div className="font-bold text-white">
                              {seat.cabin} · {seat.isWindow ? 'Window' : seat.isAisle ? 'Aisle' : 'Standard'}
                            </div>
                            <div className="text-[10px] text-slate-400">Row {seat.row}</div>
                          </div>
                        </div>
                        <span className="font-mono text-cyan-400 font-semibold">
                          {price === 0 ? 'Free' : formatPrice(price, currency)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-xs text-slate-400 p-3 rounded-xl bg-slate-900/40 text-center">
                  No seats selected yet. Choose seats for your travelers or proceed with auto-assignment.
                </div>
              )}

              {/* Dynamic Price Summary */}
              <div className="pt-3 border-t border-white/10 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Base Airfare ({selectedFarePackage.name}):</span>
                  <span>{formatPrice(selectedFarePackage.priceINR || selectedFlight.priceINR, currency)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Seat Add-ons:</span>
                  <span className="text-cyan-400 font-mono">{formatPrice(totalSeatCostINR, currency)}</span>
                </div>
                <div className="flex justify-between text-white font-bold pt-2 border-t border-white/5 text-sm">
                  <span>Total so far:</span>
                  <span className="font-mono text-cyan-300">
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
        <div className="flex items-center justify-between pt-4 border-t border-white/10 shrink-0">
          <button
            onClick={() => proceedToStep('fare')}
            className="px-5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white font-medium text-xs flex items-center space-x-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Fares</span>
          </button>

          <button
            onClick={() => proceedToStep('passengers')}
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-aerova-blue via-blue-600 to-cyan-500 text-white font-bold text-xs tracking-wide shadow-glow-blue hover:shadow-cyan-500/40 transition-all flex items-center space-x-2"
          >
            <span>Proceed to Passenger Details</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
