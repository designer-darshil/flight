import React, { useState } from 'react';
import {
  X,
  Download,
  Plane,
  QrCode,
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
        `SEAT: 18A (EXTRA LEGROOM)\n` +
        `CLASS: ECONOMY STANDARD\n` +
        `ETKT REF: ARV7K92\n`
      ], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = 'AERIVA_Boarding_Pass_ARV7K92.txt';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-aeriva-navy/90 backdrop-blur-2xl overflow-y-auto">
      <div className="w-full max-w-xl my-auto relative">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setIsBoardingPassOpen(false)}
          className="absolute -top-12 right-0 p-2 text-slate-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        {/* 27. DIGITAL BOARDING PASS WITH PERFORATED PHYSICAL-TICKET TREATMENT */}
        <div className="rounded-3xl bg-slate-900 border border-white/20 shadow-2xl overflow-hidden text-white relative">
          
          {/* Top Perforated Notch Cutouts */}
          <div className="hidden sm:block absolute top-64 -left-4 w-8 h-8 rounded-full bg-aeriva-navy border-r border-white/20 z-10" />
          <div className="hidden sm:block absolute top-64 -right-4 w-8 h-8 rounded-full bg-aeriva-navy border-l border-white/20 z-10" />
          <div className="hidden sm:block absolute top-68 left-4 right-4 border-b border-dashed border-white/15" />

          {/* Pass Header */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 to-slate-950 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-aeriva-blue flex items-center justify-center text-white font-bold">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <polygon points="12 2 2 22 12 17 22 22 12 2" fill="white" />
                </svg>
              </div>
              <span className="text-xl font-display font-black tracking-tightest">AERIVA</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-400/30">
              BOARDING PASS
            </div>
          </div>

          {/* Upper Body: Route & Details */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Route Codes & Times */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">FROM</span>
                <div className="text-4xl font-display font-black text-white">DEL</div>
                <div className="text-xs text-slate-300">Delhi</div>
                <div className="text-sm font-mono font-bold text-cyan-400 mt-1">02:45</div>
              </div>

              <div className="flex flex-col items-center px-4">
                <Plane className="w-6 h-6 text-aeriva-electric transform rotate-90" />
                <span className="text-[10px] font-mono text-slate-400 mt-1">10h 00m</span>
                <span className="text-[9px] font-mono text-emerald-400">1 Stop (DXB)</span>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">TO</span>
                <div className="text-4xl font-display font-black text-white">LHR</div>
                <div className="text-xs text-slate-300">London</div>
                <div className="text-sm font-mono font-bold text-cyan-400 mt-1">07:15</div>
              </div>
            </div>

            {/* Passenger, Flight & Seat Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 text-xs font-mono">
              <div>
                <span className="text-[10px] uppercase text-slate-400 block">PASSENGER</span>
                <div className="font-bold text-white text-sm">ALEX MORGAN</div>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 block">FLIGHT</span>
                <div className="font-bold text-white text-sm">EK 513</div>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 block">DATE</span>
                <div className="font-bold text-white text-sm">18 SEP</div>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 block">SEAT</span>
                <div className="font-bold text-cyan-300 text-sm">18A</div>
              </div>
            </div>
          </div>

          {/* Lower Body (Stub): Gate, Boarding Time & Barcode */}
          <div className="p-6 sm:p-8 bg-slate-950/80 border-t border-white/10 space-y-6">
            <div className="grid grid-cols-3 gap-4 text-center font-mono">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5">
                <span className="text-[10px] uppercase text-slate-400 block">TERMINAL</span>
                <span className="text-lg font-bold text-white">3</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-cyan-500/30">
                <span className="text-[10px] uppercase text-slate-400 block">GATE</span>
                <span className="text-lg font-bold text-cyan-400">B12</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-emerald-500/30">
                <span className="text-[10px] uppercase text-slate-400 block">BOARDING</span>
                <span className="text-lg font-bold text-emerald-400">01:55</span>
              </div>
            </div>

            {/* QR Code and Barcode */}
            <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white space-y-2">
              <QrCode className="w-24 h-24 text-slate-950" />
              {/* Barcode lines */}
              <div className="flex items-center space-x-[2px] h-8 w-full justify-center">
                {[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6, 2, 6, 4, 3, 3, 8, 3, 2, 7].map((w, idx) => (
                  <div key={idx} className="bg-slate-950 h-full" style={{ width: `${w > 4 ? 3 : 1.5}px` }} />
                ))}
              </div>
              <span className="text-[9px] font-mono text-slate-900 font-bold tracking-widest">
                ETKT · ARV7K92 · SECURE ENCRYPTED
              </span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-6 bg-slate-900 border-t border-white/10 flex items-center justify-between gap-3">
            <button
              onClick={handleWallet}
              className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center justify-center space-x-2"
            >
              <span>{walletAdded ? 'Added to Apple Wallet ✓' : 'ADD TO WALLET'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex-1 py-3 rounded-xl bg-aeriva-blue hover:bg-blue-600 text-white font-bold text-xs transition-colors flex items-center justify-center space-x-2 shadow-glow-blue"
            >
              <Download className="w-4 h-4" />
              <span>{downloaded ? 'Downloaded ✓' : 'DOWNLOAD'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
