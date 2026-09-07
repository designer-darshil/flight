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
      className={`rounded-[12px] border transition-all duration-300 relative overflow-hidden bg-white text-ink ${
        isSelected
          ? 'border-[#963F24] shadow-md ring-1 ring-[#963F24]/30'
          : 'border-[#D8D1C5] shadow-sm hover:shadow-md hover:border-ink/40'
      }`}
    >
      <div className="p-6 sm:p-7">
        
        {/* TOP TAGS & CARRIER BADGE */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10 rounded-[8px] flex items-center justify-center font-bold text-white text-xs shadow-sm"
              style={{ backgroundColor: flight.accentColor }}
            >
              {flight.logoText}
            </div>
            <div>
              <div className="font-serif font-medium text-ink text-base flex items-center space-x-2">
                <span>{flight.airline}</span>
                <span className="text-xs font-mono font-normal text-warm-gray">{flight.flightNumber}</span>
              </div>
              <div className="text-xs font-mono text-warm-gray">
                {flight.aircraft}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {flight.tags?.map(tag => (
              <span
                key={tag}
                className="text-[10px] uppercase font-mono font-medium px-2.5 py-1 rounded-[6px] bg-sand text-warm-gray border border-border"
              >
                {tag}
              </span>
            ))}
            {flight.refundable && (
              <span className="text-[10px] font-mono font-semibold text-olive bg-olive/10 px-2.5 py-1 rounded-[6px] border border-olive/20 flex items-center space-x-1">
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
            <div className="text-3xl font-serif font-semibold text-ink">
              {flight.departureTime}
            </div>
            <div className="text-sm font-mono font-bold text-[#963F24]">
              {flight.from.code}
            </div>
            <div className="text-xs text-warm-gray truncate">
              {flight.from.city}
            </div>
          </div>

          {/* DURATION & ROUTE TRAJECTORY (Col 4-8) */}
          <div className="md:col-span-5 flex flex-col items-center px-2">
            <span className="text-xs font-mono text-warm-gray font-medium mb-1">
              {flight.duration}
            </span>
            <div className="w-full flex items-center relative my-1">
              <div className="w-2.5 h-2.5 rounded-full border-2 border-ink bg-white" />
              <div className="flex-1 border-t-2 border-dashed border-border relative mx-1">
                <Plane className="w-3.5 h-3.5 text-[#963F24] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90" />
              </div>
              <div className="w-2.5 h-2.5 rounded-full border-2 border-ink bg-ink" />
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs font-mono font-medium text-ink">
                {flight.routeStops.join(' ➔ ')}
              </span>
              <span className="text-[10px] font-mono text-warm-gray">
                ({flight.stops === 0 ? 'NON-STOP' : `${flight.stops} STOP`})
              </span>
            </div>
          </div>

          {/* ARRIVAL (Col 9-10) */}
          <div className="md:col-span-2 text-left md:text-right">
            <div className="text-3xl font-serif font-semibold text-ink">
              {flight.arrivalTime}
            </div>
            <div className="text-sm font-mono font-bold text-[#963F24]">
              {flight.to.code}
            </div>
            <div className="text-xs text-warm-gray truncate">
              {flight.to.city}
            </div>
          </div>

          {/* FARE & SELECT BUTTON (Col 11-12) */}
          <div className="md:col-span-2 flex flex-col items-start md:items-end justify-center pt-3 md:pt-0 border-t md:border-t-0 border-border">
            <div className="text-[10px] font-mono uppercase text-warm-gray">FROM</div>
            <div className="text-2xl font-serif font-bold text-ink">
              {formatPrice(flight.priceINR, currency)}
            </div>
            <button
              onClick={() => selectFlight(flight)}
              className="mt-2 w-full md:w-auto h-10 px-5 rounded-[8px] bg-[#963F24] hover:bg-[#7E331B] text-white font-sans font-bold text-xs tracking-wider uppercase transition-colors shadow-sm flex items-center justify-center cursor-pointer"
            >
              SELECT FLIGHT
            </button>
          </div>
        </div>

        {/* METADATA STRIP: BAGGAGE & DETAILS TOGGLE */}
        <div className="mt-5 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs text-warm-gray">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5 font-mono">
              <Luggage className="w-3.5 h-3.5 text-[#963F24]" />
              <span>Baggage: <strong className="text-ink font-medium">{flight.baggage.cabin} cabin · {flight.baggage.checked} checked</strong></span>
            </span>
            <span className="hidden sm:flex items-center space-x-1 font-mono">
              <Wifi className="w-3.5 h-3.5 text-warm-gray" />
              <span>Wi-Fi Available</span>
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => openDrawer(flight)}
              className="font-mono text-xs text-[#963F24] hover:underline font-semibold flex items-center space-x-1 cursor-pointer"
            >
              <Info className="w-3.5 h-3.5" />
              <span>Flight Details</span>
            </button>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="font-mono text-xs text-ink hover:text-[#963F24] font-medium flex items-center space-x-1 bg-sand px-3 py-1 rounded-[6px] transition-colors cursor-pointer"
            >
              <span>{isExpanded ? 'Less' : 'Quick Specs'}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* EXPANDABLE IN-CARD DETAILS */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border bg-sand/30 -mx-6 -mb-6 sm:-mx-7 sm:-mb-7 p-6 rounded-b-2xl space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-paper rounded-lg border border-border">
                <div className="text-[10px] uppercase font-mono text-warm-gray">Aircraft</div>
                <div className="font-medium text-ink mt-0.5">{flight.aircraft}</div>
              </div>
              <div className="p-3 bg-paper rounded-lg border border-border">
                <div className="text-[10px] uppercase font-mono text-warm-gray">Seat Pitch</div>
                <div className="font-medium text-ink mt-0.5">{flight.amenities.legroomInches} inches</div>
              </div>
              <div className="p-3 bg-paper rounded-lg border border-border">
                <div className="text-[10px] uppercase font-mono text-warm-gray">Dining</div>
                <div className="font-medium text-ink mt-0.5">Meal & Beverage</div>
              </div>
              <div className="p-3 bg-paper rounded-lg border border-border">
                <div className="text-[10px] uppercase font-mono text-warm-gray">Cancellation</div>
                <div className="font-medium text-ink mt-0.5">{flight.refundable ? 'Allowed' : 'Non-ref'}</div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => selectFlight(flight)}
                className="px-6 py-2.5 rounded-lg bg-ink text-paper font-mono font-medium text-xs hover:bg-terracotta transition-colors flex items-center space-x-1.5"
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
