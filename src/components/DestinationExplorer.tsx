import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { AIRPORTS } from '../data/airports';

export const DestinationExplorer: React.FC = () => {
  const { setSearchParams } = useBooking();

  const handleSelectDest = (code: string) => {
    const target = AIRPORTS.find(a => a.code === code);
    if (target) {
      setSearchParams(prev => ({ ...prev, to: target }));
    }
    const el = document.getElementById('booking-panel');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section id="destination-showcase" className="py-28 px-6 sm:px-12 lg:px-16 bg-cream text-ink overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        
        {/* SECTION HEADER: HUGE EDITORIAL TYPOGRAPHY */}
        <div className="max-w-3xl mb-16 text-left space-y-4">
          <div className="flex items-center space-x-3">
            <span className="w-6 h-[1.5px] bg-terracotta" />
            <span className="text-xs font-mono tracking-widest uppercase text-warm-gray font-semibold">
              02 / CURATED ESCAPES
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-ink leading-[0.95]">
            WHERE WILL<br />
            YOU GO NEXT?
          </h2>

          <p className="text-sm sm:text-base text-warm-gray font-sans max-w-xl leading-relaxed pt-2">
            From quick city breaks to once-in-a-lifetime journeys, discover destinations worth the distance.
          </p>
        </div>

        {/* EDITORIAL ASYMMETRIC COLLAGE (Magazined Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* 1. HUGE HERO TILE: TOKYO (Col 1-7, Tall & Immersive) */}
          <div
            onClick={() => handleSelectDest('HND')}
            className="md:col-span-7 group relative min-h-[520px] lg:min-h-[640px] overflow-hidden cursor-pointer border border-warm-gray-border/80 shadow-paper hover:shadow-paper-elevated transition-all duration-500 bg-sand"
          >
            <img
              src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=85"
              alt="Tokyo, Japan cityscape at dusk with warm lanterns"
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.92] group-hover:brightness-100"
            />
            {/* Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            {/* Badge Top Left */}
            <div className="absolute top-6 left-6 z-10">
              <span className="px-3 py-1 bg-white border border-warm-gray-border/60 text-ink text-[10px] font-mono tracking-widest uppercase font-bold shadow-sm">
                FEATURED DESTINATION
              </span>
            </div>

            {/* Text Overlay Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 z-10 text-white transform transition-transform duration-300 group-hover:-translate-y-1">
              <span className="text-xs font-mono tracking-widest uppercase text-terracotta-light block mb-1">
                JAPAN · ASIA PACIFIC
              </span>
              <div className="flex items-baseline justify-between">
                <div>
                  <h3 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight leading-none text-white">
                    TOKYO
                  </h3>
                  <p className="text-xs text-sand-100/80 font-sans mt-2 max-w-sm">
                    Neon-lit alleys, Michelin sushi counters, and tranquil shrines nestled between gleaming towers.
                  </p>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <span className="text-[10px] font-mono uppercase text-sand-100/70 block">DIRECT FROM</span>
                  <span className="text-xl sm:text-2xl font-display font-bold text-white">₹42,900</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between text-xs font-sans font-semibold text-sand-100 group-hover:text-white">
                <span className="tracking-wider uppercase">Book Flight Route (DEL ➔ HND)</span>
                <span className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center transform group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT ASYMMETRIC COLUMN (Col 8-12): 2 Staggered Tiles */}
          <div className="md:col-span-5 grid grid-cols-1 gap-6">
            
            {/* 2. LISBON (Horizontal Landscape) */}
            <div
              onClick={() => handleSelectDest('LIS')}
              className="group relative min-h-[290px] overflow-hidden cursor-pointer border border-warm-gray-border/80 shadow-paper hover:shadow-paper-elevated transition-all duration-500 bg-sand"
            >
              <img
                src="https://images.unsplash.com/photo-1509840841025-9088ba78a826?auto=format&fit=crop&w=1000&q=85"
                alt="Lisbon Portugal coastal hills with yellow tram"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.92] group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 z-10 text-white">
                <span className="text-[10px] font-mono tracking-widest uppercase text-sand-100/70 block mb-0.5">
                  PORTUGAL
                </span>
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
                      LISBON
                    </h3>
                    <span className="text-xs text-sand-100/80 font-sans block">From ₹38,400</span>
                  </div>
                  <div className="w-7 h-7 rounded-full border border-white/40 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. DUBAI (Horizontal with Golden Architecture) */}
            <div
              onClick={() => handleSelectDest('DXB')}
              className="group relative min-h-[290px] overflow-hidden cursor-pointer border border-warm-gray-border/80 shadow-paper hover:shadow-paper-elevated transition-all duration-500 bg-sand"
            >
              <img
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=85"
                alt="Dubai architecture at golden hour"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.92] group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 z-10 text-white">
                <span className="text-[10px] font-mono tracking-widest uppercase text-terracotta-light block mb-0.5">
                  UNITED ARAB EMIRATES
                </span>
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
                      DUBAI
                    </h3>
                    <span className="text-xs text-sand-100/80 font-sans block">From ₹18,200</span>
                  </div>
                  <div className="w-7 h-7 rounded-full border border-white/40 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* LOWER ROW: 3 ASYMMETRIC TILES (Paris, Bali, New York) */}
          <div className="md:col-span-4 group relative min-h-[320px] overflow-hidden cursor-pointer border border-warm-gray-border/80 shadow-paper hover:shadow-paper-elevated transition-all duration-500 bg-sand">
            <img
              src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=85"
              alt="Paris street cafe atmosphere"
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.92] group-hover:brightness-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10 text-white">
              <span className="text-[10px] font-mono tracking-widest uppercase text-sand-100/70 block">FRANCE</span>
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-2xl font-display font-black text-white">PARIS</h3>
                  <span className="text-xs text-sand-100/80">From ₹44,500</span>
                </div>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          <div className="md:col-span-4 group relative min-h-[320px] overflow-hidden cursor-pointer border border-warm-gray-border/80 shadow-paper hover:shadow-paper-elevated transition-all duration-500 bg-sand">
            <img
              src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=85"
              alt="Bali tropical terrace sunrise"
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.92] group-hover:brightness-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10 text-white">
              <span className="text-[10px] font-mono tracking-widest uppercase text-sand-100/70 block">INDONESIA</span>
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-2xl font-display font-black text-white">BALI</h3>
                  <span className="text-xs text-sand-100/80">From ₹29,800</span>
                </div>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          <div className="md:col-span-4 group relative min-h-[320px] overflow-hidden cursor-pointer border border-warm-gray-border/80 shadow-paper hover:shadow-paper-elevated transition-all duration-500 bg-sand">
            <img
              src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1000&q=85"
              alt="New York skyline at dusk"
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.92] group-hover:brightness-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10 text-white">
              <span className="text-[10px] font-mono tracking-widest uppercase text-sand-100/70 block">UNITED STATES</span>
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-2xl font-display font-black text-white">NEW YORK</h3>
                  <span className="text-xs text-sand-100/80">From ₹58,900</span>
                </div>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
