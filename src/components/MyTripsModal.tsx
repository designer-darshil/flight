import React, { useState } from 'react';
import {
  Briefcase,
  X,
  Plane,
  QrCode,
  FileText,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { formatPrice } from '../utils/currency';
import { BoardingPass } from './BoardingPass';
import { CancellationModal } from './CancellationModal';
import { Booking } from '../types';

export const MyTripsModal: React.FC = () => {
  const {
    isMyTripsOpen,
    setIsMyTripsOpen,
    myBookings,
    cancelBooking,
    currency,
    setIsBoardingPassOpen,
  } = useBooking();

  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
  const [selectedTripDetails, setSelectedTripDetails] = useState<Booking | null>(null);
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);

  if (!isMyTripsOpen) return null;

  const filteredBookings = myBookings.filter(b => {
    if (activeTab === 'cancelled') return b.status === 'Cancelled';
    if (activeTab === 'completed') return b.status === 'Completed';
    return b.status === 'Confirmed';
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[rgba(23,23,23,0.25)] overflow-y-auto">
      <div className="bg-[#FFFFFF] w-full max-w-5xl rounded-[16px] border border-[#D8D1C5] shadow-[0_24px_60px_rgba(23,23,23,0.10)] p-6 sm:p-8 my-auto relative flex flex-col max-h-[90vh] text-[#171717]">
        
        {/* HEADER */}
        <div className="flex items-center justify-between pb-5 border-b border-[#D8D1C5] shrink-0">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-[#59604F] mb-1">
              <span>AERIVA VOYAGER ARCHIVE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#171717] tracking-tight uppercase">
              YOUR JOURNEYS
            </h2>
            <p className="text-xs text-[#6F6A61] font-sans">
              All reserved, active, and past itineraries across your journey history.
            </p>
          </div>

          <button
            onClick={() => setIsMyTripsOpen(false)}
            className="p-2 rounded-[8px] hover:bg-[#EFE9DE] text-[#6F6A61] hover:text-[#171717] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* TABS: UPCOMING, COMPLETED, CANCELLED */}
        <div className="flex space-x-2 py-4 border-b border-[#D8D1C5] shrink-0 font-mono text-xs">
          {(['upcoming', 'completed', 'cancelled'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-[8px] uppercase tracking-wider transition-colors ${
                activeTab === tab
                  ? 'bg-[#171717] text-[#FFFFFF] font-semibold'
                  : 'text-[#6F6A61] hover:text-[#171717] hover:bg-[#EFE9DE]'
              }`}
            >
              {tab} ({myBookings.filter(b => (tab === 'cancelled' ? b.status === 'Cancelled' : tab === 'completed' ? b.status === 'Completed' : b.status === 'Confirmed')).length})
            </button>
          ))}
        </div>

        {/* TRIPS LIST */}
        <div className="py-6 overflow-y-auto space-y-6 pr-1">
          
          {/* LARGE FEATURED TRIP CARD WITH TRAVEL PHOTOGRAPHY */}
          {activeTab === 'upcoming' && (
            <div className="rounded-[12px] border border-[#D8D1C5] bg-[#FFFFFF] overflow-hidden shadow-sm flex flex-col md:flex-row">
              <div className="md:w-5/12 h-52 md:h-auto relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80"
                  alt="London featured trip"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/80 md:from-transparent to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#FFFFFF]/90 font-mono text-[10px] font-bold text-[#963F24] uppercase">
                  FEATURED JOURNEY
                </div>
              </div>

              <div className="md:w-7/12 p-6 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#D8D1C5]/70">
                    <span className="text-xs font-mono text-[#6F6A61]">Emirates EK 513 &bull; Boeing 777-300ER</span>
                    <span className="text-xs font-mono text-[#59604F] font-semibold bg-[#59604F]/10 px-2 py-0.5 rounded">
                      ON TIME
                    </span>
                  </div>

                  <div className="py-3 flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-serif font-bold text-[#171717]">DEL</div>
                      <div className="text-xs text-[#6F6A61]">Delhi</div>
                      <div className="text-sm font-mono text-[#963F24] font-medium">02:45</div>
                    </div>

                    <div className="flex flex-col items-center px-4">
                      <span className="text-[10px] font-mono text-[#6F6A61]">8h 30m</span>
                      <Plane className="w-4 h-4 text-[#963F24] rotate-90 my-0.5" />
                      <span className="text-[9px] font-mono text-[#59604F]">Non-Stop</span>
                    </div>

                    <div className="text-right">
                      <div className="text-3xl font-serif font-bold text-[#171717]">LHR</div>
                      <div className="text-xs text-[#6F6A61]">London</div>
                      <div className="text-sm font-mono text-[#963F24] font-medium">07:15</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#D8D1C5]/70 font-mono text-xs">
                    <div>
                      <span className="text-[10px] text-[#6F6A61] uppercase block">Departure</span>
                      <strong className="text-[#171717]">18 SEP 2026</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#6F6A61] uppercase block">Gate</span>
                      <strong className="text-[#171717]">B12 (T3)</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#6F6A61] uppercase block">Seat</span>
                      <strong className="text-[#963F24]">18A (Suite)</strong>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#D8D1C5]">
                  <span className="text-xs font-mono text-[#6F6A61]">Ref: <strong className="text-[#171717]">ARV7K92</strong></span>
                  <div className="flex items-center space-x-2 font-mono text-xs">
                    <button
                      onClick={() => setIsBoardingPassOpen(true)}
                      className="px-4 py-2 rounded-[8px] bg-[#963F24] hover:bg-[#7E331B] text-[#FFFFFF] font-semibold uppercase tracking-wider transition-colors flex items-center space-x-1.5"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>BOARDING PASS</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ALL BOOKINGS LIST */}
          {filteredBookings.length > 0 ? (
            filteredBookings.map(booking => {
              const f = booking.flight;
              const p = booking.passengers[0];

              return (
                <div
                  key={booking.id}
                  className="p-5 sm:p-6 rounded-[12px] border border-[#D8D1C5] bg-[#FFFFFF] space-y-4 shadow-xs hover:border-[#171717] transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#D8D1C5]">
                    <div className="flex items-center space-x-2.5">
                      <span className="w-8 h-8 rounded-[6px] bg-[#EFE9DE] border border-[#D8D1C5] flex items-center justify-center font-bold text-xs text-[#171717] font-mono">
                        {f.airlineCode}
                      </span>
                      <span className="text-base font-serif font-bold text-[#171717]">{f.airline}</span>
                      <span className="text-xs font-mono text-[#6F6A61]">
                        {f.flightNumber} &bull; {f.aircraft}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 font-mono text-xs">
                      <span className="text-[#6F6A61]">
                        Ref: <strong className="text-[#171717]">{booking.reference}</strong>
                      </span>
                      <span
                        className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-[4px] border ${
                          booking.status === 'Confirmed'
                            ? 'bg-[#59604F]/10 text-[#59604F] border-[#59604F]/20 font-semibold'
                            : 'bg-[#EFE9DE] text-[#6F6A61] border-[#D8D1C5]'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>

                  {/* Route & Times */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                    <div>
                      <div className="text-3xl font-serif font-bold text-[#171717]">{f.from.code}</div>
                      <div className="text-xs text-[#6F6A61]">{f.from.city}</div>
                      <div className="text-xs font-mono text-[#963F24] font-medium mt-1">
                        {f.departureDate} at {f.departureTime}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-xs font-mono text-[#6F6A61]">{f.duration}</div>
                      <div className="w-full flex items-center my-1">
                        <div className="flex-1 border-t border-dashed border-[#D8D1C5]" />
                        <Plane className="w-3.5 h-3.5 text-[#963F24] mx-2 rotate-90" />
                        <div className="flex-1 border-t border-dashed border-[#D8D1C5]" />
                      </div>
                      <div className="text-[10px] font-mono text-[#59604F]">Non-Stop</div>
                    </div>

                    <div className="sm:text-right">
                      <div className="text-3xl font-serif font-bold text-[#171717]">{f.to.code}</div>
                      <div className="text-xs text-[#6F6A61]">{f.to.city}</div>
                      <div className="text-xs font-mono text-[#963F24] font-medium mt-1">
                        {f.arrivalDate} at {f.arrivalTime}
                      </div>
                    </div>
                  </div>

                  {/* Passenger & Actions */}
                  <div className="pt-3 border-t border-[#D8D1C5] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                    <div className="flex items-center space-x-4 text-[#6F6A61]">
                      <span>Traveler: <strong className="text-[#171717]">{p?.firstName} {p?.lastName}</strong></span>
                      <span>Seat: <strong className="text-[#963F24]">{p?.seatId || '18A'}</strong></span>
                      <span>Fare: {booking.farePackage.name}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-[#171717] mr-2">
                        {formatPrice(booking.breakdown.totalINR, currency)}
                      </span>

                      <button
                        onClick={() => setSelectedTripDetails(booking)}
                        className="px-3.5 py-1.5 rounded-[8px] bg-[#FFFFFF] hover:bg-[#EFE9DE] text-[#171717] border border-[#D8D1C5] font-semibold transition-colors flex items-center space-x-1"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#6F6A61]" />
                        <span>TRIP DETAILS</span>
                      </button>

                      {booking.status === 'Confirmed' && (
                        <button
                          onClick={() => setBookingToCancel(booking)}
                          className="px-3 py-1.5 rounded-[8px] bg-[#EFE9DE] hover:bg-[#D8D1C5] text-[#6F6A61] hover:text-[#171717] border border-[#D8D1C5] transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 text-[#6F6A61] space-y-3">
              <Briefcase className="w-10 h-10 text-[#6F6A61]/40 mx-auto" />
              <h4 className="text-lg font-serif font-medium text-[#171717]">No journeys found</h4>
              <p className="text-xs max-w-sm mx-auto font-sans">
                {activeTab === 'cancelled'
                  ? 'You have zero cancelled reservations.'
                  : 'Your next destination is waiting. Search and book a flight to begin.'}
              </p>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="pt-4 border-t border-[#D8D1C5] flex items-center justify-end shrink-0">
          <button
            onClick={() => setIsMyTripsOpen(false)}
            className="px-6 py-2.5 rounded-[8px] bg-[#171717] text-[#FFFFFF] font-mono font-semibold text-xs hover:bg-[#963F24] transition-colors uppercase tracking-wider"
          >
            Close Itinerary
          </button>
        </div>
      </div>

      {/* TRIP DETAILS MODAL OVERLAY */}
      {selectedTripDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[rgba(23,23,23,0.25)] overflow-y-auto">
          <div className="bg-[#FFFFFF] w-full max-w-2xl rounded-[16px] border border-[#D8D1C5] shadow-[0_24px_60px_rgba(23,23,23,0.10)] p-6 sm:p-8 my-auto relative text-[#171717] space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#D8D1C5]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#59604F] font-semibold block">
                  ITINERARY REFERENCE #{selectedTripDetails.reference}
                </span>
                <h3 className="text-2xl font-serif font-light text-[#171717]">
                  {selectedTripDetails.flight.from.city} to {selectedTripDetails.flight.to.city}
                </h3>
              </div>

              <button
                onClick={() => setSelectedTripDetails(null)}
                className="p-2 rounded-[8px] hover:bg-[#EFE9DE] text-[#6F6A61] hover:text-[#171717] transition-colors font-mono text-xs"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
              <BoardingPass
                passenger={selectedTripDetails.passengers[0] || { firstName: 'Alex', lastName: 'Morgan', seatId: '18A' }}
                flight={selectedTripDetails.flight}
                reference={selectedTripDetails.reference}
                cabinClass={selectedTripDetails.farePackage.name}
                gate="B12"
                boardingTime="45m Prior"
                showAnimation={false}
              />
            </div>

            <div className="pt-4 border-t border-[#D8D1C5] flex items-center justify-end space-x-3 font-mono text-xs">
              <button
                onClick={() => {
                  setSelectedTripDetails(null);
                  setIsBoardingPassOpen(true);
                }}
                className="h-11 px-5 rounded-[8px] bg-[#963F24] hover:bg-[#7E331B] text-[#FFFFFF] font-semibold uppercase tracking-wider transition-colors shadow-sm"
              >
                VIEW BOARDING PASS
              </button>
              <button
                onClick={() => setSelectedTripDetails(null)}
                className="h-11 px-4 rounded-[8px] bg-[#EFE9DE] text-[#171717] hover:bg-[#D8D1C5] font-semibold uppercase tracking-wider transition-colors"
              >
                DONE
              </button>
            </div>

          </div>
        </div>
      )}

      {/* CANCELLATION MODAL */}
      <CancellationModal
        isOpen={!!bookingToCancel}
        onClose={() => setBookingToCancel(null)}
        booking={bookingToCancel}
        onConfirm={cancelBooking}
      />

    </div>
  );
};
