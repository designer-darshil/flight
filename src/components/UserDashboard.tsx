import React, { useState } from 'react';
import {
  QrCode,
  ArrowLeft,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const UserDashboard: React.FC = () => {
  const {
    setActiveView,
    setIsBoardingPassOpen,
    myBookings,
  } = useBooking();

  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');

  const filteredBookings = myBookings.filter(b => {
    if (activeTab === 'cancelled') return b.status === 'Cancelled';
    return b.status === 'Confirmed' || b.status === 'Completed';
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24">
      
      {/* Top Application Bar */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-30">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex items-center justify-between h-16">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setActiveView('marketing')}
              className="flex items-center space-x-2 text-xs font-mono font-bold text-aeriva-blue hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
            <span className="text-slate-300">|</span>
            <span className="text-sm font-bold font-display text-slate-900">Personal Travel Dashboard</span>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <span className="font-mono text-slate-500">MEMBER TIER: <strong className="text-slate-900 font-bold">PLATINUM SKY</strong></span>
            <div className="w-8 h-8 rounded-full bg-aeriva-blue text-white flex items-center justify-center font-bold">
              AM
            </div>
          </div>
        </div>
      </header>

      {/* DASHBOARD HERO GREETING (Requirement 25) */}
      <div className="bg-white border-b border-slate-200 py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-aeriva-blue font-bold tracking-wider">
                AERIVA PASSENGER PORTAL
              </span>
              <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900">
                Good morning, Alex.
              </h1>
              <p className="text-sm text-slate-500 font-mono">
                Your next journey starts in: <strong className="text-aeriva-blue font-bold">12 DAYS</strong>
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsBoardingPassOpen(true)}
                className="px-6 py-3 rounded-2xl bg-aeriva-blue text-white font-bold text-xs tracking-wider uppercase hover:bg-blue-600 transition-all flex items-center space-x-2 shadow-glow-blue"
              >
                <QrCode className="w-4 h-4" />
                <span>BOARDING PASS</span>
              </button>

              <button
                onClick={() => setActiveView('results')}
                className="px-6 py-3 rounded-2xl bg-slate-900 text-white font-bold text-xs tracking-wider uppercase hover:bg-slate-800 transition-all"
              >
                BOOK NEW TRIP
              </button>
            </div>
          </div>

          {/* 25. UPCOMING TRIP MAIN CARD */}
          <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6 relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-400 font-bold text-xs flex items-center justify-center">
                  EK
                </div>
                <div>
                  <div className="text-lg font-bold font-display text-white">
                    DELHI ➔ LONDON
                  </div>
                  <div className="text-xs font-mono text-cyan-400">
                    18 SEP 2026 · Emirates EK 513 · Boeing 777-300ER
                  </div>
                </div>
              </div>

              <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
                STATUS: ON TIME
              </span>
            </div>

            {/* Flight Times & Telemetry */}
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-6 pt-2 text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Departure</span>
                <span className="text-2xl font-bold text-white font-display">02:45</span>
                <span className="text-slate-400 block text-[11px]">Delhi (DEL)</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Arrival</span>
                <span className="text-2xl font-bold text-white font-display">07:15</span>
                <span className="text-slate-400 block text-[11px]">London (LHR)</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Terminal</span>
                <span className="text-2xl font-bold text-white font-display">3</span>
                <span className="text-slate-400 block text-[11px]">IGI Terminal</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Gate</span>
                <span className="text-2xl font-bold text-cyan-400 font-display">B12</span>
                <span className="text-slate-400 block text-[11px]">Boarding 01:55</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Seat</span>
                <span className="text-2xl font-bold text-white font-display">18A</span>
                <span className="text-cyan-400 block text-[11px]">Extra Legroom</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Baggage</span>
                <span className="text-2xl font-bold text-white font-display">23 KG</span>
                <span className="text-slate-400 block text-[11px]">Checked bag</span>
              </div>
            </div>

            {/* Card Action footer */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-mono text-slate-400">
                Booking Reference: <strong className="text-cyan-300">ARV7K92</strong>
              </span>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsBoardingPassOpen(true)}
                  className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs hover:bg-cyan-300 transition-colors shadow-glow-cyan"
                >
                  VIEW BOARDING PASS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 26. MY TRIPS MANAGEMENT SECTION */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-10">
        
        {/* TABS */}
        <div className="flex border-b border-slate-200 mb-6 gap-6 text-xs font-bold font-mono">
          {(['upcoming', 'completed', 'cancelled'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 border-b-2 uppercase tracking-wider transition-all ${
                activeTab === tab
                  ? 'border-aeriva-blue text-aeriva-blue'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              {tab} ({myBookings.filter(b => (tab === 'cancelled' ? b.status === 'Cancelled' : b.status !== 'Cancelled')).length})
            </button>
          ))}
        </div>

        {/* TRIP CARDS */}
        <div className="space-y-4">
          {filteredBookings.map(b => (
            <div
              key={b.id}
              className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-xl font-display font-black text-slate-900">LONDON</span>
                  <span className="text-xs font-mono text-slate-400">DEL ➔ LHR</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono text-[10px] font-bold">
                    {b.flight.airline} {b.flight.flightNumber}
                  </span>
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  18 SEP — 26 SEP · Reference: <strong className="text-slate-800">{b.reference}</strong>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsBoardingPassOpen(true)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs font-mono transition-colors"
                >
                  VIEW
                </button>

                <button
                  onClick={() => setIsBoardingPassOpen(true)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs font-mono transition-colors"
                >
                  MANAGE
                </button>

                <button
                  onClick={() => setIsBoardingPassOpen(true)}
                  className="px-5 py-2 rounded-xl bg-aeriva-blue text-white font-bold text-xs font-mono hover:bg-blue-600 transition-colors shadow-sm"
                >
                  DOWNLOAD TICKET
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
