interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#09090B] pt-12 pb-24 md:pb-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-lg font-bold tracking-tight text-white">
              Shivay Digital
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-400">
              Conversion-driven digital marketing, brand systems, and fast mobile storefronts for
              ambitious Indian and global businesses.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs font-semibold tracking-wide text-zinc-300">Navigation</p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-400">
              {[
                { id: 'services', label: 'Capabilities' },
                { id: 'work', label: 'Case Studies' },
                { id: 'estimator', label: 'ROI Estimator' },
                { id: 'pricing', label: 'Retainer Pricing' },
                { id: 'about', label: 'About Studio' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(link.id)}
                    className="min-h-[36px] py-1 text-left transition-colors hover:text-white cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-xs font-semibold tracking-wide text-zinc-300">Studio Contact</p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-400">
              <li>hello@shivaydigital.in</li>
              <li className="font-mono tabular-nums">+91 98765 43210</li>
              <li>Mumbai, India · Working Worldwide</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-white/8 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center">
          <p>&copy; {year} Shivay Digital Agency. All rights reserved.</p>
          <p>Mon–Sat · 10:00 AM – 7:30 PM IST</p>
        </div>
      </div>
    </footer>
  );
}
