import React, { useState } from 'react';
import {
  Download,
  Calendar,
  Briefcase,
  X,
  Ticket,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { formatPrice } from '../utils/currency';
import { BookingProgress } from './BookingProgress';
import { BoardingPass } from './BoardingPass';

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
  const bookingRef = activeBooking.reference || 'ARV7K92';

  const handleDownload = () => {
    setTicketDownloaded(true);
    setTimeout(() => {
      const element = document.createElement('a');
      const file = new Blob([
        `AERIVA E-TICKET CONFIRMATION\n` +
        `===========================\n` +
        `Booking Reference: ${bookingRef}\n` +
        `Status: ${activeBooking.status}\n` +
        `Passenger: ${primaryPassenger.title ? primaryPassenger.title + ' ' : ''}${primaryPassenger.firstName} ${primaryPassenger.lastName}\n` +
        `Flight: ${flight.airline} ${flight.flightNumber} (${flight.aircraft})\n` +
        `Route: ${flight.from.city} (${flight.from.code}) -> ${flight.to.city} (${flight.to.code})\n` +
        `Departure: ${flight.departureDate} at ${flight.departureTime}\n` +
        `Seat: ${primaryPassenger.seatId || '18A'}\n` +
        `Baggage: ${flight.baggage.cabin} Cabin, ${activeBooking.farePackage.baggageChecked} Checked\n` +
        `Total Amount: ${formatPrice(activeBooking.breakdown.totalINR, currency)}\n`
      ], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `AERIVA_Ticket_${bookingRef}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setTimeout(() => setTicketDownloaded(false), 3000);
    }, 400);
  };

  const handleAddToCalendar = () => {
    setCalendarAdded(true);
    setTimeout(() => setCalendarAdded(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[rgba(23,23,23,0.25)] overflow-y-auto">
      <div className="bg-[#FFFFFF] w-full max-w-4xl rounded-[16px] border border-[#D8D1C5] shadow-[0_24px_60px_rgba(23,23,23,0.10)] p-6 sm:p-10 my-auto relative text-[#171717]">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={resetBooking}
          className="absolute top-4 right-4 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-[8px] hover:bg-[#EFE9DE] text-[#6F6A61] hover:text-[#171717] transition-colors focus-visible:ring-2 focus-visible:ring-[#963F24] cursor-pointer"
          aria-label="Close confirmation"
        >
          <X className="w-5 h-5" />
        </button>

        {/* BOOKING PROGRESS STEPPER */}
        <div className="mb-6">
          <BookingProgress currentStep="confirmation" />
        </div>

        {/* CONFIRMATION HEADER */}
        <div className="text-center space-y-3 pb-8 border-b border-[#D8D1C5]">
          <div className="text-[11px] font-mono tracking-widest text-[#59604F] uppercase font-medium">
            TRANSACTION VERIFIED &bull; TICKET ISSUED
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#171717] tracking-tight leading-none uppercase">
            JOURNEY<br />CONFIRMED.
          </h2>
          <p className="text-xs sm:text-base text-[#6F6A61] max-w-md mx-auto font-sans leading-relaxed">
            Your trip to <strong className="text-[#171717] font-semibold">{flight.to.city}</strong> is ready. An official AERIVA e-ticket and mobile boarding pass have been dispatched to{' '}
            <span className="text-[#171717] font-mono font-medium">{primaryPassenger.email || 'guest@aeriva.travel'}</span>.
          </p>

          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#EFE9DE] border border-[#D8D1C5]">
            <span className="text-xs font-mono uppercase text-[#6F6A61]">Booking reference:</span>
            <span className="text-sm font-mono font-bold text-[#963F24] tracking-widest">
              {bookingRef}
            </span>
          </div>
        </div>

        {/* CANONICAL AERIVA BOARDING PASS */}
        <div className="my-8">
          <BoardingPass
            passenger={primaryPassenger}
            flight={flight}
            reference={bookingRef}
            cabinClass={activeBooking.farePackage.name}
            gate="B14"
            boardingTime="45m Prior"
            showAnimation={true}
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-3 pt-6 border-t border-[#D8D1C5]">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* VIEW BOARDING PASS */}
            <button
              onClick={() => setIsBoardingPassOpen(true)}
              className="h-12 px-5 rounded-[8px] bg-[#963F24] hover:bg-[#7E331B] text-[#FFFFFF] font-mono text-xs uppercase tracking-wider font-semibold flex items-center space-x-2 transition-colors shadow-sm"
            >
              <Ticket className="w-4 h-4" />
              <span>VIEW BOARDING PASS</span>
            </button>

            {/* DOWNLOAD TICKET */}
            <button
              onClick={handleDownload}
              className="h-12 px-5 rounded-[8px] bg-[#FFFFFF] hover:bg-[#EFE9DE] text-[#171717] border border-[#D8D1C5] font-mono text-xs uppercase tracking-wider font-semibold flex items-center space-x-2 transition-colors"
            >
              <Download className="w-4 h-4 text-[#6F6A61]" />
              <span>{ticketDownloaded ? 'DOWNLOADED' : 'DOWNLOAD TICKET'}</span>
            </button>

            {/* ADD TO CALENDAR */}
            <button
              onClick={handleAddToCalendar}
              className="h-12 px-5 rounded-[8px] bg-[#FFFFFF] hover:bg-[#EFE9DE] text-[#171717] border border-[#D8D1C5] font-mono text-xs uppercase tracking-wider font-semibold flex items-center space-x-2 transition-colors"
            >
              <Calendar className="w-4 h-4 text-[#6F6A61]" />
              <span>{calendarAdded ? 'SAVED TO CALENDAR' : 'ADD TO CALENDAR'}</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            {/* MANAGE TRIP */}
            <button
              onClick={() => {
                setIsMyTripsOpen(true);
              }}
              className="h-12 px-6 rounded-[8px] bg-[#171717] text-[#FFFFFF] hover:bg-black font-mono text-xs uppercase tracking-wider font-semibold flex items-center space-x-2 transition-colors"
            >
              <Briefcase className="w-4 h-4 text-[#EFE9DE]" />
              <span>MANAGE TRIP</span>
            </button>

            <button
              onClick={resetBooking}
              className="h-12 px-4 rounded-[8px] bg-[#EFE9DE] text-[#171717] hover:bg-[#D8D1C5] font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
