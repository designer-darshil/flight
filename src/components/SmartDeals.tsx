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
              <span className="w-2.5 h-2.5 rounded-full bg-[#963F24]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#59604F] font-mono font-medium">
                CURATED INVENTORY RATES
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light tracking-tight text-[#171717] leading-none uppercase">
              BETTER FARES.<br />
              <span className="font-normal italic">FURTHER AWAY.</span>
            </h2>
            <p className="mt-4 text-[#6F6A61] text-base sm:text-lg font-sans leading-relaxed">
              Negotiated advance inventory across international flag carriers. Privileged long-range routes with guaranteed fare parity and complimentary seat selection.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#D8D1C5] text-xs font-mono text-[#6F6A61] self-start md:self-end">
            <Clock className="w-3.5 h-3.5 text-[#963F24]" />
            <span>Live Inventory &bull; Updated Moments Ago</span>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {AERIVA_DEALS.map(deal => (
            <div
              key={deal.id}
              onClick={() => handleBookDeal(deal)}
              className="group bg-[#FFFFFF] rounded-[12px] border border-[#D8D1C5] hover:border-[#171717] p-5 sm:p-6 shadow-xs hover:shadow-[0_20px_50px_rgba(23,23,23,0.08)] transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Top Badge & Carrier */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-[#963F24]/10 text-[#963F24] text-[10px] font-mono font-bold tracking-wider uppercase flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    SAVINGS: {deal.discountPercent}% OFF
                  </span>
                  <span className="text-xs font-mono text-[#6F6A61] truncate font-medium">
                    {deal.airline}
                  </span>
                </div>

                {/* Destination Thumbnail */}
                <div className="aspect-[16/10] rounded-[8px] overflow-hidden mb-4 bg-[#EFE9DE]">
                  <img
                    src={deal.image}
                    alt={`${deal.origin} to ${deal.destination}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Route Header */}
                <div className="mb-2">
                  <div className="text-xl font-serif font-bold text-[#171717] flex items-center gap-2">
                    <span>{deal.destination}</span>
                  </div>
                  <div className="text-xs font-mono text-[#6F6A61] mt-0.5">
                    From {deal.origin} ({deal.originCode} ➔ {deal.destinationCode})
                  </div>
                </div>

                {/* Travel Window */}
                <div className="text-xs font-mono text-[#6F6A61] mb-6">
                  Travel period: <span className="text-[#171717] font-semibold">{deal.travelPeriod}</span>
                </div>
              </div>

              {/* Price & Action Button */}
              <div className="pt-4 border-t border-[#D8D1C5] flex items-end justify-between">
                <div>
                  <div className="text-[11px] font-mono text-[#6F6A61] line-through">
                    {formatPrice(deal.previousPriceINR, currency)}
                  </div>
                  <div className="text-2xl font-serif font-bold text-[#171717] group-hover:text-[#963F24] transition-colors">
                    {formatPrice(deal.currentPriceINR, currency)}
                  </div>
                </div>

                <div className="w-10 h-10 rounded-full bg-[#F6F2EA] group-hover:bg-[#963F24] border border-[#D8D1C5] group-hover:border-[#963F24] flex items-center justify-center text-[#171717] group-hover:text-[#FFFFFF] transition-all duration-300 shadow-xs">
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
