import React from 'react';
import { X, AlertTriangle, Plane, ShieldCheck } from 'lucide-react';
import { Booking } from '../types';
import { formatPrice } from '../utils/currency';

interface CancellationModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
  onConfirm: (bookingId: string) => void;
}

export const CancellationModal: React.FC<CancellationModalProps> = ({
  isOpen,
  onClose,
  booking,
  onConfirm,
}) => {
  if (!isOpen || !booking) return null;

  const isFlex = booking.fareTier === 'flex';
  const cancellationFeeINR = isFlex ? 0 : 3500;
  const refundAmountINR = Math.max(0, booking.breakdown.totalINR - cancellationFeeINR);

  const handleConfirmCancellation = () => {
    onConfirm(booking.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[rgba(23,23,23,0.25)] overflow-y-auto">
      <div className="bg-[#FFFFFF] w-full max-w-lg rounded-[16px] border border-[#D8D1C5] shadow-[0_24px_60px_rgba(23,23,23,0.10)] p-6 sm:p-8 my-auto relative text-[#171717] space-y-6">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-[8px] hover:bg-[#EFE9DE] text-[#6F6A61] hover:text-[#171717] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* HEADER */}
        <div className="flex items-start space-x-3.5 pb-4 border-b border-[#D8D1C5]">
          <div className="w-10 h-10 rounded-[8px] bg-[#9B3D32]/10 border border-[#9B3D32]/20 flex items-center justify-center text-[#9B3D32] shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#9B3D32] font-semibold block">
              RESERVATION CANCELLATION
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-light text-[#171717] leading-tight">
              Cancel Journey #{booking.reference}
            </h3>
          </div>
        </div>

        {/* FLIGHT SUMMARY CARD */}
        <div className="p-4 rounded-[8px] bg-[#F6F2EA] border border-[#D8D1C5] space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between font-bold text-[#171717]">
            <span className="flex items-center gap-1.5">
              <Plane className="w-4 h-4 text-[#963F24]" />
              {booking.flight.airline} {booking.flight.flightNumber}
            </span>
            <span className="text-[#59604F] uppercase">{booking.fareTier} TIER</span>
          </div>

          <div className="text-[11px] text-[#6F6A61] flex justify-between pt-1 border-t border-[#D8D1C5]">
            <span>{booking.flight.from.code} ➔ {booking.flight.to.code} &bull; {booking.flight.departureDate}</span>
            <span className="font-semibold text-[#171717]">{booking.passengers[0]?.firstName} {booking.passengers[0]?.lastName}</span>
          </div>
        </div>

        {/* REFUND ESTIMATION BREAKDOWN */}
        <div className="space-y-2.5 font-mono text-xs">
          <div className="flex items-center justify-between text-[#6F6A61]">
            <span>Original Total Paid</span>
            <span className="font-semibold text-[#171717]">{formatPrice(booking.breakdown.totalINR, booking.currency)}</span>
          </div>

          <div className="flex items-center justify-between text-[#6F6A61]">
            <span>Cancellation Admin Fee ({booking.farePackage.name})</span>
            <span className={isFlex ? 'text-[#59604F] font-bold' : 'text-[#9B3D32]'}>
              {isFlex ? '₹0 (Waived)' : `-${formatPrice(cancellationFeeINR, booking.currency)}`}
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#D8D1C5] text-sm">
            <span className="font-bold text-[#171717]">Estimated Refund</span>
            <strong className="text-base text-[#963F24]">
              {formatPrice(refundAmountINR, booking.currency)}
            </strong>
          </div>

          <div className="p-3 rounded-[6px] bg-[#59604F]/10 text-[11px] text-[#59604F] flex items-start gap-2 font-sans mt-2">
            <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              Refund will be issued automatically to your original payment card ({booking.paymentMethod.toUpperCase()}) within 3–5 banking business days.
            </span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-end space-x-3 pt-2 font-mono text-xs">
          <button
            type="button"
            onClick={onClose}
            className="h-12 px-5 rounded-[8px] bg-[#FFFFFF] border border-[#D8D1C5] hover:bg-[#EFE9DE] text-[#171717] font-semibold uppercase tracking-wider transition-colors"
          >
            KEEP RESERVATION
          </button>

          <button
            type="button"
            onClick={handleConfirmCancellation}
            className="h-12 px-6 rounded-[8px] bg-[#9B3D32] hover:bg-[#832E24] text-[#FFFFFF] font-semibold uppercase tracking-wider transition-colors shadow-xs"
          >
            CONFIRM CANCELLATION
          </button>
        </div>

      </div>
    </div>
  );
};
