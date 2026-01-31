import { CURRENCY_LOCALE, CURRENCY_CODE } from './constants';

/**
 * Format currency values
 */
export function formatCurrency(value: number, options?: { compact?: boolean }): string {
  const formatter = new Intl.NumberFormat(CURRENCY_LOCALE, {
    style: 'currency',
    currency: CURRENCY_CODE,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    ...(options?.compact && {
      notation: 'compact',
      compactDisplay: 'short',
    }),
  });

  return formatter.format(value);
}

/**
 * Format percentage values
 */
export function formatPercent(value: number, decimals: number = 0): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format hours with appropriate precision
 */
export function formatHours(value: number): string {
  if (value < 1) {
    const minutes = Math.round(value * 60);
    return `${minutes} min`;
  }
  if (value < 10) {
    return `${value.toFixed(1)} hrs`;
  }
  return `${Math.round(value)} hrs`;
}

/**
 * Format large numbers with commas
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat(CURRENCY_LOCALE).format(Math.round(value));
}

/**
 * Format months to breakeven
 */
export function formatBreakeven(months: number): string {
  if (!isFinite(months) || months < 0) {
    return 'N/A';
  }
  if (months < 1) {
    return 'Immediate';
  }
  if (months < 12) {
    return `${months.toFixed(1)} months`;
  }
  const years = months / 12;
  return `${years.toFixed(1)} years`;
}

/**
 * Format decimal for FTE equivalent
 */
export function formatFTE(value: number): string {
  if (value < 0.1) {
    return value.toFixed(2);
  }
  return value.toFixed(1);
}

/**
 * Get ROI status for accessibility
 */
export function getROIStatus(value: number): 'positive' | 'negative' | 'neutral' {
  if (value > 0) return 'positive';
  if (value < 0) return 'negative';
  return 'neutral';
}

/**
 * Get ROI icon based on status
 */
export function getROIIcon(status: 'positive' | 'negative' | 'neutral'): string {
  switch (status) {
    case 'positive':
      return '↑';
    case 'negative':
      return '↓';
    default:
      return '—';
  }
}
