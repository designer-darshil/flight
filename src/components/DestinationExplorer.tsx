import React from 'react';
import { ArrowRight, Sun } from 'lucide-react';
import { AERIVA_DESTINATIONS } from '../data/aerivaContent';
import { useBooking } from '../context/BookingContext';
import { formatPrice } from '../utils/currency';
import { AIRPORTS } from '../data/airports';

export const DestinationExplorer: React.FC = () => {
  const { currency, setSearchParams } = useBooking();

  const heroDest = AERIVA_DESTINATIONS.find(d => d.isHero) || AERIVA_DESTINATIONS[0];
  const secondaryDests = AERIVA_DESTINATIONS.filter(d => !d.isHero);

  const handleSelectDest = (code: string) => {
    const target = AIRPORTS.find(a => a.code === code);
    if (target) {
      setSearchParams(prev => ({ ...prev, to: target }));
    }
    const el = document.getElementById('booking-engine-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="explore-section" className="py-28 bg-white text-slate-900 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* EDITORIAL HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-widestlabel text-aeriva-blue font-bold">
              04 / GLOBAL DISCOVERY
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tightest leading-none text-slate-900">
              GO SOMEWHERE <br />
              WORTH REMEMBERING.
            </h2>
            <p className="text-base text-slate-500 font-normal max-w-md">
              Explore places that match the way you want to travel with direct flights and guaranteed baseline fares.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-400">
            Real-time pricing updated 8m ago
          </div>
        </div>

        {/* ASYMMETRIC EDITORIAL GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* MAIN HERO DESTINATION: TOKYO (Col 1-7) */}
          <div
            onClick={() => handleSelectDest(heroDest.code)}
            className="lg:col-span-7 rounded-3xl overflow-hidden relative cursor-pointer group min-h-[480px] lg:min-h-[580px] flex flex-col justify-between p-8 sm:p-10 shadow-lg shadow-slate-200/80 transition-all duration-500 hover:shadow-2xl"
          >
            {/* Background Zoom Image */}
            <img
              src={heroDest.image}
              alt={heroDest.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-85 group-hover:opacity-80 transition-opacity" />

            {/* Top Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white font-mono text-xs font-bold">
                {heroDest.tag}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-950/60 backdrop-blur-md text-slate-200 text-xs font-mono flex items-center space-x-1.5">
                <Sun className="w-3 h-3 text-amber-400" />
                <span>{heroDest.weather}</span>
              </span>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 space-y-4">
              <div className="transform group-hover:-translate-y-1 transition-transform duration-300">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white">
                  {heroDest.name.toUpperCase()}
                </div>
                <p className="text-sm text-slate-200 max-w-lg mt-2 font-normal line-clamp-2">
                  {heroDest.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/20 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-300 block">Starting from</span>
                  <span className="text-3xl font-display font-black text-white">
                    {formatPrice(heroDest.startingPriceINR, currency)}
                  </span>
                </div>

                <div className="px-5 py-3 rounded-2xl bg-white text-slate-950 font-bold text-xs flex items-center space-x-2 group-hover:bg-cyan-400 transition-colors shadow-lg">
                  <span>BOOK FLIGHT</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* SECONDARY DESTINATIONS (Col 8-12): 2x2 GRID */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {secondaryDests.slice(0, 4).map(dest => (
              <div
                key={dest.id}
                onClick={() => handleSelectDest(dest.code)}
                className="rounded-3xl overflow-hidden relative cursor-pointer group min-h-[260px] p-6 flex flex-col justify-between shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-85" />

                <div className="relative z-10 flex justify-between items-start">
                  <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-white/20 text-white font-bold backdrop-blur-sm">
                    {dest.code}
                  </span>
                  <span className="text-[10px] text-slate-300 font-mono">{dest.weather}</span>
                </div>

                <div className="relative z-10">
                  <div className="text-2xl font-display font-black text-white group-hover:text-cyan-300 transition-colors">
                    {dest.name}
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/20">
                    <span className="text-xs font-mono font-bold text-white">
                      {formatPrice(dest.startingPriceINR, currency)}
                    </span>
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
