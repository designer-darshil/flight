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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper/90 backdrop-blur-md border border-border text-xs uppercase tracking-[0.25em] font-mono text-warm-gray mb-8 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-terracotta" />
          <span>Your Horizon Awaits</span>
        </div>

        {/* Editorial Headline */}
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light text-ink tracking-tight leading-[1.08] mb-6">
          Where will you <br className="hidden sm:inline" />
          <span className="italic font-normal text-terracotta">go next?</span>
        </h2>

        {/* Subtext */}
        <p className="max-w-xl mx-auto text-base sm:text-xl font-serif text-warm-gray font-light leading-relaxed mb-10">
          The world is wide and unhurried. Search, compare, and reserve the journey you deserve in effortless moments.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={handleSearchAction}
            className="px-8 py-4 rounded-xl bg-terracotta text-paper font-mono text-xs uppercase tracking-widest font-semibold hover:bg-terracotta/90 transition-all shadow-lg hover:shadow-xl flex items-center gap-3 group"
          >
            <span>Search Your Next Flight</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={handleQuickExplore}
            className="px-8 py-4 rounded-xl bg-paper/95 backdrop-blur-md border border-border hover:border-ink/50 text-ink font-mono text-xs uppercase tracking-widest font-semibold transition-all shadow-sm hover:shadow-md flex items-center gap-2.5"
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
