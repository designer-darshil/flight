import React from 'react';
import { BookingProvider, useBooking } from './context/BookingContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BookingEngine } from './components/BookingEngine';
import { DestinationExplorer } from './components/DestinationExplorer';
import { ProductSearchSection } from './components/ProductSearchSection';
import { PriceIntelligence } from './components/PriceIntelligence';
import { JourneyGlobe3D } from './components/JourneyGlobe3D';
import { DashboardShowcase } from './components/DashboardShowcase';
import { TripDashboardSection } from './components/TripDashboardSection';
import { DigitalBoardingPassSection } from './components/DigitalBoardingPassSection';
import { TravelMoments } from './components/TravelMoments';
import { SmartDeals } from './components/SmartDeals';
import { TrustStatement } from './components/TrustStatement';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';

// Application & Modal Overlays
import { FlightResultsApp } from './components/FlightResultsApp';
import { UserDashboard } from './components/UserDashboard';
import { SearchLoading } from './components/SearchLoading';
import { DatePickerModal } from './components/DatePickerModal';
import { DigitalBoardingPassModal } from './components/DigitalBoardingPassModal';
import { FareSelectorModal } from './components/FareSelectorModal';
import { SeatMapModal } from './components/SeatMapModal';
import { PassengerFormModal } from './components/PassengerFormModal';
import { PaymentModal } from './components/PaymentModal';
import { BookingConfirmation } from './components/BookingConfirmation';
import { FlightStatusModal } from './components/FlightStatusModal';
import { MyTripsModal } from './components/MyTripsModal';
import { DesignFoundationShowcase } from './components/DesignFoundationShowcase';
import { ComponentLibraryShowcase } from './components/ComponentLibraryShowcase';
import { Sparkles, Layers } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeView, currentStep, isFlightStatusOpen, isMyTripsOpen, setActiveView, setSearchParams } = useBooking();
  const [isFoundationOpen, setIsFoundationOpen] = React.useState(false);
  const [isComponentLibOpen, setIsComponentLibOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-cream text-ink flex flex-col selection:bg-terracotta/20 selection:text-terracotta antialiased">
      
      {/* Global Minimal Editorial Navigation Bar */}
      <Navbar />

      {/* RENDER ACTIVE VIEW */}
      {activeView === 'marketing' && (
        <main className="flex-1">
          {/* 1. Full-Bleed Coastal Approach Hero with Editorial Headline */}
          <Hero />

          {/* 2. Floating Physical White Booking Panel Anchored Over Hero Bottom */}
          <div
            id="booking-engine-section"
            className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-24 md:-mt-32 mb-16"
          >
            <BookingEngine />
          </div>

          {/* 3. Destination Discovery: WHERE WILL YOU GO NEXT? (Tokyo Hero + Lisbon, Dubai, Paris, Bali, NYC) */}
          <div id="explore-section">
            <DestinationExplorer />
          </div>

          {/* 4. Product Search Section: THE BETTER WAY TO BOOK (Editorial narrative + Live Flight Search App) */}
          <ProductSearchSection />

          {/* 5. Price Intelligence: KNOW BEFORE YOU BOOK (30-day algorithmic line chart + Good Time to Book) */}
          <PriceIntelligence />

          {/* 6. Three.js 3D Earth Globe: ONE JOURNEY. MANY MOMENTS. */}
          <JourneyGlobe3D />

          {/* 7. Product Showcase: EVERYTHING IN ITS PLACE (Floating perspective UI cards) */}
          <DashboardShowcase />

          {/* 8. Live Trip Dashboard Preview: YOUR NEXT JOURNEY */}
          <TripDashboardSection 
            onOpenDashboard={() => setActiveView('dashboard')}
            onExploreFlight={(fromCode, toCode) => {
              setSearchParams(prev => ({
                ...prev,
                from: { ...prev.from, code: fromCode },
                to: { ...prev.to, code: toCode }
              }));
              const el = document.getElementById('booking-engine-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* 9. Tactile Digital Boarding Pass */}
          <DigitalBoardingPassSection 
            onBookNow={() => {
              const el = document.getElementById('booking-engine-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* 10. Sensory Travel Moments: THE JOURNEY MATTERS TOO (06:42, 18:20, 23:11) */}
          <TravelMoments />

          {/* 11. Curated Smart Deals: SOME JOURNEYS ARE WORTH BOOKING EARLY */}
          <SmartDeals />

          {/* 12. Minimal Trust Statement: 1.2M+ Travelers Rely on AERIVA */}
          <TrustStatement />

          {/* 13. High-Impact Final Travel Image & CTA: WHERE WILL YOU GO NEXT? */}
          <FinalCTA />

          {/* 14. Global Warm-White Footer */}
          <Footer />
        </main>
      )}

      {activeView === 'results' && (
        <main className="flex-1 pt-20">
          <FlightResultsApp />
          <Footer />
        </main>
      )}

      {activeView === 'dashboard' && (
        <main className="flex-1 pt-20">
          <UserDashboard />
          <Footer />
        </main>
      )}

      {/* FULL SCREEN SEARCH RADAR TRANSITION */}
      <SearchLoading />

      {/* DUAL-MONTH CALENDAR MODAL */}
      <DatePickerModal />

      {/* DIGITAL BOARDING PASS WITH PERFORATED TICKET AESTHETIC */}
      <DigitalBoardingPassModal />

      {/* STEP MODALS IN BOOKING JOURNEY */}
      {currentStep === 'fare' && <FareSelectorModal />}
      {currentStep === 'seats' && <SeatMapModal />}
      {currentStep === 'passengers' && <PassengerFormModal />}
      {currentStep === 'payment' && <PaymentModal />}
      {currentStep === 'confirmation' && <BookingConfirmation />}

      {/* DEDICATED TRACKER & MY TRIPS MODALS */}
      {isFlightStatusOpen && <FlightStatusModal />}
      {isMyTripsOpen && <MyTripsModal />}

      {/* PHASE 01 & PHASE 02 DESIGN SYSTEM INSPECTOR */}
      <div className="fixed bottom-5 left-5 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsFoundationOpen(true)}
          className="px-3.5 py-2 rounded-lg bg-surface border border-border text-ink hover:border-ink shadow-sm text-xs font-mono font-semibold flex items-center gap-1.5 transition-all hover:shadow-md cursor-pointer select-none"
          title="View AERIVA Phase 01 Design System Specifications"
        >
          <Sparkles className="w-3.5 h-3.5 text-accent-primary" />
          <span className="hidden sm:inline">Foundation</span>
          <span className="px-1.5 py-0.5 rounded bg-sand text-[10px] text-warm-gray">Phase 01</span>
        </button>

        <button
          onClick={() => setIsComponentLibOpen(true)}
          className="px-3.5 py-2 rounded-lg bg-surface border border-border text-ink hover:border-ink shadow-sm text-xs font-mono font-semibold flex items-center gap-1.5 transition-all hover:shadow-md cursor-pointer select-none"
          title="View AERIVA Phase 02 Core UI Component Library"
        >
          <Layers className="w-3.5 h-3.5 text-[#596052]" />
          <span className="hidden sm:inline">Component Library</span>
          <span className="px-1.5 py-0.5 rounded bg-sand text-[10px] text-warm-gray">Phase 02</span>
        </button>
      </div>

      <DesignFoundationShowcase
        isOpen={isFoundationOpen}
        onClose={() => setIsFoundationOpen(false)}
      />

      <ComponentLibraryShowcase
        isOpen={isComponentLibOpen}
        onClose={() => setIsComponentLibOpen(false)}
      />
    </div>
  );
};

export function App() {
  return (
    <BookingProvider>
      <MainContent />
    </BookingProvider>
  );
}

export default App;
