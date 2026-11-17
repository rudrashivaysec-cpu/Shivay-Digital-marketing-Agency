import { Home, Layers, Briefcase, MessageSquare } from 'lucide-react';

interface MobileBottomNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const MOBILE_TABS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'services', label: 'Services', icon: Layers },
  { id: 'work', label: 'Work', icon: Briefcase },
  { id: 'contact', label: 'Get Quote', icon: MessageSquare },
];

export function MobileBottomNav({ activeSection, onNavigate }: MobileBottomNavProps) {
  return (
    <nav
      aria-label="Mobile Thumb Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#09090B]/92 backdrop-blur-md pb-[env(safe-area-inset-bottom)]"
    >
      <div className="grid h-14 grid-cols-4 items-center px-1">
        {MOBILE_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            activeSection === tab.id ||
            (tab.id === 'services' && (activeSection === 'estimator' || activeSection === 'pricing'));

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onNavigate(tab.id)}
              className={`flex min-h-[44px] flex-col items-center justify-center gap-0.5 rounded-lg px-2 py-1 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A1A] ${
                isActive ? 'text-[#FF7A1A]' : 'text-zinc-400 active:text-white'
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={isActive ? 2.25 : 1.75} aria-hidden="true" />
              <span className="text-[11px] font-medium tracking-tight whitespace-nowrap">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
