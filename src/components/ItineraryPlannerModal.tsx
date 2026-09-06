import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, Sparkles, X } from 'lucide-react';
import type { BudgetLevel, Destination, Itinerary, TravelStyle } from '../types';
import { generateItinerary } from '../services/geminiService';
import { ItineraryView } from './ItineraryView';
import { ErrorBanner } from './ui/ErrorBanner';

interface ItineraryPlannerModalProps {
  destination: Destination | null;
  onClose: () => void;
  onSave: (itinerary: Itinerary) => void;
  savedItineraryKey?: string | null;
}

const STYLES: TravelStyle[] = ['Solo', 'Couple', 'Family', 'Fast-paced', 'Relaxed'];
const BUDGETS: BudgetLevel[] = ['Budget', 'Moderate', 'Luxury'];

export function ItineraryPlannerModal({ destination, onClose, onSave, savedItineraryKey }: ItineraryPlannerModalProps) {
  const [duration, setDuration] = useState(3);
  const [style, setStyle] = useState<TravelStyle>('Couple');
  const [budget, setBudget] = useState<BudgetLevel>('Moderate');
  const [status, setStatus] = useState<'form' | 'loading' | 'ready' | 'error'>('form');
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);

  useEffect(() => {
    if (destination) {
      setStatus('form');
      setItinerary(null);
      setDuration(3);
      setStyle('Couple');
      setBudget('Moderate');
    }
  }, [destination]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (destination) document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [destination, onClose]);

  const handleGenerate = async () => {
    if (!destination) return;
    setStatus('loading');
    try {
      const result = await generateItinerary({
        destinationName: destination.name,
        duration,
        style,
        budget,
      });
      setItinerary(result);
      setStatus('ready');
    } catch {
      setStatus('error');
    }
  };

  const isSaved = itinerary
    ? savedItineraryKey === `${itinerary.destinationName}-${itinerary.generatedAt}`
    : false;

  return (
    <AnimatePresence>
      {destination && (
        <motion.div
          className="fixed inset-0 z-[95] flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Plan my trip"
        >
          <motion.div className="absolute inset-0 bg-obsidian-950/80 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex h-full w-full max-w-2xl flex-col overflow-hidden border-l border-obsidian-800 bg-obsidian-950 shadow-editorial"
          >
            <div className="flex items-center justify-between border-b border-obsidian-800 px-6 py-5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4.5 w-4.5 text-amber-300" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-amber-300">AI Itinerary Planner</p>
                  <h3 className="font-display text-lg font-medium text-white">{destination.name}</h3>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close itinerary planner"
                className="rounded-full p-2 text-obsidian-400 transition hover:bg-obsidian-800 hover:text-obsidian-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {status === 'form' && (
                <div className="flex flex-col gap-8">
                  <div>
                    <label htmlFor="duration-slider" className="mb-3 block text-sm font-medium text-obsidian-200">
                      Trip Duration: <span className="text-amber-300">{duration} {duration === 1 ? 'day' : 'days'}</span>
                    </label>
                    <input
                      id="duration-slider"
                      type="range"
                      min={1}
                      max={10}
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="w-full accent-amber-400"
                    />
                    <div className="mt-1 flex justify-between text-[11px] text-obsidian-500">
                      <span>1 day</span>
                      <span>10 days</span>
                    </div>
                  </div>

                  <fieldset>
                    <legend className="mb-3 text-sm font-medium text-obsidian-200">Travel Style</legend>
                    <div className="flex flex-wrap gap-2">
                      {STYLES.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setStyle(s)}
                          aria-pressed={style === s}
                          className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
                            style === s
                              ? 'border-amber-400 bg-amber-400 text-obsidian-950'
                              : 'border-obsidian-700 text-obsidian-300 hover:border-obsidian-500'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="mb-3 text-sm font-medium text-obsidian-200">Budget</legend>
                    <div className="flex flex-wrap gap-2">
                      {BUDGETS.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setBudget(b)}
                          aria-pressed={budget === b}
                          className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
                            budget === b
                              ? 'border-emerald-400 bg-emerald-400 text-obsidian-950'
                              : 'border-obsidian-700 text-obsidian-300 hover:border-obsidian-500'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <button
                    onClick={handleGenerate}
                    className="mt-4 flex items-center justify-center gap-2 rounded-full bg-amber-400 py-3.5 text-sm font-semibold uppercase tracking-wide text-obsidian-950 shadow-glow-amber transition hover:bg-amber-300"
                  >
                    <Sparkles className="h-4 w-4" />
                    Generate My Itinerary
                  </button>
                </div>
              )}

              {status === 'loading' && (
                <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-amber-300" />
                  <p className="text-sm text-obsidian-400">
                    Aura is crafting your {duration}-day {style.toLowerCase()} itinerary for {destination.name}...
                  </p>
                </div>
              )}

              {status === 'error' && (
                <ErrorBanner
                  message="We couldn't generate your itinerary right now."
                  onRetry={handleGenerate}
                />
              )}

              {status === 'ready' && itinerary && (
                <ItineraryView itinerary={itinerary} onSave={() => onSave(itinerary)} isSaved={isSaved} />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
