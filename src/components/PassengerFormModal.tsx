import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Armchair,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { Passenger } from '../types';
import { BookingProgress } from './BookingProgress';

export const PassengerFormModal: React.FC = () => {
  const {
    passengers,
    updatePassengers,
    selectedSeats,
    proceedToStep,
    selectedFlight,
    searchParams,
  } = useBooking();

  const [formData, setFormData] = useState<Passenger[]>(() => {
    // Ensure formData matches travelers count
    const totalCount = searchParams.passengers.adults + searchParams.passengers.children;
    if (passengers.length >= totalCount) return passengers.slice(0, totalCount);
    const initial = [...passengers];
    for (let i = initial.length; i < totalCount; i++) {
      initial.push({
        title: 'Mr',
        firstName: '',
        lastName: '',
        dateOfBirth: '1995-06-15',
        gender: 'Male',
        nationality: 'Indian',
        passportNumber: '',
        email: i === 0 ? 'traveler@aeriva.aero' : '',
        phone: i === 0 ? '+91 98200 00000' : '',
      });
    }
    return initial;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleInputChange = (
    index: number,
    field: keyof Passenger,
    value: string
  ) => {
    setFormData(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return updated;
    });

    // Clear inline error on change
    if (errors[`${index}-${field}`]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[`${index}-${field}`];
        return next;
      });
    }
  };

  const handleBlur = (index: number, field: string) => {
    setTouched(prev => ({ ...prev, [`${index}-${field}`]: true }));
    validateField(index, field);
  };

  const validateField = (index: number, field: string) => {
    const p = formData[index];
    const newErrors = { ...errors };

    if (field === 'firstName' && !p.firstName.trim()) {
      newErrors[`${index}-firstName`] = 'First name is required';
    } else if (field === 'firstName') {
      delete newErrors[`${index}-firstName`];
    }

    if (field === 'lastName' && !p.lastName.trim()) {
      newErrors[`${index}-lastName`] = 'Last name is required';
    } else if (field === 'lastName') {
      delete newErrors[`${index}-lastName`];
    }

    if (field === 'dateOfBirth' && !p.dateOfBirth) {
      newErrors[`${index}-dateOfBirth`] = 'Date of birth is required';
    } else if (field === 'dateOfBirth') {
      delete newErrors[`${index}-dateOfBirth`];
    }

    if (field === 'passportNumber' && !p.passportNumber.trim()) {
      newErrors[`${index}-passportNumber`] = 'Passport or national travel ID is required';
    } else if (field === 'passportNumber') {
      delete newErrors[`${index}-passportNumber`];
    }

    if (index === 0) {
      if (field === 'email' && (!p.email.trim() || !p.email.includes('@') || !p.email.includes('.'))) {
        newErrors[`${index}-email`] = 'Valid e-ticket email address is required';
      } else if (field === 'email') {
        delete newErrors[`${index}-email`];
      }

      if (field === 'phone' && (!p.phone.trim() || p.phone.trim().length < 7)) {
        newErrors[`${index}-phone`] = 'Contact mobile number with country code is required';
      } else if (field === 'phone') {
        delete newErrors[`${index}-phone`];
      }
    }

    setErrors(newErrors);
  };

  const validateAll = (): boolean => {
    const newErrors: Record<string, string> = {};
    const newTouched: Record<string, boolean> = {};

    formData.forEach((p, idx) => {
      newTouched[`${idx}-firstName`] = true;
      newTouched[`${idx}-lastName`] = true;
      newTouched[`${idx}-dateOfBirth`] = true;
      newTouched[`${idx}-gender`] = true;
      newTouched[`${idx}-nationality`] = true;
      newTouched[`${idx}-passportNumber`] = true;

      if (!p.firstName.trim()) {
        newErrors[`${idx}-firstName`] = 'First name is required';
      }
      if (!p.lastName.trim()) {
        newErrors[`${idx}-lastName`] = 'Last name is required';
      }
      if (!p.dateOfBirth) {
        newErrors[`${idx}-dateOfBirth`] = 'Date of birth is required';
      }
      if (!p.passportNumber.trim()) {
        newErrors[`${idx}-passportNumber`] = 'Passport or national travel ID is required';
      }

      if (idx === 0) {
        newTouched[`${idx}-email`] = true;
        newTouched[`${idx}-phone`] = true;

        if (!p.email.trim() || !p.email.includes('@') || !p.email.includes('.')) {
          newErrors[`${idx}-email`] = 'Valid e-ticket email address is required';
        }
        if (!p.phone.trim() || p.phone.trim().length < 7) {
          newErrors[`${idx}-phone`] = 'Contact mobile number with country code is required';
        }
      }
    });

    setTouched(newTouched);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceed = () => {
    if (validateAll()) {
      updatePassengers(formData);
      proceedToStep('payment');
    }
  };

  if (!selectedFlight) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[rgba(23,23,23,0.25)] overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-[12px] border border-[#D8D1C5] shadow-[0_20px_60px_rgba(23,23,23,0.12)] p-6 sm:p-8 my-auto relative text-ink">
        
        {/* BOOKING PROGRESS: FLIGHT -> FARE -> SEAT -> PASSENGER -> PAYMENT -> CONFIRMATION */}
        <BookingProgress currentStep="passengers" onStepClick={proceedToStep} />

        {/* HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border">
          <div>
            <div className="text-[11px] font-mono text-[#963F24] uppercase tracking-wider font-semibold mb-0.5">
              STAGE 4 &bull; TRAVELER CREDENTIALS
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-light text-ink tracking-tight flex items-center space-x-2">
              <span>Passenger Information</span>
              <Sparkles className="w-5 h-5 text-[#963F24]" />
            </h2>
          </div>

          <div className="text-xs text-warm-gray font-mono text-right">
            <div>Itinerary: <strong className="text-ink font-semibold">{selectedFlight.from.code} ➔ {selectedFlight.to.code}</strong></div>
            <div>Departure: <span className="text-[#963F24] font-semibold">{selectedFlight.departureDate}</span></div>
          </div>
        </div>

        {/* PASSENGER FORMS */}
        <div className="space-y-6 my-6 max-h-[62vh] overflow-y-auto pr-1">
          {formData.map((passenger, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-[12px] border border-[#D8D1C5] bg-white space-y-4 shadow-xs"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center space-x-2.5">
                  <div className="w-6 h-6 rounded-[6px] bg-ink text-white font-mono font-bold flex items-center justify-center text-xs">
                    {idx + 1}
                  </div>
                  <h3 className="text-sm font-serif font-bold text-ink">
                    Passenger {idx + 1} {idx === 0 ? '· Primary Traveler & Contact' : ''}
                  </h3>
                </div>

                <div className="text-xs font-mono text-warm-gray flex items-center space-x-1.5">
                  <Armchair className="w-3.5 h-3.5 text-[#963F24]" />
                  <span>Seat: <strong className="text-[#963F24]">{selectedSeats[idx]?.id || 'Complimentary'}</strong></span>
                </div>
              </div>

              {/* INPUT FIELDS USING GLOBAL INPUT SYSTEM */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                
                {/* Title */}
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-mono uppercase text-warm-gray font-semibold mb-1">
                    Title
                  </label>
                  <select
                    value={passenger.title}
                    onChange={e => handleInputChange(idx, 'title', e.target.value)}
                    className="w-full h-12 px-3 rounded-[8px] border border-[#D8D1C5] bg-white text-ink text-xs focus:outline-none focus:border-[#963F24] cursor-pointer"
                  >
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Ms">Ms</option>
                    <option value="Dr">Dr</option>
                  </select>
                </div>

                {/* 1. FIRST NAME */}
                <div className="sm:col-span-5">
                  <label className="block text-[11px] font-mono uppercase text-warm-gray font-semibold mb-1">
                    First / Given Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Alexander"
                      value={passenger.firstName}
                      onChange={e => handleInputChange(idx, 'firstName', e.target.value)}
                      onBlur={() => handleBlur(idx, 'firstName')}
                      className={`w-full h-12 px-4 rounded-[8px] border text-xs bg-white text-ink placeholder-[#6F6A61] focus:outline-none transition-colors ${
                        touched[`${idx}-firstName`] && errors[`${idx}-firstName`]
                          ? 'border-[#963F24] focus:border-[#963F24]'
                          : 'border-[#D8D1C5] focus:border-[#963F24]'
                      }`}
                    />
                  </div>
                  {touched[`${idx}-firstName`] && errors[`${idx}-firstName`] && (
                    <span className="text-[11px] font-mono text-[#963F24] mt-1 block">
                      {errors[`${idx}-firstName`]}
                    </span>
                  )}
                </div>

                {/* 2. LAST NAME */}
                <div className="sm:col-span-5">
                  <label className="block text-[11px] font-mono uppercase text-warm-gray font-semibold mb-1">
                    Last / Surname *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Morgan"
                      value={passenger.lastName}
                      onChange={e => handleInputChange(idx, 'lastName', e.target.value)}
                      onBlur={() => handleBlur(idx, 'lastName')}
                      className={`w-full h-12 px-4 rounded-[8px] border text-xs bg-white text-ink placeholder-[#6F6A61] focus:outline-none transition-colors ${
                        touched[`${idx}-lastName`] && errors[`${idx}-lastName`]
                          ? 'border-[#963F24] focus:border-[#963F24]'
                          : 'border-[#D8D1C5] focus:border-[#963F24]'
                      }`}
                    />
                  </div>
                  {touched[`${idx}-lastName`] && errors[`${idx}-lastName`] && (
                    <span className="text-[11px] font-mono text-[#963F24] mt-1 block">
                      {errors[`${idx}-lastName`]}
                    </span>
                  )}
                </div>

                {/* 3. DOB */}
                <div className="sm:col-span-4">
                  <label className="block text-[11px] font-mono uppercase text-warm-gray font-semibold mb-1">
                    Date of Birth *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={passenger.dateOfBirth}
                      onChange={e => handleInputChange(idx, 'dateOfBirth', e.target.value)}
                      onBlur={() => handleBlur(idx, 'dateOfBirth')}
                      className={`w-full h-12 px-4 rounded-[8px] border text-xs bg-white text-ink focus:outline-none transition-colors ${
                        touched[`${idx}-dateOfBirth`] && errors[`${idx}-dateOfBirth`]
                          ? 'border-[#963F24] focus:border-[#963F24]'
                          : 'border-[#D8D1C5] focus:border-[#963F24]'
                      }`}
                    />
                  </div>
                  {touched[`${idx}-dateOfBirth`] && errors[`${idx}-dateOfBirth`] && (
                    <span className="text-[11px] font-mono text-[#963F24] mt-1 block">
                      {errors[`${idx}-dateOfBirth`]}
                    </span>
                  )}
                </div>

                {/* 4. GENDER */}
                <div className="sm:col-span-4">
                  <label className="block text-[11px] font-mono uppercase text-warm-gray font-semibold mb-1">
                    Gender *
                  </label>
                  <select
                    value={passenger.gender}
                    onChange={e => handleInputChange(idx, 'gender', e.target.value)}
                    className="w-full h-12 px-3 rounded-[8px] border border-[#D8D1C5] bg-white text-ink text-xs focus:outline-none focus:border-[#963F24] cursor-pointer"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Undisclosed">Other / Undisclosed</option>
                  </select>
                </div>

                {/* 5. NATIONALITY */}
                <div className="sm:col-span-4">
                  <label className="block text-[11px] font-mono uppercase text-warm-gray font-semibold mb-1">
                    Nationality *
                  </label>
                  <select
                    value={passenger.nationality}
                    onChange={e => handleInputChange(idx, 'nationality', e.target.value)}
                    className="w-full h-12 px-3 rounded-[8px] border border-[#D8D1C5] bg-white text-ink text-xs focus:outline-none focus:border-[#963F24] cursor-pointer"
                  >
                    <option value="Indian">India (Indian)</option>
                    <option value="British">United Kingdom (British)</option>
                    <option value="American">United States (American)</option>
                    <option value="Emirati">United Arab Emirates (Emirati)</option>
                    <option value="Singaporean">Singapore (Singaporean)</option>
                    <option value="Japanese">Japan (Japanese)</option>
                    <option value="French">France (French)</option>
                    <option value="German">Germany (German)</option>
                    <option value="Australian">Australia (Australian)</option>
                    <option value="Canadian">Canada (Canadian)</option>
                  </select>
                </div>

                {/* 6. PASSPORT */}
                <div className="sm:col-span-6">
                  <label className="block text-[11px] font-mono uppercase text-warm-gray font-semibold mb-1">
                    Passport / Travel Document Number *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. M12345678"
                      value={passenger.passportNumber}
                      onChange={e => handleInputChange(idx, 'passportNumber', e.target.value.toUpperCase())}
                      onBlur={() => handleBlur(idx, 'passportNumber')}
                      className={`w-full h-12 px-4 rounded-[8px] border text-xs bg-white text-ink uppercase font-mono placeholder-[#6F6A61] focus:outline-none transition-colors ${
                        touched[`${idx}-passportNumber`] && errors[`${idx}-passportNumber`]
                          ? 'border-[#963F24] focus:border-[#963F24]'
                          : 'border-[#D8D1C5] focus:border-[#963F24]'
                      }`}
                    />
                  </div>
                  {touched[`${idx}-passportNumber`] && errors[`${idx}-passportNumber`] && (
                    <span className="text-[11px] font-mono text-[#963F24] mt-1 block">
                      {errors[`${idx}-passportNumber`]}
                    </span>
                  )}
                </div>

                {/* Meal preference */}
                <div className="sm:col-span-6">
                  <label className="block text-[11px] font-mono uppercase text-warm-gray font-semibold mb-1">
                    Special Meal Request
                  </label>
                  <select
                    value={passenger.mealPreference || 'Standard'}
                    onChange={e => handleInputChange(idx, 'mealPreference', e.target.value)}
                    className="w-full h-12 px-3 rounded-[8px] border border-[#D8D1C5] bg-white text-ink text-xs focus:outline-none focus:border-[#963F24] cursor-pointer"
                  >
                    <option value="Standard">Standard Chef Special</option>
                    <option value="Asian Vegetarian">Asian Vegetarian (AVML)</option>
                    <option value="Vegetarian Vegan">Vegetarian Vegan (VGML)</option>
                    <option value="Halal">Halal Certified (MOML)</option>
                    <option value="Kosher">Kosher (KSML)</option>
                    <option value="Gluten Free">Gluten Friendly (GFML)</option>
                  </select>
                </div>

                {/* 7. EMAIL & 8. PHONE (PRIMARY TRAVELER) */}
                {idx === 0 && (
                  <>
                    <div className="sm:col-span-6 pt-2">
                      <label className="block text-[11px] font-mono uppercase text-warm-gray font-semibold mb-1">
                        E-Ticket Email Address *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="alexander@domain.com"
                          value={passenger.email}
                          onChange={e => handleInputChange(idx, 'email', e.target.value)}
                          onBlur={() => handleBlur(idx, 'email')}
                          className={`w-full h-12 px-4 rounded-[8px] border text-xs bg-white text-ink placeholder-[#6F6A61] focus:outline-none transition-colors ${
                            touched[`${idx}-email`] && errors[`${idx}-email`]
                              ? 'border-[#963F24] focus:border-[#963F24]'
                              : 'border-[#D8D1C5] focus:border-[#963F24]'
                          }`}
                        />
                      </div>
                      {touched[`${idx}-email`] && errors[`${idx}-email`] && (
                        <span className="text-[11px] font-mono text-[#963F24] mt-1 block">
                          {errors[`${idx}-email`]}
                        </span>
                      )}
                    </div>

                    <div className="sm:col-span-6 pt-2">
                      <label className="block text-[11px] font-mono uppercase text-warm-gray font-semibold mb-1">
                        Mobile Phone Number *
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          placeholder="+91 98200 00000"
                          value={passenger.phone}
                          onChange={e => handleInputChange(idx, 'phone', e.target.value)}
                          onBlur={() => handleBlur(idx, 'phone')}
                          className={`w-full h-12 px-4 rounded-[8px] border text-xs bg-white text-ink font-mono placeholder-[#6F6A61] focus:outline-none transition-colors ${
                            touched[`${idx}-phone`] && errors[`${idx}-phone`]
                              ? 'border-[#963F24] focus:border-[#963F24]'
                              : 'border-[#D8D1C5] focus:border-[#963F24]'
                          }`}
                        />
                      </div>
                      {touched[`${idx}-phone`] && errors[`${idx}-phone`] && (
                        <span className="text-[11px] font-mono text-[#963F24] mt-1 block">
                          {errors[`${idx}-phone`]}
                        </span>
                      )}
                    </div>
                  </>
                )}

              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => proceedToStep('seats')}
            className="px-5 py-2.5 rounded-[8px] bg-white border border-[#D8D1C5] text-ink hover:border-ink font-sans font-medium text-xs uppercase flex items-center space-x-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Seat Selection</span>
          </button>

          <button
            type="button"
            onClick={handleProceed}
            className="w-full sm:w-auto px-8 py-3 rounded-[8px] bg-[#963F24] hover:bg-[#7E331B] text-white font-sans font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
          >
            <span>CONTINUE TO SECURE CHECKOUT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
