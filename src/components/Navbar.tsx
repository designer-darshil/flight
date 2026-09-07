import React, { useState, useEffect } from 'react';
import {
  Globe,
  Menu,
  X,
  ChevronDown,
  User,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { Currency } from '../types';

export const Navbar: React.FC = () => {
  const {
    currency,
    setCurrency,
    myBookings,
    setIsMyTripsOpen,
    setActiveView,
    setIsAuthModalOpen,
    setAuthMode,
    isLoggedIn,
  } = useBooking();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
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

  const handleBookFlightClick = () => {
    setActiveView('marketing');
    const el = document.getElementById('booking-panel');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-cream border-b border-border shadow-sm py-4 text-ink'
          : 'bg-gradient-to-b from-black/60 via-black/20 to-transparent py-6 text-white'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 flex items-center justify-between">
        
        {/* BRAND LOGO: AERIVA */}
        <div
          onClick={() => {
            setActiveView('marketing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center space-x-3 cursor-pointer select-none group"
        >
          {/* Minimalist vector delta mark */}
          <div className={`w-8 h-8 flex items-center justify-center transition-transform group-hover:scale-105 ${
            isScrolled ? 'text-terracotta' : 'text-white'
          }`}>
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 2 22 12 17 22 22 12 2" fill="currentColor" fillOpacity="0.15" />
            </svg>
          </div>

          <div className="flex flex-col text-left">
            <span className={`text-2xl font-display font-black tracking-tightest leading-none ${
              isScrolled ? 'text-ink' : 'text-white'
            }`}>
              AERIVA
            </span>
          </div>
        </div>

        {/* CENTER EDITORIAL NAVIGATION */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-sans tracking-wider uppercase font-semibold">
          <button
            onClick={() => scrollToSection('booking-panel')}
            className={`transition-colors ${
              isScrolled ? 'text-ink/80 hover:text-terracotta' : 'text-white/85 hover:text-white'
            }`}
          >
            Flights
          </button>
          <button
            onClick={() => scrollToSection('destination-showcase')}
            className={`transition-colors ${
              isScrolled ? 'text-ink/80 hover:text-terracotta' : 'text-white/85 hover:text-white'
            }`}
          >
            Explore
          </button>
          <button
            onClick={() => scrollToSection('smart-deals-section')}
            className={`transition-colors ${
              isScrolled ? 'text-ink/80 hover:text-terracotta' : 'text-white/85 hover:text-white'
            }`}
          >
            Deals
          </button>
          <button
            onClick={() => setIsMyTripsOpen(true)}
            className={`transition-colors flex items-center space-x-1.5 ${
              isScrolled ? 'text-ink/80 hover:text-terracotta' : 'text-white/85 hover:text-white'
            }`}
          >
            <span>Trips</span>
            {myBookings.length > 0 && (
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
            )}
          </button>
        </nav>

        {/* RIGHT CONTROLS: USD, EN, SIGN IN, OUTLINED CTA */}
        <div className="hidden lg:flex items-center space-x-5 text-xs font-sans">
          
          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className={`flex items-center space-x-1 font-mono uppercase tracking-wider py-1.5 px-2 transition-colors ${
                isScrolled ? 'text-ink/70 hover:text-ink' : 'text-white/80 hover:text-white'
              }`}
            >
              <span>{currency}</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {currencyDropdownOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-[#FFFFFF] border border-[#D8D1C5] rounded-[8px] shadow-[0_12px_32px_rgba(23,23,23,0.08)] py-1.5 z-50 text-ink">
                {currencies.map(c => (
                  <button
                    key={c}
                    onClick={() => {
                      setCurrency(c);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-mono flex items-center justify-between hover:bg-[#EFE9DE]/50 ${
                      currency === c ? 'text-[#963F24] font-bold' : 'text-ink/80'
                    }`}
                  >
                    <span>{c}</span>
                    {currency === c && <span>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className={`flex items-center space-x-1 font-mono uppercase tracking-wider py-1.5 px-2 transition-colors ${
                isScrolled ? 'text-ink/70 hover:text-ink' : 'text-white/80 hover:text-white'
              }`}
            >
              <Globe className="w-3 h-3 opacity-70 mr-0.5" />
              <span>{selectedLang}</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-[#FFFFFF] border border-[#D8D1C5] rounded-[8px] shadow-[0_12px_32px_rgba(23,23,23,0.08)] py-1.5 z-50 text-ink">
                {languages.map(l => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setSelectedLang(l.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#EFE9DE]/50 ${
                      selectedLang === l.code ? 'text-[#963F24] font-bold' : 'text-ink/80'
                    }`}
                  >
                    <span>{l.name}</span>
                    {selectedLang === l.code && <span>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sign In / Account Button */}
          {isLoggedIn ? (
            <button
              onClick={() => setActiveView('dashboard')}
              className={`font-semibold tracking-wider uppercase transition-colors px-2.5 py-1 rounded-[6px] flex items-center space-x-2 ${
                isScrolled ? 'bg-[#EFE9DE] text-[#171717] hover:bg-[#D8D1C5]' : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-[#963F24] text-white flex items-center justify-center text-[10px] font-bold">
                AM
              </div>
              <span className="font-mono text-xs">Alex M.</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setAuthMode('login');
                setIsAuthModalOpen(true);
              }}
              className={`font-semibold tracking-wider uppercase transition-colors px-2 py-1.5 flex items-center space-x-1.5 ${
                isScrolled ? 'text-ink/80 hover:text-ink' : 'text-white/90 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5 opacity-70" />
              <span>Sign In</span>
            </button>
          )}

          {/* Small Outlined CTA: BOOK A FLIGHT */}
          <button
            onClick={handleBookFlightClick}
            className={`px-4 py-2 border text-xs tracking-wider uppercase font-semibold transition-all duration-200 ${
              isScrolled
                ? 'border-ink text-ink hover:bg-ink hover:text-white'
                : 'border-white text-white hover:bg-white hover:text-ink'
            }`}
          >
            BOOK A FLIGHT
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 transition-colors ${
              isScrolled ? 'text-ink' : 'text-white'
            }`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* MOBILE DROPDOWN */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cream border-b border-warm-gray-border px-6 py-6 space-y-4 shadow-paper-elevated text-ink">
          <div className="space-y-3 font-sans uppercase font-bold text-sm tracking-wider">
            <button
              onClick={() => scrollToSection('booking-panel')}
              className="block w-full text-left py-2 hover:text-terracotta"
            >
              Flights
            </button>
            <button
              onClick={() => scrollToSection('destination-showcase')}
              className="block w-full text-left py-2 hover:text-terracotta"
            >
              Explore
            </button>
            <button
              onClick={() => scrollToSection('smart-deals-section')}
              className="block w-full text-left py-2 hover:text-terracotta"
            >
              Deals
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsMyTripsOpen(true);
              }}
              className="block w-full text-left py-2 hover:text-terracotta"
            >
              Trips
            </button>
            {isLoggedIn ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveView('dashboard');
                }}
                className="w-full text-left py-2 hover:text-terracotta flex items-center space-x-2"
              >
                <div className="w-5 h-5 rounded-full bg-[#963F24] text-white flex items-center justify-center text-[10px] font-bold">
                  AM
                </div>
                <span>Alex Morgan (Profile)</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuthMode('login');
                  setIsAuthModalOpen(true);
                }}
                className="block w-full text-left py-2 hover:text-terracotta"
              >
                Sign In
              </button>
            )}
          </div>

          <div className="pt-4 border-t border-warm-gray-border">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleBookFlightClick();
              }}
              className="w-full py-3 bg-terracotta text-white font-bold text-xs uppercase tracking-wider text-center"
            >
              BOOK A FLIGHT
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
