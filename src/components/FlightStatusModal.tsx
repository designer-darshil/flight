import React, { useState } from 'react';
import {
  Activity,
  Search,
  X,
  Plane,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { FlightStatusInfo } from '../types';
import { AIRPORTS } from '../data/airports';

export const FlightStatusModal: React.FC = () => {
  const { isFlightStatusOpen, setIsFlightStatusOpen } = useBooking();

  const [searchQuery, setSearchQuery] = useState('EK 513');
  const [activeResult, setActiveResult] = useState<FlightStatusInfo>({
    flightNumber: 'EK 513',
    airline: 'Emirates',
    from: AIRPORTS[0], // DEL
    to: AIRPORTS[2],   // LHR
    scheduledDeparture: '04:15',
    actualDeparture: '04:15',
    scheduledArrival: '14:20',
    estimatedArrival: '14:10',
    terminal: 'Terminal 3',
    gate: 'Gate B12',
    baggageBelt: 'Carousel 4',
    status: 'On Time',
    progressPercent: 74,
    aircraft: 'Boeing 777-300ER',
  });

  if (!isFlightStatusOpen) return null;

  const mockFlightDatabase: Record<string, FlightStatusInfo> = {
    'EK 513': {
      flightNumber: 'EK 513',
      airline: 'Emirates',
      from: AIRPORTS[0], // DEL
      to: AIRPORTS[2],   // LHR
      scheduledDeparture: '04:15',
      actualDeparture: '04:15',
      scheduledArrival: '14:20',
      estimatedArrival: '14:10',
      terminal: 'Terminal 3',
      gate: 'Gate B12',
      baggageBelt: 'Carousel 4',
      status: 'On Time',
      progressPercent: 74,
      aircraft: 'Boeing 777-300ER',
    },
    'AI 101': {
      flightNumber: 'AI 101',
      airline: 'Air India',
      from: AIRPORTS[0], // DEL
      to: AIRPORTS[5],   // JFK
      scheduledDeparture: '02:20',
      actualDeparture: '02:25',
      scheduledArrival: '07:35',
      estimatedArrival: '07:28',
      terminal: 'Terminal 3',
      gate: 'Gate 32',
      baggageBelt: 'Belt 8',
      status: 'In Air',
      progressPercent: 42,
      aircraft: 'Boeing 787-9 Dreamliner',
    },
    'BA 142': {
      flightNumber: 'BA 142',
      airline: 'British Airways',
      from: AIRPORTS[0], // DEL
      to: AIRPORTS[2],   // LHR
      scheduledDeparture: '03:15',
      actualDeparture: '03:20',
      scheduledArrival: '07:50',
      estimatedArrival: '07:45',
      terminal: 'Terminal 3',
      gate: 'Gate A08',
      baggageBelt: 'Carousel 7',
      status: 'In Air',
      progressPercent: 88,
      aircraft: 'Airbus A350-1000',
    },
    '6E 1457': {
      flightNumber: '6E 1457',
      airline: 'IndiGo',
      from: AIRPORTS[0], // BOM
      to: AIRPORTS[1],   // DXB
      scheduledDeparture: '08:20',
      actualDeparture: '08:20',
      scheduledArrival: '10:15',
      estimatedArrival: '10:10',
      terminal: 'Terminal 2',
      gate: 'Gate A04',
      baggageBelt: 'Carousel 2',
      status: 'Landed',
      progressPercent: 100,
      aircraft: 'Airbus A321neo',
    },
    'SQ 423': {
      flightNumber: 'SQ 423',
      airline: 'Singapore Airlines',
      from: AIRPORTS[0], // BOM
      to: AIRPORTS[4],   // SIN
      scheduledDeparture: '23:40',
      actualDeparture: '23:40',
      scheduledArrival: '07:40',
      estimatedArrival: '07:40',
      terminal: 'Terminal 2',
      gate: 'Gate B02',
      baggageBelt: 'Carousel 6',
      status: 'Boarding',
      progressPercent: 0,
      aircraft: 'Airbus A350-900',
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = searchQuery.trim().toUpperCase();
    const found = mockFlightDatabase[cleanQuery];
    if (found) {
      setActiveResult(found);
    } else {
      // Default generated status for arbitrary flight numbers
      setActiveResult({
        flightNumber: cleanQuery,
        airline: 'AERIVA Partner',
        from: AIRPORTS[0],
        to: AIRPORTS[2],
        scheduledDeparture: '14:15',
        actualDeparture: '14:20',
        scheduledArrival: '17:45',
        estimatedArrival: '17:40',
        terminal: 'Terminal 2',
        gate: 'Gate C12',
        baggageBelt: 'Carousel 3',
        status: 'On Time',
        progressPercent: 20,
        aircraft: 'Airbus A350-900',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-navy-950/90 backdrop-blur-2xl overflow-y-auto">
      <div className="glass-panel w-full max-w-3xl rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8 my-auto relative overflow-hidden">
        
        {/* HEADER */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-extrabold text-white">
                Live Flight Radar & Status
              </h2>
              <p className="text-xs text-slate-400">
                Track real-time flight telemetry, departure gates, and baggage carousels.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsFlightStatusOpen(false)}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* FLIGHT SEARCH BAR */}
        <form onSubmit={handleSearch} className="my-6 flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by Flight # (e.g. AI 101, EK 501, 6E 1457, SQ 423)"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full glass-input p-3 pl-10 rounded-2xl text-xs font-mono uppercase text-white placeholder-slate-400 focus:border-cyan-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors shadow-glow-cyan"
          >
            Track Flight
          </button>
        </form>

        {/* LIVE STATUS CARD */}
        <div className="glass-panel p-6 rounded-3xl border border-white/15 space-y-6">
          
          {/* Status Badge & Airline */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl font-display font-bold text-white flex items-center space-x-2">
                <span>{activeResult.flightNumber}</span>
                <span className="text-xs font-mono text-cyan-400 font-normal">
                  ({activeResult.airline})
                </span>
              </div>
              <div className="text-xs text-slate-400 font-mono">{activeResult.aircraft}</div>
            </div>

            <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>{activeResult.status.toUpperCase()}</span>
            </div>
          </div>

          {/* Route Radar Timeline */}
          <div className="grid grid-cols-3 gap-4 items-center pt-2">
            <div>
              <div className="text-3xl font-display font-black text-white">{activeResult.from.code}</div>
              <div className="text-xs text-slate-300">{activeResult.from.city}</div>
              <div className="text-xs font-mono text-slate-400 mt-1">
                Dep: <strong className="text-white">{activeResult.actualDeparture}</strong>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-[10px] font-mono text-cyan-400 mb-1">
                {activeResult.progressPercent}% Route Completed
              </span>
              <div className="w-full bg-slate-800 rounded-full h-2 relative overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-aerova-blue via-cyan-400 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${activeResult.progressPercent}%` }}
                />
              </div>
              <Plane className="w-4 h-4 text-cyan-400 mt-2 transform rotate-90" />
            </div>

            <div className="text-right">
              <div className="text-3xl font-display font-black text-white">{activeResult.to.code}</div>
              <div className="text-xs text-slate-300">{activeResult.to.city}</div>
              <div className="text-xs font-mono text-slate-400 mt-1">
                Est: <strong className="text-cyan-300">{activeResult.estimatedArrival}</strong>
              </div>
            </div>
          </div>

          {/* Airport Telemetry: Terminal, Gate, Baggage Carousel */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
              <div className="text-[10px] text-slate-400 uppercase">Terminal</div>
              <div className="text-sm font-bold text-white mt-0.5">{activeResult.terminal}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
              <div className="text-[10px] text-slate-400 uppercase">Departure Gate</div>
              <div className="text-sm font-bold text-cyan-300 mt-0.5">{activeResult.gate}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
              <div className="text-[10px] text-slate-400 uppercase">Baggage Belt</div>
              <div className="text-sm font-bold text-emerald-400 mt-0.5">{activeResult.baggageBelt}</div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="pt-5 mt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={() => setIsFlightStatusOpen(false)}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
          >
            Close Tracker
          </button>
        </div>
      </div>
    </div>
  );
};
