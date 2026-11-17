import { useState } from 'react';
import { Check } from 'lucide-react';
import { PRICING_TIERS, type CurrencyCode } from '../data/agencyData';

interface PricingSectionProps {
  currency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  selectedPlan: string;
  onSelectPlan: (planName: string) => void;
}

export function PricingSection({
  currency,
  onCurrencyChange,
  selectedPlan,
  onSelectPlan,
}: PricingSectionProps) {
  const [billing, setBilling] = useState<'monthly' | 'quarterly'>('monthly');

  const formatPrice = (monthlyInr: number, monthlyUsd: number) => {
    const discount = billing === 'quarterly' ? 0.85 : 1;
    if (currency === 'INR') {
      const value = Math.round((monthlyInr * discount) / 100) * 100 - 1;
      return `₹${value.toLocaleString('en-IN')}`;
    }
    const usdVal = Math.round(monthlyUsd * discount);
    return `$${usdVal.toLocaleString('en-US')}`;
  };

  return (
    <section id="pricing" className="border-t border-white/8 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-[#FF7A1A]">Transparent Retainers</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white text-balance sm:text-4xl">
              Clear pricing built for compounding ROI.
            </h2>
          </div>

          {/* Local Controls: Currency & Cadence */}
          <div className="flex flex-wrap items-center gap-3">
            <div
              role="group"
              aria-label="Currency selector"
              className="flex items-center rounded-xl border border-white/10 bg-[#121116] p-1"
            >
              <button
                type="button"
                onClick={() => onCurrencyChange('INR')}
                className={`min-h-[38px] rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  currency === 'INR'
                    ? 'bg-white text-[#09090B] font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                INR (₹)
              </button>
              <button
                type="button"
                onClick={() => onCurrencyChange('USD')}
                className={`min-h-[38px] rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  currency === 'USD'
                    ? 'bg-white text-[#09090B] font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                USD ($)
              </button>
            </div>

            <div
              role="group"
              aria-label="Billing frequency"
              className="flex items-center rounded-xl border border-white/10 bg-[#121116] p-1"
            >
              <button
                type="button"
                onClick={() => setBilling('monthly')}
                className={`min-h-[38px] rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  billing === 'monthly'
                    ? 'bg-[#FF7A1A] text-[#09090B] font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBilling('quarterly')}
                className={`min-h-[38px] rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  billing === 'quarterly'
                    ? 'bg-[#FF7A1A] text-[#09090B] font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Quarterly · Save 15%
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PRICING_TIERS.map((tier) => {
            const isSelected = selectedPlan === tier.name;
            return (
              <div
                key={tier.id}
                className={`flex flex-col justify-between rounded-2xl border p-6 sm:p-8 transition-colors duration-150 ${
                  tier.popular
                    ? 'border-[#FF7A1A]/70 bg-[#171311]'
                    : 'border-white/10 bg-[#121116]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-xl font-semibold text-white">{tier.name}</h3>
                    {tier.popular && (
                      <span className="text-xs font-semibold text-[#FF7A1A]">Most Popular</span>
                    )}
                  </div>

                  <p className="mt-2 text-sm text-zinc-400">{tier.tagline}</p>

                  <div className="mt-6 flex items-baseline gap-1.5">
                    <span className="font-mono text-3xl font-bold text-white tabular-nums sm:text-4xl">
                      {formatPrice(tier.monthlyInr, tier.monthlyUsd)}
                    </span>
                    <span className="text-xs text-zinc-400">
                      / month {billing === 'quarterly' ? '· billed quarterly' : ''}
                    </span>
                  </div>

                  <p className="mt-1.5 text-xs text-zinc-400">{tier.turnaround}</p>

                  <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-sm text-zinc-200">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#FF7A1A]"
                          aria-hidden="true"
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectPlan(tier.name)}
                  className={`mt-8 min-h-[48px] w-full rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-150 active:scale-[0.98] whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                    tier.popular || isSelected
                      ? 'bg-[#FF7A1A] text-[#09090B] hover:bg-[#FF8C38]'
                      : 'border border-white/15 bg-transparent text-white hover:border-white/35'
                  }`}
                >
                  {isSelected ? 'Selected in Quote Form' : tier.ctaLabel}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
