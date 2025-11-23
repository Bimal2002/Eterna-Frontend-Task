import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert large numbers to readable format (1500000 -> $1.50M)
export function formatNumber(num: number, decimals: number = 2): string {
  if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(decimals)}M`;
  }
  if (num >= 1000) {
    return `$${(num / 1000).toFixed(decimals)}K`;
  }
  return `$${num.toFixed(decimals)}`;
}

// Format percentage with sign (15.5 -> +16%)
export function formatPercent(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(0)}%`;
}

// Convert seconds to human-readable time (3600 -> 1h)
export function formatTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
  return `${Math.floor(seconds / 86400)}d`;
}
