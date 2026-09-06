import { Search, X } from 'lucide-react';
import type { TravelTag } from '../types';

interface FilterBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  tags: TravelTag[];
  activeTags: TravelTag[];
  onToggleTag: (tag: TravelTag) => void;
  onClearTags: () => void;
}

export function FilterBar({
  query,
  onQueryChange,
  tags,
  activeTags,
  onToggleTag,
  onClearTags,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-obsidian-400"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search by destination, country, or continent..."
          aria-label="Search destinations"
          className="w-full rounded-full border border-obsidian-700 bg-obsidian-900/80 py-3.5 pl-11 pr-4 text-sm text-obsidian-100 placeholder:text-obsidian-400 backdrop-blur-sm transition focus:border-amber-400/60 focus:bg-obsidian-900"
        />
        {query && (
          <button
            onClick={() => onQueryChange('')}
            aria-label="Clear search"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-obsidian-400 transition hover:bg-obsidian-800 hover:text-obsidian-100"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by interest">
        {tags.map((tag) => {
          const active = activeTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => onToggleTag(tag)}
              aria-pressed={active}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide transition ${
                active
                  ? 'border-amber-400 bg-amber-400 text-obsidian-950'
                  : 'border-obsidian-700 bg-obsidian-900/60 text-obsidian-300 hover:border-obsidian-500 hover:text-obsidian-100'
              }`}
            >
              {tag}
            </button>
          );
        })}
        {activeTags.length > 0 && (
          <button
            onClick={onClearTags}
            className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-obsidian-400 transition hover:text-amber-300"
          >
            <X className="h-3 w-3" />
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
