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
  const [cardHolder, setCardHolder] = useState('ALEXANDER VANCE');
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
      setCouponError('Invalid promo code. Try AERIVA10 for 10% off');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-navy-950/85 backdrop-blur-xl overflow-y-auto">
      <div className="glass-panel w-full max-w-5xl rounded-3xl border border-white/15 shadow-2xl p-6 sm:p-8 my-auto relative overflow-hidden">
        
        {/* Glow backdrop */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* PROCESSING OVERLAY */}
        {isProcessing && (
          <div className="absolute inset-0 z-50 bg-aeriva-navy/95 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center">
            <div className="relative w-24 h-24 mb-6">
              <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 animate-ping" />
              <div className="absolute inset-2 rounded-full border-2 border-aeriva-cyan border-t-transparent animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock className="w-8 h-8 text-aeriva-cyan animate-pulse" />
              </div>
            </div>
            <span className="text-[10px] font-mono tracking-widest text-aeriva-cyan uppercase mb-1">AERIVA SECURE ENCLAVE</span>
            <h3 className="text-xl font-display font-bold text-white mb-2">SECURELY PROCESSING YOUR BOOKING</h3>
            <p className="text-xs text-slate-300 max-w-sm mb-4">
              Authorizing payment, confirming seat {selectedSeats[0]?.id || '18A'}, and issuing e-ticket confirmation...
            </p>
            <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-aeriva-blue via-cyan-400 to-emerald-400 animate-pulse w-full" />
            </div>
          </div>
        )}

        {/* HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/10">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 mb-1">
              <span>STEP 5 OF 5</span>
              <span>·</span>
              <span>INSTANT SECURE CHECKOUT</span>
            </div>
            <h2 className="text-2xl font-display font-extrabold text-white flex items-center space-x-2">
              <span>Simulated Payment Gateway</span>
              <Lock className="w-4 h-4 text-emerald-400" />
            </h2>
          </div>

          <div className="flex items-center space-x-2 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4" />
            <span>256-Bit SSL Encrypted</span>
          </div>
        </div>

        {/* MAIN CONTENT: PAYMENT METHODS (LEFT) & BOOKING SUMMARY (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-6">
          
          {/* LEFT: PAYMENT OPTIONS (Col 1-7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* PAYMENT TABS */}
            <div className="grid grid-cols-4 gap-2 p-1.5 rounded-2xl bg-slate-900 border border-white/10">
              {[
                { id: 'card', label: 'Cards', icon: CreditCard },
                { id: 'upi', label: 'UPI / QR', icon: QrCode },
                { id: 'netbanking', label: 'NetBank', icon: Building },
                { id: 'wallet', label: 'Wallets', icon: Wallet },
              ].map(tab => {
                const IconComp = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setPaymentMethod(tab.id as any)}
                    className={`py-2.5 rounded-xl text-xs font-semibold flex flex-col items-center justify-center space-y-1 transition-all ${
                      paymentMethod === tab.id
                        ? 'bg-gradient-to-r from-aerova-blue to-cyan-500 text-white shadow-glow-blue'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
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
                {/* VIRTUAL METALLIC CREDIT CARD PREVIEW */}
                <div className="p-6 rounded-2xl bg-gradient-to-tr from-slate-900 via-slate-800 to-cyan-950 border border-white/20 shadow-2xl text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-400/10 rounded-full blur-xl pointer-events-none" />
                  
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">AERIVA SKY PRIVILEGE</span>
                    <div className="w-10 h-7 rounded-md bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-[9px] font-bold text-amber-300">
                      CHIP
                    </div>
                  </div>

                  <div className="text-xl font-mono tracking-widest font-bold my-4 text-slate-100">
                    {cardNumber || '•••• •••• •••• ••••'}
                  </div>

                  <div className="flex justify-between items-end text-xs font-mono">
                    <div>
                      <div className="text-[9px] text-slate-400 uppercase">Cardholder</div>
                      <div className="font-bold text-slate-200">{cardHolder || 'TRAVELER NAME'}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-400 uppercase">Expires</div>
                      <div className="font-bold text-slate-200">{cardExpiry || 'MM/YY'}</div>
                    </div>
                  </div>
                </div>

                {/* CARD INPUT FIELDS */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value)}
                      className="w-full glass-input p-2.5 rounded-xl text-xs font-mono text-white focus:border-cyan-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={e => setCardHolder(e.target.value)}
                        className="w-full glass-input p-2.5 rounded-xl text-xs uppercase text-white focus:border-cyan-400"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">Expiry</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={e => setCardExpiry(e.target.value)}
                          className="w-full glass-input p-2.5 rounded-xl text-xs font-mono text-white focus:border-cyan-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">CVV</label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvv}
                          onChange={e => setCardCvv(e.target.value)}
                          className="w-full glass-input p-2.5 rounded-xl text-xs font-mono text-white focus:border-cyan-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: UPI / QR CODE */}
            {paymentMethod === 'upi' && (
              <div className="glass-panel p-6 rounded-2xl border border-white/10 text-center space-y-4">
                <h4 className="text-sm font-bold text-white">Scan UPI QR with Any App</h4>
                
                {/* SIMULATED HIGH-TECH QR CODE */}
                <div className="w-44 h-44 mx-auto p-3 rounded-2xl bg-white flex items-center justify-center shadow-glow-cyan">
                  <div className="w-full h-full border-4 border-slate-900 p-2 flex flex-col items-center justify-center space-y-1">
                    <QrCode className="w-24 h-24 text-slate-900" />
                    <span className="text-[9px] font-mono text-slate-800 font-bold">AERIVA-PAY-SECURE</span>
                  </div>
                </div>

                <div className="text-xs text-slate-300">
                  Scan using Google Pay, PhonePe, Paytm, BHIM, or Banking UPI
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center space-x-2">
                  <input
                    type="text"
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                    placeholder="Enter UPI VPA ID (e.g. mobile@upi)"
                    className="flex-1 glass-input p-2.5 rounded-xl text-xs font-mono text-white focus:border-cyan-400"
                  />
                  <button className="px-4 py-2.5 rounded-xl bg-slate-800 text-cyan-400 border border-cyan-500/30 text-xs font-bold hover:bg-slate-700">
                    Verify
                  </button>
                </div>
              </div>
            )}

            {/* TAB CONTENT: NET BANKING */}
            {paymentMethod === 'netbanking' && (
              <div className="space-y-3">
                <label className="block text-xs font-mono uppercase text-slate-400">Popular Banks</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Citibank'].map(bank => (
                    <button
                      key={bank}
                      className="p-3 rounded-xl bg-slate-900 border border-white/10 text-left hover:border-cyan-400 hover:text-cyan-300 text-slate-300 transition-colors flex items-center justify-between"
                    >
                      <span>{bank}</span>
                      <Building className="w-3.5 h-3.5 text-slate-500" />
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
                    className="w-full p-3.5 rounded-xl bg-slate-900 border border-white/10 text-left hover:border-cyan-400 hover:text-cyan-300 text-slate-300 transition-colors flex items-center justify-between"
                  >
                    <span className="font-bold text-white">{w}</span>
                    <Wallet className="w-4 h-4 text-cyan-400" />
                  </button>
                ))}
              </div>
            )}

            {/* COUPON CODE INPUT */}
            <div className="pt-4 border-t border-white/10">
              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1.5 flex items-center space-x-1.5">
                <Tag className="w-3.5 h-3.5 text-cyan-400" />
                <span>Have a Promo Code? (Use AERIVA10 for 10% Off)</span>
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Enter code (e.g. AEROVA10)"
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                  className="flex-1 glass-input p-2.5 rounded-xl text-xs uppercase font-mono text-white focus:border-cyan-400"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-cyan-300 border border-cyan-500/30 text-xs font-bold hover:bg-slate-700 transition-colors"
                >
                  Apply
                </button>
              </div>
              {couponApplied && (
                <div className="text-[11px] text-emerald-400 mt-1.5 flex items-center space-x-1 font-mono">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Promo code applied! 10% discount subtracted.</span>
                </div>
              )}
              {couponError && (
                <div className="text-[11px] text-red-400 mt-1.5 font-mono">
                  {couponError}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: STICKY BOOKING BREAKDOWN SUMMARY (Col 8-12) */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-6 rounded-3xl border border-white/15 space-y-5 sticky top-24">
              
              <h3 className="text-sm font-bold font-display uppercase tracking-wider text-white pb-3 border-b border-white/10 flex items-center space-x-2">
                <Plane className="w-4 h-4 text-cyan-400" />
                <span>Trip Summary</span>
              </h3>

              {/* Route & Timing Snippet */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Flight:</span>
                  <span className="font-bold text-white">
                    {selectedFlight.from.city} ➔ {selectedFlight.to.city}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Airline:</span>
                  <span className="font-mono text-cyan-400">
                    {selectedFlight.airline} ({selectedFlight.flightNumber})
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Date:</span>
                  <span className="text-slate-200 font-mono">{selectedFlight.departureDate}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Travelers:</span>
                  <span className="text-slate-200">
                    {passengers.length} {passengers.length === 1 ? 'Passenger' : 'Passengers'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Cabin & Fare:</span>
                  <span className="text-slate-200">{selectedFarePackage.name} Tier</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Seat Selection:</span>
                  <span className="font-mono text-cyan-400">
                    {selectedSeats.length > 0 ? selectedSeats.map(s => s.id).join(', ') : 'Standard'}
                  </span>
                </div>
              </div>

              {/* ITEMIZED PRICE BREAKDOWN */}
              <div className="pt-4 border-t border-white/10 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Base Airfare ({passengers.length} pax):</span>
                  <span className="font-mono">{formatPrice(baseFareINR, currency)}</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>Seat Assignment Add-ons:</span>
                  <span className="font-mono">{formatPrice(seatsTotalINR, currency)}</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>Aviation Taxes & Regulatory Fees:</span>
                  <span className="font-mono">{formatPrice(taxesINR, currency)}</span>
                </div>

                {couponApplied && (
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>Special Promo Discount (10%):</span>
                    <span className="font-mono">-{formatPrice(discountINR, currency)}</span>
                  </div>
                )}

                {/* TOTAL AMOUNT DUE */}
                <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-bold text-white font-display block">Total Due</span>
                    <span className="text-[10px] text-slate-400">Includes all taxes & carrier surcharges</span>
                  </div>
                  <span className="text-2xl font-black font-display text-cyan-300">
                    {formatPrice(grandTotalINR, currency)}
                  </span>
                </div>
              </div>

              {/* SIMULATED SUBMIT CTA */}
              <button
                onClick={handlePayNow}
                disabled={isProcessing}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-aerova-blue via-blue-600 to-cyan-500 text-white font-extrabold text-sm tracking-wide shadow-glow-blue hover:shadow-cyan-500/40 transition-all flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Authorizing Payment...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay {formatPrice(grandTotalINR, currency)}</span>
                  </>
                )}
              </button>

              <div className="text-center text-[10px] text-slate-400">
                Simulated checkout demonstration. No actual bank card will be charged.
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BACK BUTTON */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={() => proceedToStep('passengers')}
            className="px-5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white font-medium text-xs flex items-center space-x-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Passengers</span>
          </button>
        </div>
      </div>
    </div>
  );
};
