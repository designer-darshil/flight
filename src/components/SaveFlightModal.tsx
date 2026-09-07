import React, { useState } from 'react';
import { X, Bookmark, Plane, Bell, Check } from 'lucide-react';
import { Flight } from '../types';
import { formatPrice } from '../utils/currency';
import { useBooking } from '../context/BookingContext';

interface SaveFlightModalProps {
  isOpen: boolean;
  onClose: () => void;
  flight: Flight | null;
}

export const SaveFlightModal: React.FC<SaveFlightModalProps> = ({
  isOpen,
  onClose,
  flight,
}) => {
  const { currency } = useBooking();
  const [notifyOnDrop, setNotifyOnDrop] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen || !flight) return null;

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[rgba(23,23,23,0.25)] overflow-y-auto">
      <div className="bg-[#FFFFFF] w-full max-w-md rounded-[16px] border border-[#D8D1C5] shadow-[0_24px_60px_rgba(23,23,23,0.10)] p-6 sm:p-8 my-auto relative text-[#171717] space-y-6">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-[8px] hover:bg-[#EFE9DE] text-[#6F6A61] hover:text-[#171717] transition-colors focus-visible:ring-2 focus-visible:ring-[#963F24] cursor-pointer"
          aria-label="Close save flight modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* HEADER */}
        <div className="flex items-start space-x-3 pb-4 border-b border-[#D8D1C5]">
          <div className="w-10 h-10 rounded-[8px] bg-[#EFE9DE] border border-[#D8D1C5] flex items-center justify-center text-[#963F24] shrink-0">
            <Bookmark className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#59604F] font-semibold block">
              PRICE INTELLIGENCE WATCHLIST
            </span>
            <h3 className="text-xl font-serif font-light text-[#171717] leading-tight">
              Save to Itineraries
            </h3>
          </div>
        </div>

        {/* FLIGHT MINI CARD */}
        <div className="p-4 rounded-[8px] bg-[#F6F2EA] border border-[#D8D1C5] space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between font-bold text-[#171717]">
            <span className="flex items-center gap-1.5">
              <Plane className="w-4 h-4 text-[#963F24]" />
              {flight.airline} {flight.flightNumber}
            </span>
            <span className="text-sm text-[#963F24]">{formatPrice(flight.priceINR, currency)}</span>
          </div>
          <div className="text-[11px] text-[#6F6A61] pt-1 border-t border-[#D8D1C5] flex justify-between">
            <span>{flight.from.city} ({flight.from.code}) ➔ {flight.to.city} ({flight.to.code})</span>
            <span>{flight.departureDate}</span>
          </div>
        </div>

        {/* NOTIFICATION PREFERENCE */}
        <div className="space-y-3 font-mono text-xs">
          <label className="flex items-start space-x-3 p-3 rounded-[8px] border border-[#D8D1C5] bg-[#FFFFFF] cursor-pointer hover:bg-[#F6F2EA] transition-colors">
            <input
              type="checkbox"
              checked={notifyOnDrop}
              onChange={(e) => setNotifyOnDrop(e.target.checked)}
              className="mt-0.5 rounded border-[#D8D1C5] text-[#963F24] focus:ring-0"
            />
            <div>
              <div className="font-bold text-[#171717] flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-[#963F24]" />
                <span>Price Drop Alert</span>
              </div>
              <div className="text-[11px] text-[#6F6A61] font-sans mt-0.5">
                Notify instantly via email and SMS if this fare decreases by 5% or more.
              </div>
            </div>
          </label>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-end space-x-3 pt-2 font-mono text-xs">
          <button
            type="button"
            onClick={onClose}
            className="h-12 px-5 rounded-[8px] bg-[#FFFFFF] border border-[#D8D1C5] hover:bg-[#EFE9DE] text-[#171717] font-semibold uppercase tracking-wider transition-colors"
          >
            CANCEL
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaved}
            className="h-12 px-6 rounded-[8px] bg-[#963F24] hover:bg-[#7E331B] text-[#FFFFFF] font-semibold uppercase tracking-wider transition-colors shadow-xs flex items-center space-x-2"
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4" />
                <span>SAVED</span>
              </>
            ) : (
              <span>SAVE FLIGHT</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
