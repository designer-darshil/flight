import { Currency, CurrencyConfig } from '../types';

export const CURRENCIES: Record<Currency, CurrencyConfig> = {
  INR: {
    code: 'INR',
    symbol: '₹',
    rate: 1,
    format: (amountInINR: number) => {
      return `₹${Math.round(amountInINR).toLocaleString('en-IN')}`;
    },
  },
  USD: {
    code: 'USD',
    symbol: '$',
    rate: 0.012, // 1 INR = ~0.012 USD
    format: (amountInINR: number) => {
      const val = Math.round(amountInINR * 0.012);
      return `$${val.toLocaleString('en-US')}`;
    },
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    rate: 0.011,
    format: (amountInINR: number) => {
      const val = Math.round(amountInINR * 0.011);
      return `€${val.toLocaleString('de-DE')}`;
    },
  },
  AED: {
    code: 'AED',
    symbol: 'AED ',
    rate: 0.044,
    format: (amountInINR: number) => {
      const val = Math.round(amountInINR * 0.044);
      return `AED ${val.toLocaleString('en-AE')}`;
    },
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    rate: 0.0095,
    format: (amountInINR: number) => {
      const val = Math.round(amountInINR * 0.0095);
      return `£${val.toLocaleString('en-GB')}`;
    },
  },
};

export function formatPrice(amountInINR: number, currency: Currency): string {
  const config = CURRENCIES[currency] || CURRENCIES.INR;
  return config.format(amountInINR);
}
