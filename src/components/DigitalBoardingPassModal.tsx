import React, { useState } from 'react';
import {
  X,
  Download,
  Smartphone,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { BoardingPass } from './BoardingPass';

export const DigitalBoardingPassModal: React.FC = () => {
  const { isBoardingPassOpen, setIsBoardingPassOpen, activeBooking, myBookings } = useBooking();
  const [downloaded, setDownloaded] = useState(false);
  const [walletAdded, setWalletAdded] = useState(false);

  if (!isBoardingPassOpen) return null;

  // Use active booking if present, otherwise most recent upcoming booking
  const targetBooking = activeBooking || myBookings.find(b => b.status === 'Confirmed') || myBookings[0];

  const primaryPassenger = targetBooking?.passengers[0] || {
    firstName: 'Alex',
    lastName: 'Morgan',
    seatId: '18A',
    tier: 'Sapphire',
  };

  const flight = targetBooking?.flight || {
    id: 'fl-flg-01',
    flightNumber: 'EK 513',
    airline: 'Emirates',
    airlineCode: 'EK',
    aircraft: 'Boeing 777-300ER',
    from: { code: 'DEL', name: 'Indira Gandhi International Airport', city: 'Delhi', country: 'India', timezone: 'IST' },
    to: { code: 'LHR', name: 'Heathrow Airport', city: 'London', country: 'United Kingdom', timezone: 'BST' },
    departureTime: '02:45',
    arrivalTime: '07:15',
    departureDate: '18 Sep 2026',
    arrivalDate: '18 Sep 2026',
    duration: '8h 30m',
    stops: 0,
    basePriceINR: 58400,
    seatsAvailable: 7,
    cabinClasses: ['Economy', 'Premium Economy', 'Business', 'First'],
    baggage: { cabin: '7 kg', checked: '30 kg' },
    amenities: { wifi: true, power: true, meals: true, entertainment: true, lieFlat: true },
    carbonKg: 280,
    punctualityRate: 94,
  };

  const bookingRef = targetBooking?.reference || 'ARV7K92';

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => {
      const element = document.createElement('a');
      const file = new Blob([
        `AERIVA ELECTRONIC BOARDING PASS\n` +
        `==============================\n` +
        `PASSENGER: ${primaryPassenger.firstName} ${primaryPassenger.lastName}\n` +
        `FLIGHT: ${flight.airline} ${flight.flightNumber}\n` +
        `ROUTE: ${flight.from.city} (${flight.from.code}) -> ${flight.to.city} (${flight.to.code})\n` +
        `DATE: ${flight.departureDate}\n` +
        `DEPARTURE: ${flight.departureTime}\n` +
        `BOARDING TIME: 45m Prior\n` +
        `GATE: B14\n` +
        `SEAT: ${primaryPassenger.seatId || '18A'}\n` +
        `BOOKING REF: ${bookingRef}\n`
      ], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `AERIVA_Boarding_Pass_${bookingRef}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setTimeout(() => setDownloaded(false), 3000);
    }, 300);
  };

  const handleWallet = () => {
    setWalletAdded(true);
    setTimeout(() => setWalletAdded(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[rgba(23,23,23,0.25)] overflow-y-auto">
      <div className="w-full max-w-2xl my-auto relative">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setIsBoardingPassOpen(false)}
          className="absolute -top-10 right-0 p-2 text-[#FFFFFF]/90 hover:text-[#FFFFFF] transition-colors"
          aria-label="Close pass"
        >
          <X className="w-6 h-6" />
        </button>

        {/* CANONICAL AERIVA BOARDING PASS */}
        <div className="space-y-4">
          <BoardingPass
            passenger={primaryPassenger}
            flight={flight}
            reference={bookingRef}
            cabinClass={targetBooking?.farePackage?.name || 'Club World'}
            gate="B14"
            boardingTime="45m Prior"
            showAnimation={true}
          />

          {/* ACTION BUTTONS */}
          <div className="bg-[#FFFFFF] p-4 rounded-[12px] border border-[#D8D1C5] flex items-center justify-between gap-3 font-mono text-xs">
            <button
              onClick={handleWallet}
              className="flex-1 h-12 rounded-[8px] bg-[#EFE9DE] hover:bg-[#D8D1C5] text-[#171717] border border-[#D8D1C5] font-semibold tracking-wider uppercase transition-colors flex items-center justify-center space-x-2"
            >
              <Smartphone className="w-4 h-4 text-[#963F24]" />
              <span>{walletAdded ? 'SAVED TO WALLET ✓' : 'ADD TO APPLE / GOOGLE WALLET'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex-1 h-12 rounded-[8px] bg-[#963F24] hover:bg-[#7E331B] text-[#FFFFFF] font-semibold tracking-wider uppercase transition-colors flex items-center justify-center space-x-2 shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>{downloaded ? 'DOWNLOADED ✓' : 'DOWNLOAD PASS'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
