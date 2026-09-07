import React, { useState } from 'react';
import { TrendingDown, Bell, Check } from 'lucide-react';

export const PriceIntelligence: React.FC = () => {
  const [isTracked, setIsTracked] = useState(false);

  // 30-Day Historical Price Points
  const points = [
    { x: 40, y: 150, label: '30d ago', val: '₹52K' },
    { x: 140, y: 130, label: '25d ago', val: '₹50K' },
    { x: 240, y: 110, label: '20d ago', val: '₹48K' },
    { x: 340, y: 85, label: '15d ago', val: '₹44K' },
    { x: 440, y: 100, label: '10d ago', val: '₹46K' },
    { x: 540, y: 45, label: '5d ago', val: '₹39K' },
    { x: 640, y: 70, label: 'Today', val: '₹42.8K' },
  ];

  const pathD = `M 40,150 C 110,135 190,115 240,110 C 290,105 310,85 340,85 C 380,85 410,100 440,100 C 480,100 510,50 540,45 C 570,40 610,65 640,70`;
  const areaD = `${pathD} L 640,210 L 40,210 Z`;

  return (
    <section className="py-28 px-6 sm:px-12 lg:px-16 bg-cream text-ink border-t border-warm-gray-border/60 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: EDITORIAL HEADLINE & COPY */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="flex items-center space-x-3">
              <span className="w-6 h-[1.5px] bg-terracotta" />
              <span className="text-xs font-mono tracking-widest uppercase text-warm-gray font-semibold">
                04 / ROUTE INTELLIGENCE
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-ink leading-[0.95]">
              KNOW BEFORE<br />
              YOU BOOK.
            </h2>

            <p className="text-sm sm:text-base text-warm-gray leading-relaxed font-sans max-w-md">
              AERIVA tracks historical price movements across 14,000 route pairs daily so you never overpay for flights.
            </p>

            {/* RECOMMENDATION MODULE */}
            <div className="p-6 bg-white border border-warm-gray-border shadow-paper space-y-4 max-w-md">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest uppercase text-warm-gray font-bold">
                  RATE RECOMMENDATION
                </span>
                <span className="px-3 py-1 bg-olive/10 text-olive text-xs font-mono font-bold flex items-center space-x-1.5 border border-olive/20">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>GOOD TIME TO BOOK</span>
                </span>
              </div>

              <p className="text-xs text-warm-gray leading-relaxed">
                Prices for this route are currently lower than their 30-day monthly average. Our statistical model predicts fares may rise by 14% within the next 48 hours.
              </p>

              <div className="pt-3 border-t border-warm-gray-border/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-warm-gray uppercase block">Current Benchmark</span>
                  <span className="text-xl font-display font-black text-ink">₹42,800</span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsTracked(!isTracked)}
                  className={`px-4 py-2 text-xs font-mono uppercase font-semibold transition-colors flex items-center space-x-1.5 border ${
                    isTracked
                      ? 'border-olive bg-olive text-white'
                      : 'border-warm-gray-border bg-sand/30 hover:bg-sand text-ink'
                  }`}
                >
                  {isTracked ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Tracking Active</span>
                    </>
                  ) : (
                    <>
                      <Bell className="w-3 h-3 text-terracotta" />
                      <span>Track Price</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT: REFINED BLACK / TERRACOTTA LINE GRAPH */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-warm-gray-border shadow-paper-elevated p-6 sm:p-8 space-y-6">
              
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-warm-gray-border/60">
                <div>
                  <div className="text-[10px] font-mono tracking-widest uppercase text-warm-gray">HISTORICAL TELEMETRY</div>
                  <h3 className="text-xl font-display font-bold text-ink flex items-center space-x-2">
                    <span>DEL ➔ LHR Price History (30 Days)</span>
                  </h3>
                </div>

                <div className="flex items-center space-x-4 text-xs font-mono">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 bg-terracotta rounded-full" />
                    <span className="text-warm-gray">Actual Fare</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-[2px] bg-warm-gray-border" />
                    <span className="text-warm-gray">Avg ₹48K</span>
                  </div>
                </div>
              </div>

              {/* REFINED SVG LINE GRAPH */}
              <div className="relative w-full overflow-x-auto">
                <svg
                  viewBox="0 0 680 230"
                  className="w-full h-56 sm:h-64"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="editorial-area-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#C96B45" stopOpacity="0.14" />
                      <stop offset="100%" stopColor="#C96B45" stopOpacity="0.00" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid lines */}
                  {[
                    { y: 50, label: '₹52K' },
                    { y: 100, label: '₹48K' },
                    { y: 150, label: '₹44K' },
                    { y: 195, label: '₹40K' },
                  ].map((grid, i) => (
                    <g key={i}>
                      <line
                        x1="30"
                        y1={grid.y}
                        x2="650"
                        y2={grid.y}
                        stroke="#EFE9DE"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                      />
                      <text
                        x="10"
                        y={grid.y + 4}
                        fontSize="9"
                        fill="#6F6A61"
                        fontFamily="JetBrains Mono"
                      >
                        {grid.label}
                      </text>
                    </g>
                  ))}

                  {/* Shaded Area Under Curve */}
                  <path d={areaD} fill="url(#editorial-area-grad)" />

                  {/* Refined Ink / Terracotta Path */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#171717"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Accent Highlight over Path */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#C96B45"
                    strokeWidth="1.5"
                    strokeDasharray="12 4"
                    strokeLinecap="round"
                  />

                  {/* Data Point Nodes */}
                  {points.map((pt, i) => (
                    <g key={i} className="group">
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={i === points.length - 1 ? 5 : 3.5}
                        fill={i === points.length - 1 ? '#C96B45' : '#FFFFFF'}
                        stroke={i === points.length - 1 ? '#FFFFFF' : '#171717'}
                        strokeWidth={i === points.length - 1 ? 2 : 1.5}
                      />
                      <text
                        x={pt.x}
                        y={pt.y - 12}
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="600"
                        fill="#171717"
                        fontFamily="JetBrains Mono"
                      >
                        {pt.val}
                      </text>
                      <text
                        x={pt.x}
                        y="225"
                        textAnchor="middle"
                        fontSize="9"
                        fill="#6F6A61"
                        fontFamily="JetBrains Mono"
                      >
                        {pt.label}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>

              {/* Bottom Insight Footer */}
              <div className="pt-4 border-t border-warm-gray-border/60 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-warm-gray">
                <div>
                  Lowest 30-day fare: <strong className="text-ink">₹39,000</strong> on 3 Sep
                </div>
                <div>
                  Highest recorded: <strong className="text-ink">₹52,400</strong> on 8 Aug
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
