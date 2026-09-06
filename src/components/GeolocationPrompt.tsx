import { AnimatePresence, motion } from 'framer-motion';
import { MapPin, X } from 'lucide-react';

interface GeolocationPromptProps {
  visible: boolean;
  onAllow: () => void;
  onDismiss: () => void;
}

export function GeolocationPrompt({ visible, onAllow, onDismiss }: GeolocationPromptProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-label="Location permission request"
          className="fixed left-1/2 top-4 z-[90] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 rounded-2xl border border-obsidian-700 bg-obsidian-900/95 p-4 shadow-editorial backdrop-blur-md sm:top-6"
        >
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-amber-400/15 p-2 text-amber-300">
              <MapPin className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">Personalize your experience?</p>
              <p className="mt-0.5 text-sm text-obsidian-400">
                Share your location to see live weather and nearby destination
                recommendations. You can always search manually instead.
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={onAllow}
                  className="rounded-full bg-amber-400 px-4 py-1.5 text-xs font-semibold text-obsidian-950 transition hover:bg-amber-300"
                >
                  Share Location
                </button>
                <button
                  onClick={onDismiss}
                  className="rounded-full border border-obsidian-700 px-4 py-1.5 text-xs font-medium text-obsidian-300 transition hover:border-obsidian-500 hover:text-obsidian-100"
                >
                  Not Now
                </button>
              </div>
            </div>
            <button
              onClick={onDismiss}
              aria-label="Dismiss location prompt"
              className="rounded-full p-1 text-obsidian-500 transition hover:bg-obsidian-800 hover:text-obsidian-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
