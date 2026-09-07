import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SearchParams,
  Flight,
  FareTier,
  FarePackage,
  Seat,
  Passenger,
  Booking,
  Currency,
} from '../types';
import { AIRPORTS, DEFAULT_FROM, DEFAULT_TO } from '../data/airports';
import { FLAGSHIP_FLIGHTS, generateAerivaFlights } from '../data/mockFlights';
import { AERIVA_FARE_PACKAGES } from '../data/aerivaContent';

export type BookingStep = 'search' | 'fare' | 'seats' | 'passengers' | 'checkout' | 'payment' | 'confirmation';
export type ActiveView = 'marketing' | 'results' | 'dashboard';

interface BookingContextType {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  searchParams: SearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
  flights: Flight[];
  isSearching: boolean;
  searchProgressText: string;
  selectedFlight: Flight | null;
  selectedFareTier: FareTier;
  selectedFarePackage: FarePackage;
  selectedSeats: Seat[];
  passengers: Passenger[];
  currentStep: BookingStep;
  activeBooking: Booking | null;
  myBookings: Booking[];
  isDrawerOpen: boolean;
  drawerFlight: Flight | null;
  openDrawer: (flight: Flight) => void;
  closeDrawer: () => void;
  isBoardingPassOpen: boolean;
  setIsBoardingPassOpen: (open: boolean) => void;
  isMyTripsOpen: boolean;
  setIsMyTripsOpen: (open: boolean) => void;
  isFlightStatusOpen: boolean;
  setIsFlightStatusOpen: (open: boolean) => void;
  isDatePickerOpen: boolean;
  setIsDatePickerOpen: (open: boolean) => void;
  searchFlights: () => void;
  selectFlight: (flight: Flight) => void;
  setFareTier: (tier: FareTier) => void;
  toggleSeat: (seat: Seat) => void;
  updatePassengers: (data: Passenger[]) => void;
  proceedToStep: (step: BookingStep) => void;
  completePayment: (paymentMethod: 'card' | 'upi' | 'netbanking' | 'wallet', discountINR: number) => void;
  resetBooking: () => void;
  swapAirports: () => void;
  cancelBooking: (bookingId: string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('INR');
  const [activeView, setActiveView] = useState<ActiveView>('marketing');

  const [searchParams, setSearchParams] = useState<SearchParams>({
    tripType: 'round',
    from: DEFAULT_FROM, // DEL
    to: AIRPORTS.find(a => a.code === 'LHR') || DEFAULT_TO, // LHR
    departureDate: '18 Sep 2026',
    returnDate: '26 Sep 2026',
    passengers: {
      adults: 1,
      children: 0,
      infants: 0,
    },
    cabinClass: 'Economy',
  });

  const [flights, setFlights] = useState<Flight[]>(FLAGSHIP_FLIGHTS);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchProgressText, setSearchProgressText] = useState('SEARCHING THE GLOBAL NETWORK...');
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(FLAGSHIP_FLIGHTS[0]);
  const [selectedFareTier, setSelectedFareTier] = useState<FareTier>('standard');
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([
    {
      id: '18A',
      row: 18,
      col: 'A',
      cabin: 'Economy',
      status: 'selected',
      priceINR: 2400,
      isWindow: true,
      isExitRow: true,
      pitchInches: 38,
    }
  ]);

  const [passengers, setPassengers] = useState<Passenger[]>([
    {
      title: 'Mr',
      firstName: 'Alex',
      lastName: 'Morgan',
      dateOfBirth: '1992-06-18',
      gender: 'Male',
      nationality: 'Indian',
      passportNumber: 'Z8942104',
      email: 'alex.morgan@aeriva.aero',
      phone: '+91 98201 44820',
      seatId: '18A',
    }
  ]);

  const [currentStep, setCurrentStep] = useState<BookingStep>('search');
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);

  // Pre-seed Alex's active upcoming trip to London (ARV7K92)
  const [myBookings, setMyBookings] = useState<Booking[]>([
    {
      id: 'book-alex-01',
      reference: 'ARV7K92',
      flight: FLAGSHIP_FLIGHTS[0], // Emirates EK 513
      fareTier: 'standard',
      farePackage: AERIVA_FARE_PACKAGES[1],
      seats: [
        {
          id: '18A',
          row: 18,
          col: 'A',
          cabin: 'Economy',
          status: 'selected',
          priceINR: 2400,
          isWindow: true,
          isExitRow: true,
          pitchInches: 38,
        }
      ],
      passengers: [
        {
          title: 'Mr',
          firstName: 'Alex',
          lastName: 'Morgan',
          dateOfBirth: '1992-06-18',
          gender: 'Male',
          nationality: 'Indian',
          passportNumber: 'Z8942104',
          email: 'alex.morgan@aeriva.aero',
          phone: '+91 98201 44820',
          seatId: '18A',
        }
      ],
      paymentMethod: 'card',
      breakdown: {
        baseFareINR: 53400,
        seatFeesINR: 2400,
        baggageFeesINR: 0,
        taxesINR: 5320,
        discountINR: 0,
        totalINR: 61120,
      },
      currency: 'INR',
      bookingDate: '01 Sep 2026',
      status: 'Confirmed',
    }
  ]);

  // Drawers and Modals
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerFlight, setDrawerFlight] = useState<Flight | null>(null);
  const [isBoardingPassOpen, setIsBoardingPassOpen] = useState(false);
  const [isMyTripsOpen, setIsMyTripsOpen] = useState(false);
  const [isFlightStatusOpen, setIsFlightStatusOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const selectedFarePackage =
    AERIVA_FARE_PACKAGES.find(p => p.id === selectedFareTier) || AERIVA_FARE_PACKAGES[1];

  // Adjust passenger count dynamically
  useEffect(() => {
    const totalCount = searchParams.passengers.adults + searchParams.passengers.children;
    setPassengers(prev => {
      const updated = [...prev];
      if (updated.length < totalCount) {
        for (let i = updated.length; i < totalCount; i++) {
          updated.push({
            title: 'Mr',
            firstName: '',
            lastName: '',
            dateOfBirth: '1998-01-01',
            gender: 'Male',
            nationality: 'Indian',
            passportNumber: '',
            email: 'traveler@aeriva.aero',
            phone: '+91 98200 00000',
          });
        }
      } else if (updated.length > totalCount) {
        return updated.slice(0, totalCount);
      }
      return updated;
    });
  }, [searchParams.passengers]);

  const openDrawer = (flight: Flight) => {
    setDrawerFlight(flight);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setDrawerFlight(null);
  };

  const searchFlights = () => {
    setIsSearching(true);
    setSearchProgressText('SEARCHING THE GLOBAL NETWORK...');

    setTimeout(() => {
      setSearchProgressText('Finding the best routes...');
    }, 450);

    setTimeout(() => {
      setSearchProgressText('Comparing fares & airlines...');
    }, 900);

    setTimeout(() => {
      setSearchProgressText('Checking live cabin availability...');
    }, 1300);

    setTimeout(() => {
      const generated = generateAerivaFlights(
        searchParams.from,
        searchParams.to,
        searchParams.departureDate,
        searchParams.cabinClass
      );
      setFlights(generated);
      setIsSearching(false);
      setActiveView('results');

      // Scroll smoothly to top of results application
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1750);
  };

  const swapAirports = () => {
    setSearchParams(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }));
  };

  const selectFlight = (flight: Flight) => {
    setSelectedFlight(flight);
    setCurrentStep('fare');
  };

  const setFareTier = (tier: FareTier) => {
    setSelectedFareTier(tier);
  };

  const toggleSeat = (seat: Seat) => {
    const maxSeats = searchParams.passengers.adults + searchParams.passengers.children;
    setSelectedSeats(prev => {
      const exists = prev.find(s => s.id === seat.id);
      if (exists) {
        return prev.filter(s => s.id !== seat.id);
      }
      if (prev.length >= maxSeats) {
        return [...prev.slice(1), seat];
      }
      return [...prev, seat];
    });
  };

  const updatePassengers = (data: Passenger[]) => {
    setPassengers(data);
  };

  const proceedToStep = (step: BookingStep) => {
    setCurrentStep(step);
  };

  const completePayment = (
    paymentMethod: 'card' | 'upi' | 'netbanking' | 'wallet',
    discountINR: number
  ) => {
    if (!selectedFlight) return;

    const baseFareINR = selectedFarePackage.priceINR * passengers.length;
    const seatFeesINR = selectedSeats.reduce((sum, s) => {
      if (selectedFarePackage.id === 'flex') return sum;
      return sum + s.priceINR;
    }, 0);
    const taxesINR = 5320 * passengers.length;
    const totalINR = Math.max(0, baseFareINR + seatFeesINR + taxesINR - discountINR);

    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let refCode = 'ARV';
    for (let i = 0; i < 4; i++) {
      refCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      reference: refCode,
      flight: selectedFlight,
      fareTier: selectedFareTier,
      farePackage: selectedFarePackage,
      seats: selectedSeats.length > 0 ? selectedSeats : [
        {
          id: '18A',
          row: 18,
          col: 'A',
          cabin: 'Economy',
          status: 'selected',
          priceINR: 2400,
          isWindow: true,
          isExitRow: true,
          pitchInches: 38,
        }
      ],
      passengers: passengers.map((p, idx) => ({
        ...p,
        seatId: selectedSeats[idx]?.id || '18A',
      })),
      paymentMethod,
      breakdown: {
        baseFareINR,
        seatFeesINR,
        baggageFeesINR: 0,
        taxesINR,
        discountINR,
        totalINR,
      },
      currency,
      bookingDate: '18 Sep 2026',
      status: 'Confirmed',
    };

    setActiveBooking(newBooking);
    setMyBookings(prev => [newBooking, ...prev]);
    setCurrentStep('confirmation');
  };

  const cancelBooking = (bookingId: string) => {
    setMyBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'Cancelled' } : b));
  };

  const resetBooking = () => {
    setCurrentStep('search');
    setActiveBooking(null);
  };

  return (
    <BookingContext.Provider
      value={{
        activeView,
        setActiveView,
        currency,
        setCurrency,
        searchParams,
        setSearchParams,
        flights,
        isSearching,
        searchProgressText,
        selectedFlight,
        selectedFareTier,
        selectedFarePackage,
        selectedSeats,
        passengers,
        currentStep,
        activeBooking,
        myBookings,
        isDrawerOpen,
        drawerFlight,
        openDrawer,
        closeDrawer,
        isBoardingPassOpen,
        setIsBoardingPassOpen,
        isMyTripsOpen,
        setIsMyTripsOpen,
        isFlightStatusOpen,
        setIsFlightStatusOpen,
        isDatePickerOpen,
        setIsDatePickerOpen,
        searchFlights,
        selectFlight,
        setFareTier,
        toggleSeat,
        updatePassengers,
        proceedToStep,
        completePayment,
        resetBooking,
        swapAirports,
        cancelBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
