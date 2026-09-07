import React, { useState } from 'react';
import {
  CheckCircle,
  Download,
  Calendar,
  Briefcase,
  Plane,
  X,
  Ticket,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { formatPrice } from '../utils/currency';

export const BookingConfirmation: React.FC = () => {
  const {
    activeBooking,
    resetBooking,
    setIsMyTripsOpen,
    setIsBoardingPassOpen,
    currency,
  } = useBooking();

  const [ticketDownloaded, setTicketDownloaded] = useState(false);
  const [calendarAdded, setCalendarAdded] = useState(false);

  if (!activeBooking) return null;

  const primaryPassenger = activeBooking.passengers[0];
  const flight = activeBooking.flight;

  const handleDownload = () => {
    setTicketDownloaded(true);
    setTimeout(() => {
      // Simulate file download
      const element = document.createElement('a');
      const file = new Blob([
        `AERIVA E-TICKET CONFIRMATION\n` +
        `===========================\n` +
        `Booking Reference: ${activeBooking.reference}\n` +
        `Status: ${activeBooking.status}\n` +
        `Passenger: ${primaryPassenger.title} ${primaryPassenger.firstName} ${primaryPassenger.lastName}\n` +
        `Flight: ${flight.airline} ${flight.flightNumber} (${flight.aircraft})\n` +
        `Route: ${flight.from.city} (${flight.from.code}) -> ${flight.to.city} (${flight.to.code})\n` +
        `Departure: ${flight.departureDate} at ${flight.departureTime}\n` +
        `Seat: ${primaryPassenger.seatId || '18A'}\n` +
        `Baggage: ${flight.baggage.cabin} Cabin, ${activeBooking.farePackage.baggageChecked} Checked\n` +
        `Total Amount: ${formatPrice(activeBooking.breakdown.totalINR, currency)}\n`
      ], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `AERIVA_Ticket_${activeBooking.reference}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 400);
  };

  const handleAddToCalendar = () => {
    setCalendarAdded(true);
    setTimeout(() => setCalendarAdded(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-navy-950/90 backdrop-blur-2xl overflow-y-auto">
      <div className="glass-panel w-full max-w-4xl rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-10 my-auto relative overflow-hidden">
        
        {/* Glow ambient lights */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* CLOSE BUTTON */}
        <button
          onClick={resetBooking}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* TOP SUCCESS CELEBRATION HEADER */}
        <div className="text-center space-y-3 pb-8 border-b border-white/10">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/30 animate-bounce">
            <CheckCircle className="w-8 h-8" />
          </div>

          <div className="text-[11px] font-mono tracking-widest text-emerald-400 uppercase">TRANSACTION COMPLETED · PNR ISSUED</div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
            JOURNEY CONFIRMED.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            Your flight has been securely reserved. An official AERIVA e-ticket receipt and digital boarding pass has been dispatched to{' '}
            <span className="text-aeriva-cyan font-mono font-medium">{primaryPassenger.email}</span>.
          </p>

          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-900/90 border border-aeriva-cyan/30">
            <span className="text-xs font-mono uppercase text-slate-400">Booking Reference:</span>
            <span className="text-sm font-mono font-extrabold text-aeriva-cyan tracking-widest">
              {activeBooking.reference}
            </span>
          </div>
        </div>

        {/* DIGITAL HIGH-TECH BOARDING PASS */}
        <div className="my-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-white/15 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          
          {/* Authentic perforated coupon notch styling */}
          <div className="hidden sm:block absolute -top-4 right-1/3 w-8 h-8 bg-navy-950 rounded-full border-b border-white/10" />
          <div className="hidden sm:block absolute -bottom-4 right-1/3 w-8 h-8 bg-navy-950 rounded-full border-t border-white/10" />
          <div className="hidden sm:block absolute top-4 bottom-4 right-1/3 border-r-2 border-dashed border-white/10" />

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            
            {/* BOARDING PASS MAIN CONTENT (Col 1-8) */}
            <div className="sm:col-span-8 space-y-6">
              
              {/* Airline & Class */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="w-9 h-9 rounded-xl bg-aeriva-surface border border-white/15 flex items-center justify-center font-bold text-sm text-aeriva-cyan font-mono">
                    {flight.airlineCode}
                  </span>
                  <div>
                    <div className="font-bold text-white text-base">{flight.airline}</div>
                    <div className="text-xs font-mono text-cyan-400">
                      Flight {flight.flightNumber} · {flight.aircraft}
                    </div>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold">
                  {activeBooking.farePackage.name.toUpperCase()} CLASS
                </div>
              </div>

              {/* Origin -> Destination Times */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-display font-black text-white">
                    {flight.from.code}
                  </div>
                  <div className="text-xs text-slate-300">{flight.from.city}</div>
                  <div className="text-sm font-bold font-mono text-cyan-400 mt-1">
                    {flight.departureTime}
                  </div>
                </div>

                <div className="flex flex-col items-center px-4">
                  <Plane className="w-5 h-5 text-cyan-400 transform rotate-90 sm:rotate-0" />
                  <span className="text-[10px] font-mono text-slate-400 mt-1">{flight.duration}</span>
                  <span className="text-[9px] font-mono text-emerald-400">Non-Stop</span>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-display font-black text-white">
                    {flight.to.code}
                  </div>
                  <div className="text-xs text-slate-300">{flight.to.city}</div>
                  <div className="text-sm font-bold font-mono text-cyan-400 mt-1">
                    {flight.arrivalTime}
                  </div>
                </div>
              </div>

              {/* Passenger and Gate Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Passenger</span>
                  <span className="font-bold text-white truncate block">
                    {primaryPassenger.firstName} {primaryPassenger.lastName}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Seat</span>
                  <span className="font-bold text-cyan-400">
                    {primaryPassenger.seatId || '18A'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Gate</span>
                  <span className="font-bold text-white">B14 (T2)</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Boarding</span>
                  <span className="font-bold text-emerald-400">45m Prior</span>
                </div>
              </div>
            </div>

            {/* BOARDING PASS STUB & BARCODE (Col 9-12) */}
            <div className="sm:col-span-4 flex flex-col items-center justify-center sm:pl-4 space-y-4 pt-4 sm:pt-0 border-t sm:border-t-0 border-white/10">
              
              <div className="text-center">
                <div className="text-[10px] font-mono uppercase text-slate-400">Electronic Boarding Pass</div>
                <div className="text-xs font-bold text-cyan-300 font-mono">SECURE ETKT #{activeBooking.reference}</div>
              </div>

              {/* Simulated High-Res Barcode */}
              <div className="w-full bg-white p-3 rounded-xl flex flex-col items-center justify-center space-y-1 shadow-inner">
                {/* Visual SVG barcode lines */}
                <div className="flex items-center space-x-[2px] h-12 w-full justify-center">
                  {[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6, 2, 6, 4, 3, 3, 8, 3, 2, 7].map((w, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950 h-full"
                      style={{ width: `${w > 5 ? 3 : w > 2 ? 2 : 1}px` }}
                    />
                  ))}
                </div>
                <span className="text-[8px] font-mono text-slate-900 tracking-widest font-bold">
                  * {activeBooking.reference} *
                </span>
              </div>

              <div className="text-center text-[10px] font-mono text-slate-400">
                Paid: <span className="text-white font-bold">{formatPrice(activeBooking.breakdown.totalINR, currency)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-3 pt-4 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-4 py-2.5 rounded-xl bg-aeriva-cyan text-slate-950 font-bold text-xs hover:bg-cyan-400 flex items-center space-x-2 transition-colors shadow-glow-cyan"
            >
              <Download className="w-4 h-4" />
              <span>{ticketDownloaded ? 'Downloaded!' : 'Download Ticket'}</span>
            </button>

            <button
              onClick={() => setIsBoardingPassOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-aeriva-blue hover:bg-blue-600 text-white font-bold text-xs flex items-center space-x-2 transition-colors shadow-glow-blue"
            >
              <Ticket className="w-4 h-4" />
              <span>Digital Boarding Pass</span>
            </button>

            <button
              onClick={handleAddToCalendar}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-200 border border-white/10 hover:border-cyan-400 font-medium text-xs flex items-center space-x-2 transition-colors"
            >
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>{calendarAdded ? 'Added to Calendar!' : 'Add to Calendar'}</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setIsMyTripsOpen(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-aerova-blue to-cyan-500 text-white font-bold text-xs flex items-center space-x-2 shadow-glow-blue"
            >
              <Briefcase className="w-4 h-4" />
              <span>Manage in My Trips</span>
            </button>

            <button
              onClick={resetBooking}
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white text-xs"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
