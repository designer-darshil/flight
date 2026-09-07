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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-ink/40 backdrop-blur-sm overflow-y-auto">
      <div className="bg-paper w-full max-w-4xl rounded-2xl border border-border shadow-2xl p-6 sm:p-10 my-auto relative text-ink">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={resetBooking}
          className="absolute top-5 right-5 p-2 rounded-lg hover:bg-sand text-warm-gray hover:text-ink transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* SUCCESS CELEBRATION HEADER */}
        <div className="text-center space-y-3 pb-8 border-b border-border">
          <div className="w-14 h-14 rounded-full bg-olive/15 border border-olive/30 text-olive mx-auto flex items-center justify-center shadow-sm">
            <CheckCircle className="w-7 h-7" />
          </div>

          <div className="text-[11px] font-mono tracking-widest text-olive uppercase font-medium">
            TRANSACTION VERIFIED &bull; TICKET ISSUED
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-ink tracking-tight">
            Journey confirmed.
          </h2>
          <p className="text-xs sm:text-sm text-warm-gray max-w-md mx-auto font-sans leading-relaxed">
            Your trip to <strong className="text-ink font-medium">{flight.to.city}</strong> is ready. An official AERIVA e-ticket and mobile boarding pass have been dispatched to{' '}
            <span className="text-ink font-mono font-medium">{primaryPassenger.email}</span>.
          </p>

          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-sand border border-border">
            <span className="text-xs font-mono uppercase text-warm-gray">Booking Reference:</span>
            <span className="text-sm font-mono font-bold text-terracotta tracking-widest">
              {activeBooking.reference}
            </span>
          </div>
        </div>

        {/* TACTILE SIGNATURE BOARDING PASS CARD */}
        <div className="my-8 rounded-xl bg-sand/30 border border-border p-6 sm:p-8 relative overflow-hidden">
          
          {/* Perforation notch styling */}
          <div className="hidden sm:block absolute -top-4 right-1/3 w-6 h-6 bg-paper rounded-full border-b border-border shadow-inner" />
          <div className="hidden sm:block absolute -bottom-4 right-1/3 w-6 h-6 bg-paper rounded-full border-t border-border shadow-inner" />
          <div className="hidden sm:block absolute top-4 bottom-4 right-1/3 border-r border-dashed border-border" />

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            
            {/* BOARDING PASS MAIN CONTENT (Col 1-8) */}
            <div className="sm:col-span-8 space-y-6">
              
              {/* Airline & Class */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="w-9 h-9 rounded-lg bg-paper border border-border flex items-center justify-center font-bold text-sm text-ink font-mono">
                    {flight.airlineCode}
                  </span>
                  <div>
                    <div className="font-serif font-medium text-ink text-base">{flight.airline}</div>
                    <div className="text-xs font-mono text-warm-gray">
                      Flight {flight.flightNumber} &bull; {flight.aircraft}
                    </div>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full bg-sand text-ink border border-border text-xs font-mono font-medium">
                  {activeBooking.farePackage.name.toUpperCase()} CLASS
                </div>
              </div>

              {/* Origin -> Destination Times */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-serif font-bold text-ink">
                    {flight.from.code}
                  </div>
                  <div className="text-xs text-warm-gray">{flight.from.city}</div>
                  <div className="text-sm font-medium font-mono text-terracotta mt-1">
                    {flight.departureTime}
                  </div>
                </div>

                <div className="flex flex-col items-center px-4">
                  <Plane className="w-5 h-5 text-terracotta rotate-90" />
                  <span className="text-[10px] font-mono text-warm-gray mt-1">{flight.duration}</span>
                  <span className="text-[9px] font-mono text-olive font-medium">Non-Stop</span>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-serif font-bold text-ink">
                    {flight.to.code}
                  </div>
                  <div className="text-xs text-warm-gray">{flight.to.city}</div>
                  <div className="text-sm font-medium font-mono text-terracotta mt-1">
                    {flight.arrivalTime}
                  </div>
                </div>
              </div>

              {/* Passenger and Gate Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-border text-xs font-mono">
                <div>
                  <span className="text-[10px] text-warm-gray uppercase block">Passenger</span>
                  <span className="font-medium text-ink truncate block">
                    {primaryPassenger.firstName} {primaryPassenger.lastName}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-warm-gray uppercase block">Seat</span>
                  <span className="font-bold text-terracotta">
                    {primaryPassenger.seatId || '18A'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-warm-gray uppercase block">Gate</span>
                  <span className="font-medium text-ink">B14 (T2)</span>
                </div>
                <div>
                  <span className="text-[10px] text-warm-gray uppercase block">Boarding</span>
                  <span className="font-medium text-olive">45m Prior</span>
                </div>
              </div>
            </div>

            {/* BOARDING PASS STUB & BARCODE (Col 9-12) */}
            <div className="sm:col-span-4 flex flex-col items-center justify-center sm:pl-4 space-y-4 pt-4 sm:pt-0 border-t sm:border-t-0 border-border">
              
              <div className="text-center">
                <div className="text-[10px] font-mono uppercase text-warm-gray">Digital Boarding Pass</div>
                <div className="text-xs font-medium text-ink font-mono mt-0.5">ETKT #{activeBooking.reference}</div>
              </div>

              {/* Barcode */}
              <div className="w-full bg-paper p-3 rounded-lg border border-border flex flex-col items-center justify-center space-y-1">
                <div className="flex items-center space-x-[2px] h-10 w-full justify-center opacity-85">
                  {[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6, 2, 6, 4, 3, 3, 8, 3, 2, 7].map((w, idx) => (
                    <div
                      key={idx}
                      className="bg-ink h-full"
                      style={{ width: `${w > 5 ? 3 : w > 2 ? 2 : 1}px` }}
                    />
                  ))}
                </div>
                <span className="text-[8px] font-mono text-warm-gray tracking-widest">
                  * {activeBooking.reference} *
                </span>
              </div>

              <div className="text-center text-[10px] font-mono text-warm-gray">
                Total: <span className="text-ink font-semibold">{formatPrice(activeBooking.breakdown.totalINR, currency)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-3 pt-4 border-t border-border">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-4 py-2.5 rounded-lg bg-terracotta hover:bg-terracotta-hover text-paper font-mono text-xs font-medium flex items-center space-x-2 transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>{ticketDownloaded ? 'Downloaded!' : 'Download Ticket'}</span>
            </button>

            <button
              onClick={() => setIsBoardingPassOpen(true)}
              className="px-4 py-2.5 rounded-lg bg-sand hover:bg-sand/80 text-ink border border-border font-mono text-xs font-medium flex items-center space-x-2 transition-colors"
            >
              <Ticket className="w-4 h-4 text-terracotta" />
              <span>Wallet Pass</span>
            </button>

            <button
              onClick={handleAddToCalendar}
              className="px-4 py-2.5 rounded-lg bg-paper border border-border hover:border-ink text-ink font-mono text-xs font-medium flex items-center space-x-2 transition-colors"
            >
              <Calendar className="w-4 h-4 text-warm-gray" />
              <span>{calendarAdded ? 'Saved!' : 'Add to Calendar'}</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setIsMyTripsOpen(true);
              }}
              className="px-5 py-2.5 rounded-lg bg-ink text-paper hover:bg-black font-mono text-xs font-medium flex items-center space-x-2 transition-colors"
            >
              <Briefcase className="w-4 h-4 text-champagne" />
              <span>Manage Itinerary</span>
            </button>

            <button
              onClick={resetBooking}
              className="px-4 py-2.5 rounded-lg bg-sand text-ink hover:bg-sand/80 font-mono text-xs font-medium"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
