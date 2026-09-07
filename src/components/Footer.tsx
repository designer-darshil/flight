import React, { useState } from 'react';
import { Send, CheckCircle, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const handleSearchScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const el = document.getElementById('booking-engine-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-cream border-t border-border text-ink pt-20 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* Main Footer 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 pb-16 border-b border-border">
          
          {/* Col 1-4: AERIVA Brand & Philosophy */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-ink text-paper flex items-center justify-center">
                <svg className="w-4 h-4 text-paper" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L21 20L12 16L3 20L12 2Z" />
                </svg>
              </div>
              <span className="text-2xl font-serif tracking-widest font-light text-ink">
                AERIVA
              </span>
            </div>

            <p className="text-sm font-serif text-warm-gray leading-relaxed max-w-sm">
              Travel, thoughtfully booked. A calm, modern aviation platform marrying editorial grace with uncompromising engineering precision.
            </p>

            <div className="pt-2 text-xs font-mono text-warm-gray">
              <div>IATA ACCREDITED #9820-A</div>
              <div className="text-[11px] text-warm-gray/70 mt-0.5">NEW DELHI &bull; LONDON &bull; SINGAPORE</div>
            </div>
          </div>

          {/* Col 5-6: Flagship Journeys */}
          <div className="md:col-span-3 space-y-4 text-xs font-mono">
            <h4 className="font-semibold text-ink uppercase tracking-widest">Flagship Routes</h4>
            <ul className="space-y-2.5 text-warm-gray">
              <li>
                <button onClick={handleSearchScroll} className="hover:text-terracotta transition-colors text-left flex items-center gap-1 group">
                  <span>Delhi ➔ London Heathrow</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button onClick={handleSearchScroll} className="hover:text-terracotta transition-colors text-left flex items-center gap-1 group">
                  <span>Delhi ➔ Dubai International</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button onClick={handleSearchScroll} className="hover:text-terracotta transition-colors text-left flex items-center gap-1 group">
                  <span>Delhi ➔ Tokyo Haneda</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button onClick={handleSearchScroll} className="hover:text-terracotta transition-colors text-left flex items-center gap-1 group">
                  <span>Mumbai ➔ New York JFK</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button onClick={handleSearchScroll} className="hover:text-terracotta transition-colors text-left flex items-center gap-1 group">
                  <span>Singapore ➔ Paris CDG</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 7-8: Experiences */}
          <div className="md:col-span-2 space-y-4 text-xs font-mono">
            <h4 className="font-semibold text-ink uppercase tracking-widest">Aviation Suite</h4>
            <ul className="space-y-2.5 text-warm-gray">
              <li><span className="hover:text-ink cursor-pointer">First Class Suites</span></li>
              <li><span className="hover:text-ink cursor-pointer">Business Flatbeds</span></li>
              <li><span className="hover:text-ink cursor-pointer">Global Lounge Finder</span></li>
              <li><span className="hover:text-ink cursor-pointer">Live Baggage Radar</span></li>
              <li><span className="hover:text-ink cursor-pointer">Digital Wallet Passes</span></li>
            </ul>
          </div>

          {/* Col 9-12: Gazette / Fare Journal */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-semibold text-ink uppercase tracking-widest">
              The Private Gazette
            </h4>
            <p className="text-xs text-warm-gray leading-relaxed font-sans">
              Curated itinerary dispatches, unannounced route openings, and seasonal fare releases delivered fortnightly.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-paper border border-border px-3.5 py-2.5 rounded-l-xl text-xs font-sans text-ink placeholder-warm-gray/60 focus:outline-none focus:border-ink"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-r-xl bg-ink text-paper text-xs font-mono font-medium hover:bg-terracotta transition-colors flex items-center justify-center"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <div className="text-xs text-olive flex items-center gap-1.5 font-mono">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Subscribed. Welcome to the Gazette.</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-warm-gray gap-4">
          <div>
            &copy; 2026 AERIVA Technologies Inc. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <a href="#privacy" className="hover:text-ink transition-colors">Privacy Charter</a>
            <a href="#terms" className="hover:text-ink transition-colors">Conditions of Carriage</a>
            <a href="#baggage" className="hover:text-ink transition-colors">Baggage Guidelines</a>
            <a href="#carbon" className="hover:text-ink transition-colors">Aviation Decarbonization</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
