import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  Headphones,
  Plane,
  Send,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
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
  };

  return (
    <footer className="relative bg-aeriva-navy border-t border-white/10 pt-16 pb-12 overflow-hidden text-slate-400">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-aeriva-cyan/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* READY TO GO CALLOUT BANNER */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-aeriva-charcoal via-aeriva-surface to-aeriva-charcoal border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[11px] font-mono tracking-widest text-aeriva-cyan uppercase font-bold">
              EXPEDITE YOUR DEPARTURE
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
              READY TO GO? SEARCH YOUR NEXT FLIGHT.
            </h3>
            <p className="text-xs text-slate-400 max-w-xl">
              Compare transparent fare tiers, lock in guaranteed seat assignments, and enjoy zero-latency itinerary tracking.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleSearchScroll}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-aeriva-blue to-aeriva-cyan text-white font-extrabold text-xs tracking-wide shadow-glow-blue hover:shadow-cyan-500/40 transition-all flex items-center space-x-2 group"
            >
              <span>Book Flight Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* TRUST BADGES ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-8 h-8 text-aeriva-cyan shrink-0" />
            <div>
              <div className="text-white font-bold text-xs">Official Airline Partner</div>
              <div className="text-[11px] text-slate-400">IATA Certified Global Ticketing</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Award className="w-8 h-8 text-aeriva-electric shrink-0" />
            <div>
              <div className="text-white font-bold text-xs">Best Price Guarantee</div>
              <div className="text-[11px] text-slate-400">No hidden booking fees</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Headphones className="w-8 h-8 text-emerald-400 shrink-0" />
            <div>
              <div className="text-white font-bold text-xs">24/7 Aviation Concierge</div>
              <div className="text-[11px] text-slate-400">Instant multi-channel support</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Plane className="w-8 h-8 text-purple-400 shrink-0" />
            <div>
              <div className="text-white font-bold text-xs">Seamless Boarding</div>
              <div className="text-[11px] text-slate-400">Digital passes & Apple Wallet</div>
            </div>
          </div>
        </div>

        {/* MAIN FOOTER NAVIGATION & NEWSLETTER */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12 border-b border-white/10">
          
          {/* Col 1-4: Brand & Mission */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-aeriva-blue to-aeriva-cyan p-[1px] flex items-center justify-center">
                <div className="w-full h-full bg-aeriva-navy rounded-[7px] flex items-center justify-center">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2L21 20L12 16L3 20L12 2Z"
                      fill="url(#footer-delta-grad)"
                      stroke="#06B6D4"
                      strokeWidth="1"
                    />
                    <defs>
                      <linearGradient id="footer-delta-grad" x1="3" y1="2" x2="21" y2="20">
                        <stop stopColor="#3B82F6" />
                        <stop offset="1" stopColor="#06B6D4" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <span className="text-xl font-display font-black tracking-wider text-white">
                AERIVA
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-sm text-slate-400">
              TRAVEL WITHOUT THE FRICTION. Next-generation travel-tech platform combining cinematic 3D aviation visuals with an intuitive, ultra-fast booking engine. Fly anywhere with absolute clarity.
            </p>
            <div className="text-xs font-mono text-aeriva-cyan">
              OPERATING LICENSE: #ARV-2026-X9 · IATA ID 9820-A
            </div>
          </div>

          {/* Col 5-7: Popular Routes */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase font-mono tracking-wider">Flagship Routes</h4>
            <ul className="space-y-2">
              <li><button onClick={handleSearchScroll} className="hover:text-aeriva-cyan transition-colors text-left">New Delhi ➔ London (DEL-LHR)</button></li>
              <li><button onClick={handleSearchScroll} className="hover:text-aeriva-cyan transition-colors text-left">New Delhi ➔ Dubai (DEL-DXB)</button></li>
              <li><button onClick={handleSearchScroll} className="hover:text-aeriva-cyan transition-colors text-left">New Delhi ➔ Tokyo (DEL-HND)</button></li>
              <li><button onClick={handleSearchScroll} className="hover:text-aeriva-cyan transition-colors text-left">Mumbai ➔ New York (BOM-JFK)</button></li>
              <li><button onClick={handleSearchScroll} className="hover:text-aeriva-cyan transition-colors text-left">Singapore ➔ London (SIN-LHR)</button></li>
            </ul>
          </div>

          {/* Col 8-9: Airline Partners */}
          <div className="md:col-span-2 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase font-mono tracking-wider">Partner Airlines</h4>
            <ul className="space-y-2">
              <li><span className="text-slate-300">Emirates</span></li>
              <li><span className="text-slate-300">British Airways</span></li>
              <li><span className="text-slate-300">Singapore Airlines</span></li>
              <li><span className="text-slate-300">Air India</span></li>
              <li><span className="text-slate-300">Qatar Airways</span></li>
              <li><span className="text-slate-300">Lufthansa</span></li>
            </ul>
          </div>

          {/* Col 10-12: Newsletter Subscription */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase font-mono tracking-wider">Fare Drop Radar</h4>
            <p className="text-slate-400 text-xs">
              Subscribe for secret airfare drops and first access to seasonal flight promotions.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-aeriva-charcoal border border-white/15 px-3 py-2 rounded-l-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-aeriva-cyan"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-r-xl bg-aeriva-cyan text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <div className="text-[11px] text-emerald-400 flex items-center space-x-1 font-mono">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Subscribed! Fare alerts active.</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* COPYRIGHT & LEGAL */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-4 sm:space-y-0">
          <div>
            © 2026 AERIVA. Global travel, simplified.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Carriage</a>
            <a href="#" className="hover:text-slate-400">Baggage Regulations</a>
            <a href="#" className="hover:text-slate-400">Carbon Offset Program</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
