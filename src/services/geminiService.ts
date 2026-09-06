import type { ChatMessage, Itinerary, ItineraryDay, ItineraryRequest, ItinerarySlot } from '../types';

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
  if (lower.includes('budget') || lower.includes('cost') || lower.includes('cheap')) {
    return "I'm running in offline demo mode right now (no Gemini API key configured), but generally: aim for **$80–150/day** for a comfortable mid-range trip covering lodging, food, and local transport. Traveling in shoulder season and eating where locals eat can cut that by 30–40%.";
  }
  if (lower.includes('when') || lower.includes('best time') || lower.includes('season')) {
    return "I'm currently in offline demo mode (no Gemini API key set), but as a rule of thumb: shoulder seasons (just before/after peak) usually offer the best mix of good weather, thinner crowds, and lower prices. Check each destination's 'Best Season' badge in its detail view for specifics.";
  }
  if (lower.includes('safe') || lower.includes('safety')) {
    return "Offline demo mode is active (add a Gemini API key for live answers), but general safety advice: keep digital copies of documents, share your itinerary with someone at home, use registered transport, and check your government's travel advisory page before departure.";
  }
  return "I'm currently answering in offline demo mode since no Gemini API key is configured. Add `VITE_GEMINI_API_KEY` to your `.env.local` to unlock live, personalized answers about budgets, timing, safety, and local etiquette for any destination.";
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
    summary: `A ${request.duration}-day ${request.style.toLowerCase()} itinerary for ${request.destinationName}, tailored to a ${request.budget.toLowerCase()} budget. (Offline demo mode — add VITE_GEMINI_API_KEY for a live, personalized plan.)`,
    days,
    generatedAt: Date.now(),
  };
}
