import React from 'react';
import { Award, ShieldCheck, Globe, Star } from 'lucide-react';

export const TrustStatement: React.FC = () => {
  const stats = [
    {
      value: '1.2M+',
      label: 'Global Travelers',
      subtext: 'Across 140+ countries and territories'
    },
    {
      value: '4.92 / 5',
      label: 'Traveler Satisfaction',
      subtext: 'Verified reviews on Trustpilot & Google'
    },
    {
      value: '99.8%',
      label: 'Direct E-Ticket Issuance',
      subtext: 'Instant PNR confirmation in under 4 seconds'
    },
    {
      value: '₹0',
      label: 'Hidden Surcharges',
      subtext: 'Transparent all-inclusive airport taxes'
    }
  ];

  const partners = [
    'EMIRATES',
    'SINGAPORE AIRLINES',
    'BRITISH AIRWAYS',
    'QATAR AIRWAYS',
    'CATHAY PACIFIC',
    'LUFTHANSA',
    'ANA NIPPON'
  ];

  return (
    <section className="py-24 sm:py-32 bg-cream text-ink border-t border-border relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Massive Trust Statement */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper border border-border text-xs uppercase tracking-[0.25em] font-mono text-warm-gray mb-6 shadow-sm">
            <Award className="w-3.5 h-3.5 text-champagne" />
            <span>Built on Unwavering Reliability</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light tracking-tight text-ink leading-tight">
            Over <span className="font-normal text-terracotta">1.2 million</span> travelers rely on AERIVA to explore the globe with quiet confidence.
          </h2>
        </div>

        {/* 4 Key Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-y border-border">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center sm:text-left">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-mono font-semibold tracking-tight text-ink">
                {stat.value}
              </div>
              <div className="text-sm font-serif font-medium text-ink mt-1.5">
                {stat.label}
              </div>
              <div className="text-xs font-mono text-warm-gray mt-1 leading-relaxed">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>

        {/* Carrier Alliance / Global Interline Partners */}
        <div className="mt-16 pt-6 text-center">
          <div className="text-xs uppercase font-mono tracking-[0.3em] text-warm-gray mb-8">
            Interline & Direct Ticketing Alliance with Leading Global Airlines
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-70">
            {partners.map((partner, idx) => (
              <span
                key={idx}
                className="text-xs sm:text-sm font-mono tracking-widest text-ink/70 hover:text-ink transition-colors font-medium"
              >
                {partner}
              </span>
            ))}
          </div>

          {/* Micro trust badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-warm-gray">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-olive" />
              IATA Certified Ticketing Agency
            </span>
            <span className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-terracotta" />
              256-Bit Bank-Grade PCI DSS Enforced
            </span>
            <span className="flex items-center gap-2">
              <Star className="w-4 h-4 text-champagne" />
              24/7 Dedicated Concierge Support
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
