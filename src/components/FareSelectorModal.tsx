import React from 'react';
import {
  Check,
  Shield,
  ArrowRight,
  ArrowLeft,
  Luggage,
  RotateCcw,
  Plane,
  Armchair,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { AERIVA_FARE_PACKAGES } from '../data/aerivaContent';
import { formatPrice } from '../utils/currency';
import { FareTier } from '../types';
import { BookingProgress } from './BookingProgress';

export const FareSelectorModal: React.FC = () => {
  const {
    selectedFlight,
    selectedFareTier,
    setFareTier,
    proceedToStep,
    currency,
    searchParams,
  } = useBooking();

  if (!selectedFlight) return null;

  const totalTravelers =
    searchParams.passengers.adults + searchParams.passengers.children;

  const getTierPricePerPax = (tierId: string) => {
    if (tierId === 'basic') return Math.round(selectedFlight.priceINR * 0.9);
    if (tierId === 'flex') return Math.round(selectedFlight.priceINR * 1.25);
    return selectedFlight.priceINR; // standard
  };

  const selectedTierPricePerPax = getTierPricePerPax(selectedFareTier);
  const totalFarePrice = selectedTierPricePerPax * totalTravelers;
  const taxesPerPax = 4820;
  const grandTotal = totalFarePrice + (taxesPerPax * totalTravelers);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[rgba(23,23,23,0.25)] overflow-y-auto">
      <div className="bg-[#FFFFFF] w-full max-w-5xl rounded-[16px] border border-[#D8D1C5] shadow-[0_24px_60px_rgba(23,23,23,0.10)] p-6 sm:p-8 my-auto relative text-ink">
        
        {/* BOOKING PROGRESS: FLIGHT -> FARE -> SEAT -> PASSENGER -> PAYMENT -> CONFIRMATION */}
        <BookingProgress currentStep="fare" onStepClick={proceedToStep} />

        {/* TOP HEADER & ROUTE BANNER */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border">
          <div>
            <div className="text-[11px] font-mono text-[#963F24] uppercase tracking-wider font-semibold mb-0.5">
              STAGE 2 &bull; FARE SELECTION
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-light text-ink tracking-tight">
              Select Your Fare Option
            </h2>
          </div>

          <div className="text-right text-xs">
            <div className="text-warm-gray font-mono uppercase text-[10px] tracking-wider">Flight Itinerary</div>
            <div className="font-serif font-medium text-ink flex items-center space-x-1.5">
              <span>{selectedFlight.from.city} ({selectedFlight.from.code})</span>
              <Plane className="w-3.5 h-3.5 text-[#963F24] rotate-90" />
              <span>{selectedFlight.to.city} ({selectedFlight.to.code})</span>
              <span className="text-[#963F24] font-mono font-bold">· {selectedFlight.flightNumber}</span>
            </div>
          </div>
        </div>

        {/* THREE OPTIONS: BASIC, STANDARD, FLEX (WHITE CARDS) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6 items-stretch">
          {AERIVA_FARE_PACKAGES.map(pkg => {
            const isSelected = selectedFareTier === pkg.id;
            const pricePerPax = getTierPricePerPax(pkg.id);
            const isStandard = pkg.id === 'standard';

            return (
              <div
                key={pkg.id}
                onClick={() => setFareTier(pkg.id as FareTier)}
                className={`relative rounded-[12px] p-6 cursor-pointer flex flex-col justify-between transition-all duration-200 bg-white border ${
                  isSelected
                    ? 'border-2 border-[#963F24] shadow-md ring-1 ring-[#963F24]/20 transform -translate-y-1'
                    : 'border-[#D8D1C5] shadow-sm hover:shadow-md hover:border-ink/50'
                }`}
              >
                {/* RECOMMENDED BADGE ON STANDARD */}
                {isStandard && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-[6px] bg-[#963F24] text-white font-mono font-bold text-[10px] uppercase tracking-wider shadow-sm">
                    RECOMMENDED
                  </div>
                )}

                <div>
                  {/* Option Header */}
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="text-xl font-serif font-bold text-ink tracking-wide">
                      {pkg.name}
                    </h3>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'border-[#963F24] bg-[#963F24] text-white'
                          : 'border-border bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>

                  <p className="text-xs text-warm-gray mb-5 min-h-[32px] font-sans">
                    {pkg.tagline}
                  </p>

                  {/* Price */}
                  <div className="mb-5 pb-5 border-b border-border">
                    <div className="text-[10px] font-mono text-warm-gray uppercase tracking-wider">Fare per traveler</div>
                    <div className="text-3xl font-serif font-bold text-ink">
                      {formatPrice(pricePerPax, currency)}
                    </div>
                    <div className="text-[10px] font-mono text-warm-gray mt-0.5">
                      Total for {totalTravelers} {totalTravelers === 1 ? 'traveler' : 'travelers'}: <strong className="text-ink font-semibold">{formatPrice(pricePerPax * totalTravelers, currency)}</strong>
                    </div>
                  </div>

                  {/* Attributes Breakdown: Baggage, Changes, Refund, Seat */}
                  <div className="space-y-3.5 text-xs">
                    
                    {/* BAGGAGE */}
                    <div className="flex items-start space-x-2.5">
                      <Luggage className="w-4 h-4 text-[#963F24] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-ink block">Baggage:</span>
                        <span className="text-warm-gray">
                          {pkg.id === 'basic' ? '7 KG Cabin only (No checked bag)' : pkg.id === 'standard' ? '7 KG Cabin + 23 KG Checked bag' : '10 KG Cabin + 2x 23 KG Checked bags'}
                        </span>
                      </div>
                    </div>

                    {/* CHANGES */}
                    <div className="flex items-start space-x-2.5">
                      <RotateCcw className="w-4 h-4 text-[#59604F] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-ink block">Changes:</span>
                        <span className="text-warm-gray">
                          {pkg.id === 'basic' ? 'Chargeable (₹3,500 change fee)' : pkg.id === 'standard' ? '1 Free date change up to 48h' : 'Unlimited free date changes anytime'}
                        </span>
                      </div>
                    </div>

                    {/* REFUND */}
                    <div className="flex items-start space-x-2.5">
                      <Shield className="w-4 h-4 text-warm-gray shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-ink block">Refund:</span>
                        <span className="text-warm-gray">
                          {pkg.id === 'basic' ? 'Non-refundable' : pkg.id === 'standard' ? 'Refundable with standard airline fee' : '100% Full cash refund'}
                        </span>
                      </div>
                    </div>

                    {/* SEAT */}
                    <div className="flex items-start space-x-2.5">
                      <Armchair className="w-4 h-4 text-[#963F24] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-ink block">Seat Selection:</span>
                        <span className="text-warm-gray">
                          {pkg.id === 'basic' ? 'Auto-assigned at check-in' : pkg.id === 'standard' ? 'Standard seat selection included' : 'Any seat including Extra Legroom free'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Selection Action Button */}
                <button
                  type="button"
                  onClick={() => setFareTier(pkg.id as FareTier)}
                  className={`w-full mt-6 py-2.5 rounded-[8px] font-sans font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#963F24] text-white shadow-sm'
                      : 'bg-sand text-ink hover:bg-sand/80 border border-border'
                  }`}
                >
                  {isSelected ? 'FARE SELECTED' : `CHOOSE ${pkg.name}`}
                </button>
              </div>
            );
          })}
        </div>

        {/* LIVE TOTAL UPDATE & NAVIGATION CONTROLS */}
        <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4 text-xs font-mono text-warm-gray">
            <div>
              <span className="text-[10px] uppercase block">Selected Tier</span>
              <strong className="text-ink text-sm font-bold uppercase">{selectedFareTier}</strong>
            </div>
            <div className="h-6 w-[1px] bg-border" />
            <div>
              <span className="text-[10px] uppercase block">Estimated Total</span>
              <strong className="text-[#963F24] text-base font-serif font-bold">
                {formatPrice(grandTotal, currency)}
              </strong>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={() => proceedToStep('search')}
              className="px-5 py-2.5 rounded-[8px] bg-white border border-[#D8D1C5] text-ink hover:border-ink font-sans font-medium text-xs uppercase flex items-center space-x-2 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Flights</span>
            </button>

            <button
              onClick={() => proceedToStep('seats')}
              className="flex-1 sm:flex-none px-7 py-3 rounded-[8px] bg-[#963F24] hover:bg-[#7E331B] text-white font-sans font-bold text-xs tracking-wider uppercase transition-colors flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
            >
              <span>PROCEED TO SEAT SELECTION</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
