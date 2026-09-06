import { useEffect, useMemo, useState } from 'react';
import { Compass, Globe2, KeyRound, SearchX } from 'lucide-react';
import type { Destination, TravelTag } from '../types';
import { FilterBar } from './FilterBar';
import { DestinationCard } from './DestinationCard';
import { CardSkeleton } from './ui/Skeletons';
import { useDebounce } from '../hooks/useDebounce';
import { geocodeLocation, fetchWeatherByCoords } from '../services/weatherService';
import { countryCodeToFlagEmoji, countryCodeToName, slugify } from '../utils/geo';

interface DestinationExplorerProps {
  destinations: Destination[];
  allTags: TravelTag[];
  isLoading: boolean;
  onSelect: (destination: Destination) => void;
}

type DynamicStatus = 'idle' | 'loading' | 'ready' | 'not-found' | 'no-key' | 'error';

const GENERIC_FALLBACK_HERO =
  'https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=2069&auto=format&fit=crop';

async function resolveDynamicDestination(query: string): Promise<Destination> {
  const geo = await geocodeLocation(query);
  const weather = await fetchWeatherByCoords({ lat: geo.lat, lon: geo.lon }, geo.name);
  const countryName = geo.country ? countryCodeToName(geo.country) : '';

  return {
    id: `dynamic-${slugify(geo.name)}-${slugify(geo.country || query)}`,
    name: geo.name,
    country: countryName || 'Unknown',
    flag: geo.country ? countryCodeToFlagEmoji(geo.country) : '🌍',
    tagline: `Live results for ${geo.name}`,
    overview: '',
    bestSeason: '',
    currency: '',
    language: '',
    timezone: '',
    tags: [],
    coordinates: { lat: geo.lat, lon: geo.lon },
    countryCode: geo.country || undefined,
    heroImageQuery: countryName ? `${geo.name}, ${countryName} landmark travel` : `${geo.name} travel`,
    fallbackHeroImage: GENERIC_FALLBACK_HERO,
    avgTemp: weather.current.temp,
    places: [],
    isDynamic: true,
  };
}

export const DestinationExplorer = ({
  destinations,
  allTags,
  isLoading,
  onSelect,
}: DestinationExplorerProps) => {
  const [query, setQuery] = useState('');
  const [activeTags, setActiveTags] = useState<TravelTag[]>([]);
  const debouncedQuery = useDebounce(query, 400);

  const [dynamicStatus, setDynamicStatus] = useState<DynamicStatus>('idle');
  const [dynamicDestination, setDynamicDestination] = useState<Destination | null>(null);

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
        (d.continent ?? '').toLowerCase().includes(q);
      const matchesTags = activeTags.length === 0 || activeTags.every((t) => d.tags.includes(t));
      return matchesQuery && matchesTags;
    });
  }, [destinations, debouncedQuery, activeTags]);

  const shouldSearchGlobally = filtered.length === 0 && activeTags.length === 0 && debouncedQuery.trim().length > 1;

  useEffect(() => {
    if (!shouldSearchGlobally) {
      setDynamicStatus('idle');
      setDynamicDestination(null);
      return;
    }

    let cancelled = false;
    setDynamicStatus('loading');

    resolveDynamicDestination(debouncedQuery.trim())
      .then((destination) => {
        if (cancelled) return;
        setDynamicDestination(destination);
        setDynamicStatus('ready');
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setDynamicDestination(null);
        if (err.message === 'missing-key') setDynamicStatus('no-key');
        else if (err.message === 'Location not found') setDynamicStatus('not-found');
        else setDynamicStatus('error');
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldSearchGlobally, debouncedQuery]);

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
          or search any place on Earth for live weather and AI-generated highlights.
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
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((destination, i) => (
            <DestinationCard key={destination.id} destination={destination} onSelect={onSelect} index={i} />
          ))}
        </div>
      ) : shouldSearchGlobally ? (
        <DynamicSearchResults
          status={dynamicStatus}
          query={debouncedQuery.trim()}
          destination={dynamicDestination}
          onSelect={onSelect}
        />
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-obsidian-800 bg-obsidian-900/40 py-20 text-center">
          <SearchX className="mb-4 h-10 w-10 text-obsidian-600" aria-hidden="true" />
          <p className="text-lg font-medium text-obsidian-200">
            No destinations found for "{debouncedQuery || activeTags.join(', ')}"
          </p>
          <p className="mt-1 text-sm text-obsidian-500">Try a different search term or clear your filters.</p>
        </div>
      )}
    </section>
  );
};

interface DynamicSearchResultsProps {
  status: DynamicStatus;
  query: string;
  destination: Destination | null;
  onSelect: (destination: Destination) => void;
}

function DynamicSearchResults({ status, query, destination, onSelect }: DynamicSearchResultsProps) {
  if (status === 'loading') {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="overflow-hidden rounded-2xl border border-obsidian-800 bg-obsidian-900">
          <div className="h-56 w-full shimmer-bg" />
          <div className="space-y-3 p-5">
            <div className="h-4 w-2/3 rounded shimmer-bg" />
            <div className="h-3 w-1/2 rounded shimmer-bg" />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 py-10 text-center text-obsidian-400 sm:col-span-2">
          <Globe2 className="h-6 w-6 animate-pulse text-amber-400" aria-hidden="true" />
          <p className="text-sm">Searching the world for "{query}"...</p>
        </div>
      </div>
    );
  }

  if (status === 'ready' && destination) {
    return (
      <div>
        <div className="mb-4 flex items-center gap-2 text-xs font-medium text-amber-300">
          <Globe2 className="h-3.5 w-3.5" aria-hidden="true" />
          Not in our curated collection — here's a live result for "{query}"
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <DestinationCard destination={destination} onSelect={onSelect} index={0} />
        </div>
      </div>
    );
  }

  if (status === 'no-key') {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-obsidian-800 bg-obsidian-900/40 py-20 text-center">
        <KeyRound className="mb-4 h-10 w-10 text-obsidian-600" aria-hidden="true" />
        <p className="text-lg font-medium text-obsidian-200">"{query}" isn't in our curated collection</p>
        <p className="mt-1 max-w-sm text-sm text-obsidian-500">
          Global search needs an OpenWeather API key configured to look up new places. Try one of our ten
          curated destinations in the meantime.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-obsidian-800 bg-obsidian-900/40 py-20 text-center">
      <SearchX className="mb-4 h-10 w-10 text-obsidian-600" aria-hidden="true" />
      <p className="text-lg font-medium text-obsidian-200">
        {status === 'not-found'
          ? `We couldn't find a place called "${query}"`
          : `Something went wrong searching for "${query}"`}
      </p>
      <p className="mt-1 text-sm text-obsidian-500">Try checking the spelling or a nearby major city.</p>
    </div>
  );
}
