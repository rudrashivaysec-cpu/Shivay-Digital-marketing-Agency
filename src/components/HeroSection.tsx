import { ArrowRight } from 'lucide-react';
import { KPI_METRICS } from '../data/agencyData';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onBookCall: () => void;
  onExploreWork: () => void;
}

export function HeroSection({ onBookCall, onExploreWork }: HeroSectionProps) {
  return (
    <section id="home" className="pt-[68px] md:pt-[104px] pb-10 md:pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
          {/* Left Proposition Column */}
          <div className="flex flex-col justify-between py-2 lg:col-span-6">
            <div>
              <p className="text-xs font-medium tracking-wide text-[#FF7A1A]">
                Performance Marketing · Brand Systems · Conversion Web
              </p>

              <h1
                className="mt-4 font-display font-bold tracking-tight text-white text-balance"
                style={{ fontSize: 'clamp(2.25rem, 4.1vw, 3.75rem)', lineHeight: 1.08 }}
              >
                Aapke brand ki online growth, built to convert.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-300 md:text-[17px]">
                Shivay Digital turns scattered ad spend and slow websites into predictable revenue
                systems. From sharp brand identity and Android-fast storefronts to profitable Meta
                and Google campaigns—we partner for measurable scale.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={onBookCall}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#FF7A1A] px-6 py-3 text-sm font-semibold text-[#09090B] transition-all duration-150 hover:bg-[#FF8C38] active:scale-[0.98] whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Schedule Discovery Call</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onExploreWork}
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/15 bg-transparent px-6 py-3 text-sm font-medium text-zinc-200 transition-colors duration-150 hover:border-white/35 hover:text-white active:scale-[0.98] whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A1A]"
              >
                Explore Case Studies
              </button>
            </div>
          </div>

          {/* Right Dominant Visual Anchor */}
          <div className="lg:col-span-6">
            <div className="relative h-full min-h-[260px] overflow-hidden rounded-2xl border border-white/10 bg-[#121116]">
              <ResilientImage
                src="/src/assets/images/hero_shivay_studio_1794906013233.jpg"
                alt="Shivay Digital strategy studio workspace with campaign analytics display"
                fallbackTitle="Shivay Digital Creative & Performance Studio"
                className="h-full w-full object-cover aspect-[16/10] lg:aspect-auto"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#09090B]/90 via-[#09090B]/25 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="text-xs font-medium text-zinc-300">
                  Shivay Studio · Mumbai &amp; Remote Worldwide
                </p>
                <p className="mt-1 font-display text-base font-semibold text-white sm:text-lg">
                  Creative direction paired with server-side attribution
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Verified Proof Strip */}
        <div className="mt-10 md:mt-14 grid grid-cols-2 gap-4 border-y border-white/10 py-6 sm:grid-cols-4 sm:gap-6">
          {KPI_METRICS.map((metric) => (
            <div key={metric.label} className="flex flex-col">
              <span className="font-mono text-2xl font-semibold tracking-tight text-white tabular-nums sm:text-3xl">
                {metric.value}
              </span>
              <span className="mt-1 text-sm font-medium text-zinc-200">{metric.label}</span>
              <span className="mt-0.5 text-xs text-zinc-400">{metric.context}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
