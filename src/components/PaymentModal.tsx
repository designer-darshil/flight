import React, { useState } from 'react';
import {
  CreditCard,
  QrCode,
  Building,
  Wallet,
  ShieldCheck,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Plane,
  User,
  Mail,
  Phone,
  FileText,
  Check,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { formatPrice } from '../utils/currency';
import { BookingProgress } from './BookingProgress';

type PaymentState = 'idle' | 'processing' | 'success' | 'failure';
type PaymentMethod = 'card' | 'upi' | 'netbanking' | 'wallet';

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

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [paymentState, setPaymentState] = useState<PaymentState>('idle');
  
  // Simulation outcome toggle: allows testing both Success and Failure
  const [simulateOutcome, setSimulateOutcome] = useState<'success' | 'failure'>('success');

  // Card form details
  const [cardNumber, setCardNumber] = useState('4532 8920 4821 9024');
  const [cardHolder, setCardHolder] = useState('ALEXANDER MORGAN');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('842');

  // UPI VPA
  const [upiId, setUpiId] = useState('traveler@okhdfcbank');

  // Selected Bank for Net Banking
  const [selectedBank, setSelectedBank] = useState('HDFC');

  // Coupon code
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  if (!selectedFlight) return null;

  const totalPax = passengers.length;
  const baseFarePerPax = selectedFarePackage.priceINR || selectedFlight.priceINR;
  const totalBaseFareINR = baseFarePerPax * totalPax;

  const totalSeatCostINR = selectedSeats.reduce((sum, s) => {
    if (selectedFarePackage.id === 'flex') return sum;
    if (selectedFarePackage.id === 'standard' && !s.isExitRow) return sum;
    return sum + (s.isExitRow ? 2400 : s.priceINR);
  }, 0);

  const taxesPerPaxINR = 4820;
  const totalTaxesINR = taxesPerPaxINR * totalPax;

  const discountINR = couponApplied ? Math.round((totalBaseFareINR + totalSeatCostINR + totalTaxesINR) * 0.1) : 0;
  const grandTotalINR = totalBaseFareINR + totalSeatCostINR + totalTaxesINR - discountINR;

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'AERIVA10' || couponCode.trim().toUpperCase() === 'FLY2026') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid code. Try AERIVA10 for 10% off');
    }
  };

  const handleConfirmAndPay = () => {
    setPaymentState('processing');

    setTimeout(() => {
      if (simulateOutcome === 'success') {
        setPaymentState('success');
      } else {
        setPaymentState('failure');
      }
    }, 1800);
  };

  const handleFinishSuccess = () => {
    completePayment(paymentMethod, discountINR);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-[rgba(23,23,23,0.25)] overflow-y-auto">
      <div className="bg-[#FFFFFF] w-full max-w-6xl rounded-[16px] border border-[#D8D1C5] shadow-[0_24px_60px_rgba(23,23,23,0.10)] p-4 sm:p-6 lg:p-8 my-auto relative text-ink max-h-[95vh] overflow-y-auto">
        
        {/* ==================================================
            PAYMENT STATE: PROCESSING
           ================================================== */}
        {paymentState === 'processing' && (
          <div className="absolute inset-0 z-50 bg-[#FFFFFF] rounded-[16px] flex flex-col items-center justify-center p-8 text-center">
            {/* Animated Radar Pulse */}
            <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-[#963F24]/30 animate-ping opacity-60" />
              <div className="absolute inset-2 rounded-full border border-[#D8D1C5] animate-pulse" />
              <div className="w-14 h-14 rounded-[12px] bg-[#F6F2EA] border border-[#D8D1C5] shadow-md flex items-center justify-center">
                <Lock className="w-6 h-6 text-[#963F24] animate-pulse" />
              </div>
            </div>

            <div className="text-xs font-mono tracking-widest text-[#963F24] uppercase font-bold mb-1.5">
              PROCESSING YOUR BOOKING...
            </div>
            <h3 className="text-2xl font-serif font-light text-ink mb-2">
              Authorizing 256-Bit Bank Transaction
            </h3>
            <p className="text-xs text-warm-gray max-w-md mb-6 font-sans">
              Confirming seat assignments and generating official IATA electronic ticket for {passengers[0]?.firstName || 'Traveler'}...
            </p>

            <div className="w-64 h-1.5 bg-sand rounded-full overflow-hidden">
              <div className="h-full bg-[#963F24] animate-pulse w-3/4 mx-auto rounded-full" />
            </div>
          </div>
        )}

        {/* ==================================================
            PAYMENT STATE: SUCCESS
           ================================================== */}
        {paymentState === 'success' && (
          <div className="absolute inset-0 z-50 bg-[#FFFFFF] rounded-[16px] flex flex-col items-center justify-center p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#EEF2EB] border-2 border-[#59604F] text-[#59604F] mx-auto flex items-center justify-center shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-mono tracking-widest text-[#59604F] uppercase font-bold">
                PAYMENT CONFIRMED &bull; TRANSACTION #TX994182
              </div>
              <h3 className="text-3xl sm:text-4xl font-serif font-light text-ink">
                Your Payment Was Successful
              </h3>
              <p className="text-xs text-warm-gray max-w-md mx-auto font-sans">
                Payment received in full via {paymentMethod.toUpperCase()}. Final booking confirmation issued under reference <strong className="text-ink font-mono font-bold">ARV7K92</strong>.
              </p>
            </div>

            <div className="p-4 rounded-[8px] bg-sand/40 border border-border w-full max-w-md text-xs font-mono space-y-1 text-left">
              <div className="flex justify-between">
                <span className="text-warm-gray">Transaction Method</span>
                <span className="font-bold text-ink uppercase">{paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-warm-gray">Total Paid</span>
                <span className="font-bold text-[#963F24]">{formatPrice(grandTotalINR, currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-warm-gray">Bank Authorization</span>
                <span className="text-ink">AUTH_009412</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleFinishSuccess}
              className="px-8 py-3.5 rounded-[8px] bg-[#963F24] hover:bg-[#7E331B] text-white font-sans font-bold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
            >
              VIEW OFFICIAL CONFIRMATION & BOARDING PASS
            </button>
          </div>
        )}

        {/* ==================================================
            PAYMENT STATE: FAILURE
           ================================================== */}
        {paymentState === 'failure' && (
          <div className="absolute inset-0 z-50 bg-[#FFFFFF] rounded-[16px] flex flex-col items-center justify-center p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-sand/80 border-2 border-[#963F24] text-[#963F24] mx-auto flex items-center justify-center shadow-sm">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-mono tracking-widest text-[#963F24] uppercase font-bold">
                PAYMENT COULD NOT BE COMPLETED
              </div>
              <h3 className="text-2xl font-serif font-light text-ink">
                Transaction Declined
              </h3>
              <p className="text-xs text-warm-gray max-w-md mx-auto font-sans leading-relaxed">
                The simulated banking gateway returned error <strong className="text-ink font-mono">ERR_AUTH_DECLINED</strong>. No funds were charged. You may verify credentials or select another payment method.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSimulateOutcome('success');
                  setPaymentState('idle');
                }}
                className="px-6 py-3 rounded-[8px] bg-[#963F24] hover:bg-[#7E331B] text-white font-sans font-bold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
              >
                TRY AGAIN (SIMULATE SUCCESS)
              </button>

              <button
                type="button"
                onClick={() => {
                  setPaymentMethod('upi');
                  setSimulateOutcome('success');
                  setPaymentState('idle');
                }}
                className="px-6 py-3 rounded-[8px] bg-white border border-[#D8D1C5] text-ink hover:border-ink font-sans font-medium text-xs uppercase transition-colors cursor-pointer"
              >
                SWITCH TO UPI / QR
              </button>
            </div>
          </div>
        )}

        {/* ==================================================
            IDLE CHECKOUT STAGE
           ================================================== */}
        
        {/* PROGRESS INDICATOR */}
        <BookingProgress currentStep="payment" onStepClick={proceedToStep} />

        {/* HEADER: COMPLETE YOUR JOURNEY */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border">
          <div>
            <div className="text-[11px] font-mono text-[#963F24] uppercase tracking-wider font-semibold mb-0.5">
              STAGE 5 &bull; FINAL CHECKOUT
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-light text-ink tracking-tight uppercase">
              COMPLETE YOUR JOURNEY
            </h2>
          </div>

          <div className="flex items-center space-x-2 text-xs text-[#59604F] bg-[#EEF2EB] px-3 py-1.5 rounded-[6px] border border-[#59604F]/30 font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>256-Bit Bank Encryption Verified</span>
          </div>
        </div>

        {/* MAIN LAYOUT: LEFT (DETAILS + PAYMENT) & RIGHT (STICKY BOOKING SUMMARY) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-6 items-start">
          
          {/* LEFT: PASSENGER, CONTACT, TRAVEL DOCUMENT, PAYMENT (Col 1-7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. PASSENGER SUMMARY */}
            <div className="p-5 rounded-[12px] bg-white border border-[#D8D1C5] space-y-3 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <div className="flex items-center space-x-2 text-xs font-serif font-bold text-ink uppercase tracking-wider">
                  <User className="w-4 h-4 text-[#963F24]" />
                  <span>Passenger Details</span>
                </div>
                <button
                  type="button"
                  onClick={() => proceedToStep('passengers')}
                  className="text-xs font-mono text-[#963F24] hover:underline font-semibold cursor-pointer"
                >
                  Edit
                </button>
              </div>

              <div className="space-y-2">
                {passengers.map((p, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs font-sans p-2 rounded-[6px] bg-sand/30">
                    <div>
                      <strong className="text-ink font-semibold">{p.title} {p.firstName} {p.lastName}</strong>
                      <span className="text-warm-gray text-[11px] ml-2">DOB: {p.dateOfBirth} &bull; {p.gender}</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#963F24]">
                      Seat {selectedSeats[idx]?.id || 'Assigned'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. CONTACT SUMMARY */}
            <div className="p-5 rounded-[12px] bg-white border border-[#D8D1C5] space-y-3 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <div className="flex items-center space-x-2 text-xs font-serif font-bold text-ink uppercase tracking-wider">
                  <Mail className="w-4 h-4 text-[#963F24]" />
                  <span>Contact Information</span>
                </div>
                <button
                  type="button"
                  onClick={() => proceedToStep('passengers')}
                  className="text-xs font-mono text-[#963F24] hover:underline font-semibold cursor-pointer"
                >
                  Edit
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-center space-x-2 text-ink">
                  <Mail className="w-3.5 h-3.5 text-warm-gray" />
                  <span className="font-mono">{passengers[0]?.email || 'traveler@aeriva.aero'}</span>
                </div>
                <div className="flex items-center space-x-2 text-ink">
                  <Phone className="w-3.5 h-3.5 text-warm-gray" />
                  <span className="font-mono">{passengers[0]?.phone || '+91 98200 00000'}</span>
                </div>
              </div>
            </div>

            {/* 3. TRAVEL DOCUMENT SUMMARY */}
            <div className="p-5 rounded-[12px] bg-white border border-[#D8D1C5] space-y-3 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <div className="flex items-center space-x-2 text-xs font-serif font-bold text-ink uppercase tracking-wider">
                  <FileText className="w-4 h-4 text-[#963F24]" />
                  <span>Travel Document</span>
                </div>
                <span className="text-[10px] font-mono text-[#59604F] font-semibold uppercase">Verified</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] font-mono uppercase text-warm-gray block">Nationality</span>
                  <span className="font-medium text-ink">{passengers[0]?.nationality || 'Indian'}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-warm-gray block">Passport / Travel ID</span>
                  <span className="font-mono font-medium text-ink">{passengers[0]?.passportNumber || 'M84920194'}</span>
                </div>
              </div>
            </div>

            {/* 4. PAYMENT SECTION */}
            <div className="p-5 sm:p-6 rounded-[12px] bg-white border border-[#D8D1C5] space-y-5 shadow-xs">
              
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center space-x-2 text-xs font-serif font-bold text-ink uppercase tracking-wider">
                  <Lock className="w-4 h-4 text-[#963F24]" />
                  <span>Select Payment Method</span>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-mono text-warm-gray">
                  <span>Simulation:</span>
                  <button
                    type="button"
                    onClick={() => setSimulateOutcome(simulateOutcome === 'success' ? 'failure' : 'success')}
                    className={`px-2 py-0.5 rounded-[4px] font-bold uppercase transition-colors cursor-pointer ${
                      simulateOutcome === 'success'
                        ? 'bg-[#EEF2EB] text-[#59604F] border border-[#59604F]/40'
                        : 'bg-sand text-[#963F24] border border-[#963F24]'
                    }`}
                  >
                    {simulateOutcome === 'success' ? 'Pass (Success)' : 'Fail (Failure)'}
                  </button>
                </div>
              </div>

              {/* PAYMENT METHOD TABS: CARD, UPI, NET BANKING, WALLET */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
                {[
                  { id: 'card', label: 'Card', icon: CreditCard },
                  { id: 'upi', label: 'UPI / QR', icon: QrCode },
                  { id: 'netbanking', label: 'Net Banking', icon: Building },
                  { id: 'wallet', label: 'Wallet', icon: Wallet },
                ].map(tab => {
                  const IconComp = tab.icon;
                  const isTabActive = paymentMethod === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setPaymentMethod(tab.id as PaymentMethod)}
                      className={`py-3 px-2 rounded-[8px] border text-xs font-medium flex flex-col items-center justify-center space-y-1.5 transition-all cursor-pointer ${
                        isTabActive
                          ? 'bg-ink text-white border-ink shadow-sm'
                          : 'bg-white text-ink border-[#D8D1C5] hover:bg-sand/30 hover:border-ink'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* METHOD 1: CARD */}
              {paymentMethod === 'card' && (
                <div className="space-y-4 pt-2">
                  {/* Visual Card Representation */}
                  <div className="p-5 rounded-[12px] bg-[#171717] text-white border border-border shadow-md space-y-4">
                    <div className="flex justify-between items-center text-xs font-mono text-sand">
                      <span className="tracking-widest uppercase">AERIVA WORLD TRAVEL</span>
                      <span>VISA PLATINUM</span>
                    </div>
                    <div className="font-mono text-lg tracking-widest text-white">
                      {cardNumber || '•••• •••• •••• ••••'}
                    </div>
                    <div className="flex justify-between text-xs font-mono text-sand">
                      <div>
                        <span className="text-[9px] uppercase block text-warm-gray">Cardholder</span>
                        <span>{cardHolder || 'TRAVELER'}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase block text-warm-gray">Expires</span>
                        <span>{cardExpiry || 'MM/YY'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Form Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
                    <div className="sm:col-span-12">
                      <label className="block text-[11px] font-mono uppercase text-warm-gray mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value)}
                        className="w-full h-12 px-4 rounded-[8px] border border-[#D8D1C5] bg-white text-ink font-mono focus:outline-none focus:border-[#963F24]"
                      />
                    </div>
                    <div className="sm:col-span-6">
                      <label className="block text-[11px] font-mono uppercase text-warm-gray mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={e => setCardHolder(e.target.value.toUpperCase())}
                        className="w-full h-12 px-4 rounded-[8px] border border-[#D8D1C5] bg-white text-ink uppercase focus:outline-none focus:border-[#963F24]"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-[11px] font-mono uppercase text-warm-gray mb-1">Expiry</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={e => setCardExpiry(e.target.value)}
                        className="w-full h-12 px-4 rounded-[8px] border border-[#D8D1C5] bg-white text-ink font-mono text-center focus:outline-none focus:border-[#963F24]"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-[11px] font-mono uppercase text-warm-gray mb-1">CVV</label>
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="•••"
                        value={cardCvv}
                        onChange={e => setCardCvv(e.target.value)}
                        className="w-full h-12 px-4 rounded-[8px] border border-[#D8D1C5] bg-white text-ink font-mono text-center focus:outline-none focus:border-[#963F24]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* METHOD 2: UPI */}
              {paymentMethod === 'upi' && (
                <div className="space-y-4 pt-2">
                  <div className="p-4 rounded-[8px] bg-sand/30 border border-border space-y-3">
                    <label className="block text-[11px] font-mono uppercase text-warm-gray font-semibold">
                      Enter UPI ID / VPA
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={upiId}
                        onChange={e => setUpiId(e.target.value)}
                        placeholder="username@bank"
                        className="flex-1 h-12 px-4 rounded-[8px] border border-[#D8D1C5] bg-white text-ink font-mono text-xs focus:outline-none focus:border-[#963F24]"
                      />
                      <button
                        type="button"
                        className="h-12 px-4 rounded-[8px] bg-ink text-white font-mono text-xs font-semibold"
                      >
                        Verify
                      </button>
                    </div>
                    <span className="text-[11px] font-mono text-[#59604F] flex items-center space-x-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Verified: Alexander Morgan (HDFC Bank)</span>
                    </span>
                  </div>

                  <div className="text-center py-4 border border-dashed border-border rounded-[8px] bg-white">
                    <QrCode className="w-24 h-24 mx-auto text-ink mb-2" />
                    <span className="text-[11px] font-mono text-warm-gray block">Scan QR with any UPI App (GPay, PhonePe, Paytm)</span>
                  </div>
                </div>
              )}

              {/* METHOD 3: NET BANKING */}
              {paymentMethod === 'netbanking' && (
                <div className="space-y-3 pt-2">
                  <label className="block text-[11px] font-mono uppercase text-warm-gray font-semibold">
                    Select Popular Bank
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {['HDFC', 'ICICI', 'SBI', 'Axis Bank', 'HSBC', 'Barclays'].map(bank => (
                      <button
                        key={bank}
                        type="button"
                        onClick={() => setSelectedBank(bank)}
                        className={`p-3 rounded-[8px] border text-xs font-mono font-medium transition-all text-center cursor-pointer ${
                          selectedBank === bank
                            ? 'bg-ink text-white border-ink shadow-xs'
                            : 'bg-white text-ink border-[#D8D1C5] hover:bg-sand/30'
                        }`}
                      >
                        {bank}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* METHOD 4: WALLET */}
              {paymentMethod === 'wallet' && (
                <div className="space-y-3 pt-2">
                  <label className="block text-[11px] font-mono uppercase text-warm-gray font-semibold">
                    Select Digital Wallet
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    {['Apple Pay', 'Google Pay', 'Aeriva Miles Wallet'].map(w => (
                      <div
                        key={w}
                        className="p-4 rounded-[8px] border border-[#D8D1C5] bg-sand/20 flex items-center justify-between cursor-pointer hover:border-ink"
                      >
                        <span className="font-medium text-ink">{w}</span>
                        <div className="w-4 h-4 rounded-full border border-ink flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-ink" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PROMO COUPON CODE */}
              <div className="pt-4 border-t border-border">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Enter Coupon (AERIVA10)"
                    value={couponCode}
                    onChange={e => setCouponCode(e.target.value.toUpperCase())}
                    className="flex-1 h-11 px-4 rounded-[8px] border border-[#D8D1C5] bg-white text-ink text-xs font-mono uppercase focus:outline-none focus:border-[#963F24]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="h-11 px-5 rounded-[8px] bg-sand hover:bg-sand/80 text-ink font-mono font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <span className="text-[11px] font-mono text-[#59604F] mt-1.5 flex items-center space-x-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Coupon AERIVA10 applied: 10% savings deducted!</span>
                  </span>
                )}
                {couponError && (
                  <span className="text-[11px] font-mono text-[#963F24] mt-1.5 block">
                    {couponError}
                  </span>
                )}
              </div>

            </div>

          </div>

          {/* RIGHT: STICKY BOOKING SUMMARY (Col 8-12) */}
          <div className="lg:col-span-5 sticky top-4">
            <div className="bg-white rounded-[12px] p-6 border border-[#D8D1C5] shadow-sm space-y-5 text-ink">
              
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <h3 className="font-serif font-bold text-lg text-ink">
                  Itinerary Summary
                </h3>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-[4px] bg-sand font-bold text-[#963F24]">
                  CONFIRMED FARE
                </span>
              </div>

              {/* ROUTE */}
              <div className="space-y-1 text-xs">
                <div className="text-[10px] font-mono text-warm-gray uppercase tracking-wider">Route</div>
                <div className="font-serif font-medium text-base text-ink flex items-center space-x-2">
                  <span>{selectedFlight.from.city} ({selectedFlight.from.code})</span>
                  <Plane className="w-3.5 h-3.5 text-[#963F24] rotate-90" />
                  <span>{selectedFlight.to.city} ({selectedFlight.to.code})</span>
                </div>
                <div className="text-warm-gray font-mono text-[11px]">
                  {selectedFlight.departureDate} &bull; {selectedFlight.duration} &bull; {selectedFlight.stops === 0 ? 'Non-stop' : `${selectedFlight.stops} Stop`}
                </div>
              </div>

              {/* FLIGHT */}
              <div className="space-y-1 text-xs pt-3 border-t border-border">
                <div className="text-[10px] font-mono text-warm-gray uppercase tracking-wider">Flight & Aircraft</div>
                <div className="flex items-center space-x-2 font-medium text-ink">
                  <span>{selectedFlight.airline}</span>
                  <span className="font-mono text-xs font-bold text-[#963F24]">({selectedFlight.flightNumber})</span>
                </div>
                <div className="text-warm-gray text-[11px] font-mono">
                  {selectedFlight.aircraft} &bull; Departure {selectedFlight.departureTime}
                </div>
              </div>

              {/* FARE */}
              <div className="space-y-1 text-xs pt-3 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-warm-gray uppercase tracking-wider">Fare Package</span>
                  <span className="font-mono font-bold text-ink">{selectedFarePackage.name}</span>
                </div>
                <div className="flex justify-between text-warm-gray">
                  <span>Base fare ({totalPax} {totalPax === 1 ? 'traveler' : 'travelers'}):</span>
                  <span className="font-mono text-ink">{formatPrice(totalBaseFareINR, currency)}</span>
                </div>
              </div>

              {/* SEAT */}
              <div className="space-y-1.5 text-xs pt-3 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-warm-gray uppercase tracking-wider">Seats Assigned</span>
                  <span className="font-mono font-semibold text-ink">
                    {selectedSeats.map(s => s.id).join(', ') || 'Complimentary'}
                  </span>
                </div>
                <div className="flex justify-between text-warm-gray font-mono">
                  <span>Seat Assignment Fees:</span>
                  <span className="text-ink">{formatPrice(totalSeatCostINR, currency)}</span>
                </div>
              </div>

              {/* TAXES */}
              <div className="pt-3 border-t border-border space-y-1 text-xs font-mono">
                <div className="flex justify-between text-warm-gray">
                  <span>Airport Taxes & GST:</span>
                  <span className="text-ink">{formatPrice(totalTaxesINR, currency)}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-[#59604F] font-semibold">
                    <span>Promo Discount (10%):</span>
                    <span>-{formatPrice(discountINR, currency)}</span>
                  </div>
                )}
              </div>

              {/* TOTAL */}
              <div className="pt-4 border-t-2 border-border flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-mono text-warm-gray uppercase tracking-wider block">Grand Total</span>
                  <span className="text-[11px] font-mono text-warm-gray">All inclusive price</span>
                </div>
                <div className="text-3xl font-serif font-bold text-[#963F24]">
                  {formatPrice(grandTotalINR, currency)}
                </div>
              </div>

              {/* PRIMARY CTA: CONFIRM & PAY */}
              <button
                type="button"
                onClick={handleConfirmAndPay}
                className="w-full h-12 rounded-[8px] bg-[#963F24] hover:bg-[#7E331B] text-white font-sans font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>CONFIRM & PAY</span>
                <ShieldCheck className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => proceedToStep('passengers')}
                className="w-full py-2 text-center text-xs font-mono text-warm-gray hover:text-ink transition-colors cursor-pointer"
              >
                ← Back to Passenger Information
              </button>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
