import React, { useState } from 'react';
import {
  Plane,
  Calendar,
  Briefcase,
  Bookmark,
  Bell,
  FileText,
  Activity,
  ArrowLeft,
  QrCode,
  Shield,
  Compass,
  ChevronRight,
  Search,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { BoardingPass } from './BoardingPass';
import { Booking } from '../types';

type SidebarTab =
  | 'overview'
  | 'my-trips'
  | 'saved-flights'
  | 'price-alerts'
  | 'travel-documents'
  | 'flight-status';

type TripsFilter = 'upcoming' | 'completed' | 'cancelled';

export const UserDashboard: React.FC = () => {
  const {
    setActiveView,
    setIsBoardingPassOpen,
    myBookings,
    setIsFlightStatusOpen,
    activeBooking,
  } = useBooking();

  const [activeSidebarTab, setActiveSidebarTab] = useState<SidebarTab>('overview');
  const [tripsFilter, setTripsFilter] = useState<TripsFilter>('upcoming');
  const [selectedTripDetails, setSelectedTripDetails] = useState<Booking | null>(null);

  // Large upcoming flagship trip (DEL -> LHR)
  const flagshipUpcomingTrip = {
    airline: 'Emirates',
    flightNumber: 'EK 513',
    aircraft: 'Boeing 777-300ER',
    route: 'DEL → LHR',
    originCode: 'DEL',
    originCity: 'Delhi',
    destCode: 'LHR',
    destCity: 'London',
    date: '18 SEP 2026',
    status: 'ON TIME',
    departureTime: '02:45',
    arrivalTime: '07:15',
    gate: 'B12',
    seat: '18A',
    baggage: '23 KG',
    terminal: 'T3',
    reference: 'ARV7K92',
    duration: '8h 30m',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80',
  };

  const filteredBookings = myBookings.filter(b => {
    if (tripsFilter === 'cancelled') return b.status === 'Cancelled';
    return b.status === 'Confirmed' || b.status === 'Completed';
  });

  // Featured trip in My Trips (either user's confirmed active trip or default London journey)
  const featuredTrip = activeBooking || myBookings[0];

  return (
    <div className="min-h-screen bg-[#F6F2EA] text-[#171717]">
      
      {/* TOP LUXURY PORTAL BAR */}
      <div className="bg-[#FFFFFF] border-b border-[#D8D1C5] sticky top-0 z-30">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setActiveView('marketing')}
              className="flex items-center space-x-2 text-xs font-mono font-semibold text-[#6F6A61] hover:text-[#963F24] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>EXIT TO AERIVA.COM</span>
            </button>
            <span className="text-[#D8D1C5]">|</span>
            <span className="text-xs font-serif tracking-[0.2em] font-light text-[#171717] uppercase">
              VOYAGER TRAVEL DESK
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs font-mono">
            <div className="hidden sm:flex items-center space-x-2 text-[#6F6A61]">
              <span>STATUS:</span>
              <span className="font-semibold text-[#963F24] uppercase">SAPPHIRE SKY TIER</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#171717] text-[#FFFFFF] flex items-center justify-center font-bold text-xs shadow-sm">
              AM
            </div>
          </div>
        </div>
      </div>

      {/* DASHBOARD LAYOUT: CREAM/WHITE SIDEBAR + MAIN CONTENT */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* SIDEBAR NAVIGATION - CREAM / WHITE, NO DARK / NO BLUE */}
          <aside className="lg:col-span-3 bg-[#FFFFFF] rounded-[12px] border border-[#D8D1C5] p-5 shadow-[0_4px_20px_rgba(23,23,23,0.04)] sticky top-24">
            
            {/* USER MINI PROFILE */}
            <div className="pb-5 mb-5 border-b border-[#D8D1C5]">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-[10px] bg-[#EFE9DE] border border-[#D8D1C5] flex items-center justify-center font-serif text-lg font-bold text-[#171717]">
                  AM
                </div>
                <div>
                  <div className="font-serif font-medium text-base text-[#171717]">Alex Morgan</div>
                  <div className="text-[11px] font-mono text-[#6F6A61]">Passport: GB ••••921</div>
                </div>
              </div>
            </div>

            {/* SIDEBAR NAVIGATION LINKS */}
            <div className="space-y-1 font-mono text-xs">
              {[
                { id: 'overview', label: 'Overview', icon: Compass },
                { id: 'my-trips', label: 'My Trips', icon: Briefcase },
                { id: 'saved-flights', label: 'Saved Flights', icon: Bookmark },
                { id: 'price-alerts', label: 'Price Alerts', icon: Bell },
                { id: 'travel-documents', label: 'Travel Documents', icon: FileText },
                { id: 'flight-status', label: 'Flight Status', icon: Activity },
              ].map(item => {
                const Icon = item.icon;
                const isActive = activeSidebarTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.id === 'flight-status') {
                        setIsFlightStatusOpen(true);
                      } else {
                        setActiveSidebarTab(item.id as SidebarTab);
                      }
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-[8px] transition-all text-left ${
                      isActive
                        ? 'bg-[#EFE9DE] text-[#963F24] font-bold shadow-xs'
                        : 'text-[#6F6A61] hover:text-[#171717] hover:bg-[#F6F2EA]'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#963F24]' : 'text-[#6F6A61]'}`} />
                      <span>{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#963F24]" />}
                  </button>
                );
              })}
            </div>

            {/* QUICK ACTIONS */}
            <div className="mt-8 pt-5 border-t border-[#D8D1C5] space-y-2">
              <button
                onClick={() => setActiveView('marketing')}
                className="w-full h-11 rounded-[8px] bg-[#963F24] hover:bg-[#7E331B] text-[#FFFFFF] font-mono text-xs uppercase tracking-wider font-semibold flex items-center justify-center space-x-2 transition-colors shadow-sm"
              >
                <Search className="w-3.5 h-3.5" />
                <span>BOOK A NEW FLIGHT</span>
              </button>

              <button
                onClick={() => setIsBoardingPassOpen(true)}
                className="w-full h-11 rounded-[8px] bg-[#FFFFFF] hover:bg-[#EFE9DE] text-[#171717] border border-[#D8D1C5] font-mono text-xs uppercase tracking-wider font-semibold flex items-center justify-center space-x-2 transition-colors"
              >
                <QrCode className="w-3.5 h-3.5 text-[#963F24]" />
                <span>VIEW BOARDING PASS</span>
              </button>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="lg:col-span-9 space-y-8">
            
            {/* TAB: OVERVIEW */}
            {activeSidebarTab === 'overview' && (
              <div className="space-y-8">
                
                {/* HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-mono tracking-widest text-[#59604F] uppercase font-medium block mb-1">
                      EDITORIAL TRAVEL DESK
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-serif font-light text-[#171717] tracking-tight leading-none uppercase">
                      GOOD MORNING, ALEX.
                    </h1>
                    <p className="text-sm sm:text-base text-[#6F6A61] mt-2 font-sans">
                      Your next journey begins in <strong className="text-[#963F24] font-semibold">12 days</strong>.
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setActiveSidebarTab('my-trips')}
                      className="px-4 py-2.5 rounded-[8px] bg-[#FFFFFF] hover:bg-[#EFE9DE] text-[#171717] border border-[#D8D1C5] font-mono text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      ALL JOURNEYS ({myBookings.length})
                    </button>
                  </div>
                </div>

                {/* LARGE UPCOMING TRIP CARD: DEL → LHR */}
                <div className="bg-[#FFFFFF] rounded-[12px] border border-[#D8D1C5] shadow-[0_20px_60px_rgba(23,23,23,0.06)] overflow-hidden">
                  
                  {/* CARD HERO BANNER WITH TRAVEL PHOTOGRAPHY */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                    <img
                      src={flagshipUpcomingTrip.image}
                      alt="London Heathrow corridor"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/40 to-transparent" />

                    {/* OVERLAID FLIGHT BADGE & ROUTE */}
                    <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
                      <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#FFFFFF]/90 text-[#171717] border border-white/20 font-mono text-xs font-semibold">
                        <span>{flagshipUpcomingTrip.airline}</span>
                        <span className="text-[#963F24] font-bold">{flagshipUpcomingTrip.flightNumber}</span>
                      </div>

                      <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#59604F] text-[#FFFFFF] font-mono text-xs font-semibold tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-[#FFFFFF] animate-pulse" />
                        <span>STATUS: {flagshipUpcomingTrip.status}</span>
                      </div>
                    </div>

                    {/* ROUTE TITLE & DEPARTURE DATE OVERLAY */}
                    <div className="absolute bottom-6 left-6 right-6 text-[#FFFFFF] flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                      <div>
                        <div className="text-4xl sm:text-6xl font-serif font-normal tracking-tight">
                          {flagshipUpcomingTrip.route}
                        </div>
                        <div className="text-sm font-mono text-[#EFE9DE]/90 mt-1">
                          {flagshipUpcomingTrip.originCity} to {flagshipUpcomingTrip.destCity} &bull; {flagshipUpcomingTrip.aircraft}
                        </div>
                      </div>

                      <div className="sm:text-right">
                        <div className="text-xs font-mono uppercase tracking-widest text-[#EFE9DE]/80">Departure Date</div>
                        <div className="text-xl sm:text-2xl font-serif font-light text-[#FFFFFF]">
                          {flagshipUpcomingTrip.date}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* FLIGHT TELEMETRY GRID */}
                  <div className="p-6 sm:p-8">
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-[#D8D1C5]/60 font-mono">
                      
                      {/* DEPARTURE */}
                      <div className="pt-3 sm:pt-0 sm:px-2">
                        <span className="text-3xl sm:text-4xl font-serif font-bold text-[#171717] block">
                          {flagshipUpcomingTrip.departureTime}
                        </span>
                        <span className="text-[11px] uppercase tracking-wider text-[#6F6A61] block mt-1">
                          Departure
                        </span>
                        <span className="text-[10px] text-[#59604F] block">Indira Gandhi (DEL)</span>
                      </div>

                      {/* ARRIVAL */}
                      <div className="pt-3 sm:pt-0 sm:px-2">
                        <span className="text-3xl sm:text-4xl font-serif font-bold text-[#171717] block">
                          {flagshipUpcomingTrip.arrivalTime}
                        </span>
                        <span className="text-[11px] uppercase tracking-wider text-[#6F6A61] block mt-1">
                          Arrival
                        </span>
                        <span className="text-[10px] text-[#59604F] block">Heathrow (LHR)</span>
                      </div>

                      {/* GATE */}
                      <div className="pt-3 sm:pt-0 sm:px-2">
                        <span className="text-3xl sm:text-4xl font-serif font-bold text-[#171717] block">
                          {flagshipUpcomingTrip.gate}
                        </span>
                        <span className="text-[11px] uppercase tracking-wider text-[#6F6A61] block mt-1">
                          Gate
                        </span>
                        <span className="text-[10px] text-[#6F6A61] block">Terminal {flagshipUpcomingTrip.terminal}</span>
                      </div>

                      {/* SEAT */}
                      <div className="pt-3 sm:pt-0 sm:px-2">
                        <span className="text-3xl sm:text-4xl font-serif font-bold text-[#963F24] block">
                          {flagshipUpcomingTrip.seat}
                        </span>
                        <span className="text-[11px] uppercase tracking-wider text-[#6F6A61] block mt-1">
                          Seat
                        </span>
                        <span className="text-[10px] text-[#6F6A61] block">Club World Suite</span>
                      </div>

                      {/* BAGGAGE */}
                      <div className="col-span-2 sm:col-span-1 pt-3 sm:pt-0 sm:px-2">
                        <span className="text-3xl sm:text-4xl font-serif font-bold text-[#171717] block">
                          {flagshipUpcomingTrip.baggage}
                        </span>
                        <span className="text-[11px] uppercase tracking-wider text-[#6F6A61] block mt-1">
                          Baggage
                        </span>
                        <span className="text-[10px] text-[#59604F] block">Checked Allowance</span>
                      </div>
                    </div>

                    {/* CARD FOOTER ACTIONS */}
                    <div className="mt-8 pt-6 border-t border-[#D8D1C5] flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center space-x-2 text-xs font-mono text-[#6F6A61]">
                        <span>Booking Reference:</span>
                        <strong className="text-[#171717] tracking-widest">{flagshipUpcomingTrip.reference}</strong>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          onClick={() => setIsBoardingPassOpen(true)}
                          className="h-11 px-5 rounded-[8px] bg-[#963F24] hover:bg-[#7E331B] text-[#FFFFFF] font-mono text-xs uppercase tracking-wider font-semibold flex items-center space-x-2 transition-colors shadow-sm"
                        >
                          <QrCode className="w-4 h-4" />
                          <span>VIEW BOARDING PASS</span>
                        </button>

                        <button
                          onClick={() => {
                            if (featuredTrip) setSelectedTripDetails(featuredTrip);
                            else setActiveSidebarTab('my-trips');
                          }}
                          className="h-11 px-5 rounded-[8px] bg-[#FFFFFF] hover:bg-[#EFE9DE] text-[#171717] border border-[#D8D1C5] font-mono text-xs uppercase tracking-wider font-semibold flex items-center space-x-2 transition-colors"
                        >
                          <FileText className="w-4 h-4 text-[#6F6A61]" />
                          <span>TRIP DETAILS</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RECENT ACTIVITY & TRAVEL DOCUMENTS SUMMARY */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* TRAVEL DOCUMENTS CARD */}
                  <div className="bg-[#FFFFFF] p-6 rounded-[12px] border border-[#D8D1C5] space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#D8D1C5]">
                      <div className="font-serif font-medium text-lg text-[#171717]">Travel Documents</div>
                      <span className="text-[10px] font-mono text-[#59604F] bg-[#59604F]/10 px-2 py-0.5 rounded">
                        2 VALID
                      </span>
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                      <div className="p-3 rounded-[8px] bg-[#F6F2EA] border border-[#D8D1C5] flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-4 h-4 text-[#963F24]" />
                          <div>
                            <div className="font-semibold text-[#171717]">British Biometric Passport</div>
                            <div className="text-[10px] text-[#6F6A61]">Exp: 2031 &bull; Verified</div>
                          </div>
                        </div>
                        <Shield className="w-4 h-4 text-[#59604F]" />
                      </div>

                      <div className="p-3 rounded-[8px] bg-[#F6F2EA] border border-[#D8D1C5] flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-4 h-4 text-[#963F24]" />
                          <div>
                            <div className="font-semibold text-[#171717]">Indian ETA / Business Visa</div>
                            <div className="text-[10px] text-[#6F6A61]">Multiple Entry &bull; Active</div>
                          </div>
                        </div>
                        <Shield className="w-4 h-4 text-[#59604F]" />
                      </div>
                    </div>
                  </div>

                  {/* PRICE ALERTS & SAVED ROUTES */}
                  <div className="bg-[#FFFFFF] p-6 rounded-[12px] border border-[#D8D1C5] space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#D8D1C5]">
                      <div className="font-serif font-medium text-lg text-[#171717]">Saved Watchlists</div>
                      <span className="text-[10px] font-mono text-[#963F24] bg-[#963F24]/10 px-2 py-0.5 rounded">
                        FARES DROPPING
                      </span>
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                      <div className="p-3 rounded-[8px] bg-[#F6F2EA] border border-[#D8D1C5] flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-[#171717]">DEL ➔ HND (Tokyo)</div>
                          <div className="text-[10px] text-[#6F6A61]">ANA All Nippon &bull; Nov 2026</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-[#963F24]">₹64,200</div>
                          <div className="text-[10px] text-[#59604F]">↓ ₹5,400 lowest</div>
                        </div>
                      </div>

                      <div className="p-3 rounded-[8px] bg-[#F6F2EA] border border-[#D8D1C5] flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-[#171717]">BOM ➔ CDG (Paris)</div>
                          <div className="text-[10px] text-[#6F6A61]">Air France &bull; Dec 2026</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-[#171717]">₹52,800</div>
                          <div className="text-[10px] text-[#6F6A61]">Typical fare</div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB: MY TRIPS */}
            {activeSidebarTab === 'my-trips' && (
              <div className="space-y-8">
                
                {/* HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#D8D1C5]">
                  <div>
                    <span className="text-[11px] font-mono tracking-widest text-[#59604F] uppercase font-medium block mb-1">
                      VOYAGER ARCHIVE
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#171717] tracking-tight leading-none uppercase">
                      YOUR JOURNEYS
                    </h2>
                    <p className="text-sm text-[#6F6A61] mt-1 font-sans">
                      Everything you've reserved and completed across AERIVA.
                    </p>
                  </div>

                  {/* FILTER BUTTONS: UPCOMING / COMPLETED / CANCELLED */}
                  <div className="flex space-x-2 bg-[#FFFFFF] p-1 rounded-[8px] border border-[#D8D1C5] font-mono text-xs">
                    {(['upcoming', 'completed', 'cancelled'] as TripsFilter[]).map(tab => (
                      <button
                        key={tab}
                        onClick={() => setTripsFilter(tab)}
                        className={`px-4 py-2 rounded-[6px] capitalize transition-colors ${
                          tripsFilter === tab
                            ? 'bg-[#171717] text-[#FFFFFF] font-semibold'
                            : 'text-[#6F6A61] hover:text-[#171717]'
                        }`}
                      >
                        {tab} ({myBookings.filter(b => (tab === 'cancelled' ? b.status === 'Cancelled' : b.status !== 'Cancelled')).length})
                      </button>
                    ))}
                  </div>
                </div>

                {/* LARGE FEATURED TRIP CARD WITH CINEMATIC PHOTOGRAPHY */}
                {tripsFilter === 'upcoming' && (
                  <div className="bg-[#FFFFFF] rounded-[12px] border border-[#D8D1C5] overflow-hidden shadow-[0_20px_60px_rgba(23,23,23,0.06)]">
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                      <div className="lg:col-span-5 h-64 lg:h-auto relative overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80"
                          alt="London Westminster"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/80 lg:from-transparent to-transparent" />
                        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#FFFFFF]/90 font-mono text-[10px] font-bold text-[#963F24] tracking-widest uppercase">
                          FEATURED JOURNEY
                        </div>
                      </div>

                      <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                        <div>
                          <div className="flex items-center justify-between pb-3 border-b border-[#D8D1C5]">
                            <div className="flex items-center space-x-2">
                              <span className="font-serif font-bold text-base text-[#171717]">Emirates EK 513</span>
                              <span className="text-xs font-mono text-[#6F6A61]">&bull; Boeing 777-300ER</span>
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full bg-[#59604F]/10 text-[#59604F] font-mono text-xs font-semibold">
                              ON TIME
                            </span>
                          </div>

                          <div className="py-4 flex items-center justify-between">
                            <div>
                              <div className="text-3xl sm:text-4xl font-serif font-bold text-[#171717]">DEL</div>
                              <div className="text-xs text-[#6F6A61]">Delhi, India</div>
                              <div className="text-sm font-mono font-medium text-[#963F24] mt-1">02:45</div>
                            </div>

                            <div className="flex flex-col items-center px-4">
                              <span className="text-[10px] font-mono text-[#6F6A61]">8h 30m</span>
                              <Plane className="w-4 h-4 text-[#963F24] rotate-90 my-1" />
                              <span className="text-[9px] font-mono text-[#59604F]">Non-Stop</span>
                            </div>

                            <div className="text-right">
                              <div className="text-3xl sm:text-4xl font-serif font-bold text-[#171717]">LHR</div>
                              <div className="text-xs text-[#6F6A61]">London, UK</div>
                              <div className="text-sm font-mono font-medium text-[#963F24] mt-1">07:15</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#D8D1C5] font-mono text-xs">
                            <div>
                              <span className="text-[10px] text-[#6F6A61] uppercase block">Date</span>
                              <strong className="text-[#171717]">18 SEP 2026</strong>
                            </div>
                            <div>
                              <span className="text-[10px] text-[#6F6A61] uppercase block">Gate</span>
                              <strong className="text-[#171717]">B12 (T3)</strong>
                            </div>
                            <div>
                              <span className="text-[10px] text-[#6F6A61] uppercase block">Seat</span>
                              <strong className="text-[#963F24]">18A (Suite)</strong>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#D8D1C5]">
                          <div className="text-xs font-mono text-[#6F6A61]">
                            Ref: <strong className="text-[#171717]">ARV7K92</strong>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setIsBoardingPassOpen(true)}
                              className="h-10 px-4 rounded-[8px] bg-[#963F24] hover:bg-[#7E331B] text-[#FFFFFF] font-mono text-xs uppercase tracking-wider font-semibold transition-colors flex items-center space-x-1.5"
                            >
                              <QrCode className="w-3.5 h-3.5" />
                              <span>BOARDING PASS</span>
                            </button>

                            <button
                              onClick={() => {
                                if (featuredTrip) setSelectedTripDetails(featuredTrip);
                              }}
                              className="h-10 px-4 rounded-[8px] bg-[#FFFFFF] hover:bg-[#EFE9DE] text-[#171717] border border-[#D8D1C5] font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
                            >
                              DETAILS
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TRIP LIST - REFINED EDITORIAL TILES (NOT TINY ADMIN CARDS) */}
                <div className="space-y-4">
                  {filteredBookings.map(b => (
                    <div
                      key={b.id}
                      className="bg-[#FFFFFF] p-6 rounded-[12px] border border-[#D8D1C5] shadow-xs hover:border-[#171717] transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl font-serif font-bold text-[#171717]">
                            {b.flight.to.city.toUpperCase()}
                          </span>
                          <span className="text-xs font-mono text-[#6F6A61]">
                            {b.flight.from.code} ➔ {b.flight.to.code}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-[4px] bg-[#EFE9DE] text-[#171717] font-mono text-[10px] font-semibold">
                            {b.flight.airline} {b.flight.flightNumber}
                          </span>
                        </div>

                        <div className="text-xs text-[#6F6A61] font-mono flex flex-wrap items-center gap-4">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#963F24]" />
                            {b.flight.departureDate} at {b.flight.departureTime}
                          </span>
                          <span>&bull;</span>
                          <span>Passenger: <strong className="text-[#171717]">{b.passengers[0]?.firstName} {b.passengers[0]?.lastName}</strong></span>
                          <span>&bull;</span>
                          <span>Seat: <strong className="text-[#963F24]">{b.passengers[0]?.seatId || '18A'}</strong></span>
                          <span>&bull;</span>
                          <span>Ref: <strong className="text-[#171717]">{b.reference}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 font-mono text-xs shrink-0">
                        <button
                          onClick={() => setSelectedTripDetails(b)}
                          className="h-10 px-4 rounded-[8px] bg-[#FFFFFF] hover:bg-[#EFE9DE] text-[#171717] border border-[#D8D1C5] font-semibold uppercase tracking-wider transition-colors"
                        >
                          TRIP DETAILS
                        </button>

                        <button
                          onClick={() => setIsBoardingPassOpen(true)}
                          className="h-10 px-4 rounded-[8px] bg-[#963F24] hover:bg-[#7E331B] text-[#FFFFFF] font-semibold uppercase tracking-wider transition-colors shadow-xs"
                        >
                          PASS
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* TAB: SAVED FLIGHTS */}
            {activeSidebarTab === 'saved-flights' && (
              <div className="bg-[#FFFFFF] p-8 rounded-[12px] border border-[#D8D1C5] space-y-6">
                <div>
                  <h2 className="text-2xl font-serif font-light text-[#171717] uppercase">SAVED ITINERARIES</h2>
                  <p className="text-xs font-mono text-[#6F6A61] mt-1">Routes you are monitoring for upcoming journeys.</p>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  <div className="p-4 rounded-[8px] bg-[#F6F2EA] border border-[#D8D1C5] flex items-center justify-between">
                    <div>
                      <div className="text-base font-serif font-bold text-[#171717]">DEL ➔ JFK (New York)</div>
                      <div className="text-[11px] text-[#6F6A61]">Air India &bull; Non-Stop &bull; Boeing 777</div>
                    </div>
                    <button
                      onClick={() => setActiveView('marketing')}
                      className="px-4 py-2 rounded-[8px] bg-[#963F24] text-[#FFFFFF] font-semibold uppercase tracking-wider"
                    >
                      SEARCH FARES
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: PRICE ALERTS */}
            {activeSidebarTab === 'price-alerts' && (
              <div className="bg-[#FFFFFF] p-8 rounded-[12px] border border-[#D8D1C5] space-y-6">
                <div>
                  <h2 className="text-2xl font-serif font-light text-[#171717] uppercase">PRICE INTELLIGENCE NOTIFICATIONS</h2>
                  <p className="text-xs font-mono text-[#6F6A61] mt-1">Real-time alerts when ticket rates reach target levels.</p>
                </div>

                <div className="p-4 rounded-[8px] bg-[#59604F]/10 border border-[#59604F]/20 text-[#59604F] text-xs font-mono">
                  All active trackers are synced to your registered address: alex.morgan@aeriva.travel
                </div>
              </div>
            )}

            {/* TAB: TRAVEL DOCUMENTS */}
            {activeSidebarTab === 'travel-documents' && (
              <div className="bg-[#FFFFFF] p-8 rounded-[12px] border border-[#D8D1C5] space-y-6">
                <div>
                  <h2 className="text-2xl font-serif font-light text-[#171717] uppercase">TRAVEL DOCUMENTS & VISAS</h2>
                  <p className="text-xs font-mono text-[#6F6A61] mt-1">Encrypted travel credentials for biometric seamless airport passage.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                  <div className="p-5 rounded-[8px] bg-[#F6F2EA] border border-[#D8D1C5] space-y-2">
                    <span className="text-[10px] text-[#6F6A61] uppercase block">Primary Document</span>
                    <div className="text-base font-serif font-bold text-[#171717]">United Kingdom Passport</div>
                    <div className="text-xs text-[#6F6A61]">Number: GB8923419 &bull; Verified</div>
                  </div>

                  <div className="p-5 rounded-[8px] bg-[#F6F2EA] border border-[#D8D1C5] space-y-2">
                    <span className="text-[10px] text-[#6F6A61] uppercase block">Electronic Visa</span>
                    <div className="text-base font-serif font-bold text-[#171717]">Republic of India e-Visa</div>
                    <div className="text-xs text-[#59604F]">Status: Active &bull; Multi-entry</div>
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>

      {/* TRIP DETAILS MODAL: FLIGHT, PASSENGERS, SEAT, BAGGAGE, DOCUMENTS, BOARDING PASS */}
      {selectedTripDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[rgba(23,23,23,0.25)] overflow-y-auto">
          <div className="bg-[#FFFFFF] w-full max-w-3xl rounded-[12px] border border-[#D8D1C5] shadow-[0_20px_60px_rgba(23,23,23,0.12)] p-6 sm:p-8 my-auto relative text-[#171717] space-y-6">
            
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between pb-4 border-b border-[#D8D1C5]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#59604F] font-semibold block">
                  TRIP ARCHIVE &bull; REFERENCE #{selectedTripDetails.reference}
                </span>
                <h3 className="text-2xl font-serif font-light text-[#171717]">
                  {selectedTripDetails.flight.from.city} to {selectedTripDetails.flight.to.city}
                </h3>
              </div>

              <button
                onClick={() => setSelectedTripDetails(null)}
                className="p-2 rounded-[8px] hover:bg-[#EFE9DE] text-[#6F6A61] hover:text-[#171717] transition-colors font-mono text-xs"
              >
                ✕ Close
              </button>
            </div>

            {/* SECTIONS: FLIGHT, PASSENGERS, SEAT, BAGGAGE, DOCUMENTS, BOARDING PASS */}
            <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-1">
              
              {/* 1. FLIGHT DETAILS */}
              <div className="p-4 rounded-[8px] bg-[#F6F2EA] border border-[#D8D1C5] space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between font-bold text-[#171717]">
                  <span className="flex items-center gap-2">
                    <Plane className="w-4 h-4 text-[#963F24]" />
                    {selectedTripDetails.flight.airline} {selectedTripDetails.flight.flightNumber}
                  </span>
                  <span className="text-[#59604F]">CLASS: {selectedTripDetails.farePackage.name.toUpperCase()}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] pt-2 border-t border-[#D8D1C5]">
                  <div>
                    <span className="text-[#6F6A61] block">Departure</span>
                    <strong className="text-[#171717]">{selectedTripDetails.flight.departureTime}</strong>
                  </div>
                  <div>
                    <span className="text-[#6F6A61] block">Arrival</span>
                    <strong className="text-[#171717]">{selectedTripDetails.flight.arrivalTime}</strong>
                  </div>
                  <div>
                    <span className="text-[#6F6A61] block">Aircraft</span>
                    <strong className="text-[#171717]">{selectedTripDetails.flight.aircraft}</strong>
                  </div>
                  <div>
                    <span className="text-[#6F6A61] block">Date</span>
                    <strong className="text-[#171717]">{selectedTripDetails.flight.departureDate}</strong>
                  </div>
                </div>
              </div>

              {/* 2. PASSENGERS & SEAT */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-4 rounded-[8px] bg-[#FFFFFF] border border-[#D8D1C5] space-y-2">
                  <span className="text-[10px] uppercase text-[#6F6A61] block">Passenger</span>
                  <div className="text-sm font-serif font-bold text-[#171717]">
                    {selectedTripDetails.passengers[0]?.firstName} {selectedTripDetails.passengers[0]?.lastName}
                  </div>
                  <div className="text-[10px] text-[#6F6A61]">
                    Passport: {selectedTripDetails.passengers[0]?.passportNumber || 'GB8923419'}
                  </div>
                </div>

                <div className="p-4 rounded-[8px] bg-[#FFFFFF] border border-[#D8D1C5] space-y-2">
                  <span className="text-[10px] uppercase text-[#6F6A61] block">Seat & Cabin</span>
                  <div className="text-sm font-mono font-bold text-[#963F24]">
                    {selectedTripDetails.passengers[0]?.seatId || '18A'}
                  </div>
                  <div className="text-[10px] text-[#59604F]">Window Suite &bull; Pitch 38"</div>
                </div>
              </div>

              {/* 3. BAGGAGE & DOCUMENTS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-4 rounded-[8px] bg-[#FFFFFF] border border-[#D8D1C5] space-y-2">
                  <span className="text-[10px] uppercase text-[#6F6A61] block">Baggage Allowance</span>
                  <div className="text-sm font-mono font-bold text-[#171717]">
                    23 KG Checked &bull; 7 KG Cabin
                  </div>
                  <div className="text-[10px] text-[#6F6A61]">Included with fare tier</div>
                </div>

                <div className="p-4 rounded-[8px] bg-[#FFFFFF] border border-[#D8D1C5] space-y-2">
                  <span className="text-[10px] uppercase text-[#6F6A61] block">Documents & Clearance</span>
                  <div className="text-sm font-mono font-bold text-[#59604F]">
                    ICAO Biometric Verified
                  </div>
                  <div className="text-[10px] text-[#6F6A61]">Direct security lane access</div>
                </div>
              </div>

              {/* 4. CANONICAL BOARDING PASS INTEGRATION */}
              <div className="pt-2">
                <span className="text-[10px] font-mono uppercase text-[#6F6A61] tracking-wider block mb-2">
                  Digital Boarding Pass Preview
                </span>
                <BoardingPass
                  passenger={selectedTripDetails.passengers[0] || { firstName: 'Alex', lastName: 'Morgan', seatId: '18A' }}
                  flight={selectedTripDetails.flight}
                  reference={selectedTripDetails.reference}
                  cabinClass={selectedTripDetails.farePackage.name}
                  gate="B12"
                  boardingTime="45m Prior"
                  showAnimation={true}
                />
              </div>

            </div>

            {/* MODAL FOOTER */}
            <div className="pt-4 border-t border-[#D8D1C5] flex items-center justify-end space-x-3 font-mono text-xs">
              <button
                onClick={() => setIsBoardingPassOpen(true)}
                className="h-11 px-5 rounded-[8px] bg-[#963F24] hover:bg-[#7E331B] text-[#FFFFFF] font-semibold uppercase tracking-wider transition-colors shadow-sm"
              >
                OPEN DIGITAL PASS
              </button>

              <button
                onClick={() => setSelectedTripDetails(null)}
                className="h-11 px-4 rounded-[8px] bg-[#EFE9DE] text-[#171717] hover:bg-[#D8D1C5] font-semibold uppercase tracking-wider transition-colors"
              >
                DONE
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
