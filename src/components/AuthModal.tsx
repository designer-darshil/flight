import React, { useState } from 'react';
import {
  X,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authMode,
    setAuthMode,
    setIsLoggedIn,
    setActiveView,
  } = useBooking();

  const [email, setEmail] = useState('alex.morgan@aeriva.travel');
  const [password, setPassword] = useState('••••••••••••');
  const [fullName, setFullName] = useState('Alex Morgan');
  const [rememberMe, setRememberMe] = useState(true);

  if (!isAuthModalOpen) return null;

  const isLogin = authMode === 'login';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
    setActiveView('dashboard');
  };

  const handleSocialAuth = (_provider: 'Google' | 'Apple') => {
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
    setActiveView('dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[rgba(23,23,23,0.25)] overflow-y-auto">
      <div className="bg-[#FFFFFF] w-full max-w-4xl rounded-[16px] border border-[#D8D1C5] shadow-[0_24px_60px_rgba(23,23,23,0.10)] my-auto relative text-[#171717] overflow-hidden">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 z-20 p-2 rounded-[8px] bg-[#FFFFFF]/80 hover:bg-[#FFFFFF] text-[#6F6A61] hover:text-[#171717] transition-colors shadow-xs"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* SPLIT-SCREEN LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
          
          {/* LEFT SIDE: WARM CINEMATIC TRAVEL PHOTOGRAPHY */}
          <div className="md:col-span-6 relative overflow-hidden hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=85"
              alt="AERIVA international journey"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Cinematic Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/35 to-transparent" />

            {/* BRANDING & EDITORIAL QUOTE OVERLAY */}
            <div className="relative h-full p-10 flex flex-col justify-between text-[#FFFFFF] z-10">
              <div className="flex items-center space-x-2.5">
                <span className="text-xl font-serif tracking-[0.2em] font-light text-[#F6F2EA]">
                  AERIVA
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#EFE9DE]/80 uppercase pl-3 border-l border-white/20">
                  VOYAGER ACCESS
                </span>
              </div>

              <div className="space-y-3">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-mono text-[#EFE9DE] border border-white/20">
                  <Sparkles className="w-3 h-3 text-[#963F24]" />
                  <span>CURATED GLOBAL NETWORK</span>
                </div>
                <h3 className="text-3xl font-serif font-light text-[#FFFFFF] leading-tight">
                  Travel with the dignity of timeless aviation.
                </h3>
                <p className="text-xs text-[#EFE9DE]/80 font-sans leading-relaxed">
                  Access locked corporate fare buckets, biometric terminal passage, and real-time flight radar telemetry across 140+ countries.
                </p>
              </div>

              <div className="text-[10px] font-mono text-[#EFE9DE]/60">
                AERIVA PROTOCOL &bull; 256-BIT ENCRYPTED
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: EDITORIAL FORM CONTROLS */}
          <div className="md:col-span-6 p-8 sm:p-12 flex flex-col justify-between bg-[#FFFFFF] space-y-6">
            
            {/* HEADER */}
            <div>
              <span className="text-[11px] font-mono tracking-[0.2em] text-[#963F24] uppercase font-bold block mb-1">
                AERIVA
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#171717] tracking-tight leading-none uppercase">
                {isLogin ? 'WELCOME BACK.' : 'CREATE ACCOUNT.'}
              </h2>
              <p className="text-xs text-[#6F6A61] font-sans mt-2">
                {isLogin
                  ? 'Sign in to access your upcoming journeys, boarding passes, and saved routes.'
                  : 'Join the AERIVA Voyager collective for privileged international air corridors.'}
              </p>
            </div>

            {/* SOCIAL AUTH BUTTONS: GOOGLE & APPLE */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSocialAuth('Google')}
                className="h-12 px-4 rounded-[8px] bg-[#FFFFFF] hover:bg-[#EFE9DE] border border-[#D8D1C5] text-xs font-mono font-medium text-[#171717] flex items-center justify-center space-x-2 transition-colors shadow-xs"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocialAuth('Apple')}
                className="h-12 px-4 rounded-[8px] bg-[#FFFFFF] hover:bg-[#EFE9DE] border border-[#D8D1C5] text-xs font-mono font-medium text-[#171717] flex items-center justify-center space-x-2 transition-colors shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.06 1.72-.93 2.75.99.08 2.02-.5 2.64-1.25z" />
                </svg>
                <span>Apple</span>
              </button>
            </div>

            {/* DIVIDER */}
            <div className="flex items-center space-x-3 my-1">
              <div className="flex-1 h-px bg-[#D8D1C5]" />
              <span className="text-[10px] font-mono uppercase text-[#6F6A61]">OR CONTINUE WITH EMAIL</span>
              <div className="flex-1 h-px bg-[#D8D1C5]" />
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              {!isLogin && (
                <div>
                  <label className="block text-[11px] text-[#6F6A61] uppercase tracking-wider mb-1.5 font-medium">
                    Full Legal Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="h-12 w-full px-4 rounded-[8px] border border-[#D8D1C5] bg-[#FFFFFF] text-[#171717] focus:outline-none focus:border-[#963F24] text-xs font-mono"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] text-[#6F6A61] uppercase tracking-wider mb-1.5 font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="alex.morgan@aeriva.travel"
                    className="h-12 w-full px-4 rounded-[8px] border border-[#D8D1C5] bg-[#FFFFFF] text-[#171717] focus:outline-none focus:border-[#963F24] text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[11px] text-[#6F6A61] uppercase tracking-wider font-medium">
                    Password
                  </label>
                  {isLogin && (
                    <button
                      type="button"
                      className="text-[10px] font-mono text-[#963F24] hover:underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="h-12 w-full px-4 rounded-[8px] border border-[#D8D1C5] bg-[#FFFFFF] text-[#171717] focus:outline-none focus:border-[#963F24] text-xs font-mono"
                  />
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center space-x-2 text-[11px] text-[#6F6A61] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={e => setRememberMe(e.target.checked)}
                      className="rounded border-[#D8D1C5] text-[#963F24] focus:ring-0"
                    />
                    <span>Remember this browser</span>
                  </label>
                </div>
              )}

              {/* PRIMARY CTA: SIGN IN */}
              <button
                type="submit"
                className="w-full h-12 rounded-[8px] bg-[#963F24] hover:bg-[#7E331B] text-[#FFFFFF] font-mono text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors shadow-sm mt-2"
              >
                <span>{isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* SWITCH MODE TOGGLE */}
            <div className="text-center pt-2 border-t border-[#D8D1C5] text-xs font-mono text-[#6F6A61]">
              {isLogin ? (
                <span>
                  New to AERIVA?{' '}
                  <button
                    onClick={() => setAuthMode('signup')}
                    className="text-[#963F24] font-bold hover:underline"
                  >
                    Create an account
                  </button>
                </span>
              ) : (
                <span>
                  Already a Voyager member?{' '}
                  <button
                    onClick={() => setAuthMode('login')}
                    className="text-[#963F24] font-bold hover:underline"
                  >
                    Sign in
                  </button>
                </span>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
