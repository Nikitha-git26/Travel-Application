import { motion } from 'framer-motion';
import { MapPin, Thermometer } from 'lucide-react';
import type { Destination } from '../types';
import { RemoteImage } from './ui/RemoteImage';

interface DestinationCardProps {
  destination: Destination;
  onSelect: (destination: Destination) => void;
  index: number;
}

export function DestinationCard({ destination, onSelect, index }: DestinationCardProps) {
  return (
    <motion.button
      onClick={() => onSelect(destination)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.4), ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-obsidian-800 bg-obsidian-900 text-left shadow-editorial transition hover:-translate-y-1 hover:border-obsidian-600 focus-visible:-translate-y-1"
      aria-label={`View details for ${destination.name}, ${destination.country}`}
    >
      <div className="relative h-56 overflow-hidden">
        <RemoteImage
          query={destination.heroImageQuery}
          fallback={destination.fallbackHeroImage}
          alt={`${destination.name}, ${destination.country}`}
          className="h-full w-full"
          imgClassName="transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/90 via-obsidian-950/10 to-transparent" />

        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-obsidian-950/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
          <Thermometer className="h-3 w-3 text-amber-300" aria-hidden="true" />
          {destination.avgTemp}°C
        </div>

        <div className="absolute bottom-3 left-4 right-4">
          <div className="flex items-center gap-2 text-xs text-obsidian-200">
            <span className="text-base leading-none">{destination.flag}</span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" aria-hidden="true" />
              {destination.country}
            </span>
          </div>
          <h3 className="mt-1 font-display text-2xl font-medium text-white">{destination.name}</h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="line-clamp-2 text-sm leading-relaxed text-obsidian-300">{destination.tagline}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {destination.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-obsidian-700 bg-obsidian-800/60 px-2.5 py-0.5 text-[11px] font-medium text-obsidian-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}
