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
    <section id="features-section" className="py-28 bg-[#FFFFFF] text-[#171717] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* HEADER */}
        <div className="max-w-xl space-y-4 mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-[#963F24] font-bold">
            06 / INTELLIGENT CAPABILITIES
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light tracking-tight leading-none text-[#171717]">
            EVERYTHING <br />
            YOU NEED <br />
            TO GO.
          </h2>
          <p className="text-base text-[#6F6A61] font-normal">
            Every layer of AERIVA is designed to eliminate aviation friction, from predictive pricing algorithms to digital passes.
          </p>
        </div>

        {/* ASYMMETRIC VISUAL FEATURE GRID (NON-REPETITIVE) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* FEATURE 1: SMART SEARCH (Col 1-7, Large tile with mini UI preview) */}
          <div className="md:col-span-7 rounded-[16px] p-8 bg-[#F6F2EA] border border-[#D8D1C5] shadow-xs flex flex-col justify-between space-y-6">
            <div>
              <div className="w-10 h-10 rounded-[8px] bg-[#963F24] text-white flex items-center justify-center mb-4 shadow-xs">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-serif font-medium text-[#171717]">SMART SEARCH</h3>
              <p className="text-xs text-[#6F6A61] max-w-md mt-1 font-sans">
                Direct global airline inventory scanning across 450+ carriers with millisecond response times.
              </p>
            </div>

            {/* Visual Mini Search UI Preview */}
            <div className="p-4 rounded-[12px] bg-white border border-[#D8D1C5] shadow-sm space-y-3">
              <div className="flex justify-between text-xs font-mono text-[#6F6A61] pb-2 border-b border-[#D8D1C5]/60">
                <span>NEW DELHI (DEL) ➔ LONDON (LHR)</span>
                <span className="text-[#3F6B4F] font-bold">127 FARES FOUND</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded bg-[#963F24]/15 text-[#963F24] font-bold text-[10px] flex items-center justify-center">
                    EK
                  </div>
                  <span className="font-bold text-[#171717]">Emirates EK 513</span>
                </div>
                <span className="font-bold font-mono text-[#171717]">₹48,920</span>
              </div>
            </div>
          </div>

          {/* FEATURE 2: PRICE INTELLIGENCE (Col 8-12, mini graph preview) */}
          <div className="md:col-span-5 rounded-[16px] p-8 bg-[#171717] text-white flex flex-col justify-between space-y-6 shadow-sm">
            <div>
              <div className="w-10 h-10 rounded-[8px] bg-[#3F6B4F]/20 text-[#3F6B4F] border border-[#3F6B4F]/30 flex items-center justify-center mb-4">
                <TrendingDown className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white">PRICE INTELLIGENCE</h3>
              <p className="text-xs text-[#EFE9DE]/80 max-w-sm mt-1">
                Machine learning fare forecasting. Receive alerts when a route dips to its historical baseline.
              </p>
            </div>

            {/* Visual Mini Trend Graph */}
            <div className="p-4 rounded-[12px] bg-white/10 border border-white/10 space-y-2">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-[#EFE9DE]/70">Recommendation</span>
                <span className="text-[#3F6B4F] font-bold">GOOD TIME TO BOOK</span>
              </div>
              {/* Mini SVG curve */}
              <svg viewBox="0 0 200 40" className="w-full h-10 overflow-visible" fill="none">
                <path d="M 0,35 Q 50,20 100,28 T 200,8" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="200" cy="8" r="4" fill="#34D399" />
              </svg>
            </div>
          </div>

          {/* FEATURE 3: SEAT SELECTION (Col 1-4, cabin map preview) */}
          <div className="md:col-span-4 rounded-[16px] p-8 bg-[#FFFFFF] border border-[#D8D1C5] shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-[8px] bg-[#EFE9DE] text-[#963F24] flex items-center justify-center mb-4">
                <Armchair className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#171717]">SEAT SELECTION</h3>
              <p className="text-xs text-[#6F6A61] mt-1">
                True 3D-aware aircraft floorplan with pitch dimensions, window alignments, and exit rows.
              </p>
            </div>

            {/* Mini Seat Rows */}
            <div className="p-3 bg-[#F6F2EA] rounded-[8px] border border-[#D8D1C5] flex justify-center space-x-1.5 font-mono text-[10px]">
              <div className="w-6 h-7 rounded bg-white text-[#6F6A61] flex items-center justify-center border border-[#D8D1C5]">17A</div>
              <div className="w-6 h-7 rounded bg-[#963F24] text-white font-bold flex items-center justify-center shadow-xs">18A</div>
              <div className="w-6 h-7 rounded bg-white text-[#6F6A61] flex items-center justify-center border border-[#D8D1C5]">19A</div>
              <span className="w-3 text-center text-[#D8D1C5]">|</span>
              <div className="w-6 h-7 rounded bg-[#EFE9DE] text-[#171717] flex items-center justify-center border border-[#D8D1C5]">18C</div>
              <div className="w-6 h-7 rounded bg-white text-[#6F6A61] flex items-center justify-center border border-[#D8D1C5]">18D</div>
            </div>
          </div>

          {/* FEATURE 4: LIVE STATUS (Col 5-8, departure HUD preview) */}
          <div
            onClick={() => setIsFlightStatusOpen(true)}
            className="md:col-span-4 rounded-[16px] p-8 bg-[#FFFFFF] border border-[#D8D1C5] shadow-sm flex flex-col justify-between space-y-4 cursor-pointer hover:border-[#963F24] transition-all group"
          >
            <div>
              <div className="w-10 h-10 rounded-[8px] bg-[#EFE9DE] text-[#963F24] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#171717] flex items-center justify-between">
                <span>LIVE STATUS</span>
                <ArrowRight className="w-4 h-4 text-[#6F6A61] group-hover:translate-x-1 transition-transform" />
              </h3>
              <p className="text-xs text-[#6F6A61] mt-1">
                Airport gate telemetry, baggage belt updates, and real-time flight radar tracking. Click to inspect live flight.
              </p>
            </div>

            <div className="p-3 bg-[#F6F2EA] rounded-[8px] border border-[#D8D1C5] text-xs font-mono flex items-center justify-between">
              <div>
                <span className="font-bold text-[#171717]">EK 513 · DEL ➔ LHR</span>
                <span className="text-[10px] text-[#6F6A61] block">Gate B12 · Terminal 3</span>
              </div>
              <span className="text-[10px] font-bold text-[#3F6B4F] bg-[#3F6B4F]/10 px-2 py-1 rounded-[4px]">
                ON TIME
              </span>
            </div>
          </div>

          {/* FEATURE 5: DIGITAL BOARDING PASS (Col 9-12, pass preview) */}
          <div
            onClick={() => setIsBoardingPassOpen(true)}
            className="md:col-span-4 rounded-[16px] p-8 bg-[#171717] text-white flex flex-col justify-between space-y-4 shadow-sm cursor-pointer hover:border-[#963F24] border border-transparent transition-all group"
          >
            <div>
              <div className="w-10 h-10 rounded-[8px] bg-white/10 text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <QrCode className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif font-bold text-white flex items-center justify-between">
                <span>DIGITAL PASSES</span>
                <ArrowRight className="w-4 h-4 text-[#EFE9DE]/80 group-hover:translate-x-1 transition-transform" />
              </h3>
              <p className="text-xs text-[#EFE9DE]/80 mt-1">
                Instant Apple Wallet and Google Wallet passes delivered straight to your device. Click to view pass.
              </p>
            </div>

            <div className="p-3 bg-white/10 rounded-[8px] border border-white/10 flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-white font-bold block">ALEX MORGAN</span>
                <span className="text-[10px] text-[#EFE9DE]/70">Seat 18A · Gate B12</span>
              </div>
              <QrCode className="w-6 h-6 text-white" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
