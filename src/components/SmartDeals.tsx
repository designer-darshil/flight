import React from 'react';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
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
    <section id="deals-section" className="py-24 sm:py-32 bg-sand/30 text-ink relative overflow-hidden border-t border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-terracotta" />
              <span className="text-xs uppercase tracking-[0.25em] text-warm-gray font-mono font-medium">
                Advance Inventory Rates
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light tracking-tight text-ink">
              Some journeys are worth <br />
              <span className="italic font-normal">booking early.</span>
            </h2>
            <p className="mt-4 text-warm-gray text-base sm:text-lg font-light leading-relaxed">
              Privileged fares negotiated directly with top-tier international flag carriers. Locked fare buckets with complimentary flexible rescheduling.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper border border-border text-xs font-mono text-warm-gray self-start md:self-end">
            <Clock className="w-3.5 h-3.5 text-terracotta" />
            <span>Updated 12m ago &bull; Verified Inventory</span>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {AERIVA_DEALS.map(deal => (
            <div
              key={deal.id}
              onClick={() => handleBookDeal(deal)}
              className="group bg-paper rounded-2xl border border-border hover:border-ink/40 p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Top Badge & Carrier */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-mono font-semibold tracking-wide flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    SAVE {deal.discountPercent}%
                  </span>
                  <span className="text-xs font-mono text-warm-gray truncate">
                    {deal.airline}
                  </span>
                </div>

                {/* Destination Thumbnail */}
                <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-sand">
                  <img
                    src={deal.image}
                    alt={`${deal.origin} to ${deal.destination}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter saturate-[0.95]"
                    loading="lazy"
                  />
                </div>

                {/* Route Header */}
                <div className="mb-2">
                  <div className="text-lg font-serif font-medium text-ink flex items-center gap-2">
                    <span>{deal.origin}</span>
                    <span className="text-warm-gray text-sm">➔</span>
                    <span>{deal.destination}</span>
                  </div>
                  <div className="text-xs font-mono text-warm-gray mt-0.5">
                    {deal.originCode} &bull; {deal.destinationCode}
                  </div>
                </div>

                {/* Travel Window */}
                <div className="text-xs font-mono text-warm-gray/90 mb-6">
                  Travel: <span className="text-ink font-medium">{deal.travelPeriod}</span>
                </div>
              </div>

              {/* Price & Action Button */}
              <div className="pt-4 border-t border-border flex items-end justify-between">
                <div>
                  <div className="text-[11px] font-mono text-warm-gray line-through">
                    {formatPrice(deal.previousPriceINR, currency)}
                  </div>
                  <div className="text-2xl font-serif font-bold text-ink group-hover:text-terracotta transition-colors">
                    {formatPrice(deal.currentPriceINR, currency)}
                  </div>
                </div>

                <div className="w-9 h-9 rounded-full bg-cream group-hover:bg-terracotta border border-border group-hover:border-terracotta flex items-center justify-center text-ink group-hover:text-paper transition-all duration-300">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
