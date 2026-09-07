import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { AERIVA_DEALS } from '../data/aerivaContent';
import { useBooking } from '../context/BookingContext';
import { formatPrice } from '../utils/currency';
import { AIRPORTS } from '../data/airports';

export const SmartDeals: React.FC = () => {
  const { currency, setSearchParams } = useBooking();

  const handleBookDeal = (deal: typeof AERIVA_DEALS[0]) => {
    const fromAirport = AIRPORTS.find(a => a.code === deal.originCode) || AIRPORTS[0];
    const toAirport = AIRPORTS.find(a => a.code === deal.destinationCode) || AIRPORTS[1];

    setSearchParams(prev => ({
      ...prev,
      from: fromAirport,
      to: toAirport,
    }));

    const el = document.getElementById('booking-engine-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="deals-section" className="py-24 bg-aeriva-charcoal text-white relative overflow-hidden border-t border-white/10">
      
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-aeriva-blue/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-xl">
            <div className="text-xs font-mono uppercase tracking-widestlabel text-cyan-400 font-bold">
              05 / CURATED PROMOTIONS
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tightest leading-none text-white">
              BETTER ROUTES. <br />
              <span className="bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                BETTER FARES.
              </span>
            </h2>
            <p className="text-sm text-slate-400 font-normal">
              Direct carrier inventory with exclusive flash reductions. Valid for itineraries booked today.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400">
            <Clock className="w-3.5 h-3.5" />
            <span>Updated hourly · Limited seat buckets</span>
          </div>
        </div>

        {/* DEALS CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AERIVA_DEALS.map(deal => (
            <div
              key={deal.id}
              onClick={() => handleBookDeal(deal)}
              className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-cyan-400/40 cursor-pointer group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between"
            >
              <div>
                {/* Top Badge: SAVE XX% */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-mono font-bold">
                    SAVE {deal.discountPercent}%
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{deal.airline}</span>
                </div>

                {/* Route */}
                <div className="space-y-1 mb-4">
                  <div className="text-xl font-display font-black text-white flex items-center space-x-2">
                    <span>{deal.origin}</span>
                    <span className="text-cyan-400">➔</span>
                    <span>{deal.destination}</span>
                  </div>
                  <div className="text-xs font-mono text-cyan-300">
                    {deal.originCode} ➔ {deal.destinationCode}
                  </div>
                </div>

                {/* Travel Period */}
                <div className="text-xs font-mono text-slate-400 mb-6">
                  Period: <span className="text-slate-200">{deal.travelPeriod}</span>
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-4 border-t border-white/10 flex items-end justify-between">
                <div>
                  <div className="text-[10px] font-mono text-slate-500 line-through">
                    Was: {formatPrice(deal.previousPriceINR, currency)}
                  </div>
                  <div className="text-2xl font-display font-black text-white group-hover:text-cyan-300 transition-colors">
                    {formatPrice(deal.currentPriceINR, currency)}
                  </div>
                </div>

                <button
                  type="button"
                  className="px-4 py-2 rounded-xl bg-white/10 group-hover:bg-cyan-400 text-slate-200 group-hover:text-slate-950 font-bold text-xs transition-all flex items-center space-x-1.5"
                >
                  <span>VIEW DEAL</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
