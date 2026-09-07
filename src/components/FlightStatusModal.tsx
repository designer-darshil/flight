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
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = searchQuery.trim().toUpperCase();
    const found = mockFlightDatabase[cleanQuery];
    if (found) {
      setActiveResult(found);
    } else {
      setActiveResult({
        flightNumber: cleanQuery,
        airline: 'AERIVA Interline Partner',
        from: AIRPORTS[0],
        to: AIRPORTS[2],
        scheduledDeparture: '14:15',
        actualDeparture: '14:20',
        scheduledArrival: '17:45',
        estimatedArrival: '17:40',
        terminal: 'Terminal 3',
        gate: 'Gate B14',
        baggageBelt: 'Carousel 3',
        status: 'On Time',
        progressPercent: 20,
        aircraft: 'Airbus A350-900',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-ink/40 backdrop-blur-sm overflow-y-auto">
      <div className="bg-paper w-full max-w-3xl rounded-2xl border border-border shadow-2xl p-6 sm:p-8 my-auto relative text-ink">
        
        {/* HEADER */}
        <div className="flex items-center justify-between pb-5 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-sand border border-border flex items-center justify-center text-terracotta">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-serif font-light text-ink">
                Live Flight Status
              </h2>
              <p className="text-xs text-warm-gray font-serif">
                Direct IATA radar telemetry, gates, and baggage carousels.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsFlightStatusOpen(false)}
            className="p-2 rounded-lg hover:bg-sand text-warm-gray hover:text-ink transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* FLIGHT SEARCH BAR */}
        <form onSubmit={handleSearch} className="my-6 flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Enter flight number (e.g. EK 513, AI 101, BA 142)"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full p-2.5 pl-9 rounded-lg border border-border text-xs font-mono uppercase bg-paper text-ink placeholder-warm-gray/60 focus:outline-none focus:border-terracotta"
            />
            <Search className="w-4 h-4 text-warm-gray absolute left-3 top-3" />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-terracotta hover:bg-terracotta-hover text-paper font-mono text-xs font-medium uppercase tracking-wider transition-colors shadow-sm"
          >
            Track
          </button>
        </form>

        {/* LIVE STATUS CARD */}
        <div className="p-6 rounded-xl bg-sand/30 border border-border space-y-6">
          
          {/* Status Badge & Airline */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl font-serif font-medium text-ink flex items-center space-x-2">
                <span>{activeResult.flightNumber}</span>
                <span className="text-xs font-mono text-warm-gray font-normal">
                  ({activeResult.airline})
                </span>
              </div>
              <div className="text-xs text-warm-gray font-mono">{activeResult.aircraft}</div>
            </div>

            <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-olive/10 text-olive border border-olive/20 text-xs font-mono font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-olive animate-pulse" />
              <span>{activeResult.status.toUpperCase()}</span>
            </div>
          </div>

          {/* Route Radar Timeline */}
          <div className="grid grid-cols-3 gap-4 items-center pt-2">
            <div>
              <div className="text-3xl font-serif font-bold text-ink">{activeResult.from.code}</div>
              <div className="text-xs text-warm-gray">{activeResult.from.city}</div>
              <div className="text-xs font-mono text-warm-gray mt-1">
                Dep: <strong className="text-ink font-medium">{activeResult.actualDeparture}</strong>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-[10px] font-mono text-warm-gray mb-1">
                {activeResult.progressPercent}% Route Completed
              </span>
              <div className="w-full bg-sand rounded-full h-1.5 relative overflow-hidden border border-border">
                <div
                  className="h-full bg-terracotta rounded-full transition-all duration-500"
                  style={{ width: `${activeResult.progressPercent}%` }}
                />
              </div>
              <Plane className="w-4 h-4 text-terracotta mt-2 rotate-90" />
            </div>

            <div className="text-right">
              <div className="text-3xl font-serif font-bold text-ink">{activeResult.to.code}</div>
              <div className="text-xs text-warm-gray">{activeResult.to.city}</div>
              <div className="text-xs font-mono text-warm-gray mt-1">
                Est: <strong className="text-ink font-medium">{activeResult.estimatedArrival}</strong>
              </div>
            </div>
          </div>

          {/* Airport Telemetry: Terminal, Gate, Baggage Carousel */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border text-xs font-mono">
            <div className="p-3 rounded-lg bg-paper border border-border">
              <div className="text-[10px] text-warm-gray uppercase">Terminal</div>
              <div className="text-sm font-medium text-ink mt-0.5">{activeResult.terminal}</div>
            </div>

            <div className="p-3 rounded-lg bg-paper border border-border">
              <div className="text-[10px] text-warm-gray uppercase">Departure Gate</div>
              <div className="text-sm font-medium text-terracotta mt-0.5">{activeResult.gate}</div>
            </div>

            <div className="p-3 rounded-lg bg-paper border border-border">
              <div className="text-[10px] text-warm-gray uppercase">Baggage Claim</div>
              <div className="text-sm font-medium text-olive mt-0.5">{activeResult.baggageBelt}</div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="pt-4 mt-4 border-t border-border flex justify-end">
          <button
            onClick={() => setIsFlightStatusOpen(false)}
            className="px-5 py-2.5 rounded-lg bg-sand hover:bg-sand/80 text-ink font-mono text-xs font-medium transition-colors"
          >
            Close Radar
          </button>
        </div>
      </div>
    </div>
  );
};
