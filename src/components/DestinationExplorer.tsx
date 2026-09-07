import React, { useState } from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { AIRPORTS } from '../data/airports';

type ExploreCategory = 'Trending' | 'Weekend' | 'Long Haul' | 'Seasonal' | 'Hidden Gems';

interface DestinationCard {
  id: string;
  name: string;
  country: string;
  code: string;
  category: ExploreCategory;
  priceINR: number;
  description: string;
  image: string;
  tag: string;
  featured?: boolean;
}

export const DestinationExplorer: React.FC = () => {
  const { setSearchParams } = useBooking();
  const [selectedCategory, setSelectedCategory] = useState<ExploreCategory>('Trending');

  const categories: ExploreCategory[] = [
    'Trending',
    'Weekend',
    'Long Haul',
    'Seasonal',
    'Hidden Gems',
  ];

  const destinations: DestinationCard[] = [
    {
      id: 'dest-tokyo',
      name: 'TOKYO',
      country: 'Japan',
      code: 'HND',
      category: 'Trending',
      priceINR: 42900,
      description: 'Lantern-lit alleys, quiet shrines, and sensory midnight culinary counter experiences.',
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=85',
      tag: 'CULTURE & GASTRONOMY',
      featured: true,
    },
    {
      id: 'dest-lisbon',
      name: 'LISBON',
      country: 'Portugal',
      code: 'LIS',
      category: 'Weekend',
      priceINR: 38400,
      description: 'Sun-drenched terracotta roofs, vintage trams, and coastal Atlantic seafood.',
      image: 'https://images.unsplash.com/photo-1509840841025-9088ba78a826?auto=format&fit=crop&w=1000&q=80',
      tag: 'ATLANTIC COASTLINE',
    },
    {
      id: 'dest-kyoto',
      name: 'KYOTO',
      country: 'Japan',
      code: 'KIX',
      category: 'Seasonal',
      priceINR: 46200,
      description: 'Centuries of preserved architecture, moss gardens, and mountain tea houses.',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80',
      tag: 'SPRING & AUTUMN RETREAT',
    },
    {
      id: 'dest-london',
      name: 'LONDON',
      country: 'United Kingdom',
      code: 'LHR',
      category: 'Long Haul',
      priceINR: 48900,
      description: 'World-renowned theater, historic parklands, and modern Michelin dining.',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=85',
      tag: 'FLAGSHIP AIR CORRIDOR',
      featured: true,
    },
    {
      id: 'dest-tromso',
      name: 'TROMSØ',
      country: 'Norway',
      code: 'TOS',
      category: 'Hidden Gems',
      priceINR: 54600,
      description: 'Arctic fjords, silent snowscapes, and untamed aurora borealis night skies.',
      image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1000&q=80',
      tag: 'ARCTIC EXPEDITION',
    },
    {
      id: 'dest-dubai',
      name: 'DUBAI',
      country: 'United Arab Emirates',
      code: 'DXB',
      category: 'Weekend',
      priceINR: 22400,
      description: 'Warm desert dunes, architectural marvels, and pristine private Gulf beaches.',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80',
      tag: 'LUXURY RETREAT',
    },
    {
      id: 'dest-newyork',
      name: 'NEW YORK',
      country: 'United States',
      code: 'JFK',
      category: 'Long Haul',
      priceINR: 58900,
      description: 'The world capital of art, architecture, jazz clubs, and non-stop street energy.',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1000&q=80',
      tag: 'TRANSATLANTIC HORIZON',
    },
    {
      id: 'dest-zermatt',
      name: 'ZERMATT',
      country: 'Switzerland',
      code: 'GVA',
      category: 'Seasonal',
      priceINR: 62400,
      description: 'Car-free alpine stillness, Matterhorn views, and world-class ski trails.',
      image: 'https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=1000&q=80',
      tag: 'SWISS ALPS',
    },
    {
      id: 'dest-materas',
      name: 'MATERA',
      country: 'Italy',
      code: 'FCO',
      category: 'Hidden Gems',
      priceINR: 51200,
      description: 'Ancient cave dwellings carved into stone canyons overlooking limestone bluffs.',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80',
      tag: 'HISTORIC WONDER',
    },
  ];

  const handleSelectDest = (code: string) => {
    const target = AIRPORTS.find(a => a.code === code) || AIRPORTS[1];
    setSearchParams(prev => ({ ...prev, to: target }));
    const el = document.getElementById('booking-panel');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const currentCategoryDestinations = destinations.filter(
    d => d.category === selectedCategory
  );

  const heroItem = currentCategoryDestinations[0] || destinations[0];
  const sideItems = currentCategoryDestinations.slice(1);

  return (
    <section id="destination-showcase" className="py-28 px-6 sm:px-12 lg:px-16 bg-[#F6F2EA] text-[#171717] overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center space-x-2.5">
              <Compass className="w-4 h-4 text-[#963F24]" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#59604F] font-semibold">
                EDITORIAL TRAVEL EXPERIENCE
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-serif font-light tracking-tight text-[#171717] leading-none uppercase">
              WHERE WILL<br />YOU GO NEXT?
            </h2>

            <p className="text-sm sm:text-base text-[#6F6A61] font-sans leading-relaxed pt-1">
              Curated international destinations with direct route corridors, hand-picked seasonal journeys, and authentic cultural escapes.
            </p>
          </div>

          {/* CATEGORIES PILLS: TRENDING, WEEKEND, LONG HAUL, SEASONAL, HIDDEN GEMS */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-full border transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#171717] text-[#FFFFFF] border-[#171717] font-semibold shadow-xs'
                    : 'bg-[#FFFFFF] text-[#6F6A61] border-[#D8D1C5] hover:border-[#171717] hover:text-[#171717]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ASYMMETRICAL EDITORIAL COMPOSITION (NO GENERIC CARD GRID) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* 1. LARGE DOMINANT HERO TILE (Col 1-7, Tall & Dramatic) */}
          <div
            onClick={() => handleSelectDest(heroItem.code)}
            className="lg:col-span-7 group relative min-h-[500px] lg:min-h-[600px] rounded-[12px] overflow-hidden cursor-pointer border border-[#D8D1C5] shadow-[0_20px_60px_rgba(23,23,23,0.08)] bg-[#FFFFFF] flex flex-col justify-between"
          >
            <img
              src={heroItem.image}
              alt={heroItem.name}
              className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Cinematic Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/40 to-transparent" />

            {/* Top Badges */}
            <div className="relative p-6 sm:p-8 flex items-center justify-between z-10">
              <span className="px-3.5 py-1.5 rounded-full bg-[#FFFFFF]/90 text-[#171717] border border-white/20 text-[10px] font-mono tracking-widest uppercase font-bold shadow-xs">
                {heroItem.tag}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#963F24] text-[#FFFFFF] text-[10px] font-mono tracking-wider font-semibold">
                {selectedCategory.toUpperCase()}
              </span>
            </div>

            {/* Bottom Content */}
            <div className="relative p-6 sm:p-10 z-10 text-[#FFFFFF] space-y-3">
              <span className="text-xs font-mono tracking-widest uppercase text-[#EFE9DE]/80 block">
                {heroItem.country} &bull; DIRECT AIR CORRIDOR
              </span>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h3 className="text-4xl sm:text-6xl font-serif font-light tracking-tight text-[#FFFFFF] leading-none">
                    {heroItem.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#EFE9DE]/90 font-sans mt-2 max-w-md line-clamp-2">
                    {heroItem.description}
                  </p>
                </div>

                <div className="sm:text-right shrink-0">
                  <span className="text-[10px] font-mono uppercase text-[#EFE9DE]/70 block">DIRECT FARES FROM</span>
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-[#FFFFFF]">
                    ₹{heroItem.priceINR.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/20 flex items-center justify-between text-xs font-mono font-medium text-[#EFE9DE] group-hover:text-[#FFFFFF]">
                <span className="tracking-wider uppercase">SELECT ROUTE TO {heroItem.name}</span>
                <span className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center transform group-hover:translate-x-1 transition-transform bg-white/10">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* 2. STAGGERED SIDE TILES (Col 8-12, Asymmetrical Composition) */}
          <div className="lg:col-span-5 flex flex-col gap-8 justify-between">
            {sideItems.length > 0 ? (
              sideItems.map(dest => (
                <div
                  key={dest.id}
                  onClick={() => handleSelectDest(dest.code)}
                  className="group relative rounded-[12px] overflow-hidden cursor-pointer border border-[#D8D1C5] shadow-xs bg-[#FFFFFF] flex-1 min-h-[260px] flex flex-col justify-end p-6 sm:p-8"
                >
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/45 to-transparent" />

                  <div className="relative z-10 text-[#FFFFFF] space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-[#EFE9DE]/80">
                      <span>{dest.tag}</span>
                      <span>₹{dest.priceINR.toLocaleString()}</span>
                    </div>

                    <h4 className="text-2xl sm:text-3xl font-serif font-light text-[#FFFFFF] tracking-tight">
                      {dest.name}
                    </h4>

                    <p className="text-xs text-[#EFE9DE]/80 font-sans line-clamp-2">
                      {dest.description}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-xs font-mono text-[#EFE9DE] group-hover:text-white">
                      <span className="text-[11px] uppercase tracking-wider">Explore Route</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Fallback asymmetric preview
              <div
                onClick={() => handleSelectDest('LHR')}
                className="group relative rounded-[12px] overflow-hidden cursor-pointer border border-[#D8D1C5] bg-[#FFFFFF] h-full min-h-[360px] flex flex-col justify-end p-6 sm:p-8"
              >
                <img
                  src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80"
                  alt="London Westminster"
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/40 to-transparent" />
                <div className="relative z-10 text-[#FFFFFF] space-y-2">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#EFE9DE]/80">EUROPEAN FLAGSHIP</span>
                  <h4 className="text-3xl font-serif font-light text-[#FFFFFF]">LONDON</h4>
                  <div className="pt-2 flex items-center justify-between text-xs font-mono">
                    <span>From ₹48,900</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
