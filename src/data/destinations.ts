import type { Destination } from '../types';

export const destinations: Destination[] = [
  {
    id: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    continent: 'Asia',
    flag: '🇯🇵',
    tagline: 'Temples, tea rituals, and a thousand shades of autumn',
    overview:
      "Kyoto is Japan's cultural soul — a city of over 1,600 Buddhist temples, 400 Shinto shrines, geisha-lined alleys, and manicured gardens that shift character with every season. It rewards slow travel: quiet mornings in bamboo groves, unhurried kaiseki dinners, and evenings spent watching lanterns flicker along the Kamo River.",
    bestSeason: 'March–May & October–November',
    currency: 'Japanese Yen (JPY)',
    language: 'Japanese',
    timezone: 'GMT+9',
    tags: ['Culture', 'History', 'Gastronomy', 'Architecture'],
    coordinates: { lat: 35.0116, lon: 135.7681 },
    heroImageQuery: 'kyoto temple autumn',
    fallbackHeroImage:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1974&auto=format&fit=crop',
    avgTemp: 16,
    places: [
      {
        id: 'fushimi-inari',
        name: 'Fushimi Inari Taisha',
        category: 'Shrine',
        description:
          'Wander beneath thousands of vermillion torii gates that snake up Mount Inari, each donated by a business seeking fortune. The higher you climb, the quieter and more mystical the forest trail becomes.',
        visitDuration: '2–3 hours',
        tip: 'Arrive before 7 AM to have the lower gates almost entirely to yourself.',
        imageQuery: 'fushimi inari torii gates',
        fallbackImage:
          'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'arashiyama',
        name: 'Arashiyama Bamboo Grove',
        category: 'Natural Landmark',
        description:
          'Towering bamboo stalks filter sunlight into a soft green glow while the stalks creak and sway overhead. Pair it with a rickshaw ride or the nearby Tenryu-ji temple gardens.',
        visitDuration: '1–2 hours',
        tip: 'Visit at dawn or dusk to avoid tour groups and hear the famous "bamboo hum."',
        imageQuery: 'arashiyama bamboo grove',
        fallbackImage:
          'https://images.unsplash.com/photo-1503424886307-b090341d25d1?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'kinkakuji',
        name: 'Kinkaku-ji (Golden Pavilion)',
        category: 'Temple',
        description:
          'A Zen retreat sheathed entirely in gold leaf, mirrored perfectly in the still pond before it. It is one of the most photographed structures in Japan for good reason.',
        visitDuration: '45–60 minutes',
        tip: 'The reflection is sharpest on windless mornings, right after opening.',
        imageQuery: 'kinkakuji golden pavilion',
        fallbackImage:
          'https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'gion-district',
        name: 'Gion District',
        category: 'Historic Neighborhood',
        description:
          'Cobblestone lanes lined with wooden machiya townhouses, teahouses, and — if you are lucky — a geiko or maiko gliding to an evening appointment.',
        visitDuration: '1.5–2 hours',
        tip: 'Respect the "no photography" signs on private alleys like Ninen-zaka.',
        imageQuery: 'gion district kyoto street',
        fallbackImage:
          'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=1974&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 'amalfi-coast',
    name: 'Amalfi Coast',
    country: 'Italy',
    continent: 'Europe',
    flag: '🇮🇹',
    tagline: 'Pastel cliffs, lemon groves, and the bluest water in Europe',
    overview:
      "A UNESCO-listed ribbon of coastline where pastel villages tumble down cliffs into the Tyrrhenian Sea. Expect switchback drives with sweeping views, limoncello at every turn, and some of Italy's finest seafood served feet from the water.",
    bestSeason: 'May–June & September–October',
    currency: 'Euro (EUR)',
    language: 'Italian',
    timezone: 'GMT+1',
    tags: ['Beaches', 'Gastronomy', 'Culture'],
    coordinates: { lat: 40.6333, lon: 14.6029 },
    heroImageQuery: 'amalfi coast cliffside village',
    fallbackHeroImage:
      'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?q=80&w=1974&auto=format&fit=crop',
    avgTemp: 20,
    places: [
      {
        id: 'positano',
        name: 'Positano',
        category: 'Village',
        description:
          'Vertical streets, bougainvillea-draped balconies, and a black-sand beach anchor this postcard village — arguably the most photographed on the coast.',
        visitDuration: 'Half day',
        tip: 'Wear proper walking shoes; the town is essentially a staircase carved into a cliff.',
        imageQuery: 'positano village cliffside',
        fallbackImage:
          'https://images.unsplash.com/photo-1533760881669-1c8788ed6ecd?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'path-of-gods',
        name: 'Path of the Gods',
        category: 'Hiking Trail',
        description:
          'A legendary coastal trail tracing the cliffs between Bomerano and Nocelle, delivering uninterrupted views over the Li Galli islands and the sea below.',
        visitDuration: '3–4 hours',
        tip: 'Start early — shade is scarce and the trail gets hot by midday.',
        imageQuery: 'path of the gods amalfi hiking',
        fallbackImage:
          'https://images.unsplash.com/photo-1518182170546-07661fd94144?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'ravello',
        name: 'Ravello Gardens',
        category: 'Historic Villa',
        description:
          'Perched higher than its coastal neighbors, Ravello offers the Villa Cimbrone and Villa Rufolo — clifftop gardens with infinity views that inspired Wagner.',
        visitDuration: '2 hours',
        tip: 'Time your visit for a summer evening concert at Villa Rufolo.',
        imageQuery: 'ravello villa cimbrone garden',
        fallbackImage:
          'https://images.unsplash.com/photo-1612698093158-e07ac200d44e?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'amalfi-cathedral',
        name: "Amalfi's Duomo",
        category: 'Cathedral',
        description:
          'A striking Arab-Norman cathedral guarding the main piazza, reached by a dramatic staircase and housing the relics of St. Andrew.',
        visitDuration: '45 minutes',
        tip: 'The adjoining Cloister of Paradise is a quiet, underrated escape from the crowds.',
        imageQuery: 'amalfi cathedral duomo',
        fallbackImage:
          'https://images.unsplash.com/photo-1543832923-44667a44c804?q=80&w=1974&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 'cape-town',
    name: 'Cape Town',
    country: 'South Africa',
    continent: 'Africa',
    flag: '🇿🇦',
    tagline: 'Where a flat-topped mountain meets two oceans',
    overview:
      'Cape Town layers dramatic geography, colonial and Apartheid-era history, and a booming culinary and wine scene into one compact peninsula. Table Mountain looms over a city that moves fluidly between surf beaches, vineyard valleys, and vibrant townships.',
    bestSeason: 'November–March',
    currency: 'South African Rand (ZAR)',
    language: 'English, Afrikaans, isiXhosa',
    timezone: 'GMT+2',
    tags: ['Adventure', 'Wildlife', 'Gastronomy', 'History'],
    coordinates: { lat: -33.9249, lon: 18.4241 },
    heroImageQuery: 'cape town table mountain',
    fallbackHeroImage:
      'https://images.unsplash.com/photo-1580060839134-75a50c72acf7?q=80&w=1974&auto=format&fit=crop',
    avgTemp: 18,
    places: [
      {
        id: 'table-mountain',
        name: 'Table Mountain',
        category: 'Natural Landmark',
        description:
          'A cable car or a multi-hour hike delivers you to a flat summit with 360-degree views over the city, the Atlantic, and Robben Island.',
        visitDuration: '2–4 hours',
        tip: 'Book the cableway online to skip the line, and check the "tablecloth" cloud forecast first.',
        imageQuery: 'table mountain cape town cable car',
        fallbackImage:
          'https://images.unsplash.com/photo-1576485375217-d6a95e34d043?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'cape-point',
        name: 'Cape Point & Boulders Beach',
        category: 'Nature Reserve',
        description:
          'Rugged cliffs at the tip of the peninsula give way to Boulders Beach, home to a colony of wild African penguins that waddle freely among sunbathers.',
        visitDuration: 'Half day',
        tip: 'Keep a respectful distance from the penguins — fines apply for close contact.',
        imageQuery: 'boulders beach penguins south africa',
        fallbackImage:
          'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'robben-island',
        name: 'Robben Island',
        category: 'Historic Site',
        description:
          "A former political prison where Nelson Mandela was held for 18 years, now a UNESCO World Heritage Site led by tours from former inmates themselves.",
        visitDuration: '3.5 hours (incl. ferry)',
        tip: 'Reserve tickets days in advance — tours sell out quickly, especially in peak season.',
        imageQuery: 'robben island prison',
        fallbackImage:
          'https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'winelands',
        name: 'Stellenbosch Winelands',
        category: 'Wine Region',
        description:
          "Oak-lined avenues and Cape Dutch estates an hour from the city produce some of the world's best value Chenin Blanc and Pinotage.",
        visitDuration: 'Full day',
        tip: 'Book a designated driver or a wine-tram tour — tastings add up fast.',
        imageQuery: 'stellenbosch winelands vineyard',
        fallbackImage:
          'https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1974&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 'banff',
    name: 'Banff',
    country: 'Canada',
    continent: 'North America',
    flag: '🇨🇦',
    tagline: 'Turquoise lakes cradled by the Canadian Rockies',
    overview:
      "Canada's first national park delivers glacier-fed lakes in impossible shades of blue-green, snow-capped peaks, and wildlife-rich valleys. It's equally stunning under summer wildflowers or a thick winter blanket of snow.",
    bestSeason: 'June–September & December–March',
    currency: 'Canadian Dollar (CAD)',
    language: 'English',
    timezone: 'GMT-7',
    tags: ['Alpine', 'Adventure', 'Wildlife'],
    coordinates: { lat: 51.4968, lon: -115.9281 },
    heroImageQuery: 'banff lake louise mountains',
    fallbackHeroImage:
      'https://images.unsplash.com/photo-1609825488888-3a766db05542?q=80&w=1974&auto=format&fit=crop',
    avgTemp: 8,
    places: [
      {
        id: 'lake-louise',
        name: 'Lake Louise',
        category: 'Alpine Lake',
        description:
          'A glacier-fed lake so vividly turquoise it looks digitally enhanced, framed by the Victoria Glacier and a historic chateau on its shore.',
        visitDuration: '2–3 hours',
        tip: 'Arrive before 7 AM in summer — the parking lot fills by 8.',
        imageQuery: 'lake louise turquoise water',
        fallbackImage:
          'https://images.unsplash.com/photo-1561134643-668f9074a25e?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'moraine-lake',
        name: 'Moraine Lake',
        category: 'Alpine Lake',
        description:
          'Set against the jagged Valley of the Ten Peaks, this is one of the most photographed lakes on Earth, best seen from the Rockpile Trail viewpoint.',
        visitDuration: '1.5–2 hours',
        tip: 'Access is via shuttle only in peak season — book weeks ahead.',
        imageQuery: 'moraine lake valley of ten peaks',
        fallbackImage:
          'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'banff-gondola',
        name: 'Banff Gondola',
        category: 'Scenic Ride',
        description:
          'An 8-minute ride to the summit of Sulphur Mountain, unfolding a panoramic view over six mountain ranges and the townsite below.',
        visitDuration: '1.5 hours',
        tip: 'Sunset rides offer the best light for photography — book the last gondola up.',
        imageQuery: 'banff gondola sulphur mountain',
        fallbackImage:
          'https://images.unsplash.com/photo-1609825488888-8f0b0aca6f4b?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'johnston-canyon',
        name: 'Johnston Canyon',
        category: 'Hiking Trail',
        description:
          'A catwalk trail bolted to canyon walls leads to a series of thundering waterfalls, with an option to continue to the aptly named Ink Pots.',
        visitDuration: '2–3 hours',
        tip: 'In winter, ice-cleats let you continue on to see frozen ice formations.',
        imageQuery: 'johnston canyon waterfall',
        fallbackImage:
          'https://images.unsplash.com/photo-1518623001395-125242310d0c?q=80&w=1974&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 'oaxaca',
    name: 'Oaxaca',
    country: 'Mexico',
    continent: 'North America',
    flag: '🇲🇽',
    tagline: "Mexico's culinary and craft capital, wrapped in colonial color",
    overview:
      "Oaxaca is a UNESCO World Heritage city known for mole so complex it takes days to make, mezcal distilled in ancestral villages, and some of the country's richest indigenous textile and pottery traditions. Its colonial core hums with markets, courtyards, and rooftop mezcalerías.",
    bestSeason: 'October–April',
    currency: 'Mexican Peso (MXN)',
    language: 'Spanish',
    timezone: 'GMT-6',
    tags: ['Gastronomy', 'Culture', 'History'],
    coordinates: { lat: 17.0732, lon: -96.7266 },
    heroImageQuery: 'oaxaca colonial street colorful',
    fallbackHeroImage:
      'https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?q=80&w=1974&auto=format&fit=crop',
    avgTemp: 22,
    places: [
      {
        id: 'monte-alban',
        name: 'Monte Albán',
        category: 'Archaeological Site',
        description:
          'A 2,500-year-old Zapotec capital perched on a leveled mountaintop, with vast plazas, ball courts, and observatories overlooking the valley.',
        visitDuration: '2–3 hours',
        tip: 'Bring water and a hat — there is little shade across the main plaza.',
        imageQuery: 'monte alban ruins oaxaca',
        fallbackImage:
          'https://images.unsplash.com/photo-1518638150340-f706e86654de?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'mercado-benito-juarez',
        name: 'Mercado Benito Juárez',
        category: 'Market',
        description:
          'A sensory-overload market of stacked chapulines, fresh mole pastes, handwoven textiles, and quesillo cheese sold by the coil.',
        visitDuration: '1–1.5 hours',
        tip: 'Try the chapulines (chile-lime grasshoppers) — a local delicacy, not a stunt.',
        imageQuery: 'oaxaca market food stalls',
        fallbackImage:
          'https://images.unsplash.com/photo-1601000938259-9fa456c7a9de?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'hierve-el-agua',
        name: 'Hierve el Agua',
        category: 'Natural Landmark',
        description:
          'Petrified mineral waterfalls that appear frozen mid-cascade, alongside natural infinity pools with sweeping valley views.',
        visitDuration: 'Half day',
        tip: 'Combine with a stop at a nearby mezcal palenque on the drive out.',
        imageQuery: 'hierve el agua oaxaca',
        fallbackImage:
          'https://images.unsplash.com/photo-1633321088355-d0f81134ca3b?q=80&w=1974&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 'reykjavik',
    name: 'Reykjavik',
    country: 'Iceland',
    continent: 'Europe',
    flag: '🇮🇸',
    tagline: 'Aurora skies, volcanic coastlines, and geothermal calm',
    overview:
      "The world's northernmost capital is a compact, colorful base for exploring Iceland's otherworldly interior — glaciers, black-sand beaches, geysers, and the Northern Lights dancing overhead for much of the year.",
    bestSeason: 'June–August (midnight sun) & September–March (northern lights)',
    currency: 'Icelandic Króna (ISK)',
    language: 'Icelandic',
    timezone: 'GMT+0',
    tags: ['Adventure', 'Wellness', 'Alpine'],
    coordinates: { lat: 64.1466, lon: -21.9426 },
    heroImageQuery: 'reykjavik northern lights iceland',
    fallbackHeroImage:
      'https://images.unsplash.com/photo-1504829857797-ddff29c27927?q=80&w=1974&auto=format&fit=crop',
    avgTemp: 6,
    places: [
      {
        id: 'blue-lagoon',
        name: 'Blue Lagoon',
        category: 'Geothermal Spa',
        description:
          'Milky-blue mineral-rich waters set against black lava fields, warmed year-round by geothermal energy — a surreal soak regardless of season.',
        visitDuration: '2–3 hours',
        tip: 'Book a slot near sunset in winter for a chance at spotting the aurora from the water.',
        imageQuery: 'blue lagoon iceland',
        fallbackImage:
          'https://images.unsplash.com/photo-1531168556467-80aace0d0144?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'golden-circle',
        name: 'The Golden Circle',
        category: 'Scenic Route',
        description:
          'A loop connecting Þingvellir National Park (where two tectonic plates meet), the Geysir geothermal field, and the thundering Gullfoss waterfall.',
        visitDuration: 'Full day',
        tip: 'Geysir "Strokkur" erupts every 5–10 minutes — have your camera ready and pre-focused.',
        imageQuery: 'gullfoss waterfall iceland',
        fallbackImage:
          'https://images.unsplash.com/photo-1520769945061-0a448c463865?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'hallgrimskirkja',
        name: 'Hallgrímskirkja',
        category: 'Church',
        description:
          "Reykjavik's basalt-column-inspired church tower dominates the skyline and offers the best panoramic city view from its observation deck.",
        visitDuration: '30–45 minutes',
        tip: 'Go up the tower on a clear day for views stretching to Mount Esja.',
        imageQuery: 'hallgrimskirkja church reykjavik',
        fallbackImage:
          'https://images.unsplash.com/photo-1494783367193-149034c05e8f?q=80&w=1974&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 'marrakech',
    name: 'Marrakech',
    country: 'Morocco',
    continent: 'Africa',
    flag: '🇲🇦',
    tagline: 'A maze of souks, riads, and Atlas Mountain sunsets',
    overview:
      'The Red City overwhelms the senses with spice-scented souks, hidden riad courtyards, and the nightly theater of Jemaa el-Fnaa square. Just beyond the medina walls, the Atlas Mountains rise as a dramatic backdrop.',
    bestSeason: 'March–May & September–November',
    currency: 'Moroccan Dirham (MAD)',
    language: 'Arabic, Berber, French',
    timezone: 'GMT+1',
    tags: ['Culture', 'Gastronomy', 'History', 'Architecture'],
    coordinates: { lat: 31.6295, lon: -7.9811 },
    heroImageQuery: 'marrakech medina souk morocco',
    fallbackHeroImage:
      'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=1974&auto=format&fit=crop',
    avgTemp: 24,
    places: [
      {
        id: 'jemaa-el-fnaa',
        name: 'Jemaa el-Fnaa',
        category: 'Public Square',
        description:
          'By day a market of orange juice stands and snake charmers, by night a UNESCO-listed open-air theater of food stalls, storytellers, and musicians.',
        visitDuration: '2+ hours',
        tip: 'Agree on a price before any photo, henna, or performance — bartering is expected.',
        imageQuery: 'jemaa el fnaa marrakech night',
        fallbackImage:
          'https://images.unsplash.com/photo-1553603227-2358aabe821e?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'bahia-palace',
        name: 'Bahia Palace',
        category: 'Palace',
        description:
          'A 19th-century palace of carved cedar ceilings, zellige tilework, and courtyard gardens built to be "the most beautiful" of its time.',
        visitDuration: '1–1.5 hours',
        tip: 'Visit right at opening to photograph the courtyards without crowds.',
        imageQuery: 'bahia palace marrakech tiles',
        fallbackImage:
          'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'majorelle-garden',
        name: 'Jardin Majorelle',
        category: 'Botanical Garden',
        description:
          'A cobalt-blue villa surrounded by cacti, bamboo, and koi ponds, once owned by Yves Saint Laurent — a cool, tranquil escape from the medina.',
        visitDuration: '1 hour',
        tip: 'Buy timed tickets online to skip the frequently long entry line.',
        imageQuery: 'jardin majorelle blue garden',
        fallbackImage:
          'https://images.unsplash.com/photo-1553162501-cbf9578671b3?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'atlas-mountains',
        name: 'Atlas Mountains Day Trip',
        category: 'Mountain Range',
        description:
          'Berber villages, waterfalls, and terraced valleys just an hour from the city, offering a dramatic contrast to the desert heat of Marrakech.',
        visitDuration: 'Full day',
        tip: 'Hire a local Berber guide for authentic village visits and mint tea stops.',
        imageQuery: 'atlas mountains morocco village',
        fallbackImage:
          'https://images.unsplash.com/photo-1548262046-9f1e5259f5f8?q=80&w=1974&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    continent: 'Europe',
    flag: '🇬🇷',
    tagline: 'Whitewashed cliffs suspended above a volcanic caldera',
    overview:
      'Born from a colossal volcanic eruption, Santorini balances white cubist villages on the rim of a submerged caldera. It delivers some of the most iconic sunsets in the world, alongside standout wineries grown in volcanic ash.',
    bestSeason: 'April–June & September–October',
    currency: 'Euro (EUR)',
    language: 'Greek',
    timezone: 'GMT+2',
    tags: ['Beaches', 'Culture', 'Gastronomy'],
    coordinates: { lat: 36.3932, lon: 25.4615 },
    heroImageQuery: 'santorini oia sunset blue domes',
    fallbackHeroImage:
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1974&auto=format&fit=crop',
    avgTemp: 21,
    places: [
      {
        id: 'oia-village',
        name: 'Oia Village',
        category: 'Village',
        description:
          'Blue-domed churches and cave houses cling to the caldera rim, culminating in the most photographed sunset viewpoint in the Aegean.',
        visitDuration: '2–3 hours',
        tip: 'Claim a spot at the castle ruins 45 minutes before sunset — it fills up fast.',
        imageQuery: 'oia village blue domes',
        fallbackImage:
          'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'fira-caldera-walk',
        name: 'Fira to Oia Caldera Walk',
        category: 'Hiking Trail',
        description:
          'A 10km clifftop trail linking the island’s main towns with uninterrupted caldera views, volcanic rock formations, and quiet chapels.',
        visitDuration: '3–4 hours',
        tip: 'Start at sunrise to avoid the midday heat and tour-bus crowds.',
        imageQuery: 'santorini caldera hiking trail',
        fallbackImage:
          'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'akrotiri',
        name: 'Akrotiri Archaeological Site',
        category: 'Archaeological Site',
        description:
          'A remarkably preserved Bronze Age settlement buried by volcanic ash, often called the "Minoan Pompeii," with multi-story buildings still standing.',
        visitDuration: '1.5 hours',
        tip: 'Visit midday — the excavation is covered and offers shaded relief from the sun.',
        imageQuery: 'akrotiri ruins santorini',
        fallbackImage:
          'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1974&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 'queenstown',
    name: 'Queenstown',
    country: 'New Zealand',
    continent: 'Oceania',
    flag: '🇳🇿',
    tagline: "The adventure capital, cradled by the Southern Alps",
    overview:
      'Set on the shores of Lake Wakatipu beneath The Remarkables mountain range, Queenstown is the birthplace of commercial bungee jumping and a launchpad for jet boating, skiing, and some of the most cinematic landscapes on Earth.',
    bestSeason: 'December–February (summer) & June–August (ski season)',
    currency: 'New Zealand Dollar (NZD)',
    language: 'English, Māori',
    timezone: 'GMT+12',
    tags: ['Adventure', 'Alpine', 'Wildlife'],
    coordinates: { lat: -45.0312, lon: 168.6626 },
    heroImageQuery: 'queenstown lake wakatipu mountains',
    fallbackHeroImage:
      'https://images.unsplash.com/photo-1589871173980-5c353e9e6c68?q=80&w=1974&auto=format&fit=crop',
    avgTemp: 12,
    places: [
      {
        id: 'skyline-gondola',
        name: 'Skyline Gondola',
        category: 'Scenic Ride',
        description:
          'A steep gondola climbs to Bob’s Peak for panoramic views of the lake and Remarkables, with luge tracks and a restaurant at the summit.',
        visitDuration: '1.5–2 hours',
        tip: 'Ride up for sunset and stay for the luge — it runs after dark, lit by floodlights.',
        imageQuery: 'skyline gondola queenstown',
        fallbackImage:
          'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'milford-sound',
        name: 'Milford Sound Day Trip',
        category: 'Fjord',
        description:
          'A dramatic fjord of sheer cliffs, cascading waterfalls, and resident fur seals and dolphins, best experienced on a scenic cruise.',
        visitDuration: 'Full day',
        tip: 'Book the earliest cruise slot — the fjord gets crowded and cloudier by afternoon.',
        imageQuery: 'milford sound fjord new zealand',
        fallbackImage:
          'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'kawarau-bridge',
        name: 'Kawarau Gorge Bridge',
        category: 'Adventure Sport',
        description:
          "The original commercial bungee site, where jumpers plunge 43 meters toward the turquoise Kawarau River from a historic suspension bridge.",
        visitDuration: '1–2 hours',
        tip: 'Even non-jumpers should visit — the viewing deck and gorge scenery are worth it alone.',
        imageQuery: 'kawarau gorge bridge bungee',
        fallbackImage:
          'https://images.unsplash.com/photo-1589871173980-2b3ac96e2b1c?q=80&w=1974&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 'rio-de-janeiro',
    name: 'Rio de Janeiro',
    country: 'Brazil',
    continent: 'South America',
    flag: '🇧🇷',
    tagline: 'Samba rhythms between mountain peaks and golden beaches',
    overview:
      'Rio pairs dramatic granite peaks with two of the world’s most famous urban beaches, Copacabana and Ipanema. Above it all, Christ the Redeemer watches over a city defined by samba, football, and relentless natural beauty.',
    bestSeason: 'September–March',
    currency: 'Brazilian Real (BRL)',
    language: 'Portuguese',
    timezone: 'GMT-3',
    tags: ['Beaches', 'Nightlife', 'Culture'],
    coordinates: { lat: -22.9068, lon: -43.1729 },
    heroImageQuery: 'rio de janeiro christ redeemer',
    fallbackHeroImage:
      'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=1974&auto=format&fit=crop',
    avgTemp: 25,
    places: [
      {
        id: 'christ-the-redeemer',
        name: 'Christ the Redeemer',
        category: 'Monument',
        description:
          'The Art Deco statue crowning Corcovado Mountain offers a sweeping view over Guanabara Bay, Sugarloaf, and the city sprawled below.',
        visitDuration: '2 hours',
        tip: 'Take the cog train up rather than driving — it avoids the limited summit parking.',
        imageQuery: 'christ the redeemer rio',
        fallbackImage:
          'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'sugarloaf',
        name: 'Sugarloaf Mountain',
        category: 'Natural Landmark',
        description:
          'A two-stage cable car rises over Guanabara Bay to a granite peak with, arguably, the best sunset view in the city.',
        visitDuration: '2–3 hours',
        tip: 'Book the last cable car up to catch both daylight and city-lights views.',
        imageQuery: 'sugarloaf mountain rio cable car',
        fallbackImage:
          'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'ipanema-beach',
        name: 'Ipanema Beach',
        category: 'Beach',
        description:
          'A wide arc of sand between two mountains, divided into social "postos" and lined with kiosks serving açaí bowls and caipirinhas.',
        visitDuration: 'Half day',
        tip: 'Rent a canga (sarong) and chair from a beach vendor rather than bringing your own.',
        imageQuery: 'ipanema beach rio',
        fallbackImage:
          'https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'santa-teresa',
        name: 'Santa Teresa',
        category: 'Historic Neighborhood',
        description:
          'A bohemian hillside district of cobblestone lanes, colonial mansions turned galleries, and the iconic yellow Selarón Steps nearby.',
        visitDuration: '2–3 hours',
        tip: 'Ride the historic yellow tram (bonde) for a scenic way into the neighborhood.',
        imageQuery: 'santa teresa selaron steps rio',
        fallbackImage:
          'https://images.unsplash.com/photo-1516306580123-4c9e2b1c8f6e?q=80&w=1974&auto=format&fit=crop',
      },
    ],
  },
];

export const allTags = Array.from(
  new Set(destinations.flatMap((d) => d.tags))
).sort();

export const allContinents = Array.from(
  new Set(destinations.map((d) => d.continent))
).sort();
