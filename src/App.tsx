import React from 'react';
import { BookingProvider, useBooking } from './context/BookingContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BookingEngine } from './components/BookingEngine';
import { RouteSection } from './components/RouteSection';
import { DestinationExplorer } from './components/DestinationExplorer';
import { SmartDeals } from './components/SmartDeals';
import { PriceIntelligence } from './components/PriceIntelligence';
import { FeatureShowcase } from './components/FeatureShowcase';
import { DashboardShowcase } from './components/DashboardShowcase';
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

const MainContent: React.FC = () => {
  const { activeView, currentStep, isFlightStatusOpen, isMyTripsOpen } = useBooking();

  return (
    <div className="min-h-screen bg-aeriva-navy text-slate-100 flex flex-col selection:bg-aeriva-cyan/30 selection:text-aeriva-cyan antialiased">
      
      {/* Global Navigation Bar */}
      <Navbar />

      {/* RENDER ACTIVE VIEW */}
      {activeView === 'marketing' && (
        <main className="flex-1">
          {/* Hero Section with 3D Aircraft & Perspective Device */}
          <Hero />

          {/* Hero Booking Engine (Overlapping Hero Section) */}
          <div
            id="booking-engine-section"
            className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-24 md:-mt-32 mb-16"
          >
            <BookingEngine />
          </div>

          {/* Stylized Aviation Radar Route Section (DEL -> DXB -> LHR) */}
          <RouteSection />

          {/* Asymmetric Editorial Destination Discovery */}
          <div id="explore-section">
            <DestinationExplorer />
          </div>

          {/* Curated Smart Deals Grid */}
          <SmartDeals />

          {/* 30-Day Price Intelligence & Analytics */}
          <PriceIntelligence />

          {/* Product Feature Showcase */}
          <FeatureShowcase />

          {/* 3D Spatial Multi-Plane Dashboard Presentation */}
          <DashboardShowcase />

          {/* High-Impact Final Call to Action */}
          <FinalCTA />

          {/* Global Footer */}
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
