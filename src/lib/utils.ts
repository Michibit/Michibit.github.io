import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge conditional class names and resolve Tailwind conflicts.
 *
 * `clsx` handles the conditional logic, `tailwind-merge` collapses conflicting
 * utilities so a caller's override actually wins: `cn("p-4", "p-8")` is `p-8`,
 * not whichever class the stylesheet happens to define last.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Pad a number for index-style labels: 1 -> "01". */
export function pad(index: number, length = 2) {
  return String(index).padStart(length, "0");
}
