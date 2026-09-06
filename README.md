# Aura Voyage — Travel, Curated by Design

**[Live Demo Link](https://your-vercel-deployment-url.vercel.app)**

An immersive, editorial-grade travel exploration platform — combining a
cinematic hero experience, a live destination explorer, real-time weather,
location awareness, and an AI travel assistant with structured itinerary
generation, all wrapped in a luxury, high-craft interface.

---

## Design Philosophy

This project embraces a simple philosophy: travel software should feel
like a design object, not a form. Every surface — the looping
video hero, the warm obsidian/amber/emerald palette, the serif display
type paired with a clean sans body, the glass-blurred overlays, the
staggered Framer Motion reveals — is meant to evoke a boutique travel
magazine rather than a generic booking tool. Motion is used sparingly and
purposefully (page entrances, hover micro-interactions, modal transitions)
so the interface feels alive without feeling noisy. Every async surface
(weather, images, AI responses) is designed to degrade gracefully — the
app is fully usable and visually complete even with zero API keys
configured, via deterministic fallback data and curated imagery.

---

## Core Features

- **Immersive Hero** — Full-screen looping video hero with a gradient
  scrim for AA/AAA text contrast, editorial typography, and a smooth
  scroll-to-explore interaction.
- **Destination Explorer** — Debounced instant search (by name, country,
  or continent) plus multi-select interest filter pills (Beaches,
  Culture, Alpine, Gastronomy, and more), with skeleton loaders and a
  polished empty state.
- **Destination Detail View** — A rich modal per destination with
  overview, best season, currency, language, timezone, live weather, and
  notable places.
- **Notable Places** — Every destination ships with 3–5 hand-written
  attraction cards (photo, category, narrative description, visit
  duration, and a local visitor tip) presented as a horizontally
  scrollable rich card rail — never a bare bullet list.
- **Location Awareness** — A polished, dismissible geolocation prompt
  that explains *why* location is requested, with full state handling
  (prompting, granted, denied, unavailable, error) and a manual
  city-search fallback.
- **Real-Time Weather** — Live current conditions (temperature, feels
  like, humidity, wind) plus a 5-day mini forecast strip via OpenWeather,
  for both the user's location and any selected destination.
- **Dynamic Imagery** — Destination and attraction photography is fetched
  live from Unsplash by keyword, with curated high-res fallback images so
  the UI never shows a broken image icon, key or no key.
- **Aura — AI Travel Assistant** — A floating, docked chat assistant
  powered by Google Gemini that answers questions on budget, timing,
  safety, and etiquette in a warm, concise tone with light markdown
  formatting.
- **AI Itinerary Planner** — A "Plan My Trip" drawer that collects trip
  duration, travel style, and budget, then calls Gemini in strict JSON
  mode to generate a structured day-by-day itinerary — rendered as an
  interactive Morning / Afternoon / Evening timeline with meal
  suggestions and local tips, not chat text. Itineraries can be printed
  or saved to local storage.
- **Edge Cases & Accessibility** — Skeleton loaders throughout, retryable
  error banners, empty-search states, full keyboard support (`Esc` closes
  modals, visible focus rings, ARIA labels on every icon-only control).

---

## Tech Stack

| Layer         | Choice                                                        |
| ------------- | -------------------------------------------------------------- |
| Framework     | React 18 + TypeScript, built with Vite                        |
| Styling       | Tailwind CSS (custom editorial theme, fluid type, glassmorphism) |
| Icons         | Lucide React                                                   |
| Animation     | Framer Motion                                                  |
| Weather       | OpenWeather (Current + Forecast + Geocoding APIs)              |
| Imagery       | Unsplash API (with curated CDN fallbacks)                      |
| AI            | Google Gemini (`gemini-2.0-flash`) — chat & JSON-mode itinerary |
| Video Hero    | Royalty-free HD loop, hosted CDN                                |

---

## Project Structure

```
src/
├── components/          # UI components (Hero, Explorer, Modals, Chat, Itinerary...)
│   └── ui/               # Shared primitives (RemoteImage, Skeletons, Toaster, ErrorBanner)
├── data/                 # Seed catalog of 10 curated destinations
├── hooks/                # useGeolocation, useDebounce, useLocalStorage, useToasts
├── services/             # weatherService, imageService, geminiService
├── types/                # Shared TypeScript interfaces
├── App.tsx               # Application shell & state orchestration
└── main.tsx              # Entry point
```

---

## Local Setup

**Prerequisites:** Node.js 18+ and npm.

```bash
# 1. Clone the repository
git clone https://github.com/Nikitha-git26/Travel-Application.git
cd Travel-Application

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
# then fill in your API keys in .env.local (see below)

# 4. Run the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

> **Note:** The app runs fully without any API keys — every service
> (weather, images, AI chat, itinerary generation) has a graceful,
> deterministic offline fallback so you can explore the full UI
> immediately. Add real keys to unlock live data.

### Environment Variables

Copy `.env.example` to `.env.local` and populate:

| Variable                      | Used For                          | Get a key at                                             |
| ------------------------------ | ---------------------------------- | --------------------------------------------------------- |
| `VITE_GEMINI_API_KEY`         | AI chat + structured itineraries  | https://aistudio.google.com/apikey                        |
| `VITE_OPENWEATHER_API_KEY`    | Live weather + forecast + geocoding | https://home.openweathermap.org/api_keys                |
| `VITE_UNSPLASH_ACCESS_KEY`    | Dynamic destination/attraction photos | https://unsplash.com/developers                        |

`.env` and `.env.local` are git-ignored — never commit real keys.

---

## Build & Deployment

### Production build

```bash
npm run build    # type-checks with tsc, then builds via Vite into dist/
npm run preview  # preview the production build locally
```

### Deploying to Vercel

1. Push this repository to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new) — Vercel
   auto-detects the Vite framework preset (build command `npm run build`,
   output directory `dist`).
3. Add the three environment variables above in **Project Settings →
   Environment Variables**.
4. Deploy. Replace the **Live Demo Link** placeholder at the top of this
   README with your production URL once deployed.

### Deploying to GitHub Pages

1. Set `base: '/Travel-Application/'` in `vite.config.ts` (matching your
   repo name).
2. Build with `npm run build`.
3. Publish the `dist/` folder using your preferred GitHub Pages action
   (e.g. `peaceiris/actions-gh-pages`) or the `gh-pages` npm package.

---

## Author

**Nikitha** — [github.com/Nikitha-git26](https://github.com/Nikitha-git26)

Designed and built as a standalone, production-grade travel exploration
platform.

## Acknowledgements

Destination photography fallbacks are sourced from Unsplash. The hero
background video is a royalty-free aerial loop.
