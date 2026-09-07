import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export const RouteSection: React.FC = () => {
  const [planeProgress, setPlaneProgress] = useState(0.42);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaneProgress(prev => (prev >= 0.98 ? 0.02 : prev + 0.003));
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Multi-stop 2-segment Bezier trajectory:
  // Segment 1: Delhi (700, 240) -> Dubai (440, 220)
  // Segment 2: Dubai (440, 220) -> London (160, 110)
  const t = planeProgress;
  let px = 0;
  let py = 0;
  let angle = 0;

  if (t < 0.5) {
    // Delhi to Dubai
    const segT = t * 2;
    const p0 = { x: 720, y: 250 };
    const p1 = { x: 580, y: 200 };
    const p2 = { x: 440, y: 230 };
    px = (1 - segT) * (1 - segT) * p0.x + 2 * (1 - segT) * segT * p1.x + segT * segT * p2.x;
    py = (1 - segT) * (1 - segT) * p0.y + 2 * (1 - segT) * segT * p1.y + segT * segT * p2.y;
    const dx = 2 * (1 - segT) * (p1.x - p0.x) + 2 * segT * (p2.x - p1.x);
    const dy = 2 * (1 - segT) * (p1.y - p0.y) + 2 * segT * (p2.y - p1.y);
    angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  } else {
    // Dubai to London
    const segT = (t - 0.5) * 2;
    const p0 = { x: 440, y: 230 };
    const p1 = { x: 280, y: 130 };
    const p2 = { x: 140, y: 120 };
    px = (1 - segT) * (1 - segT) * p0.x + 2 * (1 - segT) * segT * p1.x + segT * segT * p2.x;
    py = (1 - segT) * (1 - segT) * p0.y + 2 * (1 - segT) * segT * p1.y + segT * segT * p2.y;
    const dx = 2 * (1 - segT) * (p1.x - p0.x) + 2 * segT * (p2.x - p1.x);
    const dy = 2 * (1 - segT) * (p1.y - p0.y) + 2 * segT * (p2.y - p1.y);
    angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  }

  return (
    <section className="relative py-28 bg-aeriva-navy text-white overflow-hidden border-t border-white/10">
      
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-aeriva-blue/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* HEADER */}
        <div className="max-w-2xl space-y-4 mb-14">
          <div className="text-xs font-mono uppercase tracking-widestlabel text-cyan-400 font-bold">
            03 / ROUTE VISUALIZATION
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tightest leading-tight text-white">
            THE ROUTE <br />
            BETWEEN YOU <br />
            <span className="bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
              AND THERE.
            </span>
          </h2>
          <p className="text-sm text-slate-300 max-w-md leading-relaxed">
            Stylized radar telemetry showing the flagship flight path connecting Delhi to London via Dubai International.
          </p>
        </div>

        {/* STYLIZED AVIATION RADAR MAP CANVAS */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/15 relative overflow-hidden bg-aeriva-charcoal/80">
          
          {/* Top Telemetry strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 text-xs font-mono">
            <div className="flex items-center space-x-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-slate-300">RADAR ACTIVE · FLIGHT EK 513</span>
            </div>
            <div className="flex items-center space-x-6 text-slate-400">
              <span className="flex items-center space-x-1.5 text-white font-bold">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>10h 00m total journey</span>
              </span>
              <span>1 connection</span>
              <span className="text-cyan-400 font-bold">Dubai International (DXB)</span>
            </div>
          </div>

          {/* SVG RADAR TRAJECTORY */}
          <div className="relative w-full h-[320px] sm:h-[420px] my-6">
            <svg
              viewBox="0 0 860 380"
              className="w-full h-full overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Radar Coordinate Grid */}
              <circle cx="430" cy="200" r="180" stroke="rgba(255,255,255,0.04)" strokeDasharray="6 6" />
              <circle cx="430" cy="200" r="320" stroke="rgba(255,255,255,0.03)" strokeDasharray="6 6" />
              <line x1="80" y1="200" x2="780" y2="200" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
              <line x1="430" y1="40" x2="430" y2="340" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />

              {/* Glowing Route Ribbon: Segment 1 (DEL -> DXB) */}
              <path
                d="M 720,250 Q 580,200 440,230"
                stroke="rgba(6, 182, 212, 0.2)"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d="M 720,250 Q 580,200 440,230"
                stroke="#06B6D4"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="6 4"
              />

              {/* Glowing Route Ribbon: Segment 2 (DXB -> LHR) */}
              <path
                d="M 440,230 Q 280,130 140,120"
                stroke="rgba(37, 99, 235, 0.25)"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d="M 440,230 Q 280,130 140,120"
                stroke="#3B82F6"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="6 4"
              />

              {/* NODE 1: DELHI (DEL) */}
              <g transform="translate(720, 250)">
                <circle cx="0" cy="0" r="18" fill="rgba(6, 182, 212, 0.2)" />
                <circle cx="0" cy="0" r="7" fill="#06B6D4" />
                <circle cx="0" cy="0" r="3" fill="#040817" />
              </g>

              {/* NODE 2: DUBAI (DXB) CONNECTION */}
              <g transform="translate(440, 230)">
                <circle cx="0" cy="0" r="22" fill="rgba(255, 107, 53, 0.2)" />
                <circle cx="0" cy="0" r="8" fill="#FF6B35" />
                <circle cx="0" cy="0" r="3" fill="#040817" />
              </g>

              {/* NODE 3: LONDON (LHR) DESTINATION */}
              <g transform="translate(140, 120)">
                <circle cx="0" cy="0" r="20" fill="rgba(59, 130, 246, 0.25)" />
                <circle cx="0" cy="0" r="7" fill="#3B82F6" />
                <circle cx="0" cy="0" r="3" fill="#040817" />
              </g>

              {/* AIRCRAFT TRAVELING ICON */}
              <g transform={`translate(${px}, ${py}) rotate(${angle})`}>
                <circle cx="0" cy="0" r="14" fill="rgba(0, 240, 255, 0.3)" />
                <g transform="translate(-10, -10) scale(0.85)">
                  <polygon points="12 2 2 22 12 17 22 22 12 2" fill="#ffffff" stroke="#00f0ff" strokeWidth="1.5" />
                </g>
              </g>
            </svg>

            {/* NODE LABELS */}
            <div className="absolute bottom-4 right-10 sm:right-16 text-right">
              <span className="text-xl sm:text-2xl font-display font-black text-white block">DELHI (DEL)</span>
              <span className="text-xs font-mono text-cyan-400">02:45 Departure · Terminal 3</span>
            </div>

            <div className="absolute top-2/3 left-1/2 -translate-x-1/2 text-center">
              <span className="text-base sm:text-lg font-display font-bold text-aeriva-orange block">DUBAI (DXB)</span>
              <span className="text-[11px] font-mono text-slate-400">Connection · 2h 15m layover</span>
            </div>

            <div className="absolute top-4 left-6 sm:left-12 text-left">
              <span className="text-xl sm:text-2xl font-display font-black text-white block">LONDON (LHR)</span>
              <span className="text-xs font-mono text-aeriva-electric">07:15 Arrival · Heathrow Terminal 3</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
