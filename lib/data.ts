import { Token } from "@/types/token";

const tokenNames = [
  {
    name: "BUNKERCOIN",
    symbol: "The MC",
    image: "https://picsum.photos/seed/token1/200",
  },
  {
    name: "NVIDIA",
    symbol: "NVIDIA",
    image: "https://picsum.photos/seed/token2/200",
  },
  {
    name: "BunkerCoin",
    symbol: "Bunkr",
    image: "https://picsum.photos/seed/token3/200",
  },
  {
    name: "BUNKER",
    symbol: "Bu",
    image: "https://picsum.photos/seed/token4/200",
  },
  {
    name: "INDIAN",
    symbol: "The Indian",
    image: "https://picsum.photos/seed/token5/200",
  },
  {
    name: "Dixie",
    symbol: "The Special R",
    image: "https://picsum.photos/seed/token6/200",
  },
  {
    name: "EDIBLES",
    symbol: "edibles",
    image: "https://picsum.photos/seed/token7/200",
  },
  {
    name: "ONIMask",
    symbol: "No Cert",
    image: "https://picsum.photos/seed/token8/200",
  },
  {
    name: "vibe",
    symbol: "vibe.cat",
    image: "https://picsum.photos/seed/token9/200",
  },
  {
    name: "MAGA",
    symbol: "MAGA",
    image: "https://picsum.photos/seed/token10/200",
  },
  {
    name: "JNJ",
    symbol: "Johnson",
    image: "https://picsum.photos/seed/token11/200",
  },
  {
    name: "Catholic",
    symbol: "catholic",
    image: "https://picsum.photos/seed/token12/200",
  },
  {
    name: "Pepe",
    symbol: "PEPE",
    image: "https://picsum.photos/seed/token13/200",
  },
  {
    name: "Wojak",
    symbol: "WOJAK",
    image: "https://picsum.photos/seed/token14/200",
  },
  {
    name: "Moon",
    symbol: "MOON",
    image: "https://picsum.photos/seed/token15/200",
  },
  {
    name: "Rocket",
    symbol: "RKT",
    image: "https://picsum.photos/seed/token16/200",
  },
  {
    name: "Diamond",
    symbol: "DMD",
    image: "https://picsum.photos/seed/token17/200",
  },
  {
    name: "Tiger",
    symbol: "TGR",
    image: "https://picsum.photos/seed/token18/200",
  },
  {
    name: "Phoenix",
    symbol: "PHX",
    image: "https://picsum.photos/seed/token19/200",
  },
  {
    name: "Dragon",
    symbol: "DRG",
    image: "https://picsum.photos/seed/token20/200",
  },
];

// Create a realistic-looking token with random data
function generateRandomToken(
  index: number,
  category: Token["category"]
): Token {
  const tokenInfo = tokenNames[index % tokenNames.length];
  const randomPrice = Math.random() * 1000;

  return {
    id: `${category}-${index}`,
    name: tokenInfo.name,
    symbol: tokenInfo.symbol,
    image: tokenInfo.image,
    marketCap: Math.random() * 10000000,
    volume: Math.random() * 5000000,
    price: randomPrice,
    priceChange24h: (Math.random() - 0.5) * 150, // Random between -75% to +75%
    holders: Math.floor(Math.random() * 500),
    replies: Math.floor(Math.random() * 100),
    txCount: Math.floor(Math.random() * 500),
    age: Math.floor(Math.random() * 86400), // Random seconds in a day
    category,
    creator:
      category === "new" ? `${(Math.random() * 100).toFixed(0)}%` : undefined,
    bumps: category === "final" ? Math.floor(Math.random() * 200) : undefined,
  };
}

// Generate mock tokens for all three categories
export function getMockTokens(): Token[] {
  const newPairs = Array.from({ length: 50 }, (_, i) =>
    generateRandomToken(i, "new")
  );
  const finalStretch = Array.from({ length: 50 }, (_, i) =>
    generateRandomToken(i, "final")
  );
  const migrated = Array.from({ length: 50 }, (_, i) =>
    generateRandomToken(i, "migrated")
  );

  return [...newPairs, ...finalStretch, ...migrated];
}
