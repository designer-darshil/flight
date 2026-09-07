import React, { useState } from 'react';
import {
  ArrowRight,
  Compass,
  TrendingDown,
  Plane,
  QrCode,
  Search,
} from 'lucide-react';
import { Hero3D } from './Hero3D';
import { useBooking } from '../context/BookingContext';

export const Hero: React.FC = () => {
  const { setActiveView } = useBooking();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const scrollToBooking = () => {
    const el = document.getElementById('booking-engine-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToExplore = () => {
    const el = document.getElementById('explore-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-[850px] lg:min-h-[920px] pt-32 pb-20 overflow-hidden flex items-center"
    >
      {/* Three.js Atmospheric Flight Canvas */}
      <Hero3D />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: EDITORIAL BRANDING, HEADLINE & METRICS */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-8">
            
            {/* Small Label */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-[11px] font-mono tracking-widestlabel uppercase text-slate-300 font-semibold">
                AERIVA / GLOBAL FLIGHT NETWORK
              </span>
            </div>

            {/* Large 3-Line Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-black tracking-tightest text-white leading-[0.98]">
              TRAVEL <br />
              <span className="bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
                WITHOUT
              </span> <br />
              THE FRICTION.
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-lg font-normal">
              Search smarter. Compare better. Book every part of your journey from one intelligent travel platform.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={scrollToBooking}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-aerova-blue via-blue-600 to-cyan-500 text-white font-bold text-xs tracking-wider uppercase shadow-glow-blue hover:shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center space-x-2"
              >
                <span>SEARCH FLIGHTS</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={scrollToExplore}
                className="px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/15 font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center space-x-2"
              >
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>EXPLORE DESTINATIONS</span>
              </button>
            </div>

            {/* Metrics Row */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl sm:text-3xl font-display font-black text-white">180+</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mt-0.5">
                  DESTINATIONS
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-display font-black text-white">450+</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mt-0.5">
                  AIRLINES
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-display font-black text-cyan-300">1.2M+</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mt-0.5">
                  TRAVELERS
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 3D SPATIAL PERSPECTIVE DEVICE & FLOATING UI PANELS */}
          <div className="lg:col-span-6 xl:col-span-7 relative flex items-center justify-center min-h-[460px] sm:min-h-[560px]">
            
            {/* SPATIAL PERSPECTIVE CONTAINER */}
            <div
              className="relative w-full max-w-[560px] transition-transform duration-300 ease-out"
              style={{
                transform: `perspective(1200px) rotateY(${mousePos.x * -14}deg) rotateX(${mousePos.y * 12}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* MAIN DEVICE: FLOATING HIGH-TECH BROWSER WINDOW WITH LIVE SEARCH UI */}
              <div className="rounded-3xl bg-slate-900/90 border border-white/20 shadow-card-depth overflow-hidden backdrop-blur-2xl transition-all">
                
                {/* Browser Title Bar */}
                <div className="px-5 py-3.5 bg-slate-950/80 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="px-4 py-1 rounded-full bg-slate-900 border border-white/10 text-[10px] font-mono text-slate-400 flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>aeriva.aero/flights/del-lhr</span>
                  </div>
                  <div className="text-[10px] font-mono text-cyan-400 font-bold">EK 513</div>
                </div>

                {/* Device Inner Content (Live Aeriva Flight Search Screen) */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-400">Selected Route</span>
                      <div className="text-xl font-display font-black text-white flex items-center space-x-2">
                        <span>DELHI</span>
                        <Plane className="w-4 h-4 text-cyan-400 transform rotate-45" />
                        <span>LONDON</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono uppercase text-slate-400">Departing</span>
                      <div className="text-sm font-bold text-slate-200">18 Sep 2026</div>
                    </div>
                  </div>

                  {/* Flight Result Mini Card inside screen */}
                  <div className="p-4 rounded-2xl bg-slate-800/80 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-xl bg-red-600/20 text-red-400 font-bold text-xs flex items-center justify-center">
                        EK
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Emirates EK 513</div>
                        <div className="text-[10px] text-slate-400 font-mono">02:45 DEL ➔ 07:15 LHR (10h)</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono text-slate-400 line-through">₹53,400</div>
                      <div className="text-base font-display font-extrabold text-white">₹48,920</div>
                    </div>
                  </div>

                  {/* Quick interactive action */}
                  <button
                    onClick={() => setActiveView('results')}
                    className="w-full py-3 rounded-xl bg-aeriva-blue text-white font-bold text-xs hover:bg-blue-600 transition-colors flex items-center justify-center space-x-1.5 shadow-glow-blue"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>VIEW 127 FLIGHT RESULTS →</span>
                  </button>
                </div>
              </div>

              {/* 1. FLOATING CARD: LIVE FLIGHT STATUS (Top-Left) */}
              <div
                className="absolute -top-10 -left-6 sm:-left-12 p-3.5 rounded-2xl bg-aeriva-charcoal/95 border border-cyan-500/30 shadow-2xl backdrop-blur-xl transition-transform duration-300 hidden sm:block"
                style={{
                  transform: `translateZ(60px) translate(${mousePos.x * 20}px, ${mousePos.y * 15}px)`,
                }}
              >
                <div className="flex items-center space-x-2 text-[10px] font-mono text-cyan-400 mb-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>FLIGHT RADAR STATUS</span>
                </div>
                <div className="text-xs font-bold text-white">EK 513 · DEL ➔ LHR</div>
                <div className="text-[10px] font-mono text-emerald-400 mt-0.5">
                  ON TIME · Terminal 3 · Gate B12
                </div>
              </div>

              {/* 2. FLOATING CARD: DIGITAL BOARDING PASS (Bottom-Right) */}
              <div
                className="absolute -bottom-8 -right-4 sm:-right-10 p-4 rounded-2xl bg-aeriva-charcoal/95 border border-white/20 shadow-2xl backdrop-blur-xl transition-transform duration-300 hidden sm:block"
                style={{
                  transform: `translateZ(80px) translate(${mousePos.x * -25}px, ${mousePos.y * -20}px)`,
                }}
              >
                <div className="flex items-center justify-between space-x-4 mb-2">
                  <div className="text-xs font-bold text-white font-display">AERIVA PASS</div>
                  <span className="text-[9px] font-mono text-cyan-400 font-bold">ARV7K92</span>
                </div>
                <div className="text-xs font-bold text-white">Alex Morgan</div>
                <div className="text-[10px] font-mono text-slate-400">Seat 18A (Extra Legroom)</div>
                <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-slate-300">
                  <span>BOARDING: 01:55</span>
                  <QrCode className="w-4 h-4 text-cyan-400" />
                </div>
              </div>

              {/* 3. FLOATING CARD: PRICE ALERT (Top-Right) */}
              <div
                className="absolute -top-8 right-2 sm:right-0 p-3 rounded-xl bg-aeriva-charcoal/90 border border-emerald-500/30 shadow-xl backdrop-blur-md hidden sm:block"
                style={{
                  transform: `translateZ(40px) translate(${mousePos.x * -15}px, ${mousePos.y * 10}px)`,
                }}
              >
                <div className="flex items-center space-x-1.5 text-xs text-emerald-400 font-semibold font-mono">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>Price dropped 12%</span>
                </div>
                <div className="text-[11px] text-slate-300 font-medium mt-0.5">
                  Tokyo HND · Now ₹42,900
                </div>
              </div>

              {/* 4. FLOATING CARD: DESTINATION (Bottom-Left) */}
              <div
                className="absolute -bottom-6 left-6 p-2.5 rounded-xl bg-aeriva-charcoal/90 border border-white/15 shadow-xl backdrop-blur-md hidden md:block"
                style={{
                  transform: `translateZ(50px) translate(${mousePos.x * 15}px, ${mousePos.y * -15}px)`,
                }}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-base">🇦🇪</span>
                  <div>
                    <div className="text-xs font-bold text-white">Dubai (DXB)</div>
                    <div className="text-[10px] font-mono text-cyan-400">From ₹18,200 · Non-stop</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
