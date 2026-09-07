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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-navy-950/90 backdrop-blur-2xl overflow-y-auto">
      <div className="glass-panel w-full max-w-5xl rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8 my-auto relative overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* HEADER */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-extrabold text-white">
                My Trips & Boarding Passes
              </h2>
              <p className="text-xs text-slate-400">
                Manage upcoming itineraries, access digital boarding passes, and download receipts.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsMyTripsOpen(false)}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* TABS */}
        <div className="flex space-x-2 py-4 border-b border-white/10 shrink-0">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'upcoming'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Active & Upcoming ({myBookings.filter(b => b.status !== 'Cancelled').length})
          </button>

          <button
            onClick={() => setActiveTab('cancelled')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'cancelled'
                ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Cancelled ({myBookings.filter(b => b.status === 'Cancelled').length})
          </button>
        </div>

        {/* TRIPS LIST OR DETAIL VIEW */}
        <div className="py-6 overflow-y-auto space-y-4 pr-1">
          {filteredBookings.length > 0 ? (
            filteredBookings.map(booking => {
              const f = booking.flight;
              const p = booking.passengers[0];

              return (
                <div
                  key={booking.id}
                  className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/10 space-y-4 relative hover:border-cyan-400/30 transition-all"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
                    <div className="flex items-center space-x-2">
                      <span className="w-7 h-7 rounded-lg bg-aeriva-surface border border-white/10 flex items-center justify-center font-bold text-xs text-aeriva-cyan font-mono">
                        {f.airlineCode}
                      </span>
                      <span className="text-sm font-bold text-white">{f.airline}</span>
                      <span className="text-xs font-mono text-cyan-400">
                        {f.flightNumber} · {f.aircraft}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-mono text-slate-400">
                        Ref: <strong className="text-cyan-300 tracking-wider">{booking.reference}</strong>
                      </span>
                      <span
                        className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border ${
                          booking.status === 'Confirmed'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            : 'bg-red-500/20 text-red-300 border-red-500/30'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>

                  {/* Route & Times */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                    <div>
                      <div className="text-2xl font-bold font-display text-white">{f.from.code}</div>
                      <div className="text-xs text-slate-300">{f.from.city}</div>
                      <div className="text-xs font-mono text-cyan-400 mt-1">
                        {f.departureDate} at {f.departureTime}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-xs font-mono text-slate-400">{f.duration}</div>
                      <div className="w-full flex items-center my-1">
                        <div className="flex-1 border-t border-dashed border-cyan-400/50" />
                        <Plane className="w-3.5 h-3.5 text-cyan-400 mx-2" />
                        <div className="flex-1 border-t border-dashed border-cyan-400/50" />
                      </div>
                      <div className="text-[10px] font-mono text-emerald-400">Non-Stop</div>
                    </div>

                    <div className="sm:text-right">
                      <div className="text-2xl font-bold font-display text-white">{f.to.code}</div>
                      <div className="text-xs text-slate-300">{f.to.city}</div>
                      <div className="text-xs font-mono text-cyan-400 mt-1">
                        {f.arrivalDate} at {f.arrivalTime}
                      </div>
                    </div>
                  </div>

                  {/* Passenger & Seat Meta */}
                  <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center space-x-4 text-slate-300 font-mono">
                      <span>Traveler: {p?.firstName} {p?.lastName}</span>
                      <span>Seat: <strong className="text-cyan-400">{p?.seatId || '18A'}</strong></span>
                      <span>Fare: {booking.farePackage.name}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white font-mono mr-2">
                        {formatPrice(booking.breakdown.totalINR, currency)}
                      </span>

                      {booking.status === 'Confirmed' && (
                        <button
                          onClick={() => cancelBooking(booking.id)}
                          className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-medium transition-colors"
                        >
                          Cancel Flight
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 text-slate-400 space-y-3">
              <Briefcase className="w-12 h-12 text-slate-600 mx-auto" />
              <h4 className="text-base font-bold text-white">No Trips Found</h4>
              <p className="text-xs max-w-sm mx-auto">
                {activeTab === 'cancelled'
                  ? 'You have zero cancelled flight bookings.'
                  : 'You do not have any upcoming flights. Search and book a flight to see it here!'}
              </p>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-end shrink-0">
          <button
            onClick={() => setIsMyTripsOpen(false)}
            className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors"
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
