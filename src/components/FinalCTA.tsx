import React from 'react';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const FinalCTA: React.FC = () => {
  const { searchFlights } = useBooking();

  const handleSearchAction = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const bookingEl = document.getElementById('booking-engine-section');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickExplore = () => {
    searchFlights();
  };

  return (
    <section className="relative py-32 sm:py-44 px-6 sm:px-10 lg:px-12 bg-cream text-ink overflow-hidden border-t border-border">
      {/* Full-bleed Travel Photography Container */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop"
          alt="Golden hour coastal horizon"
          className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.05] saturate-[0.95]"
        />
        {/* Warm Golden Hour & Sand Editorial Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-cream/90 via-cream/60 to-transparent" />
        <div className="absolute inset-0 bg-[#E89E6C]/10 mix-blend-color" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Subtle Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper border border-border text-xs uppercase tracking-[0.25em] font-mono text-warm-gray mb-8 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-terracotta" />
          <span>Your Horizon Awaits</span>
        </div>

        {/* Editorial Headline */}
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-ink leading-[0.95] mb-6 uppercase">
          WHERE WILL<br />
          YOU GO NEXT?
        </h2>

        {/* Subtext */}
        <p className="max-w-xl mx-auto text-base sm:text-lg font-sans text-warm-gray font-light leading-relaxed mb-10">
          The world is wide and unhurried. Search, compare, and reserve the journey you deserve in effortless moments.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={handleSearchAction}
            className="h-12 px-8 rounded-[8px] bg-[#963F24] hover:bg-[#7E331B] active:bg-[#682915] text-white font-sans text-xs uppercase tracking-widest font-semibold transition-all shadow-sm hover:shadow-md flex items-center gap-2.5 cursor-pointer select-none"
          >
            <span>SEARCH FLIGHTS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleQuickExplore}
            className="px-8 py-4 rounded-xl bg-paper border border-border hover:border-ink/50 text-ink font-mono text-xs uppercase tracking-widest font-semibold transition-all shadow-sm hover:shadow-md flex items-center gap-2.5"
          >
            <Compass className="w-4 h-4 text-terracotta" />
            <span>Explore Global Routes</span>
          </button>
        </div>

        {/* Quiet assurance text */}
        <div className="mt-12 text-xs font-mono text-warm-gray uppercase tracking-widest">
          Transparent Fares &bull; Flexible Rescheduling &bull; 24/7 Global Concierge
        </div>
      </div>
    </section>
  );
};
