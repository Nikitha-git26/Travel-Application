import { Compass } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-obsidian-800 bg-obsidian-950 px-6 py-10 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-2 text-obsidian-300">
          <Compass className="h-4 w-4 text-amber-400" aria-hidden="true" />
          <span className="font-display text-sm font-medium">Aura Voyage</span>
        </div>
        <p className="text-xs text-obsidian-500">
          A designesthetics assignment project — travel exploration, curated by design.
        </p>
      </div>
    </footer>
  );
}
