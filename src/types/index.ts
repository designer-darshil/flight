export type Currency = 'INR' | 'USD' | 'EUR' | 'AED' | 'GBP';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  rate: number;
  format: (amountInINR: number) => string;
}

export type CabinClass = 'Economy' | 'Premium Economy' | 'Business' | 'First';
export type TripType = 'round' | 'oneway' | 'multicity';

export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
  flag: string;
  lat: number;
  lng: number;
  popular?: boolean;
}

export interface FlightSegment {
  airline: string;
  flightNumber: string;
  aircraft: string;
  from: Airport;
  to: Airport;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  layoverTime?: string;
}

export interface Flight {
  id: string;
  airline: string;
  airlineCode: string;
  logoText: string;
  accentColor: string;
  flightNumber: string;
  aircraft: string;
  from: Airport;
  to: Airport;
  departureTime: string;
  arrivalTime: string;
  departureDate: string;
  arrivalDate: string;
  duration: string;
  durationMinutes: number;
  stops: number;
  stopDetails: string;
  routeStops: string[]; // e.g. ["DEL", "DXB", "LHR"]
  priceINR: number;
  cabinClass: CabinClass;
  baggage: {
    cabin: string;
    checked: string;
  };
  refundable: boolean;
  refundPolicyText: string;
  changePolicyText: string;
  seatsRemaining: number;
  co2EmissionsKg: number;
  amenities: {
    wifi: boolean;
    wifiText: string;
    power: boolean;
    meal: boolean;
    mealText: string;
    entertainment: boolean;
    legroomInches: number;
  };
  tags?: string[];
  recommended?: boolean;
}

export interface SearchParams {
  tripType: TripType;
  from: Airport;
  to: Airport;
  departureDate: string;
  returnDate?: string;
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  cabinClass: CabinClass;
}

export type FareTier = 'basic' | 'standard' | 'flex';

export interface FarePackage {
  id: FareTier;
  name: string;
  tagline: string;
  priceINR: number;
  recommended?: boolean;
  features: string[];
  baggageCabin: string;
  baggageChecked: string;
  seatSelection: string;
  changeFee: string;
  refundPolicy: string;
}

export interface Seat {
  id: string; // e.g. "18A"
  row: number;
  col: string;
  cabin: 'Business' | 'Economy';
  status: 'available' | 'occupied' | 'selected' | 'extra_legroom';
  priceINR: number;
  isWindow?: boolean;
  isAisle?: boolean;
  isExitRow?: boolean;
  pitchInches: number;
}

export interface Passenger {
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  passportNumber: string;
  email: string;
  phone: string;
  seatId?: string;
  mealPreference?: string;
}

export interface Booking {
  id: string;
  reference: string;
  flight: Flight;
  fareTier: FareTier;
  farePackage: FarePackage;
  seats: Seat[];
  passengers: Passenger[];
  paymentMethod: 'card' | 'upi' | 'netbanking' | 'wallet';
  breakdown: {
    baseFareINR: number;
    seatFeesINR: number;
    baggageFeesINR: number;
    taxesINR: number;
    discountINR: number;
    totalINR: number;
  };
  currency: Currency;
  bookingDate: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
}

export interface PriceHistoryPoint {
  day: string;
  priceINR: number;
}

export interface FlightStatusInfo {
  flightNumber: string;
  airline: string;
  from: Airport;
  to: Airport;
  scheduledDeparture: string;
  actualDeparture: string;
  scheduledArrival: string;
  estimatedArrival: string;
  terminal: string;
  gate: string;
  boardingTime?: string;
  baggageBelt: string;
  status: 'ON TIME' | 'BOARDING' | 'DEPARTED' | 'IN AIR' | 'LANDED' | 'DELAYED' | string;
  progressPercent: number;
  aircraft: string;
}

export interface Destination {
  id: string;
  name: string;
  code: string;
  country: string;
  image: string;
  startingPriceINR: number;
  description: string;
  tag: string;
  weather: string;
  isHero?: boolean;
}

export interface SmartDeal {
  id: string;
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  currentPriceINR: number;
  previousPriceINR: number;
  discountPercent: number;
  airline: string;
  travelPeriod: string;
  image: string;
}
