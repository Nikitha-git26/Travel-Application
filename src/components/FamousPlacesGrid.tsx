import { motion } from 'framer-motion';
import { Clock, Lightbulb, MapPin } from 'lucide-react';
import type { Place } from '../types';
import { RemoteImage } from './ui/RemoteImage';
import { buildGoogleMapsUrl } from '../utils/geo';

interface FamousPlacesGridProps {
  places: Place[];
  destinationName: string;
}

export function FamousPlacesGrid({ places, destinationName }: FamousPlacesGridProps) {
  return (
    <div className="flex gap-5 overflow-x-auto pb-4 pt-1 [-webkit-overflow-scrolling:touch]" role="list">
      {places.map((place, i) => (
        <motion.article
          key={place.id}
          role="listitem"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="group flex min-w-[280px] max-w-[280px] flex-col overflow-hidden rounded-2xl border border-obsidian-800 bg-obsidian-900 shadow-editorial sm:min-w-[320px] sm:max-w-[320px]"
        >
          <div className="relative h-44 overflow-hidden">
            <RemoteImage
              query={place.imageQuery}
              fallback={place.fallbackImage}
              alt={place.name}
              className="h-full w-full"
              imgClassName="transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute left-3 top-3 rounded-full bg-obsidian-950/70 px-2.5 py-1 text-[11px] font-medium text-amber-200 backdrop-blur-sm">
              {place.category}
            </span>
          </div>

          <div className="flex flex-1 flex-col gap-2.5 p-4">
            <h4 className="font-display text-lg font-medium text-white">{place.name}</h4>
            <p className="line-clamp-3 text-sm leading-relaxed text-obsidian-300">{place.description}</p>

            <div className="mt-auto flex flex-col gap-2 pt-2 text-xs">
              <span className="flex items-center gap-1.5 text-obsidian-400">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {place.visitDuration}
              </span>
              <span className="flex items-start gap-1.5 rounded-lg bg-emerald-950/40 px-2.5 py-1.5 text-emerald-200">
                <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {place.tip}
              </span>
              <a
                href={place.mapsUrl ?? buildGoogleMapsUrl(place.name, destinationName)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${place.name} on Google Maps (opens in a new tab)`}
                className="flex items-center justify-center gap-1.5 rounded-full border border-obsidian-700 py-1.5 font-medium text-obsidian-300 transition hover:border-amber-400/50 hover:text-amber-200"
              >
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                View on Google Maps
              </a>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
