import { ArrowUpRight } from 'lucide-react';
import { SERVICES, type CurrencyCode, type ServiceItem } from '../data/agencyData';

interface CapabilitiesBentoProps {
  currency: CurrencyCode;
  onSelectService: (service: ServiceItem) => void;
}

export function CapabilitiesBento({ currency, onSelectService }: CapabilitiesBentoProps) {
  return (
    <section id="services" className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-[#FF7A1A]">Core Capabilities</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white text-balance sm:text-4xl">
              End-to-end growth systems under one roof.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-zinc-400">
            Tap any capability to inspect exact deliverables, turnaround times, and starting
            retainers.
          </p>
        </div>

        {/* Asymmetric Bento Grid: Top 2 marquee capabilities span wider on lg */}
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => {
            const startingPrice = currency === 'INR' ? service.startingInr : service.startingUsd;
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => onSelectService(service)}
                className={`group flex min-h-[196px] flex-col justify-between rounded-2xl border border-white/10 bg-[#121116] p-6 text-left transition-all duration-150 hover:border-[#FF7A1A]/50 hover:bg-[#16151C] active:scale-[0.99] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A1A] ${
                  service.featured ? 'lg:col-span-2' : 'lg:col-span-1'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xs font-medium text-[#FF7A1A] tabular-nums">
                      {service.index}
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 text-zinc-500 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#FF7A1A]"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="mt-4 font-display text-lg font-semibold text-white sm:text-xl">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-white/8 pt-4 text-xs text-zinc-400">
                  <span>{service.category}</span>
                  <span className="font-mono font-medium text-zinc-200 tabular-nums">
                    From {startingPrice}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
