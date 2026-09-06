import type { ChatMessage, Itinerary, ItineraryDay, ItineraryRequest, ItinerarySlot, Place, Destination } from '../types';
import { destinations } from '../data/destinations';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GEMINI_KEY;
const MODEL = 'gemini-2.0-flash';
const BASE_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

const SYSTEM_PROMPT = `You are "Aura," a warm, knowledgeable, expert travel assistant embedded in a luxury travel exploration app called Aura Voyage.

You can help with absolutely any travel question, including:
- Destination recommendations and comparisons
- Budgets, best times to visit, safety, and local etiquette
- Specific named places, neighborhoods, restaurants, and hidden gems within a destination
- Full custom itineraries — if the user asks for an itinerary or trip plan for a place (e.g. "itinerary for Goa", "plan me 3 days in Kyoto", or even a misspelled "itinary of goa"), build a real day-by-day plan directly in this chat, with Morning / Afternoon / Evening sections, using specific, real, named venues, landmarks, restaurants, and neighborhoods — never generic placeholders like "a local café" or "a nearby temple." Tailor the plan to any duration, style, or budget the user mentions, defaulting to a well-rounded 3-day plan if unspecified.

Always give a fresh, specific, personalized answer based on exactly what the user asked and which destination they named — never fall back to one repeated generic script regardless of the place mentioned.
Keep answers conversational and well-organized. Use markdown (headers, bold, bullet points) freely for itineraries and structured answers; keep simpler questions concise (~150 words) unless the user asks for depth.
Never invent unsafe or illegal advice.`;

async function callGemini(contents: unknown[], systemInstruction?: string, generationConfig?: Record<string, unknown>) {
  if (!API_KEY) {
    console.error('[geminiService] No Gemini API key found (VITE_GEMINI_API_KEY is unset) — using offline fallback.');
    throw new Error('missing-key');
  }

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        ...(systemInstruction
          ? { systemInstruction: { parts: [{ text: systemInstruction }] } }
          : {}),
        ...(generationConfig ? { generationConfig } : {}),
      }),
    });
  } catch (networkErr) {
    console.error('[geminiService] Network error calling Gemini API:', networkErr);
    throw networkErr instanceof Error ? networkErr : new Error('network-error');
  }

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    console.error(`[geminiService] Gemini API responded with an error — status ${res.status}:`, body);
    throw new Error(`Gemini API error: ${res.status} ${body}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    console.error('[geminiService] Gemini API returned no usable text. Full response:', data);
    throw new Error('Empty Gemini response');
  }
  return text as string;
}

export async function sendChatMessage(
  history: ChatMessage[],
  newMessage: string
): Promise<string> {
  try {
    const contents = [
      ...history.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      })),
      { role: 'user', parts: [{ text: newMessage }] },
    ];

    return await callGemini(contents, SYSTEM_PROMPT, { temperature: 0.8, maxOutputTokens: 900 });
  } catch (err) {
    console.error('[geminiService] Live chat call failed, using offline fallback reply. Error:', err);
    return fallbackChatReply(newMessage);
  }
}

/** Finds a catalog destination mentioned by name or state in free-form user text. */
function findMentionedDestination(message: string): Destination | undefined {
  const lower = message.toLowerCase();
  return destinations.find(
    (d) => lower.includes(d.name.toLowerCase()) || (d.state && lower.includes(d.state.toLowerCase()))
  );
}

const ITINERARY_INTENT_PATTERN = /itiner|itinary|trip plan|plan (my|a|me) trip|day[- ]by[- ]day|days? in\b/i;

function buildLocalItineraryReply(destination: Destination): string {
  const lines: string[] = [
    `Here's a quick **${destination.name}** itinerary built from real local highlights:`,
    '',
  ];

  const places = destination.places;
  let day = 1;
  for (let i = 0; i < places.length; i += 2) {
    const morning = places[i];
    const afternoon = places[i + 1];
    lines.push(`**Day ${day}**`);
    if (morning) lines.push(`- Morning: **${morning.name}** — ${morning.tip}`);
    if (afternoon) {
      lines.push(`- Afternoon/Evening: **${afternoon.name}** — ${afternoon.tip}`);
    } else {
      lines.push(`- Afternoon: Free time to revisit a favorite spot or explore ${destination.name} at your own pace.`);
    }
    lines.push('');
    day += 1;
  }

  lines.push(`**Best time to go:** ${destination.bestSeason}. **Currency:** ${destination.currency}.`);
  lines.push(
    `\nFor a fully structured day-by-day plan with meal picks, timing, and Google Maps links for every stop, open ${destination.name}'s page and use **Plan My Trip with AI**.`
  );

  return lines.join('\n');
}

function buildDestinationBlurb(destination: Destination): string {
  const topPlaces = destination.places
    .slice(0, 2)
    .map((p) => p.name)
    .join(' and ');

  return `${destination.tagline}\n\n${destination.overview}\n\n**Best time to visit:** ${destination.bestSeason}. **Currency:** ${destination.currency}.${
    topPlaces ? ` Don't miss ${topPlaces}.` : ''
  }\n\nAsk me for a day-by-day itinerary, a budget estimate, or safety tips for ${destination.name} any time.`;
}

function fallbackChatReply(message: string): string {
  const lower = message.toLowerCase();
  const destination = findMentionedDestination(message);

  if (ITINERARY_INTENT_PATTERN.test(lower)) {
    if (destination) return buildLocalItineraryReply(destination);
    return "I'd love to build you an itinerary — which destination is it for? Try naming a place directly, like \"itinerary for Goa\" or \"plan me 3 days in Kyoto,\" or open any destination's page and use the **Plan My Trip with AI** button for a fully structured, printable plan.";
  }

  if (lower.includes('budget') || lower.includes('cost') || lower.includes('cheap') || lower.includes('expensive')) {
    if (destination) {
      return `For **${destination.name}**, plan on roughly **$80–150/day** for a comfortable mid-range trip covering lodging, food, and local transport (paid in ${destination.currency} on the ground). Traveling in the ${destination.bestSeason} shoulder window and eating where locals eat can cut that by 30–40%. Want a full day-by-day budget breakdown? Ask me for an itinerary.`;
    }
    return "For most destinations, aim for **$80–150/day** to travel comfortably — covering lodging, food, and local transport. A few ways to stretch that further: travel in shoulder season, eat where locals eat rather than at tourist-facing spots, and book intercity transport a few weeks ahead. Luxury travelers should budget upward of $300/day for boutique stays and fine dining.";
  }

  if (lower.includes('when') || lower.includes('best time') || lower.includes('season') || lower.includes('weather')) {
    if (destination) {
      return `The best time to visit **${destination.name}** is **${destination.bestSeason}** — that window tends to offer the most reliable weather and thinner crowds. Check the live weather widget on ${destination.name}'s page for the current 5-day outlook.`;
    }
    return "As a rule of thumb, **shoulder seasons** — the few weeks just before or after peak season — tend to offer the best mix of good weather, thinner crowds, and lower prices. Each destination card in the explorer shows a 'Best Season' badge with specifics, and the weather widget gives you a live 5-day outlook once you pick a spot.";
  }

  if (lower.includes('safe') || lower.includes('safety') || lower.includes('scam')) {
    const place = destination ? `**${destination.name}**` : 'most destinations';
    return `${place} ${destination ? 'is' : 'are'} generally very safe for tourists who take normal city precautions. A few habits go a long way: keep digital copies of your passport and bookings, share your itinerary with someone at home, use registered taxis or ride apps rather than hailing on the street, and check your government's travel advisory page a week before departure.`;
  }

  if (lower.includes('etiquette') || lower.includes('culture') || lower.includes('local custom') || lower.includes('tip') || lower.includes('tipping')) {
    if (destination) {
      return `In **${destination.name}** (${destination.language} spoken locally), it's worth reading up on regional customs before you go — dress and temple/religious-site etiquette in particular vary a lot by area. Ask me about a specific situation (dining, religious sites, tipping) and I'll get more specific.`;
    }
    return "Local etiquette varies a lot by region — in much of Asia, a slight bow or two-handed exchange is respectful; in Europe, quiet indoor voices and dressing modestly for religious sites matter; in the Americas, tipping 15–20% at sit-down restaurants is standard. Check the 'Language' and 'Currency' details on a destination's page, and I'm happy to go deeper on any specific place.";
  }

  if (lower.includes('pack') || lower.includes('luggage') || lower.includes('bring')) {
    const climateNote = destination
      ? `${destination.name} runs around ${destination.avgTemp}°C on average, but check the live weather widget on its page for what to actually expect on your dates.`
      : "Pack around the climate shown in each destination's weather widget rather than the season name alone — coastal and alpine destinations can swing 15°C+ within the same month.";
    return `${climateNote} A universal adapter, a light rain layer, and comfortable walking shoes cover most itineraries here, from cobblestone medinas to mountain trails.`;
  }

  if (destination) {
    return buildDestinationBlurb(destination);
  }

  return "I can help with budgets, best times to visit, safety, local etiquette, packing, or a full day-by-day itinerary. Try naming a specific destination — for example, \"What's a good budget for Kyoto?\" or \"itinerary for Goa\" — and I'll tailor the answer.";
}

export interface DestinationProfile {
  tagline: string;
  overview: string;
  bestSeason: string;
  currency: string;
  language: string;
  places: Place[];
}

const PLACE_FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1974&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1974&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1974&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1974&auto=format&fit=crop',
];

const DESTINATION_PROFILE_SCHEMA = {
  type: 'OBJECT',
  properties: {
    tagline: { type: 'STRING' },
    overview: { type: 'STRING' },
    bestSeason: { type: 'STRING' },
    currency: { type: 'STRING' },
    language: { type: 'STRING' },
    places: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          name: { type: 'STRING' },
          category: { type: 'STRING' },
          description: { type: 'STRING' },
          visitDuration: { type: 'STRING' },
          tip: { type: 'STRING' },
        },
        required: ['name', 'category', 'description', 'visitDuration', 'tip'],
      },
    },
  },
  required: ['tagline', 'overview', 'bestSeason', 'currency', 'language', 'places'],
};

const destinationProfileCache = new Map<string, DestinationProfile>();

export async function generateDestinationProfile(name: string, country: string): Promise<DestinationProfile> {
  const cacheKey = `${name.toLowerCase()}|${country.toLowerCase()}`;
  const cached = destinationProfileCache.get(cacheKey);
  if (cached) return cached;

  let profile: DestinationProfile;

  try {
    const prompt = `Generate an editorial travel profile for ${name}, ${country}.
Include a short, evocative one-line tagline; a 2-3 sentence overview capturing its character and appeal; the best season to visit; its primary currency; and its primary spoken language.
Also list 3-4 genuinely notable, real attractions or places to visit there, each with a category, a vivid 1-2 sentence description, an estimated visit duration, and a practical visitor tip.`;

    const text = await callGemini(
      [{ role: 'user', parts: [{ text: prompt }] }],
      'You are a structured JSON travel-profile generator for a travel app. Respond only with valid JSON matching the given schema.',
      { responseMimeType: 'application/json', responseSchema: DESTINATION_PROFILE_SCHEMA, temperature: 0.8 }
    );

    const parsed = JSON.parse(text);
    profile = {
      tagline: parsed.tagline,
      overview: parsed.overview,
      bestSeason: parsed.bestSeason,
      currency: parsed.currency,
      language: parsed.language,
      places: (parsed.places as Array<Record<string, string>>).slice(0, 4).map((p, i) => ({
        id: `${cacheKey}-place-${i}`,
        name: p.name,
        category: p.category,
        description: p.description,
        visitDuration: p.visitDuration,
        tip: p.tip,
        imageQuery: `${p.name}, ${name}, ${country} landmark`,
        fallbackImage: PLACE_FALLBACK_IMAGES[i % PLACE_FALLBACK_IMAGES.length],
      })),
    };
  } catch (err) {
    console.error('[geminiService] Live destination profile call failed, using offline fallback. Error:', err);
    profile = buildFallbackProfile(name, country, cacheKey);
  }

  destinationProfileCache.set(cacheKey, profile);
  return profile;
}

function buildFallbackProfile(name: string, country: string, cacheKey: string): DestinationProfile {
  return {
    tagline: `Discover ${name}`,
    overview: `${name} is a destination in ${country} waiting to be explored — from its local streets and markets to its natural surroundings and hidden viewpoints. Check the live weather above and start planning your visit.`,
    bestSeason: 'Varies — check the live forecast above before you go',
    currency: 'Local currency',
    language: 'Local language',
    places: [
      {
        id: `${cacheKey}-place-0`,
        name: 'Historic Center',
        category: 'Landmark',
        description: `The heart of ${name}, where local life and history intersect.`,
        visitDuration: '1-2 hours',
        tip: 'Ask locals for their favorite nearby spot — it often beats the guidebook picks.',
        imageQuery: `${name}, ${country} landmark`,
        fallbackImage: PLACE_FALLBACK_IMAGES[0],
      },
      {
        id: `${cacheKey}-place-1`,
        name: 'Local Market',
        category: 'Market',
        description: `A lively spot to sample regional food and crafts in ${name}.`,
        visitDuration: '1 hour',
        tip: 'Go with a light appetite and bring some small cash.',
        imageQuery: `${name}, ${country} market`,
        fallbackImage: PLACE_FALLBACK_IMAGES[1],
      },
      {
        id: `${cacheKey}-place-2`,
        name: 'Scenic Viewpoint',
        category: 'Nature',
        description: `A well-loved spot for taking in the surrounding views of ${name}.`,
        visitDuration: '45 minutes',
        tip: 'Best visited near sunrise or sunset for the softest light.',
        imageQuery: `${name}, ${country} scenic view`,
        fallbackImage: PLACE_FALLBACK_IMAGES[2],
      },
    ],
  };
}

const ITINERARY_SCHEMA = {
  type: 'OBJECT',
  properties: {
    summary: { type: 'STRING' },
    days: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          day: { type: 'INTEGER' },
          theme: { type: 'STRING' },
          slots: {
            type: 'ARRAY',
            items: {
              type: 'OBJECT',
              properties: {
                period: { type: 'STRING', enum: ['Morning', 'Afternoon', 'Evening'] },
                mealSuggestion: {
                  type: 'STRING',
                  description:
                    'A real, specific, named restaurant, café, or food stop appropriate for the budget (e.g. "Gunpowder, Assagao — Konkani-inspired tasting plates"). Never a generic category like "a local restaurant."',
                },
                activities: {
                  type: 'ARRAY',
                  items: {
                    type: 'OBJECT',
                    properties: {
                      time: { type: 'STRING' },
                      title: {
                        type: 'STRING',
                        description:
                          'Must name the exact real-world venue or landmark, e.g. "Breakfast at Baba Au Rhum café in Anjuna" or "Explore Fort Aguada and Sinquerim Beach." Never a generic placeholder like "visit a temple" or "go to a café."',
                      },
                      description: { type: 'STRING' },
                      tip: { type: 'STRING' },
                    },
                    required: ['time', 'title', 'description', 'tip'],
                  },
                },
              },
              required: ['period', 'mealSuggestion', 'activities'],
            },
          },
        },
        required: ['day', 'theme', 'slots'],
      },
    },
  },
  required: ['summary', 'days'],
};

const ITINERARY_SYSTEM_INSTRUCTION = `You are a meticulous local travel planner generating a structured JSON itinerary for a travel app. Respond only with valid JSON matching the given schema.

Critical rules — follow these exactly:
- NEVER use vague, generic directives like "visit a temple", "go to a café", "explore a market", "relax at a beach", or "try a local restaurant." Every single activity title and every meal suggestion must name a REAL, specific, well-known, verifiable venue, landmark, restaurant, or neighborhood by its actual proper name.
- Good examples: "Breakfast at Baba Au Rhum café in Anjuna", "Explore Fort Aguada and Sinquerim Beach", "Dinner at Gunpowder in Assagao".
- Bad examples (never do this): "Grab breakfast at a local café", "Visit a nearby fort", "Try some local food."
- Meal suggestions must be a real, specific restaurant, café, or food stop with a short note on its cuisine — not a generic category.
- Weave in realistic local cuisine specifics, approximate opening hours or best time of day, and keep travel between consecutive same-day stops geographically realistic for the destination.`;

export async function generateItinerary(request: ItineraryRequest): Promise<Itinerary> {
  try {
    const prompt = `Create a detailed ${request.duration}-day travel itinerary for ${request.destinationName}.
Traveler profile: ${request.style} travel style, ${request.budget} budget.
For each day, provide a short theme, and Morning/Afternoon/Evening slots each with 1-2 activities at REAL, specific, named venues or landmarks (never generic placeholders), a real named meal suggestion appropriate for the budget, and a practical local tip per activity (timing, booking advice, or a nearby pairing).
Every place you name must be a genuine, well-known real-world location in or near ${request.destinationName} — do not invent fictional venues. Keep descriptions vivid but concise (1-2 sentences each).`;

    const text = await callGemini(
      [{ role: 'user', parts: [{ text: prompt }] }],
      ITINERARY_SYSTEM_INSTRUCTION,
      { responseMimeType: 'application/json', responseSchema: ITINERARY_SCHEMA, temperature: 0.7 }
    );

    const parsed = JSON.parse(text);
    return {
      destinationName: request.destinationName,
      duration: request.duration,
      style: request.style,
      budget: request.budget,
      summary: parsed.summary,
      days: parsed.days,
      generatedAt: Date.now(),
    };
  } catch (err) {
    console.error('[geminiService] Live itinerary call failed, using offline fallback. Error:', err);
    return buildFallbackItinerary(request);
  }
}

const TIME_BY_PERIOD: Record<ItinerarySlot['period'], string> = {
  Morning: '8:00 AM',
  Afternoon: '1:00 PM',
  Evening: '7:00 PM',
};

const budgetMealFallback: Record<ItineraryRequest['budget'], string> = {
  Budget: 'A well-reviewed street food stall or local market counter',
  Moderate: 'A well-reviewed mid-range restaurant nearby',
  Luxury: 'A chef-driven tasting menu restaurant nearby',
};

/** Finds a catalog destination whose name (or state, for Indian entries) matches the requested destination text. */
function findCatalogDestination(destinationName: string): Destination | undefined {
  const lower = destinationName.toLowerCase().trim();
  return destinations.find(
    (d) =>
      d.name.toLowerCase() === lower ||
      lower.includes(d.name.toLowerCase()) ||
      d.name.toLowerCase().includes(lower) ||
      (d.state && (lower === d.state.toLowerCase() || lower.includes(d.state.toLowerCase())))
  );
}

/**
 * Builds a fallback itinerary using REAL named venues from our curated catalog when the
 * requested destination matches one we already know. This keeps offline mode honest and
 * specific instead of falling back to vague, generic activity text.
 */
function buildFallbackItinerary(request: ItineraryRequest): Itinerary {
  const catalogDestination = findCatalogDestination(request.destinationName);
  const tipByStyle =
    request.style === 'Fast-paced'
      ? 'Pre-book tickets online to skip lines and maximize your time.'
      : 'Leave buffer time in your schedule — the best moments are often unplanned.';

  const days: ItineraryDay[] = Array.from({ length: request.duration }).map((_, dayIndex) => {
    const slots: ItinerarySlot[] = (['Morning', 'Afternoon', 'Evening'] as const).map((period, periodIndex) => {
      let title: string;
      let description: string;
      let tip: string;

      if (catalogDestination && catalogDestination.places.length > 0) {
        const place =
          catalogDestination.places[(dayIndex * 3 + periodIndex) % catalogDestination.places.length];
        title = place.name;
        description = place.description;
        tip = place.tip;
      } else {
        title = `${period} exploring ${request.destinationName}`;
        description = `Spend this ${period.toLowerCase()} taking in ${request.destinationName} at your own pace — ask Aura in the chat for specific venue recommendations nearby.`;
        tip = tipByStyle;
      }

      return {
        period,
        mealSuggestion: budgetMealFallback[request.budget],
        activities: [
          {
            time: TIME_BY_PERIOD[period],
            title,
            description,
            tip,
          },
        ],
      };
    });

    return {
      day: dayIndex + 1,
      theme: catalogDestination
        ? `Exploring ${catalogDestination.name}`
        : `Day ${dayIndex + 1} in ${request.destinationName}`,
      slots,
    };
  });

  return {
    destinationName: request.destinationName,
    duration: request.duration,
    style: request.style,
    budget: request.budget,
    summary: `A ${request.duration}-day ${request.style.toLowerCase()} itinerary for ${request.destinationName}, tailored to a ${request.budget.toLowerCase()} budget.`,
    days,
    generatedAt: Date.now(),
  };
}
