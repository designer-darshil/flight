import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { Hero3D } from './Hero3D';
import { useBooking } from '../context/BookingContext';

export const Hero: React.FC = () => {
  const { searchFlights } = useBooking();

  const handleSearchClick = () => {
    const el = document.getElementById('booking-panel');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      searchFlights();
    }
  };

  const handleExploreClick = () => {
    const el = document.getElementById('destination-showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-[92vh] lg:min-h-screen flex flex-col justify-between overflow-hidden bg-cream">
      
      {/* 1. CINEMATIC FULL-BLEED PHOTOGRAPH (75–85% viewport, warm sunlight golden hour approach) */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=2600&q=85"
          alt="Cinematic passenger aircraft approaching coastal destination at golden hour with warm sunlight"
          className="w-full h-full object-cover object-center scale-[1.03] transform transition-transform duration-1000 ease-out"
        />

        {/* Cinematic Film Texture & Warm Atmospheric Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-transparent" />
        
        {/* Subtle Warm Sun Flare & Atmospheric Haze */}
        <div className="absolute -top-32 right-1/4 w-[600px] h-[600px] bg-amber-400/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-terracotta/15 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Subtle Film Grain */}
        <div className="absolute inset-0 film-grain pointer-events-none opacity-40" />
      </div>

      {/* 2. THREE.JS 3D FLIGHT ROUTE LAYER (DEL ➔ DXB ➔ LHR with small elegant aircraft) */}
      <Hero3D />

      {/* Spacer for top navigation */}
      <div className="pt-28 sm:pt-36" />

      {/* 3. LOWER-LEFT EDITORIAL HERO CONTENT */}
      <div className="relative z-20 max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 w-full pb-28 sm:pb-36 lg:pb-40">
        <div className="max-w-2xl space-y-6 text-left">
          
          {/* Small Eyebrow */}
          <div className="flex items-center space-x-3">
            <span className="w-6 h-[1.5px] bg-terracotta" />
            <span className="text-xs font-mono tracking-widestlabel uppercase text-sand-50/90 font-medium">
              AERIVA / GLOBAL TRAVEL
            </span>
          </div>

          {/* Large Left-Aligned Magazine Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-black tracking-tightest text-white leading-[0.92]">
            GO<br />
            WHERE<br />
            YOU FEEL<br />
            <span className="text-sand-100 italic font-light font-editorial">ALIVE.</span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-sm sm:text-base text-sand-100/85 font-sans leading-relaxed max-w-lg pt-1">
            Find better routes, better fares, and unforgettable places — all in one seamless booking experience.
          </p>

          {/* Buttons: Primary Accessible Accent + Minimal Outlined White */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <button
              onClick={handleSearchClick}
              className="h-12 px-8 bg-[#963F24] hover:bg-[#7E331B] active:bg-[#682915] text-white font-sans font-semibold text-xs tracking-widest uppercase transition-all duration-200 flex items-center space-x-2.5 rounded-[8px] shadow-sm hover:shadow-md cursor-pointer select-none"
            >
              <span>SEARCH FLIGHTS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleExploreClick}
              className="h-12 px-7 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-sans font-medium text-xs tracking-widest uppercase transition-all duration-200 flex items-center space-x-2.5 rounded-[8px] cursor-pointer select-none"
            >
              <Compass className="w-3.5 h-3.5 text-sand-100" />
              <span>EXPLORE DESTINATIONS</span>
            </button>
          </div>

          {/* Metadata Row Below */}
          <div className="pt-8 border-t border-white/20 grid grid-cols-3 gap-6 max-w-md">
            <div>
              <div className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">180+</div>
              <div className="text-[10px] font-mono tracking-widest text-sand-100/70 uppercase mt-0.5">
                DESTINATIONS
              </div>
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">450+</div>
              <div className="text-[10px] font-mono tracking-widest text-sand-100/70 uppercase mt-0.5">
                AIRLINES
              </div>
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">1.2M+</div>
              <div className="text-[10px] font-mono tracking-widest text-sand-100/70 uppercase mt-0.5">
                TRAVELERS
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
