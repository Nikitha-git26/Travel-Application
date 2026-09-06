import { useCallback, useState } from 'react';
import type { Coordinates, GeolocationStatus } from '../types';

interface GeolocationState {
  status: GeolocationStatus;
  coords: Coordinates | null;
  error: string | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    status: 'idle',
    coords: null,
    error: null,
  });

  const request = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setState({ status: 'unavailable', coords: null, error: 'Geolocation is not supported by this browser.' });
      return;
    }

    setState((s) => ({ ...s, status: 'prompting' }));

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setState({
          status: 'granted',
          coords: { lat: pos.coords.latitude, lon: pos.coords.longitude },
          error: null,
        });
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setState({ status: 'denied', coords: null, error: 'Location permission was denied.' });
        } else {
          setState({ status: 'error', coords: null, error: err.message || 'Unable to retrieve location.' });
        }
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 5 * 60 * 1000 }
    );
  }, []);

  const dismiss = useCallback(() => {
    setState((s) => (s.status === 'idle' ? { ...s, status: 'denied' } : s));
  }, []);

  return { ...state, request, dismiss };
}
