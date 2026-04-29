import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number | null | undefined) {
  if (value === null || value === undefined || isNaN(value)) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercentage(value: number | null | undefined) {
  if (value === null || value === undefined || isNaN(value)) return '0.0%';
  return `${value.toFixed(1)}%`;
}
