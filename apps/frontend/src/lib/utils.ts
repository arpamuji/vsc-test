import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(totalMinutes: number): string {
  const hour = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hour === 0) return `${minutes}m`;
  return `${hour}h ${minutes}m`;
}

export function formatRupiah(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace('Rp\u00a0', 'Rp');
}

export function titleCase(value: string): string {
  return value.charAt(0) + value.slice(1).toLowerCase();
}
