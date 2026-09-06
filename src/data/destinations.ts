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
  {
    id: 'goa',
    name: 'Goa',
    state: 'Goa',
    country: 'India',
    countryCode: 'IN',
    continent: 'Asia',
    flag: '🇮🇳',
    tagline: 'Sun-soaked beaches, Portuguese heritage, and round-the-clock rhythm',
    overview:
      "India's smallest state packs colonial-era churches, spice-scented markets, and a coastline that shifts from backpacker shacks in the south to beach clubs in the north — all wrapped in an unhurried, tropical pace of life.",
    bestSeason: 'November–February',
    currency: 'Indian Rupee (INR)',
    language: 'Konkani, English',
    timezone: 'GMT+5:30',
    tags: ['Beaches', 'Nightlife', 'Gastronomy'],
    coordinates: { lat: 15.2993, lon: 74.124 },
    heroImageQuery: 'Goa India beach coastline',
    fallbackHeroImage:
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1974&auto=format&fit=crop',
    avgTemp: 27,
    places: [
      {
        id: 'basilica-of-bom-jesus',
        name: 'Basilica of Bom Jesus',
        category: 'Basilica',
        description:
          'A UNESCO World Heritage baroque church in Old Goa holding the mortal remains of St. Francis Xavier, its ornate facade one of the finest examples of Portuguese colonial architecture in Asia.',
        visitDuration: '45 minutes',
        tip: 'Dress modestly — shoulders and knees covered — to enter respectfully.',
        imageQuery: 'Basilica of Bom Jesus Goa India',
        fallbackImage:
          'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'fort-aguada',
        name: 'Fort Aguada',
        category: 'Fort',
        description:
          'A 17th-century Portuguese fort perched above the Arabian Sea, built to defend against Dutch and Maratha naval attacks, with a lighthouse still standing watch over Sinquerim Beach.',
        visitDuration: '1 hour',
        tip: 'Time your visit for sunset — the sea views from the ramparts are best in golden light.',
        imageQuery: 'Fort Aguada Goa India',
        fallbackImage:
          'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'dudhsagar-falls',
        name: 'Dudhsagar Falls',
        category: 'Waterfall',
        description:
          'A four-tiered waterfall cascading over 300 meters through the Western Ghats, its milky-white flow giving it the name "Sea of Milk."',
        visitDuration: '3–4 hours',
        tip: 'Visit just after monsoon (Oct–Dec) for the fullest flow, and book a jeep safari in advance.',
        imageQuery: 'Dudhsagar Falls Goa India',
        fallbackImage:
          'https://images.unsplash.com/photo-1499552444837-3ba32d5a8b1c?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'palolem-beach',
        name: 'Palolem Beach',
        category: 'Beach',
        description:
          'A crescent-shaped cove in South Goa lined with palm trees and low-key beach shacks, far calmer than the party beaches up north.',
        visitDuration: '2–3 hours',
        tip: 'Kayak out at dusk for a chance to spot bioluminescent plankton in the water.',
        imageQuery: 'Palolem Beach Goa India',
        fallbackImage:
          'https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=1974&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 'assam',
    name: 'Assam',
    state: 'Assam',
    country: 'India',
    countryCode: 'IN',
    continent: 'Asia',
    flag: '🇮🇳',
    tagline: 'One-horned rhinos, river islands, and the world\'s finest tea gardens',
    overview:
      "Cradled by the Brahmaputra River, Assam is India's gateway to the Northeast — a land of mist-covered tea estates, wildlife-rich grasslands, and river islands that host some of the country's most distinctive living culture.",
    bestSeason: 'November–April',
    currency: 'Indian Rupee (INR)',
    language: 'Assamese, Bengali',
    timezone: 'GMT+5:30',
    tags: ['Wildlife', 'Culture', 'Adventure'],
    coordinates: { lat: 26.2006, lon: 92.9376 },
    heroImageQuery: 'Assam India tea gardens Brahmaputra',
    fallbackHeroImage:
      'https://images.unsplash.com/photo-1544731612-de7f96afe55f?q=80&w=1974&auto=format&fit=crop',
    avgTemp: 24,
    places: [
      {
        id: 'kaziranga-national-park',
        name: 'Kaziranga National Park',
        category: 'National Park',
        description:
          "Home to two-thirds of the world's one-horned rhinoceros population, this UNESCO site's tall elephant grass and swamps also shelter tigers, wild elephants, and swamp deer.",
        visitDuration: 'Half day',
        tip: 'Take the early-morning elephant-back or jeep safari for the closest rhino sightings.',
        imageQuery: 'Kaziranga National Park rhino Assam India',
        fallbackImage:
          'https://images.unsplash.com/photo-1544931170-e0fb14a99f30?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'majuli-island',
        name: 'Majuli Island',
        category: 'River Island',
        description:
          'The world\'s largest river island, formed by the Brahmaputra, is home to centuries-old Vaishnavite monasteries (satras) and mask-making artisan villages.',
        visitDuration: 'Full day',
        tip: 'Take the early ferry from Nimatighat — the island shrinks a little more with erosion each year.',
        imageQuery: 'Majuli Island Assam India',
        fallbackImage:
          'https://images.unsplash.com/photo-1571536802807-30451e3955d8?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'kamakhya-temple',
        name: 'Kamakhya Temple',
        category: 'Temple',
        description:
          'One of the oldest of the 51 Shakti Peethas, this hilltop temple in Guwahati draws pilgrims from across India, especially during the Ambubachi Mela festival.',
        visitDuration: '1–2 hours',
        tip: 'Expect long queues on Tuesdays and Fridays — arrive right at opening time.',
        imageQuery: 'Kamakhya Temple Assam India',
        fallbackImage:
          'https://images.unsplash.com/photo-1609619385002-f40f1df66d43?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'dibrugarh-tea-gardens',
        name: 'Dibrugarh Tea Gardens',
        category: 'Tea Estate',
        description:
          'Endless rows of manicured tea bushes surround this city, the "Tea Capital of India," where estates welcome visitors for tastings and factory tours.',
        visitDuration: '2–3 hours',
        tip: 'Visit during plucking season (March–November) to see the harvest in motion.',
        imageQuery: 'Dibrugarh tea garden Assam India',
        fallbackImage:
          'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?q=80&w=1974&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 'karnataka-hampi',
    name: 'Karnataka',
    state: 'Karnataka',
    country: 'India',
    countryCode: 'IN',
    continent: 'Asia',
    flag: '🇮🇳',
    tagline: 'Boulder-strewn empire ruins, royal palaces, and misty coffee hills',
    overview:
      "Karnataka pairs the surreal, boulder-strewn ruins of the Vijayanagara Empire at Hampi with Mysore's regal palaces and the Western Ghats' coffee-scented hill country — a state where a millennium of history sits in plain sight.",
    bestSeason: 'October–March',
    currency: 'Indian Rupee (INR)',
    language: 'Kannada, English',
    timezone: 'GMT+5:30',
    tags: ['History', 'Architecture', 'Culture'],
    coordinates: { lat: 15.335, lon: 76.46 },
    heroImageQuery: 'Hampi Karnataka India ruins',
    fallbackHeroImage:
      'https://images.unsplash.com/photo-1600100397608-59d0d7b1e6e7?q=80&w=1974&auto=format&fit=crop',
    avgTemp: 28,
    places: [
      {
        id: 'hampi-vijayanagara-ruins',
        name: 'Hampi Vijayanagara Ruins',
        category: 'Ancient Ruins',
        description:
          'A UNESCO World Heritage expanse of temple complexes, royal enclosures, and boulder-strewn landscapes marking the capital of the once-mighty Vijayanagara Empire.',
        visitDuration: 'Half day',
        tip: 'Rent a bicycle to cover the ruins spread across several kilometers, or hire an auto-rickshaw for the day.',
        imageQuery: 'Hampi Vijayanagara ruins Karnataka India',
        fallbackImage:
          'https://images.unsplash.com/photo-1600100397608-59d0d7b1e6e7?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'virupaksha-temple',
        name: 'Virupaksha Temple',
        category: 'Temple',
        description:
          "Hampi's still-active temple, dedicated to Lord Shiva, with a nine-tiered gopuram tower that has watched over the sacred town for over 600 years.",
        visitDuration: '1 hour',
        tip: 'Climb Hemakuta Hill just behind the temple for the best sunset view over the ruins.',
        imageQuery: 'Virupaksha Temple Hampi India',
        fallbackImage:
          'https://images.unsplash.com/photo-1590050433077-e3d4b0037a91?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'mysore-palace',
        name: 'Mysore Palace',
        category: 'Palace',
        description:
          'The opulent former seat of the Wadiyar dynasty, illuminated by nearly 100,000 lights on Sunday evenings and throughout the ten-day Dasara festival.',
        visitDuration: '1.5–2 hours',
        tip: 'Visit on a Sunday evening or during Dasara to see the palace lit up after dark.',
        imageQuery: 'Mysore Palace Karnataka India',
        fallbackImage:
          'https://images.unsplash.com/photo-1600100397608-a2f6d1a3c5f4?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'coorg-coffee-estates',
        name: 'Coorg Coffee Estates',
        category: 'Plantation',
        description:
          'Misty hills draped in coffee and cardamom plantations, waterfalls, and Kodava villages make this region the "Scotland of India."',
        visitDuration: 'Half day',
        tip: 'Stay at a homestay on a working estate for the best access to plantation walks.',
        imageQuery: 'Coorg coffee estate Karnataka India',
        fallbackImage:
          'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1974&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 'rajasthan-jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    country: 'India',
    countryCode: 'IN',
    continent: 'Asia',
    flag: '🇮🇳',
    tagline: "The Pink City's forts, palaces, and bazaars, unchanged for centuries",
    overview:
      "Rajasthan's capital earned its nickname from the terracotta-pink hue painted across its old city in 1876 to welcome royalty. Behind those walls: Mughal-Rajput forts, mirrored palaces, and bazaars selling block-printed textiles exactly as they have for 300 years.",
    bestSeason: 'October–March',
    currency: 'Indian Rupee (INR)',
    language: 'Hindi, Rajasthani',
    timezone: 'GMT+5:30',
    tags: ['History', 'Architecture', 'Culture'],
    coordinates: { lat: 26.9124, lon: 75.7873 },
    heroImageQuery: 'Jaipur Rajasthan India pink city',
    fallbackHeroImage:
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1974&auto=format&fit=crop',
    avgTemp: 26,
    places: [
      {
        id: 'amber-fort',
        name: 'Amber Fort',
        category: 'Fort',
        description:
          'A honey-colored hilltop fort of mirrored halls and courtyards overlooking Maota Lake, built by Raja Man Singh in 1592.',
        visitDuration: '2 hours',
        tip: 'Arrive by 8 AM to beat both the heat and the tour-bus crowds.',
        imageQuery: 'Amber Fort Jaipur India',
        fallbackImage:
          'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'hawa-mahal',
        name: 'Hawa Mahal',
        category: 'Palace',
        description:
          'A five-story pink sandstone facade of 953 intricately latticed windows, built so royal women could observe street life unseen.',
        visitDuration: '45 minutes',
        tip: 'Photograph the facade from the rooftop café directly across the street for the best angle.',
        imageQuery: 'Hawa Mahal Jaipur India',
        fallbackImage:
          'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'city-palace-jaipur',
        name: 'City Palace',
        category: 'Palace',
        description:
          "Still partly home to Jaipur's royal family, this palace complex blends Rajput and Mughal architecture across courtyards, museums, and armories.",
        visitDuration: '1.5 hours',
        tip: 'The Royal Grandeur ticket includes access to private chambers otherwise closed to standard visitors.',
        imageQuery: 'City Palace Jaipur India',
        fallbackImage:
          'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'jantar-mantar-jaipur',
        name: 'Jantar Mantar',
        category: 'Observatory',
        description:
          "A UNESCO-listed collection of 19 monumental astronomical instruments built in 1734, including the world's largest stone sundial, accurate to two seconds.",
        visitDuration: '1 hour',
        tip: 'Visit around noon to watch the giant sundial cast its shadow in real time.',
        imageQuery: 'Jantar Mantar Jaipur India',
        fallbackImage:
          'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1974&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 'kerala',
    name: 'Kerala',
    state: 'Kerala',
    country: 'India',
    countryCode: 'IN',
    continent: 'Asia',
    flag: '🇮🇳',
    tagline: "God's Own Country — backwaters, tea hills, and Ayurvedic calm",
    overview:
      "A slender strip between the Arabian Sea and the Western Ghats, Kerala threads palm-fringed backwaters, misty tea plantations, and centuries of spice-trade history into one of India's most relaxed itineraries.",
    bestSeason: 'September–March',
    currency: 'Indian Rupee (INR)',
    language: 'Malayalam',
    timezone: 'GMT+5:30',
    tags: ['Wellness', 'Beaches', 'Culture'],
    coordinates: { lat: 9.9312, lon: 76.2673 },
    heroImageQuery: 'Kerala India backwaters houseboat',
    fallbackHeroImage:
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1974&auto=format&fit=crop',
    avgTemp: 29,
    places: [
      {
        id: 'alleppey-backwaters',
        name: 'Alleppey Backwaters',
        category: 'Backwaters',
        description:
          'A maze of palm-lined canals, lagoons, and lakes best explored aboard a traditional kettuvallam houseboat, drifting past village life along the banks.',
        visitDuration: 'Full day / overnight',
        tip: 'Book an overnight houseboat stay rather than a day cruise for the full sunset-to-sunrise experience.',
        imageQuery: 'Alleppey backwaters houseboat Kerala India',
        fallbackImage:
          'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'munnar-tea-gardens',
        name: 'Munnar Tea Gardens',
        category: 'Tea Estate',
        description:
          'Rolling hills blanketed in emerald tea bushes climb toward misty peaks over 1,600 meters high, dotted with colonial-era plantation bungalows.',
        visitDuration: 'Half day',
        tip: "Visit the Tea Museum in Munnar town to see how the leaves you're looking at become your morning cup.",
        imageQuery: 'Munnar tea gardens Kerala India',
        fallbackImage:
          'https://images.unsplash.com/photo-1524293581917-878a6d017c71?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'fort-kochi',
        name: 'Fort Kochi',
        category: 'Historic Neighborhood',
        description:
          'A waterfront district layered with Portuguese, Dutch, and British colonial history, best known for its iconic Chinese fishing nets silhouetted at sunset.',
        visitDuration: '2–3 hours',
        tip: 'Time your visit for sunset to watch the giant cantilevered fishing nets in action.',
        imageQuery: 'Fort Kochi Chinese fishing nets India',
        fallbackImage:
          'https://images.unsplash.com/photo-1590050752117-8e40aac9e1e6?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'periyar-national-park',
        name: 'Periyar National Park',
        category: 'National Park',
        description:
          'A wildlife sanctuary centered on a scenic man-made lake, home to elephants, tigers, and langurs, best explored on a boat safari or guided forest trek.',
        visitDuration: 'Half day',
        tip: "Book the early-morning boat safari for the best chance of spotting elephants at the water's edge.",
        imageQuery: 'Periyar National Park Kerala India',
        fallbackImage:
          'https://images.unsplash.com/photo-1580889240911-64d8cbf7d668?q=80&w=1974&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 'delhi',
    name: 'Delhi',
    state: 'Delhi (NCT)',
    country: 'India',
    countryCode: 'IN',
    continent: 'Asia',
    flag: '🇮🇳',
    tagline: 'Mughal grandeur and modern India, side by side',
    overview:
      "India's capital layers centuries of history into one sprawling metropolis — Mughal-era forts and tombs standing minutes from colonial-era boulevards and a fast-modernizing city. Few places anywhere pack this much history into a single afternoon's walk.",
    bestSeason: 'October–March',
    currency: 'Indian Rupee (INR)',
    language: 'Hindi, English, Punjabi',
    timezone: 'GMT+5:30',
    tags: ['History', 'Architecture', 'Culture'],
    coordinates: { lat: 28.6139, lon: 77.209 },
    heroImageQuery: 'Delhi India Red Fort Mughal architecture',
    fallbackHeroImage:
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1974&auto=format&fit=crop',
    avgTemp: 25,
    places: [
      {
        id: 'red-fort',
        name: 'Red Fort (Lal Qila)',
        category: 'Fort',
        description:
          "This red sandstone Mughal fortress served as the seat of Mughal emperors for two centuries and is where India's Prime Minister raises the flag every Independence Day.",
        visitDuration: '1.5–2 hours',
        tip: "Catch the evening sound-and-light show that retells the fort's history after dark.",
        imageQuery: 'Red Fort Delhi India',
        fallbackImage:
          'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'humayuns-tomb',
        name: "Humayun's Tomb",
        category: 'Mausoleum',
        description:
          'A UNESCO World Heritage garden-tomb of red sandstone and white marble that inspired the design of the Taj Mahal a century later.',
        visitDuration: '1 hour',
        tip: 'Visit in the late afternoon for softer light on the sandstone facade.',
        imageQuery: "Humayun's Tomb Delhi India",
        fallbackImage:
          'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'qutub-minar',
        name: 'Qutub Minar',
        category: 'Minaret',
        description:
          'A 73-meter tapering tower of fluted red sandstone, the tallest brick minaret in the world, begun in 1193 to mark the start of Muslim rule in Delhi.',
        visitDuration: '1 hour',
        tip: 'Look for the Iron Pillar in the courtyard — over 1,600 years old and still virtually rust-free.',
        imageQuery: 'Qutub Minar Delhi India',
        fallbackImage:
          'https://images.unsplash.com/photo-1587474262946-2b4c9c95f5f0?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'india-gate',
        name: 'India Gate',
        category: 'War Memorial',
        description:
          'A 42-meter sandstone archway honoring over 84,000 soldiers of the British Indian Army, flanked by wide lawns that come alive with picnicking families at dusk.',
        visitDuration: '45 minutes',
        tip: 'Visit in the evening when the monument is lit up and the surrounding lawns fill with life.',
        imageQuery: 'India Gate Delhi India',
        fallbackImage:
          'https://images.unsplash.com/photo-1587135941948-670b381f08ce?q=80&w=1974&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 'tamil-nadu',
    name: 'Tamil Nadu',
    state: 'Tamil Nadu',
    country: 'India',
    countryCode: 'IN',
    continent: 'Asia',
    flag: '🇮🇳',
    tagline: 'Dravidian temple towers, hill stations, and 2,000 years of living tradition',
    overview:
      "Tamil Nadu's towering gopuram gateways mark temple complexes still in daily use after a thousand years, while the Nilgiri hills offer a cool, misty escape from the plains and a coastline of ancient shore temples faces the Bay of Bengal.",
    bestSeason: 'November–February',
    currency: 'Indian Rupee (INR)',
    language: 'Tamil',
    timezone: 'GMT+5:30',
    tags: ['History', 'Architecture', 'Culture'],
    coordinates: { lat: 13.0827, lon: 80.2707 },
    heroImageQuery: 'Tamil Nadu India temple gopuram',
    fallbackHeroImage:
      'https://images.unsplash.com/photo-1600100397608-1b9b0f8b6e1e?q=80&w=1974&auto=format&fit=crop',
    avgTemp: 30,
    places: [
      {
        id: 'meenakshi-amman-temple',
        name: 'Meenakshi Amman Temple',
        category: 'Temple',
        description:
          'A dazzling complex of 14 gopuram towers covered in thousands of painted sculptures, built around a temple site over 2,500 years old, in the heart of Madurai.',
        visitDuration: '2 hours',
        tip: 'Go barefoot as required, and visit during the evening aarti ceremony for the full atmosphere.',
        imageQuery: 'Meenakshi Amman Temple Madurai India',
        fallbackImage:
          'https://images.unsplash.com/photo-1621996659490-3e4c4c4c1a1a?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'shore-temple-mahabalipuram',
        name: 'Shore Temple',
        category: 'Ancient Temple',
        description:
          'A UNESCO-listed granite temple carved directly on the Bay of Bengal shoreline in the 8th century, among the oldest structural stone temples in South India.',
        visitDuration: '1 hour',
        tip: "Combine with the nearby Five Rathas and Arjuna's Penance rock carvings in the same visit.",
        imageQuery: 'Shore Temple Mahabalipuram India',
        fallbackImage:
          'https://images.unsplash.com/photo-1600100397608-1b9b0f8b6e1e?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'ooty-hill-station',
        name: 'Ooty Hill Station',
        category: 'Hill Station',
        description:
          'A former British hill retreat in the Nilgiris, ringed by tea plantations and eucalyptus groves, reached by a toy train that climbs through 16 tunnels.',
        visitDuration: 'Full day',
        tip: 'Ride the UNESCO-listed Nilgiri Mountain Railway toy train for the journey, not just the destination.',
        imageQuery: 'Ooty hill station Nilgiri India',
        fallbackImage:
          'https://images.unsplash.com/photo-1580889240911-64d8cbf7d668?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'brihadeeswarar-temple',
        name: 'Brihadeeswarar Temple',
        category: 'Ancient Temple',
        description:
          'A UNESCO World Heritage Chola-dynasty temple completed in 1010 CE, crowned by a 66-meter granite tower topped with a single 80-ton capstone.',
        visitDuration: '1 hour',
        tip: "Look for the temple's shadow-minimizing tower design — a feat of 11th-century engineering.",
        imageQuery: 'Brihadeeswarar Temple Thanjavur India',
        fallbackImage:
          'https://images.unsplash.com/photo-1621996659490-3e4c4c4c1a1a?q=80&w=1974&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 'uttar-pradesh',
    name: 'Uttar Pradesh',
    state: 'Uttar Pradesh',
    country: 'India',
    countryCode: 'IN',
    continent: 'Asia',
    flag: '🇮🇳',
    tagline: 'The Taj Mahal, the Ganges, and the soul of Mughal India',
    overview:
      "Home to both the Taj Mahal and the sacred ghats of Varanasi, Uttar Pradesh holds two of India's most powerful images: a marble monument to eternal love, and a river city where life and ritual play out in public view along the Ganges.",
    bestSeason: 'October–March',
    currency: 'Indian Rupee (INR)',
    language: 'Hindi',
    timezone: 'GMT+5:30',
    tags: ['History', 'Architecture', 'Culture'],
    coordinates: { lat: 27.1767, lon: 78.0081 },
    heroImageQuery: 'Taj Mahal Agra Uttar Pradesh India',
    fallbackHeroImage:
      'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1974&auto=format&fit=crop',
    avgTemp: 26,
    places: [
      {
        id: 'taj-mahal',
        name: 'Taj Mahal',
        category: 'Mausoleum',
        description:
          'A white marble mausoleum built by Emperor Shah Jahan for his wife Mumtaz Mahal, widely considered the finest example of Mughal architecture in the world.',
        visitDuration: '2–3 hours',
        tip: 'Visit at sunrise — the marble shifts through soft pink and gold tones and the crowds are thinnest.',
        imageQuery: 'Taj Mahal Agra India',
        fallbackImage:
          'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'agra-fort',
        name: 'Agra Fort',
        category: 'Fort',
        description:
          'A red sandstone Mughal fortress on the Yamuna River where Shah Jahan was later imprisoned by his own son, with a clear view of the Taj Mahal he built.',
        visitDuration: '1.5 hours',
        tip: 'Look for Musamman Burj, the tower where Shah Jahan spent his final years gazing at the Taj.',
        imageQuery: 'Agra Fort India',
        fallbackImage:
          'https://images.unsplash.com/photo-1585506942812-c1e35a5f4b1a?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'varanasi-ghats',
        name: 'Varanasi Ghats',
        category: 'Riverfront',
        description:
          "Stone steps line the Ganges for miles in Hinduism's holiest city, where pilgrims bathe at dawn and centuries-old rites are performed in public along the riverbank.",
        visitDuration: 'Half day',
        tip: 'Take a sunrise boat ride along the ghats, then return at dusk for the Ganga Aarti fire ceremony.',
        imageQuery: 'Varanasi ghats Ganges India',
        fallbackImage:
          'https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'fatehpur-sikri',
        name: 'Fatehpur Sikri',
        category: 'Historic City',
        description:
          'A perfectly preserved red-sandstone Mughal capital, abandoned just 15 years after Emperor Akbar built it, reportedly due to water shortages.',
        visitDuration: '1.5–2 hours',
        tip: 'Visit Buland Darwaza, the "Gate of Magnificence," among the tallest gateways in the world.',
        imageQuery: 'Fatehpur Sikri India',
        fallbackImage:
          'https://images.unsplash.com/photo-1585506942812-c1e35a5f4b1a?q=80&w=1974&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 'himachal-pradesh',
    name: 'Himachal Pradesh',
    state: 'Himachal Pradesh',
    country: 'India',
    countryCode: 'IN',
    continent: 'Asia',
    flag: '🇮🇳',
    tagline: 'Pine-covered ridgelines and prayer flags in the Western Himalayas',
    overview:
      "Former British hill stations, Tibetan Buddhist monasteries, and snow-dusted trekking valleys stack up through Himachal Pradesh's ridgelines, offering some of the most accessible high-altitude escapes in the Himalayas.",
    bestSeason: 'March–June & September–November',
    currency: 'Indian Rupee (INR)',
    language: 'Hindi, Pahari',
    timezone: 'GMT+5:30',
    tags: ['Alpine', 'Adventure', 'Culture'],
    coordinates: { lat: 31.1048, lon: 77.1734 },
    heroImageQuery: 'Himachal Pradesh India Himalayas mountains',
    fallbackHeroImage:
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1974&auto=format&fit=crop',
    avgTemp: 15,
    places: [
      {
        id: 'shimla-ridge',
        name: 'Shimla Ridge & Mall Road',
        category: 'Hill Station',
        description:
          'The former summer capital of British India, its colonial architecture and pedestrian Mall Road unfold along a pine-covered ridge with sweeping Himalayan views.',
        visitDuration: 'Half day',
        tip: 'Take the UNESCO-listed toy train from Kalka for a scenic approach into town.',
        imageQuery: 'Shimla Ridge Himachal Pradesh India',
        fallbackImage:
          'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'solang-valley',
        name: 'Solang Valley',
        category: 'Valley',
        description:
          'A glacier-fringed valley near Manali offering paragliding and zorbing in summer, and skiing in winter, against a backdrop of snow-capped peaks.',
        visitDuration: 'Half day',
        tip: 'Visit early morning for the clearest mountain views before afternoon cloud cover rolls in.',
        imageQuery: 'Solang Valley Manali India',
        fallbackImage:
          'https://images.unsplash.com/photo-1626621341517-a2e5c2e2b0c8?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'mcleod-ganj',
        name: 'McLeod Ganj',
        category: 'Monastery Town',
        description:
          'Home to the Dalai Lama and the Tibetan government-in-exile, this hillside town blends Tibetan Buddhist culture with sweeping Dhauladhar mountain views.',
        visitDuration: 'Half day',
        tip: "Visit the Tsuglagkhang Complex, the Dalai Lama's temple, and stay for a butter tea in the market.",
        imageQuery: 'McLeod Ganj Dharamshala India',
        fallbackImage:
          'https://images.unsplash.com/photo-1626621340661-4c0a94b53c8b?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'rohtang-pass',
        name: 'Rohtang Pass',
        category: 'Mountain Pass',
        description:
          'A high-altitude pass at nearly 3,980 meters connecting the Kullu Valley to Lahaul-Spiti, blanketed in snow for much of the year.',
        visitDuration: 'Full day',
        tip: 'Check road-permit and weather conditions before heading up — the pass often closes without notice.',
        imageQuery: 'Rohtang Pass Himachal Pradesh India',
        fallbackImage:
          'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1974&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 'maharashtra',
    name: 'Maharashtra',
    state: 'Maharashtra',
    country: 'India',
    countryCode: 'IN',
    continent: 'Asia',
    flag: '🇮🇳',
    tagline: 'Ancient cave temples and the relentless energy of Mumbai',
    overview:
      "Maharashtra spans India's most cosmopolitan city and, a few hours inland, some of the finest rock-cut cave art on Earth — Buddhist, Hindu, and Jain monuments carved directly into basalt cliffs over 1,500 years ago.",
    bestSeason: 'November–February',
    currency: 'Indian Rupee (INR)',
    language: 'Marathi, Hindi',
    timezone: 'GMT+5:30',
    tags: ['History', 'Architecture', 'Culture'],
    coordinates: { lat: 19.076, lon: 72.8777 },
    heroImageQuery: 'Mumbai Maharashtra India Gateway of India',
    fallbackHeroImage:
      'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?q=80&w=1974&auto=format&fit=crop',
    avgTemp: 28,
    places: [
      {
        id: 'gateway-of-india',
        name: 'Gateway of India',
        category: 'Monument',
        description:
          "A basalt archway built in 1924 to commemorate King George V's visit, now Mumbai's most iconic waterfront landmark facing the Arabian Sea.",
        visitDuration: '45 minutes',
        tip: 'Take the ferry from here to Elephanta Island rather than booking a ferry elsewhere in the city.',
        imageQuery: 'Gateway of India Mumbai',
        fallbackImage:
          'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'ajanta-caves',
        name: 'Ajanta Caves',
        category: 'Ancient Caves',
        description:
          'Thirty rock-cut Buddhist caves dating to the 2nd century BCE, famous for elaborate murals and sculptures depicting the life of the Buddha.',
        visitDuration: 'Half day',
        tip: 'Bring a flashlight or phone light — the painted interiors are dimly lit to preserve the artwork.',
        imageQuery: 'Ajanta Caves Maharashtra India',
        fallbackImage:
          'https://images.unsplash.com/photo-1590050433077-e3d4b0037a91?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'ellora-caves',
        name: 'Ellora Caves',
        category: 'Ancient Caves',
        description:
          'Thirty-four rock-cut Buddhist, Hindu, and Jain monuments carved side by side, crowned by the Kailasa Temple — a single monolithic structure hewn from one rock.',
        visitDuration: 'Half day',
        tip: "Don't miss Cave 16, the Kailasa Temple — it was carved top-down out of a single basalt cliff.",
        imageQuery: 'Ellora Caves Kailasa Temple India',
        fallbackImage:
          'https://images.unsplash.com/photo-1600100397608-59d0d7b1e6e7?q=80&w=1974&auto=format&fit=crop',
      },
      {
        id: 'elephanta-caves',
        name: 'Elephanta Caves',
        category: 'Ancient Caves',
        description:
          'A short ferry ride from Mumbai, these 5th-century rock-cut caves house a monumental three-faced sculpture of Shiva carved from solid basalt.',
        visitDuration: 'Half day (incl. ferry)',
        tip: 'Take the first ferry out to avoid both the midday heat and the crowds.',
        imageQuery: 'Elephanta Caves Mumbai India',
        fallbackImage:
          'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?q=80&w=1974&auto=format&fit=crop',
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
