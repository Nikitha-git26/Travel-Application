export type TravelTag =
  | 'Beaches'
  | 'Culture'
  | 'Alpine'
  | 'Gastronomy'
  | 'Nightlife'
  | 'Wildlife'
  | 'Adventure'
  | 'Wellness'
  | 'History'
  | 'Architecture';

export type Continent =
  | 'Asia'
  | 'Europe'
  | 'Africa'
  | 'North America'
  | 'South America'
  | 'Oceania';

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface Place {
  id: string;
  name: string;
  category: string;
  description: string;
  visitDuration: string;
  tip: string;
  imageQuery: string;
  fallbackImage: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  continent?: Continent;
  flag: string;
  tagline: string;
  overview: string;
  bestSeason: string;
  currency: string;
  language: string;
  timezone: string;
  tags: TravelTag[];
  coordinates: Coordinates;
  heroImageQuery: string;
  fallbackHeroImage: string;
  avgTemp: number;
  places: Place[];
  /** True for destinations resolved live from a search query rather than the curated seed catalog. */
  isDynamic?: boolean;
}

export type WeatherCondition =
  | 'clear'
  | 'clouds'
  | 'rain'
  | 'drizzle'
  | 'thunderstorm'
  | 'snow'
  | 'mist'
  | 'unknown';

export interface CurrentWeather {
  location: string;
  country: string;
  temp: number;
  feelsLike: number;
  condition: WeatherCondition;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  fetchedAt: number;
}

export interface ForecastDay {
  date: string;
  dayLabel: string;
  minTemp: number;
  maxTemp: number;
  condition: WeatherCondition;
  description: string;
  icon: string;
}

export interface WeatherBundle {
  current: CurrentWeather;
  forecast: ForecastDay[];
}

export type GeolocationStatus =
  | 'idle'
  | 'prompting'
  | 'granted'
  | 'denied'
  | 'unavailable'
  | 'error';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: number;
  isError?: boolean;
}

export type TravelStyle = 'Solo' | 'Couple' | 'Family' | 'Fast-paced' | 'Relaxed';

export type BudgetLevel = 'Budget' | 'Moderate' | 'Luxury';

export interface ItineraryRequest {
  destinationName: string;
  duration: number;
  style: TravelStyle;
  budget: BudgetLevel;
}

export interface ItineraryActivity {
  time: string;
  title: string;
  description: string;
  tip: string;
}

export interface ItinerarySlot {
  period: 'Morning' | 'Afternoon' | 'Evening';
  activities: ItineraryActivity[];
  mealSuggestion: string;
}

export interface ItineraryDay {
  day: number;
  theme: string;
  slots: ItinerarySlot[];
}

export interface Itinerary {
  destinationName: string;
  duration: number;
  style: TravelStyle;
  budget: BudgetLevel;
  summary: string;
  days: ItineraryDay[];
  generatedAt: number;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}
