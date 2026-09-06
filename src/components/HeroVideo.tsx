import { motion } from 'framer-motion';
import { ChevronDown, Compass } from 'lucide-react';

interface HeroVideoProps {
  onExplore: () => void;
}

const VIDEO_SRC =
  'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-tropical-beach-with-turquoise-water-49933-large.mp4';
const POSTER_SRC =
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop';

export function HeroVideo({ onExplore }: HeroVideoProps) {
  return (
    <section className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden bg-obsidian-950">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={VIDEO_SRC}
        poster={POSTER_SRC}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-950/70 via-obsidian-950/40 to-obsidian-950" />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-obsidian-950/30" />
      <div className="bg-grain absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-amber-200/90 backdrop-blur-sm"
        >
          <Compass className="h-3.5 w-3.5" aria-hidden="true" />
          designesthetics presents
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-balance font-display text-5xl font-medium leading-[1.05] text-white sm:text-6xl md:text-7xl"
        >
          Travel, curated
          <br />
          <span className="italic text-amber-300">by design.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-xl text-balance text-lg font-light leading-relaxed text-obsidian-200 sm:text-xl"
        >
          Discover the world's most extraordinary destinations, live weather at
          a glance, and an AI companion that plans your perfect itinerary —
          all in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10"
        >
          <button
            onClick={onExplore}
            className="group inline-flex items-center gap-2 rounded-full bg-amber-400 px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-obsidian-950 shadow-glow-amber transition hover:bg-amber-300 focus-visible:outline-offset-4"
          >
            Begin Exploring
            <ChevronDown className="h-4 w-4 transition group-hover:translate-y-0.5" aria-hidden="true" />
          </button>
        </motion.div>
      </div>

      <motion.button
        onClick={onExplore}
        aria-label="Scroll to destination explorer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1, duration: 0.6 }, y: { repeat: Infinity, duration: 2, ease: 'easeInOut' } }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 rounded-full p-2 text-white/70 transition hover:text-white"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.button>
    </section>
  );
}
