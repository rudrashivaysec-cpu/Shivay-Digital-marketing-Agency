import { useEffect } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import type { CaseStudy, CurrencyCode, ServiceItem } from '../data/agencyData';
import { ResilientImage } from './ResilientImage';

interface DetailSheetModalProps {
  service: ServiceItem | null;
  caseStudy: CaseStudy | null;
  currency: CurrencyCode;
  onClose: () => void;
  onRequestServiceQuote: (serviceTitle: string) => void;
  onRequestSimilarProject: (studyTitle: string) => void;
}

export function DetailSheetModal({
  service,
  caseStudy,
  currency,
  onClose,
  onRequestServiceQuote,
  onRequestSimilarProject,
}: DetailSheetModalProps) {
  const isOpen = Boolean(service || caseStudy);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm md:items-center md:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={service ? service.title : caseStudy?.title}
    >
      <div
        className="max-h-[88vh] w-full overflow-y-auto rounded-t-3xl border border-white/12 bg-[#121116] p-6 pb-8 shadow-2xl md:max-w-2xl md:rounded-2xl md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Android Bottom Sheet Drag Handle */}
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-white/20 md:hidden" aria-hidden="true" />

        <div className="flex items-start justify-between gap-4">
          <div>
            {service && (
              <>
                <p className="font-mono text-xs font-medium text-[#FF7A1A]">
                  {service.index} {service.category}
                </p>
                <h3 className="mt-1 font-display text-2xl font-bold text-white">
                  {service.title}
                </h3>
              </>
            )}
            {caseStudy && (
              <>
                <p className="text-xs font-medium text-[#FF7A1A]">
                  {caseStudy.client} · {caseStudy.timeframe}
                </p>
                <h3 className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">
                  {caseStudy.title}
                </h3>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-xl border border-white/10 text-zinc-300 hover:border-white/30 hover:text-white cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {service && (
          <div className="mt-6 space-y-6">
            <p className="text-sm leading-relaxed text-zinc-300">{service.shortDesc}</p>

            <div className="grid grid-cols-2 gap-4 rounded-xl border border-white/10 bg-[#09090B] p-4">
              <div>
                <p className="text-xs text-zinc-400">Starting Investment</p>
                <p className="mt-1 font-mono text-base font-semibold text-white tabular-nums">
                  {currency === 'INR' ? service.startingInr : service.startingUsd}
                </p>
              </div>
              <div>
                <p className="text-xs text-zinc-400">Typical Turnaround</p>
                <p className="mt-1 text-sm font-medium text-white">{service.timeline}</p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold tracking-wide text-zinc-400">
                Included Deliverables
              </h4>
              <ul className="mt-3 space-y-2.5">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-200">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FF7A1A]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#09090B] p-4">
              <p className="text-xs font-medium text-zinc-400">Expected Business Impact</p>
              <p className="mt-1 text-sm leading-relaxed text-zinc-200">{service.outcomes}</p>
            </div>

            <button
              type="button"
              onClick={() => onRequestServiceQuote(service.title)}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#FF7A1A] px-5 py-3 text-sm font-semibold text-[#09090B] hover:bg-[#FF8C38] cursor-pointer"
            >
              <span>Request Quote for {service.title}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}

        {caseStudy && (
          <div className="mt-6 space-y-6">
            <div className="overflow-hidden rounded-xl border border-white/10">
              <ResilientImage
                src={caseStudy.image}
                alt={caseStudy.imageAlt}
                fallbackTitle={caseStudy.client}
                className="aspect-[16/9] w-full object-cover"
              />
            </div>

            <div className="grid grid-cols-3 gap-3 rounded-xl border border-white/10 bg-[#09090B] p-4">
              {caseStudy.results.map((res) => (
                <div key={res.label}>
                  <p className="font-mono text-sm font-bold text-[#FF7A1A] tabular-nums sm:text-base">
                    {res.value}
                  </p>
                  <p className="mt-0.5 text-xs text-zinc-400">{res.label}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-zinc-400">The Challenge</h4>
                <p className="mt-1 text-sm leading-relaxed text-zinc-300">{caseStudy.challenge}</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-zinc-400">Our Execution</h4>
                <p className="mt-1 text-sm leading-relaxed text-zinc-300">{caseStudy.strategy}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onRequestSimilarProject(caseStudy.client)}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#FF7A1A] px-5 py-3 text-sm font-semibold text-[#09090B] hover:bg-[#FF8C38] cursor-pointer"
            >
              <span>Build a Similar Funnel for My Brand</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
