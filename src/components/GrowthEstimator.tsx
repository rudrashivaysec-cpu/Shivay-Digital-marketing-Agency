import { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import type { CurrencyCode } from '../data/agencyData';

type CampaignGoal = 'leads' | 'ecommerce' | 'launch';
type IndustryType = 'd2c' | 'b2b' | 'local' | 'realestate';

interface GrowthEstimatorProps {
  currency: CurrencyCode;
  onApplyEstimate: (payload: {
    budgetLabel: string;
    recommendedPlan: string;
    goalLabel: string;
  }) => void;
}

const GOALS: { id: CampaignGoal; label: string; leadMultiplier: number }[] = [
  { id: 'leads', label: 'Lead Generation', leadMultiplier: 1.0 },
  { id: 'ecommerce', label: 'D2C Sales & ROAS', leadMultiplier: 1.25 },
  { id: 'launch', label: 'Brand Launch', leadMultiplier: 0.85 },
];

const INDUSTRIES: { id: IndustryType; label: string; cplFactor: number; roasBase: number }[] = [
  { id: 'd2c', label: 'D2C & Retail', cplFactor: 0.85, roasBase: 3.9 },
  { id: 'b2b', label: 'B2B & SaaS', cplFactor: 1.35, roasBase: 3.4 },
  { id: 'local', label: 'Clinics & Local', cplFactor: 0.68, roasBase: 4.3 },
  { id: 'realestate', label: 'Real Estate & Edu', cplFactor: 1.15, roasBase: 3.6 },
];

export function GrowthEstimator({ currency, onApplyEstimate }: GrowthEstimatorProps) {
  const [inrBudget, setInrBudget] = useState<number>(75000);
  const [goal, setGoal] = useState<CampaignGoal>('leads');
  const [industry, setIndustry] = useState<IndustryType>('d2c');

  const calculation = useMemo(() => {
    const selectedGoal = GOALS.find((g) => g.id === goal) ?? GOALS[0];
    const selectedIndustry = INDUSTRIES.find((i) => i.id === industry) ?? INDUSTRIES[0];

    const displayBudget = currency === 'INR' ? inrBudget : Math.round(inrBudget / 60);
    const baseCplInr = 380 * selectedIndustry.cplFactor;
    const estLeads = Math.max(18, Math.round((inrBudget / baseCplInr) * selectedGoal.leadMultiplier));
    const estReach = Math.round((inrBudget / 120) * 1000);
    const estRoas = (
      selectedIndustry.roasBase +
      (inrBudget >= 150000 ? 0.5 : inrBudget >= 75000 ? 0.25 : 0)
    ).toFixed(1);

    const recommendedPlan =
      inrBudget < 45000
        ? 'Launch Foundation'
        : inrBudget < 160000
          ? 'Growth Accelerator'
          : 'Scale Partner';

    const formattedBudget =
      currency === 'INR'
        ? `₹${displayBudget.toLocaleString('en-IN')}/mo`
        : `$${displayBudget.toLocaleString('en-US')}/mo`;

    return {
      formattedBudget,
      estLeads,
      estReachFormatted:
        estReach >= 1000000
          ? `${(estReach / 1000000).toFixed(1)}M`
          : `${Math.round(estReach / 1000)}K`,
      estRoas,
      recommendedPlan,
      goalLabel: selectedGoal.label,
    };
  }, [inrBudget, goal, industry, currency]);

  return (
    <section id="estimator" className="border-t border-white/8 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 rounded-2xl border border-white/10 bg-[#121116] p-6 sm:p-8 lg:grid-cols-12 lg:items-stretch lg:gap-10 lg:p-10">
          {/* Left Interactive Controls */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <p className="text-xs font-medium tracking-wide text-[#FF7A1A]">
                Interactive Campaign Estimator
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white text-balance sm:text-3xl">
                Forecast your monthly growth pipeline before spending a rupee.
              </h2>

              {/* Budget Slider */}
              <div className="mt-8">
                <div className="flex items-center justify-between gap-4">
                  <label htmlFor="budget-slider" className="text-sm font-medium text-zinc-200">
                    Monthly Ad Spend Budget
                  </label>
                  <span className="font-mono text-lg font-semibold text-[#FF7A1A] tabular-nums">
                    {calculation.formattedBudget}
                  </span>
                </div>

                <div className="mt-3 py-2">
                  <input
                    id="budget-slider"
                    type="range"
                    min={25000}
                    max={400000}
                    step={5000}
                    value={inrBudget}
                    onChange={(e) => setInrBudget(Number(e.target.value))}
                    className="shivay-slider w-full min-h-[44px]"
                  />
                </div>

                <div className="flex justify-between font-mono text-xs text-zinc-500 tabular-nums">
                  <span>{currency === 'INR' ? '₹25,000' : '$420'}</span>
                  <span>{currency === 'INR' ? '₹2,00,000' : '$3,300'}</span>
                  <span>{currency === 'INR' ? '₹4,00,000+' : '$6,600+'}</span>
                </div>
              </div>

              {/* Primary Goal Buttons */}
              <div className="mt-7">
                <span className="block text-sm font-medium text-zinc-200">Primary Objective</span>
                <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {GOALS.map((item) => {
                    const active = goal === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setGoal(item.id)}
                        className={`min-h-[44px] rounded-xl border px-3.5 py-2.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A1A] ${
                          active
                            ? 'border-[#FF7A1A] bg-[#FF7A1A]/15 text-white'
                            : 'border-white/10 bg-[#09090B] text-zinc-400 hover:border-white/25 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Industry Buttons */}
              <div className="mt-6">
                <span className="block text-sm font-medium text-zinc-200">Business Category</span>
                <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {INDUSTRIES.map((item) => {
                    const active = industry === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setIndustry(item.id)}
                        className={`min-h-[44px] rounded-xl border px-3 py-2 text-xs font-medium transition-colors duration-150 whitespace-nowrap truncate cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A1A] ${
                          active
                            ? 'border-[#FF7A1A] bg-[#FF7A1A]/15 text-white'
                            : 'border-white/10 bg-[#09090B] text-zinc-400 hover:border-white/25 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Projection Summary Panel */}
          <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#09090B] p-6 lg:col-span-5">
            <div>
              <p className="text-xs font-medium text-zinc-400">Projected 30-Day Benchmark</p>

              <div className="mt-5 grid grid-cols-1 gap-5 border-b border-white/10 pb-6 sm:grid-cols-3 lg:grid-cols-1">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm text-zinc-400">Est. Qualified Leads / Orders</span>
                  <span className="font-mono text-2xl font-bold text-white tabular-nums">
                    {calculation.estLeads}–{Math.round(calculation.estLeads * 1.25)}
                  </span>
                </div>

                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm text-zinc-400">Target Blended ROAS</span>
                  <span className="font-mono text-2xl font-bold text-[#FF7A1A] tabular-nums">
                    {calculation.estRoas}x
                  </span>
                </div>

                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm text-zinc-400">Targeted Monthly Reach</span>
                  <span className="font-mono text-2xl font-bold text-white tabular-nums">
                    {calculation.estReachFormatted}
                  </span>
                </div>
              </div>

              <div className="mt-5">
                <p className="text-xs text-zinc-400">Recommended Retainer Tier</p>
                <p className="mt-1 font-display text-lg font-semibold text-white">
                  {calculation.recommendedPlan}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                  Benchmarks reflect historical Shivay Digital client medians across Meta &amp;
                  Google Search after 45-day pixel calibration.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                onApplyEstimate({
                  budgetLabel: calculation.formattedBudget,
                  recommendedPlan: calculation.recommendedPlan,
                  goalLabel: calculation.goalLabel,
                })
              }
              className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#FF7A1A] px-5 py-3 text-sm font-semibold text-[#09090B] transition-all duration-150 hover:bg-[#FF8C38] active:scale-[0.98] whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Lock Estimate &amp; Request Audit</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
