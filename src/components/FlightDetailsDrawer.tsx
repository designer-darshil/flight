import React, { useState } from 'react';
import {
  X,
  Wifi,
  Coffee,
  Zap,
  Tv,
  Luggage,
  Shield,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { formatPrice } from '../utils/currency';

export const FlightDetailsDrawer: React.FC = () => {
  const { isDrawerOpen, closeDrawer, drawerFlight, selectFlight, currency } = useBooking();
  const [activeTab, setActiveTab] = useState<'overview' | 'fare' | 'baggage' | 'policy'>('overview');

  if (!isDrawerOpen || !drawerFlight) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-ink/20 transition-opacity">
      <div className="w-full max-w-[500px] h-full bg-paper text-ink shadow-[-20px_0_60px_rgba(23,23,23,0.08)] flex flex-col justify-between overflow-y-auto animate-slideInRight border-l border-border">
        
        {/* DRAWER TOP BAR */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-xs shadow-sm"
              style={{ backgroundColor: drawerFlight.accentColor }}
            >
              {drawerFlight.logoText}
            </div>
            <div>
              <div className="text-lg font-serif font-medium text-ink">
                {drawerFlight.airline}
              </div>
              <div className="text-xs font-mono text-warm-gray">
                {drawerFlight.flightNumber} &bull; {drawerFlight.aircraft}
              </div>
            </div>
          </div>

          <button
            onClick={closeDrawer}
            className="p-2 rounded-lg hover:bg-sand text-warm-gray hover:text-ink transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* DRAWER TABS */}
        <div className="flex border-b border-border px-6 gap-6 text-xs font-mono">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'fare', label: 'Fare Rules' },
            { id: 'baggage', label: 'Baggage' },
            { id: 'policy', label: 'Cancellation' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`py-3.5 border-b-2 transition-colors uppercase tracking-wider ${
                activeTab === t.id
                  ? 'border-terracotta text-terracotta font-medium'
                  : 'border-transparent text-warm-gray hover:text-ink'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* TAB CONTENTS */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Route Timeline */}
              <div className="p-5 rounded-xl bg-sand/30 border border-border space-y-4">
                <div className="flex justify-between items-center text-xs font-mono text-warm-gray pb-2 border-b border-border">
                  <span>SEGMENT TIMELINE</span>
                  <span>{drawerFlight.duration} TOTAL</span>
                </div>

                <div className="space-y-4 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[1.5px] before:bg-border">
                  <div>
                    <div className="text-base font-serif font-medium text-ink">
                      {drawerFlight.departureTime} &bull; {drawerFlight.from.city} ({drawerFlight.from.code})
                    </div>
                    <div className="text-xs text-warm-gray font-mono mt-0.5">
                      {drawerFlight.from.name} &bull; Terminal 3 &bull; Gate B12
                    </div>
                  </div>

                  {drawerFlight.stops > 0 && (
                    <div className="p-2.5 rounded-lg bg-champagne/10 border border-champagne/30 text-xs text-ink font-mono">
                      {drawerFlight.stopDetails} &bull; Baggage transferred through
                    </div>
                  )}

                  <div>
                    <div className="text-base font-serif font-medium text-ink">
                      {drawerFlight.arrivalTime} &bull; {drawerFlight.to.city} ({drawerFlight.to.code})
                    </div>
                    <div className="text-xs text-warm-gray font-mono mt-0.5">
                      {drawerFlight.to.name} &bull; Terminal 5 &bull; Baggage Belt 4
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Aircraft Amenities Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-xl bg-sand/30 border border-border space-y-1">
                  <div className="flex items-center space-x-2 text-ink font-medium">
                    <Wifi className="w-4 h-4 text-terracotta" />
                    <span>In-Flight Wi-Fi</span>
                  </div>
                  <div className="text-warm-gray text-[11px] font-sans">{drawerFlight.amenities.wifiText}</div>
                </div>

                <div className="p-4 rounded-xl bg-sand/30 border border-border space-y-1">
                  <div className="flex items-center space-x-2 text-ink font-medium">
                    <Coffee className="w-4 h-4 text-olive" />
                    <span>Dining</span>
                  </div>
                  <div className="text-warm-gray text-[11px] font-sans">{drawerFlight.amenities.mealText}</div>
                </div>

                <div className="p-4 rounded-xl bg-sand/30 border border-border space-y-1">
                  <div className="flex items-center space-x-2 text-ink font-medium">
                    <Zap className="w-4 h-4 text-champagne" />
                    <span>In-Seat Power</span>
                  </div>
                  <div className="text-warm-gray text-[11px] font-sans">Universal 110V AC + USB-C fast charging</div>
                </div>

                <div className="p-4 rounded-xl bg-sand/30 border border-border space-y-1">
                  <div className="flex items-center space-x-2 text-ink font-medium">
                    <Tv className="w-4 h-4 text-warm-gray" />
                    <span>Seat Pitch</span>
                  </div>
                  <div className="text-warm-gray text-[11px] font-sans">{drawerFlight.amenities.legroomInches} inches ergonomic recline</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FARE RULES */}
          {activeTab === 'fare' && (
            <div className="space-y-4 text-xs text-warm-gray">
              <div className="p-4 rounded-xl bg-sand/30 border border-border space-y-2">
                <div className="font-serif font-medium text-ink text-sm">Fare Code & Basis</div>
                <div>Economy Standard Commercial Tariff</div>
                <div className="text-[11px] text-warm-gray font-mono">Fare Basis Code: KLX9827GDS</div>
              </div>
              <div className="space-y-2 p-4 rounded-xl bg-paper border border-border">
                <div className="flex items-center space-x-2 text-ink font-medium">
                  <CheckCircle className="w-4 h-4 text-olive" />
                  <span>Date Changes Permitted</span>
                </div>
                <p className="text-warm-gray pl-6">{drawerFlight.changePolicyText}</p>
              </div>
            </div>
          )}

          {/* TAB 3: BAGGAGE */}
          {activeTab === 'baggage' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-sand/30 border border-border space-y-3">
                <div className="flex items-center space-x-3">
                  <Luggage className="w-5 h-5 text-terracotta" />
                  <div>
                    <div className="font-medium text-ink">Cabin Carry-On Allowance</div>
                    <div className="text-warm-gray">{drawerFlight.baggage.cabin} (55 x 40 x 20 cm) + Personal Item</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-border flex items-center space-x-3">
                  <Luggage className="w-5 h-5 text-olive" />
                  <div>
                    <div className="font-medium text-ink">Checked Baggage</div>
                    <div className="text-warm-gray">{drawerFlight.baggage.checked} included in base fare</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: POLICY */}
          {activeTab === 'policy' && (
            <div className="space-y-4 text-xs text-warm-gray">
              <div className="p-4 rounded-xl bg-sand/30 border border-border space-y-2">
                <div className="flex items-center space-x-2 text-ink font-medium">
                  <Shield className="w-4 h-4 text-terracotta" />
                  <span>Cancellation & Refund Policy</span>
                </div>
                <p className="text-warm-gray leading-relaxed">{drawerFlight.refundPolicyText}</p>
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="p-6 border-t border-border bg-sand/20 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-warm-gray uppercase">Fare per traveler</div>
            <div className="text-2xl font-serif font-bold text-ink">
              {formatPrice(drawerFlight.priceINR, currency)}
            </div>
          </div>

          <button
            onClick={() => {
              closeDrawer();
              selectFlight(drawerFlight);
            }}
            className="px-6 py-3 rounded-lg bg-terracotta hover:bg-terracotta-hover text-paper font-mono font-medium text-xs tracking-wider uppercase transition-colors flex items-center space-x-2 shadow-sm"
          >
            <span>CHOOSE THIS FLIGHT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
