import React, { useState } from 'react';
import {
  CreditCard,
  QrCode,
  Building,
  Wallet,
  ShieldCheck,
  Lock,
  ArrowLeft,
  CheckCircle,
  Tag,
  Plane,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { formatPrice } from '../utils/currency';

export const PaymentModal: React.FC = () => {
  const {
    selectedFlight,
    selectedFarePackage,
    selectedSeats,
    passengers,
    completePayment,
    proceedToStep,
    currency,
  } = useBooking();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking' | 'wallet'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Card details
  const [cardNumber, setCardNumber] = useState('4532 8920 4821 9024');
  const [cardHolder, setCardHolder] = useState('ALEXANDER MORGAN');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('842');

  // UPI VPA
  const [upiId, setUpiId] = useState('traveler@okhdfcbank');

  // Coupon code
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  if (!selectedFlight) return null;

  // Pricing calculations
  const baseFareINR = (selectedFarePackage.priceINR || selectedFlight.priceINR) * passengers.length;
  const seatsTotalINR = selectedSeats.reduce((sum, s) => {
    if (selectedFarePackage.id === 'flex') return sum;
    if (selectedFarePackage.id === 'standard' && s.cabin === 'Economy' && !s.isExitRow) return sum;
    return sum + s.priceINR;
  }, 0);
  const taxesINR = 5320 * passengers.length;

  const discountINR = couponApplied ? Math.round((baseFareINR + seatsTotalINR + taxesINR) * 0.1) : 0;
  const grandTotalINR = baseFareINR + seatsTotalINR + taxesINR - discountINR;

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'AERIVA10' || couponCode.trim().toUpperCase() === 'FLY2026') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid code. Try AERIVA10 for 10% off');
    }
  };

  const handlePayNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      completePayment(paymentMethod, discountINR);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-ink/40 backdrop-blur-sm overflow-y-auto">
      <div className="bg-paper w-full max-w-5xl rounded-2xl border border-border shadow-2xl p-6 sm:p-8 my-auto relative text-ink">
        
        {/* PROCESSING OVERLAY */}
        {isProcessing && (
          <div className="absolute inset-0 z-50 bg-cream/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-2xl">
            <div className="relative w-20 h-20 mb-6">
              <div className="absolute inset-0 rounded-full border-2 border-terracotta/20 animate-ping" />
              <div className="absolute inset-2 rounded-full border-2 border-terracotta border-t-transparent animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock className="w-6 h-6 text-terracotta" />
              </div>
            </div>
            <span className="text-[10px] font-mono tracking-widest text-terracotta uppercase mb-1">AERIVA ENCRYPTED VAULT</span>
            <h3 className="text-xl font-serif font-medium text-ink mb-2">Authorizing Payment & Issuing Ticket</h3>
            <p className="text-xs text-warm-gray max-w-sm mb-4 font-sans">
              Confirming seat reservation {selectedSeats[0]?.id || '18A'} and generating IATA e-ticket...
            </p>
            <div className="w-48 h-1.5 bg-sand rounded-full overflow-hidden">
              <div className="h-full bg-terracotta animate-pulse w-full" />
            </div>
          </div>
        )}

        {/* HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-border">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-terracotta mb-1">
              <span>STEP 5 OF 5</span>
              <span>&bull;</span>
              <span>SECURE CHECKOUT</span>
            </div>
            <h2 className="text-2xl font-serif font-light text-ink flex items-center space-x-2">
              <span>Payment Confirmation</span>
              <Lock className="w-4 h-4 text-olive" />
            </h2>
          </div>

          <div className="flex items-center space-x-2 text-xs text-olive bg-olive/10 px-3 py-1.5 rounded-lg border border-olive/20 font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>256-Bit Bank Encryption</span>
          </div>
        </div>

        {/* MAIN CONTENT: PAYMENT METHODS (LEFT) & BOOKING SUMMARY (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-6">
          
          {/* LEFT: PAYMENT OPTIONS (Col 1-7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* PAYMENT TABS */}
            <div className="grid grid-cols-4 gap-2 p-1.5 rounded-xl bg-sand/40 border border-border font-mono text-xs">
              {[
                { id: 'card', label: 'Card', icon: CreditCard },
                { id: 'upi', label: 'UPI / QR', icon: QrCode },
                { id: 'netbanking', label: 'NetBank', icon: Building },
                { id: 'wallet', label: 'Wallets', icon: Wallet },
              ].map(tab => {
                const IconComp = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setPaymentMethod(tab.id as any)}
                    className={`py-2.5 rounded-lg text-xs font-medium flex flex-col items-center justify-center space-y-1 transition-colors ${
                      paymentMethod === tab.id
                        ? 'bg-ink text-paper shadow-sm'
                        : 'text-warm-gray hover:text-ink hover:bg-sand/60'
                    }`}
                  >
                    <IconComp className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT: CREDIT/DEBIT CARD */}
            {paymentMethod === 'card' && (
              <div className="space-y-4">
                {/* VIRTUAL CREDIT CARD PREVIEW */}
                <div className="p-6 rounded-xl bg-ink text-paper border border-border shadow-md relative overflow-hidden">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-mono tracking-widest text-champagne uppercase">AERIVA WORLD VOYAGER</span>
                    <div className="w-8 h-6 rounded-md bg-champagne/20 border border-champagne/40 flex items-center justify-center text-[8px] font-mono text-champagne">
                      CHIP
                    </div>
                  </div>

                  <div className="text-lg font-mono tracking-widest font-semibold my-4 text-paper">
                    {cardNumber || '•••• •••• •••• ••••'}
                  </div>

                  <div className="flex justify-between items-end text-xs font-mono">
                    <div>
                      <div className="text-[9px] text-warm-gray uppercase">Cardholder</div>
                      <div className="font-medium text-paper">{cardHolder || 'TRAVELER NAME'}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-warm-gray uppercase">Expires</div>
                      <div className="font-medium text-paper">{cardExpiry || 'MM/YY'}</div>
                    </div>
                  </div>
                </div>

                {/* CARD INPUT FIELDS */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-mono text-warm-gray uppercase mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-border text-xs font-mono bg-paper text-ink focus:outline-none focus:border-terracotta"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-warm-gray uppercase mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={e => setCardHolder(e.target.value)}
                        className="w-full p-2.5 rounded-lg border border-border text-xs uppercase bg-paper text-ink focus:outline-none focus:border-terracotta"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-mono text-warm-gray uppercase mb-1">Expiry</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={e => setCardExpiry(e.target.value)}
                          className="w-full p-2.5 rounded-lg border border-border text-xs font-mono bg-paper text-ink focus:outline-none focus:border-terracotta"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-warm-gray uppercase mb-1">CVV</label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvv}
                          onChange={e => setCardCvv(e.target.value)}
                          className="w-full p-2.5 rounded-lg border border-border text-xs font-mono bg-paper text-ink focus:outline-none focus:border-terracotta"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: UPI / QR CODE */}
            {paymentMethod === 'upi' && (
              <div className="p-6 rounded-xl border border-border bg-sand/20 text-center space-y-4">
                <h4 className="text-sm font-serif font-medium text-ink">Scan UPI QR with Any App</h4>
                
                <div className="w-40 h-40 mx-auto p-3 rounded-xl bg-paper border border-border flex items-center justify-center shadow-sm">
                  <div className="w-full h-full border-2 border-border p-2 flex flex-col items-center justify-center space-y-1">
                    <QrCode className="w-24 h-24 text-ink" />
                    <span className="text-[8px] font-mono text-warm-gray font-bold">AERIVA SECURE UPI</span>
                  </div>
                </div>

                <div className="text-xs text-warm-gray font-sans">
                  Compatible with Google Pay, PhonePe, Paytm, and BHIM
                </div>

                <div className="pt-3 border-t border-border flex items-center space-x-2">
                  <input
                    type="text"
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                    placeholder="Enter UPI ID (e.g. mobile@upi)"
                    className="flex-1 p-2.5 rounded-lg border border-border text-xs font-mono bg-paper text-ink focus:outline-none focus:border-terracotta"
                  />
                  <button className="px-4 py-2.5 rounded-lg bg-ink text-paper text-xs font-mono hover:bg-terracotta transition-colors">
                    Verify
                  </button>
                </div>
              </div>
            )}

            {/* TAB CONTENT: NET BANKING */}
            {paymentMethod === 'netbanking' && (
              <div className="space-y-3">
                <label className="block text-xs font-mono uppercase text-warm-gray">Select Bank</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Citibank'].map(bank => (
                    <button
                      key={bank}
                      className="p-3 rounded-lg bg-paper border border-border text-left hover:border-ink text-ink transition-colors flex items-center justify-between"
                    >
                      <span className="font-medium">{bank}</span>
                      <Building className="w-3.5 h-3.5 text-warm-gray" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: WALLET */}
            {paymentMethod === 'wallet' && (
              <div className="space-y-2 text-xs">
                {['Apple Pay', 'Google Pay', 'PayPal', 'Amazon Pay'].map(w => (
                  <button
                    key={w}
                    className="w-full p-3.5 rounded-lg bg-paper border border-border text-left hover:border-ink text-ink transition-colors flex items-center justify-between"
                  >
                    <span className="font-medium">{w}</span>
                    <Wallet className="w-4 h-4 text-terracotta" />
                  </button>
                ))}
              </div>
            )}

            {/* COUPON CODE INPUT */}
            <div className="pt-4 border-t border-border">
              <label className="block text-[11px] font-mono text-warm-gray uppercase mb-1.5 flex items-center space-x-1.5">
                <Tag className="w-3.5 h-3.5 text-terracotta" />
                <span>Promo Code (Use AERIVA10 for 10% Off)</span>
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Enter code (e.g. AERIVA10)"
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                  className="flex-1 p-2.5 rounded-lg border border-border text-xs uppercase font-mono bg-paper text-ink focus:outline-none focus:border-terracotta"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-4 py-2.5 rounded-lg bg-ink text-paper text-xs font-mono hover:bg-terracotta transition-colors"
                >
                  Apply
                </button>
              </div>
              {couponApplied && (
                <div className="text-[11px] text-olive mt-1.5 flex items-center space-x-1 font-mono">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Promo code applied. 10% discount subtracted.</span>
                </div>
              )}
              {couponError && (
                <div className="text-[11px] text-terracotta mt-1.5 font-mono">
                  {couponError}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: STICKY BOOKING BREAKDOWN SUMMARY (Col 8-12) */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-xl bg-sand/30 border border-border space-y-5 sticky top-24">
              
              <h3 className="text-xs font-mono uppercase tracking-wider text-warm-gray pb-3 border-b border-border flex items-center space-x-2">
                <Plane className="w-4 h-4 text-terracotta rotate-90" />
                <span>Itinerary Summary</span>
              </h3>

              {/* Route & Timing Snippet */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-warm-gray">Route:</span>
                  <span className="font-serif font-medium text-ink">
                    {selectedFlight.from.city} ➔ {selectedFlight.to.city}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-warm-gray">Airline:</span>
                  <span className="font-mono text-ink">
                    {selectedFlight.airline} ({selectedFlight.flightNumber})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-warm-gray">Date:</span>
                  <span className="text-ink font-mono">{selectedFlight.departureDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-warm-gray">Travelers:</span>
                  <span className="text-ink">
                    {passengers.length} {passengers.length === 1 ? 'Passenger' : 'Passengers'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-warm-gray">Fare Tier:</span>
                  <span className="text-ink font-medium">{selectedFarePackage.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-warm-gray">Seat:</span>
                  <span className="font-mono text-terracotta font-medium">
                    {selectedSeats.length > 0 ? selectedSeats.map(s => s.id).join(', ') : 'Standard'}
                  </span>
                </div>
              </div>

              {/* ITEMIZED PRICE BREAKDOWN */}
              <div className="pt-4 border-t border-border space-y-2 text-xs font-mono">
                <div className="flex justify-between text-warm-gray">
                  <span>Base Airfare ({passengers.length} pax):</span>
                  <span>{formatPrice(baseFareINR, currency)}</span>
                </div>

                <div className="flex justify-between text-warm-gray">
                  <span>Seat Assignment:</span>
                  <span>{formatPrice(seatsTotalINR, currency)}</span>
                </div>

                <div className="flex justify-between text-warm-gray">
                  <span>Airport Taxes & Fees:</span>
                  <span>{formatPrice(taxesINR, currency)}</span>
                </div>

                {couponApplied && (
                  <div className="flex justify-between text-olive font-medium">
                    <span>Discount (10%):</span>
                    <span>-{formatPrice(discountINR, currency)}</span>
                  </div>
                )}

                {/* TOTAL AMOUNT DUE */}
                <div className="pt-3 border-t border-border flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-serif font-medium text-ink block">Total Due</span>
                    <span className="text-[10px] text-warm-gray">All taxes included</span>
                  </div>
                  <span className="text-2xl font-serif font-bold text-terracotta">
                    {formatPrice(grandTotalINR, currency)}
                  </span>
                </div>
              </div>

              {/* SUBMIT CTA */}
              <button
                onClick={handlePayNow}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-lg bg-terracotta hover:bg-terracotta-hover text-paper font-mono font-medium text-xs uppercase tracking-wider transition-colors flex items-center justify-center space-x-2 shadow-sm"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-paper/30 border-t-paper rounded-full animate-spin" />
                    <span>Authorizing...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Pay {formatPrice(grandTotalINR, currency)}</span>
                  </>
                )}
              </button>

              <div className="text-center text-[10px] text-warm-gray font-sans">
                Simulated secure demonstration checkout.
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BACK BUTTON */}
        <div className="pt-3 border-t border-border flex items-center justify-between">
          <button
            onClick={() => proceedToStep('passengers')}
            className="px-5 py-2.5 rounded-lg bg-paper border border-border text-ink hover:border-ink/50 font-mono text-xs uppercase flex items-center space-x-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Passengers</span>
          </button>
        </div>
      </div>
    </div>
  );
};
