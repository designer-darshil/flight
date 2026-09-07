import React, { useState, useMemo } from 'react';
import {
  ArrowRight,
  Info,
  Check,
  Plane,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { generateAerivaSeats } from '../utils/seatGenerator';
import { Seat } from '../types';
import { formatPrice } from '../utils/currency';
import { BookingProgress } from './BookingProgress';

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

  // Hovered seat for inspector
  const [hoveredSeat, setHoveredSeat] = useState<Seat | null>(null);
  
  // Mobile summary accordion expand state
  const [mobileSummaryExpanded, setMobileSummaryExpanded] = useState(false);

  const totalTravelers =
    searchParams.passengers.adults + searchParams.passengers.children;

  // Dynamic seat fee based on selected fare tier:
  const getSeatEffectivePrice = (seat: Seat) => {
    if (selectedFarePackage.id === 'flex') return 0; // All seats complimentary in Flex
    if (selectedFarePackage.id === 'standard') {
      if (seat.isExitRow) return 2400; // Extra Legroom exit row fee
      return 0; // Standard seats included in Standard
    }
    // Basic tier
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

  const baseFarePerPax = selectedFarePackage.priceINR || selectedFlight.priceINR;
  const totalBaseFareINR = baseFarePerPax * totalTravelers;
  const taxesPerPaxINR = 4820;
  const totalTaxesINR = taxesPerPaxINR * totalTravelers;
  const grandTotalINR = totalBaseFareINR + totalSeatCostINR + totalTaxesINR;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-[rgba(23,23,23,0.25)] overflow-y-auto">
      <div className="bg-[#F6F2EA] w-full max-w-6xl rounded-[12px] border border-[#D8D1C5] shadow-[0_20px_60px_rgba(23,23,23,0.12)] p-4 sm:p-6 lg:p-8 my-auto relative flex flex-col max-h-[95vh] text-ink overflow-hidden">
        
        {/* BOOKING PROGRESS: FLIGHT -> FARE -> SEAT -> PASSENGER -> PAYMENT -> CONFIRMATION */}
        <div className="shrink-0">
          <BookingProgress currentStep="seats" onStepClick={proceedToStep} />
        </div>

        {/* HEADER & TELEMETRY */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border shrink-0">
          <div>
            <div className="text-[11px] font-mono text-[#963F24] uppercase tracking-wider font-semibold mb-0.5">
              STAGE 3 &bull; SEAT ASSIGNMENT
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-light text-ink tracking-tight flex items-center space-x-2">
              <span>Interactive Seat Map</span>
              <span className="text-xs font-mono text-warm-gray font-normal">
                ({selectedSeats.length} of {totalTravelers} assigned)
              </span>
            </h2>
          </div>

          <div className="text-right text-xs">
            <div className="text-warm-gray font-mono uppercase text-[10px] tracking-wider">Aircraft & Cabin</div>
            <div className="font-serif font-medium text-ink flex items-center space-x-1.5">
              <span>{selectedFlight.aircraft}</span>
              <span className="text-[#963F24] font-mono font-bold">· {selectedFlight.flightNumber}</span>
            </div>
          </div>
        </div>

        {/* SEAT MAP LEGEND (Available, Selected [Terracotta], Occupied [Dark neutral], Extra Legroom [Olive]) */}
        <div className="py-3 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-warm-gray border-b border-border shrink-0 font-mono bg-white/70 rounded-[8px] my-2">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-[4px] bg-white border border-[#D8D1C5]" />
            <span className="text-ink font-medium">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-[4px] bg-[#963F24] border border-[#963F24] text-white flex items-center justify-center text-[9px] font-bold">
              ✓
            </div>
            <span className="font-bold text-[#963F24]">Selected</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-[4px] bg-[#2D2823] border border-[#231F1B]" />
            <span className="text-ink font-medium">Occupied</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-[4px] bg-[#EEF2EB] border border-[#59604F] text-[#59604F] flex items-center justify-center text-[9px] font-bold">
              XL
            </div>
            <span className="text-[#48503F] font-semibold">Extra Legroom</span>
          </div>
        </div>

        {/* LIVE SEAT TELEMETRY INSPECTOR BAR */}
        <div className="shrink-0 mb-2">
          {hoveredSeat ? (
            <div className="py-2 px-4 rounded-[8px] bg-white border border-[#D8D1C5] flex items-center justify-between text-xs font-mono shadow-xs">
              <div className="flex items-center space-x-2">
                <Info className="w-3.5 h-3.5 text-[#963F24]" />
                <span className="font-bold text-ink">Seat {hoveredSeat.id}</span>
                <span className="text-warm-gray">
                  &bull; {hoveredSeat.cabin} Class &bull; {hoveredSeat.isExitRow ? 'Exit Row Extra Legroom' : hoveredSeat.isWindow ? 'Window' : hoveredSeat.isAisle ? 'Aisle' : 'Standard'}
                </span>
              </div>
              <span className="font-bold text-[#963F24]">
                {hoveredSeat.status === 'occupied' ? 'Occupied' : getSeatEffectivePrice(hoveredSeat) === 0 ? 'Complimentary' : formatPrice(getSeatEffectivePrice(hoveredSeat), currency)}
              </span>
            </div>
          ) : (
            <div className="py-2 px-4 rounded-[8px] bg-white/40 border border-border/50 text-center text-warm-gray text-[11px] font-mono">
              Hover over or tap any seat to view category and live fee
            </div>
          )}
        </div>

        {/* MAIN BODY: WHITE AIRCRAFT PANEL (LEFT) + BOOKING SUMMARY (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-2 overflow-y-auto pr-1 items-start flex-1">
          
          {/* WHITE AIRCRAFT PANEL (Col 1-7) */}
          <div className="lg:col-span-7 flex flex-col items-center overflow-x-auto pb-4">
            
            {/* NOSE CONE & COCKPIT */}
            <div className="w-72 sm:w-84 h-16 rounded-t-full bg-[#EFE9DE] border-t-2 border-x-2 border-[#D8D1C5] flex flex-col items-center justify-center relative overflow-hidden shadow-xs">
              <div className="w-24 h-4 rounded-t-full bg-sand border-t border-[#D8D1C5] mb-0.5 flex items-center justify-center">
                <span className="text-[9px] font-mono tracking-widest text-warm-gray uppercase">COCKPIT</span>
              </div>
              <div className="text-[10px] font-mono text-warm-gray">FORWARD DIRECTION &bull; NOSE</div>
            </div>

            {/* WHITE AIRCRAFT CABIN FUSELAGE CONTAINER */}
            <div className="w-72 sm:w-84 bg-white border-x-2 border-[#D8D1C5] p-4 sm:p-5 space-y-3 relative shadow-sm">
              
              {/* FORWARD GALLEY & LAVATORIES */}
              <div className="py-2 px-3 rounded-[8px] bg-sand/40 border border-border flex items-center justify-between text-[10px] font-mono text-warm-gray">
                <span>GALLEY ☕</span>
                <span>LAVATORY 🚻</span>
              </div>

              {/* CABIN SEAT ROWS */}
              {rows.map(([rowNum, seatsInRow]) => {
                const isExit = rowNum === 18;
                const isBusiness = rowNum <= 5;

                return (
                  <div key={rowNum} className="relative">
                    
                    {/* Emergency Exit Row Notice (Row 18) in Olive */}
                    {isExit && (
                      <div className="my-2.5 py-1.5 px-2.5 rounded-[6px] bg-[#EEF2EB] border border-[#59604F] text-[10px] font-mono text-[#48503F] flex items-center justify-between font-semibold">
                        <span>◀ EXIT</span>
                        <span>EXTRA LEGROOM (+38")</span>
                        <span>EXIT ▶</span>
                      </div>
                    )}

                    {/* Section Headers */}
                    {rowNum === 1 && (
                      <div className="text-[10px] font-mono text-warm-gray uppercase tracking-wider py-1 border-b border-border mb-2 font-semibold flex items-center justify-between">
                        <span>BUSINESS SUITES (2-2)</span>
                        <span className="text-[9px]">ROWS 1–5</span>
                      </div>
                    )}
                    {rowNum === 10 && (
                      <div className="text-[10px] font-mono text-warm-gray uppercase tracking-wider py-1 border-b border-border my-2 font-semibold flex items-center justify-between">
                        <span>ECONOMY CABIN (3-3)</span>
                        <span className="text-[9px]">ROWS 10–35</span>
                      </div>
                    )}

                    {/* Row Content */}
                    <div className="flex items-center justify-between py-0.5">
                      
                      {/* Left Block (Cols A, B, C or A, C) */}
                      <div className="flex items-center space-x-1.5 sm:space-x-2">
                        {seatsInRow
                          .filter((s: Seat) => s.col < 'D')
                          .map((seat: Seat) => {
                            const selected = isSeatSelected(seat.id);
                            const occupied = seat.status === 'occupied';
                            const price = getSeatEffectivePrice(seat);

                            // Strict Color Rules:
                            // Selected -> Terracotta (#963F24)
                            // Occupied -> Dark neutral (#2D2823)
                            // Extra Legroom -> Olive (#EEF2EB, border #59604F, text #48503F)
                            // Available -> White border #D8D1C5
                            let seatClasses = '';
                            if (occupied) {
                              seatClasses = 'bg-[#2D2823] text-[#857E75] border border-[#231F1B] cursor-not-allowed';
                            } else if (selected) {
                              seatClasses = 'bg-[#963F24] text-white border border-[#963F24] shadow-sm font-bold';
                            } else if (seat.isExitRow) {
                              seatClasses = 'bg-[#EEF2EB] text-[#48503F] border border-[#59604F] hover:bg-[#DEE6D8] font-bold';
                            } else if (isBusiness) {
                              seatClasses = 'bg-[#FAF7F0] text-ink border border-[#D8D1C5] hover:border-[#963F24] font-medium';
                            } else {
                              seatClasses = 'bg-white text-ink border border-[#D8D1C5] hover:border-[#963F24] hover:bg-sand/30 font-medium';
                            }

                            return (
                              <button
                                key={seat.id}
                                type="button"
                                disabled={occupied}
                                onClick={() => toggleSeat(seat)}
                                onMouseEnter={() => setHoveredSeat(seat)}
                                onMouseLeave={() => setHoveredSeat(null)}
                                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-[6px] text-xs font-mono transition-all flex flex-col items-center justify-center relative select-none cursor-pointer ${seatClasses}`}
                                title={`Seat ${seat.id} - ${seat.cabin} - ${price === 0 ? 'Included' : formatPrice(price, currency)}`}
                              >
                                <span>{seat.id}</span>
                                {selected && <Check className="w-2.5 h-2.5 stroke-[3] -mt-0.5" />}
                              </button>
                            );
                          })}
                      </div>

                      {/* AISLE ROW NUMBER */}
                      <div className="text-[10px] font-mono text-warm-gray w-6 text-center select-none font-semibold">
                        {rowNum}
                      </div>

                      {/* Right Block (Cols D, E, F or D, F) */}
                      <div className="flex items-center space-x-1.5 sm:space-x-2">
                        {seatsInRow
                          .filter((s: Seat) => s.col >= 'D')
                          .map((seat: Seat) => {
                            const selected = isSeatSelected(seat.id);
                            const occupied = seat.status === 'occupied';
                            const price = getSeatEffectivePrice(seat);

                            let seatClasses = '';
                            if (occupied) {
                              seatClasses = 'bg-[#2D2823] text-[#857E75] border border-[#231F1B] cursor-not-allowed';
                            } else if (selected) {
                              seatClasses = 'bg-[#963F24] text-white border border-[#963F24] shadow-sm font-bold';
                            } else if (seat.isExitRow) {
                              seatClasses = 'bg-[#EEF2EB] text-[#48503F] border border-[#59604F] hover:bg-[#DEE6D8] font-bold';
                            } else if (isBusiness) {
                              seatClasses = 'bg-[#FAF7F0] text-ink border border-[#D8D1C5] hover:border-[#963F24] font-medium';
                            } else {
                              seatClasses = 'bg-white text-ink border border-[#D8D1C5] hover:border-[#963F24] hover:bg-sand/30 font-medium';
                            }

                            return (
                              <button
                                key={seat.id}
                                type="button"
                                disabled={occupied}
                                onClick={() => toggleSeat(seat)}
                                onMouseEnter={() => setHoveredSeat(seat)}
                                onMouseLeave={() => setHoveredSeat(null)}
                                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-[6px] text-xs font-mono transition-all flex flex-col items-center justify-center relative select-none cursor-pointer ${seatClasses}`}
                                title={`Seat ${seat.id} - ${seat.cabin} - ${price === 0 ? 'Included' : formatPrice(price, currency)}`}
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
            <div className="w-72 sm:w-84 h-12 rounded-b-full bg-[#EFE9DE] border-b-2 border-x-2 border-[#D8D1C5] flex items-center justify-center text-[10px] font-mono text-warm-gray shadow-xs">
              AFT GALLEY & REAR EMERGENCY EXIT 🚻
            </div>
          </div>

          {/* BOOKING SUMMARY: WHITE STICKY CARD (Col 8-12) */}
          <div className="hidden lg:block lg:col-span-5 sticky top-4">
            <div className="bg-white rounded-[12px] p-6 border border-[#D8D1C5] shadow-sm space-y-5 text-ink">
              
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <h3 className="font-serif font-bold text-lg text-ink">
                  Booking Summary
                </h3>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-[4px] bg-sand font-bold text-[#963F24]">
                  LIVE ITINERARY
                </span>
              </div>

              {/* 1. ROUTE */}
              <div className="space-y-1 text-xs">
                <div className="text-[10px] font-mono text-warm-gray uppercase tracking-wider">Route</div>
                <div className="font-serif font-medium text-base text-ink flex items-center space-x-2">
                  <span>{selectedFlight.from.city} ({selectedFlight.from.code})</span>
                  <Plane className="w-3.5 h-3.5 text-[#963F24] rotate-90" />
                  <span>{selectedFlight.to.city} ({selectedFlight.to.code})</span>
                </div>
                <div className="text-warm-gray font-mono text-[11px]">
                  {selectedFlight.departureDate} &bull; {selectedFlight.duration} &bull; {selectedFlight.stops === 0 ? 'Non-stop' : `${selectedFlight.stops} Stop`}
                </div>
              </div>

              {/* 2. FLIGHT */}
              <div className="space-y-1 text-xs pt-3 border-t border-border">
                <div className="text-[10px] font-mono text-warm-gray uppercase tracking-wider">Flight Details</div>
                <div className="flex items-center space-x-2 font-medium text-ink">
                  <span>{selectedFlight.airline}</span>
                  <span className="font-mono text-xs font-bold text-[#963F24]">({selectedFlight.flightNumber})</span>
                </div>
                <div className="text-warm-gray text-[11px] font-mono">
                  {selectedFlight.aircraft} &bull; Dep {selectedFlight.departureTime}
                </div>
              </div>

              {/* 3. FARE */}
              <div className="space-y-1 text-xs pt-3 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-warm-gray uppercase tracking-wider">Fare Package</span>
                  <span className="font-mono font-bold text-ink">{selectedFarePackage.name}</span>
                </div>
                <div className="flex justify-between text-warm-gray">
                  <span>Base fare ({totalTravelers} {totalTravelers === 1 ? 'traveler' : 'travelers'}):</span>
                  <span className="font-mono text-ink">{formatPrice(totalBaseFareINR, currency)}</span>
                </div>
              </div>

              {/* 4. SEAT ASSIGNMENTS */}
              <div className="space-y-2 pt-3 border-t border-border text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-warm-gray uppercase tracking-wider">Seat Assignment</span>
                  <span className="font-mono text-xs text-[#963F24] font-bold">
                    {selectedSeats.length}/{totalTravelers} Assigned
                  </span>
                </div>

                {selectedSeats.length > 0 ? (
                  <div className="space-y-1.5">
                    {selectedSeats.map(seat => {
                      const seatFee = getSeatEffectivePrice(seat);
                      return (
                        <div
                          key={seat.id}
                          className="p-2 rounded-[6px] bg-sand/40 border border-border flex items-center justify-between font-mono text-xs"
                        >
                          <div className="flex items-center space-x-2">
                            <span className="px-1.5 py-0.5 rounded-[4px] bg-[#963F24] text-white font-bold text-[11px]">
                              {seat.id}
                            </span>
                            <span className="text-ink text-[11px]">
                              {seat.cabin} · {seat.isExitRow ? 'Extra Legroom' : seat.isWindow ? 'Window' : 'Aisle'}
                            </span>
                          </div>
                          <span className="font-bold text-ink text-[11px]">
                            {seatFee === 0 ? 'Included' : formatPrice(seatFee, currency)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-xs text-warm-gray p-2.5 rounded-[6px] bg-sand/30 font-sans italic">
                    No seats picked. Choose seats or proceed for free random assignment.
                  </div>
                )}
              </div>

              {/* 5. TAXES & SURCHARGES */}
              <div className="pt-3 border-t border-border space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-warm-gray">
                  <span>Seat Assignment Total:</span>
                  <span className="text-ink font-semibold">{formatPrice(totalSeatCostINR, currency)}</span>
                </div>
                <div className="flex justify-between text-warm-gray">
                  <span>Taxes & Airport Surcharges:</span>
                  <span className="text-ink font-semibold">{formatPrice(totalTaxesINR, currency)}</span>
                </div>
              </div>

              {/* 6. TOTAL */}
              <div className="pt-4 border-t-2 border-border flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-mono text-warm-gray uppercase tracking-wider block">Total Payable</span>
                  <span className="text-[11px] font-mono text-warm-gray">Includes all taxes & fees</span>
                </div>
                <div className="text-2xl font-serif font-bold text-[#963F24]">
                  {formatPrice(grandTotalINR, currency)}
                </div>
              </div>

              {/* 7. PRIMARY CTA */}
              <button
                type="button"
                onClick={() => proceedToStep('passengers')}
                className="w-full h-12 rounded-[8px] bg-[#963F24] hover:bg-[#7E331B] text-white font-sans font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>CONTINUE TO PASSENGER DETAILS</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => proceedToStep('fare')}
                className="w-full py-2 text-center text-xs font-mono text-warm-gray hover:text-ink transition-colors cursor-pointer"
              >
                ← Back to Fare Options
              </button>
            </div>
          </div>

        </div>

        {/* MOBILE STICKY BOTTOM PANEL (lg:hidden) */}
        <div className="lg:hidden border-t border-[#D8D1C5] bg-white -mx-4 -mb-4 p-4 shadow-lg shrink-0">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-[10px] font-mono text-warm-gray uppercase">
                {selectedSeats.length > 0
                  ? `Seats: ${selectedSeats.map(s => s.id).join(', ')}`
                  : 'No seats picked'}
              </div>
              <div className="text-xl font-serif font-bold text-[#963F24]">
                {formatPrice(grandTotalINR, currency)}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setMobileSummaryExpanded(!mobileSummaryExpanded)}
              className="text-xs font-mono text-warm-gray hover:text-ink flex items-center space-x-1 p-1 cursor-pointer"
            >
              <span>{mobileSummaryExpanded ? 'Hide' : 'Details'}</span>
              {mobileSummaryExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
            </button>
          </div>

          {mobileSummaryExpanded && (
            <div className="py-2 mb-3 border-y border-border space-y-1 text-xs font-mono text-warm-gray">
              <div className="flex justify-between">
                <span>Fare ({selectedFarePackage.name}):</span>
                <span>{formatPrice(totalBaseFareINR, currency)}</span>
              </div>
              <div className="flex justify-between">
                <span>Seat fees:</span>
                <span>{formatPrice(totalSeatCostINR, currency)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & fees:</span>
                <span>{formatPrice(totalTaxesINR, currency)}</span>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => proceedToStep('fare')}
              className="px-3 py-3 rounded-[8px] bg-white border border-[#D8D1C5] text-ink text-xs font-mono uppercase cursor-pointer"
            >
              Back
            </button>

            <button
              type="button"
              onClick={() => proceedToStep('passengers')}
              className="flex-1 h-12 rounded-[8px] bg-[#963F24] hover:bg-[#7E331B] text-white font-sans font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
            >
              <span>CONTINUE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
