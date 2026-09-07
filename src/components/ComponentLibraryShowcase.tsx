import React, { useState } from 'react';
import {
  Button,
  Input,
  SearchInput,
  Select,
  Textarea,
  Avatar,
  Badge,
  StatusIndicator,
  Checkbox,
  Radio,
  Switch,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Modal,
  Drawer,
  Popover,
  Toast,
  Tooltip,
} from './ui';
import { Sparkles, Calendar, ArrowRight, Plane, Info, ShieldCheck } from 'lucide-react';

interface ComponentLibraryShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComponentLibraryShowcase: React.FC<ComponentLibraryShowcaseProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'buttons' | 'inputs' | 'avatars' | 'badges' | 'status' | 'selection' | 'cards' | 'overlays'>('buttons');

  // Interactive demo states
  const [searchVal, setSearchVal] = useState('London Heathrow (LHR)');
  const [checkboxVal, setCheckboxVal] = useState(true);
  const [radioVal, setRadioVal] = useState<'economy' | 'business'>('business');
  const [switchVal, setSwitchVal] = useState(true);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoDrawerOpen, setDemoDrawerOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#171717]/25 overflow-y-auto">
      <div className="bg-white w-full max-w-6xl rounded-[16px] border border-[#D8D1C5] shadow-[0_20px_60px_rgba(23,23,23,0.12)] p-6 sm:p-8 my-auto relative text-[#171717] max-h-[92vh] flex flex-col">
        
        {/* HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#D8D1C5] shrink-0">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-[#963F24] mb-0.5">
              <span>PHASE 02</span>
              <span>&bull;</span>
              <span>AERIVA CORE UI PRIMITIVE LIBRARY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#171717] flex items-center gap-2">
              <span>Reusable Component Documentation</span>
              <Sparkles className="w-5 h-5 text-[#C96B45]" />
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#EFE9DE]/50 text-[#6F6A61] hover:text-[#171717] transition-colors text-xs font-mono flex items-center gap-1 border border-[#D8D1C5]"
          >
            <span>Close Library</span>
            <span>✕</span>
          </button>
        </div>

        {/* TABS */}
        <div className="flex flex-wrap gap-2 py-3 border-b border-[#D8D1C5] shrink-0 font-mono text-xs overflow-x-auto">
          {[
            { id: 'buttons', label: '1. Buttons' },
            { id: 'inputs', label: '2. Inputs' },
            { id: 'avatars', label: '3. Avatars' },
            { id: 'badges', label: '4. Badges' },
            { id: 'status', label: '5. Status Indicators' },
            { id: 'selection', label: '6. Selection (Check, Radio, Switch)' },
            { id: 'cards', label: '7. Card Surfaces' },
            { id: 'overlays', label: '8. Overlays (Modal, Drawer, Toast, Tooltip)' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#171717] text-white font-semibold'
                  : 'text-[#6F6A61] hover:text-[#171717] hover:bg-[#EFE9DE]/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB CONTENTS */}
        <div className="flex-1 overflow-y-auto py-6 pr-2 space-y-8 text-left">
          
          {/* TAB 1: BUTTONS */}
          {activeTab === 'buttons' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-serif font-medium text-[#171717]">Buttons Specification</h3>
                <p className="text-xs text-[#6F6A61] mt-0.5">
                  Primary: #963F24 background, #FFFFFF text, 8px radius, 48px height. Secondary: White, #D8D1C5 border. Tertiary: Text + arrow.
                </p>
              </div>

              {/* Primary Buttons */}
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#171717]">
                  Primary Button States (#963F24, 8px Radius, 48px Height)
                </div>
                <div className="flex flex-wrap gap-4 items-center">
                  <div>
                    <Button variant="primary">Default Action</Button>
                    <div className="text-[10px] font-mono text-[#6F6A61] mt-1">Default</div>
                  </div>
                  <div>
                    <Button variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      With Icon
                    </Button>
                    <div className="text-[10px] font-mono text-[#6F6A61] mt-1">Right Icon</div>
                  </div>
                  <div>
                    <Button variant="primary" isLoading>
                      Saving Flight
                    </Button>
                    <div className="text-[10px] font-mono text-[#6F6A61] mt-1">Loading</div>
                  </div>
                  <div>
                    <Button variant="primary" disabled>
                      Disabled Action
                    </Button>
                    <div className="text-[10px] font-mono text-[#6F6A61] mt-1">Disabled</div>
                  </div>
                </div>
              </div>

              {/* Secondary Buttons */}
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#171717]">
                  Secondary Button States (White, #D8D1C5 Border)
                </div>
                <div className="flex flex-wrap gap-4 items-center">
                  <div>
                    <Button variant="secondary">Secondary Action</Button>
                    <div className="text-[10px] font-mono text-[#6F6A61] mt-1">Default</div>
                  </div>
                  <div>
                    <Button variant="secondary" leftIcon={<Calendar className="w-4 h-4" />}>
                      Select Date
                    </Button>
                    <div className="text-[10px] font-mono text-[#6F6A61] mt-1">Left Icon</div>
                  </div>
                  <div>
                    <Button variant="secondary" isLoading>
                      Loading State
                    </Button>
                    <div className="text-[10px] font-mono text-[#6F6A61] mt-1">Loading</div>
                  </div>
                  <div>
                    <Button variant="secondary" disabled>
                      Disabled
                    </Button>
                    <div className="text-[10px] font-mono text-[#6F6A61] mt-1">Disabled</div>
                  </div>
                </div>
              </div>

              {/* Tertiary Buttons & Sizes */}
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#171717]">
                  Tertiary (Editorial Text + Arrow) & Size Hierarchy
                </div>
                <div className="flex flex-wrap gap-6 items-center">
                  <div>
                    <Button variant="tertiary">Explore Flight Rules</Button>
                    <div className="text-[10px] font-mono text-[#6F6A61] mt-1">Tertiary Link</div>
                  </div>
                  <div className="border-l border-[#D8D1C5] pl-6 flex items-center gap-4">
                    <Button variant="primary" size="sm">Small (36px)</Button>
                    <Button variant="primary" size="md">Standard (48px)</Button>
                    <Button variant="primary" size="lg">Large (56px)</Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INPUTS */}
          {activeTab === 'inputs' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h3 className="text-lg font-serif font-medium text-[#171717]">Inputs Specification</h3>
                <p className="text-xs text-[#6F6A61] mt-0.5">
                  Height: 48px standard / 56px large. Background: #FFFFFF, Border: #D8D1C5, Radius: 8px, Padding: 16px. Accessible visible outline on focus.
                </p>
              </div>

              {/* Text Input */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  placeholder="e.g. Alex"
                  helperText="Enter as shown on passport"
                />
                <Input
                  label="Passport Number"
                  placeholder="A12345678"
                  error="Passport must be 9 alphanumeric characters"
                />
              </div>

              {/* Search Input */}
              <SearchInput
                label="Airport Search"
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                onClear={() => setSearchVal('')}
                placeholder="Search by city or IATA code..."
              />

              {/* Select Component */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Cabin Class"
                  options={[
                    { label: 'Economy Standard', value: 'economy' },
                    { label: 'Economy Flex', value: 'flex' },
                    { label: 'Club World Business', value: 'business' },
                    { label: 'First Suite', value: 'first' },
                  ]}
                />
                <Input
                  label="Travel Date (Date Input)"
                  type="date"
                  defaultValue="2026-09-18"
                />
              </div>

              {/* Number & Disabled Input */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Number of Travelers"
                  type="number"
                  min="1"
                  max="9"
                  defaultValue="1"
                />
                <Input
                  label="Booking Reference (Disabled)"
                  value="AER-8942-DXB"
                  disabled
                />
              </div>

              {/* Textarea */}
              <Textarea
                label="Special Dietary or Accessibility Requests"
                placeholder="Specify wheelchair assistance, vegetarian meal, or infant bassinet..."
              />
            </div>
          )}

          {/* TAB 3: AVATARS */}
          {activeTab === 'avatars' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-serif font-medium text-[#171717]">Avatars Specification</h3>
                <p className="text-xs text-[#6F6A61] mt-0.5">
                  Sizes: 24, 32, 40, 48, 64, 80 (Default: 40px). Circular, Border: 1px #D8D1C5. Initials on #596052 background.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-[#D8D1C5] bg-[#EFE9DE]/30 flex flex-wrap items-center gap-8">
                {[24, 32, 40, 48, 64, 80].map(sz => (
                  <div key={sz} className="flex flex-col items-center gap-2">
                    <Avatar size={sz as any} name="Alex Morgan" />
                    <span className="text-[11px] font-mono text-[#6F6A61]">{sz}px</span>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-xl border border-[#D8D1C5] bg-white flex flex-wrap items-center gap-8">
                <div>
                  <div className="text-xs font-mono font-bold uppercase text-[#171717] mb-2">Initials Avatar (#596052)</div>
                  <Avatar size={48} name="Elena Rostova" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold uppercase text-[#171717] mb-2">Photo Avatar</div>
                  <Avatar
                    size={48}
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                    name="Elena Rostova"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BADGES */}
          {activeTab === 'badges' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-serif font-medium text-[#171717]">Badges Specification</h3>
                <p className="text-xs text-[#6F6A61] mt-0.5">
                  Height: 28–32px. Radius: 6px strictly (Do not turn everything into giant pills).
                </p>
              </div>

              <div className="p-6 rounded-xl border border-[#D8D1C5] bg-white space-y-4">
                <div className="text-xs font-mono font-bold uppercase text-[#171717]">Standard Flight Badges</div>
                <div className="flex flex-wrap gap-4 items-center">
                  <Badge variant="on-time">ON TIME</Badge>
                  <Badge variant="popular">POPULAR</Badge>
                  <Badge variant="good-price">GOOD PRICE</Badge>
                  <Badge variant="refundable">REFUNDABLE</Badge>
                  <Badge variant="stop">1 STOP</Badge>
                  <Badge variant="neutral" icon={<Plane className="w-3 h-3 text-[#963F24]" />}>
                    DIRECT FLIGHT
                  </Badge>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: STATUS INDICATORS */}
          {activeTab === 'status' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-serif font-medium text-[#171717]">Status Indicators</h3>
                <p className="text-xs text-[#6F6A61] mt-0.5">
                  Success: #3F6B4F, Warning: #8A5A1F, Error: #9B3D32. Status colors are always paired with clear text and icons.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-[#D8D1C5] bg-white">
                  <StatusIndicator
                    status="success"
                    label="Booking Confirmed"
                    description="Ticket issued under IATA Reference AER-8942"
                  />
                </div>

                <div className="p-4 rounded-xl border border-[#D8D1C5] bg-white">
                  <StatusIndicator
                    status="warning"
                    label="Boarding Soon — Gate B12"
                    description="Final call begins in 14 minutes"
                  />
                </div>

                <div className="p-4 rounded-xl border border-[#D8D1C5] bg-white">
                  <StatusIndicator
                    status="error"
                    label="Connection Cancelled"
                    description="Severe weather delay in Munich. Reschedule available."
                  />
                </div>

                <div className="p-4 rounded-xl border border-[#D8D1C5] bg-white">
                  <StatusIndicator
                    status="info"
                    label="Extra Legroom Included"
                    description="Row 18 emergency exit seating verified"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SELECTION CONTROLS */}
          {activeTab === 'selection' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-serif font-medium text-[#171717]">Selection Controls Specification</h3>
                <p className="text-xs text-[#6F6A61] mt-0.5">
                  Checkbox: 18px, warm gray border, selected #596052. Radio: 20px, selected #596052. Switch: Off #D8D1C5, Active #596052.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Checkbox Section */}
                <div className="p-5 rounded-xl border border-[#D8D1C5] bg-white space-y-4">
                  <div className="text-xs font-mono font-bold uppercase text-[#171717]">Checkbox (18px)</div>
                  <div className="space-y-3">
                    <Checkbox
                      label="Carbon Offset (+₹320)"
                      description="100% verified sustainable aviation fuel investment"
                      checked={checkboxVal}
                      onChange={e => setCheckboxVal(e.target.checked)}
                    />
                    <Checkbox
                      label="Travel Insurance"
                      description="Comprehensive medical and cancellation cover"
                      checked={false}
                      onChange={() => {}}
                    />
                    <Checkbox
                      label="Disabled Checked"
                      checked={true}
                      disabled
                    />
                  </div>
                </div>

                {/* Radio Section */}
                <div className="p-5 rounded-xl border border-[#D8D1C5] bg-white space-y-4">
                  <div className="text-xs font-mono font-bold uppercase text-[#171717]">Radio (20px)</div>
                  <div className="space-y-3">
                    <Radio
                      name="cabin"
                      label="Economy Standard"
                      description="1 carry-on, standard seat"
                      checked={radioVal === 'economy'}
                      onChange={() => setRadioVal('economy')}
                    />
                    <Radio
                      name="cabin"
                      label="Club World Business"
                      description="Lie-flat bed, lounge entry"
                      checked={radioVal === 'business'}
                      onChange={() => setRadioVal('business')}
                    />
                    <Radio
                      name="cabin"
                      label="First Suite (Sold Out)"
                      disabled
                    />
                  </div>
                </div>

                {/* Switch Section */}
                <div className="p-5 rounded-xl border border-[#D8D1C5] bg-white space-y-4">
                  <div className="text-xs font-mono font-bold uppercase text-[#171717]">Switch (#596052)</div>
                  <div className="space-y-4">
                    <Switch
                      label="SMS Flight Alerts"
                      description="Receive real-time gate and telemetry updates"
                      checked={switchVal}
                      onChange={setSwitchVal}
                    />
                    <Switch
                      label="Auto-Checkin (24h prior)"
                      checked={false}
                      onChange={() => {}}
                    />
                    <Switch
                      label="VIP Fast Track"
                      checked={true}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: CARDS */}
          {activeTab === 'cards' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-serif font-medium text-[#171717]">Card Primitive Specification</h3>
                <p className="text-xs text-[#6F6A61] mt-0.5">
                  White background (#FFFFFF), 1px #D8D1C5 border, 12px radius, 24px padding. No shadow by default.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Standard Itinerary Card</CardTitle>
                      <Badge variant="on-time">ON TIME</Badge>
                    </div>
                    <CardDescription>Flight AI 101 &bull; Boeing 777-300ER</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <div className="text-2xl font-serif font-bold text-[#171717]">02:20</div>
                        <div className="text-xs font-mono text-[#6F6A61]">DEL (Delhi)</div>
                      </div>
                      <div className="text-center font-mono text-xs text-[#6F6A61]">
                        8h 45m &bull; Non-stop
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-serif font-bold text-[#171717]">07:35</div>
                        <div className="text-xs font-mono text-[#6F6A61]">LHR (London)</div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <span className="text-xs font-mono text-[#6F6A61]">Fare: ₹58,400</span>
                    <Button size="sm" variant="primary">Select</Button>
                  </CardFooter>
                </Card>

                <Card hoverable>
                  <CardHeader>
                    <CardTitle>Hoverable Interactive Card</CardTitle>
                    <CardDescription>Subtle hover border and elevation on pointer interaction</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs font-sans text-[#6F6A61] leading-relaxed">
                      This card demonstrates the hoverable variant, introducing a subtle daylight elevation shadow and slightly darkened border on hover.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="tertiary">View Detailed Rules</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}

          {/* TAB 8: OVERLAYS */}
          {activeTab === 'overlays' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-serif font-medium text-[#171717]">Overlay Primitives Specification</h3>
                <p className="text-xs text-[#6F6A61] mt-0.5">
                  Modal: White, 16px radius, 32px desktop padding, subtle overlay (rgba(23,23,23,0.25)), NO BLUR. Drawer: 420–520px desktop. Popover: 8–12px radius. Toast: Compact. Tooltip: #171717 background.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-[#D8D1C5] bg-white space-y-6">
                <div className="text-xs font-mono font-bold uppercase text-[#171717]">Interactive Overlay Triggers</div>
                
                <div className="flex flex-wrap gap-4 items-center">
                  <Button variant="primary" onClick={() => setDemoModalOpen(true)}>
                    Trigger Demo Modal
                  </Button>

                  <Button variant="secondary" onClick={() => setDemoDrawerOpen(true)}>
                    Trigger Demo Drawer
                  </Button>

                  <Popover
                    trigger={
                      <Button variant="secondary" rightIcon={<Info className="w-4 h-4 text-[#6F6A61]" />}>
                        Toggle Popover
                      </Button>
                    }
                  >
                    <div className="space-y-2">
                      <div className="text-xs font-serif font-bold text-[#171717]">Fare Conditions</div>
                      <div className="text-xs text-[#6F6A61] leading-relaxed">
                        Changes permitted up to 2 hours prior to scheduled departure. Cancellation fee ₹3,000 applies.
                      </div>
                    </div>
                  </Popover>

                  <Button variant="secondary" onClick={() => setShowToast(true)}>
                    Trigger Toast
                  </Button>

                  <Tooltip content="Direct IATA radar telemetry feed">
                    <button className="px-3 py-2 rounded-lg border border-[#D8D1C5] text-xs font-mono text-[#6F6A61] hover:text-[#171717]">
                      Hover for Tooltip
                    </button>
                  </Tooltip>
                </div>

                {/* TOAST PREVIEW */}
                {showToast && (
                  <div className="pt-4">
                    <Toast
                      type="success"
                      title="Flight Added to Watchlist"
                      message="We will notify you if fares drop below ₹48,000."
                      onClose={() => setShowToast(false)}
                    />
                  </div>
                )}
              </div>

              {/* DEMO MODAL */}
              <Modal
                isOpen={demoModalOpen}
                onClose={() => setDemoModalOpen(false)}
                title="Primitive Modal Demonstration"
                description="White surface, 16px radius, 32px desktop padding, underlying page sharp with rgba(23,23,23,0.25) overlay."
              >
                <div className="space-y-4">
                  <p className="text-xs font-sans text-[#6F6A61] leading-relaxed">
                    Notice that the page behind this modal is completely sharp and readable without any backdrop blur. The modal sits as a physical white sheet with a subtle tactile elevation shadow.
                  </p>
                  <div className="flex justify-end gap-3 pt-4 border-t border-[#D8D1C5]">
                    <Button variant="secondary" onClick={() => setDemoModalOpen(false)}>
                      Dismiss
                    </Button>
                    <Button variant="primary" onClick={() => setDemoModalOpen(false)}>
                      Confirm Action
                    </Button>
                  </div>
                </div>
              </Modal>

              {/* DEMO DRAWER */}
              <Drawer
                isOpen={demoDrawerOpen}
                onClose={() => setDemoDrawerOpen(false)}
                title="Primitive Right-Side Drawer"
                description="420–520px desktop width, 1px left border, -20px 0 60px rgba(23,23,23,0.08) shadow, zero blur."
                footer={
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#6F6A61]">AERIVA Flight Telemetry</span>
                    <Button variant="primary" size="sm" onClick={() => setDemoDrawerOpen(false)}>
                      Done
                    </Button>
                  </div>
                }
              >
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-[#EFE9DE]/40 border border-[#D8D1C5] space-y-2">
                    <div className="text-xs font-mono font-bold text-[#171717]">Drawer Architectural Specifications</div>
                    <ul className="text-xs text-[#6F6A61] space-y-1 list-disc list-inside">
                      <li>Width: 420–520px desktop</li>
                      <li>Background: #FFFFFF</li>
                      <li>Border-left: 1px solid #D8D1C5</li>
                      <li>No backdrop blur</li>
                    </ul>
                  </div>
                  <p className="text-xs font-sans text-[#6F6A61] leading-relaxed">
                    Drawers slide out from the right viewport boundary over a subtle 20% dark scrim, keeping the primary page content legible and sharp.
                  </p>
                </div>
              </Drawer>

            </div>
          )}

        </div>

        {/* FOOTER */}
        <div className="pt-4 border-t border-[#D8D1C5] flex items-center justify-between shrink-0 text-xs font-mono text-[#6F6A61]">
          <span>AERIVA Core UI Primitive Library &bull; Phase 02 Complete</span>
          <span className="text-emerald-700 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" />
            All Primitive States Implemented
          </span>
        </div>

      </div>
    </div>
  );
};
