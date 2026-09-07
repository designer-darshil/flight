import React, { useState } from 'react';
import { TrendingDown, Bell } from 'lucide-react';

export const PriceIntelligence: React.FC = () => {
  const [isTracked, setIsTracked] = useState(false);

  // SVG 30-day historical price points: (x, y) coordinates
  // Values: ₹52,400 -> ₹49,800 -> ₹48,200 -> ₹44,100 -> ₹46,200 -> ₹39,500 -> ₹42,800
  const points = [
    { x: 30, y: 160, label: '30d ago', val: '₹52K' },
    { x: 130, y: 135, label: '25d ago', val: '₹50K' },
    { x: 230, y: 120, label: '20d ago', val: '₹48K' },
    { x: 330, y: 90, label: '15d ago', val: '₹44K' },
    { x: 430, y: 105, label: '10d ago', val: '₹46K' },
    { x: 530, y: 50, label: '5d ago', val: '₹39K' },
    { x: 630, y: 75, label: 'Today', val: '₹42.8K' },
  ];

  // Smooth SVG curve path:
  const pathD = `M 30,160 C 100,140 180,125 230,120 C 280,115 300,95 330,90 C 370,85 400,105 430,105 C 470,105 500,55 530,50 C 560,45 600,70 630,75`;
  const areaD = `${pathD} L 630,220 L 30,220 Z`;

  return (
    <section className="py-24 bg-aeriva-navy text-white relative overflow-hidden border-t border-white/10">
      
      {/* Glow background */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: EDITORIAL COPY & RECOMMENDATION (Col 1-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-mono uppercase tracking-widestlabel text-cyan-400 font-bold">
              07 / FARE PREDICTIVE ALGORITHMS
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tightest leading-none text-white">
              KNOW WHEN <br />
              <span className="bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                TO BOOK.
              </span>
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              AERIVA analyzes over 12 million route price points daily. Our predictive models notify you when prices have hit their statistical floor.
            </p>

            {/* RECOMMENDATION BADGE */}
            <div className="p-5 rounded-3xl bg-aeriva-charcoal border border-emerald-500/30 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase">AI Recommendation</span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs font-mono border border-emerald-500/30 flex items-center space-x-1">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>GOOD TIME TO BOOK</span>
                </span>
              </div>

              <div className="flex items-baseline justify-between pt-2 border-t border-white/10">
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-400">Current Average Price</div>
                  <div className="text-3xl font-display font-black text-white">₹42,800</div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Expected Range</div>
                  <div className="text-base font-mono font-bold text-cyan-400">₹40K – ₹48K</div>
                </div>
              </div>
            </div>

            {/* TRACK BUTTON */}
            <button
              onClick={() => setIsTracked(!isTracked)}
              className={`px-8 py-4 rounded-2xl font-bold text-xs tracking-wider uppercase transition-all flex items-center space-x-2 ${
                isTracked
                  ? 'bg-emerald-500 text-slate-950 shadow-glow-cyan'
                  : 'bg-gradient-to-r from-aerova-blue to-cyan-500 text-white shadow-glow-blue hover:shadow-cyan-500/30'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>{isTracked ? 'ROUTE TRACKED · ALERTS ACTIVE' : 'TRACK THIS ROUTE'}</span>
            </button>
          </div>

          {/* RIGHT: ANIMATED 30-DAY PRICE GRAPH (Col 6-12) */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/15 bg-aeriva-charcoal/80 space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono">
                <div>
                  <span className="text-slate-400 uppercase">Historical Trend:</span>{' '}
                  <span className="text-white font-bold">DELHI (DEL) ➔ LONDON (LHR)</span>
                </div>
                <span className="text-slate-400">Last 30 days</span>
              </div>

              {/* SVG CHART */}
              <div className="relative w-full h-64 sm:h-72">
                <svg viewBox="0 0 660 240" className="w-full h-full overflow-visible" fill="none">
                  <defs>
                    <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid lines */}
                  <line x1="20" y1="50" x2="640" y2="50" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                  <line x1="20" y1="100" x2="640" y2="100" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                  <line x1="20" y1="150" x2="640" y2="150" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                  <line x1="20" y1="200" x2="640" y2="200" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />

                  {/* Area fill */}
                  <path d={areaD} fill="url(#chartFill)" />

                  {/* Main Line */}
                  <path d={pathD} stroke="#06B6D4" strokeWidth="3" strokeLinecap="round" />

                  {/* Data Points and value tags */}
                  {points.map((pt, idx) => (
                    <g key={idx} transform={`translate(${pt.x}, ${pt.y})`}>
                      <circle cx="0" cy="0" r="5" fill="#06B6D4" stroke="#040817" strokeWidth="2" />
                      <text
                        x="0"
                        y="-12"
                        textAnchor="middle"
                        fill="#f1f5f9"
                        fontSize="10"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {pt.val}
                      </text>
                      <text
                        x="0"
                        y="18"
                        textAnchor="middle"
                        fill="#64748b"
                        fontSize="9"
                        fontFamily="monospace"
                      >
                        {pt.label}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Lowest recorded: ₹39,500 (5 days ago)</span>
                <span className="text-emerald-400">Volatility index: LOW</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
