import type {
  Coordinates,
  CurrentWeather,
  ForecastDay,
  WeatherBundle,
  WeatherCondition,
} from '../types';

const API_KEY =
  import.meta.env.VITE_OPENWEATHER_API_KEY || import.meta.env.VITE_OPENWEATHER_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

function mapCondition(main: string): WeatherCondition {
  const key = main.toLowerCase();
  if (key.includes('clear')) return 'clear';
  if (key.includes('cloud')) return 'clouds';
  if (key.includes('drizzle')) return 'drizzle';
  if (key.includes('rain')) return 'rain';
  if (key.includes('thunder')) return 'thunderstorm';
  if (key.includes('snow')) return 'snow';
  if (key.includes('mist') || key.includes('fog') || key.includes('haze')) return 'mist';
  return 'unknown';
}

function dayLabel(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
}

/** Falls back to a deterministic pseudo-random bundle derived from a seed name so the UI never breaks without a live key. */
function buildFallbackWeather(locationName: string, avgTemp = 20): WeatherBundle {
  let seed = 0;
  for (let i = 0; i < locationName.length; i++) seed += locationName.charCodeAt(i);
  const conditions: WeatherCondition[] = ['clear', 'clouds', 'rain', 'clear', 'mist'];
  const condition = conditions[seed % conditions.length];
  const temp = avgTemp + (seed % 7) - 3;

  const current: CurrentWeather = {
    location: locationName,
    country: '',
    temp,
    feelsLike: temp - 1,
    condition,
    description: condition,
    humidity: 45 + (seed % 30),
    windSpeed: 8 + (seed % 12),
    icon: condition,
    fetchedAt: Date.now(),
  };

  const forecast: ForecastDay[] = Array.from({ length: 5 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    const c = conditions[(seed + i) % conditions.length];
    return {
      date: d.toISOString(),
      dayLabel: d.toLocaleDateString('en-US', { weekday: 'short' }),
      minTemp: temp - 4 + (i % 3),
      maxTemp: temp + 3 - (i % 2),
      condition: c,
      description: c,
      icon: c,
    };
  });

  return { current, forecast };
}

export async function geocodeLocation(
  query: string
): Promise<Coordinates & { name: string; country: string }> {
  if (!API_KEY) throw new Error('missing-key');
  const res = await fetch(
    `${GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=1&appid=${API_KEY}`
  );
  if (!res.ok) throw new Error(`Geocoding failed: ${res.status}`);
  const data = await res.json();
  if (!data.length) throw new Error('Location not found');
  return { lat: data[0].lat, lon: data[0].lon, name: data[0].name, country: data[0].country };
}

export async function fetchWeatherByCoords(
  coords: Coordinates,
  fallbackName = 'Your Location',
  avgTemp?: number
): Promise<WeatherBundle> {
  if (!API_KEY) {
    return buildFallbackWeather(fallbackName, avgTemp);
  }

  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(
        `${BASE_URL}/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${API_KEY}`
      ),
      fetch(
        `${BASE_URL}/forecast?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${API_KEY}`
      ),
    ]);

    if (!currentRes.ok || !forecastRes.ok) {
      throw new Error(`Weather API error: ${currentRes.status} / ${forecastRes.status}`);
    }

    const currentJson = await currentRes.json();
    const forecastJson = await forecastRes.json();

    const current: CurrentWeather = {
      location: currentJson.name || fallbackName,
      country: currentJson.sys?.country || '',
      temp: Math.round(currentJson.main?.temp ?? 0),
      feelsLike: Math.round(currentJson.main?.feels_like ?? 0),
      condition: mapCondition(currentJson.weather?.[0]?.main ?? ''),
      description: currentJson.weather?.[0]?.description ?? '',
      humidity: currentJson.main?.humidity ?? 0,
      windSpeed: Math.round((currentJson.wind?.speed ?? 0) * 3.6),
      icon: currentJson.weather?.[0]?.icon ?? '01d',
      fetchedAt: Date.now(),
    };

    const byDay = new Map<string, any[]>();
    for (const entry of forecastJson.list ?? []) {
      const date = entry.dt_txt.split(' ')[0];
      if (!byDay.has(date)) byDay.set(date, []);
      byDay.get(date)!.push(entry);
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const forecast: ForecastDay[] = Array.from(byDay.entries())
      .filter(([date]) => date !== todayStr)
      .slice(0, 5)
      .map(([date, entries]) => {
        const temps = entries.map((e) => e.main.temp);
        const midday =
          entries.find((e: any) => e.dt_txt.includes('12:00:00')) ?? entries[Math.floor(entries.length / 2)];
        return {
          date,
          dayLabel: dayLabel(date),
          minTemp: Math.round(Math.min(...temps)),
          maxTemp: Math.round(Math.max(...temps)),
          condition: mapCondition(midday.weather?.[0]?.main ?? ''),
          description: midday.weather?.[0]?.description ?? '',
          icon: midday.weather?.[0]?.icon ?? '01d',
        };
      });

    return { current, forecast };
  } catch (err) {
    console.warn('[weatherService] falling back to simulated weather:', err);
    return buildFallbackWeather(fallbackName, avgTemp);
  }
}

export function iconToEmoji(condition: WeatherCondition): string {
  switch (condition) {
    case 'clear':
      return '☀️';
    case 'clouds':
      return '☁️';
    case 'rain':
      return '🌧️';
    case 'drizzle':
      return '🌦️';
    case 'thunderstorm':
      return '⛈️';
    case 'snow':
      return '❄️';
    case 'mist':
      return '🌫️';
    default:
      return '🌤️';
  }
}
