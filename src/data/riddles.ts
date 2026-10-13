export interface RiddleItem {
  id: number;
  riddle: string;
  answer: string;
  shortAnswer: string; // for spelling tiles & concise display
  aliases: string[];
  category: 'Ocean Life' | 'Beach & Shore' | 'Water Wonders' | 'Deep Sea' | 'Birds & Creatures';
  emoji: string;
  iconName: string;
  hint: string;
  funFact: string;
  zoneId: number; // 1 to 6 zone progression
  options: string[]; // 4 multiple choice choices
}

export interface ZoneInfo {
  id: number;
  name: string;
  theme: string;
  color: string;
  bgGradient: string;
  description: string;
  icon: string;
}

export const ZONES: ZoneInfo[] = [
  {
    id: 1,
    name: "Sunlit Shore",
    theme: "The beach and tide pools",
    color: "from-amber-400 to-amber-600",
    bgGradient: "from-amber-100 via-sky-100 to-teal-100",
    description: "Feel the warm sand and hear the crashing surf!",
    icon: "🏖️"
  },
  {
    id: 2,
    name: "Coral Cove",
    theme: "Colorful reefs and playful swimmers",
    color: "from-teal-400 to-emerald-600",
    bgGradient: "from-teal-100 via-cyan-100 to-blue-100",
    description: "Vibrant coral gardens buzzing with friendly fish!",
    icon: "🪸"
  },
  {
    id: 3,
    name: "Open Blue Waters",
    theme: "Giants of the wide ocean",
    color: "from-sky-500 to-blue-700",
    bgGradient: "from-sky-100 via-blue-100 to-indigo-100",
    description: "Gliding across endless waves with leaping dolphins and whales!",
    icon: "🌊"
  },
  {
    id: 4,
    name: "Coastal Haven",
    theme: "Feathered friends & sandy strolls",
    color: "from-rose-400 to-orange-500",
    bgGradient: "from-rose-100 via-amber-100 to-sky-100",
    description: "Where seabirds glide and crabs scuttle sideways!",
    icon: "🦩"
  },
  {
    id: 5,
    name: "Hidden Reef & Lagoon",
    theme: "Mysteries inside shells & calm bays",
    color: "from-purple-400 to-indigo-600",
    bgGradient: "from-purple-100 via-indigo-100 to-cyan-100",
    description: "Gleaming pearls, gentle tides, and camouflaged creatures!",
    icon: "🦪"
  },
  {
    id: 6,
    name: "Deep Ocean Wonders",
    theme: "Mysteries of the deep abyss",
    color: "from-blue-600 to-slate-900",
    bgGradient: "from-blue-200 via-indigo-200 to-slate-200",
    description: "Deep sea marvels, swirling waters, and glowing wonders!",
    icon: "🐙"
  }
];

export const RIDDLES: RiddleItem[] = [
  // Zone 1: Sunlit Shore
  {
    id: 1,
    riddle: "I am big and blue and cover most of the Earth. What am I?",
    answer: "The ocean",
    shortAnswer: "OCEAN",
    aliases: ["ocean", "the ocean", "sea"],
    category: "Water Wonders",
    emoji: "🌊",
    iconName: "Waves",
    hint: "It holds more than 70% of all the water on our planet!",
    funFact: "The ocean covers about 71% of Earth's surface and is home to over 240,000 known animal species!",
    zoneId: 1,
    options: ["The ocean", "A cloud", "A swimming pool", "The sky"]
  },
  {
    id: 2,
    riddle: "I crash on the shore all day and all night but never get tired. What am I?",
    answer: "A wave",
    shortAnswer: "WAVE",
    aliases: ["wave", "a wave", "waves", "ocean wave"],
    category: "Water Wonders",
    emoji: "🌊",
    iconName: "Wind",
    hint: "Wind makes me roll across the water until I splash on the sand!",
    funFact: "Most ocean waves are made by wind blowing across water. Surfers love to ride them!",
    zoneId: 1,
    options: ["A wave", "A speedboat", "A seagull", "A submarine"]
  },
  {
    id: 3,
    riddle: "I am salty but you would never put me on your food. What am I?",
    answer: "The sea",
    shortAnswer: "SEA",
    aliases: ["sea", "the sea", "ocean water", "sea water"],
    category: "Water Wonders",
    emoji: "💧",
    iconName: "Droplets",
    hint: "You swim in me on vacations, but you definitely don't sprinkle me on french fries!",
    funFact: "A cup of seawater contains about a teaspoon of dissolved minerals and salts!",
    zoneId: 1,
    options: ["The sea", "A pretzel", "A french fry", "A salt shaker"]
  },
  {
    id: 4,
    riddle: "I have five arms and live on the ocean floor. What am I?",
    answer: "A starfish (sea star)",
    shortAnswer: "STARFISH",
    aliases: ["starfish", "sea star", "a starfish", "star fish"],
    category: "Ocean Life",
    emoji: "⭐",
    iconName: "Sparkles",
    hint: "I look just like a twinkling shape in the night sky, but I live underwater!",
    funFact: "Starfish don't have blood or brains! Instead, they pump filtered seawater through their bodies to move.",
    zoneId: 1,
    options: ["A starfish (sea star)", "An octopus", "A lobster", "A sea sponge"]
  },
  {
    id: 5,
    riddle: "I have claws and walk sideways. I live near the ocean and love sand. What am I?",
    answer: "A crab",
    shortAnswer: "CRAB",
    aliases: ["crab", "a crab", "ghost crab", "beach crab"],
    category: "Beach & Shore",
    emoji: "🦀",
    iconName: "Shield",
    hint: "Click-clack! I scuttle sideways along the wet sand and dig quick little burrows.",
    funFact: "Crabs walk sideways because their leg joints bend outward rather than forward like ours!",
    zoneId: 1,
    options: ["A crab", "A lobster", "A turtle", "A lizard"]
  },

  // Zone 2: Coral Cove
  {
    id: 6,
    riddle: "I blow water from the top of my head like a fountain. What am I?",
    answer: "A whale",
    shortAnswer: "WHALE",
    aliases: ["whale", "a whale", "blue whale", "humpback whale"],
    category: "Ocean Life",
    emoji: "🐋",
    iconName: "Fish",
    hint: "I am the biggest mammal in the sea and breathe through a blowhole!",
    funFact: "A blue whale's heart is the size of a small car, and its song can travel hundreds of miles through water!",
    zoneId: 2,
    options: ["A whale", "A submarine", "A fountain pen", "A dolphin"]
  },
  {
    id: 7,
    riddle: "I am orange and white and hide in a flower-shaped animal. What am I?",
    answer: "A clownfish",
    shortAnswer: "CLOWNFISH",
    aliases: ["clownfish", "a clownfish", "nemo", "anemone fish"],
    category: "Ocean Life",
    emoji: "🐠",
    iconName: "Smile",
    hint: "You might know one named Nemo! I love living safe inside sea anemones.",
    funFact: "Clownfish have a special slimy mucus coat that protects them from the anemone's stinging tentacles!",
    zoneId: 2,
    options: ["A clownfish", "A goldfish", "A tiger shark", "A rainbow trout"]
  },
  {
    id: 8,
    riddle: "I am soft and squishy, have no bones, and sting if you touch me. What am I?",
    answer: "A jellyfish",
    shortAnswer: "JELLYFISH",
    aliases: ["jellyfish", "a jellyfish", "sea jelly"],
    category: "Ocean Life",
    emoji: "🪼",
    iconName: "Zap",
    hint: "I float like an umbrella with flowing tentacles and look like see-through jelly!",
    funFact: "Jellyfish have been drifting in oceans for over 500 million years—even before dinosaurs existed!",
    zoneId: 2,
    options: ["A jellyfish", "A marshmallow", "A sea cucumber", "A starfish"]
  },
  {
    id: 9,
    riddle: "I swim in schools but I never went to class. What am I?",
    answer: "A fish",
    shortAnswer: "FISH",
    aliases: ["fish", "a fish", "school of fish"],
    category: "Ocean Life",
    emoji: "🐟",
    iconName: "BookOpen",
    hint: "A big group of us swimming together is called a 'school'!",
    funFact: "Swimming in a school protects fish from predators because it confuses hunters like sharks and tuna!",
    zoneId: 2,
    options: ["A fish", "A teacher", "A dolphin", "A mermaid"]
  },
  {
    id: 10,
    riddle: "I puff up into a ball when I am scared. What am I?",
    answer: "A pufferfish",
    shortAnswer: "PUFFERFISH",
    aliases: ["pufferfish", "a pufferfish", "blowfish", "balloon fish"],
    category: "Ocean Life",
    emoji: "🐡",
    iconName: "CircleDot",
    hint: "I swallow water quickly so I become too round and spiky for big fish to bite!",
    funFact: "When threatened, pufferfish gulp air or water to swell up to several times their normal size!",
    zoneId: 2,
    options: ["A pufferfish", "A basketball", "A sea urchin", "A balloon"]
  },

  // Zone 3: Open Blue Waters
  {
    id: 11,
    riddle: "I am a big grey animal with a fin on my back. People love to watch me jump. What am I?",
    answer: "A dolphin",
    shortAnswer: "DOLPHIN",
    aliases: ["dolphin", "a dolphin", "bottlenose dolphin"],
    category: "Ocean Life",
    emoji: "🐬",
    iconName: "HeartHandshake",
    hint: "I am super smart, click and whistle to my friends, and love doing flips above the waves!",
    funFact: "Dolphins give each other unique signature whistles—just like humans having names!",
    zoneId: 3,
    options: ["A dolphin", "A seal", "A shark", "A walrus"]
  },
  {
    id: 12,
    riddle: "I carry my home on my back and walk slowly on the beach. What am I?",
    answer: "A sea turtle (or hermit crab)",
    shortAnswer: "SEA TURTLE",
    aliases: ["sea turtle", "hermit crab", "a sea turtle", "turtle", "a hermit crab"],
    category: "Beach & Shore",
    emoji: "🐢",
    iconName: "ShieldCheck",
    hint: "I have a hard protective shell and use my flippers to paddle through the sea!",
    funFact: "Sea turtles can hold their breath underwater for 4 to 7 hours while resting!",
    zoneId: 3,
    options: ["A sea turtle (or hermit crab)", "A snail", "An armadillo", "A pelican"]
  },
  {
    id: 13,
    riddle: "I live in the ocean and have a shell on my back. I swim very slowly and lay eggs on the beach. What am I?",
    answer: "A sea turtle",
    shortAnswer: "SEA TURTLE",
    aliases: ["sea turtle", "a sea turtle", "turtle", "green sea turtle"],
    category: "Ocean Life",
    emoji: "🐢",
    iconName: "Compass",
    hint: "Mother sea turtles return to the very same beach where they were born to lay their eggs in the sand!",
    funFact: "Baby sea turtles use the natural light of the moon over the sea to find their way to the water at night!",
    zoneId: 3,
    options: ["A sea turtle", "A crocodile", "A penguin", "A crab"]
  },
  {
    id: 14,
    riddle: "I am a tall wall of water that crashes onto the shore. Surfers love to ride me. What am I?",
    answer: "A big wave",
    shortAnswer: "BIG WAVE",
    aliases: ["a big wave", "big wave", "wave", "barrel wave", "surf wave"],
    category: "Water Wonders",
    emoji: "🌊",
    iconName: "TrendingUp",
    hint: "Wax your surfboard and paddle out! When I curl, you can ride my barrel!",
    funFact: "The largest wave ever surfed was over 86 feet high (taller than an 8-story building) in Nazaré, Portugal!",
    zoneId: 3,
    options: ["A big wave", "A waterfall", "A water slide", "A fountain"]
  },
  {
    id: 15,
    riddle: "I am the white bubbly edge of a wave. What am I?",
    answer: "Sea foam",
    shortAnswer: "SEA FOAM",
    aliases: ["sea foam", "foam", "ocean foam", "surf foam"],
    category: "Water Wonders",
    emoji: "🫧",
    iconName: "Sparkle",
    hint: "I bubble like soap suds when the water tosses and turns near the shore!",
    funFact: "Sea foam is formed when ocean water with organic materials and algae gets churned up by strong winds and waves!",
    zoneId: 3,
    options: ["Sea foam", "Bubble bath", "Whipped cream", "Cotton candy"]
  },

  // Zone 4: Coastal Haven
  {
    id: 16,
    riddle: "I am a pink bird with long legs who likes to stand in salty water. What am I?",
    answer: "A flamingo",
    shortAnswer: "FLAMINGO",
    aliases: ["flamingo", "a flamingo", "pink flamingo"],
    category: "Birds & Creatures",
    emoji: "🦩",
    iconName: "Feather",
    hint: "I love balancing on just one thin leg while eating yummy brine shrimp!",
    funFact: "Flamingos are actually born with grey feathers! They turn bright pink from the carotenoids in the algae and shrimp they eat.",
    zoneId: 4,
    options: ["A flamingo", "A parrot", "A pelican", "A swan"]
  },
  {
    id: 17,
    riddle: "I fly over the ocean and squawk loudly. I steal your chips at the beach. What am I?",
    answer: "A seagull",
    shortAnswer: "SEAGULL",
    aliases: ["seagull", "a seagull", "gull", "sea gull"],
    category: "Birds & Creatures",
    emoji: "🕊️",
    iconName: "Wind",
    hint: "Keep an eye on your picnic basket! I swoop down with a loud 'MINE! MINE!' squawk.",
    funFact: "Seagulls have special glands right above their eyes that filter out extra salt, allowing them to drink ocean water!",
    zoneId: 4,
    options: ["A seagull", "An eagle", "A pigeon", "A toucan"]
  },
  {
    id: 18,
    riddle: "I am black and white and swim in the cold sea like a bird that cannot fly. What am I?",
    answer: "A penguin",
    shortAnswer: "PENGUIN",
    aliases: ["penguin", "a penguin", "emperor penguin"],
    category: "Birds & Creatures",
    emoji: "🐧",
    iconName: "Snowflake",
    hint: "I waddle on icy shores wearing what looks like a fancy tuxedo!",
    funFact: "Penguins 'fly' underwater! Their flippers propel them through waves at speeds up to 15 miles per hour.",
    zoneId: 4,
    options: ["A penguin", "A puffin", "A panda", "A dalmatian"]
  },
  {
    id: 19,
    riddle: "I am the wet, sandy strip between the ocean and the land. What am I?",
    answer: "A beach",
    shortAnswer: "BEACH",
    aliases: ["beach", "a beach", "seashore", "shore"],
    category: "Beach & Shore",
    emoji: "🏖️",
    iconName: "Sun",
    hint: "Bring your bucket and spade—it's the perfect place to build a sandcastle!",
    funFact: "Beaches come in different colors around the world: golden, pure white, pink (from crushed shells), and even black (from volcanic lava)!",
    zoneId: 4,
    options: ["A beach", "A desert", "A soccer field", "A playground"]
  },
  {
    id: 20,
    riddle: "I am made of sand and stretch along the edge of the sea. Children build castles on me. What am I?",
    answer: "A beach",
    shortAnswer: "BEACH",
    aliases: ["beach", "a beach", "sand", "seashore"],
    category: "Beach & Shore",
    emoji: "🏰",
    iconName: "Castle",
    hint: "Grab your towel and sunscreen! Walk right where the tide touches your toes.",
    funFact: "Sand on beaches is made from billions of tiny crushed rocks, coral fragments, and shells smoothed over millions of years!",
    zoneId: 4,
    options: ["A beach", "A sandbox", "A driveway", "A mud pit"]
  },

  // Zone 5: Hidden Reef & Lagoon
  {
    id: 21,
    riddle: "I am round, I am smooth, and waves washed me onto the beach. You can hold me in your hand. What am I?",
    answer: "A pebble or seashell",
    shortAnswer: "SEASHELL",
    aliases: ["seashell", "a seashell", "pebble", "a pebble", "shell", "sea shell", "a pebble or seashell"],
    category: "Beach & Shore",
    emoji: "🐚",
    iconName: "Circle",
    hint: "If you hold me up to your ear, some people say you can hear the ocean whisper!",
    funFact: "Seashells are actually the abandoned outer homes of soft sea creatures like mollusks, clams, and snails!",
    zoneId: 5,
    options: ["A pebble or seashell", "A coconut", "A basketball", "A jellyfish"]
  },
  {
    id: 22,
    riddle: "I go in and out twice a day, pulled by the moon. What am I?",
    answer: "The tide",
    shortAnswer: "TIDE",
    aliases: ["tide", "the tide", "high tide", "ocean tide"],
    category: "Water Wonders",
    emoji: "🌖",
    iconName: "Moon",
    hint: "High or low, the moon's gravity pulls the ocean water back and forth across the sand.",
    funFact: "The gravitational pull of the moon (and a little bit from the sun) creates ocean tides all over the world every single day!",
    zoneId: 5,
    options: ["The tide", "The wind", "A submarine", "A surfer"]
  },
  {
    id: 23,
    riddle: "I am yellow and live in a tank. I have big eyes and a little fin. What am I?",
    answer: "A goldfish",
    shortAnswer: "GOLDFISH",
    aliases: ["goldfish", "a goldfish"],
    category: "Ocean Life",
    emoji: "🐠",
    iconName: "Eye",
    hint: "I am one of the most popular swimming pets in the world!",
    funFact: "Goldfish actually have great memories! Studies show they can remember things for months and even learn simple tricks.",
    zoneId: 5,
    options: ["A goldfish", "A canary", "A rubber duck", "A lemon"]
  },
  {
    id: 24,
    riddle: "I am tiny and live inside a shell. I have a hard outer body and many legs. What am I?",
    answer: "A hermit crab",
    shortAnswer: "HERMIT CRAB",
    aliases: ["hermit crab", "a hermit crab"],
    category: "Beach & Shore",
    emoji: "🐚",
    iconName: "Home",
    hint: "When I grow too big for my shell home, I search the beach to swap into a bigger one!",
    funFact: "Hermit crabs line up in size order to trade shells with each other when a new spacious shell washes ashore!",
    zoneId: 5,
    options: ["A hermit crab", "A shrimp", "A snail", "A caterpillar"]
  },
  {
    id: 25,
    riddle: "I am a shiny gem made inside a shell under the sea. What am I?",
    answer: "A pearl",
    shortAnswer: "PEARL",
    aliases: ["pearl", "a pearl", "sea pearl"],
    category: "Beach & Shore",
    emoji: "🦪",
    iconName: "Gem",
    hint: "An oyster wraps a tiny grain of sand in shiny layers to make this treasure!",
    funFact: "Natural pearls are formed when an oyster coats an irritant with thousands of shiny mineral layers called nacre!",
    zoneId: 5,
    options: ["A pearl", "A diamond", "A gold coin", "A glass marble"]
  },

  // Zone 6: Deep Ocean Wonders
  {
    id: 26,
    riddle: "I have eight legs and live in a pool near the beach rocks. What am I?",
    answer: "An octopus (or rock crab)",
    shortAnswer: "OCTOPUS",
    aliases: ["octopus", "an octopus", "rock crab", "octo"],
    category: "Deep Sea",
    emoji: "🐙",
    iconName: "Cpu",
    hint: "I have suction cups on all my arms, three hearts, and can squirt dark ink to escape!",
    funFact: "Octopuses have blue blood, three hearts, and can squeeze their soft bodies through any hole larger than their hard beak!",
    zoneId: 6,
    options: ["An octopus (or rock crab)", "A spider", "A squid", "A starfish"]
  },
  {
    id: 27,
    riddle: "I spin in the ocean and can suck things down. What am I?",
    answer: "A whirlpool",
    shortAnswer: "WHIRLPOOL",
    aliases: ["whirlpool", "a whirlpool", "vortex", "maelstrom"],
    category: "Water Wonders",
    emoji: "🌀",
    iconName: "RotateCcw",
    hint: "Swirling rapidly round and round like water rushing down a gigantic bathtub drain!",
    funFact: "Giant whirlpools, called maelstroms, are caused by powerful ocean tides rushing through narrow channels!",
    zoneId: 6,
    options: ["A whirlpool", "A tornado", "A water slide", "A washing machine"]
  },
  {
    id: 28,
    riddle: "I come from the sea, I smell salty, and the wind brings me to shore. What am I?",
    answer: "A sea breeze",
    shortAnswer: "SEA BREEZE",
    aliases: ["sea breeze", "a sea breeze", "ocean breeze", "breeze"],
    category: "Water Wonders",
    emoji: "💨",
    iconName: "Wind",
    hint: "Close your eyes on the beach and feel cool fresh air blowing gently across your face.",
    funFact: "Sea breezes happen because land warms up faster than water during sunny days, pulling cool sea air inward!",
    zoneId: 6,
    options: ["A sea breeze", "A thunderstorm", "A kite", "A windmill"]
  },
  {
    id: 29,
    riddle: "I am a tiny creature that lives inside a shell. The shell has two halves and I filter the water I live in. What am I?",
    answer: "A clam",
    shortAnswer: "CLAM",
    aliases: ["clam", "a clam", "bivalve", "mussel"],
    category: "Beach & Shore",
    emoji: "🦪",
    iconName: "Filter",
    hint: "My two shell halves open and close like a little hinged treasure chest buried in the sand.",
    funFact: "Clams are nature's ocean water filters! A single clam can clean gallons of water every day by filtering out plankton.",
    zoneId: 6,
    options: ["A clam", "An oyster", "A snail", "A walnut"]
  },
  {
    id: 30,
    riddle: "I am long, smooth, and slippery. I live in the ocean and look like a snake but I am a fish. What am I?",
    answer: "An eel",
    shortAnswer: "EEL",
    aliases: ["eel", "an eel", "moray eel", "electric eel"],
    category: "Ocean Life",
    emoji: "🐍",
    iconName: "Zap",
    hint: "I hide in rocky sea caves and coral crevices, ribboning gracefully through the water.",
    funFact: "Moray eels have a second hidden set of jaws inside their throat called pharyngeal jaws to pull food in!",
    zoneId: 6,
    options: ["An eel", "A sea snake", "A python", "A giant worm"]
  }
];

export interface PlayerProfile {
  name: string;
  avatar: string;
  coins: number;
  unlockedZone: number;
  solvedIds: number[];
  starredIds: number[];
  streak: number;
  highestStreak: number;
  badgesUnlocked: string[];
}

export const AVATARS = [
  { id: "captain", name: "Captain Coral", emoji: "🧑‍✈️", title: "Brave Navigator" },
  { id: "scuba", name: "Scuba Sam", emoji: "🤿", title: "Reef Explorer" },
  { id: "diver", name: "Diver Daisy", emoji: "🧜‍♀️", title: "Mermaid Finder" },
  { id: "pirate", name: "Penny Pirate", emoji: "🏴‍☠️", title: "Treasure Hunter" },
  { id: "crabby", name: "Barnaby Crab", emoji: "🦀", title: "Sideway Surfer" },
  { id: "dolphin", name: "Flipper Finn", emoji: "🐬", title: "Splash Master" }
];
