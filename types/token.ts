// Main token data structure
export interface Token {
  id: string;
  name: string;
  symbol: string;
  image: string;
  marketCap: number;
  volume: number;
  price: number;
  priceChange24h: number;
  holders: number;
  replies: number;
  txCount: number;
  age: number; // in seconds
  category: "new" | "final" | "migrated";
  creator?: string; // Only for "new" tokens
  bumps?: number; // Only for "final" tokens
}

// Props for TokenCard component
export interface TokenCardProps {
  token: Token;
  onSelect?: (token: Token) => void;
}

// Sorting options
export type SortField = "marketCap" | "volume" | "priceChange24h" | "age";
export type SortDirection = "asc" | "desc";
