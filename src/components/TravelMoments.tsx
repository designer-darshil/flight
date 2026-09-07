import React from 'react';
import { Sparkles, MapPin, Compass } from 'lucide-react';

export const TravelMoments: React.FC = () => {
  const moments = [
    {
      time: '06:42',
      location: 'Over the Swiss Alps • 36,000 FT',
      title: 'First light through double-glazed oval panes.',
      description: 'Hand-pulled single origin espresso served alongside warm brioche as the Alpine ridges ignite in morning rose gold.',
      image: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=1200&auto=format&fit=crop',
      tag: 'In-Flight Ritual'
    },
    {
      time: '18:20',
      location: 'Hamad International • Doha Garden Lounge',
      title: 'Silence, reflection, and humid botanical calm.',
      description: 'A serene hour among tranquil waters and glass pavilions before the late evening long-haul sector to Tokyo.',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop',
      tag: 'Transit Serenity'
    },
    {
      time: '23:11',
      location: 'Tokyo Bay • Final Approach to Haneda',
      title: 'Glittering electric avenues beneath quiet descent.',
      description: 'The cabin lights soften to warm candlelight amber as the neon grid of Meguro and Shibuya unfolds against midnight water.',
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop',
      tag: 'Arrival Wonder'
    }
  ];

  return (
    <section className="py-28 sm:py-36 bg-cream text-ink border-t border-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* Section Editorial Header */}
        <div className="max-w-3xl mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-olive" />
            <span className="text-xs uppercase tracking-[0.25em] text-warm-gray font-mono font-medium">
              Sensory Travel Journal
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-serif font-light tracking-tight text-ink leading-tight">
            The journey matters too.
          </h2>
          <p className="mt-5 text-lg sm:text-xl font-serif text-warm-gray font-light leading-relaxed">
            Travel is not merely point-to-point transit. It is the unhurried morning light at cruising altitude, the hushed pause in an architectural lounge, and the anticipation of foreign city lights below.
          </p>
        </div>

        {/* 3 Chronological Editorial Moment Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
          {moments.map((moment, idx) => (
            <div 
              key={idx}
              className="group bg-paper rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
            >
              {/* Photo Area with Vignette & Timestamp */}
              <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                <img 
                  src={moment.image} 
                  alt={moment.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter saturate-[0.95]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-black/20" />
                
                {/* Floating Timestamp Badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-paper border border-border text-ink text-xs font-mono font-semibold tracking-wider flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-3 h-3 text-terracotta" />
                  <span>{moment.time}</span>
                </div>

                {/* Tag */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-ink text-paper text-[10px] font-mono tracking-widest uppercase">
                  {moment.tag}
                </div>

                {/* Location Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-paper flex items-center gap-2 text-xs font-mono">
                  <MapPin className="w-3.5 h-3.5 text-champagne shrink-0" />
                  <span className="truncate drop-shadow-sm">{moment.location}</span>
                </div>
              </div>

              {/* Editorial Text Area */}
              <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-light text-ink leading-snug group-hover:text-terracotta transition-colors">
                    {moment.title}
                  </h3>
                  <p className="mt-3 text-sm font-sans text-warm-gray leading-relaxed">
                    {moment.description}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-border flex items-center justify-between text-xs font-mono text-warm-gray">
                  <span>CURATED ATMOSPHERE</span>
                  <Compass className="w-4 h-4 text-terracotta/70 group-hover:rotate-45 transition-transform duration-500" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
