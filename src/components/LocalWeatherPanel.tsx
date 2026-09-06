import { useState, type FormEvent } from 'react';
import { Loader2, Navigation, Search } from 'lucide-react';
import type { Coordinates, GeolocationStatus } from '../types';
import { WeatherWidget } from './WeatherWidget';
import { geocodeLocation } from '../services/weatherService';

interface LocalWeatherPanelProps {
  status: GeolocationStatus;
  coords: Coordinates | null;
  onRequestLocation: () => void;
}

export function LocalWeatherPanel({ status, coords, onRequestLocation }: LocalWeatherPanelProps) {
  const [manualQuery, setManualQuery] = useState('');
  const [manualState, setManualState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [manualResult, setManualResult] = useState<{ coords: Coordinates; name: string } | null>(null);

  const handleManualSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!manualQuery.trim()) return;
    setManualState('loading');
    try {
      const result = await geocodeLocation(manualQuery.trim());
      setManualResult({ coords: { lat: result.lat, lon: result.lon }, name: result.name });
      setManualState('idle');
    } catch {
      setManualState('error');
    }
  };

  if (status === 'granted' && coords) {
    return <WeatherWidget locationName="Your Location" coordinates={coords} />;
  }

  if (manualResult) {
    return <WeatherWidget locationName={manualResult.name} coordinates={manualResult.coords} />;
  }

  return (
    <div className="rounded-2xl border border-dashed border-obsidian-800 bg-obsidian-900/40 p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-obsidian-200">
            {status === 'denied' || status === 'unavailable' || status === 'error'
              ? "Location access unavailable — search a city for local weather."
              : 'See weather for where you are right now.'}
          </p>
        </div>
        {status !== 'denied' && status !== 'unavailable' && status !== 'error' && (
          <button
            onClick={onRequestLocation}
            disabled={status === 'prompting'}
            className="flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-obsidian-700 px-4 py-2 text-xs font-medium text-obsidian-200 transition hover:border-amber-400/50 hover:text-amber-200 disabled:opacity-60"
          >
            {status === 'prompting' ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Navigation className="h-3.5 w-3.5" />
            )}
            Use My Location
          </button>
        )}
      </div>

      <form onSubmit={handleManualSearch} className="relative mt-4">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-obsidian-500" />
        <input
          type="text"
          value={manualQuery}
          onChange={(e) => setManualQuery(e.target.value)}
          placeholder="Search a city, e.g. Lisbon"
          aria-label="Search for a city's weather"
          className="w-full rounded-full border border-obsidian-700 bg-obsidian-900 py-2.5 pl-10 pr-24 text-sm text-obsidian-100 placeholder:text-obsidian-500 transition focus:border-amber-400/60"
        />
        <button
          type="submit"
          disabled={manualState === 'loading'}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-obsidian-800 px-3.5 py-1.5 text-xs font-medium text-obsidian-100 transition hover:bg-obsidian-700 disabled:opacity-60"
        >
          {manualState === 'loading' ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : 'Go'}
        </button>
      </form>
      {manualState === 'error' && (
        <p className="mt-2 text-xs text-red-300">Couldn't find that location. Try another search.</p>
      )}
    </div>
  );
}
