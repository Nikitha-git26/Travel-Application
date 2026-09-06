import { useMemo, useState } from 'react';
import { Compass, SearchX } from 'lucide-react';
import type { Destination, TravelTag } from '../types';
import { FilterBar } from './FilterBar';
import { DestinationCard } from './DestinationCard';
import { CardSkeleton } from './ui/Skeletons';
import { useDebounce } from '../hooks/useDebounce';

interface DestinationExplorerProps {
  destinations: Destination[];
  allTags: TravelTag[];
  isLoading: boolean;
  onSelect: (destination: Destination) => void;
}

export const DestinationExplorer = ({
  destinations,
  allTags,
  isLoading,
  onSelect,
}: DestinationExplorerProps) => {
  const [query, setQuery] = useState('');
  const [activeTags, setActiveTags] = useState<TravelTag[]>([]);
  const debouncedQuery = useDebounce(query, 250);

  const toggleTag = (tag: TravelTag) => {
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    return destinations.filter((d) => {
      const matchesQuery =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.continent.toLowerCase().includes(q);
      const matchesTags = activeTags.length === 0 || activeTags.every((t) => d.tags.includes(t));
      return matchesQuery && matchesTags;
    });
  }, [destinations, debouncedQuery, activeTags]);

  return (
    <section id="explorer" className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
      <div className="mb-12 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-amber-400">
          <Compass className="h-4 w-4" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em]">Destination Explorer</span>
        </div>
        <h2 className="text-balance font-display text-4xl font-medium text-white sm:text-5xl">
          Where will you go next?
        </h2>
        <p className="max-w-2xl text-obsidian-400">
          Ten extraordinary destinations, hand-curated across every continent —
          filter by the experience you're craving.
        </p>
      </div>

      <div className="mb-10">
        <FilterBar
          query={query}
          onQueryChange={setQuery}
          tags={allTags}
          activeTags={activeTags}
          onToggleTag={toggleTag}
          onClearTags={() => setActiveTags([])}
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-obsidian-800 bg-obsidian-900/40 py-20 text-center">
          <SearchX className="mb-4 h-10 w-10 text-obsidian-600" aria-hidden="true" />
          <p className="text-lg font-medium text-obsidian-200">
            No destinations found for "{debouncedQuery || activeTags.join(', ')}"
          </p>
          <p className="mt-1 text-sm text-obsidian-500">Try a different search term or clear your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((destination, i) => (
            <DestinationCard key={destination.id} destination={destination} onSelect={onSelect} index={i} />
          ))}
        </div>
      )}
    </section>
  );
};
