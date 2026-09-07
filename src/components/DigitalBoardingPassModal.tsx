import React, { useState } from 'react';
import {
  X,
  Download,
  Plane,
  QrCode,
  Smartphone,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const DigitalBoardingPassModal: React.FC = () => {
  const { isBoardingPassOpen, setIsBoardingPassOpen } = useBooking();
  const [downloaded, setDownloaded] = useState(false);
  const [walletAdded, setWalletAdded] = useState(false);

  if (!isBoardingPassOpen) return null;

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => {
      const element = document.createElement('a');
      const file = new Blob([
        `AERIVA ELECTRONIC BOARDING PASS\n` +
        `==============================\n` +
        `PASSENGER: ALEX MORGAN\n` +
        `FLIGHT: EMIRATES EK 513\n` +
        `ROUTE: DELHI (DEL) -> LONDON (LHR)\n` +
        `DATE: 18 SEP 2026\n` +
        `DEPARTURE: 02:45\n` +
        `BOARDING TIME: 01:55\n` +
        `TERMINAL: 3 | GATE: B12\n` +
        `SEAT: 18A (CLUB SUITE)\n` +
        `CLASS: CLUB WORLD\n` +
        `ETKT REF: AER-8942\n`
      ], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = 'AERIVA_Boarding_Pass_AER8942.txt';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setTimeout(() => setDownloaded(false), 3000);
    }, 300);
  };

  const handleWallet = () => {
    setWalletAdded(true);
    setTimeout(() => setWalletAdded(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink/40 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-xl my-auto relative">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setIsBoardingPassOpen(false)}
          className="absolute -top-10 right-0 p-2 text-paper/80 hover:text-paper transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* SIGNATURE TACTILE DIGITAL BOARDING PASS */}
        <div className="rounded-2xl bg-paper border border-border shadow-2xl overflow-hidden text-ink relative">
          
          {/* Perforated Notch Cutouts */}
          <div className="hidden sm:block absolute top-[280px] -left-3 w-6 h-6 rounded-full bg-ink/40 border-r border-border z-10 shadow-inner" />
          <div className="hidden sm:block absolute top-[280px] -right-3 w-6 h-6 rounded-full bg-ink/40 border-l border-border z-10 shadow-inner" />
          <div className="hidden sm:block absolute top-[292px] left-3 right-3 border-b border-dashed border-border" />

          {/* Pass Header */}
          <div className="p-6 sm:p-8 bg-ink text-paper flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <span className="text-xl font-serif tracking-widest font-light text-paper">AERIVA</span>
              <span className="text-xs font-mono text-champagne/80 tracking-widest pl-3 border-l border-white/20 hidden sm:inline">
                CLUB WORLD
              </span>
            </div>
            <div className="px-3 py-1 rounded-full bg-paper/10 text-paper font-mono text-xs font-medium border border-paper/20">
              BOARDING PASS
            </div>
          </div>

          {/* Upper Body: Route & Details */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Route Codes & Times */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-warm-gray block">ORIGIN</span>
                <div className="text-4xl font-serif font-bold text-ink">DEL</div>
                <div className="text-xs text-warm-gray">Delhi, India</div>
                <div className="text-sm font-mono font-medium text-terracotta mt-1">02:45 AM</div>
              </div>

              <div className="flex flex-col items-center px-4">
                <Plane className="w-5 h-5 text-terracotta rotate-90" />
                <span className="text-[10px] font-mono text-warm-gray mt-1">8h 30m</span>
                <span className="text-[9px] font-mono text-olive font-medium">Non-Stop</span>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono uppercase text-warm-gray block">DESTINATION</span>
                <div className="text-4xl font-serif font-bold text-ink">LHR</div>
                <div className="text-xs text-warm-gray">London, UK</div>
                <div className="text-sm font-mono font-medium text-terracotta mt-1">07:15 AM</div>
              </div>
            </div>

            {/* Passenger, Flight & Seat Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border text-xs font-mono">
              <div>
                <span className="text-[10px] uppercase text-warm-gray block">PASSENGER</span>
                <div className="font-medium text-ink text-sm">ALEX MORGAN</div>
              </div>
              <div>
                <span className="text-[10px] uppercase text-warm-gray block">FLIGHT</span>
                <div className="font-medium text-ink text-sm">EK 513</div>
              </div>
              <div>
                <span className="text-[10px] uppercase text-warm-gray block">DATE</span>
                <div className="font-medium text-ink text-sm">18 SEP</div>
              </div>
              <div>
                <span className="text-[10px] uppercase text-warm-gray block">SEAT</span>
                <div className="font-bold text-terracotta text-sm">18A</div>
              </div>
            </div>
          </div>

          {/* Lower Body (Stub): Gate, Boarding Time & Barcode */}
          <div className="p-6 sm:p-8 bg-sand/30 border-t border-border space-y-6">
            <div className="grid grid-cols-3 gap-4 text-center font-mono">
              <div className="p-2.5 rounded-lg bg-paper border border-border">
                <span className="text-[10px] uppercase text-warm-gray block">TERMINAL</span>
                <span className="text-lg font-serif font-bold text-ink">T3</span>
              </div>
              <div className="p-2.5 rounded-lg bg-paper border border-border">
                <span className="text-[10px] uppercase text-warm-gray block">GATE</span>
                <span className="text-lg font-serif font-bold text-ink">B12</span>
              </div>
              <div className="p-2.5 rounded-lg bg-paper border border-border">
                <span className="text-[10px] uppercase text-warm-gray block">BOARDING</span>
                <span className="text-lg font-serif font-bold text-olive">01:55</span>
              </div>
            </div>

            {/* QR Code and Barcode */}
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-paper border border-border space-y-2 shadow-sm">
              <QrCode className="w-24 h-24 text-ink" />
              {/* Barcode lines */}
              <div className="flex items-center space-x-[2px] h-8 w-full justify-center opacity-85">
                {[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6, 2, 6, 4, 3, 3, 8, 3, 2, 7].map((w, idx) => (
                  <div key={idx} className="bg-ink h-full" style={{ width: `${w > 4 ? 3 : 1.5}px` }} />
                ))}
              </div>
              <span className="text-[9px] font-mono text-warm-gray tracking-widest">
                ETKT &bull; AER-8942 &bull; IATA CERTIFIED
              </span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-6 bg-paper border-t border-border flex items-center justify-between gap-3 font-mono text-xs">
            <button
              onClick={handleWallet}
              className="flex-1 py-3 rounded-lg bg-sand hover:bg-sand/80 text-ink border border-border font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <Smartphone className="w-4 h-4 text-terracotta" />
              <span>{walletAdded ? 'Saved to Wallet ✓' : 'Add to Wallet'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex-1 py-3 rounded-lg bg-terracotta hover:bg-terracotta-hover text-paper font-medium transition-colors flex items-center justify-center space-x-2 shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>{downloaded ? 'Downloaded ✓' : 'Download Pass'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
