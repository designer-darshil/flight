import React from 'react';
import { ArrowRight, Sparkles, Compass, ShieldCheck, Zap } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const FinalCTA: React.FC = () => {
  const { searchFlights } = useBooking();

  const handleSearchAction = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickExplore = () => {
    searchFlights();
  };

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-aeriva-navy overflow-hidden border-t border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-aeriva-blue/20 via-aeriva-cyan/15 to-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      
      {/* Flight path vector curves */}
      <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center">
        <svg className="w-full max-w-5xl h-64" viewBox="0 0 1000 250" fill="none">
          <path
            d="M 50 200 Q 300 30, 500 125 T 950 50"
            stroke="url(#cta-gradient)"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          <circle cx="50" cy="200" r="4" fill="#3B82F6" />
          <circle cx="500" cy="125" r="5" fill="#06B6D4" />
          <circle cx="950" cy="50" r="6" fill="#FF6B35" />
          <defs>
            <linearGradient id="cta-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="50%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#FF6B35" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
        {/* Aeriva pill */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-aeriva-cyan" />
          <span className="text-xs font-mono tracking-widest text-slate-300 uppercase">
            TRAVEL WITHOUT THE FRICTION
          </span>
        </div>

        {/* Massive Editorial Headline */}
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-white tracking-tight leading-[1.05]">
          WHERE WILL YOU <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-aeriva-cyan via-white to-blue-400">
            GO NEXT?
          </span>
        </h2>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 leading-relaxed font-light">
          Search smarter. Travel further. Experience real-time price intelligence, precision seat mapping, and zero-latency flight booking across 180+ global hubs.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={handleSearchAction}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-aeriva-blue via-blue-600 to-aeriva-cyan text-white font-extrabold text-sm tracking-wide shadow-glow-blue hover:shadow-cyan-500/40 transform hover:-translate-y-0.5 transition-all flex items-center space-x-3 group"
          >
            <span>Search Your Next Flight</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={handleQuickExplore}
            className="px-7 py-4 rounded-2xl bg-aeriva-surface/80 hover:bg-aeriva-surface border border-white/15 text-slate-200 hover:text-white font-bold text-sm tracking-wide transition-all flex items-center space-x-2.5 backdrop-blur-md"
          >
            <Compass className="w-4 h-4 text-aeriva-cyan" />
            <span>Explore Active Flights</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto border-t border-white/10 text-left">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-aeriva-cyan shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">Zero Latency</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Instant route queries across 14,000 global flight paths.</div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">Predictive Fares</div>
              <div className="text-[11px] text-slate-400 mt-0.5">30-day algorithmic price tracking before you buy.</div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">Frictionless PNR</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Instant digital boarding passes with Apple Wallet sync.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
