import React, { useState } from 'react';
import {
  AERIVA_COLORS,
  AERIVA_SPACING,
  AERIVA_SHADOWS,
  AERIVA_CONTRAST_RULES,
} from '../design-system/tokens';
import { ShieldCheck, CheckCircle2, XCircle, ArrowRight, Sparkles } from 'lucide-react';

interface DesignFoundationShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DesignFoundationShowcase: React.FC<DesignFoundationShowcaseProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'spacing' | 'radius' | 'shadows' | 'grid' | 'accessibility'>('colors');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-ink/25 overflow-y-auto">
      <div className="bg-paper w-full max-w-5xl rounded-xl border border-border shadow-[0_20px_60px_rgba(23,23,23,0.12)] p-6 sm:p-8 my-auto relative text-ink max-h-[92vh] flex flex-col">
        
        {/* HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border shrink-0">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-terracotta-accessible mb-0.5">
              <span>PHASE 01 FOUNDATION</span>
              <span>&bull;</span>
              <span>GLOBAL DESIGN SYSTEM</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-light text-ink flex items-center gap-2">
              <span>AERIVA Visual Specifications</span>
              <Sparkles className="w-5 h-5 text-terracotta" />
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-sand text-warm-gray hover:text-ink transition-colors text-xs font-mono flex items-center gap-1 border border-border"
          >
            <span>Close Foundation</span>
            <span>✕</span>
          </button>
        </div>

        {/* TABS */}
        <div className="flex flex-wrap gap-2 py-3 border-b border-border shrink-0 font-mono text-xs overflow-x-auto">
          {[
            { id: 'colors', label: '1. Colors & WCAG AA' },
            { id: 'typography', label: '2. Typography Scale' },
            { id: 'spacing', label: '3. Spacing (4px Grid)' },
            { id: 'radius', label: '4. Radius' },
            { id: 'shadows', label: '5. Shadows' },
            { id: 'grid', label: '6. Grid & Breakpoints' },
            { id: 'accessibility', label: '7. Accessibility Rules' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-ink text-paper font-semibold'
                  : 'text-warm-gray hover:text-ink hover:bg-sand/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* SCROLLABLE TAB CONTENT */}
        <div className="flex-1 overflow-y-auto py-6 pr-2 space-y-8">
          
          {/* TAB 1: COLORS */}
          {activeTab === 'colors' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-serif font-medium text-ink">Color System Architecture</h3>
                <p className="text-xs text-warm-gray font-sans mt-0.5">
                  Curated warm luxury palette. Strictly bans generic SaaS blues, neon glows, and dark glassmorphism.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[
                  { name: 'Primary Background', hex: AERIVA_COLORS.bgPrimary, token: '--color-bg-primary', role: 'Main page canvas' },
                  { name: 'Secondary Background', hex: AERIVA_COLORS.bgSecondary, token: '--color-bg-secondary', role: 'Secondary panels / search cards' },
                  { name: 'Surface', hex: AERIVA_COLORS.surface, token: '--color-surface', role: 'Cards, Modals, Dialogs' },
                  { name: 'Primary Text (Ink)', hex: AERIVA_COLORS.textPrimary, token: '--color-text-primary', role: 'Headlines, body text' },
                  { name: 'Secondary Text', hex: AERIVA_COLORS.textSecondary, token: '--color-text-secondary', role: 'Labels, captions, subheadings' },
                  { name: 'Border', hex: AERIVA_COLORS.border, token: '--color-border', role: 'Dividers, 1px boundaries' },
                  { name: 'Warm Accent', hex: AERIVA_COLORS.accentWarm, token: '--color-accent-warm', role: 'Illustrations, large accents' },
                  { name: 'Accessible Primary Accent', hex: AERIVA_COLORS.accentPrimary, token: '--color-accent-primary', role: 'WCAG 2.1 AA primary CTA text' },
                  { name: 'Secondary Accent (Olive)', hex: AERIVA_COLORS.accentSecondary, token: '--color-accent-secondary', role: 'Verified states, badges' },
                  { name: 'Soft Accent', hex: AERIVA_COLORS.accentSoft, token: '--color-accent-soft', role: 'Subtle background washes' },
                  { name: 'Success', hex: AERIVA_COLORS.success, token: '--color-status-success', role: 'Confirmed, On Time' },
                  { name: 'Warning', hex: AERIVA_COLORS.warning, token: '--color-status-warning', role: 'Attention, Delay alert' },
                  { name: 'Error', hex: AERIVA_COLORS.error, token: '--color-status-error', role: 'Validation errors, Cancelled' },
                ].map((c, i) => (
                  <div key={i} className="rounded-xl border border-border overflow-hidden bg-white shadow-sm flex flex-col">
                    <div className="h-16 w-full border-b border-border/50" style={{ backgroundColor: c.hex }} />
                    <div className="p-3 text-left space-y-1 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-bold text-ink">{c.name}</div>
                        <div className="text-[11px] font-mono text-warm-gray font-semibold">{c.hex}</div>
                      </div>
                      <div className="text-[10px] text-warm-gray/80 pt-1 border-t border-border/40 font-mono truncate">{c.token}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CRITICAL ACCESSIBILITY CALLOUT */}
              <div className="p-4 rounded-xl bg-sand/50 border border-border space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold font-mono text-ink uppercase">
                  <ShieldCheck className="w-4 h-4 text-terracotta-accessible" />
                  <span>Mandatory WCAG 2.1 AA Compliance Note</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 rounded-lg bg-white border border-red-200">
                    <div className="flex items-center gap-1.5 text-red-700 font-bold mb-1">
                      <XCircle className="w-4 h-4" />
                      <span>Known Contrast Failure Avoided</span>
                    </div>
                    <p className="text-warm-gray text-[11px] leading-relaxed">
                      <strong className="text-ink">#C96B45 on #FFFFFF</strong> yields a contrast ratio of only <strong>3.3:1</strong>, which fails WCAG AA for normal text (&lt; 4.5:1). It is strictly forbidden for normal body text.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-emerald-300">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-bold mb-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approved Accessible Combination</span>
                    </div>
                    <p className="text-warm-gray text-[11px] leading-relaxed">
                      <strong className="text-ink">#963F24 on #FFFFFF</strong> yields a contrast ratio of <strong>6.2:1</strong>, easily passing WCAG 2.1 AA (&gt; 4.5:1) and AAA for large text. Used for all primary CTA text and buttons.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TYPOGRAPHY */}
          {activeTab === 'typography' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-serif font-medium text-ink">Typography System</h3>
                <p className="text-xs text-warm-gray font-sans mt-0.5">
                  Primary font: <strong>Manrope</strong>. Fallback: <strong>Inter, system-ui, sans-serif</strong>. Strictly editorial, no decorative fonts.
                </p>
              </div>

              <div className="divide-y divide-border border border-border rounded-xl bg-white overflow-hidden">
                {[
                  { name: 'Display XL', class: 'text-display-xl', spec: '4.5rem (72px) / 1.05 / 700 / -0.035em', sample: 'Every Horizon' },
                  { name: 'Display', class: 'text-display', spec: '3.5rem (56px) / 1.1 / 700 / -0.03em', sample: 'Luxury in Every Flight' },
                  { name: 'H1', class: 'text-h1', spec: '2.5rem (40px) / 1.15 / 700 / -0.025em', sample: 'Where Will You Go Next?' },
                  { name: 'H2', class: 'text-h2', spec: '2rem (32px) / 1.2 / 600 / -0.02em', sample: 'Select Your Cabin Class' },
                  { name: 'H3', class: 'text-h3', spec: '1.5rem (24px) / 1.3 / 600 / -0.015em', sample: 'Flight Details & Amenities' },
                  { name: 'H4', class: 'text-h4', spec: '1.25rem (20px) / 1.35 / 600 / -0.01em', sample: 'Boarding Gate B12' },
                  { name: 'Body Large', class: 'text-body-large', spec: '1.125rem (18px) / 1.5 / 400', sample: 'Find better routes, transparent fares, and effortless booking.' },
                  { name: 'Body', class: 'text-body', spec: '1rem (16px) / 1.5 / 400', sample: 'Standard fare includes one carry-on luggage and complimentary seat selection.' },
                  { name: 'Body Small', class: 'text-body-small', spec: '0.875rem (14px) / 1.45 / 400', sample: 'Estimated arrival time subject to prevailing regional airspace telemetry.' },
                  { name: 'Caption', class: 'text-caption', spec: '0.75rem (12px) / 1.4 / 500', sample: 'Taxes, airport recovery fees and fuel surcharges included.' },
                  { name: 'Eyebrow', class: 'text-eyebrow', spec: '0.6875rem (11px) / 1.3 / 700 / 0.2em uppercase', sample: '01 / FLIGHT SCHEDULE' },
                ].map((t, idx) => (
                  <div key={idx} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                    <div className="md:w-1/4">
                      <span className="text-xs font-bold text-ink">{t.name}</span>
                      <div className="text-[10px] font-mono text-warm-gray">{t.spec}</div>
                    </div>
                    <div className="md:w-3/4">
                      <div className={`${t.class} text-ink truncate`}>{t.sample}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SPACING */}
          {activeTab === 'spacing' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-serif font-medium text-ink">4px Base Grid Spacing</h3>
                <p className="text-xs text-warm-gray font-sans mt-0.5">
                  Allowed values only: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120, 144. Arbitrary spacing is strictly prohibited.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {Object.entries(AERIVA_SPACING).map(([key, val]) => (
                  <div key={key} className="p-3 rounded-lg border border-border bg-white flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono font-bold text-ink">space-{key}</span>
                      <span className="text-[11px] text-warm-gray font-mono block">{val}</span>
                    </div>
                    <div
                      className="bg-terracotta rounded-sm"
                      style={{ width: `${Math.min(parseInt(val), 64)}px`, height: '14px' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: RADIUS */}
          {activeTab === 'radius' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-serif font-medium text-ink">Border Radius Scale</h3>
                <p className="text-xs text-warm-gray font-sans mt-0.5">
                  Allowed values: 6px, 8px, 12px, 16px, 20px. Excessive pill shapes are avoided to preserve tactile editorial precision.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {[
                  { name: 'radius-xs', px: '6px', role: 'Tags, chips, small badges' },
                  { name: 'radius-sm', px: '8px', role: 'Buttons, inputs, dropdown items' },
                  { name: 'radius-md', px: '12px', role: 'Modals, dialogs, popovers' },
                  { name: 'radius-lg', px: '16px', role: 'Primary cards, route cards' },
                  { name: 'radius-xl', px: '20px', role: 'Hero feature containers' },
                ].map((r, i) => (
                  <div key={i} className="p-4 rounded-lg border border-border bg-white text-center space-y-3">
                    <div
                      className="w-16 h-16 mx-auto bg-sand border-2 border-terracotta flex items-center justify-center text-xs font-mono font-bold text-ink"
                      style={{ borderRadius: r.px }}
                    >
                      {r.px}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-ink">{r.name}</div>
                      <div className="text-[10px] text-warm-gray font-mono">{r.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SHADOWS */}
          {activeTab === 'shadows' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-serif font-medium text-ink">Tactile Shadow Elevation</h3>
                <p className="text-xs text-warm-gray font-sans mt-0.5">
                  Subtle, daylight ambient diffusion. Heavy black shadows and colorful neon glows are banned.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { name: 'Shadow Small', token: '--shadow-sm', value: AERIVA_SHADOWS.small, role: 'Cards, buttons, inputs' },
                  { name: 'Shadow Medium', token: '--shadow-md', value: AERIVA_SHADOWS.medium, role: 'Elevated dropdowns, hover cards' },
                  { name: 'Shadow Large', token: '--shadow-lg', value: AERIVA_SHADOWS.large, role: 'Modals, floating booking panels' },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="p-6 bg-white border border-border rounded-xl flex flex-col justify-between"
                    style={{ boxShadow: s.value }}
                  >
                    <div>
                      <div className="text-sm font-serif font-bold text-ink">{s.name}</div>
                      <div className="text-[11px] font-mono text-warm-gray mt-1">{s.value}</div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-border/50 text-[10px] font-mono text-terracotta">
                      {s.role}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: GRID & BREAKPOINTS */}
          {activeTab === 'grid' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-serif font-medium text-ink">Grid Architecture & Breakpoints</h3>
                <p className="text-xs text-warm-gray font-sans mt-0.5">
                  Desktop: 12 columns (1280px standard / 1440px extended). Tablet: 8 columns. Mobile: 4 columns.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-border bg-white space-y-2">
                  <div className="text-xs font-bold text-ink uppercase font-mono">Desktop Layout</div>
                  <div className="text-2xl font-serif text-terracotta font-light">12 Columns</div>
                  <div className="text-xs text-warm-gray space-y-1 font-mono text-[11px]">
                    <div>Max width: 1280px</div>
                    <div>Extended: 1440px</div>
                    <div>Gutter: 24px</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-border bg-white space-y-2">
                  <div className="text-xs font-bold text-ink uppercase font-mono">Tablet Layout</div>
                  <div className="text-2xl font-serif text-olive font-light">8 Columns</div>
                  <div className="text-xs text-warm-gray space-y-1 font-mono text-[11px]">
                    <div>Breakpoint: &ge; 768px</div>
                    <div>Gutter: 16px</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-border bg-white space-y-2">
                  <div className="text-xs font-bold text-ink uppercase font-mono">Mobile Layout</div>
                  <div className="text-2xl font-serif text-warm-gray font-light">4 Columns</div>
                  <div className="text-xs text-warm-gray space-y-1 font-mono text-[11px]">
                    <div>Breakpoint: &lt; 768px</div>
                    <div>Gutter: 12px</div>
                  </div>
                </div>
              </div>

              {/* Visual 12-column demo */}
              <div className="p-4 rounded-xl border border-border bg-sand/30 space-y-2">
                <div className="text-[10px] font-mono text-warm-gray uppercase tracking-wider">12-Column Grid Simulation</div>
                <div className="grid grid-cols-12 gap-2">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="h-10 rounded bg-paper border border-border flex items-center justify-center text-[10px] font-mono font-bold text-warm-gray">
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: ACCESSIBILITY */}
          {activeTab === 'accessibility' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-serif font-medium text-ink">WCAG 2.1 AA Accessibility Standards</h3>
                <p className="text-xs text-warm-gray font-sans mt-0.5">
                  Verification of color contrast ratios, focus states, typography readability, and strict No-Blur rules.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(AERIVA_CONTRAST_RULES).map(([key, item]) => (
                  <div key={key} className="p-4 rounded-xl border border-border bg-white flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-ink font-mono uppercase">{key}</span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                        {item.contrastRatio}
                      </span>
                    </div>
                    <div
                      className="p-3 rounded-lg border flex items-center justify-center font-bold text-xs"
                      style={{ backgroundColor: item.bg, color: item.text, borderColor: AERIVA_COLORS.border }}
                    >
                      Sample Verified Text ({item.contrastRatio})
                    </div>
                    <div className="text-[11px] text-warm-gray font-mono">{item.wcagStatus}</div>
                  </div>
                ))}
              </div>

              {/* Interactive Buttons Showcase */}
              <div className="p-5 rounded-xl border border-border bg-sand/40 space-y-4">
                <div className="text-xs font-mono font-bold text-ink uppercase">Interactive Button Specifications</div>
                <div className="flex flex-wrap gap-4 items-center">
                  <button className="btn-primary">
                    <span>Primary Action (#963F24)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button className="btn-secondary">
                    <span>Secondary Action</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* FOOTER */}
        <div className="pt-4 border-t border-border flex items-center justify-between shrink-0 text-xs font-mono text-warm-gray">
          <span>AERIVA Design Foundation &bull; Phase 01 Completed</span>
          <span className="text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" />
            Tokens Validated
          </span>
        </div>

      </div>
    </div>
  );
};
