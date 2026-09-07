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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[rgba(23,23,23,0.25)] overflow-y-auto">
      <div className="bg-[#FFFFFF] w-full max-w-3xl rounded-[16px] border border-[#D8D1C5] shadow-[0_24px_60px_rgba(23,23,23,0.10)] p-6 sm:p-8 my-auto relative text-[#171717]">
        
        {/* HEADER */}
        <div className="flex items-center justify-between pb-5 border-b border-[#D8D1C5]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-[8px] bg-[#EFE9DE] border border-[#D8D1C5] flex items-center justify-center text-[#963F24]">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#59604F] uppercase font-semibold block">
                FLIGHT RADAR &bull; OPERATIONAL TELEMETRY
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#171717]">
                Live Flight Status
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsFlightStatusOpen(false)}
            className="p-2 rounded-[8px] hover:bg-[#EFE9DE] text-[#6F6A61] hover:text-[#171717] transition-colors font-mono text-xs"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* FLIGHT SEARCH BAR */}
        <form onSubmit={handleSearch} className="my-6 flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search flight number (e.g. EK 513)"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="h-12 w-full pl-11 pr-4 rounded-[8px] border border-[#D8D1C5] text-xs font-mono uppercase bg-[#FFFFFF] text-[#171717] placeholder-[#6F6A61] focus:outline-none focus:border-[#963F24]"
            />
            <Search className="w-4 h-4 text-[#6F6A61] absolute left-4 top-4" />
          </div>
          <button
            type="submit"
            className="h-12 px-6 rounded-[8px] bg-[#963F24] hover:bg-[#7E331B] text-[#FFFFFF] font-mono text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
          >
            TRACK FLIGHT
          </button>
        </form>

        {/* LIVE STATUS CARD - CLEAN OPERATIONAL BUT PREMIUM UI (NOT A DARK CONTROL PANEL) */}
        <div className="p-6 sm:p-8 rounded-[12px] bg-[#F6F2EA] border border-[#D8D1C5] space-y-6">
          
          {/* Status Badge & Airline */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#D8D1C5]">
            <div>
              <div className="text-2xl font-serif font-bold text-[#171717] flex items-center space-x-3">
                <span>{activeResult.flightNumber}</span>
                <span className="text-xs font-mono text-[#6F6A61] font-normal">
                  ({activeResult.airline})
                </span>
              </div>
              <div className="text-xs text-[#6F6A61] font-mono mt-0.5">{activeResult.aircraft}</div>
            </div>

            <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-[#59604F]/10 text-[#59604F] border border-[#59604F]/20 text-xs font-mono font-bold tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#59604F] animate-pulse" />
              <span>ON TIME</span>
            </div>
          </div>

          {/* Route Display: DEL → LHR */}
          <div className="grid grid-cols-3 gap-4 items-center pt-2">
            <div>
              <span className="text-[10px] font-mono text-[#6F6A61] uppercase block">Origin</span>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-[#171717]">{activeResult.from.code}</div>
              <div className="text-xs text-[#6F6A61]">{activeResult.from.city}</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-xl sm:text-2xl font-serif text-[#171717] flex items-center gap-2">
                <span>{activeResult.from.code}</span>
                <span className="text-[#963F24] text-lg">➔</span>
                <span>{activeResult.to.code}</span>
              </div>
              <span className="text-[10px] font-mono text-[#59604F] font-semibold mt-1">Airborne Radar Active</span>
              <Plane className="w-4 h-4 text-[#963F24] mt-2 rotate-90" />
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono text-[#6F6A61] uppercase block">Destination</span>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-[#171717]">{activeResult.to.code}</div>
              <div className="text-xs text-[#6F6A61]">{activeResult.to.city}</div>
            </div>
          </div>

          {/* Airport Telemetry: Departure, Boarding, Gate, Terminal, Arrival */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-6 border-t border-[#D8D1C5] text-xs font-mono">
            {/* Departure */}
            <div className="p-3.5 rounded-[8px] bg-[#FFFFFF] border border-[#D8D1C5]">
              <div className="text-[10px] text-[#6F6A61] uppercase">Departure</div>
              <div className="text-base font-serif font-bold text-[#171717] mt-0.5">{activeResult.actualDeparture}</div>
              <div className="text-[9px] text-[#59604F]">Scheduled</div>
            </div>

            {/* Boarding */}
            <div className="p-3.5 rounded-[8px] bg-[#FFFFFF] border border-[#D8D1C5]">
              <div className="text-[10px] text-[#6F6A61] uppercase">Boarding</div>
              <div className="text-base font-serif font-bold text-[#59604F] mt-0.5">01:55</div>
              <div className="text-[9px] text-[#59604F]">Gate open</div>
            </div>

            {/* Gate */}
            <div className="p-3.5 rounded-[8px] bg-[#FFFFFF] border border-[#D8D1C5]">
              <div className="text-[10px] text-[#6F6A61] uppercase">Gate</div>
              <div className="text-base font-serif font-bold text-[#963F24] mt-0.5">{activeResult.gate}</div>
              <div className="text-[9px] text-[#6F6A61]">Concourse B</div>
            </div>

            {/* Terminal */}
            <div className="p-3.5 rounded-[8px] bg-[#FFFFFF] border border-[#D8D1C5]">
              <div className="text-[10px] text-[#6F6A61] uppercase">Terminal</div>
              <div className="text-base font-serif font-bold text-[#171717] mt-0.5">{activeResult.terminal}</div>
              <div className="text-[9px] text-[#6F6A61]">International</div>
            </div>

            {/* Arrival */}
            <div className="col-span-2 sm:col-span-1 p-3.5 rounded-[8px] bg-[#FFFFFF] border border-[#D8D1C5]">
              <div className="text-[10px] text-[#6F6A61] uppercase">Arrival</div>
              <div className="text-base font-serif font-bold text-[#171717] mt-0.5">{activeResult.estimatedArrival}</div>
              <div className="text-[9px] text-[#59604F]">Estimated</div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="pt-4 mt-6 border-t border-[#D8D1C5] flex justify-end">
          <button
            onClick={() => setIsFlightStatusOpen(false)}
            className="h-11 px-5 rounded-[8px] bg-[#EFE9DE] hover:bg-[#D8D1C5] text-[#171717] font-mono text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Close Radar
          </button>
        </div>
      </div>
    </div>
  );
};
