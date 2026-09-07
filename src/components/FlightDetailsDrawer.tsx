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
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-xl h-full bg-white text-slate-900 shadow-2xl flex flex-col justify-between overflow-y-auto animate-slideInRight">
        
        {/* DRAWER TOP BAR */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-xs shadow-md"
              style={{ backgroundColor: drawerFlight.accentColor }}
            >
              {drawerFlight.logoText}
            </div>
            <div>
              <div className="text-lg font-bold font-display text-slate-900">
                {drawerFlight.airline}
              </div>
              <div className="text-xs font-mono text-slate-500">
                {drawerFlight.flightNumber} · {drawerFlight.aircraft}
              </div>
            </div>
          </div>

          <button
            onClick={closeDrawer}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* DRAWER TABS */}
        <div className="flex border-b border-slate-100 px-6 gap-6 text-xs font-semibold">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'fare', label: 'Fare Rules' },
            { id: 'baggage', label: 'Baggage' },
            { id: 'policy', label: 'Cancellation Policy' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`py-3.5 border-b-2 transition-all ${
                activeTab === t.id
                  ? 'border-aeriva-blue text-aeriva-blue'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
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
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                <div className="flex justify-between items-center text-xs font-mono text-slate-500 pb-2 border-b border-slate-200">
                  <span>SEGMENT TIMELINE</span>
                  <span>{drawerFlight.duration} TOTAL</span>
                </div>

                <div className="space-y-4 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-300">
                  <div>
                    <div className="text-base font-bold text-slate-900 font-display">
                      {drawerFlight.departureTime} · {drawerFlight.from.city} ({drawerFlight.from.code})
                    </div>
                    <div className="text-xs text-slate-500">
                      {drawerFlight.from.name} · Terminal 3 · Gate B12
                    </div>
                  </div>

                  {drawerFlight.stops > 0 && (
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 font-mono">
                      {drawerFlight.stopDetails} · Baggage checked through
                    </div>
                  )}

                  <div>
                    <div className="text-base font-bold text-slate-900 font-display">
                      {drawerFlight.arrivalTime} · {drawerFlight.to.city} ({drawerFlight.to.code})
                    </div>
                    <div className="text-xs text-slate-500">
                      {drawerFlight.to.name} · Terminal 3 · Baggage Belt 4
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Aircraft Amenities Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center space-x-2 text-slate-600 font-semibold">
                    <Wifi className="w-4 h-4 text-aeriva-blue" />
                    <span>In-Flight Wi-Fi</span>
                  </div>
                  <div className="text-slate-500 text-[11px]">{drawerFlight.amenities.wifiText}</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center space-x-2 text-slate-600 font-semibold">
                    <Coffee className="w-4 h-4 text-emerald-600" />
                    <span>Dining</span>
                  </div>
                  <div className="text-slate-500 text-[11px]">{drawerFlight.amenities.mealText}</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center space-x-2 text-slate-600 font-semibold">
                    <Zap className="w-4 h-4 text-amber-600" />
                    <span>In-Seat Power</span>
                  </div>
                  <div className="text-slate-500 text-[11px]">Universal 110V AC + USB-C high output</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center space-x-2 text-slate-600 font-semibold">
                    <Tv className="w-4 h-4 text-purple-600" />
                    <span>Seat Pitch</span>
                  </div>
                  <div className="text-slate-500 text-[11px]">{drawerFlight.amenities.legroomInches} inches ergonomic pitch</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FARE RULES */}
          {activeTab === 'fare' && (
            <div className="space-y-4 text-xs text-slate-600">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="font-bold text-slate-900 text-sm">Fare Code & Basis</div>
                <div>Economy Standard Commercial Tariff</div>
                <div className="text-[11px] text-slate-500 font-mono">Fare Basis Code: KLX9827GDS</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-slate-900 font-bold">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Date Changes Permitted</span>
                </div>
                <p className="text-slate-500 pl-6">{drawerFlight.changePolicyText}</p>
              </div>
            </div>
          )}

          {/* TAB 3: BAGGAGE */}
          {activeTab === 'baggage' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center space-x-3">
                  <Luggage className="w-5 h-5 text-aeriva-blue" />
                  <div>
                    <div className="font-bold text-slate-900">Cabin Carry-On Baggage</div>
                    <div className="text-slate-500">{drawerFlight.baggage.cabin} (55 x 40 x 20 cm) + Laptop Bag</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center space-x-3">
                  <Luggage className="w-5 h-5 text-emerald-600" />
                  <div>
                    <div className="font-bold text-slate-900">Checked In Baggage</div>
                    <div className="text-slate-500">{drawerFlight.baggage.checked} included in base fare</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: POLICY */}
          {activeTab === 'policy' && (
            <div className="space-y-4 text-xs text-slate-600">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center space-x-2 text-slate-900 font-bold">
                  <Shield className="w-4 h-4 text-aeriva-blue" />
                  <span>Cancellation & Refund Policy</span>
                </div>
                <p className="text-slate-500">{drawerFlight.refundPolicyText}</p>
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">Fare per traveler</div>
            <div className="text-2xl font-display font-black text-slate-900">
              {formatPrice(drawerFlight.priceINR, currency)}
            </div>
          </div>

          <button
            onClick={() => {
              closeDrawer();
              selectFlight(drawerFlight);
            }}
            className="px-8 py-3.5 rounded-2xl bg-aeriva-blue text-white font-bold text-xs tracking-wider uppercase hover:bg-blue-600 transition-all flex items-center space-x-2 shadow-glow-blue"
          >
            <span>CHOOSE THIS FLIGHT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
