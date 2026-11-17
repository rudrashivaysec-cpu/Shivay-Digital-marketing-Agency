import { TESTIMONIALS } from '../data/agencyData';
import { ResilientImage } from './ResilientImage';

const COMMITMENTS = [
  {
    title: 'Senior Strategist Ownership',
    desc: 'Your account is run by performance and brand leads—never handed off to junior interns.',
  },
  {
    title: 'Android-First Experience',
    desc: 'Over 78% of Indian buyers browse on mid-range Android devices. We test every landing page on 4G mobile hardware.',
  },
  {
    title: 'Weekly Clear Reporting',
    desc: 'Zero vanity PDFs. Every Friday you receive spend, CAC, qualified leads, and next week’s creative test plan.',
  },
  {
    title: 'No Long Lock-In Contracts',
    desc: 'Monthly accountability means we earn your retainer every single sprint through measurable pipeline growth.',
  },
];

export function AboutAndProof() {
  return (
    <section id="about" className="border-t border-white/8 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-12">
          {/* Team Editorial Photography */}
          <div className="lg:col-span-5">
            <div className="relative h-full min-h-[260px] overflow-hidden rounded-2xl border border-white/10 bg-[#121116]">
              <ResilientImage
                src="/src/assets/images/about_creative_team_1794905993142.jpg"
                alt="Shivay Digital strategists and designers reviewing brand boards in studio"
                fallbackTitle="Shivay Digital Creative & Growth Pod"
                className="h-full w-full object-cover aspect-[4/3] lg:aspect-auto"
              />
            </div>
          </div>

          {/* Agency Story & Operating Commitments */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <p className="text-xs font-medium tracking-wide text-[#FF7A1A]">
                About Shivay Digital
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white text-balance sm:text-4xl">
                Creative craft meets strict performance math.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-300">
                Founded to bridge the gap between aesthetic branding studios and analytical ad
                buyers, Shivay Digital helps ambitious Indian startups, D2C labels, and service
                businesses build memorable brands that convert profitably.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 border-t border-white/10 pt-6 sm:grid-cols-2">
              {COMMITMENTS.map((item) => (
                <div key={item.title}>
                  <h3 className="font-display text-sm font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Attributable Client Testimonials */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <figure
              key={item.id}
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#121116] p-6"
            >
              <blockquote className="text-sm leading-relaxed text-zinc-200">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-6 border-t border-white/8 pt-4">
                <p className="font-display text-sm font-semibold text-white">{item.author}</p>
                <p className="mt-0.5 text-xs text-zinc-400">
                  {item.role} · {item.company}
                </p>
                <p className="mt-2 font-mono text-xs font-medium text-[#FF7A1A] tabular-nums">
                  Verified outcome: {item.outcome}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
