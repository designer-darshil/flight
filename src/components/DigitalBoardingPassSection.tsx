import React, { useState } from 'react';
import { Plane, QrCode, Smartphone, Download, Share2, Shield, Sparkles } from 'lucide-react';

interface DigitalBoardingPassSectionProps {
  onBookNow?: () => void;
}

export const DigitalBoardingPassSection: React.FC<DigitalBoardingPassSectionProps> = ({
  onBookNow
}) => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2400);
  };

  return (
    <section className="py-24 sm:py-32 bg-sand/40 text-ink border-t border-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream border border-border text-xs uppercase tracking-[0.25em] font-mono text-warm-gray mb-4">
            <Sparkles className="w-3 h-3 text-terracotta" />
            Tactile Digital Boarding Pass
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-light tracking-tight text-ink">
            Crafted for physical clarity. <br />
            <span className="italic font-normal">Stored seamlessly on device.</span>
          </h2>
          <p className="mt-4 text-warm-gray text-base sm:text-lg font-light">
            Every AERIVA ticket is designed with the tactile dignity of classic aviation ephemera, featuring instant offline PKPass Apple Wallet & Google Wallet sync.
          </p>
        </div>

        {/* Boarding Pass Showcase Container */}
        <div className="max-w-4xl mx-auto">
          {/* Outer Card with Perforated Ticket Styling */}
          <div className="relative bg-paper rounded-3xl border border-border/80 shadow-2xl overflow-hidden transition-transform duration-500 hover:-translate-y-1">
            
            {/* Top Brand Banner */}
            <div className="bg-ink text-paper px-8 sm:px-10 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl font-serif tracking-widest font-light text-cream">AERIVA</span>
                <span className="text-xs uppercase font-mono text-champagne/80 tracking-widest pl-3 border-l border-white/20 hidden sm:inline">
                  First & Club Class
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-cream/70">
                <span>BOARDING PASS</span>
                <span className="w-2 h-2 rounded-full bg-terracotta animate-ping" />
              </div>
            </div>

            {/* Main Pass Body: 2 Columns on Desktop */}
            <div className="grid grid-cols-1 md:grid-cols-12 relative">
              
              {/* Left Column: Flight Details (8 cols) */}
              <div className="md:col-span-8 p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  {/* Passenger & Flight Ref */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pb-8 border-b border-border/70">
                    <div>
                      <div className="text-[11px] uppercase tracking-wider font-mono text-warm-gray">Passenger</div>
                      <div className="text-lg font-serif font-medium text-ink mt-0.5">Alex Morgan</div>
                      <div className="text-[10px] font-mono text-warm-gray">AERIVA Sapphire #94021</div>
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wider font-mono text-warm-gray">Flight</div>
                      <div className="text-lg font-mono font-semibold text-ink mt-0.5">EK 513</div>
                      <div className="text-[10px] font-mono text-olive flex items-center gap-1">
                        <Shield className="w-2.5 h-2.5" /> Confirmed
                      </div>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <div className="text-[11px] uppercase tracking-wider font-mono text-warm-gray">Cabin Class</div>
                      <div className="text-lg font-serif font-medium text-terracotta mt-0.5">First Suite</div>
                      <div className="text-[10px] font-mono text-warm-gray">Boeing 777-300ER</div>
                    </div>
                  </div>

                  {/* Origin & Destination Display */}
                  <div className="py-8 grid grid-cols-3 gap-4 items-center">
                    <div>
                      <div className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-ink">DEL</div>
                      <div className="text-xs font-serif font-medium text-ink mt-1">Delhi, India</div>
                      <div className="text-xs font-mono text-warm-gray mt-0.5">18 Sep &bull; 04:15 AM</div>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                      <div className="text-[10px] font-mono text-warm-gray uppercase tracking-wider mb-1.5">
                        3h 45m Direct
                      </div>
                      <div className="w-full flex items-center">
                        <div className="w-2 h-2 rounded-full border border-ink bg-paper" />
                        <div className="flex-1 h-[1.5px] bg-border relative flex items-center justify-center">
                          <Plane className="w-4 h-4 text-terracotta rotate-90" />
                        </div>
                        <div className="w-2 h-2 rounded-full bg-ink" />
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-ink">DXB</div>
                      <div className="text-xs font-serif font-medium text-ink mt-1">Dubai, UAE</div>
                      <div className="text-xs font-mono text-warm-gray mt-0.5">18 Sep &bull; 06:30 AM</div>
                    </div>
                  </div>

                  {/* Seat, Gate, Boarding Time Highlights */}
                  <div className="grid grid-cols-4 gap-3 p-4 rounded-xl bg-cream border border-border/70 text-center">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider font-mono text-warm-gray">Gate</div>
                      <div className="text-lg font-mono font-bold text-ink mt-0.5">T3 &bull; 14</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider font-mono text-warm-gray">Group</div>
                      <div className="text-lg font-mono font-bold text-ink mt-0.5">PRIORITY 1</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider font-mono text-warm-gray">Seat</div>
                      <div className="text-lg font-mono font-bold text-terracotta mt-0.5">02K</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider font-mono text-warm-gray">Boarding</div>
                      <div className="text-lg font-mono font-bold text-ink mt-0.5">03:30 AM</div>
                    </div>
                  </div>
                </div>

                {/* Simulated Linear Barcode */}
                <div className="pt-8 border-t border-border/70 mt-8 flex flex-col items-center">
                  <div className="h-10 w-full max-w-sm flex items-center justify-between opacity-80 gap-[2px]">
                    {[...Array(64)].map((_, i) => (
                      <div
                        key={i}
                        className="h-full bg-ink"
                        style={{
                          width: `${(i % 5 === 0 ? 3 : i % 3 === 0 ? 2 : 1)}px`,
                          opacity: i % 7 === 0 ? 0.3 : 1
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-[10px] font-mono tracking-[0.3em] text-warm-gray mt-2">
                    M1MORGAN/ALEX EK513 DELDXB 02K 018S001
                  </div>
                </div>
              </div>

              {/* Perforation Cutout divider (Vertical on desktop) */}
              <div className="hidden md:flex absolute top-0 bottom-0 left-[66.666%] -ml-3 flex-col justify-between items-center py-2 pointer-events-none z-20">
                <div className="w-6 h-6 rounded-full bg-sand/40 border-r border-b border-border -mt-3 shadow-inner" />
                <div className="flex-1 w-[1px] border-r border-dashed border-border my-2" />
                <div className="w-6 h-6 rounded-full bg-sand/40 border-r border-t border-border -mb-3 shadow-inner" />
              </div>

              {/* Right Column: Stub & QR Code (4 cols) */}
              <div className="md:col-span-4 bg-cream/70 p-8 sm:p-10 border-t md:border-t-0 md:border-l border-border flex flex-col justify-between items-center text-center">
                <div className="w-full">
                  <div className="text-xs uppercase font-mono tracking-widest text-warm-gray mb-1">Boarding Pass Stub</div>
                  <div className="text-sm font-serif font-medium text-ink">DEL ➔ DXB</div>
                  <div className="text-[11px] font-mono text-warm-gray mt-0.5">18 SEP 2026 &bull; 02K</div>

                  {/* QR Code Presentation */}
                  <div className="mt-8 p-4 bg-paper rounded-2xl border border-border shadow-sm inline-block mx-auto">
                    <div className="w-36 h-36 bg-ink/5 rounded-xl flex items-center justify-center p-2 relative">
                      <QrCode className="w-28 h-28 text-ink" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-lg bg-paper border border-border flex items-center justify-center text-terracotta shadow-md">
                          <Plane className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                    <div className="text-[10px] font-mono text-warm-gray mt-2 uppercase tracking-wider">
                      Scan at e-Gate
                    </div>
                  </div>
                </div>

                <div className="w-full pt-6 border-t border-border/80 mt-6">
                  <div className="text-[11px] font-mono text-warm-gray">Baggage Claim Tag</div>
                  <div className="text-xs font-mono font-semibold text-ink mt-0.5">EK-772910-DEL</div>
                </div>
              </div>

            </div>

            {/* Pass Footer Action Strip */}
            <div className="bg-sand/30 border-t border-border px-8 py-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-xs font-mono text-warm-gray">
                <Smartphone className="w-4 h-4 text-terracotta" />
                <span>Compatible with Apple Wallet, Google Pay & PDF export</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 rounded-lg bg-paper border border-border text-xs uppercase tracking-wider font-mono text-ink hover:border-ink transition-colors flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{downloaded ? 'Saved to Wallet' : 'Add to Wallet'}</span>
                </button>
                <button
                  onClick={() => onBookNow && onBookNow()}
                  className="px-4 py-2 rounded-lg bg-terracotta text-paper text-xs uppercase tracking-wider font-mono font-medium hover:bg-terracotta/90 transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Book Your Flight</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
