import React from 'react';
import { Plane, QrCode, Shield, Sparkles } from 'lucide-react';
import { Flight, Passenger } from '../types';

export interface BoardingPassProps {
  passenger: {
    title?: string;
    firstName: string;
    lastName: string;
    seatId?: string;
    tier?: string;
  } | Passenger;
  flight: Flight;
  reference: string;
  cabinClass?: string;
  gate?: string;
  boardingTime?: string;
  variant?: 'full' | 'compact' | 'modal';
  showAnimation?: boolean;
}

export const BoardingPass: React.FC<BoardingPassProps> = ({
  passenger,
  flight,
  reference,
  cabinClass = 'Standard',
  gate = 'B14',
  boardingTime = '45m Prior',
  showAnimation = true,
}) => {
  return (
    <div className="w-full bg-[#FFFFFF] rounded-[12px] border border-[#D8D1C5] shadow-[0_20px_60px_rgba(23,23,23,0.08)] overflow-hidden text-[#171717] relative">
      
      {/* HEADER STRIP - BLACK / BRAND LUXURY */}
      <div className="bg-[#171717] text-[#FFFFFF] px-6 py-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-serif tracking-[0.2em] font-light text-[#F6F2EA]">
            AERIVA
          </span>
          <span className="text-[10px] font-mono tracking-widest text-[#EFE9DE]/80 uppercase pl-3 border-l border-white/20 hidden sm:inline">
            Official Flight Pass
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-[10px] font-mono tracking-wider text-[#FFFFFF] border border-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#963F24]" />
            <span>{cabinClass.toUpperCase()}</span>
          </div>
          <span className="text-[10px] font-mono text-[#D8D1C5] hidden sm:inline font-bold tracking-widest">
            {reference}
          </span>
        </div>
      </div>

      {/* MAIN BODY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 relative">
        
        {/* LEFT COLUMN: ROUTE, TIMES, PASSENGER INFO (8 cols on lg) */}
        <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          
          {/* AIRLINE & FLIGHT META */}
          <div className="flex items-center justify-between pb-4 border-b border-[#D8D1C5]/70">
            <div className="flex items-center space-x-3">
              <span className="w-9 h-9 rounded-[8px] bg-[#F6F2EA] border border-[#D8D1C5] flex items-center justify-center font-bold text-sm text-[#171717] font-mono">
                {flight.airlineCode}
              </span>
              <div>
                <div className="font-serif font-medium text-[#171717] text-base leading-tight">
                  {flight.airline}
                </div>
                <div className="text-xs font-mono text-[#6F6A61]">
                  Flight {flight.flightNumber} &bull; {flight.aircraft}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#6F6A61]">Date</div>
              <div className="text-xs font-mono font-medium text-[#171717]">
                {flight.departureDate}
              </div>
            </div>
          </div>

          {/* ROUTE SECTION WITH SUBTLE ROUTE ANIMATION */}
          <div className="py-2">
            <div className="flex items-center justify-between">
              {/* ORIGIN */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#6F6A61] block">
                  Origin
                </span>
                <div className="text-3xl sm:text-4xl font-serif font-bold text-[#171717] tracking-tight">
                  {flight.from.code}
                </div>
                <div className="text-xs text-[#6F6A61] font-sans truncate max-w-[120px] sm:max-w-none">
                  {flight.from.city}
                </div>
                <div className="text-sm font-mono font-medium text-[#963F24] mt-1">
                  {flight.departureTime}
                </div>
              </div>

              {/* ROUTE LINE WITH ANIMATED PLANE & TRAIL */}
              <div className="flex-1 px-4 sm:px-8 max-w-xs mx-auto">
                <div className="flex flex-col items-center">
                  <div className="text-[10px] font-mono text-[#6F6A61] mb-1.5 flex items-center gap-1.5">
                    <span>{flight.duration}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#59604F]/10 text-[#59604F] font-medium">
                      Non-Stop
                    </span>
                  </div>

                  {/* SVG Route Curve with smooth subtle airplane motion */}
                  <div className="relative w-full h-8 flex items-center justify-center">
                    <svg className="w-full h-8 overflow-visible" viewBox="0 0 200 32" fill="none">
                      {/* Base Track */}
                      <path
                        d="M 10 24 C 60 4, 140 4, 190 24"
                        stroke="#D8D1C5"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />
                      
                      {/* Active Trajectory Line */}
                      <path
                        d="M 10 24 C 60 4, 140 4, 190 24"
                        stroke="#963F24"
                        strokeWidth="2"
                        strokeDasharray="12 180"
                        className={showAnimation ? "animate-pulse" : ""}
                      />
                    </svg>

                    {/* Animated Plane along route */}
                    <div
                      className="absolute"
                      style={{
                        animation: showAnimation ? 'pulse 2.5s ease-in-out infinite' : 'none'
                      }}
                    >
                      <div className="w-6 h-6 rounded-full bg-[#FFFFFF] border border-[#D8D1C5] shadow-sm flex items-center justify-center text-[#963F24]">
                        <Plane className="w-3.5 h-3.5 rotate-45 transform" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full text-[9px] font-mono text-[#6F6A61] mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#171717]" />
                    <span className="tracking-widest uppercase text-[8px] text-[#59604F]">Corridor {flight.from.code}-{flight.to.code}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#963F24]" />
                  </div>
                </div>
              </div>

              {/* DESTINATION */}
              <div className="text-right">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#6F6A61] block">
                  Destination
                </span>
                <div className="text-3xl sm:text-4xl font-serif font-bold text-[#171717] tracking-tight">
                  {flight.to.code}
                </div>
                <div className="text-xs text-[#6F6A61] font-sans truncate max-w-[120px] sm:max-w-none">
                  {flight.to.city}
                </div>
                <div className="text-sm font-mono font-medium text-[#963F24] mt-1">
                  {flight.arrivalTime}
                </div>
              </div>
            </div>
          </div>

          {/* PASSENGER, SEAT, GATE, BOARDING GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#D8D1C5]/70 text-xs font-mono">
            <div>
              <span className="text-[10px] text-[#6F6A61] uppercase tracking-wider block">
                Passenger
              </span>
              <span className="font-semibold text-[#171717] truncate block text-sm font-sans mt-0.5">
                {passenger.title ? `${passenger.title} ` : ''}{passenger.firstName} {passenger.lastName}
              </span>
              <span className="text-[9px] text-[#59604F] font-mono">Verified ID</span>
            </div>

            <div>
              <span className="text-[10px] text-[#6F6A61] uppercase tracking-wider block">
                Seat
              </span>
              <span className="font-bold text-[#963F24] text-base font-mono block mt-0.5">
                {passenger.seatId || '18A'}
              </span>
              <span className="text-[9px] text-[#6F6A61] font-mono">Standard/Extra</span>
            </div>

            <div>
              <span className="text-[10px] text-[#6F6A61] uppercase tracking-wider block">
                Gate
              </span>
              <span className="font-semibold text-[#171717] text-base font-mono block mt-0.5">
                {gate}
              </span>
              <span className="text-[9px] text-[#6F6A61] font-mono">Terminal 2</span>
            </div>

            <div>
              <span className="text-[10px] text-[#6F6A61] uppercase tracking-wider block">
                Boarding
              </span>
              <span className="font-bold text-[#59604F] text-base font-mono block mt-0.5">
                {boardingTime}
              </span>
              <span className="text-[9px] text-[#59604F] font-mono">Closes 15m prior</span>
            </div>
          </div>
        </div>

        {/* PERFORATION NOTCH STYLING (BETWEEN COLUMNS) */}
        <div className="hidden lg:block absolute top-0 bottom-0 left-[66.666%] w-px border-r border-dashed border-[#D8D1C5]">
          <div className="absolute -top-3 -left-3 w-6 h-6 bg-[#F6F2EA] rounded-full border-b border-[#D8D1C5]" />
          <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-[#F6F2EA] rounded-full border-t border-[#D8D1C5]" />
        </div>

        {/* RIGHT COLUMN: STUB WITH QR CODE & AIRLINE STAMP (4 cols on lg) */}
        <div className="lg:col-span-4 bg-[#F6F2EA]/40 p-6 sm:p-8 flex flex-col items-center justify-between border-t lg:border-t-0 border-[#D8D1C5] space-y-5">
          
          <div className="text-center w-full">
            <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#6F6A61]">
              <Sparkles className="w-3 h-3 text-[#963F24]" />
              <span>Digital Boarding Pass</span>
            </div>
            <div className="text-xs font-mono font-semibold text-[#171717] mt-0.5">
              ETKT #{reference}
            </div>
          </div>

          {/* QR CODE CONTAINER */}
          <div className="bg-[#FFFFFF] p-4 rounded-[10px] border border-[#D8D1C5] shadow-sm flex flex-col items-center space-y-2.5 w-44">
            <div className="relative p-1">
              <QrCode className="w-28 h-28 text-[#171717]" strokeWidth={1.5} />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-7 h-7 rounded-[4px] bg-[#FFFFFF] border border-[#D8D1C5] flex items-center justify-center shadow-xs">
                  <span className="text-[9px] font-serif font-bold text-[#963F24]">A</span>
                </div>
              </div>
            </div>

            <div className="text-center space-y-0.5">
              <div className="text-[9px] font-mono tracking-widest uppercase text-[#6F6A61]">
                Scan At Gate
              </div>
              <div className="text-[10px] font-mono font-semibold text-[#171717]">
                {flight.airlineCode} &bull; {passenger.seatId || '18A'}
              </div>
            </div>
          </div>

          {/* DIGITAL STAMP & ENCRYPTION BADGE */}
          <div className="w-full text-center space-y-1">
            <div className="inline-flex items-center gap-1 text-[10px] font-mono text-[#59604F]">
              <Shield className="w-3 h-3 text-[#59604F]" />
              <span>ICAO Standard &bull; Biometric Ready</span>
            </div>
            <div className="text-[9px] font-mono text-[#6F6A61]">
              Present barcode or QR to security scanner
            </div>
          </div>
        </div>
      </div>

      {/* TICKET FOOTER STRIP */}
      <div className="bg-[#EFE9DE]/60 px-6 py-2.5 sm:px-8 border-t border-[#D8D1C5] flex flex-wrap items-center justify-between text-[10px] font-mono text-[#6F6A61] gap-2">
        <div className="flex items-center space-x-3">
          <span>STATUS: <strong className="text-[#59604F]">CONFIRMED &bull; ACTIVE</strong></span>
          <span className="hidden sm:inline">&bull;</span>
          <span className="hidden sm:inline">CABIN: <strong className="text-[#171717]">{flight.baggage.cabin}</strong></span>
        </div>
        <div className="tracking-wider">
          AERIVA SYSTEM ISSUANCE &bull; NON-TRANSFERABLE
        </div>
      </div>
    </div>
  );
};
