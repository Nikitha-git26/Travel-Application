import { motion } from 'framer-motion';
import { Clock, Lightbulb, Sunrise, Sunset, Sun, Utensils, Printer, Save } from 'lucide-react';
import type { Itinerary, ItinerarySlot } from '../types';

interface ItineraryViewProps {
  itinerary: Itinerary;
  onSave: () => void;
  isSaved?: boolean;
}

const PERIOD_ICON: Record<ItinerarySlot['period'], typeof Sunrise> = {
  Morning: Sunrise,
  Afternoon: Sun,
  Evening: Sunset,
};

const PERIOD_COLOR: Record<ItinerarySlot['period'], string> = {
  Morning: 'text-amber-300 bg-amber-400/10 border-amber-400/20',
  Afternoon: 'text-emerald-300 bg-emerald-400/10 border-emerald-400/20',
  Evening: 'text-indigo-300 bg-indigo-400/10 border-indigo-400/20',
};

export function ItineraryView({ itinerary, onSave, isSaved }: ItineraryViewProps) {
  const handlePrint = () => window.print();

  return (
    <div className="flex flex-col gap-8" id="itinerary-print-area">
      <div className="rounded-2xl border border-obsidian-800 bg-obsidian-900/60 p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-300">
          {itinerary.duration}-Day {itinerary.style} Itinerary · {itinerary.budget} Budget
        </p>
        <h3 className="mt-1 font-display text-2xl font-medium text-white">{itinerary.destinationName}</h3>
        <p className="mt-2 text-sm leading-relaxed text-obsidian-300">{itinerary.summary}</p>

        <div className="mt-4 flex flex-wrap gap-2 print:hidden">
          <button
            onClick={onSave}
            className="flex items-center gap-1.5 rounded-full border border-obsidian-700 px-3.5 py-1.5 text-xs font-medium text-obsidian-200 transition hover:border-amber-400/50 hover:text-amber-200"
          >
            <Save className="h-3.5 w-3.5" />
            {isSaved ? 'Saved to My Trips' : 'Save Itinerary'}
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 rounded-full border border-obsidian-700 px-3.5 py-1.5 text-xs font-medium text-obsidian-200 transition hover:border-obsidian-500 hover:text-obsidian-100"
          >
            <Printer className="h-3.5 w-3.5" />
            Print / Export
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        {itinerary.days.map((day, di) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: di * 0.05 }}
            className="relative"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-400 text-sm font-bold text-obsidian-950">
                {day.day}
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-obsidian-500">Day {day.day}</p>
                <h4 className="font-display text-lg font-medium text-white">{day.theme}</h4>
              </div>
            </div>

            <div className="ml-4 space-y-4 border-l border-obsidian-800 pl-6">
              {day.slots.map((slot) => {
                const Icon = PERIOD_ICON[slot.period];
                return (
                  <div key={slot.period} className="relative">
                    <div
                      className={`absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full border ${PERIOD_COLOR[slot.period]}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    </div>

                    <div className="rounded-2xl border border-obsidian-800 bg-obsidian-900/60 p-4">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                        <span className="text-sm font-semibold text-white">{slot.period}</span>
                      </div>

                      <div className="mt-3 space-y-3">
                        {slot.activities.map((activity, ai) => (
                          <div key={ai} className="border-t border-obsidian-800/70 pt-3 first:border-t-0 first:pt-0">
                            <div className="flex items-center gap-2 text-xs font-medium text-obsidian-500">
                              <Clock className="h-3 w-3" />
                              {activity.time}
                            </div>
                            <p className="mt-1 text-sm font-medium text-obsidian-100">{activity.title}</p>
                            <p className="mt-1 text-sm leading-relaxed text-obsidian-400">{activity.description}</p>
                            <p className="mt-2 flex items-start gap-1.5 text-xs text-emerald-300">
                              <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                              {activity.tip}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-obsidian-800/60 px-3 py-2 text-xs text-obsidian-300">
                        <Utensils className="h-3.5 w-3.5 text-obsidian-500" />
                        Suggested: {slot.mealSuggestion}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
