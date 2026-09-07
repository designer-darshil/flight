import React from 'react';
import { Plane, Calendar, Clock, Luggage, ShieldCheck, ArrowUpRight, Compass } from 'lucide-react';

interface TripDashboardSectionProps {
  onOpenDashboard?: () => void;
  onExploreFlight?: (from: string, to: string) => void;
}

export const TripDashboardSection: React.FC<TripDashboardSectionProps> = ({
  onOpenDashboard,
  onExploreFlight
}) => {
  return (
    <section className="py-24 sm:py-32 bg-cream text-ink border-t border-border relative overflow-hidden">
      {/* Subtle architectural background grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{ 
          backgroundImage: 'radial-gradient(#171717 1px, transparent 1px)', 
          backgroundSize: '32px 32px' 
        }} 
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-terracotta" />
              <span className="text-xs uppercase tracking-[0.25em] text-warm-gray font-mono font-medium">
                Live Itinerary Management
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light tracking-tight text-ink">
              Your next journey, <br />
              <span className="italic font-normal">orchestrated seamlessly.</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenDashboard && onOpenDashboard()}
              className="group inline-flex items-center gap-2.5 text-sm uppercase tracking-wider font-mono text-ink hover:text-terracotta transition-colors pb-1 border-b border-ink/30 hover:border-terracotta"
            >
              <span>View Full Traveler Portal</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Dashboard Preview Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Active Flight Card */}
          <div className="lg:col-span-8 bg-paper rounded-2xl border border-border p-8 sm:p-10 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-sand/40 to-transparent pointer-events-none -mr-20 -mt-20 rounded-full" />

            {/* Card Header */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border/70">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-ink text-paper flex items-center justify-center font-mono text-xs font-semibold">
                    AM
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-warm-gray font-mono">Primary Passenger</div>
                    <div className="text-base font-medium text-ink">Alex Morgan</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-olive/10 text-olive text-xs font-mono font-medium tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-olive animate-pulse" />
                    CONFIRMED &bull; ON TIME
                  </span>
                  <span className="px-3 py-1 rounded-full bg-sand text-warm-gray text-xs font-mono">
                    REF: AER-8942
                  </span>
                </div>
              </div>

              {/* Route & Times */}
              <div className="py-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                {/* Departure */}
                <div>
                  <div className="text-4xl sm:text-5xl font-mono font-semibold tracking-tight text-ink">
                    02:45
                  </div>
                  <div className="text-sm font-serif font-medium text-ink mt-1">Delhi (DEL)</div>
                  <div className="text-xs text-warm-gray mt-0.5 font-mono">Indira Gandhi Intl T3</div>
                  <div className="text-xs text-warm-gray mt-2 flex items-center gap-1.5 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-terracotta" />
                    Fri, 18 Sep 2026
                  </div>
                </div>

                {/* Progress Graphic */}
                <div className="flex flex-col items-center justify-center px-4">
                  <div className="text-xs font-mono text-warm-gray mb-2 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    8h 30m &bull; Non-stop
                  </div>
                  <div className="w-full flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full border-2 border-ink bg-paper" />
                    <div className="flex-1 h-[2px] bg-border relative flex items-center justify-center">
                      <div className="absolute w-7 h-7 rounded-full bg-cream border border-border flex items-center justify-center text-terracotta">
                        <Plane className="w-3.5 h-3.5 rotate-90" />
                      </div>
                    </div>
                    <div className="w-2.5 h-2.5 rounded-full bg-ink" />
                  </div>
                  <div className="text-[11px] font-mono text-warm-gray/80 mt-2 uppercase tracking-wider">
                    Airbus A350-900 &bull; Club World
                  </div>
                </div>

                {/* Arrival */}
                <div className="md:text-right">
                  <div className="text-4xl sm:text-5xl font-mono font-semibold tracking-tight text-ink">
                    07:15
                  </div>
                  <div className="text-sm font-serif font-medium text-ink mt-1">London (LHR)</div>
                  <div className="text-xs text-warm-gray mt-0.5 font-mono">Heathrow Terminal 5</div>
                  <div className="text-xs text-warm-gray mt-2 flex md:justify-end items-center gap-1.5 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-terracotta" />
                    Fri, 18 Sep 2026
                  </div>
                </div>
              </div>
            </div>

            {/* Flight Vitals Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-xl bg-cream border border-border/80 text-center sm:text-left">
              <div>
                <div className="text-[11px] uppercase tracking-wider font-mono text-warm-gray">Flight</div>
                <div className="text-base font-mono font-medium text-ink mt-0.5">BA 142</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider font-mono text-warm-gray">Terminal / Gate</div>
                <div className="text-base font-mono font-medium text-ink mt-0.5">T3 &bull; Gate B12</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider font-mono text-warm-gray">Assigned Seat</div>
                <div className="text-base font-mono font-medium text-terracotta mt-0.5">18A (Suite Window)</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider font-mono text-warm-gray">Baggage Allowance</div>
                <div className="text-base font-mono font-medium text-ink mt-0.5 flex items-center justify-center sm:justify-start gap-1">
                  <Luggage className="w-4 h-4 text-warm-gray" />
                  2 &times; 32 kg
                </div>
              </div>
            </div>
          </div>

          {/* Side Module: Upcoming & Services */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Quick Status Box */}
            <div className="bg-sand/60 rounded-2xl border border-border p-6 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-wider font-mono text-warm-gray">Pre-Flight Checklist</span>
                  <ShieldCheck className="w-4 h-4 text-olive" />
                </div>
                
                <h3 className="text-xl font-serif font-light text-ink mb-4">
                  Ready for departure in <span className="font-normal text-terracotta">11 days</span>
                </h3>

                <ul className="space-y-3 font-mono text-xs text-ink/80">
                  <li className="flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-olive text-paper flex items-center justify-center text-[10px]">✓</span>
                    <span>Passport & UK Visa Verified</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-olive text-paper flex items-center justify-center text-[10px]">✓</span>
                    <span>Seat 18A Selected (Upper Deck)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-olive text-paper flex items-center justify-center text-[10px]">✓</span>
                    <span>Gourmet Chef Meal: Wild Salmon</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-warm-gray">
                    <span className="w-4 h-4 rounded-full border border-warm-gray/40 flex items-center justify-center text-[10px]">&bull;</span>
                    <span>Check-in opens 24h prior (17 Sep, 02:45)</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-border">
                <button
                  onClick={() => onExploreFlight && onExploreFlight('DEL', 'LHR')}
                  className="w-full py-3 px-4 rounded-xl bg-ink text-paper text-xs uppercase tracking-wider font-mono font-medium hover:bg-ink/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Compass className="w-4 h-4 text-champagne" />
                  <span>Explore Destination Guide</span>
                </button>
              </div>
            </div>

            {/* Small Lounge Access Feature */}
            <div className="bg-paper rounded-2xl border border-border p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center font-serif text-lg font-medium">
                  L
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider font-mono text-warm-gray">Complimentary Privilege</div>
                  <div className="text-sm font-medium text-ink">GVK Silver Lounge Access &bull; DEL T3</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
