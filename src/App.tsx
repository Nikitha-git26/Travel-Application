import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { HeroVideo } from './components/HeroVideo';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DestinationExplorer } from './components/DestinationExplorer';
import { DestinationDetailModal } from './components/DestinationDetailModal';
import { ItineraryPlannerModal } from './components/ItineraryPlannerModal';
import { GeolocationPrompt } from './components/GeolocationPrompt';
import { LocalWeatherPanel } from './components/LocalWeatherPanel';
import { TravelAssistantChat } from './components/TravelAssistantChat';
import { Toaster } from './components/ui/Toaster';
import { destinations, allTags } from './data/destinations';
import { useGeolocation } from './hooks/useGeolocation';
import { useToasts } from './hooks/useToasts';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Destination, Itinerary } from './types';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [planningDestination, setPlanningDestination] = useState<Destination | null>(null);
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);

  const geo = useGeolocation();
  const { toasts, push, dismiss } = useToasts();
  const [savedItineraries, setSavedItineraries] = useLocalStorage<Record<string, Itinerary>>(
    'aura-voyage-itineraries',
    {}
  );
  const [lastSavedKey, setLastSavedKey] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowLocationPrompt(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (geo.status === 'granted' || geo.status === 'denied' || geo.status === 'error' || geo.status === 'unavailable') {
      setShowLocationPrompt(false);
    }
    if (geo.status === 'granted') {
      push('success', 'Location shared — showing your local weather.');
    }
    if (geo.status === 'error') {
      push('error', geo.error || 'Could not retrieve your location.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geo.status]);

  const scrollToExplorer = () => {
    document.getElementById('explorer')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSaveItinerary = (itinerary: Itinerary) => {
    const key = `${itinerary.destinationName}-${itinerary.generatedAt}`;
    setSavedItineraries((prev) => ({ ...prev, [key]: itinerary }));
    setLastSavedKey(key);
    push('success', `Itinerary for ${itinerary.destinationName} saved to My Trips.`);
  };

  return (
    <div className="min-h-screen bg-obsidian-950">
      <Navbar onExplore={scrollToExplorer} />
      <HeroVideo onExplore={scrollToExplorer} />

      <GeolocationPrompt
        visible={showLocationPrompt && geo.status === 'idle'}
        onAllow={geo.request}
        onDismiss={geo.dismiss}
      />

      <main>
        <section className="mx-auto max-w-7xl px-6 pt-16 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 flex items-center gap-2 text-amber-400"
          >
            <MapPin className="h-4 w-4" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]">Location Aware</span>
          </motion.div>
          <LocalWeatherPanel status={geo.status} coords={geo.coords} onRequestLocation={geo.request} />
        </section>

        <DestinationExplorer
          destinations={destinations}
          allTags={allTags}
          isLoading={isLoading}
          onSelect={setSelectedDestination}
        />
      </main>

      <Footer />

      <DestinationDetailModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        onPlanTrip={(destination) => {
          setSelectedDestination(null);
          setPlanningDestination(destination);
        }}
      />

      <ItineraryPlannerModal
        destination={planningDestination}
        onClose={() => setPlanningDestination(null)}
        onSave={handleSaveItinerary}
        savedItineraryKey={lastSavedKey}
      />

      <TravelAssistantChat />
      <Toaster toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}
