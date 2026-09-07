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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy-950/85 backdrop-blur-xl overflow-y-auto">
      <div className="glass-panel w-full max-w-5xl rounded-3xl border border-white/15 shadow-2xl p-6 sm:p-8 my-auto relative overflow-hidden">
        
        {/* Glow backdrop */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* TOP BREADCRUMB & HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 mb-1">
              <span>STEP 2 OF 5</span>
              <span>·</span>
              <span>SELECT CABIN FARE BUNDLE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white flex items-center space-x-2">
              <span>Choose Your Fare Package</span>
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </h2>
          </div>

          <div className="text-right">
            <div className="text-xs font-mono text-slate-400">Selected Route</div>
            <div className="text-sm font-bold text-white flex items-center space-x-1.5">
              <span>{selectedFlight.from.code}</span>
              <Plane className="w-3.5 h-3.5 text-cyan-400" />
              <span>{selectedFlight.to.code}</span>
              <span className="text-cyan-400 font-mono">({selectedFlight.flightNumber})</span>
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
                className={`relative rounded-3xl p-6 cursor-pointer flex flex-col justify-between transition-all duration-300 ${
                  isSelected
                    ? 'bg-aeriva-surface/90 border-2 border-aeriva-cyan shadow-glow-cyan transform -translate-y-1'
                    : 'bg-aeriva-charcoal/70 border border-white/10 hover:border-white/20 hover:bg-aeriva-charcoal/90'
                }`}
              >
                {/* RECOMMENDED BADGE */}
                {pkg.recommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-aeriva-blue to-aeriva-cyan text-slate-950 font-extrabold text-[10px] uppercase tracking-wider shadow-lg">
                    Recommended Choice
                  </div>
                )}

                <div>
                  {/* Package Title & Tagline */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-display font-bold text-white">
                      {pkg.name}
                    </h3>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-400 text-slate-950'
                          : 'border-white/20 bg-slate-800'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mb-6 min-h-[32px]">
                    {pkg.tagline}
                  </p>

                  {/* Price Tag */}
                  <div className="mb-6 pb-6 border-b border-white/10">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Fare per traveler</div>
                    <div className="text-3xl font-display font-black text-white">
                      {formatPrice(packagePrice, currency)}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Taxes & fees included</div>
                  </div>

                  {/* Baggage & Flex Highlights */}
                  <div className="space-y-3 mb-6 text-xs text-slate-300">
                    <div className="flex items-center space-x-2.5">
                      <Luggage className="w-4 h-4 text-cyan-400 shrink-0" />
                      <div>
                        <span className="font-semibold text-white">Cabin:</span> {pkg.baggageCabin}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      <Luggage className="w-4 h-4 text-blue-400 shrink-0" />
                      <div>
                        <span className="font-semibold text-white">Checked:</span> {pkg.baggageChecked}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      <RotateCcw className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <span className="font-semibold text-white">Date Changes:</span> {pkg.changeFee}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      <Shield className="w-4 h-4 text-purple-400 shrink-0" />
                      <div>
                        <span className="font-semibold text-white">Refunds:</span> {pkg.refundPolicy}
                      </div>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2 pt-4 border-t border-white/10 text-xs">
                    <div className="text-[10px] font-mono uppercase text-slate-400 mb-2">Package Inclusions</div>
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-slate-300">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-tight">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Selection Pill */}
                <button
                  type="button"
                  onClick={() => setFareTier(pkg.id as FareTier)}
                  className={`w-full mt-6 py-2.5 rounded-xl font-bold text-xs transition-all ${
                    isSelected
                      ? 'bg-cyan-400 text-slate-950 shadow-glow-cyan'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {isSelected ? 'Tier Selected' : `Select ${pkg.name}`}
                </button>
              </div>
            );
          })}
        </div>

        {/* BOTTOM NAVIGATION ACTIONS */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <button
            onClick={() => proceedToStep('search')}
            className="px-5 py-3 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white font-medium text-xs flex items-center space-x-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Flights</span>
          </button>

          <button
            onClick={() => proceedToStep('seats')}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-aerova-blue via-blue-600 to-cyan-500 text-white font-bold text-xs tracking-wide shadow-glow-blue hover:shadow-cyan-500/40 transition-all flex items-center space-x-2"
          >
            <span>Proceed to Seat Selection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
