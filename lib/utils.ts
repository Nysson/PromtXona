import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function timeAgo(iso: string): string {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  const intervals: [number, string][] = [
    [31536000, "y"],
    [2592000, "mo"],
    [604800, "w"],
    [86400, "d"],
    [3600, "h"],
    [60, "m"],
  ];
  for (const [secs, label] of intervals) {
    const count = Math.floor(seconds / secs);
    if (count >= 1) return `${count}${label} ago`;
  }
  return "just now";
}

export function generateId(prefix = "id"): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

/**
 * "Mashhurlik" bo'yicha saralash: upvote → nusxalash soni → yangiroq.
 * Ovozlar kam bo'lgan boshlang'ich davrda tartib tasodifiy bo'lib qolmaydi.
 */
export function byPopularity(
  a: { upvotes: number; copyCount: number; createdAt: string },
  b: { upvotes: number; copyCount: number; createdAt: string }
): number {
  return (
    b.upvotes - a.upvotes ||
    b.copyCount - a.copyCount ||
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
