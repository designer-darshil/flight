import React, { useState } from 'react';
import {
  QrCode,
  ArrowLeft,
  Calendar,
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
    <div className="min-h-screen bg-cream text-ink pb-24">
      
      {/* Top Application Bar */}
      <header className="bg-cream border-b border-border shadow-sm sticky top-0 z-30">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 flex items-center justify-between h-16">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setActiveView('marketing')}
              className="flex items-center space-x-2 text-xs font-mono font-medium text-warm-gray hover:text-ink transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Overview</span>
            </button>
            <span className="text-border">|</span>
            <span className="text-sm font-serif font-light tracking-widest text-ink">AERIVA TRAVEL PORTAL</span>
          </div>

          <div className="flex items-center space-x-3 text-xs font-mono">
            <span className="text-warm-gray">TIER: <strong className="text-ink font-semibold">SAPPHIRE SKY</strong></span>
            <div className="w-8 h-8 rounded-lg bg-ink text-paper flex items-center justify-center font-bold text-xs">
              AM
            </div>
          </div>
        </div>
      </header>

      {/* DASHBOARD HERO GREETING */}
      <div className="bg-paper border-b border-border py-12">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-terracotta font-medium tracking-[0.2em]">
                Traveler Itinerary Hub
              </span>
              <h1 className="text-4xl sm:text-5xl font-serif font-light text-ink">
                Good morning, Alex.
              </h1>
              <p className="text-sm text-warm-gray font-serif">
                Your next journey begins in <strong className="text-terracotta font-sans font-medium">11 days</strong>.
              </p>
            </div>

            <div className="flex items-center space-x-3 font-mono">
              <button
                onClick={() => setIsBoardingPassOpen(true)}
                className="px-5 py-2.5 rounded-lg bg-sand hover:bg-sand/80 text-ink border border-border text-xs tracking-wider uppercase transition-colors flex items-center space-x-2"
              >
                <QrCode className="w-4 h-4 text-terracotta" />
                <span>BOARDING PASS</span>
              </button>

              <button
                onClick={() => setActiveView('results')}
                className="px-6 py-2.5 rounded-lg bg-terracotta hover:bg-terracotta-hover text-paper font-medium text-xs tracking-wider uppercase transition-colors shadow-sm"
              >
                BOOK FLIGHT
              </button>
            </div>
          </div>

          {/* UPCOMING TRIP MAIN CARD */}
          <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-sand/30 border border-border space-y-6 relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-paper border border-border text-ink font-serif font-bold text-sm flex items-center justify-center shadow-sm">
                  EK
                </div>
                <div>
                  <div className="text-xl font-serif font-medium text-ink flex items-center space-x-2">
                    <span>DELHI</span>
                    <span className="text-warm-gray text-sm">➔</span>
                    <span>LONDON</span>
                  </div>
                  <div className="text-xs font-mono text-warm-gray mt-0.5">
                    18 SEP 2026 &bull; Emirates EK 513 &bull; Boeing 777-300ER
                  </div>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-olive/10 text-olive font-mono text-xs font-medium border border-olive/20 flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-olive animate-pulse" />
                <span>ON TIME</span>
              </span>
            </div>

            {/* Flight Times & Telemetry */}
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-6 pt-2 text-xs font-mono">
              <div>
                <span className="text-[10px] text-warm-gray uppercase block">Departure</span>
                <span className="text-2xl font-bold text-ink font-serif">02:45</span>
                <span className="text-warm-gray block text-[11px]">Delhi (DEL)</span>
              </div>

              <div>
                <span className="text-[10px] text-warm-gray uppercase block">Arrival</span>
                <span className="text-2xl font-bold text-ink font-serif">07:15</span>
                <span className="text-warm-gray block text-[11px]">London (LHR)</span>
              </div>

              <div>
                <span className="text-[10px] text-warm-gray uppercase block">Terminal</span>
                <span className="text-2xl font-bold text-ink font-serif">T3</span>
                <span className="text-warm-gray block text-[11px]">Indira Gandhi Intl</span>
              </div>

              <div>
                <span className="text-[10px] text-warm-gray uppercase block">Gate</span>
                <span className="text-2xl font-bold text-ink font-serif">B12</span>
                <span className="text-warm-gray block text-[11px]">Boarding 01:55</span>
              </div>

              <div>
                <span className="text-[10px] text-warm-gray uppercase block">Seat</span>
                <span className="text-2xl font-bold text-terracotta font-serif">18A</span>
                <span className="text-warm-gray block text-[11px]">Window Suite</span>
              </div>

              <div>
                <span className="text-[10px] text-warm-gray uppercase block">Baggage</span>
                <span className="text-2xl font-bold text-ink font-serif">2 &times; 32 KG</span>
                <span className="text-warm-gray block text-[11px]">Checked in</span>
              </div>
            </div>

            {/* Card Action footer */}
            <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-mono text-warm-gray">
                Reference: <strong className="text-ink">AER-8942</strong>
              </span>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsBoardingPassOpen(true)}
                  className="px-4 py-2 rounded-lg bg-ink text-paper font-mono font-medium text-xs hover:bg-terracotta transition-colors shadow-sm"
                >
                  VIEW BOARDING PASS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MY TRIPS MANAGEMENT SECTION */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 pt-10">
        
        {/* TABS */}
        <div className="flex border-b border-border mb-6 gap-6 text-xs font-mono">
          {(['upcoming', 'completed', 'cancelled'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 border-b-2 uppercase tracking-wider transition-colors ${
                activeTab === tab
                  ? 'border-terracotta text-terracotta font-semibold'
                  : 'border-transparent text-warm-gray hover:text-ink'
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
              className="p-6 rounded-xl bg-paper border border-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-ink/40 transition-colors"
            >
              <div className="space-y-1.5">
                <div className="flex items-center space-x-3">
                  <span className="text-xl font-serif font-medium text-ink">LONDON</span>
                  <span className="text-xs font-mono text-warm-gray">DEL ➔ LHR</span>
                  <span className="px-2.5 py-0.5 rounded-md bg-sand text-ink font-mono text-[10px] font-medium border border-border">
                    {b.flight.airline} {b.flight.flightNumber}
                  </span>
                </div>
                <div className="text-xs text-warm-gray font-mono flex items-center space-x-2">
                  <Calendar className="w-3.5 h-3.5 text-terracotta" />
                  <span>18 SEP — 26 SEP &bull; Ref: <strong className="text-ink">{b.reference}</strong></span>
                </div>
              </div>

              <div className="flex items-center space-x-3 font-mono text-xs">
                <button
                  onClick={() => setIsBoardingPassOpen(true)}
                  className="px-4 py-2 rounded-lg bg-sand hover:bg-sand/80 text-ink border border-border transition-colors"
                >
                  DETAILS
                </button>

                <button
                  onClick={() => setIsBoardingPassOpen(true)}
                  className="px-5 py-2 rounded-lg bg-terracotta hover:bg-terracotta-hover text-paper font-medium transition-colors shadow-sm"
                >
                  DIGITAL PASS
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
