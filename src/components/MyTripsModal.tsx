import React, { useState } from 'react';
import {
  Briefcase,
  X,
  Plane,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { formatPrice } from '../utils/currency';

export const MyTripsModal: React.FC = () => {
  const {
    isMyTripsOpen,
    setIsMyTripsOpen,
    myBookings,
    cancelBooking,
    currency,
  } = useBooking();

  const [activeTab, setActiveTab] = useState<'upcoming' | 'cancelled'>('upcoming');

  if (!isMyTripsOpen) return null;

  const filteredBookings = myBookings.filter(b => {
    if (activeTab === 'cancelled') return b.status === 'Cancelled';
    return b.status === 'Confirmed' || b.status === 'Completed';
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-ink/25 overflow-y-auto">
      <div className="bg-paper w-full max-w-5xl rounded-xl border border-border shadow-[0_20px_60px_rgba(23,23,23,0.12)] p-6 sm:p-8 my-auto relative flex flex-col max-h-[90vh] text-ink">
        
        {/* HEADER */}
        <div className="flex items-center justify-between pb-5 border-b border-border shrink-0">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-terracotta mb-1">
              <span>AERIVA VOYAGER ARCHIVE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-light text-ink">
              Your journeys.
            </h2>
            <p className="text-xs text-warm-gray font-serif">
              Everything you've booked, in one curated place.
            </p>
          </div>

          <button
            onClick={() => setIsMyTripsOpen(false)}
            className="p-2 rounded-lg hover:bg-sand text-warm-gray hover:text-ink transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* TABS */}
        <div className="flex space-x-2 py-4 border-b border-border shrink-0 font-mono text-xs">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'upcoming'
                ? 'bg-ink text-paper font-medium'
                : 'text-warm-gray hover:text-ink hover:bg-sand/60'
            }`}
          >
            Active & Upcoming ({myBookings.filter(b => b.status !== 'Cancelled').length})
          </button>

          <button
            onClick={() => setActiveTab('cancelled')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'cancelled'
                ? 'bg-sand text-ink font-medium border border-border'
                : 'text-warm-gray hover:text-ink hover:bg-sand/60'
            }`}
          >
            Past & Cancelled ({myBookings.filter(b => b.status === 'Cancelled').length})
          </button>
        </div>

        {/* TRIPS LIST */}
        <div className="py-6 overflow-y-auto space-y-5 pr-1">
          
          {/* FEATURED ITINERARY HERO CARD */}
          {activeTab === 'upcoming' && (
            <div className="rounded-xl border border-border bg-sand/30 p-6 relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono text-warm-gray uppercase">Featured Journey</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
                  <span className="text-xs font-mono text-olive font-medium">ON TIME</span>
                </div>
                <div className="text-3xl font-serif font-light text-ink">
                  LONDON
                </div>
                <div className="text-xs font-mono text-warm-gray">
                  DEL ➔ LHR &bull; 18 SEP — 26 SEP 2026 &bull; EMIRATES EK 513
                </div>
              </div>

              <div className="flex items-center space-x-3 font-mono text-xs">
                <span className="text-warm-gray">Ref: <strong className="text-ink">AER-8942</strong></span>
                <span className="px-3 py-1 rounded-md bg-paper border border-border text-ink font-medium">
                  Seat 18A (Suite)
                </span>
              </div>
            </div>
          )}

          {filteredBookings.length > 0 ? (
            filteredBookings.map(booking => {
              const f = booking.flight;
              const p = booking.passengers[0];

              return (
                <div
                  key={booking.id}
                  className="p-5 sm:p-6 rounded-xl border border-border bg-paper space-y-4 shadow-sm hover:border-ink/40 transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border">
                    <div className="flex items-center space-x-2.5">
                      <span className="w-7 h-7 rounded-md bg-sand border border-border flex items-center justify-center font-bold text-xs text-ink font-mono">
                        {f.airlineCode}
                      </span>
                      <span className="text-sm font-serif font-medium text-ink">{f.airline}</span>
                      <span className="text-xs font-mono text-warm-gray">
                        {f.flightNumber} &bull; {f.aircraft}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-mono text-warm-gray">
                        Ref: <strong className="text-ink">{booking.reference}</strong>
                      </span>
                      <span
                        className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-md border ${
                          booking.status === 'Confirmed'
                            ? 'bg-olive/10 text-olive border-olive/20 font-medium'
                            : 'bg-sand text-warm-gray border-border'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>

                  {/* Route & Times */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                    <div>
                      <div className="text-2xl font-serif font-semibold text-ink">{f.from.code}</div>
                      <div className="text-xs text-warm-gray">{f.from.city}</div>
                      <div className="text-xs font-mono text-terracotta mt-1">
                        {f.departureDate} at {f.departureTime}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-xs font-mono text-warm-gray">{f.duration}</div>
                      <div className="w-full flex items-center my-1">
                        <div className="flex-1 border-t border-dashed border-border" />
                        <Plane className="w-3.5 h-3.5 text-terracotta mx-2 rotate-90" />
                        <div className="flex-1 border-t border-dashed border-border" />
                      </div>
                      <div className="text-[10px] font-mono text-olive">Non-Stop</div>
                    </div>

                    <div className="sm:text-right">
                      <div className="text-2xl font-serif font-semibold text-ink">{f.to.code}</div>
                      <div className="text-xs text-warm-gray">{f.to.city}</div>
                      <div className="text-xs font-mono text-terracotta mt-1">
                        {f.arrivalDate} at {f.arrivalTime}
                      </div>
                    </div>
                  </div>

                  {/* Passenger & Seat Meta */}
                  <div className="pt-3 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center space-x-4 text-warm-gray font-mono">
                      <span>Traveler: <strong className="text-ink font-medium">{p?.firstName} {p?.lastName}</strong></span>
                      <span>Seat: <strong className="text-terracotta">{p?.seatId || '18A'}</strong></span>
                      <span>Fare: {booking.farePackage.name}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-ink font-mono mr-2">
                        {formatPrice(booking.breakdown.totalINR, currency)}
                      </span>

                      {booking.status === 'Confirmed' && (
                        <button
                          onClick={() => cancelBooking(booking.id)}
                          className="px-3 py-1.5 rounded-lg bg-sand hover:bg-sand/80 text-warm-gray hover:text-ink border border-border text-xs font-mono transition-colors"
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 text-warm-gray space-y-3">
              <Briefcase className="w-10 h-10 text-warm-gray/40 mx-auto" />
              <h4 className="text-base font-serif font-medium text-ink">No journeys found</h4>
              <p className="text-xs max-w-sm mx-auto font-sans">
                {activeTab === 'cancelled'
                  ? 'You have zero cancelled reservations.'
                  : 'Your next destination is still waiting. Search and book a flight to begin.'}
              </p>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="pt-4 border-t border-border flex items-center justify-end shrink-0">
          <button
            onClick={() => setIsMyTripsOpen(false)}
            className="px-6 py-2.5 rounded-lg bg-ink text-paper font-mono font-medium text-xs hover:bg-terracotta transition-colors"
          >
            Close Itinerary
          </button>
        </div>
      </div>
    </div>
  );
};
