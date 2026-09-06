import { useEffect, useState } from 'react';
import { Compass } from 'lucide-react';

interface NavbarProps {
  onExplore: () => void;
}

export function Navbar({ onExplore }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? 'border-b border-obsidian-800 bg-obsidian-950/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
        <div className="flex items-center gap-2 text-white">
          <Compass className="h-5 w-5 text-amber-400" aria-hidden="true" />
          <span className="font-display text-lg font-medium tracking-tight">Aura Voyage</span>
        </div>
        <button
          onClick={onExplore}
          className="rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-white transition hover:border-amber-400/50 hover:text-amber-200"
        >
          Explore
        </button>
      </div>
    </header>
  );
}
