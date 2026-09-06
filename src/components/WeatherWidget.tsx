import { useEffect, useState } from 'react';
import { Droplets, Wind } from 'lucide-react';
import type { Coordinates, WeatherBundle } from '../types';
import { fetchWeatherByCoords, iconToEmoji } from '../services/weatherService';
import { WeatherSkeleton } from './ui/Skeletons';
import { ErrorBanner } from './ui/ErrorBanner';

interface WeatherWidgetProps {
  locationName: string;
  coordinates: Coordinates;
  avgTemp?: number;
}

export function WeatherWidget({ locationName, coordinates, avgTemp }: WeatherWidgetProps) {
  const [data, setData] = useState<WeatherBundle | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  const load = () => {
    setStatus('loading');
    fetchWeatherByCoords(coordinates, locationName, avgTemp)
      .then((bundle) => {
        setData(bundle);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates.lat, coordinates.lon]);

  if (status === 'loading') return <WeatherSkeleton />;
  if (status === 'error' || !data) {
    return <ErrorBanner message="Couldn't load live weather data." onRetry={load} />;
  }

  const { current, forecast } = data;

  return (
    <div className="rounded-2xl border border-obsidian-800 bg-obsidian-900/60 p-5 backdrop-blur-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-obsidian-400">
            Current weather in {current.location}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-5xl" aria-hidden="true">
              {iconToEmoji(current.condition)}
            </span>
            <span className="font-display text-4xl font-medium text-white">{current.temp}°</span>
            <span className="text-sm text-obsidian-400">feels {current.feelsLike}°</span>
          </div>
          <p className="mt-1 text-sm capitalize text-obsidian-300">{current.description}</p>
        </div>

        <div className="flex flex-col items-end gap-1.5 text-sm text-obsidian-400">
          <span className="flex items-center gap-1.5">
            <Droplets className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
            {current.humidity}%
          </span>
          <span className="flex items-center gap-1.5">
            <Wind className="h-3.5 w-3.5 text-amber-300" aria-hidden="true" />
            {current.windSpeed} km/h
          </span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-5 gap-2 border-t border-obsidian-800 pt-4">
        {forecast.map((day) => (
          <div
            key={day.date}
            className="flex flex-col items-center gap-1 rounded-lg py-2 text-center transition hover:bg-obsidian-800/60"
          >
            <span className="text-[11px] font-medium uppercase text-obsidian-500">{day.dayLabel}</span>
            <span className="text-lg" aria-hidden="true">
              {iconToEmoji(day.condition)}
            </span>
            <span className="text-xs text-obsidian-300">
              <span className="font-semibold text-white">{day.maxTemp}°</span> {day.minTemp}°
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
