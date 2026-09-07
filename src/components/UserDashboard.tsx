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
  User,
  Settings,
  CreditCard,
  Check,
  Plus,
  Trash2,
  Globe,
  Lock,
  ShieldCheck,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { BoardingPass } from './BoardingPass';
import { Booking, Currency } from '../types';

type SidebarTab =
  | 'overview'
  | 'my-trips'
  | 'profile'
  | 'settings'
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
    currency,
    setCurrency,
  } = useBooking();

  const [activeSidebarTab, setActiveSidebarTab] = useState<SidebarTab>('overview');
  const [tripsFilter, setTripsFilter] = useState<TripsFilter>('upcoming');
  const [selectedTripDetails, setSelectedTripDetails] = useState<Booking | null>(null);

  // Profile State: Personal Information
  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'Alex',
    lastName: 'Morgan',
    email: 'alex.morgan@aeriva.travel',
    phone: '+44 7911 123456',
    dob: '1988-05-14',
    nationality: 'United Kingdom',
    passportNumber: 'GB8923419',
    address: '24 Kensington Park Gardens, London, W11 2ET',
  });
  const [isSavedPersonal, setIsSavedPersonal] = useState(false);

  // Profile State: Travel Preferences
  const [travelPreferences, setTravelPreferences] = useState({
    seatChoice: 'Window Suite',
    mealChoice: 'Plant-Based Gourmet',
    cabinDefault: 'Business Class',
    departureWindow: 'Morning (06:00 - 12:00)',
    frequentFlyerBA: 'BA-92384102 (Gold)',
    frequentFlyerEK: 'EK-88192301 (Platinum)',
  });

  // Profile State: Saved Passengers
  const [savedPassengers, setSavedPassengers] = useState([
    {
      id: 'p1',
      name: 'Alex Morgan',
      relationship: 'Primary Traveler (Self)',
      passport: 'GB ••••921',
      dob: '14 May 1988',
      nationality: 'British',
      isPrimary: true,
    },
    {
      id: 'p2',
      name: 'Elena Rostova',
      relationship: 'Companion',
      passport: 'FR ••••482',
      dob: '22 Aug 1991',
      nationality: 'French',
      isPrimary: false,
    },
    {
      id: 'p3',
      name: 'Marcus Vance',
      relationship: 'Colleague',
      passport: 'US ••••109',
      dob: '03 Nov 1985',
      nationality: 'American',
      isPrimary: false,
    },
  ]);
  const [newPassengerName, setNewPassengerName] = useState('');
  const [newPassengerPassport, setNewPassengerPassport] = useState('');
  const [newPassengerRelation, setNewPassengerRelation] = useState('Companion');
  const [showAddPassengerModal, setShowAddPassengerModal] = useState(false);

  // Profile State: Payment Methods
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 'pm1',
      type: 'American Express Centurion',
      last4: '8821',
      exp: '09/28',
      holder: 'Alex Morgan',
      isDefault: true,
    },
    {
      id: 'pm2',
      type: 'Chase Sapphire Reserve',
      last4: '4019',
      exp: '11/27',
      holder: 'Alex Morgan',
      isDefault: false,
    },
    {
      id: 'pm3',
      type: 'Apple Pay (Voyager Express)',
      last4: 'Device Secure Token',
      exp: 'Synced',
      holder: 'Alex Morgan',
      isDefault: false,
    },
  ]);

  // Profile State: Travel Documents
  const [travelDocumentsList] = useState([
    {
      id: 'doc1',
      title: 'United Kingdom Passport',
      docNumber: 'GB8923419',
      status: 'Verified',
      expires: '12 OCT 2031',
      type: 'Biometric E-Passport',
    },
    {
      id: 'doc2',
      title: 'Republic of India e-Visa',
      docNumber: 'EV-IND-882910',
      status: 'Active',
      expires: '20 OCT 2027',
      type: 'Multi-Entry Business & Tourist',
    },
    {
      id: 'doc3',
      title: 'United States ESTA Clearance',
      docNumber: 'ESTA-9920198',
      status: 'Active',
      expires: '15 DEC 2026',
      type: 'Electronic Travel Authorization',
    },
  ]);

  // Profile State: Notifications
  const [notificationSettings, setNotificationSettings] = useState({
    flightStatusSMS: true,
    gateChangePush: true,
    priceIntelligence: true,
    boardingPassReady: true,
    editorialDispatch: false,
  });

  // Settings State: Grouped Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    biometricPasskey: true,
    sessionTimeout: '30 days',
  });
  const [regionalSettings, setRegionalSettings] = useState({
    language: 'English (UK)',
    clockFormat: '24h',
    unitSystem: 'Metric (KG)',
  });
  const [privacySettings, setPrivacySettings] = useState({
    radarTelemetrySharing: true,
    confidentialTravelMode: false,
    anonymousAnalytics: false,
  });

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
            <button
              onClick={() => setActiveSidebarTab('profile')}
              className="w-9 h-9 rounded-full bg-[#171717] text-[#FFFFFF] hover:ring-2 hover:ring-[#963F24] flex items-center justify-center font-bold text-xs shadow-sm transition-all"
              title="Alex Morgan Profile"
            >
              AM
            </button>
          </div>
        </div>
      </div>

      {/* DASHBOARD LAYOUT: CREAM/WHITE SIDEBAR + MAIN CONTENT */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* SIDEBAR NAVIGATION - CREAM / WHITE, NO DARK / NO BLUE */}
          <aside className="lg:col-span-3 bg-[#FFFFFF] rounded-[12px] border border-[#D8D1C5] p-5 shadow-[0_4px_20px_rgba(23,23,23,0.04)] sticky top-24">
            
            {/* USER MINI PROFILE */}
            <div 
              onClick={() => setActiveSidebarTab('profile')}
              className="pb-5 mb-5 border-b border-[#D8D1C5] cursor-pointer group hover:opacity-90 transition-opacity"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-[10px] bg-[#EFE9DE] border border-[#D8D1C5] flex items-center justify-center font-serif text-lg font-bold text-[#171717] group-hover:border-[#963F24] transition-colors">
                  AM
                </div>
                <div>
                  <div className="font-serif font-medium text-base text-[#171717] group-hover:text-[#963F24] transition-colors">Alex Morgan</div>
                  <div className="text-[11px] font-mono text-[#6F6A61]">Passport: GB ••••921</div>
                </div>
              </div>
            </div>

            {/* SIDEBAR NAVIGATION LINKS */}
            <div className="space-y-1 font-mono text-xs">
              {[
                { id: 'overview', label: 'Overview', icon: Compass },
                { id: 'my-trips', label: 'My Trips', icon: Briefcase },
                { id: 'profile', label: 'Profile', icon: User },
                { id: 'settings', label: 'Settings', icon: Settings },
                { id: 'travel-documents', label: 'Travel Documents', icon: FileText },
                { id: 'saved-flights', label: 'Saved Flights', icon: Bookmark },
                { id: 'price-alerts', label: 'Price Alerts', icon: Bell },
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

            {/* TAB: PROFILE — ALEX MORGAN */}
            {activeSidebarTab === 'profile' && (
              <div className="space-y-8">
                
                {/* PROFILE HERO HEADER */}
                <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-[12px] border border-[#D8D1C5] shadow-[0_4px_20px_rgba(23,23,23,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-center space-x-5">
                    <div className="w-20 h-20 rounded-[12px] bg-[#EFE9DE] border border-[#D8D1C5] flex items-center justify-center font-serif text-3xl font-light text-[#171717] shadow-xs">
                      AM
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-[10px] font-mono tracking-widest text-[#59604F] uppercase font-bold px-2 py-0.5 rounded bg-[#59604F]/10">
                          SAPPHIRE SKY TIER
                        </span>
                        <span className="text-[10px] font-mono text-[#6F6A61]">
                          MEMBER #ARV-882910
                        </span>
                      </div>
                      <h1 className="text-3xl sm:text-4xl font-serif font-light text-[#171717] tracking-tight leading-none uppercase">
                        ALEX MORGAN
                      </h1>
                      <p className="text-xs text-[#6F6A61] font-mono mt-1.5 flex items-center gap-2">
                        <span>alex.morgan@aeriva.travel</span>
                        <span>&bull;</span>
                        <span>United Kingdom</span>
                        <span>&bull;</span>
                        <span className="text-[#59604F] font-semibold">Verified Voyager</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setActiveSidebarTab('settings')}
                      className="h-11 px-4 rounded-[8px] bg-[#FFFFFF] hover:bg-[#EFE9DE] text-[#171717] border border-[#D8D1C5] font-mono text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 transition-colors"
                    >
                      <Settings className="w-3.5 h-3.5 text-[#6F6A61]" />
                      <span>ACCOUNT SETTINGS</span>
                    </button>
                  </div>
                </div>

                {/* 1. PERSONAL INFORMATION */}
                <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-[12px] border border-[#D8D1C5] shadow-[0_4px_20px_rgba(23,23,23,0.03)] space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[#D8D1C5]">
                    <div>
                      <h2 className="text-xl font-serif font-medium text-[#171717] uppercase">
                        Personal Information
                      </h2>
                      <p className="text-xs font-mono text-[#6F6A61] mt-0.5">
                        Legal identity records synced with government travel manifests.
                      </p>
                    </div>
                    {isSavedPersonal && (
                      <span className="text-xs font-mono text-[#59604F] flex items-center gap-1.5 font-bold animate-fade-in">
                        <Check className="w-4 h-4" />
                        <span>Changes Saved</span>
                      </span>
                    )}
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setIsSavedPersonal(true);
                      setTimeout(() => setIsSavedPersonal(false), 3500);
                    }}
                    className="space-y-4 font-sans text-xs"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono font-medium text-[#6F6A61] uppercase tracking-wider mb-1.5">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={personalInfo.firstName}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                          className="w-full h-12 px-4 rounded-[8px] border border-[#D8D1C5] bg-[#FFFFFF] text-sm text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#963F24]/30 focus:border-[#963F24]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono font-medium text-[#6F6A61] uppercase tracking-wider mb-1.5">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={personalInfo.lastName}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                          className="w-full h-12 px-4 rounded-[8px] border border-[#D8D1C5] bg-[#FFFFFF] text-sm text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#963F24]/30 focus:border-[#963F24]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono font-medium text-[#6F6A61] uppercase tracking-wider mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={personalInfo.email}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                          className="w-full h-12 px-4 rounded-[8px] border border-[#D8D1C5] bg-[#FFFFFF] text-sm text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#963F24]/30 focus:border-[#963F24]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono font-medium text-[#6F6A61] uppercase tracking-wider mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={personalInfo.phone}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                          className="w-full h-12 px-4 rounded-[8px] border border-[#D8D1C5] bg-[#FFFFFF] text-sm text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#963F24]/30 focus:border-[#963F24]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono font-medium text-[#6F6A61] uppercase tracking-wider mb-1.5">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          value={personalInfo.dob}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, dob: e.target.value })}
                          className="w-full h-12 px-4 rounded-[8px] border border-[#D8D1C5] bg-[#FFFFFF] text-sm text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#963F24]/30 focus:border-[#963F24]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono font-medium text-[#6F6A61] uppercase tracking-wider mb-1.5">
                          Nationality
                        </label>
                        <input
                          type="text"
                          value={personalInfo.nationality}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, nationality: e.target.value })}
                          className="w-full h-12 px-4 rounded-[8px] border border-[#D8D1C5] bg-[#FFFFFF] text-sm text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#963F24]/30 focus:border-[#963F24]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono font-medium text-[#6F6A61] uppercase tracking-wider mb-1.5">
                          Passport Number
                        </label>
                        <input
                          type="text"
                          value={personalInfo.passportNumber}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, passportNumber: e.target.value })}
                          className="w-full h-12 px-4 rounded-[8px] border border-[#D8D1C5] bg-[#FFFFFF] text-sm font-mono text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#963F24]/30 focus:border-[#963F24]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-medium text-[#6F6A61] uppercase tracking-wider mb-1.5">
                        Residential Address
                      </label>
                      <input
                        type="text"
                        value={personalInfo.address}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                        className="w-full h-12 px-4 rounded-[8px] border border-[#D8D1C5] bg-[#FFFFFF] text-sm text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#963F24]/30 focus:border-[#963F24]"
                      />
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        className="h-12 px-6 rounded-[8px] bg-[#963F24] hover:bg-[#7E331B] text-[#FFFFFF] font-mono text-xs uppercase tracking-wider font-semibold transition-colors shadow-xs"
                      >
                        SAVE PERSONAL INFORMATION
                      </button>
                    </div>
                  </form>
                </div>

                {/* 2. TRAVEL PREFERENCES */}
                <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-[12px] border border-[#D8D1C5] shadow-[0_4px_20px_rgba(23,23,23,0.03)] space-y-6">
                  <div className="pb-4 border-b border-[#D8D1C5]">
                    <h2 className="text-xl font-serif font-medium text-[#171717] uppercase">
                      Travel Preferences
                    </h2>
                    <p className="text-xs font-mono text-[#6F6A61] mt-0.5">
                      Aviation ergonomics applied automatically during seat selection and dining.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
                    {/* Seating Preference */}
                    <div className="space-y-2.5">
                      <label className="block text-[11px] font-bold text-[#171717] uppercase tracking-wider">
                        Seat Assignment Preference
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {['Window Suite', 'Aisle Access', 'Extra Legroom'].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setTravelPreferences({ ...travelPreferences, seatChoice: opt })}
                            className={`p-3 rounded-[8px] border text-center transition-all ${
                              travelPreferences.seatChoice === opt
                                ? 'border-[#963F24] bg-[#963F24] text-[#FFFFFF] font-bold'
                                : 'border-[#D8D1C5] bg-[#F6F2EA] text-[#171717] hover:border-[#171717]'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Meal Preference */}
                    <div className="space-y-2.5">
                      <label className="block text-[11px] font-bold text-[#171717] uppercase tracking-wider">
                        In-Flight Dining Preference
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {['Plant-Based Gourmet', 'International Standard', 'Halal Menu', 'Kosher Certified'].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setTravelPreferences({ ...travelPreferences, mealChoice: opt })}
                            className={`p-3 rounded-[8px] border text-center transition-all text-[11px] ${
                              travelPreferences.mealChoice === opt
                                ? 'border-[#963F24] bg-[#963F24] text-[#FFFFFF] font-bold'
                                : 'border-[#D8D1C5] bg-[#F6F2EA] text-[#171717] hover:border-[#171717]'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Default Cabin Class */}
                    <div className="space-y-2.5">
                      <label className="block text-[11px] font-bold text-[#171717] uppercase tracking-wider">
                        Default Cabin Tier
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {['Business Class', 'First Suite', 'Premium Economy'].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setTravelPreferences({ ...travelPreferences, cabinDefault: opt })}
                            className={`p-3 rounded-[8px] border text-center transition-all ${
                              travelPreferences.cabinDefault === opt
                                ? 'border-[#963F24] bg-[#963F24] text-[#FFFFFF] font-bold'
                                : 'border-[#D8D1C5] bg-[#F6F2EA] text-[#171717] hover:border-[#171717]'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Departure Window */}
                    <div className="space-y-2.5">
                      <label className="block text-[11px] font-bold text-[#171717] uppercase tracking-wider">
                        Preferred Departure Time
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {['Morning (06:00 - 12:00)', 'Afternoon (12:00 - 18:00)', 'Night / Red-Eye'].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setTravelPreferences({ ...travelPreferences, departureWindow: opt })}
                            className={`p-3 rounded-[8px] border text-center transition-all text-[11px] ${
                              travelPreferences.departureWindow === opt
                                ? 'border-[#963F24] bg-[#963F24] text-[#FFFFFF] font-bold'
                                : 'border-[#D8D1C5] bg-[#F6F2EA] text-[#171717] hover:border-[#171717]'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Frequent Flyer Programs */}
                  <div className="pt-4 border-t border-[#D8D1C5]">
                    <span className="block text-[11px] font-mono font-bold text-[#171717] uppercase tracking-wider mb-3">
                      Synced Frequent Flyer Programs
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                      <div className="p-3.5 rounded-[8px] bg-[#F6F2EA] border border-[#D8D1C5] flex items-center justify-between">
                        <div>
                          <div className="font-bold text-[#171717]">British Airways Executive Club</div>
                          <div className="text-[11px] text-[#59604F] font-semibold">{travelPreferences.frequentFlyerBA}</div>
                        </div>
                        <span className="text-[10px] text-[#59604F] bg-[#59604F]/10 px-2 py-0.5 rounded font-bold">EMERALD</span>
                      </div>

                      <div className="p-3.5 rounded-[8px] bg-[#F6F2EA] border border-[#D8D1C5] flex items-center justify-between">
                        <div>
                          <div className="font-bold text-[#171717]">Emirates Skywards</div>
                          <div className="text-[11px] text-[#59604F] font-semibold">{travelPreferences.frequentFlyerEK}</div>
                        </div>
                        <span className="text-[10px] text-[#963F24] bg-[#963F24]/10 px-2 py-0.5 rounded font-bold">PLATINUM</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. SAVED PASSENGERS */}
                <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-[12px] border border-[#D8D1C5] shadow-[0_4px_20px_rgba(23,23,23,0.03)] space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[#D8D1C5]">
                    <div>
                      <h2 className="text-xl font-serif font-medium text-[#171717] uppercase">
                        Saved Passengers
                      </h2>
                      <p className="text-xs font-mono text-[#6F6A61] mt-0.5">
                        Pre-cleared travelers for 1-click booking allocation.
                      </p>
                    </div>

                    <button
                      onClick={() => setShowAddPassengerModal(true)}
                      className="h-10 px-3.5 rounded-[8px] bg-[#FFFFFF] hover:bg-[#EFE9DE] border border-[#D8D1C5] text-[#171717] font-mono text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#963F24]" />
                      <span>ADD PASSENGER</span>
                    </button>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    {savedPassengers.map((p) => (
                      <div
                        key={p.id}
                        className="p-4 rounded-[8px] bg-[#F6F2EA] border border-[#D8D1C5] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-[#EFE9DE] border border-[#D8D1C5] flex items-center justify-center font-bold text-[#171717] text-xs">
                            {p.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-serif font-bold text-sm text-[#171717]">{p.name}</span>
                              {p.isPrimary && (
                                <span className="text-[10px] bg-[#963F24] text-white px-2 py-0.5 rounded font-mono font-bold">
                                  PRIMARY
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-[#6F6A61] mt-0.5">
                              {p.relationship} &bull; Passport: {p.passport} &bull; DOB: {p.dob} &bull; {p.nationality}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 self-end sm:self-center">
                          <span className="text-[10px] text-[#59604F] bg-[#59604F]/10 px-2 py-1 rounded font-bold">
                            VERIFIED
                          </span>
                          {!p.isPrimary && (
                            <button
                              onClick={() => setSavedPassengers(savedPassengers.filter((x) => x.id !== p.id))}
                              className="p-1.5 rounded hover:bg-[#D8D1C5] text-[#6F6A61] hover:text-[#963F24] transition-colors"
                              title="Remove passenger"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* MODAL / DRAWER: ADD PASSENGER */}
                  {showAddPassengerModal && (
                    <div className="p-4 rounded-[8px] bg-[#FFFFFF] border-2 border-dashed border-[#D8D1C5] space-y-3 mt-4">
                      <div className="flex items-center justify-between font-bold text-xs font-mono text-[#171717]">
                        <span>ADD NEW PASSENGER DOSSIER</span>
                        <button
                          onClick={() => setShowAddPassengerModal(false)}
                          className="text-[#6F6A61] hover:text-[#171717]"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                        <input
                          type="text"
                          placeholder="Full Name (as on passport)"
                          value={newPassengerName}
                          onChange={(e) => setNewPassengerName(e.target.value)}
                          className="h-11 px-3 rounded-[8px] border border-[#D8D1C5] bg-[#FFFFFF]"
                        />
                        <input
                          type="text"
                          placeholder="Passport Number"
                          value={newPassengerPassport}
                          onChange={(e) => setNewPassengerPassport(e.target.value)}
                          className="h-11 px-3 rounded-[8px] border border-[#D8D1C5] bg-[#FFFFFF]"
                        />
                        <select
                          value={newPassengerRelation}
                          onChange={(e) => setNewPassengerRelation(e.target.value)}
                          className="h-11 px-3 rounded-[8px] border border-[#D8D1C5] bg-[#FFFFFF]"
                        >
                          <option value="Companion">Companion</option>
                          <option value="Family Member">Family Member</option>
                          <option value="Colleague">Colleague</option>
                        </select>
                      </div>

                      <div className="flex justify-end space-x-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowAddPassengerModal(false)}
                          className="h-10 px-4 rounded-[8px] bg-[#EFE9DE] text-[#171717] text-xs font-mono font-semibold"
                        >
                          CANCEL
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (newPassengerName && newPassengerPassport) {
                              setSavedPassengers([
                                ...savedPassengers,
                                {
                                  id: `p${Date.now()}`,
                                  name: newPassengerName,
                                  relationship: newPassengerRelation,
                                  passport: newPassengerPassport,
                                  dob: '01 Jan 1990',
                                  nationality: 'British',
                                  isPrimary: false,
                                },
                              ]);
                              setNewPassengerName('');
                              setNewPassengerPassport('');
                              setShowAddPassengerModal(false);
                            }
                          }}
                          className="h-10 px-5 rounded-[8px] bg-[#963F24] text-white text-xs font-mono font-semibold"
                        >
                          SAVE COMPANION
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. PAYMENT METHODS */}
                <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-[12px] border border-[#D8D1C5] shadow-[0_4px_20px_rgba(23,23,23,0.03)] space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[#D8D1C5]">
                    <div>
                      <h2 className="text-xl font-serif font-medium text-[#171717] uppercase">
                        Payment Methods
                      </h2>
                      <p className="text-xs font-mono text-[#6F6A61] mt-0.5">
                        Encrypted payment vaults with zero plain-text storage.
                      </p>
                    </div>

                    <button
                      onClick={() => alert('Add Payment Card modal ready')}
                      className="h-10 px-3.5 rounded-[8px] bg-[#FFFFFF] hover:bg-[#EFE9DE] border border-[#D8D1C5] text-[#171717] font-mono text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#963F24]" />
                      <span>ADD CARD</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                    {paymentMethods.map((pm) => (
                      <div
                        key={pm.id}
                        className={`p-5 rounded-[10px] border relative transition-all ${
                          pm.isDefault
                            ? 'bg-[#FFFFFF] border-[#963F24] shadow-xs'
                            : 'bg-[#F6F2EA] border-[#D8D1C5]'
                        }`}
                      >
                        {pm.isDefault && (
                          <span className="absolute top-4 right-4 text-[10px] font-bold bg-[#963F24] text-white px-2 py-0.5 rounded">
                            DEFAULT
                          </span>
                        )}

                        <div className="flex items-center space-x-2 text-[#963F24] mb-3">
                          <CreditCard className="w-5 h-5" />
                          <span className="font-bold uppercase tracking-wider text-[11px] text-[#171717]">
                            {pm.type}
                          </span>
                        </div>

                        <div className="text-lg font-mono tracking-widest text-[#171717] font-semibold my-2">
                          •••• {pm.last4}
                        </div>

                        <div className="flex justify-between items-center text-[10px] text-[#6F6A61] pt-2 border-t border-[#D8D1C5]">
                          <span>{pm.holder}</span>
                          <span>EXP: {pm.exp}</span>
                        </div>

                        {!pm.isDefault && (
                          <button
                            onClick={() =>
                              setPaymentMethods(
                                paymentMethods.map((m) => ({
                                  ...m,
                                  isDefault: m.id === pm.id,
                                }))
                              )
                            }
                            className="mt-3 w-full py-1.5 rounded-[6px] bg-[#EFE9DE] hover:bg-[#D8D1C5] text-[10px] font-bold uppercase tracking-wider text-[#171717] transition-colors text-center"
                          >
                            SET AS DEFAULT
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. TRAVEL DOCUMENTS */}
                <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-[12px] border border-[#D8D1C5] shadow-[0_4px_20px_rgba(23,23,23,0.03)] space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[#D8D1C5]">
                    <div>
                      <h2 className="text-xl font-serif font-medium text-[#171717] uppercase">
                        Travel Documents
                      </h2>
                      <p className="text-xs font-mono text-[#6F6A61] mt-0.5">
                        Biometric passports and electronic consular visas.
                      </p>
                    </div>

                    <button
                      onClick={() => alert('Document upload modal ready')}
                      className="h-10 px-3.5 rounded-[8px] bg-[#FFFFFF] hover:bg-[#EFE9DE] border border-[#D8D1C5] text-[#171717] font-mono text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#963F24]" />
                      <span>UPLOAD DOCUMENT</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                    {travelDocumentsList.map((doc) => (
                      <div
                        key={doc.id}
                        className="p-5 rounded-[10px] bg-[#F6F2EA] border border-[#D8D1C5] space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase text-[#6F6A61]">{doc.type}</span>
                          <span className="text-[10px] font-bold text-[#59604F] bg-[#59604F]/10 px-2 py-0.5 rounded">
                            {doc.status}
                          </span>
                        </div>

                        <div>
                          <div className="font-serif font-bold text-base text-[#171717] leading-tight">
                            {doc.title}
                          </div>
                          <div className="text-xs text-[#963F24] font-bold mt-1">
                            {doc.docNumber}
                          </div>
                        </div>

                        <div className="text-[10px] text-[#6F6A61] pt-2 border-t border-[#D8D1C5]">
                          Expires: <strong className="text-[#171717]">{doc.expires}</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6. NOTIFICATIONS */}
                <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-[12px] border border-[#D8D1C5] shadow-[0_4px_20px_rgba(23,23,23,0.03)] space-y-6">
                  <div className="pb-4 border-b border-[#D8D1C5]">
                    <h2 className="text-xl font-serif font-medium text-[#171717] uppercase">
                      Notifications
                    </h2>
                    <p className="text-xs font-mono text-[#6F6A61] mt-0.5">
                      Tailor the frequency and channels of critical journey telemetry.
                    </p>
                  </div>

                  <div className="space-y-4 font-mono text-xs">
                    {[
                      {
                        key: 'flightStatusSMS',
                        title: 'Flight Status & Gate Telemetry via SMS',
                        desc: 'Real-time gate changes, boarding countdown, and luggage carousel assignments sent via SMS.',
                      },
                      {
                        key: 'gateChangePush',
                        title: 'Mobile App Push Notifications',
                        desc: 'Instant priority push notices on aircraft departure radar and boarding calls.',
                      },
                      {
                        key: 'priceIntelligence',
                        title: 'Price Intelligence & Fare Drops',
                        desc: 'Automated notification whenever monitored international routes drop below threshold.',
                      },
                      {
                        key: 'boardingPassReady',
                        title: 'Digital Boarding Pass Delivery',
                        desc: 'Automatic email and SMS push of encrypted boarding pass 24 hours prior to departure.',
                      },
                      {
                        key: 'editorialDispatch',
                        title: 'AERIVA Voyager Dispatch & Quarterly Journal',
                        desc: 'Curated architectural destination guides, seasonal routes, and aviation history essays.',
                      },
                    ].map((item) => {
                      const enabled = notificationSettings[item.key as keyof typeof notificationSettings];
                      return (
                        <div
                          key={item.key}
                          className="p-4 rounded-[8px] bg-[#F6F2EA] border border-[#D8D1C5] flex items-center justify-between gap-4"
                        >
                          <div className="space-y-0.5">
                            <div className="font-bold text-[#171717] text-xs">{item.title}</div>
                            <div className="text-[11px] text-[#6F6A61] font-sans">{item.desc}</div>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              setNotificationSettings({
                                ...notificationSettings,
                                [item.key]: !enabled,
                              })
                            }
                            className={`h-7 px-3 rounded-[6px] font-mono text-[10px] font-bold uppercase tracking-wider transition-colors shrink-0 ${
                              enabled
                                ? 'bg-[#59604F] text-[#FFFFFF]'
                                : 'bg-[#D8D1C5] text-[#6F6A61]'
                            }`}
                          >
                            {enabled ? 'ENABLED' : 'DISABLED'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* TAB: SETTINGS — GROUPED SETTINGS (NO DOZENS OF RANDOM TOGGLES) */}
            {activeSidebarTab === 'settings' && (
              <div className="space-y-8">
                
                {/* HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-[#D8D1C5]">
                  <div>
                    <span className="text-[11px] font-mono tracking-widest text-[#59604F] uppercase font-bold block mb-1">
                      VOYAGER PREFERENCES
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-serif font-light text-[#171717] tracking-tight leading-none uppercase">
                      SYSTEM SETTINGS
                    </h1>
                    <p className="text-xs font-mono text-[#6F6A61] mt-1.5">
                      Structured account governance, regional preferences, and security parameters.
                    </p>
                  </div>
                </div>

                {/* GROUP 1: ACCOUNT SECURITY */}
                <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-[12px] border border-[#D8D1C5] shadow-[0_4px_20px_rgba(23,23,23,0.03)] space-y-6">
                  <div className="flex items-center space-x-3 pb-4 border-b border-[#D8D1C5]">
                    <div className="w-9 h-9 rounded-[8px] bg-[#EFE9DE] flex items-center justify-center text-[#963F24]">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-lg font-serif font-medium text-[#171717] uppercase">
                        Account Security
                      </h2>
                      <p className="text-xs font-mono text-[#6F6A61]">
                        Authentication keys, passwords, and cryptographic device authorizations.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 font-mono text-xs">
                    {/* 2FA Item */}
                    <div className="p-4 rounded-[8px] bg-[#F6F2EA] border border-[#D8D1C5] flex items-center justify-between">
                      <div>
                        <div className="font-bold text-[#171717]">Two-Factor Authentication (2FA)</div>
                        <div className="text-[11px] text-[#6F6A61] font-sans mt-0.5">
                          Requires TOTP authenticator code on each new sign-in attempt.
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          setSecuritySettings({
                            ...securitySettings,
                            twoFactorAuth: !securitySettings.twoFactorAuth,
                          })
                        }
                        className={`h-7 px-3 rounded-[6px] text-[10px] font-bold uppercase tracking-wider transition-colors ${
                          securitySettings.twoFactorAuth
                            ? 'bg-[#59604F] text-[#FFFFFF]'
                            : 'bg-[#D8D1C5] text-[#6F6A61]'
                        }`}
                      >
                        {securitySettings.twoFactorAuth ? 'ACTIVE' : 'OFF'}
                      </button>
                    </div>

                    {/* Biometric Passkey */}
                    <div className="p-4 rounded-[8px] bg-[#F6F2EA] border border-[#D8D1C5] flex items-center justify-between">
                      <div>
                        <div className="font-bold text-[#171717]">Biometric Touch / Face ID Passkey</div>
                        <div className="text-[11px] text-[#6F6A61] font-sans mt-0.5">
                          Seamless cryptographic boarding pass and payment verification.
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          setSecuritySettings({
                            ...securitySettings,
                            biometricPasskey: !securitySettings.biometricPasskey,
                          })
                        }
                        className={`h-7 px-3 rounded-[6px] text-[10px] font-bold uppercase tracking-wider transition-colors ${
                          securitySettings.biometricPasskey
                            ? 'bg-[#59604F] text-[#FFFFFF]'
                            : 'bg-[#D8D1C5] text-[#6F6A61]'
                        }`}
                      >
                        {securitySettings.biometricPasskey ? 'ENABLED' : 'OFF'}
                      </button>
                    </div>

                    {/* Password Management */}
                    <div className="p-4 rounded-[8px] bg-[#F6F2EA] border border-[#D8D1C5] flex items-center justify-between">
                      <div>
                        <div className="font-bold text-[#171717]">Password Management</div>
                        <div className="text-[11px] text-[#6F6A61] font-sans mt-0.5">
                          Last changed 42 days ago &bull; 256-bit hash encryption.
                        </div>
                      </div>
                      <button
                        onClick={() => alert('Password reset verification email dispatched to alex.morgan@aeriva.travel')}
                        className="h-9 px-4 rounded-[8px] bg-[#FFFFFF] border border-[#D8D1C5] hover:bg-[#EFE9DE] text-[#171717] font-semibold text-xs transition-colors"
                      >
                        UPDATE PASSWORD
                      </button>
                    </div>

                    {/* Trusted Sessions */}
                    <div className="p-4 rounded-[8px] bg-[#F6F2EA] border border-[#D8D1C5] flex items-center justify-between">
                      <div>
                        <div className="font-bold text-[#171717]">Active Trusted Sessions</div>
                        <div className="text-[11px] text-[#6F6A61] font-sans mt-0.5">
                          2 devices currently authorized (macOS Safari London, UK & iPhone 15 Pro Paris, FR).
                        </div>
                      </div>
                      <button
                        onClick={() => alert('All remote sessions invalidated except this browser')}
                        className="h-9 px-4 rounded-[8px] bg-[#EFE9DE] hover:bg-[#D8D1C5] text-[#963F24] font-semibold text-xs transition-colors"
                      >
                        SIGN OUT OTHER SESSIONS
                      </button>
                    </div>
                  </div>
                </div>

                {/* GROUP 2: CURRENCY & LOCALIZATION */}
                <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-[12px] border border-[#D8D1C5] shadow-[0_4px_20px_rgba(23,23,23,0.03)] space-y-6">
                  <div className="flex items-center space-x-3 pb-4 border-b border-[#D8D1C5]">
                    <div className="w-9 h-9 rounded-[8px] bg-[#EFE9DE] flex items-center justify-center text-[#963F24]">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-lg font-serif font-medium text-[#171717] uppercase">
                        Currency & Localization
                      </h2>
                      <p className="text-xs font-mono text-[#6F6A61]">
                        Financial units, regional languages, and aeronautical time systems.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-mono text-xs">
                    {/* Primary Currency Switcher */}
                    <div className="p-4 rounded-[8px] bg-[#F6F2EA] border border-[#D8D1C5] space-y-2">
                      <label className="block font-bold text-[#171717] uppercase tracking-wider text-[11px]">
                        Booking & Fare Currency
                      </label>
                      <div className="grid grid-cols-5 gap-1.5">
                        {(['USD', 'EUR', 'GBP', 'INR', 'AED'] as Currency[]).map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => setCurrency(c)}
                            className={`py-2 rounded-[6px] text-center font-bold text-xs transition-all ${
                              currency === c
                                ? 'bg-[#963F24] text-[#FFFFFF] shadow-xs'
                                : 'bg-[#FFFFFF] border border-[#D8D1C5] text-[#171717] hover:border-[#171717]'
                            }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                      <span className="block text-[10px] text-[#6F6A61] pt-1">
                        Active: <strong className="text-[#963F24]">{currency}</strong> (Updates all fare quotations globally)
                      </span>
                    </div>

                    {/* Regional Language */}
                    <div className="p-4 rounded-[8px] bg-[#F6F2EA] border border-[#D8D1C5] space-y-2">
                      <label className="block font-bold text-[#171717] uppercase tracking-wider text-[11px]">
                        Language & Dialect
                      </label>
                      <select
                        value={regionalSettings.language}
                        onChange={(e) => setRegionalSettings({ ...regionalSettings, language: e.target.value })}
                        className="w-full h-10 px-3 rounded-[6px] border border-[#D8D1C5] bg-[#FFFFFF] text-xs font-mono"
                      >
                        <option value="English (UK)">English (UK) — Standard</option>
                        <option value="English (US)">English (US)</option>
                        <option value="Français">Français (France)</option>
                        <option value="Deutsch">Deutsch (Deutschland)</option>
                        <option value="العربية">العربية (Emirates)</option>
                        <option value="हिन्दी">हिन्दी (India)</option>
                      </select>
                      <span className="block text-[10px] text-[#6F6A61] pt-1">
                        Applied across itinerary confirmation PDFs and terminal receipts.
                      </span>
                    </div>

                    {/* Clock & Timezone Format */}
                    <div className="p-4 rounded-[8px] bg-[#F6F2EA] border border-[#D8D1C5] space-y-2">
                      <label className="block font-bold text-[#171717] uppercase tracking-wider text-[11px]">
                        Time Format
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: '24h', label: '24-Hour Military (02:45 / 18:20)' },
                          { id: '12h', label: '12-Hour AM/PM (2:45 AM)' },
                        ].map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setRegionalSettings({ ...regionalSettings, clockFormat: t.id })}
                            className={`p-2 rounded-[6px] text-center text-[11px] font-mono transition-all ${
                              regionalSettings.clockFormat === t.id
                                ? 'bg-[#963F24] text-[#FFFFFF] font-bold'
                                : 'bg-[#FFFFFF] border border-[#D8D1C5] text-[#171717]'
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Measurement Standards */}
                    <div className="p-4 rounded-[8px] bg-[#F6F2EA] border border-[#D8D1C5] space-y-2">
                      <label className="block font-bold text-[#171717] uppercase tracking-wider text-[11px]">
                        Weight & Metric System
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'Metric (KG)', label: 'Kilograms (KG / KM)' },
                          { id: 'Imperial (LBS)', label: 'Pounds (LBS / MI)' },
                        ].map((u) => (
                          <button
                            key={u.id}
                            type="button"
                            onClick={() => setRegionalSettings({ ...regionalSettings, unitSystem: u.id })}
                            className={`p-2 rounded-[6px] text-center text-[11px] font-mono transition-all ${
                              regionalSettings.unitSystem === u.id
                                ? 'bg-[#963F24] text-[#FFFFFF] font-bold'
                                : 'bg-[#FFFFFF] border border-[#D8D1C5] text-[#171717]'
                            }`}
                          >
                            {u.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* GROUP 3: PRIVACY & DATA GOVERNANCE */}
                <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-[12px] border border-[#D8D1C5] shadow-[0_4px_20px_rgba(23,23,23,0.03)] space-y-6">
                  <div className="flex items-center space-x-3 pb-4 border-b border-[#D8D1C5]">
                    <div className="w-9 h-9 rounded-[8px] bg-[#EFE9DE] flex items-center justify-center text-[#963F24]">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-lg font-serif font-medium text-[#171717] uppercase">
                        Privacy & Data Governance
                      </h2>
                      <p className="text-xs font-mono text-[#6F6A61]">
                        Data telemetry retention and sovereign traveler record export.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 font-mono text-xs">
                    {/* Radar Telemetry */}
                    <div className="p-4 rounded-[8px] bg-[#F6F2EA] border border-[#D8D1C5] flex items-center justify-between">
                      <div>
                        <div className="font-bold text-[#171717]">In-Flight Radar Telemetry Sharing</div>
                        <div className="text-[11px] text-[#6F6A61] font-sans mt-0.5">
                          Share anonymized live aircraft position with designated emergency contacts.
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          setPrivacySettings({
                            ...privacySettings,
                            radarTelemetrySharing: !privacySettings.radarTelemetrySharing,
                          })
                        }
                        className={`h-7 px-3 rounded-[6px] text-[10px] font-bold uppercase tracking-wider transition-colors ${
                          privacySettings.radarTelemetrySharing
                            ? 'bg-[#59604F] text-[#FFFFFF]'
                            : 'bg-[#D8D1C5] text-[#6F6A61]'
                        }`}
                      >
                        {privacySettings.radarTelemetrySharing ? 'ENABLED' : 'DISABLED'}
                      </button>
                    </div>

                    {/* Confidential Travel Mode */}
                    <div className="p-4 rounded-[8px] bg-[#F6F2EA] border border-[#D8D1C5] flex items-center justify-between">
                      <div>
                        <div className="font-bold text-[#171717]">Confidential Travel Mode</div>
                        <div className="text-[11px] text-[#6F6A61] font-sans mt-0.5">
                          Suppresses booking records from auto-populating on shared enterprise browsers.
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          setPrivacySettings({
                            ...privacySettings,
                            confidentialTravelMode: !privacySettings.confidentialTravelMode,
                          })
                        }
                        className={`h-7 px-3 rounded-[6px] text-[10px] font-bold uppercase tracking-wider transition-colors ${
                          privacySettings.confidentialTravelMode
                            ? 'bg-[#59604F] text-[#FFFFFF]'
                            : 'bg-[#D8D1C5] text-[#6F6A61]'
                        }`}
                      >
                        {privacySettings.confidentialTravelMode ? 'ACTIVE' : 'OFF'}
                      </button>
                    </div>

                    {/* Data Archive Export */}
                    <div className="p-4 rounded-[8px] bg-[#F6F2EA] border border-[#D8D1C5] flex items-center justify-between">
                      <div>
                        <div className="font-bold text-[#171717]">Voyager Travel Dossier Export</div>
                        <div className="text-[11px] text-[#6F6A61] font-sans mt-0.5">
                          Download a signed JSON archive of all past boarding passes, payments, and flight manifests.
                        </div>
                      </div>
                      <button
                        onClick={() => alert('Exporting encrypted Voyager Dossier JSON (ARV-882910)...')}
                        className="h-9 px-4 rounded-[8px] bg-[#FFFFFF] border border-[#D8D1C5] hover:bg-[#EFE9DE] text-[#171717] font-semibold text-xs transition-colors"
                      >
                        EXPORT JSON
                      </button>
                    </div>
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
          <div className="bg-[#FFFFFF] w-full max-w-3xl rounded-[16px] border border-[#D8D1C5] shadow-[0_24px_60px_rgba(23,23,23,0.10)] p-6 sm:p-8 my-auto relative text-[#171717] space-y-6">
            
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
