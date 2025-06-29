import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Export both the original function and a renamed version for backwards compatibility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Alternative name in case there are any namespace conflicts
export const mergeClasses = cn