import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Globe,
  FileText,
  ArrowRight,
  ArrowLeft,
  Utensils,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { Passenger } from '../types';

export const PassengerFormModal: React.FC = () => {
  const {
    passengers,
    updatePassengers,
    selectedSeats,
    proceedToStep,
    selectedFlight,
  } = useBooking();

  const [formData, setFormData] = useState<Passenger[]>(passengers);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

    // Clear error for field
    if (errors[`${index}-${field}`]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[`${index}-${field}`];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    formData.forEach((p, idx) => {
      if (!p.firstName.trim()) {
        newErrors[`${idx}-firstName`] = 'First name is required';
      }
      if (!p.lastName.trim()) {
        newErrors[`${idx}-lastName`] = 'Last name is required';
      }
      if (!p.passportNumber.trim()) {
        newErrors[`${idx}-passportNumber`] = 'Passport / National ID is required';
      }
      if (idx === 0) {
        if (!p.email.trim() || !p.email.includes('@')) {
          newErrors[`${idx}-email`] = 'Valid e-ticket email is required';
        }
        if (!p.phone.trim()) {
          newErrors[`${idx}-phone`] = 'Contact phone number is required';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceed = () => {
    if (validate()) {
      updatePassengers(formData);
      proceedToStep('payment');
    }
  };

  if (!selectedFlight) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-ink/25 overflow-y-auto">
      <div className="bg-paper w-full max-w-4xl rounded-xl border border-border shadow-[0_20px_60px_rgba(23,23,23,0.12)] p-6 sm:p-8 my-auto relative text-ink">
        
        {/* HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-border">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-terracotta mb-1">
              <span>STEP 4 OF 5</span>
              <span>&bull;</span>
              <span>TRAVELER CREDENTIALS</span>
            </div>
            <h2 className="text-2xl font-serif font-light text-ink flex items-center space-x-2">
              <span>Passenger Information</span>
              <Sparkles className="w-5 h-5 text-terracotta" />
            </h2>
          </div>

          <div className="text-xs text-warm-gray font-mono">
            Itinerary: <span className="text-ink font-semibold">{selectedFlight.from.code} ➔ {selectedFlight.to.code}</span>
          </div>
        </div>

        {/* PASSENGER FORMS LIST */}
        <div className="space-y-6 my-6 max-h-[65vh] overflow-y-auto pr-1">
          {formData.map((passenger, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-xl border border-border bg-sand/20 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center space-x-2.5">
                  <div className="w-6 h-6 rounded-md bg-ink text-paper font-mono font-bold flex items-center justify-center text-xs">
                    {idx + 1}
                  </div>
                  <h3 className="text-sm font-serif font-medium text-ink">
                    Passenger {idx + 1} {idx === 0 ? '(Primary Contact)' : ''}
                  </h3>
                </div>

                <div className="text-xs font-mono text-warm-gray">
                  Assigned Seat:{' '}
                  <span className="text-terracotta font-medium">
                    {selectedSeats[idx]?.id || 'Auto-Assigned'}
                  </span>
                </div>
              </div>

              {/* INPUT FIELDS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                
                {/* Title */}
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-mono uppercase text-warm-gray mb-1">Title</label>
                  <select
                    value={passenger.title}
                    onChange={e => handleInputChange(idx, 'title', e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-border text-xs bg-paper text-ink focus:outline-none focus:border-terracotta"
                  >
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Ms">Ms</option>
                    <option value="Dr">Dr</option>
                  </select>
                </div>

                {/* First Name */}
                <div className="sm:col-span-5">
                  <label className="block text-[11px] font-mono uppercase text-warm-gray mb-1">
                    First / Given Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Alex"
                      value={passenger.firstName}
                      onChange={e => handleInputChange(idx, 'firstName', e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-border text-xs pl-8 bg-paper text-ink focus:outline-none focus:border-terracotta"
                    />
                    <User className="w-3.5 h-3.5 text-warm-gray absolute left-2.5 top-3" />
                  </div>
                  {errors[`${idx}-firstName`] && (
                    <div className="text-[10px] text-terracotta mt-1 flex items-center space-x-1 font-mono">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors[`${idx}-firstName`]}</span>
                    </div>
                  )}
                </div>

                {/* Last Name */}
                <div className="sm:col-span-5">
                  <label className="block text-[11px] font-mono uppercase text-warm-gray mb-1">
                    Last / Surname *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Morgan"
                      value={passenger.lastName}
                      onChange={e => handleInputChange(idx, 'lastName', e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-border text-xs pl-8 bg-paper text-ink focus:outline-none focus:border-terracotta"
                    />
                    <User className="w-3.5 h-3.5 text-warm-gray absolute left-2.5 top-3" />
                  </div>
                  {errors[`${idx}-lastName`] && (
                    <div className="text-[10px] text-terracotta mt-1 flex items-center space-x-1 font-mono">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors[`${idx}-lastName`]}</span>
                    </div>
                  )}
                </div>

                {/* Date of Birth */}
                <div className="sm:col-span-4">
                  <label className="block text-[11px] font-mono uppercase text-warm-gray mb-1">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={passenger.dateOfBirth}
                      onChange={e => handleInputChange(idx, 'dateOfBirth', e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-border text-xs pl-8 bg-paper text-ink focus:outline-none focus:border-terracotta font-mono"
                    />
                    <Calendar className="w-3.5 h-3.5 text-warm-gray absolute left-2.5 top-3" />
                  </div>
                </div>

                {/* Gender */}
                <div className="sm:col-span-4">
                  <label className="block text-[11px] font-mono uppercase text-warm-gray mb-1">Gender</label>
                  <select
                    value={passenger.gender}
                    onChange={e => handleInputChange(idx, 'gender', e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-border text-xs bg-paper text-ink focus:outline-none focus:border-terracotta"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other / Undisclosed</option>
                  </select>
                </div>

                {/* Nationality */}
                <div className="sm:col-span-4">
                  <label className="block text-[11px] font-mono uppercase text-warm-gray mb-1">Nationality</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Indian"
                      value={passenger.nationality}
                      onChange={e => handleInputChange(idx, 'nationality', e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-border text-xs pl-8 bg-paper text-ink focus:outline-none focus:border-terracotta"
                    />
                    <Globe className="w-3.5 h-3.5 text-warm-gray absolute left-2.5 top-3" />
                  </div>
                </div>

                {/* Passport / ID */}
                <div className="sm:col-span-6">
                  <label className="block text-[11px] font-mono uppercase text-warm-gray mb-1">
                    Passport / National ID *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Z8942104"
                      value={passenger.passportNumber}
                      onChange={e => handleInputChange(idx, 'passportNumber', e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-border text-xs pl-8 bg-paper text-ink focus:outline-none focus:border-terracotta uppercase font-mono"
                    />
                    <FileText className="w-3.5 h-3.5 text-warm-gray absolute left-2.5 top-3" />
                  </div>
                  {errors[`${idx}-passportNumber`] && (
                    <div className="text-[10px] text-terracotta mt-1 flex items-center space-x-1 font-mono">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors[`${idx}-passportNumber`]}</span>
                    </div>
                  )}
                </div>

                {/* Meal Preference */}
                <div className="sm:col-span-6">
                  <label className="block text-[11px] font-mono uppercase text-warm-gray mb-1">
                    Special Meal Request
                  </label>
                  <div className="relative">
                    <select
                      value={passenger.mealPreference || 'Regular Meal'}
                      onChange={e => handleInputChange(idx, 'mealPreference', e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-border text-xs pl-8 bg-paper text-ink focus:outline-none focus:border-terracotta"
                    >
                      <option value="Regular Meal">Standard Airline Menu</option>
                      <option value="Asian Vegetarian">Asian Vegetarian Menu (AVML)</option>
                      <option value="Hindu Non-Vegetarian">Hindu Non-Vegetarian (HNML)</option>
                      <option value="Diabetic Meal">Diabetic Special (DBML)</option>
                      <option value="Gluten-Free">Gluten-Free Cuisine (GFML)</option>
                      <option value="Fruit Platter">Seasonal Fruit Platter (FPML)</option>
                    </select>
                    <Utensils className="w-3.5 h-3.5 text-warm-gray absolute left-2.5 top-3" />
                  </div>
                </div>

                {/* Primary Contact Info (Email & Phone) */}
                {idx === 0 && (
                  <>
                    <div className="sm:col-span-6 pt-2">
                      <label className="block text-[11px] font-mono uppercase text-warm-gray mb-1">
                        E-Ticket Email Address *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="alex.morgan@example.com"
                          value={passenger.email}
                          onChange={e => handleInputChange(idx, 'email', e.target.value)}
                          className="w-full p-2.5 rounded-lg border border-border text-xs pl-8 bg-paper text-ink focus:outline-none focus:border-terracotta font-mono"
                        />
                        <Mail className="w-3.5 h-3.5 text-warm-gray absolute left-2.5 top-3" />
                      </div>
                      {errors[`${idx}-email`] && (
                        <div className="text-[10px] text-terracotta mt-1 flex items-center space-x-1 font-mono">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors[`${idx}-email`]}</span>
                        </div>
                      )}
                    </div>

                    <div className="sm:col-span-6 pt-2">
                      <label className="block text-[11px] font-mono uppercase text-warm-gray mb-1">
                        SMS & WhatsApp Flight Alerts Phone *
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={passenger.phone}
                          onChange={e => handleInputChange(idx, 'phone', e.target.value)}
                          className="w-full p-2.5 rounded-lg border border-border text-xs pl-8 bg-paper text-ink focus:outline-none focus:border-terracotta font-mono"
                        />
                        <Phone className="w-3.5 h-3.5 text-warm-gray absolute left-2.5 top-3" />
                      </div>
                      {errors[`${idx}-phone`] && (
                        <div className="text-[10px] text-terracotta mt-1 flex items-center space-x-1 font-mono">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors[`${idx}-phone`]}</span>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <button
            onClick={() => proceedToStep('seats')}
            className="px-5 py-2.5 rounded-lg bg-paper border border-border text-ink hover:border-ink/50 font-mono text-xs uppercase flex items-center space-x-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Seats</span>
          </button>

          <button
            onClick={handleProceed}
            className="px-6 py-3 rounded-lg bg-terracotta hover:bg-terracotta-hover text-paper font-mono font-medium text-xs tracking-wider uppercase transition-colors flex items-center space-x-2 shadow-sm"
          >
            <span>Proceed to Payment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
