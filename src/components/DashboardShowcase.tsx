import React, { useState } from 'react';
import {
  QrCode,
  ArrowRight,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const DashboardShowcase: React.FC = () => {
  const { setActiveView } = useBooking();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setOffset({ x, y });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="py-32 bg-aeriva-charcoal text-white relative overflow-hidden border-t border-white/10"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-aeriva-blue/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-20">
          <div className="text-xs font-mono uppercase tracking-widestlabel text-cyan-400 font-bold">
            08 / PRODUCT SHOWCASE
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-display font-black tracking-tightest leading-none text-white">
            YOUR ENTIRE <br />
            JOURNEY. <br />
            <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              ONE PLACE.
            </span>
          </h2>
          <p className="text-base text-slate-400 font-normal">
            A unified travel operating system. Manage multi-leg itineraries, instant gate changes, and Apple Wallet passes with effortless precision.
          </p>
        </div>

        {/* 3D SPATIAL LAYERED SCREENS COMPOSITION */}
        <div
          className="relative max-w-5xl mx-auto h-[580px] sm:h-[650px] flex items-center justify-center transition-transform duration-300 ease-out"
          style={{
            transform: `perspective(1400px) rotateY(${offset.x * -10}deg) rotateX(${offset.y * 10}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* BACKGROUND LAYER: RADAR / DESTINATION VISUALIZATION */}
          <div
            className="absolute -top-12 w-4/5 h-64 rounded-3xl bg-slate-900/60 border border-white/10 p-6 hidden md:block opacity-60 backdrop-blur-md"
            style={{ transform: 'translateZ(-80px)' }}
          >
            <div className="flex justify-between items-center text-xs font-mono text-slate-500 mb-4">
              <span>AERIVA SATELLITE RADAR</span>
              <span>LIVE TELEMETRY</span>
            </div>
            <div className="h-36 border border-dashed border-white/10 rounded-2xl flex items-center justify-center text-xs font-mono text-slate-400">
              [GLOBAL AIRSPACE RADAR ACTIVE · 4,820 IN-FLIGHT PASSENGERS]
            </div>
          </div>

          {/* CENTER LAYER: LARGE DESKTOP DASHBOARD SCREEN */}
          <div
            className="w-full max-w-3xl rounded-3xl bg-slate-950 border border-white/20 shadow-card-depth overflow-hidden z-20 backdrop-blur-2xl"
            style={{ transform: 'translateZ(0px)' }}
          >
            {/* Window header */}
            <div className="px-6 py-3.5 bg-slate-900 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-mono text-slate-400">AERIVA / DASHBOARD / ALEX MORGAN</span>
              <div className="text-xs font-mono text-emerald-400 font-bold">ACTIVE</div>
            </div>

            {/* Dashboard Content */}
            <div className="p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono text-slate-400 uppercase">Primary Traveler</span>
                  <div className="text-2xl font-display font-black text-white">Good morning, Alex.</div>
                  <div className="text-xs font-mono text-cyan-400 mt-0.5">Your next journey starts in 12 DAYS</div>
                </div>

                <button
                  onClick={() => setActiveView('dashboard')}
                  className="px-5 py-2.5 rounded-xl bg-aeriva-blue text-white font-bold text-xs hover:bg-blue-600 transition-colors flex items-center space-x-1.5 shadow-glow-blue"
                >
                  <span>OPEN DASHBOARD</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Upcoming Trip Main Card inside Dashboard */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-white/10 space-y-4">
                <div className="flex justify-between items-center text-xs font-mono text-slate-400 pb-2 border-b border-white/5">
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-bold">EMIRATES EK 513</span>
                    <span>·</span>
                    <span>Boeing 777-300ER</span>
                  </div>
                  <span className="text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded">ON TIME</span>
                </div>

                <div className="grid grid-cols-3 gap-4 items-center">
                  <div>
                    <div className="text-2xl font-bold font-display text-white">DEL</div>
                    <div className="text-xs text-slate-400">Delhi · 02:45</div>
                  </div>
                  <div className="text-center font-mono text-xs text-cyan-400">
                    <div>10h 00m</div>
                    <div className="border-t border-dashed border-cyan-400/50 my-1" />
                    <div className="text-[10px] text-slate-400">1 STOP (DXB)</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold font-display text-white">LHR</div>
                    <div className="text-xs text-slate-400">London · 07:15</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 grid grid-cols-4 gap-2 text-[11px] font-mono text-slate-300">
                  <div>Terminal: <strong className="text-white">3</strong></div>
                  <div>Gate: <strong className="text-cyan-400">B12</strong></div>
                  <div>Seat: <strong className="text-white">18A</strong></div>
                  <div>Baggage: <strong className="text-white">23 KG</strong></div>
                </div>
              </div>
            </div>
          </div>

          {/* LEFT LAYER: MOBILE SCREEN SHOWING DIGITAL PASS */}
          <div
            className="absolute -left-6 sm:-left-16 bottom-8 w-60 sm:w-68 rounded-3xl bg-slate-900 border border-white/20 p-5 shadow-2xl z-30 hidden sm:block backdrop-blur-2xl"
            style={{
              transform: `translateZ(70px) translate(${offset.x * 25}px, ${offset.y * 20}px)`,
            }}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">MOBILE PASS</span>
              <span className="text-[9px] font-mono text-slate-400">ARV7K92</span>
            </div>
            <div className="text-sm font-bold text-white">Alex Morgan</div>
            <div className="text-xs font-mono text-slate-300">DEL ➔ LHR · EK 513</div>
            <div className="text-xs font-mono text-cyan-300 font-bold mt-1">SEAT 18A · GATE B12</div>
            <div className="my-3 py-2 bg-white rounded-xl flex items-center justify-center">
              <QrCode className="w-16 h-16 text-slate-950" />
            </div>
            <div className="text-[10px] font-mono text-center text-slate-400">Add to Apple Wallet</div>
          </div>

          {/* RIGHT LAYER: FLIGHT STATUS TELEMETRY CARD */}
          <div
            className="absolute -right-6 sm:-right-16 top-12 w-64 sm:w-72 rounded-3xl bg-slate-900 border border-cyan-500/30 p-5 shadow-2xl z-30 hidden sm:block backdrop-blur-2xl"
            style={{
              transform: `translateZ(60px) translate(${offset.x * -25}px, ${offset.y * -15}px)`,
            }}
          >
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>RADAR TELEMETRY</span>
            </div>
            <div className="text-sm font-bold text-white">EK 513 · IN TRANSIT</div>
            <div className="text-xs font-mono text-slate-400 mt-1">Alt: 38,000 FT · Mach 0.84</div>
            <div className="mt-3 pt-3 border-t border-white/10 text-xs font-mono flex justify-between">
              <span>Status:</span>
              <span className="text-emerald-400 font-bold">ON SCHEDULE</span>
            </div>
          </div>

          {/* FOREGROUND LAYER: BOOKING SUMMARY CARD */}
          <div
            className="absolute -bottom-8 right-12 p-4 rounded-2xl bg-aeriva-charcoal border border-white/20 shadow-2xl z-40 hidden md:block"
            style={{
              transform: `translateZ(90px) translate(${offset.x * -15}px, ${offset.y * -25}px)`,
            }}
          >
            <div className="text-[10px] font-mono uppercase text-slate-400">Confirmed Fare</div>
            <div className="text-lg font-display font-black text-white">₹61,120</div>
            <div className="text-[10px] font-mono text-emerald-400">Taxes & Extra Legroom Included</div>
          </div>

        </div>

      </div>
    </section>
  );
};
