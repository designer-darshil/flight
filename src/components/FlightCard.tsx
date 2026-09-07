import React, { useState } from 'react';
import {
  Wifi,
  Luggage,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Plane,
  ArrowRight,
  Info,
} from 'lucide-react';
import { Flight } from '../types';
import { useBooking } from '../context/BookingContext';
import { formatPrice } from '../utils/currency';

interface FlightCardProps {
  flight: Flight;
  isSelected?: boolean;
}

export const FlightCard: React.FC<FlightCardProps> = ({ flight, isSelected = false }) => {
  const { currency, selectFlight, openDrawer } = useBooking();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`rounded-3xl border transition-all duration-300 relative overflow-hidden bg-white text-slate-900 ${
        isSelected
          ? 'border-aeriva-blue shadow-glow-blue ring-2 ring-aeriva-blue/20'
          : 'border-slate-200/80 shadow-light-card hover:shadow-xl hover:border-slate-300 hover:-translate-y-1'
      }`}
    >
      <div className="p-6 sm:p-7">
        
        {/* TOP TAGS & CARRIER BADGE */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-xs shadow-sm"
              style={{ backgroundColor: flight.accentColor }}
            >
              {flight.logoText}
            </div>
            <div>
              <div className="font-display font-bold text-slate-900 text-base flex items-center space-x-2">
                <span>{flight.airline}</span>
                <span className="text-xs font-mono font-normal text-slate-500">{flight.flightNumber}</span>
              </div>
              <div className="text-xs font-mono text-slate-400">
                {flight.aircraft}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {flight.tags?.map(tag => (
              <span
                key={tag}
                className="text-[10px] uppercase font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200"
              >
                {tag}
              </span>
            ))}
            {flight.refundable && (
              <span className="text-[10px] font-mono font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Refundable</span>
              </span>
            )}
          </div>
        </div>

        {/* MAIN FLIGHT ITINERARY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* DEPARTURE (Col 1-3) */}
          <div className="md:col-span-3 text-left">
            <div className="text-3xl font-display font-black text-slate-900">
              {flight.departureTime}
            </div>
            <div className="text-sm font-mono font-bold text-aeriva-blue">
              {flight.from.code}
            </div>
            <div className="text-xs text-slate-500 truncate">
              {flight.from.city}
            </div>
          </div>

          {/* DURATION & ROUTE TRAJECTORY (Col 4-8) */}
          <div className="md:col-span-5 flex flex-col items-center px-2">
            <span className="text-xs font-mono text-slate-500 font-semibold mb-1">
              {flight.duration}
            </span>
            <div className="w-full flex items-center relative my-1">
              <div className="w-2.5 h-2.5 rounded-full border-2 border-aeriva-blue bg-white" />
              <div className="flex-1 border-t-2 border-dashed border-slate-300 relative mx-1">
                <Plane className="w-3.5 h-3.5 text-aeriva-blue absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform" />
              </div>
              <div className="w-2.5 h-2.5 rounded-full border-2 border-slate-700 bg-white" />
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs font-mono font-bold text-slate-700">
                {flight.routeStops.join(' ➔ ')}
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                ({flight.stops === 0 ? 'NON-STOP' : `${flight.stops} STOP`})
              </span>
            </div>
          </div>

          {/* ARRIVAL (Col 9-10) */}
          <div className="md:col-span-2 text-left md:text-right">
            <div className="text-3xl font-display font-black text-slate-900">
              {flight.arrivalTime}
            </div>
            <div className="text-sm font-mono font-bold text-aeriva-blue">
              {flight.to.code}
            </div>
            <div className="text-xs text-slate-500 truncate">
              {flight.to.city}
            </div>
          </div>

          {/* FARE & SELECT BUTTON (Col 11-12) */}
          <div className="md:col-span-2 flex flex-col items-start md:items-end justify-center pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
            <div className="text-[10px] font-mono uppercase text-slate-400">FROM</div>
            <div className="text-2xl font-display font-black text-slate-900">
              {formatPrice(flight.priceINR, currency)}
            </div>
            <button
              onClick={() => selectFlight(flight)}
              className="mt-2 w-full md:w-auto px-5 py-2.5 rounded-xl bg-aeriva-blue hover:bg-blue-600 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md shadow-blue-500/20"
            >
              SELECT FLIGHT
            </button>
          </div>
        </div>

        {/* METADATA STRIP: BAGGAGE & DETAILS TOGGLE */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 font-mono">
              <Luggage className="w-3.5 h-3.5 text-slate-400" />
              <span>Baggage: <strong>{flight.baggage.checked}</strong></span>
            </span>
            <span className="flex items-center space-x-1 font-mono">
              <Wifi className="w-3.5 h-3.5 text-slate-400" />
              <span>Wi-Fi Available</span>
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => openDrawer(flight)}
              className="font-mono text-xs text-aeriva-blue hover:text-blue-700 font-semibold flex items-center space-x-1"
            >
              <Info className="w-3.5 h-3.5" />
              <span>Flight Details Drawer</span>
            </button>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="font-mono text-xs text-slate-600 hover:text-slate-900 font-medium flex items-center space-x-1 bg-slate-100 px-3 py-1 rounded-lg"
            >
              <span>{isExpanded ? 'Less' : 'Quick Specs'}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* EXPANDABLE IN-CARD DETAILS */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-slate-100 bg-slate-50 -mx-6 -mb-6 sm:-mx-7 sm:-mb-7 p-6 rounded-b-3xl space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                <div className="text-[10px] uppercase font-mono text-slate-400">Aircraft</div>
                <div className="font-bold text-slate-800 mt-0.5">{flight.aircraft}</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                <div className="text-[10px] uppercase font-mono text-slate-400">Seat Pitch</div>
                <div className="font-bold text-slate-800 mt-0.5">{flight.amenities.legroomInches} inches</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                <div className="text-[10px] uppercase font-mono text-slate-400">Dining</div>
                <div className="font-bold text-slate-800 mt-0.5">Meal & Beverage</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                <div className="text-[10px] uppercase font-mono text-slate-400">Cancellation</div>
                <div className="font-bold text-slate-800 mt-0.5">{flight.refundable ? 'Allowed' : 'Non-ref'}</div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => selectFlight(flight)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-aeriva-blue transition-colors flex items-center space-x-1.5"
              >
                <span>CHOOSE THIS FLIGHT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
