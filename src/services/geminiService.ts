import type { ChatMessage, Itinerary, ItineraryDay, ItineraryRequest, ItinerarySlot, Place } from '../types';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GEMINI_KEY;
const MODEL = 'gemini-2.0-flash';
const BASE_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

const SYSTEM_PROMPT = `You are "Aura," a warm, concise, expert travel assistant embedded in a luxury travel exploration app called Aura Voyage.
You help travelers with destination advice, budgets, best times to visit, safety, local etiquette, and hidden gems.
Keep answers conversational, well-organized, and no longer than ~150 words unless the user asks for depth.
You may use light markdown (bold, bullet points) for readability. Never invent unsafe or illegal advice.`;

async function callGemini(contents: unknown[], systemInstruction?: string, generationConfig?: Record<string, unknown>) {
  if (!API_KEY) throw new Error('missing-key');

  const res = await fetch(`${BASE_URL}?key=${API_KEY}`, {
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

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Gemini API error: ${res.status} ${body}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Empty Gemini response');
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

    return await callGemini(contents, SYSTEM_PROMPT, { temperature: 0.8, maxOutputTokens: 500 });
  } catch (err) {
    console.warn('[geminiService] chat fallback engaged:', err);
    return fallbackChatReply(newMessage);
  }
}

function fallbackChatReply(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes('budget') || lower.includes('cost') || lower.includes('cheap') || lower.includes('expensive')) {
    return "For most destinations, aim for **$80–150/day** to travel comfortably — covering lodging, food, and local transport. A few ways to stretch that further: travel in shoulder season, eat where locals eat rather than at tourist-facing spots, and book intercity transport a few weeks ahead. Luxury travelers should budget upward of $300/day for boutique stays and fine dining.";
  }

  if (lower.includes('when') || lower.includes('best time') || lower.includes('season') || lower.includes('weather')) {
    return "As a rule of thumb, **shoulder seasons** — the few weeks just before or after peak season — tend to offer the best mix of good weather, thinner crowds, and lower prices. Each destination card in the explorer shows a 'Best Season' badge with specifics, and the weather widget gives you a live 5-day outlook once you pick a spot.";
  }

  if (lower.includes('safe') || lower.includes('safety') || lower.includes('scam')) {
    return "A few habits go a long way: keep digital copies of your passport and bookings, share your itinerary with someone at home, use registered taxis or ride apps rather than hailing on the street, and check your government's travel advisory page a week before departure. Most destinations here are very safe for tourists who take normal city precautions.";
  }

  if (lower.includes('etiquette') || lower.includes('culture') || lower.includes('local custom') || lower.includes('tip') || lower.includes('tipping')) {
    return "Local etiquette varies a lot by region — in much of Asia, a slight bow or two-handed exchange is respectful; in Europe, quiet indoor voices and dressing modestly for religious sites matter; in the Americas, tipping 15–20% at sit-down restaurants is standard. Check the 'Language' and 'Currency' details on a destination's page, and I'm happy to go deeper on any specific place.";
  }

  if (lower.includes('pack') || lower.includes('luggage') || lower.includes('bring')) {
    return "Pack around the climate shown in each destination's weather widget rather than the season name alone — coastal and alpine destinations can swing 15°C+ within the same month. A universal adapter, a light rain layer, and comfortable walking shoes cover most itineraries here, from cobblestone medinas to mountain trails.";
  }

  return "I can help with budgets, best times to visit, safety, local etiquette, packing, or what to prioritize once you're there. Try asking about a specific destination — for example, \"What's a good budget for Kyoto?\" or \"Is Marrakech safe to walk around at night?\" — and I'll tailor the answer.";
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
    console.warn('[geminiService] destination profile fallback engaged:', err);
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
                mealSuggestion: { type: 'STRING' },
                activities: {
                  type: 'ARRAY',
                  items: {
                    type: 'OBJECT',
                    properties: {
                      time: { type: 'STRING' },
                      title: { type: 'STRING' },
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

export async function generateItinerary(request: ItineraryRequest): Promise<Itinerary> {
  try {
    const prompt = `Create a detailed ${request.duration}-day travel itinerary for ${request.destinationName}.
Traveler profile: ${request.style} travel style, ${request.budget} budget.
For each day, provide a short theme, and Morning/Afternoon/Evening slots each with 1-2 concrete activities (real or plausible named places), a meal suggestion, and a practical local tip per activity.
Keep descriptions vivid but concise (1-2 sentences each).`;

    const text = await callGemini(
      [{ role: 'user', parts: [{ text: prompt }] }],
      'You are a structured JSON itinerary generator for a travel app. Respond only with valid JSON matching the given schema.',
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
    console.warn('[geminiService] itinerary fallback engaged:', err);
    return buildFallbackItinerary(request);
  }
}

function buildFallbackItinerary(request: ItineraryRequest): Itinerary {
  const themes = [
    'Arrival & First Impressions',
    'Icons & Landmarks',
    'Local Flavors & Markets',
    'Nature & Slower Pace',
    'Hidden Gems',
    'Culture Deep Dive',
    'Farewell & Final Views',
  ];

  const activityBank: Record<ItinerarySlot['period'], string[]> = {
    Morning: [
      'Wake up early and grab a local breakfast pastry with coffee near your stay.',
      'Visit the most iconic landmark before the crowds arrive.',
      'Take a guided walking tour through the historic quarter.',
    ],
    Afternoon: [
      'Explore the central market for local crafts and street food.',
      'Relax at a scenic viewpoint or waterfront with a packed lunch.',
      'Join a hands-on cultural workshop (cooking, craft, or language).',
    ],
    Evening: [
      'Watch the sunset from a rooftop bar or elevated viewpoint.',
      'Enjoy a leisurely multi-course dinner at a locally loved restaurant.',
      'Stroll through the old town as it lights up for the night.',
    ],
  };

  const budgetMeals: Record<ItineraryRequest['budget'], string> = {
    Budget: 'Street food stalls or a local market counter',
    Moderate: 'A well-reviewed mid-range bistro',
    Luxury: 'A chef-driven tasting menu restaurant',
  };

  const days: ItineraryDay[] = Array.from({ length: request.duration }).map((_, i) => {
    const slots: ItinerarySlot[] = (['Morning', 'Afternoon', 'Evening'] as const).map(
      (period, si) => ({
        period,
        mealSuggestion: budgetMeals[request.budget],
        activities: [
          {
            time: period === 'Morning' ? '8:00 AM' : period === 'Afternoon' ? '1:00 PM' : '7:00 PM',
            title: `${period} in ${request.destinationName}`,
            description: activityBank[period][(i + si) % activityBank[period].length],
            tip:
              request.style === 'Fast-paced'
                ? 'Pre-book tickets online to skip lines and maximize your time.'
                : 'Leave buffer time — the best moments are often unplanned.',
          },
        ],
      })
    );

    return {
      day: i + 1,
      theme: themes[i % themes.length],
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
