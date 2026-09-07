import React from 'react';
import {
  Check,
  Shield,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Luggage,
  RotateCcw,
  Plane,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { AERIVA_FARE_PACKAGES } from '../data/aerivaContent';
import { formatPrice } from '../utils/currency';
import { FareTier } from '../types';

export const FareSelectorModal: React.FC = () => {
  const {
    selectedFlight,
    selectedFareTier,
    setFareTier,
    proceedToStep,
    currency,
  } = useBooking();

  if (!selectedFlight) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink/25 overflow-y-auto">
      <div className="bg-paper w-full max-w-5xl rounded-xl border border-border shadow-[0_20px_60px_rgba(23,23,23,0.12)] p-6 sm:p-8 my-auto relative text-ink">
        
        {/* TOP BREADCRUMB & HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-terracotta mb-1">
              <span>STEP 2 OF 5</span>
              <span>&bull;</span>
              <span>CABIN FARE SELECTION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-light text-ink flex items-center space-x-2">
              <span>Choose Your Fare Package</span>
              <Sparkles className="w-5 h-5 text-terracotta" />
            </h2>
          </div>

          <div className="text-right">
            <div className="text-xs font-mono text-warm-gray">Selected Route</div>
            <div className="text-sm font-serif font-medium text-ink flex items-center space-x-1.5">
              <span>{selectedFlight.from.code}</span>
              <Plane className="w-3.5 h-3.5 text-terracotta rotate-90" />
              <span>{selectedFlight.to.code}</span>
              <span className="text-terracotta font-mono">({selectedFlight.flightNumber})</span>
            </div>
          </div>
        </div>

        {/* THREE FARE TIERS COMPARISON CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 items-stretch">
          {AERIVA_FARE_PACKAGES.map(pkg => {
            const isSelected = selectedFareTier === pkg.id;
            const packagePrice = pkg.priceINR || (selectedFlight.priceINR * (pkg.id === 'flex' ? 1.15 : pkg.id === 'basic' ? 0.9 : 1));

            return (
              <div
                key={pkg.id}
                onClick={() => setFareTier(pkg.id as FareTier)}
                className={`relative rounded-xl p-6 cursor-pointer flex flex-col justify-between transition-all duration-300 border ${
                  isSelected
                    ? 'bg-sand/30 border-terracotta ring-1 ring-terracotta/30 shadow-md transform -translate-y-1'
                    : 'bg-paper border-border hover:border-ink/40 hover:bg-sand/10'
                }`}
              >
                {/* RECOMMENDED BADGE */}
                {pkg.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-terracotta text-paper font-mono font-medium text-[10px] uppercase tracking-wider shadow-sm">
                    Recommended Choice
                  </div>
                )}

                <div>
                  {/* Package Title & Tagline */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-serif font-medium text-ink">
                      {pkg.name}
                    </h3>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'border-terracotta bg-terracotta text-paper'
                          : 'border-border bg-paper'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>

                  <p className="text-xs text-warm-gray mb-6 min-h-[32px] font-sans">
                    {pkg.tagline}
                  </p>

                  {/* Price Tag */}
                  <div className="mb-6 pb-6 border-b border-border">
                    <div className="text-[10px] font-mono text-warm-gray uppercase">Fare per traveler</div>
                    <div className="text-3xl font-serif font-bold text-ink">
                      {formatPrice(packagePrice, currency)}
                    </div>
                    <div className="text-[10px] font-mono text-warm-gray mt-0.5">Taxes & fees included</div>
                  </div>

                  {/* Baggage & Flex Highlights */}
                  <div className="space-y-3 mb-6 text-xs text-warm-gray">
                    <div className="flex items-center space-x-2.5">
                      <Luggage className="w-4 h-4 text-terracotta shrink-0" />
                      <div>
                        <span className="font-medium text-ink">Cabin:</span> {pkg.baggageCabin}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      <Luggage className="w-4 h-4 text-warm-gray shrink-0" />
                      <div>
                        <span className="font-medium text-ink">Checked:</span> {pkg.baggageChecked}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      <RotateCcw className="w-4 h-4 text-olive shrink-0" />
                      <div>
                        <span className="font-medium text-ink">Date Changes:</span> {pkg.changeFee}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      <Shield className="w-4 h-4 text-champagne shrink-0" />
                      <div>
                        <span className="font-medium text-ink">Refunds:</span> {pkg.refundPolicy}
                      </div>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2 pt-4 border-t border-border text-xs">
                    <div className="text-[10px] font-mono uppercase text-warm-gray mb-2">Package Inclusions</div>
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-ink/80">
                        <Check className="w-3.5 h-3.5 text-olive shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-tight font-sans">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Selection Pill */}
                <button
                  type="button"
                  onClick={() => setFareTier(pkg.id as FareTier)}
                  className={`w-full mt-6 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wider transition-all ${
                    isSelected
                      ? 'bg-terracotta text-paper font-medium shadow-sm'
                      : 'bg-sand text-ink hover:bg-sand/80'
                  }`}
                >
                  {isSelected ? 'Tier Selected' : `Select ${pkg.name}`}
                </button>
              </div>
            );
          })}
        </div>

        {/* BOTTOM NAVIGATION ACTIONS */}
        <div className="flex items-center justify-between pt-6 border-t border-border">
          <button
            onClick={() => proceedToStep('search')}
            className="px-5 py-2.5 rounded-lg bg-paper border border-border text-ink hover:border-ink/50 font-mono text-xs uppercase flex items-center space-x-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Flights</span>
          </button>

          <button
            onClick={() => proceedToStep('seats')}
            className="px-6 py-3 rounded-lg bg-terracotta hover:bg-terracotta-hover text-paper font-mono font-medium text-xs tracking-wider uppercase transition-colors flex items-center space-x-2 shadow-sm"
          >
            <span>Proceed to Seat Selection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
