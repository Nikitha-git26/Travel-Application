/** Converts a two-letter ISO 3166-1 country code (as returned by OpenWeather Geocoding) into its flag emoji. */
export function countryCodeToFlagEmoji(code: string): string {
  if (!code || code.length !== 2) return '🌍';
  const codePoints = [...code.toUpperCase()].map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

/** Resolves a two-letter ISO country code into its full display name, e.g. "IN" -> "India". */
export function countryCodeToName(code: string): string {
  try {
    const displayNames = new Intl.DisplayNames(['en'], { type: 'region' });
    return displayNames.of(code.toUpperCase()) ?? code;
  } catch {
    return code;
  }
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
