import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CASE_STUDIES, type CaseCategory, type CaseStudy } from '../data/agencyData';
import { ResilientImage } from './ResilientImage';

interface CaseStudiesSectionProps {
  onSelectCaseStudy: (study: CaseStudy) => void;
}

const CATEGORIES: CaseCategory[] = [
  'All Work',
  'Branding & Web',
  'Performance Ads',
  'Social & Video',
];

export function CaseStudiesSection({ onSelectCaseStudy }: CaseStudiesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<CaseCategory>('All Work');

  const filteredStudies =
    activeCategory === 'All Work'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((item) => item.category === activeCategory);

  return (
    <section id="work" className="border-t border-white/8 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-[#FF7A1A]">Selected Case Studies</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white text-balance sm:text-4xl">
              Proof backed by verified numbers.
            </h2>
          </div>

          {/* Interactive Segmented Filter Control */}
          <div
            role="tablist"
            aria-label="Filter case studies by capability"
            className="flex items-center gap-1 overflow-x-auto rounded-xl border border-white/10 bg-[#121116] p-1"
          >
            {CATEGORIES.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(category)}
                  className={`min-h-[40px] rounded-lg px-3.5 py-2 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A1A] ${
                    isSelected
                      ? 'bg-[#FF7A1A] text-[#09090B] font-semibold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredStudies.map((study) => (
            <button
              key={study.id}
              type="button"
              onClick={() => onSelectCaseStudy(study)}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#121116] text-left transition-all duration-150 hover:border-[#FF7A1A]/50 active:scale-[0.99] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A1A]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#18161F]">
                <ResilientImage
                  src={study.image}
                  alt={study.imageAlt}
                  fallbackTitle={study.client}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#09090B]/80 via-transparent to-transparent"
                />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-semibold text-[#FF7A1A] tabular-nums">
                    {study.headlineMetric}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <span className="font-medium text-zinc-300">{study.client}</span>
                    <span aria-hidden="true">·</span>
                    <span>{study.timeframe}</span>
                  </div>

                  <h3 className="mt-2.5 font-display text-lg font-semibold leading-snug text-white">
                    {study.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{study.summary}</p>
                </div>

                <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-[#FF7A1A] transition-colors">
                  <span>Read Case Breakdown</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
