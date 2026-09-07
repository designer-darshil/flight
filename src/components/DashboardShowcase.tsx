import React, { useState } from 'react';
import { QrCode, Check, Activity } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const DashboardShowcase: React.FC = () => {
  const { setActiveView, setIsFlightStatusOpen, setIsBoardingPassOpen } = useBooking();
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x, y });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="py-28 px-6 sm:px-12 lg:px-16 bg-white text-ink border-t border-warm-gray-border/60 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto">
        
        {/* HEADER */}
        <div className="max-w-2xl mb-16 text-left space-y-4">
          <div className="flex items-center space-x-3">
            <span className="w-6 h-[1.5px] bg-terracotta" />
            <span className="text-xs font-mono tracking-widest uppercase text-warm-gray font-semibold">
              06 / PRODUCT ECOSYSTEM
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-ink leading-[0.95]">
            EVERYTHING<br />
            IN ITS PLACE.
          </h2>

          <p className="text-sm sm:text-base text-warm-gray leading-relaxed font-sans max-w-lg pt-2">
            Every step of your flight journey — from precision seat mapping to boarding pass synchronization — is architected into a cohesive digital companion.
          </p>
        </div>

        {/* 3D FLOATING PRODUCT SCREENS (White & Cream on Warm Neutral Background) */}
        <div className="relative p-6 sm:p-12 lg:p-16 bg-cream border border-warm-gray-border/80 shadow-paper overflow-hidden">
          
          <div
            className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center transition-transform duration-300 ease-out"
            style={{
              transform: `perspective(1400px) rotateY(${mouseOffset.x * -8}deg) rotateX(${mouseOffset.y * 6}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            
            {/* 1. MAIN SCREEN: FLIGHT SEARCH & RESULTS APP (Center Layer) */}
            <div className="w-full max-w-xl bg-white border border-warm-gray-border shadow-paper-elevated p-6 z-20 transition-all">
              <div className="flex items-center justify-between pb-3 border-b border-warm-gray-border/60 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sand-200" />
                  <span className="text-xs font-mono font-bold text-ink uppercase tracking-wider">
                    DEL ➔ LHR · 18 SEP 2026
                  </span>
                </div>
                <span className="text-[10px] font-mono text-terracotta font-semibold uppercase">
                  CONFIRMED DIRECT
                </span>
              </div>

              <div className="p-4 bg-sand/30 border border-warm-gray-border/60 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-7 h-7 bg-white border border-warm-gray-border font-mono font-bold text-xs flex items-center justify-center">
                      EK
                    </span>
                    <div>
                      <span className="text-xs font-bold text-ink block">Emirates EK 513</span>
                      <span className="text-[10px] font-mono text-warm-gray">Boeing 777-300ER</span>
                    </div>
                  </div>
                  <span className="text-base font-display font-black text-ink">₹53,400</span>
                </div>

                <div className="flex items-center justify-between text-xs font-mono pt-1">
                  <div>
                    <span className="font-bold text-ink">02:45 DEL</span>
                    <span className="text-[10px] text-warm-gray block">Terminal 3</span>
                  </div>
                  <span className="text-[10px] text-warm-gray">10h 00m · 1 Stop</span>
                  <div className="text-right">
                    <span className="font-bold text-ink">07:15 LHR</span>
                    <span className="text-[10px] text-warm-gray block">Terminal 3</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-warm-gray-border/60 flex items-center justify-between text-xs">
                <span className="text-warm-gray font-mono text-[11px]">Standard Cabin · 23 KG Included</span>
                <button
                  onClick={() => setActiveView('results')}
                  className="px-4 py-1.5 bg-ink text-white font-mono text-xs uppercase font-semibold hover:bg-black"
                >
                  View Details
                </button>
              </div>
            </div>

            {/* 2. SECONDARY SCREEN: CABIN SEAT MAP (Offset Top Right) */}
            <div
              className="hidden sm:block absolute -top-4 right-0 lg:right-6 w-72 bg-white border border-warm-gray-border shadow-paper-elevated p-5 z-30 transition-transform duration-500"
              style={{ transform: 'translateZ(40px)' }}
            >
              <div className="flex items-center justify-between pb-2 border-b border-warm-gray-border/60 text-xs">
                <span className="font-mono font-bold text-ink uppercase text-[10px]">SEAT ALLOCATION</span>
                <span className="text-terracotta font-mono font-bold text-[10px]">ROW 18 EXTRA</span>
              </div>

              <div className="py-3 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-warm-gray font-mono">Seat 18A (Window)</span>
                  <span className="text-xs font-mono font-bold text-ink">₹2,400</span>
                </div>
                <div className="text-[11px] text-warm-gray leading-snug">
                  Emergency exit row with +38" legroom and direct aisle access.
                </div>
                <div className="flex items-center space-x-1.5 text-[10px] font-mono text-olive font-semibold pt-1">
                  <Check className="w-3 h-3" />
                  <span>SEAT 18A RESERVED</span>
                </div>
              </div>
            </div>

            {/* 3. THIRD SCREEN: DIGITAL BOARDING PASS (Offset Bottom Left) */}
            <div
              onClick={() => setIsBoardingPassOpen(true)}
              className="hidden sm:block absolute -bottom-6 left-0 lg:left-8 w-80 bg-white border border-warm-gray-border shadow-paper-elevated p-5 z-30 cursor-pointer hover:border-terracotta transition-all"
              style={{ transform: 'translateZ(30px)' }}
            >
              <div className="flex items-center justify-between pb-2 border-b border-warm-gray-border/60">
                <span className="text-[10px] font-mono font-bold text-ink uppercase">DIGITAL PASS</span>
                <span className="text-[9px] font-mono text-warm-gray">#ARV7K92</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-ink uppercase">ALEX MORGAN</div>
                  <div className="text-[10px] font-mono text-warm-gray">Seat 18A · Gate B12</div>
                  <div className="text-[9px] font-mono text-terracotta mt-1">Boarding 01:55</div>
                </div>
                <div className="w-12 h-12 border border-warm-gray-border p-1 flex items-center justify-center">
                  <QrCode className="w-9 h-9 text-ink" />
                </div>
              </div>
            </div>

            {/* 4. FOURTH SCREEN: LIVE FLIGHT STATUS HUD (Offset Bottom Right) */}
            <div
              onClick={() => setIsFlightStatusOpen(true)}
              className="hidden lg:block absolute bottom-4 right-8 w-64 bg-white border border-warm-gray-border shadow-paper-elevated p-4 z-25 cursor-pointer hover:border-olive transition-all"
              style={{ transform: 'translateZ(20px)' }}
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[10px] font-mono uppercase text-warm-gray font-bold">RADAR TELEMETRY</span>
                <span className="px-2 py-0.5 bg-olive/10 text-olive text-[9px] font-mono font-bold">ON TIME</span>
              </div>
              <div className="text-xs font-bold text-ink">EK 513 · Boeing 777</div>
              <div className="text-[10px] font-mono text-warm-gray mt-1">
                Altitude 36,000 FT · Mach 0.84
              </div>
              <div className="mt-2 pt-2 border-t border-warm-gray-border/50 text-[10px] font-mono text-terracotta flex items-center space-x-1">
                <Activity className="w-3 h-3" />
                <span>Track live route</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
