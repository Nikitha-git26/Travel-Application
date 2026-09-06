import type React from 'react';

const ACCESS_KEY =
  import.meta.env.VITE_UNSPLASH_ACCESS_KEY || import.meta.env.VITE_UNSPLASH_KEY;
const BASE_URL = 'https://api.unsplash.com';

const cache = new Map<string, string>();

/**
 * Fetches a dynamic image URL for a given query from Unsplash.
 * Falls back to the provided fallback URL when the key is missing,
 * the request fails, or the rate limit is hit — the UI should never
 * show a broken image icon.
 */
export async function fetchImageForQuery(
  query: string,
  fallback: string
): Promise<string> {
  if (!ACCESS_KEY) return fallback;

  const cacheKey = query.toLowerCase().trim();
  if (cache.has(cacheKey)) return cache.get(cacheKey)!;

  try {
    const res = await fetch(
      `${BASE_URL}/search/photos?query=${encodeURIComponent(
        query
      )}&per_page=1&orientation=landscape`,
      {
        headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
      }
    );

    if (!res.ok) throw new Error(`Unsplash error: ${res.status}`);

    const data = await res.json();
    const url: string | undefined = data.results?.[0]?.urls?.regular;
    if (!url) throw new Error('No results');

    cache.set(cacheKey, url);
    return url;
  } catch (err) {
    console.warn('[imageService] falling back to curated image:', err);
    return fallback;
  }
}

export function handleImgError(
  e: React.SyntheticEvent<HTMLImageElement>,
  fallback: string
) {
  const target = e.currentTarget;
  if (target.src !== fallback) {
    target.src = fallback;
  }
}
