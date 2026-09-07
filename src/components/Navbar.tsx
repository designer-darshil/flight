import React, { useState, useEffect } from 'react';
import {
  Globe,
  Coins,
  Menu,
  X,
  ChevronDown,
  HelpCircle,
  User,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { Currency } from '../types';
import { CURRENCIES } from '../utils/currency';

export const Navbar: React.FC = () => {
  const {
    currency,
    setCurrency,
    myBookings,
    setIsMyTripsOpen,
    setIsFlightStatusOpen,
    setActiveView,
  } = useBooking();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currencies: Currency[] = ['USD', 'INR', 'EUR', 'AED', 'GBP'];
  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'FR', name: 'Français' },
    { code: 'DE', name: 'Deutsch' },
    { code: 'AR', name: 'العربية' },
    { code: 'HI', name: 'हिन्दी' },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveView('marketing');
    setMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-aeriva-navy/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        
        {/* ORIGINAL AVIATION LOGOMARK: AERIVA GEOMETRIC SUPERSONIC DELTA WING */}
        <div
          onClick={() => {
            setActiveView('marketing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center space-x-3.5 cursor-pointer group select-none"
        >
          {/* Custom vector delta wing symbol */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-aeriva-blue via-blue-500 to-cyan-400 p-[1px] shadow-glow-blue">
            <div className="w-full h-full bg-aeriva-navy rounded-[11px] flex items-center justify-center transition-transform group-hover:scale-95">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-cyan-400 group-hover:text-white transition-colors"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 2 22 12 17 22 22 12 2" fill="rgba(6, 182, 212, 0.15)" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-2xl font-display font-black tracking-tightest text-white">
              AERIVA
            </span>
            <span className="text-[8.5px] uppercase font-mono tracking-widestlabel text-cyan-400 -mt-1 font-semibold">
              FLIGHT NETWORK
            </span>
          </div>
        </div>

        {/* DESKTOP NAVIGATION LINKS */}
        <nav className="hidden lg:flex items-center space-x-1 font-medium text-[13px] text-slate-300">
          <button
            onClick={() => scrollToSection('booking-engine-section')}
            className="px-3.5 py-2 rounded-lg hover:text-white hover:bg-white/5 transition-colors"
          >
            Flights
          </button>

          <button
            onClick={() => scrollToSection('explore-section')}
            className="px-3.5 py-2 rounded-lg hover:text-white hover:bg-white/5 transition-colors"
          >
            Explore
          </button>

          <button
            onClick={() => scrollToSection('deals-section')}
            className="px-3.5 py-2 rounded-lg hover:text-white hover:bg-white/5 transition-colors"
          >
            Deals
          </button>

          <button
            onClick={() => setIsFlightStatusOpen(true)}
            className="px-3.5 py-2 rounded-lg hover:text-white hover:bg-white/5 transition-colors"
          >
            Flight Status
          </button>

          <button
            onClick={() => setIsMyTripsOpen(true)}
            className="px-3.5 py-2 rounded-lg hover:text-white hover:bg-white/5 transition-colors relative flex items-center space-x-1.5"
          >
            <span>My Trips</span>
            {myBookings.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-cyan-400 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                {myBookings.length}
              </span>
            )}
          </button>
        </nav>

        {/* SECONDARY CONTROLS & CTA BUTTONS */}
        <div className="hidden md:flex items-center space-x-3 text-xs">
          
          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                setCurrencyDropdownOpen(!currencyDropdownOpen);
                setLangDropdownOpen(false);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/25 text-slate-300 transition-colors font-mono"
            >
              <Coins className="w-3.5 h-3.5 text-cyan-400" />
              <span>{currency}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {currencyDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 rounded-xl bg-aeriva-charcoal border border-white/10 shadow-2xl p-1.5 z-50">
                {currencies.map(c => (
                  <button
                    key={c}
                    onClick={() => {
                      setCurrency(c);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                      currency === c
                        ? 'bg-aeriva-blue/20 text-cyan-300 font-semibold'
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <span>{c}</span>
                    <span className="text-slate-400">{CURRENCIES[c].symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                setLangDropdownOpen(!langDropdownOpen);
                setCurrencyDropdownOpen(false);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/25 text-slate-300 transition-colors font-mono"
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>{selectedLang}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 rounded-xl bg-aeriva-charcoal border border-white/10 shadow-2xl p-1.5 z-50">
                {languages.map(l => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setSelectedLang(l.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                      selectedLang === l.code
                        ? 'bg-aeriva-blue/20 text-cyan-300 font-semibold'
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <span>{l.name}</span>
                    <span className="text-slate-400 font-mono text-[10px]">{l.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Help link */}
          <button
            onClick={() => scrollToSection('features-section')}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            title="Help & Support"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* SIGN IN BUTTON */}
          <button
            onClick={() => setActiveView('dashboard')}
            className="px-4 py-2 rounded-xl text-slate-200 hover:text-white font-semibold text-xs transition-colors flex items-center space-x-1.5"
          >
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span>SIGN IN</span>
          </button>

          {/* PRIMARY BUTTON: BOOK A FLIGHT */}
          <button
            onClick={() => scrollToSection('booking-engine-section')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-aeriva-blue to-cyan-500 text-white font-bold text-xs tracking-wider uppercase shadow-glow-blue hover:shadow-glow-cyan transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            BOOK A FLIGHT
          </button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 mx-4 p-5 rounded-2xl bg-aeriva-charcoal border border-white/15 shadow-2xl space-y-3">
          <button
            onClick={() => scrollToSection('booking-engine-section')}
            className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:text-white"
          >
            Flights
          </button>
          <button
            onClick={() => scrollToSection('explore-section')}
            className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:text-white"
          >
            Explore Destinations
          </button>
          <button
            onClick={() => scrollToSection('deals-section')}
            className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:text-white"
          >
            Flight Deals
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setIsFlightStatusOpen(true);
            }}
            className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:text-white"
          >
            Flight Status
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setIsMyTripsOpen(true);
            }}
            className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:text-white flex items-center justify-between"
          >
            <span>My Trips</span>
            <span className="w-4 h-4 rounded-full bg-cyan-400 text-slate-950 font-bold text-[10px] flex items-center justify-center">
              {myBookings.length}
            </span>
          </button>
          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveView('dashboard');
              }}
              className="px-4 py-2 rounded-xl bg-white/10 text-white font-semibold text-xs"
            >
              Sign In
            </button>
            <button
              onClick={() => scrollToSection('booking-engine-section')}
              className="px-5 py-2 rounded-xl bg-aeriva-blue text-white font-bold text-xs"
            >
              Book Flight
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
