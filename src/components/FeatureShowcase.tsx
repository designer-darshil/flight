import React from 'react';
import {
  Search,
  TrendingDown,
  Armchair,
  Activity,
  QrCode,
  ArrowRight,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const FeatureShowcase: React.FC = () => {
  const { setIsFlightStatusOpen, setIsBoardingPassOpen } = useBooking();

  return (
    <section id="features-section" className="py-28 bg-white text-slate-900 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* HEADER */}
        <div className="max-w-xl space-y-4 mb-16">
          <div className="text-xs font-mono uppercase tracking-widestlabel text-aeriva-blue font-bold">
            06 / INTELLIGENT CAPABILITIES
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tightest leading-none text-slate-900">
            EVERYTHING <br />
            YOU NEED <br />
            TO GO.
          </h2>
          <p className="text-base text-slate-500 font-normal">
            Every layer of AERIVA is designed to eliminate aviation friction, from predictive pricing algorithms to digital passes.
          </p>
        </div>

        {/* ASYMMETRIC VISUAL FEATURE GRID (NON-REPETITIVE) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* FEATURE 1: SMART SEARCH (Col 1-7, Large tile with mini UI preview) */}
          <div className="md:col-span-7 rounded-3xl p-8 bg-slate-50 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-6">
            <div>
              <div className="w-10 h-10 rounded-xl bg-aeriva-blue text-white flex items-center justify-center mb-4 shadow-sm">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-display font-black text-slate-900">SMART SEARCH</h3>
              <p className="text-xs text-slate-500 max-w-md mt-1">
                Direct global airline inventory scanning across 450+ carriers with millisecond response times.
              </p>
            </div>

            {/* Visual Mini Search UI Preview */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between text-xs font-mono text-slate-400 pb-2 border-b border-slate-100">
                <span>NEW DELHI (DEL) ➔ LONDON (LHR)</span>
                <span className="text-emerald-600 font-bold">127 FARES FOUND</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded bg-red-600/15 text-red-600 font-bold text-[10px] flex items-center justify-center">
                    EK
                  </div>
                  <span className="font-bold text-slate-800">Emirates EK 513</span>
                </div>
                <span className="font-bold font-mono text-slate-900">₹48,920</span>
              </div>
            </div>
          </div>

          {/* FEATURE 2: PRICE INTELLIGENCE (Col 8-12, mini graph preview) */}
          <div className="md:col-span-5 rounded-3xl p-8 bg-slate-900 text-white flex flex-col justify-between space-y-6 shadow-xl">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-4">
                <TrendingDown className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-display font-black text-white">PRICE INTELLIGENCE</h3>
              <p className="text-xs text-slate-400 max-w-sm mt-1">
                Machine learning fare forecasting. Receive alerts when a route dips to its historical baseline.
              </p>
            </div>

            {/* Visual Mini Trend Graph */}
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-white/10 space-y-2">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-slate-400">Recommendation</span>
                <span className="text-emerald-400 font-bold">GOOD TIME TO BOOK</span>
              </div>
              {/* Mini SVG curve */}
              <svg viewBox="0 0 200 40" className="w-full h-10 overflow-visible" fill="none">
                <path d="M 0,35 Q 50,20 100,28 T 200,8" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="200" cy="8" r="4" fill="#34D399" />
              </svg>
            </div>
          </div>

          {/* FEATURE 3: SEAT SELECTION (Col 1-4, cabin map preview) */}
          <div className="md:col-span-4 rounded-3xl p-8 bg-slate-50 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                <Armchair className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-display font-black text-slate-900">SEAT SELECTION</h3>
              <p className="text-xs text-slate-500 mt-1">
                True 3D-aware aircraft floorplan with pitch dimensions, window alignments, and exit rows.
              </p>
            </div>

            {/* Mini Seat Rows */}
            <div className="p-3 bg-white rounded-2xl border border-slate-200 flex justify-center space-x-1.5 font-mono text-[10px]">
              <div className="w-6 h-7 rounded bg-slate-100 text-slate-400 flex items-center justify-center">17A</div>
              <div className="w-6 h-7 rounded bg-cyan-400 text-slate-950 font-bold flex items-center justify-center shadow-sm">18A</div>
              <div className="w-6 h-7 rounded bg-slate-100 text-slate-400 flex items-center justify-center">19A</div>
              <span className="w-3 text-center text-slate-300">|</span>
              <div className="w-6 h-7 rounded bg-slate-200 text-slate-700 flex items-center justify-center">18C</div>
              <div className="w-6 h-7 rounded bg-slate-100 text-slate-400 flex items-center justify-center">18D</div>
            </div>
          </div>

          {/* FEATURE 4: LIVE STATUS (Col 5-8, departure HUD preview) */}
          {/* FEATURE 4: LIVE RADAR (Col 5-8) */}
          <div
            onClick={() => setIsFlightStatusOpen(true)}
            className="md:col-span-4 rounded-3xl p-8 bg-slate-50 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4 cursor-pointer hover:border-aeriva-blue/40 transition-all group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-display font-black text-slate-900 flex items-center justify-between">
                <span>LIVE STATUS</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Airport gate telemetry, baggage belt updates, and real-time flight radar tracking. Click to inspect live flight.
              </p>
            </div>

            <div className="p-3 bg-white rounded-2xl border border-slate-200 text-xs font-mono flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800">EK 513 · DEL ➔ LHR</span>
                <span className="text-[10px] text-slate-400 block">Gate B12 · Terminal 3</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                ON TIME
              </span>
            </div>
          </div>

          {/* FEATURE 5: DIGITAL BOARDING PASS (Col 9-12, pass preview) */}
          <div
            onClick={() => setIsBoardingPassOpen(true)}
            className="md:col-span-4 rounded-3xl p-8 bg-aeriva-navy text-white flex flex-col justify-between space-y-4 shadow-lg cursor-pointer hover:border-aeriva-cyan/40 border border-transparent transition-all group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <QrCode className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-display font-black text-white flex items-center justify-between">
                <span>DIGITAL PASSES</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Instant Apple Wallet and Google Wallet passes delivered straight to your device. Click to view pass.
              </p>
            </div>

            <div className="p-3 bg-slate-900 rounded-2xl border border-white/10 flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-cyan-400 font-bold block">ALEX MORGAN</span>
                <span className="text-[10px] text-slate-400">Seat 18A · Gate B12</span>
              </div>
              <QrCode className="w-6 h-6 text-white" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
