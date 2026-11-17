interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'estimator', label: 'ROI Estimator' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'about', label: 'About' },
];

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-[52px] border-b border-white/10 bg-[#09090B]/88 backdrop-blur-md md:h-[72px]">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="font-display text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A1A] rounded-md px-1 py-1 min-h-[40px] flex items-center cursor-pointer"
        >
          Shivay Digital
        </button>

        {/* Zone 2: 5 concise single-line text links */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.id);
                }}
                className={`relative py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A1A] rounded-sm ${
                  isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute bottom-0.5 left-0 right-0 h-[1.5px] bg-[#FF7A1A] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="min-h-[40px] md:min-h-[44px] rounded-lg bg-[#FF7A1A] px-4 py-2 text-xs md:text-sm font-semibold text-[#09090B] transition-all duration-150 hover:bg-[#FF8C38] active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Book Discovery Call
          </button>
        </div>
      </div>
    </header>
  );
}
