import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, Coins, Languages, MapPin, Sparkles, X } from 'lucide-react';
import type { Destination } from '../types';
import { RemoteImage } from './ui/RemoteImage';
import { FamousPlacesGrid } from './FamousPlacesGrid';
import { WeatherWidget } from './WeatherWidget';

interface DestinationDetailModalProps {
  destination: Destination | null;
  onClose: () => void;
  onPlanTrip: (destination: Destination) => void;
}

export function DestinationDetailModal({ destination, onClose, onPlanTrip }: DestinationDetailModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!destination) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [destination, onClose]);

  return (
    <AnimatePresence>
      {destination && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="destination-modal-title"
        >
          <motion.div
            className="absolute inset-0 bg-obsidian-950/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl border border-obsidian-800 bg-obsidian-950 shadow-editorial sm:rounded-3xl"
          >
            <div className="relative h-64 shrink-0 sm:h-80">
              <RemoteImage
                query={destination.heroImageQuery}
                fallback={destination.fallbackHeroImage}
                alt={destination.name}
                className="h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent" />

              <button
                ref={closeButtonRef}
                onClick={onClose}
                aria-label="Close destination details"
                className="absolute right-4 top-4 rounded-full bg-obsidian-950/60 p-2 text-white backdrop-blur-sm transition hover:bg-obsidian-950/90"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="absolute bottom-5 left-6 right-6">
                <div className="flex items-center gap-2 text-sm text-obsidian-200">
                  <span className="text-lg leading-none">{destination.flag}</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {destination.country} · {destination.continent}
                  </span>
                </div>
                <h2
                  id="destination-modal-title"
                  className="mt-1 font-display text-3xl font-medium text-white sm:text-4xl"
                >
                  {destination.name}
                </h2>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
              <p className="text-balance text-lg leading-relaxed text-obsidian-200">{destination.overview}</p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <InfoChip icon={Calendar} label="Best Season" value={destination.bestSeason} />
                <InfoChip icon={Coins} label="Currency" value={destination.currency} />
                <InfoChip icon={Languages} label="Language" value={destination.language} />
                <InfoChip icon={MapPin} label="Timezone" value={destination.timezone} />
              </div>

              <div className="mt-8">
                <WeatherWidget
                  locationName={destination.name}
                  coordinates={destination.coordinates}
                  avgTemp={destination.avgTemp}
                />
              </div>

              <div className="mt-10">
                <h3 className="mb-4 font-display text-2xl font-medium text-white">Notable Places</h3>
                <FamousPlacesGrid places={destination.places} />
              </div>

              <button
                onClick={() => onPlanTrip(destination)}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-amber-400 py-3.5 text-sm font-semibold uppercase tracking-wide text-obsidian-950 shadow-glow-amber transition hover:bg-amber-300"
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Plan My Trip with AI
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function InfoChip({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Calendar;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-obsidian-800 bg-obsidian-900/60 p-3">
      <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-obsidian-500">
        <Icon className="h-3 w-3" aria-hidden="true" />
        {label}
      </div>
      <p className="mt-1 truncate text-sm font-medium text-obsidian-100" title={value}>
        {value}
      </p>
    </div>
  );
}
